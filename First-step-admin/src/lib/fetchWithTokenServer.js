import BASE_URL from "./baseUrl";
import { cookies } from "next/headers";

const fetchWithTokenServer = async (endpoint, method, options) => {
  const token = cookies().get(`adminAccessToken`).value;

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

  const url = `${BASE_URL}/${endpoint}`;
  const response = await fetch(url, requestOptions);
  const data = await response.text(); // Read the response as text

  if (!response.ok) {
    if (response.statusText === `Unauthorized`) {
      return `Unauthorized`;
    }
    console.log(`Error Response from ${url}:`, data); // Log the response for debugging
    return data || "Error fetching data";
  }

  try {
    const jsonData = JSON.parse(data); // Attempt to parse JSON
    return jsonData;
  } catch (error) {
    console.error(`JSON Parsing Error for ${url}:`, error); // Log parsing errors
    return "Error parsing JSON";
  }

};
export default fetchWithTokenServer;
