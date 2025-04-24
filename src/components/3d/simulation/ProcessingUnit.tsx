
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface ProcessingUnitProps {
  position: [number, number, number];
  type: 'SIL' | 'HIL';
  pulseColor: string;
  active: boolean;
}

export function ProcessingUnit({ position, type, pulseColor, active }: ProcessingUnitProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [pulse, setPulse] = useState(0);
  
  useFrame(() => {
    if (mesh.current && active) {
      mesh.current.rotation.y += 0.01;
      setPulse((prevPulse) => (prevPulse + 0.05) % (Math.PI * 2));
    }
  });
  
  const pulseScale = active ? 1 + Math.sin(pulse) * 0.05 : 1;
  const baseColor = type === 'SIL' ? '#f6ad55' : '#63b3ed';
  const emissiveIntensity = active ? (0.3 + Math.sin(pulse) * 0.2) : 0.1;
  
  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={[pulseScale, pulseScale, pulseScale]}
      >
        <octahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial 
          color={hovered ? pulseColor : baseColor} 
          emissive={pulseColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {active && (
        <Html position={[0, 1, 0]} center>
          <div className="bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap backdrop-blur-sm">
            {type === 'SIL' ? 'Software Processing' : 'Hardware Interface'}
          </div>
        </Html>
      )}
    </group>
  );
}
