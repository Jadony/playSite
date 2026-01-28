import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";

interface SpinePlayerProps {
  jsonUrl: string;
  atlasUrl: string;
  pngUrl: string;
  animationName?: string;
  loop?: boolean;
  width?: number;
  height?: number;
  scale?: number;
  playing?: boolean;
  offsetX?: number;
  offsetY?: number;
}

const SpinePlayer: React.FC<SpinePlayerProps> = ({
  jsonUrl,
  atlasUrl,
  pngUrl,
  animationName = "loop", // Default animation name
  loop = true,
  width = 300,
  height = 300,
  scale = 0.5,
  playing = true,
  offsetX = 0,
  offsetY = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const spineRef = useRef<Spine | null>(null);

  // Handle playing state changes
  useEffect(() => {
    if (spineRef.current) {
      spineRef.current.state.timeScale = playing ? 1 : 0;
    }
  }, [playing]);

  useEffect(() => {
    if (!containerRef.current) return;

    // init pixi app
    const app = new PIXI.Application({
      width,
      height,
      backgroundAlpha: 0, // transparent background
    });

    containerRef.current.appendChild(app.view as unknown as Node);
    appRef.current = app;

    // Load resources
    PIXI.Assets.load([jsonUrl, atlasUrl, pngUrl]).then((resources) => {
      // The loader returns a dictionary where keys are the URLs
      // However, for Spine, we specifically need the data linked to the atlas
      // If we loaded them properly, pixi-spine should handle the linking if assets are named consistently or if we handle the data manually.

      // A more robust way with standard Spine export (json + atlas + png) using PIXI.Assets is often just loading the JSON if paths are relative,
      // OR explicitly providing the atlas.

      // Let's try loading just the JSON, assuming the atlas and png are in the same location and referenced correctly in the json/atlas files.
      // But since we provided URLs, let's look at the resource object associated with the JSON url.

      const spineData = resources[jsonUrl]?.spineData;

      if (spineData) {
        const spine = new Spine(spineData);

        // Centering with offsets
        spine.x = width / 2 + offsetX;
        spine.y = height / 2 + offsetY;
        spine.scale.set(scale);

        if (animationName) {
          try {
            spine.state.setAnimation(0, animationName, loop);
          } catch (e) {
            console.warn(
              `Animation ${animationName} not found, playing first available if any.`,
            );
            // Fallback: play the first animation found
            const animations = spineData.animations;
            if (animations && animations.length > 0) {
              spine.state.setAnimation(0, animations[0].name, loop);
            }
          }
        }

        // Initial playing state
        spine.state.timeScale = playing ? 1 : 0;

        app.stage.addChild(spine);
        spineRef.current = spine;
      } else {
        console.error("Failed to load Spine data from:", jsonUrl);
      }
    });

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, {
          children: true,
          texture: true,
          baseTexture: true,
        });
        appRef.current = null;
        spineRef.current = null;
      }
    };
  }, [
    jsonUrl,
    atlasUrl,
    pngUrl,
    animationName,
    loop,
    width,
    height,
    scale,
    offsetX,
    offsetY,
  ]); // Removed playing from dependency to avoid re-creation

  return <div ref={containerRef} />;
};

export default SpinePlayer;
