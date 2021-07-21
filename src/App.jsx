import { createResource, For } from "solid-js";
import Tweet from "./Tweet.jsx";

async function fetchMarked() {
  return (await fetch("/.netlify/functions/fauna")).json();
}

async function fetchTweets({ id_str }) {
  return (await fetch(`/.netlify/functions/twitter?since_id=${id_str}`)).json();
}

function App() {
  const [marked] = createResource(fetchMarked);
  const [tweets] = createResource(marked, fetchTweets);

  return (
    <ul class="tweets">
      <li>
        {tweets.loading
          ? "Laddar twitter..."
          : marked.loading
          ? "Laddar fauna..."
          : tweets().length}
      </li>
      <For each={tweets()?.reverse()}>{(tweet) => <Tweet tweet={tweet} />}</For>
    </ul>
  );
}

export default App;
