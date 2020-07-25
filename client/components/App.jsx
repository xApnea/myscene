import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      profilePicture: '',
      audio: [],
      video: '',
      top5: []
    }
  }

  render() {
    return (
      <div>App</div>
    )
  }
}
export default App;