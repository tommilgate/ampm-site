"use client";

type ConvergeWindow = Window & {
  Converge?: { track?: { custom?: (name: string, props?: Record<string, unknown>) => void } };
};

export default function TrackedLink({
  event,
  properties,
  children,
  ...anchorProps
}: {
  event: string;
  properties?: Record<string, unknown>;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const onClick = () => {
    try {
      const w = window as ConvergeWindow;
      // Seeka queues events until the SDK finishes loading, so this is safe to call anytime.
      w.Converge?.track?.custom?.(event, properties);
    } catch {
      /* never block the navigation if tracking fails */
    }
  };

  return (
    <a {...anchorProps} onClick={onClick}>
      {children}
    </a>
  );
}
