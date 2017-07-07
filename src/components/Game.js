import React from 'react';
import Stars from './Stars';
import GameButton from './GameButton';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';
import { Container, Divider } from 'semantic-ui-react';

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  static initialState = () => ({
    selectedNumbers: [],
    usedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null,
  })

  state = Game.initialState();

  resetGame = () => this.setState(Game.initialState());

  selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  }

  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  }

  checkAnswer = () => {
    console.log(this.state.selectedNumbers.reduce((acc, n) => acc + n, 0))
    console.log(this.state.numberOfStars)
    this.setState( prevState => ({
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
    }), this.updateDoneStatus);
  }

  redraw = () => {
    if(this.state.redraws === 0) { return; }
    this.setState( prevState => ({
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers: [],
      redraws: prevState.redraws - 1,
    }), this.updateDoneStatus);
  }

  updateDoneStatus = () => {
    this.setState( prevState => {
      if( prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done. Nice!' };
      }
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game Over!' };
      }
    });
  }

  possibleSolutions = ({ numberOfStars, usedNumbers }) => {
    var possibleCombinationSum = function(arr, n) {
      if (arr.indexOf(n) >= 0) { return true; }
      if (arr[0] > n) { return false; }
      if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
      }
      var listSize = arr.length, combinationsCount = (1 << listSize)
      for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
          if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
      }
      return false;
    };
    const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(number =>
      usedNumbers.indexOf(number) === -1 
    );

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  render() {
    const { numberOfStars, selectedNumbers, answerIsCorrect, 
      usedNumbers, redraws, doneStatus } = this.state;
    return(
      <div>
      <Container>
          <h3>Play Nine</h3>
          <Divider />
          <Stars numberOfStars={ numberOfStars }/>
          <GameButton 
            selectedNumbers={ selectedNumbers } 
            checkAnswer={ this.checkAnswer }
            answerIsCorrect={ answerIsCorrect }
            acceptAnswer={ this.acceptAnswer }
            redraw={ this.redraw }
            redraws={ redraws }
          />
          <Answer 
            selectedNumbers={ selectedNumbers }
            unselectNumber={ this.unselectNumber }
          />
          <br />
          { doneStatus ? 
            <DoneFrame 
              doneStatus={ doneStatus } 
              resetGame={ this.resetGame }
            /> :
            <Numbers 
              selectedNumbers={ selectedNumbers } 
              selectNumber={ this.selectNumber }
              usedNumbers={ usedNumbers }
            />
          }
          <br />  
        </Container>
      </div>
    )
  }
}

export default Game;