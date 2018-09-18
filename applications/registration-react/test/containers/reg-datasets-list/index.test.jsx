import React from 'react';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import shallowWithStore from '../../shallowWithStore';
import RegDatasetsListComponent, {
  RegDatasetsList
} from '../../../src/containers/reg-datasets-list';
import datasets from '../../fixtures/datasets';
import helptext from '../../fixtures/helptext';
import catalogs from '../../fixtures/catalogs';

let defaultProps;
let wrapper;
let dispatch;

beforeEach(() => {
  dispatch = jest.fn();
  defaultProps = {
    dispatch,
    datasetItems: datasets.datasetItems,
    helptextItems: helptext.helptextItems,
    isFetchingCatalog: false,
    catalogItem: catalogs.catalogItems._embedded.catalogs[0]
  };
  wrapper = shallow(<RegDatasetsList {...defaultProps} />);
});

test('should render ProtectedRoute correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render FormAccessRightsSchema correctly', () => {
  const testState = {
    catalogs
  };
  const store = createMockStore(testState);
  wrapper = shallowWithStore(<RegDatasetsListComponent />, store);
  expect(wrapper).toMatchSnapshot();
});
