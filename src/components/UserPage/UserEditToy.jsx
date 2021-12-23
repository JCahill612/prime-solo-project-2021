import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import MUI
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, TextField, FormControl, MenuItem, Select, Typography, Card, CardContent, CardMedia, InputLabel } from '@material-ui/core';
//require moment for date formatting
const moment = require('moment');



const styles = theme => {
    return ({
        button: {
            lettingSpacing: '2px',
        },
        formControl: {
            minWidth: '120px',
            marginLeft: '2%',
            paddingBottom: '20px'
        },
        header: {
            display: 'inline-block',
            height: '50px',
            marginTop: '120px',
            marginBottom: '15px',
            width: '100%',
            textAlign: 'center',
            paddingBottom: '38px',
            borderBottom: '2px solid black',
        },
        backBtn: {
            marginLeft: '2%',
            padding: '7px',
            letterSpacing: '3px',
            marginBottom: '10px',
            backgroundColor: '#c760ff'
        },
        desc: {
            minWidth: '1000px',
            minHeight: '100px',
            padding: '5px'
        },
        title: {
            padding: '5px',
            width: '300px',
            textSize: '40px'
        },
        contTitle: {
            marginLeft: '2%',
            margin: '10px 0px 10px 0px',
            paddingRight: '50px'
        },
        selector: {
            width: '200px'
        },
        submitBtn: {
            marginLeft: '2%',
            padding: '10px',
            lettingSpacing: '2px',
            backgroundColor: '#c760ff'
        },
        deleteBtn: {
            padding: '10px',
            lettingSpacing: '2px',
            marginLeft: '2%',
            backgroundColor: '#c760ff'
        },
        media: {
            height: '500px',
            maxWidth: '750px',
            boxShadow: '0px 0px 2px'
        }
    })
};

class UserEditToy extends Component {


    state = {
        open: false,
        topic: ''
    }

    componentDidMount() {
        console.log('UserEditToy MOUNTED');
       
        this.props.dispatch({
            type: 'fetch_edit_toy',
            payload: this.props.match.params.id
        })
        
        window.scrollTo(0, 0);
    }

   
    handleClose = () => {
        this.setState({
            open: false
        })
    };
    handleOpen = () => {
        this.setState({
            open: true
        })
    };

 
    handleChange = (event) => {
        console.log('You have set the new topic', event.target.value);
        this.setState({
            topic: event.target.value
        })
        this.props.dispatch({
            type: 'change_category',
            payload: event.target.value
        })
    };

    handleTitle = (event) => {
        this.props.dispatch({
            type: 'change_title',
            payload: event.target.value
        })
    };

    handleDesc = (event) => {
        this.props.dispatch({
            type: 'change_description',
            payload: event.target.value
        })
    };

    handleSubmit = () => {
        console.log('UPDATING data');
        
        Swal.fire({
            title: 'Post has been edited!',
            icon: 'success',
            confirmButtonText: 'OK',
        })
        
        this.props.dispatch({
            type: 'edit_toy',
            payload: {
                toy: this.props.edittoy,
                updatedDate: moment().format()
            }
        })
        
        this.props.history.push(`/account`);
    };

    handleDelete = () => {
        Swal.fire({
            title: 'Delete your post?',
            icon: 'question',
            confirmButtonText: 'Delete it anyways.',
            confirmButtonColor: '#cc0000',
            showCancelButton: true,
            cancelButtonText: 'Keep the post.'
        }).then((result) => {
            
            if (result.value) {
                this.props.dispatch({
                    type: 'delete',
                    payload: this.props.match.params.id
                })
                
                Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                })
                
                this.props.history.push(`/account`);
            }
        })
    };


    render() {
        const { classes } = this.props;
        let toy = this.props.editToy;
       
        return (
            <Box>
                <Button>HEllO</Button>
                <Typography variant="h2" className={classes.header}>Edit Your Toy Info</Typography>
                <Link to="/account"><Button className={classes.backBtn} variant="outlined">Go Back To My Toys</Button></Link>
                
                <Box>
                    <Typography className={classes.contTitle} variant="h4">Title: <TextField className={classes.title} onChange={(event) => this.handleTitle(event)} value={toy.post_name} /></Typography>
                    <Typography className={classes.contTitle} variant="h4">Description: <TextField className={classes.desc} onChange={(event) => this.handleDesc(event)} value={toy.post_body} multiline rowsMax={5} variant="filled" /></Typography>
                    
                    <Typography variant="h4" className={classes.contTitle}>Current Topic: {toy.cat_name}</Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel>{toy.cat_name}</InputLabel>
                        <Select
                            className={classes.selector}
                            variant="outlined"
                            open={this.state.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={this.state.topic}
                            onChange={(event) => this.handleChange(event)}>
                            <MenuItem value={1}><em>Buy</em></MenuItem>
                            <MenuItem value={2}><em>Sell</em></MenuItem>
                            <MenuItem value={3}><em>Trade</em></MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Box>
                        {this.props.user.id === toy.user_id &&
                            <>
                                <Button className={classes.submitBtn} onClick={this.handleSubmit} variant="outlined">Submit Changes</Button>
                                <Button className={classes.deleteBtn} onClick={this.handleDelete} variant="outlined">delete</Button>
                            </>
                        }
                    </Box>
                    
                    <Card>
                        <CardContent>
                            <CardMedia className={classes.media} image={toy.post_image} title={toy.post_name} />
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        )
    }
};

const putPropsOnState = reduxState => ({ reduxState, user: reduxState.user, editToy: reduxState.editToyReducer, theToy: reduxState.toyToEdit })
export default connect(putPropsOnState)(withStyles(styles)(UserEditToy));
