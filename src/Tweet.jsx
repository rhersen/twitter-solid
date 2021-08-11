import { For, Show, Switch, Match } from "solid-js";

export default function Tweet(props) {
  const tweet = () =>
    props.tweet.retweeted_status ? props.tweet.retweeted_status : props.tweet;

  const fullText = () =>
    tweet()
      .full_text.split("\n")
      .filter((x) => x);

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
          <Switch fallback={<b>{item.type}</b>}>
            <Match when={item.type === "photo"}>
              <a href={`${item.media_url}:large`} target="_blank">
                <img
                  src={`${item.media_url}:small`}
                  width={item.sizes.small.w / devicePixelRatio}
                  height={item.sizes.small.h / devicePixelRatio}
                  alt={item.type}
                />
              </a>
            </Match>
            <Match when={item.type === "video"}>
              <a href={`${item.media_url}:large`} target="_blank">
                <div>{item.type}</div>
                <video controls>
                  <source
                    src={item.video_info?.variants[1].url}
                    type={item.video_info?.variants[1].content_type}
                  />
                </video>
                <div>{item.type}</div>
              </a>
            </Match>
            <Match when={item.type === "animated_gif"}>
              <video controls>
                <source
                  src={item.video_info?.variants[0].url}
                  type={item.video_info?.variants[0].content_type}
                />
              </video>
            </Match>{" "}
          </Switch>
        )}
      </For>
      <button
        class="countdown"
        onClick={async () => {
          document.getElementById("tweets").classList.add("dim");
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
    </div>
  );
}
