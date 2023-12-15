import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Login({ setAuthState }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", password: "" });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm((prev) => {
            return ({ ...form, [e.target.name]: e.target.value })
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.password.trim())
            setError('Email/Username and password cannot be empty.');
        else if (form.password.length < 8)
            setError('Password must be at least 8 characters long.');
        else {
            try {
                setError("");
                setLoading(true);
                const response = await fetch("https://accredian-backend-task-v75r.onrender.com/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    const val = await response.json();
                    console.log(val);
                    setError("");
                    localStorage.setItem('user', JSON.stringify(val.user));
                    navigate("/home");
                } else {
                    const val = await response.json();
                    setLoading(false)
                    setError(val.error)
                }
            } catch (error) {
                console.error("Error during form submission:", error);
            }
        }
    }
    return (
        <Container
            maxWidth='xs'
            component={Paper}
            elevation={3}
            style={{
                padding: "25px", borderRadius: "20px", margin: "15px"
            }}>
            < div className="form" >
                <Typography variant='h5' align='center'>Login</Typography>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email or Username"
                            name="name"
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
                    >
                        Login
                    </Button>
                    <Grid item xs={12}>
                        <Typography
                            variant='body2'
                            color="primary"
                            style={{ cursor: "pointer", marginTop: "5px", textAlign: "center" }}
                            onClick={() => { setAuthState("signup") }}
                            disabled={loading}
                        >
                            New user? Signup here.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </ Container>
    )
}
