import React, {  } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { Vector2 } from 'three';


function Hex(props){
  
  const height = Math.random() * 3;
  
  return(
    <mesh
      {...props}
    >
      <cylinderGeometry args={[1, 1, height, 6, 1, false]}  />
      <meshStandardMaterial 
        color="#df7450"
        flatShading={true}
        

      />
    </mesh>
  )
}

function MakePositions (size){
  let dict = [];
  let cnt = 0;
  
    for(var i=0-size; i<=size; i++){
      for(var j=0-size; j<=size; j++){
        //offset manipulation
        //und auf treeJS vector schreiben
        let x1 = (i+(j%2)*0.5)*1.77;
        let y1 = j * 1.535;
        let vec = new Vector2(x1,y1);

        //kreis erzeugen, nur werte zulassen die 
        //innherhalb des kreises liegen
        if(vec.length() > 15) continue;


        dict[cnt++] = [x1, 0, y1];
        //console.log(dict);
         
      }
    }
    
  return(
    dict
  )
}


function App() {

  //Array erzeugen für positionen und anzahl der hexagons
  var dict2 = MakePositions(15);

  
  return (

    <Canvas>
      
      <ambientLight />
      <pointLight 
        position={[15, 15, 15]} 
      />

      {dict2.map((position) =>
          <Hex
            
            position={position} 
          />
      )}
    
      <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          zoomSpeed={0.7}
          maxDistance={50}
          minDistance={20}
        />
      
    </Canvas>
    
  );
}

export default App;