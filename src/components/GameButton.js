import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const GameButton = (props) => {
  let button;
  
  switch(props.answerIsCorrect) {
    case true:
      button = <Button 
                  color='green'
                  onClick={ props.acceptAnswer }
                >
                  <Icon name='checkmark' />
                </Button>
      break;
    case false:
      button = <Button color='red'><Icon name='remove' /></Button>
      break;
    default:
      button = <Button 
                  primary 
                  disabled={ props.selectedNumbers.length === 0 }
                  onClick={ props.checkAnswer }
                  > 
                    =
                </Button>
      break;
  }

  return(
    <div>
      { button }
      <Button 
        color='orange'
        onClick={ props.redraw } 
        disabled={ props.redraws === 0 }
      > 
        <Icon name='refresh' /> 
        { props.redraws }
      </Button>
    </div>
  )
}

export default GameButton;