// src/app/product/components/addProduct.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BASE_URL from "@/lib/baseUrl";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export default function AddProduct({ refreshProducts }) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const router = useRouter();
  const token = getCookie("adminAccessToken");

  const fetchCategories = async () => {
    try {
      const categoriesResponse = await fetch(`${BASE_URL}/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!categoriesResponse.ok) {
        throw new Error(
          `Categories request failed with status ${categoriesResponse.status}`
        );
      }

      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const warehousesResponse = await fetch(`${BASE_URL}/warehouse`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!warehousesResponse.ok) {
        throw new Error(
          `Warehouses request failed with status ${warehousesResponse.status}`
        );
      }

      const warehousesData = await warehousesResponse.json();
      setWarehouses(warehousesData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchWarehouses();
  }, []);

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

  const handleStockChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setStock(newValue >= 0 ? newValue : 0);
  };

  const handlePriceChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setPrice(newValue >= 0 ? newValue : 0);
  };

  const handleWeightChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setWeight(newValue >= 0 ? newValue : 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("type", productType);
      formData.append("color", color);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("weight", weight);
      formData.append("photo", imageFile);
      formData.append("category_id", category);
      formData.append("warehouse_id", warehouse);
  
      const responseData = await fetch(`${BASE_URL}/products/admin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        cache: "no-store",
      });
  
      if (responseData.ok) {
        const response = await responseData.json();
        Swal.fire({
          icon: "success",
          title: "Create Product Success",
          text: response.message || "Product created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
  
        // Reset the form fields after successful submission
        setProductName("");
        setDescription("");
        setProductType("");
        setColor("");
        setStock(0);
        setPrice(0);
        setWeight(0);
        setImageFile(null);
        setCategory("");
        setWarehouse("");
        setImagePreview("");
  
        setIsOpen(false);
        router.refresh();
        refreshProducts();
      } else {
        const errorResponse = await responseData.json();
        console.error(`Error: ${errorResponse.error || "Unknown error"}`);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorResponse.message || "An error occurred while creating the product",
        });
      }
    } catch (error) {
      console.error(`Error: ${error.message || "Unknown error"}`);
    }
  };
  
  
  return (
    <>
      <div className="flex justify-center sm:justify-end">
        <button
          className="btn btn-sm btn-outline btn-orange-600 mb-5 sm:btn-md"
          onClick={handleModal}
        >
          Add New Product
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-white p-8 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-5 text-orange-600">
              Add New Product
            </h3>
            <form onSubmit={handleSubmit}>
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
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
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
                  onChange={handleStockChange}
                />
                <label className="label font-bold">Price</label>
                <input
                  required
                  type="number"
                  className="input input-sm input-bordered sm:input-md"
                  value={price}
                  onChange={handlePriceChange}
                />

                <label className="label font-bold">Weight</label>
                <input
                  required
                  type="number"
                  className="input input-sm input-bordered sm:input-md"
                  value={weight}
                  onChange={handleWeightChange}
                />
                <label className="label font-bold">Photo</label>
                <input
                  required
                  type="file"
                  accept="image/*"
                  className="input input-sm input-bordered sm:input-md"
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Categories Available</option>
                  )}
                </select>
                <label className="label font-bold">Warehouse</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                >
                  <option value="">Select Warehouse</option>
                  {Array.isArray(warehouses) && warehouses.length > 0 ? (
                    warehouses.map((wh) => (
                      <option key={wh.id} value={wh.id}>
                        {wh.warehouse_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Warehouses Available</option>
                  )}
                </select>
              </div>
              <div className="modal-action flex justify-end mt-6">
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
