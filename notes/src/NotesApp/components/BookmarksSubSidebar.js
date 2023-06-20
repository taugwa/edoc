import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import Page from '../page';
import documentIcon from './images/document.png';

function BookmarksSubSidebar() {
  const { content, updateContent } = useContext(AppContext);
  const { bookmarks, Username } = content; 

  const handleBookmarkClick = (note) => {
    const selectedNote = note;
    console.log(selectedNote);
  
    if (selectedNote) {
      const { _id: NoteId } = selectedNote;
      const isBookmarked = bookmarks.some((note) => note.NoteId === NoteId);
  
      if (isBookmarked) {
        const updatedBookmarks = bookmarks.filter((note) => note.NoteId !== NoteId);
        updateContent({ ...content, bookmarks: updatedBookmarks });
      } else {
        // Add bookmark
        const updatedBookmarks = [...bookmarks, { NoteId }];
        updateContent({ ...content, bookmarks: updatedBookmarks });
      }
  
      // Redirect to note page
      window.location.href = `/notes/${Username}/${NoteId}`;
    }
  };
  
  return (
    <div className="subsidebar">
      <h3>Bookmarked Notes</h3>
      {bookmarks.length > 0 ? (
        bookmarks.map((note) => (
          <div
            className="sidebarnotes-allbuttons"
            key={note.NoteId}
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
