// import React, { useRef } from "react";
// import { useGLTF, useTexture } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// export function Model(props) {
//   const group = useRef();
//   const { nodes, materials } = useGLTF("/Blank Superloo.glb");
//   const colorMap = useTexture("/textures/your-texture.jpg");

//   // Traverse the scene to apply the texture to all meshes
//   Object.values(nodes).forEach((node) => {
//     if (node.isMesh) {
//       node.material.map = colorMap;
//       node.material.needsUpdate = true;
//     }
//   });

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <mesh
//         geometry={nodes.Floor.geometry}
//         material={nodes.Floor.material}
//         position={[0, 0, 0]}
//       />
//       <mesh
//         geometry={nodes.Wall.geometry}
//         material={nodes.Wall.material}
//         position={[0, 5, 0]}
//       />
//       <mesh
//         geometry={nodes.MirrorVanity.geometry}
//         material={nodes.MirrorVanity.material}
//         position={[1, 4, -2]}
//       />
//       <mesh
//         geometry={nodes.Panel.geometry}
//         material={nodes.Panel.material}
//         position={[2, 2, -1]}
//       />
//       <mesh
//         geometry={nodes.Light.geometry}
//         material={nodes.Light.material}
//         position={[0, 8, 0]}
//       />
//       <mesh
//         geometry={nodes.ToiletBowl.geometry}
//         material={nodes.ToiletBowl.material}
//         position={[-1, 1, -1]}
//       />
//       <mesh
//         geometry={nodes.UnderPanel.geometry}
//         material={nodes.UnderPanel.material}
//         position={[0, 0, -2]}
//       />
//     </group>
//   );
// }

// useGLTF.preload("/Blank Superloo.glb");
