import BASE_URL from "@/lib/baseUrl";

export const getAllCustomer = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const customer = await res.json();
    return customer;
  } catch (error) {
    console.log(error);
  }
};