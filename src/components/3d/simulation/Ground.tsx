
import { useRef } from 'react';
import * as THREE from 'three';

interface GroundProps {
  type: 'SIL' | 'HIL';
}

export function Ground({ type }: GroundProps) {
  const groundMesh = useRef<THREE.Mesh>(null);
  
  const baseColor = type === 'SIL' ? "#fdf6e3" : "#e7f0fd";
  const gridColor = type === 'SIL' ? "#eee8d5" : "#dbeafe";
  
  return (
    <mesh 
      ref={groundMesh}
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2, 0]} 
      receiveShadow
    >
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshStandardMaterial 
        color={baseColor} 
        roughness={1}
        metalness={0}
        wireframe={false}
      />
    </mesh>
  );
}
