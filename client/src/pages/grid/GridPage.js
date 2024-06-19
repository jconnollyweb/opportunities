import { useState, useEffect, useMemo } from "react"
import { AgGridReact } from 'ag-grid-react'
import axios from "axios"
import { data } from "../../data"


function GridPage() {
  const [values, setValues] = useState(data)
  const [roles, setRoles ] = useState([])


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

  const defaultColDef = useMemo( () => ({
    sortable: true,
    filter: true
  }), [])

  const columnDefs = [
   { headerName: "Account", field: "account", sortable: true },
   { headerName: "Sector", field: "sector", sortable: true},
   { headerName: "Engagement", field: "engagement", sortable: true },
   { headerName: "Start Date", field: "startdate", sortable: true },
   { headerName: "End Date", field: "enddate", sortable: true },
   { headerName: "Sale Channel", field: "channel", sortable: true},
   { headerName: "Owner", field: "owner", sortable: true },
   { headerName: "Originator", field: "originator", sortable: true },
   { headerName: "Role", field: "role", sortable: true },
   { headerName: "Location", field: "location", sortable: true },
   { headerName: "Revenue", field: "revenue", sortable: true },
   { headerName: "Sales Forecast", field: "forecast", sortable: true },
   { headerName: "Notes", field: "notes", sortable: true },
   { headerName: "Grade", field: "grade", sortable: true },
  ]
  return (
    <div className="ag-theme-alpine" style={{height: 600, width: '100%'}}>
      <AgGridReact 
      columnDefs={columnDefs}
      rowData={values}
      defaultColDef={defaultColDef}
      animateRows={true}
      />
    </div>
  )
}

export default GridPage
