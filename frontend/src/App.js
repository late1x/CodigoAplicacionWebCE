import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NavbarD from "./components/Navbar";
import Register from "./components/Register";
import Product from "./components/Product";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <NavbarD />
          <Home />
          <Footer/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <NavbarD />
          <Dashboard />
          <Footer/>
        </Route>
        <Route path="/product">
          <NavbarD />
          <Product />
          <Footer/>
        </Route>
        <Route path="/contact">
          <NavbarD />
          <Contact />
          <Footer/>
        </Route>
        <Route path="/about">
          <NavbarD />
          <About />
          <Footer/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;