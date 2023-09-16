import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NavigationDrawer from './NavigationDrawer';
import Footer from './Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



function AddCoach() {
  const [sportsName, setSportsName] = useState('');
  const [coachName, setCoachName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [coaches, setCoaches] = useState([]);
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => {
    const storedCoaches = JSON.parse(localStorage.getItem('coaches')) || [];
    setCoaches(storedCoaches);

    const storedSports = JSON.parse(localStorage.getItem('sports')) || [];
    setSportsList(storedSports);
  }, []);

  const saveCoachesToLocalStorage = (updatedCoaches) => {
    localStorage.setItem('coaches', JSON.stringify(updatedCoaches));
  };

  const handleAddCoach = () => {
    if (coachName.trim() === '' || sportsName.trim() === '') {
      return; 
    }

    const newCoach = {
      sportsName,
      coachName,
      age,
      phone,
      email,
      address,
      experience,
    };

    const updatedCoaches = [newCoach, ...coaches];

    setCoaches(updatedCoaches);
    saveCoachesToLocalStorage(updatedCoaches);

    
    setSportsName('');
    setCoachName('');
    setAge('');
    setPhone('');
    setEmail('');
    setAddress('');
    setExperience('');
  };

  const handleDeleteCoach = (index) => {
    const updatedCoaches = [...coaches];
    updatedCoaches.splice(index, 1);

    setCoaches(updatedCoaches);
    saveCoachesToLocalStorage(updatedCoaches);
  };

  return (
    <div className='main'>


    <NavigationDrawer/>

    <br/><br/><br/>


      <h2>Add Coach</h2>
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
        <br/>

        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, minWidth: 320 },
        }}
        noValidate
        autoComplete="off"
      >



       
       
        
 
        <TextField
          
        label="Coach Name"
        variant="outlined"
        value={coachName}
        onChange={(e) => setCoachName(e.target.value)}
      />
<br/>




        <TextField
        label="age"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}

        value={age}
          onChange={(e) => setAge(e.target.value)}
      />
<br/>




       


        <TextField
        label="Phone"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
<br/>


        
        


        <TextField
          
        label="Email"
        variant="outlined"
        type="email"
          
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
<br/>
        


        <TextField
          
        label="Address"
        variant="outlined"
        value={address}
          onChange={(e) => setAddress(e.target.value)}
      />
<br/>
        

        <TextField
        label="Years of Experience"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}

        value={experience}
          onChange={(e) => setExperience(e.target.value)}
      />
<br/>
        </Box>
        <Button variant="contained" onClick={handleAddCoach}>Add Coach</Button>

      </form>
      </div>

<br/>
<div className='break'></div>

<br/>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} >
        {coaches.map((coach, index) => (
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
            <h4>{coach.coachName}</h4>
            <p>Sports Name: {coach.sportsName}</p>
            <p>Age: {coach.age}</p>
            <p>Phone Number: {coach.phone}</p>
            <p>Email: {coach.email}</p>
            <p>Address: {coach.address}</p>
            <p>Experience: {coach.experience}</p>

            <IconButton aria-label="delete" size="large" onClick={() => handleDeleteCoach(index)} sx={{ color: 'red'}}>
            <DeleteIcon />
          </IconButton>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default AddCoach;
