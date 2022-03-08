import React, { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";




function Box(){
  const mesh = useRef()
  useFrame(() => 
    (mesh.current.rotation.x += 0.01)&&
    (mesh.current.rotation.y += 0.01)
  )
  return(
    <mesh
      ref={mesh}
    >
      <boxGeometry args={[3, 3, 3]}  />
      <meshBasicMaterial color="#ff0000" />
    </mesh>
  )
}




function App() {
  return (
    
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box />
      
    </Canvas>
  );
}

export default App;
