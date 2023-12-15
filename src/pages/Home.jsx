import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Home({ setAuthState }) {
    const navigate = useNavigate();
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : '';
    const handleLogout = () => {
        localStorage.removeItem('user');
        setAuthState('login');
        navigate("/");
    };
    return (
        <Container maxWidth="sm" style={{ marginTop: '50px', backgroundColor: "white", padding: "25px", borderRadius: "20px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome, {username}!
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                style={{ marginTop: '20px' }}
            >
                Logout
            </Button>
        </Container>
    )
}
