"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#673ab7",
        py: 2,
        mt: "auto",
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" color="white" align="center">
          © {new Date().getFullYear()} MyCampaign. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
