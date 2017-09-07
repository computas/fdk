package no.dcat.config;

import no.dcat.authorization.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.util.*;

/**
 * Created by bjg on 19.06.2017.
 *
 * Configures basic auth for use in develop profile
 */
@Configuration
@Profile({"develop", "unit-integration", "docker"})
public class BasicAuthConfig extends GlobalAuthenticationConfigurerAdapter{
    private static final Logger logger = LoggerFactory.getLogger(AuthorizationService.class);

    private Map<String, List<Entity>> userEntities = new HashMap<>();
    private Map<String, String> userNames = new HashMap<>();

    @Bean
    public AuthenticationSuccessHandler loginSuccessHandler() {
        SimpleUrlAuthenticationSuccessHandler handler = new SimpleUrlAuthenticationSuccessHandler();
        handler.setRedirectStrategy((request, response, url) -> {
            String referer = request.getHeaders("referer").nextElement();
            URL url1 = new URL(referer);
            referer = url1.getProtocol()+"://"+url1.getHost()+":"+url1.getPort()+"/index.html";
            response.sendRedirect(referer);
        });
        return handler;
    }


    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {

        SimpleUrlLogoutSuccessHandler handler = new SimpleUrlLogoutSuccessHandler();
        handler.setRedirectStrategy((request, response, url) -> {
            String referer = request.getHeaders("referer").nextElement();
            URL url1 = new URL(referer);
            referer = url1.getProtocol()+"://"+url1.getHost()+":"+url1.getPort()+"/index.html";
            response.sendRedirect(referer);
        });
        return handler;
    }

    @Autowired
    AuthorizationService authorizationService;

    @Autowired
    EntityNameService entityNameService;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    UserDetailsService userDetailsService = new UserDetailsService() {

        @Override
        public UserDetails loadUserByUsername(String ssn) throws UsernameNotFoundException {
            Set<GrantedAuthority> authorities = new HashSet<>();
            try {
                authorizationService.getOrganisations(ssn)
                        .stream()
                        .map(SimpleGrantedAuthority::new)
                        .forEach(authorities::add);

                if (authorities.size() > 0) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

                    User user = new User(ssn, "password01", authorities);
                    return user;
                } else {
                    throw new UsernameNotFoundException("Unable to find user with username provided!");
                }
            } catch (AuthorizationServiceException e) {
                throw new UsernameNotFoundException(e.getLocalizedMessage(),e);
            }
        }
    };



    @Configuration
    @EnableWebSecurity
    @Profile({"develop", "docker"})
    public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
              //  .httpBasic()
              //      .and()
                .csrf().disable()
                .authorizeRequests()
                    .antMatchers("/*.js").permitAll()
                    .antMatchers("/*.woff2").permitAll()
                    .antMatchers("/*.woff").permitAll()
                    .antMatchers("/*.ttf").permitAll()
                    .antMatchers("/assets/**").permitAll()
                    .antMatchers("/loggetut").permitAll()
                    .antMatchers("/loginerror").permitAll()
                    .antMatchers("/innloggetBruker").permitAll()
                    .and()
                .authorizeRequests()
                    .antMatchers(HttpMethod.GET,"/catalogs/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                   // .loginPage("/login")
                    .permitAll()
                    .successHandler(loginSuccessHandler())
                    .failureUrl("/loginerror")
                    .and()

                .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessHandler(logoutSuccessHandler())
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .permitAll()
                    .and()
                .exceptionHandling()
                    .accessDeniedPage("/loginerror");
        }

    }

}