import { useQuery, useMutation, useQueryClient, queryCache } from "react-query";
import { toast } from "react-hot-toast";
import {
  getAllUsers,
  deleteUser,
  activateUser,
  updateUser,
  createUser,
  getRoleNames,
} from "services/usersService";

import MaterialTable from "material-table";
import LockResetIcon from "@mui/icons-material/LockReset";
import FormDialog from "./FormDialog";
import * as React from "react";
import "../../App.css";
import { wait } from "@testing-library/user-event/dist/utils";
import { Box } from "@mui/material";
import { style } from "@mui/system";
import { Navigate, useLocation } from "react-router-dom";

const Users = () => {
  const [UserID, setUserID] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
const location = useLocation()



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { data, error:errorUsers } = useQuery("users", () => getAllUsers(), {
  });



  const { data:rNames, error:err  } = useQuery("roleNames", () => getRoleNames(), {
    
  });
  

  const { mutate: activate } = useMutation(
    async (UserID) => {
      
      await activateUser(UserID);

    },
    {
      onSuccess: () => {
         queryClient.invalidateQueries("users");
        
      },
    }
  );

  const { mutate: deleteU } = useMutation(
    async (UserID) => {
      await deleteUser(UserID);
    },
    {
      onSuccess: () => {
        
        queryClient.invalidateQueries();
      },
    }
  );
  const { mutate: createU } = useMutation(
    async (newRow) => {
     await createUser(
       
        newRow.username,
        newRow.email,
        newRow.firstName,
        newRow.lastName,
        newRow.password,
        newRow.rolesId
      );
     
    },
    {
      onSuccess: () => {
        
        // queryClient.removeQueries();
        // queryClient.resetQueries();
        queryClient.invalidateQueries()
      },
    }
  );
  const { mutate: update } = useMutation(
    async (updatedRow) => {
      await updateUser(
        updatedRow.ID,
        updatedRow.firstName,
        updatedRow.lastName,
        updatedRow.rolesId
      );
    },
    {
      onSuccess:  () => {
        queryClient.invalidateQueries()
      },
    }
  );
    const i=0;
  const columns = [
    { field: "ID", title: "ID", editable: "never" },
    {
      field: "firstName",
      title: "First name",
      validate: (rowData) => {
        if (rowData.firstName === undefined || rowData.firstName === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "lastName",
      title: "Last name",
      validate: (rowData) => {
        if (rowData.lastName === undefined || rowData.lastName === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "username",
      title: "Username",
      editable: "onAdd",
      validate: (rowData) => {
        if (rowData.username === undefined || rowData.username === "") {
          return "Required";
        } else if (rowData.username.length < 5) {
          return "Username should contain atleast 5 chars";
        }
        return true;
      },
    },
    {
      field: "email",
      title: "Email",
      editable: "onAdd",
      validate: (rowData) => {
        if (rowData.email === undefined || rowData.email === "") {
          return "Required";
        } else if (!rowData.email.includes("@" && ".")) {
          return "Enter valid email address";
        }
        return true;
      },
    },
    {
      field: "password",
      title: "Password",
      editable: "onAdd",

      validate: (rowData) => {
        if (rowData.password === undefined || rowData.password === "") {
          return "Required";
        }
        return true;
      },
    },
    { field: "deleteStatus", title: "Delete status", editable: "never" },
    {
      field: "rolesId",
      title: "Role",
      
       
      lookup:rNames?.getRoleNames?.reduce((obj, item) => (obj[item.id] = item.title, obj) ,{}),

      textAlign: "center",
      validate: (rowData) => {
        if (rowData.rolesId === undefined || rowData.rolesId === "") {
          return "Required";
        }
        return true;
      },
    },
  ];

  const rows = data?.getUsers?.map((user) => ({
    ID: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    deleteStatus: user.deleteStatus == "1" ? "Aktivan" : "Neaktivan",
    rolesId: user.rolesId ,
    password: "--------------",
  }));

  return (
    
 <Box sx={{paddingLeft:"16px", paddingRight:"16px"}}>
      <h2>Users</h2>
      {/* <ul>
        {data?.getUsers.map((user) => (
          <li>{JSON.stringify(user)}</li>
        ))}
      </ul> */}
      {
        errorUsers ? <Navigate replace state={{ from: location }} to="/start" /> : null
      }
      <div style={{ height: 600}}>
          <MaterialTable
          style={{}}
          columns={columns}
          data={rows}
          options={{
            sort: "asc",
            showTitle: false,
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          actions={[
            {
              icon: "refresh",
              tooltip: "Activate User",
              onClick: (e, rowData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    activate(rowData.ID);
                    resolve();
                  }, 1000);
                }),
            },
            {
              icon: () => <LockResetIcon />,
              tooltip: "Reset user password",
              onClick: (e, rowData) => {
                setOpen(true);
                setUserID(rowData.ID);
              },
            },
          ]}
          // components={{
          //   Action: (props) => (
          //     <Button onClick={() => deleteU(props.data.ID)}>dodaj</Button>
          //   ),
          // }}
          editable={{
            isEditable: (rowData) => rowData.username !== "admin",
            isDeletable: (rowData) => rowData.username !== "admin",
            onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                createU(newRow);
                resolve();
              }, 1000);
            }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update(updatedRow);
                  resolve();
                }, 1000);
              }),

            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  deleteU(selectedRow.ID);
                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
      <FormDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        UserID={UserID}
      />
    </Box>
  );
};

export default Users;
