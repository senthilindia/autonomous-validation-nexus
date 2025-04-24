
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AdvancedVehicleProps {
  type: 'SIL' | 'HIL';
  active: boolean;
}

export function AdvancedVehicle({ type, active }: AdvancedVehicleProps) {
  const mesh = useRef<THREE.Group>(null);
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelBL = useRef<THREE.Mesh>(null);
  const wheelBR = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (!mesh.current || !wheelFL.current || !wheelFR.current || !wheelBL.current || !wheelBR.current) return;
    
    if (active) {
      mesh.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
      
      wheelFL.current.rotation.x += 0.1;
      wheelFR.current.rotation.x += 0.1;
      wheelBL.current.rotation.x += 0.1;
      wheelBR.current.rotation.x += 0.1;
    }
  });

  const carColor = type === 'SIL' ? '#f6ad55' : '#63b3ed';
  const hoverColor = type === 'SIL' ? '#ff9900' : '#3b82f6';
  
  return (
    <group 
      ref={mesh} 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.5, 1.4, 2]} />
        <meshStandardMaterial 
          color={hovered ? hoverColor : carColor} 
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3, 1.2, 1.8]} />
        <meshStandardMaterial 
          color={carColor}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      
      <mesh ref={wheelFL} position={[-1.5, -0.8, 1.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      <mesh ref={wheelFR} position={[1.5, -0.8, 1.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      <mesh ref={wheelBL} position={[-1.5, -0.8, -1.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      <mesh ref={wheelBR} position={[1.5, -0.8, -1.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      
      <mesh position={[2.3, 0.2, 0.8]} castShadow>
        <boxGeometry args={[0.1, 0.5, 0.3]} />
        <meshStandardMaterial 
          color="#ffff99" 
          emissive="#ffff00" 
          emissiveIntensity={active ? (hovered ? 1 : 0.6) : 0.1}
        />
      </mesh>
      <mesh position={[2.3, 0.2, -0.8]} castShadow>
        <boxGeometry args={[0.1, 0.5, 0.3]} />
        <meshStandardMaterial 
          color="#ffff99" 
          emissive="#ffff00" 
          emissiveIntensity={active ? (hovered ? 1 : 0.6) : 0.1}
        />
      </mesh>
      
      <mesh position={[1, 1.1, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[0.1, 1.5, 1.7]} />
        <meshPhysicalMaterial 
          color="#333"
          roughness={0}
          transmission={0.9}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>
    </group>
  );
}
