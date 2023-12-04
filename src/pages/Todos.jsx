import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../FirebaseAuth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.utils";
import Navbar, { useNav } from "../components/Navbar";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestoreIcon from "@mui/icons-material/Restore";

function Todos() {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const userId = currentUser ? currentUser.uid : null;
  const [message, setMessage] = useState("");
  const [isedit, setIsedit] = useState(false);
  const [isType, setIsType] = useState(null);
  const { type } = useParams();

  const handleAdd = () => {
    if (isedit) {
      const ref = doc(db, "users", userId, "data", isedit);
      updateDoc(ref, { message: message });
      setIsedit(null);
    } else {
      const ref = collection(db, "users", userId, "data");
      addDoc(ref, { message: message, status: "notcompleted" });
    }
    setMessage("");
  };
  const handleDelete =  (e, id) => {
    const ref = doc(db, "users", userId, "data", id);
     deleteDoc(ref);
    fetchData();
  };

  const handleEdit = (id, msg) => {
    setMessage(msg);
    setIsedit(id);
  };
  const handleComplete =  (id) => {
    const ref = doc(db, "users", userId, "data", id);
    updateDoc(ref, { status: "completed" });
    fetchData();
    
  };
  const handleUndo =  (id) => {
    const ref = doc(db, "users", userId, "data", id);
     updateDoc(ref, { status: "notcompleted" });
    fetchData();
    
  };

  function fetchData(){
    setIsType(type === "all" ? null : type);

    if (userId) {
      if (isType !== null) {
        const ref = collection(db, "users", userId, "data");
        const q = query(ref, where("status", "==", isType));
        onSnapshot(q, (snapshot) => {
          setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
      } else {
        const ref = collection(db, "users", userId, "data");
        const q = query(ref, orderBy("status" , 'desc'));
        onSnapshot(q, (snapshot) => {
          setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
      }
    } else {
      setTodos([{ message: "Tis is a text message write your own message" }]);
    }
  }
  useEffect(() => {
    fetchData();
  }, [userId, isType, type, message,fetchData()]);

  return (
    <>
      <Navbar />
      <Box
        width="100%"
        min-height="100vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
          padding: "63px 0",
          background:'url("/Images/background-1.jpg")',
          backgroundSize:'cover',
          backgroundPosition:'center',
          backgroundRepeat:'no-repeat'
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: "15px",
            width: "700px",
            height: "562px",
            display: "flex",
            borderRadius:'10px',
            backgroundColor:'rgb(226, 223, 210)'
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            width="100%"
            height="100%"  
            sx={{
              textAlign: "center",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "550" }}>
              {isType === null
                ? 
                <Typography variant="h5" sx={{ display:'flex' , paddingTop:'10px' , paddingBottom:'10px' }}>Welcome <Typography variant="h5" color='blue' sx={{ fontWeight:'550' , fontSize:'23px' , paddingLeft:'12px'}}> {currentUser ? currentUser.displayName : ""} </Typography> </Typography> 
                : ( isType ==="completed" )
                ? "Completed Tasks"
                : "Not completed Tasks"}
            </Typography>

            
              <Stack spacing={3}>
                <Box
                  width='650px'
                >
                  <TextField
                    type="text"
                    placeholder="Start typing here......"
                    size="small"
                    InputLabelProps={{ shrink: false }}
                    sx={{ width: "80%" , backgroundColor:'white' , fontSize:'16px' }}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="form-control"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="medium"
                    sx={{
                      marginLeft: "8px",
                      "&:hover": { backgroundColor: "blue" },
                      fontSize: "16px",
                    }}
                    onClick={handleAdd}
                    disabled={!message ? true : false}
                  >
                    {" "}
                    {!isedit ? "ADD" : "UPDATE"}{" "}
                  </Button>
                </Box>
                <TableContainer component={Paper} sx={{ maxHeight: "420px" }}>
                  <Table
                    sx={{ width: "650px", marginLeft: "-5px" }}
                    size="small"
                    stickyHeader
                  >
                    <TableHead>
                      <TableRow
                        sx={{
                          "& .MuiTableCell-head": {
                            color: "white",
                            backgroundColor: "black",
                            fontSize: "20px",
                            fontWeight: "550",
                            paddingLeft: "30px",
                            
                          },
                        }}
                      >
                        <TableCell color="white" colSpan="2" width='250px'>
                          Tasks
                        </TableCell>

                        <TableCell width='200px'></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {todos.map((todo) => {
                        return (
                          <TableRow
                            key={todo.id}
                            sx={{
                              "& .MuiTableCell-body": {
                                fontSize: "16px",
                                fontWeight: "350",
                                paddingLeft: "30px",
                              },
                            }}
                          >
                            <TableCell colSpan="2">{todo.message}</TableCell>

{/* ------------------------setting the completed and not completed icons ---------------------------------------------------- */}

                            {todo.status === "completed" ? (
                              <TableCell align="right">
                                <Tooltip title="completed">
                                  <span>
                                  <IconButton
                                    sx={{ marginRight: "2px" }}
                                    disabled                                    
                                  >
                                    <CheckCircleIcon
                                      color="success"
                                      fontSize="medium"
                                    />
                                  </IconButton>
                                  </span>
                                </Tooltip>
                                <Tooltip title="undo">
                                  <IconButton
                                    sx={{ marginRight: "2px" }}
                                    onClick={(e) => {
                                      handleUndo(todo.id);
                                    }}
                                  >
                                    <RestoreIcon
                                      color="info"
                                      fontSize="medium"
                                    />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="delete">
                                  <IconButton
                                    onClick={(e) => {
                                      handleDelete(e, todo.id);
                                    }}
                                  >
                                    <DeleteIcon
                                      color="error"
                                      fontSize="medium"
                                    />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            ) : (
                              <TableCell align="right">
                                <Tooltip title="complete">
                                  <IconButton
                                    sx={{ marginRight: "2px" }}
                                    onClick={(e) => {
                                      handleComplete(todo.id);
                                    }}
                                  >
                                    <CheckCircleOutlineIcon
                                      color="success"
                                      fontSize="medium"
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="update">
                                  <IconButton
                                    sx={{ marginRight: "2px" }}
                                    onClick={(e) => {
                                      handleEdit(todo.id, todo.message);
                                    }}
                                  >
                                    <EditIcon
                                      fontSize="medium"
                                      sx={{ color: "black" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="delete">
                                  <IconButton
                                    onClick={(e) => {
                                      handleDelete(e, todo.id);
                                    }}
                                  >
                                    <DeleteIcon
                                      color="error"
                                      fontSize="medium"
                                    />
                                  </IconButton>
                                </Tooltip>
                         
                         
                         
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            
          </Stack>
        </Paper>
      </Box>
    </>

);
}

export default Todos; 