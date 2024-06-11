import React from "react";

const FigmaEmbed = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <iframe
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
        width="800"
        height="450"
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FXdEYUmRh93BbhZVuEf903H%2FUntitled%3Fm%3Ddev%26node-id%3D816%253A65"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default FigmaEmbed;
