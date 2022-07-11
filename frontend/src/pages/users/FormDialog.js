import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { resetPassword } from "services/usersService";

function FormDialog({ open, handleClickOpen, handleClose, UserID }) {
  const [password, setPassword] = React.useState("");
  const handleChangePassword = (data) => {
    console.log(password, UserID);
    resetPassword(UserID, password);
    
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Password reset</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="New password"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={(event) => {
          handleChangePassword(event);
          handleClose();
      }}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
