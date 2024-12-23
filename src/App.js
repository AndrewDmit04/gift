import React, {useEffect, useState} from 'react'
import AnimatedScene from './SceneOne'
import WrappedSlideshow from './wrapped';

const App = () => {
  const [finished, setFinished] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [scene, setscene] = useState(true);
  useEffect(()=>{
    const showWrapped = () =>{
      setOpacity(100)
    }
    const unrenderScene = () =>{
      setscene(false);
    }
    if(finished){
      setTimeout(showWrapped,1000);
      setTimeout(unrenderScene,1000);
    }
  },[finished])
  return (
    <div>
      {scene ? <AnimatedScene setFinished={setFinished}/> : <></>}
      
      {finished ? <WrappedSlideshow startOpacity={opacity}/> : <></>}
      <WrappedSlideshow startOpacity={opacity}/>
    </div>
  )
}

export default App