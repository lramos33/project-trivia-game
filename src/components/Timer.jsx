import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeDisable, changeTime } from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 30,
    };
  }

  componentDidMount() {
    this.runTimer();
  }

  componentDidUpdate(prevProp) {
    const { position } = this.props;
    if (prevProp.position !== position) {
      this.restartCounter();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  restartCounter() {
    const { ChangeDisable } = this.props;
    ChangeDisable(false);
    this.runTimer();
  }

  runTimer() {
    const { ChangeDisable, ChangeTime } = this.props;
    const seconds = 1000;
    const thirty = 30;
    let number = thirty;
    this.timer = setInterval(() => {
      const { disable } = this.props;
      number -= 1;
      if (number < 0 || disable) {
        ChangeTime(number);
        ChangeDisable(true);
        clearInterval(this.timer);
        return;
      }
      this.setState({ counter: number });
    }, seconds);
  }

  render() {
    const { counter } = this.state;
    return (
      <p>{ counter }</p>
    );
  }
}

const mapStateToProps = ({ myReducer: { position, disable } }) => ({ position, disable });

const mapDispatchToProps = (dispatch) => ({
  ChangeDisable: (disable) => dispatch(changeDisable(disable)),
  ChangeTime: (time) => dispatch(changeTime(time)),
});

Timer.propTypes = {
  ChangeDisable: PropTypes.func.isRequired,
  ChangeTime: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
