import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Aufklappbarer Zusatztext. Der Inhalt steht im HTML (wichtig für Suchmaschinen)
 * und ist ohne JavaScript bedienbar.
 */
export function More({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <details className={cn("group/more", className)}>
      <summary className="-ml-2 inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full px-2 text-[0.9375rem] font-medium text-moos transition-colors hover:text-moos-tief [&::-webkit-details-marker]:hidden">
        <Plus className="size-4 group-open/more:hidden" aria-hidden="true" />
        <Minus className="hidden size-4 group-open/more:block" aria-hidden="true" />
        <span className="group-open/more:hidden">{label}</span>
        <span className="hidden group-open/more:inline">Weniger anzeigen</span>
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}
