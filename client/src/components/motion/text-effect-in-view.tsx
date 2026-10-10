// Project helper (not from Motion Primitives): starts TextEffect when it scrolls into view.
import { useRef } from "react";
import { useInView } from "framer-motion";
import { TextEffect } from "./text-effect";

type Props = Parameters<typeof TextEffect>[0] & { dir?: "ltr" | "rtl" };

/** Until it is in view an invisible copy holds the space, so nothing jumps when the animation begins. */
export function TextEffectInView({ dir, ...props }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const Tag = (props.as ?? "p") as "p";
  return (
    <div ref={ref} dir={dir} style={{ minWidth: 0 }}>
      {inView ? <TextEffect {...props} /> : <Tag className={props.className} style={{ visibility: "hidden" }}>{props.children}</Tag>}
    </div>
  );
}
