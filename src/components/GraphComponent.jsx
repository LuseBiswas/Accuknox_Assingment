import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/Graphs.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphComponent = ({ data, options, type }) => {
  return (
    <div className="graph-container">
      {type === 'doughnut' ? <Doughnut data={data} options={options} /> : <Pie data={data} options={options} />}
    </div>
  );
};

const CSPMExecutiveDashboard = () => {
  const cloudAccountsData = {
    labels: ['Connected', 'Not Connected'],
    datasets: [
      {
        data: [2, 2],
        backgroundColor: ['#4299E1', '#E0E0E0'],
      },
    ],
  };

  const cloudAccountsOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const cloudAccountRiskAssessmentData = {
    labels: ['Failed', 'Warning', 'Not available', 'Passed'],
    datasets: [
      {
        data: [1689, 681, 36, 7253],
        backgroundColor: ['#F44336', '#FFC107', '#E0E0E0', '#4CAF50'],
      },
    ],
  };

  const cloudAccountRiskAssessmentOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <>
    
    <div className="cspm-dashboard">
      
      <div className="widget">
      <h3>Cloud Account Risk Assessment</h3>
        
        
        <GraphComponent  data={cloudAccountsData} options={cloudAccountsOptions} type="doughnut" />
       
      </div>
      <div className="widget">
        <h3>Cloud Account Risk Assessment</h3>
        <GraphComponent  data={cloudAccountRiskAssessmentData} options={cloudAccountRiskAssessmentOptions} type="doughnut" />
      </div>
    </div>
    
    </>
    
  );
};

export default GraphComponent;
