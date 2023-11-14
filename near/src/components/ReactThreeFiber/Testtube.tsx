/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 -t testtube.gltf 
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, MeshTransmissionMaterial, AccumulativeShadows, RandomizedLight, Environment } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    tube: THREE.Mesh
    money: THREE.Mesh
    goo: THREE.Mesh
  }
  materials: {}
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

const config = {
  samples: 10,
  resolution: 2048,
  transmission: 1,
  roughness: 0.0,
  thickness: 3.5,
  ior: 1.5,
  chromaticAberration: 0.06,
  anisotropy: 0.1,
  distortion: 0.0,
  distortionScale: 0.3,
  temporalDistortion: 0.5,
  clearcoat: 1,
  attenuationDistance: 0.5,
  attenuationColor: '#ffffff',
  color: '#c9ffa1',
  bg: '#839681'
}

export function Testtube(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/testtube.gltf') as GLTFResult
  return (
    <group {...props} dispose={null} position={[0, 1, 0]} scale={0.7}>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr" blur={1} />
      <AccumulativeShadows temporal frames={100} alphaTest={0.9} color="#3ead5d" colorBlend={1} opacity={0.8} scale={20}>
        <RandomizedLight radius={10} ambient={0.5} intensity={1} position={[2.5, 8, -2.5]} bias={0.001} />
      </AccumulativeShadows>

      {/*  <group position={[3.395, 2.993, -1.005]} rotation={[1.889, 1.117, -2.088]} scale={[81.321, 81.322, 81.321]}>
        <pointLight intensity={1225.3} decay={2} color="#fffffd" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <group position={[-3.98, 1.13, 4.593]} rotation={[0.584, 0.269, 0.847]}>
        <pointLight intensity={200} decay={2} color="#caffbf" rotation={[-Math.PI / 2, 0, 0]} />
      </group> 
      <group position={[-3.98, 3.961, 4.593]} rotation={[0.419, 0.03, 0.374]} scale={32.334}>
        <pointLight intensity={3} decay={2} color="#fff7fd" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <group position={[1.962, -0.101, 1.136]} rotation={[-0.228, -0.043, -0.204]} scale={32.334}>
        <pointLight intensity={100} decay={2} color="#ffd476" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <group position={[2.52, -1.262, 4.593]} rotation={[0.577, 0.262, 0.834]}>
        <pointLight intensity={200} decay={2} color="#46ff3e" rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <group position={[-4.646, -1.262, -0.241]} rotation={[0.577, 0.262, 0.834]}>
        <pointLight intensity={200} decay={2} color="#e3ff14" rotation={[-Math.PI / 2, 0, 0]} />
      </group>*/}
      <mesh geometry={nodes.tube.geometry} material={nodes.tube.material} position={[-0.722, 0.39, 0]}>
        <MeshTransmissionMaterial background={new THREE.Color("#baffb9")} {...config} />
      </mesh>
      <mesh geometry={nodes.money.geometry} material={nodes.money.material} position={[1, -2.542, 0.062]} />
      <mesh geometry={nodes.money.geometry} position={[1, 2.542, 0.062]} >
        <meshStandardMaterial color="#2b9d7e" />
      </mesh>
      <mesh geometry={nodes.goo.geometry} material={nodes.goo.material} position={[-0.722, 0.39, 0]}>
        <MeshTransmissionMaterial background={new THREE.Color("#baffb9")} {...config} />
        {/*   <meshPhysicalMaterial {...config} /> */}
      </mesh>
    </group>
  )
}

useGLTF.preload('/testtube.gltf')