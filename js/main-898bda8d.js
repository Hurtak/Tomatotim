var config=function(){"use strict";var e=!1,t=1500,i=300,n=1200,r=4;return e&&(t=25,i=5,n=5),{debug:e,workInterval:t,breakInterval:i,longbreakInterval:n,repeat:r}}(),browserDetection=function(){"use strict";var e=!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,t="undefined"!=typeof InstallTrigger,i=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0,n=!!window.chrome&&!e,r=!1||!!document.documentMode;return{isOpera:e,isFirefox:t,isSafari:i,isChrome:n,isIE:r}}(),views={};views.timer=function(){"use strict";var e=document.getElementById("clock"),t=function(){return e.innerHTML.trim()},i=function(t){e.innerHTML=t};return{getTime:t,setTime:i}}(),views.controls=function(){"use strict";var e=!0,t=document.getElementById("start"),i=document.getElementById("reset"),n=document.getElementById("skip"),r=document.getElementById("start-icon"),o=document.getElementById("start-caption"),s=function(){e?(o.innerHTML="pause",r.className="icon-pause-1"):(o.innerHTML="start",r.className="icon-play-1"),e=!e},a=function(){e||s()},c=function(){return t},u=function(){return i},v=function(){return n};return{getStartButton:c,getResetButton:u,getSkipButton:v,resetStartButton:a,toogleStartButtonCaption:s}}(),views.title=function(){"use strict";var e=document.title,t=function(t,i){var n="";i||(n="■ "),document.title=n+t+" – "+e},i=function(){document.title=e};return{setTitle:t,resetTitle:i}}(),views.favicon=function(){"use strict";var e=function(){if(browserDetection.isIE)for(var e=document.querySelectorAll("[data-js-favicon-explorer]"),t=0;t<e.length;t++)document.head.removeChild(e[t])},t=function(e){var t;if(browserDetection.isFirefox||browserDetection.isIE)t=document.getElementById("favicon-ico"),t.rel="shortcut icon",t.href="icons/favicon-"+e+".ico",t.id="favicon-ico";else{t=document.createElement("link");var i=document.getElementById("favicon-png");t.rel="icon",t.setAttribute("type","image/png"),t.href="/icons/favicon-16x16-"+e+".png",t.setAttribute("sizes","16x16"),t.id="favicon-png",i&&document.head.removeChild(i),document.head.appendChild(t)}};return{init:e,setFavicon:t}}(),views.progress=function(){"use strict";var e=document.getElementById("progress"),t=e.getElementsByTagName("i"),i=document.getElementById("description"),n={unfinished:"Unfinished interval",work:"Work interval","break":"Break interval",longbreak:"Long break interval",finished:"Finished interval"},r=function(e,i){t[i].className="icon-tomato color-"+e,t[i].title=n[e]},o=function(){a("");for(var e=0;e<t.length;e++)r("unfinished",e)},s=function(t){var i=document.createElement("i");i.className="icon-tomato color-"+t,i.title=n[t],e.appendChild(i)},a=function(e){i.innerHTML=e};return{setDescription:a,setImageType:r,resetProgress:o,createImage:s}}(),views.sidebar=function(){"use strict";var e=!1,t=document.getElementById("sidebar-button"),i=document.getElementById("sidebar-overlay"),n=function(){return i},r=function(){return t},o=function(){e||(document.body.setAttribute("data-sidebar-open",""),e=!0)},s=function(){e&&(document.body.removeAttribute("data-sidebar-open"),e=!1)},a=function(){e?s():o()};return{getSidebarOverlay:n,getSidebarButton:r,closeSidebar:s,toogleSidebar:a}}();var timer=function(){"use strict";var e,t=0,i=config.workInterval,n=[],r=function(){views.timer.setTime(o(i));for(var e=0;e<config.repeat;e++)n.push(config.workInterval),e<config.repeat-1&&n.push(config.breakInterval);n.push(config.longbreakInterval)},o=function(e){var t=function(e){return 10>e&&(e="0"+e),e},i=Math.floor(e/60);return e%=60,t(i)+":"+t(e)},s=function(){i--,0>=i&&a();var t=o(i);views.timer.setTime(t),views.title.setTitle(t,e)},a=function(){t++,t>n.length-1&&(t=0,d()),i=n[t],views.timer.setTime(o(i));var e=Math.floor(t/2);t===n.length-1?(views.favicon.setFavicon("longbreak"),views.progress.setDescription("long break"),views.progress.setImageType("longbreak",e)):t%2===1?(views.favicon.setFavicon("break"),views.progress.setDescription("break"),views.progress.setImageType("break",e)):t%2===0&&(views.favicon.setFavicon("work"),t>0&&(views.progress.setDescription("work"),views.progress.setImageType("work",e),views.progress.setImageType("finished",e-1)))},c=function(){a(),e&&(l(),v()),views.title.setTitle(o(i),e)},u=function(){e?l():v(),views.title.setTitle(o(i),e),views.controls.toogleStartButtonCaption(),0===t&&(views.progress.setImageType("work",0),views.progress.setDescription("work"))},v=function(){e=setInterval(s,1e3)},l=function(){e=clearInterval(e)},d=function(){l(),t=0,i=config.workInterval;var e=o(i);views.timer.setTime(e),views.controls.resetStartButton(),views.title.resetTitle(),views.favicon.setFavicon("work"),views.progress.resetProgress()};return{init:r,startTimer:u,pauseTimer:l,skipInterval:c,resetTimer:d}}(),progress=function(){"use strict";var e=function(){for(var e=0;e<config.repeat;e++)views.progress.createImage("unfinished")};return{init:e}}(),binding=function(){"use strict";var e={space:32,esc:27,tab:9,r:82,s:83,h:72},t=function(){views.controls.getStartButton().addEventListener("click",timer.startTimer),views.controls.getSkipButton().addEventListener("click",timer.skipInterval),views.controls.getResetButton().addEventListener("click",timer.resetTimer),views.sidebar.getSidebarButton().addEventListener("click",views.sidebar.toogleSidebar),views.sidebar.getSidebarOverlay().addEventListener("click",views.sidebar.closeSidebar),document.addEventListener("keydown",i)},i=function(t){switch(t=window.event||t,t.keyCode){case e.space:t.preventDefault(),timer.startTimer();break;case e.esc:views.sidebar.closeSidebar();break;case e.r:timer.resetTimer();break;case e.s:timer.skipInterval();break;case e.h:views.sidebar.toogleSidebar();break;case e.tab:t.preventDefault()}};return{init:t}}();!function(){"use strict";views.favicon.init(),progress.init(),timer.init(),binding.init()}();