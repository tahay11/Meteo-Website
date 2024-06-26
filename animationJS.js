       const xhr = new XMLHttpRequest();
       const xhrLocation = new XMLHttpRequest();

        navigator.geolocation.getCurrentPosition(success);

        function success(position){

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        
        xhrLocation.open('GET','http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true&key=AIzaSyDCycUFB-llj3j6hwZ6ksiBWnfN9RPN9HI')
        xhr.open('GET','https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+latitude+','+longitude+'?key=JPSXMU8MF63FHG4AKETVLBRJP');


        xhrLocation.onload = function(){
            const data2 = JSON.parse(xhrLocation.response);
            console.log(data2);
        }
        

        xhr.onloadstart = function (){
            document.getElementById("section1").innerHTML = "chargement...";
            document.getElementById("section2").innerHTML = "chargement...";
        };

     


        xhr.onload = function(){
        const data = JSON.parse(xhr.response);
            console.log(data);

            
            const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon","Tue","Wed","Thu","Fri"];
            const d = new Date();
            let day = weekday[d.getDay()];

            const date = data.currentConditions.datetime.substr(0,5);
            const Temp = data.days[0].temp;
            const Max = data.days[0].tempmax;
            const Min = data.days[0].tempmin;
            const Feelslike = data.days[0].feelslike;
            const Humidity = data.days[0].humidity;
            const Sunrise = data.days[0].sunrise.substr(0,5);
            const Sunset = data.days[0].sunset.substr(0,5);

            var weather = "cloud";

            if (data.days[0].conditions == "Clear"){
                weather = "sun" ;
            }
            //alert(weather);

            document.getElementById("temp").innerHTML = Temp+"°";
            document.getElementById("feels").innerHTML = Max+"° /"+Min+"° feels like "+Feelslike+" <br> "+day+", "+date;
            document.getElementById("sunrise-time").innerHTML = Sunrise;
            document.getElementById("sunset-time").innerHTML = Sunset;
            document.getElementById("Weather").innerHTML = "<i id='"+weather+"' class='fa-solid fa-"+weather+" Bigsun '></i>";

            /* section 1 data */

            var content = "";
            
            for(let i=0; i<24; i++){

                if(data.days[0].hours[i].conditions == "Clear"){
                    weather = "sun" ;
                }
                else if (data.days[0].hours[i].conditions == "overcast"){
                    weather = "cloud" ;
                }
                else if(data.days[0].hours[i].conditions == "Partially cloudy"){
                    weather = "cloud-sun" ;
                }
                else if(data.days[0].hours[i].conditions == ""){
                    weather = "cloud-rain" ;
                }

                content +="<div id='div1'><p >"+data.days[0].hours[i].datetime.substr(0,5)+"</p>";
                content +="<i id='"+weather+"' class='fa-solid fa-"+weather+"'></i>";
                content +="<p id='temp2'>"+data.days[0].hours[i].temp+"°</p><div>";
                content +="<i class='fa-solid fa-droplet drop'></i>";
                content +="<span>"+Math.floor(data.days[0].hours[i].humidity)+"%</span></div></div>";
            }
            //alert(content);
            
            document.getElementById("section1").innerHTML = content;

            /* section 2 data */

            var content2 = "";
            
            for(let i=0; i<7; i++){

                let day = weekday[d.getDay()+i];

                if(data.days[i].conditions == "Clear"){
                    var weather = "sun" ;
                }
                else if (data.days[i].conditions == "overcast"){
                    var weather = "cloud" ;
                }
                else if(data.days[i].conditions == "Partially cloudy"){
                    var weather = "cloud-sun" ;
                }
                else if(data.days[i].conditions == ""){
                    var weather = "cloud-rain" ;
                }

                content2 +="<div id='div2'><p>"+day+"</p><div>";
                content2 +="<i class='fa-solid fa-droplet'></i>";
                content2 +="<span>"+Math.floor(data.days[i].humidity)+"%</span></div>";
                content2 +="<i id='"+weather+"' class='fa-solid fa-"+weather+"'></i>";
                content2 +="<i class='fa-solid fa-moon'></i>";
                content2 +="<p>"+Math.floor(data.days[i].tempmax)+"°</p><p>"+Math.floor(data.days[i].tempmin)+"°</p></div>";

            }

            //alert(content2);
            document.getElementById("section2").innerHTML = content2;
            
        }

        xhr.send();

    }
    