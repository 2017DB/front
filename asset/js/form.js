$(document).ready(function() 
    {
        //스크롤막기
        scrollEvent = {
            init: function() {
                this.func();
            },
            func: function() {
                if( $("body").css('overflow') == 'hidden' ){
                    $("body").css({overflow:'auto'});
                }else{
                    $("body").css({overflow:'hidden'});
                }
            }
        }

        $("#ReadingInfoSelectBtn").click(function()
        {
            var formData = $("#ReadingInfoSelectForm").serialize();
 
            $.ajax({
                        type : "POST",
                        url : "localhost:3000/join",
                        cache : false,
                        data : formData,
                        success : onSuccess,
                        error : onError
            });
        });
    });
    function onSuccess(json, status){alert($.trim(json));}
    function onError(data, status){alert("error");}