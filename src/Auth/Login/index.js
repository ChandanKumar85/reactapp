import { Button, FormHelperText, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Authentication from '../../Utils/Authentication';

const Login = () => {

  const { http, setToken } = Authentication();
  const formInitialVal = { email: '', password: '' }
  const [initialValue, setInitialValue] = useState(formInitialVal);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false);

  const validateMsg = (values) => {
    const errors = {};
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.email) {
      errors.email = "This filed is required."
    }
    // else if (!emailRegex.test(values.email)) {
    //   errors.email = "This is not a valid email."
    // }

    if (!values.password) {
      errors.password = "This filed is required."
    }
    // else if (values.password.length < 8) {
    //   errors.password = "Password should be minimum 8 characters."
    // } 
    // else if (!passwordRegex.test(values.password)) {
    //   errors.password = "Password should be 1 uppercase, 1 lowercase, 1 special corrector,1 digits and minimum length 8"
    // }

    return errors;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValue({ ...initialValue, [name]: value })
  }

  const handleSubmit = () => {
    const errors = validateMsg(initialValue)
    setFormErrors(errors)
    if (Object.keys(errors)?.length) {
      return false
    }
    http.post('api/login', initialValue)
      .then((res) => {
        if (res.data.message !== "NO_USER_FOUND" && res.data.message !== "PASSWORD_NOT_MATCHED") {
          console.log(res)
          setToken(res.data.token, res.data.user)
        } else {
          setError(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <form style={{ width: '100%' }}>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="off"
        autoFocus
        // error={Boolean(formErrors.email)}
        // helperText={formErrors.email}
        value={initialValue.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="off"
        // error={Boolean(formErrors.password)}
        // helperText={formErrors.password}
        value={initialValue.password}
        onChange={handleChange}
      />
      {Boolean(formErrors.email || formErrors.password) && <FormHelperText className='Mui-error'>Email & Password is required.</FormHelperText>}
      {error && <FormHelperText className='Mui-error'>Email or Password is invalid.</FormHelperText>}
      {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
        /> */}
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Sign In
      </Button>
    </form>
  )
}

export default Login