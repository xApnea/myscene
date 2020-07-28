import React from 'react';

function Top5(props) {

  var users = this.props.top5.map((user, index) => {
    <li key={index} onClick={this.props.handleTopUserClick}>user.name</li>
  })
  return(
    <ul>
      {users}
    </ul>
  )
}

export default Top5;