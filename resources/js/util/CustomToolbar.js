import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import MailOutline from "@material-ui/icons/MailOutline";
import { withStyles } from "@material-ui/core/styles";
import CsvDownloader from 'react-csv-downloader';
import moment from "moment";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomToolbar extends React.Component {
  
 
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Tooltip title={"Send Csv Email"}>
          <IconButton className={classes.iconButton} onClick={this.props.alertOpen}>
            <MailOutline className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);