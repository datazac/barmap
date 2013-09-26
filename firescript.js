$(document).ready(function() {
            var map = L.mapbox.map('map', 'datazac.map-jwn0wwdb');
            var json = null;
            //barpass data json 
            
            //get data from firebase
    
             var barListRef = new Firebase("https://bartest.firebaseio.com/");
             barListRef.on('child_added', function(snapshot) {
                  var barData = snapshot.val();
                    console.log(barData.latitude + " , " + barData.longitude);
                    createMarker(barData);
                }); 
    
                 function createMarker(properties) {
                    var marker = L.marker([properties.latitude,properties.longitude]).addTo(map);
                    marker.bindPopup(properties.name).openPopup();
                };
    
            //submit to firebase
    
            var newBarRef = barListRef.push();
            
            $("#submit").click(function(event) {
                    event.preventDefault();
                        
                        var name = $("#barname").val();
                        var lat =  $("#lat").val();
                        var lng =  $("#lng").val();
                    
            //push to new data to firebase
                
                    barListRef.push({name: name, latitude: lat, longitude: lng});  
            //create new marker   
                
                    createMarker({ name: name, latitude: lat, longitude: lng} );
            });
        });
