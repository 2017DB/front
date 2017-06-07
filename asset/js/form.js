$(function(){ 
    $.fn.haeruSlide = function(){
        var targetSec = $(this),
            targetUl = targetSec.find("ul"), 
            targetFirst = targetUl.find("li:first-child"), 
            targetList = targetSec.find("li"), 
            //thisWidth = targetSec.width(),
            thisWidth = targetList.width(),
            thisHeight = targetSec.height(), 
            listSize = targetList.length, 
            totalWidth = thisWidth*listSize,
            speed = 800;

        //Seting Button
        var buttonCode = "<button class='haeruPrev'>prev</button>"
                        + "<button class='haeruNext'>next</button>";
        targetSec.after(buttonCode);

        //Seting CSS
        targetSec.css({
            position: "relative",
            overflow : "hidden"
        });
        targetList.css({
            float: "left",
            width: thisWidth, 
            height: thisHeight 
        });
        targetUl.css({
            position: "absolute", 
            top: "0",
            left: "0",
            width: totalWidth
        });

        //current setting
        $(targetFirst).addClass("current");

        //slide(auto)
        timer = setInterval(function(){
            var ulPosition = $(targetUl).position().left,
                current = $(targetUl).find(".current"),
                curPosition = $(current).parent().position().left;
            if(!$(targetUl).is(":animated")){
                if(-ulPosition < totalWidth-thisWidth){
                    current.removeClass("current");
                    current.next().addClass("current");
                    $(targetUl).animate({
                        "left" : curPosition-thisWidth
                    }, speed);
                }else{
                    current.removeClass("current");
                    targetFirst.addClass("current");
                    $(targetUl).animate({
                        "left" : 0
                    }, speed);
                }
            }
        }, 4000);

        //slide(next/prev)
        $(targetSec).siblings("button").on("click", function(){
            var buttonId = $(this).attr("class"), 
                ulPosition = $(targetUl).position().left,
                current = $(this).siblings("div").find(".current"),
                curPosition = $(current).parent().position().left;

            if(!$(targetUl).is(":animated")){
                if(buttonId == "haeruPrev"){
                    if(ulPosition < 0){
                        current.removeClass("current");
                        current.prev().addClass("current");
                        $(targetUl).animate({
                            "left" : curPosition+thisWidth
                        }, speed);
                    }
                }else{
                    if(-ulPosition < totalWidth-thisWidth){
                        current.removeClass("current");
                        current.next().addClass("current");
                        $(targetUl).animate({
                            "left" : curPosition-thisWidth
                        }, speed);
                    }
                }
            }
        });
    }

    $("#mainVis div").haeruSlide();
    $("#banner div").haeruSlide();


    $(".tabMenu a").on("click", function(){
        $("#bestsel ol").hide();
        $("#bestsel ." + $(this).data("type")).show();
        $(".tabMenu li").removeClass("on");
        $(this).parent().addClass("on");
    });

    $(".tabMenu2 a").on("click", function(){
        $("#other ol").hide();
        $("#other .otherlist" + $(this).data("no")).show();
        $(".tabMenu2 li").removeClass("on");
        $(this).parent().addClass("on");
    });

});