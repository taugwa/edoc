import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { Link } from 'react-router-dom';
import documentIcon from './images/document.png';
import bookmarkIcon from './images/bookmark.png';
import { alignProperty } from '@mui/material/styles/cssUtils';

function BookmarksSubSidebar() {
  const { content, updateContent } = useContext(AppContext);
  const { bookmarks, Username } = content;

  const handleBookmarkClick = (note) => {
    const selectedNote = note;
    console.log(selectedNote);

    if (selectedNote) {
      const { _id: NoteId } = selectedNote;
      const isBookmarked = bookmarks.some((bookmark) => bookmark.NoteId === NoteId);

      let updatedBookmarks;
      if (isBookmarked) {
        updatedBookmarks = bookmarks.filter((bookmark) => bookmark.NoteId !== NoteId);
      } else {
        updatedBookmarks = [...bookmarks, { NoteId }];
      }

      updateContent({ ...content, bookmarks: updatedBookmarks });
    }
  };

  return (
    <div className="bookmark-subsidebar">
      {bookmarks.length > 0 ? (
        bookmarks.map((note) => (
          <div
            className="sidebarnotes-allbuttons"
            key={note.NoteId}
            onClick={() => handleBookmarkClick(note)}
          >
            <Link to={`/notes/${Username}/${note.NoteId}`} className="sidebarnotes-button">
              <img
                src={documentIcon}
                alt="Note"
                style={{ width: '19px', paddingRight: '15px' }}
              />
              {note.Title}
            </Link>
          </div>
        ))
      ) : (
        <div className="nobookmark">You have no bookmarked notes.
        To add a note to Bookmarks, click the <img
                src={bookmarkIcon}
                alt="bookmark"
                style={{ width: '18px', paddingLeft: '3px',paddingRight: '3px', }}
      
              /> icon in the toolbar of any note.
      
       </div>
      )}
    </div>
  );
}

export default BookmarksSubSidebar;