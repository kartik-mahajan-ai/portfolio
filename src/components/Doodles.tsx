import type { SVGProps } from "react";

/**
 * Decorative line art. Every path is stroke-only and inherits `currentColor`,
 * so each mark takes its colour from whatever wraps it — in practice the
 * `--doodle` token, which inverts between themes.
 */

type D = SVGProps<SVGSVGElement>;

/** Underline squiggle — sits beneath a phrase for emphasis. */
export function Squiggle(props: D) {
  return (
    <svg
      viewBox="0 0 120 14"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 9c8-5.5 16-5.5 24 0s16 5.5 24 0 16-5.5 24 0 16 5.5 24 0" />
    </svg>
  );
}

/**
 * Radial figure for the Approach section — a compass rose of petals, rings and
 * tick marks. Built from geometry so the spacing stays exact while the stroke
 * weights vary.
 */
export function CompassFigure({ className = "" }: { className?: string }) {
  const spokes = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2;
    const inner = 46;
    const outer = i % 4 === 0 ? 60 : 54;
    return {
      x1: 100 + Math.cos(a) * inner,
      y1: 100 + Math.sin(a) * inner,
      x2: 100 + Math.cos(a) * outer,
      y2: 100 + Math.sin(a) * outer,
    };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      {/* Petals */}
      <path
        d="M100 14C100 60 140 100 186 100 140 100 100 140 100 186 100 140 60 100 14 100 60 100 100 60 100 14Z"
        strokeWidth="0.9"
      />
      <path
        d="M100 40C100 72 128 100 160 100 128 100 100 128 100 160 100 128 72 100 40 100 72 100 100 72 100 40Z"
        strokeWidth="0.7"
        opacity="0.7"
      />

      {/* Rings */}
      <circle cx="100" cy="100" r="86" strokeWidth="0.7" opacity="0.5" />
      <circle cx="100" cy="100" r="60" strokeWidth="0.9" />
      <circle cx="100" cy="100" r="46" strokeWidth="0.6" opacity="0.6" />
      <circle cx="100" cy="100" r="3" strokeWidth="1.4" />

      {/* Tick marks around the inner ring */}
      {spokes.map((s, i) => (
        <line
          key={i}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          strokeWidth={i % 4 === 0 ? 0.9 : 0.5}
          opacity={i % 4 === 0 ? 0.85 : 0.45}
        />
      ))}

      {/* Corner brackets */}
      <path
        d="M22 8h-14v14M178 8h14v14M22 192h-14v-14M178 192h14v-14"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * Full-bleed flowing line pattern — long meandering ribbons that loop back on
 * themselves, in the spirit of hand-drawn squiggle wallpaper.
 *
 * Scaled with `slice` rather than tiled, so there are no repeat seams at any
 * viewport size. The caller masks the centre out (see `.flow-mask`) so the
 * pattern lives at the edges and never competes with body copy.
 */
export function FlowPattern({ className = "" }: { className?: string }) {
  const paths = [
    // Left edge, top to bottom
    "M 60 -40 C 10 130, 150 230, 85 365 S -30 530, 75 655 S 170 810, 70 1050",
    // Upper-left sweep heading right
    "M -60 130 C 70 40, 205 205, 335 145 S 520 25, 650 130",
    // Loop, mid-left
    "M 150 495 C 60 450, 40 340, 135 318 C 220 298, 262 405, 185 460",
    // Long diagonal crossing the full width
    "M -50 430 C 165 345, 305 530, 490 478 S 765 345, 1055 440",
    // Bottom-left curl
    "M -40 790 C 120 725, 270 870, 185 950 C 132 1002, 35 968, 58 895 C 82 820, 228 806, 310 878",
    // Top-centre ripple
    "M 295 -40 C 380 60, 485 -15, 565 70 S 705 125, 790 35",
    // Top-right loop
    "M 700 55 C 805 5, 910 88, 858 172 C 815 240, 698 224, 720 138",
    // Right edge, top to bottom
    "M 965 -30 C 900 140, 1025 262, 945 405 S 858 565, 952 705 S 1035 865, 942 1040",
    // Bottom-centre meander
    "M 195 1040 C 300 945, 425 1015, 525 952 S 708 878, 828 962",
    // Bottom-right sweep
    "M 610 1040 C 715 935, 885 985, 1050 900",
    // Small counter-curl, right of centre
    "M 690 640 C 770 600, 830 680, 775 735 C 726 784, 645 736, 682 675",
  ];

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
