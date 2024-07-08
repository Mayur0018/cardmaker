import { useState } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const CsvModal = ({ personalValues, companyValues, setPersonalValues, setCompanyValues, onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const importedData = results.data;

          const importedPersonalValues = importedData.map((row) => ({
            Name: row.Name || '',
            'Job title': row['Job title'] || '',
            'Work Mobile Number': row['Work Mobile Number'] || '',
            'Work Email': row['Work Email'] || '',
          }));

          const importedCompanyValues = {
            'Company name': importedData[0]['Company name'] || '',
            'Company website URL': importedData[0]['Company website URL'] || '',
            'Company address': importedData[0]['Company address'] || '',
            'Company phone number': importedData[0]['Company phone number'] || '',
          };

          setPersonalValues(importedPersonalValues);
          setCompanyValues(importedCompanyValues);
          onClose();
        },
      });
    }
  };

  const handleExport = () => {
    const exportData = personalValues.map((personalValue) => ({
      ...personalValue,
      'Company name': companyValues['Company name'],
      'Company website URL': companyValues['Company website URL'],
      'Company address': companyValues['Company address'],
      'Company phone number': companyValues['Company phone number'],
    }));

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'card_details.csv');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-3/4 max-w-lg">
        <h2 className="text-xl font-bold mb-4">CSV Import/Export</h2>
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
        <div className="flex justify-between">
          <button
            onClick={handleImport}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Import CSV
          </button>
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

CsvModal.propTypes = {
  personalValues: PropTypes.array.isRequired, // Adjust PropTypes as per your data structure
  companyValues: PropTypes.object.isRequired,
  setPersonalValues: PropTypes.func.isRequired,
  setCompanyValues: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CsvModal;
