// 1.解决类名的兼容问题

// 1.判断浏览器
// 2.ff：现有的方法
// 3.IE：
//    1) 获取所有标签
//    2) 遍历、判断
//       标签.className==classname
//    3) 条件满足，保留标签
//    4) 返回新数组


function getClass(classname,father){
    father= father || document;       //判断浏览器
    if(father.getElementsByClassName){   //如果条件为真，则返回获取的的classname
       return father.getElementsByClassName(classname);
    }else{
       var all=father.getElementsByTagName("*")//获取document的所有标签,这里是指定的父类
       var newarr=[];      //定义新数组，用来接受标签
       for (var i = 0; i < all.length; i++) {  //遍历获取的标签
       	  if(checkRep(classname,all[i].className)){  //判断获取的标签名和获取到的标签名是否相等
       	  	newarr.push(all[i]); 	//将相同的标签名取出来放到新数组
       	  }
       }
       return newarr;//把得到的新数组返回
    }
}

function checkRep(val,string){
    var arr=string.split(" ");//将字符串转换为数组
    for(var i in arr){
    	if(arr[i]==val){
    		return true;
    	}
    }return false;
}


/*************2016/8/30**************/
// 获取样式的值的兼容问题
function getStyle (obj,raar) {
  if(obj.currentStyle){
    return obj.currentStyle[raar];
  }else{
    return getComputedStyle(obj,null)[raar]
  }
}


/**********2016/8/31**************/
//获取元素的兼容函数（可以支持标签、id、class）
// "div"  "#div"  ".div"
function $(selector,father){
  father=father||document;
  //判断字符串
  if(typeof selector=="string"){   //判断selector的类型
    selector=selector.replace(/^\s*|\s*$/g,"");  //解决前后空格的问题（正则判断）
    if(selector.charAt(0)=="."){  //id
      return getClass(selector.substring(1),father);
    }else if(selector.charAt(0)=="#"){  //class
      return document.getElementById(selector.substring(1));      
    }else if(/^[a-z][1-6a-z]*/g.test(selector)){  //标签 （正则表达式判断）
      return father.getElementsByTagName(selector);
    }
  }else if(typeof selector=="function"){    //window.onload=function(){}
    window.onload=function(){
      selector();
    }
  }
}

/***********2016年9月2日 **********/
//获取所有子节点的兼容问题
//father:指父节点
//type:"a"只有元素节点
//type:"b"只有元素节点+文本节点
function getChild(father,type){
    type=type||"a";
    var all=father.childNodes;
    var newarr=[];
    for (var i = 0; i < all.length; i++) {
        if (type=="a") {
            if(all[i].nodeType==1){
            newarr.push(all[i]); 
            }           
        }else if(type=="b"){
            if(all[i].nodeType==1||(all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
                newarr.push(all[i])
            }          
        }
    }
    return newarr;
}
//获取第一个子元素
function getFirst(father){
    return getChild(father)[0];
}
//获取最后一个子元素
function getLast(father){
    return getChild(father)[getChild(father).length-1]
}
//获取指定元素
function getXiabiao(father,num){
    return getChild(father)[num]
}
//获取下一个兄弟元素
function getNext(obj){
    var next=obj.nextSibling;
    if(!next){
        return false;
    }
    while(next.nodeType==3||next.nodeType==8){
        next=next.nextSibling;
        if(!next){
        return false;
        }
    }
    return next;
}

/***********2016年9月6日 **********/
//事件的绑定的兼容函数
function addEvent(obj,event,fun){
  obj[fun]=function(){
    fun.call(obj);
  }
  if(obj.attachEvent){
    obj.attachEvent("on"+event,obj[fun]);
  }else{
    obj.addEventListener(event,obj[fun],false)
  }
}

//移除事件的兼容函数
function removeEvent(obj,event,fun){
  obj[fun]=function(){
    fun.call(obj);
  }
  if(obj.detachEvent){
    obj.detachEvent("on"+event,obj[fun]);
  }else{
    obj.removeEventListener(event,obj[fun],false)
  }
}


/***********2016年9月7日 **********/
//鼠标滚轮事件
function mouseWheel(obj,up,down){//obj事件源，up向上函数，down向下函数
  if(obj.attachEvent){
    obj.attachEvent("onmousewheel",scrollFn);//IE  opera
  }else if(obj.addEventListener){
    obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari -webkit
    obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
  }
  function scrollFn(e){
  e=e||window.event;
  var f=e.detail||e.wheelDelta;
  if(f==-3 || f==120){
    if(up){
      up();
    }
  }else if(f==3 || f==-120){
    if(down){
      down();
    }
  }
  //ff：-3：向上  3:向上
  // alert(e.detail);
  //IE: 120：向上  -120：向下
  // alert(e.wheelDelta);
}
}




/***********2016年9月8日 *************/
//hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }


 // 阻止浏览器默认行为

function clear(obj){
    if(obj.preventDefault){
        //w3c阻止浏览器的默认行为

        obj.preventDefault()
    }else{
        //ie阻止浏览器的默认行为
        obj.returnValue = false;
    }
}



