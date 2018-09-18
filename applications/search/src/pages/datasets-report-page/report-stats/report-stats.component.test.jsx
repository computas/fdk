import React from 'react';
import { shallow } from 'enzyme';
import { normalizeAggregations } from '../../../api/normalizeAggregations';
import { ReportStats } from './report-stats.component';
import aggregateDatasetApiResponse from './__fixtures/aggregateDatasetApiResponse.json';
import { extractStats } from '../../../api/get-dataset-stats';

let defaultProps;
let wrapper;

beforeEach(() => {
  defaultProps = {
    stats: extractStats(normalizeAggregations(aggregateDatasetApiResponse)),
    entityName: 'test entity'
  };
  wrapper = shallow(<ReportStats {...defaultProps} />);
});

test('should render ReportStats correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
