import React from 'react';
import '../styles/AddWidgetModal2.css';

const AddWidgetModal2 = ({ selectedWidgets, onSave, onClose }) => {
  const handleCheckboxChange = (category, widgetTitle) => {
    onSave({
      ...selectedWidgets,
      [category]: {
        ...selectedWidgets[category],
        [widgetTitle]: !selectedWidgets[category][widgetTitle],
      },
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Widget</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          <h3>Personalize your dashboard by adding or removing the following widgets</h3>
          {Object.keys(selectedWidgets).map((category) => (
            <div key={category} className="category-section">
              <h4>{category}</h4>
              {Object.keys(selectedWidgets[category]).map((widgetTitle) => (
                <div key={widgetTitle} className="widget-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedWidgets[category][widgetTitle]}
                    onChange={() => handleCheckboxChange(category, widgetTitle)}
                  />
                  <label>{widgetTitle}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={() => onSave(selectedWidgets)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal2;
