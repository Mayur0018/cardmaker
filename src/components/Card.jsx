  import PropTypes from 'prop-types';


  const Card = ({
    index,
    personalDetails,
    companyDetails,
    personalValues,
    companyValues,
    applyToAll,
    showInputs,
    handlePersonalInputChange,
    handleCompanyInputChange,
    handleApplyToAllChange,
    
  }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 relative text-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Card {index + 1}</h1>
        <div>
          {/* Render Personal Information */}
          {personalDetails.length > 0 && (
            <div className="mb-4">
              <label className="block mb-2 text-base font-medium text-gray-900">
                Personal Information
              </label>
              <div className="space-y-3">
                {personalDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-center mb-3">
                    <label className="w-1/3 text-gray-700">{detail.label}</label>
                    <input
                      type="text"
                      value={personalValues[index]?.[detail.label] || ''}
                      onChange={(e) =>
                        handlePersonalInputChange(
                          detail.label,
                          e.target.value,
                          index
                        )
                      }
                      className="w-2/3 p-2 border border-gray-300 rounded shadow-sm bg-gray-50 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render Company Information */}
          {companyDetails.length > 0 && (
            <div className="mb-4">
              <label className="block mb-2 text-base font-medium text-gray-900">
                Company Information
              </label>
              <div className="space-y-2">
                {applyToAll && showInputs ? (
                  // Show all company details with applyToAll checkbox checked
                  Object.keys(companyValues).map((label, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <label className="w-1/3 text-gray-700">{label}</label>
                      <input
                        type="text"
                        value={companyValues[label]}
                        onChange={(e) =>
                          handleCompanyInputChange(label, e.target.value)
                        }
                        readOnly={applyToAll}
                        className="w-2/3 p-2 border border-gray-300 rounded shadow-sm bg-gray-50 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))
                ) : (
                  // Show company details based on individual card details
                  companyDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <label className="w-1/3 text-gray-700">
                        {detail.label}
                      </label>
                      {showInputs ? (
                        <input
                          type="text"
                          value={companyValues[detail.label] || ''}
                          onChange={(e) =>
                            handleCompanyInputChange(detail.label, e.target.value)
                          }
                          readOnly={applyToAll}
                          className="w-2/3 p-2 border border-gray-300 rounded shadow-sm bg-gray-50 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-sm">
                          {companyValues[detail.label] ||
                            `Enter ${detail.label}`}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Apply to All Checkbox - Show only for Card Details 1 */}
          {index === 0 && (
            <div className="mb-4">
              <label className="block mb-2 text-base font-medium text-gray-900">
                Apply to All
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={applyToAll}
                  onChange={handleApplyToAllChange}
                  className="mr-2"
                />
                <span className="text-sm">
                  Apply This Information To All Cards
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  Card.propTypes = {
    index: PropTypes.number.isRequired,
    personalDetails: PropTypes.array.isRequired,
    companyDetails: PropTypes.array.isRequired,
    personalValues: PropTypes.array.isRequired,
    companyValues: PropTypes.object.isRequired, // Expect object type
    applyToAll: PropTypes.bool.isRequired,
    showInputs: PropTypes.bool.isRequired,
    handlePersonalInputChange: PropTypes.func.isRequired,
    handleCompanyInputChange: PropTypes.func.isRequired,
    handleApplyToAllChange: PropTypes.func.isRequired,
    handleCsvImport: PropTypes.func.isRequired,
  };

  export default Card;
