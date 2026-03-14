import * as THREE from "three";

export function Lights() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight
                position={[2, 5, 6]}
                angle={0.15}
                penumbra={0.2}
                intensity={100}
                color="#314158"
            />
            <spotLight
                position={[4, 5, 4]}
                angle={0.3}
                penumbra={0.5}
                intensity={40}
                color="#4cc9f0"
            />
            <spotLight
                position={[-3, 5, 5]}
                angle={0.4}
                penumbra={1}
                intensity={60}
                color="#9d4edd"
            />

            <primitive
                object={new THREE.RectAreaLight('#314158', 8, 3, 2)}
                position={[1, 3, 4]}
                intensity={15}
                rotation={[-Math.PI / 4, -Math.PI / 4, 0]}
            />
            <pointLight
                position={[0, 1, 0]}
                intensity={10}
                color="#7209b7"
            />
            <pointLight
                position={[1, 2, -2]}
                intensity={10}
                color="#0d00a4"
            />
        </>
    );
};
