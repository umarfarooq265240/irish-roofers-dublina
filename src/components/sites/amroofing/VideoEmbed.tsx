"use client";

import { useState } from "react";

const VIDEO_ID = "h0yQVoRMyF8";

/** YouTube video that only loads the player (and YouTube's cookies) after a click. */
export function VideoEmbed({ channelUrl }: { channelUrl: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="ir-video">
      <div className="ir-video-frame">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
            title="Irish Roofers Dublin: our roofing work on video"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className="ir-video-play" onClick={() => setPlay(true)} aria-label="Play video: Irish Roofers Dublin at work">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sites/irishroofers/gallery/video-poster.jpg" width={480} height={360} alt="" decoding="async" />
            <span className="ir-video-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <p className="ir-video-note">
        Prefer YouTube? <a href={channelUrl} target="_blank" rel="noopener noreferrer">Visit our YouTube channel</a>.
      </p>
    </div>
  );
}
