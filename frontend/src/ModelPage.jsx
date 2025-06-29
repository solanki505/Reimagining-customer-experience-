import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function ModelPage() {
  const { uid } = useParams();
  const location = useLocation();
  const name = location.state?.name || "3D Model";

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{name}</h1>
      <iframe
        title={name}
        src={`https://sketchfab.com/models/${uid}/embed?autostart=1&ui_infos=0&ui_watermark=0&ui_hint=0`}
        width="100%"
        height="600"
        allow="autoplay; fullscreen; vr"
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
      ></iframe>
    </div>
  );
}
