import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './ProfileDrawer.css';
import { GlobalContext } from '../GlobalContext';

const ProfileDrawer = ({ open, onClose }) => {
    
    const { userData,removeUserId } = useContext(GlobalContext);
    const username = userData ? userData.username : 'Guest';
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box
                className="profile-drawer"
                role="presentation"
            >
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar
                                alt="Profile"
                                src="https://cdn-icons-png.flaticon.com/512/5987/5987424.png"
                                className="profile-avatar"
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={username}
                            secondary="Fullstack Developer "
                            classes={{ primary: 'list-item-text-primary', secondary: 'list-item-text-secondary' }}
                        />
                    </ListItem>
                </List>

                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="View & Update Profile"
                        />
                    </ListItem>
  
                        
                    <ListItem >
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Search Appearances"
                            secondary="5223"
                            classes={{ primary: 'list-item-text-primary', secondary: 'list-item-text-secondary' }} />
                        <ListItemText
                            primary="Recruiter actions"
                            secondary="235"
                            classes={{ primary: 'list-item-text-primary', secondary: 'list-item-text-secondary' }} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <HelpOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="FAQs" />
                    </ListItem>
                    <ListItem onClick={removeUserId} button>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default ProfileDrawer;
