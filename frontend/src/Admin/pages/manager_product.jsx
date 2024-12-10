import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import Header from "../components/Header";
import { useState } from "react";

const Manager_Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Color",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Size",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Brand",
      flex: 1,
    },
  ];

  const handleRowSelection = (selectionModel) => {
    // Map the selected IDs to row data
    const selectedData = mockDataTeam.filter((row) => selectionModel.includes(row.id));
    setSelectedRows(selectedData);
  };

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
          rows={mockDataTeam} 
          columns={columns} 
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}        />
      </Box>
    </Box>
  );
};

export default Manager_Product;
