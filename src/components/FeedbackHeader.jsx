import React, { Component } from 'react';
import { getLocalStorageItens, getImage } from '../services/funcs';

class Header extends Component {
  constructor(props) {
    super(props);

    this.getInfo = this.getInfo.bind(this);

    this.state = {
      name: '',
      email: '',
      img: '',
      score: 0,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    const { email } = this.state;
    const { player: { name, gravatarEmail, score } } = getLocalStorageItens();
    const img = await getImage(email);
    this.setState({ name, email: gravatarEmail, score, img });
  }

  render() {
    const { name, score, img } = this.state;
    return (
      <header>
        <div>
          <img src={ img } alt="avatar" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">
            Nome:
            <span data-testid="header-player-name">
              { name }
            </span>
          </p>
        </div>
        <div>
          <p>
            Pontos:
            <span data-testid="header-score">
              { score }
            </span>
          </p>
        </div>
      </header>
    );
  }
}

export default Header;
