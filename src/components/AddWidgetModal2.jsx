import React, { useState, useEffect } from 'react';
import '../styles/AddWidgetModal2.css';

const AddWidgetModal2 = ({ isOpen, onClose, onSave, selectedWidgets }) => {
  // Define categories and their respective widgets
  const categories = {
    'CSPM Executive Dashboard': ['Cloud Accounts', 'Cloud Account Risk Assessment'],
    'CWPP Dashboard': ['Top 5 Namespace Specific Alerts', 'Workload Alerts'],
    'Registry Scan': ['Image Vulnerabilities', 'Compliance Issues'],
  };

  // Local state for managing the selected widgets within the modal
  const [localSelectedWidgets, setLocalSelectedWidgets] = useState({});

  // Sync with selectedWidgets prop when the modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalSelectedWidgets({ ...selectedWidgets });
    }
  }, [isOpen, selectedWidgets]);

  // Handle checkbox change
  const handleCheckboxChange = (category, widget) => {
    setLocalSelectedWidgets((prev) => {
      const categoryWidgets = prev[category] || {};

      return {
        ...prev,
        [category]: {
          ...categoryWidgets,
          [widget]: !categoryWidgets[widget],
        },
      };
    });
  };

  // Handle Save button click
  const handleSave = () => {
    onSave(localSelectedWidgets);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Widget</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          <h3>Personalize your dashboard by adding or removing the following widgets</h3>
          {Object.keys(categories).map((category) => (
            <div key={category} className="category-section">
              <h4>{category}</h4>
              {categories[category].map((widget) => (
                <div key={widget}>
                  <input
                    type="checkbox"
                    checked={localSelectedWidgets[category]?.[widget] || false}
                    onChange={() => handleCheckboxChange(category, widget)}
                  />
                  <label>{widget}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal2;
