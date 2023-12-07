import BASE_URL from "@/lib/baseUrl";

export const getAllCategory = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/category`, {
      method: "GET",
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

export const validateName = async (token) => {
  try {
    const result = await getAllCategory(token);
    const allName = result.data.map((category_name) => category_name.category_name);
    return allName;
  } catch (error) {
    console.error;
  }
};