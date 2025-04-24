
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
  
  // Create a canvas-based gradient texture
  const createGradientTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, colors.base);
      gradient.addColorStop(1, colors.grid);
      
      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  };
  
  // Create and memoize the texture
  const gradientTexture = useRef<THREE.CanvasTexture>();
  if (!gradientTexture.current) {
    gradientTexture.current = createGradientTexture();
  }
  
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
          map={gradientTexture.current}
          color={colors.base}
          roughness={0.8}
          metalness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Additional ambient light for theme-specific illumination */}
      <ambientLight intensity={0.3} color={colors.ambientLight} />
    </>
  );
}
