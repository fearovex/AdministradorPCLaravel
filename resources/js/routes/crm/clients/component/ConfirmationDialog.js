/**
 * Confirmation dialog component
*/
/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class ConfirmationDialog extends React.Component {
   state = {
      open: false,
   };
   //Define function for open confirmation dialog box
   openDialog() {
      this.setState({ open: true });
   };
   //Define function for close confirmation dialog box and callback for delete item 
   closeDialog(isTrue) {
      this.setState({ open: false });
      this.props.onConfirm(isTrue)
   };

   render() {
      return (
         <Dialog
            open={this.state.open}
            onClose={this.closeDialog.bind(this)}
				aria-labelledby="responsive-dialog-title"
				className="confirmation-dialog"
         >
            <DialogContent className="p-20 text-center">
               <h4 className="pt-20">Are you sure you want to delete this Client permanently?</h4>
            </DialogContent>
            <DialogActions className="px-20 pb-20 justify-content-center" autoFocus>
               <Button onClick={() => this.closeDialog(true)} className="btn-primary text-white fw-semi-bold mr-15">
                  yes
               </Button>
               <Button onClick={() => this.closeDialog(false)} className="btn-danger text-white fw-semi-bold" >
                  no
               </Button>
            </DialogActions>
         </Dialog >
      );
   }
}

export default ConfirmationDialog;