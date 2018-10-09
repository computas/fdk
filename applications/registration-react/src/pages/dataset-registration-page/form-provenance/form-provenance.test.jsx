import React from 'react';
import { shallow } from 'enzyme';
import FormProvenance from './form-provenance.component';
import helptext from '../../../../test/fixtures/helptext';
import frequency from '../../../../test/fixtures/frequency';
import provenance from '../../../../test/fixtures/provenance';

let defaultProps;
let wrapper;

beforeEach(() => {
  const { helptextItems } = helptext;
  const { frequencyItems } = frequency;
  const { provenanceItems } = provenance;
  defaultProps = {
    initialValues: {
      frequencyItems,
      provenanceItems
    },
    helptextItems,
    provenanceItems,
    input: {
      name: 'provenance',
      value: {
        uri: 'http://data.brreg.no/datakatalog/provinens/bruker',
        code: 'BRUKER',
        prefLabel: {
          nb: 'Brukerinnsamlede data',
          nn: 'Brukerinnsamlede data',
          en: 'User collection'
        }
      }
    }
  };
  wrapper = shallow(<FormProvenance {...defaultProps} />);
});

test('should render FormProvenance correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
