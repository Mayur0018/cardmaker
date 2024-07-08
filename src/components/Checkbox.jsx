// Checkbox.js

import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Import Footer component
function Checkbox() {
  // State variables
  const [selectedDetails, setSelectedDetails] = useState(() => {
    const savedDetails = sessionStorage.getItem("selectedDetails");
    return savedDetails ? JSON.parse(savedDetails) : [];
  });
  const [isSelectedMap, setIsSelectedMap] = useState(() => {
    const savedMap = sessionStorage.getItem("isSelectedMap");
    return savedMap ? JSON.parse(savedMap) : {};
  });
  const navigate = useNavigate(); // Navigation function from React Router

  // List of details with labels
  const details = [
    { label: "Name", value: "" },
    { label: "Job title", value: "" },
    { label: "Work Mobile Number", value: "" },
    { label: "Work Email", value: "" },
    { label: "Company name", value: "" },
    { label: "Company website URL", value: "" },
    { label: "Company address", value: "" },
    { label: "Company phone number", value: "" }
  ];

  // Initialize state based on sessionStorage
  useEffect(() => {
    const savedDetails = sessionStorage.getItem("selectedDetails");
    const savedMap = sessionStorage.getItem("isSelectedMap");
    if (savedDetails) {
      setSelectedDetails(JSON.parse(savedDetails));
    }
    if (savedMap) {
      setIsSelectedMap(JSON.parse(savedMap));
    }
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  // Function to toggle a detail (add/remove from selectedDetails)
  const toggleDetail = (detail) => {
    const updatedIsSelectedMap = {
      ...isSelectedMap,
      [detail.label]: !isSelectedMap[detail.label]
    };

    // Update isSelectedMap immediately
    setIsSelectedMap(updatedIsSelectedMap);

    if (!isSelectedMap[detail.label]) {
      // Update selectedDetails
      setSelectedDetails((prev) => {
        const updatedDetails = [...prev, detail];
        // Update sessionStorage with the latest details immediately
        sessionStorage.setItem("selectedDetails", JSON.stringify(updatedDetails));
        return updatedDetails;
      });
    } else {
      // Update selectedDetails
      setSelectedDetails((prev) => {
        const updatedDetails = prev.filter((item) => item.label !== detail.label);
        // Update sessionStorage with the latest details immediately
        sessionStorage.setItem("selectedDetails", JSON.stringify(updatedDetails));
        return updatedDetails;
      });
    }

    // Update sessionStorage with the latest isSelectedMap immediately
    sessionStorage.setItem("isSelectedMap", JSON.stringify(updatedIsSelectedMap));
  };

  
  // Handle checkbox change event
  const handleCheckboxChange = (detail) => {
    toggleDetail(detail);
  };

  // Navigation function to move to CardDetails component
  const handleContinue = () => {
    navigate("/card-details", { state: { selectedDetails } });
  };

  // Function to navigate back
  const handleBack = () => {
    navigate(-1);
  };

  // Function to handle CSV export/import
  const openCsvPopup = () => {
    // Add your CSV export/import logic here
    console.log("CSV Export/Import functionality goes here");
  };

  // JSX rendering
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white mb-10">
              Details to be printed
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Select what contact details you want to be printed on each of your cards
            </p>
          </div>
        </div>

        {/* Checkbox list */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full">
          <div className="flex flex-wrap">
            {details.map((detail, index) => {
              const isSelected = isSelectedMap[detail.label];
              return (
                <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-2">
                  <label
                    className="flex items-center w-full p-4 border rounded-md mt-2 transition"
                    // Toggle on label click
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5"
                      checked={isSelected} // Controlled checkbox state
                      onChange={() => handleCheckboxChange(detail)} // Toggle on input change
                    />
                    <span className="ml-2 text-sm font-medium w-full truncate">
                      {detail.label}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer component with navigation controls */}
        <Footer
          // count={count}
          // handleDecrement={handleDecrement}
          // handleIncrement={handleIncrement}
          handleContinue={handleContinue}
          handleBack={handleBack}
          openCsvPopup={openCsvPopup}
        />
      </div>
    </div>
  );
}

export default Checkbox;
