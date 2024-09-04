"use client";

import axios from "axios";
import Cookies from "js-cookie";

export const fetchData = async (
  eventType: string,
  ref?: string,
  utm_source?: string,
  additionalData?: string
) => {
  const key = process.env.NEXT_PUBLIC_USER_KEY!;
  if (localStorage.getItem(key) === key) return;
  const token = Cookies.get(eventType);
  if (token == eventType) return;
  if (ref === process.env.NEXT_PUBLIC_USER!) return;

  let somedata = { additionalData };
  if (!Cookies.get("loc")) {
    somedata = await FetchSomeData();
    Cookies.set("loc", "done");
    somedata.additionalData = additionalData || "none";
  }
  const Server = process.env.NEXT_PUBLIC_API!;
  const res = await axios.post(Server, {
    eventType: eventType.trim(),
    ref,
    utm_source,
    additionalData: JSON.stringify(somedata),
  });
  const { error } = res.data;
  if (!error) {
    Cookies.set(eventType, eventType);
  }
};

const FetchSomeData = async () => {
  const fetchData = async () => {
    const Server2 = process.env.NEXT_PUBLIC_API2!;
    try {
      const response = await fetch(Server2);
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  let data = await fetchData();
  if (data) {
    const { city, latitude, longitude, country, org, ip } = data;
    data = {
      city,
      latlong: `${latitude},${longitude}`,
      country,
      org,
      ip,
    };
  }

  return data;
};
