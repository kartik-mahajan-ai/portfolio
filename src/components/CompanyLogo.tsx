"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  name: string;
  src?: string;
  className?: string;
};

/**
 * Shows the company mark when one is available, and a monogram when it isn't —
 * so a missing or 404ing logo file never renders a broken image.
 */
export default function CompanyLogo({ name, src, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-2 ${className}`}
    >
      {showImage ? (
        <Image
          src={src}
          alt={`${name} logo`}
          width={48}
          height={48}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-heading text-lg font-semibold text-accent"
        >
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
