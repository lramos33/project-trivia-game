import React, { Component } from 'react';
import Header from '../components/Header';
import { getLocalStorageItens } from '../services/funcs';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
    };
  }

  componentDidMount() {
    this.getInformation();
  }

  // Define qual vai ser a mensagem de feedback e add ao estado
  getInformation() {
    const { player: { assertions } } = getLocalStorageItens();
    const three = 3;
    const feedback = assertions < three ? 'Podia ser melhor...' : 'Mandou bem!';
    this.setState({ feedback });
  }

  render() {
    const { feedback } = this.state;
    return (
      <>
        <Header />
        <div>
          <h2 data-testid="feedback-text">
            { feedback }
          </h2>
        </div>
      </>
    );
  }
}

export default Feedback;
