import React, { useState } from "react";
import './RoleFilter.css'


function GradeFilter({ grades, onFilterChange }) {
  const [selectedGrades, setSelectedGrades] = useState([]);

  const handleGradeChange = (event) => {
    const gradeName = event.target.value;
    setSelectedGrades((prevSelectedGrades) => {
      if (event.target.checked) {
        return [...prevSelectedGrades, gradeName]
      } else {
        return prevSelectedGrades.filter((grade) => grade !== gradeName)
      }
    } )
  
  };

 
  React.useEffect(() => {
    onFilterChange(selectedGrades);
  }, [selectedGrades, onFilterChange]);

  return (
    <div className="grade-filter-body">
    <h2>Filter by Grade</h2>
    {JSON.parse(grades).map((grade, index) => (
      <label className="filter-label" key={index}>
        <input
          type="checkbox"
          value={grade}
          checked={selectedGrades.includes(grade)}
          onChange={handleGradeChange}
        />
        {grade}
        <br />
      </label>
    ))}
  </div>
  );
}

export default GradeFilter;
