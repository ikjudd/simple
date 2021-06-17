import React, { Component, useState } from 'react'
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

// PROBLEM TO FIX 6-20
    // created nested state property containing search results
    // need to access that nested property / the props inside
    // adjusted setstate to attempt to set the searchResults prop in state
    // tried mapping state.searchResults since this.state.map doesn't cut it
    // this.state.searchResult does access props inside of that nested prop
    // declared a const searchArray and assigned it to the nested prop on the state

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
            image: null,
            searchResults: {
                search: null,
                artist: null,
                title: null,
                uri: null
            }
        }
        this.getNowPlaying = this.getNowPlaying.bind(this)
        this.getHashParams = this.getHashParams.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

 

    // our hashing algo provided by spotify
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
    }

    //   handling event of enter key
      handleKeyDown = (event) => {

        if (event.key === 'Enter') {
            this.setState({
                ...this.state,
                search: event.target.value
            })

            let cancel = false;
            
            spotifyWebApi.searchTracks(`artist: ${this.state.search}`, {limit: 5, offset: 10})
            .then((res) => {
                console.log(res.tracks.items)
                if (cancel) return;
                res.tracks.items.map( (track) => {
                    // const smallestImage = track.album.images.reduce(
                    //     (smallest, image) => {
                    //         image.height < smallest.height ? image : smallest
                    //     }, track.album.images[0])
                    this.setState({
                        ...this.state,
                        searchResults:{

                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            // albumUrl: smallestAlbumImage.url
                        }
                    })
                    }
                )
        })
        // make the request, and if a new request is made in this time period, then cancel that request
        return () => cancel = true;
      }
}
    


    render(){

        console.log('this is our artist ' + this.state.searchResults.artist)
        console.log('this is our song ', this.state.searchResults.title)
        console.log('this is the uri ', this.state.searchResults.uri)
        const searchArray = Array.from(this.state)
        console.log(searchArray)

        return(
            <div className="App">

                <Header />
               <div className='login grid'>
               {!this.state.loggedIn && 
                <SpotifyLogin />
               }

               <div className='search grid'>
                   {this.state.loggedIn &&
                   <div onKeyDown={this.handleKeyDown}>
                   <Search />
                   </div>}
{/* 
                {this.state.loggedIn && this.state.searchResults.artist &&
                <div className='display grid'>{searchArray.searchResults.map(result => 
                    <p>{this.state.searchResults.artist} ~ {this.state.searchResults.title}</p>
                    )}</div>
                }     */}

                {this.state.name &&                 
               <div 
               className='grid-item content grid'> 
               Now Playing: { this.state.name }
               </div>
                }

               {this.state.name && this.state.image &&
               <div 
               className='content image'>
                   <img 
                   src={`${this.state.image.url}`} 
                   style={{width:450}}/>
                   </div>}

               {this.state.loggedIn && 
               <button 
               className='nowPlaying grid' 
               onClick={() => this.getNowPlaying()} >
                   Check Now Playing
               </button>
               }

               </div>
               
               </div>
            
            </div>
        )
}}

export default App;

               {/* <div className='media-player'>
               <Player /> 
                </div> */}