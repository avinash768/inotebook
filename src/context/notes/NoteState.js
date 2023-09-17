import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const state= {
        "Name":"hari",
        "Class":"Ab"
    }
    return(
        <NoteContext.Provider value={{state}}> 
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;