import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { sofascoreAPI } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../HomePage/SearchBar.css";

const Players = () => {
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { teamId } = useParams();

  useEffect(() => {
    console.log("Players", teamId);

    const fetchPlayers = async () => {
      setError(null);
      setLoading(true);
      try {
        const data = await sofascoreAPI.getPlayers(teamId);

        // Fetch images for each player's members
        const playersWithImages = await Promise.all(
          data.response.list.map(async (player) => {
            const membersWithImages = await Promise.all(
              player.members.map(async (member) => {
                try {
                  const imageResponse = await sofascoreAPI.getPlayersImage(member.id);
                  return { ...member, imageUrl: imageResponse.response.url };
                } catch (err) {
                  console.error("Error fetching the image", err);
                  return { ...member, imageUrl: "" }; // Fallback in case of an error
                }
              })
            );

            return { ...player, members: membersWithImages };
          })
        );

        setSelectedTeamPlayers(playersWithImages);
      } catch (err) {
        console.error("Error fetching the details", err);
        setError("Failed to fetch player data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [teamId]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "60px" }}>
      <h2 style={{ marginLeft: "28em" }}>Players at the club</h2>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {selectedTeamPlayers.length > 0 && (
        <div>
          <Link to="/clubs">
            <ArrowBackIcon style={{ marginLeft: "20em" }} />
          </Link>
          <div >
            {selectedTeamPlayers.map((player) => (
              <div key={player.id} style={{display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)"}} >
                <h3>Title: {player.title}</h3>
                {player.members.map((member) => (
                  <div key={member.id} className="card">
                    <img
                      src={member.imageUrl}
                      alt={`${member.name}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <p>Name: {member.name}</p>
                    <p>Country: {member.cname}</p>
                    <p>Jersey Number: {member.shirtNumber}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;
