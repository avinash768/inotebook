import NoteContext from "./noteContext";

const NoteSate = (props)=>{
 
    return(
        <NoteContext.Provider value={{}}> 
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteSate;