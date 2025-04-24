
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// Data flow particle effect
function DataParticles({ type, active }: { type: 'SIL' | 'HIL'; active: boolean }) {
  const count = 50;
  const particlesRef = useRef<THREE.Points>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [speeds] = useState(() => 
    new Float32Array(count).map(() => Math.random() * 0.02 + 0.01)
  );
  
  useEffect(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create in a curved pattern
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.5;
      positions[i * 3] = Math.sin(theta) * radius; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2; // y
      positions[i * 3 + 2] = Math.cos(theta) * radius; // z
    }
    
    setPositions(positions);
  }, [count]);
  
  useFrame(() => {
    if (!particlesRef.current || !positions || !active) return;
    
    const positionArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Move particles along paths
      const idx = i * 3;
      
      // Motion along z axis in direction of car
      positionArray[idx + 2] -= speeds[i];
      
      // Reset position if it goes too far
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

// Processing unit (representing computation)
function ProcessingUnit({ position, type, pulseColor, active }: { 
  position: [number, number, number]; 
  type: 'SIL' | 'HIL'; 
  pulseColor: string;
  active: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [pulse, setPulse] = useState(0);
  
  useFrame(() => {
    if (mesh.current && active) {
      // Rotate slowly
      mesh.current.rotation.y += 0.01;
      
      // Pulse effect
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

// Advanced vehicle with animations
function AdvancedVehicle({ type, active }: { type: 'SIL' | 'HIL'; active: boolean }) {
  const mesh = useRef<THREE.Group>(null);
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelBL = useRef<THREE.Mesh>(null);
  const wheelBR = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (!mesh.current || !wheelFL.current || !wheelFR.current || !wheelBL.current || !wheelBR.current) return;
    
    if (active) {
      // Slight hover effect for the car
      mesh.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
      
      // Rotate wheels
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
      {/* Car body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.5, 1.4, 2]} />
        <meshStandardMaterial 
          color={hovered ? hoverColor : carColor} 
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3, 1.2, 1.8]} />
        <meshStandardMaterial 
          color={carColor}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      
      {/* Wheels */}
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
      
      {/* Headlights */}
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
      
      {/* Windshield */}
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

// Ground with grid for perspective
function Ground({ type }: { type: 'SIL' | 'HIL' }) {
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

// Data flow connections between processing units
function Connections({ type, active }: { type: 'SIL' | 'HIL'; active: boolean }) {
  const lineRef = useRef<THREE.Line>(null);
  const [pulse, setPulse] = useState(0);
  
  useFrame(() => {
    if (active) {
      setPulse((prevPulse) => (prevPulse + 0.05) % 1);
    }
  });
  
  // Create a curved line between points
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
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.length * 3)}
            itemSize={3}
            onUpdate={(self) => {
              const array = self.array as Float32Array;
              for (let i = 0; i < points.length; i++) {
                array[i * 3] = points[i].x;
                array[i * 3 + 1] = points[i].y;
                array[i * 3 + 2] = points[i].z;
              }
            }}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={type === 'SIL' ? "#f6ad55" : "#63b3ed"}
          linewidth={1}
          opacity={active ? 0.8 : 0.3}
          transparent
        />
      </line>
      
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

// Information panel that shows details about the simulation
function InfoPanel({ type, active }: { type: 'SIL' | 'HIL'; active: boolean }) {
  const { camera } = useThree();
  
  // Always face camera
  useFrame(() => {
    // This will be handled by Html component
  });
  
  if (!active) return null;
  
  return (
    <Html position={[0, 3, 0]} center transform>
      <div className={`px-4 py-3 rounded-lg backdrop-blur-lg ${
        type === 'SIL' 
          ? 'bg-amber-500/20 border border-amber-500/40' 
          : 'bg-blue-500/20 border border-blue-500/40'
      } text-white max-w-xs`}>
        <h3 className="text-lg font-bold mb-2">
          {type === 'SIL' ? 'Software-in-the-Loop' : 'Hardware-in-the-Loop'}
        </h3>
        <p className="text-sm opacity-80 mb-2">
          {type === 'SIL' 
            ? 'Pure software simulation where both vehicle and environment are simulated.' 
            : 'Real hardware components connected to simulated environment.'}
        </p>
        <div className="text-xs grid grid-cols-2 gap-2">
          <div>
            <div className="font-semibold">Processing</div>
            <div className="opacity-70">
              {type === 'SIL' ? '100% Software' : 'Hardware + Software'}
            </div>
          </div>
          <div>
            <div className="font-semibold">Latency</div>
            <div className="opacity-70">
              {type === 'SIL' ? 'Variable' : 'Real-time'}
            </div>
          </div>
          <div>
            <div className="font-semibold">Data Source</div>
            <div className="opacity-70">
              {type === 'SIL' ? 'Mathematical Models' : 'Sensors + Models'}
            </div>
          </div>
          <div>
            <div className="font-semibold">Fidelity</div>
            <div className="opacity-70">
              {type === 'SIL' ? 'Medium' : 'High'}
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}

interface SceneProps {
  type: 'SIL' | 'HIL';
  active?: boolean;
}

// The full scene composition
function Scene({ type, active = true }: SceneProps) {
  // Define colors
  const pulseColor = type === 'SIL' ? "#ff9900" : "#3b82f6";
  const ambientIntensity = type === 'SIL' ? 0.6 : 0.4;
  
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <spotLight 
        position={[10, 15, 10]} 
        angle={0.3} 
        penumbra={1} 
        castShadow 
        intensity={1.5} 
      />
      <hemisphereLight 
        args={[type === 'SIL' ? '#fffcf0' : '#e0f0ff', '#000000', 0.7]} 
      />
      
      <PerspectiveCamera makeDefault position={[8, 5, 8]} />
      <fog attach="fog" args={[type === 'SIL' ? '#fdf6e3' : '#e7f0fd', 15, 25]} />
      
      <Ground type={type} />
      
      <group position={[0, -1, 0]}>
        <AdvancedVehicle type={type} active={active} />
        <ProcessingUnit 
          position={[-4, 1, 0]} 
          type={type} 
          pulseColor={pulseColor}
          active={active}
        />
        <ProcessingUnit 
          position={[4, 1, 0]} 
          type={type} 
          pulseColor={pulseColor}
          active={active}
        />
        <Connections type={type} active={active} />
        <DataParticles type={type} active={active} />
        
        {/* Additional elements for HIL */}
        {type === 'HIL' && (
          <group>
            <mesh position={[-4, -1, 0]} castShadow>
              <boxGeometry args={[1.5, 0.5, 2]} />
              <meshStandardMaterial 
                color="#555"
                roughness={0.3}
                metalness={0.9}
              />
            </mesh>
            
            {active && (
              <Html position={[-4, 0, 0]}>
                <div className="text-xs bg-black/70 text-white px-2 py-1 rounded whitespace-nowrap">
                  Hardware Controller
                </div>
              </Html>
            )}
            
            {/* Small blinking lights */}
            {active && [...Array(5)].map((_, i) => (
              <mesh key={i} position={[-4.5 + i * 0.2, -0.8, 1.1]} castShadow>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial 
                  color="#00ff00"
                  emissive="#00ff00"
                  emissiveIntensity={Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5}
                />
              </mesh>
            ))}
          </group>
        )}
        
        <InfoPanel type={type} active={active} />
      </group>
      
      <OrbitControls 
        enableZoom={true} 
        minDistance={5}
        maxDistance={20}
        enablePan={false}
      />
      
      {/* Text labels */}
      <Text 
        position={[0, -3, 0]}
        color={type === 'SIL' ? "#d97706" : "#2563eb"}
        fontSize={0.5}
        font="/fonts/inter-medium.woff"
        anchorX="center"
        anchorY="middle"
      >
        {type === 'SIL' ? "Software-in-the-Loop" : "Hardware-in-the-Loop"}
      </Text>
    </>
  );
}

interface EnhancedSimulationSceneProps {
  type: 'SIL' | 'HIL';
  className?: string;
  height?: string;
  active?: boolean;
}

export function EnhancedSimulationScene({ type, className, height = "350px", active = true }: EnhancedSimulationSceneProps) {
  return (
    <div className={`${className ?? ""} overflow-hidden rounded-lg`} style={{ height }}>
      <Canvas 
        shadows 
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Scene type={type} active={active} />
      </Canvas>
    </div>
  );
}
