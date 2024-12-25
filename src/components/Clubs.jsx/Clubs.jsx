import React, { useState, useEffect } from "react";
import { sofascoreAPI } from "../../utils/api";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, CircularProgress , InputLabel, MenuItem , Select , FormControl , Link} from "@mui/material";
import "../HomePage/SearchBar.css";
import { useFav } from "../Favourites/Favourites";

const Clubs = () => {

  const {addToFavourites} = useFav();

  const leagueOptions = [
    {value:'42', label:'ChampionsLeague'},
    {value:'47', label:'Premierleague'},
    {value:'87', label:'Laliga'},
    {value:'55', label:'SeriaA'},
    {value:'54', label:'Bundesliga'},
  ]
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLeagueId , setSelectedLeagueId] = useState(leagueOptions[0].value)
  

  
  

  useEffect(() => {
    if (selectedLeagueId) {
      fetchTeams(selectedLeagueId);
    }
  }, [selectedLeagueId]); 
  

  const fetchTeams = async (leagueid) => {
    console.log("Fetching teams for league: ",leagueid)
    setLoading(true);
    setError(null);
    try{
      const data = await sofascoreAPI.getTeams(leagueid);
      console.log(data);
      if(data && data.response){
        setTeams(data.response.list)
        console.log("fetched Succesfully");
      }else{
        console.warn("No response from the api")
      }
    }catch(err){
      console.error("Error fetching infor from the API");
    }
    setLoading(false);
  };
 

  if (loading) {
    return (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
      }}
    >
      <CircularProgress />
    </div>
    )
  }

  return (
    <div style={{marginTop : "60px"}}>
      <h2>Teams</h2>
      
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      
      {!loading && !error && teams.length === 0 && (
        <p>No teams found.</p>
      )}
      <FormControl style={{width : "14%"}} >
      <InputLabel>Leagues</InputLabel>
      <Select value={selectedLeagueId} onChange={(e)=>setSelectedLeagueId(e.target.value)}>
       {leagueOptions.map((option)=>
       <MenuItem value={option.value} id={option.value}>
        {option.label}
        </MenuItem>
      )}
      </Select>
      </FormControl>
      
      <div className="footy-card">
          {teams.map((team) => (
            <div className="card" key={team.id}>
            <h2>{team.name || "No name available"}</h2>
            <img 
              src={team.logo || "placeholder.jpg"} 
              alt={team.name || "Team"} 
              loading="lazy" 
            />
              <IconButton 
                color="primary" 
                onClick={() => addToFavourites(team)}
                aria-label={`Add ${team.name} to favorites`}
              >
                <FavoriteIcon />
              </IconButton>
              <Link href={`/clubs/${team.id}`}>View Details</Link>
              <br/>
              <Link href={`/players/${team.id}`}>View Players List</Link>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Clubs;

