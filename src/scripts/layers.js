/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;
var renderer;

require([
    "esri/geometry/Extent",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    "esri/renderers/UniqueValueRenderer",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/domReady!"
], function(
    Extent,
    WMSLayerInfo,
    FeatureLayer,
    UniqueValueRenderer,
    SimpleLineSymbol,
    SimpleMarkerSymbol
) {

    var defaultSymbol = null;
    renderer = new UniqueValueRenderer(defaultSymbol, "all_pest_trends.trend_int");

    var over50 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 15,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([255,0,0]), 1),
        new esri.Color([255,0,0,0.25]));
    var midUp = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([255,0,0]), 1),
        new esri.Color([255,0,0,0.25]));
    var under25 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 5,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([255,0,0]), 1),
        new esri.Color([255,0,0,0.25]));
    var zero = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 5,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([255,255,255]), 1),
        new esri.Color([0,0,0,0.25]));
    var under0 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 5,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([0,255,0]), 1),
        new esri.Color([0,255,0,0.25]));
    var underNeg25 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([0,255,0]), 1),
        new esri.Color([0,255,0,0.25]));
    var underNeg50 = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 15,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([0,255,0]), 1),
        new esri.Color([0,255,0,0.25]));

    renderer.addValue(3, over50);
    renderer.addValue(2, midUp);
    renderer.addValue(1, under25);
    renderer.addValue(0, zero);
    renderer.addValue(-1, under0);
    renderer.addValue(-2, underNeg25);
    renderer.addValue(-3, underNeg50);

    allLayers = [//
        {
            "groupHeading": "sites",
            "showGroupHeading": false,
            "includeInLayerList": false,
            "layers": {
                "pest layer": {
                    "url": "https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites/MapServer/0",
                    "options": {
                        "id": "pestSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend": true
                    }
                },
                "Eco Sites layer" : {
                    "url": "https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites/MapServer/1",
                    "options": {
                        "id": "ecoSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                },
                "WRTDS Concentration Sites" : {
                    "url": "https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites/MapServer/2",
                    "options": {
                        "id": "wrtdsSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["wrtds_sites.Station_nm","wrtds_sites.Site_no","wrtds_sites.staAbbrev","wrtds_sites.agency1","wrtds_trends_wm_new.agency_1_full","wrtds_trends_wm_new.agency_2_full","wrtds_sites.db_source","wrtds_sites.dec_lat_va","wrtds_sites.dec_long_va","wrtds_sites.drainSqKm","wrtds_sites.huc_cd","wrtds_trends_wm_new.DA"],
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                },
                "WRTDS Flux Sites" : {
                    "url": "https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites/MapServer/3",
                    "options": {
                        "id": "wrtdsFluxSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["wrtds_sites.Station_nm","wrtds_sites.Site_no","wrtds_sites.staAbbrev","wrtds_sites.agency1","wrtds_trends_wm_new.agency_1_full","wrtds_trends_wm_new.agency_2_full","wrtds_sites.db_source","wrtds_sites.dec_lat_va","wrtds_sites.dec_long_va","wrtds_sites.drainSqKm","wrtds_sites.huc_cd","wrtds_trends_wm_new.DA"],
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                },
                "2012": {
                    "url": "https://supermario.wim.usgs.gov/arcgis/rest/services/SWTrends/lu2012_100515_test/ImageServer",
                    "options": {
                        "id": "lu2012",
                        "opacity": 0.5,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisImage",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Land use",
                        "hasOpacitySlider": true,
                        "includeLegend": true
                    }
                },
                "2002": {
                    "url": "https://supermario.wim.usgs.gov/arcgis/rest/services/SWTrends/lu2002_100515_test/ImageServer",
                    "options": {
                        "id": "lu2002",
                        "opacity": 0.5,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisImage",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Land use",
                        "hasOpacitySlider": true,
                        "includeLegend": true
                    }
                },
                "1992": {
                    "url": "https://supermario.wim.usgs.gov/arcgis/rest/services/SWTrends/lu1992_100515_test/ImageServer",
                    "options": {
                        "id": "lu1992",
                        "opacity": 0.5,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisImage",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Land use",
                        "hasOpacitySlider": true,
                        "includeLegend": true
                    }
                },
                "1982": {
                    "url": "https://supermario.wim.usgs.gov/arcgis/rest/services/SWTrends/lu1982_100515_test/ImageServer",
                    "options": {
                        "id": "lu1982",
                        "opacity": 0.5,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisImage",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Land use",
                        "hasOpacitySlider": true,
                        "includeLegend": true
                    }
                },
                "1974": {
                    "url": "https://supermario.wim.usgs.gov/arcgis/rest/services/SWTrends/lu1974_100515_test/ImageServer",
                    "options": {
                        "id": "lu1974",
                        "opacity": 0.5,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisImage",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Land use",
                        "hasOpacitySlider": true,
                        "includeLegend": true
                    }
                }
            }
        }
    ]

});





