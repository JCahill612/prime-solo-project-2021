import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import MUI
import { Box, Button, TextField, InputLabel, FormControl, MenuItem, Select, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => {
    return ({
        button: {
            display: 'inline-block',
            marginLeft: '12%',
            padding: '10px',
            marginBottom: '50px',
        },
        createBtn: {
            padding: '14px',
            marginLeft: '67%',
            width: '250px'
        },
        formControl: {
            minWidth: '120px',
            marginLeft: '2%'
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
        inputs: {
            marginLeft: '2%'
        },
        title: {
            width: '300px'
        },
        desc: {
            marginLeft: '20px',
            width: '1000px'
        },
        url: {
            margin: '30px 0px 50px 0px',
            width: '1320px'
        },
    })
};

class CreatePost extends Component {

    state = {
        topic: '',
        open: false,
        description: '',
        image: '',
        title: '',
        user: this.props.user.id
    }

    componentDidMount() {
        console.log('Create Post MOUNTED');
    
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
        this.setState({
            topic: event.target.value
        })
    };

    
    toyDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    };


    imageUrl = (event) => {
        this.setState({
            image: event.target.value
        })
    };

    
    title = (event) => {
        this.setState({
            title: event.target.value
        })
    };

    
    createPost = () => {

        if (this.state.description === '' || this.state.image === '' || this.state.title === '' || this.state.topic === '') {
            return alert({
                title: 'Empty Inputs!',
                text: 'Please fill in all of the inputs before creating.',
                confirmButtonText: 'OK'
            })
        } else {

            this.props.dispatch({
                type: 'create_post',
                payload: {
                    description: this.state.description,
                    image: this.state.image,
                    catId: this.state.topic,
                    user: this.props.user.id,
                    title: this.state.title
                }
            });
            this.props.history.push('/account')

            return alert({
                title: 'Post has been Created!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
    };

    render() {

        const { classes } = this.props;
        return (
            <Box>
                <Typography variant="h2" className={classes.header}>Create A Post</Typography>
                <Link to="/allToys"><Button className={classes.button} variant="outlined">All Toys Page</Button></Link>
                <Link to="/buy"><Button className={classes.button} variant="outlined">Buyers Page</Button></Link>
                <Link to="/sell"><Button className={classes.button} variant="outlined">Sellers Page</Button></Link>
                <Link to="/trade"><Button className={classes.button} variant="outlined">Traders Page</Button></Link >

                <Box className={classes.inputs}>
                    <TextField className={classes.title} onChange={(event) => this.title(event)} label="post title" variant="outlined" />
                    <TextField className={classes.desc} onChange={(event) => this.toyDesc(event)} label="description of toy and best contact method" multiline rowsMax={5} variant="filled" />
                    <TextField className={classes.url} onChange={(event) => this.imageUrl(event)} label="image url address" variant="outlined" />
                </Box>

                <FormControl className={classes.formControl}>
                    <InputLabel>Topic</InputLabel>
                    <Select
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
                <Button className={classes.createBtn} variant="outlined" size="large" onClick={this.createPost}>Create</Button>
            </Box>
        )//end return
    };//end render
};//end class


const reduxStateOnProps = state => ({ user }) => ({ user: state.user });
// const putPropsOnState = reduxState => ({reduxState})
export default connect(reduxStateOnProps)(withStyles(styles)(CreatePost));