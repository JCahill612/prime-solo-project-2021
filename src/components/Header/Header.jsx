import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Header.css'
import Drawer from '../Drawer/Drawer'

import { useSelector } from 'react-redux';


export default function Header() {


  const [openDrawer, setOpenDrawer] = useState(false)
  const user = useSelector((store) => store.user); 
  const dispatch = useDispatch();

  return (

    
      <AppBar position="static">
        
        <Toolbar>
        {user.id && (
          <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick = {()=>{setOpenDrawer(prevState=>!prevState)}}
          >
            <MenuIcon />
          </IconButton>
          </>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home" className="headerLink">
                <h2 className="nav-title">Blind Bag Market</h2>
            </Link>
          </Typography>


          {!user.id &&
          <Link to="/login" className="headerLink">
              Login / Register
          </Link>
          }

        {user.id && (
          <>
            {/* <Link to="/user" className="headerLink">
              Home
            </Link> */}

            {/* <Link to="/login" className="headerLink">
              Login / Register
            </Link> */}

            {/* <Link to="/info" className="headerLink">
              Info Page
            </Link> */}
            
            <div className = "headerLink"
            onClick={() => dispatch({ type: 'LOGOUT' })} > Logout </div>
            
          </>
        )}

        
        <Link to="/view" className="headerLink">
          View All Toys
        </Link>


        <Link to="/about" className="headerLink">
          About
        </Link>


        </Toolbar>
        <Drawer openDrawer = {openDrawer} setOpenDrawer = {setOpenDrawer}/>
      </AppBar>



  );
}
