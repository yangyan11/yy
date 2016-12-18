window.onload=function(){
    function resize(originSize,type){
        var type=type||"x";
        var widths=document.documentElement.clientWidth;
        var heights=document.documentElement.clientHeight;
        if(type=="x"){
            var scale=widths/originSize*100;
        }else if(type=="y"){
            var scale=heights/originSize*100;
        }
        document.getElementsByTagName("html")[0].style.fontSize=scale+"px";

    }
    resize(1334,"y");
};