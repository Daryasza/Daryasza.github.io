(function() {
  
let map;

function init() {

  var map = new ymaps.Map("map", {

    center: [55.74882631, 37.59754130],
    zoom: 14,
    controls: []
  });

  var coords = [
    [55.75065397, 37.60518435],
    [55.76103528, 37.57886920],
    [55.75534929, 37.61857394],
    [55.74416673, 37.58072261]
  ];

  var myCollection = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/map/marker.svg',
    iconImageSize: [43, 55],
    iconImageOffset: [-35, -52],
    draggable: false,
    autoFitToViewport: 'always'
  });

  for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }
  map.geoObjects.add(myCollection);
  if (myCollection.getLength() == 1) {
    map.setCenter(
      myCollection.get(0).geometry.getCoordinates()
    )
  } else if (myCollection.getLength() > 1) {
    map.setBounds(myCollection.getBounds());
  }

  map.behaviors.disable('scrollZoom');

  if (new MobileDetect(window.navigator.userAgent).mobile()) {
    map.behaviors.disable('drag');
  }
    
};

ymaps.ready(init);

})();
