import React from 'react';
import { Icon } from 'semantic-ui-react';

const Stars = (props) => {
  let stars = [];
  for( let i = 0; i < props.numberOfStars; i++ ) {
    stars.push( <Icon name='star' size='big' /> );
  }

  return(
    <div>
      { stars }
    </div>
  )
}

export default Stars;