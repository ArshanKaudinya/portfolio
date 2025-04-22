'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState} from 'react'
import * as THREE from 'three'

type BlobProps = {
  position: [number, number, number]
  index: number
}

function BlobMesh({ position }: BlobProps) {

  return (
    <mesh position={position}>
      <circleGeometry args={[0.12, 16]} />
      <meshStandardMaterial
        color={"#ffffff"}
        metalness={0.5}
        roughness={0.5}
        emissive={"#ffffff"}
        emissiveIntensity={0.6}
      />
    </mesh>
  )
}

function BlobField({ mouse }: { mouse: React.RefObject<THREE.Vector2> }) {
  const { viewport } = useThree()
  const bounds = useMemo(() => {
    const PAD = viewport.width < 22 ? 1.15 : 1 
    return {
      w: viewport.width * PAD,
      h: viewport.height * PAD,
    }
  }, [viewport.width, viewport.height])
  const [blobCount] = useState(() => {
    if (typeof window === 'undefined') return 30
    const w = window.innerWidth
    if (w >= 1200) return 80
    if (w >= 768) return 50
    return 40
  })  
  const groupRef = useRef<THREE.Group>(null!)
  const lineRef = useRef<THREE.LineSegments>(null!)

  const blobs = useMemo(() =>
    Array.from({ length: blobCount }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * bounds.w,
        (Math.random() - 0.5) * bounds.h,
        0
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        0
      ),
    }))
  , [blobCount, bounds.w, bounds.h])

  useFrame(() => {
    const group = groupRef.current
    if (!group) return

    group.children.forEach((child, i) => {
      const blob = blobs[i]
      const pos = blob.position
      const vel = blob.velocity

      pos.add(vel)
      vel.multiplyScalar(0.988)

      if (pos.x < -bounds.w / 2 || pos.x > bounds.w / 2) vel.x *= -1
      if (pos.y < -bounds.h / 2 || pos.y > bounds.h / 2) vel.y *= -1

      const mouseVec = new THREE.Vector3(
        mouse.current.x * viewport.width / 2,
        mouse.current.y * viewport.height / 2,
        0
      )

      const dist = pos.distanceTo(mouseVec)
      if (dist < 1.5) {
        const force = mouseVec.clone().sub(pos).normalize().multiplyScalar(-0.005)
        vel.add(force)
      }
      for (let i = 0; i < blobCount; i++) {
        for (let j = i + 1; j < blobCount; j++) {
          const a = blobs[i]
          const b = blobs[j]
      
          const posA = a.position
          const posB = b.position
      
          const dist = posA.distanceTo(posB)
          const minDist = 0.24
      
          if (dist < minDist) {
            const normal = posB.clone().sub(posA).normalize()
            const relVel = b.velocity.clone().sub(a.velocity)
            const velAlongNormal = relVel.dot(normal)
      
            if (velAlongNormal < 0) {
              const impulse = normal.multiplyScalar(velAlongNormal)
              a.velocity.add(impulse)
              b.velocity.sub(impulse)
            }
      
            const overlap = minDist - dist
            const correction = normal.multiplyScalar(overlap / 2)
            a.position.add(correction.clone().negate())
            b.position.add(correction)
          }
        }
      }
      child.position.copy(pos)
    })

    if (lineRef.current) {
      const maxConnections = blobCount * blobCount * 6
      const linePositions = new Float32Array(maxConnections)
      let lineIndex = 0

      for (let i = 0; i < blobCount; i++) {
        for (let j = i + 1; j < blobCount; j++) {
          const a = blobs[i].position
          const b = blobs[j].position
          const dist = a.distanceTo(b)

          if (dist < 2) {
            linePositions.set(a.toArray(), lineIndex)
            lineIndex += 3
            linePositions.set(b.toArray(), lineIndex)
            lineIndex += 3
          }
        }
      }

      const geometry = lineRef.current.geometry
      geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
      geometry.setDrawRange(0, lineIndex)
      geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <group ref={groupRef}>
        {blobs.map((b, i) => (
          <BlobMesh key={i} position={b.position.toArray()} index={i} />
        ))}
      </group>

      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#ededed" opacity={0.6} transparent />
      </lineSegments>
    </>
  )
}

export default function Blobs() {
    const mouse = useRef(new THREE.Vector2(0, 0))
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        mouse.current.set(x, y)
      }
  
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])
  
    return (
      <Canvas
        orthographic
        camera={{ zoom: 50, position: [0, 0, 100] }}
        className="w-full h-full"
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0a')
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <BlobField mouse={mouse} />
      </Canvas>
    )
}

  


