import HiUser from '../functions/HiUser'

import Note from '../functions/NoteView'

import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function Content () {
    const { content } = useContext(AppContext);



    return (
        <div>
            
            <content.page userName={content.userName} />
        </div>
    )
}

export default Content 