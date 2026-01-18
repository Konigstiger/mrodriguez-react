// Pill.tsx
import React from "react";
import { getTechColorHex, rgba } from "../shared/techColors"; // adjust path if needed

interface PillProps {
  text: string;

  /**
   * Render as a semantic button when clickable (e.g., tag filter),
   * otherwise default is a non-interactive span.
   */
  as?: "span" | "button";

  /**
   * Optional click handler. Only used when as="button".
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Visual active state (useful for filters).
   */
  active?: boolean;

  /**
   * Optional title attr (tooltip).
   */
  title?: string;

  /**
   * Optional aria label (useful for buttons).
   */
  ariaLabel?: string;

  /**
   * Optional extra classes.
   */
  className?: string;
}

export default function Pill({
  text,
  as = "span",
  onClick,
  active = false,
  title,
  ariaLabel,
  className,
}: PillProps) {
  const hex = getTechColorHex(text);

  // Base style mirrors your current tech pills.
  // Active state slightly boosts background/border for "selected" chips.
  const background = active ? rgba(hex, 0.26) : rgba(hex, 0.16);
  const border = active ? rgba(hex, 0.70) : rgba(hex, 0.45);

  const commonClassName = [
    // IMPORTANT: the "!" overrides your global button styles in index.css
    // when rendering as a button (otherwise it would get px-4 py-2 bg-slate-800, etc).
    "inline-flex items-center gap-2",
    "!rounded-full !px-3 !py-1 text-xs border",
    "select-none",
    as === "button"
      ? [
          "cursor-pointer",
          "!bg-transparent", // override global button bg
          "transition",
          "hover:brightness-110",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        ].join(" ")
      : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const style: React.CSSProperties = {
    backgroundColor: background,
    borderColor: border,
    color: "rgba(248,250,252,0.95)",
  };

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={commonClassName}
        style={style}
        title={title}
        aria-label={ariaLabel}
        aria-pressed={active}
      >
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: hex }} />
        {text}
      </button>
    );
  }

  return (
    <span className={commonClassName} style={style} title={title}>
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: hex }} />
      {text}
    </span>
  );
}
