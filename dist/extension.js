module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const r=n(1),a=n(2),i=n(3),o=n(4);async function s(e){return i.promises.access(e,i.constants.F_OK).then(()=>!0).catch(()=>!1)}async function m(e){const t=r.dirname(e);await s(t)||await i.promises.mkdir(t,{recursive:!0})}e.exports={activate:function(e){const t=o.workspace.workspaceFolders[0].uri.fsPath,n=o.workspace.eol===o.EndOfLine.CRLF?"\r\n":"\n";let u=o.commands.registerCommand("repeating-notes.dailyNote",(async function(){d(new Date,"dd-mm-yyyy")})),y=o.commands.registerCommand("repeating-notes.weeklyNote",(async function(){d(new Date,"'week-'W-yyyy")})),c=o.commands.registerCommand("repeating-notes.monthlyNote",(async function(){d(new Date,"mmmm-yyyy")}));async function d(e,u){const y=a(e,u).toLowerCase()+".md",c=r.join(t,"journal",y);if(await s(c)){const e=await o.workspace.openTextDocument(o.Uri.file(c));return await o.window.showTextDocument(e),!1}await m(c),await i.promises.writeFile(c,`# ${a(e,u).replace(/^\w/,e=>e.toUpperCase()).split("-").join(" ")}${n}${n}`);const d=await o.workspace.openTextDocument(o.Uri.file(c));return await o.window.showTextDocument(d),!0}e.subscriptions.push(u),e.subscriptions.push(y),e.subscriptions.push(c)},pathExists:s,createDailyNoteDirectoryIfNotExists:m}},function(e,t){e.exports=require("path")},function(e,t,n){var r;!function(a){"use strict";var i,o,s,m=(i=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,o=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,s=/[^-+\dA-Z]/g,function(e,t,n,r){if(1!==arguments.length||"string"!==d(e)||/\d/.test(e)||(t=e,e=void 0),(e=e||new Date)instanceof Date||(e=new Date(e)),isNaN(e))throw TypeError("Invalid date");var a=(t=String(m.masks[t]||t||m.masks.default)).slice(0,4);"UTC:"!==a&&"GMT:"!==a||(t=t.slice(4),n=!0,"GMT:"===a&&(r=!0));var l=n?"getUTC":"get",f=e[l+"Date"](),p=e[l+"Day"](),M=e[l+"Month"](),g=e[l+"FullYear"](),T=e[l+"Hours"](),h=e[l+"Minutes"](),w=e[l+"Seconds"](),D=e[l+"Milliseconds"](),b=n?0:e.getTimezoneOffset(),v=y(e),N=c(e),S={d:f,dd:u(f),ddd:m.i18n.dayNames[p],dddd:m.i18n.dayNames[p+7],m:M+1,mm:u(M+1),mmm:m.i18n.monthNames[M],mmmm:m.i18n.monthNames[M+12],yy:String(g).slice(2),yyyy:g,h:T%12||12,hh:u(T%12||12),H:T,HH:u(T),M:h,MM:u(h),s:w,ss:u(w),l:u(D,3),L:u(Math.round(D/10)),t:T<12?m.i18n.timeNames[0]:m.i18n.timeNames[1],tt:T<12?m.i18n.timeNames[2]:m.i18n.timeNames[3],T:T<12?m.i18n.timeNames[4]:m.i18n.timeNames[5],TT:T<12?m.i18n.timeNames[6]:m.i18n.timeNames[7],Z:r?"GMT":n?"UTC":(String(e).match(o)||[""]).pop().replace(s,""),o:(b>0?"-":"+")+u(100*Math.floor(Math.abs(b)/60)+Math.abs(b)%60,4),S:["th","st","nd","rd"][f%10>3?0:(f%100-f%10!=10)*f%10],W:v,N:N};return t.replace(i,(function(e){return e in S?S[e]:e.slice(1,e.length-1)}))});function u(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}function y(e){var t=new Date(e.getFullYear(),e.getMonth(),e.getDate());t.setDate(t.getDate()-(t.getDay()+6)%7+3);var n=new Date(t.getFullYear(),0,4);n.setDate(n.getDate()-(n.getDay()+6)%7+3);var r=t.getTimezoneOffset()-n.getTimezoneOffset();t.setHours(t.getHours()-r);var a=(t-n)/6048e5;return 1+Math.floor(a)}function c(e){var t=e.getDay();return 0===t&&(t=7),t}function d(e){return null===e?"null":void 0===e?"undefined":"object"!=typeof e?typeof e:Array.isArray(e)?"array":{}.toString.call(e).slice(8,-1).toLowerCase()}m.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},m.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]},void 0===(r=function(){return m}.call(t,n,t,e))||(e.exports=r)}()},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("vscode")}]);
//# sourceMappingURL=extension.js.map