import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import OpenRoles from "./pages/openRoles/OpenRoles"
import AddOpportunities from "./pages/form/AddOpportunities";
import RoleDetails from "./pages/details/RoleDetails";
import Header from "./components/header/Header";
import LoginPage from "./pages/login/LoginPage";
import EditRole from "./components/edit/EditRole";
// import GridPage from "./pages/grid/GridPage";


function App() {
  return (

      <Fragment>
       <Header></Header>
        <div className="main">
          <Routes>
          <Route exact path="/" element={ <OpenRoles />} />
          <Route path="/otherpage" element={< AddOpportunities />} />
          <Route path="/:id" element={ <RoleDetails /> } />
          <Route path="/:id?" element={ <EditRole /> } />
          {/* <Route path="/gridpage" element={<GridPage /> } /> */}
          <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Fragment>
    
  );
}

export default App;
