import React, { Component } from 'react';
import { connect } from 'react-redux';
//import MUI
import { Grid, Box, Typography, Card, CardMedia, CardContent, CardActionArea, CardActions, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const moment = require('moment');

const styles = () => {
  return ({
    page: {
      margin: '0px',
      overflow: 'hidden',
      paddingBottom: '75px',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
    title: {
      display: 'inline-block',
      height: '50px',
      marginTop: '120px',
      marginBottom: '15px',
      width: '100%',
      textAlign: 'center',
      paddingBottom: '38px',
      borderBottom: '2px solid black'
    },
    description: {
      marginBottom: '23px',
      borderBottom: '2px solid black',
      paddingLeft: '300px',
      paddingBottom: '5px'
    },
    media: {
      height: '450px',
      maxWidth: '450px',
      position: 'center',
      boxShadow: '0px 0px 1px 0px'
    },
    button: {
      width: '180px',
      letterSpacing: '5px',
      paddingTop: '5px',
      backgroundColor: '#c760ff'
    },
    card: {
      boxShadow: '0px 0px 2px #28283e',
      maxWidth: '80%',
      width: '450px',
      margin: '20px 0px',
      padding: '5px'
    },
    toyGrid: {
      paddingTop: '10px',
      marginRight: '1%',
      marginLeft: '1%',
      width: '100%'
    },
    user: {
      fontSize: '15px',
    },
    welcomeGrid: {
      width: '100%'
    },
    name: {
      fontSize: '40px',
      fontStyle: 'oblique',
    }
  })
};

class UserPage extends Component {
  componentDidMount() {
    console.log('UserPage MOUTED');
  
    this.props.dispatch({
      type: 'fetch_account'
    });

    window.scrollTo(0, 0);
  };

  handleEdit = (toy) => {
    console.log('Take me to the Edit Page.');
    this.props.history.push(`/account/edit/${toy.post_id}`);
  }

  render() {
    
    let date = moment(this.props.user.user_date).format(`MMM Do, YYYY`);
    let username = this.props.user.username;
    const { classes } = this.props;
    return (
      <Box className={classes.page}>
        <Typography variant="h5" className={classes.title}><Typography className={classes.name}>{username}</Typography>has been a member since: {date}</Typography>
       
        <Grid container className={classes.toyGrid} spacing={2}>
          {this.props.account.map((toy) => {
            let date = moment(toy.post_date).format('MMM Do, YYYY')
            return (
              <Grid item xs={3} key={toy.id}>
                
                {toy.post_cat === 1 | 2 | 3 &&
                  <Card variant="outlined" className={classes.card}>
                    <CardActionArea>
                      <CardContent>
                        <Typography variant="h6">{toy.post_name}</Typography>
                        <CardMedia className={classes.media} image={toy.post_image} title={toy.post_name} />
                      </CardContent>
                      <CardActions>
                        <Button variant="outlined" onClick={(event) => this.handleEdit(toy)} className={classes.button}>EDIT</Button>
                        <Typography className={classes.user}>Last updated: {date}</Typography>
                        <Typography variant="h6">{toy.cat_name}</Typography>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                } 
              </Grid>
            )
          })} 
        </Grid>
      </Box>
    )
  }
};


const putPropsOnState = reduxState => ({ reduxState, user: reduxState.user, account: reduxState.accountsReducer });
//connect redux with component and withStyles
export default connect(putPropsOnState)(withStyles(styles)(UserPage));