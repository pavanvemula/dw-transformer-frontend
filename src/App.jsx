import React, { useState } from "react";

export default function App() {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [dwCode, setDwCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateDW = async () => {
    setLoading(true);
    setError("");
    setDwCode("");

    try {
      const response = await fetch(`https://https://dw-transformer-backend-v2.onrender.com/api/generate-dw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputData, output: outputData })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Unknown error from backend");
      }

      const data = await response.json();
      setDwCode(data.dw);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>DataWeave 2.0 Code Generator</h1>

      <textarea
        placeholder="Input JSON/XML/CSV"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />

      <textarea
        placeholder="Expected Output JSON/XML/CSV"
        value={outputData}
        onChange={(e) => setOutputData(e.target.value)}
      />

      <button onClick={generateDW} disabled={loading}>
        {loading ? "Generating..." : "Generate DataWeave Code"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {dwCode && (
        <>
          <h2>Generated DataWeave Code</h2>
          <pre>{dwCode}</pre>
        </>
      )}
    </div>
  );
}
