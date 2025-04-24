
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Vehicle(props: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  
  // Rotate the model
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {/* Car body */}
      <mesh 
        ref={mesh} 
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[4.5, 1.4, 2]} />
        <meshStandardMaterial color={hovered ? "#ff9900" : props.color} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3, 1.2, 1.8]} />
        <meshStandardMaterial color={props.color} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.5, -0.8, 1.1]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.5, -0.8, 1.1]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1.5, -0.8, -1.1]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.5, -0.8, -1.1]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[2.3, 0.2, 0.8]} castShadow>
        <boxGeometry args={[0.1, 0.5, 0.3]} />
        <meshStandardMaterial color="#ffff99" emissive="#ffff00" emissiveIntensity={hovered ? 1 : 0.4} />
      </mesh>
      <mesh position={[2.3, 0.2, -0.8]} castShadow>
        <boxGeometry args={[0.1, 0.5, 0.3]} />
        <meshStandardMaterial color="#ffff99" emissive="#ffff00" emissiveIntensity={hovered ? 1 : 0.4} />
      </mesh>
    </group>
  );
}

interface SimulationModelProps {
  type: 'SIL' | 'HIL';
  className?: string;
  height?: string;
}

export function SimulationModel({ type, className, height = "200px" }: SimulationModelProps) {
  const backgroundColor = type === 'SIL' ? "#fdf6e3" : "#e7f0fd";
  
  return (
    <div className={`${className ?? ""}`} style={{ height }}>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} castShadow />
        <PerspectiveCamera makeDefault position={[8, 5, 8]} />
        <fog attach="fog" args={[backgroundColor, 15, 25]} />
        
        {/* Set background color */}
        <color attach="background" args={[backgroundColor]} />
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial 
            color={backgroundColor} 
            roughness={1} 
            metalness={0}
          />
        </mesh>
        
        <Vehicle color={type === 'SIL' ? "#f6ad55" : "#63b3ed"} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
