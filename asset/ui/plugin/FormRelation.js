/*! 2015 Baidu Inc. All Rights Reserved */
define("ui/plugin/FormRelation",["require","jquery","../lib","./Plugin"],function(require){var t=require("jquery"),e=require("../lib"),n=require("./Plugin"),i=n.extend({$class:"FormRelation",options:{relations:[]},initialize:function(e){this.$parent(e),this._onFieldChange=t.proxy(this._onFieldChange,this)},activate:function(e){this.control=e,e.once("afterrender",t.proxy(this.bind,this))},inactivate:function(){this.control.off("fieldchange",this._onFieldChange)},bind:function(){var t=this,n=t.control;e.each(n.getInputControls(),function(e){t.check(e)}),n.on("fieldchange",t._onFieldChange)},_onFieldChange:function(t){this.check(t.target)},check:function(t){var e=this.relations;if(e&&e.length){var n=(t.getValue(),this.findReliers(t));if(n.length)for(var i=n.length-1;i>=0;i--){var r=n[i],a=this.getRelationState(r),o=[].concat(r.targets),s=[].concat(r.actions);this.execute(o,s,a)}}},findReliers:function(t){for(var e=this.relations,n=[],i=e.length-1;i>=0;i--)for(var r=e[i],a=0,o=r.dependences.length;o>a;a++)if(dependence=r.dependences[a],dependence.id===t.id){n.push(r);break}return n},getRelationState:function(e){var n=this,i=e.dependences,r=t.map(i,function(t){return n.getLogicState(t)});return this.getPatternState(e,r)},getLogicState:function(t){var n=(this.control,t.childName||t.id),i=this.getField(n);if(!i)throw new Error({id:101,message:"lost field control["+n+"]"});var a=t.logic;return a=e.isFunction(a)?a:r[a],a?a.call(i,t):!1},getField:function(t){for(var e=this.control.getInputControls(),n=e.length-1;n>=0;n--){var i=e[n],r=i.childName||i.id;if(r===t)return i}return null},getPatternState:function(t,n){var i=t.pattern||a.all;return i=e.isFunction(i)?i:a[i],i?i(n):!1},execute:function(t,n,i){var r=this.control;e.each(t,function(t){if(t=r.context.get(t))e.each(n,function(n){n=e.isFunction(n)?n:o[n],n&&n.call(t,i)})})},dispose:function(){this.control=null,this.$parent()}}),r={equal:function(t){return this.getValue()==t.value}},a={all:function(t){for(var e=t.length-1;e>=0;e--)if(!t[e])return!1;return!0},any:function(t){for(var e=t.length-1;e>=0;e--)if(t[e])return!0;return!1}},o={show:function(t){t?this.show():this.hide()},hide:function(t){t?this.hide():this.show()},disable:function(t){t?this.disable():this.enable()},enable:function(t){t?this.enable():this.disable()}};return i.patterns=a,i.logics=r,i.actions=o,i});