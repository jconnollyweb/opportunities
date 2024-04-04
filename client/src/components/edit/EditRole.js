import { useState } from "react";
import axios from "axios";
import './EditRole.css'


function EditRole({ id, selectedForecast, setSelectedForecast, onClose}) {

  const [successMessage, setSuccessMessage ] = useState("")
  const url = "https://opportunities-3.onrender.com"

  const handleForecastSelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedForecast([...selectedForecast, value]);
    } else {
      setSelectedForecast(selectedForecast.filter((item) => item !== value));
    }
  };

  const handleSaveForecast = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(url + `/values/${id}`, {
        forecast: selectedForecast,
      });
      setSuccessMessage("Forecast updated successfully")
      console.log('Updated forecast:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error updating forecast:', error);
    }
  };

  return (
    <div className="edit-form">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form className="edit-forecast">
      <label>Sales Forecast</label>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  value="Firm (100%)"
                  checked={selectedForecast.includes("Firm (100%)")}
                  onChange={handleForecastSelection}
                />
                Firm (100%)
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Firm (100%) Working at Risk"
                  checked={selectedForecast.includes("Firm (100%) Working at Risk")}
                  onChange={handleForecastSelection}
                />
                Firm (100%) Working at Risk
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Confident (90%)"
                  checked={selectedForecast.includes("Confident (90%)")}
                  onChange={handleForecastSelection}
                />
                Confident (90%)
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Probable (60%)"
                  checked={selectedForecast.includes("Probable (60%)")}
                  onChange={handleForecastSelection}
                />
                Probable (60%)
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Possible (40%)"
                  checked={selectedForecast.includes("Possible (40%)")}
                  onChange={handleForecastSelection}
                />
                Possible (40%)
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Longshot (10%)"
                  checked={selectedForecast.includes("Longshot (10%)")}
                  onChange={handleForecastSelection}
                />
                Longshot (10%)
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Lead (1%)"
                  checked={selectedForecast.includes("Lead (1%)")}
                  onChange={handleForecastSelection}
                />
                Lead (1%)
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Lost"
                  checked={selectedForecast.includes("Lost")}
                  onChange={handleForecastSelection}
                />
                Lost
              </label>
            </li>
           
          </ul>
          <button className="btn-edit" onClick={handleSaveForecast}>Save</button>
          <button className="btn-close" onClick={onClose}>Cancel</button>
 </form>
    </div>
  )
}

export default EditRole
