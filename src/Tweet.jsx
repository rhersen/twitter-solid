import { For, Show } from "solid-js";

export default function Tweet(props) {
  const tweet = () =>
    props.tweet.retweeted_status ? props.tweet.retweeted_status : props.tweet;

  const fullText = () =>
    tweet()
      .full_text.split("\n")
      .filter((x) => x);

  return (
    <div class="tweet">
      <button
        class="countdown"
        onClick={async () => {
          console.log("PUT", props.tweet.id_str);
          const response = await fetch("/.netlify/functions/fauna", {
            method: "PUT",
            body: props.tweet.id_str,
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
      <span class="created-at">{props.tweet.created_at.substr(8, 8)}</span>
      <b>{tweet().user.screen_name}</b>
      <Show when={props.tweet.retweeted_status}>
        <i>{props.tweet.user.screen_name}</i>
      </Show>
      <For each={fullText()}>
        {(text) => <span class="text" innerHTML={text} />}
      </For>
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
        <span class="quoted" innerHTML={tweet().quoted_status.full_text} />
      </Show>
      <For each={tweet().extended_entities?.media}>
        {(item) => (
          <Show when={item.type === "photo"} fallback={<b>{item.type}</b>}>
            <img
              src={`${item.media_url}:small`}
              width={item.sizes.small.w / devicePixelRatio}
              height={item.sizes.small.h / devicePixelRatio}
              alt={item.type}
            />
          </Show>
        )}
      </For>
    </div>
  );
}
