import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthRoute from './AuthRoute';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link href="https://www.utcl.com" underline="none">
        UTCI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AuthScreen() {

  const [linkText, setLinkText] = React.useState('')
  const location = useLocation();
  const getClicked = () => { }
  const [loginText, setLoginText] = React.useState(false)
  const [registerText, setRegisterText] = React.useState(false)
  const [fooText, setFooText] = React.useState(false)

  React.useEffect(() => {
    const pathname = location.pathname;
    const currentPath = pathname.split('/').pop();
    if (currentPath === 'register') {
      setLinkText('Login')
      setRegisterText(false)
      setLoginText(true)
    } else {
      setLinkText('Register')
      setRegisterText(true)
      setLoginText(false)
    }
  }, [getClicked])

  const getClickedEvent = () => {
    setFooText(!fooText)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <AuthRoute />
            <Outlet />
            <Grid container>
              <Grid item xs>
                {!fooText && <Link to="forgot-password" onClick={getClickedEvent}>Forgot password?</Link>}
                {fooText && <>I have password  <Link to="login" onClick={getClickedEvent}>Click to Login</Link></>}
              </Grid>
              <Grid item>
                {loginText && <>I have an account. <Link to="login" onClick={getClicked}>{linkText}</Link></>}
                {registerText && <>Don't have an account? <Link to="register" onClick={getClicked}>{linkText}</Link></>}
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}