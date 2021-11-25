import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  componentDidUpdate(prevProps) {
    const { time } = this.props;
    if (prevProps.time !== time) {
      this.getInfo();
    }
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
          <p>
            Jogador:
            <span data-testid="header-player-name">{ name }</span>
          </p>
        </div>
        <p>
          Pontos:
          <span data-testid="header-score">{ score }</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ myReducer: { time } }) => ({ time });

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  time: PropTypes.number.isRequired,
};
