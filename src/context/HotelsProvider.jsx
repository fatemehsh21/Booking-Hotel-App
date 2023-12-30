import { useContext, useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";
const BASE_URL = "https://hotels-json.onrender.com";
const HotelContext = createContext();
export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    `${BASE_URL}/hotels`,
    `q=${destination || ""}&accommodates_gte=${room || ""}`
  );

  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/hotels/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoadingCurrHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{ hotels, isLoading, getHotel, currentHotel, isLoadingCurrHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelContext);
}
