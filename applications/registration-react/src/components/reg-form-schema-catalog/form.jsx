import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import cx from 'classnames';
import { Collapse } from 'reactstrap';

import localization from '../../utils/localization';
import getTranslateText from '../../utils/translateText';
import Helptext from '../reg-form-helptext';
import InputField from '../reg-form-field-input';
import InputTitleField from '../reg-form-field-input-title';
import TextAreaField from '../reg-form-field-textarea';

export class FormCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.state = {
      collapseTitle: false,
      collapse: false
    };
  }

  toggleTitle() {
    this.setState({ collapseTitle: !this.state.collapseTitle });
  }

  toggleDescription() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { helptextItems, initialValues, values } = this.props;
    const { title, publisher } = initialValues;

    const collapseClass = cx(
      'fdk-reg_collapse',
      'fdk-reg_backgroundDefault',
      'fdk-datasets-description',
      {
        'fdk-reg_collapse_open': this.state.collapse
      }
    );

    const fieldClass = cx('fdk-title-input', {
      'w-100': this.state.collapseTitle
    });

    return (
      <form className="mb-5 fdk-reg-catalogs">
        <div className="d-none">
          <Field name="id" component={InputField} label="Beskrivelse" />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          {title &&
            title.nb &&
            !this.state.collapseTitle && (
              <h1 className="w-75 fdk-text-strong">
                {getTranslateText(title, localization.getLanguage())}
              </h1>
            )}
          <div className={fieldClass}>
            <Field
              name={`title.${localization.getLanguage()}`}
              component={InputTitleField}
              label={localization.schema.common.titleLabel}
              hideInput={this.state.collapseTitle}
              onToggleTitle={this.toggleTitle}
            />
          </div>
        </div>

        {publisher &&
          publisher.name && (
            <div className="fdk-reg-datasets-publisher mt-2 mb-4">
              {localization.schema.catalog.ownedByLabel} {publisher.name}
            </div>
          )}

        <div className={collapseClass}>
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex fdk-color1">
              {getTranslateText(values.description, localization.getLanguage())}
            </div>
            <button
              onClick={e => {
                e.preventDefault();
                this.toggleDescription();
              }}
            >
              <i className="fa fa-pencil mr-2" />
              {localization.schema.catalog.editDescriptionLabel}
            </button>
          </div>
          <Collapse className="mt-3" isOpen={this.state.collapse}>
            <div className="form-group">
              <Helptext
                title={localization.schema.catalog.helptext.title}
                required
                helptextItems={helptextItems.Catalog_title}
              />
              <Field
                name={`description.${localization.getLanguage()}`}
                component={TextAreaField}
                label={localization.schema.common.descriptionLabel}
              />
            </div>
          </Collapse>
        </div>
      </form>
    );
  }
}

FormCatalog.defaultProps = {
  initialValues: null,
  values: null
};
FormCatalog.propTypes = {
  helptextItems: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  values: PropTypes.object
};

export default FormCatalog;
