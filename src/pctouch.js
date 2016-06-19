
/**
 * 方法说明
 * @param type tk:点击事件 tup抬起事件 tdown按下事件
 * 
 */
(function(window){
    var mouseObj = {
        type:0//1 按下 0抬起 2移动
       ,timer:0//按下抬起的定时器
       ,times:0//按下抬起的时间间隔
       ,dposition:[]//按下坐标
       ,mposition:[]//移动坐标
       ,uposition:[]//抬起坐标
    };
    var targents = [] ;
    var moveaction = function(){} ;
    var evnetType = {
        'singleTap':function(obj,cb,that){
            events(obj,function(e){
                touchend(e) ;
                // if(Math.abs(mouseObj.dposition[0]-mouseObj.uposition[0])<30
                //    &&Math.abs(mouseObj.dposition[1]-mouseObj.uposition[1])<30 
                //    &&mouseObj.times<5){
                cb&&cb.apply(that,[e]);
                // }
            }) ;
         },
         'longTap':function(obj,cb,that){
            events(obj,function(e){
                touchend(e) ;
                if(Math.abs(mouseObj.dposition[0]-mouseObj.uposition[0])<30
                   &&Math.abs(mouseObj.dposition[1]-mouseObj.uposition[1])<30 
                   &&mouseObj.times>8){
                   cb&&cb.apply(that,[e]);
                }
            }) ;
         },
        'swipeLeft':function(obj,cb,that){
            events(obj,function(e){
                touchend(e) ;
                if(mouseObj.dposition[0]-mouseObj.uposition[0]>30
                   &&Math.abs(mouseObj.dposition[1]-mouseObj.uposition[1])<100 
                   &&mouseObj.times<10){
                   cb&&cb.apply(that,[e]);
                }
            }) ;
        },
        'swipeRight':function(obj,cb,that){
            events(obj,function(e){
                touchend(e) ;
                if(mouseObj.uposition[0] - mouseObj.dposition[0]>30
                   &&Math.abs(mouseObj.dposition[1]-mouseObj.uposition[1])<100 
                   &&mouseObj.times<10){
                    cb&&cb.apply(that,[e]);
                }
            }) ;
        },
        'swipeDown':function(obj,cb,that){
            events(obj,function(e){
                touchend(e) ;
                if(mouseObj.uposition[1] - mouseObj.dposition[1]>30
                   &&Math.abs(mouseObj.dposition[0]-mouseObj.uposition[0])<100 
                   &&mouseObj.times<10){
                    cb&&cb.apply(that,[e]);
                }
            }) ;
        },
        'swipeUp':function(obj,cb,that){
            events(obj,function(e){
                touchend(e) ;
                if(mouseObj.dposition[1] - mouseObj.uposition[1]>30
                   &&Math.abs(mouseObj.dposition[0]-mouseObj.uposition[0])<100 
                   &&mouseObj.times<10){
                    cb&&cb.apply(that,[e]);
                }
            }) ;
        }
    } ;
    
    //坐标计算
    function position(e){
        var p = [0,0];
        //兼容火狐和ie
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft ;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop ;
        p[0] = e.clientX + scrollLeft - document.documentElement.clientLeft ;
        p[1] = e.clientY + scrollTop - document.documentElement.clientTop ;
        if(p[0]>$(window).width()||p[1]>$(window).height())
        {
            return ;
        }
        return p ;
    } ;
    //跑定时器
    function timesgo(){
        mouseObj.times ++ ;
        mouseObj.timer = setTimeout(function(){
             timesgo() ;
        },100) ;
    } ;
    //按下
    function touchstart(e){
    	clearTimeout(mouseObj.timer) ;
        mouseObj.type = 1 ;
        mouseObj.times = 0 ;
        mouseObj.dposition = position(e) ;
        timesgo() ;
    } ;
    //移动
    function touchmove(e){
        if(mouseObj.type != 0){
            mouseObj.type == 2 ;
            mouseObj.mposition = position(e) ;
            moveaction&&moveaction.apply() ;
            if (document.all) {
             e.returnValue = false;
            } else {
             e.preventDefault();
            }
        }
    } ;

    function touchend(e){
        mouseObj.type = 0 ;
        clearTimeout(mouseObj.timer) ;
        mouseObj.uposition = position(e) ;
    } ;

    function events(obj,func){
        if (typeof document.addEventListener != "undefined") { 
            obj.addEventListener("mouseup",func,true) ;
        }else{
            obj.attachEvent("onmouseup",func) ;
        }
    } ;

    if (typeof document.addEventListener != "undefined") { 
        document.addEventListener('mousedown',touchstart,true);
        document.addEventListener('mousemove',touchmove,true);
    } else { 
        document.attachEvent("onmousedown",touchstart); 
        document.attachEvent("onmousemove",touchmove); 
    } 
    

    $.fn.pctouch = function(type,func){
        //pc端用封装的
        this.each(function(){
            var that = this ; 
            if(evnetType[type]){
                evnetType[type].apply(null,[that,func,that]) ;
            }else{
                $(that).on(type,func) ;
            }
        }) ;         
    };
})(window) ;
      

