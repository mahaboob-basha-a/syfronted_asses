import React, { useRef, useState } from 'react'
import './index.css'
import { Link, Navigate, useNavigate} from 'react-router-dom'
export default function Register() {
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phoneno,setPhoneno] = useState('')
    const [city,setCity] = useState('')
    const [zipcode,setZipcode] = useState('')
    const splashMsgTwo = useRef()
    const navigate = useNavigate()
    
    const sendUserData = async (userInfo)=>{
        const payload = {
            method:'POST',
            body:JSON.stringify(userInfo)
        }
        const url = 'https://syoft.dev/Api/user_registeration/api/user_registeration'
        const req = await fetch(url,payload)
        const res = await req.text()
        const jsonFirstIndex = res.indexOf('{')
        const jsonLastIndex = res.lastIndexOf('}')
        const jsonLine = res.substring(jsonFirstIndex,jsonLastIndex+1)
        const jsonResponse = JSON.parse(jsonLine)
        console.log(jsonResponse)
        if(jsonResponse.status){
            alert(jsonResponse.msg)
            navigate('/login')
        }else{
            alert(`User ${jsonResponse.msg}`)
        }
    }

    const onRegister = e =>{
        e.preventDefault()
        if(password.length < 6){
            splashMsgTwo.current.classList.remove('d-none')
            splashMsgTwo.current.classList.add('d-block')
            splashMsgTwo.current.textContent = 'Password should atleast 6 characters*'
        }else if (!(fname === '') && !(lname === '') && !(email === '') && !(password === '') && (password.length > 5) && !(phoneno === '') && !(city === '') && !(zipcode === '')){
            const userObj = {user_firstname:fname,user_lastname:lname,user_email:email,user_password:password,user_phone:phoneno,user_city:city,user_zipcode:zipcode}
            splashMsgTwo.current.classList.remove('d-block')
            splashMsgTwo.current.classList.add('d-none')
            sendUserData(userObj)
            setFname('')
            setLname('')
            setEmail('')
            setPassword('')
            setPhoneno('')
            setCity('')
            setZipcode('')
        }
    }
    const userCred = JSON.parse(localStorage.getItem('secuirity_credintials'))
    if(userCred){
        return <Navigate to='/dashboard' />
    }
  return (
    <>
        <div className='register-container'>
        <p ref={splashMsgTwo} className='d-none bg-danger rounded-1 text-light p-1 m-1'></p>
            <div className='register-card'>
                <div className='background-img'>
                    <div className='right-content'>
                    <h1>Welcome to our community</h1>
                    <p>Fuse helps developers to build organised and well coded dashboards full of beautiful and rich modules.</p>
                    </div>   
                </div>
                <div className='form-container'>
                    <h1>Sign Up</h1>
                    <form onSubmit={onRegister}>
                        <div className='input-container'> 
                        <label htmlFor='fname'>First Name</label>
                        <input value={fname} onChange={e=> setFname(e.target.value)} type='text' id='fname' required />
                        </div>

                        <div className='input-container'> 
                        <label htmlFor='lname'>Last Name</label>
                        <input value={lname} onChange={e=> setLname(e.target.value)} type='text' id='lname' required />
                        </div>

                        <div className='input-container'>
                        <label htmlFor='email'>Email</label>
                        <input value={email} onChange={e=> setEmail(e.target.value)} type='email' id='email' required />
                        </div>

                        <div className='input-container'>  
                        <label htmlFor='pass'>Password</label>
                        <input value={password} onChange={e=> setPassword(e.target.value)} type='text' id='pass' required />
                        </div>

                        <div className='input-container'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input value={phoneno} onChange={e=> setPhoneno(e.target.value)} type='text' id='phone' required />
                        </div>

                        <div className='input-container'>
                        <label htmlFor='city'>City</label>
                        <input value={city} onChange={e=> setCity(e.target.value)} type='text' id='city' required />
                        </div>

                        <div className='input-container'>
                        <label htmlFor='zipcode'>Zip Code</label>
                        <input value={zipcode} onChange={e=> setZipcode(e.target.value)} type='text' id='zipcode' required />
                        </div>

                        <div className='checkbox-container'>
                            <input type='checkbox' id='checkbox' required />
                            <label htmlFor='checkbox'>I agree to the <span className='text-primary'>Terms of Service</span> and <span className='text-primary'>Privacy Policy</span></label>
                        </div>

                        <button type='submit' className='submit-btn'>Sign Up</button>
                    </form>
                    <p>Already have an account? <Link to='/login'>Sign In</Link> Now</p>
                </div>
            </div>
        </div>
    </>
  )
}
