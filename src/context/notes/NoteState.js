import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",    
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZTk4ODk0MWZiNGE0ZGM4MDE1NGJhIn0sImlhdCI6MTY5NDQ5ODQ5Mn0.yyWfzZvA-7mRe87Cxqw2lD7YQQ8F7Lm2_8RdxFDXu4g",
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",    
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZTk4ODk0MWZiNGE0ZGM4MDE1NGJhIn0sImlhdCI6MTY5NDQ5ODQ5Mn0.yyWfzZvA-7mRe87Cxqw2lD7YQQ8F7Lm2_8RdxFDXu4g",
      },
      body: JSON.stringify({title, description ,tag})
    });
    const json = await response.json();
    console.log(json);
    console.log("add new note");
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
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",    
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZTk4ODk0MWZiNGE0ZGM4MDE1NGJhIn0sImlhdCI6MTY5NDQ5ODQ5Mn0.yyWfzZvA-7mRe87Cxqw2lD7YQQ8F7Lm2_8RdxFDXu4g",
      }
    });
    const json = await response.json();
    console.log(json);   
    console.log("deliting note used is" + id);
    const newNotes = notes.filter((note) => {return note._id !== id })
    setNotes(newNotes);
  }



  //Edit notes
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",    
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZTk4ODk0MWZiNGE0ZGM4MDE1NGJhIn0sImlhdCI6MTY5NDQ5ODQ5Mn0.yyWfzZvA-7mRe87Cxqw2lD7YQQ8F7Lm2_8RdxFDXu4g"
      },
      body: JSON.stringify({title, description ,tag}), 
    });
    const json = await response.json();
    console.log(json);


    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setNotes(newNotes);
  } 



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;