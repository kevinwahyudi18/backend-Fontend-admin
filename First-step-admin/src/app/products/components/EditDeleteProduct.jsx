// src/app/product/components/EditDeleteProduct.js
"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "@/lib/baseUrl";
import { getCookie } from "cookies-next";

export default function EditDeleteProduct({ product, refreshProducts }) {
  const token = getCookie("adminAccessToken");

  const [isOpen, setIsOpen] = useState(false);

  const [productName, setProductName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [type, setType] = useState(product.type);
  const [color, setColor] = useState(product.product_detail[0].color);
  const [stock, setStock] = useState(Number.isFinite(product.product_detail[0].stock)? product.product_detail[0].stock: 0);
  const [price, setPrice] = useState(Number.isFinite(product.product_detail[0].price)? product.product_detail[0].price: 0);
  const [weight, setWeight] = useState(Number.isFinite(product.product_detail[0].weight)? product.product_detail[0].weight: 0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    product.product_detail[0].photo
  );
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    product.product_detail[0].category_id
  );
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    product.product_detail[0].warehouse_id
  );

  useEffect(() => {
    fetchCategoryOptions();
    fetchWarehouseOptions();
  }, []);

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }

      const data = await response.json();
      setCategoryOptions(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchWarehouseOptions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/warehouse`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch warehouses: ${response.status}`);
      }

      const data = await response.json();
      setWarehouseOptions(data.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error.message);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (stock < 0 || price < 0 || weight < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Stock, price, and weight cannot be negative',
      });
      return;
    }
    
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("color", color);
    formData.append("stock", parseInt(stock));
    formData.append("price", parseInt(price));
    formData.append("weight", parseInt(weight));
    formData.append("photo", imageFile);
    formData.append("category_id", selectedCategory);
    formData.append("warehouse_id", selectedWarehouse);
  
    try {
      const response = await fetch(`${BASE_URL}/products/admin/${product.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const responseData = await response.json();
        Swal.fire({
          icon: "success",
          title: "Update Product Success",
          text: responseData.message || "Product updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsOpen(false);
  
        // Memanggil refreshProducts setelah update berhasil
        refreshProducts();
      } else {
        const errorResponse = await response.json();
        console.error(`Error: ${errorResponse.error || "Unknown error"}`);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorResponse.message || "An error occurred while updating the product",
        });
      }
    } catch (error) {
      console.error(`Error: ${error.message || "Unknown error"}`);
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/admin/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        Swal.fire({
          icon: "success",
          title: "Delete Product Success",
          text: responseData.message || "Product deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refreshProducts();
      } else {
        const errorResponse = await response.json();
        console.error(`Error: ${errorResponse.error || "Unknown error"}`);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            errorResponse.message || "An error occurred while deleting the product",
        });
      }
    } catch (error) {
      console.error(`Error: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="btn btn-sm btn-outline btn-orange-600 mb-5 sm:btn-md"
          onClick={handleModal}
        >
          Edit/Delete
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-white p-8 rounded-md shadow-md text-center">
            <h3 className="text-xl font-bold mb-5 text-orange-600">
              Edit/Delete Product
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control w-full space-y-4">
                <label className="label font-bold">Product Name</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <label className="label font-bold">Description</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label className="label font-bold">Type</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <label className="label font-bold">Color</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <label className="label font-bold">Stock</label>
                <input
                  required
                  type="number"
                  className="input input-sm input-bordered sm:input-md"
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value))}
                />
                <label className="label font-bold">Price</label>
                <input
                  required
                  type="number"
                  className="input input-sm input-bordered sm:input-md"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <label className="label font-bold">Weight</label>
                <input
                  required
                  type="number"
                  className="input input-sm input-bordered sm:input-md"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                />
                <label className="label font-bold">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input input-sm input-bordered sm:input-md mb-2"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview w-full h-auto"
                    />
                  </div>
                )}
                <label className="label font-bold">Category</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
                <label className="label font-bold">Warehouse</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                >
                  <option value="">Select Warehouse</option>
                  {warehouseOptions.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.warehouse_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-action flex justify-center sm:justify-end w-full mt-6">
                <button
                  type="button"
                  className="btn btn-sm sm:btn-md btn-outline btn-orange-600 mr-2"
                  onClick={handleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-sm sm:btn-md btn-orange-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-sm sm:btn-md btn-outline btn-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
