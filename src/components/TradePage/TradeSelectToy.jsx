import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import MUI
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, Card, CardMedia, CardContent, CardActionArea, CardActions } from '@material-ui/core';
//require moment for time
const moment = require('moment');

const styles = () => {
    return ({
        title: {
            display: 'flex',
            fontSize: '60px',
            height: '50px',
            marginTop: '70px',
            marginBottom: '40px',
            width: '100%',
            marginRight: '2%',
            marginLeft: '2%',
        },
        button: {
            marginLeft: '5%',
            marginTop: '15px',
            width: '200px',
            letterSpacing: '3px',
            backgroundColor: '#b55af5'
        },
        media: {
            height: '450px',
            width: '750px',
            boxShadow: '0px 0px 5px',
            marginLeft: '5%',
        },
        card: {
            boxShadow: '0px 0px 3px',
        },
        desc: {
            marginLeft: '2%',
            fontSize: '20px',
            borderTop: '1px solid black',
            paddingBottom: '100px'
        },
        user: {
            marginLeft: '2%',
            display: 'wrap',
            marginBottom: '5px',
        },
    })
};//end styles

class TradeSelectToy extends Component {

    componentDidMount() {
        console.log('TradeSelectToy MOUNTED')
        
        this.props.dispatch({
            type: 'fetch_trade_detail',
            payload: this.props.match.params.id
        })
        window.scrollTo(0, 0);
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid>
             
                {this.props.detail.map((toy) => {
                    
                    let date = moment(toy.post_date).format('MMM Do, YYYY');
                    return (
                        <Card className={classes.card} variant="outlined" key="toy.post_id">
                            <CardActionArea>
                                <CardContent>
                                    <Typography className={classes.title}>{toy.post_name}</Typography>
                                    <Typography className={classes.user}>Posted by {toy.username} on {date} | Topic: {toy.cat_name}</Typography>
                                    <Typography className={classes.desc}>{toy.post_body}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActionArea>
                                <CardMedia className={classes.media} image={toy.post_image} title={toy.post_name} />
                                <CardActions>
                                    <Link to="/trade"><Button className={classes.button} variant="outlined">Back To List</Button></Link>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    )
                })}
            </Grid>
        )
    }
};


//put redux on props
const putStateOnProps = reduxState => ({ reduxState, detail: reduxState.details })
//connect redux with component and withStyles
export default connect(putStateOnProps)(withStyles(styles)(TradeSelectToy));