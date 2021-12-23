import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Box } from '@material-ui/core';

class ToyBox extends Component {

  componentDidMount(){
    console.log('ToyBox MOUNTED');
    //dispatch to redux GET
    this.props.dispatch({
      type: 'FETCH_toyBox'
    });//end dispatch
  };//end ToyBox

  render() {
    return (
      <Box>
        <h1>Toy Box</h1>
        {this.props.reduxState.toyBoxReducer.map((toy, index) => {
          return (
            <div key={index}>
              <img src={toy.post_image} alt={toy.post_name} style={{ width: 'auto', height: 'auto', maxWidth: '250px', minWidth: '250px' }}/>
            </div>
          );//end return
        }//end map
        )}
      </Box>
    )
  }
};

//connect to saga and redux
const putStateOnProps = reduxState => ({reduxState})
export default connect(putStateOnProps)(ToyBox);
