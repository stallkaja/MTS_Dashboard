
import React from 'react';
import './App.css';
import ScanToolPage from './pages/ScanToolPage.js'
import ToolHistoryPage from './pages/ToolHistoryPage.js'
import ToolRequestPage from './pages/ToolRequestPage.js'
import LandingPage from './pages/LandingPage.js'
import MaterialListPage from './pages/MaterialListPage.js'
import MapPage from './pages/MapPage.tsx'
import CreateMaterialPage from './pages/CreateMaterialPage.js'
import TicketDashboard from './pages/TicketDashboard.tsx'
import Navbar from './components/NavBar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {  
const [ItemToEdit, setItemToEdit] = useState();
return (
    <div className="App">
		<Router>
      		<Navbar />
      		<Routes>
        		<Route path='/' element={<LandingPage/>} />
				<Route path='/TicketDashboard' element={<TicketDashboard/>} />
        		<Route path='/MaterialListPage' exact element={<MaterialListPage setItemToEdit={setItemToEdit}/>}   />
        		<Route path='/Map' element={<MapPage/>} />
        		<Route path='/ScanTool' element={<ScanToolPage/>} setItemToEdit={setItemToEdit}/>
        		<Route path='/ToolHistory' element={<ToolHistoryPage/>} />
        		<Route path='/toolRequest' element={<ToolRequestPage/>} />
        		<Route path='/create' element={<CreateMaterialPage/>} />
      		</Routes>
    	</Router>

		
{/* 		<Router>
			<Route path='/' exact>
          		<LandingPage/>
        	</Route>
			<Route path='/tablePage'>
          		<MaterialListPage setExerciseToEdit={setExerciseToEdit}/>
        	</Route>

        	<Route path='/create'>
          		<CreateMaterialPage/>
        	</Route>

        	<Route path='/edit'>
          		<EditExercisePage exerciseToEdit={exerciseToEdit} />
        	</Route>
			<footer>
				<p> &copy; 2022 James Stallkamp.</p>
			</footer>
		</Router> */}
		
    </div>
  );
}

export default App;
