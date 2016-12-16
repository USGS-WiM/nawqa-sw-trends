function addCommas(e){e+="";for(var t=e.split("."),i=t[0],a=t.length>1?"."+t[1]:"",s=/(\d+)(\d{3})/;s.test(i);)i=i.replace(s,"$1,$2");return i+a}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var allLayers,renderer;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","esri/renderers/UniqueValueRenderer","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleMarkerSymbol","dojo/domReady!"],function(e,t,i,a,s,n){var o=null;renderer=new a(o,"all_pest_trends.trend_int");var r=new n(n.STYLE_SQUARE,15,new s(s.STYLE_SOLID,new esri.Color([255,0,0]),1),new esri.Color([255,0,0,.25])),l=new n(n.STYLE_SQUARE,10,new s(s.STYLE_SOLID,new esri.Color([255,0,0]),1),new esri.Color([255,0,0,.25])),c=new n(n.STYLE_SQUARE,5,new s(s.STYLE_SOLID,new esri.Color([255,0,0]),1),new esri.Color([255,0,0,.25])),d=new n(n.STYLE_SQUARE,5,new s(s.STYLE_SOLID,new esri.Color([255,255,255]),1),new esri.Color([0,0,0,.25])),p=new n(n.STYLE_SQUARE,5,new s(s.STYLE_SOLID,new esri.Color([0,255,0]),1),new esri.Color([0,255,0,.25])),u=new n(n.STYLE_SQUARE,10,new s(s.STYLE_SOLID,new esri.Color([0,255,0]),1),new esri.Color([0,255,0,.25])),g=new n(n.STYLE_SQUARE,15,new s(s.STYLE_SOLID,new esri.Color([0,255,0]),1),new esri.Color([0,255,0,.25]));renderer.addValue(3,r),renderer.addValue(2,l),renderer.addValue(1,c),renderer.addValue(0,d),renderer.addValue(-1,p),renderer.addValue(-2,u),renderer.addValue(-3,g),allLayers=[{groupHeading:"sites",showGroupHeading:!1,includeInLayerList:!1,layers:{"pest layer":{url:"https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites_test/MapServer/0",options:{id:"pestSites",opacity:1,mode:i.MODE_SNAPSHOT,outFields:["*"],defaultDefinitionExpression:"Pesticide = 'Alachlor' AND period = 'P10'",visible:!1},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0}},"Eco Sites layer":{url:"https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites_test/MapServer/1",options:{id:"ecoSites",opacity:1,mode:i.MODE_SNAPSHOT,outFields:["*"],visible:!1},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0}},"WRTDS Concentration Sites":{url:"https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites_test/MapServer/2",options:{id:"wrtdsSites",opacity:1,mode:i.MODE_SNAPSHOT,outFields:["wrtds_sites.Station_nm","wrtds_sites.Site_no","wrtds_sites.staAbbrev","wrtds_sites.agency1","wrtds_sites.db_source","wrtds_sites.dec_lat_va","wrtds_sites.dec_long_va","wrtds_sites.drainSqKm","wrtds_sites.huc_cd"],visible:!1},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0}},"WRTDS Flux Sites":{url:"https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites_test/MapServer/3",options:{id:"wrtdsFluxSites",opacity:1,mode:i.MODE_SNAPSHOT,outFields:["wrtds_sites.Station_nm","wrtds_sites.Site_no","wrtds_sites.staAbbrev","wrtds_sites.agency1","wrtds_sites.db_source","wrtds_sites.dec_lat_va","wrtds_sites.dec_long_va","wrtds_sites.drainSqKm","wrtds_sites.huc_cd"],visible:!1},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,dragInfoWindows=!0,defaultMapCenter=[-95.6,38.6],constObj;require(["esri/arcgis/utils","esri/map","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/geometry/Point","esri/graphicsUtils","esri/symbols/PictureMarkerSymbol","esri/tasks/query","esri/geometry/webMercatorUtils","dojo/dnd/Moveable","dojo/query","dojo/dom","dojo/dom-class","dojo/on","dojo/domReady!"],function(e,t,i,a,s,n,o,r,l,c,d,p,u,g,y,m,f,b,h){function v(){1===f.byId("chkExtent").checked?R.activeGeocoder.searchExtent=map.extent:R.activeGeocoder.searchExtent=null}function w(){v();var e=R.find();e.then(function(e){L(e)}),$("#geosearchModal").modal("hide")}function S(e){T();var t=e.graphic?e.graphic:e.result.feature;t.setSymbol(q)}function L(e){if(e=e.results,e.length>0){T();for(var t=0;t<e.length;t++);var i=new c(e[0].feature.geometry);map.centerAndZoom(i,17)}}function T(){map.infoWindow.hide(),map.graphics.clear()}function _(e,t,i,a,s){return new p({angle:0,xoffset:t,yoffset:i,type:"esriPMS",url:e,contentType:"image/png",width:a,height:s})}if(!jQuery.support.cors&&window.XDomainRequest){var x=/^https?:\/\//i,O=/^get|post$/i,E=new RegExp("^"+location.protocol,"i"),D=/\/xml/i;jQuery.ajaxTransport("text html xml json",function(e,t,i){if(e.crossDomain&&e.async&&O.test(e.type)&&x.test(t.url)&&E.test(t.url)){var a=null,s=(t.dataType||"").toLowerCase();return{send:function(i,n){a=new XDomainRequest,/^\d+$/.test(t.timeout)&&(a.timeout=t.timeout),a.ontimeout=function(){n(500,"timeout")},a.onload=function(){var e="Content-Length: "+a.responseText.length+"\r\nContent-Type: "+a.contentType,t={code:200,message:"success"},i={text:a.responseText};try{if("json"===s)try{i.json=JSON.parse(a.responseText)}catch(o){t.code=500,t.message="parseerror"}else if("xml"===s||"text"!==s&&D.test(a.contentType)){var r=new ActiveXObject("Microsoft.XMLDOM");r.async=!0;try{r.loadXML(a.responseText)}catch(o){r=void 0}if(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)throw t.code=500,t.message="parseerror","Invalid XML: "+a.responseText;i.xml=r}}catch(l){throw l}finally{n(t.code,t.message,i,e)}},a.onerror=function(){n(500,"error",{text:a.responseText})},a.open(e.type,e.url),a.send()},abort:function(){a&&a.abort()}}}})}jQuery.support.cors=!0,$.ajax({dataType:"json",type:"GET",url:"https://gis.wim.usgs.gov/arcgis/rest/services/SWTrends/swTrendSites_test/MapServer/4/query?where=include_in_mapper_+%3D+%27include%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=Model%2CParameter_name&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json",headers:{Accept:"*/*"},success:function(e){constObj=e,$.each(e.features,function(e,t){null!=t.attributes.Model&&("Ecology kendall"==t.attributes.Model?$("#ecologySelect").append($("<option></option>").attr(t.attributes).text(t.attributes.Parameter_name)):"SEAWAVE-Q"==t.attributes.Model?$("#pesticideSelect").append($("<option></option>").attr(t.attributes).text(t.attributes.Parameter_name)):"WRTDS"==t.attributes.Model&&$("#nutrientsSelect").append($("<option></option>").attr(t.attributes).text(t.attributes.Parameter_name)))}),document.getElementById("typeSelect").selectedIndex="1",document.getElementById("nutrientsSelect").selectedIndex="14"},error:function(e){console.log("Error processing the JSON. The error is:"+e)}}),map=t("mapDiv",{basemap:"topo",center:defaultMapCenter,zoom:5});var I=new i({map:map},"homeButton");I.startup();var C=new a({map:map},"locateButton");C.startup(),$("#disclaimerModal").modal("show"),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")});var k=["pestSites","ecoSites","wrtdsSites"];$("#typeSelect").on("change",function(e){var t=e.currentTarget.value;$(".constSelect").hide(),$.each(k,function(e,t){map.getLayer(t).setVisibility(!1)}),"Nutrients"==t?($("#nutrientsSelect").show(),$("#trendTypes").show(),$("#trend4,#trend3").show(),map.getLayer("wrtdsSites").setVisibility(!0)):"Pesticides"==t?($("#pesticideSelect").show(),$("#trendTypes").show(),$("#trend4,#trend3").hide(),map.getLayer("pestSites").setVisibility(!0)):"Aquatic ecology"==t&&($("#ecologySelect").show(),$("#trendTypes").hide(),$("#trend4,#trend3").hide(),map.getLayer("ecoSites").setVisibility(!0))}),$("#pesticideSelect").on("change",function(e){var t=e.currentTarget.value,i="";$("#trend2").selected?i="P20":$("#trend1").selected&&(i="P10");var a="Pesticide = '"+t+"' AND period = '"+i+"'";map.getLayer("pestSites").setDefinitionExpression(a);var s=h(map.getLayer("pestSites"),"update-end",function(e){var t=d.graphicsExtent(map.getLayer("pestSites").graphics);map.setExtent(t,!0),s.remove()})}),$("#ecologySelect").on("change",function(e){var t=e.currentTarget.value,i="";$("#trend2").selected?i="AND EcoTrendResults_Nyear IN [8,9,10,11]":$("#trend1").selected&&(i="AND EcoTrendResults_Nyear IN [18,19,20]");var a="EcoTrendResults_y = '"+t+"' "+i;map.getLayer("ecoSites").setDefinitionExpression(a);var s=h(map.getLayer("ecoSites"),"update-end",function(e){var t=d.graphicsExtent(map.getLayer("ecoSites").graphics);map.setExtent(t,!0),s.remove()})}),$(".trendPeriod").on("change",function(e){var t=e.currentTarget.value;if("Pesticides"==$("#typeSelect")[0].value){var i=$("#pesticideSelect").val(),a="Pesticide = '"+i+"' AND period = '"+t+"'",s=h(map.getLayer("pestSites"),"update-end",function(e){var t=d.graphicsExtent(map.getLayer("pestSites").graphics);map.setExtent(t,!0),s.remove()});map.getLayer("pestSites").setDefinitionExpression(a)}else if("Aquatic ecology"==$("#typeSelect")[0].value){var n="";"P10"==t?n="AND (EcoTrendResults_Nyear  = 8 OR EcoTrendResults_Nyear  = 9 OR EcoTrendResults_Nyear  = 10 OR EcoTrendResults_Nyear  = 11)":"P20"==t&&(n="AND (EcoTrendResults_Nyear  = 18 OR EcoTrendResults_Nyear  = 19 OR EcoTrendResults_Nyear  = 20)");var i=$("#ecologySelect").val(),a="EcoTrendResults_y = '"+i+"' "+n,s=h(map.getLayer("ecoSites"),"update-end",function(e){var t=d.graphicsExtent(map.getLayer("ecoSites").graphics);map.setExtent(t,!0),s.remove()});map.getLayer("ecoSites").setDefinitionExpression(a)}}),h(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=g.webMercatorToGeographic(map.extent.getCenter());if($("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3)),1==dragInfoWindows){var i=m(".title",map.infoWindow.domNode)[0],a=new y(map.infoWindow.domNode,{handle:i});h(a,"FirstMove",function(){var e=m(".outerPointer",map.infoWindow.domNode)[0];b.add(e,"hidden");var e=m(".pointer",map.infoWindow.domNode)[0];b.add(e,"hidden")}.bind(this))}}),h(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),h(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var t=g.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3))}}),h(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var M=new s("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");h(f.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(M)}),h(f.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(M)}),h(f.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(M)}),h(f.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(M)}),h(f.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(M)}),h(f.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(M)}),h(f.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(M)}),h(f.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(M)}),h(f.byId("btnNatlMap"),"click",function(){map.addLayer(M)}),h(map,"click",function(e){}),$("#siteInfoDiv").lobiPanel({unpin:!1,reload:!1,minimize:!1,close:!1,expand:!1,editTitle:!1,maxWidth:800,maxHeight:500}),$("#siteInfoDiv .dropdown").prepend("<div id='siteInfoClose' title='close'><b>X</b></div>"),$("#siteInfoDiv .dropdown").prepend("<div id='siteInfoMin' title='collapse'><b>_</b></div>"),$("#siteInfoMin").click(function(){$("#siteInfoDiv").css("visibility","hidden")}),$("#siteInfoClose").click(function(){$("#siteInfoDiv").css("visibility","hidden")}),map.on("layer-add",function(e){var t=e.layer.id;e.layer;("pestSites"==t||"wrtdsSites"==t||"ecoSites"==t)&&("wrtdsSites"==t&&(map.getLayer("wrtdsSites").setDefinitionExpression("bootOut_id_unique LIKE '%Total Phosphorus%2002'"),map.getLayer("wrtdsSites").setVisibility(!0)),map.getLayer(t).on("click",function(e){$("#siteInfoDiv").css("visibility","visible");var i=$("#siteInfoDiv").data("lobiPanel"),a=$(document).height(),s=$(document).width(),n=.9,o=a*n,r=s*n;500>a&&$("#siteInfoDiv").height(o),500>s&&$("#siteInfoDiv").width(r);var l=e.x,c=e.y;i.setPosition(l,c),1==i.isPinned()&&i.unpin();var d=e.graphic.attributes;$("#siteInfoTabPane").empty(),"ecoSites"==t?$("#siteInfoTabPane").append("<br/><b>Site name: </b>"+d.Ecology_site_name+"<br/><b>Site number: </b>"+d.Ecology_site_ID+"<br/><b>Latitude: </b>"+d.LatDD+"<br/><b>Longitude: </b>"+d.LngDD+"<br/>"):"pestSites"==t?$("#siteInfoTabPane").append("<br/><b>Site name: </b>"+d.name+"<br/><b>Site number: </b>"+d.pstaid+"<br/><b>Agency: </b>"+d.agency+"<br/><b>Latitude: </b>"+d.LAT+"<br/><b>Longitude: </b>"+d.LONG_+"<br/><b>Drainage area: </b>"+d.DA+"<br/><b>trend pct: </b>"+d.trend_pct_yr+"<br/>"):"wrtdsSites"==t&&$("#siteInfoTabPane").append("<br/><b>Site name: </b>"+d["wrtds_sites.Station_nm"]+"<br/><b>Site number: </b>"+d["wrtds_sites.Site_no"]+"<br/><b>State: </b>"+d["wrtds_sites.staAbbrev"]+"<br/><b>Agency: </b>"+d["wrtds_sites.agency1"]+"<br/><b>Data source: </b>"+d["wrtds_sites.db_source"]+"<br/><b>Latitude: </b>"+d["wrtds_sites.dec_lat_va"]+"<br/><b>Longitude: </b>"+d["wrtds_sites.dec_long_va"]+"<br/><b>Drainage area: </b>"+d["wrtds_sites.drainSqKm"]+"<br/><b>HUC8: </b>"+d["wrtds_sites.huc_cd"]+"<br/>")})),"wrtdsSites"==t&&map.getLayer(t).on("query-limit-exceeded",function(e){alert("exceeded")})});var R=new n({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");R.startup(),R.on("select",S),R.on("findResults",L),R.on("clear",T),h(R.inputNode,"keydown",function(e){13==e.keyCode&&v()});var q=_("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),h(f.byId("btnGeosearch"),"click",w),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function t(){$("#aboutModal").modal("show")}function i(){$("#chartModal").modal("show")}function a(){$("#tableModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){t()}),$("#userGuideNav").click(function(){$("#userGuideModal").modal("show")}),$("#faqNav").click(function(){$("#faqModal").modal("show")}),$("#learnMoreButton").click(function(){$("#learnMoreModal").modal("show")}),$("#charts").click(function(){i()}),$("#table").click(function(){a()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/SpatialReference","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,t,i,a,s,n,o,r,l,c,d,p,u,g,y,m,f,b,h,v){function w(e,t,i,a,s,n,o){if(map.addLayer(i),L.push([s,camelize(a),i]),s){if(!$("#"+camelize(s)).length){var r;if("Data Source"==s)var r=$('<div id="'+camelize(s+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+s+'<span id="info'+camelize(s)+'" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(s)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');else var r=$('<div id="'+camelize(s+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+s+"</button> </div>");r.click(function(e){r.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(L,function(e,t){var i=map.getLayer(t[2].id);if(t[0]==s)if($("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&r.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var i=map.getLayer(t[2].id);i.setVisibility(!0)}else if(r.find("i.glyphspan").hasClass("fa-square-o")){console.log("removing layer: ",t[1]);var i=map.getLayer(t[2].id);i.setVisibility(!1)}})});var l=$('<div id="'+camelize(s)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(l),console.log("here")}if(i.visible)var c=$('<div id="'+camelize(a)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+a+"</label> </div>");else var c=$('<div id="'+camelize(a)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+a+"</label> </div>");$("#"+camelize(s)).append(c),c.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var t=$(this)[0].id;$.each(L,function(e,i){if(i[0]==s)if(i[1]==t&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var a=map.getLayer(i[2].id);a.setVisibility(!0)}else if(i[1]==t&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-square-o"))console.log("group heading not checked");else{console.log("removing layer: ",i[1]);var a=map.getLayer(i[2].id);a.setVisibility(!1),$("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+i[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o")}})}})}else if(o.includeInLayerList){if(i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider&&void 0!==o.moreinfo&&o.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span id="info'+camelize(a)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(a)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(!i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider&&void 0!==o.moreinfo&&o.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span id="info'+camelize(a)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(a)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span id="info'+camelize(a)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible||void 0===o.hasOpacitySlider||1!=o.hasOpacitySlider)if(i.visible&&void 0!==o.moreinfo&&o.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(!i.visible&&void 0!==o.moreinfo&&o.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span id="info'+camelize(a)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+"</button></span></div>");else var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+"</button> </div>");else var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');c.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),i.visible?i.setVisibility(!1):i.setVisibility(!0),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,t){var a=map.getLayer(t);a.setVisibility(i.visible)})})}if(void 0!==t){var d=camelize(e);if(!$("#"+d).length){if(t)var p=$('<div id="'+d+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");else var p=$('<div id="'+d+'"></div>');$("#toggle").append(p)}if(s){if($("#"+d).prepend(r),$("#"+d).prepend(l),void 0!==o.moreinfo&&o.moreinfo){var u="#info"+camelize(s),g=$(u);g.click(function(e){window.open(o.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}if($("#opacity"+camelize(s)).length>0){var u="#opacity"+camelize(s),y=$(u);y.click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var t=map.getLayer(n.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*t,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(n.id).setOpacity(t),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,i){var a=map.getLayer(i);a.setOpacity(t)})})})}}else{if($("#"+d).append(c),void 0!==o.moreinfo&&o.moreinfo){var u="#info"+camelize(a),g=$(u);g.click(function(e){window.open(o.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}$("#opacity"+camelize(a)).length>0&&$("#opacity"+camelize(a)).click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var t=map.getLayer(n.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*t,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(n.id).setOpacity(t),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,i){var a=map.getLayer(i);a.setOpacity(t)})})})}}else if($("#toggle").append(c),void 0!==o.moreinfo&&o.moreinfo){var u="#info"+camelize(a),g=$(u);g.click(function(e){alert(e.currentTarget.id),e.preventDefault(),e.stopPropagation()})}}var S=[],L=[];$.each(allLayers,function(e,t){console.log("processing: ",t.groupHeading),$.each(t.layers,function(e,i){var a="";if(i.wimOptions.exclusiveGroupName&&(a=i.wimOptions.exclusiveGroupName),"agisFeature"===i.wimOptions.layerType){var s=new l(i.url,i.options);void 0!==i.wimOptions.renderer&&s.setRenderer(i.wimOptions.renderer),i.wimOptions&&1==i.wimOptions.includeLegend&&S.unshift({layer:s,title:e}),w(t.groupHeading,t.showGroupHeading,s,e,a,i.options,i.wimOptions)}else if("agisWMS"===i.wimOptions.layerType){var s=new d(i.url,{resourceInfo:i.options.resourceInfo,visibleLayers:i.options.visibleLayers},i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&S.unshift({layer:s,title:e}),w(t.groupHeading,t.showGroupHeading,s,e,a,i.options,i.wimOptions)}else if("agisDynamic"===i.wimOptions.layerType){var s=new r(i.url,i.options);if(i.visibleLayers&&s.setVisibleLayers(i.visibleLayers),i.wimOptions&&i.wimOptions.layerDefinitions){var n=[];$.each(i.wimOptions.layerDefinitions,function(e,t){n[e]=t}),s.setLayerDefinitions(n)}i.wimOptions&&1==i.wimOptions.includeLegend&&S.unshift({layer:s,title:e}),w(t.groupHeading,t.showGroupHeading,s,e,a,i.options,i.wimOptions)}else if("agisImage"===i.wimOptions.layerType){var s=new ArcGISImageServiceLayer(i.url,i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&S.unshift({layer:s,title:e}),i.visibleLayers&&s.setVisibleLayers(i.visibleLayers),w(t.groupHeading,t.showGroupHeading,s,e,a,i.options,i.wimOptions)}})});var T=new e({map:map,layerInfos:S},"legendDiv");T.startup()})}),$(document).ready(function(){});