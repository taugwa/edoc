import HiUser from '../functions/HiUser'



import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function Content () {
    const { content } = useContext(AppContext);



    return (
        <div>
            
            <content.page Username={content.Username} />
        </div>
    )
}

export default Content 