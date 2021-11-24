import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      email: '',
    };
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
      <div>
        <input
          data-testid="input-player-name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ isDisable }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
