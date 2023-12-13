import React from "react";
import AuthScreen from "./Auth";
import Dashboard from "./layout/Dashboard/Dashboard";
import Authentication from "./Utils/Authentication";

function App() {
  const { getToken } = Authentication();
  const isLogin = getToken();
  return (
    <>
      {!isLogin ? <AuthScreen /> : <Dashboard />}
    </>
  );
}

export default App;


















// import { HomePagesView } from "./appStyled";
// <>
// <HomePagesView>
//   <div className="headerStyle">
//     <h1>Styled Component</h1>
//     <UseEffect />
//   </div>
// </HomePagesView>
// </>
