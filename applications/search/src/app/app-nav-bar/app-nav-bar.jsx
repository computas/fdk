import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import localization from '../../lib/localization';

export function AppNavBar(props) {
  return (
    <div className="fdk-header">
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <a title="Link til Felles datakatalog" href="/">
              <span className="uu-invisible" aria-hidden="false">
                Gå til forside
              </span>
              <img
                className="fdk-logo"
                src="/static/img/fdk-logo@2x.png"
                alt="Logo for Felles datakatalog"
              />
            </a>
          </div>

          <div className="col-xs-6 col-md-offset-5 col-md-3 fdk-header-flex">
            <DropdownButton
              tabIndex="0"
              id="search-language-dropdown-1"
              bsStyle="default"
              className="fdk-button-language visible-md visible-lg"
              title={localization.lang.chosenLanguage}
              onSelect={props.onChangeLanguage}
            >
              <MenuItem key="1" eventKey="nb">
                {localization.lang['norwegian-nb']}
              </MenuItem>
              <MenuItem key="2" eventKey="nn">
                {localization.lang['norwegian-nn']}
              </MenuItem>
              <MenuItem key="3" eventKey="en">
                {localization.lang['english-en']}
              </MenuItem>
            </DropdownButton>

            <div className="fdk-header-menu">
              <DropdownButton
                tabIndex="0"
                id="search-menu-dropdown-1"
                bsStyle="default"
                className="fdk-button fdk-button-default fdk-button-menu"
                title={localization.app.menu}
              >
                <li role="presentation">
                  <Link tabIndex="-1" to={`/about`}>
                    {localization.about.about}
                  </Link>
                </li>
                <li role="presentation">
                  <Link tabIndex="-1" to={`/about-registration`}>
                    {localization.menu.aboutRegistration}
                  </Link>
                </li>
                <li role="presentation">
                  <Link tabIndex="-1" to={`/reports`}>
                    {localization.menu.reports}
                  </Link>
                </li>
                <MenuItem
                  className="visible-xs visible-sm"
                  key="1"
                  eventKey="nb"
                  onSelect={props.onChangeLanguage}
                >
                  {localization.lang['norwegian-nb']}
                </MenuItem>
                <MenuItem
                  className="visible-xs visible-sm"
                  key="2"
                  eventKey="nn"
                  onSelect={props.onChangeLanguage}
                >
                  {localization.lang['norwegian-nn']}
                </MenuItem>
                <MenuItem
                  className="visible-xs visible-sm"
                  key="3"
                  eventKey="en"
                  onSelect={props.onChangeLanguage}
                >
                  {localization.lang['english-en']}
                </MenuItem>
              </DropdownButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AppNavBar.defaultProps = {};

AppNavBar.propTypes = {
  onChangeLanguage: PropTypes.func.isRequired
};