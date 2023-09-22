import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "6500174150236e322b4dd6a2",
      "user": "64fe988941fb4a4dc80154ba",
      "title": "tech",
      "description": "this is my frist note",
      "tag": "personal",
      "Date": "2023-09-12T07:46:09.508Z",
      "__v": 0
    },
    {
      "_id": "6506e2d0248c4b456a16ce26",
      "user": "64fe988941fb4a4dc80154ba",
      "title": "tech",
      "description": "this is my frist note",
      "tag": "personal",
      "Date": "2023-09-17T11:28:16.783Z",
      "__v": 0
    },
    {
      "_id": "6506e2db248c4b456a16ce28",
      "user": "64fe988941fb4a4dc80154ba",
      "title": "tech",
      "description": "this is1212st note",
      "tag": "personal",
      "Date": "2023-09-17T11:28:27.269Z",
      "__v": 0
    },
    {
      "_id": "6506e2dd248c4b456a16ce2a",
      "user": "64fe988941fb4a4dc80154ba",
      "title": "tech",
      "description": "this is1212st note",
      "tag": "personal",
      "Date": "2023-09-17T11:28:29.202Z",
      "__v": 0
    }
  ];
  const [notes, setNotes] = useState(notesInitial)
  //add a notes
  const addNote = (title, description, tag) => {
    const note = {
      "_id": "652062dd248c4b456a16ce2a",
      "user": "64fe988941fb4a4dc80154ba",
      "title": title,
      "description": description,
      "tag": tag,
      "Date": "2023-09-17T11:28:29.202Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }

  //delete notes
  const deleteNote = (id) => {
    console.log("deliting note used is" + id);
    const newNotes = notes.filter((note) => {return note._id !== id })
    setNotes(newNotes);
  }
  //Edit notes
  const editNote = (id, title, description, tag) => {

  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;