import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import { sofascoreAPI } from "../../utils/api";
import { Link } from "react-router-dom";

const News = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState("42");
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [paginatedNews, setPaginatedNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const newsPerPage = 10;

  const leagueOptions = [
    { value: "42", label: "Champions League" },
    { value: "47", label: "Premier League" },
    { value: "87", label: "La Liga" },
    { value: "55", label: "Serie A" },
    { value: "54", label: "Bundesliga" },
  ];

  const fetchNews = async (leagueId) => {
    setError(null);
    setLoading(true);
    try {
      const data = await sofascoreAPI.getNews(leagueId);
      if (data?.status === "success" && Array.isArray(data.response?.news)) {
        setNews(data.response.news);
        console.log("News : ",news.length)
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (err) {
      setError("Error fetching news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page to 1 whenever the league changes
    fetchNews(selectedLeagueId);
  }, [selectedLeagueId]);

  useEffect(() => {
    const startIndex = (page - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    setPaginatedNews(news.slice(startIndex, endIndex));
  }, [page, news]); // Update paginated news when page or news changes

  const handlePaginationChange = (event, value) => {
    setPage(value); // Update the page when user clicks next/previous
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "60px" }}>
     
     <div style={{marginLeft : "42em"}}>
      <h2>News</h2>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && news.length === 0 && <p>No news found.</p>}

      <FormControl style={{ width: "24%"}}>
        <InputLabel>Leagues</InputLabel>
        <Select
          value={selectedLeagueId}
          onChange={(e) => setSelectedLeagueId(e.target.value)}
        >
          {leagueOptions.map((options) => (
            <MenuItem value={options.value} key={options.value}>
              {options.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Pagination Component */}
      {news.length > 0 && (
        <Stack
          spacing={2}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={Math.ceil(news.length / newsPerPage)}
            page={page}
            onChange={handlePaginationChange}
            color="primary"
          />
        </Stack>
      )}

       </div>

      <div className="footy-card">
        {paginatedNews.map((n) => (
          <div className="card" key={n.id}>
            <img
              src={n.imageUrl || "/default-image-path.jpg"}
              alt={n.title || "No title available"}
              style={{ width: "200px", height: "160px" }}
            />
            <p>{n.title || "No title available"}</p>
            <p>{n.sourceStr}</p>
            <p>
              <Link to={n.page?.url || "#"}>View details</Link>
            </p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default News;
