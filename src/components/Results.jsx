import React, { useEffect, useState } from "react";
import ResultTable from "./ResultTable";

const Results = ({
  payload,
  isLoading,
  setIsLoading,
  isSubmit,
  setIsSubmit,
}) => {
  const [results, setResults] = useState([]);

  console.log(payload);

  async function fetchData() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/narrative/v1/csv/user_input/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log(data); // Log the response data to the console

      // Set the results to a variable
      const results = data; // Adjust this line based on how you want to structure your data

      return results;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Throw the error to handle it outside this function if needed
    }
  }

  useEffect(() => {
    console.log(payload);
    setIsLoading(true);
    if (Object.keys(payload).length > 0) {
      fetchData()
        .then((results) => {
          // Use the results variable here or pass it to another function
          console.log("Results:", results);
          setResults(results);
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle errors from the fetchData function
          console.error("Fetch error:", error);
        });
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <div>
      {isLoading ? "Loading Results..." : <ResultTable tableData={results} />}
    </div>
  );
};

export default Results;
