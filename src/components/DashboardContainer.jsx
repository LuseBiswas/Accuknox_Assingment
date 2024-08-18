import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Dashboard from '../components/Dashboard.jsx';

const DashboardContainer = () => {
  // Shared state for managing widgets on the dashboard
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, title: 'Cloud Accounts', type: 'doughnut' },
        { id: 2, title: 'Cloud Account Risk Assessment', type: 'doughnut' },
      ],
      availableWidgets: [
        { id: 1, title: 'Cloud Accounts', type: 'doughnut' },
        { id: 2, title: 'Cloud Account Risk Assessment', type: 'doughnut' },
      ],
    },
    {
      id: 2,
      title: 'CWPP Dashboard',
      widgets: [
        { id: 3, title: 'Top 5 Namespace Specific Alerts', type: 'bar' },
        { id: 4, title: 'Workload Alerts', type: 'line' },
      ],
      availableWidgets: [
        { id: 3, title: 'Top 5 Namespace Specific Alerts', type: 'bar' },
        { id: 4, title: 'Workload Alerts', type: 'line' },
      ],
    },
    {
      id: 3,
      title: 'Registry Scan',
      widgets: [
        { id: 5, title: 'Image Risk Assessment', type: 'bar' },
        { id: 6, title: 'Image Security Issues', type: 'bar' },
      ],
      availableWidgets: [
        { id: 5, title: 'Image Risk Assessment', type: 'bar' },
        { id: 6, title: 'Image Security Issues', type: 'bar' },
      ],
    },
  ]);

  // Function to update widgets
  const handleUpdateWidgets = (updatedCategories) => {
    setCategories(updatedCategories);
  };

  return (
    <div>
      <DashboardHeader categories={categories} onUpdateWidgets={handleUpdateWidgets} />
      <Dashboard categories={categories} onUpdateWidgets={handleUpdateWidgets} />
    </div>
  );
};

export default DashboardContainer;
