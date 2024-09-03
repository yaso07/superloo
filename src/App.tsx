// @ts-nocheck
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { Suspense, useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";
import * as THREE from "three";
import {
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
} from "three";
import {
  Box,
  ContactShadows,
  Environment,
  OrbitControls,
  PointerLockControls,
  Shadow,
  Sphere,
  useHelper,
} from "@react-three/drei";
import Model from "./components/Model";
import Texture from "./components/Texture";
import { rotate } from "three/webgpu";
import PointerControls from "./components/PointerLock";
import Demo from "./components/Demo";

function SpotLightScene(props: any) {
  const spotLightRef = useRef<SpotLight>(null!);
  // useHelper(spotLightRef, SpotLightHelper, "cyan");
  // const { distance, shadowBias } = useControls({
  //   intensity: { value: 50, max: 300, min: 0 },
  //   angle: { value: Math.PI / 6, min: 0, max: 20 },
  //   distance: { value: 7.2, min: 0, max: 20 },
  //   shadowBias: { value: -0.005, min: -0.999, max: -0.005 },
  // });

  return (
    <>
      <spotLight
        castShadow
        intensity={20}
        ref={spotLightRef}
        angle={1.9}
        position={[0, 4.28, 1]}
        distance={10}
        rotation={[0, 2, 3]}
        shadow-bias={-0.001}
        shadow-mapSize={2048}
        power={6}
        {...props}
      >
        {/* <orthographicCamera
          attach="shadow-camera"
          args={[-10, 9, -8, 10, 1.2, 10]}
        /> */}
      </spotLight>
    </>
  );
}
function LightScene(props: any) {
  const pointLightRef = useRef<PointLight>(null!);
  // useHelper(pointLightRef, PointLightHelper, 1, "red");
  // const { distance, shadowBias } = useControls({
  //   intensity: { value: 50, max: 300, min: 0 },
  //   angle: { value: Math.PI / 6, min: 0, max: 20 },
  //   distance: { value: 7.2, min: 0, max: 20 },
  //   shadowBias: { value: -0.005, min: -0.999, max: -0.005 },
  // });

  return (
    <>
      <pointLight
        receiveShadow={false}
        scale={0.1}
        ref={pointLightRef}
        position={[0.2, 3, -0.5]}
        intensity={1}
        distance={7.2}
        shadow-bias={-0.001}
        shadow-mapSize={2048}
        // shadow-mapSize-width={1024}
        // shadow-mapSize-height={1020}
        shadow-bottom={10}
        shadow-radius={10}
        angle={10}
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

// function DirectionalLight() {
//   const ref = useRef<THREE.DirectionalLight>(null!);
//   useHelper(ref, THREE.DirectionalLightHelper, 1, "red");

//   return (
//     <>
//       <directionalLight
//         color={"red"}
//         castShadow
//         intensity={10}
//         ref={ref}
//         scale={1}
//         position={[0, 4, 1]}
//       >
//         {/* <ContactShadows
//            opacity={1}
//            scale={10}
//            castShadow
//            blur={1}
//            far={10}
//            smooth
//            resolution={256}
//            color="white"
//          /> */}
//       </directionalLight>
//     </>
//   );
// }
function App() {
  // const { enabled, ...config } = useControls({
  //   enabled: true,
  //   size: { value: 25, min: 0, max: 100 },
  //   focus: { value: 0, min: 0, max: 2 },
  //   samples: { value: 10, min: 1, max: 20, step: 1 },
  // });
  const renderer = useRef(!null);
  // renderer.current.outputEncoding=THRE
  return (
    <>
      <div style={{ display: "flex" }}>
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HashLoader color="#6DC6AE" />
            </div>
          }
        >
          <Canvas
            ref={renderer}
            id="canvas"
            shadows
            camera={{ position: [1.6, 0, 3.5], near: 0.1, far: 100, fov: 80 }}
            style={{ height: "100vh", width: "100%", backgroundColor: "black" }}
          >
            <ambientLight intensity={1.7} />
            {/* <spotLight
          position={[1, 4.9, -4]}
          
          angle={90}
          penumbra={1}
          intensity={20}
        /> */}
            {/* <Environment background files="public/textures/1.hdr"></Environment> */}
            {/* position={[-0.3, -2.4, -0.5]} */}
            <group castShadow receiveShadow position={[0.5, -1.8, 0]}>
              <fog attach="fog" args={["black", 0, 40]} />
              {/* {enabled && <SoftShadows {...config} />} */}
              {/* <LightScene
                position={[0.2, 3.5, -0.5]}
                power={10}
                castShadow
              ></LightScene>
              <LightScene 
              position={[0.2, 2.5, -0.5]}
              castShadow></LightScene> */}
              {/* <LightScene
                castShadow={false}
                position={[0.2, 2.5, 0.5]}
                intensity={1.5}
              ></LightScene> */}

              <Shadow
                color="white"
                colorStop={0}
                opacity={0.5}
                fog={false} // Reacts to fog (default=false)
              />
              {/* <LightScene
                castShadow
                intensity={1}
                position={[0.137, 3, -0.1]}
              ></LightScene> */}
              <LightScene
                castShadow={false}
                intensity={3}
                position={[0, 2, 3.5]}
              ></LightScene>
              {/* <LightScene intensity={1} position={[0.5, 0.9, 1]}></LightScene> */}
              <group>
                {/* <LightScene
                  intensity={0.4}
                  position={[0.3, 1.4, -0.5]}
                ></LightScene> */}
                {/* <LightScene
                  intensity={0.2}
                  position={[-0.2, 0.8, -0.5]}
                ></LightScene> */}
                {/* <LightScene
                  intensity={0.3}
                  position={[-0.01, 0.6, -0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.3}
                  position={[0.6, 0.6, -0.5]}
                ></LightScene> */}
                {/* <LightScene
                  intensity={0.1}
                  position={[0.8, 0.8, -0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.4}
                  position={[0.3, 0.6, 0.3]}
                ></LightScene> */}
                <LightScene
                  intensity={0.6}
                  position={[0.2, 0.8, 0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[0.3, 0.8, 1.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[0.2, 0.8, 1.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[0.3, 0.8, 2.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[-0.4, 0.8, 2.5]}
                ></LightScene>
                <SpotLightScene
                  castShadow={false}
                  position={[0.7, 3.5, 2.9]}
                  angle={1.6}
                  intensity={5}
                ></SpotLightScene>
                <SpotLightScene
                  castShadow={false}
                  position={[0.8, 4.5, -1.7]}
                  angle={0.7}
                  intensity={10}
                ></SpotLightScene>
                {/* <SpotLightScene
                  castShadow={false}
                  position={[-1, 4, 17]}
                  angle={0.2}
                  distance={100}
                  intensity={400}
                ></SpotLightScene> */}
                {/* <SpotLightScene
                  castShadow={false}
                  position={[-0.5, 2, 3]}
                  angle={1.3}
                  intensity={10}
                ></SpotLightScene> */}
              </group>
              {/* <group>
                <LightScene
                  intensity={0.2}
                  position={[-0.5, 2.5, -0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.3}
                  position={[0.4, 2.5, -0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.9}
                  position={[0.4, 2.5, 0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.9}
                  position={[-0.5, 2.5, 0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.9}
                  position={[0.4, 2.5, 1.5]}
                ></LightScene>
                <LightScene
                  intensity={0.4}
                  position={[-0.5, 2.5, 1.5]}
                ></LightScene>
                <LightScene
                  intensity={0.9}
                  position={[0.4, 2.5, 2.5]}
                ></LightScene>
                <LightScene
                  intensity={0.9}
                  position={[-0.5, 2.5, 2.5]}
                ></LightScene>
              </group> */}
              {/* <group>
                <LightScene
                 
                  intensity={0.2}
                  position={[-0.5, 3.2, -0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[0.4, 3.2, -0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[0.4, 3.2, 0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[-0.5, 3.2, 0.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[0.4, 3.2, 1.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[-0.5, 3.2, 1.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[0.4, 3.2, 2.5]}
                ></LightScene>
                <LightScene
                  intensity={0.2}
                  position={[-0.5, 3.2, 2.5]}
                ></LightScene>
              </group> */}
              {/* <DirectionalLight></DirectionalLight> */}
              {/* <Model position={[-1, 0, 2]} roughness={0} metalness={10} /> */}
              {/* <Scene></Scene> */}
              <SpotLightScene></SpotLightScene>

              <Model></Model>
              <Demo></Demo>
              {/* <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 2]}></boxGeometry>
                <meshStandardMaterial
                  roughness={1}
                  metalness={1}
                ></meshStandardMaterial>
              </mesh> */}
              {/* <CameraRig></CameraRig> */}
            </group>
            {/* <PointerControls /> */}
            <OrbitControls
              enableDamping
              enablePan={false}
              zoomSpeed={0.5}
              rotateSpeed={0.2}
            ></OrbitControls>
            {/* {/* <axesHelper args={[10]} /> */}
            {/* <gridHelper></gridHelper>  */}
          </Canvas>
        </Suspense>

        <Texture></Texture>
      </div>
    </>
  );
}

const CameraRig = () => {
  const { camera } = useThree();
  camera.position.set(0.7, 1.1, 1.8); // Set camera height to eye level (1.6 meters above the ground)

  useFrame(() => {
    camera.add;
  });
  return null;
};
export default App;
