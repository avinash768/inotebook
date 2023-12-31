import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes , editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refColse = useRef(null)
  const [note, setNote] = useState({id:"", etitle: " ", edescription: " ", etag: "" })


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }


  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)    
    refColse.current.click();
    props.showAlert("Successfully updated ","success");
    
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}  minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refColse} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <AddNote showAlert={props.showAlert}/>
      
      <div className='row my-3'>
        <div className="contenar">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>

    </>
  )
}

export default Notes
