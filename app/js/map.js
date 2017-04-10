var map;
function initMap() {
  map = new google.maps.Map(document.querySelector('.results__map'), {
    zoom: 12,
    center: {lat: 41.362986, lng: 2.394356},
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'all', stylers: [{saturation: -100}]
      },
      {
        stylers: [{saturation: -65}, {gamma: 1.52}]
      },
      {
        featureType: "administrative", stylers: [{saturation: -95}, {gamma: 2.26}]
      },
      {
        featureType: "water", elementType: "labels", stylers: [{visibility: "off"}]
      },
      {
        featureType: "administrative.locality", stylers: [{visibility: "off"}]
      },
      {
        featureType: "road", stylers: [{visibility: "simplified"}, {saturation: -99}, {gamma: 2.22}]
      },
      {
        featureType: "poi", elementType: "labels", stylers: [{visibility: "off"}]
      },
      {
        featureType: "road.arterial", stylers: [{visibility: "off"}]
      },
      {
        featureType: "road.local", elementType: "labels", stylers: [{visibility: "off"}]
      },
      {
        featureType: "transit", stylers: [{visibility: "off"}]
      },
      {
        featureType: "road", elementType: "labels", stylers: [{visibility: "off"}]
      },
      {
        featureType: "poi", stylers: [{saturation: -55}]
      }
    ]
  });
};

$(function() {
  var counterOffers = 0;
  var $counterEl = $('.results__meta-counter').find('span')

  // parse json
  $.ajax({url: './js/data.json', type: 'GET', dataType: 'json'})
    .done(function(response) {
      var markers = [];
      $.each(response.apartments, function(i, el) {
        var latLng = new google.maps.LatLng(el.coords.lat, el.coords.lng);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: el.name,
          icon: {
            // path
            url: './img/icon-pin.png',
            labelOrigin: {x: 20, y: 20}
          },
          label: {
            text: '\u20AC' + el.price + '',
            fontFamily: '"Open Sans", sans-serif',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '400'
          }
        });
        markers.push(marker)
        counterOffers++;
      });

      // set clusters
      var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: './img/m',
        styles: [{
          textColor: '#fff',
          // path
          url: './img/m1.png',
          height: 50,
          width: 50
        }]
      });

      // set map center
      var bounds = markers.reduce(function(bounds, marker) {
        return bounds.extend(marker.getPosition());
      }, new google.maps.LatLngBounds());

      map.setCenter(bounds.getCenter());
      // map.fitBounds(bounds); // fit markers
    })

    .fail(function() {console.log("error")})

    .always(function() {
      $counterEl.text(counterOffers);
    });

});
