import { makeStyles } from '@material-ui/core';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Avatar from '@material-ui/core/Avatar';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
      page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3),
      },
      root: {
        display: 'flex',
      },
      drawer: {
        width: drawerWidth,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      active: {
        background: '#f4f4f4'
      },
      title: {
        padding: theme.spacing(2),
      },
      appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      toolbar: theme.mixins.toolbar,
      date:{
        flexGrow: 1
      },
      avatar:{
          marginLeft: theme.spacing(2),
      }
    }
  })
  

const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Meus Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Criar Note',
            icon: <AddCircleOutlined color="secondary" />,
            path: '/create'
        }
    ]

    return (
        <div className={classes.root}>

            <AppBar
                className={classes.appbar}
                elevation={1}
            >
                <Toolbar>
                    <Typography className={classes.date} >
                       Hoje é { format(new Date(),'dd-MM-yyyy', { locale: ptBR })}
                    </Typography>
                    <Typography>
                        User
                    </Typography>
                    <Avatar src="/avatar.png" className={classes.avatar}/>
                </Toolbar>
            </AppBar>

            <Drawer
                className = {classes.drawer}
                variant = "permanent"
                anchor = "left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" className={classes.title} >
                        My Notes
                    </Typography>
                </div>
                
            <List>
                {menuItems.map(item => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={()=> history.push(item.path)}
                        className={location.pathname == item.path ? classes.active : null}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>

            </Drawer>

            <div className={classes.page}>
            <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default Layout
