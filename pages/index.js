import { useEffect } from "react";
import dynamic from "next/dynamic"


const FloorPlan = () => {
  const FloorPlan = dynamic(() => import("../components/FloorMap/FloorMap"), {ssr: false});

  // // Load floor plan
  // useEffect(() => {
  //   let myScript = document.createElement("script");
  //   myScript.setAttribute(
  //     "src",
  //     "https://code.archilogic.com/fpe-sdk/v3.1.x/fpe.js"
  //   );
  //   document.body.appendChild(myScript);
  
  //   console.log("Script loaded")
  //   // myScript.addEventListener("load", scriptLoaded, false);
  // }, [])
  // useEffect(() => {
  //   const container = document.getElementById("demo");
  //   const floorPlan = new FloorPlanEngine(container);
  //   floorPlan.loadScene(demoSceneId, { publishableToken });
  // }, []);


  return (
    <>
      <div id="demo" />
      <FloorPlan />
    </>
  );
};
export default FloorPlan;
