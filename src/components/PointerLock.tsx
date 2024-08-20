// @ts-nocheck
import { useEffect, useRef } from "react";
import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const PointerControls = () => {
  const { gl, camera } = useThree();
  const pointerLockControlsRef = useRef();

  useEffect(() => {
    const handleClick = (event: any) => {
      const canvas = document.getElementById("canvas");
      console.log(canvas);
      if (canvas && canvas.contains(event.target)) {
        pointerLockControlsRef.current.lock();
      } else {
        pointerLockControlsRef.current.unlock();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <PointerLockControls
      ref={pointerLockControlsRef}
      args={[camera, gl.domElement]}
    />
  );
};

export default PointerControls;
