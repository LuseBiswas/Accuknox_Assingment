import React, { useState } from 'react';
import '../styles/AddWidgetModal2.css';

const AddWidgetModal2 = ({ selectedWidgets, onSave, onClose }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(selectedWidgets)[0]);

  const handleCheckboxChange = (category, widgetTitle) => {
    onSave({
      ...selectedWidgets,
      [category]: {
        ...selectedWidgets[category],
        [widgetTitle]: !selectedWidgets[category][widgetTitle],
      },
    });
  };

  const renderTabContent = (category) => {
    return (
      <div className="category-section">
        {Object.keys(selectedWidgets[category]).map((widgetTitle) => (
          <div key={widgetTitle} className="widget-checkbox">
            <input
              type="checkbox"
              id={`${category}-${widgetTitle}`}
              checked={selectedWidgets[category][widgetTitle]}
              onChange={() => handleCheckboxChange(category, widgetTitle)}
            />
            <label htmlFor={`${category}-${widgetTitle}`}>{widgetTitle}</label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
    
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Widget</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>Personalise your dashboard by adding the following widget</p>
          <div className="tab-container">
            {Object.keys(selectedWidgets).map((category) => (
              <button
                key={category}
                className={`tab-button ${activeTab === category ? 'active' : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {renderTabContent(activeTab)}
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-btn" onClick={() => onSave(selectedWidgets)}>Confirm</button>
        </div>
      </div>
    </div>
    
    </>
    
  );
};

export default AddWidgetModal2;