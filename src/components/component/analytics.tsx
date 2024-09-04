"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useZustandStore } from "./zustand.store";
import { fetchData } from "./fetch-data";

export const Analytics = () => {
  const { setRef, Ref } = useZustandStore();
  const [isRefLoaded, setIsRefLoaded] = useState(false);
  const fetchDataCalled = useRef(false);
  const params = useSearchParams();
  const isRefPresent = params.get("ref");

  useEffect(() => {
    isRefPresent ? setIsRefLoaded(true) : setIsRefLoaded(false);
    !isRefPresent && setIsRefLoaded(true);
  }, [isRefPresent]);

  useEffect(() => {
    if (isRefLoaded && !fetchDataCalled.current) {
      fetchData("view:quicksend", Ref || isRefPresent || "search", "", "");
      fetchDataCalled.current = true;
      setRef(isRefPresent ? isRefPresent : "");
    }
  }, [Ref, isRefLoaded, isRefPresent, setRef]);
  return null;
};
