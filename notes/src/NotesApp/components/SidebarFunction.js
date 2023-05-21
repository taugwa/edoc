
function SidebarFunction({icon, label}) {

    return(
        <div className="notesapp-sidebar-function">
            <img src={icon} alt="SearchIcon" 
                    style={{width:"19px", paddingRight: "15px"}}/>
            <span className="notesapp-sidebar-function-label">{label}</span>
        </div>
    )
}

export default SidebarFunction