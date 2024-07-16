import React, { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './index.css'

export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const splashMsg = useRef()
    const navigate = useNavigate()

    const loginUser = async (userInfo)=>{
        const payload = {
            method:'POST',
            body:JSON.stringify(userInfo)
        }
        const req = await fetch('https://syoft.dev/Api/userlogin/api/userlogin',payload)
        const res = await req.text()
        const jsonFirstIndex = res.indexOf('{')
        const jsonLastIndex = res.lastIndexOf('}')
        const substring = res.substring(jsonFirstIndex,jsonLastIndex+1)
        const jsonResponse = JSON.parse(substring)
        if (jsonResponse.status){
            const userArr = jsonResponse.user_data
            localStorage.setItem('secuirity_credintials',JSON.stringify(userArr))
            alert('Sign In Success...')
            splashMsg.current.classList.add('d-none')
            navigate('/dashboard')
        }else{
            splashMsg.current.classList.remove('d-none')
            splashMsg.current.textContent = `${jsonResponse.msg}`
            splashMsg.current.classList.add('d-block')
            splashMsg.current.classList.add('bg-success')
        }
    }

    const onLogin = e =>{
        e.preventDefault()
        if (email === ''){
            splashMsg.current.classList.remove('d-none')
            splashMsg.current.textContent = 'Email Required*'
            splashMsg.current.classList.add('d-block')
            splashMsg.current.classList.add('bg-danger')
        }else if(password === '' || password.length < 6){
            splashMsg.current.classList.remove('d-none')
            splashMsg.current.textContent = 'Valid Password Required*'
            splashMsg.current.classList.add('d-block')
            splashMsg.current.classList.add('bg-danger')
        }else{
            const userObj = {user_email:email,user_password:password}
            splashMsg.current.classList.add('d-none')
            loginUser(userObj)
            setEmail('')
            setPassword('')
        }
    }
    const userCred = JSON.parse(localStorage.getItem('secuirity_credintials'))
    if(userCred){
        return <Navigate to='/dashboard' />
    }
  return (
     <>
     <div className='register-container'>
            <p ref={splashMsg} className='d-none rounded-1 text-light p-1 m-1'></p>
            <div className='register-card'>
                <div className='background-img'>
                    <div className='right-content'>
                    <h1>Welcome to our community</h1>
                    <p>Fuse helps developers to build organised and well coded dashboards full of beautiful and rich modules.</p>
                    </div>   
                </div>
                <div className='form-container-login'>
                    <h1>Sign In</h1>
                    <form onSubmit={onLogin}>
                        <div className='input-container-login'>
                        <label htmlFor='email'>Email</label>
                        <input value={email} onChange={e=> setEmail(e.target.value)} type='email' id='email' />
                        </div>

                        <div className='input-container-login'>  
                        <label htmlFor='pass'>Password</label>
                        <input value={password} onChange={e=> setPassword(e.target.value)} type='text' id='pass' />
                        </div>

                        <div className='checkbox-container-login'>
                            <input type='checkbox' id='checkbox' required />
                            <label htmlFor='checkbox'>I agree to the <span className='text-primary'>Terms of Service</span> and <span className='text-primary'>Privacy Policy</span></label>
                        </div>

                        <button type='submit' className='submit-btn-login'>Sign In</button>
                    </form>
                    <p>You don't have an account? <Link to='/register'>Sign Up</Link> Now</p>
                </div>
            </div>
        </div>
     </>
  )
}
