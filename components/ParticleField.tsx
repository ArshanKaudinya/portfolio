'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState} from 'react'
import * as THREE from 'three'

type BlobProps = {
  position: [number, number, number]
  index: number
}

function BlobMesh({ position }: BlobProps) {
  const colorOptions = ['#ffffff']
  const color = useMemo(() => colorOptions[Math.floor(Math.random() * colorOptions.length)], [colorOptions])

  return (
    <mesh position={position}>
      <circleGeometry args={[0.12, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.5}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </mesh>
  )
}

function BlobField({ mouse }: { mouse: React.RefObject<THREE.Vector2> }) {
  const { viewport } = useThree()
  const [blobCount] = useState(() => {
    if (typeof window === 'undefined') return 30
    const w = window.innerWidth
    if (w >= 1200) return 70
    if (w >= 768) return 40
    return 30
  })  
  const groupRef = useRef<THREE.Group>(null!)
  const lineRef = useRef<THREE.LineSegments>(null!)

  const blobs = useMemo(() => {
    return Array.from({ length: blobCount }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width,
        (Math.random() - 0.5) * viewport.height,
        0
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        0
      ),
    }))
  }, [viewport, blobCount])

  useFrame(() => {
    const group = groupRef.current
    if (!group) return

    group.children.forEach((child, i) => {
      const blob = blobs[i]
      const pos = blob.position
      const vel = blob.velocity

      pos.add(vel)
      vel.multiplyScalar(0.988)

      if (pos.x < -viewport.width / 2 || pos.x > viewport.width / 2) vel.x *= -1
      if (pos.y < -viewport.height / 2 || pos.y > viewport.height / 2) vel.y *= -1

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
          const minDist = 0.24 // blob diameter (your circle radius * 2)
      
          if (dist < minDist) {
            const normal = posB.clone().sub(posA).normalize()
            const relVel = b.velocity.clone().sub(a.velocity)
            const velAlongNormal = relVel.dot(normal)
      
            if (velAlongNormal < 0) {
              const impulse = normal.multiplyScalar(velAlongNormal)
              a.velocity.add(impulse)
              b.velocity.sub(impulse)
            }
      
            // Optional: Separate overlapping blobs slightly
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
      const maxConnections = blobCount * blobCount
      const linePositions = new Float32Array(maxConnections * 6)
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

  


