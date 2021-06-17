import React, { Component } from 'react'
import ReactDOM from 'react';
import '/src/style.css';
import Spotify from 'spotify-web-api-js'

export default function Search(){
    return (
        <div className='search grid'>
            <input className='input grid-item' placeholder="What else?" 
            // value={search}
            // onChange={e => setSearch(e.target.value)}
            />
        </div>
    )
}