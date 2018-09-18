import 'whatwg-fetch';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';

import { configureStore } from './redux/configureStore';
import { ConnectedFeatureToggleProvider } from './components/connected-feature-toggle-provider';
import { ConnectedApp } from './app/connected-app';
import { ErrorBoundary } from './components/error-boundary/error-boundary';
import ScrollToTop from './components/scroll-to-top/scrollToTop.component';

if (window.location.hostname.indexOf('fellesdatakatalog.brreg.no') !== -1) {
  ReactGA.initialize('UA-110098477-1'); // prod
  ReactGA.set({ anonymizeIp: true });
  hotjar.initialize(995327, 6);
} else if (
  window.location.hostname.indexOf('fellesdatakatalog.tt1.brreg.no') !== -1
) {
  ReactGA.initialize('UA-110098477-2'); // tt1
  ReactGA.set({ anonymizeIp: true });
} else if (window.location.hostname.indexOf('localhost') !== -1) {
  ReactGA.initialize('UA-41886511-1'); // localhost
  ReactGA.set({ anonymizeIp: true });
}

window.addEventListener('unhandledrejection', event => {
  console.warn(`WARNING: Unhandled promise rejection. Reason: ${event.reason}`);
});

/**
 * @return {null}
 */
function Analytics(props) {
  const PAGEVIEW_TIMEOUT = 200;
  if (
    window.location.hostname.indexOf('fellesdatakatalog.brreg.no') !== -1 ||
    window.location.hostname.indexOf('fellesdatakatalog.tt1.brreg.no') !== -1 ||
    window.location.hostname.indexOf('localhost') !== -1
  ) {
    ReactGA.set({ page: props.location.pathname + props.location.search });
    window.setTimeout(
      () =>
        ReactGA.pageview(
          props.location.pathname + props.location.search,
          undefined,
          document.title
        ),
      PAGEVIEW_TIMEOUT
    );
  }
  return null;
}

const store = configureStore();

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedFeatureToggleProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Route path="/" component={Analytics} />
            <Route path="/" component={ConnectedApp} />
          </ScrollToTop>
        </BrowserRouter>
      </ConnectedFeatureToggleProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
