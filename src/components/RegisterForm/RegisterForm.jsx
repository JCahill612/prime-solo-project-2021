import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [zip, setzip] = useState('');
  const [phone, setphone] = useState('');



  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();


  const registerUser = () => {

    console.log(username,password,email,address,zip,phone)
    dispatch({
      type: 'REGISTER',
      payload: {
        username, password,email,address,zip,phone
      }
      });
  }; // end registerUser

  return (
      <Grid container direction="column" spacing={2} alignContent="center">
        <Grid item>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      </Grid>

      <Grid item>
          <TextField
            label="Username"
            value={username}
            type="text"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
      </Grid>
      <Grid item>
      <TextField
            label="Enter Password"
            value={password}
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
      </Grid>
      <Grid item>
      <TextField
            label="Enter Email"
            value={email}
            type="email"
            required
            onChange={(event) => setemail(event.target.value)}
          />
       </Grid>
      <Grid item>
      <TextField
            label="Enter Address"
            value={address}
            type="text"
            required
            onChange={(event) => setaddress(event.target.value)}
          />
       </Grid>
      <Grid item>
      <TextField
            label="Enter Zip"
            value={zip}
            type="number"
            required
            onChange={(event) => setzip(event.target.value)}
        />
       </Grid>
      <Grid item>
      <TextField
            label="Enter Phone"
            value={phone}
            type="number"
            required
            onChange={(event) => setphone(event.target.value)}
        />
       </Grid>
      <Grid item>
        <Button disabled = { !username || !password || !zip || !phone || !email || !address}
        onClick={registerUser} variant="contained">Register</Button>
        </Grid>
      </Grid>
  );
}

export default RegisterForm;
