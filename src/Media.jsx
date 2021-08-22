import { For, Match, Switch } from "solid-js";

export default (item) => (
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
    <Match when={item.type === "video" || item.type === "animated_gif"}>
      <div>
        <div>
          <img
            src={`${item.media_url}:small`}
            width={item.sizes.small.w / devicePixelRatio}
            height={item.sizes.small.h / devicePixelRatio}
            alt={item.type}
          />
        </div>
        <For each={item.video_info?.variants}>
          {(variant) => (
            <span>
              {" "}
              <a href={variant.url} target="_blank">
                {variant.bitrate}
              </a>
            </span>
          )}
        </For>
      </div>
    </Match>
  </Switch>
);
