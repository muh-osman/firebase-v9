import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
// Firebase
import { auth, googleProvider } from './config/firebase'
import { signInWithEmailAndPassword, signInWithPopup, getAuth, sendPasswordResetEmail } from 'firebase/auth'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignIn() {

  const [alertMsg, setAlertMsg] = useState(null)
  let alert = <Alert sx={{ mt: 2 }} variant="outlined" severity="error">{`${alertMsg}`}</Alert>

  const navigate = useNavigate();

  // Signin With Email Button
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    const checkBox = document.getElementById('checkbox').checked //true or false

    try {
      var email_signin_btn = document.getElementById('email_signin_btn')
      email_signin_btn.innerHTML=""
      email_signin_btn.classList.add('btn_loader')

      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser;
      if (user) {
        navigate("/profile");
      }
      
    } catch (error) {
      email_signin_btn.classList.remove('btn_loader')
      email_signin_btn.innerHTML="Sign In"
      setAlertMsg(error.code)
    }

  }

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

  // Forget password handler
  const forgetPassword = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value

    sendPasswordResetEmail(auth, email)
    .then(() => {
      setAlertMsg('Password reset email sent!')
    })
    .catch((error) => {
      setAlertMsg(error.code)
    });
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {alertMsg ? alert : null}
            
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox id='checkbox' color="primary" />}
              label="Remember me"
            />

            {/* Email Signin */}
            <Button
              id="email_signin_btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1, height:'36.5px' }}
            >
              Sign In
            </Button>

            {/* Google Signin */}
            <Button
              onClick={()=>{signInWithGoogle()}}
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2, height:'36.5px' }}
            >
              <GoogleIcon sx={{color: "gray", mr: 1}} />
              Continue with Google
            </Button>

            <Grid container>
              <Grid item xs>
                <Link onClick={(e)=>{forgetPassword(e)}} href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>



        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}