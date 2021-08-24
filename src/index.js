import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   // Strict mode checks are run in development mode only
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// singolo quadratino
class Square extends React.Component {
  constructor(props) {
    // Nelle classi JavaScript, devi sempre chiamare super quando definisci il costruttore di una sottoclasse (classe derivata). Tutte le classi componente React che hanno un constructor devono sempre richiamare super(props) come prima istruzione nel costruttore.
    super(props);
    this.state={
      value:null,
    }

  }
  render() {
    return (
      // in questo modo arriva come props un oggetto
      // <button className="square" onClick={()=>{console.log(this.props)}}>
      // Quando chiamiamo setState in un componente, React aggiorna automaticamente anche i componenti figli al suo interno.
      <button className="square" onClick={()=>{this.setState({value:'X'})}}>
        {this.state.value}
      </button>
    );
  }
}
// faccio il campo
class Board extends React.Component {
  //inizio una funzione che mi crea un quadratino
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: Foo';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
