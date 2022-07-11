import { getRents, getItems, deleteRent, createRent } from "services/tableService";
import { useQuery, useMutation, useQueryClient} from "react-query";
import { Box } from "@mui/material";
import MaterialTable from 'material-table';
import { Autocomplete, TextField } from '@mui/material';

const Table = () => {
	const { data: dataR } = useQuery("rents", () =>
		getRents()
	);	

	const { data: dataI } = useQuery("items", () =>
		getItems()
	);

	const queryClient = useQueryClient();

	const { mutate: createR } = useMutation(
		async (newRowM) => {
			await createRent(
				newRowM.externalId, 
				newRowM.itemsId
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries()
			}
		}
	);

	const rows = dataR?.getRents.map((rent) => ({
		rentsId: rent.id,
		externalId: rent.externalId,
		usersId: rent.usersId,
		itemsId: rent.itemsId.id,
	  }));

	const itemList = dataI?.getItems.map((item) => ({
		id: item.id,
		label: item.rents.length === 0 ? item.id + " NR" : item.id + "  R",
	}));
	
	const { mutate: deleteR } = useMutation(
		async (RentId) => {
		await deleteRent(RentId);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries()
			},
		}
	);

	const columns=[
	{ title: 'ID', field: 'rentsId', editable:"false"},
    { title: 'Guest ID', field: 'externalId', validate: rowData => {
		if(rowData.externalId === undefined || rowData.externalId === ""){
			return "Required"
		}
		return true
		}
	},
    { title: 'User ID', field: 'usersId', editable:"false"},
	{ title: 'Item ID', field: 'itemsId',  validate: rowData => {
		if(rowData.itemsId === undefined || rowData.itemsId === ""){
			return "Required"
		}
		return true
		}, 
		editComponent: props => (<Autocomplete
			freeSolo
			options={itemList}
			sx={{ width: 100 }}
			getOptionLabel = {
				(option) => option.label
			}
			onChange = {
				(event, value) => props.onChange(value.id)
			}
			renderInput={(params) => <TextField {...params} variant="standard"/>}
			/>)
	},
	]	


	return (
		<Box sx={{paddingLeft:"16px", paddingRight:"16px"}}>
			<h2>Rents Table </h2>
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
					isDeletable: rowData => rowData.rentsId !== null,
					onRowAdd:(newRow) => new Promise((resolve, reject) => {
						createR(newRow);
						resolve();
					}),
				 	onRowDelete:(selectedRow) => new Promise((resolve, reject) => {
						deleteR(selectedRow.rentsId);
						resolve();
					}),
				}}
        	/>
			</div>
		</Box>
	);
};

export default Table;