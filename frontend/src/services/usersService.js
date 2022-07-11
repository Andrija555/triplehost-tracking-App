import { client } from "./gClient";
import { gql } from "graphql-request";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const GET_ALL_USERS = gql`
  query {
    getUsers {
      id
      username
      email
      firstName
      lastName
      password
      deleteStatus
      rolesId
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation ($id: ID!, $password: String!) {
    changePassword(Input: { id: $id, password: $password })
  }
`;

const ACTIVATE_USER = gql`
  mutation ($UserID: ID!) {
    activateUser(UserID: $UserID)
  }
`;

const DELETE_USER = gql`
  mutation ($UserID: ID!) {
    deleteUser(UserID: $UserID)
  }
`;

const CREATE_USER = gql`
  mutation (
    $username: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $rolesId: ID!
  ) {
    createUser(
      Input: {
        username: $username
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        rolesId: $rolesId
      }
    )
  }
`;

const UPDATE_USER = gql`
  mutation ($id: ID!, $firstName: String!, $lastName: String!, $rolesId: ID!) {
    updateAdmin(
      Input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        rolesId: $rolesId
      }
    )
  }
`;



const GET_ROLENAMES=gql `
query{getRoleNames{id,title}}
`
export const getAllUsers = async () => {
  return client
    .request(GET_ALL_USERS)
    .then((data) =>{ 
      
      return data})
    .catch((error) => {
      if(error?.response?.errors[0]?.message === "unauthorized") 
     
      toast.error("Cant get users")})};

export const resetPassword = async (id, password) => {
  return client
    .request(RESET_PASSWORD, { id, password })
    .then((data) => {
      toast.success("Password reset successfully!");
      return data;
    })
    .catch((error) => toast.error(error));
};

export const activateUser = async (UserID) => {
  return client
    .request(ACTIVATE_USER, { UserID })
    .then((data) => {
      toast.success("User activated successfully!");
      return data;
    })
    .catch((error) => toast.error(error));
};

export const deleteUser = async (UserID) => {
  return client
    .request(DELETE_USER, { UserID })
    .then((data) => {
      toast.success("Deleted successfully!");
      return data;
    })
    .catch((error) => toast.error(error));
};

export const createUser = async (
  username,
  email,
  firstName,
  lastName,
  password,
  rolesId
) => {
  return client
    .request(CREATE_USER, {
      username,
      email,
      firstName,
      lastName,
      password,
      rolesId,
    })
    .then((data) => {
      toast.success("User created successfully!");

      //window.location.reload();
      
    })
    .catch((error) => toast.error("Can't create user!"));
    
};

export const updateUser = async (id, firstName, lastName, rolesId) => {
  return client
    .request(UPDATE_USER, { id, firstName, lastName, rolesId })
    .then((data) => {
      toast.success("User updated successfully!");
      return data;
      //
    })
    .catch((error) => toast.error(error));
};

export const getRoleNames = async () => {
  return client
    .request(GET_ROLENAMES)
    .then((data) => data)
    .catch((error) => toast.error("Cant get role names"));
};

