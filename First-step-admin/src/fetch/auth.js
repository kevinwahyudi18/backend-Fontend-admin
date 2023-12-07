import BASE_URL from '@/lib/baseUrl';
import { setCookie } from "cookies-next";

export const login = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (response.status >= 400) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);
    const { data } = await response.json();
    console.log(data);
    data && setCookie("adminAccessToken", data);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const register = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (response.status >= 400) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
