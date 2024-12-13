import { Box, Typography, useTheme, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Manager_Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Fetch data from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [flag]);

  const handleEditClick = (product) => {
    setEditData(product);
    setOpenDialog(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setFlag(!flag)
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditData({});
  };

  const handleDialogSave = async () => {
    try {
      const respone = await axios.post(`http://localhost:5000/api/products/${editData.Product_ID}`, {
        Name: editData.Name, Description: editData.Description, Brand_ID: editData.Brand_ID, Gift_ID: editData.Gift_ID
      });
      console.log(respone)
      setFlag(!flag)
      handleDialogClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { field: "Product_ID", headerName: "ID", width: 100 },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Price",
      headerName: "Price",
      type: "number",
      width: 120,
    },
    {
      field: "Brand",
      headerName: "Brand",
      flex: 1,
    },
    {
      field: "Star",
      headerName: "Rating",
      type: "number",
      width: 120,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.Product_ID)}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="SẢN PHẨM" subtitle="QUẢN LÝ SẢN PHẨM" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={products.map((product) => ({ ...product, id: product.Product_ID }))}
          columns={columns}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="Name"
            fullWidth
            value={editData.Name || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="Description"
            fullWidth
            value={editData.Description || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Brand ID"
            name="Brand_ID"
            fullWidth
            value={editData.Brand_ID || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Gift ID"
            name="Gift_ID"
            fullWidth
            value={editData.Gift_ID || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Manager_Product;
