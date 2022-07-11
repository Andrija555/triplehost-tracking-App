import { client } from "./gClient";
import { gql } from "graphql-request";
import { toast } from "react-hot-toast";

const CREATE_RENT = gql`
	mutation($externalId: ID!, $itemsId: ID!){
		createRent(Input: {externalId: $externalId, itemsId: $itemsId})
	}
`;


const GET_RENTS = gql`
	query {
		getRents{
			id,
			externalId,
			usersId,
			itemsId {
				id
			}
		}	
	}
`;

const GET_ITEMS = gql`
	query {
		getItems{
			id,
			rents {
				id
			}
		}
	}
`;

const DELETE_RENT = gql`
	mutation($id: ID!){
		deleteRent(RentID: $id)
	}
`;

export const createRent = async (externalId, itemsId) => {
	return client
	.request(CREATE_RENT, {externalId, itemsId})
	.then((data) => {

		toast.success("Rent inserted successfully!");
	})
	.catch((error) =>
			toast.error(error?.response?.errors[0]?.message || "Insert of Rent failed!")
		);
	
};

export const getRents = async () => {
	return client
	.request(GET_RENTS)
		.then((data) => data)
		.catch((error) => console.log(error));
};

export const getItems = async () => {
	return client
	.request(GET_ITEMS)
		.then((data) => data)
		.catch((error) => console.log(error));
};

export const deleteRent = async (id) => {
	return client
	.request(DELETE_RENT, {id})
	.then((data) => {
		toast.success("Rent deleted successfully!");
	})
	.catch((error) =>
	toast.error(error?.response?.errors[0]?.message || "Delete of Rent failed!")
	);
	
};
