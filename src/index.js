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

// // singolo quadratino
// class Square extends React.Component {
//   constructor(props) {
//     // Nelle classi JavaScript, devi sempre chiamare super quando definisci il costruttore di una sottoclasse (classe derivata). Tutte le classi componente React che hanno un constructor devono sempre richiamare super(props) come prima istruzione nel costruttore.
//     super(props);
//     this.state={
//       // value:null,
//     }

//   }
//   render() {
//     return (
//       // in questo modo arriva come props un oggetto
//       // <button className="square" onClick={()=>{console.log(this.props)}}>
//       // Quando chiamiamo setState in un componente, React aggiorna automaticamente anche i componenti figli al suo interno.
//       // <button className="square" onClick={()=>{this.setState({value:'X'})}}>
//       <button className="square" onClick={()=>{this.props.functionProp()}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

//  componenti funzione sono un modo più semplice di scrivere componenti che hanno il solo metodo render e non mantengono il proprio stato interno

function Square(props) {
  return (
    <button className="square" onClick={props.functionProp}>
      {props.value}
    </button>
  );
}

// faccio il campo
class Board extends React.Component {
  //   constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }
  // handleClick(i){
  //   // console.log(i);
  //   // console.log(this.state.squares);
  //   // why slice, chiamiamo .slice() per creare una copia dell’array squares invece di modificare l’array esistente.
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }    
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   // console.log(squares);
  //   // squares[i] = 'X';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }
  //inizio una funzione che mi crea un quadratino
  renderSquare(i) {
    return(
     <Square 
        value={this.props.squares[i]} 
        functionProp={() => this.props.gameBoard(i)} 
      />
      );
  }

  render() {
    
    // // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
        {/* <div className="status">{status}</div> */}
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }  
  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }  


  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            gameBoard={(i) => this.handleClick(i)}          
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// funzione helper per decidere il vincitore
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    // destrutturazione
    const [a, b, c] = lines[i];
    // verifico che sian tutti dello stesso simbolo
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
