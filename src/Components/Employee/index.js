/* eslint-disable array-callback-return */
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProfileCard from '../ProfileCard';
import { DialogBox } from '../DialogBox';
import { Link } from 'react-router-dom';
import { content } from '../../Utils/Constants';

const Employee = () => {
  const [data, setData] = useState(null);
  const [deleteModelPop, setDeleteModelPop] = useState(false)
  const [modelData, setModelData] = useState()
  const baseURL = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    const token = localStorage.getItem(content.ACCESS_TOKEN);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    axios.get(`${baseURL}api/employee`, { headers })
      .then(res => {
        // console.log("🚀 ~ file: index.js:25 ~ useEffect ~ res:", res.data.response)
        setData(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const deleteModel = (value) => {
    setDeleteModelPop(!deleteModelPop)
    setModelData(value)
  }

  const handleDeleteEmp = () => {
    const apiUrl = `${baseURL}api/employee/delete`;
    const token = localStorage.getItem(content.ACCESS_TOKEN);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    axios.post(apiUrl, { employeeID: modelData._id }, { headers })
      .then(res => {
        console.log(res.data);
        setDeleteModelPop(!deleteModelPop)
        setModelData(null)
        // Handle success, if needed
      })
      .catch(err => {
        console.error(err);
        // Handle error, if needed
      });
  }

  const navigateToEdit = (id) => {
    console.log(id)
  }

  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="h2">Employee Listing</Typography>
        <Link to="add-employee" underline="none" variant="contained">Add Employee</Link>
      </Box>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {(data?.response !== undefined) ?
          data?.response.map((value, index) => (
            <Grid item xs={3} key={value._id} className="card-width">
              <ProfileCard data={value}>
                <Stack direction="row" spacing={1} style={{ position: "absolute", top: "10px", right: "10px" }}>

                  <Link href="javascript:void(0)" variant="body2" style={{ top: "5px", position: 'relative' }} onClick={() => navigateToEdit(value._id)}><EditIcon fontSize="inherit" /></Link>
                  <IconButton aria-label="delete" color="secondary" size="small" onClick={() => deleteModel(value)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              </ProfileCard>
            </Grid>
          )) : <Grid item xs={2}>Loading...</Grid>
        }
      </Grid>
      <DialogBox
        title={'You want to delete this employee?'}
        cancelBtn={'Close'}
        submitBtn="Yes"
        onSubmit={handleDeleteEmp}
        openModal={deleteModelPop}
        closeModel={deleteModel}
        modelData={modelData?.name}
      />
    </div>
  )
}

export default Employee
