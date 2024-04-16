import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeDObject = () => {
  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    document.getElementById('threejs').appendChild(renderer.domElement);

    // Create the black hole
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position.xyz * (1.0 + 0.1 * sin(time));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        void main() {
          float c = 0.2 / length(vUv - 0.5);
          gl_FragColor = vec4(vec3(c * sin(time)), 1.0);
        }
      `
    });
    const blackHole = new THREE.Mesh(geometry, material);
    scene.add(blackHole);

    // Position the camera
    camera.position.z = 15;

    // Animation loop
    const animate = (time) => {
      requestAnimationFrame(animate);
      material.uniforms.time.value = time / 1000; // Pass time to shader
      renderer.render(scene, camera);
    };
    animate(0);

    // Clean up
    return () => {
      scene.remove(blackHole);
      renderer.dispose();
    };
  }, []);

  return (
    <div id="threejs" />
  );
};

export default ThreeDObject;
