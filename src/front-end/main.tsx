import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import App from "./app.tsx";

const root = document.createElement("div");
document.body.prepend(root);

const rootReducer = (action, state) => {
  switch (action.type) {
    case "ADD_CHAT":
      return {
        ...state,
        chats: [...state.chats, action.payload]
      };
      break;
    default:
      return state;
  }
};



// const store = createStore(rootReducer, undefined, composedMiddlewares);

ReactDOM.render(
  <App />,
  root
);
