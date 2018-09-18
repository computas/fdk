import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { Button } from 'reactstrap';

import localization from '../../lib/localization';
import { PublishersSelect } from './publishers-select/publishers-select.component';
import { PublishersTree } from './publishers-tree/publishers-tree.component';
import { getParamFromLocation } from '../../lib/addOrReplaceUrlParam';
import { ResolvedReportStats } from './report-stats/resolved-report-stats';

export function DatasetsReportPage(props) {
  function selectPublisher(publisher) {
    const orgPath = publisher && publisher.orgPath;
    const currentSearch = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    });
    const newSearch = { ...currentSearch, orgPath };
    const newSearchStr = qs.stringify(newSearch, {
      addQueryPrefix: true,
      skipNulls: true,
      encode: false
    });

    // This is react-router browserHistory object
    // https://github.com/ReactTraining/history
    props.history.push({ search: newSearchStr });
  }

  function clearSearch() {
    selectPublisher(null);
  }

  props.fetchPublishersIfNeeded();

  const orgPath = getParamFromLocation(props.location, 'orgPath');
  const selectedPublisher = _.get(props.publishers, [orgPath], null);

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-4">
          <Button className="fdk-button" onClick={clearSearch} color="primary">
            {localization.query.clear}
          </Button>
          <PublishersSelect
            publishers={props.publishers}
            onChange={selectPublisher}
            value={selectedPublisher}
          />
          <PublishersTree
            onChange={selectPublisher}
            value={selectedPublisher}
          />
        </div>
        <div className="col-md-8">
          <ResolvedReportStats
            orgPath={selectedPublisher && selectedPublisher.orgPath}
            entityName={selectedPublisher && selectedPublisher.name}
          />
        </div>
      </div>
    </section>
  );
}

DatasetsReportPage.defaultProps = {
  fetchPublishersIfNeeded: _.noop
};

DatasetsReportPage.propTypes = {
  fetchPublishersIfNeeded: PropTypes.func,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
