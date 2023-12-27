import React from "react";
import Map from "../Map/Map";
import { useBookmark } from "../../context/BookmarkListContext";
import { Outlet } from "react-router-dom";

function Bookmark() {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default Bookmark;
