(()=>{"use strict";var t=function(){function t(t,n){this.width=t,this.height=n,this.canvas=document.createElement("canvas"),this.canvas.width=t,this.canvas.height=n,this.ctx=this.canvas.getContext("2d")}return t.prototype.attachTo=function(t){t.appendChild(this.canvas)},t.prototype.getContext=function(){return this.ctx},t.prototype.getDimensions=function(){return{width:this.width,height:this.height}},t}(),n=function(){function t(){this.components=new Map}return t.prototype.addComponent=function(t){return this.components.set(t.name,t),this},t.prototype.getComponent=function(t){return this.components.get(t)},t}(),e="position",o=function(t,n){this.name=e,this.x=t,this.y=n},i="positionChainChange",a=function(){function t(t,n,e){if(this.startPosition=t,this.endPosition=n,this.totalFrames=e,this.framesElapsed=0,e<=0)throw"Invalid frame duration "+e;this.dx=n.x-t.x,this.dy=n.y-t.y}return t.prototype.setNext=function(t){this.next=t},t.prototype.reset=function(){this.framesElapsed=0},t}(),s="shape",r=function(){function t(t,n){this.name=s,this.radius=t,this.color=n}return t.prototype.draw=function(n){n.beginPath(),n.arc(0,0,this.radius,0,t.TAU),n.fillStyle=this.color,n.fill(),n.stroke()},t.prototype.scale=function(t){this.radius=this.radius*t},t.TAU=2*Math.PI,t}(),h=function(){function t(t,n,e){this.name=s,this.width=t,this.height=n,this.color=e}return t.prototype.scale=function(t){this.height=this.height*t,this.width=this.width*t},t.prototype.draw=function(t){t.fillStyle=this.color,t.fillRect(0,0,this.width,this.height)},t}(),c=function(){function t(){}return t.prototype.process=function(t){for(var n=0,o=t;n<o.length;n++){var a=o[n],s=a.getComponent(e),r=a.getComponent(i);if(s&&r){var h=r,c=s,f=h.getCurrent();if(f.framesElapsed>=f.totalFrames){h.setNextTransformation();continue}this.linearTransform(c,f)}}},t.prototype.linearTransform=function(t,n){var e=n.dx/n.totalFrames,o=n.dy/n.totalFrames;t.x=n.startPosition.x+n.framesElapsed*e,t.y=n.startPosition.y+n.framesElapsed*o,n.framesElapsed++},t}(),f="scale",p=function(){function t(t,n){this.ctx=t,this.canvasDimensions=n}return t.prototype.process=function(t){this.ctx.clearRect(0,0,this.canvasDimensions.width,this.canvasDimensions.height);for(var n=0,o=t;n<o.length;n++){var i=o[n],a=i.getComponent(e),r=i.getComponent(s);if(i.getComponent(f),a&&r&&"draw"in(c=r)&&"function"==typeof c.draw){var h=a;this.ctx.save(),this.ctx.translate(h.x,h.y),r.draw(this.ctx),this.ctx.restore()}}var c},t}(),d=function(){function t(t){this.name=t,this.chainedTransformations=[]}return t.prototype.addTransformation=function(t){return this.current||(this.current=t),this.chainedTransformations.push(t),this},t.prototype.getCurrent=function(){return this.current},t.prototype.setNextTransformation=function(){return!this.current.next||(this.current=this.current.next,this.current.reset(),!1)},t.prototype.setCyclicalChange=function(){},t.prototype.chainChange=function(t,n){if(t<0||t>=this.chainedTransformations.length||n<0||n>=this.chainedTransformations.length||n===t)throw"Invalid chain from: ".concat(t," too: ").concat(n," ").concat(this.chainedTransformations.length);return this.chainedTransformations[t].next=this.chainedTransformations[n],this},t}(),u="scaleChainChange",m=function(){function t(t,n,e){this.startPercentage=t,this.endPercentage=n,this.totalFrames=e,this.framesElapsed=0}return t.prototype.reset=function(){this.framesElapsed=0},t}(),l=function(){function t(){}return t.prototype.process=function(t){for(var n=0,o=t;n<o.length;n++){var i=o[n],a=i.getComponent(e),r=i.getComponent(s),h=i.getComponent(f),c=i.getComponent(u);if(a&&r&&h&&"scale"in(l=r)&&"function"==typeof l.scale&&c){var p=c,d=h,m=p.getCurrent();if(m.framesElapsed>=m.totalFrames){p.setNextTransformation();continue}this.linearTransform(d,m)}}var l},t.prototype.linearTransform=function(t,n){var e=(n.startPercentage-n.endPercentage)/n.totalFrames,o=n.startPercentage+n.framesElapsed*e;t.scale=o,n.framesElapsed++},t}(),g=new t(420,420),y=g.getContext();g.attachTo(document.getElementsByTagName("body")[0]);var C=new p(y,g.getDimensions()),w=new c,x=new l,T=[],v=(new n).addComponent(new r(10,"rgb(0, 0, 0)")).addComponent(new o(100,100)).addComponent(new d(i).addTransformation(new a({x:100,y:100},{x:200,y:300},60)).addTransformation(new a({x:200,y:300},{x:100,y:100},60)).chainChange(0,1).chainChange(1,0)).addComponent(new d(u).addTransformation(new m(100,150,60)).addTransformation(new m(150,75,120)).addTransformation(new m(75,100,60)).chainChange(0,1).chainChange(1,2).chainChange(2,0)).addComponent(new function(t){this.name=f,this.scale=t}(100)),E=(new n).addComponent(new h(20,20,"rgb(122, 255, 0)")).addComponent(new o(100,100)).addComponent(new d(i).addTransformation(new a({x:100,y:100},{x:200,y:100},60)).addTransformation(new a({x:200,y:100},{x:200,y:200},60)).addTransformation(new a({x:200,y:200},{x:100,y:200},60)).addTransformation(new a({x:100,y:200},{x:100,y:100},60)).chainChange(0,1).chainChange(1,2).chainChange(2,3).chainChange(3,0));T.push(v),T.push(E);var P=function(){w.process(T),C.process(T),x.process(T),requestAnimationFrame(P)};P()})();