import { For, Show } from "solid-js";

export default function Tweet(props) {
  const tweet = () =>
    props.tweet.retweeted_status ? props.tweet.retweeted_status : props.tweet;

  return (
    <>
      <div class="stats">
        <button
          class="countdown"
          onClick={async () => {
            console.log("PUT", props.tweet.id_str);
            console.log(
              (
                await fetch("/.netlify/functions/fauna", {
                  method: "PUT",
                  body: props.tweet.id_str,
                })
              ).status
            );
          }}
        >
          mark
        </button>
        <hr />
      </div>
      <li>
        {props.tweet.created_at.substr(8, 8)}{" "}
        <Show when={props.tweet.retweeted_status}>
          <i>{props.tweet.user.screen_name}</i>
        </Show>{" "}
        <b>{tweet().user.screen_name}</b> {tweet().full_text}
        <ol>
          <For each={tweet().entities?.urls}>
            {(url) => (
              <li>
                <a href={url.url} target="_blank">
                  {url.display_url}
                </a>
              </li>
            )}
          </For>
        </ol>
        <Show when={tweet().quoted_status}>
          <div class="quoted">{tweet().quoted_status.full_text}</div>
        </Show>
        <ul>
          <For each={tweet().extended_entities?.media}>
            {(item) => (
              <Show when={item.type === "photo"} fallback={<b>{item.type}</b>}>
                <img src={`${item.media_url}:small`} />
              </Show>
            )}
          </For>
        </ul>
      </li>
    </>
  );
}
