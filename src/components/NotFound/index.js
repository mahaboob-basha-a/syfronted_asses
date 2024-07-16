import React from 'react'
import { Link } from 'react-router-dom'
import notFoundImage from '../../assets/not-found-img.jpg'
import './index.css'

export default function NotFound() {
  return (
    <div className='not-found-page'>
        <img src={notFoundImage} alt='Not Found' />
        <h1 className='text-light'>Page Not Found</h1>
        <Link to='/dashboard'><button className='btn'>Go Back</button></Link>
    </div>
  )
}
