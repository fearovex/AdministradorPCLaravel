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

// import { configureStore } from '../../store';


import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import { onToggleMenu } from 'Actions';

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

    render() {
        const { sidebarMenus } = this.props.sidebar;
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                 
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li">
                            <IntlMessages id="sidebar.events" /></ListSubheader>}
                    >
                        {sidebarMenus.category1.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category1')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li">
                            <IntlMessages id="sidebar.locacion" /></ListSubheader>}
                    >
                        {sidebarMenus.category10.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category10')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li">
                            <IntlMessages id="sidebar.campaña" /></ListSubheader>}
                    >
                        {sidebarMenus.category11.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category11')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li">
                            <IntlMessages id="sidebar.zonas" /></ListSubheader>}
                    >
                        {sidebarMenus.category12.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category12')}
                            />
                        ))}
                    </List>
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={<ListSubheader className="side-title" component="li">
                            <IntlMessages id="sidebar.dispositivos" /></ListSubheader>}
                    >
                        {sidebarMenus.category13.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                                onToggleMenu={() => this.toggleMenu(menu, 'category13')}
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
