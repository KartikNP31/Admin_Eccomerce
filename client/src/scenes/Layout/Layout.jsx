import React from 'react';
import { useState } from 'react';
import { Box, Divider, useMediaQuery} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from "components/Navbar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";
import { useGetUserQuery } from 'state/api';
import { useSelector } from 'react-redux';

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width : 600px");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state)=>state.global.userId);
  const { data } = useGetUserQuery(userId);
  console.log("🚀 ~ file: Layout.jsx:15 ~ Layout ~ data:", data)
  


  return (
    <Box display={isNonMobile ? "flex" : "block"} width={"100%"} height={"100%"}>
      <Sidebar
        user = {data || {}}
        isNonMobile = {isNonMobile}
        drawerWidth = "250px"
        isSidebarOpen = {isSidebarOpen}
        setIsSidebarOpen = {setIsSidebarOpen}
        >
          
        </Sidebar>
      
      <Box flexGrow={1}>
        <Navbar
        user = {data || {}}
        isSidebarOpen = {isSidebarOpen}
        setIsSidebarOpen = {setIsSidebarOpen}
        />
        <Divider />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout;