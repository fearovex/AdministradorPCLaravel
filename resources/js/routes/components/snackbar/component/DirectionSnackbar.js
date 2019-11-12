/*====== Transition Snackbar =======*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
   return <Slide direction="left" {...props} />;
}

function TransitionUp(props) {
   return <Slide direction="up" {...props} />;
}

function TransitionRight(props) {
   return <Slide direction="right" {...props} />;
}

function TransitionDown(props) {
   return <Slide direction="down" {...props} />;
}

class DirectionSnackbar extends React.Component {
   state = {
      open: false,
   };

   handleClick = transition => () => {
      this.setState({ open: true });
   };

   handleClose = () => {
      this.setState({ open: false });
   };

   render() {
      return (
         <div>
            <Button variant="contained" className="btn-info text-white mr-15 mb-10" onClick={this.handleClick(TransitionLeft)}>Right</Button>
            <Button variant="contained" className="btn-warning text-white mr-15 mb-10" onClick={this.handleClick(TransitionUp)}>Up</Button>
            <Button variant="contained" className="btn-danger text-white mr-15 mb-10" onClick={this.handleClick(TransitionRight)}>Left</Button>
            <Button variant="contained" color="primary" className="text-white mr-15 mb-10" onClick={this.handleClick(TransitionDown)}>Down</Button>
            <Snackbar
               open={this.state.open}
               onClose={this.handleClose}
               message={<span id="message-id">I love snacks</span>}
            />
         </div>
      );
   }
}

export default DirectionSnackbar;
