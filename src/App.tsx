import React from "react";
import "./App.css";
// import AccountDetails from "./pages/AccountDetails";
import { HashRouter, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Accounts from "./pages/accounts/Accounts";
import Home from "./pages/home/Home";
import Scholars from "./pages/scholars/Scholars";
import { ApiProvider } from "./context/ApiContext";
import { AccountsProvider } from "./context/AccountsContext";

const backendURL = process.env.API_URL || "http://localhost:5000";

function App() {
  return (
    <HashRouter>
      <ApiProvider apiBase={backendURL}>
        <AccountsProvider>
          <Layout>
            <Route path="/home" component={Home} />
            <Route path="/accounts" component={Accounts} />
            <Route path="/scholars" component={Scholars} />
          </Layout>
        </AccountsProvider>
      </ApiProvider>
    </HashRouter>
  );
}

export default App;
