
import { useRef } from 'react';
import * as THREE from 'three';

interface GroundProps {
  type: 'SIL' | 'HIL';
}

export function Ground({ type }: GroundProps) {
  const groundMesh = useRef<THREE.Mesh>(null);
  
  // Enhanced colors based on theme
  const getGroundColors = () => {
    if (type === 'SIL') {
      return {
        base: "#fff6e3",  // Warm base for SIL
        grid: "#fdf6e3",
        ambientLight: "#fffcf0"
      };
    } else {
      return {
        base: "#e7f0fd", // Cool base for HIL
        grid: "#dbeafe",
        ambientLight: "#e0f0ff"
      };
    }
  };

  const colors = getGroundColors();
  
  return (
    <>
      {/* Ground plane with gradient */}
      <mesh 
        ref={groundMesh}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[50, 50, 50, 50]} />
        <meshStandardMaterial 
          color={colors.base}
          roughness={0.8}
          metalness={0.2}
          wireframe={false}
        >
          <gradientTexture
            attach="map"
            stops={[0, 1]} // Gradient stops
            colors={[colors.base, colors.grid]} // Gradient colors
          />
        </meshStandardMaterial>
      </mesh>

      {/* Additional ambient light for theme-specific illumination */}
      <ambientLight intensity={0.3} color={colors.ambientLight} />
    </>
  );
}

