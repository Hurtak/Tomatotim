!function(){"use strict";window.TT={Services:{},Views:{}}}(),TT.Config=function(){"use strict";var e={};e.debug=!1,window.location.search.indexOf("debug")>-1&&(e.debug=!0),e.appName="Tomatotim",e.audio=!1,e.notifications=!1,e.workInterval=1500,e.breakInterval=300,e.longbreakInterval=1200,e.repeat=4,e.debug&&(e.appName="DEBUG",e.workInterval=7,e.breakInterval=5,e.longbreakInterval=6);var t=function(t){return e[t]},i=function(t,i){e[t]=i};return{get:t,set:i}}(),TT.Services.Storage=function(){"use strict";function e(e){return JSON.parse(localStorage.getItem(e))}function t(e,t){localStorage.setItem(e,JSON.stringify(t))}function i(){localStorage.clear()}return{set:t,get:e,clear:i}}(),TT.Services.BrowserDetection=function(){"use strict";var e=!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,t="undefined"!=typeof InstallTrigger,i=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0,n=!!window.chrome&&!e,r=!!document.documentMode;return{isOpera:e,isFirefox:t,isSafari:i,isChrome:n,isIE:r}}(),TT.Services.Title=function(){"use strict";function e(e,t){var i="";t||(i="■ "),document.title=i+e+" – "+TT.Config.get("appName")}function t(){document.title=TT.Config.get("appName")}return{setTitle:e,resetTitle:t}}(),TT.Services.Favicon=function(){"use strict";function e(){if(TT.Services.BrowserDetection.isIE)for(var e=document.querySelectorAll("[data-favicon-explorer]"),t=0;t<e.length;t++)document.head.removeChild(e[t])}function t(e){if(TT.Services.BrowserDetection.isFirefox||TT.Services.BrowserDetection.isIE)i.rel="shortcut icon",i.href="icons/favicon-"+e+".ico",i.id="favicon-ico";else{i=document.createElement("link"),i.rel="icon",i.setAttribute("type","image/png"),i.href="icons/favicon-16x16-"+e+".png",i.setAttribute("sizes","16x16"),i.id="favicon-png";var t=document.getElementById("favicon-png");t&&document.head.removeChild(t),document.head.appendChild(i)}}var i=document.getElementById("favicon-ico");return{init:e,setFavicon:t}}(),TT.Services.Notification=function(){"use strict";function e(){return"function"==typeof window.Notification}function t(){return e()?"granted"!==Notification.permission?(Notification.requestPermission(),!1):!0:!1}function i(e,i){if(t()){var r=new Notification(TT.Config.get("appName"),{icon:"img/notification-96x96-"+i+".png",body:e});r.onshow=function(){setTimeout(function(){r.close()},1e3*n)}}}var n=5;return{isAvaliable:e,requestPermission:t,newNotification:i}}(),TT.Services.Audio=function(){"use strict";function e(){n=document.createElement("audio"),n.src="audio/ding.mp3"}function t(){n.play()}function i(e){1>=e&&e>=0||(e=1),n.volume=e}var n;return{init:e,play:t,setVolume:i}}(),TT.Services.TaskbarFlash=function(){"use strict";function e(){return"undefined"!=typeof window.external.msIsSiteMode&&window.external.msIsSiteMode()&&"undefined"!=typeof window.external.msSiteModeActivate}function t(){e()&&window.external.msSiteModeActivate()}return{isAvaliable:e,flash:t}}(),TT.Views.Timer=function(){"use strict";function e(){return i.innerHTML.trim()}function t(e){i.innerHTML=e}var i=document.getElementById("clock");return{getTime:e,setTime:t}}(),TT.Views.Progress=function(){"use strict";function e(e,t){s[t].className="icon-tomato color-"+e,s[t].title=T[e]}function t(){r("");for(var t=0;t<s.length;t++)e("unfinished",t)}function i(e){var t=document.createElement("i");t.className="icon-tomato color-"+e,t.title=T[e],o.appendChild(t)}function n(){for(;o.firstChild;)o.removeChild(o.firstChild)}function r(e){a.innerHTML=e}var o=document.getElementById("progress"),s=o.getElementsByTagName("i"),a=document.getElementById("description"),T={unfinished:"Unfinished interval",work:"Work interval","break":"Break interval",longbreak:"Long break interval",finished:"Finished interval"};return{setDescription:r,setImageType:e,resetProgress:t,createImage:i,removeImages:n}}(),TT.Views.Controls=function(){"use strict";function e(){o?(u.innerHTML="pause",c.className="icon-pause-1"):(u.innerHTML="start",c.className="icon-play-1"),o=!o}function t(){o||e()}function i(){return s}function n(){return a}function r(){return T}var o=!0,s=document.getElementById("start"),a=document.getElementById("reset"),T=document.getElementById("skip"),c=document.getElementById("start-icon"),u=document.getElementById("start-caption");return{getStartButton:i,getResetButton:n,getSkipButton:r,resetStartButton:t,toogleStartButtonCaption:e}}(),TT.Views.Sidebar=function(){"use strict";function e(){return T}function t(){return a}function i(){s||(document.body.setAttribute("data-sidebar-open",""),s=!0)}function n(){s&&(document.body.removeAttribute("data-sidebar-open"),s=!1)}function r(){s?n():i()}function o(){return s}var s=!1,a=document.getElementById("sidebar-button"),T=document.getElementById("sidebar-overlay");return{getSidebarOverlay:e,getSidebarButton:t,isSidebarOpen:o,closeSidebar:n,openSidebar:i,toogleSidebar:r}}(),TT.Views.Settings=function(){"use strict";function e(){return document.querySelectorAll(".settings input[type=number]")}function t(){return document.querySelectorAll(".settings [data-increment]")}function i(e){e.parentNode.parentNode.style.display="none"}var n=document.getElementById("audio"),r=document.getElementById("audio-test"),o=document.getElementById("notifications"),s=document.getElementById("notifications-test"),a=document.getElementById("taskbar-flash"),T=document.getElementById("taskbar-flash-test"),c=document.getElementById("timer-auto-pause"),u=document.getElementById("work-interval"),g=document.getElementById("break-interval"),l=document.getElementById("longbreak-interval"),f=document.getElementById("repeat"),d=document.getElementById("reset-settings");return{audio:n,audioTest:r,notifications:o,notificationsTest:s,taskbarFlash:a,taskbarFlashTest:T,timerAutoPause:c,workInterval:u,breakInterval:g,longbreakInterval:l,repeat:f,resetSettings:d,getNumberInputs:e,getPlusMinusButtons:t,hide:i}}(),TT.Sidebar=function(){"use strict";function e(){TT.Views.Sidebar.getSidebarButton().addEventListener("click",TT.Views.Sidebar.toogleSidebar),TT.Views.Sidebar.getSidebarOverlay().addEventListener("click",TT.Views.Sidebar.closeSidebar)}return{init:e}}(),TT.Settings=function(){"use strict";function e(){TT.Config.set("audio",Boolean(TT.Services.Storage.get("audio"))),TT.Config.set("notifications",Boolean(TT.Services.Storage.get("notifications"))),TT.Config.set("taskbarFlash",Boolean(TT.Services.Storage.get("taskbarFlash"))),TT.Config.set("timerAutoPause",Boolean(TT.Services.Storage.get("timerAutoPause"))),TT.Config.set("workInterval",TT.Services.Storage.get("workInterval")||TT.Config.get("workInterval")),TT.Config.set("breakInterval",TT.Services.Storage.get("breakInterval")||TT.Config.get("breakInterval")),TT.Config.set("longbreakInterval",TT.Services.Storage.get("longbreakInterval")||TT.Config.get("longbreakInterval")),TT.Config.set("repeat",TT.Services.Storage.get("repeat")||TT.Config.get("repeat")),TT.Views.Settings.audio.checked=TT.Config.get("audio"),TT.Views.Settings.notifications.checked=TT.Config.get("notifications"),TT.Views.Settings.taskbarFlash.checked=TT.Config.get("taskbarFlash"),TT.Views.Settings.timerAutoPause.checked=TT.Config.get("timerAutoPause"),TT.Views.Settings.workInterval.value=TT.Config.get("workInterval")/60,TT.Views.Settings.breakInterval.value=TT.Config.get("breakInterval")/60,TT.Views.Settings.longbreakInterval.value=TT.Config.get("longbreakInterval")/60,TT.Views.Settings.repeat.value=TT.Config.get("repeat"),TT.Views.Settings.audio.addEventListener("click",function(){TT.Config.set("audio",this.checked),TT.Services.Storage.set("audio",TT.Config.get("audio"))}),TT.Services.Notification.isAvaliable()?TT.Views.Settings.notifications.addEventListener("click",function(){TT.Config.set("notifications",this.checked),TT.Config.get("notifications")===!0&&TT.Services.Notification.requestPermission(),TT.Services.Storage.set("notifications",TT.Config.get("notifications"))}):TT.Views.Settings.hide(TT.Views.Settings.notifications),TT.Services.TaskbarFlash.isAvaliable()?TT.Views.Settings.taskbarFlash.addEventListener("click",function(){TT.Config.set("taskbarFlash",this.checked),TT.Services.Storage.set("taskbarFlash",this.checked)}):TT.Views.Settings.hide(TT.Views.Settings.taskbarFlash),TT.Views.Settings.timerAutoPause.addEventListener("click",function(){TT.Config.set("timerAutoPause",this.checked),TT.Services.Storage.set("timerAutoPause",this.checked)}),TT.Views.Settings.audioTest.addEventListener("click",function(){TT.Services.Audio.play()}),TT.Views.Settings.notificationsTest.addEventListener("click",function(){TT.Services.Notification.newNotification("Web notification test","work")}),TT.Views.Settings.taskbarFlashTest.addEventListener("click",function(){for(var e=0;20>e;e++)setTimeout(TT.Services.TaskbarFlash.flash,500*e)});for(var e=["workInterval","breakInterval","longbreakInterval","repeat"],t=TT.Views.Settings.getNumberInputs(),i=TT.Views.Settings.getPlusMinusButtons(),o=0;o<e.length;o++){t[o].addEventListener("blur",n(t[o],e[o]));for(var s=0;2>s;s++)i[2*o+s].addEventListener("click",r(i[2*o+s],e[o]))}TT.Views.Settings.resetSettings.addEventListener("click",function(){var e=confirm("Are you sure?");e&&(TT.Services.Storage.clear(),location.reload(!1))}),TT.Config.get("notifications")===!0&&TT.Services.Notification.requestPermission()}function t(e,t,i,n){return e=Math.floor(e),e?e<Number(t)?e=t:e>Number(i)&&(e=i):e=n,Number(e)}function i(e,i){var n=60;"repeat"===i&&(n=1),e.value=t(e.value,e.min,e.max,TT.Config.get(i)/n),TT.Config.set(i,e.value*n),"repeat"===i?(TT.Views.Progress.removeImages(),TT.Timer.init()):TT.Timer.updateIntervals(),TT.Services.Storage.set(i,TT.Config.get(i))}function n(e,t){return function(){i(e,t)}}function r(e,t){return function(){var n=e.getAttribute("data-target");n=document.getElementById(n),n.value=Number(n.value)+Number(e.getAttribute("data-increment")),i(n,t)}}return{init:e}}(),TT.Timer=function(){"use strict";function e(){t(),g=TT.Services.Storage.get("intervalIndex")||0,l=TT.Services.Storage.get("timerInterval")||TT.Config.get("workInterval"),g>d.length-1&&(g=g%2===0?d.length-2:d.length-1);for(var e=0;e<TT.Config.get("repeat");e++)TT.Views.Progress.createImage("unfinished");for(var n=0;g>=n;n++)s(n,!0);0===g&&l<TT.Config.get("workInterval")&&(TT.Views.Progress.setImageType("work",0),TT.Views.Progress.setDescription("work")),0===g&&l===TT.Config.get("workInterval")?TT.Services.Title.resetTitle():TT.Services.Title.setTitle(i(l));var o=!TT.Services.Storage.get("recurringVisit");o&&(TT.Views.Sidebar.openSidebar(),TT.Services.Storage.set("recurringVisit",!0)),TT.Views.Controls.getStartButton().addEventListener("click",a),TT.Views.Controls.getSkipButton().addEventListener("click",r),TT.Views.Controls.getResetButton().addEventListener("click",u)}function t(){d=[];for(var e=0;e<TT.Config.get("repeat");e++)d.push(TT.Config.get("workInterval")),d.push(TT.Config.get("breakInterval"));d.pop(),d.push(TT.Config.get("longbreakInterval"))}function i(e){function t(e){return 10>e&&(e="0"+e),e}var i=Math.floor(e/60);return e%=60,t(i)+":"+t(e)}function n(){l--,0>=l&&o();var e=i(l);TT.Views.Timer.setTime(e),TT.Services.Title.setTitle(e,f),TT.Services.Storage.set("timerInterval",l)}function r(){o(!0)}function o(e){e=e||!1,g++,g>d.length-1&&(g=0,u()),l=d[g],s(g,e),TT.Services.Storage.set("intervalIndex",g),e&&(f&&(c(),T()),TT.Services.Title.setTitle(i(l),f),TT.Services.Storage.set("timerInterval",l)),TT.Config.get("timerAutoPause")&&(c(),TT.Views.Controls.resetStartButton(),TT.Services.Title.setTitle(i(l),f))}function s(e,t){var n=Math.floor(e/2);TT.Views.Timer.setTime(i(l)),e===d.length-1?(TT.Services.Favicon.setFavicon("longbreak"),!t&&TT.Config.get("notifications")&&TT.Services.Notification.newNotification(TT.Config.get("longbreakInterval")/60+" minute long break","longbreak"),TT.Views.Progress.setDescription("long break"),TT.Views.Progress.setImageType("longbreak",n)):0===e?(TT.Services.Favicon.setFavicon("work"),!t&&TT.Config.get("notifications")&&TT.Services.Notification.newNotification("Done","work")):e%2===1?(TT.Services.Favicon.setFavicon("break"),!t&&TT.Config.get("notifications")&&TT.Services.Notification.newNotification(TT.Config.get("breakInterval")/60+" minute break","break"),TT.Views.Progress.setDescription("break"),TT.Views.Progress.setImageType("break",n)):e%2===0&&(TT.Services.Favicon.setFavicon("work"),!t&&TT.Config.get("notifications")&&TT.Services.Notification.newNotification(TT.Config.get("workInterval")/60+" minute work","work"),TT.Views.Progress.setDescription("work"),TT.Views.Progress.setImageType("work",n),TT.Views.Progress.setImageType("finished",n-1)),t||(TT.Config.get("audio")&&TT.Services.Audio.play(),TT.Config.get("taskbarFlash")&&TT.Services.TaskbarFlash.flash())}function a(){f?c():T(),TT.Services.Title.setTitle(i(l),f),TT.Views.Controls.toogleStartButtonCaption(),0===g&&(TT.Views.Progress.setImageType("work",0),TT.Views.Progress.setDescription("work"))}function T(){var e=0,t=new Date;f=setInterval(function(){e+=(new Date).getTime()-t.getTime(),e>=1e3&&(n(),e-=1e3),t=new Date},v)}function c(){f=clearInterval(f)}function u(){c(),g=0,l=TT.Config.get("workInterval");var e=i(l);TT.Views.Timer.setTime(e),TT.Views.Controls.resetStartButton(),TT.Services.Title.resetTitle(),TT.Services.Favicon.setFavicon("work"),TT.Services.Storage.set("intervalIndex",g),TT.Services.Storage.set("timerInterval",l),TT.Views.Progress.resetProgress()}var g,l,f,d=[],v=100;return{init:e,updateIntervals:t,startTimer:a,pauseTimer:c,skipInterval:r,resetTimer:u}}(),TT.Hotkeys=function(){"use strict";function e(){document.addEventListener("keydown",t)}function t(e){switch(e.keyCode){case i.space:e.preventDefault(),TT.Timer.startTimer();break;case i.esc:TT.Views.Sidebar.closeSidebar();break;case i.r:TT.Timer.resetTimer();break;case i.s:TT.Timer.skipInterval();break;case i.h:TT.Views.Sidebar.toogleSidebar();break;case i.tab:TT.Views.Sidebar.isSidebarOpen()||e.preventDefault();break;case i.enter:e.preventDefault()}}var i={space:32,enter:13,esc:27,tab:9,r:82,s:83,h:72};return{init:e}}(),function(){"use strict";TT.Services.Favicon.init(),TT.Services.Audio.init(),TT.Settings.init(),TT.Sidebar.init(),TT.Timer.init(),TT.Hotkeys.init()}();