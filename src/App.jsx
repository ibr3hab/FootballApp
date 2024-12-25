import Header from "./components/Header/Header"
import SearchBar from "./components/HomePage/SearchBar"
import { Router , Routes , Route } from "react-router-dom";
import Favourites from "./components/Favourites/Favourites";
import Clubs from "./components/Clubs.jsx/CLubs";
import ClubDetails from "./components/Clubs.jsx/ClubsDetails";
import { FavProvider } from "./components/Favourites/Favourites";
import Players from "./components/Players/players";
import News from "./components/News/News";





function App() {
   

  return (
    <FavProvider>
    <> 
      <Header />
      <Routes>
        <Route path="/" element={<SearchBar/>} />
        <Route path="/favourites" element={<Favourites/>} />
        <Route path="/clubs" element={<Clubs/>}/>
        <Route path="/clubs/:id" element={<ClubDetails/>}/>
        <Route path="/players/:teamId" element={<Players />} />
        <Route path="/latestnews" element={<News/>}/>
      </Routes>
    </>
    </FavProvider>
  );
}
export default App