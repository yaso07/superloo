// @ts-nocheck
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import * as THREE from "three";

const Scene = (props: any) => {

  console.log(import.meta.env);
  const wallGltf = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/wall left.gltf`);

  const colorMap = useTexture(
    `${import.meta.env.VITE_TEXTURE_PATH}/Polyrey - B206 - Bleu Encre.jpg`
  );
  const tiles = useTexture(`${import.meta.env.VITE_TEXTURE_PATH}/dekton.jpg`);
  const panelsTexture = useTexture(
    `${import.meta.env.VITE_TEXTURE_PATH}/Polyrey - O100 - OR BROSSÉ.jpg`
  );
  //  wallGltf.scene.traverse((child) => {
  //    if (child.isMesh) {
  //      child.material.map = colorMap;
  //      child.material.needsUpdate = true;
  //    }
  //  });
  const wallRightGltf = useLoader(
    GLTFLoader,
    `${import.meta.env.VITE_MODEL_PATH}/wall right.gltf`
  );
  //  wallRightGltf.scene.traverse((child) => {
  //    if (child.isMesh) {
  //      child.material.map = colorMap;
  //      child.material.needsUpdate = true;
  //    }
  //  });

  const floor = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/floor.gltf`);
  const toilet = useLoader(
    GLTFLoader,
    `${import.meta.env.VITE_MODEL_PATH}/toilet bowl and top.gltf`
  );
  let vaniety = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/vanity.gltf`);
  const underVanity = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/under panel.gltf`)
  underVanity.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = panelsTexture;
      child.material.needsUpdate = true;
      // child.material.roughness = 0;
      // child.material.metalness = 0.5;
    }
  });
  const vanityStand = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/vanity stand.gltf`);
  const upStand = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/upstand.gltf`);
  upStand.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = colorMap;
      child.material.needsUpdate = true;
      // child.material.roughness = 0;
      // child.material.metalness = 0.5;
    }
  });
  const toiletSeat = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/toilet seat.gltf`);

  const mirror = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/mirror.gltf`);
  console.log(mirror);
  const newMirror = new THREE.BufferGeometry();

  var mesh;
  mirror.scene.traverse((child) => {
    if (child.isMesh) {
      // child.material.map = tiles;
      // child.material.needsUpdate = true;
      // child.material.roughness = 0;
      // child.material.metalness = 0.5;
      console.log(child);
      // geometry=child.geometry
      // position=child.position
      // parent=child.parent
      // uid=child.uuid
      newMirror.setAttribute("position", child.geometry.attributes.position);
      // newMirror.setAttribute("normal",child.geometry.attributes.normal)
      child.parent.userData.isReflective = true;
      child.geometry.userData.isReflective = true;
      mesh = child;
    }
  });
  console.log(newMirror);
  console.log(mesh);
  const backPanels = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/back panels.gltf`);
  const backWall = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/back wall.gltf`);
  const ceiling = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/ceiling.gltf`);
  const panels = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/panel.gltf`);
  panels.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = panelsTexture;
      child.material.needsUpdate = true;
      child.material.roughness = 0;
      child.material.metalness = 0.5;
    }
  });
  const waterTab = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/water tab.gltf`);
  const accessPanel = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/access panel.gltf`);
  const soapDispenser = useLoader(
    GLTFLoader,
    `${import.meta.env.VITE_MODEL_PATH}/soap dispenser.gltf`
  );
  const handDryer = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/hand dryer.gltf`);
  const tolietRollHanlder = useLoader(
    GLTFLoader,
    `${import.meta.env.VITE_MODEL_PATH}/toilet roll handler.gltf`
  );
  const toiletPaper = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/toilet paper.gltf`);
  const flushValve = useLoader(GLTFLoader, `${import.meta.env.VITE_MODEL_PATH}/flush valve.gltf`);
  backPanels.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = colorMap;
      child.material.needsUpdate = true;
      child.material.roughness = 0;
      child.material.metalness = 0.5;
    }
  });
  toilet.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.roughness = 0;
      child.material.metalness = 0.5;

      toilet.materials.needsUpdate = true;
    }
  });

  console.log(toilet);
  floor.nodes["3DGeom-19"].receiveShadow = true;
  handDryer.nodes["3DGeom-24"].castShadow = true;
  wallGltf.nodes["3DGeom-34"].receiveShadow = true;
  wallGltf.scene.traverse((child) => {
    if (child.isMesh) {
      // @ts-ignore
      child.material.needsUpdate = true;
      child.material.roughness = 0;
      child.material.metalness = 0.5;
    }
  });
  vaniety.nodes["3DGeom-29"].receiveShadow = true;
  vaniety.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = tiles;
      child.material.needsUpdate = true;
      child.material.roughness = 0;
      child.material.metalness = 0.5;
    }
  });
  console.log(vaniety);
  // vaniety.nodes["3DGeom-29"].castShadow = true;
  waterTab.nodes["3DGeom-36"].castShadow = true;
  waterTab.nodes["3DGeom-37"].castShadow = true;
  waterTab.nodes["3DGeom-38"].castShadow = true;
  toiletPaper.nodes["3DGeom-13"].castShadow = true;
  wallRightGltf.nodes["3DGeom-12"].receiveShadow = true;
  tolietRollHanlder.nodes["3DGeom-15"].castShadow = true;
  tolietRollHanlder.nodes["3DGeom-16"].castShadow = true;
  tolietRollHanlder.nodes["3DGeom-18"].castShadow = true;
  soapDispenser.nodes["3DGeom-41"].castShadow = true;
  soapDispenser.nodes["3DGeom-42"].castShadow = true;
  soapDispenser.nodes["3DGeom-45"].castShadow = true;

  soapDispenser.nodes["3DGeom-41"].receiveShadow = true;
  soapDispenser.nodes["3DGeom-42"].receiveShadow = true;
  soapDispenser.nodes["3DGeom-45"].receiveShadow = true;
  accessPanel.nodes["3DGeom-35"].receiveShadow = true;
  accessPanel.nodes["3DGeom-35"].castShadow = true;
  vanityStand.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = colorMap;
      child.material.needsUpdate = true;
      child.material.roughness = 0;
      child.material.metalness = 0.5;
    }
  });
  toiletSeat.nodes["3DGeom-3"].castShadow = true;
  //  mirror.scene.traverse((child) => {

  //      child.material.roughness = 0;
  //      child.material.metalness = 0.5;

  //  });
  handDryer.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = panelsTexture;
      child.material.needsUpdate = true;
    }
  });
  //  mirror.scene.traverse((child) => {
  //    if (child.isMesh) {
  //      child.material.roughness=0;
  //      child.material.metalness=0.9
  //      child.material.needsUpdate = true;
  //    }
  //  });
  console.log(mirror);

  return (
    <>
      <group position={[-1, 0, 2]}>
        {/* <mesh
         
          parent={mesh.parent}
          // position={[0.3, 2, -2]}
          position={mesh.position}
          scale={0.5}
          // rotation-x={0}
          // rotation-z={1}
          rotation={mesh.rotation}
          
          rotation-y={1.6}
         
        >
          <planeGeometry  args={[2, 6]}> </planeGeometry>
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
        </mesh> */}
      </group>

      <group position={[-1, 0, 2]}>
        <mesh castShadow>
          <primitive object={wallGltf.scene}></primitive>
          <meshStandardMaterial
            roughness={0}
            metalness={1}
          ></meshStandardMaterial>
        </mesh>
        <mesh>
          <primitive object={wallRightGltf.scene}></primitive>
        </mesh>
        <mesh castShadow receiveShadow>
          <primitive object={floor.scene}></primitive>
        </mesh>
        {/* <mesh
        
          geometry={mesh.geometry}
          
          rotation={mesh.rotation}
          position={[-0.1,2,-2]}
          scale={0.02}
          
          position-x={0.2}
         
        >
          <MeshReflectorMaterial
        
            // resolution={1024}
            side={THREE.DoubleSide}
          
            mixBlur={3}
            mirror={1}
            // mixStrength={1}
            depthToBlurRatioBias={0.04}
            blur={[1000, 1000]}
            resolution={2048}
            // mixBlur={1}
            mixStrength={80}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.9}

            // color="#050505"
          ></MeshReflectorMaterial>
        </mesh> */}
        <mesh castShadow={true} receiveShadow>
          <primitive object={toilet.scene}></primitive>
        </mesh>
        <mesh castShadow receiveShadow>
          <primitive object={toiletSeat.scene}></primitive>
        </mesh>
        <mesh castShadow receiveShadow>
          <primitive object={vaniety.scene}></primitive>
          <meshBasicMaterial></meshBasicMaterial>
        </mesh>
        <mesh>
          <primitive object={underVanity.scene}></primitive>
          <meshStandardMaterial map={panelsTexture}></meshStandardMaterial>
        </mesh>
        <mesh>
          <primitive object={vanityStand.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={upStand.scene}></primitive>
          <meshStandardMaterial map={colorMap}></meshStandardMaterial>
        </mesh>

        {/* <mesh>
          <primitive object={mirror.scene}></primitive>
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
        <mesh>
          <primitive object={backPanels.scene}></primitive>
          <meshStandardMaterial map={colorMap}></meshStandardMaterial>
        </mesh>
        <mesh>
          <primitive object={backWall.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={ceiling.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={panels.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={waterTab.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={soapDispenser.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={handDryer.scene}></primitive>
          <meshStandardMaterial side={DoubleSide}></meshStandardMaterial>
        </mesh>
        <mesh>
          <primitive object={tolietRollHanlder.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={toiletPaper.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={flushValve.scene}></primitive>
        </mesh>
        <mesh>
          <primitive object={accessPanel.scene}></primitive>
        </mesh>

        {/* <mesh position={[2, 4, 2]}>
        <Wall2></Wall2>
      </mesh> */}
      </group>
    </>
  );
};

export default Scene;
