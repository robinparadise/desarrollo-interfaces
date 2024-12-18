import { useState, createContext } from 'react';
export const BookmarksContext = createContext(null); // 'light' valor por defecto

export function Bookmarks({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = () => {
    setBookmarks([
      ...bookmarks,
      { id: 28 }
    ])
  }

  const removeBookmark = (idToRemove) => {
    setBookmarks([
      ...bookmarks.filter(item => item.id !== idToRemove)
    ])
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, setBookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
