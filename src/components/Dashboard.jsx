import React, { useState } from 'react';
import Widget from '../components/Widget.jsx';
import ImageRiskAssessment from '../components/ImageRiskAssessment.jsx';
import ImageSecurityIssues from './ImageSecurityIssues.jsx';
import AddWidgetModal from '../components/AddWidgetModal.jsx';

import '../styles/Dashboard.css';
import { FaPlus } from 'react-icons/fa';

const Dashboard = () => {
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



  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);



  const openAddWidgetModal = (category) => {
    setSelectedCategory(category);
    setSelectedWidgets(
      category.availableWidgets.reduce((acc, widget) => {
        acc[widget.title] = category.widgets.some((w) => w.title === widget.title);
        return acc;
      }, {})
    );
    setIsModalOpen(true);
  };

  const toggleWidget = (widgetTitle) => {
    setSelectedWidgets((prevSelectedWidgets) => ({
      ...prevSelectedWidgets,
      [widgetTitle]: !prevSelectedWidgets[widgetTitle],
    }));
  };

  const confirmWidgets = () => {
    const updatedCategories = categories.map((category) => {
      if (category.id === selectedCategory.id) {
        const newWidgets = category.availableWidgets.filter(
          (widget) => selectedWidgets[widget.title]
        );
        return { ...category, widgets: newWidgets };
      }
      return category;
    });
    setCategories(updatedCategories);
    setIsModalOpen(false);
  };

  return (
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
              <div className='addWidgetDiv'>
              <span><FaPlus /></span><b>Add Widget</b>
              </div>
              
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <AddWidgetModal
          widgets={selectedCategory.availableWidgets}
          selectedWidgets={selectedWidgets}
          toggleWidget={toggleWidget}
          confirmWidgets={confirmWidgets}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
