"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/Store/Hooks/hooks";
import { campainglistbyid, campainginput, updatecampainglistbyid } from "@/Store/Slice/campaign";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import {  toast } from 'react-toastify'
import { useRouter } from "next/navigation";

const UpdateCampaign = ({params}:{params:{
    id:string | any
  }}) => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  

  // Fetching the specific campaign data from Redux store
  const { userDataId } = useAppSelector((state: any) => state.camp);

  // Local state to handle form data
  const [formData, setFormData] = useState({
    heading: "",
    reason: "",
    details: "",
    date: "",
    image: "",
  });

  // UseEffect to populate the form with the existing campaign data
  useEffect(() => {
    dispatch(campainglistbyid(params.id)); // Fetch campaign by id
  }, [dispatch,params.id]);

  // Update formData state once the userDataId is available
  useEffect(() => {
    if (userDataId) {
      setFormData({
        heading: userDataId?.heading || "",
        reason: userDataId?.reason || "",
        details: userDataId?.details || "",
        date: userDataId?.date || "",
        image: userDataId?.image || "",
      });
    }
  }, [userDataId]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for updating campaign
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedCampaign = {
       id: params.id,
      ...formData,
    };
    
    dispatch(updatecampainglistbyid(updatedCampaign)).then(res=>{
       toast.info("Campaign updated successfully")
       router.push("/")
    }

    )  .catch((err)=>{
        toast.error("Failed to update campaign")
 
    })
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 10,
          mb: 10,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          backgroundColor: "white",
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
          }}
        >
          Update Campaign
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Heading */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                required
                color="secondary"
              />
            </Grid>

            {/* Reason */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                color="secondary"
              />
            </Grid>

            {/* Details */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                color="secondary"
                multiline
                rows={4}
              />
            </Grid>

            {/* Date */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ py: 1.5, fontSize: "1rem" }}
              >
                Update Campaign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateCampaign;
