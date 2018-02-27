var data = {
    "version": 8,
    "sources": {
        "raster-tiles": {
            "type": "raster",
            "tiles": [window.location.origin + window.location.pathname + "raster-tiles/{z}/{x}/{y}.png"],
            "tileSize": 256
        }
    },
    "layers": [{
        "id": "simple-tiles",
        "type": "raster",
        "source": "raster-tiles",
        "minzoom": 12,
        "maxzoom": 17
    }]
};

export default data;
