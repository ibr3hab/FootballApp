import React , {useEffect , useState, useRef } from "react";
import {CircularProgress , InputLabel, MenuItem , Select , FormControl } from "@mui/material";
import { sofascoreAPI } from "../../utils/api";
import "./Standings.css";



const Standings = ()=>{
    
    const leagueOptions =[
        {value:'42', label:'ChampionsLeague'},
        {value:'47', label:'Premierleague'},
        {value:'87', label:'Laliga'},
        {value:'55', label:'SeriaA'},
        {value:'54', label:'Bundesliga'},
    ]




    const [selectedLeagueId , setSelectedId] = useState(leagueOptions[0].value);
    const [standings , setStandings] = useState([])
    const [loading , setLoading] = useState(false);
    const isStanding = useRef(false);


    
    const fetchStandings = async (leagueid) => {
         
      if(isStanding.current)return;
      isStanding.current = true;




        setLoading(true);
        try {
            const data = await sofascoreAPI.getStandings(leagueid);

           const teamsWithLogo = await Promise.all(
            data.response.standing.map(async(player)=>{
            try{
              const logoResponse = await sofascoreAPI.getTeamsLogo(player.id)
              return {...player , imageUrl : logoResponse.response.url}
            }catch(err){
              console.error("Error fetching the data",err);
              return{...player , imageUrl : null }
            }
            }       
           )
          )
          setStandings(teamsWithLogo);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
            isStanding.current = false;
        }
    };
      
      

    useEffect(()=>{
     fetchStandings(selectedLeagueId)
     return ()=>{
      isStanding.current = false;
     };
    },[selectedLeagueId])

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

      return(
        <div style={{marginTop : "60px"}}>
        <h2>Club standings</h2>
        {loading && data.response.standings.length === 0 && <p> No results found</p>}
        <FormControl style={{width : "14%"}} >
            <InputLabel>Leagues</InputLabel>
            <Select value={selectedLeagueId} onChange={(e)=>setSelectedId(e.target.value)}>
                {leagueOptions.map((option)=>(
                    <MenuItem value={option.value} key={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            </FormControl> 
            <div>
            <ol>
            <div>
  <h3>Club Standings</h3>
  <table style={{ width: '60%', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ textAlign: 'left', fontWeight: 'bold' }}>
        <th>S.No</th>
        <th>Club</th>
        <th>MP</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>GF</th>
        <th>GA</th>
        <th>Pts</th>
      </tr>
    </thead>
    <tbody>
      {standings.map((stand , index) => (
        <tr key={stand.id}>
          <td>{index + 1}</td>
          <td> <img src={stand.imageUrl} alt={stand.name}/>
                             {stand.name}</td>
          <td>{stand.played}</td>
          <td>{stand.wins}</td>
          <td>{stand.draws}</td>
          <td>{stand.losses}</td>
          <td>{stand.scoresStr.split("-")[0]}</td>
          <td>{stand.scoresStr.split("-")[1]}</td>
          <td>{stand.pts}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
            </ol>           
            </div>  
        </div>
      )



}

export default Standings;