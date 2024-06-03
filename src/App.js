import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import NotesList from './components/NotesList';
import './App.css';

const App = () => {

  const initialState = JSON.parse(localStorage.getItem("notes")) || [];
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState(initialState);
  const [editNote, setEditNote] = useState(null);

   
  
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <Form
          input={input} setInput={setInput} notes={notes} setNotes={setNotes} setEditNote={setEditNote} editNote={editNote}
        />
      </div>
      <div>
        <NotesList notes={notes} setNotes={setNotes} setEditNote={setEditNote} />
      </div>

    </div>
  );
}

export default App;
