import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeDisable } from '../actions';

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
    const { ChangeDisable } = this.props;
    const segundo = 1000;
    const trinta = 30;
    let number = trinta;
    this.timer = setInterval(() => {
      const { disable } = this.props;
      number -= 1;
      if (number < 0 || disable) {
        clearInterval(this.timer);
        ChangeDisable(true);
        return;
      }
      this.setState({ counter: number });
    }, segundo);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  ChangeDisable: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  disable: PropTypes.bool.isRequired,
};
