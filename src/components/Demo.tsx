// @ts-nocheck
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { walls } from "./data";
import { useMyContext } from "../Context";

const Demo = () => {
  const { wall } = useMyContext();
  const objRef = useRef();

  const wallFilteredData = walls.filter((item) => {
    return item.id === wall;
  });
  const wallTiles = useTexture(wallFilteredData[0].image);
  wallTiles.repeat.set(13, 15);
  wallTiles.wrapS = THREE.RepeatWrapping;
  wallTiles.wrapT = THREE.RepeatWrapping;
  wallTiles.rotation = Math.PI / 2;

  const materials = useLoader(MTLLoader, `/MODEL DEMO/demo/SuperlooWall.mtl`);
  const obj = useLoader(
    OBJLoader,
    `/MODEL DEMO/demo/SuperlooWall.obj`,
    (loader) => {
      materials.preload(); // Preload the materials
      loader.setMaterials(materials); // Set the materials to the OBJLoader
    }
  );

  obj.children[0].material.map = wallTiles;

  obj.children[0].castShadow = true;
  obj.children[0].receiveShadow = true;

  return (
    <group
      castShadow
      receiveShadow
      // position={obj2.children[54].position}
      position-y={1}
      position-z={1.23}
      position-x={-0.25}
      // rotation={obj2.children[54].rotation}
      scale-y={0.82}
      scale-x={0.66}
      scale-z={0.55}
      rotation-y={-Math.PI / 2}
    >
      <mesh
        castShadow
        receiveShadow
        ref={objRef}
        geometry={obj.children[0].geometry}
        material={obj.children[0].material}
      >
        <meshStandardMaterial
          map={wallTiles}
          roughness={1}
          metalness={0.8}
          color={"white"}
        ></meshStandardMaterial>
      </mesh>
    </group>
  );
};

export default Demo;
