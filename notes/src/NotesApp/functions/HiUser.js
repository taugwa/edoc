import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/AppContext';
import { Link } from "react-router-dom";

function HiUser ({Username}) {
    const { content, updateContent } = useContext(AppContext);
    const [recentNotes, setRecentNotes] = useState([]);

    useEffect(() => {
        const fetchUserRecentNotes = async () => {
          try {
            const response = await fetch(`http://localhost:3000/notes/${content.Username}/recent`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            });
            if (response.ok) {
              const data = await response.json();
              setRecentNotes(data);
            } else {
              console.error('Error:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        if (content.Username) {
          fetchUserRecentNotes();
        }
      }, [content.Username]);

    
    const handleNoteClick = () => {
      updateContent({...content, PageType: "Page"})
    }

    return (
        <div className="notearea">
            <Typography variant="heading1">Hi {Username}!</Typography>
            <div className="recentNotes">
                <Typography sx={{fontSize: "20px"}}>Recents</Typography>
                <div>
                    {recentNotes.map((recentNote) => (
                        <Link
                            key={recentNote._id}
                            className="recentNoteLink"
                            to={`/notes/${Username}/${recentNote._id}`}
                            onClick={handleNoteClick}
                        >
                           <li>{recentNote.Title}</li>
                        </Link>
                    ))}
                </div>
            </div>
            
        </div>

    )
}

export default HiUser