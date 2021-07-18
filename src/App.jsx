import { createResource } from "solid-js";
import logo from "./logo.svg";
import styles from "./App.module.css";

async function fetchMarked() {
  return (await fetch("/.netlify/functions/fauna")).json();
}

function App() {
  const [marked] = createResource(fetchMarked);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        { marked()?.id_str }
      </header>
    </div>
  );
}

export default App;
