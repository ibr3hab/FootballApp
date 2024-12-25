import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { sofascoreAPI } from "../../utils/api";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const ClubDetails = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await sofascoreAPI.getTeamDetails(id);
        setSelectedTeam(details.response.details);
      } catch (err) {
        console.error("Error in fetchDetails:", err);
        setError(
          `An error occurred while fetching team details: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

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
    );
  }

  return (
    <div style={{ marginTop: "60px" }}>
      <h2 style={{ marginLeft: "28em" }}>Club Details</h2>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {selectedTeam && (
        <div>
          <Link to="/clubs">
            <ArrowBackIcon style={{ marginLeft: "20em" }}/>
          </Link>
          <div className="card" style={{ marginLeft: "36em" }}>
            <h3>{selectedTeam.name} Details</h3>
            <p>Country: {selectedTeam.country || "Unknown"}</p>
            <p>
              Stadium:{" "}
              {selectedTeam?.sportsTeamJSONLD?.location?.name || "Unknown"}
            </p>
            <a
              href={selectedTeam.sportsTeamJSONLD.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
            <p>
              {selectedTeam.faqJSONLD.mainEntity.map((answers) => (
                <div>
                  <p>Question : {answers.name}</p>
                  <p>Answer : {answers.acceptedAnswer.text}</p>
                </div>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDetails;
