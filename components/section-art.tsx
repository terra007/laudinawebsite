import { cn } from "@/lib/utils";

/**
 * Gezeichnete Platzhalter für die Bildplätze. Sie stehen, bis in
 * /public/media ein Foto oder ein generiertes Bild liegt.
 */
export function SectionArt({
  variant,
  className,
}: {
  variant: "therapie" | "hypnose" | "portrait" | "wien" | "weinviertel";
  className?: string;
}) {
  if (variant === "hypnose") {
    return (
      <svg
        viewBox="0 0 480 600"
        preserveAspectRatio="xMidYMid slice"
        className={cn("size-full", className)}
        aria-hidden="true"
      >
        <rect width="480" height="600" fill="#34565a" />
        {Array.from({ length: 11 }).map((_, i) => (
          <ellipse
            key={i}
            cx="240"
            cy="310"
            rx={22 + i * 24}
            ry={30 + i * 30}
            fill="none"
            stroke="#dde8e5"
            strokeOpacity={0.5 - i * 0.04}
            strokeWidth="1"
          />
        ))}
        <ellipse cx="240" cy="310" rx="9" ry="12" fill="#e6dfd2" />
      </svg>
    );
  }

  if (variant === "wien") {
    // Gründerzeitfassaden der Inneren Stadt
    const windows = (x: number, y: number, cols: number, rows: number, gapX: number, gapY: number) =>
      Array.from({ length: cols * rows }).map((_, i) => (
        <rect
          key={`${x}-${y}-${i}`}
          x={x + (i % cols) * gapX}
          y={y + Math.floor(i / cols) * gapY}
          width="15"
          height="30"
          rx="7.5"
          fill="#fcfbf8"
          fillOpacity="0.82"
        />
      ));
    return (
      <svg viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" className={cn("size-full", className)} aria-hidden="true">
        <rect width="480" height="600" fill="#efeae1" />
        <circle cx="356" cy="150" r="96" fill="#e6dfd2" />
        {/* Kuppel und Turm im Hintergrund */}
        <path d="M70 330c0-52 34-90 76-90s76 38 76 90Z" fill="#dde8e5" />
        <rect x="140" y="204" width="12" height="40" fill="#dde8e5" />
        <path d="M392 330V214l14-58 14 58v116Z" fill="#dde8e5" />
        {/* Fassaden */}
        <path d="M0 600V318l18-26h124l18 26v282Z" fill="#93aeaa" />
        <path d="M160 600V246l20-30h130l20 30v354Z" fill="#3d6266" />
        <path d="M330 600V336l16-24h118l16 24v264Z" fill="#b6c9c5" />
        <rect x="160" y="246" width="170" height="5" fill="#2b4649" />
        <rect x="0" y="318" width="160" height="4" fill="#3d6266" fillOpacity="0.5" />
        <rect x="330" y="336" width="150" height="4" fill="#3d6266" fillOpacity="0.4" />
        {windows(24, 346, 4, 4, 34, 58)}
        {windows(184, 276, 4, 5, 37, 58)}
        {windows(352, 364, 3, 4, 40, 54)}
        {/* Eingang */}
        <path d="M228 600v-52a17 17 0 0 1 34 0v52Z" fill="#e6dfd2" />
      </svg>
    );
  }

  if (variant === "weinviertel") {
    // Hügel, Weingärten und Kellergasse im Weinviertel
    return (
      <svg viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" className={cn("size-full", className)} aria-hidden="true">
        <rect width="480" height="600" fill="#efeae1" />
        <circle cx="128" cy="152" r="78" fill="#e6dfd2" />
        <path d="M0 330c70-46 150-52 230-20s170 20 250-26v316H0Z" fill="#dde8e5" />
        {/* Kirche */}
        <path d="M318 300v-58l13-34 13 34v58Z" fill="#fcfbf8" />
        <path d="M344 300v-30h44v30Z" fill="#fcfbf8" />
        <path d="M340 272l26-18 26 18Z" fill="#3d6266" />
        <path d="M316 244l15-40 15 40Z" fill="#3d6266" />
        <path d="M0 400c90-60 190-56 280-22s140 26 200-8v230H0Z" fill="#93aeaa" />
        {/* Presshäuser der Kellergasse */}
        {[60, 104, 148].map((x, i) => (
          <g key={x}>
            <rect x={x} y={372 - i * 5} width="34" height="26" fill="#fcfbf8" />
            <path d={`M${x - 4} ${372 - i * 5}l21-16 21 16Z`} fill="#2b4649" />
            <rect x={x + 12} y={382 - i * 5} width="10" height="16" rx="5" fill="#3d6266" />
          </g>
        ))}
        <path d="M0 470c110-48 220-40 320-8s110 20 160 4v134H0Z" fill="#3d6266" />
        {/* Rebzeilen */}
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M${-40 + i * 62} 600C${40 + i * 54} 540 ${150 + i * 34} 496 ${250 + i * 26} 470`}
            fill="none"
            stroke="#dde8e5"
            strokeOpacity="0.5"
            strokeWidth="1.4"
          />
        ))}
      </svg>
    );
  }

  if (variant === "portrait") {
    return (
      <svg viewBox="0 0 480 600" className={cn("size-full", className)} role="img" aria-label="Platz für das Porträtfoto">
        <rect width="480" height="600" fill="#efeae1" />
        <path
          fill="#e6dfd2"
          d="M250 70c92-8 176 52 198 142 22 92-6 196-78 256-70 58-176 70-254 22C42 444 4 350 20 262 36 170 110 100 200 78c16-4 34-6 50-8Z"
        />
        <text
          x="240"
          y="322"
          textAnchor="middle"
          fontFamily="'Newsreader Variable', Georgia, serif"
          fontSize="120"
          fontWeight="300"
          fill="#3d6266"
        >
          LP
        </text>
      </svg>
    );
  }

  return (
    <svg
        viewBox="0 0 480 600"
        preserveAspectRatio="xMidYMid slice"
        className={cn("size-full", className)}
        aria-hidden="true"
      >
      <rect width="480" height="600" fill="#efeae1" />
      <path
        fill="#dde8e5"
        d="M150 120c70-10 142 34 162 102 20 70-10 150-70 190-58 38-140 36-190-12C6 356-8 280 20 216c22-52 74-88 130-96Z"
      />
      <path
        fill="#93aeaa"
        fillOpacity="0.55"
        d="M330 250c62-6 122 36 138 96 16 62-12 132-66 164-52 30-122 24-164-18-40-40-50-104-26-156 20-46 66-80 118-86Z"
      />
      <path
        d="M40 520c80-40 150 30 230-6s110-52 190-22"
        fill="none"
        stroke="#3d6266"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      <path
        d="M40 548c80-40 150 30 230-6s110-52 190-22"
        fill="none"
        stroke="#3d6266"
        strokeOpacity="0.25"
        strokeWidth="1.2"
      />
    </svg>
  );
}
