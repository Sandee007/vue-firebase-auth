<template>
  <div class="map" >
    <div class="google-map" id="map"></div>
    <!-- <div id='map-leaflet' class='map'> </div> --> 
    <!-- <div id="mapid"></div> -->
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'GMap',
  data(){
    return{
      lat:6.927079,
      lng: 79.861244
    }
  },
  // props:['username'],
  methods:{
    renderMap(){
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.lat , lng: this.lng},
        zoom : 7,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: true
      })
      // mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGVlMDA3IiwiYSI6ImNrYnY0NGk5ejAyaGQydWxkazlvYXc1ZWwifQ.Xyo-WX-k0cL0kWK1XPZz3A';
      // var map = new mapboxgl.Map({
      //   container: 'map',
      //   style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      //   center: [this.lng, this.lat], // starting position [lng, lat]
      //   zoom: 6 // starting zoom
      // })

      db.collection('users').get()
      .then(users => {
        users.docs.forEach(doc =>{
          let data = doc.data()

          if(data.geolocation){
            let marker = new google.maps.Marker({
              position:{
                lat: data.geolocation.lat,
                lng: data.geolocation.lng,
              },
              map
            })
          // var el = document.createElement('div');
          // el.className = 'marker';

            // make a marker for each feature and add to the map
          // let icon = new mapboxgl.Marker()
          //     .setLngLat([data.geolocation.lng, data.geolocation.lat])
          //     .addTo(map);

          marker.addListener("click", () =>{
            // console.log(doc.id)
            this.$router.push( {name:'ViewProfile', params: {id:doc.id }})
          })

          }
        })
      })
    }
  },
  mounted(){
    // get current user
    let user = firebase.auth().currentUser

    // get user geolocation
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude

        // find user record and update geolocation
        db.collection('users').where('user_id', '==', user.uid).get()
        .then( snapshot => {
          snapshot.forEach( doc => {
            db.collection('users').doc(doc.id).update( {
              geolocation: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              }
            })
          })
        })
        .then( () =>{
          this.renderMap()
        })
      },(err) => {
        console.log(err)
        this.renderMap()
      }, {maximumAge: 60000, timeout: 3000})
    }else{
      // position center by default values
      this.renderMap()
    }
    //  console.log(firebase.auth().currentUser.uid);
    //  setTimeout(()=>{
    //    console.log(firebase.auth().currentUser)
    //  },2000)
  }
}
</script>

<style>
.google-map{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
/* #mapid{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
} */
.marker {
  background-image: url('mapbox-icon.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

</style>