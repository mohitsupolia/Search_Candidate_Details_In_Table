import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8082;
// Enable CORS for all origins
app.use(cors());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define a route to fetch all data from the JSON file
app.get("/api/candidates", (req, res) => {
  const dataFilePath = path.join(__dirname, "data.json");

  // Read the JSON file
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Parse and send the JSON data
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON file:", parseError);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


