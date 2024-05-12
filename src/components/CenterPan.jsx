import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import ColumnMapping from "./ColumnMapping";
import Results from "./Results";

const CenterPan = () => {
  const [step, setStep] = useState(1); // State to manage the current step
  const [isLoading, setIsLoading] = useState(false);
  const [csvFile, setCSVFile] = useState(null);
  const [fileId, setFileId] = useState("");
  const [columns, setColumns] = useState([]);
  const [colMerge, setColMerge] = useState([
    { selectedOptions1: [], newColumnName1: "" },
  ]);
  const [colRecurring, setColRecurring] = useState([
    { selectedOptions1: [], newColumnName1: "" },
  ]);

  const [isSubmit, setIsSubmit] = useState(false);
  const [payload, setPayload] = useState({});
  const handleCSVUpload = (file) => {
    setCSVFile(file); // Store the uploaded CSV file
  };

  const handleNextStep = () => {
    if (step === 2) {
      setIsSubmit(true);
    }
    setStep(step + 1); // Move to the next step
  };
  const handlePreviousStep = () => {
    setIsSubmit(false);
    setStep(step - 1); // Move to the previous step
  };

  useEffect(() => {
    if (isSubmit) {
      const columns_to_merge = {};

      colMerge.forEach((item) => {
        // Iterate over the properties of each item
        Object.entries(item).forEach(([key, value]) => {
          // Check if the property starts with 'selectedOptions'
          if (key.startsWith("selectedOptions")) {
            // Extract the number from the property name (e.g., 'selectedOptions1' -> '1')
            const num = key.replace("selectedOptions", "");

            // Get the corresponding new column name
            const newColumnName = item[`newColumnName${num}`];

            // Add the value to the transformed object
            if (!columns_to_merge[newColumnName]) {
              columns_to_merge[newColumnName] = [];
            }
            columns_to_merge[newColumnName].push(...value);
          }
        });
      });

      console.log(columns_to_merge);

      const recurring_columns = {};

      colRecurring.forEach((item) => {
        // Iterate over the properties of each item
        Object.entries(item).forEach(([key, value]) => {
          // Check if the property starts with 'selectedOptions'
          if (key.startsWith("selectedOptions")) {
            // Extract the number from the property name (e.g., 'selectedOptions1' -> '1')
            const num = key.replace("selectedOptions", "");

            // Get the corresponding new column name
            const newColumnName = item[`newColumnName${num}`];

            // Add the value to the transformed object
            if (!recurring_columns[newColumnName]) {
              recurring_columns[newColumnName] = [];
            }
            recurring_columns[newColumnName].push(...value);
          }
        });
      });

      setPayload({
        csv_uuid: fileId,
        csv_inputs: {
          recurring_columns: recurring_columns,
          columns_to_merge: columns_to_merge,
        },
      });
    }
  }, [isSubmit]);

  console.log(payload);

  return (
    <div className="center-container">
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? "active" : ""}`}>Upload CSV</div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>Map Columns</div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>Results</div>
      </div>

      {/* Content based on the current step */}
      {step === 1 && (
        <div>
          <h4>Step 1: Upload CSV File</h4>
          <FileUpload
            onUpload={handleCSVUpload}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setFileId={setFileId}
            setColumns={setColumns}
          />
          {/* Upload CSV form */}
        </div>
      )}
      {step === 2 && (
        <div>
          <h4>Step 2: Column Mapping</h4>
          <ColumnMapping
            fileId={fileId}
            columns={columns}
            colMerge={colMerge}
            setColMerge={setColMerge}
            colRecurring={colRecurring}
            setColRecurring={setColRecurring}
          />
        </div>
      )}
      {step === 3 && (
        <div>
          <h4>Step 3: Results</h4>
          <Results
            payload={payload}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
          />
        </div>
      )}

      <div className="button-container">
        {step > 1 && (
          <button onClick={handlePreviousStep} disabled={isLoading}>
            Previous
          </button>
        )}
        {step < 3 && (
          <button onClick={handleNextStep} disabled={isLoading}>
            {isLoading ? "Uploading" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CenterPan;
