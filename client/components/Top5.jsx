import React from 'react';
import styled from 'styled-components';

const Username = styled.a`
  color: #bebebe;
`

function Top5(props) {

  var users = props.top5.map((username, index) => {
    return <li key={index} onClick={props.handleUserClick}><Username href="http://localhost:3000/?username=tom">{username}</Username></li>
  })
  return(
    <div>
      <h2>Top 5:</h2>
      <ul>
        {users}
      </ul>
    </div>
  )
}

export default Top5;