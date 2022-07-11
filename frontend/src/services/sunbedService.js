import { client } from "./gClient";
import { gql } from "graphql-request";
import { toast } from "react-hot-toast";

const GET_ALL_ITEMS = gql`
  query {
    getItems {
      id
      type
      lon
      lat
      broken
    }
  }
`;


const CREATE_ITEM = gql`
  mutation (
    $type:String! $lon:Float! $lat:Float! $broken:String!
  ) {
    createItem(
      Input: {
        type:$type
        lon:$lon
        lat:$lat
        broken:$broken
      }
    )
  }
`;


export const getAllItems = async () => {
  return client
    .request(GET_ALL_ITEMS)
    .then((data) => data)
    .catch((error) => toast.error("Cant get items"));
};




export const createItem = async (
 type,
 lon,
 lat,
 broken
) => {
  return client
    .request(CREATE_ITEM, {
      type,
      lon,
      lat,
      broken
    })
    .then((data) => {
      toast.success("Item created successfully!");

      //window.location.reload();
      
    })
    .catch((error) => toast(error));
    
};



