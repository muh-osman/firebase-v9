import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth, googleProvider } from './config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { async } from "@firebase/util";



export default function Profile() {

    const [alertMsg, setAlertMsg] = useState("")
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [imgSrc, setImgSrc] = useState("")

    function setData() {
        setEmail(auth?.currentUser?.email)
        setImgSrc(auth?.currentUser?.photoURL)
    }


    useEffect(() => {
        setData()
    }, [])
    

    const logout = async (event) => {
        try {
          await signOut(auth)
          navigate("/signin");
        } catch (error) {
          setAlertMsg(error)
          console.log(alertMsg)
        }
      }

  return (
    <>
        <h1>Profile</h1>
        <h2>{email}</h2>
        <img src={imgSrc} alt="" />
        <button onClick={() => {logout()}}>LogOut</button>
    </>
  )
}