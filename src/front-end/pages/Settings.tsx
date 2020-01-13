import React, { Component, useState, useEffect } from "react";
import styles from "./Settings.scss";
import { PageContainer } from "components";

const initialState: any = {
  messages: []
};

const SettingsPage = ({ AppStateContext }) => {
  // const [appState, dispatch] = useContext(AppStateContext);

  const [state, setState] = useState(initialState);

  const { messages } = state;

  useEffect(() => {
    // fetch(
    //   "https://www.cleverbot.com/getreply?key=CC7wpqwalHRc7jRbsB42Pc9-u9A&input=hello"
    //  )
    //   .then(res => res.json())
    //    .then(data =>
    //     setState({ ...state, messages: [...state.messages, data.output] })
    //   );
    return () => {};
  }, [state]);

  const sendMessage = (msg: String) => {
    fetch(
      `https://www.cleverbot.com/getreply?key=CC7wpqwalHRc7jRbsB42Pc9-u9A&input=${msg}`
    )
      .then(res => res.json())
      .then(data =>
        setState({ ...state, messages: [...state.messages, data.output] })
      );
  };

  console.log("STATE: ", state);

  return (
    <PageContainer title="CleverBot">
      {messages.map(m => (
        <div>{m}</div>
      ))}
    </PageContainer>
  );
};

export default SettingsPage;
