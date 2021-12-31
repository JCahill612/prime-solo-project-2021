import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  
    
  const index = props.availableToys.findIndex((element)=> props.user == element.toys_userid)

  const handleClose = () => props.setOpen(false);
    const [selectedToy, setSelectedToy] = useState("")
    const [message, setMessage] = useState("")

    const renderModal = () => {
        if (!props.user){
            return (      
                <>
                <Typography>You are not logged in please login to continue</Typography>
                <Button variant="contained" component={Link} to = {'/login'}>Proceed to Login Page</Button>
                </>)
            }
        else if (index < 0) {
            return (
                <>
                <Typography>You have not posted/available for trade toys</Typography>
                <Button variant="contained" component={Link} to = {'/posttoy'}>Add Toys</Button>
               </>
            )}
            else {
                 
                const filteredList = props.availableToys.filter(toy=> props.user == toy.toys_userid)
                return (
                    <>
                        <InputLabel id="demo-simple-select-label">Select a Toy</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedToy}
                            label="Select a toy"
                            onChange={(e)=>{setSelectedToy(e.target.value)}}
                            style={{minWidth:"15rem",margin:"auto"}}
                            >
                            {filteredList.map(toy=>
                            <MenuItem value={toy.id} key={toy.id}>{toy.name}</MenuItem>
                            )}
                            </Select>
                            <br/>
                            <TextField
                                id="outlined-name"
                                label="Send a message"
                                value={message}
                                onChange={(e)=>{setMessage(e.target.value)}}
                                style={{marginTop:"2rem"}}
                                />                        
                        <Button variant="contained" onClick={handleTradeRequest} style={{marginTop:"2rem"}}component={Link} to={"/tradeoffers"}> Send Trade Request </Button>
                    </>  
                )
                   
            }
        }

    const handleTradeRequest = () => {
        const data = {  
                        requestedUser : props.requestedToyUserId,                            
                        offeredToy : selectedToy,
                        requestedToy : props.requestedToyId,
                        message
                    }
          axios.post("/api/trade",data)
          .then(()=>console.log("posted")).catch(err=>console.log("error in trade", err))
    }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            {
            renderModal()            
            }
        </Box>
      </Modal>
    </div>
  );
}