import { createResource } from "solid-js";
import logo from "./logo.svg";
import styles from "./App.module.css";

async function fetchMarked() {
  return (await fetch("/.netlify/functions/fauna")).json();
}

async function fetchTweets({id_str}) {
  return (await fetch(`/.netlify/functions/twitter?since_id=${id_str}`)).json();
}

function App() {
  const [marked] = createResource(fetchMarked);
  const [tweets] = createResource(marked, fetchTweets);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        { tweets() }
      </header>
    </div>
  );
}

export default App;
