import React, { useState, useEffect } from "react";
import { Pagination } from 'antd';

const NotesList = ({ notes, setNotes, setEditNote }) => {
  const pageSize = 3;

  const initialPage = JSON.parse(localStorage.getItem("currentPage")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleComplete = (id) => {
    setNotes(notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          completed: !note.completed
        };
      }
      return note;
    }));
  }

  const handleEdit = (id) => {
    const findNote = notes.find((note) => note.id === id);
    setEditNote(findNote);
  }

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    if (currentPage > 1 && updatedNotes.length <= (currentPage - 1) * pageSize) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  const indexOfLastNote = currentPage * pageSize;
  const indexOfFirstNote = indexOfLastNote - pageSize;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  useEffect(() => {
    if (currentPage > 1 && currentNotes.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [notes, currentNotes, currentPage]);

  return (
    <div>
      <ul className="list">
        {currentNotes.map((note) => (
          <li className="list-item" key={note.id}>
            <input type="text" value={note.title} className={`list ${note.completed ? "complete" : ""}`} onChange={(e) => e.preventDefault()} />
            <div className="button-container">
              <button className="button-complete task-button" onClick={() => handleComplete(note.id)}>
                <i className="fa fa-check-circle"></i>
              </button>
              <button className="button-edit task-button" onClick={() => handleEdit(note.id)}>
                <i className="fa fa-edit"></i>
              </button>
              <button className="button-delete task-button" onClick={() => handleDelete(note.id)}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={notes.length}
        onChange={page => setCurrentPage(page)}
      />
    </div>
  );
};

export default NotesList;
