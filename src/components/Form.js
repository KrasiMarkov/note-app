import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Form = ({ input, setInput, notes, setNotes, setEditNote, editNote }) => {

    const updateNote = (title, id, completed) => {
        const newNote = notes.map((note) =>
            note.id === id ? { title, id, completed } : note
        );
        setNotes(newNote);
        setEditNote("");
    };

    useEffect(() => {
        if (editNote) {
            setInput(editNote.title);
        } else {
            setInput("");
        }
    }, [setInput, editNote]);

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!editNote) {
            setNotes([...notes, { id: uuidv4(), title: input, completed: false }]);
            setInput("");
        } else {
            updateNote(input, editNote.id, editNote.completed);
        }

    }

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                placeholder="Enter Note..."
                className="task-input"
                value={input}
                required
                onChange={onInputChange} />
            <button className="button-add" type="submit">
                {editNote ? "OK" : "Add"}
            </button>
        </form>
    )
}

export default Form;