import { data } from "../../data";
import { useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import EditRole from "../../components/edit/EditRole";
//import { API_ENDPOINT } from "./utils/utils";
import './RoleDetails.css'

function RoleDetails() {
    const { id } = useParams() 
    const [values, setValues] = useState()
    const [selectedForecast, setSelectedForecast] = useState([]);
    const [isEditing, setIsEditing ] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/values/${id}`)
          setValues(response.data)
          console.log('resdate', response.data)
        } catch (error) {
          console.error('error', error)
        }
      }
      fetchData()
    }, [id])

    if(!values) {
      return <p> Loading ...</p>
    }

    const toggleEdit = () => {
      setIsEditing(!isEditing)
    }

    function formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit'}
      const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options)
      return formattedDate
    }
    
 
return (
  <div className="body">
  <div className="values">
   {values.length === 0 ? (
     <p>No values found</p>
   ) : (
     values.map((value, index) => (
       
       <div key={index} className="role-value">
         <div className="left"> 
            <p>Account: {value.account}</p>
            <p>Engagement: {value.engagement}</p>
            <p>Role: {value.role} </p>
            <p>Start Date: {formatDate(value.startdate)} </p>
            <p>Owner: {value.owner} </p>
            <p>Revenue: £{value.revenue}</p>
            <p>Notes: {value.notes} </p>

         </div>
         <div className="right"> 
            <p>Sector: {value.sector}</p>
            <p>Location: {value.location}</p>
            <p>Sales Channel: {value.channel} </p>
            <p>End Date: {formatDate(value.enddate)} </p>
            <p>Originator: {value.originator} </p>
            <p>Grades Wanted: {value.grade} </p>
            <p>Sales Forecast: {value.forecast}</p>

         </div>

         <button className="edit-btn" onClick={toggleEdit}>Edit</button>
          {isEditing && (
            <EditRole 
            id={id}
            selectedForecast={selectedForecast}
            setSelectedForecast={setSelectedForecast}
            onClose={toggleEdit}
            />
          )}

         </div>
       
     ))
   )}
 </div> 

 
 

 <Link to="/">Go back to home screen</Link>
</div>

  )
  }

export default RoleDetails
