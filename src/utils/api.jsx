const BASE_URL = "https://free-api-live-football-data.p.rapidapi.com";
const API_KEY = "0537792f42msh33121733302c74ep11083ajsn69bb53f75b5f";

const headers = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': "free-api-live-football-data.p.rapidapi.com"
};



export const fetchAPIdetails = async (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  
     
    const options = {
      method: "GET",
      headers,
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const results = await response.json();
      console.log("API Response:", results); // Log raw API response
      return results;
    } catch (err) {
      console.error("Error fetching the details:", err);
      throw err;
    }
  };
  
export const sofascoreAPI = {
  search: (search) => 
    fetchAPIdetails("/football-players-search", {search}),
  
   getTeamDetails : (teamid) =>(
    fetchAPIdetails("/football-league-team", {teamid})
  ) ,
   getTeams: (leagueid )=>(
        fetchAPIdetails("/football-get-list-all-team",{leagueid : leagueid})    
  ) ,
   
  getPlayers: (teamid) =>(
        fetchAPIdetails("/football-get-list-player",{teamid})
  ) , 
  getPlayersImage: (playerid)=>(
       fetchAPIdetails("/football-get-player-logo",{playerid})
  ),

  getNews:(leagueid , page)=>(
      fetchAPIdetails("/football-get-league-news", {leagueid , page})
  ),

  getStandings:(leagueid)=>(
     fetchAPIdetails("/football-get-standing-all",{leagueid})
  ),

  getFixtures:(date)=>(
    fetchAPIdetails("/football-get-matches-by-date",{date})
  )
}


 