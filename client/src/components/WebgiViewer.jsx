import React, { useRef, useState, useCallback, useEffect } from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    GammaCorrectionPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    CanvasSnipperPlugin,
} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "./lib/scroll-animation"; 

gsap.registerPlugin(ScrollTrigger);

function WebgiViewer() {
    const canvasRef = useRef();

    const memorizedScrollAnimation = useCallback(
        (position, target, onUpdate) => {
            if (position && target && onUpdate) {
                scrollAnimation(position, target, onUpdate);
            }
        }, []
    );

    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        });

        const manager = await viewer.addPlugin(AssetManagerPlugin);

        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;

        await viewer.addPlugin(GBufferPlugin);
        await viewer.addPlugin(new ProgressivePlugin(32));
        await viewer.addPlugin(new TonemapPlugin(true));
        await viewer.addPlugin(GammaCorrectionPlugin);
        await viewer.addPlugin(SSRPlugin);
        await viewer.addPlugin(SSAOPlugin);
        await viewer.addPlugin(BloomPlugin);
        await viewer.addPlugin(CanvasSnipperPlugin)

        viewer.renderer.refreshPipeline();
        
        await manager.addFromPath("/src/assets/jhin.glb");
        
        viewer.getPlugin(TonemapPlugin).uiConfig.clipBackground = true;
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

        window.scrollTo(0, 0);

        let needsUpdate = true;

        const onUpdate = () => {
            needsUpdate = true;
            viewer.setDirty();
        };

        viewer.addEventListener("preFrame", () => {
            if (needsUpdate) {
                camera.positionTargetUpdated(true);
                needsUpdate = false;
            }
        });

        memorizedScrollAnimation(position, target, onUpdate);
    }, []);

    useEffect(() => {
        setupViewer();
    }, [setupViewer]);

    return (
        <div id="webgi-canvas-container" style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
            <canvas id="webgi-canvas" ref={canvasRef}  />
        </div>
    );
}

export default WebgiViewer;
