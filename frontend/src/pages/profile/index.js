import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getUserProfileSettings, personalUpdate } from "../../services/settingsService";
import jwt_decode from "jwt-decode";
import React from "react";
import { getFromCookies } from "util/functions";

const Profile = () => {
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const user = getFromCookies("token");
  const UserID=jwt_decode(user).accountId
  const { status, data, error, isFetching } = useQuery("settings", () =>
    getUserProfileSettings()
  );
  const queryClient = useQueryClient();

  const { mutate: updateUser } = useMutation(
    async () => {
      
      await personalUpdate(UserID,FirstName,LastName);

    },
    {
      onSuccess: () => {
         queryClient.invalidateQueries("settings");
        
      },
    }
  );

  return (
    <>
      <Box>
        <Typography sx={{marginTop:"20px"}}variant="h4">Profile Settings</Typography>

        <ul>
          <li>
            Username: <b>{data?.profileSettings?.username}</b><br/>
          </li>
          <li>
            E-mail: <b>{data?.profileSettings?.email}</b>
            
          </li>
          <li>
            First name: <b>{data?.profileSettings?.firstName}</b>
            <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={e=>(setFirstName(e.target.value))}  />
          </li>
          <li>
            Last name: <b>{data?.profileSettings?.lastName}</b>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={e=>(setLastName(e.target.value))}  />
          </li>

        </ul>
        <Button variant="contained"
          onClick={() => {
            updateUser();
          }}
        >
          Update
        </Button>
      </Box>
    </>
  );
};
export default Profile;
