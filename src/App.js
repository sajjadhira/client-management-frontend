// import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React, { useState, useEffect } from "react";

import Content from "./components/Content";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Idlelogin from "./components/Idlelogin";
import Todos from "./pages/Todos";
import Newtodo from "./pages/Newtodo";
import Todoedit from "./pages/Todoedit";
import Notfound from "./pages/Notfound";
import Clients from "./pages/Clients";
import Clientsadd from "./pages/Clientsadd";

export const globalContext = React.createContext();

const queryClinet = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);
  const context = {
    brand_name: "Axis Incorporation",
    support_email: "support@mycompany.com",
  };

  useEffect(() => {
    document.title = "Login";
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  var css = ` margin-top: 20% !important;`;

  return (
    <globalContext.Provider value={context}>
      <QueryClientProvider client={queryClinet}>
        <BrowserRouter>
          <ToastContainer />
          <Idlelogin />
          <div className="App">
            <Routes>
              <Route path="/" element={<Content children={<Dashboard />} />} />
              <Route
                path="/dashboard/"
                element={<Content children={<Dashboard />} />}
              />
              <Route
                path="/client-management/"
                element={<Content children={<Dashboard />} />}
              />
              <Route
                path="/clients/"
                element={<Content children={<Clients />} />}
              />
              <Route
                path="/clients/add"
                element={<Content children={<Clientsadd />} />}
              />
              <Route
                path="/client/edit/:id"
                element={<Content children={<Todoedit />} />}
              />

              <Route path="/login/" element={<Login />} />
              <Route path="/register/" element={<Register />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </div>
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </globalContext.Provider>
  );
}

export default App;
