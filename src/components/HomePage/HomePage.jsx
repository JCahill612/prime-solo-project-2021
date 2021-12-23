import React, { Component } from 'react';
import { connect } from 'react-redux';
//import for MUI
import { withStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, Card, CardMedia, CardContent, CardActionArea, CardActions, Button } from '@material-ui/core';



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
            borderBottom: '2px solid black',
            width: '100%',
            paddingLeft: '20px',
            paddingBottom: '5px'
        },
        media: {
            height: '275px',
            maxWidth: '400px',
            position: 'center',
            width: '100%',
            boxShadow: '0px 0px 3px 0px'
        },
        button: {
            width: '450px',
            letterSpacing: '5px',
            paddingTop: '0px',
            backgroundColor: '#c760ff'
        },
        card: {
            boxShadow: '0px 0px 2px #28283e',
            maxWidth: '90%',
            margin: '18px 0px',
            padding: '5px'
        },
        grid: {
            paddingTop: '10px',
            marginRight: '2%',
            marginLeft: '1%',
            width: '100%'
        },
    })
};

class HomePage extends Component {
    componentDidMount() {
        console.log('Home Page MOUNTED', this.props.reduxState);
       
        this.props.dispatch({
            type: 'fetch_toys'
        });
        window.scrollTo(0, 0);
    };


    handleClick = (toy) => {
        console.log('WHAT IS MY TOY', toy);
        this.props.history.push(`/home/details/${toy.post_id}`)
    };//end handleClick

    render() {
      
        const { classes } = this.props;
        return (
            <Box className={classes.page}>
                <Typography variant="h3" className={classes.title}>Recent Posts</Typography>
               
                <Grid container className={classes.grid} spacing={2}>
                    {this.props.reduxState.homeReducer.map((toy, index) => {
                        return (
                            <Grid key={index}>
                                
                                {toy.post_cat === 1 | 2 | 3 &&
                                    <Card variant="outlined" className={classes.card}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography variant="h6">{toy.post_name}</Typography>
                                                <CardMedia className={classes.media} onClick={(event) => this.handleClick(toy)} image={toy.post_image} title={toy.post_name} />
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={(event) => this.handleClick(toy)} className={classes.button}>More Info</Button>
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

//put props on redux
const putPropsOnState = reduxState => ({ reduxState })
//wrap withStyles to allow MUI styling
export default connect(putPropsOnState)(withStyles(styles)(HomePage));
