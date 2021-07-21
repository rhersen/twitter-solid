export default function Tweet(props) {
  return (
    <>
      <div class="stats">
        <span
          class="countdown"
          onClick={async () => {
            console.log("mark", props.tweet.id_str);
            console.log(
              "PUT",
              (
                await fetch("/.netlify/functions/fauna", {
                  method: "PUT",
                  body: props.tweet.id_str,
                })
              ).statusText
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
