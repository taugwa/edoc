import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import Note from "../functions/NoteView";
import documentIcon from './images/document.png';

function BookmarksSubSidebar() {
  const { content, updateContent } = useContext(AppContext);
  const { bookmarks } = content;

  const handleBookmarkClick = (selectedNote) => {
    updateContent({
      page: Note,
      selectedNote: {
        NoteID: selectedNote.NoteID,
        Title: selectedNote.Title,
        Body: selectedNote.Body,
      },
    });
  };

  return (
    <div className='subsidebar'>
      <h3>Bookmarked Notes</h3>
      {bookmarks.length > 0 ? (
        bookmarks.map((note) => (
          <div
            className="sidebarnotes-allbuttons"
            key={note.NoteID}
            onClick={() => handleBookmarkClick(note)}
          >
            <button className="sidebarnotes-button">
              <img
                src={documentIcon}
                alt="Note"
                style={{ width: '19px', paddingRight: '15px' }}
              />
              {note.Title}
            </button>
          </div>
        ))
      ) : (
        <div>No Bookmarked Notes.</div>
      )}
    </div>
  );
}

export default BookmarksSubSidebar;
