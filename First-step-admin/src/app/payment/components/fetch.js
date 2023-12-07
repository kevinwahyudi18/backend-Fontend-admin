import BASE_URL from "@/lib/baseUrl";

export const getAllPayment = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/payment`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const payment = await res.json();
    return payment;
  } catch (error) {
    console.log(error);
  }
};