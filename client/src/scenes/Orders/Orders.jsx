import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import Header from 'components/Header/Header';
import React, {useState} from 'react';
import { useGetTransactionsQuery } from 'state/api';
import { OrdersAction } from './OrdersAction';
import { useMemo } from 'react';



const Orders = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [rowId, setRowId] = useState(null);
  // const [orderStatus, setOrderStatus] = useState(false);
  // const [paymentStatus, setPaymentStatus] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("🚀 ~ file: Orders.jsx:24 ~ Orders ~ data:", data);

  const columns = useMemo(() => [
    {
      field: "_id",
      headerName: "Order ID",
      flex: 0.75,
    },
    {
      field: "createdAt",
      headerName: "Placed On",
      flex: 0.5,
    },
    {
      field: "userId",
      headerName: "Customer ID",
      flex: 0.75,
    },
    {
      field: "cost",
      headerName: "Price",
      flex: 0.25,
      renderCell: (params) => `Rs.${Number(params.value).toFixed(2)}`,
    },
    {
      field: "products",
      headerName: "Quantity",
      flex: 0.25,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field : "type",
      headerName : "Payment Status",
      type : "singleSelect",
      valueOptions : ['Pending', 'Successful'],
      editable : true,


    },
    {
      field : "invoice",
      headerName : "Order Status",
      type : "singleSelect",
      valueOptions : ['Delivered', 'in Progress'],
      editable : true,

    },
    {
      field : 'actions',
      headerName:'Update',
      type : "actions",
      editable  :true,
      renderCell : (params) => <OrdersAction {...{params, rowId, setRowId}}/>,
    }

  ],[rowId]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="Entire list of Orders" textAlignment="center" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          onCellEditCommit={(params)=>setRowId(params.id)}
          
        />
      </Box>
    </Box>
  )
};

export default Orders;