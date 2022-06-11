import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import AllQuotes from "./components/Pages/AllQuotes"
// import NewQuote from "./components/Pages/NewQuote";
// import QuoteDetail from "./components/Pages/QuoteDetail"
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import('./components/Pages/NewQuote'));
const AllQuotes = React.lazy(() => import('./components/Pages/AllQuotes'));
const QuoteDetail = React.lazy(() => import('./components/Pages/QuoteDetail'));

function App() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="centered">
          <LoadingSpinner/>
        </div>
      }>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"/>
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteID">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
