"use client";
import { useAppDispatch, useAppSelector } from "@/Store/Hooks/hooks";
import { loginAuth } from "@/Store/Slice/Auth";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {  toast } from 'react-toastify'



const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { message, userData } = useAppSelector(
    (state: any) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
   
    const result = await dispatch(loginAuth(formData));

   
    if (result?.payload) {
      toast.success("Login Successfully"); 
      sessionStorage.setItem("token", result?.payload?.email)
console.log("result?.payload",result?.payload)
      router.push("/"); 
    } else {
      toast.error("Invalid login credentials"); 
    }
  };

  

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 10,
          mb: 10,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          backgroundColor: "white",
          "&:hover": {
            boxShadow:
              "0 14px 28px rgba(137, 59, 178, 0.41), 0 10px 10px rgba(137, 59, 178, 0.41)",
          },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          align="center"
          sx={{
            fontWeight: 600,
            fontSize: 24,
            lineHeight: 1.2,
            marginBottom: 5,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textIndent: "2ch",
            transition: "text-indent 0.3s ease-in-out",
            "&:hover": {
              textIndent: "0",
            },
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                color="secondary"
                required
                onChange={handleChange}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                color="secondary"
                required
                onChange={handleChange}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                }}
              >
                Login
              </Button>
            </Grid>
            <Box
              component={Link}
              href={"/registration"}
              sx={{
                mt: 1.5,
                ml: 3,
                py: 2,
                color: "primary.main",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Don't have an account? Register
            </Box>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
