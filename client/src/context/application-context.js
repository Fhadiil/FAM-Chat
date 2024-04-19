import React, { useState } from "react";
const ApplicationContext = React.createContext({
  applications: [],
  showForm: false,
  handleAdd: () => {},
  handleDelete: () => {},
  handleShowForm: () => {},
});

export const ApplicationContextProvider = (props) => {
  const [registeredApps, setRegisteredApps] = useState([]);
  const [showForm, setShowForm] = useState(true);

  // ------- ADD APPLICATION --------

  const addApplications = (application) => {
    const id = Math.random();
    const newApplication = { id, ...application };
    setRegisteredApps((prevApplications) => {
      return [...prevApplications, newApplication];
    });
  };

  // -------- DELETE APPLICATION ------
  const deleteBook = (id) => {
    setRegisteredApps(
      registeredApps.filter((application) => application.id !== id)
    );
  };

  //   ----- TOGGLE SHOW FORM -------
  const toggle = () => {
    setShowForm(!showForm);
  };
  return (
    <ApplicationContext.Provider
      value={{
        handleAdd: addApplications,
        applications: registeredApps,
        handleDelete: deleteBook,
        handleShowForm: toggle,
        showForm: showForm,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
