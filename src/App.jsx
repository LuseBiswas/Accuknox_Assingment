import React from 'react';
//import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
//import DashboardHeader from './components/DashboardHeader.jsx'
import { WidgetProvider } from './context/WidgetContext.jsx';

function App() {
  return (
    <WidgetProvider>
      <div className="App">
       
        <Dashboard />
      </div>
    </WidgetProvider>
  );
}

export default App;
