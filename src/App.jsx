import { createResource, For } from "solid-js";
import styles from "./App.module.css";

async function fetchMarked() {
  return (await fetch("/.netlify/functions/fauna")).json();
}

async function fetchTweets({ id_str }) {
  return (await fetch(`/.netlify/functions/twitter?since_id=${id_str}`)).json();
}

function Tweet(props) {
  return (
    <li>
      {props.tweet.created_at.substr(8, 8)}{" "}
      <b>{props.tweet.user.screen_name}</b> {props.tweet.full_text}
    </li>
  );
}

function App() {
  const [marked] = createResource(fetchMarked);
  const [tweets] = createResource(marked, fetchTweets);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <span>
          {tweets.loading
            ? "Laddar twitter..."
            : marked.loading
            ? "Laddar fauna..."
            : "Laddat."}
        </span>
        <ol>
          <For each={tweets()?.reverse()}>
            {(tweet) => <Tweet tweet={tweet} />}
          </For>
        </ol>
      </header>
    </div>
  );
}

export default App;
