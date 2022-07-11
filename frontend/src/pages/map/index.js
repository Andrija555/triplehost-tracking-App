import React, { useEffect, useState,useRef } from "react";
import IconButton from '@mui/material/IconButton';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { GoogleMap, useJsApiLoader,Marker ,InfoWindow} from '@react-google-maps/api';
import { QueryClient, useQuery,useQueryClient} from "react-query";
import { getAllItems } from "services/sunbedService";
import { Button, Container } from "@mui/material";
import { createRent } from "services/tableService";

import PulsingBadge from "./puls";
import toast from "react-hot-toast";
import { fontWeight, height } from "@mui/system";
import { getItems, getRents } from "services/itemsService";
import Popup from "./popup";


const containerStyle = {
 marginTop:"0px",
  height: '85vh',
  width:"100% "
  
  
};



const Map = ({  }) => {


  // const {loading, error,data } = useQuery ("items", () => getAllItems(), {
   
  // });
  const {loading, error:errR,data:dataR } = useQuery ("rents", () => getRents(), {
   
     });
  
     const {error:errI,data:dataI } = useQuery ("items", () => getItems(), {
   
    });   
 

  var j
  
  const HOTEL_PINIJA_BOUNDS = {

    
      north: 44.181838,
      south: 44.178976,
      west: 15.154,
      east: 15.161,
  
  };

  const [selectedItemR, setSelectedItemR] = useState(null);
  const [selectedItemI, setSelectedItemI] = useState(null);
  const [selectedItemid, setSelectedItemid] = useState(null);
 
  const [zoom, setZoom] = useState(17);
  const[center,setCenter]=useState([ 44.180345,15.158051]);
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const { isLoaded } = useJsApiLoader({
    
    id: 'google-map-script'
  });
  



  return (
<>

      {isLoaded && (
        <GoogleMap 
        
        options={{ 
          
          zoomControl: false,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP

        },
        mapTypeControl:false,
    
        rotateControl: false,
          center:{
            lat: center[0],
          lng: center[1],
          
          },
        
         fullscreenControl: false,
          disableDoubleClickZoom: false,
          zoom:zoom ,
         
          restriction: {
            latLngBounds:  HOTEL_PINIJA_BOUNDS,
            //strictBounds: true,
          },
        }}
       mapContainerStyle={containerStyle}
       >
         
          <IconButton onClick={()=> {queryClient.invalidateQueries("rents");queryClient.invalidateQueries("items"); setZoom(17)}} sx={{width:"50px", float:"right", marginTop:"30px"}}>
         <ModeOfTravelIcon  sx={{ color:"white", fontSize:"30px"}} />
</IconButton> 
          {/* data?.getRents?.map(inputs => inputs.itemsId
 */}        {dataR?.getRents?.map(item =>(
        
            
        <Marker
          key={item.itemsId?.id}
          position={{
            lat: item.itemsId.lat,
            lng: item.itemsId.lon,
          }}
          onClick={() => {
            setZoom(20)
            setCenter([item.itemsId.lat, item.itemsId.lon])
            setSelectedItemR(item);
            setSelectedItemI(null)
           
            
          }}
          icon={{
            
            url: "https://img.icons8.com/emoji/344/red-circle-emoji.png",
           
            scaledSize: new window.google.maps.Size(15, 15),
          }}
        />
        ))} 
      {selectedItemR &&  (
        <div  sx={{paddingRight:"10px", marginTop:"10px"}}><InfoWindow
        
          
          pixelOffset={"10"}
          
          onCloseClick={() => {
            setSelectedItemR(null);
          }}
          position={{
            lat: selectedItemR.itemsId.lat,
            lng: selectedItemR.itemsId.lon,
          }}
          setZoom={17}
        >
          <div>
          
          {/* <PulsingBadge sx={{marginRight:"10px"}} variant={ status=="0" ? "danger" : "success"} withBorder={false} badgeLabel={ status=="0" ? "Reserved" : "Available"}/> */}
          <PulsingBadge sx={{marginRight:"10px"}} variant={ "danger" } withBorder={false} badgeLabel={ "Reserved" }/>
          <br/><br/>
            <h2>Item ID: {selectedItemR.itemsId.id}</h2>
            <h3>Guest ID: {selectedItemR.externalId}</h3>
            
            {/* !status ?(
           null
            ): */ }
             <Button variant="outlined" sx={{ marginTop:"10px"}} onClick={()=>{
               setSelectedItemR(false)
             }}  > Close
               </Button>
          </div>
          
        </InfoWindow>
        </div>

      )},

     {dataI?.getItems?.map(item =>(
        item?.rents?.length !== 0 ?(
          ""
           ): 
         <Marker
           key={item.id}
           position={{
             lat: item.lat,
             lng: item.lon,
           }}
           onClick={() => {
             setZoom(20)
             setCenter([item.lat, item.lon])
             setSelectedItemI(item);
             setSelectedItemR(null);
             setSelectedItemid(item.id)
             
           }}
           icon={{
             
             url: "https://img.icons8.com/emoji/344/green-circle-emoji.png",
            
             scaledSize: new window.google.maps.Size(15, 15),
           }}
         />
         )
         )} 
 
{selectedItemI &&  (
        <div  sx={{paddingRight:"10px", marginTop:"10px"}}><InfoWindow
        
          
          pixelOffset={"10"}
          
          onCloseClick={() => {
            setSelectedItemI(null);
          }}
          position={{
            lat: selectedItemI.lat,
            lng: selectedItemI.lon,
          }}
          setZoom={17}
        >
          <div>
          
         {/*  <PulsingBadge sx={{marginRight:"10px"}} variant={ status=="0" ? "danger" : "success"} withBorder={false} badgeLabel={ status=="0" ? "Reserved" : "Available"}/>  */}
          <PulsingBadge sx={{marginRight:"10px"}} variant={ "success" } withBorder={false} badgeLabel={ "Available" }/>
          <br/><br/>
            <h2>Item ID: {selectedItemI.id}</h2>
            <h3>Guest ID: ------ </h3>
            
            
            { (
              <Button variant="outlined" sx={{ marginTop:"10px", marginRight:"4px"}} onClick={() => {setZoom(20);setOpen(true) 
                setSelectedItemI(false)
                
            }} >Rent</Button>
             ) }
             <Button variant="outlined" sx={{ marginTop:"10px"}} onClick={()=>{
               setSelectedItemI(false)
             }}  > Close
               </Button>
          </div>
          
        </InfoWindow>
        </div>

      )},
    
      <Popup
      queryClient={queryClient}
      selectedItemIID={selectedItemid}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        
      />
      
        
        </GoogleMap>
         
        ) }</>
  );
};

export default Map