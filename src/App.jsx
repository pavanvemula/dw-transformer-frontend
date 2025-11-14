import React, { useState } from "react";

function App() {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [generatedDW, setGeneratedDW] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setGeneratedDW("");

    try {
      const response = await fetch(
        "https://https://dw-transformer-backend-v2.onrender.com/api/generate-dw",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: inputData, output: outputData }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      setGeneratedDW(data.dataweave);
    } catch (err) {
      setError("Failed to generate DataWeave code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>⚡ DataWeave 2.0 Code Generator</h1>
        <p style={styles.subtitle}>
          Provide Input & Expected Output. Supports JSON, XML, CSV.
        </p>

        <div style={styles.card}>
          <label style={styles.label}>Input (JSON / XML / CSV)</label>
          <textarea
            style={styles.textarea}
            rows="8"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Paste your input payload here..."
          ></textarea>

          <label style={styles.label}>Expected Output</label>
          <textarea
            style={styles.textarea}
            rows="8"
            value={outputData}
            onChange={(e) => setOutputData(e.target.value)}
            placeholder="Paste your expected output payload here..."
          ></textarea>

          <button
            style={styles.button}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate DataWeave Code"}
          </button>

          {error && <p style={styles.error}>{error}</p>}

          {generatedDW && (
            <div style={styles.resultCard}>
              <h3>Generated DataWeave Code:</h3>
              <pre style={styles.codeBox}>{generatedDW}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f2f4f8",
    minHeight: "100vh",
    padding: "40px 10px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },

  title: {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#222",
  },

  subtitle: {
    fontSize: "16px",
    marginBottom: "30px",
    color: "#555",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
  },

  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "8px",
    marginTop: "20px",
    textAlign: "left",
    color: "#333",
  },

  textarea: {
    width: "100%",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    fontFamily: "monospace",
    resize: "vertical",
    background: "#fafafa",
  },

  button: {
    marginTop: "25px",
    padding: "15px 25px",
    background: "#2b7bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },

  error: {
    marginTop: "15px",
    color: "red",
    fontWeight: "bold",
  },

  resultCard: {
    marginTop: "30px",
    background: "#f7f9fc",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },

  codeBox: {
    background: "#222",
    color: "#0f0",
    padding: "15px",
    borderRadius: "6px",
    fontSize: "14px",
    overflowX: "auto",
  },
};

export default App;
