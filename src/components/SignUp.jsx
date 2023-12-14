import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function SignUp() {
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const isAlphanumeric = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const handleChange = (e) => {
        setForm((prev) => {
            return ({ ...form, [e.target.name]: e.target.value })
        })
        if (e.target.name === "confirmPassword")
            if (form.password === e.target.value)
                setPasswordMatch(true);
            else
                setPasswordMatch(false);
    }
    const handleSubmit = (e) => {
        console.log(form);

        e.preventDefault();
        if (!form.email.trim() || !form.password.trim() || !form.username.trim() || !form.confirmPassword.trim())
            setError('All fields are required.');
        else if (form.password.length < 8)
            setError('Password must be at least 8 characters long.');
        else if (form.password !== form.confirmPassword)
            setError("Password should match.");
        else if (!isAlphanumeric.test(form.password))
            setError('Password must be alphanumeric.');
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
                <Typography variant='h5' align='center'>Signup</Typography>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={form.username}
                            variant="standard"
                            type="text"
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={form.email}
                            variant="standard"
                            type="email"
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            type='password'
                            variant='standard'
                            required
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{passwordMatch && <CheckIcon color="success" />}</InputAdornment>,
                            }}
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
                        Sign up
                    </Button>
                </Grid>
            </div>
        </Container>
    )
}
