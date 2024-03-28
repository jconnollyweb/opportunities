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
    });
  };

  React.useEffect(() => {
    onFilterChange(selectedGrades);
  }, [selectedGrades, onFilterChange]);

  // Function to parse JSON string grades to array
  const parseGrades = (gradeString) => {
    try {
      return JSON.parse(gradeString.replace(/"/g, '"').replace(/{/g, '[').replace(/}/g, ']'));
    } catch (error) {
      console.error("Error parsing grades:", error);
      return [];
    }
  };

  return (
    <div className="grade-filter-body">
      <h2>Filter by Grade</h2>
      {parseGrades(grades).map((grade) => ( // Use parseGrades to convert grades to array
        <label className="filter-label" key={grade}>
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



// import React, { useState } from "react";
// import './RoleFilter.css'


// function GradeFilter({ grades, onFilterChange }) {
//   const [selectedGrades, setSelectedGrades] = useState([]);

//   const handleGradeChange = (event) => {
//     const gradeName = event.target.value;
//     setSelectedGrades((prevSelectedGrades) => {
//       if (event.target.checked) {
//         return [...prevSelectedGrades, gradeName]
//       } else {
//         return prevSelectedGrades.filter((grade) => grade !== gradeName)
//       }
//     } )
  
//   };

 
//   React.useEffect(() => {
//     onFilterChange(selectedGrades);
//   }, [selectedGrades, onFilterChange]);

//   const parseGrades = (gradeString) => {
//     try {
//       return JSON.parse(gradeString.replace(/"/g, '"').replace(/{/g, '[').replace(/}/g, ']'));
//     } catch (error) {
//       console.error("Error parsing grades:", error);
//       return [];
//     }
//   };


//   return (
//     <div className="grade-filter-body">
//       <h2>Filter by Grade</h2>
//       {parseGrades(grades).map((grade) => (
//         <label className="filter-label" key={grade}>
//           <input
//             type="checkbox"
//             value={grade}
//             checked={selectedGrades.includes(grade)}
//             onChange={handleGradeChange}
//           />
//           {grade}
//           <br />
//         </label>
//       ))}
    
//     </div>
//   );
// }

// export default GradeFilter;
