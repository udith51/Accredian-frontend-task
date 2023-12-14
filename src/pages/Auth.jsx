import React from 'react'
import Login from '../components/Login'
import { Box } from '@mui/material'
import SignUp from '../components/SignUp'

export default function Auth() {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='100vh'
        >
            <SignUp />
        </Box>
    )
}
