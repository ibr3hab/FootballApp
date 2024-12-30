const BASE_URL = "https://free-api-live-football-data.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_API_KEY

const headers = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': "free-api-live-football-data.p.rapidapi.com"
};

 let apiCallCount = 0

  export const fetchAPIdetails = async (endpoint, params = {}) => {
      apiCallCount ++;
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
        console.log("API Response:", results);
        console.log(`The no of times api is getting called ${apiCallCount}`);
        return results;
      } catch (err) {
        console.error("Error fetching the details:", err);
        throw err;
      }
    };
  
export const sofascoreAPI = {
  search: (search) => 
    fetchAPIdetails("/football-all-search", {search}),
  
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
  ) , 

  getTeamsLogo:(teamid)=>(
     fetchAPIdetails("/football-team-logo",{teamid})
  )
}


 