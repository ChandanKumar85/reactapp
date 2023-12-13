import { Avatar, Box, Button, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { DatepickerWrapper } from './formStyled';
import { content } from '../../Utils/Constants';

const EmployeeForm = () => {
    const formInitialVal = { name: '', email: '', phone: '', age: '', designation: '', avatar: null }
    const [initialValue, setInitialValue] = useState(formInitialVal);
    const [errors, setErrors] = useState({});
    const baseURL = process.env.REACT_APP_BASE_URL

    const validateForm = values => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.name) {
            errors.name = "This filed is required."
        } else if (values.name.length < 3) {
            errors.name = "User name should be minimum 3 characters."
        }

        if (!values.email) {
            errors.email = "This filed is required."
        } else if (!emailRegex.test(values.email)) {
            errors.email = "This is not a valid email."
        }

        if (!values.phone) {
            errors.phone = "This filed is required."
        } else if (values.phone.length < 10) {
            errors.phone = "Mobile number should be minimum 10 digits."
        }

        if (!values.age) {
            errors.age = "This field is required!"
        }

        if (!values.designation) {
            errors.designation = "This field is required!"
        }

        if (!values.avatar) {
            errors.avatar = "This field is required!"
        }
        return errors;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInitialValue({ ...initialValue, [name]: value });
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setInitialValue({ ...initialValue, avatar: file });
        // const reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        // reader.onload = (e) => {
        //     setImgPreview(e.target.result)
        //     console.log(e.target.result)
        // }
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem(content.ACCESS_TOKEN);
            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            };
            const errors = validateForm(initialValue);
            setErrors(errors);

            if (Object.keys(errors).length) {
                // Handle form validation errors (e.g., display error messages to the user)
                return;
            }
            const response = await axios.post(`${baseURL}api/employee/store`, initialValue, { headers });
            console.log(response.data);
            // Optionally, you can handle success (e.g., show a success message to the user)
        } catch (error) {
            console.error(error);
            // Handle API request errors (e.g., show an error message to the user)
        }
    };


    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" component="h2">Add Employee</Typography>
            </Box>
            <Grid container>
                <Grid item xs={4}>
                    <form encType='multipart/form-data'>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="text"
                            label="User Name"
                            name="name"
                            autoComplete="off"
                            autoFocus
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            value={initialValue.name}
                            onChange={handleInputChange}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="off"
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            value={initialValue.email}
                            onChange={handleInputChange}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Enter Mobile Number"
                            name="phone"
                            autoComplete="off"
                            InputProps={{
                                startAdornment: <InputAdornment position='start'>+91</InputAdornment>
                            }}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                            value={initialValue.phone}
                            onChange={handleInputChange}
                        />

                        <DatepickerWrapper>
                            <FormControl sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='date'
                                    autoComplete='off'
                                    id='dateOfBirth'
                                    name="age"
                                    required
                                    error={Boolean(errors.age)}
                                    helperText={errors.age}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </DatepickerWrapper>

                        <FormControl fullWidth sx={{ mt: 2, minWidth: 100 }}>
                            <InputLabel id="designation">Designation</InputLabel>
                            <Select
                                labelId="designation"
                                id="designation"
                                name="designation"
                                autoWidth
                                label="Designation"
                                error={Boolean(errors.designation)}
                                value={initialValue.designation}
                                onChange={handleInputChange}
                            >
                                <MenuItem value=""><em>Designation</em></MenuItem>
                                <MenuItem value="react developer">React Developer</MenuItem>
                                <MenuItem value='angular developer'>Angular Developer</MenuItem>
                                <MenuItem value='ui developer'>UI Developer</MenuItem>
                                <MenuItem value='java developer'>Java Developer</MenuItem>
                                <MenuItem value='ios developer'>IOS Developer</MenuItem>
                                <MenuItem value='vue developer'>VUE Developer</MenuItem>
                                <MenuItem value='php developer'>PHP Developer</MenuItem>
                            </Select>
                        </FormControl>
                        <FormHelperText className='Mui-error'>{errors.designation}</FormHelperText>

                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-start' }}>
                            {initialValue.avatar && (
                                <Avatar alt="Avatar" sx={{ width: 80, height: 80 }} src={URL.createObjectURL(initialValue.avatar)} />
                            )}
                            <label>
                                <Button variant="contained" component="span">
                                    Upload Profile Image
                                </Button>
                                <input hidden
                                    accept="image/*"
                                    type="file"
                                    name="avatar"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                            <FormHelperText className='Mui-error'>{errors.avatar}</FormHelperText>
                        </Box>

                        {/* <FormControl fullWidth sx={{ mt: 2, minWidth: 100 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <img src={imgPreview} width="150" height="150" alt="img" />
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden
                                        accept="image/*"
                                        type="file"
                                        name="avatar"
                                        value={initialValue.avatar}
                                        onChange={handleInputChange}
                                    />
                                </Button>
                            </Stack>
                            <FormHelperText className='Mui-error'>{errors.avatar}</FormHelperText>
                        </FormControl> */}

                        {/* <FormControl fullWidth sx={{ mt: 2, minWidth: 100 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                {initialValue.avatar && (
                                    <Avatar alt="Avatar" sx={{ width: 80, height: 80 }} src={URL.createObjectURL(initialValue.avatar)} />
                                )}
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden
                                        accept="image/*"
                                        type="file"
                                        name="avatar"
                                        value={initialValue.avatar}
                                        onChange={handleAvatarChange}
                                    />
                                </Button>
                            </Stack>
                            <FormHelperText className='Mui-error'>{errors.avatar}</FormHelperText>
                        </FormControl> */}

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            // disabled={true}
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>

                    </form>
                </Grid>
            </Grid>
        </>
    )
}

export default EmployeeForm