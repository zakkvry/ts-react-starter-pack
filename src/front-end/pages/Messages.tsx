import React, { Component, useContext, useState, useEffect } from "react";
import randomWords from "random-words";
import styles from "./Messages.scss";
import { PageContainer } from "components";

const HomePage = ({ AppStateContext }): React.ReactNode => {
  const [state, setState] = useState({ openRooms: [], showModal: false });
  const { openRooms, showModal } = state;
  const [appState, dispatch] = useContext(AppStateContext);

  console.log("RENDERING HOMEPAGE: ", state);

  useEffect(() => {
    const timer = setTimeout((): void => {
      setState({
        ...state,
        openRooms: [{ name: "Chris" }]
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer title="Messages">
      <section className={styles.roomList}>
        {openRooms.length ? (
          openRooms.map(({ name }, key) => (
            <div {...{ key, className: styles.room }}>{name}</div>
          ))
        ) : (
          <div>Loading...</div>
        )}

        {showModal ? (
          <div className={styles.modal}>
            <div className={styles.content}>
              <h3>Create a new chat</h3>
              <form
                className={styles.newChatForm}
                onSubmit={e => e.preventDefault()}
              >
                <div>
                  <span>Name: </span>
                  <input
                    type="text"
                    defaultValue={randomWords({
                      exactly: 1,
                      wordsPerString: 3
                    })}
                    placeholder="Enter public chat name..."
                  />
                </div>
                <div>
                  <span>Public: </span>
                  <input type="checkbox" defaultChecked={true} />
                </div>
              </form>
              <div
                className={styles.closeButton}
                onClick={() => setState({ ...state, showModal: !showModal })}
              >
                X
              </div>
            </div>
          </div>
        ) : null}
        <button
          className={styles.newChatBtn}
          onClick={() => setState({ ...state, showModal: !showModal })}
        >
          +
        </button>
      </section>
    </PageContainer>
  );
};

export default HomePage;
