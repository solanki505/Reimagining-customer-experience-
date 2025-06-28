import React from "react";
import ThreeDViewer from "./ThreeDViewer";

const ThreeDPage = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#181818", padding: "2rem 0" }}>
      <h1 style={{ color: "#fff", textAlign: "center", marginBottom: 32 }}>3D Model Viewer</h1>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <ThreeDViewer height={700} />
      </div>
      <div style={{ height: 100 }} />
    </div>
  );
};

export default ThreeDPage;
