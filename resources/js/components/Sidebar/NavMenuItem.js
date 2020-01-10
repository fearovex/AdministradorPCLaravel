/**
 * Nav Menu Item
 */
import React, { Fragment, Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';

// intl messages
import IntlMessages from 'Util/IntlMessages';
/* <IntlMessages id={menu.menu_title} /> */


class NavMenuItem extends Component {

   constructor(props){
      super(props)

      this.state = {
         subMenuOpen: '',
      }

      this.ClickNavLink = this.ClickNavLink.bind(this)
   }


	/**
   * On Toggle Collapse Menu
   */
   onToggleCollapseMenu(index) {
      if (this.state.subMenuOpen === '') {
         this.setState({
            subMenuOpen: index
         })
      }
      else if (this.state.subMenuOpen !== index) {
         this.setState({
            subMenuOpen: index
         })
      }
      else {
         this.setState({ subMenuOpen: '' });
      }
   }

   ClickNavLink(id_location, id_campain){
      console.log(id_location)
      localStorage.setItem('user_location', id_location);
      localStorage.setItem('user_campaing', id_campain);
   }

   render() {
      const { menu, onToggleMenu } = this.props;
      const { subMenuOpen } = this.state;
      if (menu.child_routes != null) {
         return (
            <Fragment>
               <ListItem button component="li" onClick={onToggleMenu} className={`list-item ${classNames({ 'item-active': menu.open })}`}>
                  <ListItemIcon className="menu-icon">
                     <i className={menu.menu_icon}></i>
                  </ListItemIcon>
                  <span className="menu text-capitalize">
                     {menu.menu_title} 
                  </span>
                  {menu.new_item && menu.new_item === true ?
                     <Chip label="new" className="new-item" color="secondary" />
                     :
                     ''
                  }
               </ListItem>
               <Collapse in={menu.open} timeout="auto" className="sub-menu">
                  <Fragment>
                     {menu.type_multi == null ?
                        <List className="list-unstyled py-0">
                           {menu.child_routes.map((subMenu, index) => {
                              return (
                                 <ListItem button component="li" key={index}>
                                    <NavLink 
                                       to={subMenu.path}
                                       onClick = {() => this.ClickNavLink(subMenu.id_location, subMenu.id_campain)}
                                       activeClassName="item-active"
                                    >
                                       <ListItemIcon className="menu-icon">
                                          <i className={subMenu.menu_icon}></i>
                                       </ListItemIcon>
                                       <span className="menu">
                                         {subMenu.menu_title}
                                       </span>
                                       {subMenu.new_item && subMenu.new_item === true ?
                                          <Chip label="new" className="new-item" color="secondary" />
                                          :
                                          ''
                                       }
                                    </NavLink>
                                 </ListItem>
                              )
                           })}
                        </List>
                        :
                        <List className="list-unstyled py-0">
                           {menu.child_routes.map((subMenu, index) => {
                              if(subMenu.type_multi == true){
                                 return (
                                    <Fragment key={index}>
                                       <ListItem button component="li"
                                          onClick={() => this.onToggleCollapseMenu(index)}
                                          className={`list-item ${classNames({ 'item-active': subMenuOpen === index })}`}
                                          >
                                          <span className="menu">
                                          {subMenu.menu_title}
                                          </span>
                                       </ListItem>
                                       <Collapse in={subMenuOpen === index} timeout="auto">
                                          <List className="list-unstyled py-0">
                                             {subMenu.child_routes.map((nestedMenu, nestedKey) => (
                                                <ListItem button component="li" key={nestedKey}>
                                                   <ListItemIcon className="menu-icon">
                                                      <i className={subMenu.menu_icon}></i>
                                                   </ListItemIcon>
                                                   <NavLink 
                                                      activeClassName="item-active" 
                                                      to={nestedMenu.path}
                                                      onClick = {() => this.ClickNavLink(nestedMenu.id_location, nestedMenu.id_campain)}
                                                   >
                                                      
                                                      <span className="menu pl-10 d-inline-block">
                                                         {nestedMenu.menu_title} 
                                                      </span>
                                                   </NavLink>
                                                </ListItem>
                                             ))}
                                          </List>
                                       </Collapse>
                                    </Fragment>
                                 )
                              }
                              else{
                                 return (
                                    <Fragment key={index}>
                                       <ListItem button component="li" >
                                          <NavLink 
                                             to={subMenu.path}
                                             onClick = {() => this.ClickNavLink(subMenu.id_location, subMenu.id_campain)}
                                             activeClassName="item-active"
                                          >
                                             <ListItemIcon className="menu-icon">
                                                <i className={subMenu.menu_icon}></i>
                                             </ListItemIcon>
                                             <span className="menu">
                                             {subMenu.menu_title}
                                             </span>
                                          </NavLink>
                                       </ListItem>
                                    </Fragment>
                                 )
                              }
                           })}
                           }
                        </List>
                     }
                  </Fragment>
               </Collapse>
            </Fragment>
         )
      }
      return (
         <ListItem button component="li">
            <NavLink activeClassName="item-active" to={menu.path}>
               <ListItemIcon className="menu-icon">
                  <i className={menu.menu_icon}></i>
               </ListItemIcon>
               <span className="menu">
                 {menu.menu_title}
               </span>
            </NavLink>
         </ListItem>
      );
   }
}

export default NavMenuItem;
