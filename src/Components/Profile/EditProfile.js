import { Box } from '@mui/material'
import React from 'react'
import Typography from '@mui/joy/Typography';

const EditProfile = () => {
    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" component="h1">Edit User</Typography>
            </Box>
        </>
    )
}

export default EditProfile
