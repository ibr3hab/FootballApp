import "../HomePage/SearchBar.css"
import React ,  {createContext , useContext , useState} from "react";

const FavContext = createContext();

export const FavProvider = ({children})=>{

  const [fav, setFav] = useState([]);
  
  const addToFavourites = (football) => {
    setFav(prevValue=>[...prevValue , football])
  };

  return(
    <FavContext.Provider value={{addToFavourites , fav , setFav}}>
      {children}
    </FavContext.Provider>
  )
}

  export const useFav = ()=>{
    return useContext(FavContext)
  } 



const Favourites = () => {

  const {fav} = useFav();

  return (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{marginLeft : "28em"}}>Favourites</h2>
      <div className="footy-card">
        {fav.length > 0 ? (
          fav.map((footy) => (
            <div key={footy.id} className="card">
              <h2>{footy.name || footy.leagueName ||"No Name is available"}</h2>
              <p>{footy.teamName || <img src={footy.logo} alt={footy.name}/> || "No team available"}</p>
              
              <p>Type: {footy.type || "No type available"}</p>
              <p>Score: {footy.score || "No Score available"}</p>
            </div>
          ))
        ) : (
          <p>No Favourites found</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
