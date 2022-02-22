import React, { Component, useState } from "react";
import ReactDOM from "react";
import "/src/style.css";
import SpotifyWebApi from "spotify-web-api-js";
import Header from "./Header.jsx";
import Search from "./Search.jsx";
import SpotifyPlayer from "react-spotify-web-playback";

// import Player from './Player.jsx'
// instantiate the spotifyapi component
const spotifyWebApi = new SpotifyWebApi();

const SpotifyLogin = () => {
  return (
    <div className="spotify-login grid">
      <a href="http://localhost:8888">
        <button>Login With Spotify</button>
      </a>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    // if theres an access token available we'll set the accesstoken within
    // the web api obj bc it's necessary to make request
    const token = params.access_token;
    if (token) {
      spotifyWebApi.setAccessToken(token);
    }

    this.state = {
      id: null,
      clicked: false,
      loggedIn: token ? true : false,
      artist: null,
      name: null,
      image: null,
      searchResults: [],
      currentlyListening: null,
    };

    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.getHashParams = this.getHashParams.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.openPlayer = this.openPlayer.bind(this);
  }

  // our hashing algo provided by spotify

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  //   use a native method for the api to find out what's currently playing

  getNowPlaying() {
    const currentTrack = spotifyWebApi.getMyCurrentPlayingTrack();
    console.log(currentTrack.item);

    spotifyWebApi.getMyCurrentPlayingTrack().then((res) => {
      console.log(res.item);
      this.setState({
        ...this.state,
        name: res.item.name,
        image: res.item.album.images[0],
      });
    });
  }

  //   handling event of enter key

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.setState({
        ...this.state,
        search: event.target.value,
      });

      let cancel = false;

      spotifyWebApi
        .searchTracks(event.target.value, { limit: 5, offset: 10 })
        .then((res) => {
          console.log(res.tracks.items);
          if (cancel) return;
          this.setState({ ...this.state, searchResults: res.tracks.items });
        });
      // make the request, and if a new request is made in this time period, then cancel that request
      return () => (cancel = true);
    }
  };

  openPlayer = (e) => {
    this.setState({
      ...this.state,
      clicked: true,
      id: e.target.id,
      currentlyListening: e.target.innerHTML,
    });
    console.log("hello", e.target.innerHTML);
  };

  render() {
    console.log("this is our data ", this.state.searchResults.artists);

    const params = this.getHashParams();
    const token = params.access_token;
    return (
      <div className="App">
        <Header />

        <div className="login grid">
          {!this.state.loggedIn && <SpotifyLogin />}

          <div className="search grid">
            {this.state.loggedIn && (
              <div onKeyDown={this.handleKeyDown}>
                <Search />
              </div>
            )}

            {this.state.clicked && (
              <div className="display grid" style={{ width: 400 }}>
                {/* {this.state.searchResults[this.state.id].uri} */}
                <SpotifyPlayer
                  token={token}
                  uris={[this.state.searchResults[this.state.id].uri]}
                  styles={{
                    bgColor: "#000000",
                    color: "#dbdbdb",
                    sliderHandleColor: "#dbdbdb",
                    sliderColor: "yellowgreen",
                    sliderTrackColor: "#000000",
                    trackNameColor: "#dbdbdb",
                    "font-family": "'Helvetica Neue', sans-serif",
                    "margin-bottom": "20px",
                  }}
                />
              </div>
            )}
            {/* ~~~~~~SEARCH BAR AND RESULTS ~~~~~~*/}

            {this.state.loggedIn && this.state.searchResults && (
              <div className="display grid" style={{ cursor: "pointer" }}>
                {this.state.searchResults.map((result, i) => (
                  <p onClick={(e) => this.openPlayer(e)} key={i} id={i}>
                    {result.artists[0].name} - {result.name}
                  </p>
                ))}
              </div>
            )}

            {/* SUGGESTED SONG COMPONENT */}

            {this.state.name && (
              <div
                className="grid-item content grid"
                style={{ "margin-bottom": "20px" }}
              >
                You are now listening to {this.state.currentlyListening}, enjoy!
              </div>
            )}

            {this.state.name && this.state.image && (
              <div className="content image">
                <img src={`${this.state.image.url}`} style={{ width: 250 }} />
              </div>
            )}

            {this.state.loggedIn && this.state.clicked && (
              <button
                className="nowPlaying grid"
                onClick={() => this.getNowPlaying()}
              >
                Need a track ID?
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
