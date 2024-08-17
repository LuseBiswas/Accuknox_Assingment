import React from 'react';
import '../styles/AddWidgetModal.css';

const AddWidgetModal = ({
  widgets,
  selectedWidgets,
  toggleWidget,
  confirmWidgets,
  closeModal,
}) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Add New Widget</h3>
        
        <div className="widget-list">
          {widgets.map((widget, index) => (
            <div key={index} className="widget-option">
              <label>
                <input
                  type="checkbox"
                  checked={selectedWidgets[widget.title] || false}
                  onChange={() => toggleWidget(widget.title)}
                />
                <span className="widget-title">{widget.title}</span>
              </label>
            </div>
          ))}
        </div>
        
        <div className="modal-actions">
          <button className="confirm" onClick={confirmWidgets}>
            Confirm
          </button>
          <button className="cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
