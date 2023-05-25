
import HiUser from '../functions/HiUser'
import Note from '../functions/NoteView'
import { useContext } from 'react'
import Content from './Content'

import LogoTitle from './LogoTitle'
import defaultProfilePicture from './images/defaultpfp.png' 
import searchIcon from './images/search.png'
import plusIcon from './images/plus.png'
import bookmarkIcon from './images/bookmark.png'


import { AppContext } from './AppContext';

function Sidebar(props) {

    //const [dynamicContent, setDynamicContent] = useState(<Content wee="hi"/>)
    
    const { content, updateContent } = useContext(AppContext);

    const handleNewNoteClick = (event) => {
        event.preventDefault()
        updateContent({page: Note})
        
    }

    const handleSearchClick = (event) => {
        event.preventDefault()
        updateContent({searchSubSidebar: !content.searchSubSidebar,
                bookmarksSubSidebar: false})
    }
           
    const handleBookmarksClick = (event) => {
        event.preventDefault()
        updateContent({bookmarksSubSidebar: !content.bookmarksSubSidebar,
                searchSubSidebar: false})
    
    }
   



    
    return (
        <div className='sidebar'>
            <LogoTitle />
            <div className="notesapp-sidebar-profile">
                <img src={defaultProfilePicture} alt="Default Profile Picture" 
                    style={{width:"38px", paddingRight: "10px"}}/>
                <span className="notesapp-sidebar-profile-userName">{props.Username}</span>
            </div>
            <div className="">
                <button onClick={handleSearchClick}
                className="notesapp-sidebar-function-label"><img src={searchIcon} alt="SearchIcon" 
                        style={{width:"19px", paddingRight: "15px"}}/>Search</button>

                 <button onClick={handleBookmarksClick}
                className="notesapp-sidebar-function-label"><img src={bookmarkIcon} alt="Bookmarks" 
                        style={{width:"19px", paddingRight: "15px"}}/>Bookmarks</button>

                 <button onClick={handleNewNoteClick}
                className="notesapp-sidebar-function-label"><img src={plusIcon} alt="Bookmarks" 
                        style={{width:"19px", paddingRight: "15px"}}/>New note</button>

            </div>
            
            <div className='sidebarfolders'>

            </div>
        </div>
    )
}

export default Sidebar