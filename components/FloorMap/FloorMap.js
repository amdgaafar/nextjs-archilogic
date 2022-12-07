import FloorPlanEngine from "../../public/js/archilogic";
import axios from "axios";
const publishableToken = "af398be2-6407-4f2f-8f93-2cab7e0e617e";
// const demoSceneId = "5f55fa55-549e-4d88-9040-e5cb35f9558c";
const demoSceneId = "927d6877-3220-472d-9e0d-a43fbba9b730";
let active = {};
const startupOptions = {
  theme: {
    background: {
      color: "#F0F0F0",
    },
    elements: {
      roomStamp: {
        roomStampDisplay: ["name", "customId", "usage", "area"],
      },
    },
  },
};

function FloorMap() {
  const container = document.getElementById("demo");
  const floorPlan = new FloorPlanEngine(container, startupOptions);
  floorPlan.loadScene(demoSceneId, { publishableToken }).then(() => {
    floorPlan.on("click", highlightResources, floorPlan);
  });

  // Fetch data from backend...
  function fetchData() {
    axios({
      method: "get",
      url: "https://be-ai-ims-dev.pintarai.com/api/v1/products",
    });
  }
  console.log("fetching data...");

  function highlightResources(evt) {
    fetchData();
    console.log("Clicked");
    const pos = evt.pos;
    const infoPos = [pos[0], pos[1] - 0.5];
    let { spaces, assets } = this.getResourcesFromPosition(pos);
    highlight(spaces, "space", [170, 74, 68]);
    highlight(assets, "asset", [250, 150, 50]);
    setInfoWindow(infoPos);
  }
  function highlight(items, type, color) {
    if (!items.length) {
      if (active[type]) active[type].node.setHighlight();
      delete active[type];
      return;
    }
    let item = items[0];
    if (active[type]?.id === item.id) return;
    else if (active[type]) active[type].node.setHighlight();
    item.node.setHighlight({ fill: color });
    active[type] = item;
  }
  function setInfoWindow(infoPos) {
    if (active.asset || active.space) {
      const assetCount = active.space.assets.length;
      const inventoryId = active.space.customId;
      console.log(inventoryId);

      const html = `<b>Inventory Id:</b> <br/> <b>${inventoryId}</b> <br/> <br>${assetCount} assets<br>${
        active.asset?.name || ""
      }`;
      if (active.infoWindow) active.infoWindow.set({ pos: infoPos, html });
      else
        active.infoWindow = floorPlan.addInfoWindow({
          pos: infoPos,
          html,
          height: 100,
          width: 150,
          closeButton: false,
        });
    } else if (active.infoWindow) {
      active.infoWindow.remove();
      delete active.infoWindow;
    }
  }
  return <div></div>;
}

export default FloorMap;
