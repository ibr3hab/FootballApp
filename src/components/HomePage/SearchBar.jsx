import React, { useState } from "react";
import { OutlinedInput, FormControl, Button } from "@mui/material";
import { sofascoreAPI } from "../../utils/api";
import FootBallCard from "./FootballCard";
import "./SearchBar.css"
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFav } from "../Favourites/Favourites";

const SearchBar = ()=>{
  const [query, setQuery] = useState('');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const {addToFavourites} = useFav();
  
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    
    try {
      const data = await sofascoreAPI.search(query);
      console.log("Fetched Data:", data); // Debugging
  
      if (data && data.response) {
        setOutput(data.response.suggestions); // Update state with valid data
        console.log("Output State:", data.response); // Debugging
      } else {
        console.warn("No response data available from API.");
      }
    } catch (err) {
      console.error("Error fetching the data:", err);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };
  
 





  const clearSearch = ()=>{
    setOutput([]);
  }

  return (
    <div>
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <OutlinedInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <br/>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </Button>
          <br/>
          <Button onClick={clearSearch}>
            Clear Search            
          </Button>
        </FormControl>
      </form>
      </div>

      {loading ? (
        <p>Loading results...</p>
      ) : output.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="footy-card">
          {output.map((out, index) => (
            <div className="card" key={out.id}>
             <FootBallCard footy={out}/>
             <IconButton color="primary" onClick={()=>{
              addToFavourites(out)}}>
             <FavoriteIcon/>
             </IconButton>
            </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
