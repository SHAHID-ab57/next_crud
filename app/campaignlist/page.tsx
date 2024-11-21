"use client";
import { useAppDispatch, useAppSelector } from "@/Store/Hooks/hooks";
import { campainglist } from "@/Store/Slice/campaign";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { format, isValid } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

const CampaignCard = () => {
  const dispatch = useAppDispatch();
  const [campaigns, setCampaigns] = useState([]);

  const {searchTerm}= useAppSelector(state=>state.search)

  console.log("searchTerm",searchTerm)
  useEffect(() => {
    // Fetch campaigns and update state
    dispatch(campainglist())
      .then((data) => {
        setCampaigns(data.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch campaigns:", error);
      });
  }, [dispatch]);

  
    const filteredCampaigns = campaigns.filter((campaign:any)=> campaign?.heading?.toLowerCase().includes(searchTerm?.toLowerCase()));
    
    console.log("filteredCampaigns",filteredCampaigns)
  
    let finalCampaign = filteredCampaigns?.length>=1? filteredCampaigns:campaigns

  return (
    <Grid container spacing={4} justifyContent="center">
      {finalCampaign?.map((campaign: any, index: number) => {
        // Parse campaign date and check if it's valid
        const campaignEndDate = new Date(campaign.date);
        const isCampaignEndDateValid = isValid(campaignEndDate);
        const today = new Date();
        const isCampaignOngoing = isCampaignEndDateValid && campaignEndDate >= today;

        return (
          <Grid item key={index} xs={12} sm={6} md={4} sx={{height:"auto",}}>
            <Card
              sx={{
                maxWidth: 400,
                margin: "auto",
                borderRadius: 4,
                boxShadow: 3,
                
                mt:2,
                mb:2
              }}
            >
              {/* Campaign Image */}
              <CardMedia
                component="img"
                height="200"
                image={campaign.image}
                alt={campaign.heading}
                sx={{
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />

              <CardContent sx={{ flexGrow: 1, p: 3 }}> {/* Flex-grow ensures consistent height */}
                {/* Heading */}
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {campaign.heading}
                </Typography>

                {/* Reason */}
                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                  {campaign.reason}
                </Typography>

                {/* Date */}
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  {isCampaignEndDateValid
                    ? `Campaign End Date: ${format(campaignEndDate, "MMMM dd, yyyy")}`
                    : "Invalid Campaign End Date"}
                </Typography>
              </CardContent>

              {/* Conditional Section */}
              <Box sx={{ p: 3 }}>
                {isCampaignOngoing ? (
                  <Link href={`campaignlist/${campaign.id}`} passHref legacyBehavior>
                  <Button
                  
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Join Us
                  </Button>
                  </Link>
                ) : (
                  <Typography
                    variant="body1"
                    color="error"
                    align="center"
                    sx={{
                      py: 1.5,
                      fontWeight: "bold",
                      borderRadius: 1,
                      backgroundColor: "#ffebee",
                    }}
                  >
                    Campaign Ended
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CampaignCard;
