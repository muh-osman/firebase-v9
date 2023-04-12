import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth, db } from './config/firebase' //me
import { signOut } from 'firebase/auth'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'



export default function Profile() {

  // Authentication
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [imgSrc, setImgSrc] = useState("") //When login with Google account Only

    // Get data from FireStore
    const noteCollection = collection(db, "Notes")
    const [noteList, setNoteList] = useState([])
    const getNoteList = async () => {
      try {
        const data = await getDocs(noteCollection)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setNoteList(filteredData)

      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        setEmail(auth?.currentUser?.email)
        setImgSrc(auth?.currentUser?.photoURL)

        getNoteList()
    }, [])

    // Set data to FireStore
    const [newNote, setNewNote] = useState("")
    const addNewNote = async () => {
      try {
        await addDoc(noteCollection, {
          noteTitle: newNote,
          userId: auth?.currentUser?.uid,
          // allow read, create, update, delete: if request.auth != null && request.auth.uid == request.resource.data.userId;

        })
        document.getElementById('new_Note_Input').value = ''
        getNoteList() //Refresh
      } catch (error) {
        console.log(error)
      }
    }

    // Delete Note
    const deleteNote = async (id) => {
      const noteDoc = doc(db, 'Notes', id)
      try {
        await deleteDoc(noteDoc)
        getNoteList() //Refresh
      } catch (error) {
        console.log(error)
      }
    }
    // Update Note
    const [editedNoteTitle, setEditedNoteTitle] = useState("")
    const updateNoteTitle = async (id) => {
      const noteDoc = doc(db, 'Notes', id)
      try {
        await updateDoc(noteDoc, {
          noteTitle: editedNoteTitle
        })
        getNoteList() //Refresh
      } catch (error) {
        console.log(error)
      }
    }

    // LogOut
    const logout = async (event) => {
        try {
          await signOut(auth)
          navigate("/");

        } catch (error) {
          console.log(error)
        }
      }

  return (
    <>
        <h1>Profile</h1>
        <h2>Hello: {email}</h2>
        <img src={imgSrc} alt="" />
        <button onClick={() => {logout()}}>LogOut</button>

        <input id="new_Note_Input" type="text" onChange={(e)=>{setNewNote(e.target.value)}} />
        <button onClick={()=>{addNewNote()}}>Send</button>

        {noteList.map((note) => (
          <div key={note.noteTitle} style={{backgroundColor: "gray"}}>
            <h2>{note.noteTitle}</h2>
            <button onClick={() => deleteNote(note.id)}> Delete </button>

            <input onChange={(e)=>{setEditedNoteTitle(e.target.value)}} type="text" />
            <button onClick={()=>{updateNoteTitle(note.id)}}>Edit</button>
          </div>
        ))}
    </>
  )
}