!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="/",n(n.s=30)}({30:function(e,n,t){"use strict";var r=["/","/index.html"];self.addEventListener("install",function(e){console.log("[ServiceWorker] Install"),e.waitUntil(caches.open("PWA-final-1").then(function(e){return console.log("[ServiceWorker] Caching app shell"),e.addAll(r)}))}),self.addEventListener("activate",function(e){return console.log("[ServiceWorker] Activate"),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if("PWA-final-1"!==e&&"Data-v1"!==e)return console.log("[ServiceWorker] Removing old cache",e),caches.delete(e)}))})),self.clients.claim()})}});