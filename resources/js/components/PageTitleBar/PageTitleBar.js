/**
 * Page Title Bar Component
 * Used To Display Page Title & Breadcrumbs
 */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// get display string
const getDisplayString = (sub, index, subPath, title) => {
   if(subPath.length != index + 1){
      const arr = sub.split("-");
      if (arr.length > 1) {
         return <IntlMessages id={`sidebar.${arr[0].charAt(0) + arr[0].slice(1) + arr[1].charAt(0).toUpperCase() + arr[1].slice(1)}`} />
      } else {
         return sub.charAt(0) + sub.slice(1)
      }
   }
   else{
      return title;
   }
};

// get url string
const getUrlString = (path, sub, index) => {
   if (index === 0) {
      return '/';
   } else {
      return '/' + path.split(sub)[0] + sub;
   }
};

const PageTitleBar = ({ title, match, enableBreadCrumb, history }) => {
   const path = match.path.substr(1);
   const subPath = path.split('/');
   enableBreadCrumb = false;
   return (
      <div className="page-title d-flex justify-content-between align-items-center">
         {title &&
            <div className="page-title-wrap">
               {history &&
                  <ListItemIcon className="menu-icon">
                     <i className="ti-angle-left" style={{cursor: 'pointer'}} onClick={() => history.goBack()}></i>
                  </ListItemIcon>
               }
               <h2 className="">{title}</h2>
            </div>
         }
         {enableBreadCrumb &&
            <Breadcrumb className="mb-0 tour-step-7" tag="nav">
               {subPath.map((sub, index) => {
                  return <BreadcrumbItem active={subPath.length === index + 1}
                     tag={subPath.length === index + 1 ? "span" : Link} key={index}
                     to={getUrlString(path, sub, index)}>{getDisplayString(sub, index, subPath, title)}
                     </BreadcrumbItem>
               }
               )}
            </Breadcrumb>
         }
      </div>
   )
};

// default props value
PageTitleBar.defaultProps = {
   enableBreadCrumb: true
}

export default PageTitleBar;
