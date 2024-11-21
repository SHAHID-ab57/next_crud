"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch, useAppSelector } from "@/Store/Hooks/hooks";
import { registerAuth } from "@/Store/Slice/Auth";
import {  toast } from 'react-toastify'

const Register = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  
let dispatch = useAppDispatch()
  const { message  } = useAppSelector((state) => state.auth);

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: ""
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
      setFormData({
        ...formData,
        file:file.name,
      });
      reader.onloadend = () => {
        const base64String = reader.result as string;
      setFileName(base64String); 
      }
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    let formdata ={
      "name": formData.name,
      "email": formData.email,
      "password": formData.password,
      "image": fileName
    }
    console.log("formdata",formdata);
    
    dispatch(registerAuth(formdata))
    .then((res)=>{
      toast.success("Register successfully")
    })


    
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
            boxShadow: "0 14px 28px rgba(137, 59, 178, 0.41), 0 10px 10px rgba(137, 59, 178, 0.41)",
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
            "&:focus": {
                textIndent: "0",
            },
            "&::first-letter": {
                textTransform: "uppercase",
            },
            "&::first-line": {
                textTransform: "uppercase",
            },
            "&::selection": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
            "&::-moz-selection": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}}
        >
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
           
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                required
                type="text"
                color="secondary"
                name="name"
                value={formData.name}
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
                label="Email"
                required
                type="email"
                color="secondary"
                name="email"
                value={formData.email}
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
                required
                type="password"
                color="secondary"
                name="password"
                value={formData.password}
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
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  backgroundColor: "#1976d2", 
                  "&:hover": {
                    backgroundColor: "#1565c0", 
                  },
                }}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  
                />
              </Button>
              {formData.file && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {formData.file}
                </Typography>
              )}
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
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
