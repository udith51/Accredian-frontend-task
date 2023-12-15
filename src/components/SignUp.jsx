import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";

export default function SignUp({ setAuthState }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [loading, setLoading] = useState(false);
    const isAlphanumeric = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email.trim() || !form.password.trim() || !form.username.trim() || !form.confirmPassword.trim()) {
            setError('All fields are required.');
        } else if (form.password.length < 8) {
            setError('Password must be at least 8 characters long.');
        } else if (form.password !== form.confirmPassword) {
            setError("Password should match.");
        } else if (!isAlphanumeric.test(form.password)) {
            setError('Password must be alphanumeric.');
        } else if (!emailRegex.test(form.email)) {
            setError('Please enter a valid email address.');
        }
        else {
            try {
                setError("");
                setLoading(true);
                const response = await fetch("https://accredian-backend-task-v75r.onrender.com/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    const val = await response.json();
                    console.log(val);
                    localStorage.setItem('user', JSON.stringify(val.user));
                    setError("");
                    navigate("/home");
                } else {
                    const val = await response.json();
                    setLoading(false)
                    setError(val.error);
                }
            } catch (error) {
                console.error("Error during form submission:", error);
            }
        }
    };

    return (
        <Container
            maxWidth='xs'
            component={Paper}
            elevation={3}
            style={{ padding: "25px", borderRadius: "20px", margin: "15px" }}>
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
                    {loading && <Grid item xs={12} style={{ display: "flex", alignItem: "center", justifyContent: "center" }}>
                        <Typography
                            color="secondary"
                            style={{ margin: "8px 0" }}>
                            Please wait.
                        </Typography>
                    </Grid>}

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='secondary'
                        style={{ width: "40%", marginTop: "35px" }}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Sign up
                    </Button>
                    <Grid item xs={12}>
                        <Typography
                            variant='body2'
                            color="primary"
                            style={{ cursor: "pointer", marginTop: "5px", textAlign: "center" }}
                            onClick={() => { setAuthState("login") }}
                        >
                            Already have an account? Login here.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}
