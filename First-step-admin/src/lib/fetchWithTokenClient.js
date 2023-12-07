import { getCookie } from "cookies-next";
import BASE_URL from "./baseUrl";

const fetchWithTokenClient = async (endpoint, method, options) => {
  const token = getCookie(`adminAccessToken`);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options?.headers, // Merge additional headers if provided in options
  };

  const requestOptions = {
    method,
    headers,
    ...options,
  };
  console.log(endpoint)
  const url = `${BASE_URL}/${endpoint}`;
  const response = await fetch(url, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    console.log(url, requestOptions);

    if (response.statusText === `Unauthorized`) {
      return `Unauthorized`;
    }
    return data.message || "Error fetching data";
  }

  return data;
};

export default fetchWithTokenClient;
