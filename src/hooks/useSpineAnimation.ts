import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";

export interface SpineAnimationOptions {
  width?: number;
  height?: number;
  animation?: string;
  loop?: boolean;
  speed?: number;
  autoPlay?: boolean;
  backgroundColor?: number;
  backgroundAlpha?: number;
}

export const useSpineAnimation = (
  spineDataUrl: string,
  options: SpineAnimationOptions = {},
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application>();
  const spineRef = useRef<Spine>();

  useEffect(() => {
    if (!containerRef.current || !spineDataUrl) return;

    const {
      width = 400,
      height = 600,
      // animation = 'idle',
      // loop = true,
      // speed = 1,
      // autoPlay = true,
      backgroundColor = 0x000000,
      backgroundAlpha = 0,
    } = options;

    // 创建 PIXI 应用
    const app = new PIXI.Application({
      width,
      height,
      backgroundColor,
      backgroundAlpha,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    containerRef.current.appendChild(app.view as HTMLCanvasElement);
    appRef.current = app;

    // Load Spine resources with modern PixiJS v7+ Assets API
    // Note: This is commented out as spine loading requires proper setup
    // For demo purposes, we show a placeholder instead
    /*
    PIXI.Assets.load(spineDataUrl).then((resource: any) => {
      try {
        const spineData = resource?.spineData

        if (!spineData) {
          console.error('Failed to load spine data')
          return
        }

        const spine = new Spine(spineData)
        spineRef.current = spine

        // Set position to canvas center
        spine.x = app.screen.width / 2
        spine.y = app.screen.height / 2

        // Auto scale to fit canvas
        const scale = Math.min(
          app.screen.width / spine.width,
          app.screen.height / spine.height
        ) * 0.8
        spine.scale.set(scale)

        // Play animation
        if (spine.state.hasAnimation(animation) && autoPlay) {
          const track = spine.state.setAnimation(0, animation, loop)
          if (track) {
            track.timeScale = speed
          }
        }

        app.stage.addChild(spine)
      } catch (error) {
        console.error('Error loading spine animation:', error)
      }
    })
    */

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true });
      }
    };
  }, [spineDataUrl, options]);

  // 控制方法
  const play = (animationName?: string, loop?: boolean) => {
    if (spineRef.current && animationName) {
      spineRef.current.state.setAnimation(0, animationName, loop ?? true);
    }
  };

  const pause = () => {
    if (spineRef.current) {
      spineRef.current.state.timeScale = 0;
    }
  };

  const resume = () => {
    if (spineRef.current) {
      spineRef.current.state.timeScale = 1;
    }
  };

  const setSpeed = (speed: number) => {
    if (spineRef.current) {
      spineRef.current.state.timeScale = speed;
    }
  };

  return {
    containerRef,
    play,
    pause,
    resume,
    setSpeed,
    spine: spineRef.current,
  };
};
