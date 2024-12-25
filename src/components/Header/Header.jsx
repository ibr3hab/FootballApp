import {AppBar , Toolbar} from "@mui/material"
import {Link} from "react-router-dom"
import React from "react";
import "./Header.css"   


const Header = ()=>{


    return(
        <div>
        <AppBar>
            <Toolbar className="toolbar">
                <div className="header">
                    <img src="/public/flogo.jpg" alt="logo" style={{ height: "50px", marginRight: "10px" }}/>
                    <h1 style={{ fontSize: "24px", margin: 0 }}>Fotmob</h1>
                </div>
                    <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/livescores">Livescores</Link>
                    <Link to="/fixtures">Fixtures</Link>
                    <Link to="/standings">Standings</Link>
                    <Link to="/clubs">Clubs</Link>
                    <Link to="/favourites">Favourites</Link>
                    <Link to="/latestnews">LatestNews</Link>
                    </nav>
            </Toolbar>
        </AppBar>


        <Toolbar/>
        </div>
    )
}

export default Header;
