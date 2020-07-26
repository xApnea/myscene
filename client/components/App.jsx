import React from 'react';
import styled from 'styled-components';
//import AudioPlayer from 'react-audio-player';

const Container = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  grid-gap: 15px;
  justify-content: center;
`;

const Title = styled.div`
  grid-column: 1 / 4;
  grid-row: 1;
  padding-left: 20px;
`;

const One = styled.div`
  grid-column: 1;
  padding-left: 20px;
`;

const Two = styled.div`
  grid-column: 2;
`;

const Three = styled.div`
  grid-column: 3;
  padding-right: 20px;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      profilePicture: 'https://picsum.photos/300/400',
      audio: [],
      activeSong: 'https://madtown.band/wp-content/uploads/2020/01/1.-Lucid-Vision.wav?_=1',
      video: '',
      top5: []
    }
  }

  render() {
    return (
      <Container>
        <Title>
          <h1>myscene.com</h1>
        </Title>
        <One>
          <div>
            <img src={this.state.profilePicture}></img>
          </div>
          <button>Upload New Profile Picture</button>
          <div>
            Top 5
          </div>
        </One>
        <Two>
          <audio
            controls
            src={this.state.activeSong}
          />
          <SongList/>
        </Two>
        <Three>
          <div><iframe width="560" height="315" src="https://www.youtube.com/embed/ys01UvI4LVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        </Three>
      </Container>
    )
  }
}
export default App;