import { useEffect } from "next";

const Archilogic = () => {
  useEffect(() => {

    // Load the API
    const script = document.createElement("script");
    script.src = "https://code.archilogic.com/fpe-sdk/v3.1.x/fpe.js";
    script.async = true;
    document.body.appendChild(script);

    // Load floor plan
    const publishableToken = "64d511ba-7415-4270-bc00-56b9e70cb947";
    const demoSceneId = "5f55fa55-549e-4d88-9040-e5cb35f9558c";
    const container = document.getElementById("demo");
    const floorPlan = new FloorPlanEngine(container);
    floorPlan.loadScene(demoSceneId, { publishableToken });

    // Clear
    return () => {
      document.body.removeChild(script);
    };
  }, []);
}
export default Archilogic