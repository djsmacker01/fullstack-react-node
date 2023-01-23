import React from 'react'
import { Link } from 'react-router-dom'

export default function nav() {
  return (
    <div>
      <Link to='/'>Home</Link> {` | `}
      <Link to='/users'>Users</Link> {` | `}
      <Link to='/register'>Register</Link>
    </div>
  )
}
