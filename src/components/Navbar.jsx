import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.utils";
import { Navigate, useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import Backicon from "@mui/icons-material/KeyboardBackspace";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function Navbar() {
  const [anchor, setAnchor] = useState(undefined);
  const navigate = useNavigate();
  const open = Boolean(anchor);

  return (
    <Box
      height="50px"
      width="100%"
      sx={{
        backgroundColor: "black",
        color: "white",
        fontSize: "20px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 50px",
      }}
    >
      <IconButton
        aria-label="back-icon"
        sx={{ color: "white", marginLeft: "-20px" }}
        onClick={() => {
          auth.signOut();
          navigate("/");
        }}
      >
        <Backicon fontSize="large" sx={{ fontSize: "40px" }} color="white" />
      </IconButton>
      <Typography
        variant="h4"
        fontFamily="Open Sans"
        sx={{ marginRight: "-16%" }}
      >
        TODO LIST
      </Typography>
      <Tooltip title="details">
        <Button
          endIcon={
            <Avatar
              aria-controls={open ? "menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                width: "30px",
                height: "30px",
                background: "orange",
                "&:hover": { cursor: "pointer" },
                position: "relative",
              }}
            ></Avatar>
          }
          sx={{
            color: "red",
            maxWidth: "15%",
            height: "45px",
            marginRight: "-20px",
            overflow: "hidden",
            fontSize: "14px",
            "&:hover": { backgroundColor: "rgba(125,125,125,0.4)" },
          }}
          onClick={(e) => {
            setAnchor(e.currentTarget);
          }}
        >
          sudheer kumar
        </Button>
      </Tooltip>
      <Menu
        id="menu"
        anchorEl={anchor}
        open={open}
        onClose={() => {
          setAnchor(null);
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.6,
            ml: -0.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 9,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },

            "& .MuiMenuItem-root:hover": {
              backgroundColor: "rgba(128,128,128,0.25)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            alert("Comming Soon....");
            setAnchor(null);
          }}
        >
          <Avatar sx={{ backgroundColor: "orange" }} /> Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchor(null);
            navigate("/todolist/all");
          }}
        >
          <ListItemIcon>
            <FormatListBulletedIcon color="info" />
          </ListItemIcon>
          All Tasks
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchor(null);
            navigate("/todolist/completed");
          }}
        >
          <ListItemIcon>
            <TaskAltIcon color="success" />
          </ListItemIcon>{" "}
          Completed Tasks
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchor(null);
            navigate("/todolist/notcompleted");
          }}
        >
          <ListItemIcon sx={{ color: "black" }}>
            <CancelOutlinedIcon fontSize="medium" color="error" />
          </ListItemIcon>{" "}
          Not Completed Tasks
        </MenuItem>

        <Divider color="gray" />
        <MenuItem
          onClick={() => {
            auth.signOut();
            navigate("/");
          }}
        >
          <ListItemIcon sx={{ color: "black" }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Navbar;
