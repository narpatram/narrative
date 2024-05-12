import React, { useEffect, useState } from "react";
import upload from "../assets/images/upload.png";
import "./FileUpload.css";
import axios from "axios";

const FileUpload = ({ onUpload, isLoading, setIsLoading, setFileId, setColumns }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [showInstruction, setShowInstruction] = useState(true); // State to toggle instruction visibility
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    setIsLoading(true);
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
      setFilename(uploadedFile.name); // Update filename state
      setShowInstruction(false); // Hide instruction when a valid file is selected
      setErrorMessage(""); // Clear error message
      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/narrative/v1/csv/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        setColumns(response.data.columns)
        setFileId(response.data.csv_uuid)
        // Handle success (e.g., show a success message to the user)
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error (e.g., show an error message to the user)
      }
    } else {
      setErrorMessage("Invalid file type. Please choose a CSV file."); // Set error message
    }
    setIsLoading(false);
  };

  const handleUpload = () => {
    if (file) {
      // Pass the uploaded file to the parent component
      onUpload(file);
      setFile(null); // Clear the file state after upload
      setFilename(""); // Clear the filename state after upload
      setShowInstruction(true); // Show instruction again
    }
  };

  useEffect(() => {
    if (file) {
    }
  }, [file]);

  return (
    <div className="upload-container">
      <label htmlFor="file-upload">
        <img src={upload} alt="Upload Icon" />
        <input type="file" id="file-upload" onChange={handleFileChange} />
      </label>
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : showInstruction ? (
        <div className="instruction">Choose a CSV file of the given format</div>
      ) : (
        <div className="filename">{filename}</div>
      )}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  );
};

export default FileUpload;
