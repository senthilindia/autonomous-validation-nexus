
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataParticlesProps {
  type: 'SIL' | 'HIL';
  active: boolean;
}

export function DataParticles({ type, active }: DataParticlesProps) {
  const count = 50;
  const particlesRef = useRef<THREE.Points>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [speeds] = useState(() => 
    new Float32Array(count).map(() => Math.random() * 0.02 + 0.01)
  );
  
  useEffect(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.5;
      positions[i * 3] = Math.sin(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = Math.cos(theta) * radius;
    }
    
    setPositions(positions);
  }, [count]);
  
  useFrame(() => {
    if (!particlesRef.current || !positions || !active) return;
    
    const positionArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positionArray[idx + 2] -= speeds[i];
      if (positionArray[idx + 2] < -3) {
        positionArray[idx + 2] = 3;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  if (!positions) return null;
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color={type === 'SIL' ? '#ffaa00' : '#00aaff'} 
        transparent 
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
