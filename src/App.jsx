import { createResource, For } from "solid-js";
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
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <ol>
          <For each={tweets()}>{tweet => <li>{tweet.created_at}</li>}</For>
        </ol>
      </header>
    </div>
  );
}

export default App;
