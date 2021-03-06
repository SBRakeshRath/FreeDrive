import "./App.css";
import Intro from "./App/intro/index.jsx";
import Storage from "./App/storage/index.js";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Admin from "./App/storage/admin/Admin"
import Signup from "./App/storage/signup.jsx"

function App() {
  const NotFound=()=>{return(<><h1>Page not found</h1></>)};
  return (
    <>
      {/* <Intro /> */}
      
      <Switch>
        <Route exact path="/">
          <Intro />
        </Route>
        <Route exact path="/Storage">
          
          <Storage />
        </Route>
        <Route exact path="/Storage/Admin"><Admin/></Route>
        <Route exact path="/Storage/signup"><Signup/></Route>
        <Route component={NotFound} />
      </Switch>
      
    </>
  );
}

export default App;
