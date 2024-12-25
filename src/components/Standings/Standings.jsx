import React , {useEffect , useState} from "react";
import {CircularProgress , InputLabel, MenuItem , Select , FormControl } from "@mui/material";
import "../HomePage/SearchBar.css";
import { sofascoreAPI } from "../../utils/api";



const Standings = ()=>{

    const [selectedLeagueId , setSelectedId] = useState(leagueOptions[0].value);
    const [standings , setStandings] = useState([])
    const [loading , setLoading] = useState(false);

    const leagueOptions =[
        {value:'42', label:'ChampionsLeague'},
        {value:'47', label:'Premierleague'},
        {value:'87', label:'Laliga'},
        {value:'55', label:'SeriaA'},
        {value:'54', label:'Bundesliga'},
    ]
    
    const fetchStandings = async(leagueid)=>{
         setLoading(true);
      try{
            const data = await sofascoreAPI.getStandings(leagueid);
            if(data || data.response.standings){
             setStandings(data.response.standings)
            }else{
                console.error("Error Finding your data")
            }
            set
        }catch(err){
            console.error("Not able to fetch th data",err)
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
     fetchStandings(selectedLeagueId)
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
        <div>
        <h2 style={{mar}}></h2>   
        </div>
      )



}

export default Standings;