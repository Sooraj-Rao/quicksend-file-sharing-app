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

  const Server = process.env.NEXT_PUBLIC_API!;
  const res = await axios.post(Server, {
    eventType: eventType.trim(),
    ref,
    utm_source,
    additionalData: JSON.stringify(additionalData),
  });
  const { error } = res.data;
  if (!error) {
    Cookies.set(eventType, eventType);
  }
};
