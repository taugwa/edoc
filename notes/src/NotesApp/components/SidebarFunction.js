import HiUser from '../functions/HiUser'
import Note from '../functions/Note'
import { useState } from 'react'
import Content from './Content'

function SidebarFunction({icon, label}) {
    const [dynamicContent, setDynamicContent] = useState(<Content wee="hi"/>)
    
    const handleClick = (event) => {
        event.preventDefault();
        if (label === "Create new note") {
            console.log("create new note");
            setDynamicContent(<Content wee="New Note Content" />);
        } else if (label === "Search") {
            console.log("search");
            setDynamicContent(<Content wee="Search Content" />);
        } else if(label === "Bookmarks") {
            console.log("bookmarks");
            setDynamicContent(<Content wee="Bookmarks Content" />);
        }
    }


    return(
        <div className="notesapp-sidebar-function">
            
            <button onClick={handleClick}
            className="notesapp-sidebar-function-label"><img src={icon} alt="SearchIcon" 
                    style={{width:"19px", paddingRight: "15px"}}/>{label}</button>
        </div>
        
    )
}


export default SidebarFunction 