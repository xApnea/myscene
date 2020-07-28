import React from 'react';

import styled from 'styled-components';
import axios from 'axios';

//import Audio from './Audio.jsx';
//import Top5 from './Top5.jsx';
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
      avatar: 'https://picsum.photos/300/400',
      audio: [],
      activeSong: {src: 'https://madtown.band/wp-content/uploads/2020/01/1.-Lucid-Vision.wav?_=1', title: 'Lucid Vision', artist: 'Madtown'},
      video: 'https://www.youtube.com/embed/ys01UvI4LVg',
      top5: [],
    }
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
  }

  getUrlParams() {
    const url = window.location.href;
    console.log("The URL of this page is: " + url);
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  handleAvatarChange(event) {
    this.setState({ selectedImage: event.target.files[0] });
  };

  handleAvatarUpload(event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append(
      "avatar",
      this.state.selectedImage,
    );

    const params = this.getUrlParams();
    axios({
      method: 'post',
      url: `/api/avatar?username=${params.username}`,
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      }
    })
    .then((response) => {
      console.log(response);
      // re-get the data
    })
    .catch((error) => {
      console.error(error);
    });
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
            <img src={this.state.avatar}></img>
          </div>
          <div>
            <form onSubmit={this.handleAvatarUpload} name="avatar" encType="multipart/form-data">
              <input type="file" onChange={this.handleAvatarChange}></input>
              <button type="submit">Upload Avatar</button>
            </form>
          </div>
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
            {/* <Top5 top5={this.state.top5}/> */}
          </div>
        </Three>

        <Bottom>
          {/* <div><iframe width="560" height="315" src={this.state.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div> */}
        </Bottom>
      </Container>
    )
  }
}
export default App;