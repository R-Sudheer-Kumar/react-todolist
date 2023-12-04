import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';
import { AuthProvider } from './FirebaseAuth';
import { createMuiTheme, createTheme , ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme(
    {
      typography:{
        fontFamily:['Poppins' , 'sans-serif'].join(',')
      }
    }
  )
  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='login' element={ <Login /> }/>
        <Route path='register' element={ <Register /> }/>
        <Route path='todolist/:type' element={<Todos />}/>
        <Route path='*' element={<h1>Erorr</h1>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
