import React from "react";
import "./App.css";
// import AccountDetails from "./pages/AccountDetails";
import { HashRouter, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AppProvider } from "./store/context";
import Accounts from "./pages/accounts/Accounts";

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Layout>
          <Route path="/accounts/:ronin?" component={Accounts} />
          {/* <Route path="/account/:ronin" component={AccountDetails} /> */}
        </Layout>
      </AppProvider>
    </HashRouter>
  );
}

export default App;
