import React,{useState,useRef,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save';




const PostToy = () => {

    const dispatch = useDispatch()

    
    const editValues = useSelector(state => state.toy.editToyValues)

    const [title, setTitle] = useState(editValues.name || "")
    const [description, setDescription] = useState(editValues.description || "")
    const [toyImage, setToyImage] = useState("")

    const [editImage, setEditImage] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const inputElement = useRef();
    
    let history = useHistory();

    const clearForm = ()=>{
      setTitle("")
      setDescription("")
      setToyImage("")
      inputElement.current.value = null
    }

    const onEditImage = (id) => {
      const data = new FormData()

      data.append('image', toyImage)

      axios.put(`/api/toys/image/${id}`,data).then((res)=>
      {
        setImageUrl(res.data)
        setEditImage(false)
      })
      .catch(err=>console.log(err))
    }


    useEffect(() => {
      
      return () => {
          dispatch({
            type: 'CLEAR_EDIT_VALUES'
          })
      }
    }, [])


    const onSubmitHandler = () => {
        const data = new FormData()
        data.append('title', title)
        data.append('description', description)
        data.append('image', toyImage)

        axios.post("/api/toys",data).then((res)=>
        {console.log(res.data)
          history.push("/managetoys");
        })
        .catch(err=>console.log(err))
    }


    const onEditSubmitHandler = (id) => {

      const data = {title,description}
      axios.put(`/api/toys/user/${id}`,data).then((res)=>
      {console.log(res.data,"from edit toy handler")
        history.push("/managetoys");
      })
      .catch(err=>console.log(err,"error in edit toy handler"))
  }


    return (
        <>
        <Grid container direction="column" spacing={4} alignContent="center" style={{marginTop:"3rem"}}>
            <Grid item>
              <h4>Post Your Toy</h4>
                <TextField
                required
                id="outlined-required"
                label="Title"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
            </Grid>

            { editValues.toy_image_url && !editImage ?
            <Grid item container direction="row" style={{width:"50%"}}>
            <Grid item>
                <img src={imageUrl || editValues.toy_image_url} alt={editValues.name} width="80" />
            </Grid>
            <Grid item>
              <IconButton onClick={()=>setEditImage(true)}>
                  <EditIcon />
              </IconButton>
            </Grid>
            </Grid> : null
            }
             <Grid container item style={{width:"50%"}}>
            { (!editValues.toy_image_url || editImage) &&
             

              <Grid item>
                <input type="file" required
                ref={inputElement}
                onChange={(e)=>{setToyImage(e.target.files[0])}}
                />
              </Grid>}

            {editImage && toyImage ?
              <Grid item>
              <IconButton onClick={()=>onEditImage(editValues.id)}>
                  <SaveIcon />
              </IconButton>
              </Grid> : null 
            } 
              </Grid>
            

        <Grid item style={{minWidth:"50%"}}>
            <TextField
            id="outlined-multiline-flexible"
            label="Description"
            required
            multiline
            minRows={5}
            fullWidth
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            />
        </Grid>
        
        {editValues.name ? 

        <Grid container item style={{maxWidth:"50%"}} spacing={2}>
        <Grid item>
            <Button onClick={()=>onEditSubmitHandler(editValues.id)} variant="contained">Edit And Save</Button>
        </Grid>
        <Grid item>
            <Button  component={Link} to={'/managetoys'} variant="contained">Cancel</Button>
        </Grid>
        </Grid>

          : 
        <Grid container item style={{maxWidth:"50%"}} spacing={2}>
        <Grid item>
            <Button onClick={onSubmitHandler} variant="contained">Submit</Button>
        </Grid>
        <Grid item>
            <Button onClick={()=>clearForm()} variant="contained">Clear</Button>
        </Grid>
       </Grid>
        }


        </Grid>
        </>
    )
}

export default PostToy