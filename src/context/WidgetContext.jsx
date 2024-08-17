// src/context/WidgetContext.jsx

import React, { createContext, useContext, useState } from 'react';

const WidgetContext = createContext();

export const useWidgets = () => useContext(WidgetContext);

export const WidgetProvider = ({ children }) => {
  const [widgets, setWidgets] = useState([]);

  const addWidget = (category, widget) => {
    setWidgets((prevWidgets) => [...prevWidgets, { category, widget }]);
  };

  const removeWidget = (widgetToRemove) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter(({ widget }) => widget !== widgetToRemove)
    );
  };

  return (
    <WidgetContext.Provider value={{ widgets, addWidget, removeWidget }}>
      {children}
    </WidgetContext.Provider>
  );
};
