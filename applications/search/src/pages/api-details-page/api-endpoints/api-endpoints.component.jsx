import React from 'react';
import PropTypes from 'prop-types';

import localization from '../../../lib/localization';

export const renderPathMethod = (path, method, methodDeclaration) => (
  <React.Fragment key={`${method}-${path}`}>
    <div className="row">
      <div className="col-5 fdk-text-strong">
        {method.toUpperCase()} {path}
      </div>
      <div className="col-7">{methodDeclaration.description}</div>
    </div>
    <hr />
  </React.Fragment>
);

export const renderPath = (path, declaration) =>
  declaration &&
  Object.keys(declaration).map(method =>
    renderPathMethod(path, method, declaration[method])
  );

export const renderPaths = paths => {
  const renderedMethods =
    paths && Object.keys(paths).map(path => renderPath(path, paths[path]));
  return <div>{renderedMethods}</div>;
};

const renderLinks = (apiSpecUrl, apiDocUrl) => {
  if (apiSpecUrl || apiDocUrl) {
    return (
      <div className="row">
        <div className="col-12">
          {apiDocUrl && (
            <a href={apiDocUrl} className="mr-5">
              {localization.documentation}
              <i className="fa fa-external-link fdk-fa-right" />
            </a>
          )}
          {apiSpecUrl && (
            <a href={apiSpecUrl} className="mr-5">
              {localization.specification}
              <i className="fa fa-external-link fdk-fa-right" />
            </a>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const ApiEndpoints = props => {
  const { name, paths, apiSpecUrl, apiDocUrl } = props;
  return (
    <section className="mb-5 list-type1" name={name}>
      <div className="row">
        <div className="col-5">
          <h3 className="">{localization.api.endpoints.operation}</h3>
        </div>
        <div className="col-7">
          <h3 className="">{localization.api.endpoints.description}</h3>
        </div>
      </div>
      <hr />
      {renderPaths(paths)}
      {renderLinks(apiSpecUrl, apiDocUrl)}
    </section>
  );
};

ApiEndpoints.defaultProps = {
  name: null,
  paths: null,
  apiSpecUrl: null,
  apiDocUrl: null
};

ApiEndpoints.propTypes = {
  name: PropTypes.string,
  paths: PropTypes.object,
  apiSpecUrl: PropTypes.string,
  apiDocUrl: PropTypes.string
};
