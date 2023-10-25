import React, { useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { AddOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import "./addProduct.css";
import { themeSettings } from "../../theme.js";

export default function AddProducts() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const [formState, setFormState] = useState({
    category: '',
    name: '',
    description: '',
    mrpPrice: 0,
    discount: 0,
    quantity: 0,
    tagline: '',
    productMainImage: null,
    productSubImages: [],
  });

  const handleFormChange = (event) => {
    const { name, value, type, files } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const field in formState) {
      if (field === 'productSubImages') {
        formState[field].forEach((file) => {
          formData.append(field, file);
        });
      } else {
        formData.append(field, formState[field]);
      }
    }

    try {
      await axios.post('/api/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success or show a message to the user.
    } catch (error) {
      // Handle error or show an error message.
    }
  };

  const style = {
    position: "absolute",
    overflow:'scroll',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    outerHeight: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 100,
    p: 4,
    "--secondary-bg-color": theme.palette.secondary.main,
    "--primary-bg-color": theme.palette.primary.main,
    "--background-color": theme.palette.background.default,
    "--grey-bg-color": theme.palette.grey[200],
    "--text-color": theme.palette.common.white,
  };
  // const formStyle;

  const darkTheme = createTheme(themeSettings("dark")); // Create dark theme
  const lightTheme = createTheme(themeSettings("light")); // Create light theme
  const currentTheme = theme.palette.mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <div>
        <Button
          variant="contained"
          onClick={handleOpen}
          color="secondary"
          size="large"
          sx={{ m: "0.8rem" }}
        >
          <AddOutlined></AddOutlined>
          Add Product
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          
        >
          <Fade in={open}>
            <Box sx={style}>
              <div class="form-container add-product-container">
                <form
                  name="addProduct"
                  onSubmit={handleFormSubmit}
                >
                  <label htmlFor="category">Select Category of the Product</label>
                  <select name="category" id="category" 
                  value={formState.category}
                  onChange={handleFormChange}
                  >
                    <option value="Appliances">Appliances</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Home & Furniture">Home & Furniture</option>
                  </select>
                  <label htmlFor="name">
                    Enter Product Name :
                    <input
                      type="text"
                      id="name"
                      placeholder="Title..."
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                    />
                  </label>
                  <label htmlFor="description">
                    Enter Product Description :
                    <textarea
                      type="text"
                      id="description"
                      placeholder="Description..."
                      name="description"
                      required
                      value={formState.description}
                      onChange={handleFormChange}
                    ></textarea>
                  </label>
                  <label htmlFor="quantity">
                    Enter Quantity of the Product
                    <input
                      type="quantity"
                      min="1"
                      id="quantity"
                      placeholder="Quantity..."
                      name="quantity"
                      required
                      value={formState.quantity}
                      onChange={handleFormChange}
                    />
                  </label>
                  <label htmlFor="price">
                    Enter Product MRP Price(Rs.)
                    <input
                      type="number"
                      min="1"
                      id="price"
                      placeholder="MRP..."
                      name="price"
                      required
                      value={formState.price}
                      onChange={handleFormChange}
                    />
                  </label>
                  <label htmlFor="discount">
                    Enter Discount in Percentage :
                    <input
                      type="number"
                      min="0"
                      max="100"
                      id="discount"
                      placeholder="Discount..."
                      name="discount"
                      required
                      value={formState.discount}
                      onChange={handleFormChange}
                    />
                  </label>
                  <label htmlFor="tagLine">
                    Enter Attractive tagline for your Product (max 20 words): 
                    <input
                      type="text"
                      min="0"
                      max="20"
                      id="tagLine"
                      placeholder="Tagline..."
                      name="tagLine"
                      value={formState.tagline}
                      onChange={handleFormChange}
                    />
                  </label>

                  <label htmlFor="productMainImage">
                    Uplaod Main Image of Product '(Image type : png/jpg)'
                  </label>
                  <input
                    class="product-img"
                    type="file"
                    id="productMainImage"
                    name="productMainImage"
                    placeholder="Upload Image"
                    required
                    min="1"
                    max="1"
                    onChange={handleFormChange}
                  />
                  <label htmlFor="productSubImage">
                    Uplaod Sub Images of Product '(Image type : png/jpg)'. You
                    can add atmost 10 Images.
                  </label>
                  <input
                    class="product-img"
                    type="file"
                    id="productSubImage"
                    name="productSubImage"
                    placeholder="Upload Sub Images"
                    multiple // Enable multiple file selection
                    max="10" // Maximum number of files
                    required
                    onChange={handleFormChange}
                  />

                  <button id="add-product-btn" type="submit">
                    Add Preduct
                  </button>
                </form>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
