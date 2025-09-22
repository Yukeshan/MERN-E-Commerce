import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const EditProduct = () => {
  let navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState(["S", "M", "L", "XL"]);
  
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "men",
    new_price: "",
    old_price: "",
    sizes: ["S", "M", "L", "XL"]
  });
  const { id } = useParams();

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const Update_Product = async () => {
    try {
      console.log(productDetails);

      const updateResponse = await axios.put(
        `http://localhost:4000/updateProduct/${id}`,
        {...productDetails, sizes: selectedSizes}
      );

      if (updateResponse.data.success) {
        alert(" updated .....!");
        navigate("/listproduct");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/${id}`
        );
        setProductDetails(response.data);
        setSelectedSizes(response.data.sizes || ["S", "M", "L", "XL"]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {productDetails ? (
        <div className="add-product capitalize">
          <h1 className=" text-center text-black font-bold text-2xl  ">
            Update Product Details
          </h1>
          <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input
              value={productDetails.name}
              onChange={changeHandler}
              type="text"
              name="name"
              placeholder="Type Here"
            />
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                value={productDetails.old_price}
                onChange={changeHandler}
                type="text"
                name="old_price"
                placeholder="Type Here"
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input
                value={productDetails.new_price}
                onChange={changeHandler}
                type="text"
                name="new_price"
                placeholder="Type Here"
              />
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select
              value={productDetails.category}
              onChange={changeHandler}
              name="category"
              className="add-product-selector"
            >
              <option value="men"> Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="addproduct-itemfield">
            <p>Available Sizes</p>
            <div className="size-selector">
              {["S", "M", "L", "XL"].map(size => (
                <label key={size} className="size-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              Update_Product();
            }}
            className="addproduct-btn  bg-black text-white text-xl font-bold py-2 px-6 rounded-md"
          >
            UPDATE
          </button>
          <Link to={"/listproduct"}>
            <button className="addproduct-btn ml-5  bg-black text-white text-xl font-bold py-2 px-6 rounded-md">
              CANCEL
            </button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProduct;