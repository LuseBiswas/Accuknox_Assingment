import React, { useState } from 'react';
import GraphComponent from '../components/GraphComponent.jsx';
import logo from '../assets/diagram.png';
import '../styles/Widget.css';

const Widget = ({ title, type }) => {
  // Define data and options based on the title
  let data, options;

  if (title === 'Cloud Accounts') {
    // Cloud Accounts Graph Data
    const cloudAccountData = [2, 2];
    data = {
      labels: cloudAccountData.map((value, index) =>
        index === 0 ? `Connected (${value})` : `Not Connected (${value})`
      ),
      datasets: [
        {
          label: 'Cloud Accounts',
          data: cloudAccountData,
          backgroundColor: ['#4C6EF5', '#ADB5BD'],
          hoverBackgroundColor: ['#3B5BDB', '#868E96'],
        },
      ],
    };
    options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    };
  } else if (title === 'Cloud Account Risk Assessment') {
    // Cloud Account Risk Assessment Graph Data
    const riskAssessmentData = [1689, 681, 36, 7253];
    const riskAssessmentLabels = ['Failed', 'Warning', 'Not Available', 'Passed'];
    
    data = {
      labels: riskAssessmentLabels.map((label, index) => `${label} (${riskAssessmentData[index]})`),
      datasets: [
        {
          label: 'Cloud Account Risk Assessment',
          data: riskAssessmentData,
          backgroundColor: ['#F03E3E', '#FAB005', '#CED4DA', '#37B24D'],
          hoverBackgroundColor: ['#C92A2A', '#E67700', '#ADB5BD', '#2B8A3E'],
        },
      ],
    };
    options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    };
  }

  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="widget">
      <h3>{title}</h3>
      {data && options ? (
        <GraphComponent data={data} options={options} type={type} />
      ) : (
        <div onClick={handleShowPopup}>
          <img src={logo} alt="No Graph data available" />
          <p>No Graph data available!</p>
        </div>
      )}
    </div>
  );
};

export default Widget;
