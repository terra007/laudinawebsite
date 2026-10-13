"use client";

import * as React from "react";
import { Eraser } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

export type SignatureHandle = {
  /** PNG der Unterschrift mit transparentem Hintergrund, oder null wenn leer. */
  toPng: () => Promise<Uint8Array | null>;
};

const INK = "#2f3533";

function dataUrlToBytes(url: string) {
  const binary = atob(url.split(",")[1]);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Point[]) {
  if (stroke.length === 0) return;
  ctx.beginPath();
  ctx.moveTo(stroke[0].x, stroke[0].y);
  if (stroke.length === 1) ctx.lineTo(stroke[0].x + 0.1, stroke[0].y + 0.1);
  for (let index = 1; index < stroke.length - 1; index++) {
    const midX = (stroke[index].x + stroke[index + 1].x) / 2;
    const midY = (stroke[index].y + stroke[index + 1].y) / 2;
    ctx.quadraticCurveTo(stroke[index].x, stroke[index].y, midX, midY);
  }
  if (stroke.length > 1) ctx.lineTo(stroke[stroke.length - 1].x, stroke[stroke.length - 1].y);
  ctx.stroke();
}

/**
 * Unterschriftsfeld: mit Finger, Stift oder Maus zeichnen. Wer nicht
 * zeichnen kann oder möchte, tippt stattdessen den Namen.
 */
export function SignaturePad({
  ref,
  invalid,
  onChange,
}: {
  ref: React.Ref<SignatureHandle>;
  invalid?: boolean;
  onChange?: (hasSignature: boolean) => void;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const strokes = React.useRef<Point[][]>([]);
  const drawing = React.useRef(false);
  const [mode, setMode] = React.useState<"draw" | "type">("draw");
  const [typed, setTyped] = React.useState("");
  const [hasInk, setHasInk] = React.useState(false);

  const redraw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = INK;
    strokes.current.forEach((stroke) => drawStroke(ctx, stroke));
  }, []);

  React.useEffect(() => {
    if (mode !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(redraw);
    observer.observe(canvas);
    redraw();
    return () => observer.disconnect();
  }, [mode, redraw]);

  const point = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    strokes.current.push([point(event)]);
    redraw();
    if (!hasInk) {
      setHasInk(true);
      onChange?.(true);
    }
  };

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    strokes.current[strokes.current.length - 1].push(point(event));
    redraw();
  };

  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    strokes.current = [];
    setHasInk(false);
    onChange?.(false);
    redraw();
  };

  React.useImperativeHandle(ref, () => ({
    async toPng() {
      const scale = 3;
      const padding = 10;
      const out = document.createElement("canvas");
      const ctx = out.getContext("2d");
      if (!ctx) return null;

      if (mode === "type") {
        const text = typed.trim();
        if (!text) return null;
        const font = `italic 400 64px "Newsreader Variable", Georgia, serif`;
        await document.fonts.load(font, text).catch(() => undefined);
        ctx.font = font;
        const width = Math.ceil(ctx.measureText(text).width) + 40;
        out.width = width;
        out.height = 110;
        ctx.font = font;
        ctx.fillStyle = INK;
        ctx.textBaseline = "alphabetic";
        ctx.fillText(text, 20, 78);
        return dataUrlToBytes(out.toDataURL("image/png"));
      }

      const points = strokes.current.flat();
      if (points.length === 0) return null;
      const minX = Math.min(...points.map((p) => p.x)) - padding;
      const minY = Math.min(...points.map((p) => p.y)) - padding;
      const maxX = Math.max(...points.map((p) => p.x)) + padding;
      const maxY = Math.max(...points.map((p) => p.y)) + padding;
      out.width = Math.ceil((maxX - minX) * scale);
      out.height = Math.ceil((maxY - minY) * scale);
      ctx.setTransform(scale, 0, 0, scale, -minX * scale, -minY * scale);
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = INK;
      strokes.current.forEach((stroke) => drawStroke(ctx, stroke));
      return dataUrlToBytes(out.toDataURL("image/png"));
    },
  }));

  return (
    <div>
      {mode === "draw" ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-md border bg-papier transition-colors",
            invalid ? "border-fehler" : "border-input",
          )}
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Unterschriftsfeld. Unterschreiben Sie mit Finger, Stift oder Maus."
            className="block h-44 w-full cursor-crosshair touch-none"
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
          />
          <div className="pointer-events-none absolute inset-x-6 bottom-9 border-b border-dashed border-salbei" />
          {!hasInk ? (
            <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[0.875rem] text-stein">
              Hier unterschreiben
            </p>
          ) : (
            <button
              type="button"
              onClick={clear}
              className="absolute right-2 top-2 inline-flex h-9 items-center gap-1.5 rounded-full bg-kalk px-3 text-[0.875rem] text-moos-tief transition-colors hover:bg-salbei-hell"
            >
              <Eraser className="size-4" aria-hidden="true" /> Löschen
            </button>
          )}
        </div>
      ) : (
        <div>
          <Input
            aria-label="Vor- und Nachname als Unterschrift"
            placeholder="Vor- und Nachname"
            value={typed}
            aria-invalid={invalid}
            onChange={(event) => {
              setTyped(event.target.value);
              onChange?.(event.target.value.trim().length > 1);
            }}
            autoComplete="name"
          />
          <p className="mt-3 min-h-14 border-b border-dashed border-salbei pb-2 font-serif text-[2rem] italic leading-tight text-anthrazit">
            {typed}
          </p>
        </div>
      )}

      <button
        type="button"
        className="text-link mt-3 text-[0.9375rem]"
        onClick={() => {
          const next = mode === "draw" ? "type" : "draw";
          setMode(next);
          onChange?.(next === "draw" ? strokes.current.length > 0 : typed.trim().length > 1);
        }}
      >
        {mode === "draw" ? "Stattdessen den Namen tippen" : "Stattdessen von Hand unterschreiben"}
      </button>
    </div>
  );
}
