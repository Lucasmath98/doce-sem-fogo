import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlayerState = -1 | 0 | 1 | 2 | 3 | 5;

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

interface YouTubeEvent {
  data: PlayerState | number;
  target: YouTubePlayer;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          host: string;
          videoId: string;
          playerVars: Record<string, string | number>;
          events: {
            onReady: (event: YouTubeEvent) => void;
            onStateChange: (event: YouTubeEvent) => void;
            onError: () => void;
          };
        },
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | undefined;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    if (existing) {
      existing.addEventListener("error", () => reject(new Error("YouTube API unavailable")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.addEventListener("error", () => reject(new Error("YouTube API unavailable")), {
      once: true,
    });
    document.head.appendChild(script);
  });

  return apiPromise;
}

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function RecipeVideo({ videoId, title }: { videoId: string; title: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!started || !mountRef.current) return;
    let active = true;

    loadYouTubeApi()
      .then(() => {
        if (!active || !mountRef.current || !window.YT?.Player) return;
        playerRef.current = new window.YT.Player(mountRef.current, {
          host: "https://www.youtube-nocookie.com",
          videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            iv_load_policy: 3,
            fs: 0,
            disablekb: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: ({ target }) => {
              target.mute();
              target.playVideo();
              setReady(true);
              setPlaying(true);
              setMuted(true);
              setDuration(target.getDuration());
            },
            onStateChange: ({ data, target }) => {
              setPlaying(data === 1);
              setDuration(target.getDuration());
            },
            onError: () => setError(true),
          },
        });
      })
      .catch(() => setError(true));

    return () => {
      active = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [started, videoId]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setCurrentTime(player.getCurrentTime());
      setDuration(player.getDuration());
    }, 500);
    return () => window.clearInterval(timer);
  }, [ready]);

  const togglePlayback = () => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const toggleSound = () => {
    if (!playerRef.current) return;
    if (muted) playerRef.current.unMute();
    else playerRef.current.mute();
    setMuted(!muted);
  };

  const enterFullscreen = async () => {
    const container = containerRef.current;
    if (!container?.requestFullscreen) return;
    await container.requestFullscreen().catch(() => undefined);
  };

  return (
    <section className="mt-7" aria-labelledby="video-title">
      <h2 id="video-title" className="text-lg font-bold">
        Videoaula
      </h2>
      <div
        ref={containerRef}
        className="mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      >
        {error ? (
          <div className="flex aspect-video items-center justify-center px-6 text-center text-sm font-semibold text-muted-foreground">
            Vídeo indisponível no momento
          </div>
        ) : !started ? (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group relative block aspect-video w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Assistir videoaula: ${title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
              onError={() => setError(true)}
            />
            <span className="absolute inset-0 bg-cocoa-gradient opacity-35" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary-foreground">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary shadow-soft transition-transform group-hover:scale-105">
                <Play className="ml-1 size-7 fill-current" />
              </span>
              <span className="rounded-full bg-card/95 px-4 py-2 text-sm font-bold text-card-foreground shadow-card">
                Assistir videoaula
              </span>
            </span>
          </button>
        ) : (
          <>
            <div className="aspect-video bg-cocoa">
              <div ref={mountRef} className="h-full w-full" />
            </div>
            <div className="flex items-center gap-2 p-2.5">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={togglePlayback}
                disabled={!ready}
                aria-label={playing ? "Pausar videoaula" : "Reproduzir videoaula"}
              >
                {playing ? <Pause /> : <Play />}
              </Button>
              <span className="w-10 text-right text-[10px] tabular-nums text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  playerRef.current?.seekTo(value, true);
                  setCurrentTime(value);
                }}
                disabled={!ready}
                className="min-w-0 flex-1 accent-primary"
                aria-label="Progresso da videoaula"
              />
              <span className="w-10 text-[10px] tabular-nums text-muted-foreground">
                {formatTime(duration)}
              </span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={toggleSound}
                disabled={!ready}
                aria-label={muted ? "Ligar som" : "Desligar som"}
              >
                {muted ? <VolumeX /> : <Volume2 />}
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={enterFullscreen}
                aria-label="Abrir videoaula em tela cheia"
              >
                <Maximize />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}