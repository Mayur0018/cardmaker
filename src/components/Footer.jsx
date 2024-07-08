import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  count,
  handleDecrement,
  handleIncrement,
  handleContinue,
  handleBack,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
      <div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          -
        </button>
        <span className="mx-2">{count}</span>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          +
        </button>
        {/* Move the Continue button to the right */}
        <button
          onClick={handleContinue}
          className="ml-20 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Prop validation using PropTypes
Footer.propTypes = {
  count: PropTypes.number.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default Footer;
