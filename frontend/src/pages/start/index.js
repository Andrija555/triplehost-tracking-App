import { createItem, getItems, updateItem, deleteItem, getInputList } from "services/itemsService";
import { useQuery, useMutation, useQueryClient} from "react-query";
import { Box } from "@mui/material";
import MaterialTable from 'material-table';

const Start = () => {
	const { data } = useQuery("items", () =>
		getItems()
	);	

	const queryClient = useQueryClient();

	const { mutate: createI } = useMutation(
		async (newRowM) => {
			await createItem(
				newRowM.typeId, 
				newRowM.lon, 
				newRowM.lat, 
				newRowM.brokenId
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries()
			}
		}
	);

	const rows = data?.getItems.map((item) => ({
		id: item.id,
		typeId: item.typeId,
		lon: item.lon,
		lat: item.lat,
		brokenId: item.brokenId,
	  }));

	const { mutate: updateI } = useMutation(
		async (selectedRow) => {
			await updateItem(
				selectedRow.id,
				selectedRow.typeId, 
				selectedRow.lon, 
				selectedRow.lat, 
				selectedRow.brokenId
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries()
			}
		}
	);

	const { mutate: deleteI } = useMutation(
		async (ItemId) => {
			await deleteItem(ItemId);
		},
		{
		  onSuccess: () => {
			queryClient.invalidateQueries()
		  },
		}
	);


	const attributes = useQuery ("brokenAttributes", () => getInputList(), {

	});

	var brokenAtt = attributes.data?.getInputList.find(inputs => inputs.name === "broken").attributes;
	var typeAtt = attributes.data?.getInputList.find(inputs => inputs.name === "type").attributes;


	const columns=[
		{ title: 'ID', field: 'id', editable:"false"},
		{ title: 'Type', field: 'typeId', validate: rowData => {
			if(rowData.typeId === undefined || rowData.typeId === ""){
				return "Required"
			}
			return true
			},
			lookup: typeAtt?.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{}),
		},
		{ title: 'Lon', field: 'lon', type: 'numeric'},
		{ title: 'Lat', field: 'lat', type: 'numeric'},
		{ title: 'Broken', field: 'brokenId', lookup: brokenAtt?.reduce((obj, item) => (obj[item.id] = item.value, obj) ,{}),
		},
		]	

	return (
		<Box sx={{paddingLeft:"16px", paddingRight:"16px"}}>
			<h2>Items</h2>
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
				editable={{
					onRowAdd:(newRow) => new Promise((resolve, reject) => {
						createI(newRow);
						resolve();
					}),
					onRowDelete:(selectedRow) => new Promise((resolve, reject) => {
						deleteI(selectedRow.id);
						resolve();
					}),
					onRowUpdate:(selectedRow) => new Promise((resolve, reject) => {
						updateI(selectedRow);
						resolve();
					})
				}}
        	/>
			</div>
		</Box>
	);
};

export default Start;