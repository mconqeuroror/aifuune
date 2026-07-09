import { APPLE_EMOJI, type EmojiName } from "@/lib/emoji-icons";
import { cn } from "@/lib/utils";

type AppleEmojiProps = {
  name: EmojiName;
  className?: string;
  size?: number;
};

export function AppleEmoji({ name, className, size = 20 }: AppleEmojiProps) {
  const emoji = APPLE_EMOJI[name];

  return (
    <img
      src={emoji.src}
      alt=""
      aria-hidden
      width={size}
      height={size}
      decoding="async"
      draggable={false}
      className={cn(
        "inline-block shrink-0 select-none align-[-0.125em]",
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}
