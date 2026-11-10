"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type VideoPlayerProps =
  | {
      variant: "hls";
      src: string;
      poster: string;
      title?: string;
    }
  | {
      variant: "mp4";
      src: string;
      poster: string;
      title?: string;
    }
  | {
      variant: "embed";
      embedUrl: string;
      poster: string;
      title?: string;
    };

export default function VideoPlayer(props: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const title = props.title ?? "Przykładowy trening dla tancerzy";

  useEffect(() => {
    if (props.variant !== "hls" || !isPlaying) return;
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
      });
      hls.loadSource(props.src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = props.src;
      video.play().catch(() => {});
    }
  }, [props.variant, isPlaying, props]);

  if (props.variant === "mp4") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-neutral-900 shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
        <video
          controls
          playsInline
          preload="metadata"
          poster={props.poster}
          className="h-full w-full object-cover"
        >
          <source src={props.src} type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo HTML5.
        </video>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-neutral-900 shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label="Odtwórz trening"
          className="group relative block h-full w-full cursor-pointer text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand"
        >
          {/* Okładka ładowana priorytetowo (bez lazy loadingu – element LCP) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={props.poster}
            alt={title}
            width={1280}
            height={720}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />

          <span
            aria-hidden="true"
            className="absolute inset-0 bg-black/25 transition-colors duration-200 group-hover:bg-black/15"
          />

          {/* Centralny przycisk Play */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95 sm:h-20 sm:w-20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 h-7 w-7 sm:h-9 sm:w-9"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </span>
        </button>
      ) : props.variant === "hls" ? (
        <video
          ref={videoRef}
          controls
          playsInline
          autoPlay
          poster={props.poster}
          className="h-full w-full object-cover"
        >
          Twoja przeglądarka nie obsługuje odtwarzacza wideo HTML5.
        </video>
      ) : (
        <iframe
          src={`${props.embedUrl}${props.embedUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      )}
    </div>
  );
}
