import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
//MUI imports
import { Box, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


//styles for material ui
const styles = () => {
  return ({
    navTitle: {
      width: '30%',
      float: 'left',
      lineHeight: '50px',
      letterSpacing: '3px',
      paddingLeft: '2%',
      color: 'white',
      paddingTop: '20px'
    },
    nav: {
      overflow: 'hidden',
      backgroundColor: '#61137f',
      position: 'fixed',
      Top: '0',
      zIndex: '12',
      width: '100%',
      margin: 'auto 0',
      minHeight: '80px',
      maxHeight: '80px',
    },
    navLink: {
      display: 'inline-block',
      float: 'left',
      fontSize: '20px',
      margin: '0px 10px',
      backgroundColor: 'black',
      color: 'white',
      paddingTop: '23px',
      paddingBottom: '23px',
      '&:hover': {
        backgroundColor: '#28283e',
      }
    },
    navRight: {
      float: 'right',
      fontSize: '20px',
      margin: '0px 0px',
      backgroundColor: 'black',
      color: 'white'
    },
    logo: {
      maxWidth: 160,
    },
  });
};

class Nav extends Component {

  render() {

    const { classes } = this.props;
    return (
      <Box className={classes.nav} boxShadow={8}>

        <Typography img src="logo.png" alt="logo" className={classes.logo}></Typography>
        <Link to="/home"><Typography variant="h3" className={classes.navTitle}>Blind Bag Market</Typography></Link>
        <nav className={classes.navRight}>

          <Link to="/home"><Button className={classes.navLink}>Home</Button></Link>

          <Link to="/allToys"><Button className={classes.navLink}>All Toys</Button></Link>

          <Link to="/trade"><Button className={classes.navLink}>Message</Button></Link>
          <Link to="/account">

            {this.props.user.id ?
             <Button className={classes.navLink}>My Toys</Button>
             :
              <Button className={classes.navLink}>Login</Button>}
          </Link>

          {this.props.user.id && (
            <>
              <Link to="/home"><LogOutButton className={classes.navLink} /></Link>
            </>
          )}

        </nav>
      </Box>
    )
  }
};

//connect redux to props can target "user" to target user reducer
const putPropsOnState = reduxState => ({ reduxState, user: reduxState.user })
//wrap withStyles to allow MUI styling
export default connect(putPropsOnState)(withStyles(styles)(Nav));
