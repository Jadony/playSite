import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";

interface SpinePlayerProps {
  jsonUrl?: string;
  atlasUrl?: string;
  pngUrl?: string;
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
  jsonUrl = "",
  atlasUrl = "",
  pngUrl = "",
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

    let isMounted = true;

    // init pixi app
    const app = new PIXI.Application({
      width,
      height,
      backgroundAlpha: 0, // transparent background
    });

    containerRef.current.appendChild(app.view as unknown as Node);
    appRef.current = app;

    // Load resources
    const loadResources = async () => {
      try {
        // Check if assets are already loaded
        const assetsToLoad = [];
        if (!PIXI.Assets.cache.has(jsonUrl)) assetsToLoad.push(jsonUrl);
        if (!PIXI.Assets.cache.has(atlasUrl)) assetsToLoad.push(atlasUrl);
        if (!PIXI.Assets.cache.has(pngUrl)) assetsToLoad.push(pngUrl);

        if (assetsToLoad.length > 0) {
          await PIXI.Assets.load(assetsToLoad);
        }

        if (!isMounted) return;

        // Retrieve resources from cache (pixi-spine will use them automatically)

        // If we have the raw JSON object, we might need to recreate the skeleton data
        // But usually PIXI.Assets with pixi-spine loader handles this if just the json path is loaded
        // However, here we are manually handling potential separate loads.

        // Simpler approach: Just use PIXI.Assets.load(jsonUrl) and let it resolve dependencies
        // But since we have specific URLs for atlas/png passed, we should ensure they are linked.
        // If the json file references the atlas relatively, strictly loading jsonUrl is enough.
        // Assuming standard export where json references atlas.

        let resource = PIXI.Assets.cache.get(jsonUrl);
        if (!resource) {
          // Fallback if not found in cache directly (shouldn't happen if loaded)
          resource = await PIXI.Assets.load(jsonUrl);
        }

        if (!isMounted) return;

        const spineData = resource?.spineData || resource;

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
      } catch (error) {
        console.error("Error loading spine assets:", error);
      }
    };

    loadResources();

    return () => {
      isMounted = false;
      if (appRef.current) {
        // Important: Do NOT destroy texture/baseTexture if they are cached by PIXI.Assets
        // Otherwise re-mounting will fail because the cache holds destroyed textures.
        appRef.current.destroy(true, {
          children: true,
          texture: false,
          baseTexture: false,
        });

        appRef.current = null;
        spineRef.current = null;
      }
    };
  }, [
    jsonUrl,
    atlasUrl, // Although we might only strictly need jsonUrl if it refs others, keeping them as deps is safer for updates
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
