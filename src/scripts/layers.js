/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    "esri/geometry/Extent",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    'dojo/domReady!'
], function(
    Extent,
    WMSLayerInfo,
    FeatureLayer
) {

    allLayers = [
        {
            "groupHeading": "Trends",
            "showGroupHeading": false,
            "includeInLayerList": true,
            "layers": {
                "NAWQA SW trend sites" : {
                    "url": "http://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/trendInfo/MapServer/0",
                    "options": {
                        "id": "trendSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_ONDEMAND,
                        "outFields": ["*"],
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                }
            }
        }
    ]

});





