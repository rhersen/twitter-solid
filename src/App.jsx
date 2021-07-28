import { createResource, createSignal, For } from "solid-js";
import Tweet from "./Tweet.jsx";

async function fetchMarked() {
  return (await fetch("/.netlify/functions/fauna")).json();
}

async function fetchTweets({ id_str }) {
  const response = await fetch(
    `/.netlify/functions/twitter?since_id=${id_str}`
  );

  if (!response.ok) {
    console.error(await response.text());
  } else {
    return response.json();
  }
}

function App() {
  const [mark, setMark] = createSignal(undefined);
  const [fauna] = createResource(fetchMarked);
  const marked = () => mark() ?? fauna();
  const [tweets] = createResource(marked, fetchTweets);

  return (
    <ul class="tweets">
      <li>
        {tweets.loading
          ? "Laddar twitter..."
          : marked.loading
          ? "Laddar fauna..."
          : tweets()?.length}
      </li>
      <For each={tweets()?.reverse()}>
        {(tweet) => <Tweet tweet={tweet} setMark={setMark} />}
      </For>
    </ul>
  );
}

export default App;
