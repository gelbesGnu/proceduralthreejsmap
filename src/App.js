


import React, { Suspense } from 'react';
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { Vector2, TextureLoader, cylinderGeometry, DoubleSide } from 'three';
import SimplexNoise from 'simplex-noise';



import dirtMap from "./assets/dirt.png";
import dirt2Map from "./assets/dirt2.jpg";
import grassMap from "./assets/grass.jpg";
import sandMap from "./assets/sand.jpg";
import stoneMap from "./assets/stone.png";
import waterMap from "./assets/water.jpg";




const MAX_HEIGHT = 10;

function Hex(props){
  
  
  const [dirt]  = useLoader(TextureLoader, [dirtMap]);   
  const [dirt2] = useLoader(TextureLoader, [dirt2Map]);
  const [grass] = useLoader(TextureLoader, [grassMap]);
  const [sand]  = useLoader(TextureLoader, [sandMap]);
  const [stone] = useLoader(TextureLoader, [stoneMap]); 
  
  
  //const height = Math.random() * 3;
  const position2 = {...props.position};
  //console.log(position2)
  const tex = CalculateTex(position2[2])
  //console.log(tex);
  

  return(
    <>
    <CreateStone 
      position={position2}
    />
    <mesh
      position={[position2[0],position2[2]/2,position2[1]]}
    >
      <cylinderGeometry
        args={[1, 1, position2[2], 6, 1, false]}  />

      <meshStandardMaterial
        map={(tex==="dirt")?dirt:(tex==="dirt2")?dirt2:(tex==="grass")?grass:(tex==="sand")?sand:stone}
      />

    </mesh>
    </>
  )
}

function Water(){
  
  const [water] = useLoader(TextureLoader, [waterMap]);

  return(
    <mesh
      position={[0, MAX_HEIGHT * 0.1, 0]}
    >
      <cylinderGeometry args={[15.5, 15.5, MAX_HEIGHT * 0.2, 50]} />
      <meshPhysicalMaterial
        
        color={'#55aaff'}
        ior={1.5}
        transmission={0.5}
        transparent={true}
        //thickness={1.5}
        roughness={1}
        metalness={0.025}
        roughnessMap={water}
        metalnessMap={water}
      />
    </mesh>
  )
}


function MapContainer(){
  const [dirt]  = useLoader(TextureLoader, [dirtMap]); 
  return(
    <>
      <mesh position={[0,MAX_HEIGHT * 0.125, 0]}>
        <cylinderGeometry args={[15.51, 15.51, MAX_HEIGHT* 0.25, 50, 1, true]} />
        
        <meshPhysicalMaterial 
          map={dirt}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[0, -MAX_HEIGHT * 0.05, 0]}>
        <cylinderGeometry args={[17.5, 17.5, MAX_HEIGHT*0.1, 50]} />
        <meshPhysicalMaterial 
          map={dirt}
          side={DoubleSide}
        />
      </mesh>
    </>
  )
}

function CreateStone(props) {
  const [stone] = useLoader(TextureLoader, [stoneMap]); 
  const px = Math.random() * 0.5;
  const py = Math.random() * 0.5;
  const position = {...props.position};
  const position2 = []
  if(position[2] > MAX_HEIGHT* 0.85 || Math.random() < 0.05){
  return(
    <mesh
    position={[position[0]+px,position[2],position[1]+px]}
    
    >
      <sphereGeometry
        args={[Math.random() * 0.3 + 0.1, 7 , 7]}
        
      />
      <meshStandardMaterial
        map={stone}
      />
    </mesh>
  )
  }
  else{
   return null
  }
}

function CalculateTex(height){
  const stoneHeight  =  MAX_HEIGHT* 0.8;
  const dirtHeight  =  MAX_HEIGHT* 0.7;
  const grassHeight =  MAX_HEIGHT* 0.5;
  const sandHeight  =  MAX_HEIGHT* 0.3;
  const dirt2Height =  MAX_HEIGHT* 0;

  if(height > stoneHeight)
    return "stone";
  else if(height > dirtHeight)
    return "dirt";
  else if(height > grassHeight)
    return "grass";
  else if(height > sandHeight)
    return "sand";
  else if(height > dirt2Height)
    return "dirt2";
}

function MakePositions (size){

  let positions = [];
  let cnt = 0;
  const simplex = new SimplexNoise();
  
    for(var i=0-size; i<=size; i++){
      for(var j=0-size; j<=size; j++){
        //offset manipulation
        //und auf treeJS vector schreiben
        let x = (i+(j%2)*0.5)*1.77;
        let y = j * 1.535;
        let vec = new Vector2(x,y);

        //kreis erzeugen, nur werte zulassen die 
        //innherhalb des kreises liegen
        if(vec.length() > 15) continue;

        //erzeugt die gleichm????igen h??hen der hex
        let noise = (simplex.noise2D(i * 0.1, j * 0.1) +1 )* 0.5;
        noise = Math.pow(noise, 1.5);
        //console.log(noise);

        

        positions[cnt++] = [x, y, noise*MAX_HEIGHT];
        //console.log(dict);
      }
    }
    
  return(
    positions
  )
}


function App() {

  //Array erzeugen f??r positionen und anzahl der hexagons
  var positions = MakePositions(15);

  return (

    <Canvas
      
    >
      <Suspense fallback={null}>
      <ambientLight intensity={0.03} />
      <pointLight 
        
        args={[0xff724f, 4, 100]}
        position={[25, 25, 25]}
        
      />
      
      <MapContainer />
      <Water />

      
      
      
      {positions.map((position) =>
          <Hex position={position}/>
      )}
      
      <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          zoomSpeed={0.7}
          maxDistance={40}
          minDistance={20}
          minPolarAngle={0}
          maxPolarAngle={1.5}

        />
     

     
     </Suspense>
    </Canvas>
    
  );
}

export default App;
