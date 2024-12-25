import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import { Card, Typography } from "@material-tailwind/react";

const Home = () => {
  // State for storing candidate data and search query
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetch("http://localhost:8082/api/candidates") // Removed "no-cors"
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCandidates(data);
        setFilteredCandidates(data); // Initialize filtered list
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search query
  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCandidates(filtered);
  };

  const TABLE_HEAD = ["Name", "Skills", "Years of Experience"];

  return (
    <div className="p-4">
      {/* Searchbar Component */}
      <Searchbar onSearch={handleSearch} />

      {/* Table Component */}
      <Card className="h-full w-full overflow-scroll mt-12">
        <table className="w-full min-w-max table-auto text-left text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(
              ({ name, skills, yearsOfExperience }, index) => {
                const isLast = index === filteredCandidates.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {skills.join(", ")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {yearsOfExperience}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Home;



