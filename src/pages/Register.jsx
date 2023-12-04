import { Box, Button, CircularProgress, Icon, IconButton, InputAdornment, Paper, Stack, TextField, Typography,Image, circularProgressClasses } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../FirebaseAuth';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.utils';


function Register() {
    const [showPassword , setShowPassword] = useState(false);
    const [pass , setPass] =  useState();
    const [repass , setRepass] = useState();
    const [uname , setUname] = useState();
    const [email , setEmail] = useState();
    const {signup} = useAuth();
    const {UpdateUser} = useAuth();
    const navigate = useNavigate();
    const [isloading , setIsloading] = useState(false);

    async function handleSignup(e){
        e.preventDefault();
        if(pass === repass)
        {
           try{
            setIsloading(true);
            await signup(email , pass)
            .then((userr) => {

                updateProfile( userr.user ,  {
                    displayName: uname
                })
                
            });
            setIsloading(false);
            navigate('/todolist/all');
       
           } 
           catch(error)
           {
            setIsloading(false);
            alert(error.message);
            navigate('/');
           }
        }
    }

  return (
    <Box
    component="div"  
          height="100vh"
        sx={{ background:'url("/Images/background-1.jpg")' , backgroundRepeat:'no-repeat' , backgroundSize:'cover' , backgroundPosition:'center' , display:'flex',justifyContent:'center', alignItems:'center' , marginLeft:'-100px' }}
        
    >
        
                  {
        isloading ? 
            <Box
            width='300px'
            height='300px'
            sx={{ borderRadius:'10px' , alignItems:'center' , justifyContent:'center' , display:'flex' , flexDirection:'column' , backdropFilter:'blur(10px)' , boxShadow:'1px 1px 5px 2px black'}}
        >   
            <CircularProgress size='100px' color='success'  sx={{ marginBottom:'10px' }} />
            <Typography variant='h4' color="white" >Registering....</Typography>
            
        </Box>
        :

        <Paper
        sx={{ width:'400px' , height:'480px' , borderRadius:'20px' , textAlign:'center' , p:'10px' , boxShadow:'1px 2px 5px 2px rgba(0,0,0,0.5)'  , backdropFilter:'blur(30px)' , background: "transparent"   }}
        elevation={4}
        >
            <Stack spacing={2} direction="column">
                <Typography variant='h4' sx={{ color:'white' , fontWeight:"600" , paddingTop:'15px' , paddingBottom:'15px' }} >Registration</Typography>
                <form>
                    <TextField id="uname" type="text" label="Display name" variant='filled' size='small' sx={{ backgroundColor:'white' , marginBottom:'20px', width:'320px',borderRadius:'5px' }}  required value={uname} onChange={(e) => {setUname(e.target.value)}}  className='form-control'/>
                    <TextField id="emailId" type="text" label="Email ID" variant='filled' size='small' sx={{ backgroundColor:'white' , marginBottom:'20px', width:'320px',borderRadius:'5px' }}  required value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    <TextField id="password" type={ showPassword ? "text" : "password"} label="Password" variant='filled' size='small' InputProps={{ endAdornment:<InputAdornment position='end' ><IconButton edge='end' onClick={() => {setShowPassword(!showPassword)}}>
                            {
                                !showPassword ? <VisibilityIcon fontSize='medium' sx={{color:'black'}} /> : <VisibilityOffIcon fontSize='medium' sx={{color:'black'}} />
                            }
                        </IconButton></InputAdornment> }} sx={{ backgroundColor:'white', borderRadius:'5px' , marginBottom:'20px', width:'320px'}} required value={pass} onChange={(e) => {setPass(e.target.value)}} />
                    <TextField id="retypepassword" type="password" label="retype Password" variant='filled' size='small' sx={{ backgroundColor:'white', borderRadius:'5px' , marginBottom:'20px', width:'320px'}} required value={repass} onChange={(e) => {setRepass(e.target.value)}} />
                    <Button variant='contained' color='info' type='submit' sx={{ fontSize:'18px' , fontWeight:'550' , '&:hover':{backgroundColor:'green' , color:'white'} }} onClick={handleSignup}>REGISTER</Button>
                </form>

            </Stack>
            <Stack direction='row' sx={{ marginTop:'20px' , marginLeft:'10px' }}  >
                <Typography  color='white' fontSize="15px" sx={{ marginLeft:'13%' }} >Already have an Account</Typography> <Icon sx={{ marginLeft:'5px ' }}> <KeyboardDoubleArrowRightOutlinedIcon fontSize='medium' sx={{ paddingBottom:'10px' }} /> </Icon> <Link to="/login"> <Button color='info' size='medium' sx={{ fontSize:'14px' , color:'red' , '&:hover':{color:'yellow' } , marginTop:'-6px' , marginLeft:'-8px' , fontWeight:'550'}} >LOGIN</Button> </Link> 
                </Stack>
        </Paper>
}

    </Box>
  )
}

export default Register;