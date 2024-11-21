"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Icon for Add Campaign
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";

import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useAppDispatch } from "@/Store/Hooks/hooks";
import { setSearchTerm } from "@/Store/Slice/search";
import { useRouter } from "next/navigation";




const Header = () => {
  const [search,setsearch] =useState<string>("");
 let router = useRouter()
  let dispatch = useAppDispatch()

  let [token,settoken]= useState<string|null>(null)
 
  // console.log("search",search);

  useEffect(()=>{
dispatch(setSearchTerm(search))
  },[search,dispatch]);
  

  useEffect(()=>{
    let newToken=sessionStorage.getItem("token");
    console.log(newToken);
    
    if(newToken)
      settoken(newToken);
  },[])
   

  const handleLogout = ()=>{
   sessionStorage.removeItem("token");
    router.push("/login")
  }

  console.log("token",token);
  return (
    <AppBar position="static" sx={{ backgroundColor: "#673ab7" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo and Home Link */}
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" aria-label="logo" size="large">
            <EmojiObjectsIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              ml: 1,
            }}
          >
            MyCampaign
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 1,
            padding: "0 10px",
            maxWidth: 300,
            width: "100%",
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            name="search"
            onChange={((e: any) =>setsearch(e.target.value))}
            sx={{ ml: 1, flex: 1 }}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box>
          <Button
            component={Link}
            href="/"
            color="inherit"
            startIcon={<HomeIcon />}
            sx={{
              mr: 2,
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/campaigninput" // New button for Add Campaign
            color="inherit"
            startIcon={<AddCircleIcon />} // Icon for Add Campaign
            sx={{
              mr: 2,
            }}
          >
            Add Campaign
          </Button>
          {
            token? (

              <Button
              onClick={handleLogout}
              color="inherit"
              startIcon={<LogoutIcon />} // Add a logout icon
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                color: "#673ab7",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              Logout
            </Button>
              
            ) :
            (
              <Button
              component={Link}
              href="/login"
              color="inherit"
              
              startIcon={<LoginIcon />}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                color: "#673ab7",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              Login
            </Button>
            )
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
