"use client";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { format } from "date-fns";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/Store/Hooks/hooks";
import { campainglistbyid, deleteCampaignById,  } from "@/Store/Slice/campaign";
import {  toast } from 'react-toastify'

const CampaignDetails = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const router = useRouter(); // To navigate programmatically
  const { userDataId } = useAppSelector((state: any) => state.camp);

  useEffect(() => {
    if (params.id) {
      dispatch(campainglistbyid(params.id));
    }
  }, [params.id, dispatch]);

  if (!userDataId || Object.keys(userDataId).length === 0) {
    return <Typography variant="h5">Loading campaign data...</Typography>;
  }

  const campaign = userDataId;

  const campaignEndDate = new Date(campaign?.date);
  const today = new Date();
  const isCampaignOngoing = campaignEndDate >= today;

  // Handle Delete Campaign
  const handleDelete = () => {
    if (params.id) {
      dispatch(deleteCampaignById(params.id))
        .then(() => {
          toast.warning("Campaign deleted successfully!");
          router.push("/"); 
        })
        .catch((error) => {
          toast.error("Error deleting campaign:", error);
        });
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 8, mb: 8, borderRadius: 4, boxShadow: 3 }}>
      {/* Campaign Image */}
      <CardMedia
        component="img"
        height="300"
        image={campaign?.image}
        alt={campaign?.heading}
        sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
      />

      <CardContent sx={{ p: 4 }}>
        {/* Campaign Heading */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: "bold" }}>
          {campaign?.heading}
        </Typography>

        {/* Campaign Reason */}
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          {campaign?.reason}
        </Typography>

        {/* Campaign Details */}
        <Typography variant="body2" color="textPrimary" sx={{ mb: 3 }}>
          {campaign?.details}
        </Typography>

        {/* Campaign End Date */}
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Campaign End Date: {format(campaignEndDate, "MMMM dd, yyyy")}
        </Typography>

        {/* Conditional Section for Ongoing/Ended Campaign */}
        {isCampaignOngoing ? (
          <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5 }}>
            Join Us
          </Button>
        ) : (
          <Typography
            variant="body1"
            color="error"
            align="center"
            sx={{ py: 1.5, fontWeight: "bold", borderRadius: 1, backgroundColor: "#ffebee" }}
          >
            Campaign Ended
          </Typography>
        )}

        {/* Update and Delete Buttons */}
        <Box display="flex" justifyContent="space-between" mt={4}>
          {/* Update Campaign Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push(`/updatecampaign/${params.id}`)} // Navigate to update page
          >
            Update Campaign
          </Button>

          {/* Delete Campaign Button */}
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete Campaign
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampaignDetails;
