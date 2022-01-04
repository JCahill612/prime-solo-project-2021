import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Toys } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {useDispatch} from 'react-redux'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Address: {user.user_address}</p> 
      <p>Zip code: {user.zip_code}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
