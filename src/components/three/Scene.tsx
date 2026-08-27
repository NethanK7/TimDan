"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute float aSpeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    vec3 pos = position;
    float t = uTime * aSpeed;

    // gentle independent drift so the field breathes instead of rotating rigidly
    pos.x += sin(t + position.z * 0.55) * 0.30;
    pos.y += cos(t * 0.82 + position.x * 0.48) * 0.30;
    pos.z += sin(t * 0.63 + position.y * 0.41) * 0.30;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (1.0 / max(-mv.z, 0.001));

    vColor = aColor;
    // dim the far side of the cloud to fake depth
    vFade = smoothstep(-22.0, -4.0, mv.z);
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, alpha * alpha * vFade * 0.55);
  }
`;

/** mulberry32 — a seeded PRNG, so building the field stays a pure computation. */
function makeRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GOLD = new THREE.Color("#E0A75E");
const EMBER = new THREE.Color("#D8763C");
const STEEL = new THREE.Color("#7F93AE");
const BONE = new THREE.Color("#EFEBE3");

function Dust({ count = 2600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const { positions, scales, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const c = new THREE.Color();
    const rand = makeRandom(count * 9973 + 1);

    for (let i = 0; i < count; i++) {
      // even-ish distribution across a thick spherical shell
      const r = 3.4 + Math.pow(rand(), 0.55) * 5.6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.78;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const roll = rand();
      if (roll > 0.97) c.copy(BONE);
      else if (roll > 0.78) c.copy(EMBER);
      else if (roll > 0.42) c.copy(STEEL);
      else c.copy(GOLD);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = 3 + Math.pow(rand(), 3.2) * 13;
      speeds[i] = 0.12 + rand() * 0.4;
    }

    return { positions, scales, speeds, colors };
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 13 } }),
    []
  );

  useFrame((state, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta;
    if (!points.current) return;

    points.current.rotation.y += delta * 0.035;
    points.current.rotation.x += delta * 0.008;

    // cursor parallax, eased toward the target each frame
    const { x, y } = state.pointer;
    points.current.position.x += (x * 0.6 - points.current.position.x) * 0.03;
    points.current.position.y += (y * 0.45 - points.current.position.y) * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Slow wireframe sphere — reads as a horizon / halo behind the portrait. */
function Halo() {
  const mesh = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(
    () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(4.6, 2)),
    []
  );

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y -= delta * 0.05;
    mesh.current.rotation.z += delta * 0.012;
    mesh.current.position.x += (state.pointer.x * -0.5 - mesh.current.position.x) * 0.03;
    mesh.current.position.y += (state.pointer.y * -0.35 - mesh.current.position.y) * 0.03;
  });

  return (
    <lineSegments ref={mesh} geometry={geometry}>
      <lineBasicMaterial
        color="#E0A75E"
        transparent
        opacity={0.05}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/** Drops point count on low-end / small devices. */
function Adaptive() {
  const size = useThree((s) => s.size);
  const count = size.width < 768 ? 900 : size.width < 1280 ? 1500 : 2200;
  return <Dust count={count} />;
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 13], fov: 52 }}
      // the field is decorative; never let it eat pointer events from the hero
      style={{ pointerEvents: "none" }}
    >
      <Adaptive />
      <Halo />
    </Canvas>
  );
}
