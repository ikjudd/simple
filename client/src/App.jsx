import React, { Component } from 'react'
import ReactDOM from 'react';
import '/src/style.css';
import SpotifyWebApi from 'spotify-web-api-js'
import Header from './Header.jsx'
import Search from './Search.jsx'
// import Player from './Player.jsx'
// instantiate the spotifyapi component
const spotifyWebApi = new SpotifyWebApi();

const SpotifyLogin = () => {

    return (
        <div className='spotify-login grid'>
        <a href="http://localhost:8888">
        <button>Login With Spotify</button>
        </a>
        </div>
    )
}



class App extends Component {
    constructor(){
        super()
        const params = this.getHashParams();
        // if theres an access token available we'll set the accesstoken within
        // the web api obj bc it's necessary to make request
        const token = params.access_token
        if (token){
            spotifyWebApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            name: null,
            image: null
        }
        this.getNowPlaying = this.getNowPlaying.bind(this)
        this.getHashParams = this.getHashParams.bind(this)
        // if(params.access_token){
        //     spotifyWebApi.setAccessToken(params.access_token)
        // }
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }

      getNowPlaying(){
        //   use a native method for the api to find out what's currently playing
       const currentTrack = spotifyWebApi.getMyCurrentPlayingTrack()
       console.log(currentTrack.item)

       spotifyWebApi.getMyCurrentPlayingTrack()
       .then( (res) => {
            this.setState({
                ...this.state,
                name: res.item.name,
                image: res.item.album.images[0]
            })
       })

        // .then((response) => {
        //     console.log('response is: ' + response)
        //     // we will then set state on a promise
        //     this.setState({
        //            ...this.state,
        //             name: response.item.name,
        //             image: response.item.album.images[0].url
        //     })

        // })

      }
  
    render(){
        console.log('our current state is ' + this.state)
        console.log(this.state)
        return(
            <div className="App">

                <Header />
               
               <div className='login grid'>
               {!this.state.loggedIn && 
                <SpotifyLogin />
               
               }
               
               <div className='search grid'>
               
                   {this.state.loggedIn &&
                   <Search />}         
                {this.state.name &&                 
               <div className='grid-item content grid'> Now Playing: { this.state.name }</div>
                }
               {this.state.name && this.state.image &&
               <div className='content image'>
                   <img src={`${this.state.image.url}`} style={{width:450}}/>
                   </div>}
               {this.state.loggedIn && 
               <button className='nowPlaying grid' onClick={() => this.getNowPlaying()} >
                   Check Now Playing
               </button>
               }
               
               
               </div>
               
               </div>
            
            </div>
        )
    }
}

export default App

               {/* <div className='media-player'>
               <Player /> 
                </div> */}