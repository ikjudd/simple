import React, { Component , useState, useEffect} from 'react'
import ReactDOM from 'react';
import '/src/style.css';
import Spotify from 'spotify-web-api-js'

export default function Search({code}){
    return (
        <div className='search grid'>
            <input className='input grid-item' placeholder="What would you like to listen to?" 
            />
        </div>
    )
}