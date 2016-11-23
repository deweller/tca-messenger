webpackJsonp([2,0],{0:function(e,s,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var a=t(79),o=n(a),r=t(74),i=n(r),u=t(78),l=n(u);o.default.use(l.default),new o.default({el:"#app",template:"<App/>",data:function(){return{messages:[]}},components:{App:i.default}})},32:function(e,s,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,s){return new r.default(function(t){l=new u.default({subscribeKey:s}),l.addListener({status:function(e){"PNConnectedCategory"===e.category&&(console.log("PNConnectedCategory heard",e),t())},message:function(e){console.log("received new messageNotification",e),console.log("received new messageNotification.message",e.message);for(var s=0;s<c.length;s++)c[s].call(this,e.message)}}),l.subscribe({channels:["control",e]})})}Object.defineProperty(s,"__esModule",{value:!0});var o=t(37),r=n(o),i=t(73),u=n(i),l=void 0,c=[],d=null;s.default={init:function(e,s){return d=e,a(e,s)},close:function(){l.unsubscribe({channels:["control",d]}),l=null,c=[],d=null},onMessage:function(e){c.push(e)},publish:function(e,s){if(null==l)return void console.error("init pubnub first");var t={channel:e,message:s};l.publish(t,function(e,s){e.error&&console.error(e.error)})}}},33:function(e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={parse:function(e){for(var s={},t=e.substr(1).split("&"),n=0;n<t.length;n++){var a=t[n].split("=");s[decodeURIComponent(a[0])]=decodeURIComponent(a[1]||"")}return s}}},34:function(e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=null,n=null;s.default={init:function(e,s){n=e,t=s},broadcast:function(e,s,a,o){console.log('broadcast myOauthToken="'+t+'" messageString="'+o+'"');var r=n+"/api/v1/tca/messenger/broadcast",i={oauth_token:t,quantity:s,token:a,message:o};return e.$http.post(r,i)}}},35:function(e,s,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(s,"__esModule",{value:!0});var a=t(75),o=n(a);s.default={name:"app",components:{Messenger:o.default}}},36:function(e,s,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(s,"__esModule",{value:!0});var a=t(32),o=n(a),r=t(34),i=n(r),u=t(33),l=n(u);s.default={name:"Messenger",data:function(){return{ready:!1,messages:this.$root.messages,errors:[],queryVars:l.default.parse(window.location.search),channelName:null,oauthToken:null,username:null,subscribeKey:null,quantity:null,token:null,message:null}},mounted:function(){var e=this;this.channelName=this.queryVars.c,this.username=this.queryVars.username||"User",this.oauthToken=this.queryVars.t,this.subscribeKey=this.queryVars.subscribeKey||window.SUBSCRIBE_KEY,this.tokenpassApiUrl=this.queryVars.tokenpassApiUrl||window.TOKENPASS_API_URL,"__SUBSCRIBE_KEY__"===this.subscribeKey&&(console.error("No subscribe key found."),this.errors.push("Unable to start messenger.")),"__TOKENPASS_API_URL__"===this.tokenpassApiUrl&&(console.error("No Tokenpass API URL found."),this.errors.push("Unable to start messenger.")),console.log("this.subscribeKey",this.subscribeKey),console.log("this.tokenpassApiUrl",this.tokenpassApiUrl),o.default.init(this.channelName,this.subscribeKey).then(function(){e.ready=!0}),i.default.init(this.tokenpassApiUrl,this.oauthToken),o.default.onMessage(function(s){e.messages.push(s)})},destroyed:function(){o.default.close()},methods:{sendMessage:function(){var e=this;i.default.broadcast(this,this.quantity,this.token,this.message).then(function(s){var t=s.body;e.messages.push({source:"system",msg:"Sent message to "+t.count+" recipient"+("1"===t.count?"":"s")})}).catch(function(s){var t="Failed to broadcast errorMessage.";null!=s.body&&null!=s.body.message?(t=t+" "+s.body.message,console.error(s.body)):console.error(s),e.errors.push(t)}),this.message=""}}}},71:function(e,s){},72:function(e,s){},74:function(e,s,t){var n,a;t(71),n=t(35);var o=t(76);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=n},75:function(e,s,t){var n,a;t(72),n=t(36);var o=t(77);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,a._scopeId="data-v-324ed8d8",e.exports=n},76:function(e,s){e.exports={render:function(){var e=this;return e._h("div",{attrs:{id:"app"}},[e._h("messenger")])},staticRenderFns:[]}},77:function(e,s){e.exports={render:function(){var e=this;return e._h("div",{staticClass:"chat"},[e._h("h1",["Welcome "+e._s(e.username)])," ",e.errors.length>0?e._h("div",{staticClass:"errors"},[e._l(e.errors,function(s){return e._h("div",{staticClass:"error"},[e._s(s)])})]):e._e()," ",e._m(0)," ",e._h("div",{directives:[{name:"show",rawName:"v-show",value:0==e.messages.length,expression:"messages.length == 0"}],staticClass:"no-messages"},["\n    Waiting for messages...\n  "])," ",e._h("div",{directives:[{name:"show",rawName:"v-show",value:e.messages.length>0,expression:"messages.length > 0"}],staticClass:"messages"},[e._l(e.messages,function(s){return["system"==s.source?e._h("pre",{staticClass:"system"},["System Message: "+e._s(s.msg)]):e._h("pre",["["+e._s(s.quantity)+" "+e._s(s.token)+"] "+e._s(s.msg)])," "]})])," ",e._m(1)," ",e._h("div",{staticClass:"input-group"},[e._h("label",{attrs:{for:"QuantityInput"}},["Quantity ",e._h("input",{directives:[{name:"model",rawName:"v-model",value:e.quantity,expression:"quantity"}],attrs:{type:"text",id:"QuantityInput",placeholder:"10"},domProps:{value:e._s(e.quantity)},on:{input:function(s){s.target.composing||(e.quantity=s.target.value)}}})])])," ",e._h("div",{staticClass:"input-group"},[e._h("label",{attrs:{for:"TokenInput"}},["Token ",e._h("input",{directives:[{name:"model",rawName:"v-model",value:e.token,expression:"token"}],attrs:{type:"text",id:"TokenInput",placeholder:"TOKENLY"},domProps:{value:e._s(e.token)},on:{input:function(s){s.target.composing||(e.token=s.target.value)}}})])])," ",e._h("div",{staticClass:"input-group"},[e._h("label",{attrs:{for:"MessageInput"}},["Message ",e._h("textarea",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticStyle:{width:"300px",height:"48px"},attrs:{id:"MessageInput",placeholder:"Your Message Here"},domProps:{value:e._s(e.message)},on:{input:function(s){s.target.composing||(e.message=s.target.value)}}})])])," ",e._h("button",{attrs:{id:"SendButton",disabled:!e.ready},on:{click:function(s){e.sendMessage()}}},["Send"])])},staticRenderFns:[function(){var e=this;return e._h("div",{staticClass:"messages-header"},["Messages"])},function(){var e=this;return e._h("h2",["Publish A Message"])}]}}});
//# sourceMappingURL=app.6bf7e2c2794ae0b1cd08.js.map