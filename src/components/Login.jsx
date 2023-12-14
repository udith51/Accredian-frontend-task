import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';

export default function Login() {
    const [form, setForm] = useState({ name: "", password: "" });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setForm((prev) => {
            return ({ ...form, [e.target.name]: e.target.value })
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.password.trim())
            setError('Email/Username and password cannot be empty.');
        else if (!form.password.length < 8)
            setError('Password must be at least 8 characters long.');
        else {
            setError("");
            console.log(form);
        }
    }
    return (
        <Container
            maxWidth='xs'
            component={Paper}
            elevation={3}
            style={{ padding: "25px", borderRadius: "20px" }}>
            <div className="form">
                <Typography variant='h5' align='center'>Login</Typography>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email or Username"
                            name="email"
                            value={form.name}
                            variant="standard"
                            type="text"
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            value={form.password}
                            type='password'
                            variant='standard'
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    {error && <Grid item xs={12} style={{ display: "flex", alignItem: "center", justifyContent: "center" }}>
                        <Typography
                            color="error"
                            style={{ margin: "8px 0" }}>
                            {error}
                        </Typography>
                    </Grid>}
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='secondary'
                        style={{ width: "40%", marginTop: "35px" }}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </Grid>
            </div>
        </Container>
    )
}
