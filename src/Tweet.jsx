import { For, Show } from "solid-js";
import Media from "./Media.jsx";

const toHtml = ({ full_text }) => full_text.replace(/\n/g, "<br />");

export default function Tweet(props) {
  const tweet = () =>
    props.tweet.retweeted_status ? props.tweet.retweeted_status : props.tweet;

  return (
    <div class="tweet">
      <a
        class="created-at"
        href={`https://twitter.com/${props.tweet.user.screen_name}/status/${props.tweet.id_str}`}
        target="_blank"
      >
        {props.tweet.created_at.substr(8, 8)}
      </a>
      <b>{tweet().user.screen_name}</b>
      <Show when={props.tweet.retweeted_status}>
        <i>{props.tweet.user.screen_name}</i>
      </Show>
      <span class="text" innerHTML={toHtml(tweet())} />
      <For each={tweet().entities?.urls}>
        {(url) => (
          <span class="url">
            <a href={url.url} target="_blank">
              {url.display_url}
            </a>
          </span>
        )}
      </For>
      <Show when={tweet().quoted_status}>
        <span class="quoted" innerHTML={toHtml(tweet().quoted_status)} />
      </Show>
      <For each={tweet().extended_entities?.media}>
        {(item) => (
          <Media
            type={item.type}
            sizes={item.sizes}
            media_url={item.media_url}
            video_info={item.video_info}
          />
        )}
      </For>
      <button
        class="countdown"
        onClick={async () => {
          document.getElementById("tweets").classList.add("dim");
          console.log("PUT", props.tweet.id_str);
          const response = await fetch("/.netlify/functions/fauna", {
            method: "PUT",
            body: JSON.stringify({ id_str: props.tweet.id_str }),
          });
          if (response.ok) {
            console.log(response.status);
            props.setMark(props.tweet);
          } else {
            console.error(await response.text());
          }
        }}
      >
        mark
      </button>
    </div>
  );
}
