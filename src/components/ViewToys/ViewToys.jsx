import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Modal from '../Modal/Modal'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const ViewToys = () => {

    const dispatch = useDispatch()
    const availableToys = useSelector(state => state.toy.availableToys)
    const user = useSelector(state => state.user)
    const [nameFilter, setnameFilter] = useState("")
    const [zipFilter, setzipFilter] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const [requestedToyId, setRequestedToyId] = useState("");
    const [requestedToyUserId, setRequestedToyUserId] = useState("");
    
    const filteredList = availableToys.filter(toy=>
        {
        return (toy.name.toLowerCase().includes(nameFilter.toLowerCase()) && 
        (!zipFilter || toy.zip_code == zipFilter) && 
        (!user.id || user.id != toy.toys_userid)
        )}
       )


    useEffect(() => {
        dispatch({
            type : 'FETCH_AVAILABLE_TOYS'
        })
    }, [])


    return (
        <>
        <Grid container direction="column" style={{marginTop:"3rem"}} alignItems="center" spacing={4}>

            <Grid container item justifyContent="center" spacing={2}>
                <Grid item>
                <TextField
                    label="Search by Name"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    }}
                    onChange = {(e)=>{setnameFilter(e.target.value)}}
                    />
                </Grid>
                <Grid item>
                <TextField
                    label="Search by Zip Code"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    }}
                    onChange = {(e)=>{setzipFilter(e.target.value)}}
                    />
                </Grid>

            </Grid>
            <Grid item>
                <Typography variant="h3">
                    Available Toys
                </Typography>
            </Grid>
            <Grid item container style={{maxWidth:"80%"}} justifyContent="center">
            {filteredList.map(toy=>

            <Grid item key={toy.id} xs={3}>
                <Card sx={{ maxWidth: 345,minWidth : 275 }}>
                <CardMedia
                    component="img"
                    padding="3px"
                    width="100"
                    height="300"
                    image= {toy.toy_image_url}
                    alt= {toy.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {toy.name}
                    </Typography>
                    <Typography variant="subtitle" color="text.secondary">
                    Zip Code : {toy.zip_code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {toy.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" 
                        onClick = {()=>{setOpenModal(true);setRequestedToyId(toy.id);
                        setRequestedToyUserId(toy.toys_userid)}}
                    > Trade </Button>
                </CardActions>
                </Card>
            </Grid>


            // <Grid item container key={toy.toy_image_url} justifyContent="center">
            //     <Grid item container direction="column" xs={2} alignContent="center">
            //     <Grid item >
            //         <img src={toy.toy_image_url} alt={toy.name} width="150"/>
            //     </Grid>
            //     <Grid item>
            //         <Typography paragraph>{toy.name}</Typography>
            //     </Grid>
            //     </Grid>
            //     <Grid item container direction="column" xs={3} alignContent="center" justifyContent="center">
            //         <Grid item>
            //             {toy.description}
            //         </Grid>
            //         <Grid item>
            //             <Typography paragraph>{toy.zip_code}</Typography>
            //         </Grid>
            //     </Grid>
            //     <Grid container item xs={2} alignContent="center">
            //         <Button variant="contained" 
            //             onClick = {()=>{setOpenModal(true);setRequestedToyId(toy.id);
            //             setRequestedToyUserId(toy.toys_userid)}}
            //         > Trade </Button>
            //     </Grid>
            // </Grid>
            )}
        </Grid>
        </Grid>
        <Modal open={openModal} setOpen={setOpenModal} availableToys = {availableToys} user = {user.id} requestedToyId = {requestedToyId} requestedToyUserId = {requestedToyUserId}/>
        </>
    )
}

export default ViewToys


// description: "This is a toy and i like it and its not fun"
// id: 2
// name: "the mod toy"
// status: "available"
// toy_image_name: "Toy Pictures/gykzksw9bantglnf6tkq"
// toy_image_url: "https://res.cloudinary.com/waizzy/image/upload/v1640684469/Toy%20Pictures/gykzksw9bantglnf6tkq.png"
// toys_userid: "1"