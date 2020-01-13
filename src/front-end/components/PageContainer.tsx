import React, { useState, useEffect } from "react";
import styles from "./PageContainer.scss";
import io from "socket.io-client";

const SocketHOC = children => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  let ws: any;
  if (!socket) {
    ws = io("http://localhost:8080");
    ws.on("connect", msg => {
      console.log("CONNECTED! ", msg);
      setSocket(ws);
    });
  }

  return (
    <div>{connected ? children : <div>Establishing connection...</div>}</div>
  );
};

type PCProps = {
  title?: string;
  children: React.ReactNode;
};

const PageContainer: React.FC<PCProps> = ({ title, children }) => {
  const [state, setState] = useState({});
  return (
    <div className={styles.pageContainer}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {children}
    </div>
  );
};

export default PageContainer;
