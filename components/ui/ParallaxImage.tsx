"use client";

export type ParallaxDirection = "up" | "down" | "left" | "right";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
//
//  topPercent       → posisi vertikal dalam % dari tinggi section
//                     20% = gambar ada di 20% dari atas section
//                     60% = gambar ada di 60% dari atas section
//
//  direction        → arah datang: "up" | "down" | "left" | "right"
//
//  parallaxDistance → seberapa jauh geser parallax (px). Default 150
//
//  fadeRange        → berapa px scroll untuk fade selesai. Default 300
//
// ─────────────────────────────────────────────────────────────────────────────

export interface ParallaxImageConfig {
  src: string;
  alt?: string;
  /** Posisi dari atas container dalam % (0–100). Contoh: 40 = 40% dari tinggi parent */
  topPercent: number;
  /** Posisi horizontal — salah satu wajib diisi */
  left?: string;
  right?: string;
  /** Arah datangnya gambar saat masuk. Default: "up" */
  direction?: ParallaxDirection;
  /**
   * Seberapa jauh gambar bergerak (px) dari posisi awal saat scroll penuh.
   * Makin besar = makin dramatis parallax. Default: 150
   */
  parallaxDistance?: number;
  /**
   * Berapa px scroll untuk fade in selesai. Default: 300
   */
  fadeRange?: number;
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

interface ParallaxImageProps extends ParallaxImageConfig {
  /** relativeScroll dari parent — px sudah di-scroll dari top section */
  relativeScroll: number;
  /** Tinggi total parent section dalam px */
  sectionHeightPx: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt = "",
  topPercent,
  left,
  right,
  direction = "up",
  parallaxDistance = 150,
  fadeRange = 300,
  width = "w-48",
  height = "h-64",
  rounded = "rounded-2xl",
  className = "",
  relativeScroll,
  sectionHeightPx,
}) => {
  const viewportH = typeof window !== "undefined" ? window.innerHeight : 900;

  // top dalam px dari atas section
  const topPx = (topPercent / 100) * sectionHeightPx;

  // Gambar muncul ke layar saat: topPx - (relativeScroll) ≈ viewportH
  // fadeInAt = kapan gambar mulai terlihat dari bawah viewport
  const fadeInAt = Math.max(0, topPx - viewportH);

  // Opacity: 0 → 1 selama fadeRange px scroll setelah fadeInAt
  const opacity = Math.min(
    1,
    Math.max(0, (relativeScroll - fadeInAt) / fadeRange),
  );

  // Parallax: geser berdasarkan arah
  // progress lokal: 0 saat fadeInAt, 1 saat scroll habis
  const scrollableAfterFade = Math.max(
    1,
    sectionHeightPx - viewportH - fadeInAt,
  );
  const localProgress = Math.min(
    1,
    Math.max(0, (relativeScroll - fadeInAt) / scrollableAfterFade),
  );
  const delta = (1 - localProgress) * parallaxDistance;

  let translateX = 0;
  let translateY = 0;

  switch (direction) {
    case "up":
      translateY = delta;
      break; // datang dari bawah → naik
    case "down":
      translateY = -delta;
      break; // datang dari atas → turun
    case "left":
      translateX = delta;
      break; // datang dari kanan → geser kiri
    case "right":
      translateX = -delta;
      break; // datang dari kiri → geser kanan
  }

  const style: React.CSSProperties = {
    position: "absolute",
    top: topPx,
    transform: `translate(${translateX}px, ${translateY}px)`,
    opacity,
    willChange: "transform, opacity",
    zIndex: 5,
    ...(left ? { left } : {}),
    ...(right ? { right } : {}),
  };

  return (
    <div
      style={style}
      className={`overflow-hidden shadow-2xl ${rounded} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${width} ${height} object-cover block`}
      />
    </div>
  );
};

export default ParallaxImage;
