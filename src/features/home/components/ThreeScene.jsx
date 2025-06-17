import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useMediaQuery } from "react-responsive";

function BrainModel({ scale }) {
  const gltf = useLoader(GLTFLoader, "/models/brain.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={ref} scale={scale} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    controls.current.enableZoom = false;
    controls.current.enablePan = false;
    return () => controls.current.dispose();
  }, [camera, gl]);

  useFrame(() => controls.current?.update());
  return null;
}

export default function ThreeScene() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const modelScale = isMobile ? 1 : 1.5;

  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 50, near: 0.1, far: 1000 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <BrainModel scale={modelScale} />
      <Controls />
    </Canvas>
  );
}
