import LogoTitle from './LogoTitle'
import bookmarkIcon from './images/bookmark.png';

function Toolbar() {

    return (
        <div>
            <button className='toolbar-button'><img src={bookmarkIcon} className='toolbar-button-img'/></button>
        </div>
    )
}

export default Toolbar