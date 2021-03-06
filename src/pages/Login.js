import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../actions';
import { addLocalStorage } from '../services/funcs';
import triviaImage from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.nameEmailLabels = this.nameEmailLabels.bind(this);
    this.state = {
      name: '',
      email: '',
    };
  }

  // Define nome e email e envia para o estado global e local storage
  onButtonClick() {
    const { name, email } = this.state;
    const { GetQuestions } = this.props;
    GetQuestions();
    addLocalStorage(name, email);
  }

  // Função input change padrão
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  // Renderiza os inputs de login
  nameEmailLabels() {
    const { name, email } = this.state;
    return (
      <>
        <label htmlFor="name" className="login-page-label">
          Nome
          <input
            className="login-page-input"
            data-testid="input-player-name"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email" className="login-page-label">
          Email
          <input
            className="login-page-input"
            data-testid="input-gravatar-email"
            id="Email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  render() {
    const { name, email } = this.state;
    let isDisable = true;
    if (name.length && email.length) isDisable = false;
    return (
      <div className="login-page-body">
        <fieldset className="login-page-fieldset">
          <img src={ triviaImage } alt="triviaImage" className="trivia-image" />
          {this.nameEmailLabels()}
          <Link to="/gaming">
            <button
              className="login-page-enter-button"
              data-testid="btn-play"
              type="button"
              disabled={ isDisable }
              onClick={ this.onButtonClick }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              className="login-page-enter-button"
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </fieldset>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  GetQuestions: () => dispatch(getQuestions()),
});

Login.propTypes = {
  GetQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
