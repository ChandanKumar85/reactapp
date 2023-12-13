import { Box, Typography } from '@mui/material'
import React from 'react'

const MyAccount = () => {
    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" component="h2">Account</Typography>
            </Box>
        </>
    )
}

export default MyAccount
