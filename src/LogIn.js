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
import { signInWithEmailAndPassword } from 'firebase/auth'



const theme = createTheme();


export default function LogIn() {

  const [alertMsg, setAlertMsg] = useState(null)
  let alert = <Alert sx={{ mt: 2 }} variant="outlined" severity="error">{`${alertMsg}`}</Alert>

  const navigate = useNavigate() //After Signin

  // Signin With Email Button
  const signInBtn = useRef(null)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    // const checkBox = document.getElementById('checkbox').checked //true or false

    try {
      signInBtn.current.innerHTML = ""
      signInBtn.current.classList.add('btn_loader')

      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser;
      if (user) {
        navigate("/profile");
      }
      
    } catch (error) {
      signInBtn.current.classList.remove('btn_loader')
      signInBtn.current.innerHTML="Sign In"
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
            Sign in
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox id='checkbox' color="primary" />}
              label="Remember me"
            />

            {/* Email Signin Button */}
            <Button
              ref={signInBtn}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1, height:'36.5px' }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/forget-password" variant="body2">
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
      </Container>
    </ThemeProvider>
  );
}