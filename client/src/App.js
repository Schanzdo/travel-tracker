import React from 'react';
import './App.css';

import {listTrackEntries, deleteTrackEntry} from './ApiCall';

//import {Component} from 'react';
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import { useState,useEffect } from 'react';

import TrackEntryForm from './TrackEntryForm'

const TrashSVG = () => {return(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>)};
const MarkerSVG = (zoom) => {
  return(<svg version="1.1" className="marker" x="0px" y="0px" viewBox="0 0 368.16 368.16"  style={{enableBackground:"new 0 0 368.16 368.16", 
  height: `${8*zoom.zoom}px`,
  width:`${8*zoom.zoom}px`
  }}><g><g>  <g> <path d="M184.08,0c-74.992,0-136,61.008-136,136c0,24.688,11.072,51.24,11.536,52.36c3.576,8.488,10.632,21.672,15.72,29.4 l93.248,141.288c3.816,5.792,9.464,9.112,15.496,9.112s11.68-3.32,15.496-9.104l93.256-141.296	c5.096-7.728,12.144-20.912,15.72-29.4c0.464-1.112,11.528-27.664,11.528-52.36C320.08,61.008,259.072,0,184.08,0z
      M293.8,182.152c-3.192,7.608-9.76,19.872-14.328,26.8l-93.256,141.296c-1.84,2.792-2.424,2.792-4.264,0L88.696,208.952	c-4.568-6.928-11.136-19.2-14.328-26.808C74.232,181.816,64.08,157.376,64.08,136c0-66.168,53.832-120,120-120 c66.168,0,120,53.832,120,120C304.08,157.408,293.904,181.912,293.8,182.152z"/>	<path d="M184.08,64.008c-39.704,0-72,32.304-72,72c0,39.696,32.296,72,72,72c39.704,0,72-32.304,72-72 C256.08,96.312,223.784,64.008,184.08,64.008z M184.08,192.008c-30.872,0-56-25.12-56-56s25.128-56,56-56s56,25.12,56,56 S214.952,192.008,184.08,192.008z"/>
  </g>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
)};

const App = () => {
  const  [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 49.013513,
    longitude: 8.404435,
    zoom: 3
  });
  const[showInfo, setShowInfo] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const[trackEntries, setTrackEntries] = useState([]);


  const ShowAddMarker = (event=> {
   
      const [ longitude, latitude ] = event.lngLat;
      setAddEntryLocation({latitude, longitude});
    
    console.log(event);
  })
    const getTrackEntries = async() => {
      const trackEntries = await listTrackEntries(); 
      setTrackEntries(trackEntries);
    }

  const deleteThisEntry = async(entry) => {
    try{console.log("del entry" + JSON.stringify(entry))
    const deletedEntry = await deleteTrackEntry(entry);
    console.log(deletedEntry);
    setShowInfo({});
    getTrackEntries();
    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    getTrackEntries();
    
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={process.env.REACT_APP_MAPBOX_STYLE_URL}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}

      onDblClick={ShowAddMarker}
    >
      {
        trackEntries.map(entry=> (
         <React.Fragment key={entry._id}>
          <Marker 
            latitude={entry.latitude} longitude={entry.longitude} 
          >
            <div
              onClick={()=> setShowInfo({
                ...showInfo,
                [entry._id]:true
              })
              }
              >
              <MarkerSVG zoom={viewport.zoom}/>
            </div>
          </Marker>
        {
          showInfo[entry._id] ? (

        <Popup
          latitude={entry.latitude}
          longitude={entry.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={()=> setShowInfo({
            ...showInfo,
            [entry._id]:false
          })
          }
          anchor="top"
          className="popup-info">
          <div className="marker-info">
            <h4>{entry.title}</h4> 
            <p>{entry.text} </p>
            {entry.image ? <img src={entry.image} alt={entry.title}/> : null}
            <div style={{display: "flex", justifyContent: "space-between"}}> 
            <p className="date-info">Besucht am: {new Date(entry.startDate).toLocaleDateString()}</p>
            <button onClick={()=> deleteThisEntry(entry)} style={{padding: "0px 5px"}}><TrashSVG/></button>
          </div>
        </div>
        </Popup>
          ) : null
        }
        
      </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker 
          
          
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude} 
            >
            <div className="add-marker" >
            <MarkerSVG zoom={viewport.zoom}></MarkerSVG>
          </div>
          </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={()=> setAddEntryLocation(null)
              
              }
              anchor="top">
              <div className="popup-add">
              <h4>Neues Eintrag erstellen</h4> 
              <TrackEntryForm location={addEntryLocation} onClose={
              ()=> {
                setAddEntryLocation(null);
                getTrackEntries();
              } 
              }/>
          </div>
            </Popup>
          </>
        ) : null
      }
      </ReactMapGL>
  );
}
export default App;
