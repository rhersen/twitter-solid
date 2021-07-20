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
    <>
      <hr />
      <li>
        {props.tweet.created_at.substr(8, 8)}{" "}
        <i>
          {props.tweet.retweeted_status ? props.tweet.user.screen_name : " "}
        </i>{" "}
        <b>
          {props.tweet.retweeted_status
            ? props.tweet.retweeted_status.user.screen_name
            : props.tweet.user.screen_name}
        </b>{" "}
        {props.tweet.retweeted_status
          ? props.tweet.retweeted_status.full_text
          : props.tweet.full_text}
      </li>
    </>
  );
}

function App() {
  const [marked] = createResource(fetchMarked);
  const [tweets] = createResource(marked, fetchTweets);

  return (
    <div class={styles.App}>
      <ul class="tweets">
        <li>
          {tweets.loading
            ? "Laddar twitter..."
            : marked.loading
            ? "Laddar fauna..."
            : tweets().length}
        </li>
        <For each={tweets()?.reverse()}>
          {(tweet) => <Tweet tweet={tweet} />}
        </For>
      </ul>
    </div>
  );
}

export default App;
