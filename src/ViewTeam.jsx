import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NavigationDrawer from './NavigationDrawer';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './Button.css';


import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function ViewTeam() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('createdTeams')) || [];
    if (teamId >= 0 && teamId < storedTeams.length) {
      setTeam(storedTeams[teamId]);
    }
  }, [teamId]);

  const handleDeletePlayer = (index) => {
    if (team) {
      const updatedTeam = { ...team };
      const playerArray = updatedTeam.players.split(', ');
      playerArray.splice(index, 1);
      updatedTeam.players = playerArray.join(', ');

      const storedTeams = JSON.parse(localStorage.getItem('createdTeams')) || [];
      storedTeams[teamId] = updatedTeam;
      localStorage.setItem('createdTeams', JSON.stringify(storedTeams));

      setTeam(updatedTeam);
    }
  };

  return (
    <div className='main'>
      <NavigationDrawer />
      <br /><br /><br />
      <Link to="/create-team">
        <button className="goback">Go Back</button>
      </Link>
      <br />
      <h2 className='bold'>Team Details</h2>
      {team ? (
        <div className='main'>
          <Card style={{
            margin: '10px',
            padding: '10px',
            backgroundColor: '#AEC3AE',
            borderRadius: '1rem',
            border: '#212121 0.2rem solid',
            boxShadow: '0.2rem  0.4rem 0.2rem #00000040',
          }}>
            <CardContent>
              <Typography variant="h5">{team.sport}</Typography>
              <Typography variant="subtitle1">Team Name: {team.teamName}</Typography>
              <Typography variant="subtitle1">Coach: {team.coach}</Typography>
              <Typography variant="subtitle1">Captain: {team.captain}</Typography>
            </CardContent>
          </Card>

          <h3>Players</h3>
          <br /><br /><br />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {team.players.split(', ').map((playerName, index) => (
              <div
                key={index}
                style={{
                  width: 'calc(25% - 20px)',
                  margin: '10px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  minHeight: '70px',
                }}
                className="card"
              >
                <Typography variant="subtitle1">{playerName}</Typography>

                <IconButton aria-label="delete" size="large" onClick={() => handleDeletePlayer(index)} sx={{ color: 'red'}}>
                <DeleteIcon />
              </IconButton>

              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Team not found.</div>
      )}
     
      <br /><br />
      <Footer />
    </div>
  );
}

export default ViewTeam;
