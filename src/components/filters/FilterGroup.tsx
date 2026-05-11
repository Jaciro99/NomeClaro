import { FilterOption } from "@/components/filters/FilterOption";
import type { FilterGroupItem } from "@/lib/filters";

type FilterGroupProps = {
  group: FilterGroupItem;
  selectedValues: string[];
};

export function FilterGroup({ group, selectedValues }: FilterGroupProps) {
  const isLetterGroup = group.name === "letter";

  return (
    <fieldset className="rounded-md border border-ink/10 bg-mist/50 p-4">
      <legend className="px-1 text-sm font-black uppercase tracking-[0.14em] text-ink/55">
        {group.title}
      </legend>
      <div
        className={[
          "mt-3 grid gap-2 pr-1",
          isLetterGroup
            ? "grid-cols-6 sm:grid-cols-7"
            : "max-h-56 grid-cols-1 overflow-y-auto"
        ].join(" ")}
      >
        {group.options.map((option) => (
          <FilterOption
            compact={isLetterGroup}
            key={`${group.name}-${option.value}`}
            name={group.name}
            option={option}
            selectedValues={selectedValues}
          />
        ))}
      </div>
    </fieldset>
  );
}
