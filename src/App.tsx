// @ts-nocheck
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { PointLight } from "three";
import {
  OrbitControls,
  Shadow,
  SoftShadows,
  useHelper,
} from "@react-three/drei";
import { useControls } from "leva";
import Scene from "./components/Scene";

function LightScene(props: any) {
  const pointLightRef = useRef<PointLight>(null!);
  // useHelper(pointLightRef, PointLightHelper, 1,"red");
  const { distance, shadowBias } = useControls({
    intensity: { value: 50, max: 300, min: 0 },
    angle: { value: Math.PI / 6, min: 0, max: 20 },
    distance: { value: 7.2, min: 0, max: 20 },
    shadowBias: { value: -0.005, min: -0.999, max: -0.005 },
  });

  return (
    <>
      <pointLight
        castShadow
        scale={0.1}
        ref={pointLightRef}
        position={[0, 4, 0]}
        intensity={10}
        distance={distance}
        shadow-bias={shadowBias}
        // shadow-mapSize={2048}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1020}
        shadow-bottom={10}
        // shadow-radius={10}
        // angle={10}
        {...props}
      >
        {/* <orthographicCamera
          attach="shadow-camera"
          args={[-10, 9, -8, 10, 1.2, 10]}
        /> */}
      </pointLight>
    </>
  );
}

function DirectionalLight() {
  const ref = useRef<THREE.DirectionalLight>(null!);
  useHelper(ref, THREE.DirectionalLightHelper, 1, "red");

  return (
    <>
      <directionalLight
        color={"red"}
        castShadow
        intensity={10}
        ref={ref}
        scale={1}
        position={[0, 4, 1]}
      >
        {/* <ContactShadows
           opacity={1}
           scale={10}
           castShadow
           blur={1}
           far={10}
           smooth
           resolution={256}
           color="white"
         /> */}
      </directionalLight>
    </>
  );
}
function App() {
  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  });

  return (
    <>
      <Suspense fallback={<h1>loading</h1>}>
        <Canvas
          shadows
          camera={{ fov: 71, near: 0.75 }}
          style={{ height: "90vh", backgroundColor: "white" }}
        >
          {/* <ambientLight intensity={10} /> */}
          {/* <spotLight
          position={[1, 4.9, -4]}
          
          angle={90}
          penumbra={1}
          intensity={20}
        /> */}
          {/* <Environment background files="public/textures/1.hdr"></Environment> */}
          <group position={[0, -1.9, -1]}>
            <fog attach="fog" args={["black", 0, 40]} />
            {enabled && <SoftShadows {...config} />}
            <LightScene></LightScene>
            <LightScene
              castShadow={false}
              position={[0, 4, -0.5]}
              intensity={20}
            ></LightScene>
            <Shadow
              color="white"
              colorStop={0}
              opacity={0.5}
              fog={false} // Reacts to fog (default=false)
            />
            <LightScene
              castShadow={false}
              intensity={5}
              position={[0.1, -0.1, 1.2]}
            ></LightScene>

            {/* <DirectionalLight></DirectionalLight> */}
            {/* <Model position={[-1, 0, 2]} roughness={0} metalness={10} /> */}

            <Scene></Scene>
          </group>
          /*{" "}
          <group>
            {/* <mesh position={[0, 1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh> */}
            {/* <mesh scale-x={0.1} scale-y={0.7} rotation-y={1.50} >
            <planeGeometry args={[6, 6]}> </planeGeometry>
            <MeshReflectorMaterial
              // resolution={1024}
              color="gray"
              blur={[1000, 1000]}
              mixBlur={1}
              mirror={3}
              // mixStrength={1}
              depthToBlurRatioBias={0.5}
              // blur={[300, 100]}
              resolution={2048}
              // mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              // color="#050505"
              metalness={0.5}
            ></MeshReflectorMaterial>
          </mesh> */}
          </group>
          <OrbitControls></OrbitControls>
          {/* <axesHelper args={[5]} /> */}
          {/* <gridHelper></gridHelper> */}
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
