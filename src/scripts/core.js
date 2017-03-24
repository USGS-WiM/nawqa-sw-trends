//for jshint
'use strict';
// Generated on 2015-04-13 using generator-wim 0.0.1

/**
 * Created by bdraper on 4/3/2015.
 */

var map;
var allLayers;
var maxLegendHeight;
var maxLegendDivHeight;
var printCount = 0;
var dragInfoWindows = true;
var defaultMapCenter = [-94.106, 35.729];

var constObj;

var currentConstType = "";
var currentSiteNo = "";
var currentConst = "Total Phosphorus";
var currentLayer = "wrtdsSites";


require([
    'esri/arcgis/utils',
    'esri/Color',
    'esri/map',
    'esri/dijit/HomeButton',
    'esri/dijit/LocateButton',
    'esri/layers/ArcGISImageServiceLayer',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/dijit/Geocoder',
    'esri/dijit/PopupTemplate',
    'esri/graphic',
    'esri/geometry/Multipoint',
    'esri/geometry/Point',
    'esri/graphicsUtils',
    'esri/symbols/PictureMarkerSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/tasks/LegendLayer',
    'esri/tasks/PrintTask',
    'esri/tasks/PrintParameters',
    'esri/tasks/PrintTemplate',
    'esri/tasks/query',
    'esri/geometry/webMercatorUtils',
    'dojo/dnd/Moveable',
    'dojo/query',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/on',
    'dojo/domReady!'
], function (
    arcgisUtils,
    Color,
    Map,
    HomeButton,
    LocateButton,
    ArcGISImageServiceLayer,
    ArcGISTiledMapServiceLayer,
    Geocoder,
    PopupTemplate,
    Graphic,
    Multipoint,
    Point,
    graphicsUtils,
    PictureMarkerSymbol,
    SimpleFillSymbol,
    SimpleLineSymbol,
    SimpleMarkerSymbol,
    LegendLayer,
    PrintTask,
    PrintParameters,
    PrintTemplate,
    esriQuery,
    webMercatorUtils,
    Moveable,
    query,
    dom,
    domClass,
    on
) {

    //bring this line back after experiment////////////////////////////
    //allLayers = mapLayers;

    // Added for handling of ajaxTransport in IE
    if (!jQuery.support.cors && window.XDomainRequest) {
        var httpRegEx = /^https?:\/\//i;
        var getOrPostRegEx = /^get|post$/i;
        var sameSchemeRegEx = new RegExp('^'+location.protocol, 'i');
        var xmlRegEx = /\/xml/i;

        /*esri.addProxyRule({
            urlPrefix: "http://commons.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools",
            proxyUrl: "http://commons.wim.usgs.gov/resource-proxy/proxy.ashx"
        });*/

        // ajaxTransport exists in jQuery 1.5+
        jQuery.ajaxTransport('text html xml json', function(options, userOptions, jqXHR){
            // XDomainRequests must be: asynchronous, GET or POST methods, HTTP or HTTPS protocol, and same scheme as calling page
            if (options.crossDomain && options.async && getOrPostRegEx.test(options.type) && httpRegEx.test(userOptions.url) && sameSchemeRegEx.test(userOptions.url)) {
                var xdr = null;
                var userType = (userOptions.dataType||'').toLowerCase();
                return {
                    send: function(headers, complete){
                        xdr = new XDomainRequest();
                        if (/^\d+$/.test(userOptions.timeout)) {
                            xdr.timeout = userOptions.timeout;
                        }
                        xdr.ontimeout = function(){
                            complete(500, 'timeout');
                        };
                        xdr.onload = function(){
                            var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
                            var status = {
                                code: 200,
                                message: 'success'
                            };
                            var responses = {
                                text: xdr.responseText
                            };

                            try {
                                if (userType === 'json') {
                                    try {
                                        responses.json = JSON.parse(xdr.responseText);
                                    } catch(e) {
                                        status.code = 500;
                                        status.message = 'parseerror';
                                        //throw 'Invalid JSON: ' + xdr.responseText;
                                    }
                                } else if ((userType === 'xml') || ((userType !== 'text') && xmlRegEx.test(xdr.contentType))) {
                                    var doc = new ActiveXObject('Microsoft.XMLDOM');
                                    doc.async = true;
                                    try {
                                        doc.loadXML(xdr.responseText);
                                    } catch(e) {
                                        doc = undefined;
                                    }
                                    if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
                                        status.code = 500;
                                        status.message = 'parseerror';
                                        throw 'Invalid XML: ' + xdr.responseText;
                                    }
                                    responses.xml = doc;
                                }
                            } catch(parseMessage) {
                                throw parseMessage;
                            } finally {
                                complete(status.code, status.message, responses, allResponseHeaders);
                            }
                        };
                        xdr.onerror = function(){
                            complete(500, 'error', {
                                text: xdr.responseText
                            });
                        };
                        xdr.open(options.type, options.url);
                        //xdr.send(userOptions.data);
                        xdr.send();
                    },
                    abort: function(){
                        if (xdr) {
                            xdr.abort();
                        }
                    }
                };
            }
        });
    };

    jQuery.support.cors = true;

    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites/MapServer/4/query?where=include_in_mapper_+%3D+%27include%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=Model%2CParameter_name&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json',
        headers: {'Accept': '*/*'},
        success: function (data) {
            constObj = data;
            $.each(data.features, function(key, value) {
                if (value.attributes.Model != null) {
                    if (value.attributes.Model == 'SEAWAVE-Q') {
                        $('#pesticideSelect')
                            .append($("<option></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    } else if (value.attributes.Tentative____Parameter_group == 'Algae') { //Eco group
                        $('#algaeSelect')
                            .append($("<option title='" + value.attributes.eco_desc + "'></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    } else if (value.attributes.Tentative____Parameter_group == 'Fish') { //Eco group
                        $('#fishSelect')
                            .append($("<option title='" + value.attributes.eco_desc + "'></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    } else if (value.attributes.Tentative____Parameter_group == 'Macroinvertebrates') { //Eco group
                        $('#macroinvertSelect')
                            .append($("<option title='" + value.attributes.eco_desc + "'></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    } else if (value.attributes.Tentative____Parameter_group == 'Carbon') {
                        $('#carbonSelect')
                            .append($("<option></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    } else if (value.attributes.Tentative____Parameter_group == 'Major ions') {
                        $('#majorIonsSelect')
                            .append($("<option></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    } else if (value.attributes.Tentative____Parameter_group == 'Nutrients') {
                        $('#nutrientsSelect')
                            .append($("<option></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    } else if (value.attributes.Tentative____Parameter_group == 'Salinity') {
                        $('#salinitySelect')
                            .append($("<option></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    } else if (value.attributes.Tentative____Parameter_group == 'Sediment') {
                        $('#sedimentSelect')
                            .append($("<option></option>")
                                .attr(value.attributes)
                                .text(value.attributes.Parameter_name));
                    }
                }
            });
            $('#typeSelect').val("Nutrients");
            $('#nutrientsSelect').val("Total Phosphorus");
            $('#ecologySelect').val("DiaHighMot");
            $('#pesticideSelect').val("Acetochlor")

            $('#algaeSelect')[0].title = $('#algaeSelect')[0][0].title;
            $('#fishSelect')[0].title = $('#fishSelect')[0][0].title;
            $('#macroinvertSelect')[0].title = $('#macroinvertSelect')[0][0].title;

            //document.getElementById("typeSelect").selectedIndex = "1";
            //document.getElementById("nutrientsSelect").selectedIndex = "17";
        },
        error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
        }
    });

    map = Map('mapDiv', {
        basemap: 'topo',
        //center: [-95.6, 38.6],
        center: defaultMapCenter,
        zoom: 5
    });
    //button for returning to initial extent
    var home = new HomeButton({
        map: map
    }, "homeButton");
    home.startup();
    //button for finding and zooming to user's location
    var locate = new LocateButton({
        map: map
    }, "locateButton");
    locate.startup();

    $('#legendButton').click();

    //following block forces map size to override problems with default behavior
    $(window).resize(function () {
        /*if ($("#legendCollapse").hasClass('in')) {
            maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('height', maxLegendHeight);
            $('#legendElement').css('max-height', maxLegendHeight);
            maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
            $('#legendDiv').css('max-height', maxLegendDivHeight);
        }
        else {
            $('#legendElement').css('height', 'initial');
        }*/
    });

    // All code for handling IE warning popup
    $("#IEwarnContinue").click(function () {
        $('#aboutModal').modal({backdrop: 'static'});
        $('#aboutModal').modal('show');
    });

    if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0){
        $("#IEwarningModal").modal('show');
    } else {
        $('#aboutModal').modal({backdrop: 'static'});
        $('#aboutModal').modal('show');
    }
    // End IE warning code

    $('#printExecuteButton').click(function (e) {
        e.preventDefault();
        $(this).button('loading');
        printMap();
    });

    function showPrintModal() {
        $('#printModal').modal('show');
    }

    map.on('extent-change', function(event) {
        //alert(event);
    });

    $('#printNavButton').click(function(){
        var trendPeriodVal = $("input:radio[name='trendPeriod']:checked").val();

        var trendPeriod = "";
        if (trendPeriodVal == "P10") {
            trendPeriod = "2002";
        } else if (trendPeriodVal == "P20") {
            trendPeriod = "1992";
        } else if (trendPeriodVal == "P30") {
            trendPeriod = "1982";
        } else if (trendPeriodVal == "P40") {
            trendPeriod = "1972";
        }

        var trendTypeVal = $('input[name=trendType]:checked').val();
        trendTypeVal = trendTypeVal.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        var printTitle = getPrintTitle();
        $("#printTitle").text(printTitle);
        showPrintModal();
    });

    function getPrintTitle() {
        var printTitle = ""

        var trendPeriodVal = $("input:radio[name='trendPeriod']:checked").val();

        var trendPeriod = "";
        if (trendPeriodVal == "P10") {
            trendPeriod = "2002";
        } else if (trendPeriodVal == "P20") {
            trendPeriod = "1992";
        } else if (trendPeriodVal == "P30") {
            trendPeriod = "1982";
        } else if (trendPeriodVal == "P40") {
            trendPeriod = "1972";
        }

        var trendTypeVal = $('input[name=trendType]:checked').val();
        trendTypeVal = trendTypeVal.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        var selectVal = $("#typeSelect")[0].value;
        if (selectVal == "Pesticides" || selectVal == "Nutrients" || selectVal == "Carbon" || selectVal == "Major ions" || selectVal == "Salinity" || selectVal == "Sediment") {
            printTitle = trendTypeVal + " trend results (flow normalized) for " + currentConst + " in surface water for " + trendPeriod + "-2012";
        } else if (selectVal == "Algae" || selectVal == "Fish" || selectVal == "Macroinvertebrates") {
            printTitle = "Trend results (flow normalized) for " + currentConst + " in surface water for " + trendPeriod + "-2012";
        }

        return printTitle;
    }

    var layers_all = ["pestSites","ecoSites","wrtdsSites","wrtdsFluxSites"];

    $("#typeSelect").on('change', function (event) {

        $("#siteInfoDiv").css("visibility", "hidden");
        map.graphics.clear();

        var val = event.currentTarget.value;
        $(".constSelect").hide();
        $.each(layers_all, function(key,value){
           map.getLayer(value).setVisibility(false);
        });
        if (val == "Pesticides" || val == "Algae" || val == "Fish" || val == "Macroinvertebrates") {
            if (!$("#trend1input").checked && !$("#trend2input").checked) {
                $("#trend1input").prop("checked", true);
            }
        }

        var selectVal = event.currentTarget[event.currentTarget.selectedIndex].attributes["select"].value
        $(selectVal).show();

        currentConst = selectVal;

        if (val == "Nutrients" || val == "Carbon" || val == "Major ions" || val == "Salinity" || val == "Sediment") {
            $("#trendTypes").show();
            $("#trend4,#trend3").show();
            wrtdsSelect();
        } else if (val == "Pesticides") {
            $("#trendTypes").show();
            $("#trend4,#trend3").hide();
            $("#load").prop('disabled', false);
            pestSelect();
        } else if (val == "Algae" || val == "Fish" || val == "Macroinvertebrates") {
            $("#trendTypes").hide();
            $("#trend4,#trend3").hide();
            $("#load").prop('disabled', false);
            ecoSelect();
        }
    });

    function layerUpdateListener(layer) {
        var layerUpdate = map.getLayer(layer).on('update-end', function(evt) {
            var graphicsNum = evt.target.graphics.length;
            if (graphicsNum == 0) {
                //alert("No sites are available for this constituent and trend period. Please select another option.");
                $(".alert-box").show();
            } else {
                $(".alert-box").hide();
            }
            layerUpdate.remove();
        });
        map.getLayer(layer).refresh();
    }

    function pestSelect() {
        var val = $("#pesticideSelect").val();
        currentConst = val;
        var trendPeriod = $('input[name=trendPeriod]:checked').val();
        var expression = "Pesticide = '" + val + "' AND period = '" + trendPeriod + "'";
        map.getLayer("pestSites").setDefinitionExpression(expression);
        map.getLayer("pestSites").setVisibility(true);
        layerUpdateListener("pestSites");
    }

    function ecoSelect() {
        var val = "";
        var selectVal = $($("#typeSelect")[0][$("#typeSelect")[0].selectedIndex].attributes["select"].value).val();
        currentConst = selectVal;
        var trendPeriodVal = $('input[name=trendPeriod]:checked').val();
        var trendPeriod = "";
        if (trendPeriodVal == "P10") {
            trendPeriod = "AND (EcoTrendResults_Nyear = 8 OR EcoTrendResults_Nyear = 9 OR EcoTrendResults_Nyear = 10 OR EcoTrendResults_Nyear = 11)";
        } else if (trendPeriodVal == "P20") {
            trendPeriod = "AND (EcoTrendResults_Nyear = 18 OR EcoTrendResults_Nyear = 19 OR EcoTrendResults_Nyear = 20)";
        }
        var expression = "EcoTrendResults_y = '" + selectVal + "' " + trendPeriod;
        console.log(expression);
        map.getLayer("ecoSites").setDefinitionExpression("");
        map.getLayer("ecoSites").setDefinitionExpression(expression);
        map.getLayer("ecoSites").setVisibility(true);
        layerUpdateListener("ecoSites");
    }

    function wrtdsSelect() {
        var val = "";
        var typeSelectVal = $("#typeSelect").val()
        var constVal = $($("#typeSelect")[0][$("#typeSelect")[0].selectedIndex].attributes["select"].value).val();
        currentConst = constVal;
        if (typeSelectVal == "Nutrients") {
            val = $("#nutrientsSelect").val();
        } else if (typeSelectVal == "Carbon") {
            val = $("#carbonSelect").val();
        } else if (typeSelectVal == "Major ions") {
            val = $("#majorIonsSelect").val();
        } else if (typeSelectVal == "Salinity") {
            val = $("#salinitySelect").val();
        } else if (typeSelectVal == "Sediment") {
            val = $("#sedimentSelect").val();
        }

        if (val == "Specific conductance") {
            $("#load").prop('disabled', true);
            $('input:radio[name=trendType]')[0].checked = true;
        } else {
            $("#load").prop('disabled', false);
        }

        var trendTypeVal = $('input[name=trendType]:checked').val();
        var layer;
        var layerID;
        if (trendTypeVal == "concentration") {
            layer = map.getLayer("wrtdsSites");
            layerID = "wrtdsSites";
            layer.setVisibility(true);
        } else if (trendTypeVal == "load") {
            layer = map.getLayer("wrtdsFluxSites");
            layerID = "wrtdsFluxSites";
            layer.setVisibility(true);
        }

        var trendPeriodVal = $('input[name=trendPeriod]:checked').val();
        var trendPeriod = "";
        var trendPeriod2 = "";
        if (trendPeriodVal == "P10") {
            trendPeriod = "2002";
            trendPeriod2 = "2003"
        } else if (trendPeriodVal == "P20") {
            trendPeriod = "1992";
            trendPeriod2 = "1993"
        } else if (trendPeriodVal == "P30") {
            trendPeriod = "1982";
            trendPeriod2 = "1983"
        } else if (trendPeriodVal == "P40") {
            trendPeriod = "1972";
            trendPeriod2 = "1973"
        }
        var expression = "wrtds_trends_wm_new.id_unique LIKE '%" + val + "%" + trendPeriod + "%' OR wrtds_trends_wm_new.id_unique LIKE '%" + val + "%" + trendPeriod2 + "%'";
        layer.setDefinitionExpression(expression);
        layerUpdateListener(layerID);
    }

    $("#pesticideSelect").on("change", function(event) {
        $("#siteInfoDiv").css("visibility", "hidden");
        map.graphics.clear();
        var val = event.currentTarget.value;
        currentConst = val;
        var trendPeriod = $('input[name=trendPeriod]:checked').val();
        var expression = "Pesticide = '" + val + "' AND period = '" + trendPeriod + "'";
        map.getLayer("pestSites").setDefinitionExpression(expression);
        layerUpdateListener("pestSites");
    });

    $(".ecoSelect").on("change", function(event) {
        $("#siteInfoDiv").css("visibility", "hidden");
        map.graphics.clear();
        var val = event.currentTarget.value;

        event.currentTarget.title = event.currentTarget[event.currentTarget.selectedIndex].title

        currentConst = val;
        var trendPeriodVal = $('input[name=trendPeriod]:checked').val();
        var trendPeriod = "";
        if (trendPeriodVal == "P10") {
            trendPeriod = "AND (EcoTrendResults_Nyear  = 8 OR EcoTrendResults_Nyear  = 9 OR EcoTrendResults_Nyear  = 10 OR EcoTrendResults_Nyear  = 11)";
        } else if (trendPeriodVal == "P20") {
            trendPeriod = "AND (EcoTrendResults_Nyear  = 18 OR EcoTrendResults_Nyear  = 19 OR EcoTrendResults_Nyear  = 20)";
        }
        var expression = "EcoTrendResults_y = '" + val + "' " + trendPeriod;
        map.getLayer("ecoSites").setDefinitionExpression(expression);
        layerUpdateListener("ecoSites");
    });

    $(".wrtdsSelect").on("change", function(event) {
        $("#siteInfoDiv").css("visibility", "hidden");
        map.graphics.clear();
        var val = event.currentTarget.value;

        currentConst = val;
        var layer;
        var layerID;
        if (val == "Specific conductance") {
            $("#load").prop('disabled', true);
            $('input:radio[name=trendType]')[0].checked = true;
        } else {
            $("#load").prop('disabled', false);
        }

        var trendTypeVal = $('input[name=trendType]:checked').val();
        if (trendTypeVal == "concentration") {
            layer = map.getLayer("wrtdsSites");
            layerID = "wrtdsSites";
            layer.setVisibility(true);
        } else if (trendTypeVal == "load") {
            layer = map.getLayer("wrtdsFluxSites");
            layerID = "wrtdsFluxSites";
            layer.setVisibility(true);
        }

        var trendPeriodVal = $('input[name=trendPeriod]:checked').val();
        var trendPeriod = "";
        var trendPeriod2 = "";
        if (trendPeriodVal == "P10") {
            trendPeriod = "2002";
            trendPeriod2 = "2003"
        } else if (trendPeriodVal == "P20") {
            trendPeriod = "1992";
            trendPeriod2 = "1993"
        } else if (trendPeriodVal == "P30") {
            trendPeriod = "1982";
            trendPeriod2 = "1983"
        } else if (trendPeriodVal == "P40") {
            trendPeriod = "1972";
            trendPeriod2 = "1973"
        }
        var expression = "wrtds_trends_wm_new.id_unique LIKE '%" + val + "%" + trendPeriod + "%' OR wrtds_trends_wm_new.id_unique LIKE '%" + val + "%" + trendPeriod2 + "%'";
        layer.setDefinitionExpression(expression);
        layerUpdateListener(layerID);
    });

    $(".trendPeriod").on("change", function(event) {
        $("#siteInfoDiv").css("visibility", "hidden");
        map.graphics.clear();
        var val = event.currentTarget.value;
        var selectVal = $($("#typeSelect")[0][$("#typeSelect")[0].selectedIndex].attributes["select"].value).val();
        if ($("#typeSelect")[0].value == "Pesticides") {
            var selectVal = $("#pesticideSelect").val();
            currentConst = selectVal;
            var expression = "Pesticide = '" + selectVal + "' AND period = '" + val + "'";
            map.getLayer("pestSites").setDefinitionExpression(expression);
            layerUpdateListener("pestSites");
        } else if ($("#typeSelect")[0].value == "Algae" || $("#typeSelect")[0].value == "Fish" || $("#typeSelect")[0].value == "Macroinvertebrates") {
            var trendPeriod = "";
            currentConst = selectVal;
            if (val == "P10") {
                trendPeriod = "AND (EcoTrendResults_Nyear  = 8 OR EcoTrendResults_Nyear  = 9 OR EcoTrendResults_Nyear  = 10 OR EcoTrendResults_Nyear  = 11)";
            } else if (val == "P20") {
                trendPeriod = "AND (EcoTrendResults_Nyear  = 18 OR EcoTrendResults_Nyear  = 19 OR EcoTrendResults_Nyear  = 20)";
            }
            var expression = "EcoTrendResults_y = '" + selectVal + "' " + trendPeriod;
            console.log(expression);
            map.getLayer("ecoSites").setDefinitionExpression(expression);
            layerUpdateListener("ecoSites");
        } else if ($("#typeSelect")[0].value == "Nutrients" || $("#typeSelect")[0].value == "Carbon" || $("#typeSelect")[0].value == "Major ions" || $("#typeSelect")[0].value == "Salinity" || $("#typeSelect")[0].value == "Sediment") {
            var layer;
            var layerID;
            var trendTypeVal = $('input[name=trendType]:checked').val();
            if (trendTypeVal == "concentration") {
                layer = map.getLayer("wrtdsSites");
                layerID = "wrtdsSites";
                layer.setVisibility(true);
                map.getLayer("wrtdsFluxSites").setVisibility(false);
            } else if (trendTypeVal == "load") {
                layer = map.getLayer("wrtdsFluxSites");
                layerID = "wrtdsFluxSites";
                layer.setVisibility(true);
                map.getLayer("wrtdsSites").setVisibility(false);
            }

            var trendPeriod = "";
            var trendPeriod2 = "";
            if (val == "P10") {
                trendPeriod = "2002";
                trendPeriod2 = "2003"
            } else if (val == "P20") {
                trendPeriod = "1992";
                trendPeriod2 = "1993"
            } else if (val == "P30") {
                trendPeriod = "1982";
                trendPeriod2 = "1983"
            } else if (val == "P40") {
                trendPeriod = "1972";
                trendPeriod2 = "1973"
            }
            var selectVal = $($("#typeSelect")[0][$("#typeSelect")[0].selectedIndex].attributes["select"].value).val();
            currentConst = selectVal;
            var expression = "wrtds_trends_wm_new.id_unique LIKE '%" + selectVal + "%" + trendPeriod + "%' OR wrtds_trends_wm_new.id_unique LIKE '%" + selectVal + "%" + trendPeriod2 + "%'";
            layer.setDefinitionExpression(expression);
            layerUpdateListener(layerID);
        }
    });

    $(".trendType").on("change", function(event) {
        $("#siteInfoDiv").css("visibility", "hidden");
        map.graphics.clear();
        var val = event.currentTarget.value;
        var selectVal = $($("#typeSelect")[0][$("#typeSelect")[0].selectedIndex].attributes["select"].value).val();
        if ($("#typeSelect")[0].value == "Pesticides") {

        } else if ($("#typeSelect")[0].value == "Algae" || $("#typeSelect")[0].value == "Fish" || $("#typeSelect")[0].value == "Macroinvertebrates") {

        } else if ($("#typeSelect")[0].value == "Nutrients" || $("#typeSelect")[0].value == "Carbon" || $("#typeSelect")[0].value == "Major ions" || $("#typeSelect")[0].value == "Salinity" || $("#typeSelect")[0].value == "Sediment") {
            var layer;
            var layerID;
            $.each(layers_all, function(key,value){
                map.getLayer(value).setVisibility(false);
            });

            if (val == "concentration") {
                layer = map.getLayer("wrtdsSites");
                layerID = "wrtdsSites";
            } else if (val == "load") {
                layer = map.getLayer("wrtdsFluxSites");
                layerID = "wrtdsFluxSites";
            }

            var trendPeriodVal = $('input[name=trendPeriod]:checked').val();
            var trendPeriod = "";
            var trendPeriod2 = "";
            if (trendPeriodVal == "P10") {
                trendPeriod = "2002";
                trendPeriod2 = "2003"
            } else if (trendPeriodVal == "P20") {
                trendPeriod = "1992";
                trendPeriod2 = "1993"
            } else if (trendPeriodVal == "P30") {
                trendPeriod = "1982";
                trendPeriod2 = "1983"
            } else if (trendPeriodVal == "P40") {
                trendPeriod = "1972";
                trendPeriod2 = "1973"
            }

            currentConst = selectVal;
            var expression = "wrtds_trends_wm_new.id_unique LIKE '%" + selectVal + "%" + trendPeriod + "%' OR wrtds_trends_wm_new.id_unique LIKE '%" + selectVal + "%" + trendPeriod2 + "%'";

            layer.setDefinitionExpression(expression);
            layer.setVisibility(true);
            layerUpdateListener(layerID);
        }

    });

    //displays map scale on map load
    on(map, "load", function() {
        var scale =  map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
        var initMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
        $('#latitude').html(initMapCenter.y.toFixed(3));
        $('#longitude').html(initMapCenter.x.toFixed(3));

        //code for adding draggability to infoWindow. http://www.gavinr.com/2015/04/13/arcgis-javascript-draggable-infowindow/
        if (dragInfoWindows == true) {
            var handle = query(".title", map.infoWindow.domNode)[0];
            var dnd = new Moveable(map.infoWindow.domNode, {
                handle: handle
            });

            // when the infoWindow is moved, hide the arrow:
            on(dnd, 'FirstMove', function() {
                // hide pointer and outerpointer (used depending on where the pointer is shown)
                var arrowNode =  query(".outerPointer", map.infoWindow.domNode)[0];
                domClass.add(arrowNode, "hidden");

                var arrowNode =  query(".pointer", map.infoWindow.domNode)[0];
                domClass.add(arrowNode, "hidden");
            }.bind(this));
        }
    });
    //displays map scale on scale change (i.e. zoom level)
    on(map, "zoom-end", function () {
        var scale =  map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
    });

    //Supdates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
    on(map, "mouse-move", function (cursorPosition) {
        $('#mapCenterLabel').css("display", "none");
        if (cursorPosition.mapPoint != null) {
            var geographicMapPt = webMercatorUtils.webMercatorToGeographic(cursorPosition.mapPoint);
            $('#latitude').html(geographicMapPt.y.toFixed(3));
            $('#longitude').html(geographicMapPt.x.toFixed(3));
        }
    });
    //updates lat/lng indicator to map center after pan and shows "map center" label.
    on(map, "pan-end", function () {
        //displays latitude and longitude of map center
        $('#mapCenterLabel').css("display", "inline");
        var geographicMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
        $('#latitude').html(geographicMapCenter.y.toFixed(3));
        $('#longitude').html(geographicMapCenter.x.toFixed(3));
    });

    var nationalMapBasemap = new ArcGISTiledMapServiceLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer');
    //on clicks to swap basemap. map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
    on(dom.byId('btnStreets'), 'click', function () {
        map.setBasemap('streets');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnSatellite'), 'click', function () {
        map.setBasemap('satellite');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnHybrid'), 'click', function () {
        map.setBasemap('hybrid');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnTerrain'), 'click', function () {
        map.setBasemap('terrain');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnGray'), 'click', function () {
        map.setBasemap('gray');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnNatGeo'), 'click', function () {
        map.setBasemap('national-geographic');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnOSM'), 'click', function () {
        map.setBasemap('osm');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnTopo'), 'click', function () {
        map.setBasemap('topo');
        map.removeLayer(nationalMapBasemap);
    });

    on(dom.byId('btnNatlMap'), 'click', function () {
        map.addLayer(nationalMapBasemap);
    });

    //end code for adding draggability to infoWindow

    on(map, "click", function(evt) {
        /*var graphic = new Graphic();

        var feature = graphic;

        var template = new esri.InfoTemplate("test popup",
            "attributes and stuff go here");

        //ties the above defined InfoTemplate to the feature result returned from a click event

        feature.setInfoTemplate(template);

        map.infoWindow.setFeatures([feature]);
        map.infoWindow.show(evt.mapPoint);

        map.infoWindow.show();*/
    });

    // Using Lobipanel: https://github.com/arboshiki/lobipanel
    $("#siteInfoDiv").lobiPanel({
        unpin: false,
        reload: false,
        minimize: false,
        close: false,
        expand: false,
        editTitle: false,
        maxWidth: 800,
        maxHeight: 500
    });

    $("#siteInfoDiv .dropdown").prepend("<div id='siteInfoClose' title='close'><b>X</b></div>");
    $("#siteInfoDiv .dropdown").prepend("<div id='siteInfoMin' title='collapse'><b>_</b></div>");

    $("#siteInfoMin").click(function(){
        $("#siteInfoDiv").css("visibility", "hidden");
    });

    $("#siteInfoClose").click(function(){
        $("#siteInfoDiv").css("visibility", "hidden");
        map.graphics.clear();
    });

    var pestPDFs = "";

    map.on('layer-add', function (evt) {
        var layer = evt.layer.id;
        var actualLayer = evt.layer;

        if (layer == "pestSites" || layer == "wrtdsSites" || layer == "ecoSites" || layer == "wrtdsFluxSites") {

            /*var layerUpdate = on(map.getLayer(layer), 'update-end', function(evt) {
                if (layer != currentLayer) {
                    currentLayer = layer;
                    alert(layer);
                }
            });*/

            if (layer == "wrtdsSites") {
                var graphics = map.getLayer("wrtdsSites").graphics;
                map.getLayer("wrtdsSites").setDefinitionExpression("wrtds_trends_wm_new.id_unique LIKE '%Total Phosphorus%2002' OR wrtds_trends_wm_new.id_unique LIKE '%Total Phosphorus%2003'");
                map.getLayer("wrtdsSites").setVisibility(true);
            }

            map.getLayer(layer).on('click', function (evt) {

                map.graphics.clear();
                var symbol = new SimpleMarkerSymbol();
                symbol.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);
                symbol.setColor(new Color([0,0,0,0.0]));
                symbol.setSize("20");
                var outline = new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([0,255,255]),
                    2
                );
                symbol.setOutline(outline);

                var pt = new Point(evt.mapPoint.x,evt.mapPoint.y,map.spatialReference)
                var newGraphic = new Graphic(evt.graphic.geometry, symbol);

                //newGraphic.setSymbol(symbol);
                //map.graphics.add(evt.graphic)
                map.graphics.add(newGraphic);

                if (layer == "ecoSites") {
                    $("#charts").hide();
                } else {
                    $("#charts").show();
                }


                $("#siteInfoDiv").css("visibility", "visible");
                var instance = $('#siteInfoDiv').data('lobiPanel');
                var docHeight = $(document).height();
                var docWidth = $(document).width();
                var percentageOfScreen = 0.9;
                var siteInfoHeight = docHeight*percentageOfScreen
                var siteInfoWidth = docWidth*percentageOfScreen;
                if (docHeight < 500) {
                    $("#siteInfoDiv").height(siteInfoHeight);
                }
                if (docWidth < 500) {
                    $("#siteInfoDiv").width(siteInfoWidth);
                }

                //var instanceX = docWidth*0.5-$("#siteInfoDiv").width()*0.5;
                //var instanceY = docHeight*0.5-$("#siteInfoDiv").height()*0.5;
                var instanceX = evt.x;
                var instanceY = evt.y;

                instance.setPosition(instanceX, instanceY);
                if (instance.isPinned() == true) {
                    instance.unpin();
                }

                var attr = evt.graphic.attributes;

                $("#siteInfoTabPane").empty();

                currentLayer = layer;



                if (layer == "ecoSites") {
                    currentSiteNo = attr.EcoTrendResults_EcoSiteID;
                    $("#siteInfoTabPane").append("<br/><b>Site name: </b>" + attr.EcoSiteSummary_no_headers_csv_Ecology_site_name + "<br/>" +
                        "<b>Site number: </b>" + attr.EcoTrendResults_EcoSiteID + "<br/>" +
                        /*"<b>State: </b>" +  + "<br/>" +*/
                        "<b>Agency: </b>U.S. Geological Survey<br/>" +
                        "<b>Data source: </b>BioData<br/>" +
                        "<b>Latitude: </b>" + attr.EcoSiteSummary_no_headers_csv_LatDD + "<br/>" +
                        "<b>Longitude: </b>" + attr.EcoSiteSummary_no_headers_csv_LngDD + "<br/>" +
                        "<b>Drainage area: </b>" + attr.DA + " (km<sup>2</sup>)<br/>"/* +
                        "<b>HUC2: </b>" +  + "<br/>" +
                        "<b>HUC4: </b>" +  + "<br/>" +
                        "<b>HUC6: </b>" +  + "<br/>" +
                        "<b>HUC8: </b>" +  + "<br/>" +
                        "<b>Matched streamgage name: </b>" +  + "<br/>" +
                        "<b>Matched streamgage number: </b>" +  + "<br/>" +
                        "<b>Matched streamgage agency: </b>"*/);
                } else if (layer == "pestSites") {
                    currentSiteNo = attr["pstaid"];
                    $("#siteInfoTabPane #charts").click(function (evt) {
                        console.log("event" + evt.toString());
                        //<a target='_blank' href='https://wim.usgs.gov/sw-trends-data/pest_charts/" + resultDir + "/" + attr["period"] + "_" + attr["pstaid"] + "_FirstRun" + pname + ".pdf'>click here</a>
                    });
                    var resultDir = "";
                    if (attr["period"] == "P10") {
                        resultDir = "results10";
                    } else if (attr["period"] == "P20") {
                        resultDir = "results20";
                    }
                    var pname = attr["pname"];
                    if (pname.length == 4) {
                        pname = "0" + pname;
                    }
                    pestPDFs = "https://wim.usgs.gov/sw-trends-data/pest_charts/" + resultDir + "/" + attr["period"] + "_" + attr["pstaid"] + "_FinalRun" + pname + ".pdf";
                    $("#siteInfoTabPane").append("<br/><b>Site name: </b>" + attr["Site"] + "<br/>" +
                        "<b>Site number: </b>" + attr["pstaid"] + "<br/>" +
                         /*"<b>State: </b>" +  + "<br/>" +*/
                        "<b>Agency: </b>U.S. Geological Survey<br/>" +
                        "<b>Data source: </b>NWIS<br/>" +
                        "<b>Latitude: </b>" + attr["LAT"] + "<br/>" +
                        "<b>Longitude: </b>" + attr["LONG_"] + "<br/>" +
                        "<b>Drainage area: </b>" + attr["DA"] + " (km<sup>2</sup>)<br/>");
                        /*"<b>First run charts: </b><a target='_blank' href='https://wim.usgs.gov/sw-trends-data/pest_charts/" + resultDir + "/" +
                            attr["period"] + "_" + attr["pstaid"] + "_FinalRun" + pname + ".pdf'>click here</a><br/>"+*/
                        /*+
                        "<b>trend pct: </b>" + attr["trend_pct_yr"] + "<br/>" +
                        "<b>HUC2: </b>" +  + "<br/>" +
                        "<b>HUC4: </b>" +  + "<br/>" +
                        "<b>HUC6: </b>" +  + "<br/>" +
                        "<b>HUC8: </b>" +  + "<br/>" +
                        "<b>Matched streamgage name: </b>" +  + "<br/>" +
                        "<b>Matched streamgage number: </b>" +  + "<br/>" +
                        "<b>Matched streamgage agency: </b>"*/
                } else if (layer == "wrtdsSites" || layer == "wrtdsFluxSites") {
                    currentSiteNo = attr["wrtds_sites.Site_no"];
                    var agency = "";
                    if (attr["wrtds_trends_wm_new.agency_2_full"] == null) {
                        agency = attr["wrtds_trends_wm_new.agency_1_full"]
                    } else {
                        agency = attr["wrtds_trends_wm_new.agency_1_full"] + "/" + attr["wrtds_trends_wm_new.agency_2_full"];
                    }
                    $("#siteInfoTabPane").append("<br/><b>Site name: </b>" + attr["wrtds_sites.Station_nm"] + "<br/>" +
                        "<b>Site number: </b>" + attr["wrtds_sites.Site_no"] + "<br/>" +
                        "<b>State: </b>" + attr["wrtds_sites.staAbbrev"] + "<br/>" +
                        "<b>Agency: </b>" + agency + "<br/>" +
                        "<b>Data source: </b>" + attr["wrtds_sites.db_source"] + "<br/>" +
                        "<b>Latitude: </b>" + attr["wrtds_sites.dec_lat_va"] + "<br/>" +
                        "<b>Longitude: </b>" + attr["wrtds_sites.dec_long_va"] + "<br/>" +
                        "<b>Drainage area: </b>" + attr["wrtds_trends_wm_new.DA"] + " (km<sup>2</sup>)<br/>"
                        /*"<b>HUC2: </b>" +  + "<br/>" +
                        "<b>HUC4: </b>" +  + "<br/>" +
                        "<b>HUC6: </b>" +  + "<br/>" +
                        "<b>HUC8: </b>" + attr["wrtds_sites.huc_cd"] + "<br/>" +
                        "<b>Matched streamgage name: </b>" +  + "<br/>" +
                        "<b>Matched streamgage number: </b>" +  + "<br/>" +
                        "<b>Matched streamgage agency: </b>"*/);
                }

            });
        }

        if (layer == "wrtdsSites" || layer == "wrtdsFluxSites") {
            map.getLayer(layer).on('query-limit-exceeded', function(evt) {
                alert('exceeded');
            })
        }
    });

    var geocoder = new Geocoder({
        value: '',
        maxLocations: 25,
        autoComplete: true,
        arcgisGeocoder: true,
        autoNavigate: false,
        map: map
    }, 'geosearch');
    geocoder.startup();
    geocoder.on('select', geocodeSelect);
    geocoder.on('findResults', geocodeResults);
    geocoder.on('clear', clearFindGraphics);
    on(geocoder.inputNode, 'keydown', function (e) {
        if (e.keyCode == 13) {
            setSearchExtent();
        }
    });

    // Symbols
    var sym = createPictureSymbol('../images/purple-pin.png', 0, 12, 13, 24);

    map.on('load', function (){
        map.infoWindow.set('highlight', false);
        map.infoWindow.set('titleInBody', false);
    });

    // Geosearch functions
    on(dom.byId('btnGeosearch'),'click', geosearch);

    // Optionally confine search to map extent
    function setSearchExtent (){
        if (dom.byId('chkExtent').checked === 1) {
            geocoder.activeGeocoder.searchExtent = map.extent;
        } else {
            geocoder.activeGeocoder.searchExtent = null;
        }
    }
    function geosearch() {
        setSearchExtent();
        var def = geocoder.find();
        def.then(function (res){
            geocodeResults(res);
        });
        // Close modal
        $('#geosearchModal').modal('hide');
    }
    function geocodeSelect(item) {
        clearFindGraphics();
        var g = (item.graphic ? item.graphic : item.result.feature);
        g.setSymbol(sym);
        //addPlaceGraphic(item.result,g.symbol);
        // Close modal
        //$('#geosearchModal').modal('hide');
    }
    function geocodeResults(places) {
        places = places.results;
        if (places.length > 0) {
            clearFindGraphics();
            var symbol = sym;
            // Create and add graphics with pop-ups
            for (var i = 0; i < places.length; i++) {
                //addPlaceGraphic(places[i], symbol);
            }
            //zoomToPlaces(places);
            var centerPoint = new Point(places[0].feature.geometry);
            map.centerAndZoom(centerPoint, 17);
            //map.setLevel(15);

        } else {
            //alert('Sorry, address or place not found.');  // TODO
        }
    }
    function stripTitle(title) {
        var i = title.indexOf(',');
        if (i > 0) {
            title = title.substring(0,i);
        }
        return title;
    }
    function addPlaceGraphic(item,symbol)  {
        var place = {};
        var attributes,infoTemplate,pt,graphic;
        pt = item.feature.geometry;
        place.address = item.name;
        place.score = item.feature.attributes.Score;
        // Graphic components
        attributes = { address:stripTitle(place.address), score:place.score, lat:pt.getLatitude().toFixed(2), lon:pt.getLongitude().toFixed(2) };
        infoTemplate = new PopupTemplate({title:'{address}', description: 'Latitude: {lat}<br/>Longitude: {lon}'});
        graphic = new Graphic(pt,symbol,attributes,infoTemplate);
        // Add to map
        map.graphics.add(graphic);
    }

    function zoomToPlaces(places) {
        var multiPoint = new Multipoint(map.spatialReference);
        for (var i = 0; i < places.length; i++) {
            multiPoint.addPoint(places[i].feature.geometry);
        }
        map.setExtent(multiPoint.getExtent().expand(2.0));
    }

    function clearFindGraphics() {
        map.infoWindow.hide();
        map.graphics.clear();
    }

    function createPictureSymbol(url, xOffset, yOffset, xWidth, yHeight) {
        return new PictureMarkerSymbol(
            {
                'angle': 0,
                'xoffset': xOffset, 'yoffset': yOffset, 'type': 'esriPMS',
                'url': url,
                'contentType': 'image/png',
                'width':xWidth, 'height': yHeight
            });
    }

    // Show modal dialog; handle legend sizing (both on doc ready)
    $(document).ready(function(){
        function showModal() {
            $('#geosearchModal').modal('show');
        }
        // Geosearch nav menu is selected
        $('#geosearchNav').click(function(){
            showModal();
        });

        function showAboutModal () {
            $('#aboutModal').modal('show');
        }
        $('#aboutNav').click(function(){
            showAboutModal();
        });

        // Show User Guide
        $('.showUserGuide').click(function(){
            $('#searchTab').trigger('click');
            $('#geosearchModal').modal('hide');
            $('#aboutModal').modal('hide');
            $('#faqModal').modal('hide');
            $('#userGuideModal').modal('show');
        });
        // Show User Guide tab2
        $('.showUserGuide2').click(function(){
            $('#geosearchModal').modal('hide');
            $('#aboutModal').modal('hide');
            $('#faqModal').modal('hide');
            $('#userGuideModal').modal('show');
            $('#iconTab').trigger('click');
            console.log("Opening tab 2 user guide");
        });
        // Show User Guide tab3
        $('.showUserGuide3').click(function(){
            $('#geosearchModal').modal('hide');
            $('#aboutModal').modal('hide');
            $('#faqModal').modal('hide');
            $('#userGuideModal').modal('show');
            console.log("Opening tab 3 user guide");
            $('#layersTab').trigger('click');
        });
        $('#userGuideNav').click(function(){
            $('#userGuideModal').modal('show');
            $('#searchTab').trigger('click');
        });
        $('#trendResultHelp').click(function(){
            $('#trendResultsHelpBox').slideToggle(200);
        });
        $('#faqNav').click(function(){
            $('#faqModal').modal('show');
        });

        function showChartModal () {
            if (currentLayer == "pestSites") {
                window.open(pestPDFs, "_blank");
                //alert(pestPDFs);
            } else {
                var jossoSessionId = "";
                $(".charts-model-loading").show();
                $(".charts-sbdown").hide();
                $.ajax({
                    dataType: 'json',
                    type: 'GET',
                    url: 'https://services.wim.usgs.gov/proxies/sbProxy/Default.aspx?q=sessionid',
                    headers: {'Accept': '*/*'},
                    success: function (data) {
                        var jossoObj = data;
                        var qTerm = currentConst + "_" + currentSiteNo;
                        var newQTerm = qTerm.replace(" ","%20");
                        var url = "https://www.sciencebase.gov/catalog/items?s=Search&q="+ newQTerm + "&format=json&josso=" + jossoObj.jossoSessionId;
                        console.log(url);
                        $.ajax({
                            dataType: 'json',
                            type: 'GET',
                            url: url,
                            headers: {'Accept': '*/*'},
                            success: function (data) {
                                var itemData = data;
                                console.log(itemData);
                                //get folder id and then call this for with josso session id to get plot urls
                                if (itemData.items.length > 0) {
                                    var url = "https://www.sciencebase.gov/catalog/item/" + itemData.items[0].id + "?format=json&josso=" + jossoObj.jossoSessionId;
                                    $.ajax({
                                        dataType: 'json',
                                        type: 'GET',
                                        url: url,
                                        headers: {'Accept': '*/*'},
                                        success: function (data) {
                                            var pngUrlData = data;
                                            $.each(pngUrlData.files, function (key, value) {
                                                console.log(value.url);
                                                switch(value.name) {
                                                    case "plotConcTime.png":
                                                        $("#pConc").attr("src", value.url + "&josso=" + jossoObj.jossoSessionId);
                                                        break;
                                                    case "boxConcMonth.png":
                                                        $("#bConc").attr("src", value.url + "&josso=" + jossoObj.jossoSessionId);
                                                        break;
                                                    case "plotConcPred.png":
                                                        $("#pConcPred").attr("src", value.url + "&josso=" + jossoObj.jossoSessionId);
                                                        break;
                                                    case "plotFluxPred.png":
                                                        $("#pFluxPred").attr("src", value.url + "&josso=" + jossoObj.jossoSessionId);
                                                        break;
                                                    case "plotConcHistBoot.png":
                                                        $("#pConcHistBoot").attr("src", value.url + "&josso=" + jossoObj.jossoSessionId);
                                                        break;
                                                    case "plotFluxHistBoot.png":
                                                        $("#pFluxHistBoot").attr("src", value.url + "&josso=" + jossoObj.jossoSessionId);
                                                        break;
                                                    default:
                                                }
                                            });
                                            console.log(pngUrlData);
                                            $(".charts-model-loading").hide();
                                        },
                                        error: function (error) {
                                            console.log("Error processing the JSON. The error is:" + error);
                                        }
                                    });
                                }
                            },
                            error: function (error) {
                                console.log("Error processing the JSON. The error is:" + error);
                            }
                        });
                    },
                    error: function (error) {
                        console.log("Error processing the JSON. The error is:" + error);
                        //add content here when science base is not allowing access
                        $(".charts-model-loading").hide();
                        $(".charts-sbdown").show();
                    }
                });
                $("#pConc").attr("src", "");
                $("#bConc").attr("src", "");
                $("#pConcPred").attr("src", "");
                $("#pFluxPred").attr("src", "");
                $("#pConcHistBoot").attr("src", "");
                $("#pFluxHistBoot").attr("src", "");
                $('#chartModal').modal('show');
            }
        }
        $('#charts').click(function(){
            showChartModal();
        });

        function showTableModal () {
            $('#tableModal').modal('show');

            $("#tableDiv").html("Loading ...");

            if (isNaN(currentSiteNo) == false && currentSiteNo.toString().length < 8) {
                currentSiteNo = "0" + currentSiteNo;
            }

            var wrtdsCall = $.ajax({
                dataType: 'json',
                type: 'GET',
                url: map.getLayer("wrtdsSites").url + '/query?where=wrtds_trends_wm_new.Site_no+%3D+%27' + currentSiteNo + '%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=' +
                'wrtds_trends_wm_new.param_nm%2C' +
                'wrtds_trends_wm_new.id_unique%2C' +
                'wrtds_trends_wm_new.likeC%2C+' +
                'wrtds_trends_wm_new.likeF%2C' +
                'wrtds_trends_wm_new.trend_pct_C%2C' +
                'wrtds_trends_wm_new.trend_pct_F%2C' +
                'wrtds_trends_wm_new.low_int_C%2C' +
                'wrtds_trends_wm_new.low_int_F%2C' +
                'wrtds_trends_wm_new.up_int_C%2C' +
                'wrtds_trends_wm_new.up_int_F%2C' +
                'wrtds_trends_wm_new.estC%2C' +
                'wrtds_trends_wm_new.estF%2C' +
                'wrtds_trends_wm_new.lowC90%2C' +
                'wrtds_trends_wm_new.lowF90%2C' +
                'wrtds_trends_wm_new.upC90%2C' +
                'wrtds_trends_wm_new.upF90' +
                '&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=true&resultOffset=&resultRecordCount=&f=json',
                headers: {'Accept': '*/*'}
            });

            var pestCall = $.ajax({
                dataType: 'json',
                type: 'GET',
                url: map.getLayer("pestSites").url + '/query?where=pstaid+%3D+%27' + currentSiteNo + '%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=' +
                'Pesticide%2C' +
                'period%2C' +
                'c_map_lklhd%2C' +
                'ctndPpor%2C' +
                'clciPpor%2C' +
                'cuciPpor%2C' +
                'ctndOrigPORPercentBase%2C' +
                'clciOrigPORPercentBase%2C' +
                'cuciOrigPORPercentBase%2C' +
                'ltndPpor%2C' +
                'luciPpor%2C' +
                'llciPpor%2C' +
                'ltndOrigPORPercentBase%2C' +
                'luciOrigPORPercentBase%2C' +
                'llciOrigPORPercentBase' +
                '&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json',
                headers: {'Accept': '*/*'}
            });

            var ecoCall = $.ajax({
                dataType: 'json',
                type: 'GET',
                url: map.getLayer("ecoSites").url + '/query?where=EcoTrendResults_EcoSiteID+%3D+%27' + currentSiteNo + '%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=' +
                'EcoTrendResults_y%2C' +
                'EcoTrendResults_firstYear%2C' +
                'EcoTrendResults_likelihood%2C' +
                'EcoTrendResults_Per_ChangeR%2C' +
                'trend_orig_period%2C' +
                'code_desc' +
                '&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json',
                headers: {'Accept': '*/*'}
            });

            $.when(wrtdsCall, pestCall, ecoCall)
                .done(function(wrtdsData, pestData, ecoData) {
                    //alert(wrtdsData);
                    var data2Return = [];

                    //handling WRTDS data
                    $.each(wrtdsData[0].features, function (key, value) {
                        var trendYearArray = value.attributes["wrtds_trends_wm_new.id_unique"].split("_");
                        var trendYear = trendYearArray[trendYearArray.length-1];
                        data2Return.push([value.attributes["wrtds_trends_wm_new.param_nm"], //Constituent
                            "Concentration (flow normalized)", //Type
                            trendPeriodFixer(trendYear)+"-2012", //Trend period
                            Math.abs(value.attributes["wrtds_trends_wm_new.likeC"].toFixed(3)), //Trend likelihood
                            value.attributes["wrtds_trends_wm_new.trend_pct_C"].toFixed(2), //Trend, in percent
                            value.attributes["wrtds_trends_wm_new.low_int_C"].toFixed(2), //Lower confidence interval, in percent
                            value.attributes["wrtds_trends_wm_new.up_int_C"].toFixed(2), //Upper confidence interval, in percent
                            value.attributes["wrtds_trends_wm_new.estC"].toFixed(4), //Trend, in original units
                            value.attributes["wrtds_trends_wm_new.lowC90"].toFixed(4), //Lower confidence interval, in original units
                            value.attributes["wrtds_trends_wm_new.upC90"].toFixed(4), //Upper confidence interval, in original units
                            "90 percent confidence interval" //Reported confidence interval
                        ]);
                        if (value.attributes["wrtds_trends_wm_new.param_nm"] != "Specific conductance") {
                            data2Return.push([value.attributes["wrtds_trends_wm_new.param_nm"], //Constituent
                                "Load (flow normalized)", //Type
                                trendPeriodFixer(trendYear)+"-2012", //Trend period
                                Math.abs(value.attributes["wrtds_trends_wm_new.likeF"].toFixed(3)), //Trend likelihood
                                value.attributes["wrtds_trends_wm_new.trend_pct_F"].toFixed(2),//Trend, in percent
                                value.attributes["wrtds_trends_wm_new.low_int_F"].toFixed(2), //Lower confidence interval, in percent
                                value.attributes["wrtds_trends_wm_new.up_int_F"].toFixed(2), //Upper confidence interval, in percent
                                value.attributes["wrtds_trends_wm_new.estF"].toFixed(4), //Trend, in original units
                                value.attributes["wrtds_trends_wm_new.lowF90"].toFixed(4), //Lower confidence interval, in original units
                                value.attributes["wrtds_trends_wm_new.upF90"].toFixed(4), //Upper confidence interval, in original units
                                "90 percent confidence interval" //Reported confidence interval
                            ]);
                        }
                    });

                    //handling Pesticide data
                    $.each(pestData[0].features, function (key, value) {
                        var trendPeriod = "";
                        if (value.attributes["period"] == "P20") {
                            trendPeriod = "1992-2012";
                        } else if (value.attributes["period"] == "P10") {
                            trendPeriod = "2002-2012";
                        }
                        data2Return.push([value.attributes["Pesticide"], //Constituent
                            "Concentration (flow normalized)", //Type
                            trendPeriod, //Trend period
                            Math.abs(value.attributes["c_map_lklhd"].toFixed(3)), //Trend likelihood
                            value.attributes["ctndPpor"].toFixed(2), //Trend, in percent
                            value.attributes["clciPpor"].toFixed(2), //Lower confidence interval, in percent
                            value.attributes["cuciPpor"].toFixed(2), //Upper confidence interval, in percent
                            value.attributes["ctndOrigPORPercentBase"].toFixed(4), //Trend, in original units
                            value.attributes["clciOrigPORPercentBase"].toFixed(4), //Lower confidence interval, in original units
                            value.attributes["cuciOrigPORPercentBase"].toFixed(4), //Upper confidence interval, in original units
                            "90 percent confidence interval" //Reported confidence interval
                        ]);
                        data2Return.push([value.attributes["Pesticide"], //Constituent
                            "Load (flow normalized)", //Type
                            trendPeriod, //Trend period
                            Math.abs(value.attributes["c_map_lklhd"].toFixed(3)), //Trend likelihood
                            value.attributes["ltndPpor"].toFixed(2), //Trend, in percent
                            value.attributes["llciPpor"].toFixed(2), //Lower confidence interval, in percent
                            value.attributes["luciPpor"].toFixed(2), //Upper confidence interval, in percent
                            value.attributes["ltndOrigPORPercentBase"].toFixed(4), //Trend, in original units
                            value.attributes["llciOrigPORPercentBase"].toFixed(4), //Lower confidence interval, in original units
                            value.attributes["luciOrigPORPercentBase"].toFixed(4), //Upper confidence interval, in original units
                            "90 percent confidence interval" //Reported confidence interval
                        ]);
                    });

                    //handling Ecology data
                    $.each(ecoData[0].features, function (key, value) {
                        data2Return.push([
                            value.attributes["code_desc"], //Constituent... used to be EcoTrendResults_y
                            "Metric (flow normalized)", //Type
                            trendPeriodFixer(value.attributes["EcoTrendResults_firstYear"])+"-2012", //Trend period
                            Math.abs(value.attributes["EcoTrendResults_likelihood"].toFixed(3)), //Trend likelihood
                            value.attributes["EcoTrendResults_Per_ChangeR"].toFixed(2), //trend, in percent
                            "Not available", //lower confidence interval, in percent
                            "Not available", //upper confidence interval, in percent
                            "Not available", //trend, in original units
                            "Not available", //lower confidence interval, orig units
                            "Not available", //upper confidence interval, orig units,
                            "Not available" //reported confidence interval
                        ]);
                    });

                    $("#tableDiv").html("");

                    var container = document.getElementById('tableDiv');
                    var hot = new Handsontable(container, {
                        data: data2Return,
                        rowHeaders: false,
                        colHeaders: true,
                        manualColumnResize: true
                    });
                    var colHeadersforCSV = [["Constituent","Type","Trend period","Trend likelihood","Trend, in percent","Lower confidence interval on the trend, in percent",
                            "Upper confidence interval on the trend, in percent","Trend, in original units","Lower confidence interval on the trend, in orginal units",
                            "Upper confidence interval on the trend, in original units","Reported confidence interval"]];

                    hot.updateSettings({
                        colHeaders: [
                            "Constituent",
                            "Type",
                            "Trend period",
                            "Trend likelihood",
                            "Trend, in percent",
                            "Lower confidence interval on the trend, in percent",
                            "Upper confidence interval on the trend, in percent",
                            "Trend, in original units",
                            "Lower confidence interval on the trend, in original units",
                            "Upper confidence interval on the trend, in original units",
                            "Reported confidence interval"
                        ],
                        colWidths: [200, 110, 80, 80, 80, 125, 125, 100, 125, 125, 100],
                        readOnly: true,
                        columnSorting: true,
                        sortIndicator: true
                    });

                    var tableDownloadClick = $(".download-table-btn").on('click', function(event) {
                        var csvContent = "data:text/csv;charset=utf-8,";
                        var colHeaders = [];
                        colHeadersforCSV.forEach(function(infoArray, index){

                            var dataString = infoArray.join("\",\"");
                            csvContent += index < data2Return.length ?  "\"" + dataString+ "\"\r\n" : dataString;

                        });
                        var newData2Return = []
                        data2Return.forEach(function(infoArray, index){

                            var dataString = ""
                            infoArray.forEach(function(infoItem, ind) {
                                if (ind == 0) {
                                    dataString += "\"" + infoItem + "\"";
                                } else {
                                    dataString += "," + infoItem;
                                }
                            });
                            csvContent += index < data2Return.length ? dataString+ "\r\n" : dataString;

                        });
                        var encodedUri = encodeURI(csvContent);
                        if(navigator.userAgent.indexOf("Safari") != -1){
                            var cle = document.createEvent("MouseEvent");
                            cle.initEvent("click", true, true);
                            var a = $("<a>").attr("id", "downloadLink").attr("target", "_blank").attr("href", encodedUri).attr("download", currentSiteNo + "_trend_results.csv").appendTo("body");
                            var elem = document.getElementById('downloadLink');
                            elem.dispatchEvent(cle);
                            a.remove();
                        } else {
                            var link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", currentSiteNo + "_trend_results.csv");
                            document.body.appendChild(link); // Required for FF
                            link.click();
                            link.remove();
                        }

                    });

                    $('.table-close').click(function() {
                        tableDownloadClick.off();
                    });
                })
                .fail(function() {
                    alert('there was a problem');
                });

            function trendPeriodFixer(startYear) {

                var startYrNum = Number(startYear);
                var validTrendStarts = [1972,1982,1992,2002];

                var distance = 50;
                var index = 0;
                for(var i = 0; i < validTrendStarts.length; i++){
                    var cdistance = Math.abs(validTrendStarts[i] - startYrNum);
                    if(cdistance < distance){
                        index = i;
                        distance = cdistance;
                    }
                }
                var theNumber = validTrendStarts[index];
                var fixedYear = theNumber.toString();

                return fixedYear;

            }
        }

        $('#table').click(function(){
            $('#tableModal').modal({
                backdrop: 'static',
                keyboard: false
            });
            showTableModal();
        });

        $("#html").niceScroll();
        $("#sidebar").niceScroll();
        $("#sidebar").scroll(function () {
            $("#sidebar").getNiceScroll().resize();
        });

        $("#legendDiv").niceScroll();

        maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
        $('#legendElement').css('max-height', maxLegendHeight);

        $('#legendCollapse').on('shown.bs.collapse', function () {
            maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('max-height', maxLegendHeight);
            maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
            $('#legendDiv').css('max-height', maxLegendDivHeight);
        });

        $('#legendCollapse').on('hide.bs.collapse', function () {
            $('#legendElement').css('height', 'initial');
        });


        // FAQ Modal controls.
        $('#faq1header').click(function(){$('#faq1body').slideToggle(250);});
        $('#faq2header').click(function(){$('#faq2body').slideToggle(250);});
        $('#faq3header').click(function(){$('#faq3body').slideToggle(250);});
        $('#faq4header').click(function(){$('#faq4body').slideToggle(250);});
        $('#faq5header').click(function(){$('#faq5body').slideToggle(250);});
        $('#faq6header').click(function(){$('#faq6body').slideToggle(250);});
        $('#faq7header').click(function(){$('#faq7body').slideToggle(250);});
        $('#faq8header').click(function(){$('#faq8body').slideToggle(250);});
        $('#faq9header').click(function(){$('#faq9body').slideToggle(250);});
        $('#faq10header').click(function(){$('#faq10body').slideToggle(250);});
        $('#faq11header').click(function(){$('#faq11body').slideToggle(250);});
        $('#faq12header').click(function(){$('#faq12body').slideToggle(250);});
        $('#faq13header').click(function(){$('#faq13body').slideToggle(250);});
        $('#faq14header').click(function(){$('#faq14body').slideToggle(250);});
        $('#faq15header').click(function(){$('#faq15body').slideToggle(250);});
        $('#faq16header').click(function(){$('#faq16body').slideToggle(250);});
        $('#faq17header').click(function(){$('#faq17body').slideToggle(250);});
        $('#faq18header').click(function(){$('#faq18body').slideToggle(250);});
        $('#faq19header').click(function(){$('#faq19body').slideToggle(250);});
        $('#faq20header').click(function(){$('#faq20body').slideToggle(250);});
        $('#faq21header').click(function(){$('#faq21body').slideToggle(250);});
        $('#faq22header').click(function(){$('#faq22body').slideToggle(250);});
        $('#faq23header').click(function(){$('#faq23body').slideToggle(250);});
        $('#faq24header').click(function(){$('#faq24body').slideToggle(250);});
        $('#faq25header').click(function(){$('#faq25body').slideToggle(250);});
        $('#faq26header').click(function(){$('#faq26body').slideToggle(250);});
        $('#faq27header').click(function(){$('#faq27body').slideToggle(250);});
        $('#faq28header').click(function(){$('#faq28body').slideToggle(250);});

        $('.fullsize').click(function(){
            var data = "<img src='"+$(this).attr('src')+"'/>";
            var myWindow = window.open("data:text/html," + encodeURIComponent(data),"_blank");
            myWindow.focus();
        });

    });

    function printMap() {

        var printParams = new PrintParameters();
        printParams.map = map;

        var template = new PrintTemplate();
        template.exportOptions = {
            width: 500,
            height: 400,
            dpi: 300
        };
        template.format = "PDF";
        template.layout = "Letter ANSI A Landscape sw-trends";
        template.preserveScale = false;
        var trendsLegendLayer = new LegendLayer();
        trendsLegendLayer.layerId = "1";
        //legendLayer.subLayerIds = [*];

        var legendLayers = [];
        //legendLayers.push(trendsLegendLayer);

        var printTitle = getPrintTitle();

        template.layoutOptions = {
            "titleText": printTitle,
            "authorText" : "NAWQA",
            "copyrightText": "This page was produced by the nawqa surface water trends mapper",
            "legendLayers": legendLayers
        }

        var docTitle = template.layoutOptions.titleText;

        printParams.template = template;
        var printMap = new PrintTask("https://gis.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
        printMap.execute(printParams, printDone, printError);

        function printDone(event) {
            //alert(event.url);
            //window.open(event.url, "_blank");
            printCount++;
            //var printJob = $('<a href="'+ event.url +'" target="_blank">Printout ' + printCount + ' </a>');
            var printJob = $('<p><label>' + printCount + ': </label>&nbsp;&nbsp;<a href="'+ event.url +'" target="_blank">' + docTitle +' </a></p>');
            //$("#print-form").append(printJob);
            $("#printJobsDiv").find("p.toRemove").remove();
            $("#printModalBody").append(printJob);
            $("#printTitle").val("");
            $("#printExecuteButton").button('reset');
        }

        function printError(event) {
            alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem");
        }
    }

    require([
        'esri/dijit/Legend',
        'esri/tasks/locator',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/graphicsUtils',
        'esri/geometry/Point',
        'esri/geometry/Extent',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/FeatureLayer',
        'esri/SpatialReference',
        'esri/layers/WMSLayer',
        'esri/layers/WMSLayerInfo',
        'dijit/form/CheckBox',
        'dijit/form/RadioButton',
        'dojo/query',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-construct',
        'dojo/dom-style',
        'dojo/on'
    ], function(
        Legend,
        Locator,
        Query,
        QueryTask,
        graphicsUtils,
        Point,
        Extent,
        ArcGISDynamicMapServiceLayer,
        FeatureLayer,
        SpatialReference,
        WMSLayer,
        WMSLayerInfo,
        CheckBox,
        RadioButton,
        query,
        dom,
        domClass,
        domConstruct,
        domStyle,
        on
    ) {

        var legendLayers = [];
        var layersObject = [];
        var layerArray = [];
        var staticLegendImage;
        var identifyTask, identifyParams;
        var navToolbar;
        var locator;

        //create global layers lookup
        var mapLayers = [];

        $.each(allLayers, function (index,group) {
            console.log('processing: ', group.groupHeading)


            //sub-loop over layers within this groupType
            $.each(group.layers, function (layerName,layerDetails) {

                var legendLayerName = layerName;
                if (legendLayerName == "pest layer" || legendLayerName == "Eco Sites layer" || legendLayerName == "WRTDS Concentration Sites" || legendLayerName == "WRTDS Flux Sites") {
                    legendLayerName = "Trend results";
                }
                //check for exclusiveGroup for this layer
                var exclusiveGroupName = '';
                if (layerDetails.wimOptions.exclusiveGroupName) {
                    exclusiveGroupName = layerDetails.wimOptions.exclusiveGroupName;
                }

                if (layerDetails.wimOptions.layerType === 'agisFeature') {
                    var layer = new FeatureLayer(layerDetails.url, layerDetails.options);
                    if (layerDetails.wimOptions.renderer !== undefined) {
                        layer.setRenderer(layerDetails.wimOptions.renderer);
                    }
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: legendLayerName});
                    }
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisWMS') {
                    var layer = new WMSLayer(layerDetails.url, {resourceInfo: layerDetails.options.resourceInfo, visibleLayers: layerDetails.options.visibleLayers }, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: legendLayerName});
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisDynamic') {
                    var layer = new ArcGISDynamicMapServiceLayer(layerDetails.url, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.visibleLayers) {
                        layer.setVisibleLayers(layerDetails.visibleLayers);
                    }
                    if (layerDetails.wimOptions && layerDetails.wimOptions.layerDefinitions) {
                        var layerDefs = [];
                        $.each(layerDetails.wimOptions.layerDefinitions, function (index, def) {
                            layerDefs[index] = def;
                        });
                        layer.setLayerDefinitions(layerDefs);
                    }
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: legendLayerName});
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisImage') {
                    var layer = new ArcGISImageServiceLayer(layerDetails.url, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: legendLayerName});
                    }
                    if (layerDetails.visibleLayers) {
                        layer.setVisibleLayers(layerDetails.visibleLayers);
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }
            });
        });

        function addLayer(groupHeading, showGroupHeading, layer, layerName, exclusiveGroupName, options, wimOptions) {

            //add layer to map
            //layer.addTo(map);
            map.addLayer(layer);

            //add layer to layer list
            mapLayers.push([exclusiveGroupName,camelize(layerName),layer]);

            //check if its an exclusiveGroup item
            if (exclusiveGroupName) {

                if (!$('#' + camelize(exclusiveGroupName)).length) {
                    var exGroupRoot;
                    if (exclusiveGroupName == "Data Source") {
                        var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName +" Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '<span id="info' + camelize(exclusiveGroupName) + '" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(exclusiveGroupName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');
                    } else {
                        var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName +" Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '</button> </div>');
                    }

                    exGroupRoot.click(function(e) {
                        exGroupRoot.find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');

                        $.each(mapLayers, function (index, currentLayer) {

                            var tempLayer = map.getLayer(currentLayer[2].id);

                            if (currentLayer[0] == exclusiveGroupName) {
                                if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o') && exGroupRoot.find('i.glyphspan').hasClass('fa-check-square-o')) {
                                    console.log('adding layer: ',currentLayer[1]);
                                    map.addLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(true);
                                } else if (exGroupRoot.find('i.glyphspan').hasClass('fa-square-o')) {
                                    console.log('removing layer: ',currentLayer[1]);
                                    //map.removeLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(false);
                                }
                            }

                        });
                    });

                    var exGroupDiv = $('<div id="' + camelize(exclusiveGroupName) + '" class="btn-group-vertical" data-toggle="buttons"></div>');
                    $('#toggle').append(exGroupDiv);
                    console.log('here');
                }

                //create radio button
                //var button = $('<input type="radio" name="' + camelize(exclusiveGroupName) + '" value="' + camelize(layerName) + '"checked>' + layerName + '</input></br>');
                if (layer.visible) {
                    var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                } else {
                    var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                }

                $('#' + camelize(exclusiveGroupName)).append(button);

                //click listener for radio button
                button.click(function(e) {

                    if ($(this).find('i.glyphspan').hasClass('fa-circle-o')) {
                        $(this).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');

                        var newLayer = $(this)[0].id;

                        $.each(mapLayers, function (index, currentLayer) {

                            if (currentLayer[0] == exclusiveGroupName) {
                                if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-check-square-o')) {
                                    console.log('adding layer: ',currentLayer[1]);
                                    map.addLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(true);
                                    ////$('#' + camelize(currentLayer[1])).toggle();
                                }
                                else if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-square-o')) {
                                    console.log('group heading not checked');
                                }
                                else {
                                    console.log('removing layer: ',currentLayer[1]);
                                    //map.removeLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(false);
                                    if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o')) {
                                        $("#" + currentLayer[1]).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');
                                    }
                                    //$('#' + camelize(this[1])).toggle();
                                }
                            }
                        });
                    }
                });
            }

            ////not an exclusive group item
            else if (wimOptions.includeInLayerList) {

                //create layer toggle
                //var button = $('<div align="left" style="cursor: pointer;padding:5px;"><span class="glyphspan glyphicon glyphicon-check"></span>&nbsp;&nbsp;' + layerName + '</div>');
                if ((layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.moreinfo !== undefined && wimOptions.moreinfo)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(layerName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');
                } else if ((!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.moreinfo !== undefined && wimOptions.moreinfo)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(layerName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');
                } else if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');
                } else if ((!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');
                } else if ((layer.visible && wimOptions.moreinfo !== undefined && wimOptions.moreinfo)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');
                } else if ((!layer.visible && wimOptions.moreinfo !== undefined && wimOptions.moreinfo)) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');
                } else if (layer.visible) {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '</button></span></div>');
                } else {
                    var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '</button> </div>');
                }


                //click listener for regular
                button.click(function(e) {

                    //toggle checkmark
                    $(this).find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');
                    $(this).find('button').button('toggle');



                    //$('#' + camelize(layerName)).toggle();

                    //layer toggle
                    if (layer.visible) {
                        layer.setVisibility(false);
                    } else {
                        layer.setVisibility(true);
                    }

                    if (wimOptions.otherLayersToggled) {
                        $.each(wimOptions.otherLayersToggled, function (key, value) {
                            var lyr = map.getLayer(value);
                            lyr.setVisibility(layer.visible);
                        });
                    }

                });
            }

            //group heading logic
            if (showGroupHeading !== undefined) {

                //camelize it for divID
                var groupDivID = camelize(groupHeading);

                //check to see if this group already exists
                if (!$('#' + groupDivID).length) {
                    //if it doesn't add the header
                    if (showGroupHeading) {
                        var groupDiv = $('<div id="' + groupDivID + '"><div class="alert alert-info" role="alert"><strong>' + groupHeading + '</strong></div></div>');
                    } else {
                        var groupDiv = $('<div id="' + groupDivID + '"></div>');
                    }
                    $('#toggle').append(groupDiv);
                }

                //if it does already exist, append to it

                if (exclusiveGroupName) {
                    //if (!exGroupRoot.length)$("#slider"+camelize(layerName))
                    $('#' + groupDivID).append(exGroupRoot);
                    $('#' + groupDivID).append(exGroupDiv);
                    if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                        var id = "#info" + camelize(exclusiveGroupName);
                        var moreinfo = $(id);
                        moreinfo.click(function(e) {
                            window.open(wimOptions.moreinfo, "_blank");
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    }
                    if ($("#opacity"+camelize(exclusiveGroupName)).length > 0) {
                        var id = "#opacity" + camelize(exclusiveGroupName);
                        var opacity = $(id);
                        opacity.click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(".opacitySlider").remove();
                            var currOpacity = map.getLayer(options.id).opacity;
                            var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                            $("body").append(slider);
                            $("#slider")[0].value = currOpacity * 100;
                            $(".opacitySlider").css('left', event.clientX - 180);
                            $(".opacitySlider").css('top', event.clientY - 50);

                            $(".opacitySlider").mouseleave(function () {
                                $(".opacitySlider").remove();
                            });

                            $(".opacityClose").click(function () {
                                $(".opacitySlider").remove();
                            });
                            $('#slider').change(function (event) {
                                //get the value of the slider with this call
                                var o = ($('#slider')[0].value) / 100;
                                console.log("o: " + o);
                                $("#opacityValue").html("Opacity: " + o)
                                map.getLayer(options.id).setOpacity(o);

                                if (wimOptions.otherLayersToggled) {
                                    $.each(wimOptions.otherLayersToggled, function (key, value) {
                                        var lyr = map.getLayer(value);
                                        lyr.setOpacity(o);
                                    });
                                }
                                //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                //var e = '#' + $(this).attr('data-wjs-element');
                                //$(e).css('opacity', o)
                            });

                        });
                    }
                } else {
                    $('#' + groupDivID).append(button);
                    if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                        var id = "#info" + camelize(layerName);
                        var moreinfo = $(id);
                        moreinfo.click(function(e) {
                            window.open(wimOptions.moreinfo, "_blank");
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    }
                    if ($("#opacity"+camelize(layerName)).length > 0) {
                        $("#opacity"+camelize(layerName)).click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(".opacitySlider").remove();
                            var currOpacity = map.getLayer(options.id).opacity;
                            var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                            $("body").append(slider);[0]

                            $("#slider")[0].value = currOpacity*100;
                            $(".opacitySlider").css('left', event.clientX-180);
                            $(".opacitySlider").css('top', event.clientY-50);

                            $(".opacitySlider").mouseleave(function() {
                                $(".opacitySlider").remove();
                            });

                            $(".opacityClose").click(function() {
                                $(".opacitySlider").remove();
                            });
                            $('#slider').change(function(event) {
                                //get the value of the slider with this call
                                var o = ($('#slider')[0].value)/100;
                                console.log("o: " + o);
                                $("#opacityValue").html("Opacity: " + o)
                                map.getLayer(options.id).setOpacity(o);

                                if (wimOptions.otherLayersToggled) {
                                    $.each(wimOptions.otherLayersToggled, function (key, value) {
                                        var lyr = map.getLayer(value);
                                        lyr.setOpacity(o);
                                    });
                                }
                                //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                //var e = '#' + $(this).attr('data-wjs-element');
                                //$(e).css('opacity', o)
                            });
                        });
                    }
                }
            }

            else {
                //otherwise append
                $('#toggle').append(button);
                if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                    var id = "#info" + camelize(layerName);
                    var moreinfo = $(id);
                    moreinfo.click(function(e) {
                        alert(e.currentTarget.id);
                        e.preventDefault();
                        e.stopPropagation();
                    });
                }
            }
        }



        //get visible and non visible layer lists
        function addMapServerLegend(layerName, layerDetails) {


            if (layerDetails.wimOptions.layerType === 'agisFeature') {

                //for feature layer since default icon is used, put that in legend
                var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="https://raw.githubusercontent.com/Leaflet/Leaflet/master/dist/images/marker-icon.png" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItem);

            }

            else if (layerDetails.wimOptions.layerType === 'agisWMS') {

                //for WMS layers, for now just add layer title
                var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="https://placehold.it/25x41" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItem);

            }

            else if (layerDetails.wimOptions.layerType === 'agisDynamic') {

                //create new legend div
                var legendItemDiv = $('<div align="left" id="' + camelize(layerName) + '"><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItemDiv);

                //get legend REST endpoint for swatch
                $.getJSON(layerDetails.url + '/legend?f=json', function (legendResponse) {

                    console.log(layerName,'legendResponse',legendResponse);



                    //make list of layers for legend
                    if (layerDetails.options.layers) {
                        //console.log(layerName, 'has visisble layers property')
                        //if there is a layers option included, use that
                        var visibleLayers = layerDetails.options.layers;
                    }
                    else {
                        //console.log(layerName, 'no visible layers property',  legendResponse)

                        //create visibleLayers array with everything
                        var visibleLayers = [];
                        $.grep(legendResponse.layers, function(i,v) {
                            visibleLayers.push(v);
                        });
                    }

                    //loop over all map service layers
                    $.each(legendResponse.layers, function (i, legendLayer) {

                        //var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong>');
                        //$('#' + camelize(layerName)).append(legendHeader);

                        //sub-loop over visible layers property
                        $.each(visibleLayers, function (i, visibleLayer) {

                            //console.log(layerName, 'visibleLayer',  visibleLayer);

                            if (visibleLayer == legendLayer.layerId) {

                                console.log(layerName, visibleLayer,legendLayer.layerId, legendLayer)

                                //console.log($('#' + camelize(layerName)).find('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>'))

                                var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>');
                                $('#' + camelize(layerName)).append(legendHeader);

                                //get legend object
                                var feature = legendLayer.legend;
                                /*
                                 //build legend html for categorized feautres
                                 if (feature.length > 1) {
                                 */

                                //placeholder icon
                                //<img alt="Legend Swatch" src="http://placehold.it/25x41" />

                                $.each(feature, function () {

                                    //make sure there is a legend swatch
                                    if (this.imageData) {
                                        var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + this.imageData + '" /><small>' + this.label.replace('<', '').replace('>', '') + '</small></br>');

                                        $('#' + camelize(layerName)).append(legendFeature);
                                    }
                                });
                                /*
                                 }
                                 //single features
                                 else {
                                 var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + feature[0].imageData + '" /><small>&nbsp;&nbsp;' + legendLayer.layerName + '</small></br>');

                                 //$('#legendDiv').append(legendItem);
                                 $('#' + camelize(layerName)).append(legendFeature);

                                 }
                                 */
                            }
                        }); //each visible layer
                    }); //each legend item
                }); //get legend json
            }
        }
        /* parse layers.js */

        var legend = new Legend({
            map: map,
            layerInfos: legendLayers
        }, "legendDiv");
        legend.startup();


    });//end of require statement containing legend building code


});

$(document).ready(function () {
    //7 lines below are handler for the legend buttons. to be removed if we stick with the in-map legend toggle
    //$('#legendButtonNavBar, #legendButtonSidebar').on('click', function () {
    //    $('#legend').toggle();
    //    //return false;
    //});
    //$('#legendClose').on('click', function () {
    //    $('#legend').hide();
    //});

});
