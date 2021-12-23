import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import MUI
import { Grid, Box, Typography, Card, CardMedia, CardContent, CardActionArea, CardActions, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
//import moment for date formatting
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
            fontSize: '50px',
            height: '50px',
            marginTop: '120px',
            marginBottom: '15px',
            width: '100%',
            marginRight: '2%',
            marginLeft: '2%',
        },
        description: {
            marginBottom: '23px',
            borderBottom: '2px solid black',
            paddingLeft: '300px',
            paddingBottom: '5px',
        },
        media: {
            height: '275px',
            maxWidth: '450px',
            position: 'center',
            boxShadow: '0px 0px 1px 0px'
        },
        button: {
            width: '180px',
            letterSpacing: '5px',
            paddingTop: '0px',
            backgroundColor: '#c760ff'
        },
        card: {
            boxShadow: '0px 0px 2px #28283e',
            maxWidth: '90%',
            width: '450px',
            margin: '18px 0px',
            padding: '5px'
        },
        grid: {
            paddingTop: '10px',
            marginRight: '2%',
            marginLeft: '2%',
            width: '100%',
        },
        createBtn: {
            width: '250px',
            letterSpacing: '5px',
            padding: '3px',
            marginLeft: '50px',
            backgroundColor: '#c760ff'
        },
        user: {
            fontSize: '17px',
        }
    })
};

class TradePage extends Component {

    componentDidMount() {
        console.log('TradePage MOUNTED', this.props.reduxState.allToysReducer);
      
        this.props.dispatch({
            type: 'fetch_all'
        });
        window.scrollTo(0, 0);
    };

    handleClick = (toy) => {
      
        console.log('Selecting specific toy for details from Trade Page.');
        this.props.history.push(`/trade/details/${toy.post_id}`)
    };

    render() {
        
        const { classes } = this.props;
        return (
            <Box className={classes.page}>
                <Typography variant="h3" className={classes.title}>Trade</Typography>
                <Typography className={classes.description}></Typography>
           
                {this.props.user.id && (
                    <>
                        <Link to="/create"><Button className={classes.createBtn} variant="outlined">Create Post</Button></Link>
                    </>
                )}
                {/* BEGIN GRID */}
                <Grid container className={classes.grid} spacing={2}>
                    {this.props.reduxState.allToysReducer.map((toy, index) => {
                        let date = moment(toy.post_date).format('MMM Do, YYYY')
                        return (
                            <Grid key={index}>
                                
                                {toy.post_cat === 3 &&
                                    <Card variant="outlined" className={classes.card}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography variant="h6">{toy.post_name}</Typography>
                                                <CardMedia className={classes.media} onClick={(event) => this.handleClick(toy)} image={toy.post_image} title={toy.post_name} />
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={(event) => this.handleClick(toy)} className={classes.button}>DETAILS</Button>
                                                <Typography className={classes.user}>Posted by {toy.username} on {date}</Typography>
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
    };
};

//put props on redux
const putPropsOnState = reduxState => ({ reduxState, user: reduxState.user });
//connect redux with component and withStyles
export default connect(putPropsOnState)(withStyles(styles)(TradePage));
