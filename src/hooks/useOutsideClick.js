import { useEffect } from "react";

export default function useOutsideClick(ref, exceptionId, cb) {
  useEffect(() => {
    function handleOutsidClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleOutsidClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsidClick);
    };
  }, [ref, cb]);
}
