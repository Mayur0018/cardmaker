import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import Footer from './Footer';
import CsvModal from './CsvModal';

const CardDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [count, setCount] = useState(1);
  const [applyToAll, setApplyToAll] = useState(false);
  const [showInputs, setShowInputs] = useState(true);
  const [personalValues, setPersonalValues] = useState([{}]);
  const [companyValues, setCompanyValues] = useState({});
  const [showCsvModal, setShowCsvModal] = useState(false);

  const selectedDetails = location.state && location.state.selectedDetails;

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const storedPersonalValues = JSON.parse(sessionStorage.getItem('personalValues'));
    const storedCompanyValues = JSON.parse(sessionStorage.getItem('companyValues'));

    if (storedPersonalValues) {
      setPersonalValues(storedPersonalValues);
    }

    if (storedCompanyValues) {
      setCompanyValues(storedCompanyValues);
    }
  }, []);

  const storePersonalValuesToSessionStorage = (updatedPersonalValues) => {
    sessionStorage.setItem('personalValues', JSON.stringify(updatedPersonalValues));
  };

  const storeCompanyValuesToSessionStorage = (updatedCompanyValues) => {
    sessionStorage.setItem('companyValues', JSON.stringify(updatedCompanyValues));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    setPersonalValues([...personalValues, {}]);
    setShowInputs(true);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setPersonalValues(personalValues.slice(0, -1));
      setShowInputs(true);
    }
  };

  const handleContinue = () => {
    navigate('/next-page');
  };

  const handleApplyToAllChange = (event) => {
    setApplyToAll(event.target.checked);
    setShowInputs(!event.target.checked);
  };

  const handlePersonalInputChange = (label, value, idx) => {
    const updatedPersonalValues = [...personalValues];
    updatedPersonalValues[idx] = {
      ...updatedPersonalValues[idx],
      [label]: value,
    };
    setPersonalValues(updatedPersonalValues);
    storePersonalValuesToSessionStorage(updatedPersonalValues); // Store updated personalValues
  };

  const handleCompanyInputChange = (label, value) => {
    const updatedCompanyValues = { ...companyValues, [label]: value };
    setCompanyValues(updatedCompanyValues);
    storeCompanyValuesToSessionStorage(updatedCompanyValues); // Store updated companyValues
  };

  const personalDetails =
    selectedDetails?.filter((detail) =>
      ['Name', 'Job title', 'Work Mobile Number', 'Work Email'].includes(detail.label)
    ) || [];

  const companyDetails =
    selectedDetails?.filter((detail) =>
      ['Company name', 'Company website URL', 'Company address', 'Company phone number'].includes(detail.label)
    ) || [];

  const handleCsvButtonClick = () => {
    setShowCsvModal(true);
  };

  const handleCsvModalClose = () => {
    setShowCsvModal(false);
  };

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <div className="grid grid-cols-1 gap-1 w-full md:w-1/2 relative">
        {[...Array(count)].map((_, index) => (
          <Card
            key={index}
            index={index}
            personalDetails={personalDetails}
            companyDetails={companyDetails}
            personalValues={personalValues}
            companyValues={companyValues}
            applyToAll={applyToAll}
            showInputs={showInputs}
            handlePersonalInputChange={(label, value) => handlePersonalInputChange(label, value, index)}
            handleCompanyInputChange={handleCompanyInputChange}
            handleApplyToAllChange={handleApplyToAllChange}
          />
        ))}
        <button
          onClick={handleCsvButtonClick}
          className="absolute top-0 right-0 mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          CSV Import/Export
        </button>
      </div>

      <Footer
        count={count}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        handleContinue={handleContinue}
        handleBack={handleBack}
        showCsvButton={false}
      />

      {showCsvModal && (
        <CsvModal
          personalValues={personalValues}
          companyValues={companyValues}
          setPersonalValues={setPersonalValues}
          setCompanyValues={setCompanyValues}
          onClose={handleCsvModalClose}
        />
      )}
    </div>
  );
};

export default CardDetails;
