import React from 'react';
import { Button } from 'semantic-ui-react';

const DoneFrame = (props) => {
  return(
    <div>
      <h2>{ props.doneStatus }</h2>
      <Button secondary onClick={ props.resetGame }>Play Again</Button>
    </div>
  )
}

export default DoneFrame;