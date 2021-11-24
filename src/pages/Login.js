import React, { Component } from 'react';
import { addLocalStorage, getToken } from '../services/funcs';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      name: '',
      email: '',
    };
  }

  onButtonClick() {
    const { name, email } = this.state;
    addLocalStorage(name, email);
    getToken();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    let isDisable = true;
    if (name.length && email.length) {
      isDisable = false;
    }
    return (
      <body className="login-page-body">
        <fieldset className="login-page-fieldset">
          <label htmlFor="name" className="login-page-label">
            Nome:
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
            Email:
            <input
              className="login-page-input"
              data-testid="input-gravatar-email"
              id="Email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="login-page-enter-button"
            data-testid="btn-play"
            type="button"
            disabled={ isDisable }
            onClick={ this.onButtonClick }
          >
            Jogar
          </button>
        </fieldset>
      </body>
    );
  }
}

export default Login;
