var mapView = new ol.View({
    center: ol.proj.fromLonLat([72.585, 23.021]),
    zoom: 8
});

var map = new ol.map({
    target: 'map',
    view: mapView,
    controls: []
});

var noneTile = new ol.layer.Tile({
    title: 'None',
    type: 'base',
    visible: false
});

var osmTile = new ol.layer.Tile ({
    title: 'Open Street Map',
    visible: true,
    type: 'base',
    source: new ol.source.OSM()
});

//map.addLayer(osmTile);

var baseGroup = new ol.layer.Group({
    title: 'Base Maps',
    fold: 'true',
    layers: [osmTile, noneTile]
});

map.addLayer(baseGroup);

var Districts_India = new ol.layer.Tile({
    title: "India Districts",
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Project/wms',
        params: {'LAYERS':'Project:india_ds', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

//map.addLayer(Districts_India);

var States_India = new ol.layer.Tile({
    title: "India States",
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Project/wms',
        params: {'LAYERS':'Project:india_st', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

//map.addLayer(States_India);

var Cities_India = new ol.layer.Tile({
    title: "India Cities",
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Project/wms',
        params: {'LAYERS':'Project:india_ct', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

//map.addLayer(Cities_India);

var Roads_India = new ol.layer.Tile({
    title: "India Roads",
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Project/wms',
        params: {'LAYERS':'Project:india_roads', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

//map.addLayer(Roads_India);

var Buildings_India = new ol.layer.Tile({
    title: "India Buildings",
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Project/wms',
        params: {'LAYERS':'Project:india_bld', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

//map.addLayer(Buildings_India);

var WaterBody_India = new ol.layer.Tile({
    title: "India WaterBody",
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/Project/wms',
        params: {'LAYERS':'Project:india_waterbody', 'TILED': true},
        serverType: 'geoserver',
        visible: true
    })
});

//map.addLayer(WaterBody_India);

var overlayGroup = new ol.layer.Group({
    title: 'Overlays',
    fold: 'true',
    layers: [Districts_India, States_India, Cities_India, Roads_India, Buildings_India, WaterBody_India] 
});

map.addLayer(overlayGroup);

//var layerSwitcher = new ol.control.LayerSwitcher({
 //   activationMode: 'click',
 //   startActive: false,
 //   groupSelection: 'children'
//});

//map.addControl(layerSwitcher);

function toggleLayer(eve){
    var lyrname = eve.target.value;
    var checkedStatus = eve.target.checked;
    var lyrList = map.getLayers();
    
    lyrList.forEach(function(element){
        if (lyrname == element.get('title')){
            element.setVisible(checkedStatus)
        }
    });
}

var mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    projection: 'EPSG:4326',
    coordinateFormat: function(coordinate){return ol.coordinate.format(coordinate,'{y} , {x}', 6);}
});
map.addControl(mousePosition);

var scaleControl = new ol.control.ScaleLine({
    bar: true,
    text: true
});

map.addControl(scaleControl);

var container = document.getElementById('popup');
var content = document.getElemnetById('popup-content');
var closer = document.getElementById('popup-closer');

var popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

map.addOverlay(popup);

closer.onclick = function(){
    popup.setPosition(undefined);
    closer.blur();
    return false;
};

// start: home control

var homeButton = document.createElement('button');
homeButton.innerHTML = '<img src="resources/images/home_icon.svg" alt="" style="width:20px;height:20px;filter:brightness(0) invert(1);vertical-align:middle"></img>';
homeButton.className = 'myButton';

var homeElement = document.createElement('div');
homeElement.className = 'homeButtonDiv';
homeElement.appendChild(homeButton);

var homeControl = new ol.control.Control({
    element: homeElement
})

homeButton.addEventListener("click", () => {
    location.href = "index.html";
})

map.addControl(homeControl);

//end : home Control

// start: full screen control

var fsButton = document.createElement('button');
fsButton.innerHTML = '<img src="resources/images/fullscreen_icon.svg" alt="" style="width:20px;height:20px;filter:brightness(0) invert(1);vertical-align:middle"></img>';
fsButton.className = 'myButton';

var fsElement = document.createElement('div');
fsElement.className = 'fsButtonDiv';
fsElement.appendChild(fsButton);

var fsControl = new ol.control.Control({
    element: fsElement
})

fsButton.addEventListener("click", () => {
    var mapEle = document.getElementById("map");
    if(mapEle.requestFullscreen) {
        mapEle.requestFullscreen();
    } else if (mapEle.msRequestFullscreen) {
        mapEle.msRequestFullscreen();
    } else if (mapEle.mozRequestFullscreen) {
        mapEle.mozRequestFullscreen();
    } else if (mapEle.webkitRequestFullscreen) {
        mapEle.webkitRequestFullscreen();
    }
})
map.addControl(fsControl);

//end : full screen Control

// start: zoomIn Control

var zoomInInteraction = new ol.interaction.DragBox();

zoomInInteraction.on('boxend', function() {
    var zoomInExtent = zoomInInteraction.getGeometry().getExtent();
    map.getView().fit(zoomInExtent);
});

var ziButton = document.createElement('button');
ziButton.innerHTML = '<img src="resources/images/zoomIn_icon.svg" alt="" style="width:18px;height:18px;transform: rotate(270deg);filter:brightness(0) invert(1);vertical-align:middle"></img>';
ziButton.className = 'myButton';
ziButton.id = 'ziButton';

var ziElement = document.createElement('div');
ziElement.className = 'ziButtonDiv';
ziElement.appendChild(ziButton);

var ziControl = new ol.control.Control({
    element: ziElement
})

var zoomInFlag = false;
ziButton.addEventListener("click", () => {
    ziButton.classList.toggle('clicked');
    zoomInFlag = !zoomInFlag;
    if (zoomInFlag) {
        document.getElementById("map").style.cursor = "zoom-in";
        map.addInteraction(zoomInInteraction);
    } else {
        map.removeInteraction(zoomInInteraction);
        document.getElementById('map').style.cursor = "default";
    }
})

map.addControl(ziControl);

//end : zoomIn Control

// start: zoomOut Control

var zoomOutInteraction = new ol.interaction.DragBox();

zoomOutInteraction.on('boxend', function() {
    var zoomOutExtent = zoomInInteraction.getGeometry().getExtent();
    map.getView().setCenter(ol.extent.getCenter(zoomOutExtent));

    mapView.setZoom(mapView.getZoom() - 1)
});

var zoButton = document.createElement('button');
zoButton.innerHTML = '<img src="resources/images/zoomOut_icon.svg" alt="" style="width:18px;height:18px;transform: rotate(270deg);filter:brightness(0) invert(1);vertical-align:middle"></img>';
zoButton.className = 'myButton';
zoButton.id = 'zoButton';

var zoElement = document.createElement('div');
zoElement.className = 'zoButtonDiv';
zoElement.appendChild(zoButton);

var zoControl = new ol.control.Control({
    element: zoElement
})

var zoomOutFlag = false;
zoButton.addEventListener("click", () => {
    zoButton.classList.toggle('clicked');
    zoomOutFlag = !zoomOutFlag;
    if (zoomOutFlag) {
        document.getElementById("map").style.cursor = "zoom-out";
        map.addInteraction(zoomOutInteraction);
    } else {
        map.removeInteraction(zoomOutInteraction);
        document.getElementById('map').style.cursor = "default";
    }
})

map.addControl(zoControl);

//end : zoomOut Control

// start: FeatureInfo control

var featureInfoButton = document.createElement('button');
featureInfoButton.innerHTML = '<img src="resources/images/info_icon.svg" alt="" style="width:20px;height:20px;filter:brightness(0) invert(1);vertical-align:middle"></img>';
featureInfoButton.className = 'myButton';
featureInfoButton.id = 'featureInfoButton';

var featureInfoElement = document.createElement('div');
featureInfoElement.className = 'featureInfoDiv';
featureInfoElement.appendChild(featureInfoButton);

var featureInfoControl = new ol.control.Control({
    element: featureInfoElement
})

var featureInfoFlag = false;
featureInfoButton.addEventListener("click", () => {
    featureInfoButton.classList.toggle('clicked');
    featureInfoFlag = !featureInfoFlag;
})

map.addControl(featureInfoControl);

//end : FeatureInfo Control

map.on('singleclick', function (evt){
    if(featureInfoFlag){
        content.innerHTML = '';
        var resolution = mapView.getResolution();

        var url = Districts_India.getSource().getFeatureInfoUrl(evt.coordinate, resolution, 'EPSG:3857', {
            'INFO_FORMAT': 'application/json',
            'propertyName': 'state,district'
        });

        if (url){
            $.getJSON(url, function (data){
                var feature = data.features[0];
                var props = feature.properties;
                content.innerHTML = "<h3> State: </h3> <p>" + props.state.toUpperCase() + "</p> <br> <h3> District : </h3> <p>" + props.district.toUpperCase() + "</p>";
                popup.setPosition(evt.coordinate);
            })
        } else {
            popup.setPosition(undefined);
        }
    }

        
});

// start : auto locate functions

var intervalAutolocate;
var posCurrent;

var geolocation = new ol.Geolocation({
    trackingOptions: {
        enableHighAccuracy: true,
    },
    tracking: true,
    projection: mapView.getProjection()
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: '#3399CC',
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2,
            }),
        }),
    })
);
var accuracyFeature = new ol.Feature();

var currentPositionLayer = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature],
    }),
});

function startAutolocate() {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
    mapView.setCenter(coordinates);
    mapView.setZoom(16);
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    intervalAutolocate = setInterval(function () {
        var coordinates = geolocation.getPosition();
        var accuracy = geolocation.getAccuracyGeometry()
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        mapView.setCenter(coordinates);
        mapView.setZoom(16);
        accuracyFeature.setGeometry(accuracy);
    }, 5000);  //location taken every 5sec
}

function stopAutolocate() {
    clearInterval(intervalAutolocate);   //system will stop at zero
    positionFeature.setGeometry(null);
    accuracyFeature.setGeometry(null);
}

//end : auto locate functions 

// start : Length and Area Measurement Control

var lengthButton = document.createElement('button');
lengthButton.innerHTML = 'img src="resources/images/measure-length_icon.png" alt="" style="width:17px;height:17px;filter:brightness(0)  invert(1);vertical-align:middle"></img>';
lengthButton.className = 'myButton';
lengthButton.id = 'lengthButton';

var lengthElement = document.createElement('div');
lengthElement.className = 'lengthButtonDiv';
lengthElement.appendChild(lengthButton);

var lengthControl = new ol.control.Control({
    element: lengthElement
})

var lengthFlag = false;
lengthButton.addEventListener("click", () => {
    // disableOtherInteraction('lengthButton');
    lengthButton.classList.toggle('clicked');
    lengthFlag = !lengthFlag;
    document.getElementById("map").style.cursor = "default";
    if(lengthFlag){
        map.removeInteraction(draw);
        addInteraction('LineString');
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0) element[0].remove();
    }
})

