import axios from "axios";
import { useState, useEffect } from "react";
import { data } from "../../data"
import { useParams, Link } from "react-router-dom"
import RoleFilter from "../../components/filter/RoleFilter";
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
  //const [values, setValues] = useState([]);   //when using api
  const [values, setValues] = useState(data)
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [ showFilter, setShowFilter ] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/values/all");
        const data = response.data;
        setValues(data);
        const allRoles = Array.from(
          new Set(data.flatMap((item) => item.role))
        );
        setRoles(allRoles);
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    fetchData();
  }, []);

  const filteredValues = values.filter((value) =>
    selectedRoles.length === 0 || value.role.some((role) => selectedRoles.includes(role))
  );

  const handleRoleChange = (selectedRoles) => {
    setSelectedRoles(selectedRoles);
  };

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
      {showFilter && (
      <RoleFilter roles={roles} selectedRoles={selectedRoles} onFilterChange={handleRoleChange} />
      )}
      {/* <button onClick={resetFilter}>Reset Filter</button> */}
        
          <Link to="/gridpage">
          <button className="grid-button">Grid View</button>
          </Link>
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

 