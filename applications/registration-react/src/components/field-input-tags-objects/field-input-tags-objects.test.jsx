import React from 'react';
import { shallow } from 'enzyme';
import InputTagsFieldArray from './field-input-tags-objects.component';

let defaultProps;
let wrapper;

beforeEach(() => {
  defaultProps = {
    input: {
      name: 'spatial',
      value: []
    },
    meta: {
      active: false,
      asyncValidating: false,
      autofilled: false,
      dirty: false,
      form: 'spatial',
      initial: [],
      invalid: false,
      pristine: true,
      submitting: false,
      submitFailed: false,
      touched: false,
      valid: true,
      visited: false
    },
    type: 'text',
    label: 'Geografisk avgrensning',
    fieldLabel: 'uri',
    showLabel: false
  };
  wrapper = shallow(<InputTagsFieldArray {...defaultProps} />);
});

test('should render InputTagsFieldArray correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
