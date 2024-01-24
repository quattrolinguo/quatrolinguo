import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const DropdownDifficulty =({onDifficultyChange}) => {
  const [difficulty, setDifficulty] = useState('A1');
  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);

    // Notify the parent component about the updated difficulty
    onDifficultyChange(newDifficulty);
  };

  return (
    // <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" label="Difficulty">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={difficulty}
          label="Difficulty"
          onChange={handleDifficultyChange}
        >
          <MenuItem value={"A1"}>A1</MenuItem>
          <MenuItem value={"A2"}>A2</MenuItem>
          <MenuItem value={"B1"}>B1</MenuItem>
          <MenuItem value={"B2"}>B2</MenuItem>
          <MenuItem value={"C1"}>C1</MenuItem>
          <MenuItem value={"C2"}>C2</MenuItem>
        </Select>
      </FormControl>
    // </Box>
  );
}

export default DropdownDifficulty;