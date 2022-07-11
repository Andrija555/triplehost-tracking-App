import { client } from "./gClient";
import { gql } from "graphql-request";
import toast from "react-hot-toast";

const GET_SETTINGS = gql`
  query {
    profileSettings {
      username
      email
      firstName
      lastName
    }
  }
`;

const PERSONAL_UPDATE = gql`
  mutation ($id: ID!, $firstName: String!, $lastName: String!) {
    updateUser(
      Input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
      }
    )
  }
`;

export const getUserProfileSettings = async () => {
  return client
    .request(GET_SETTINGS)
    .then((data) => data)
    .catch((error) => console.log(error));
};

export const personalUpdate = async (id, firstName, lastName) => {
  return client
    .request(PERSONAL_UPDATE, { id, firstName, lastName})
    .then((data) => {
      toast.success("Profile updated successfully successfully!");
      return data;
      //
    })
    .catch((error) => toast.error(error));
};


