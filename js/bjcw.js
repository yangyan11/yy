$(function(){

/***************网站导航******************/

$(".web").on("click",function(e){
   
   if($(".webbox").is(":hidden")){
   	$(".webbox").show();
   }else{
   	$(".webbox").hide();
   }
   $(document).one("click",function(){
   	$(".webbox").hide();
   })
   if(e.stopPropagation){
   	e.stopPropagation();
   }else{
   	e.cancelBubble=true;
   }
})

/****************图片移动****************/
$(".row_p").hide();
$(".row").mouseover(function(){
	$(".row_p").fadeIn(1000);
})

/****************楼层跳转****************/
$(".goup").hide();
$(window).on("scroll",function(){
	var tops=$(window).scrollTop();
	if(tops>=100){
		$(".goup").fadeIn(600);
	}else{
		$(".goup").fadeOut(600);
	}
	$(".goup").click(function(){
	    var newObj={st:tops};
	    $(newObj).animate({st:0},{
	        duration:600,
	        step:function(){
	        	$(window).scrollTop(newObj.st)
	        }
	    })
	})
})

/*侧面定位栏*/

$(".weibo").mouseover(function(){
	$(".weibo1").show();
})
$(".weibo").mouseout(function(){
	$(".weibo1").hide();
})
$(".weixin").mouseover(function(){
	$(".weixin1").show();
})
$(".weixin").mouseout(function(){
	$(".weixin1").hide();
})

// 返回顶部
var ssd=$(".back")[0];
document.documentElement.scrollTop=1;
    var obj=document.documentElement.scrollTop?document.documentElement:document.body;
window.onscroll=function(){
	if(obj.scrollTop>5){
      ssd.style.display="block";
  
	}else{
		ssd.style.display="none";
	}
}

    ssd.onclick=function(){
	animate(obj,{scrollTop:0},1000);
}




})