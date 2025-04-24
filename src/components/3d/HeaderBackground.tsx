
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingParticles({ count = 40 }) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = new THREE.Object3D();
  const particles = useRef<Array<{ position: THREE.Vector3; speed: number; rotation: THREE.Euler }>>(
    Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        Math.random() * 20 - 10,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      ),
      speed: Math.random() * 0.02 + 0.01,
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
    }))
  );

  useFrame(() => {
    if (!instancedMeshRef.current) return;

    particles.current.forEach((particle, i) => {
      particle.position.y += particle.speed;
      if (particle.position.y > 5) {
        particle.position.y = -5;
        particle.position.x = Math.random() * 20 - 10;
        particle.position.z = Math.random() * 10 - 5;
      }

      dummy.position.copy(particle.position);
      dummy.rotation.x += 0.01;
      dummy.rotation.y += 0.01;
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.2]} />
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function HeaderBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-70 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
