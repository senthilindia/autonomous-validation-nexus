
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface ConnectionsProps {
  type: 'SIL' | 'HIL';
  active: boolean;
}

export function Connections({ type, active }: ConnectionsProps) {
  const [pulse, setPulse] = useState(0);
  
  useFrame(() => {
    if (active) {
      setPulse((prevPulse) => (prevPulse + 0.05) % 1);
    }
  });
  
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4, 0, 0),
    new THREE.Vector3(-3, 1, 2),
    new THREE.Vector3(0, 0.5, 3),
    new THREE.Vector3(3, 1, 2),
    new THREE.Vector3(4, 0, 0),
  ]);
  
  const points = curve.getPoints(50);
  
  return (
    <group>
      <Line
        points={points}
        color={type === 'SIL' ? "#f6ad55" : "#63b3ed"}
        opacity={active ? 0.8 : 0.3}
        transparent
      />
      
      {active && (
        <mesh position={[curve.getPoint(pulse).x, curve.getPoint(pulse).y, curve.getPoint(pulse).z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={type === 'SIL' ? "#ff9900" : "#3b82f6"}
            emissive={type === 'SIL' ? "#ff9900" : "#3b82f6"}
            emissiveIntensity={0.8}
          />
        </mesh>
      )}
    </group>
  );
}
