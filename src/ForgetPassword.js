import React, { useState, useRef } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// MUI
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
// Firebase
import { auth } from './config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'



const theme = createTheme();


export default function ForgetPassword() {

    
    const [alertMsg, setAlertMsg] = useState(null)
    let alert = <Alert sx={{ mt: 2 }} variant="outlined" severity="error">{`${alertMsg}`}</Alert>

    // Forget password handler
    const sendPasswordResetEmailBtn = useRef(null)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget); //From MUI
        const email = data.get('email') //From MUI

        try {
            sendPasswordResetEmailBtn.current.innerHTML = ""
            sendPasswordResetEmailBtn.current.classList.add('btn_loader')
            await sendPasswordResetEmail(auth, email)
    
            setAlertMsg('Password reset email sent!')

        } catch(error) {
            // sendPasswordResetEmailBtn.current.classList.remove('btn_loader')
            sendPasswordResetEmailBtn.current.innerHTML="Send Reset Email"
            setAlertMsg(error.code)
        }
    }


  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent:'center',
          height: '100vh'
        }}
      >

        <Typography component="h1" variant="h5" sx={{color:'#222', fontSize: '48px', fontWeight: 800}}>
            Forget Password
        </Typography>

        {alertMsg ? alert : null}
          
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          {/* Signin Button */}
          <Button
            ref={sendPasswordResetEmailBtn}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1, height:'36.5px' }}
          >
            Send Reset Email
          </Button>

        </Box>



      </Box>
    </Container>
  </ThemeProvider>
  )
}