// @ts-nocheck
import {
  CubeCamera,
  MeshPortalMaterial,
  MeshReflectorMaterial,
  RoundedBox,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useMyContext } from "../Context";
import { floors, vanityImages, walls } from "../components/data";
import { Reflector } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
export default function Model() {
  const { floor, vanity } = useMyContext();
  const floorFilteredData = floors.filter((item) => {
    return item.id === floor;
  });
  const wallFilteredData = walls.filter((item) => {
    return item.id === 1;
  });
  const vanityFilteredData = vanityImages.filter((item) => {
    return item.id === vanity;
  });
  // 41,46,49
  const panel = useTexture(`/MODEL DEMO/demo/Brass_01__Stainless.png`);
  const floorTiles = useTexture(floorFilteredData[0].image);

  floorTiles.repeat.set(1, 1);
  floorTiles.wrapS = THREE.RepeatWrapping;
  floorTiles.wrapT = THREE.RepeatWrapping;
  const wallTiles = useTexture(wallFilteredData[0].image);
  wallTiles.repeat.set(2, 1);
  wallTiles.rotation = Math.PI;
  wallTiles.wrapS = THREE.RepeatWrapping;
  wallTiles.wrapT = THREE.RepeatWrapping;
  wallTiles.magFilter = THREE.LinearFilter;
  wallTiles.minFilter = THREE.LinearFilter;
  const vanityTiles = useTexture(vanityFilteredData[0].image);

  vanityTiles.repeat.set(2, 2);
  vanityTiles.wrapS = THREE.RepeatWrapping;
  vanityTiles.wrapT = THREE.RepeatWrapping;

  // const mirror = useTexture(
  //   `${import.meta.env.VITE_MODEL_PATH2}/demo/Mirror_01.jpg`
  // );
  // mirror.repeat.set(2, 2);

  const objRef = useRef();
  const materials = useLoader(
    MTLLoader,
    `/MODEL DEMO/14.08.2024_Blank Superloo_Material Update_R0.mtl`
  );
  const tiles = useTexture(`/MODEL DEMO/demo/_1.jpg`);
  const steel = useTexture(`/MODEL DEMO/demo/Brass_01__Stainless.png`);
  const obj = useLoader(
    OBJLoader,
    `/MODEL DEMO/14.08.2024_Blank Superloo_Material Update_R0.obj`,
    (loader) => {
      materials.preload(); // Preload the materials
      console.log(loader);
      loader.setMaterials(materials); // Set the materials to the OBJLoader
    }
  );
  //    obj.children[55].material.map=tiles
  //    obj.children[55].material;
  // [45].forEach((item) => {
  //   obj.children[item].material.map = tiles;
  //   obj.children[item].material.reflectivity = 1;
  //   obj.children[item].material.shininess = 1;
  // });
  obj.children[54] = new THREE.Mesh();
  obj.children[54].name = "wall";
  console.log(obj.children[54]);
  obj.children.map((item) => {
    if (item.name != "wall") {
      item.castShadow = true;
      item.receiveShadow = true;
    }
  });

  // if (obj.children[54]) {
  //   obj.children[54].material[0].map = wallTiles;
  //   obj.children[54].material[1].map = wallTiles;

  //   console.log(obj.children[13]);
  // }
  if (obj.children[13]) {
    obj.children[13].material[0].map = floorTiles;
    obj.children[13].material[1].map = floorTiles;
    obj.children[13].material[1].map.color = "white";
    console.log(obj.children[13]);
  }
  if (obj.children[34]) {
    obj.children[34].material.map = vanityTiles;
    obj.children[34].material.needsUpdate = true;
    // obj.children[13].material[1].map.color = "white";
    console.log(obj.children[34]);
  }
  obj.children[17].material.reflectivity = 1;
  obj.children[17].material.shininess = 100;
  obj.children[41].material.reflectivity = 1;
  obj.children[41].material.shininess = 500;

  console.log(obj.children[41]);
  const mesh: any = [55, 36, 38, 39];
  const panels = [32, 33, 50, 51, 52, 35, 53];

  // panels.forEach((elem) => {
  //   obj.children[elem].material.map = panel;
  //   obj.children[elem].material.reflectivity = 1;
  //   obj.children[elem].material.shininess = 40;
  // });
  mesh.forEach((elem) => {
    obj.children[elem].material.map = tiles;
    // obj.children[elem].material.map.color = "white";
  });

  const cubeCameraRef = useRef();
  useHelper(cubeCameraRef, THREE.CameraHelper, "red");
  useFrame(() => {
    if (cubeCameraRef.current) {
      cubeCameraRef.current.update();
    }
  });
  console.log(obj.children[38]);
  const shape = new THREE.Shape();

  const width = 0.79; // Width of the mirror
  const height = 1.745; // Height of the mirror
  const radius = 0.48; // Radius for rounded corners

  shape.moveTo(-width / 2 + radius, -height / 2);
  shape.lineTo(width / 2 - radius, -height / 2);
  shape.quadraticCurveTo(
    width / 2.2,
    -height / 1.92,
    width / 1.92,
    -height / 1.92 + radius
  );
  shape.lineTo(width / 2, height / 2 - radius);
  shape.quadraticCurveTo(
    width / 2.53,
    height / 1.9,
    width / 2 - radius,
    height / 2
  );
  shape.lineTo(-width / 2 + radius, height / 2);
  shape.quadraticCurveTo(
    -width / 2.53,
    height / 1.92,
    -width / 1.92,
    height / 1.92 - radius
  );
  shape.lineTo(-width / 2, -height / 2 + radius);
  shape.quadraticCurveTo(
    -width / 2.53,
    -height / 1.92,
    -width / 1.92 + radius,
    -height / 2
  );

  const extrudeSettings = {
    depth: 0, // Thickness of the mirror
    bevelEnabled: false,
  };

  const { scene, camera } = useThree();

  // Create references for meshes
  const glowingSphere = useRef();

  useEffect(() => {
    // Assign layer 1 to the glowingSphere
    glowingSphere.current.layers.set(0);
    // Assign layer 0 (default) to the regularBox

    // Ensure the camera renders both layers
    camera.layers.enable(1);
  }, [camera]);

  return (
    <>
      <group castShadow receiveShadow position={[-1, 0, 2]} scale={0.0017}>
        <EffectComposer>
          <DepthOfField focusDistance={2} focalLength={2} bokehScale={0} />
          <Bloom intensity={0} luminanceThreshold={10} />
          <Vignette eskil={false} offset={0} darkness={-0.5} />
        </EffectComposer>
        <primitive ref={objRef} object={obj} />
        {mesh.map((item: any) => {
          return (
            <mesh geometry={obj.children[item].geometry}>
              <meshStandardMaterial
                roughness={0.8}
                metalness={0.7}
                map={tiles}
              ></meshStandardMaterial>
            </mesh>
          );
        })}
        {panels.map((item: any) => {
          return (
            <mesh geometry={obj.children[item].geometry}>
              <meshStandardMaterial
                roughness={0.8}
                metalness={0.2}
                map={panel}
              ></meshStandardMaterial>
            </mesh>
          );
        })}
        <mesh geometry={obj.children[38].geometry}>
          <meshPhongMaterial map={tiles}></meshPhongMaterial>
        </mesh>
        <mesh receiveShadow geometry={obj.children[34].geometry}>
          <meshStandardMaterial
            roughness={1}
            map={vanityTiles}
          ></meshStandardMaterial>
        </mesh>
        <mesh ref={glowingSphere} geometry={obj.children[4].geometry}>
          <meshStandardMaterial emissive="white" emissiveIntensity={2} />
        </mesh>
        <mesh ref={glowingSphere} geometry={obj.children[2].geometry}>
          <meshStandardMaterial emissive="white" emissiveIntensity={4} />
        </mesh>
        <mesh receiveShadow geometry={obj.children[13].geometry}>
          <meshStandardMaterial
            map={floorTiles}
            metalness={0.9}
            roughness={0.3}
          ></meshStandardMaterial>
        </mesh>

        <mesh receiveShadow castShadow geometry={obj.children[56].geometry}>
          <meshStandardMaterial
            roughness={0}
            metalness={0.8}
            emissive={"white"}
            emissiveIntensity={0.7}
          ></meshStandardMaterial>
        </mesh>
        <mesh receiveShadow castShadow geometry={obj.children[57].geometry}>
          <meshStandardMaterial
            roughness={0.8}
            metalness={1}
            emissive={"white"}
            emissiveIntensity={0.6}
          ></meshStandardMaterial>
        </mesh>

        {/* <mesh geometry={obj.children[41].geometry}>
          <meshStandardMaterial
            map={steel}
            metalness={0.8}
            roughness={0}
          ></meshStandardMaterial>
        </mesh> */}

        <mesh receiveShadow geometry={obj.children[7].geometry}>
          <meshStandardMaterial
            roughness={1}
            metalness={0.5}
            emissive={"white"}
            emissiveIntensity={0.15}
          ></meshStandardMaterial>
        </mesh>

        <mesh receiveShadow geometry={obj.children[8].geometry}>
          <meshStandardMaterial
            roughness={1}
            metalness={0.2}
            color={"white"}
            emissive={"white"}
            emissiveIntensity={0.15}
          ></meshStandardMaterial>
        </mesh>
        {/* <mesh geometry={obj.children[39].geometry}>
          <meshPhongMaterial map={tiles}></meshPhongMaterial>
        </mesh> */}
        {/* <mesh geometry={obj.children[17].geometry}>
          <meshPhongMaterial map={steel}></meshPhongMaterial>
        </mesh> */}
        {/* {panels.map((item) => {
          return (
            <mesh geometry={obj.children[item].geometry}>
              <meshPhongMaterial
                reflectivity={1}
                shininess={50}
                map={panel}
              ></meshPhongMaterial>
            </mesh>
          );
        })} */}
        <mesh
          position={[1.5, 4, 0]}
          geometry={obj.children[16].geometry}
          material={obj.children[16].material}
        >
          {/* <MeshReflectorMaterial
            // resolution={1024}

            blur={[1000, 1000]}
            mixBlur={1}
            mirror={3}
            // mixStrength={1}
            // depthToBlurRatioBias={0.5}
            // blur={[300, 100]}
            resolution={2048}
            // mixBlur={1}
            mixStrength={1}
            // roughness={1}
            depthScale={2}
            minDepthThreshold={0.4}
            maxDepthThreshold={0.4}
            // color="#050505"
            // metalness={0.5}
          ></MeshReflectorMaterial> */}
          {/* <meshPhongMaterial reflectivity={1} shininess={100} ></meshPhongMaterial> */}
        </mesh>
      </group>

      {/* <mesh position={[0, 2, 1]}>
        <boxGeometry args={[1, 1]}></boxGeometry>
        <meshStandardMaterial
          roughness={0}
          metalness={1}
        ></meshStandardMaterial>
      </mesh> */}
      <mesh
        position={[-1.13, 2.92, 0.523]}
        rotation-y={1.57}
        rotation-x={-0.025}
        scale-y={0.76}
      >
        <extrudeGeometry attach="geometry" args={[shape, extrudeSettings]} />
        <MeshReflectorMaterial
          // resolution={1024}

          blur={[1000, 1000]}
          mixBlur={1}
          mirror={3}
          // mixStrength={1}
          // depthToBlurRatioBias={0.5}
          // blur={[300, 100]}
          resolution={2048}
          // mixBlur={1}
          mixStrength={1}
          // roughness={1}
          depthScale={2}
          minDepthThreshold={0.4}
          maxDepthThreshold={0.4}
          // color="#050505"
          // metalness={0.5}
        ></MeshReflectorMaterial>
      </mesh>

      {/* <mesh ref={mesh} geometry={OvalGeometry(2, 4)}>
        <meshStandardMaterial color="#c0c0c0" metalness={0.6} roughness={0.1} />
      </mesh> */}
    </>
  );
}

function Scene() {
  const { scene, camera } = useThree();

  // Create references for meshes
  const glowingSphere = useRef();
  const regularBox = useRef();

  useEffect(() => {
    // Assign layer 1 to the glowingSphere
    glowingSphere.current.layers.set(1);
    // Assign layer 0 (default) to the regularBox
    regularBox.current.layers.set(0);

    // Ensure the camera renders both layers
    camera.layers.enable(1);
  }, [camera]);

  return (
    <>
      {/* Glowing Sphere - Will have bloom */}
      {/* <Sphere ref={glowingSphere} args={[1, 1, 2]} position={[-0.4, 2, 0]}>
        <meshStandardMaterial emissive="white" emissiveIntensity={2} />
      </Sphere> */}

      {/* Regular Box - Will not have bloom */}
      {/* <Box ref={regularBox} args={[1, 1, 1]} position={[2, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Box> */}

      {/* Lighting */}
    </>
  );
}
