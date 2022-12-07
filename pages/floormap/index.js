import dynamic from "next/dynamic"

const FloorPlan = () => {
  const FloorPlan = dynamic(() => import("../../components/FloorMap/FloorMap"), {
    ssr: false,
  });

  return (
    <>
      <div id="demo" />
      <FloorPlan />
    </>
  );
};
export default FloorPlan;
