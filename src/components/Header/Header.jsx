import React , {useState} from "react"
import { AppBar,Container , Toolbar , Menu , MenuItem , Box , IconButton , Button , Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { KeyboardArrowDown } from "@mui/icons-material";
import {Link} from "react-router-dom";


const Header = ()=>{


    const [anchorElNav , setAnchorElNav ] = useState(null);
    const [anchorElClubs , setAnchorElClubs] = useState(null);



    const pages = [ 'Livescores', 'Fixtures', 'Favourites'];

    const handleOpenNav = (e)=>{
          setAnchorElNav(e.currentTarget);
    }

    const handleCloseNav = ()=>{
        setAnchorElNav(null);
    }

    const handleOpenClubs = (e)=>{
        setAnchorElClubs(e.currentTarget);
    }

    const handleCloseClubs = ()=>{
        setAnchorElClubs(null)
            
        }

   


    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                <Box sx={{display:"flex" , alignItems : "center" }}>
                 <img src="/public/flogo.jpg" alt="logo" style={{ height: "50px", marginRight: "10px",width:"45px"}}/>
                <Typography variant="h6">
                FotMob
                </Typography> 
                </Box>
                

                <Box sx={{display : {xs : 'flex' , md : 'none'} , marginLeft : 'auto' }}>
                <IconButton
                 size="large"
                 color="inherit"
                 onClick={handleOpenNav}>
                    <MenuIcon/>
                 </IconButton>
                 <Menu
                 anchorEl={anchorElNav}
                 open={Boolean(anchorElNav)}
                 onClose={handleCloseNav}>
                 <MenuItem onClick={handleCloseNav}>
                 <Link to="/" style={{color : 'inherit', textDecoration : 'none'}}>
                 Home
                 </Link>
                 </MenuItem>
                 {pages.map((page)=>(
                    <MenuItem key={page} onClick={handleCloseNav}>
                        <Link to={`/${page.toLowerCase()}`} style={{color :'inherit', textDecoration : 'none'}}>
                        {page}
                        </Link>
                    </MenuItem>
                 ))}
                <MenuItem onClick={handleOpenClubs}>
                Clubs
                <KeyboardArrowDown/>
                </MenuItem>
                <Menu
                anchorEl={anchorElClubs}
                open={Boolean(anchorElClubs)}
                onClose={handleCloseClubs}>
                <MenuItem onClick={handleCloseClubs}>
                <Link to="/standings"  style={{color : 'inherit', textDecoration : 'none'}}>
                Standings
                </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseClubs}>
                <Link to="/clubs"  style={{color : 'inherit', textDecoration : 'none'}}>
                Teams
                </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseClubs}>
                <Link to="/latestnews" style={{color : 'inherit', textDecoration : 'none'}}>
                Latest News
                </Link>
                </MenuItem>
                </Menu>
                </Menu>
                </Box>
                <Box sx={{display : {xs : 'none' , md : 'flex'}, marginLeft: 'auto' }}>
                <MenuItem onClick={handleCloseNav}>
                 <Link to="/" style={{color : 'inherit', textDecoration : 'none'}}>
                 Home
                 </Link>
                 </MenuItem>
                {pages.map((page)=>(
                   <Button key={page} sx={{color : 'inherit' , textDecoration : 'none'}}>
                    <Link to={`/${page.toLowerCase()}`}style={{color :'inherit', textDecoration : 'none'}}>{page}</Link>
                   </Button>

                ))}
                <Button onClick={handleOpenClubs}
                sx={{color : 'white'}}
                endIcon ={<KeyboardArrowDown/>}
                >
                    Clubs
                </Button>
                <Menu
                anchorEl={anchorElClubs}
                open={Boolean(anchorElClubs)}
                onClose={handleCloseClubs}>
              <MenuItem onClick={handleCloseClubs}>
              <Link to="/standings" style={{color : "inherit" , textDecoration : "none" }}>
              Standings
              </Link>
             </MenuItem>
             <MenuItem onClick={handleCloseClubs}>
                <Link to="/clubs"  style={{color : 'inherit', textDecoration : 'none'}}>
                Teams
                </Link>
                </MenuItem>
             <MenuItem onClick={handleCloseClubs}>
              <Link to="/latestnews"style={{color : "inherit" , textDecoration : "none" }}>
              Latest News
              </Link>
             </MenuItem>
             </Menu>
               </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )



}
export default Header;