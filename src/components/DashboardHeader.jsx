import React, { useState, useEffect } from 'react';
import '../styles/DashboardHeader.css';
import { FaPlus } from 'react-icons/fa';
import { TfiReload } from 'react-icons/tfi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { FaClock } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import AddWidgetModal2 from '../components/AddWidgetModal2.jsx';

const DashboardHeader = ({ initialSelectedWidgets, onUpdateSelectedWidgets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track selected widgets for the modal, using initial widgets passed from the dashboard
  const [selectedWidgets, setSelectedWidgets] = useState(initialSelectedWidgets);

  useEffect(() => {
    setSelectedWidgets(initialSelectedWidgets); // Sync initial widgets with Dashboard
  }, [initialSelectedWidgets]);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open and close modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle save widgets, update both the header and dashboard widgets
  const handleSaveWidgets = (updatedWidgets) => {
    setSelectedWidgets(updatedWidgets);
    onUpdateSelectedWidgets(updatedWidgets); // Pass updated widgets to Dashboard
    closeModal(); // Close the modal after saving
  };

  return (
    <>
      <div className="breadcrumb">
        <span>
          Home &gt; <span className="current-page">Dashboard V2</span>
        </span>
        <div className="search-bar">
          <CiSearch className="icon-search" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">CNAPP Dashboard</h1>
          <div className="action-buttons">
            <button className="add-widget-btn" onClick={openModal}>
              Add Widget <FaPlus />
            </button>
            <button className="extra-options-btn">
              <TfiReload />
            </button>
            <button className="extra-options-btn">
              <HiOutlineDotsVertical />
            </button>
            <button className="date-range-btn">
              <FaClock className="icon-calendar" />
              <span className="line"> |</span>
              <b>Last 2 days</b>
              <MdKeyboardArrowDown className="icon-calendar" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddWidgetModal2
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveWidgets}
          selectedWidgets={selectedWidgets}
        />
      )}
    </>
  );
};

export default DashboardHeader;
