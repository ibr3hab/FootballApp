import React, { useEffect, useState } from "react";
import { OutlinedInput, FormControl, Button , Stack , Pagination } from "@mui/material"
import { sofascoreAPI } from "../../utils/api";
import FootBallCard from "./FootballCard";
import "./SearchBar.css"
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFav } from "../Favourites/Favourites";

const SearchBar = ()=>{
  const [query, setQuery] = useState('')
  const [output, setOutput] = useState([]);
  const [fullOutput , setFullOutput] = useState([]);
  const [page , setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {addToFavourites} = useFav();
  
  
  const outputPerPage = 20;
 

   const fetchSearch = async (query)=>{
    setLoading(true); // Set loading state
    
    try {
      const data = await sofascoreAPI.search(query);
      console.log("Fetched Data:", data); // Debugging
  
      if (data && data.response) {
     setFullOutput(data.response.suggestions); // Update state with valid data
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


  useEffect(()=>{
    setPage(1);
    fetchSearch('m')
  },[]);



  useEffect(()=>{
      const startIndex = (page -1) * outputPerPage
      const endIndex = startIndex + outputPerPage;
      
      setOutput(fullOutput.slice(startIndex, endIndex));
},[page , fullOutput]);
  
  
  const handleSubmit = (e)=>{
   e.preventDefault();
   fetchSearch(query);

  }

  const handleOutputPage = (event , value)=>{
    setPage(value);

  }



  const clearSearch = ()=>{
    setOutput([]);
    setQuery('')
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
  {fullOutput.length > 0 && (
        <Stack
          spacing={2}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={Math.ceil(fullOutput.length / outputPerPage)}
            page={page}
            onChange={handleOutputPage}
            color="primary"
          />
        </Stack>
      )}

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
