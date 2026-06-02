import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import Constellation from './Constellation';


function StylizedLaptop() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - 0.5;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.5;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.3, 4.5]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.7} />
      </mesh>
      
      {/* Keyboard Area (Purple) */}
      <mesh position={[0, 0.16, 0.5]}>
        <boxGeometry args={[5.4, 0.05, 2.5]} />
        <meshStandardMaterial color="#4f46e5" roughness={0.4} />
      </mesh>

      {/* Touchpad (Darker) */}
      <mesh position={[0, 0.16, 1.8]}>
        <boxGeometry args={[1.5, 0.06, 0.8]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.6} />
      </mesh>

      {/* Screen Lid Group (hinged at back) */}
      <group position={[0, 0.15, -2.1]} rotation={[-0.3, 0, 0]}>
        {/* Screen Back */}
        <mesh position={[0, 2, 0.1]}>
          <boxGeometry args={[6, 4, 0.2]} />
          <meshStandardMaterial color="#0a0a0f" roughness={0.7} />
        </mesh>
        
        {/* Screen Display (Cyan) */}
        <mesh position={[0, 2, 0.21]}>
          <boxGeometry args={[5.6, 3.6, 0.05]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.2} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function FloatingShapes() {
  return (
    <group>
      {/* Purple Circle */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2.5, 1]} rotation={[0.5, 0.5, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
          <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      {/* Yellow Hexagon */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-3.5, -1, 1]} rotation={[0.4, 0.5, 0.2]}>
          <cylinderGeometry args={[0.6, 0.6, 0.6, 6]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.5} />
        </mesh>
      </Float>

      {/* Cyan C-Shape */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[4, 1.5, 2]} rotation={[-0.2, -0.4, 0.5]}>
          <torusGeometry args={[0.6, 0.25, 16, 32, Math.PI * 1.5]} />
          <meshStandardMaterial color="#22d3ee" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

function SceneSetup() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  return (
    <group position={isMobile ? [0, 2, 0] : [4, 0, 0]} scale={isMobile ? 0.7 : 1}>
      <StylizedLaptop />
      <FloatingShapes />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 bg-[#020008]">
      <Canvas camera={{ position: [0, 1, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[0, 2, 0]} intensity={1} color="#22d3ee" />
        
        <Constellation />
        <SceneSetup />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
