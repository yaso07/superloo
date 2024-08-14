// @ts-nocheck
import { MeshPortalMaterial, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
export default function Model() {
  const objRef = useRef();
  const materials = useLoader(
    MTLLoader,
    `${import.meta.env.VITE_MODEL_PATH2}/14.08.2024_Blank Superloo_Material Update_R0.mtl`
  );
  const tiles = useTexture(
    `${
      import.meta.env.VITE_MODEL_PATH2
    }/14.08.2024_Blank Superloo_Material Update_R0/_10.jpg`
  );

  const obj = useLoader(
    OBJLoader,
    `${import.meta.env.VITE_MODEL_PATH2}/14.08.2024_Blank Superloo_Material Update_R0.obj`,
    (loader) => {
      materials.preload(); // Preload the materials
      console.log(loader);
      loader.setMaterials(materials); // Set the materials to the OBJLoader
    }
  );

  //    obj.children[55].material.map=tiles
  //    obj.children[55].material;

  console.log(obj.children[55].material);
  if (obj.children[55]) {
    obj.children[55].material[0].map = tiles;
    obj.children[55].material[1].map = tiles;
  }
  console.log(obj.children[55]);
  //  return
  return (
    <>
      <primitive ref={objRef} object={obj} />;
      <mesh geometry={obj.children[55].geometry}>
        <meshStandardMaterial map={tiles}></meshStandardMaterial>
      </mesh>
      <mesh geometry={obj.children[36].geometry}>
        <meshStandardMaterial map={tiles}></meshStandardMaterial>
      </mesh>
      <mesh geometry={obj.children[38].geometry}>
        <meshStandardMaterial map={tiles}></meshStandardMaterial>
      </mesh>
    </>
  );
}
