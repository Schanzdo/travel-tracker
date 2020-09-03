import React, { useState } from 'react'
import { useForm} from 'react-hook-form'
import { createTrackEntry } from './ApiCall'

const TrackEntryForm = ({onClose, location}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const{ register, handleSubmit} = useForm();
    
    const addEntry = async(data) => {
        try{
            setLoading(true);
            data.longitude = location.longitude;
            data.latitude = location.latitude;
            console.log("aa +" + data);
            const created = await createTrackEntry(data);
            console.log(created);
            onClose();
        }catch (error){
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
        
    }
    
   return ( <form className="add-track-entry-form" onSubmit={handleSubmit(addEntry)}>
            
            <label htmlFor="title">Track</label>
            <input name="title" ref={register} required/>
            <label htmlFor="text">Beschreibung</label>
            <textarea rows="3" name="text" ref={register} />
            <label htmlFor="startDate" >Start Datum </label>
            <input name="startDate" type="date" ref={register}/>
            <label htmlFor="endDate">Enddatum</label>
            <input name="endDate" type="date" ref={register}/>
            <label htmlFor="image">Bild</label>
            <input name="image" ref={register}/>
            {error ? <p>{error}</p> : null}
            <button disabled={loading}>{loading ? "Lädt" : "Eintrag erstellen"}</button>
        </form>)
}

export default TrackEntryForm