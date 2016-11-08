/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    "esri/geometry/Extent",
    "esri/InfoTemplate",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    'dojo/domReady!'
], function(
    Extent,
    InfoTemplate,
    WMSLayerInfo,
    FeatureLayer
) {

    var trendInfoTemplate = new InfoTemplate("${shortName}", "HUC:  ${huc_cd}");

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
                        "infoTemplate": trendInfoTemplate,
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





