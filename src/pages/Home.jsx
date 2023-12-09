import React from 'react';
import {Box, Button, Paper, Stack, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

function Home(){
    return(
        <Box
        component="div"  
              height="100vh"
            sx={{ background:'url("/Images/background-1.jpg")' , backgroundRepeat:'no-repeat' , backgroundSize:'cover' , backgroundPosition:'bottom' , display:'flex',justifyContent:'center', alignItems:'center' }}
        >
        
            <Paper
            sx={{ width: { xs :'300px' , sm: '500px'} , height:'300px' , borderRadius:'20px' , textAlign:'center' , p:{xs : '0px' , sm:'10px'} , boxShadow:'1px 1px 5px 1px rgba(0,0,0,0.5)'  , backdropFilter:'blur(10px)' , background: "transparent" }}
            elevation={10}
            >
                <Stack spacing="30px" sx={{ padding:{xs: '10%' , sm:"25px 100px"} }}
                
                >
                    <Typography variant='h4' color='error' fontWeight='700' >Todo List</Typography>
                    <Link to='/login' style={{textDecoration:'none' , color:'white'}}>
                    <Button variant='contained' size='large'
                     sx={{fontSize:'20px', width:'250px' , fontWeight:'600', '&:hover':{
                        backgroundColor:'orange'
                    }}}
                    >
                        LOGIN
                    </Button>
                    </Link>
                    <Link to='/register' style={{textDecoration:'none' , color:'white'}}>
                    <Button variant='contained' size='large' 
                    sx={{fontSize:'20px' , width:'250px' , fontWeight:'600', '&:hover':{
                        backgroundColor:'orange'
                    }}}>
                         REGISTER
                    </Button>
                    </Link>

                </Stack>
            </Paper>
        </Box>
    )
}

export default Home;