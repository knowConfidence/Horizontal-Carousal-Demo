$(document).ready(function(){

    var cardCount = 0;
    loadJSON(function(response){
        var actual_json = JSON.parse(response);

        var count = actual_json.length;
        cardCount = count;
        for(i = 0; i < count; i++){

            $(".cards").append(getCard(actual_json[i].mainImg, 
                                       actual_json[i].cardName,
                                       actual_json[i].source,
                                       actual_json[i].author,
                                       actual_json[i].category,
                                       actual_json[i].pins,
                                       actual_json[i].likes));
        }

        resizeCard($(window).width());
        centerElement(getCenter(count));
    });

    var width = $(window).width();

    $(window).resize(function(){
        resizeCard($(window).width());
        centerElement(getCenter(cardCount));
    });

    window.running = false;
    $(".back").click(function(){
        moveCard(-1);
        running = true;
    });

    $(".forward").click(function(){
        moveCard(1);
        running = true;
    });

});

function resizeCard(width){
    
    if(width < 450){
        $(".card").css("width", "175");
    }
    else if(width < 800){
        $(".card").css("width", "150");
    }
    else{
        $(".card").css("width", "200");   
    }
}

function getCenter(count){

    var center = $(window).width() / 2;

    return center;
}

function centerElement(center){
    var elCenter = $(".cards").find(".card").eq(0).width() / 2;
    $(".cards").css({left : center - elCenter-10});
}

function moveCard(direction){
    if(running == true){return;}

    var width = $(".cards").find(".card").eq(0).outerWidth();

    if(direction == -1){
        var amount = $(".cards").position().left + width-10;
    }
    else{
        var amount = $(".cards").position().left - width-10;    
    }
    
    $(".cards").animate({left: amount}, 500, function(){
        running = false;
    });
}

function getCard(card_image, card_name, card_source, card_author, card_category, card_pins, card_likes){

    var card = '<div class="card">' +

                '<div class="frame card_image">' +
                    '<img class="img-responsive" src="'+ card_image +'" width="100%"' +
                '</div>' +

                '<div class="col-xs-12 clamp card_info">' +

                    '<div class="col-xs-12 frame">' +
                        '<div class="text card_name">' +
                            card_name +
                        '</div>' +

                        '<div class="text card_source">' +
                            card_source +
                        '</div>' +
                    '</div>' +

                    '<div class="col-xs-12 frame card_artist">' +
                        '<div class="f_left">' +
                            '<img class="card_profile_image" src="https://via.placeholder.com/50x50" width="20px" height="20px">' +
                        '</div>' +

                        '<div class="text f_left card_author">' +
                            '<div>'+ card_author +'</div>' +
                            '<div>'+ card_category +'</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="col-xs-12 frame text card_stats">' +
                        '<div class="f_left pins">'+ card_pins +'</div>' +
                        '<div class="f_right likes ">'+ card_likes +'</div>' +
                    '</div>' +

                '</div>' +
            
               '</div>';

    return card;
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }