import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const GOLD = new THREE.Color("hsl(43, 74%, 49%)");
const GOLD_LIGHT = new THREE.Color("hsl(43, 80%, 65%)");
const GOLD_DIM = new THREE.Color("hsl(43, 70%, 25%)");

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* ─── Particle Field ─── */
function ParticleField({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 600;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 3 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02 + scroll * Math.PI * 0.5;
    ref.current.rotation.x = Math.sin(t * 0.01) * 0.1 + scroll * 0.3;
    ref.current.position.y = -scroll * 5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={GOLD}
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Wireframe Sphere ─── */
function WireframeSphere({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15 + scroll * 2;
    ref.current.rotation.x = t * 0.08 + scroll;
    ref.current.position.y = 1 - scroll * 8;
    ref.current.position.x = -2 + scroll * 3;
    const s = 1.8 + Math.sin(t * 0.5) * 0.1 - scroll * 0.4;
    ref.current.scale.setScalar(Math.max(s, 0.5));

    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.max(0.15 - scroll * 0.3, 0.03);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial
        color={GOLD}
        wireframe
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Geometric Crystal ─── */
function GeoCrystal({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.3 + scroll * 3;
    ref.current.rotation.z = t * 0.1;
    ref.current.position.y = 0 - scroll * 12;
    ref.current.position.x = 3 - scroll * 4;
    const s = 0.7 + Math.sin(t * 0.8) * 0.05;
    ref.current.scale.setScalar(s);
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref}>
        {/* Solid inner */}
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial
            color={GOLD_DIM}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>
        {/* Wireframe outer */}
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={GOLD_LIGHT}
            wireframe
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>
        {/* Edges ring */}
        <mesh>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial
            color={GOLD}
            wireframe
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Grid Lines ─── */
function TechGrid({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const arr: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    for (let i = -6; i <= 6; i += 2) {
      arr.push({
        start: new THREE.Vector3(i, -8, -5),
        end: new THREE.Vector3(i, 8, -5),
      });
      arr.push({
        start: new THREE.Vector3(-8, i, -5),
        end: new THREE.Vector3(8, i, -5),
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = -scroll * 3;
    ref.current.rotation.z = Math.sin(t * 0.05) * 0.02;

    ref.current.children.forEach((child) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      if (mat) mat.opacity = 0.04 + Math.sin(t * 0.5) * 0.01;
    });
  });

  const lineObjects = useMemo(() => {
    return lines.map((l) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([l.start, l.end]);
      const material = new THREE.LineBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.04,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Line(geometry, material);
    });
  }, [lines]);

  return (
    <group ref={ref}>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

/* ─── Floating Small Shapes (section accents) ─── */
function FloatingShapes({ scroll }: { scroll: number }) {
  const shapes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 6 - 2,
        ] as [number, number, number],
        scale: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.5 + 0.2,
        type: i % 3,
      })),
    []
  );

  return (
    <>
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} scroll={scroll} index={i} />
      ))}
    </>
  );
}

function FloatingShape({
  pos,
  scale,
  speed,
  type,
  scroll,
  index,
}: {
  pos: [number, number, number];
  scale: number;
  speed: number;
  type: number;
  scroll: number;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed;
    ref.current.rotation.y = t * speed * 0.7;
    ref.current.position.y = pos[1] - scroll * (10 + index * 2);
    ref.current.position.x = pos[0] + Math.sin(t * 0.3 + index) * 0.3;
  });

  return (
    <mesh ref={ref} position={pos} scale={scale}>
      {type === 0 && <tetrahedronGeometry args={[1, 0]} />}
      {type === 1 && <octahedronGeometry args={[1, 0]} />}
      {type === 2 && <icosahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial
        color={GOLD}
        wireframe
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Main Scene ─── */
const Scene3D = () => {
  const scroll = useScrollProgress();

  return (
    <>
      <ambientLight intensity={0.1} />
      <TechGrid scroll={scroll} />
      <ParticleField scroll={scroll} />
      <WireframeSphere scroll={scroll} />
      <GeoCrystal scroll={scroll} />
      <FloatingShapes scroll={scroll} />
    </>
  );
};

export default Scene3D;
