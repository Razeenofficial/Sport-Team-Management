import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Footer from './Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



import NavigationDrawer from './NavigationDrawer';

function AddPlayer() {
  const [sportsName, setSportsName] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [players, setPlayers] = useState([]);
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);

    const storedSports = JSON.parse(localStorage.getItem('sports')) || [];
    setSportsList(storedSports);
  }, []);

  const savePlayersToLocalStorage = (updatedPlayers) => {
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const handleAddPlayer = () => {
    if (name.trim() === '' || sportsName.trim() === '') {
      return; 
    }

    const newPlayer = {
      sportsName,
      name,
      age,
      phoneNumber,
      address,
      roles: selectedRoles,
    };

    const updatedPlayers = [newPlayer, ...players];

    setPlayers(updatedPlayers);
    savePlayersToLocalStorage(updatedPlayers);

    
    setSportsName('');
    setName('');
    setAge('');
    setPhoneNumber('');
    setAddress('');
    setSelectedRoles([]);
  };

  const handleDeletePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);

    setPlayers(updatedPlayers);
    savePlayersToLocalStorage(updatedPlayers);
  };

  const handleRoleChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  return (
    <div className='main'>

    <NavigationDrawer/>

    <br/><br/><br/>


      <h2>Add Player</h2>
      <div  className="parent-container">

      <form>
        <FormControl sx={{ m: 1, minWidth: 320 }} size="medium">
          <InputLabel id="sportsName-label">Select Sports Name:</InputLabel>
          <Select
            labelId="sportsName-label"
            id="sportsName"
            value={sportsName}
            onChange={(e) => setSportsName(e.target.value)}
          >
            {sportsList.map((sport) => (
              <MenuItem key={sport.sportsName} value={sport.sportsName}>
                {sport.sportsName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, minWidth: 320 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <TextField
            label="Age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <br />

          <TextField
            label="Phone Number"
            type="tel"
            InputLabelProps={{
              shrink: true,
            }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />

          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />

          







          <FormControl sx={{ m: 1, minWidth: 320 }} size="medium">
          <InputLabel id="roles-label">Select Roles:</InputLabel>
          <Select
          labelId="roles-label"
          id="roles"
          multiple
          value={selectedRoles}
          onChange={handleRoleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          >
            
          {sportsList
            .filter((sport) => sport.sportsName === sportsName)
            .map((sport) =>
              sport.roles.map((role) => (
                <MenuItem key={role} value={role}>
                  <FormControlLabel
                    control={<Checkbox checked={selectedRoles.includes(role)} />}
                    label={role}
                  />
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>



        <br/>
        <br/>

          <Button variant="contained" onClick={handleAddPlayer}>
            Add Player
          </Button>
        </Box>
      </form>
      </div>

      <br />
      <div className='break'></div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {players.map((player, index) => (
          <div
            key={index}
            style={{
              width: 'calc(30% - 20px)',
              margin: '10px',
              border: '1px solid #ccc',
              padding: '10px',
            }}
            className="card"
          >
            <h4>{player.name}</h4>
            <p>Sports Name: {player.sportsName}</p>
            <p>Age: {player.age}</p>
            <p>Phone Number: {player.phoneNumber}</p>
            <p>Address: {player.address}</p>
            <p>Roles: {player.roles && player.roles.length > 0 ? player.roles.join(', ') : 'No Roles'}</p>
           
           

          <IconButton aria-label="delete" size="large" onClick={() => handleDeletePlayer(index)} sx={{ color: 'red'}}>
          <DeleteIcon />
        </IconButton>

          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default AddPlayer;
