package no.dcat.api.settings;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;


@Configuration
@EnableConfigurationProperties
@ConfigurationProperties
public class FusekiSettings {

	@Value("fuseki.dcatServiceUri")
	private String dcatServiceUri;
	@Value("fuseki.adminServiceUri")
	private String adminServiceUri;

	@PostConstruct
	void validate(){
		assert dcatServiceUri != null;
		assert adminServiceUri != null;

	}

	public String getDcatServiceUri() {
		return dcatServiceUri;
	}
	public void setDcatServiceUri(String dcatServiceUri) {
		this.dcatServiceUri = dcatServiceUri;
	}
	public String getAdminServiceUri() {
		return adminServiceUri;
	}
	public void setAdminServiceUri(String adminServiceUri) {
		this.adminServiceUri = adminServiceUri;
	}
	
}