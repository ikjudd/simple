import React from 'react'
import Header from './Header.jsx'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div>
            <Header />
            Page not found. Goto <Link to="http://localhost:3000">Home Page</Link>
        </div>
    )
}
