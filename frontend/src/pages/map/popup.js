import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { QueryClient, useQuery,useQueryClient,useMutation} from "react-query";
import toast from "react-hot-toast";
import { createRent } from "services/tableService";
import { getRents } from "services/itemsService";

function Popup({selectedItemIID, open, handleClickOpen, handleClose, queryClient }) {

  const [externalId, setExternalId] = React.useState("");

  const {loading, error:errR,data:dataR } = useQuery ("rents", () => getRents(), {
   
  });
  
  const { mutate: rent } = useMutation(
    async () => {
      await createRent(externalId,selectedItemIID);

    },
    {
      onSuccess: () => {
         queryClient.invalidateQueries("rents");
        
      },
    }
  );


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rent Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="externalId"
          label="Guest ID"
          type="number"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setExternalId(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={(event) => {
          rent(); 
          handleClose();
      }}>Rent</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