map.addControl(lengthControl);

var areaButton = document.createElement('button');
areaButton.innerHTML = 'img src="resources/images/measure-area_icon.png" alt="" style="width:17px;height:17px;filter:brightness(0)  invert(1);vertical-align:middle"></img>';
areaButton.className = 'myButton';
areaButton.id = 'areaButton';

var areaElement = document.createElement('div');
areaElement.className = 'areaButtonDiv';
areaElement.appendChild(areaButton);

var areaControl = new ol.control.Control({
    element: areaElement
})

var areaFlag = false;
areaButton.addEventListener("click", () => {
    // disableOtherInteraction('areaButton');
    areaButton.classList.toggle('clicked');
    areaFlag = !areaFlag;
    document.getElementById("map").style.cursor = "default";
    if(areaFlag){
        map.removeInteraction(draw);
        addInteraction('Polygon');
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0) element[0].remove();
    }
})

map.addControl(areaControl);

/**
 * Message to show when user is drawing a polygon.
 * @type {string}
 */
 var continuePolygonMsg = 'Click to continue polygon, Double click to complete';

 /**
  * Message to show when the user drawing a line.
  * @type {string}
  */
 var continueLineMsg = 'Click to continue line, Double click to complete';

 var draw; //global so we can remove later

 var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2,
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            }),
        }),
    }),
});

    map.addLayer(vector);

    function addInteraction(intType){

        draw = new ol.interaction.Draw({
            source: source,
            type: intType,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(200, 200, 200, 0.6)',
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10,10],
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    }),
                }),
            }),
            
        });
        map.addInteraction(draw);

        createMeasureTooltip();
        createHelpToooltip();

        /**
         * Currently drawn feature.
         * @type {import("../src/ol/Feature.js").default}
         */
        var sketch;

        /**
         * Handle pointer move.
         * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
         */
        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /**@type {string} */
            var helpMsg = 'Click to start drawing';

            if (sketch) {
                var geom = sketch.getGeometry();
                // if (geom instanceof ol.geo.Polygon){
                //   helpMsg = continuePolygonMsg;
                // } else if (geom instanceof ol.geom.LineString) {
                //   helpMsg = continueLineMsg;
                // }
            }

            //helpTooltipElement.innerHTML = helpMsg;
            //helptooltip.setPosition(evt.cpprdinate);

            //helpTooltipElement.classList.remove('hidden');
        };

        map.on('pointermove', pointerMoveHandler);

        // var listener;
        draw.on('drawstart', function (evt) {
            // set sketch
            sketch = evt.feature;

            /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            //listener = sketch.getGeometry().on('change', function (evt) {
            sketch.getGeometry().on('change', function (evt){
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        });
        
        draw.on('drawend', function () {
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
            measureTooltip.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            //ol.Observable.unByKey(listener);
        });

    }

    /**
     * The help tooltip element.
     * @type {HTMLElement}
     */
    var helpTooltipElement;

    /**
     * Overlay to show the help messages.
     * @type {Overlay}
     */
    var helpTooltip;

    /**
     * Creates a new help tooltip
     */
    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'ol-tooltip hidden';
        helpTooltipElement = new ol.Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left',
        });
        map.addOverlay(helpTooltip);
    }

    map.getViewport().addEventListener('mouseout', function () {
        helpTooltipElement.classList.add('hidden');
    });

    /**
     * The measure tooltip element.
     * @type {HTMLElement}
     */
    var measureTooltipElement;

    /**
     * Overlay to show the measurement.
     * @type {Overlay}
     */
    var measureTooltip;

    /**
      * Creates a new measure tooltip 
      */
    
    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        measureTooltipElement = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'center-left',
        });
        map.addOverlay(measureTooltip);
    }

    /**
     * Format length output.
     * @param {LineString} line The line.
     * @return {string} The formatted length.
     */
    var formatLength = function (line) {
        var length =ol.sphere.getLength(line);
        var output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
            output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
    };

    /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    var formatArea = function (polygon) {
        var area = ol.sphere.getArea(polygon);
        var output;
        if (area > 10000) {
            output = Math.round((area/100000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
        } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
        }
        return output;
    };



    // end : Length and Area Measurement Control

    // start : attribute query

    var geojson;
    var featureOverlay;

    var qryButton = document.createElement('button');
    qryButton.innerHTML = '<img src="resources/images/query_icon.svg" alt="" style="width:17px;height:17px;transform: rotate(270deg);filter:brightness(0) invert(1);vertical-align:middle"></img>';
    qryButton.className = 'myButton';
    qryButton.id = 'qryButton';

    var qryElement = document.createElement('div');
    qryElement.className = 'qryButtonDiv';
    qryElement.appendChild(qryButton);

    var qryControl = new ol.control.Control({
        element: qryElement
    })

    var qryFlag = false;
    qryButton.addEventListener("click", () => {
        // disableOtherInteraction('lengthButton'));
        qryButton.classList.toggle('clicked');
        qryFlag = !qryFlag;
        document.getElementById("map").style.cursor = "default";
        if (qryFlag) {
            if (geojson) {
                geojson.getSource().clear();
                map.removeLayer(geojson);
            }

            if(featureOverlay) {
                featureOverlay.getSource().clear();
                map.removeLayer(featureOverlay);
            }
            document.getElementById("map").style.cursor = "default";
            document.getElementById("attQueryDiv").style.display = "block";

            bolIdentify = false;

            addMapLayerList();
            
        } else {  
            document.getElementById('map').style.cursor = "default";
            document.getElementById("attQueryDiv").style.display = "none";

            document.getElementById("attListDiv").style.display = "none";

            if (geojson) {
                geojson.getSource().clear();
                map.removeLayer(geojson);
            }

            if(featureOverlay) {
                featureOverlay.getSource().clear();
                map.removeLayer(featureOverlay);
            }          
        }
    })

    map.addControl(qryControl);

    function addMapLayerList(selectElementName) {
        $('#editingLayer').empty();
        $('#selectLayer').empty();
        $('#buffSelectLayer').empty();
        $(document).ready(function() {
            $ajax({
                type: "GET",
                url: "http://" + serverPort +"/geoserver/wfs?request=getCapabilities",
                dataType: "xml",
                success: function (xml) {
                    var select = $('#' + selectElementName);
                    select.append("option class='ddindent' value=''></option>");
                    $(xml).find('FeatureType').each(function () {
                        $(this).find('Name').each(function () {
                            var value = $(this).text();
                            if (layerList.includes(value)) {
                                select.append("<option class='ddintent' value='" + value + "'>" + value + "</option>");
                            }
                        });
                    });
                }
            });
        });    
    };

    $(function () {
        document.getElementById("selectLayer").onchange = function () {
            var select = document.getElementById("selectAttribute");
            while (select.options.length > 0) {
                select.remove(0);
            }
            var value_layer = $(this).val();
            $(document).ready(function () {
                $.ajax({
                    type: "GET",
                    url: "http://localhost:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer,
                    dataType: "xml",
                    success: function (xml) {

                        var select = $('#selectAttribute');
                        //var title = $(xml).find('xsd\\:complexType').attr('name');
                        // alert(title);
                        select.append("<option class='ddindent' value=''></option>");
                        $(xml).find('xsd\\:sequence').each(function () {

                            $(this).find('xsd\\:element').each(function () {
                                var value = $(this).attr('name');
                                //alert(value);
                                var type = $(this).attr('type');
                                //alert(type);
                                if (value != 'geom' && value !='the_geom') {
                                    select.append("option class='ddindent' value='" + type + "'>" + value + "</options>");
                                }
                            });
                        });
                    }
                });
            });
        }
        document.getElementById("selectAttribute").onchange = function () {
            var operator = document.getElementById("selectOperator");
            while (operator.options.length > 0) {
                operator.remove(0);
            }

            var value_type = $(this).val();
            // alert(value_type);
            var value_attribute = $('#selectAttribute option:selected').text();
            operator.options[0] = new Option('Select operator', "");
            
            if (value_type == 'xsd:short' || value_type == 'xsd:int' || value_type == 'xsd:double') {
                var operator1 = document.getElementById("selectOperator");
                operator1.options[1] = new Option('Greater than', '>');
                operator1.options[2] = new Option('Less than', '<');
                operator1.options[3] = new Option('Equal to', '=');
            }
            else if (value_type == 'xsd:string') {
                var operator1 = document.getElementById("selectOperator");
                operator1.options[1] = new Option('Like', 'Like');
                operator1.options[2] = new Option('Equal to', '=');

            }
        }

        document.getElementById('attyQryRun').onclick = function () {
            map.set("isLoading", 'YES');

            if (featureOverlay) {
                featureOverlay.getSource().clear();
                map.removeLayer(featureOverlay);
            }

            var layer = document.getElementById("selectLayer");
            var attribute = document.getElementById("selectAttribute");
            var operator = document.getElementById("selectOperator");
            var txt = document.getElementById("enterValue");

            if (layer.options.selectedIndex == 0) {
                alert("Select Layer");
            } else if (attribute.options.selectedIndex == -1) {
                alert("Select Attribute");
            } else if (operator.options.selectedIndex <= 0) {
                alert("Select Operator");
            } else if (txt.value.length <= 0) {
                alert("Enter Value");
            } else {
                var value_layer = layer.options[layer.selectedIndex].value;
                var value_attribute = attributed.options[attributed.selectedIndex].text;
                var value_operator = operator.options[operator.selectedIndex].value;
                var value_txt = txt.value;
                if (value_operator == 'Like') {
                    value_txt = "%25" + value_txt + "%25";
                }
                else {
                    value_txt = value_txt;
                }
                
                var url = "https://localhost:8080/geoserver/Project/ows?service=WFS&version=1.0.0&request=GetFeatured&typeName=" + value_layer + "&CQL_FILTER=" + value_attribute + "+" + value_operator + "+'" + value_txt + "'&outputFormat=application/json"
                // console.log(url);
                newaddGeoJsonToMap(url);
                newpopulateQueryTable(url);
                setTimeout(function () { newaddRowHandlers(url);},300);
                map.set("isLoading", 'NO');
            }
        }
    });

    /* function newaddGeoJsonToMap(url) {                            //notsure
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        queryGeoJSON = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: url,
                format: new ol.format.GeoJSON()
            }),
            style: querySelectedFeatureStyle,
        });

        queryGeoJSON.getSource().on('addfeature', function () {
            map.getView().fit(
                queryGeoJSON.getSource().getExtent(),
                { duration: 1590, size: map.getSize(), maxZoom: 21 }
            );
        });
        map.addLayer(queryGeoJSON);
    } */

    function newaddGeoJsonToMap(url) {

        if (geojson) {
            geojson.getSource().clear();
            map.removeLayer(geojson);
        }

        var style = new ol.style.Style({
            //fill: new ol.style.Fill({
            //    color: 'rgba(0, 255, 255, 0.7)'
            //}),
            stroke: new ol.style.Stroke({
                color: '#FFFF00',
                width: 3
            }),
            Image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#FFFF00'
                })
            })
        });

        geojson = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: url,
                format: new ol.format.GeoJSON()
            }),
            style: style,
        });

        geojson.getSource().on('addfeature', function () {
            map.getView().fit(
                geojson.getSource().getExtent(),
                { duration: 1590, size: map.getSize(), maxZoom: 21 }
            );
        });
        map.addLayer(geojson);
    };

    function newpopulateQueryTable(url) {
        if (typeof attributePanel !== 'undefined') {
            if (attributePanel.parentElement !== null) {
                attributedPanel.close();
            }
        }
        $.getJSON(url, function (data) {
            var col = [];
            col.push('id');
            for (var i=0; i < data.features.length; i++) {

                for (var key in data.features[i].properties) {

                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            var table = document.createElement("table");

            table.setAttribute("class", "table table-bordered table-hover table-condensed");
            table.setAttribute("id", "attQryTable");
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);          // TABLE ROW

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");  // TABLE HEADER
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for(var i = 0; i < data.features.length; i++) {
                tr = table.insertRow(-1);
                for (var j=0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    if (j==0) { tabCell.innerHTML = data.features[i]['id'];}
                    else {
                        tabCell.innerHTML = data.features[i].properties[col[j]];
                    }
                }
            }

            // var tabDiv = document.createElement("div");
            var tabDiv = document.getElementById('attListDiv');

            var delTab = document.getElementById('attQryTable');
            if (delTab) {
                tabDiv.removeChild(delTab);
            }

            tabDiv.appendChild(table);

            document.getElementById("attListDiv").style.display = "block";
        });

        var highlightStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255,0,255,0.3)',
            }),
            stroke: new ol.style.Stroke({
                color: '#FF00FF',
                width: 3,
            }),
            Image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({
                    color: '#FF00FF'
                })
            })
            
        });

        var featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector(),
            map: map,
            style: highlightStyle
        });
    };

    function newaddRowHandlers() {
        var table = document.getElementById("attQryTable");
        var rows = document.getElementById("attQryTable").rows;
        var heads = table.getElementByTagName("th");
        var col_no;
        for (var i = 0; i < heads.length; i++) {
            // Take each cell
            var head = heads[i];
            if (head.innerHTML == 'id') {
                col_no = i+1;
            }
        }
        for (i = 0; i < rows.length; i++) {
            rows[i].onclick = function () {
                return function () {
                    featureOverlay.getSource().clear();

                    $(function () {
                        $("#attQryTable td").each(function () {
                            $(this).parent("tr").css("background-color", "white");
                        });
                    });
                    var cell = this.cells[col_no - 1];
                    var id = cell.innerHTML;
                    $(document).ready(function () {
                        $("#attQryTable td:nth-child(" + col_no + ")").each(function () {
                            if ($(this).text() == id) {
                                $(this).parent("tr").css("background-color", "#d1d8e2");
                            }
                        });
                    });

                    var features = geojson.getSource().getFeatures();

                    for (i = 0; i < features.length; i++) {
                        if (features[i].getId() == id) {
                            featureOverlay.getSource().addFeature(features[i]);

                            featureOverlay.getSource().on('addFeature', function () {
                                map.getView().fit(
                                    featureOverlay.getSource().getExtent(),
                                    { duration: 1500, size: map.getSize(), maxZoom: 24 }
                                );
                            });
                        }
                    }
                };
            }(rows[i]);
        }
    }

 
    //end : attribute query

    var interactionStyle = new ol.style.Style({                          //notsure
        // Apply the 'interactionStyle' class to the feature's style
        className: 'interactionStyle',
      });
      

    var markerFeature;

    var clickSelectedFeatureOverlay = new ol.layer.Vector({               // not sure
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.1)',
          }),
          stroke: new ol.style.Stroke({
            color: 'red',
            width: 2,
          }),
        }),
      });

    function addInteractionForSpatialQuery(intType) {
        draw = new ol.interaction.Draw({
            source: clickSelectedFeatureOverlay.getSource(),
            type: intType,
            style: interactionStyle
        });
        map.addInteraction(draw);

        draw.on('drawend', function (e) {      //captures the input geometry
            markerFeature = e.feature;
            markerFeature.set('geometry', markerFeature.getGeometry());
            map.removeInteraction(draw);
            document.getElementById('spUserInput').classList.toggle('clicked');
            map.addLayer(clickSelectedFeatureOverlay);
        })
    }

    function selectFeature(evt) {                                       //not sure about this one
        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }   
        var selectedFeature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        });
    
        if (selectedFeature) {
            featureOverlay = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [selectedFeature],
                }),
                style: interactionStyle, 
            });

            map.addLayer(featureOverlay);
        }
    }
    
    // start : spatial query
    var bufferButton = document.createElement('button');
    bufferButton.innerHTML = '<img src="resources/images/mapSearch_icon.png" alt="" class="myImg"><span class="tooltiptext">Spatial Query</span>';
    bufferButton.className = 'myButton';
    bufferButton.id = 'bufferButton';
    bufferButton.title = 'Spatial Query';

    var bufferElement = document.createElement('div');
    bufferElement.className = 'bufferButtonDiv';
    bufferElement.appendChild(bufferButton);
    toolbarDivElement.appendChild(bufferElement);

    //var bufferControl = new ol.control.Control({
    //    element: bufferElement
    //})

    var bufferFlag = false;
    bufferButton.addEventListener("click", () => {
        // disableOtherInteraction('lengthButton'));
        bufferButton.classList.toggle('clicked');
        bufferFlag = !bufferFlag;
        document.getElementById("map").style.cursor = "default";
        if (bufferFlag) {
            if (geojson) {
                geojson.getSource().clear();
                map.removeLayer(geojson);
            }

            if(featureOverlay) {
                featureOverlay.getSource().clear();
                map.removeLayer(featureOverlay);
            }
            document.getElementById("map").style.cursor = "default";
            document.getElementById("attQueryDiv").style.display = "block";

            //bolIdentify = false;

            addMapLayerList_spQry(); //shows all the layers
            
        } else {  
            document.getElementById('map').style.cursor = "default";
            document.getElementById("spQueryDiv").style.display = "none";
            document.getElementById("attListDiv").style.display = "none";

            if (geojson) {
                geojson.getSource().clear();
                map.removeLayer(geojson);
            }

            if(featureOverlay) {
                featureOverlay.getSource().clear();
                map.removeLayer(featureOverlay);
            }
            map.removeInteraction(draw);
            if (document.getElementById('spUserInput').classList.contains('clicked')) { document.getElementById('spUserInput').classList.toggle('clicked');}         
        }
    })

    /*function addMapLAyerList_spQry() {                   //was added during later versions
        var select = $('#buffSelectLayer');
        select.empty();
        select.append("<option class='ddindent' value=''></option>");
        for (i = 0; i < addMapLayerList.length; i++) {
            var value = layerList[i];
            select.append("<option class='ddindent' value= '" + value + "'>" + value + "</option>");
        }
    }; */

    function addMapLayerList_spQry() {
        $(document).ready(function () {
            $ajax({
                type: "GET",
                url: "http://"+serverPort+"/geoserver/wfs?request=getCapabilities",
                dataType: "xml",
                success: function (xml) {
                    var select = $('#buffSelectLayer');
                    select.append("option class='ddindent' value=''></option>");
                    $(xml).find('FeatureType').each(function () {
                        $(this).find('Name').each(function () {
                            var value = $(this).text();
                            if (addMapLayerList.includes(value)) {
                            select.append("<option class='ddintent' value='" + value + "'>" + value + "</option>");
                            }
                        });
                    });
                }
            });
        });
    };
    // end :  spatial query

    // start : start editing Control
    var editgeojson;
    var editLayer;
    var modifiedFeatureList = [];
    var editTask;
    var editTaskName;
    var modifiedFeature = false;
    var modifyInteraction;
    var featureAdd;
    var snap_edit;
    var selectedFeatureOverlay = new ol.layer.Vector({
        title: 'Selected Feature',
        source: new ol.source.Vector(),
        map: map,
        style:highlightStyle
    });

    var startEditingButton = document.createElement('button');
    startEditingButton.innerHTML = '<img src="resources/images/edit_icon.svg" alt="" class="myImg"></img>';
    startEditingButton.className = 'myButton';
    startEditingButton.id = 'startEditingButton';
    startEditingButton.title = 'Start Editing';

    var startEditingElement = document.createElement('div');
    startEditingElement.className = 'myButtonDiv';
    startEditingElement.id = 'startEditingButton';
    startEditingElement.appendChild(startEditingButton);
    toolbarDivElement.appendChild(startEditingElement);

    var startEditingFlag = false;
    startEditingButton.addEventListener("click", () => {
        startEditingButton.classList.toggle('clicked');
        startEditingFlag = !startEditingFlag;
        document.getElementById("map").style.cursor = "default";
        if (startEditingFlag) {
            document.getElementById("editingControlsDiv").style.display = "block";
            editLayer = document.getElementById('editingLayer').value;
            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 0, 0)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#00FFFF',
                    width: 1
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#00FFFF'
                    })
                })
            });
            
            if (editgeojson) {
                editgeojson.getSource().clear();
                map.removeLayer(editgeojson);
            }

            editgeojson = new ol.layer.Vector({
                title: "Edit Layer",
                source: new ol.source.Vector({
                    format: new ol.format.GeoJSON(),
                    url: function (extent) {
                        return 'http://' + serverPort + '/geoserver' + geoserverWorkspace + 'ows?service=WFS&' +
                        'version=1.0.0&request=GetFeature&typeName=' + editLayer + '&' +
                        'outputFormat=application/json&srsname=EPSG:3857&' +
                        'bbox=' + extent.join(',') + ',EPSG:3857';
                    },
                    strategy: ol.loadingstrategy.bbox //bounding box strategy
                }),
                style: style,
            });
            map.addLayer(editgeojson);

        } else {
            document.getElementById("editingControlsDiv").style.display = "none"; 
            editgeojson.getSource().clear();
            map.removeLayer(editgeojson)
        }
    })

    // end : start editing Control

    // start : add feature control

    var editingControlDivElement = document.getElementById('editingControlsDiv');

    var addFeatureButton = document.createElement('button');
    addFeatureButton.innerHTML = '<img src="resources/images/editAdd_icon.svg" alt="" class="myImg"></img>';
    addFeatureButton.className = 'myButton';
    addFeatureButton.id = 'addFeatureButton';
    addFeatureButton.title = 'Add Feature';

    var addFeatureElement = document.createElement('div');
    addFeatureElement.className = 'myButtonDiv';
    addFeatureElement.id = 'addFeatureButton';
    addFeatureElement.appendChild(addFeatureButton);
    editingControlsDivElement.appendChild(addFeatureElement);
    
    var addFeatureFlag = false;
    addFeatureButton.addEventListener("click", () => {
        addFeatureButton.classList.toggle('clicked');
        addFeatureFlag = !addFeatureFlag;
        document.getElementById("map").style.cursor = "default";
        if (addFeatureFlag) {
            if (modifiedFeatureList) {
                if (modifiedFeatureList.length > 0) {
                    var answer = confirm('Save edits?');
                    if (answer) {
                        saveEdits(editTask);
                        modifiedFeatureList = [];
                    } else {
                        // cancelEdits();
                        modifiedFeatureList = [];
                    }

                }
            }
            editTask = 'insert';
            addFeature();

        } else {
            if (modifiedFeatureList.length > 0) {
                var answer = confirm('Do you want to save edits?');
                if (answer) {
                    saveEdits(editTask);
                    modifiedFeatureList = [];
                } else {
                    // cancelEdits();
                    modifiedFeatureList = [];
                }
            }

            map.un('click', modifyFeature);
            selectedFeatureOverlay.getSource().clear();
            map.removeLayer(selectedFeatureOverlay);
            modifiedFeature = false;
            map.removeInteraction(modifyInteraction);
            map.removeInteraction(snap_edit);
            editTask = '';

            if (modifyInteraction) {
                map.removeInteraction(modifyInteraction);
            }
            if (snap_edit) {
                map.removeInteraction(snap_edit);
            }
            if (drawInteraction) {
                map.removeInteraction(drawInteraction);
            }
        }
    })

    function addFeature(evt) {
        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }

        if (modifyInteraction) {
            map.removeInteraction(modifyInteraction);
        }
        if (snap_edit) {
            map.removeInteraction(snap_edit);
        }

        var interactionType;
        source_mod = editgeojson.getSource();
        drawInteraction = new ol.interaction.Draw({
            source: editgeojson.getSource(),
            type: editgeojson.getSource().getFeatures()[0].getGeometry().getType(),
            style: interactionStyle
        });
        map.addInteraction(drawInteraction);
        snap_edit = new ol.interaction.Snap({
            source: editgeojson.getSource()
        });
        map.addInteraction(snap_edit);

        drawInteraction.on('drawend', function (e) {
            var feature = e.feature;
            feature.set('geometry', feature.getGeometry());
            modifiedFeatureList.push(feature);
        })
    }

    // end : add feature control
    
    // start : Modify Feature Control

    var modifyFeatureButton = document.createElement('button');
    
    modifyFeatureButton.innerHTML = '<img src="resources/images/editModify_icon.svg" alt="" class="myImg"></img>';
    modifyFeatureButton.className = 'myButton';
    modifyFeatureButton.id = 'modifyFeatureButton';
    modifyFeatureButton.title = 'Modify Feature';

    var modifyFeatureElement = document.createElement('div');
    modifyFeatureElement.className = 'myButtonDiv';
    modifyFeatureElement.id = 'modifyFeatureButton';
    modifyFeatureElement.appendChild(modifyFeatureButton);
    editingControlsDivElement.appendChild(modifyFeatureElement);

    var modifyFeatureFlag = false;
    modifyFeatureButton.addEventListener("click", () => {
        modifyFeatureButton.classList.toggle('clicked');
        modifyFeatureFlag = !modifyFeatureFlag;
        document.getElementById("map").style.cursor = "default";
        if (modifyFeatureFlag) {
            modifiedFeatureList = [];
            selectedFeatureOverlay.getSource().clear();
            map.removeLayer(selectedFeatureOverlay);
            map.on('click', modifyFeature);              
            editTask = 'update';
        } else {
            if (modifiedFeatureList.length > 0) {
                var answer = confirm('Save edits?');
                if (answer) {
                    saveEdits(editTask);
                    modifiedFeatureList = [];
                } else {
                    // cancelEdits();
                    modifiedFeatureList = [];
                }
            }

            map.un('click', modifyFeature);
            selectedFeatureOverlay.getSource().clear();
            map.removeLayer(selectedFeatureOverlay);
            modifiedFeature = false;
            map.removeInteraction(modifyInteraction);
            map.removeInteraction(snap_edit);
            editTask = '';
        }
    })

    function modifyFeature(evt) {
        selectedFeatureOverlay.getSource().clear();
        map.removeLayer(selectedFeatureOverlay);
        var selectedFeature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });

        if (selectedFeature) {
            selectedFeatureOverlay.getSource().addFeature(selectedFeature);
        }
        var modifySource = selectedFeatureOverlay.getSource();
        modifyInteraction = new ol.interaction.Modify({
            source: modifySource
        });
        map.addInteraction(modifyInteraction);

        var sourceEditGeoJson = editgeojson.getSource();
        snap_edit = new ol.interaction.Snap({
            source: sourceEditGeoJson
        });
        map.addInteraction(snap_edit);
        modifyInteraction.on('modifyend', function (e) {
            modifiedFeature = true;
            featureAdd = true;
            if (modifiedFeatureList.length > 0) {

                for (var j = 0; j < modifiedFeatureList,length; j++) {
                    if (e.features.item(0)['id_'] == modifiedFeatureList[j]['id_']) {
                        // modifiedFeatureList.splice(j,1);
                        featureAdd = false;
                    }
                }
            }
            if (featureAdd) { modifiedFeatureList.push(e.features.item(0));}
        })
        //}
        //}
    }

    var clones = [];

    function saveEdits(editTaskName){
        clones = [];
        for (var i = 0; i < modifiedFeatureList.length; i++) {
            var features = modifiedFeatureList[i];
            var featureProperties = feature.getProperList();

            delete featureProperties.boundedBy;
            var clone = feature.clone();
            clone.setId(feature.getId());

            // if (editTaskName != 'insert') {clone.setGeometryName('the_geom');}
            clones.push(clone)
            // if (editTaskName == 'insert') { transactWFS('insert', clone);}
        }

        if (editTaskName == 'update') { transactWFS('update_batch', clones);}
        if (editTaskName == 'insert') { transactWFS('insert_batch', clones);}

    }

    var formatWFS = new ol.format.WFS();


    var transactWFS = function (mode, f) {

        var node;
        var formatGML = new ol.format.GML({
            // featureNS: 'http://argeomatica.com',
            featureNS: geoserverWorkspace,
            // featureType: 'playa_sample',
            featureType: editLayer,
            service: 'WFS',
            version: '1.1.0',
            request: 'GetFeature',
            srsName: 'EPSG:3857'
        });
        switch (mode) {
            case 'insert':
                node = formatWFS.writeTransaction([f], null, null, formatGML);
                break;
            case 'insert_batch':
                node = formatWFS.writeTransaction(f, null, null, formatGML);
                break;
            case 'update':
                node = formatWFS.writeTransaction(null, [f], null, formatGML);
                break;
            case 'update_batch':
                node = formatWFS.writeTransaction(null, f, null, formatGML);
                break;
            case 'delete':
                node = formatWFS.writeTransaction(null, null, [f], formatGML);
                break;
            case 'delete_batch':
                node = formatWFS.writeTransaction(null, null, [f], formatGML); //shoulve been f only
                break;
                
        }
        var xs = new XMLSerializer();
        var payload = xs.serializeToString(node);

        payload = payload.split('feature:' + editLayer).join(editLayer);
        if (editTask == 'insert') { payload = payload.split(geoserverWorkspace + 'geometry').join(geoserverWorkspace + ':geom')} //changing geometry instances to geom
        if (editTask == 'update') { payload = payload.split('<Name>geometry</Name>').join('<Name>geom</Name>');}
        // payload = payload.replace(/feature:editLayer/g, editLayer);

        $ajax('http://localhost:8080/geoserver/wfs', {
            type: 'POST',
            dataType: 'xml',
            processData: false,
            contentType: 'text/xml',
            data: payload.trim(),
            success: function (data) {
                // console.log('building updated');
            },
            error: function (e) {
                var errorMsg = e ? (e.status + ' ' + e.statusText) : "";
                alert('Error saving this feature to GeoServer.<br><br>'
                + errorMsg);
            }
        }).done(function (){

            editgeojson.getSource().refresh();

        });
    };
    // end : Modify Feature Control

    // start : Delete feature control

    var deleteFeatureButton = document.createElement('button');
    deleteFeatureButton.innerHTML = '<img src="resources/images/editErase_icon.svg" alt="" class="myImg"></img>';
    deleteFeatureButton.className = 'myButton';
    deleteFeatureButton.id = 'deleteFeatureButton';
    deleteFeatureButton.title = 'Delete Feature';

    var deleteFeatureElement = document.createElement('div');
    deleteFeatureElement.className = 'myButtonDiv';
    deleteFeatureElement.id = 'deleteFeatureButton';
    deleteFeatureElement.appendChild(deleteFeatureButton);
    editingControlsDivElement.appendChild(deleteFeatureElement);

    var deleteFeatureFlag = false;
    deleteFeatureButton.addEventListener("click", () => {
        deleteFeatureButton.classList.toggle('clicked');
        deleteFeatureFlag = !deleteFeatureFlag;
        document.getElementById("map").style.cursor = "default";
        if (deleteFeatureFlag) {
            modifiedFeatureList = [];
            selectedFeatureOverlay.getSource().clear();
            map.removeLayer(selectedFeatureOverlay);
            editTask = 'delete';
            map.on('click', selectFeatureToDelete);              
            
        } else {
            if (modifiedFeatureList.length > 0) {
                var answer = confirm('You have unsaved edits. Do you want to save edits?');
                if (answer) {
                    saveEdits(editTask);
                    modifiedFeatureList = [];
                } else {
                    // cancelEdits();
                    modifiedFeatureList = [];
                }
            }

            map.un('click', modifyFeature);
            selectedFeatureOverlay.getSource().clear();
            map.removeLayer(selectedFeatureOverlay);
            modifiedFeature = false;
            //map.removeInteraction(modifyInteraction);
            //map.removeInteraction(snap_edit);
            editTask = '';
        }
    })

    function selectFeatureToDelete(evt) {
        clickSelectedFeatureOverlay.getSource().clear();
        map.removeLayer(clickSelectedFeatureOverlay);
        var selectedFeature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });

        if (selectedFeature) {
            // clickSelectedFeatureOverlay.getSource().addFeature(selectedFeature);
            clones = [];
            var answer = confirm('Do you want to delete selected features');
            if (answer) {
                var feature = selectedFeature;
                var featureProperties = feature.getProperties();

                delete featureProperties.boundedBy;
                var clone = feature.clone();
                clone.setId(feature.getId());

                // clone.setGeometryName('the_geom');
                clones.push(clone)
                if (editTaskName == 'update') { transactWFS('update_batch', clone);}
                if (editTaskName == 'insert') { transactWFS('insert_batch', clone);}
                if (editTaskName == 'delete') { transactWFS('delete', clone);}
            }
        }

    }
    // end : Delete feature control












    // start : settings Control

    var settingsButton = document.createElement('button');
    settingsButton.innerHTML = '<img src="resources/images/settings_icon.svg" alt="" class="myImg"></img>';
    settingsButton.className = 'myButton';
    settingsButton.id = 'settingsButton';
    settingsButton.title = 'Settings';

    var settingElement = document.createElement('div');
    settingElement.className = 'myButtonDiv';
    settingElement.appendChild(settingsButton);
    toolbarDivElement.appendChild(settingElement);

    var settingFlag = false;
    settingsButton.addEventListener("click", () => {
        settingsButton.classList.toggle('clicked');
        settingFlag = !settingFlag;
        document.getElementById("map").style.cursor = "default";
        if (settingFlag) {
            document.getElementById("settingsDiv").style.display = "block";
            addMapLayerList('editingLayer');   
        } else {
            document.getElementById("settingsDiv").style.display = "none";  
        }
    })

    // end : settings Control


    // finally add all main control to map
    var allControl = new ol.control.Control({
        element: toolbarDivElement
    })
    map.addControl(allControl);

    // start : live search function

    var txtVal = "";
    var inputBox = document.getElementById('inpt_search');
    inputBox.onkeyup = function () {
        var newVal = this.value.trim();
        if (newVal == txtVal) {
        } else {
            txtVal = this.value;
            txtVal = txtVal.trim();
            if (txtVal !== "") {
                if (txtVal.length > 2) {
                    clearResults();
                    createLiveSearchTable();

                    $ajax({
                        url: 'resources/custom/fetch.php',
                        type: 'post',
                        data: { request: 'liveSearch', searchTxt: txtVal, searchLayer: 'public.' + districtLayerName , searchAttribute: 'dist_name'},
                        dataType: 'json',
                        success: function (response) {
                            createRows(response, districtLayerName);
                        }
                    });

                    $ajax({
                        url: 'resources/custom/fetch.php',
                        type: 'post',
                        data: { request: 'liveSearch', searchTxt: txtVal, searchLayer: 'public.' + stateLayerName , searchAttribute: 'name'},
                        dataType: 'json',
                        success: function (response) {
                            createRows(response, stateLayerName);
                        }
                    });


                } else { clearResults(); }
            } else {
                clearResults();
            }

        }
        //var liveDataDivEle = document.createElement('div');                // start: doubt
        //var liveDataDivEle.className = 'liveDataDiv';

        var liveDataDivEle = document.getElementById('liveDataDiv');
        if (!liveDataDivEle) {
            liveDataDivEle = document.createElement('div');
            liveDataDivEle.className = 'liveDataDiv';
            liveDataDivEle.id = 'liveDataDiv';

            var object = "Your content here";

            var tableHeader1 = document.createElement('th');
            var tableHeader2 = document.createElement('th');

            tableHeader1.innerHTML = object;
            tableHeader2.innerHTML = object;

            var tableHeaderRow = document.createElement('tr');
            tableHeaderRow.appendChild(tableHeader1);
            tableHeaderRow.appendChild(tableHeader2);

            var searchTable = document.createElement('table');

            searchTable.appendChild(tableHeaderRow);
            
            liveDataDivEle.innerHTML = object;

            document.body.appendChild(liveDataDivEle);
        }


        //xyz



        

        //tableHeaderRow.appendChild(tableHeader1);
        //tableHeaderRow.appendChild(tableHeader2);
        //searchTable.appendChild(tableHeaderRow);                            // end : start
    }


    function createRows(data, layerName) {
        var i = 0;
        for (var key in data) {
            var data2 = data[key];
            var tableRow = document.createElement('tr');
            var td1 = document.createElement('td');
            if (i==0) { td1.innerHTML = layerName; }
            var td2 = document.createElement('td');
            for (var key2 in data2) {
                td2.innerHTML = data2[key2];
                if (layerName == stateLayerName) { td2.setAttribute('onclick', 'zoomToFeature(this,\'' + stateLayername + '\', \'' + key2 + '\')');}
                else if (layerName == districtLayerName) { td2.setAttribute('onclick', 'zoomToFeature(this,\'' + distrcitLayername + '\', \'' + key2 + '\')');}
                else { }
            }
            tableRow.appendChild(td1);
            tableRow.appendChild(td2);
            searchTable.appendChild(tableRow);

            i = i + 1;
        }

        liveDataDivEle.appendChild(searchTable);
        var ibControl = new ol.control.Control({
            element: liveDataDivEle,
        });
        map.addControl(ibControl);
    }

    function clearResults() {
        liveDataDivEle.innerHTML = '';
        searchTable.innerHTML = '';
        map.removeLayer(queryGeoJSON);
    }

    function zoomToFeature(featureName, layerName, attributeName) {
        map.removeLayer(geojson);
        var value_layer = layerName;
        var value_attribute = attributeName;
        var value_operator = "==";
        var value_txt = featureName.innerHTML;
        var url = "http://localhost:8080/geoserver/Project/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=" + value_attribute + "+" + value_operator + "+" + value_txt + "'&outputFormat=application/json"
        // console.log(url);
        newaddGeoJsonToMap(url);
    }

    // end : live search function

    // start : onload functions
    $(function () {
        // render layerswitcher control
        var toc = document.getElemenetById('layerSwitcherContent');
        layerSwitcherControl = new ol.control.LayerSwitcher.renderPanel(map, toc, { reverse: true});

        document.getElementById("selectLayer").onchange = function () {
            var select = document.getElementById("selectAttribute");
            while (select.options.length > 0) {
                select.remove(0);
            }
            var value_layer = $(this).val();
            $(document).ready(function () {
                $.ajax({
                    type: "GET",
                    url: "http://"+ serverport +"/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer,
                    dataType: "xml",
                    success: function (xml) {

                        var select = $('#selectAttribute');
                        //var title = $(xml).find('xsd\\:complexType').attr('name');
                        // alert(title);
                        select.append("<option class='ddindent' value=''></option>");
                        $(xml).find('xsd\\:sequence').each(function () {

                            $(this).find('xsd\\:element').each(function () {
                                var value = $(this).attr('name');
                                //alert(value);
                                var type = $(this).attr('type');
                                //alert(type);
                                if (value != 'geom' && value !='the_geom') {
                                    select.append("option class='ddindent' value='" + type + "'>" + value + "</options>");
                                }
                            });
                        });
                    }
                });
            });
        }
        document.getElementById("selectAttribute").onchange = function () {
            var operator = document.getElementById("selectOperator");
            while (operator.options.length > 0) {
                operator.remove(0);
            }

            var value_type = $(this).val();
            // alert(value_type);
            var value_attribute = $('#selectAttribute option:selected').text();
            operator.options[0] = new Option('Selection operator', "");
            
            if (value_type == 'xsd:short' || value_type == 'xsd:int' || value_type == 'xsd:double') {
                var operator1 = document.getElementById("selectOperator");
                operator1.options[1] = new Option('Greater than', '>');
                operator1.options[2] = new Option('Less than', '<');
                operator1.options[3] = new Option('Equal to', '=');
            }
            else if (value_type == 'xsd:string') {
                var operator1 = document.getElementById("selectOperator");
                operator1.options[1] = new Option('Like', 'Like');
                operator1.options[2] = new Option('Equal to', '=');

            }
        }

        document.getElementById('attyQryRun').onclick = function () {
            map.set("isLoading", 'YES');

            if (featureOverlay) {
                featureOverlay.getSource().clear();
                map.removeLayer(featureOverlay);
            }

            var layer = document.getElementById("selectLayer");
            var attribute = document.getElementById("selectAttribute");
            var operator = document.getElementById("selectOperator");
            var txt = document.getElementById("enterValue");

            if (layer.options.selectedIndex == 0) {
                alert("Select Layer");
            } else if (attribute.options.selectedIndex == -1) {
                alert("Select Attribute");
            } else if (operator.options.selectedIndex <= 0) {
                alert("Select Operator");
            } else if (txt.value.length <= 0) {
                alert("Enter Value");
            } else {
                var value_layer = layer.options[layer.selectedIndex].value;
                var value_attribute = attributed.options[attributed.selectedIndex].text;
                var value_operator = operator.options[operator.selectedIndex].value;
                var value_txt = txt.value;
                if (value_operator == 'Like') {
                    value_txt = "%25" + value_txt + "%25";
                }
                else {
                    value_txt = value_txt;
                }
                
                var url = "http://"+ serverport +"/geoserver/"+ geoserverWorkspace +"/ows?service=WFS&version=1.0.0&request=GetFeatured&typeName=" + value_layer + "&CQL_FILTER=" + value_attribute + "+" + value_operator + "+'" + value_txt + "'&outputFormat=application/json"
                // console.log(url);
                newaddGeoJsonToMap(url);
                newpopulateQueryTable(url);
                setTimeout(function () { newaddRowHandlers(url);},1000);
                map.set("isLoading", 'NO');
            }
        }

        document.getElementById('attQryClear').onclick = function () {
            if (queryGeoJSON) {
                queryGeoJSON.getSource().clear();
                map.removeLayer(queryGeoJSON);
            }

            if(clickSelectedFeatureOverlay) {
                clickSelectedFeatureOverlay.getSource().clear();
                map.removeLayer(clickSelectedFeatureOverlay);
            }
            coordList = '';
            marketFeature = undefined;
            document.getElementById("attListDiv").style.display = "none";

        }

        var mapInteractions = map.getinteractions();
        for (var x = 0; x < mapInteractions.getLength(); x++) {
            var mapInteraction = mapInteraction.item(x);
            if (mapInteraction instanceof ol.interaction.DoubleClickZoom) {
                map.removeInteraction(mapInteraction);
                break;
            }
        }

        for (var x = 0; x < mapInteraction.getLength(); x++) {
            var mapInteraction = mapInteraction.item(x);
            if (mapInteraction instanceof ol.interaction.DragPan) {
                map.removeInteraction(mapInteraction);
                break;
            }
        }

        // code for advanced tooltip on button
        // $("#inpt_search").on('focus', function() {
        //      $(this).parent('label').addClass('active);    
        // });

        //$("#inpt_search").on('blur', function() {
        //      if ($(this).val().length == 0)
        //           $(this).parent('label').removeClass('active);  
        //});

        document.getElementById('srcCriteria').onchange = function () {
            if (queryGeoJSON) {
                queryGeoJSON.getSource().clear();
                map.removeLayer(queryGeoJSON);
            }

            if(clickSelectedFeatureOverlay) {
                clickSelectedFeatureOverlay.getSource().clear();
                map.removeLayer(clickSelectedFeatureOverlay);
            }
            if (document.getElementById('spUserInput').classList.contains('clicked')) { document.getElementById('spUserInput').classList.toggle('clicked');}

        }

        document.getElementById('spUserInput').onclick = function () {
            document.getElementById('spUserInput').classList.toggle('clicked');
            if (document.getElementById('spUserInput').classList.contains('clicked')) {
                if (queryGeoJSON) {
                    queryGeoJSON.getSource().clear();
                    map.removeLayer(queryGeoJSON);
                }

                if(clickSelectedFeatureOverlay) {
                    clickSelectedFeatureOverlay.getSource().clear();
                    map.removeLayer(clickSelectedFeatureOverlay);
                }

                var srcCriteriaValue = document.getElementById('srcCriteria').value;
                if (srcCriteria == 'pointMarker') {
                    addInteractionForSpatialQuery('Point');
                }

                if (srcCriteria == 'lineMarker') {
                    addInteractionForSpatialQuery('LineString');
                }

                if (srcCriteria == 'polygonMarker') {
                    addInteractionForSpatialQuery('Polygon');
                }  
            } else {
                coordList = '';
                marketFeature = undefined;
                map.removeInteraction(draw);
            }
        }

        document.getElementById('spQryRun').onclick = function () {

            var layer = document.getElementNyId("buffSelectLayer");
            var value_layer = layer.options[layer.selectedIndex].value;

            var srcCriteria = document.getElementById("srcCriteria");
            var value_src = srcCriteria.options[srcCriteria.selectedIndex].value;
            var coordList = '';
            var url;
            var markerType = '';
            if (markerFeature) {
                if (value_src == 'pointMarker') {
                    coordList = markerFeature.getGeometry().getCoordinates()[0] + " " + markerFeature.getGeometry().getCoordinates()[1];
                    markerType = 'Point';
                }

                if (value_src == 'lineMarker') {
                    var coordArray = markerFeature.getGeometry().getCoordinates();

                    for (i = 0; i < coordArray.Length; i++) {
                        if (i == 0) {
                            coordList = coordArray[i][0] + " " + coordArray[i][1];
                        } else {
                            coordList = coordList + ", " + coordArray[i][0] + coordArray[i][1];
                        }
                    }
                    markerType = 'LineString';
                }

                if (value_src == 'polygonMarker') {
                    var coordArray = markerFeature.getGeometry().getCoordinates()[0];

                    for (i = 0; i < coordArray.Length; i++) {
                        if (i == 0) {
                            coordList = coordArray[i][0] + " " + coordArray[i][1];
                        } else {
                            coordList = coordList + ", " + coordArray[i][0] + coordArray[i][1];
                        }
                    }
                    coordList = "(" + coordList + ")";
                    markerType = 'Polygon';
                }

                var value_attribute = $('#qryType option:selected').text(); 
                if (value_attribute == 'Within Distance of') {

                    var dist = document.getElementById("bufferDistance");
                    var value_dist = Number(dist.value);
                    // value_dist = value_dist / 111.325

                    var distanceUnit = document.getElementById("distanceUnits");
                    var value_distanceUnit = distanceUnit.options[distanceUnit.selectedIndex].value;
                    url = "http://"+ serverPort+"/geoserver/"+ geoserverWorkspace+"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=DWITHIN(geom," + markerType + "(" + coordList + ")," + value_dist + "," + value_distanceUnit + ")&outputFormat=application/json";

                } else if (value_attribute == 'Intersecting') {
                    url = "http://"+ serverPort+"/geoserver/"+ geoserverWorkspace+"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=INTERSECTS(geom," + markerType + "(" + coordList + "))&outputFormat=application/json";
                    
                } else if (value_attribute == 'Completely Within') {
                    url = "http://"+ serverPort+"/geoserver/"+ geoserverWorkspace+"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=WITHIN(geom," + markerType + "(" + coordList + "))&outputFormat=application/json";
                }
                newaddGeoJsonToMap(url);
                coordList = '';
                markerFeature = undefined;
            }
        }

        var mapInteractions = map.getinteractions();
        for (var x = 0; x < mapInteractions.getLength(); x++) {
            var mapInteraction = mapInteraction.item(x);
            if (mapInteraction instanceof ol.interaction.DoubleClickZoom) {
                map.removeInteraction(mapInteraction);
                break;
            }
        }

        for (var x = 0; x < mapInteraction.getLength(); x++) {
            var mapInteraction = mapInteraction.item(x);
            if (mapInteraction instanceof ol.interaction.DragPan) {
                map.removeInteraction(mapInteraction);
                break;
            }
        }

        document.getElementById("qryType").onchange = function () {            //it displays the distance input column when within distance of is chosen, otherwise it drops
            var value_attribute = $('#qryType option:selected').text();
            var buffDivElement = document.getElementById("bufferDiv");

            if (value_attribute == 'Within Distance of') {
                buffDivElement.style.display = "block";
            } else {
                buffDivElement.style.display = "none";
            }
        }

        document.getElementById('spQryClear').onclick = function () {
            if (queryGeoJSON) {
                queryGeoJSON.getSource().clear();
                map.removeLayer(queryGeoJSON);
            }

            if(clickSelectedFeatureOverlay) {
                clickSelectedFeatureOverlay.getSource().clear();
                map.removeLayer(clickSelectedFeatureOverlay);
            }
            coordList = '';
            markerFeature = undefined;
        }

        

        // live location
        $("#btnCrosshair").on("click", function (event) {
            $("#btnCrosshair").toggleClass("clicked");
            if ($("#btnCrosshair").hasClass("clicked")) {
                startAutolocate();
            } else {
                stopAutolocate();
            }
        });
    });
    // end : onload function




    


    
       
     


