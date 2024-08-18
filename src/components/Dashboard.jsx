import React, { useState, useEffect } from 'react';
import Widget from '../components/Widget.jsx';
import ImageRiskAssessment from '../components/ImageRiskAssessment.jsx';
import ImageSecurityIssues from './ImageSecurityIssues.jsx';
import AddWidgetModal from '../components/AddWidgetModal.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import '../styles/Dashboard.css';
import { FaPlus } from 'react-icons/fa';

const Dashboard = () => {
  const initialSelectedWidgets = {
    'CSPM Executive Dashboard': {
      'Cloud Accounts': true,
      'Cloud Account Risk Assessment': true,
    },
    'CWPP Dashboard': {
      'Top 5 Namespace Specific Alerts': true,
      'Workload Alerts': true,
    },
    'Registry Scan': {
      'Image Risk Assessment': true,
      'Image Security Issues': true,
    },
  };

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

  const [selectedWidgets, setSelectedWidgets] = useState(initialSelectedWidgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Sync selectedWidgets with the initial state when Dashboard is loaded
  useEffect(() => {
    syncCategoriesWithWidgets();
  }, [selectedWidgets]);

  const syncCategoriesWithWidgets = () => {
    const updatedCategories = categories.map((category) => {
      const widgetsInCategory = Object.entries(selectedWidgets[category.title])
        .filter(([widgetTitle, isSelected]) => isSelected)
        .map(([widgetTitle]) => category.availableWidgets.find((widget) => widget.title === widgetTitle));
      return { ...category, widgets: widgetsInCategory };
    });
    setCategories(updatedCategories);
  };

  const openAddWidgetModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const toggleWidget = (widgetTitle) => {
    setSelectedWidgets((prevSelectedWidgets) => ({
      ...prevSelectedWidgets,
      [selectedCategory.title]: {
        ...prevSelectedWidgets[selectedCategory.title],
        [widgetTitle]: !prevSelectedWidgets[selectedCategory.title][widgetTitle],
      },
    }));
  };

  const confirmWidgets = () => {
    syncCategoriesWithWidgets();
    setIsModalOpen(false);
  };

  const handleUpdateSelectedWidgets = (updatedWidgets) => {
    setSelectedWidgets(updatedWidgets);
  };

  return (
    <>
     <DashboardHeader
        initialSelectedWidgets={selectedWidgets}
        onUpdateSelectedWidgets={handleUpdateSelectedWidgets}
      />
    <div className="dashboard">
     
      {categories.map((category) => (
        <div key={category.id} className="dashboard-category">
          <h2>{category.title}</h2>
          <div className="widget-container">
            {category.widgets.map((widget) => (
              <div key={widget.id} className="widget-wrapper">
                {widget.title === 'Image Risk Assessment' ? (
                  <ImageRiskAssessment />
                ) : widget.title === 'Image Security Issues' ? (
                  <ImageSecurityIssues />
                ) : (
                  <Widget title={widget.title} type={widget.type} />
                )}
              </div>
            ))}
            <button
              className="addWidget"
              onClick={() => openAddWidgetModal(category)}
            >
              <div className="addWidgetDiv">
                <span><FaPlus /></span><b>Add Widget</b>
              </div>
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <AddWidgetModal
          widgets={selectedCategory.availableWidgets}
          selectedWidgets={selectedWidgets[selectedCategory.title]}
          toggleWidget={toggleWidget}
          confirmWidgets={confirmWidgets}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
    </>
    
  );
};

export default Dashboard;
