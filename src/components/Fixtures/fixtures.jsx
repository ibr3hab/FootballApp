import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { sofascoreAPI } from "../../utils/api";
import "../HomePage/SearchBar.css";
import dayjs from "dayjs";

const Fixtures = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs("20241218"));
  const [loading, setLoading] = useState(false);
  const [fixtures, setFixtures] = useState([]);

  const fetchfixtures = async (date) => {
    setLoading(true);
    try {
      const data = await sofascoreAPI.getFixtures(date.format("YYYYMMDD"));
      if (data.response && data.response.matches) {
        setFixtures(data.response.matches);
      } else {
        console.error("No matches found for the selected date.");
        setFixtures([]); // Reset fixtures if no data is found.
      }
    } catch (err) {
      console.error("Error getting the API response:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchfixtures(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate ? dayjs(newDate) : dayjs());
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' , marginTop: "60px" }}>
      {/* Left side: Calendar */}
      <div style={{ flex: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={selectedDate} onChange={handleDateChange} />
          {selectedDate && <p>Date: {selectedDate.format("YYYY-MM-DD")}</p>}
        </LocalizationProvider>
      </div>

      {/* Right side: Fixtures Table */}
      <div style={{ flex: 2, paddingLeft: '20px' }}>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontWeight: 'bold' }}>
                <th>Time</th>
                <th>Match</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {fixtures.length > 0 ? (
                fixtures.map((fix) => (
                  <tr key={fix.id}>
                    <td>{fix?.time || "N/A"}</td>
                    <td>{fix?.home?.name || "N/A"} vs {fix?.away?.name || "N/A"}</td>
                    <td>{fix?.status?.scoreStr || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No fixtures available for the selected date.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Fixtures;