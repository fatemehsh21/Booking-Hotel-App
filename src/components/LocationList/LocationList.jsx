import React from "react";
import useFetch from "../../hooks/useFetch";

const BASE_URL = "https://hotels-json.onrender.com";
function LocationList() {
  const { data, isLoading } = useFetch(`${BASE_URL}/hotels`, "");
  if (isLoading) return <p>Loading ...</p>;
  return (
    <div className="nearbyLocation">
      <h2>nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;<span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
