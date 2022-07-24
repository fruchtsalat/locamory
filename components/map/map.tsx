import "../../node_modules/ol/ol.css";
import * as React from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlTileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Box from "@mui/material/Box";

function createMap() {
  const olMap = new OlMap({
    layers: [
      new OlTileLayer({
        source: new OSM(),
      }),
    ],
    view: new OlView({
      center: [0, 0],
      zoom: 1,
    }),
  });

  return olMap;
}

export default function Map() {
  const [olMap, setOlMap] = React.useState<OlMap>();
  const mapRef = React.useRef<HTMLDivElement | null>(null);

  // The map must be created in the useEffect hook, because Next.js tries to
  // execute it on the server and the `document` is not defined in Node.js.
  React.useEffect(() => {
    const newOlMap = createMap(); 
    setOlMap(newOlMap)
  },[]);

  React.useEffect(() => {
    if (!olMap || !mapRef.current) return;

    olMap.setTarget(mapRef.current);

    return () => {
      olMap.unset("target");
    }
  }, [olMap]);

  return <Box ref={mapRef} sx={{ width: "100%", height: "100%" }} />;
}
