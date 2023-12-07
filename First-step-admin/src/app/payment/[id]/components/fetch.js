import BASE_URL from "@/lib/baseUrl";

export const updatePayment = async (token, data_id) => {
    try {
      const res = await fetch(`${BASE_URL}/payment/${data_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      const category = await res.json();
      return category;
    } catch (error) {
      console.log(error);
    }
  };