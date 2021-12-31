import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export default function Drawer(props) {

  const user  = useSelector(state => state.user)

  const routes = 
      [
        { name: "Post Your Toys", link: "/posttoy"},
        { name: "Manage Your Toys", link: "/managetoys"},
        { name: "My trade Offers", link: "/tradeoffers"},
        { name: "View Trade Requests", link: "/traderequests"}
      ]

  const adminRoutes = 
    [
        { name: "Manage Users", link: "/adminusers"}
    ]


  const drawer = (
    <React.Fragment>
      <SwipeableDrawer open={props.openDrawer} 
      onClose={()=>props.setOpenDrawer(false)} onOpen={()=> props.setOpenDrawer(true)}
      >

        <List >
           {routes.map((route,index)=>(
                <ListItem key = {index} button component={Link} to={route.link}>
                    <ListItemText primary={route.name} />
                </ListItem>             
           ))}
         </List>
         {
          user.user_role === "admin" && 
          <>
         <Divider />
         <List >
           {adminRoutes.map((route,index)=>(
                <ListItem key = {index} button component={Link} to={route.link}>
                    <ListItemText primary={route.name} />
                </ListItem>             
           ))}
         </List>
         </>
          }

      </SwipeableDrawer>

    </React.Fragment>
  )

  return (
    <div>
      {drawer}
    </div>
  );
}