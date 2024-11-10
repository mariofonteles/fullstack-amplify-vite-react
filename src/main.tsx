import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Home from './components/home.tsx'
import Checkout from "./components/checkout.tsx";
import Orders from "./components/orders.tsx";

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{
      path: "/",
      element:  <Home />
    },
    {
      path: "/checkout",
      element: <Checkout/>
    },
    {
      path: "/orders",
      element: <Orders/>
    }
  ]
  },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(117, 81, 194)',
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
