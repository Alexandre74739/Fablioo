"use client";

import { useEffect, useRef } from "react";

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  greenThreshold?: number;
}

export default function ChromaKeyVideo({
  src,
  className,
  greenThreshold = 90,
}: ChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let frameId: number;

    const draw = () => {
      if (video.videoWidth && video.videoHeight) {
        if (
          canvas.width !== video.videoWidth ||
          canvas.height !== video.videoHeight
        ) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        // Le vert de fond (chroma key) est retiré pixel par pixel : on
        // détecte sa dominance plutôt qu'une couleur exacte, pour absorber
        // la compression vidéo et l'anti-aliasing des contours.
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (g > greenThreshold && g > r * 1.15 && g > b * 1.15) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      if (!video.ended) {
        frameId = requestAnimationFrame(draw);
      }
    };

    video.playbackRate = 1;
    video.play().catch(() => {});
    frameId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(frameId);
  }, [greenThreshold]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        autoPlay
        playsInline
        className="hidden"
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
}
