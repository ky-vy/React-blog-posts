import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Header.css'

const Header = props => {
  const className = props.colored ? 'Colored' : ''
  const button = () => {
    switch (props.button) {
      case 'Add':
        return <Link to="/posts/new">Add new</Link>
      case 'Cancel':
        return <Link to="/">Cancel</Link>
      default:
        return <Link to="/posts/new">Add new</Link>
    }
  }
  return (
    <header className={className}>
      <div className="container">
        <div className="header">
          <h3 className="logo">BLOG POSTS</h3>
          <div className="btn1">{button()}</div>
        </div>
      </div>
    </header>
  )
}

export default Header
