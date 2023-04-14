import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth, db } from './config/firebase' //me
import { signOut } from 'firebase/auth'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'



export default function Profile() {

  // LogOut
    const navigate = useNavigate();
    const logout = async (event) => {
      try {
        await signOut(auth)
        navigate("/");
        
      } catch (error) {
        console.log(error)
      }
    }
    
    // Authentication
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
        document.getElementById('edit_input').value=""
      } 
      catch (error) {
        console.log(error)
      }
    }



  return (
    <>
        <div className="profile_header">
          <h1>Profile Page</h1>
          <div className="profile_header">
            <h2>{email}</h2>
            <img src={imgSrc} alt="" />
          </div>
        </div>
          <button onClick={() => {logout()}}>LogOut</button>

        <div className="profile_header" style={{justifyContent: 'center'}}>
          <input id="new_Note_Input" type="text" onChange={(e)=>{setNewNote(e.target.value)}} />
          <button onClick={()=>{addNewNote()}}>Add Note</button>
        </div>

        <h2>Note List:</h2>


        {noteList.map((note) => (
          <div key={note.id} style={{backgroundColor: "gray"}}>
            <h2>noteTitle: {note.noteTitle}</h2>
            <p>userId: {note.userId}</p>
            <p>noteId: {note.id}</p>
            <input onChange={(e)=>{setEditedNoteTitle(e.target.value)}} id="edit_input" type="text" />
            <button onClick={() => deleteNote(note.id)}> Delete</button>
            <button onClick={()=>{updateNoteTitle(note.id)}}>Edit</button>
          </div>
        ))}
    </>
  )
}