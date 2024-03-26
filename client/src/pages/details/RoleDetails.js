// import { data } from "../../data";
import { useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import EditRole from "../../components/edit/EditRole";
import { useAuth } from "../../components/authcontext/AuthContext";
//import { API_ENDPOINT } from "./utils/utils";
import './RoleDetails.css'

function RoleDetails() {
    const { id } = useParams() 
    const { authenticated } = useAuth()
    const [values, setValues] = useState([])
    const [selectedForecast, setSelectedForecast] = useState([]);
    const [isEditing, setIsEditing ] = useState(false)
    console.log('values1', values)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://opportunities-server.onrender.com/values/${id}`)
          setValues(response.data)
          console.log('resdate', response.data)
          console.log('values', values)
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

    console.log('values2', values)

    function formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit'}
      const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options)
      return formattedDate
    }
    
 
return (
  <div className="body">
  <div className="values">
    {values ? (
      <div className="role-value">
        <div className="left"> 
          <p>Account: {values.account}</p>
          <p>Engagement: {values.engagement}</p>
          {values.role && (
          <p>Role: {JSON.parse(values.role.replace(/"/g, '"').replace(/{/g, '[').replace(/}/g, ']')).map((role, index) => <span key={index}>{role}<br /></span>)}</p>)}
          <p>Start Date: {formatDate(values.startdate)} </p>
          <p>Owner: {values.owner} </p>
          <p>Revenue: £{values.revenue}</p>
          <p>Notes: {values.notes} </p>
        </div>

        <div className="right"> 
            <p>Sector: {values.sector}</p>
            <p>Location: {values.location}</p>            
            <p>Sales Channel: {values.channel} </p>
            <p>Grades Wanted: {values.grade}</p>
             <p>End Date: {formatDate(values.enddate)} </p>
            <p>Originator: {values.originator} </p>
            <p>Sales Forecast: {values.forecast}</p>

         </div>
          {authenticated && (
        <button className="edit-btn" onClick={toggleEdit}>Edit</button> )}
         {isEditing && authenticated && (
           <EditRole 
           id={id}
          selectedForecast={selectedForecast}
           setSelectedForecast={setSelectedForecast}
          onClose={toggleEdit}
          />
        )} 
        
      </div>
    ) : (
      <p>No values found</p>
    )}
  </div>
</div>

  )
  }

export default RoleDetails
