import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home.jsx'
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div className="App">
    <Router>
      <NavBar/>
      <Route
            path="/"
            exact
            render={(
              props 
            ) => <Home  {...props}/>} 
          />
      <Route
            path="/form/"
            exact
            render={(
              props 
            ) => <AddProduct  {...props}/>} 
          />
        
    </Router>
    </div>
  );
}

export default App;

