!function(a,b,c){function d(){var a=document.createElement("style");a.rel="stylesheet",document.head.appendChild(a),a.textContent=f[c]}function e(){if(!window.FontFace)return!1;var a=new FontFace("t",'url("data:application/font-woff2,") format("woff2")');return a.load(),"loading"===a.status}var f={};try{f=localStorage||{}}catch(g){}if(c in f)d();else{var h=e()?b:b,i=new XMLHttpRequest;i.open("GET",h),i.onload=function(){i.status>=200&&i.status<400&&(f[c]=i.responseText,d())}}}("fonts.woff.css","fonts.woff2.css","x-font-v0");