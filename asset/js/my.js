$(function(){
    function sliceSize(dataNum, dataTotal) {
        return (dataNum / dataTotal) * 360;
    }
    function addSlice(sliceSize, pieElement, offset, sliceID, color) {
        $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
        var offset = offset - 1;
        var sizeRotation = -179 + sliceSize;
        $("."+sliceID).css({
        "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
        });
        $("."+sliceID+" span").css({
        "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
        "background-color": color
        });
    }
    function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
        var sliceID = "s"+dataCount+"-"+sliceCount;
        var maxSize = 179;
        if(sliceSize<=maxSize) {
        addSlice(sliceSize, pieElement, offset, sliceID, color);
        } else {
        addSlice(maxSize, pieElement, offset, sliceID, color);
        iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
        }
    }
    function createPie(dataElement, pieElement) {
        var listData = [];
        $(dataElement+" span").each(function() {
        listData.push(Number($(this).html()));
        });
        var listTotal = 0;
        for(var i=0; i<listData.length; i++) {
        listTotal += listData[i];
        }
        var offset = 0;
        var color = [
        "yellowgreen",
        "darkorange", 
        "gray", 
        "turquoise",
        "crimson",
        "purple", 
        "olivedrab", 
        "orange", 
        "forestgreen", 
        "navy", 
        ];
        for(var i=0; i<listData.length; i++) {
        var size = sliceSize(listData[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color[i]);
        offset += size;
        }
    }
    createPie(".pieID.legend", ".pieID.pie");


    $("#bestArea .tabMenu a").on("click", function(){
        $("#bestArea .tabMenu li").removeClass("on");
        $(this).parent("li").addClass("on");
        if($(this).data("no") == 1){
            $("#bestArea strong").text("현미밥");
            $("#bestArea span").css("background", 'url("../img/bob.jpg") center center no-repeat');
        }else{
            $("#bestArea strong").text("제육볶음");
            $("#bestArea span").css("background", 'url("../img/gogi.jpg") center center no-repeat');
        }
    });

    $("#todayMenu .tabMenu a").on("click", function(){
        $("#todayMenu .tabMenu li").removeClass("on");
        $(this).parent("li").addClass("on");
        if($(this).data("no") == 1){
            $("#todayMenu div").html("<p>잡곡밥</p><p>미역국</p><p>제육볶음</p><p>요구르트</p>");
        }else if($(this).data("no") == 2){
            $("#todayMenu div").html("<p>현미밥</p><p>김치찌개</p><p>제육덮밥</p><p>메론</p>");
        }else{
            $("#todayMenu div").html("<p>초밥</p><p>된장국</p><p>오징어무침</p><p>바나나</p>");
        }
    });
});