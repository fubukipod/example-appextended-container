import React, { useEffect, useState } from "react";

export default function ExampleComponent() {
  const [systemInfo, setSystemInfo] = useState({
    os: "Loading...",
    nodeVersion: "Loading...",
    npmVersion: "Loading..."
  });

  useEffect(() => {
     fetch("/api/system-info")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setSystemInfo({
          os: data.os,
          nodeVersion: data.nodeVersion,
          npmVersion: data.npmVersion
        });
      })
      .catch(error => {
        console.error("Error fetching system information:", error);
        setSystemInfo({
          os: "Error fetching data",
          nodeVersion: "Error fetching data",
          npmVersion: "Error fetching data"
        });
      });
  }, []);

  return (
    <div>
      <h1>Welcome to My Project</h1>
      <h2>System Information:</h2>
      <ul>
        <li><strong>OS Version:</strong> {systemInfo.os}</li>
        <li><strong>Node.js Version:</strong> {systemInfo.nodeVersion}</li>
        <li><strong>npm Version:</strong> {systemInfo.npmVersion}</li>
      </ul>
    </div>
  );
}
