import React, { useState } from "react";
import "./AddProduct.css";
import upload_are from "../../assets/upload_area.svg";

const AddProduct = () => {
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

  const Add_Product = async () => {
    console.log(productDetails);

    let reponseData;
    let product = {...productDetails, sizes: selectedSizes};

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        reponseData = data;
      });
    if (reponseData.success) {
      product.image = reponseData.image_url;
      console.log(product);

      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("failed");
          window.location.reload();
        });
    }
  };

  return (
    <div className="add-product">
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
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_are}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn  bg-black text-white text-xl font-bold py-2 px-6 rounded-md"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;