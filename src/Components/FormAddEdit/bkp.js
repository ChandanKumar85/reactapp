import { Box, Button, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DatepickerWrapper } from './formStyled';
import dummyImg from '../../assets/dummy-product.png'
import axios from 'axios';

const EmployeeForm = () => {
    const formInitialVal = { name: '', email: '', phone: '', age: '', designation: '', avatar: null }
    const [imgPreview, setImgPreview] = useState(null);
    const [initialValue, setInitialValue] = useState(formInitialVal);
    const [formErrors, setFormErrors] = useState({});

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

    const handleChange = (e) => {
        if (!e.target.files) {
            const { name, value, type, files } = e.target;
            // Special handling for file input (photo)
            const fieldValue = type === 'file' ? files[0] : value;
            setInitialValue({ ...initialValue, [name]: value })
            return;
        }
        if (e.target.files.length !== 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setImgPreview(e.target.result)
                console.log(e.target.result)
            }
        } else {
            setImgPreview(null)
        }
    }

    useEffect(() => {
        if (imgPreview !== null) {
            setImgPreview(imgPreview)
        } else {
            setImgPreview(dummyImg)
        }
    }, [imgPreview])

    const handleSubmit = () => {
        const errors = validateForm(initialValue)
        setFormErrors(errors)
        console.log(initialValue)
        if (Object.keys(errors)?.length) {
            return false
        }
    }

    // const handleUpload = (e) => {
    //     console.log(initialValue)
    //     // const selectedFile = e.target.files[0];
    //     // const reader = new FileReader();
    //     // reader.readAsDataURL(selectedFile);
    // };

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" component="h2">Add Employee</Typography>
            </Box>
            <Grid container>
                <Grid item xs={4}>
                    <form>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="text"
                            label="User Name"
                            name="name"
                            autoComplete="off"
                            autoFocus
                            error={Boolean(formErrors.name)}
                            helperText={formErrors.name}
                            value={initialValue.name}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="off"
                            error={Boolean(formErrors.email)}
                            helperText={formErrors.email}
                            value={initialValue.email}
                            onChange={handleChange}
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
                            error={Boolean(formErrors.phone)}
                            helperText={formErrors.phone}
                            value={initialValue.phone}
                            onChange={handleChange}
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
                                    error={Boolean(formErrors.age)}
                                    helperText={formErrors.age}
                                    onChange={handleChange}
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
                                error={Boolean(formErrors.designation)}
                                value={initialValue.designation}
                                onChange={handleChange}
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
                        <FormHelperText className='Mui-error'>{formErrors.designation}</FormHelperText>

                        <FormControl fullWidth sx={{ mt: 2, minWidth: 100 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <img src={imgPreview} width="150" height="150" alt="img" />
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden
                                        accept="image/*"
                                        type="file"
                                        name="avatar"
                                        value={initialValue.avatar}
                                        onChange={handleChange}
                                    />
                                </Button>
                            </Stack>
                            <FormHelperText className='Mui-error'>{formErrors.avatar}</FormHelperText>
                        </FormControl>

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