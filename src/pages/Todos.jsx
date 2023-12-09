import {
  Box,
  Button,
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
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.utils";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestoreIcon from "@mui/icons-material/Restore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todos() {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const userId = currentUser ? currentUser.uid : null;
  const [message, setMessage] = useState("");
  const [isedit, setIsedit] = useState(false);
  const [isType, setIsType] = useState(null);
  const { type } = useParams();
  const navigate = useNavigate();

  const errorToast = () => {
    toast.error("Task Deleted Successfully", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const successToast = () => {
    toast.success("Successfully Logged In", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  function firstLogin() {
    navigate("/todolist/all")
    .then(successToast()); 
  }
  window.onload = () => {
    navigate("/todolist/all");
  };

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
  const handleDelete = (e, id) => {
    const ref = doc(db, "users", userId, "data", id);
    deleteDoc(ref);
    errorToast();
    fetchData();
  };

  const handleEdit = (id, msg) => {
    setMessage(msg);
    setIsedit(id);
  };
  const handleComplete = (id) => {
    const ref = doc(db, "users", userId, "data", id);
    updateDoc(ref, { status: "completed" });
    fetchData();
  };
  const handleUndo = (id) => {
    const ref = doc(db, "users", userId, "data", id);
    updateDoc(ref, { status: "notcompleted" });
    fetchData();
  };

  function fetchData() {
    if (type === "user") {
      firstLogin();
    }
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
        const q = query(ref, orderBy("status", "desc"));
        onSnapshot(q, (snapshot) => {
          setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
      }
    }
  }
  useEffect(() => {
  
    fetchData();
  }, [userId, isType, type, message]);

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
          background: 'url("/Images/background-1.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: "15px",
            width: { xs: "420px", sm: "680px" },
            height: "562px",
            display: "flex",
            borderRadius: "10px",
            backgroundColor: "rgb(226, 223, 210)",
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
              {isType === null ? (
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Welcome{" "}
                  <Typography
                    variant="h5"
                    color="blue"
                    sx={{
                      fontWeight: "550",
                      fontSize: "23px",
                      paddingLeft: "12px",
                    }}
                  >
                    {" "}
                    {currentUser ? currentUser.displayName : ""}{" "}
                  </Typography>{" "}
                </Typography>
              ) : isType === "completed" ? (
                "Completed Tasks"
              ) : (
                "Not completed Tasks"
              )}
            </Typography>

            <Stack spacing={3} width="100%">
              <Box sx={{ width: { xs: "380px", sm: "650px" } }}>
                <TextField
                  type="text"
                  placeholder="Start typing here......"
                  size="small"
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    width: "75%",
                    backgroundColor: "white",
                    fontSize: "16px",
                  }}
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
                    marginLeft: "5px",
                    "&:hover": { backgroundColor: "blue" },
                    fontSize: { xs: "14px", sm: "16px" },
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
                  sx={{
                    width: { xs: "390px", sm: "650px" },
                    marginLeft: "-5px",
                  }}
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
                      <TableCell color="white" colSpan="2" width="60%">
                        Tasks
                      </TableCell>

                      <TableCell width="100%"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todos.length === 0 ? <h1>No tasks</h1> : null}
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
                              <span>
                                <IconButton
                                  sx={{ marginRight: { xs: "0", sm: "2px" } }}
                                  disabled
                                >
                                  <CheckCircleIcon
                                    color="success"
                                    sx={{
                                      fontSize: { xs: "18px", sm: "23px" },
                                    }}
                                  />
                                </IconButton>
                              </span>
                              <IconButton
                                sx={{ marginRight: { xs: "0", sm: "2px" } }}
                                onClick={(e) => {
                                  handleUndo(todo.id);
                                }}
                              >
                                <RestoreIcon
                                  color="info"
                                  sx={{ fontSize: { xs: "18px", sm: "23px" } }}
                                />
                              </IconButton>

                              <IconButton
                                onClick={(e) => {
                                  handleDelete(e, todo.id);
                                }}
                              >
                                <DeleteIcon
                                  color="error"
                                  sx={{ fontSize: { xs: "18px", sm: "23px" } }}
                                />
                              </IconButton>
                            </TableCell>
                          ) : (
                            <TableCell align="right">
                              <IconButton
                                sx={{ marginRight: { xs: "0", sm: "2px" } }}
                                onClick={(e) => {
                                  handleComplete(todo.id);
                                }}
                              >
                                <CheckCircleOutlineIcon
                                  color="success"
                                  sx={{ fontSize: { xs: "18px", sm: "23px" } }}
                                />
                              </IconButton>

                              <IconButton
                                sx={{ marginRight: { xs: "0", sm: "2px" } }}
                                onClick={(e) => {
                                  handleEdit(todo.id, todo.message);
                                }}
                              >
                                <EditIcon
                                  sx={{
                                    fontSize: { xs: "18px", sm: "23px" },
                                    color: "black",
                                  }}
                                />
                              </IconButton>

                              <IconButton
                                onClick={(e) => {
                                  handleDelete(e, todo.id);
                                }}
                              >
                                <DeleteIcon
                                  color="error"
                                  sx={{ fontSize: { xs: "18px", sm: "23px" } }}
                                />
                              </IconButton>
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
