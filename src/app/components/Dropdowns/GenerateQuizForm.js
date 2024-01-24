import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DropdownDifficulty from './DropdownDifficulty';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const GenerateQuizForm =( {onDifficultyChange, onLangChange, onNumQuestionsChange, onTitlechange}) => {
    const [language, setLanguage] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('A1');
  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);

    // Notify the parent component about the updated difficulty
    onDifficultyChange(newDifficulty);
  };
    //const [difficulty, setDifficulty] = useState('A1');
    // const handleDifficultyChange = (event) => {
    //     const newDifficulty = event.target.value;
    //     setDifficulty(newDifficulty);
    
    //     // Notify the parent component about the updated difficulty
    //     onDifficultyChange(newDifficulty);
    //   };
    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        onLangChange(newLanguage);
    };
    const handleNumberOfQuestionsChange = (event) => {
        const newNumberOfQuestions = event.target.value;
        setNumberOfQuestions(newNumberOfQuestions);
        onNumQuestionsChange(newNumberOfQuestions);
    };
    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        onTitlechange(newTitle);
    };



  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
    <FormControl fullWidth>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Language"
          multiline
          maxRows={4}
          value={language}
          onChange={handleLanguageChange}
        />
      </div>
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="Number of Questions"
          multiline
          maxRows={4}
          value={numberOfQuestions}
          onChange={handleNumberOfQuestionsChange}
        />
      </div>
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Title"
          multiline
          maxRows={4}
          value={title}
          onChange={handleTitleChange}
        />
      </div>
     
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
      
      </FormControl>
    </Box>
  );
}
export default GenerateQuizForm;