import LogoTitle from './LogoTitle'
import defaultProfilePicture from './images/defaultpfp.png' 
import searchIcon from './images/search.png'
import plusIcon from './images/plus.png'
import bookmarkIcon from './images/bookmark.png'
import SidebarFunction from './SidebarFunction'

function Sidebar(props) {


    return (
        <div className='sidebar'>
            <LogoTitle />
            <div className="notesapp-sidebar-profile">
                <img src={defaultProfilePicture} alt="Default Profile Picture" 
                    style={{width:"38px", paddingRight: "10px"}}/>
                <span className="notesapp-sidebar-profile-userName">{props.userName}</span>
            </div>
            <div className="">
                <SidebarFunction icon={searchIcon} label="Search"/>
                <SidebarFunction icon={bookmarkIcon} label="Bookmarks"/>
                <SidebarFunction icon={plusIcon} label="Create new note"/>
            </div>
            
        </div>
    )
}

export default Sidebar