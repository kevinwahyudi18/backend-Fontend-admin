import BASE_URL from "@/lib/baseUrl";

export const getAllWarehouse = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/warehouse`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const warehouses = await res.json();
    
    // Mengecek jika ada data gudang
    if (warehouses && warehouses.data && warehouses.data.length > 0) {
      // Iterasi melalui setiap gudang untuk mendapatkan jumlah produk
      const warehousesWithProductCount = warehouses.data.map((warehouse) => {
        const productCount = warehouse.product.length; // Menghitung jumlah produk

        // Menggabungkan jumlah produk ke dalam gudang
        return {
          ...warehouse,
          productCount: productCount,
        };
      });

      return warehousesWithProductCount;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(`Error fetching warehouses: ${error.message}`);
  }
};