import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// React icons
import { BsApple } from 'react-icons/bs';
import { BsMicrosoft } from 'react-icons/bs';
import { BsGoogle } from 'react-icons/bs';
// MUI
import Alert from '@mui/material/Alert';
// Firebase
import { auth, googleProvider } from './config/firebase' //Me
import { signInWithPopup } from 'firebase/auth'




export default function GetStarted() {

    const [alertMsg, setAlertMsg] = useState(null)
    let alert = <Alert sx={{ mt: 2 }} variant="outlined" severity="error">{`${alertMsg}`}</Alert>


    const navigate = useNavigate();

    // Signin With Google Button
    const signInWithGoogle = async (event) => {

      try {
        await signInWithPopup(auth, googleProvider)
        const user = auth.currentUser;
        if (user) {
          navigate("/profile");
        }
        
      } catch (error) {
        setAlertMsg(error.code)
      }
    }


  return (
    <div className='get_started_container'>
      <h1>Get started</h1>

      {alertMsg ? alert : null}

      <div className='continue_with_btn'>
        {/* Apple */}
        <button> <BsApple style={{fontSize: '34px'}}/> Continue with Apple</button>
        {/* Microsoft */}
        <button> <BsMicrosoft/> Continue with Microsoft</button>
        {/* Google */}
        <button onClick={()=>{signInWithGoogle()}}> <BsGoogle/> Continue with Google</button>
      </div>

      <h2>Or use your email to <Link to='/signup'>sign up</Link> or <Link to='/login'>log in</Link> </h2>
    </div>
  );
}
