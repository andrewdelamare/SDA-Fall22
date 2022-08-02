import React from "react";
import { useRef, useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
export const Map = ({ features, zoom }) => {
  const [loaded, setLoaded] = useState(false);
  const mapContainer = useRef(null);
  mapboxgl.accessToken = process.env.REACT_APP_MAP;
  useEffect(() => {
    try {
      if (loaded) return;
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/arewdn/cl66b8ce6000o14n93c187bpn",
        center: [parseFloat(features[0].x), parseFloat(features[0].y)],
        zoom: zoom,
      });

      // add markers to map
      for (const feature of features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "marker";

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat([parseFloat(feature.x), parseFloat(feature.y)])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3 class="p-2" >${feature.name}</h3><p class="p-2">${feature.osoite}</p>`
              )
          )
          .addTo(map);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, [loaded, features, zoom]);

  return (
    <div
      ref={mapContainer}
      className="map-container min-h-[400px] h-400 w-full"
    />
  );
};
