
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface InfoPanelProps {
  type: 'SIL' | 'HIL';
  active: boolean;
}

export function InfoPanel({ type, active }: InfoPanelProps) {
  const { camera } = useThree();
  
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
