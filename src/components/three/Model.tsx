import { useGLTF } from "@react-three/drei";

export function Model(props: any) {
    const { scene } = useGLTF("/models/gaming_desktop_pc.glb");

    return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/gaming_desktop_pc.glb");