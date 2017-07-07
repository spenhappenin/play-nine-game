import React from 'react';

const Answer = (props) => (
  <div>
    { props.selectedNumbers.map( (number, i) => 
      <span 
        key={i} 
        onClick={ () => props.unselectNumber(number) }
      >
        { number }
      </span>
    ) }
  </div>
)

export default Answer;