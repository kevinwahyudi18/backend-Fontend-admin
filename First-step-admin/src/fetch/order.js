import BASE_URL from "@/lib/baseUrl";

export const getAllOrder = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const order = await res.json();
    return order;
  } catch (error) {
    console.log(error);
  }
};