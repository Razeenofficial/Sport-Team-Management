import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Button.css';
import NavigationDrawer from './NavigationDrawer';
import Footer from './Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';





function CreateTeam() {
  const [selectedSport, setSelectedSport] = useState('');
  const [teamName, setTeamName] = useState('');
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [availableCoaches, setAvailableCoaches] = useState([]);
  const [sportsList, setSportsList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState('');
  const [selectedCaptain, setSelectedCaptain] = useState('');
  const [createdTeams, setCreatedTeams] = useState([]);

  useEffect(() => {
    
    const storedSports = JSON.parse(localStorage.getItem('sports')) || [];
    setSportsList(storedSports);

    
    const storedTeams = JSON.parse(localStorage.getItem('createdTeams')) || [];
    setCreatedTeams(storedTeams);
  }, []);

  useEffect(() => {
    
    if (selectedSport) {
      const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
      const storedCoaches = JSON.parse(localStorage.getItem('coaches')) || [];

      
      const filteredPlayers = storedPlayers.filter(
        (player) => player.sportsName === selectedSport
      );

      const filteredCoaches = storedCoaches.filter(
        (coach) => coach.sportsName === selectedSport
      );

      setAvailablePlayers(filteredPlayers);
      setAvailableCoaches(filteredCoaches);
    } else {
      
      setAvailablePlayers([]);
      setAvailableCoaches([]);
      setSelectedCaptain('');
    }
  }, [selectedSport]);

  const handleCreateTeam = () => {
    
    if (
      selectedSport &&
      teamName &&
      selectedPlayer.length > 0 &&
      selectedCoach &&
      selectedCaptain
    ) {
      const newTeam = {
        sport: selectedSport,
        teamName,
        players: selectedPlayer.join(', '),
        coach: selectedCoach,
        captain: selectedCaptain,
      };

      const updatedTeams = [newTeam, ...createdTeams];
      setCreatedTeams(updatedTeams);

      
      localStorage.setItem('createdTeams', JSON.stringify(updatedTeams));

      
      setSelectedSport('');
      setTeamName('');
      setSelectedPlayer([]);
      setSelectedCoach('');
      setSelectedCaptain('');
    }
  };

  const handleDeleteTeam = (index) => {
    
    const updatedTeams = [...createdTeams];
    updatedTeams.splice(index, 1);
    setCreatedTeams(updatedTeams);

    
    localStorage.setItem('createdTeams', JSON.stringify(updatedTeams));
  };

  return (
    <div className='main'>

    
    <NavigationDrawer/>
    <br/><br/><br/>
    
      <h2>Create Team</h2>
      <div  className="parent-container">

      <form>
        <FormControl sx={{ m: 1, minWidth: 320 }} size="medium">
          <InputLabel id="sports-label">Select Sport</InputLabel>
          <Select
            labelId="sports-label"
            id="sports"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
           
            {sportsList.map((sport) => (
              <MenuItem key={sport.sportsName} value={sport.sportsName}>
                {sport.sportsName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, minWidth: 320 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="teamName"
              label="Team Name"
              variant="outlined"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Box>
        </FormControl>
        <br />

        <FormControl sx={{ m: 1, width: 320 }} size="medium">
          <InputLabel id="players-label">Select Player</InputLabel>
          <Select
            labelId="players-label"
            id="players"
            value={selectedPlayer}
            multiple={true}
            onChange={(e) => setSelectedPlayer(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {availablePlayers.map((player) => (
              <MenuItem key={player.name} value={player.name}>
                {player.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />

        <FormControl sx={{ m: 1, minWidth: 320 }} size="medium">
          <InputLabel id="coaches-label">Select Coach</InputLabel>
          <Select
            labelId="coaches-label"
            id="coaches"
            value={selectedCoach}
            onChange={(e) => setSelectedCoach(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {availableCoaches.map((coach) => (
              <MenuItem key={coach.coachName} value={coach.coachName}>
                {coach.coachName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />

        <FormControl sx={{ m: 1, minWidth: 320 }} size="medium">
          <InputLabel id="captains-label">Select Captain</InputLabel>
          <Select
            labelId="captains-label"
            id="captains"
            value={selectedCaptain}
            onChange={(e) => setSelectedCaptain(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {selectedPlayer.map((player) => (
              <MenuItem key={player} value={player}>
                {player}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <Button variant="contained" onClick={handleCreateTeam}>
          Create Team
        </Button>
      </form>
      </div>
      <br/>
      <div className='break'></div>


      <h2>Created Teams</h2>
      <div  style={{ display: 'flex', flexWrap: 'wrap' }} >
        {createdTeams.map((team, index) => (
          <Card 
          key={index}
          style={{
            width: 'calc(30% - 20px)',
              margin: '10px',
              border: '1px solid #ccc',
              padding: '10px',
              
    backgroundColor: '#C69749',

          }}
          className ='card'

          
             >


            <CardContent  >
              <Typography variant="h5">{team.sport}</Typography>
              <Typography variant="subtitle1">Team Name: {team.teamName}</Typography>
              <Typography variant="subtitle1">Players: {team.players}</Typography>
              <Typography variant="subtitle1">Coach: {team.coach}</Typography>
              <Typography variant="subtitle1">Captain: {team.captain}</Typography>
              <div style={{ marginTop: '10px' }}>
                <Link
                  to={`/view-team/${index}`} 
                  className="view-team-button"
                >
                <Button variant="outlined" size="small" sx={{ color: 'black' , border:'black solid 2px'}}>
                View 
              </Button>
                 
                  
                </Link>
                <IconButton aria-label="delete" size="large"  onClick={() => handleDeleteTeam(index)} sx={{ color: 'red'}}>
                <DeleteIcon />
              </IconButton>

       
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default CreateTeam;
