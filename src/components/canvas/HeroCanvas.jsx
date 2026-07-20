import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, useTexture } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import Constellation from './Constellation';


function ProfileAvatar() {
  const groupRef = useRef();
  const avatarTexture = useTexture('/profile-pic.png');

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 - 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Decorative Ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.6, 0.08, 32, 64]} />
        <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Inner Glowing Ring */}
      <mesh position={[0, 0, -0.1]}>
        <torusGeometry args={[2.4, 0.04, 32, 64]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} roughness={0.3} />
      </mesh>

      {/* Profile Picture Backing (Disc) */}
      <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.3, 2.3, 0.1, 64]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* The Actual Image */}
      <mesh position={[0, 0, 0.001]} rotation={[0, 0, 0]}>
        <circleGeometry args={[2.3, 64]} />
        <meshStandardMaterial map={avatarTexture} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Orbiting Elements */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[3, 1.5, 0.5]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-3, -1.5, 1]} rotation={[0.4, 0.5, 0.2]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.5} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[2, -2.5, -0.5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#22d3ee" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>
    </group>
  );
}

function SceneSetup() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;
  
  return (
    <group position={isMobile ? [0, 2.2, 0] : [3.5, 0, 0]} scale={isMobile ? 0.6 : 1.1}>
      <ProfileAvatar />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 bg-transparent transition-colors duration-300">
      <Canvas camera={{ position: [0, 1, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[0, 2, 0]} intensity={1} color="#22d3ee" />
        
        <Constellation />
        <Suspense fallback={null}>
          <SceneSetup />
        </Suspense>
        
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
