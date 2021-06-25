import React from "react";
import ReactDOM from "react-dom";
import ValidatedLoginForm from "./ValidatedLoginForm";

export default function App() {
  return (
    <div className="App">
      <h1>Please Enter your credentials to login to our Website!</h1>
      <ValidatedLoginForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
