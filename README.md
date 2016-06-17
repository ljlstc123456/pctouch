
pctouch 为 Web网页 特别设计的鼠标手势事件监听器


## 概述

通常我们用到最多的是移动端手势，网上也有诸多三方组件，但是往往对web端没有对相应的鼠标模拟手势的兼容。pctouch就是这么一个鼠标模拟手势小插件，包含`singleTap`、`longTap`、`swipeLeft`、 `swipeRight`、 `swipeUp`、`swipeDown`等常用的手势事件。

### 使用
```html

```
```javascript
// app.js

$("#test").pctouch("swipeRight",function(){
    alert("你是往右滑的吧") ;
}) ;
$("#test").pctouch("swipeLeft",function(){
    alert("你是往左滑的吧") ;
}) ;
$("#test").pctouch("swipeUp",function(){
    alert("你是往上滑的吧") ;
}) ;
$("#test").pctouch("swipeDown",function(){
    alert("你是往下滑的吧") ;
}) ;
```
## License
The MIT License(http://opensource.org/licenses/MIT)

请自由地享受和参与开源
