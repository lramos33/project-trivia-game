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
      <header className="header-component">
        <div className="player-data">
          <img
            src={ img }
            alt="avatar"
            data-testid="header-profile-picture"
            className="avatar-image"
          />
          <p data-testid="header-player-name">{ `Jogador: ${name}` }</p>
        </div>
        <p data-testid="header-score">{ `Pontos: ${score}` }</p>
      </header>
    );
  }
}

export default Header;
