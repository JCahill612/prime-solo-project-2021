import React,{useEffect}  from 'react';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'
import swal from 'sweetalert';
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



export default function ManageToys() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch()
  
  useEffect(() => {
     dispatch({
         type : 'FETCH_TOYS'
     })
  }, [])

  const onEditHandler = (rowValues)=>{

    dispatch({
        type : 'EDIT_VALUES',
        payload: rowValues
    })

  }


  const toyList = useSelector(state => state.toy.userToys)
  const user = useSelector((store) => store.user);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - toyList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDeleteHandler = (id) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Toy!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            axios.delete(`/api/toys/user/${id}`).then(()=>

            {
                swal("Poof! Your Toy has been deleted!", {
                icon: "success",
              })
              dispatch({
                type : 'FETCH_TOYS'
            })
            }

            ).catch(err=>console.log("error while deleting the toy", err))

        } else {
          swal("Your Toy is safe!");
        }
      });
      
  }

  return (
    <TableContainer component={Paper} style={{maxWidth:"90%",margin:"auto",marginTop:"5rem"}}>
    <Box component="span"
    sx={{ display: 'inline-block', mx: '5px', transform: 'scale(.9)' }}>
    <h2>Welcome, {user.username}!</h2>
    <p>Zip Code: {user.zip_code}</p>
  </Box>
  <Box marginLeft="15px">
  <h3> Your Toys</h3>
  </Box>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead >
          <TableRow>
            <TableCell>Toy Name</TableCell>
            <TableCell >Image</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Delete</TableCell>
            <TableCell >Edit</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? toyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : toyList
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: 120 }}>
                {row.name}
              </TableCell>
              <TableCell style={{ width: 80 }}>
                <img src={row.toy_image_url} alt={row.name} width="50" />
              </TableCell>
              <TableCell style={{ width: 80 }} >
                {row.description}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.status}
              </TableCell>
              <TableCell style={{ width: 80 }} >
              <IconButton onClick={()=>{onDeleteHandler(row.id)}} disabled = {row.status !== 'available'}>
                  <DeleteIcon />
              </IconButton>
              </TableCell>
              <TableCell style={{ width: 80 }} >
              <IconButton onClick={()=>onEditHandler(row)} disabled = {row.status !== 'available'}
              component={Link} to={'/posttoy'}>
                  <EditIcon />
              </IconButton>
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
              count={toyList.length}
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
  );
}



