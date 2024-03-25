
import { useCallback, useState } from "react";
import axios from "axios";
import './AddOpportunities.css'
// import "./MainComponent.css";

const AddOpportunities = () => {
  const [account, setAccount] = useState("");
  const [selectedSector, setSelectedSector] = useState([]);
  const [engagement, setEngagement] = useState("")
  const [startdate, setStartdate] = useState("")
  const [enddate, setEnddate] = useState("")
  const [selectedChannel, setSelectedChannel] = useState([])
  const [owner, setOwner] = useState("")
  const [originator, setOriginator] = useState("")
  const [ selectedRole, setSelectedRole] = useState([])
  const [ location, setLocation ] = useState("")
  const [ revenue, setRevenue ] = useState("")
  const [ selectedForecast, setSelectedForecast ] = useState([])
  const [ notes, setNotes ] = useState("")
  const [ selectedGrade, setSelectedGrade ] = useState([])
  const [successMessage, setSuccessMessage ] = useState("")
  


  const saveInfo = useCallback(
    async event => {
      event.preventDefault();
      await axios.post("https://opportunities-server.onrender.com" + "/values", {
        account,
        sector: selectedSector,
        engagement, 
        startdate,
        enddate,
        channel: selectedChannel,
        owner,
        originator,
        role: selectedRole,
        location,
        revenue,
        forecast: selectedForecast,
        notes,
        grade: selectedGrade
      });

      setAccount("");
      setSelectedSector([])
      setEngagement("")
      setStartdate("")
      setEnddate("")
      setSelectedChannel([])
      setOwner("")
      setOriginator("")
      setSelectedRole([])
      setLocation("")
      setRevenue("")
      setSelectedForecast([])
      setNotes("")
      setSelectedGrade([])
      setSuccessMessage("Role added successfully")
    },
    [account, selectedSector, engagement, startdate, enddate, selectedChannel, owner, originator, selectedRole, location, revenue, selectedForecast, notes, selectedGrade]
  );

  const handleSectorSelection = event => {
    const sector = event.target.value;
    if (event.target.checked) {
      setSelectedSector(prevSectors => [...prevSectors, sector]);
    } else {
      setSelectedSector(prevSectors => prevSectors.filter(item => item !== sector));
    }
  };

  const handleGradeSelection = event => {
    const grade = event.target.value;
    if (event.target.checked) {
      setSelectedGrade(prevGrades => [...prevGrades, grade]);
    } else {
      setSelectedGrade(prevGrades => prevGrades.filter(item => item !== grade));
    }
  };

  const handleForecastSelection = event => {
    const forecast = event.target.value;
    if (event.target.checked) {
      setSelectedForecast(prevForecasts => [...prevForecasts, forecast]);
    } else {
      setSelectedForecast(prevForecasts => prevForecasts.filter(item => item !== forecast));
    }
  };

  const handleChannelSelection = event => {
    const channel = event.target.value;
    if (event.target.checked) {
      setSelectedChannel(prevChannels => [...prevChannels, channel]);
    } else {
      setSelectedChannel(prevChannels => prevChannels.filter(item => item !== channel));
    }
  };

  const handleRoleSelection = event => {
    const role = event.target.value;
    if (event.target.checked) {
      setSelectedRole(prevRoles => [...prevRoles, role]);
    } else {
      setSelectedRole(prevRoles => prevRoles.filter(item => item !== role));
    }
  };

  return (
    <div className="form-container">
       <h1>Please Add Opportunities</h1>
    <form className="add-form" onSubmit={saveInfo}>
      <div className="left-form">
       <label style={{paddingRight: "20px"}}>Account</label>
        <input style={{width: "61%", height: "30px"}}
            onChange={event => {
              setAccount(event.target.value)
            }}
            value={account}
            type="text"
            />
       
        <br />

      
          <br/>
       <div start-fr>
         <label style={{paddingRight: "3px"}}>Start Date</label>
         <input className="startdate"
         onChange={event => {
          setStartdate(event.target.value)
         }}
         value={startdate}
         type="date"
         />
       </div>
       <br />
       <label style={{paddingRight: "30px"}}>Owner</label>
        <input style={{width: "61%", height: "30px"}}
          onChange={event => {
            setOwner(event.target.value)
          }}
          value={owner}
          type="text"
        />
        <br/>
        <br/>
        <label style={{paddingRight: "17px"}} >Location</label>
        <input style={{width: "61%", height: "30px"}}
          onChange={event => {
            setLocation(event.target.value)
          }}
          value={location}
          type="text"
        />
        <br/>
        <div className="fr-sector">
          <label>Sector</label>
                
                 <ul>
          
            <li>
              <label>
                <input type="checkbox" value="commercial" checked={selectedSector.includes("commercial")}
                  onChange={handleSectorSelection}
                />
                Commercial
              </label>
            </li>
          <li>
            <label>
              <input type="checkbox" value="financialServices" checked={selectedSector.includes("financialServices")}
                onChange={handleSectorSelection}
              />
              Financial Services
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="publicSector" checked={selectedSector.includes("publicSector")}
                onChange={handleSectorSelection}
              />
              Public Sector
            </label>
          </li>
          </ul>
        </div>
        <label>Role</label>
       <br />
        <ul>
          <li>
            <label>
              <input type="checkbox" value="Devops Engineer (AWS Platform)" checked={selectedRole.includes("Devops Engineer (AWS Platform)")}
                onChange={handleRoleSelection}
              />
              Devops Engineer (AWS Platform)
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="Devops Engineer (Azure Platform)" checked={selectedRole.includes("Devops Engineer (Azure Platform)")}
                onChange={handleRoleSelection}
              />
              Devops Engineer (Azure Platform)
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="Devops Engineer (Google Platform)" checked={selectedRole.includes("Devops Engineer (Google Platform)")}
                onChange={handleRoleSelection}
              />
              Devops Engineer (Google Platform)
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value=" Devops Engineer (Platform Generalist)" checked={selectedRole.includes(" Devops Engineer (Platform Generalist)")}
                onChange={handleRoleSelection}
              />
              Devops Engineer (Platform Generalist)
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="Data Engineer (AWS Focus)" checked={selectedRole.includes("Data Engineer (AWS Focus)")}
                onChange={handleRoleSelection}
              />
              Data Engineer (AWS Focus)
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="Data Engineer (Azure Focus)" checked={selectedRole.includes("Data Engineer (Azure Focus)")}
                onChange={handleRoleSelection}
              />
              Data Engineer (Azure Focus)
            </label>
          </li>
            <li>
            <label>
              <input type="checkbox" value="Back End Engineer (Java)" checked={selectedRole.includes("Back End Engineer (Java)")}
                onChange={handleRoleSelection}
              />
              Back End Engineer (Java)
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="Front End Engineer (React)" checked={selectedRole.includes("Front End Engineer (React)")}
                onChange={handleRoleSelection}
              />
              Front End Engineer (React)
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="Full Stack Engineer" checked={selectedRole.includes("Full Stack Engineer")}
                onChange={handleRoleSelection}
              />
              Full Stack Engineer
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="Manual Test Engineer" checked={selectedRole.includes("Manual Test Engineer")}
                onChange={handleRoleSelection}
              />
             Manual Test Engineer
            </label>
          </li>
          
          
        </ul>
        <label>Notes</label>
        <br/>
        <br />
        <input className="notes-input"
          onChange={event => {
            setNotes(event.target.value)
          }}
          value={notes}
          type="text"
        />
       <br />
       <button className="sub-btn" type="submit"> Add a Role </button>
       {successMessage && <div className="success-message">{successMessage}</div>}
      </div>

      <div className="right-form">
       <label style={{paddingRight: "20px"}}>Engagement</label>
        <input style={{width: "61%", height: "30px"}}
          onChange={event => {
            setEngagement(event.target.value)
          }}
          value={engagement}
          type="text"
          />
          <br />

          <br/>
        <label style={{paddingRight: "50px"}}>End Date</label>
       <input className="enddate"
        onChange={event => {
        setEnddate(event.target.value)
        }}
        value={enddate}
        type="date"
        />
        <br/>
        <br />
        <label style={{paddingRight: "38px"}}>Originator</label>
        <input style={{width: "61%", height: "30px"}}
          onChange={event => {
            setOriginator(event.target.value)
          }}
          value={originator}
          type="text"
          />
       <br />
       <br />
       <label style={{paddingRight: "55px"}}>Revenue</label>
        <input style={{width: "61%", height: "30px"}}
          onChange={event => {
            setRevenue(event.target.value)
          }}
          value={revenue}
          type="text"
        />
        <br/>
        <br/>
        
        <label>Sales Channel</label>
        <br />
        <ul>
          <li>
            <label>
            <input type="checkbox" value="existingCustomer" checked={selectedChannel.includes("existingCustomer")}
              onChange={handleChannelSelection}
            />
            Existing Customer
                  </label>
          </li>
          <li>
            <label>
                <input type="checkbox" value="interCompany" checked={selectedChannel.includes("interCompany")}
                  onChange={handleChannelSelection}
                />
                Inter Company
            </label>
          </li>
                
          <li>
            <label>
                <input type="checkbox" value="newBusiness" checked={selectedChannel.includes("newBusiness")}
                  onChange={handleChannelSelection}
                />
                New Business
            </label>
          </li>
          <li>
              <label>
                <input type="checkbox" value="parentCompany" checked={selectedChannel.includes("parentCompany")}
                  onChange={handleChannelSelection}
                />
              Parent Company
              </label>
          </li>
        </ul>
        <br />
        <label>Sales Forecast</label>
        <ul>
        <li>
          <label>
            <input type="checkbox" value="Firm (100%)" checked={selectedForecast.includes("Firm (100%)")}
              onChange={handleForecastSelection}
            />
            Firm (100%)
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Firm (100%) Working at Risk" checked={selectedForecast.includes("Firm (100%) Working at Risk")}
              onChange={handleForecastSelection}
            />
            Firm (100%) Working at Risk
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Confident (90%) Working at Risk" checked={selectedForecast.includes("Confident (90%) Working at Risk")}
              onChange={handleForecastSelection}
            />
            Confident (90%) Working at Risk
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Confident (90%)" checked={selectedForecast.includes("Confident (90%)")}
              onChange={handleForecastSelection}
            />
            Confident (90%) 
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Probable (60%) " checked={selectedForecast.includes("Probable (60%)")}
              onChange={handleForecastSelection}
            />
            Probable (60%) 
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Possible (40%) " checked={selectedForecast.includes("Possible (40%)")}
              onChange={handleForecastSelection}
            />
            Possible (40%)
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Longshot (10%)" checked={selectedForecast.includes("Longshot (10%)")}
              onChange={handleForecastSelection}
            />
            Longshot (10%)
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Lead (1%)" checked={selectedForecast.includes("Lead (1%)")}
              onChange={handleForecastSelection}
            />
            Lead (1%)
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Lost (0%)" checked={selectedForecast.includes("Lost (0%)")}
              onChange={handleForecastSelection}
            />
            Lost (0%)
          </label>
        </li>
        
        </ul>
        <br />
        <label>Grade</label>
        <ul>
        <li>
          <label>
            <input type="checkbox" value="E0" checked={selectedGrade.includes("E0")}
              onChange={handleGradeSelection}
            />
            E0
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="E1" checked={selectedGrade.includes("E1")}
              onChange={handleGradeSelection}
            />
            E1
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="E2" checked={selectedGrade.includes("E2")}
              onChange={handleGradeSelection}
            />
            E2
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="E3" checked={selectedGrade.includes("E3")}
              onChange={handleGradeSelection}
            />
            E3
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="E4" checked={selectedGrade.includes("E4")}
              onChange={handleGradeSelection}
            />
            E4
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="E3 or E4" checked={selectedGrade.includes("E3 or E4")}
              onChange={handleGradeSelection}
            />
            E3 or E4
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="Principle" checked={selectedGrade.includes("Principle")}
              onChange={handleGradeSelection}
            />
            Principle
          </label>
        </li>
       </ul>
       
       </div>
      
      </form>
      
      </div>
  )

};

export default AddOpportunities;

