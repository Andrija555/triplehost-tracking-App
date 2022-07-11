import { client } from "./gClient";
import { gql } from "graphql-request";
import { toast } from "react-hot-toast";

const CREATE_ITEM = gql`
	mutation($typeId: ID!, $lon: Float!, $lat: Float!, $brokenId: ID){
		createItem(Input: {typeId: $typeId, lon: $lon, lat: $lat, brokenId: $brokenId})
	}
`;

const GET_ITEMS = gql`
	query {
		getItems {
			id,
			typeId,
			lon,
			lat,
			brokenId,
			rents{id},
		}
	}
`;

const GET_RENTS= gql`
query{getRents{externalId,itemsId{id lon lat}}}
`;

const GET_INPUT_LIST = gql`
	query {
		getInputList{
			name,
			attributes {
				id,
				value,
			}
  		}
	}
`;

const UPDATE_ITEM = gql`
	mutation($id: ID!, $typeId: ID!, $lon: Float!, $lat: Float!, $brokenId: ID){
		updateItem(Input: {id: $id, typeId: $typeId, lon: $lon, lat: $lat, brokenId: $brokenId})
	}
`;

const DELETE_ITEM = gql`
	mutation($id: ID!){
		deleteItem(ItemID: $id)
	}
`;

export const createItem = async (typeId, lon, lat, brokenId) => {
	return client
	.request(CREATE_ITEM, {typeId, lon, lat, brokenId})
	.then((data) => {

		toast.success("Item inserted successfully!");
	})
	.catch((error) =>
			toast.error(error?.response?.errors[0]?.message || "Insert of Item failed!")
		);
	
};

export const getItems = async () => {
	return client
	.request(GET_ITEMS)
		.then((data) => data)
		.catch((error) => console.log(error));
};

export const getRents = async () => {
	return client
	.request(GET_RENTS)
		.then((data) => data)
		.catch((error) => console.log(error));
};


export const getInputList = async () => {
	return client
	.request(GET_INPUT_LIST)
		.then((data) => data)
		.catch((error) => toast.error.log(error));
};

export const updateItem = async (id, typeId, lon, lat, brokenId) => {
	return client
	.request(UPDATE_ITEM , {id, typeId, lon, lat, brokenId})
	.then((data) => {
		toast.success("Item updated successfully!");
	})
	.catch((error) =>
	toast.error(error?.response?.errors[0]?.message || "Update of Item failed!")
	);
	
};

export const deleteItem = async (id) => {
	return client
	.request(DELETE_ITEM, {id})
	.then((data) => {
		toast.success("Item deleted successfully!");
	})
	.catch((error) =>
	toast.error(error?.response?.errors[0]?.message || "Delete of Item failed!")
	);
	
};