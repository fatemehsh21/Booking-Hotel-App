import { useContext, useReducer, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const BASE_URL = "http://localhost:5000";
const BookmarkContext = createContext();

const initialState = {
  bookmarks: [],
  currentBookmark: null,
  isLoading: false,
  error: null,
};
function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "bookmarks/loaded":
      return {
        ...state,
        bookmarks: action.payload,
        isLoading: false,
      };
    case "bookmark/loaded":
      return {
        ...state,
        currentBookmark: action.payload,
        isLoading: false,
      };
    case "bookmark/created":
      return {
        ...state,
        currentBookmark: action.payload,
        bookmarks: [...state.bookmarks, action.payload],
        isLoading: false,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}
export default function BookmarkListProvider({ children }) {
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);
  // const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);
  const [{ bookmarks, currentBookmark, isLoading }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      // setBookmarks((prev) => prev.filter((item) => item.id !== id));
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currentBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  return useContext(BookmarkContext);
}
