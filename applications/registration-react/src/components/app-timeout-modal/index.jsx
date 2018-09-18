import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class TimeoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: 120
    };
    this.tick = this.tick.bind(this);
    this.refreshSession = this.refreshSession.bind(this);
    this.logoutSession = this.logoutSession.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.timer === null && nextProps.modal === true) {
      const timer = setInterval(this.tick, 1000);
      this.setState({ timer });
    }
  }

  tick() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  refreshSession() {
    this.props.refreshSession();
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      counter: 120
    });
  }

  logoutSession() {
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      counter: 120
    });
    this.props.toggle();
  }

  render() {
    const {
      modal,
      toggle,
      title,
      ingress,
      body,
      buttonConfirm,
      buttonLogout
    } = this.props;
    const seconds = this.state.counter;
    const minutes = Math.floor(seconds / 60);
    let minutesText = `${minutes} minutter og `;
    let secondsText = `${seconds % 60} sekunder.`;

    if (minutes === 0) {
      minutesText = '';
    } else if (minutes === 1) {
      minutesText = `${minutes} minutt og `;
    }
    if (seconds % 60 === 1) {
      secondsText = `${seconds % 60} sekund.`;
    }
    const text = minutesText + secondsText;

    if (seconds === 0) {
      this.logoutSession();
    }

    return (
      <div>
        <Modal isOpen={modal} toggle={() => toggle}>
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody className="d-flex flex-column align-items-center">
            <div>
              {ingress} {text}
            </div>
            <div>{body}</div>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-center">
            <Button color="primary" onClick={this.refreshSession}>
              {buttonConfirm}
            </Button>
            <Button color="danger" onClick={this.logoutSession}>
              {buttonLogout}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

TimeoutModal.defaultProps = {
  modal: false,
  title: null,
  ingress: null,
  body: null,
  buttonConfirm: null,
  buttonLogout: null
};

TimeoutModal.propTypes = {
  modal: PropTypes.bool,
  refreshSession: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string,
  ingress: PropTypes.string,
  body: PropTypes.string,
  buttonConfirm: PropTypes.string,
  buttonLogout: PropTypes.string
};

// export default TimeoutModal;
