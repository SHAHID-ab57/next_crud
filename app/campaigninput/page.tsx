"use client";
import { useAppDispatch } from "@/Store/Hooks/hooks";
import { campainginput } from "@/Store/Slice/campaign";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {  toast } from 'react-toastify'

const Campaign = () => {
  // State to manage the form data
  let router = useRouter()

  let dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    heading: "",
    reason: "",
    details: "",
    file: "",
    date: "",
  });
  const [fileName, setFileName] = useState("");

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file change and convert to Base64
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({
          ...formData,
          file:file.name,
        });
        setFileName(base64String); 
      };
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      heading: formData.heading,
      reason: formData.reason,
      details: formData.details,
      image: fileName,
      date: formData.date,
      
    }

    dispatch(campainginput(data))
    .then(()=>{
       toast.success("Campaign created successfully")
       setFormData({
        heading: "",
        reason: "",
        details: "",
        file: "",
        date: "",
       })
       setFileName("")
       router.push("/")
     })
    
    
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={4}
        sx={{
          mt: 8,
          p: 4,
          mb: 8,
          borderRadius: 10,
          backgroundColor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
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
            },
          }}
        >
          Campaign Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Campaign Heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                required
                color="secondary"
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
                label="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                multiline
                rows={4}
                color="secondary"
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
                label="Campaign Details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                multiline
                rows={6}
                color="secondary"
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
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                color="secondary"
                variant="outlined"
                sx={{ borderRadius: 2, backgroundColor: "#fff" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                component="label"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 2, 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "none", 
                  borderRadius: 2,
                }}
              >
                {formData.file ? `Uploaded: ${formData.file }` : "Upload Campaign File"}
                <input
                  type="file"
                  accept="image/*,.pdf,.docx"
                  onChange={handleFileChange}
                  hidden
                  required
                />
              </Button>
            </Grid>

            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 1.5, fontSize: "1rem", borderRadius: 2 }}
              >
                Submit Campaign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Campaign;
