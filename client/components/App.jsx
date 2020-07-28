import React from 'react';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import axios from 'axios';

//import Audio from './Audio.jsx';
import Top5 from './Top5.jsx';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: #292d3e;
    color: #bebebe;
    font-family: 'Bitter', serif;
  }
  input[type="file"] {
    display: none;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  grid-gap: 30px;
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
  padding-left: 50px;
  justify-content: center;
`;

const Two = styled.div`
  grid-column: 2;
  grid-row: 2;
  justify-content: center;
`;

const Three = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-right: 50px;
  justify-content: center;
`;

const Bottom = styled.div`
  grid-column: 1 / 4;
  grid-row: 3;
`;

const Submit = styled.button`
  background-color: #5c0b0b;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
`

const ChooseAvatar = styled.label`
  background-color: #bebebe;
  border: none;
  color: #292d3e;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
`

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      params: '',
      user: {},
      username: '',
      avatar: '',
      audio: [],
      activeSong: {src: '', title: '', artist: ''},
      top5: [],
    }
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
  }

  componentDidMount() {
    // Make a request for a user with a given ID
    this.getUser();
  }

  getUser() {
    const params = this.getUrlParams();
    if (!params.username) {
      alert('No username is present in the url.');
    } else {
      const path = `http://localhost:3000/api/user?username=${params.username}`
      axios.get(path)
        .then((response) => {
          const data = response.data[0];

          if (!data.audio[0]) {
            data.audio[0] = {src: '', title: '', artist: ''}
          }
          console.log(data);
          this.setState({
            user: data,
            username: data.username,
            avatar: data.avatar,
            audio: data.audio,
            activeSong: data.audio[0],
            top5: data.top5
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }
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
      this.getUser();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <Container>
      <GlobalStyle/>
        <Title>
          <h1>myscene.com</h1>
        </Title>

        <One>
          <div>
            <h2>{this.state.username}</h2>
            <img src={this.state.avatar}></img>
          </div>
          <div>
            <form onSubmit={this.handleAvatarUpload} name="avatar" encType="multipart/form-data">
              <ChooseAvatar htmlFor="file-upload">
                  Choose Avatar
              </ChooseAvatar>
              <input id="file-upload" type="file" onChange={this.handleAvatarChange}></input>
              <Submit type="submit">Upload Avatar</Submit>
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
            <Top5 top5={this.state.top5}/>
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