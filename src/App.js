import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CustomerTable from "./Features/Customer/Views/CustomerTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerTable />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
