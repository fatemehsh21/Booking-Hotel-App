import { useBookmark } from "../../context/BookmarkListContext";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactCountryFlag } from "react-country-flag";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBookmark, getBookmark, isLoadingCurrBookmark } = useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadingCurrBookmark || !currentBookmark) return <Loader />;
  return (
    <div className="currentBookmark">
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
