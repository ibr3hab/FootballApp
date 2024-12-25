import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { sofascoreAPI } from "../../utils/api";
import { Link } from "react-router-dom";

const News = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState("42");
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreNews  , setHasmoreNews ] = useState(true);

  const leagueOptions = [
    { value: "42", label: "Champions League" },
    { value: "47", label: "Premier League" },
    { value: "87", label: "La Liga" },
    { value: "55", label: "Serie A" },
    { value: "54", label: "Bundesliga" },
  ];

  const fetchNews = async (leagueId, pageNum) => {
    setError(null)
    setLoading(false);
    try {
      const data = await sofascoreAPI.getNews(leagueId, pageNum);
      if (data && data.status === "success") {
        if (
          data.response &&
          typeof data.response === "object" &&
          Array.isArray(data.response.news)
        ) {
          const newsItems = data.response.news;
          if (newsItems.length > 0) {
            setNews((prevNews) => (pageNum === 1 ? newsItems : [...prevNews, ...newsItems]));
            setHasmoreNews(newsItems.length === 10); // Assuming 10 items per page
          } else {
            setHasmoreNews(false);
            if (pageNum === 1) {
              setNews([]);
            }
          }
        } else {
          console.error("Invalid data structure in response:", data.response);
          throw new Error("Unexpected API response structure");
        }
      } else {
        console.error("API call failed or status is not success:", data);
       
      }
      
    } catch (err) {
      setError("Error fetching API details");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
   }
  

  useEffect(() => {
    fetchNews(selectedLeagueId, page);
  }, [selectedLeagueId, page]);

  const handleMore = ()=>{
    setPage(prevValue => prevValue + 1);
  }

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
      <h2>News</h2>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && news.length === 0 && <p>No news found.</p>}

      <FormControl style={{ width: "14%" }}>
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

      <div className="footy-card">
        {news.map((n) => (
          <div className="footy" key={n.id}>
            <img src={n.imageUrl} alt={n.title} />
            <p>{n.title  || "No title available"}</p>
            <p>{n.sourceStr}</p>
            <p><Link to={n.page.url}>View details</Link></p>
          </div>
        ))}
        {!loading && hasMoreNews && <Button onClick={handleMore}>Load More</Button>}
      </div>
    </div>
  );
};

export default News;
