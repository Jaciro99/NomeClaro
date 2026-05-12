import { ADS_ENABLED } from "@/lib/ads";

type AdPlaceholderProps = {
  position: "top" | "middle" | "sidebar" | "bottom";
};

const positionLabels: Record<AdPlaceholderProps["position"], string> = {
  top: "Espaço reservado para anúncio superior",
  middle: "Espaço reservado para anúncio no conteúdo",
  sidebar: "Espaço reservado para anúncio lateral",
  bottom: "Espaço reservado para anúncio inferior"
};

export function AdPlaceholder({ position }: AdPlaceholderProps) {
  if (!ADS_ENABLED) {
    return null;
  }

  const isSidebar = position === "sidebar";

  return (
    <aside
      aria-label={positionLabels[position]}
      className={[
        "flex items-center justify-center rounded-md border border-dashed border-ink/20 bg-white/55 text-center text-xs font-medium uppercase tracking-[0.18em] text-ink/45",
        isSidebar ? "min-h-[280px] px-5 py-8" : "min-h-[96px] px-5 py-6"
      ].join(" ")}
    >
      {positionLabels[position]}
    </aside>
  );
}
