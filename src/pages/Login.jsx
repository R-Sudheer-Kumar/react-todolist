import { Box, Button, CircularProgress, Icon, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';


import React, { createContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Todos from './Todos';
import { useAuth } from '../FirebaseAuth';

function Login() {
    const [showPassword , setShowPassword] = useState(false);
    const [email , setEmail] = useState('');
    const [pass , setPass] = useState('');
    const navigate = useNavigate();
    const usercontext = createContext();
    const {Authlogin} = useAuth();
    const [isloading , setIsloading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            setIsloading(true);
            await Authlogin(email , pass);
            setIsloading(false);
            navigate('/todolist/all');
        }
        catch(error){
            alert(error)
            .then(navigate('/'));
        }
  
    }
  return (
    <>
  
    
    <Box
    component="div"  
          height="100vh"
        sx={{ background:'url("/Images/background-1.jpg")' , backgroundRepeat:'no-repeat' , backgroundSize:'cover' , backgroundPosition:'center' , display:'flex',justifyContent:'center', alignItems:'center' }}
    >
          {
        isloading ? 
            <Box
            width='300px'
            height='300px'
            sx={{ borderRadius:'10px' , alignItems:'center' , justifyContent:'center' , display:'flex' , flexDirection:'column' , backdropFilter:'blur(10px)' , boxShadow:'1px 1px 5px 1px black'}}
        >   
            <CircularProgress size='100px' color='success'  sx={{ marginBottom:'10px' }} />
            <Typography variant='h4' color="white" >Logging  in....</Typography>
            
        </Box>
        :

        <Paper
        sx={{ width:'400px' , height:'380px' , borderRadius:'20px' , textAlign:'center' , p:'10px' , boxShadow:'1px 1px 5px 1px rgba(0,0,0,0.5)'  , backdropFilter:'blur(15px)' , background: "transparent" }}
        elevation={5}
        >
            <Stack spacing={2} direction="column">
                <Typography variant='h4' sx={{ color:'white' , fontWeight:"600" , paddingTop:'15px' , paddingBottom:'15px' }} >Login</Typography>
                <form>
                    <TextField id="emailId" type="text" label="Email ID" variant='filled' size='medium' sx={{ backgroundColor:'white' , marginBottom:'20px', width:'320px',borderRadius:'5px' }}  value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    <TextField id="password" type={ showPassword ? "text" : "password"} label="Password" variant='filled' size='medium' InputProps={{ endAdornment:<InputAdornment position='end' ><IconButton edge='end' onClick={() => {setShowPassword(!showPassword)}}>
                            {
                                !showPassword ? <VisibilityIcon fontSize='medium' sx={{color:'black'}} /> : <VisibilityOffIcon fontSize='medium' sx={{color:'black'}} />
                            }
                        </IconButton></InputAdornment> }} sx={{ backgroundColor:'white', borderRadius:'5px' , marginBottom:'20px', width:'320px'}} value={pass} onChange={(e) => {setPass(e.target.value)}} />
                    <Button variant='contained' color='info' type='submit' sx={{ fontSize:'18px' , fontWeight:'550' , '&:hover':{backgroundColor:'green' , color:'white'} }} onClick={handleLogin}>LOGIN</Button>
                </form>

            </Stack>
            <Stack direction='row' sx={{ marginTop:'30px' , marginLeft:'13%' }}  >
                <Typography color='white' fontSize="18px" >Don't have a account </Typography> <Icon sx={{ marginLeft:'5px ' }}> <KeyboardDoubleArrowRightOutlinedIcon /> </Icon> <Link to="/register"> <Button color='info' size='large' sx={{ fontSize:'16px' , color:'red' , '&:hover':{color:'yellow' } , marginTop:'-8px' , marginLeft:'-8px' , fontWeight:'550'}} >Register</Button> </Link> 
                </Stack>
        </Paper>
        }
    </Box>

</>
  )
}

export default Login;