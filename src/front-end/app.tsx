import React, {
  Component,
  createContext,
  useContext,
  useReducer,
  useEffect
} from "react";
import { Router, Route, NavLink, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import styles from "./app.styles.scss";

const history = createBrowserHistory();

const localState = JSON.parse(window.localStorage.getItem("app-state"));

const AppStateContext = createContext([{}, () => {}]);

const loadPage = (name: string) => {
  return class DelayedImport extends Component {
    readonly state: { Mod: any | null } = { Mod: null };

    componentWillMount() {
      import(`./pages/${name}.tsx`)
        .then((Mod: { default: () => Element }): void =>
          this.setState({ Mod: Mod.default })
        )
        .catch(e =>
          this.setState({ Mod: () => <h1>404 - No chunk exists</h1> })
        );
    }

    render() {
      const { Mod } = this.state;
      return !!Mod ? <Mod {...{ AppStateContext }} /> : <div>Loading...</div>;
    }
  };
};

const navLinks = [
  ["Messages", "/messages"],
  ["Settings", "/settings"],
  ["About", "/about"]
];

const initialState = {
  profile: {},
  options: {
    darkMode: false
  }
};

type Action = {
  type: String;
  payload: any;
};

const reducer = (state, action: Action) => {
  switch (action.type) {
    case "SETTINGS":
      return {
        ...state,
        options: {
          ...state.options,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

const StateContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("app-state", JSON.stringify(state));
  }, [state]);

  return (
    <AppStateContext.Provider value={[state, dispatch]}>
      {children}}
    </AppStateContext.Provider>
  );
};

const App = () => {
  useEffect(() => {
    const unlisten: () => any = history.listen(() => {});
    return () => unlisten();
  });

  return (
    <div className={styles.appWrapper}>
      <StateContext>
        <Router {...{ history }}>
          <div className={styles.appHeader}>
            <header>
              <h1 className={styles.appBrand}>
                <a href="/">Chat App v0</a>
              </h1>
            </header>

            <nav className={styles.appNav}>
              <ul>
                {navLinks.map(([name, route], key) => (
                  <li
                    {...{
                      key
                    }}
                  >
                    <NavLink to={route} activeClassName={styles.activeLink}>
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Route exact path="/" component={() => <Redirect to="/messages" />} />
          {navLinks.map(([name, route], key) => (
            <Route key={key} path={route} component={loadPage(name)} />
          ))}
        </Router>

        <footer className={styles.appFooter}>C. 2019</footer>
      </StateContext>
    </div>
  );
};

export default App;
