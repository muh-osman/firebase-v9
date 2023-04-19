import React, { useState, useRef } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// MUI
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
// Firebase
import { auth } from './config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'


const theme = createTheme();

export default function SignUp() {


  // Alert Message State
  const [alertMsg, setAlertMsg] = useState(null)
  let alert = <Alert sx={{ mt: 2 }} variant="outlined" severity="error">{`${alertMsg}`}</Alert>

  // Navigate to profile after Sign Up
  const navigate = useNavigate();

  // SignUp Button handler 
  const signUpBtn = useRef(null)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget) //from MUI
    const email = data.get('email') //from MUI
    const password = data.get('password') //from MUI

    try {
      signUpBtn.current.innerHTML = ""
      signUpBtn.current.classList.add('btn_loader')

      await createUserWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser;
      if (user) {
        navigate("/profile");
      }
      
    } catch (error) {
      signUpBtn.current.classList.remove('btn_loader')
      signUpBtn.current.innerHTML = "Sign Up"
      setAlertMsg(error.code)
    }
  };

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
            Sign up
          </Typography>

            {/* Alert if Exist */}
          {alertMsg ? alert : null}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

                {/* Email Input */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              
                {/* Password input */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>

               {/* Sign Up Button */}
            <Button
              ref={signUpBtn}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height:'36.5px'}}>
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>

                  {/* Link to Signin */}
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}