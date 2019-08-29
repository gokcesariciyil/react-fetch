import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";


const MapWithPlaces = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyASfOIfql100DNumC4BbiEM_c9rgvPuPWc&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: "100vh", width: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withStateHandlers(
    props => ({
      infoWindows: props.places.map(p => {
        return { isOpen: false };
      })
    }),
    {
      onToggleOpen: ({ infoWindows }) => selectedIndex => ({
        infoWindows: infoWindows.map((iw, i) => {
          iw.isOpen = selectedIndex === i;
          return iw;
        })
      }),
      getActiviy: () => ((placeId) => {
        console.log(JSON.stringify(placeId,null,2))
        alert(placeId);
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
    {props.places &&
      props.places.map((place, i) => {
        let lat = parseFloat(place.ActivityLat, 10);
        let lng = parseFloat(place.ActivityLng, 10);

        return (
          <Marker
            id={place.Id}
            key={place.Id}
            position={{ lat: lat, lng: lng }}
            place_id={place.GoogleMapsPlaceId}
            title="Click to zoom"
            onClick={props.onToggleOpen.bind(this, i)}
          >
            {props.infoWindows[i].isOpen && (
              <InfoWindow onCloseClick={props.onToggleOpen.bind(i)}>
                <div className="info-box">
                  <p>{place.ActivityName}</p>
                  <p>{place.Description}</p>
                  <p>{place.Province}</p>
                  <p>{place.City}</p>
                  <p>{place.District}</p>
                  <p>{place.SportName}</p>
                  <button id="join-btn" onClick={props.getActiviy.bind(this, place.Id)}>Etkinliğe katıl</button>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
  </GoogleMap>
));

export default MapWithPlaces;
