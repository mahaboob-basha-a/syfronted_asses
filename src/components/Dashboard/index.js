import React from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import profile from '../../assets/profile.png'
import './index.css'

export default function Dashboard() {
    const navgate = useNavigate()
    const userCred = JSON.parse(localStorage.getItem('secuirity_credintials'))
    if(!userCred){
        return <Navigate to='/login' />
    }

    const converting = obj =>{
      const parsedObj = {
        userId:obj[0].user_id,
        userFirstname:obj[0].user_firstname,
        userCity:obj[0].user_city,
        userEmail:obj[0].user_email,
        userPhone:obj[0].user_phone,
        userZipcode:obj[0].user_zipcode
      }
      return parsedObj
    }
    const onLogout = () =>{
      localStorage.removeItem('secuirity_credintials')
      return navgate('/login')
    }
    const userObjInfo = converting(userCred)
    const {userId,userFirstname,userEmail,userPhone,userCity,userZipcode} = userObjInfo
  return (
    <>
      <div className='dashboard-page'>
          <div className='dashboard-proflile-card'>
              <img src={profile} alt='proflile' />
              <h1>Hello, {userFirstname}</h1>
              <div>
                <p className='border-bottom'><span className='fw-medium'>User Id : </span>{userId}</p>
                <p className='border-bottom'><span className='fw-medium'>Email : </span>{userEmail}</p>
                <p className='border-bottom'><span className='fw-medium'>Phone : </span>{userPhone}</p>
                <p className='border-bottom'><span className='fw-medium'>City : </span>{userCity}</p>
                <p className='border-bottom'><span className='fw-medium'>Zipcode : </span>{userZipcode}</p>
              </div>
              <button onClick={onLogout} className='btn btn-outline-danger'>LogOut</button>
          </div>
      </div>
    </>
  )
}
