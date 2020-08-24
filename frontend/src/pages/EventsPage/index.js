import React, {useState, useMemo} from 'react';
import api from '../../services/api'
import { Container,Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import '../EventsPage/events.css';

export default function EventsPage(){    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [sport, setSport] = useState('')
    const [date, setDate] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)

    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail):null;
    },[thumbnail])

    const submitHandler = async (evt) => {
        const user_id = localStorage.getItem('user');

        const eventData = new FormData();

        eventData.append("thumbnail", thumbnail)
        eventData.append("sport", sport)
        eventData.append("title", title)
        eventData.append("description", description)
        eventData.append("price", price)
        eventData.append("date", date)

        
        try {
            if(title !== '' && description !== '' && price !== '' && sport !== '' && date !== '' && thumbnail !== null)
            {
            console.log("Event has been sent")
            await api.post('/event',eventData,{headers: {user_id} })        
            console.log(eventData)
            console.log("event has been saved")        
            }
        else{
            setErrorMessage(true)
            setTimeout(() => {
               setErrorMessage(false) 
            }, 2000)

            console.log("missing required data")
        }
    }
        catch(error) {
                console.log(error.message)
        }
    
     

        evt.preventDefault()
        return ""
    }

    return(
        <Container>
            <h1>Create your event</h1>
            <Form onSubmit = {submitHandler}>
            <FormGroup>
                    <Label>Upload Image: </Label>
                    <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                        <Input type="file" onChange ={(evt) => setThumbnail(evt.target.files[0])} />
                        <img src={cameraIcon} style={{ maxWidth: "50px" }} alt="upload icon image" />
                    </Label>
                </FormGroup>
            <FormGroup>
                <Label>Sport: </Label>
                <Input id="sport" type="text" value={sport} placeholder={'Sport name'} onChange ={(evt) => setSport(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Event Title: </Label>
                <Input id="title" type="text" value={title} placeholder={'Event Title'} onChange ={(evt) => setTitle(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Event Description: </Label>
                <Input id="description" type="text" value={description} placeholder={'Event Description'} onChange ={(evt) => setDescription(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Event Price: </Label>
                <Input id="price" type="text" value={price} placeholder={'Event Price $0.00'} onChange ={(evt) => setPrice(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Event Date: </Label>
                <Input id="date" type="date" value={date} placeholder={'Event Date'} onChange ={(evt) => setDate(evt.target.value)}/>
            </FormGroup>
            <Button type="submit">
                Create Event
            </Button>
            </Form>
            {errorMessage?(
                <Alert className="event-validation" color="danger">Missing required information</Alert>
            ) : ""}
        </Container>
    )
}