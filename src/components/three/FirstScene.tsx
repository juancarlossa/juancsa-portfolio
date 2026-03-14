import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Lights } from "./Lights";
import { Suspense } from "react";
import { JuankSetup } from "./Juank";
import { GamingSetup } from "./GamingSetup";


export function FirstScene({ height = "70vh", width = "70vw" }: { height?: string; width?: string }) {
  return (
    <div style={{ height, width }} className="flex justify-center items-center border border-indigo-500">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance" }}
      >
        <Lights />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={0.5}
          maxDistance={2}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />

        <Suspense fallback={null}>
          <group position={[0, -0.75, 0]} scale={0.1}>
            <JuankSetup />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}