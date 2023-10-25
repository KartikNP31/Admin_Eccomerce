import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { themeSettings } from "theme";
import {useMemo} from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./scenes/Dashboard/Dashboard";
import Layout from "./scenes/Layout/Layout";
import Products from "./scenes/Products/Products"
import Customers from "./scenes/Customers/Customers"
import Transactions from "./scenes/Transactions/Transactions";
import Orders from "./scenes/Orders/Orders";
import Overview from "./scenes/Overview/Overview";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes >
          <Route element={<Layout />} >
            <Route path="/" element={<Navigate to="/dashboard" replace/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/overview" element={<Overview />} />
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
