import type { FilterOptionItem } from "@/lib/filters";

type FilterOptionProps = {
  compact?: boolean;
  name: string;
  option: FilterOptionItem;
  selectedValues: string[];
};

export function FilterOption({ compact = false, name, option, selectedValues }: FilterOptionProps) {
  const id = `${name}-${option.value}`;

  return (
    <label
      className={[
        "cursor-pointer rounded-md border border-ink/10 bg-white text-sm font-bold text-ink transition hover:border-coral/40",
        compact
          ? "grid min-h-10 place-items-center px-2 py-2 text-center has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white"
          : "flex items-center gap-3 px-3 py-2"
      ].join(" ")}
      htmlFor={id}
    >
      <input
        className={compact ? "sr-only peer" : "h-4 w-4 accent-coral"}
        defaultChecked={selectedValues.includes(option.value)}
        id={id}
        name={name}
        type="checkbox"
        value={option.value}
      />
      <span>{option.label}</span>
    </label>
  );
}
