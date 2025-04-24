
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { DataParticles } from './simulation/DataParticles';
import { ProcessingUnit } from './simulation/ProcessingUnit';
import { AdvancedVehicle } from './simulation/AdvancedVehicle';
import { Ground } from './simulation/Ground';
import { Connections } from './simulation/Connections';
import { InfoPanel } from './simulation/InfoPanel';

interface SceneProps {
  type: 'SIL' | 'HIL';
  active?: boolean;
}

function Scene({ type, active = true }: SceneProps) {
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
