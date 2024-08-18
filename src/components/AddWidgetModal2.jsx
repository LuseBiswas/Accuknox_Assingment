import React, { useState, useEffect } from 'react';
import '../styles/AddWidgetModal2.css';

const AddWidgetModal2 = ({ isOpen, onClose, onSave, selectedWidgets }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(selectedWidgets)[0]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    if (isOpen) {
      setActiveTab(Object.keys(selectedWidgets)[0]);
      setSearchTerm(''); // Reset search term when modal opens
    }
  }, [isOpen]);

  const handleCheckboxChange = (category, widgetTitle) => {
    onSave({
      ...selectedWidgets,
      [category]: {
        ...selectedWidgets[category],
        [widgetTitle]: !selectedWidgets[category][widgetTitle],
      },
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  const filterWidgets = (widgetTitle) => {
    return widgetTitle.toLowerCase().includes(searchTerm.toLowerCase()); // Filter widgets based on search term
  };

  const renderTabContent = (category) => {
    return (
      <div className="category-section">
        {Object.keys(selectedWidgets[category])
          .filter(filterWidgets) // Apply search filter
          .map((widgetTitle) => (
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Widget</h2>
          <input
            type="text"
            placeholder="e.g - Risk"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          
          <p>Personalize your dashboard by adding or removing the following widgets</p>
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
  );
};

export default AddWidgetModal2;
