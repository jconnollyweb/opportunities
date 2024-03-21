import axios from "axios";
import { useState, useEffect } from "react";
import { data } from "../../data"
import { useParams, Link } from "react-router-dom"
import RoleFilter from "../../components/filter/RoleFilter";
import GradeFilter from "../../components/filter/GradeFilter";
import "./OpenRoles.css"

export function RoleDetails() {
const { id } = useParams()
return data.map(value => {
  return (
    < OpenRoles
      key={value.id}
      value={value}
    />
  )
})
}


function OpenRoles() {
  const [values, setValues] = useState([]);   //when using api
  //const [values, setValues] = useState(data)
  const [roles, setRoles] = useState([]);
  const [grades, setGrades] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [ selectedGrades, setSelectedGrades ] = useState([])
  const [ showFilter, setShowFilter ] = useState(false)
  const [serverStatus, setServerStatus] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://opportunities-server.onrender.com" + "api/values/all");
        const data = response.data;
        setValues(data);
        const allRoles = Array.from(
          new Set(data.flatMap((item) => item.role))
        );
        setRoles(allRoles);

        const allGrades = Array.from(
          new Set(data.flatMap((item) => item.grade))
        )
        setGrades(allGrades)
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    axios.get("https://opportunities-server.onrender.com" + "/")
    .then(response => {
      setServerStatus(response.data.message);
    })
    .catch(error => {
      setServerStatus('Failed to connect to the server.');
      console.error('Error connecting to server:', error);
    });

    fetchData();
  }, []);

  const filteredValues = values.filter((value) =>
    (selectedRoles.length === 0 || value.role.some((role) => selectedRoles.includes(role))) &&
    (selectedGrades.length === 0 || value.grade.some((grade) => selectedGrades.includes(grade)))
  );

  const handleRoleChange = (selectedRoles) => {
    setSelectedRoles(selectedRoles);
  };

  const handleGradeChange = (selectedGrades) => {
    setSelectedGrades(selectedGrades)
  }

  // const resetFilter = () => {
  //   setSelectedRoles([])
  // }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit'}
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options)
    return formattedDate
  }

  return (
    <div className="body">
      <button className="filter-button" onClick={() => setShowFilter(!showFilter)}>{showFilter ? "Hide Filter" : "Show Filter"}</button>
      {showFilter && ( <div className="both-filters">
      <RoleFilter roles={roles} selectedRoles={selectedRoles} onFilterChange={handleRoleChange} /> 
      <GradeFilter grades={grades} selectedGrades={selectedGrades} onFilterChange={handleGradeChange} />
      </div>
      )}
      {/* <button onClick={resetFilter}>Reset Filter</button> */}
        
          {/* <Link to="/gridpage">
          <button className="grid-button">Grid View</button>
          </Link> */}
      <div className="values">
        {filteredValues.length === 0 ? (
          <p>No values found</p>
        ) : (
          filteredValues.map((value, index) => (
            <div className="link-value">
              <Link to={`/${value.id}`} key={index} className="value" >
                <div className="account">
                  <h4>Account</h4>
                  <h3>{value.account}</h3>
                </div>
                <div className="engagement">
                  <h4>Engagement</h4>
                  <h3>{value.engagement}</h3>
                </div>
                <div className="start-date">
                  <h4>Start Date</h4>
                  <h3>{formatDate(value.startdate)}</h3>
                </div>
                <div className="end-date">
                  <h4>End Date</h4>
                  <h3>{formatDate(value.enddate)}</h3>
                </div>
                <div className="owner">
                  <h4>Owner</h4>
                  <h3>{value.owner}</h3>
                </div>
                <div className="revenue">
                  <h4>Revenue</h4>
                  <h3>£{value.revenue}</h3>
                </div>
                <div className="forecast">
                  <h4>Sales Forecast</h4>
                  <h3>{value.forecast}</h3>
                </div>
                <div>
                  <h1>Server Status:</h1>
                  <p>{serverStatus}</p>
                </div>

                
                
                {/* <p>Role: {value.role.join(", ")} </p> */}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OpenRoles;

 