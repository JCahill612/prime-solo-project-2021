import React,{useEffect,useState}  from 'react';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import swal from 'sweetalert';
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom'


function TablePaginationActions(props) {
      const theme = useTheme();
      const { count, page, rowsPerPage, onPageChange } = props;
    
    
    
      const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
      };
    
      const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
      };
    
      const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
      };
    
      const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };
    
      return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Box>
      );
    }
    
    TablePaginationActions.propTypes = {
      count: PropTypes.number.isRequired,
      onPageChange: PropTypes.func.isRequired,
      page: PropTypes.number.isRequired,
      rowsPerPage: PropTypes.number.isRequired,
    };
    
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
    
export default function TradeOffers() {
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const dispatch = useDispatch()
      const [open, setOpen] = useState(false)

      useEffect(() => {
          
          dispatch (
              {
                  type : 'FETCH_TRADE_REQUESTS'
              }
          )
          
      }, [])
      const requestList = useSelector(state => state.trade.tradeRequests)

      const contactsDetail = useSelector(state => state.trade.contactDetail)
    
    
      // Avoid a layout jump when reaching the last page with empty rows.
      const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requestList.length) : 0;
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const onRejecthandler = (id)=>{

        swal({
          title: "Are you sure?",
          text: "Do you want to reject this offer",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willReject) => {
          if (willReject) {
              axios.put(`/api/trade/reject/${id}`).then(()=>
  
              {
                  swal("Poof! The trade request has been rejected", {
                  icon: "success",
                })
                dispatch({
                  type : 'FETCH_TRADE_REQUESTS'
              })
              }
  
              ).catch(err=>console.log("error while rejecting the offer", err))
  
          } else {
            swal("The offer is intact!");
          }
        });
            

      }


      const onAcceptHandler = (id)=>{

        swal({
          title: "Are you sure?",
          text: "Do you want to accept this offer",
          icon: "success",
          buttons: true,
          dangerMode: false,
        })
        .then((willAccept) => {
          if (willAccept) {
              axios.put(`/api/trade/accept/${id}`).then(()=>
  
              {
                  swal("Accepted!! You can now view contact info", {
                  icon: "warning",
                })
                dispatch({
                  type : 'FETCH_TRADE_REQUESTS'
              })
              }
  
              ).catch(err=>console.log("error while rejecting the offer", err))
  
          } else {
            swal("The offer is intact!");
          }
        });
            

      }
    
    const showContactDetail = (id)=>{

        dispatch({
          type : 'FETCH_REQUEST_CONTACT_DETAILS',
          payload : id
        })
        setOpen(true)
    }
    
      return (
        <>
        <TableContainer component={Paper} style={{maxWidth:"90%",margin:"auto",marginTop:"5rem"}}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
    
          <TableHead>
          <h3>Trade Requests</h3>
              <TableRow>
                <TableCell >My Toy</TableCell>
                <TableCell >My Toy Image</TableCell>
                <TableCell >Offered Toy</TableCell>
                <TableCell >Offered Toy Image</TableCell>
                <TableCell >Status</TableCell>
                <TableCell >Message</TableCell>
                <TableCell >Reject Offer</TableCell> 
                <TableCell >Accept Offer</TableCell> 
                <TableCell >Contact</TableCell> 
              </TableRow>
            </TableHead>
    
            <TableBody>
              {(rowsPerPage > 0
                ? requestList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : requestList
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: 120 }}>
                    {row.toynames[0]}
                  </TableCell>
                  <TableCell style={{ width: 80 }}>
                    <img src={row.imageurl[0]} alt={row.toynames[0]} width="50" />
                  </TableCell>
                  <TableCell style={{ width: 80 }} >
                    {row.toynames[1]}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                  <img src={row.imageurl[1]} alt={row.toynames[1]} width="50" />
                  </TableCell>
                  <TableCell style={{ width: 80 }}>
                    {row.status}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {row.message}
                  </TableCell>
                  <TableCell style={{ width: 80 }} >
                  <IconButton onClick={()=>{onRejecthandler(row.id)}} 
                  disabled = {row.status !== 'incomplete'}>
                      <ClearIcon />
                  </IconButton>
                  </TableCell> 
                  <TableCell style={{ width: 80 }} >
                  <IconButton onClick={()=>{onAcceptHandler(row.id)}} 
                  disabled = {row.status !== 'incomplete'}>
                      <DoneIcon />
                  </IconButton>
                  </TableCell> 
                  <TableCell style={{ width: 80 }} >
                    {row.status === "accepted" ?
                    <Button onClick={()=>{showContactDetail(row.id)}}>Show Contact Details</Button>
                    : <Typography>View After Accepted</Typography>
                    }
                  </TableCell>                                       
                </TableRow>
              ))}
    
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={requestList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
         <Modal
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
         <Box sx={style}>
           <>
           <Typography variant="h6">
              Name : {contactsDetail[0].username}    
           </Typography>
           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             Email : {contactsDetail[0].user_email}
           </Typography>
           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             Phone Number : {contactsDetail[0].phone_no}
           </Typography>
           </>
         </Box>
       </Modal>
       </>
      );
    }