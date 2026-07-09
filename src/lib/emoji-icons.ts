import { assetUrl } from "./asset-base";

export type EmojiName =
  | "trophy"
  | "rocket"
  | "money-bag"
  | "hammer-wrench"
  | "chart-up"
  | "dollar"
  | "handshake"
  | "gift"
  | "wave"
  | "party"
  | "point-down"
  | "raised-hand"
  | "eyes"
  | "first-medal"
  | "second-medal"
  | "third-medal"
  | "crown";

/** Self-hosted Apple emoji assets (64px) */
export const APPLE_EMOJI: Record<EmojiName, { src: string; label: string }> =
  {
    trophy: { src: assetUrl("/emojis/apple/trophy.png"), label: "Trophy" },
    rocket: { src: assetUrl("/emojis/apple/rocket.png"), label: "Rocket" },
    "money-bag": {
      src: assetUrl("/emojis/apple/money-bag.png"),
      label: "Money bag",
    },
    "hammer-wrench": {
      src: assetUrl("/emojis/apple/hammer-wrench.png"),
      label: "Tools",
    },
    "chart-up": {
      src: assetUrl("/emojis/apple/chart-up.png"),
      label: "Chart increasing",
    },
    dollar: { src: assetUrl("/emojis/apple/dollar.png"), label: "Dollar" },
    handshake: {
      src: assetUrl("/emojis/apple/handshake.png"),
      label: "Handshake",
    },
    gift: { src: assetUrl("/emojis/apple/gift.png"), label: "Gift" },
    wave: { src: assetUrl("/emojis/apple/wave.png"), label: "Wave" },
    party: { src: assetUrl("/emojis/apple/party.png"), label: "Party" },
    "point-down": {
      src: assetUrl("/emojis/apple/point-down.png"),
      label: "Backhand index pointing down",
    },
    "raised-hand": {
      src: assetUrl("/emojis/apple/raised-hand.png"),
      label: "Raised hand",
    },
    eyes: { src: assetUrl("/emojis/apple/eyes.png"), label: "Eyes" },
    "first-medal": {
      src: assetUrl("/emojis/apple/first-medal.png"),
      label: "First place medal",
    },
    "second-medal": {
      src: assetUrl("/emojis/apple/second-medal.png"),
      label: "Second place medal",
    },
    "third-medal": {
      src: assetUrl("/emojis/apple/third-medal.png"),
      label: "Third place medal",
    },
    crown: { src: assetUrl("/emojis/apple/crown.png"), label: "Crown" },
  };
