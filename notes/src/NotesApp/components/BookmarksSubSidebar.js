import React, { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';
import { Link } from 'react-router-dom';
import documentIcon from './images/document.png';
import bookmarkIcon from './images/bookmark.png';

function BookmarksSubSidebar() {
  const { content, updateContent } = useContext(AppContext);
  const { bookmarks, Username } = content;

  const handleBookmarkClick = (note) => {
    const { NoteId } = note;
    const noteUrl = `/notes/${Username}/${NoteId}`;
    window.location.href = noteUrl;
  };

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      updateContent((prevContent) => ({
        ...prevContent,
        bookmarks: JSON.parse(storedBookmarks),
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

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
        <div className="nobookmark">
          You have no bookmarked notes. To add a note to Bookmarks, click the{' '}
          <img
            src={bookmarkIcon}
            alt="bookmark"
            style={{ width: '18px', paddingLeft: '3px', paddingRight: '3px' }}
          />{' '}
          icon in the toolbar of any note.
        </div>
      )}
    </div>
  );
}

export default BookmarksSubSidebar;
