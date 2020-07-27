import React from 'react';

import styled from 'styled-components';
import axios from 'axios';

//import Audio from './Audio.jsx';
//import ProfilePicture from './ProfilePicture.jsx';
import Top5 from './Top5.jsx';
//import Youtube from './Youtube.jsx';

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
  grid-row: 2;
  padding-left: 20px;
`;

const Two = styled.div`
  grid-column: 2;
  grid-row: 2;
`;

const Three = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-right: 20px;
`;

const Bottom = styled.div`
  grid-column: 1 / 4;
  grid-row: 3;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'John Bruno',
      profilePicture: 'https://picsum.photos/300/400',
      audio: [],
      activeSong: {src: 'https://madtown.band/wp-content/uploads/2020/01/1.-Lucid-Vision.wav?_=1', title: 'Lucid Vision', artist: 'Madtown'},
      video: 'https://www.youtube.com/embed/ys01UvI4LVg',
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
            <h2>{this.state.name}</h2>
            <img src={this.state.profilePicture}></img>
          </div>
          <button onClick={this.handleProfilePictureUpload}>Upload New Profile Picture</button>
        </One>

        <Two>
          <div>
            <audio
              controls
              src={this.state.activeSong}
            />
          </div>
          <div>
            <ul>
              <li>{this.state.activeSong.title} - {this.state.activeSong.artist}</li>
            </ul>
          </div>
        </Two>

        <Three>
          <div>
            <Top5 top5={this.state.top5}/>
          </div>
        </Three>

        <Bottom>
          <div><iframe width="560" height="315" src={this.state.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
        </Bottom>
      </Container>
    )
  }
}
export default App;