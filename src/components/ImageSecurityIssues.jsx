import React from 'react'
import '../styles/ImageSecurityIssues.css';

function ImageSecurityIssues() {
  const totalVulnerabilities = 2; // Total value of all vulnerabilities combined
  const vulnerabilityData = [
    { label: 'Critical', value: 2, color: '#C82819' }, // Dark red
    { label: 'High', value: 2, color: '#7A3631' },   // Dark brown
    { label: 'Medium', value: 1, color: '#DC6D38' }, // Dark orange
    { label: 'Low', value: 1, color: '#C2C4C8' },    // Gray
  ];

  return (
    <div className="image-risk-assessment">
      <h3 className="chart-title">Image Security Issues</h3>
      <div className="total-vulnerabilities">
        <span className="vulnerability-count">{totalVulnerabilities}</span>
        <span className="vulnerability-text">Total Images</span>
      </div>
      <div className="stacked-bar">
        {vulnerabilityData.map((vulnerability, index) => (
          <div
            key={index}
            className="stacked-bar-segment"
            style={{
              width: `${(vulnerability.value / totalVulnerabilities) * 100}%`,
              backgroundColor: vulnerability.color,
            }}
          ></div>
        ))}
      </div>
      <div className="labels">
        {vulnerabilityData.map((vulnerability, index) => (
          <div key={index} className="label-item">
            <span
              className="color-box"
              style={{ backgroundColor: vulnerability.color }}
            ></span>
            <span className="label-text">
              {vulnerability.label}: ({vulnerability.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSecurityIssues

