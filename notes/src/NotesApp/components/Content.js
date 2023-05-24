import HiUser from '../functions/HiUser'

import Note from '../functions/Note'

import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function Content () {
    const { content } = useContext(AppContext);



    return (
        <div>
            
            <HiUser userName={content.userName}/>
  
        </div>
    )
}

export default Content 