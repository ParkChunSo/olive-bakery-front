import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dashboard from '@material-ui/icons/Dashboard';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import People from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';
import Home from '@material-ui/icons/Home';
import Alarm from '@material-ui/icons/AccessAlarm';
import Assignment from '@material-ui/icons/Assignment'

import purple from '@material-ui/core/colors/purple'

import { Link } from 'react-router-dom';

const linkStyle = {
    textDecoration: 'none',
    color: purple[900],
};

export const mainListItems = (
    <div>
        <Link to="/" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <Home />
            </ListItemIcon>
            <ListItemText primary="홈으로" color={purple[700]}/>
        </ListItem></Link>
        <Link to="/mypage" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText primary="마이페이지" />
        </ListItem></Link>
        <Link to="/products" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="빵/음료수" />
        </ListItem></Link>
        <Link to="/board" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <Assignment />
            </ListItemIcon>
            <ListItemText primary="게시판/Q&A" />
        </ListItem></Link>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader>관리자</ListSubheader>
        <Link to="/admin" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="대시보드" />
        </ListItem></Link>
        <Link to="/admin/products" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="상품관리" />
        </ListItem></Link>
        <Link to="/admin/users" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <People />
            </ListItemIcon>
            <ListItemText primary="유저관리" />
        </ListItem></Link>
        <Link to="/admin/reservation" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <Alarm />
            </ListItemIcon>
            <ListItemText primary="예약관리" />
        </ListItem></Link>
        <Link to="/admin/board" style={linkStyle}><ListItem button>
            <ListItemIcon>
                <Assignment />
            </ListItemIcon>
            <ListItemText primary="게시판/Q&A관리" />
        </ListItem></Link>
    </div>
);
