import React, { useState } from 'react'
import Login from '../components/Login'
import { Box } from '@mui/material'
import SignUp from '../components/SignUp'

export default function Auth() {
    const [authState, setAuthState] = useState("signup");
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            {authState === "signup" ? <SignUp setAuthState={setAuthState} /> : <Login setAuthState={setAuthState} />}

        </Box>
    )
}
