/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import update from 'react-addons-update';
import { TOGGLE_MENU, AGENCY_TOGGLE_MENU } from 'Actions/types';


// import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';


// redux actions
import { onToggleMenu } from 'Actions';


// import { configureStoreTest } from '../../store/storeTest';
// import { combineReducers } from 'redux';

// const reducers = combineReducers({
//     sidebar: sidebarReducerTest
//  });


class SidebarContent extends Component {
    
     
       
    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        }
        this.props.onToggleMenu(data);
    }

    
    // componentWillMount(){
    //     let jsonNavLinks = JSON.parse(localStorage.getItem('navLinks'))
    //     this.setState({
    //         sidebarMenus: jsonNavLinks
    //     })
    // }
   
   
    // <IntlMessages id="sidebar.events" />
    render() {
        const { sidebarMenus } = this.props.sidebar;
        const { user_module } = localStorage;
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li">{user_module}</ListSubheader>}
                    >
                        {sidebarMenus.category1.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category1')}
                            />
                        ))}
                    </List>
                    
                </nav>
            </div>
            
        );
    }
}

// map state to props
const mapStateToProps = ({ sidebar }) => {
    return { sidebar };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu,
    
})(SidebarContent));
