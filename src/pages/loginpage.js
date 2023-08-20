import * as React from 'react';
import { useState } from 'react'; // Added this line to import useState
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SchoolIcon from '@mui/icons-material/School';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog'; 
import DialogActions from '@mui/material/DialogActions'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogContentText from '@mui/material/DialogContentText'; 
import DialogTitle from '@mui/material/DialogTitle'; 
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress'; // Importing CircularProgress for loading indicator
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function SignInSide() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await fetch(`http://localhost:8080/api/users/checkUser/${payload.email}&${payload.password}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
      
    if (response.ok) {
      const userRole = await response.text();

      if (userRole === "Student") {
        navigate('/student-dashboard');
      } else if (userRole === "Teacher") {
        navigate('/teacher-dashboard');
      } 
    } 
    else 
    {
      setOpen(true); 
    }
    } 
    catch (error) 
    {
      // Handle network error
    } 
    finally 
    {
      setLoading(false);
    }
  };

  const handleClose = () => { // Added this function to close the dialog
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>

      <Grid container component="main" sx={{ height: '100vh'}}>

        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1599081593734-5e65dd7abfba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Avatar sx={{ m: 1, bgcolor: 'black' }} >
              <SchoolIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

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

              {/* <FormControlLabel
                control={<Checkbox value="remember" color='primary'/>}
                label="Remember me"
              /> */}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#00ADB5', color: 'black' } }}
                disabled={loading} // Disable the button when loading
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'} {/* Conditionally render loading indicator */}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>

            </Box>

          </Box>

        </Grid>

      </Grid>

{/* Pop up dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{ '& .MuiPaper-root': { backgroundColor: '#EEEEEE' } }}
      >
        <DialogTitle sx={{ color: '#FF1E00' }} >{"Error"}</DialogTitle>
        <DialogContent >
          <DialogContentText sx={{ color: 'black'}} >
            Incorrect email or password. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider>
  );
}
