export default function Tweet(props) {
  const tweet = () =>
    props.tweet.retweeted_status ? props.tweet.retweeted_status : props.tweet;

  return (
    <>
      <div class="stats">
        <span
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
        </span>
        <hr />
      </div>
      <li>
        {props.tweet.created_at.substr(8, 8)}{" "}
        <i>
          {props.tweet.retweeted_status ? props.tweet.user.screen_name : " "}
        </i>{" "}
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
      </li>
    </>
  );
}
