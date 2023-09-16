import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import NavigationDrawer from './NavigationDrawer';
import Footer from './Footer';

import './Button.css';

function AddSports() {
  const [sportsName, setSportsName] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [numberOfExtraPlayers, setNumberOfExtraPlayers] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [rolesList, setRolesList] = useState([]);
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => {
    const storedSports = JSON.parse(localStorage.getItem('sports')) || [];
    setSportsList(storedSports);
  }, []);

  const saveSportsToLocalStorage = (updatedSportsList) => {
    localStorage.setItem('sports', JSON.stringify(updatedSportsList));
  };

  const handleAddSports = () => {
    if (sportsName.trim() === '') {
      return;
    }

    const isSportsExists = sportsList.some((sports) => sports.sportsName === sportsName);

    if (isSportsExists) {
      alert('Sports with the same name already exist. Please choose a different name.');
      return;
    }

    
    const updatedRolesList = [...rolesList];
    if (roleInput.trim() !== '') {
      updatedRolesList.push(roleInput);
    }

    const newSports = {
      sportsName,
      numberOfPlayers,
      numberOfExtraPlayers,
      roles: updatedRolesList,
    };

    const updatedSportsList = [newSports, ...sportsList];

    setSportsList(updatedSportsList);
    saveSportsToLocalStorage(updatedSportsList);

    setSportsName('');
    setNumberOfPlayers('');
    setNumberOfExtraPlayers('');
    setRolesList([]);
    setRoleInput(''); 
  };

  const handleDeleteSports = (index) => {
    const updatedSportsList = [...sportsList];
    updatedSportsList.splice(index, 1);

    setSportsList(updatedSportsList);
    saveSportsToLocalStorage(updatedSportsList);
  };

  const handleAddRole = () => {
    if (roleInput.trim() === '') {
      return;
    }

    setRolesList([...rolesList, roleInput]);
    setRoleInput('');
  };

  const handleDeleteRole = (index) => {
    const updatedRolesList = [...rolesList];
    updatedRolesList.splice(index, 1);

    setRolesList(updatedRolesList);
  };

  return (
    <div className="main">
      <NavigationDrawer />
      <br />
      <br />
      <br />

      <h1>Add Sports</h1>
      <div className="parent-container">
        <form>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, minWidth: 320 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Sports Name"
              variant="outlined"
              value={sportsName}
              onChange={(e) => setSportsName(e.target.value)}
            />
            <br />
            <TextField
              id="outlined-number"
              label="Number of Players"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(e.target.value)}
            />
            <br />
            <TextField
              id="outlined-number"
              label="Number of Extra Players"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={numberOfExtraPlayers}
              onChange={(e) => setNumberOfExtraPlayers(e.target.value)}
            />
            <br />
            {rolesList.map((role, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label={`Role ${index + 1}`}
                  variant="outlined"
                  value={role}
                  disabled
                />
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDeleteRole(index)}
                  sx={{ color: 'red' }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <br />
            <TextField
              label="Type of Role"
              variant="outlined"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
            />
            <br/>
            <Button variant="outlined" size="small" onClick={handleAddRole}>
              Add Another Role
            </Button>
          </Box>
          <br />
          <Button variant="contained" onClick={handleAddSports}>
            Add Sports
          </Button>
        </form>
      </div>

      <br />
      <div className="break"></div>

      <div>
        <h3>Sports Cards</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {sportsList.map((sports, index) => (
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
              <h4>{sports.sportsName}</h4>
              <p>Number of Players: {sports.numberOfPlayers}</p>
              <p>Number of Extra Players: {sports.numberOfExtraPlayers}</p>
              <p>Roles: {sports.roles ? sports.roles.join(', ') : 'No roles'}</p>

              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => handleDeleteSports(index)}
                sx={{ color: 'red' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddSports;
