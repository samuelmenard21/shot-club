function sm(e,t){for(var r=0;r<t.length;r++){const s=t[r];if(typeof s!="string"&&!Array.isArray(s)){for(const a in s)if(a!=="default"&&!(a in e)){const i=Object.getOwnPropertyDescriptor(s,a);i&&Object.defineProperty(e,a,i.get?i:{enumerable:!0,get:()=>s[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=r(a);fetch(a.href,i)}})();function am(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var rh={exports:{}},Ei={},nh={exports:{}},Y={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var na=Symbol.for("react.element"),im=Symbol.for("react.portal"),om=Symbol.for("react.fragment"),lm=Symbol.for("react.strict_mode"),cm=Symbol.for("react.profiler"),dm=Symbol.for("react.provider"),um=Symbol.for("react.context"),hm=Symbol.for("react.forward_ref"),pm=Symbol.for("react.suspense"),fm=Symbol.for("react.memo"),mm=Symbol.for("react.lazy"),Xc=Symbol.iterator;function gm(e){return e===null||typeof e!="object"?null:(e=Xc&&e[Xc]||e["@@iterator"],typeof e=="function"?e:null)}var sh={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ah=Object.assign,ih={};function Fn(e,t,r){this.props=e,this.context=t,this.refs=ih,this.updater=r||sh}Fn.prototype.isReactComponent={};Fn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Fn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function oh(){}oh.prototype=Fn.prototype;function ql(e,t,r){this.props=e,this.context=t,this.refs=ih,this.updater=r||sh}var Gl=ql.prototype=new oh;Gl.constructor=ql;ah(Gl,Fn.prototype);Gl.isPureReactComponent=!0;var Zc=Array.isArray,lh=Object.prototype.hasOwnProperty,Kl={current:null},ch={key:!0,ref:!0,__self:!0,__source:!0};function dh(e,t,r){var s,a={},i=null,o=null;if(t!=null)for(s in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)lh.call(t,s)&&!ch.hasOwnProperty(s)&&(a[s]=t[s]);var l=arguments.length-2;if(l===1)a.children=r;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}if(e&&e.defaultProps)for(s in l=e.defaultProps,l)a[s]===void 0&&(a[s]=l[s]);return{$$typeof:na,type:e,key:i,ref:o,props:a,_owner:Kl.current}}function xm(e,t){return{$$typeof:na,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Vl(e){return typeof e=="object"&&e!==null&&e.$$typeof===na}function ym(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var ed=/\/+/g;function Ji(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ym(""+e.key):t.toString(36)}function Ua(e,t,r,s,a){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case na:case im:o=!0}}if(o)return o=e,a=a(o),e=s===""?"."+Ji(o,0):s,Zc(a)?(r="",e!=null&&(r=e.replace(ed,"$&/")+"/"),Ua(a,t,r,"",function(d){return d})):a!=null&&(Vl(a)&&(a=xm(a,r+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(ed,"$&/")+"/")+e)),t.push(a)),1;if(o=0,s=s===""?".":s+":",Zc(e))for(var l=0;l<e.length;l++){i=e[l];var c=s+Ji(i,l);o+=Ua(i,t,r,c,a)}else if(c=gm(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=s+Ji(i,l++),o+=Ua(i,t,r,c,a);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function da(e,t,r){if(e==null)return e;var s=[],a=0;return Ua(e,s,"","",function(i){return t.call(r,i,a++)}),s}function vm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Qe={current:null},Ba={transition:null},bm={ReactCurrentDispatcher:Qe,ReactCurrentBatchConfig:Ba,ReactCurrentOwner:Kl};function uh(){throw Error("act(...) is not supported in production builds of React.")}Y.Children={map:da,forEach:function(e,t,r){da(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return da(e,function(){t++}),t},toArray:function(e){return da(e,function(t){return t})||[]},only:function(e){if(!Vl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Y.Component=Fn;Y.Fragment=om;Y.Profiler=cm;Y.PureComponent=ql;Y.StrictMode=lm;Y.Suspense=pm;Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bm;Y.act=uh;Y.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=ah({},e.props),a=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=Kl.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)lh.call(t,c)&&!ch.hasOwnProperty(c)&&(s[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)s.children=r;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}return{$$typeof:na,type:e.type,key:a,ref:i,props:s,_owner:o}};Y.createContext=function(e){return e={$$typeof:um,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:dm,_context:e},e.Consumer=e};Y.createElement=dh;Y.createFactory=function(e){var t=dh.bind(null,e);return t.type=e,t};Y.createRef=function(){return{current:null}};Y.forwardRef=function(e){return{$$typeof:hm,render:e}};Y.isValidElement=Vl;Y.lazy=function(e){return{$$typeof:mm,_payload:{_status:-1,_result:e},_init:vm}};Y.memo=function(e,t){return{$$typeof:fm,type:e,compare:t===void 0?null:t}};Y.startTransition=function(e){var t=Ba.transition;Ba.transition={};try{e()}finally{Ba.transition=t}};Y.unstable_act=uh;Y.useCallback=function(e,t){return Qe.current.useCallback(e,t)};Y.useContext=function(e){return Qe.current.useContext(e)};Y.useDebugValue=function(){};Y.useDeferredValue=function(e){return Qe.current.useDeferredValue(e)};Y.useEffect=function(e,t){return Qe.current.useEffect(e,t)};Y.useId=function(){return Qe.current.useId()};Y.useImperativeHandle=function(e,t,r){return Qe.current.useImperativeHandle(e,t,r)};Y.useInsertionEffect=function(e,t){return Qe.current.useInsertionEffect(e,t)};Y.useLayoutEffect=function(e,t){return Qe.current.useLayoutEffect(e,t)};Y.useMemo=function(e,t){return Qe.current.useMemo(e,t)};Y.useReducer=function(e,t,r){return Qe.current.useReducer(e,t,r)};Y.useRef=function(e){return Qe.current.useRef(e)};Y.useState=function(e){return Qe.current.useState(e)};Y.useSyncExternalStore=function(e,t,r){return Qe.current.useSyncExternalStore(e,t,r)};Y.useTransition=function(){return Qe.current.useTransition()};Y.version="18.3.1";nh.exports=Y;var y=nh.exports;const hh=am(y),wm=sm({__proto__:null,default:hh},[y]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var km=y,jm=Symbol.for("react.element"),Nm=Symbol.for("react.fragment"),Sm=Object.prototype.hasOwnProperty,_m=km.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Cm={key:!0,ref:!0,__self:!0,__source:!0};function ph(e,t,r){var s,a={},i=null,o=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(s in t)Sm.call(t,s)&&!Cm.hasOwnProperty(s)&&(a[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)a[s]===void 0&&(a[s]=t[s]);return{$$typeof:jm,type:e,key:i,ref:o,props:a,_owner:_m.current}}Ei.Fragment=Nm;Ei.jsx=ph;Ei.jsxs=ph;rh.exports=Ei;var n=rh.exports,Oo={},fh={exports:{}},ht={},mh={exports:{}},gh={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(I,E){var $=I.length;I.push(E);e:for(;0<$;){var C=$-1>>>1,L=I[C];if(0<a(L,E))I[C]=E,I[$]=L,$=C;else break e}}function r(I){return I.length===0?null:I[0]}function s(I){if(I.length===0)return null;var E=I[0],$=I.pop();if($!==E){I[0]=$;e:for(var C=0,L=I.length,O=L>>>1;C<O;){var W=2*(C+1)-1,M=I[W],G=W+1,ne=I[G];if(0>a(M,$))G<L&&0>a(ne,M)?(I[C]=ne,I[G]=$,C=G):(I[C]=M,I[W]=$,C=W);else if(G<L&&0>a(ne,$))I[C]=ne,I[G]=$,C=G;else break e}}return E}function a(I,E){var $=I.sortIndex-E.sortIndex;return $!==0?$:I.id-E.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var c=[],d=[],h=1,u=null,p=3,x=!1,v=!1,b=!1,w=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(I){for(var E=r(d);E!==null;){if(E.callback===null)s(d);else if(E.startTime<=I)s(d),E.sortIndex=E.expirationTime,t(c,E);else break;E=r(d)}}function k(I){if(b=!1,m(I),!v)if(r(c)!==null)v=!0,je(N);else{var E=r(d);E!==null&&V(k,E.startTime-I)}}function N(I,E){v=!1,b&&(b=!1,g(D),D=-1),x=!0;var $=p;try{for(m(E),u=r(c);u!==null&&(!(u.expirationTime>E)||I&&!Q());){var C=u.callback;if(typeof C=="function"){u.callback=null,p=u.priorityLevel;var L=C(u.expirationTime<=E);E=e.unstable_now(),typeof L=="function"?u.callback=L:u===r(c)&&s(c),m(E)}else s(c);u=r(c)}if(u!==null)var O=!0;else{var W=r(d);W!==null&&V(k,W.startTime-E),O=!1}return O}finally{u=null,p=$,x=!1}}var S=!1,_=null,D=-1,q=5,T=-1;function Q(){return!(e.unstable_now()-T<q)}function de(){if(_!==null){var I=e.unstable_now();T=I;var E=!0;try{E=_(!0,I)}finally{E?he():(S=!1,_=null)}}else S=!1}var he;if(typeof f=="function")he=function(){f(de)};else if(typeof MessageChannel<"u"){var Be=new MessageChannel,Ge=Be.port2;Be.port1.onmessage=de,he=function(){Ge.postMessage(null)}}else he=function(){w(de,0)};function je(I){_=I,S||(S=!0,he())}function V(I,E){D=w(function(){I(e.unstable_now())},E)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(I){I.callback=null},e.unstable_continueExecution=function(){v||x||(v=!0,je(N))},e.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):q=0<I?Math.floor(1e3/I):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return r(c)},e.unstable_next=function(I){switch(p){case 1:case 2:case 3:var E=3;break;default:E=p}var $=p;p=E;try{return I()}finally{p=$}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(I,E){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var $=p;p=I;try{return E()}finally{p=$}},e.unstable_scheduleCallback=function(I,E,$){var C=e.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?C+$:C):$=C,I){case 1:var L=-1;break;case 2:L=250;break;case 5:L=1073741823;break;case 4:L=1e4;break;default:L=5e3}return L=$+L,I={id:h++,callback:E,priorityLevel:I,startTime:$,expirationTime:L,sortIndex:-1},$>C?(I.sortIndex=$,t(d,I),r(c)===null&&I===r(d)&&(b?(g(D),D=-1):b=!0,V(k,$-C))):(I.sortIndex=L,t(c,I),v||x||(v=!0,je(N))),I},e.unstable_shouldYield=Q,e.unstable_wrapCallback=function(I){var E=p;return function(){var $=p;p=E;try{return I.apply(this,arguments)}finally{p=$}}}})(gh);mh.exports=gh;var Tm=mh.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Em=y,ut=Tm;function z(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var xh=new Set,Es={};function Yr(e,t){Ln(e,t),Ln(e+"Capture",t)}function Ln(e,t){for(Es[e]=t,e=0;e<t.length;e++)xh.add(t[e])}var Jt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Lo=Object.prototype.hasOwnProperty,Am=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,td={},rd={};function zm(e){return Lo.call(rd,e)?!0:Lo.call(td,e)?!1:Am.test(e)?rd[e]=!0:(td[e]=!0,!1)}function Pm(e,t,r,s){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Rm(e,t,r,s){if(t===null||typeof t>"u"||Pm(e,t,r,s))return!0;if(s)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Xe(e,t,r,s,a,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=a,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var Ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ue[e]=new Xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ue[t]=new Xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ue[e]=new Xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ue[e]=new Xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ue[e]=new Xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ue[e]=new Xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ue[e]=new Xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ue[e]=new Xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ue[e]=new Xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Yl=/[\-:]([a-z])/g;function Jl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Yl,Jl);Ue[t]=new Xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Yl,Jl);Ue[t]=new Xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Yl,Jl);Ue[t]=new Xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ue[e]=new Xe(e,1,!1,e.toLowerCase(),null,!1,!1)});Ue.xlinkHref=new Xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ue[e]=new Xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ql(e,t,r,s){var a=Ue.hasOwnProperty(t)?Ue[t]:null;(a!==null?a.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Rm(t,r,a,s)&&(r=null),s||a===null?zm(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):a.mustUseProperty?e[a.propertyName]=r===null?a.type===3?!1:"":r:(t=a.attributeName,s=a.attributeNamespace,r===null?e.removeAttribute(t):(a=a.type,r=a===3||a===4&&r===!0?"":""+r,s?e.setAttributeNS(s,t,r):e.setAttribute(t,r))))}var er=Em.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ua=Symbol.for("react.element"),fn=Symbol.for("react.portal"),mn=Symbol.for("react.fragment"),Xl=Symbol.for("react.strict_mode"),Io=Symbol.for("react.profiler"),yh=Symbol.for("react.provider"),vh=Symbol.for("react.context"),Zl=Symbol.for("react.forward_ref"),$o=Symbol.for("react.suspense"),Do=Symbol.for("react.suspense_list"),ec=Symbol.for("react.memo"),ir=Symbol.for("react.lazy"),bh=Symbol.for("react.offscreen"),nd=Symbol.iterator;function Jn(e){return e===null||typeof e!="object"?null:(e=nd&&e[nd]||e["@@iterator"],typeof e=="function"?e:null)}var ge=Object.assign,Qi;function os(e){if(Qi===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Qi=t&&t[1]||""}return`
`+Qi+e}var Xi=!1;function Zi(e,t){if(!e||Xi)return"";Xi=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var s=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){s=d}e.call(t.prototype)}else{try{throw Error()}catch(d){s=d}e()}}catch(d){if(d&&s&&typeof d.stack=="string"){for(var a=d.stack.split(`
`),i=s.stack.split(`
`),o=a.length-1,l=i.length-1;1<=o&&0<=l&&a[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(a[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||a[o]!==i[l]){var c=`
`+a[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=l);break}}}finally{Xi=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?os(e):""}function Om(e){switch(e.tag){case 5:return os(e.type);case 16:return os("Lazy");case 13:return os("Suspense");case 19:return os("SuspenseList");case 0:case 2:case 15:return e=Zi(e.type,!1),e;case 11:return e=Zi(e.type.render,!1),e;case 1:return e=Zi(e.type,!0),e;default:return""}}function Uo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case mn:return"Fragment";case fn:return"Portal";case Io:return"Profiler";case Xl:return"StrictMode";case $o:return"Suspense";case Do:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case vh:return(e.displayName||"Context")+".Consumer";case yh:return(e._context.displayName||"Context")+".Provider";case Zl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ec:return t=e.displayName||null,t!==null?t:Uo(e.type)||"Memo";case ir:t=e._payload,e=e._init;try{return Uo(e(t))}catch{}}return null}function Lm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Uo(t);case 8:return t===Xl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Nr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function wh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Im(e){var t=wh(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var a=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){s=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return s},setValue:function(o){s=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ha(e){e._valueTracker||(e._valueTracker=Im(e))}function kh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),s="";return e&&(s=wh(e)?e.checked?"true":"false":e.value),e=s,e!==r?(t.setValue(e),!0):!1}function Za(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Bo(e,t){var r=t.checked;return ge({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function sd(e,t){var r=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;r=Nr(t.value!=null?t.value:r),e._wrapperState={initialChecked:s,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function jh(e,t){t=t.checked,t!=null&&Ql(e,"checked",t,!1)}function Wo(e,t){jh(e,t);var r=Nr(t.value),s=t.type;if(r!=null)s==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Fo(e,t.type,r):t.hasOwnProperty("defaultValue")&&Fo(e,t.type,Nr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ad(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Fo(e,t,r){(t!=="number"||Za(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var ls=Array.isArray;function Tn(e,t,r,s){if(e=e.options,t){t={};for(var a=0;a<r.length;a++)t["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=t.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&s&&(e[r].defaultSelected=!0)}else{for(r=""+Nr(r),t=null,a=0;a<e.length;a++){if(e[a].value===r){e[a].selected=!0,s&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Mo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(z(91));return ge({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function id(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(z(92));if(ls(r)){if(1<r.length)throw Error(z(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Nr(r)}}function Nh(e,t){var r=Nr(t.value),s=Nr(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),s!=null&&(e.defaultValue=""+s)}function od(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Sh(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ho(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Sh(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var pa,_h=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,s,a){MSApp.execUnsafeLocalFunction(function(){return e(t,r,s,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(pa=pa||document.createElement("div"),pa.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=pa.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function As(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var fs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$m=["Webkit","ms","Moz","O"];Object.keys(fs).forEach(function(e){$m.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),fs[t]=fs[e]})});function Ch(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||fs.hasOwnProperty(e)&&fs[e]?(""+t).trim():t+"px"}function Th(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var s=r.indexOf("--")===0,a=Ch(r,t[r],s);r==="float"&&(r="cssFloat"),s?e.setProperty(r,a):e[r]=a}}var Dm=ge({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function qo(e,t){if(t){if(Dm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(z(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(z(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(z(61))}if(t.style!=null&&typeof t.style!="object")throw Error(z(62))}}function Go(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ko=null;function tc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Vo=null,En=null,An=null;function ld(e){if(e=ia(e)){if(typeof Vo!="function")throw Error(z(280));var t=e.stateNode;t&&(t=Oi(t),Vo(e.stateNode,e.type,t))}}function Eh(e){En?An?An.push(e):An=[e]:En=e}function Ah(){if(En){var e=En,t=An;if(An=En=null,ld(e),t)for(e=0;e<t.length;e++)ld(t[e])}}function zh(e,t){return e(t)}function Ph(){}var eo=!1;function Rh(e,t,r){if(eo)return e(t,r);eo=!0;try{return zh(e,t,r)}finally{eo=!1,(En!==null||An!==null)&&(Ph(),Ah())}}function zs(e,t){var r=e.stateNode;if(r===null)return null;var s=Oi(r);if(s===null)return null;r=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(z(231,t,typeof r));return r}var Yo=!1;if(Jt)try{var Qn={};Object.defineProperty(Qn,"passive",{get:function(){Yo=!0}}),window.addEventListener("test",Qn,Qn),window.removeEventListener("test",Qn,Qn)}catch{Yo=!1}function Um(e,t,r,s,a,i,o,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(h){this.onError(h)}}var ms=!1,ei=null,ti=!1,Jo=null,Bm={onError:function(e){ms=!0,ei=e}};function Wm(e,t,r,s,a,i,o,l,c){ms=!1,ei=null,Um.apply(Bm,arguments)}function Fm(e,t,r,s,a,i,o,l,c){if(Wm.apply(this,arguments),ms){if(ms){var d=ei;ms=!1,ei=null}else throw Error(z(198));ti||(ti=!0,Jo=d)}}function Jr(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function Oh(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cd(e){if(Jr(e)!==e)throw Error(z(188))}function Mm(e){var t=e.alternate;if(!t){if(t=Jr(e),t===null)throw Error(z(188));return t!==e?null:e}for(var r=e,s=t;;){var a=r.return;if(a===null)break;var i=a.alternate;if(i===null){if(s=a.return,s!==null){r=s;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===r)return cd(a),e;if(i===s)return cd(a),t;i=i.sibling}throw Error(z(188))}if(r.return!==s.return)r=a,s=i;else{for(var o=!1,l=a.child;l;){if(l===r){o=!0,r=a,s=i;break}if(l===s){o=!0,s=a,r=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===r){o=!0,r=i,s=a;break}if(l===s){o=!0,s=i,r=a;break}l=l.sibling}if(!o)throw Error(z(189))}}if(r.alternate!==s)throw Error(z(190))}if(r.tag!==3)throw Error(z(188));return r.stateNode.current===r?e:t}function Lh(e){return e=Mm(e),e!==null?Ih(e):null}function Ih(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ih(e);if(t!==null)return t;e=e.sibling}return null}var $h=ut.unstable_scheduleCallback,dd=ut.unstable_cancelCallback,Hm=ut.unstable_shouldYield,qm=ut.unstable_requestPaint,we=ut.unstable_now,Gm=ut.unstable_getCurrentPriorityLevel,rc=ut.unstable_ImmediatePriority,Dh=ut.unstable_UserBlockingPriority,ri=ut.unstable_NormalPriority,Km=ut.unstable_LowPriority,Uh=ut.unstable_IdlePriority,Ai=null,Bt=null;function Vm(e){if(Bt&&typeof Bt.onCommitFiberRoot=="function")try{Bt.onCommitFiberRoot(Ai,e,void 0,(e.current.flags&128)===128)}catch{}}var Et=Math.clz32?Math.clz32:Qm,Ym=Math.log,Jm=Math.LN2;function Qm(e){return e>>>=0,e===0?32:31-(Ym(e)/Jm|0)|0}var fa=64,ma=4194304;function cs(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ni(e,t){var r=e.pendingLanes;if(r===0)return 0;var s=0,a=e.suspendedLanes,i=e.pingedLanes,o=r&268435455;if(o!==0){var l=o&~a;l!==0?s=cs(l):(i&=o,i!==0&&(s=cs(i)))}else o=r&~a,o!==0?s=cs(o):i!==0&&(s=cs(i));if(s===0)return 0;if(t!==0&&t!==s&&!(t&a)&&(a=s&-s,i=t&-t,a>=i||a===16&&(i&4194240)!==0))return t;if(s&4&&(s|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)r=31-Et(t),a=1<<r,s|=e[r],t&=~a;return s}function Xm(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Zm(e,t){for(var r=e.suspendedLanes,s=e.pingedLanes,a=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Et(i),l=1<<o,c=a[o];c===-1?(!(l&r)||l&s)&&(a[o]=Xm(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function Qo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Bh(){var e=fa;return fa<<=1,!(fa&4194240)&&(fa=64),e}function to(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function sa(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Et(t),e[t]=r}function eg(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<r;){var a=31-Et(r),i=1<<a;t[a]=0,s[a]=-1,e[a]=-1,r&=~i}}function nc(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var s=31-Et(r),a=1<<s;a&t|e[s]&t&&(e[s]|=t),r&=~a}}var te=0;function Wh(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Fh,sc,Mh,Hh,qh,Xo=!1,ga=[],mr=null,gr=null,xr=null,Ps=new Map,Rs=new Map,lr=[],tg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ud(e,t){switch(e){case"focusin":case"focusout":mr=null;break;case"dragenter":case"dragleave":gr=null;break;case"mouseover":case"mouseout":xr=null;break;case"pointerover":case"pointerout":Ps.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Rs.delete(t.pointerId)}}function Xn(e,t,r,s,a,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:s,nativeEvent:i,targetContainers:[a]},t!==null&&(t=ia(t),t!==null&&sc(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function rg(e,t,r,s,a){switch(t){case"focusin":return mr=Xn(mr,e,t,r,s,a),!0;case"dragenter":return gr=Xn(gr,e,t,r,s,a),!0;case"mouseover":return xr=Xn(xr,e,t,r,s,a),!0;case"pointerover":var i=a.pointerId;return Ps.set(i,Xn(Ps.get(i)||null,e,t,r,s,a)),!0;case"gotpointercapture":return i=a.pointerId,Rs.set(i,Xn(Rs.get(i)||null,e,t,r,s,a)),!0}return!1}function Gh(e){var t=Dr(e.target);if(t!==null){var r=Jr(t);if(r!==null){if(t=r.tag,t===13){if(t=Oh(r),t!==null){e.blockedOn=t,qh(e.priority,function(){Mh(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Wa(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Zo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);Ko=s,r.target.dispatchEvent(s),Ko=null}else return t=ia(r),t!==null&&sc(t),e.blockedOn=r,!1;t.shift()}return!0}function hd(e,t,r){Wa(e)&&r.delete(t)}function ng(){Xo=!1,mr!==null&&Wa(mr)&&(mr=null),gr!==null&&Wa(gr)&&(gr=null),xr!==null&&Wa(xr)&&(xr=null),Ps.forEach(hd),Rs.forEach(hd)}function Zn(e,t){e.blockedOn===t&&(e.blockedOn=null,Xo||(Xo=!0,ut.unstable_scheduleCallback(ut.unstable_NormalPriority,ng)))}function Os(e){function t(a){return Zn(a,e)}if(0<ga.length){Zn(ga[0],e);for(var r=1;r<ga.length;r++){var s=ga[r];s.blockedOn===e&&(s.blockedOn=null)}}for(mr!==null&&Zn(mr,e),gr!==null&&Zn(gr,e),xr!==null&&Zn(xr,e),Ps.forEach(t),Rs.forEach(t),r=0;r<lr.length;r++)s=lr[r],s.blockedOn===e&&(s.blockedOn=null);for(;0<lr.length&&(r=lr[0],r.blockedOn===null);)Gh(r),r.blockedOn===null&&lr.shift()}var zn=er.ReactCurrentBatchConfig,si=!0;function sg(e,t,r,s){var a=te,i=zn.transition;zn.transition=null;try{te=1,ac(e,t,r,s)}finally{te=a,zn.transition=i}}function ag(e,t,r,s){var a=te,i=zn.transition;zn.transition=null;try{te=4,ac(e,t,r,s)}finally{te=a,zn.transition=i}}function ac(e,t,r,s){if(si){var a=Zo(e,t,r,s);if(a===null)ho(e,t,s,ai,r),ud(e,s);else if(rg(a,e,t,r,s))s.stopPropagation();else if(ud(e,s),t&4&&-1<tg.indexOf(e)){for(;a!==null;){var i=ia(a);if(i!==null&&Fh(i),i=Zo(e,t,r,s),i===null&&ho(e,t,s,ai,r),i===a)break;a=i}a!==null&&s.stopPropagation()}else ho(e,t,s,null,r)}}var ai=null;function Zo(e,t,r,s){if(ai=null,e=tc(s),e=Dr(e),e!==null)if(t=Jr(e),t===null)e=null;else if(r=t.tag,r===13){if(e=Oh(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ai=e,null}function Kh(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Gm()){case rc:return 1;case Dh:return 4;case ri:case Km:return 16;case Uh:return 536870912;default:return 16}default:return 16}}var hr=null,ic=null,Fa=null;function Vh(){if(Fa)return Fa;var e,t=ic,r=t.length,s,a="value"in hr?hr.value:hr.textContent,i=a.length;for(e=0;e<r&&t[e]===a[e];e++);var o=r-e;for(s=1;s<=o&&t[r-s]===a[i-s];s++);return Fa=a.slice(e,1<s?1-s:void 0)}function Ma(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xa(){return!0}function pd(){return!1}function pt(e){function t(r,s,a,i,o){this._reactName=r,this._targetInst=a,this.type=s,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(r=e[l],this[l]=r?r(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?xa:pd,this.isPropagationStopped=pd,this}return ge(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=xa)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=xa)},persist:function(){},isPersistent:xa}),t}var Mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},oc=pt(Mn),aa=ge({},Mn,{view:0,detail:0}),ig=pt(aa),ro,no,es,zi=ge({},aa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:lc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==es&&(es&&e.type==="mousemove"?(ro=e.screenX-es.screenX,no=e.screenY-es.screenY):no=ro=0,es=e),ro)},movementY:function(e){return"movementY"in e?e.movementY:no}}),fd=pt(zi),og=ge({},zi,{dataTransfer:0}),lg=pt(og),cg=ge({},aa,{relatedTarget:0}),so=pt(cg),dg=ge({},Mn,{animationName:0,elapsedTime:0,pseudoElement:0}),ug=pt(dg),hg=ge({},Mn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),pg=pt(hg),fg=ge({},Mn,{data:0}),md=pt(fg),mg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function yg(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=xg[e])?!!t[e]:!1}function lc(){return yg}var vg=ge({},aa,{key:function(e){if(e.key){var t=mg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ma(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?gg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:lc,charCode:function(e){return e.type==="keypress"?Ma(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ma(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),bg=pt(vg),wg=ge({},zi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gd=pt(wg),kg=ge({},aa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:lc}),jg=pt(kg),Ng=ge({},Mn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Sg=pt(Ng),_g=ge({},zi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Cg=pt(_g),Tg=[9,13,27,32],cc=Jt&&"CompositionEvent"in window,gs=null;Jt&&"documentMode"in document&&(gs=document.documentMode);var Eg=Jt&&"TextEvent"in window&&!gs,Yh=Jt&&(!cc||gs&&8<gs&&11>=gs),xd=" ",yd=!1;function Jh(e,t){switch(e){case"keyup":return Tg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var gn=!1;function Ag(e,t){switch(e){case"compositionend":return Qh(t);case"keypress":return t.which!==32?null:(yd=!0,xd);case"textInput":return e=t.data,e===xd&&yd?null:e;default:return null}}function zg(e,t){if(gn)return e==="compositionend"||!cc&&Jh(e,t)?(e=Vh(),Fa=ic=hr=null,gn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Yh&&t.locale!=="ko"?null:t.data;default:return null}}var Pg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Pg[e.type]:t==="textarea"}function Xh(e,t,r,s){Eh(s),t=ii(t,"onChange"),0<t.length&&(r=new oc("onChange","change",null,r,s),e.push({event:r,listeners:t}))}var xs=null,Ls=null;function Rg(e){cp(e,0)}function Pi(e){var t=vn(e);if(kh(t))return e}function Og(e,t){if(e==="change")return t}var Zh=!1;if(Jt){var ao;if(Jt){var io="oninput"in document;if(!io){var bd=document.createElement("div");bd.setAttribute("oninput","return;"),io=typeof bd.oninput=="function"}ao=io}else ao=!1;Zh=ao&&(!document.documentMode||9<document.documentMode)}function wd(){xs&&(xs.detachEvent("onpropertychange",ep),Ls=xs=null)}function ep(e){if(e.propertyName==="value"&&Pi(Ls)){var t=[];Xh(t,Ls,e,tc(e)),Rh(Rg,t)}}function Lg(e,t,r){e==="focusin"?(wd(),xs=t,Ls=r,xs.attachEvent("onpropertychange",ep)):e==="focusout"&&wd()}function Ig(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Pi(Ls)}function $g(e,t){if(e==="click")return Pi(t)}function Dg(e,t){if(e==="input"||e==="change")return Pi(t)}function Ug(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var zt=typeof Object.is=="function"?Object.is:Ug;function Is(e,t){if(zt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),s=Object.keys(t);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var a=r[s];if(!Lo.call(t,a)||!zt(e[a],t[a]))return!1}return!0}function kd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function jd(e,t){var r=kd(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=t&&s>=t)return{node:r,offset:t-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=kd(r)}}function tp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?tp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function rp(){for(var e=window,t=Za();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Za(e.document)}return t}function dc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Bg(e){var t=rp(),r=e.focusedElem,s=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&tp(r.ownerDocument.documentElement,r)){if(s!==null&&dc(r)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=r.textContent.length,i=Math.min(s.start,a);s=s.end===void 0?i:Math.min(s.end,a),!e.extend&&i>s&&(a=s,s=i,i=a),a=jd(r,i);var o=jd(r,s);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),i>s?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Wg=Jt&&"documentMode"in document&&11>=document.documentMode,xn=null,el=null,ys=null,tl=!1;function Nd(e,t,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;tl||xn==null||xn!==Za(s)||(s=xn,"selectionStart"in s&&dc(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),ys&&Is(ys,s)||(ys=s,s=ii(el,"onSelect"),0<s.length&&(t=new oc("onSelect","select",null,t,r),e.push({event:t,listeners:s}),t.target=xn)))}function ya(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var yn={animationend:ya("Animation","AnimationEnd"),animationiteration:ya("Animation","AnimationIteration"),animationstart:ya("Animation","AnimationStart"),transitionend:ya("Transition","TransitionEnd")},oo={},np={};Jt&&(np=document.createElement("div").style,"AnimationEvent"in window||(delete yn.animationend.animation,delete yn.animationiteration.animation,delete yn.animationstart.animation),"TransitionEvent"in window||delete yn.transitionend.transition);function Ri(e){if(oo[e])return oo[e];if(!yn[e])return e;var t=yn[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in np)return oo[e]=t[r];return e}var sp=Ri("animationend"),ap=Ri("animationiteration"),ip=Ri("animationstart"),op=Ri("transitionend"),lp=new Map,Sd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _r(e,t){lp.set(e,t),Yr(t,[e])}for(var lo=0;lo<Sd.length;lo++){var co=Sd[lo],Fg=co.toLowerCase(),Mg=co[0].toUpperCase()+co.slice(1);_r(Fg,"on"+Mg)}_r(sp,"onAnimationEnd");_r(ap,"onAnimationIteration");_r(ip,"onAnimationStart");_r("dblclick","onDoubleClick");_r("focusin","onFocus");_r("focusout","onBlur");_r(op,"onTransitionEnd");Ln("onMouseEnter",["mouseout","mouseover"]);Ln("onMouseLeave",["mouseout","mouseover"]);Ln("onPointerEnter",["pointerout","pointerover"]);Ln("onPointerLeave",["pointerout","pointerover"]);Yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ds="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hg=new Set("cancel close invalid load scroll toggle".split(" ").concat(ds));function _d(e,t,r){var s=e.type||"unknown-event";e.currentTarget=r,Fm(s,t,void 0,e),e.currentTarget=null}function cp(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],a=s.event;s=s.listeners;e:{var i=void 0;if(t)for(var o=s.length-1;0<=o;o--){var l=s[o],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==i&&a.isPropagationStopped())break e;_d(a,l,d),i=c}else for(o=0;o<s.length;o++){if(l=s[o],c=l.instance,d=l.currentTarget,l=l.listener,c!==i&&a.isPropagationStopped())break e;_d(a,l,d),i=c}}}if(ti)throw e=Jo,ti=!1,Jo=null,e}function oe(e,t){var r=t[il];r===void 0&&(r=t[il]=new Set);var s=e+"__bubble";r.has(s)||(dp(t,e,2,!1),r.add(s))}function uo(e,t,r){var s=0;t&&(s|=4),dp(r,e,s,t)}var va="_reactListening"+Math.random().toString(36).slice(2);function $s(e){if(!e[va]){e[va]=!0,xh.forEach(function(r){r!=="selectionchange"&&(Hg.has(r)||uo(r,!1,e),uo(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[va]||(t[va]=!0,uo("selectionchange",!1,t))}}function dp(e,t,r,s){switch(Kh(t)){case 1:var a=sg;break;case 4:a=ag;break;default:a=ac}r=a.bind(null,t,r,e),a=void 0,!Yo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),s?a!==void 0?e.addEventListener(t,r,{capture:!0,passive:a}):e.addEventListener(t,r,!0):a!==void 0?e.addEventListener(t,r,{passive:a}):e.addEventListener(t,r,!1)}function ho(e,t,r,s,a){var i=s;if(!(t&1)&&!(t&2)&&s!==null)e:for(;;){if(s===null)return;var o=s.tag;if(o===3||o===4){var l=s.stateNode.containerInfo;if(l===a||l.nodeType===8&&l.parentNode===a)break;if(o===4)for(o=s.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===a||c.nodeType===8&&c.parentNode===a))return;o=o.return}for(;l!==null;){if(o=Dr(l),o===null)return;if(c=o.tag,c===5||c===6){s=i=o;continue e}l=l.parentNode}}s=s.return}Rh(function(){var d=i,h=tc(r),u=[];e:{var p=lp.get(e);if(p!==void 0){var x=oc,v=e;switch(e){case"keypress":if(Ma(r)===0)break e;case"keydown":case"keyup":x=bg;break;case"focusin":v="focus",x=so;break;case"focusout":v="blur",x=so;break;case"beforeblur":case"afterblur":x=so;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=fd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=lg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=jg;break;case sp:case ap:case ip:x=ug;break;case op:x=Sg;break;case"scroll":x=ig;break;case"wheel":x=Cg;break;case"copy":case"cut":case"paste":x=pg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=gd}var b=(t&4)!==0,w=!b&&e==="scroll",g=b?p!==null?p+"Capture":null:p;b=[];for(var f=d,m;f!==null;){m=f;var k=m.stateNode;if(m.tag===5&&k!==null&&(m=k,g!==null&&(k=zs(f,g),k!=null&&b.push(Ds(f,k,m)))),w)break;f=f.return}0<b.length&&(p=new x(p,v,null,r,h),u.push({event:p,listeners:b}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",p&&r!==Ko&&(v=r.relatedTarget||r.fromElement)&&(Dr(v)||v[Qt]))break e;if((x||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,x?(v=r.relatedTarget||r.toElement,x=d,v=v?Dr(v):null,v!==null&&(w=Jr(v),v!==w||v.tag!==5&&v.tag!==6)&&(v=null)):(x=null,v=d),x!==v)){if(b=fd,k="onMouseLeave",g="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(b=gd,k="onPointerLeave",g="onPointerEnter",f="pointer"),w=x==null?p:vn(x),m=v==null?p:vn(v),p=new b(k,f+"leave",x,r,h),p.target=w,p.relatedTarget=m,k=null,Dr(h)===d&&(b=new b(g,f+"enter",v,r,h),b.target=m,b.relatedTarget=w,k=b),w=k,x&&v)t:{for(b=x,g=v,f=0,m=b;m;m=tn(m))f++;for(m=0,k=g;k;k=tn(k))m++;for(;0<f-m;)b=tn(b),f--;for(;0<m-f;)g=tn(g),m--;for(;f--;){if(b===g||g!==null&&b===g.alternate)break t;b=tn(b),g=tn(g)}b=null}else b=null;x!==null&&Cd(u,p,x,b,!1),v!==null&&w!==null&&Cd(u,w,v,b,!0)}}e:{if(p=d?vn(d):window,x=p.nodeName&&p.nodeName.toLowerCase(),x==="select"||x==="input"&&p.type==="file")var N=Og;else if(vd(p))if(Zh)N=Dg;else{N=Ig;var S=Lg}else(x=p.nodeName)&&x.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(N=$g);if(N&&(N=N(e,d))){Xh(u,N,r,h);break e}S&&S(e,p,d),e==="focusout"&&(S=p._wrapperState)&&S.controlled&&p.type==="number"&&Fo(p,"number",p.value)}switch(S=d?vn(d):window,e){case"focusin":(vd(S)||S.contentEditable==="true")&&(xn=S,el=d,ys=null);break;case"focusout":ys=el=xn=null;break;case"mousedown":tl=!0;break;case"contextmenu":case"mouseup":case"dragend":tl=!1,Nd(u,r,h);break;case"selectionchange":if(Wg)break;case"keydown":case"keyup":Nd(u,r,h)}var _;if(cc)e:{switch(e){case"compositionstart":var D="onCompositionStart";break e;case"compositionend":D="onCompositionEnd";break e;case"compositionupdate":D="onCompositionUpdate";break e}D=void 0}else gn?Jh(e,r)&&(D="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(D="onCompositionStart");D&&(Yh&&r.locale!=="ko"&&(gn||D!=="onCompositionStart"?D==="onCompositionEnd"&&gn&&(_=Vh()):(hr=h,ic="value"in hr?hr.value:hr.textContent,gn=!0)),S=ii(d,D),0<S.length&&(D=new md(D,e,null,r,h),u.push({event:D,listeners:S}),_?D.data=_:(_=Qh(r),_!==null&&(D.data=_)))),(_=Eg?Ag(e,r):zg(e,r))&&(d=ii(d,"onBeforeInput"),0<d.length&&(h=new md("onBeforeInput","beforeinput",null,r,h),u.push({event:h,listeners:d}),h.data=_))}cp(u,t)})}function Ds(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ii(e,t){for(var r=t+"Capture",s=[];e!==null;){var a=e,i=a.stateNode;a.tag===5&&i!==null&&(a=i,i=zs(e,r),i!=null&&s.unshift(Ds(e,i,a)),i=zs(e,t),i!=null&&s.push(Ds(e,i,a))),e=e.return}return s}function tn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Cd(e,t,r,s,a){for(var i=t._reactName,o=[];r!==null&&r!==s;){var l=r,c=l.alternate,d=l.stateNode;if(c!==null&&c===s)break;l.tag===5&&d!==null&&(l=d,a?(c=zs(r,i),c!=null&&o.unshift(Ds(r,c,l))):a||(c=zs(r,i),c!=null&&o.push(Ds(r,c,l)))),r=r.return}o.length!==0&&e.push({event:t,listeners:o})}var qg=/\r\n?/g,Gg=/\u0000|\uFFFD/g;function Td(e){return(typeof e=="string"?e:""+e).replace(qg,`
`).replace(Gg,"")}function ba(e,t,r){if(t=Td(t),Td(e)!==t&&r)throw Error(z(425))}function oi(){}var rl=null,nl=null;function sl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var al=typeof setTimeout=="function"?setTimeout:void 0,Kg=typeof clearTimeout=="function"?clearTimeout:void 0,Ed=typeof Promise=="function"?Promise:void 0,Vg=typeof queueMicrotask=="function"?queueMicrotask:typeof Ed<"u"?function(e){return Ed.resolve(null).then(e).catch(Yg)}:al;function Yg(e){setTimeout(function(){throw e})}function po(e,t){var r=t,s=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&a.nodeType===8)if(r=a.data,r==="/$"){if(s===0){e.removeChild(a),Os(t);return}s--}else r!=="$"&&r!=="$?"&&r!=="$!"||s++;r=a}while(r);Os(t)}function yr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ad(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Hn=Math.random().toString(36).slice(2),Ut="__reactFiber$"+Hn,Us="__reactProps$"+Hn,Qt="__reactContainer$"+Hn,il="__reactEvents$"+Hn,Jg="__reactListeners$"+Hn,Qg="__reactHandles$"+Hn;function Dr(e){var t=e[Ut];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Qt]||r[Ut]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Ad(e);e!==null;){if(r=e[Ut])return r;e=Ad(e)}return t}e=r,r=e.parentNode}return null}function ia(e){return e=e[Ut]||e[Qt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function vn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(z(33))}function Oi(e){return e[Us]||null}var ol=[],bn=-1;function Cr(e){return{current:e}}function le(e){0>bn||(e.current=ol[bn],ol[bn]=null,bn--)}function ie(e,t){bn++,ol[bn]=e.current,e.current=t}var Sr={},qe=Cr(Sr),nt=Cr(!1),Hr=Sr;function In(e,t){var r=e.type.contextTypes;if(!r)return Sr;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var a={},i;for(i in r)a[i]=t[i];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function st(e){return e=e.childContextTypes,e!=null}function li(){le(nt),le(qe)}function zd(e,t,r){if(qe.current!==Sr)throw Error(z(168));ie(qe,t),ie(nt,r)}function up(e,t,r){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return r;s=s.getChildContext();for(var a in s)if(!(a in t))throw Error(z(108,Lm(e)||"Unknown",a));return ge({},r,s)}function ci(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Sr,Hr=qe.current,ie(qe,e),ie(nt,nt.current),!0}function Pd(e,t,r){var s=e.stateNode;if(!s)throw Error(z(169));r?(e=up(e,t,Hr),s.__reactInternalMemoizedMergedChildContext=e,le(nt),le(qe),ie(qe,e)):le(nt),ie(nt,r)}var Gt=null,Li=!1,fo=!1;function hp(e){Gt===null?Gt=[e]:Gt.push(e)}function Xg(e){Li=!0,hp(e)}function Tr(){if(!fo&&Gt!==null){fo=!0;var e=0,t=te;try{var r=Gt;for(te=1;e<r.length;e++){var s=r[e];do s=s(!0);while(s!==null)}Gt=null,Li=!1}catch(a){throw Gt!==null&&(Gt=Gt.slice(e+1)),$h(rc,Tr),a}finally{te=t,fo=!1}}return null}var wn=[],kn=0,di=null,ui=0,gt=[],xt=0,qr=null,Kt=1,Vt="";function Or(e,t){wn[kn++]=ui,wn[kn++]=di,di=e,ui=t}function pp(e,t,r){gt[xt++]=Kt,gt[xt++]=Vt,gt[xt++]=qr,qr=e;var s=Kt;e=Vt;var a=32-Et(s)-1;s&=~(1<<a),r+=1;var i=32-Et(t)+a;if(30<i){var o=a-a%5;i=(s&(1<<o)-1).toString(32),s>>=o,a-=o,Kt=1<<32-Et(t)+a|r<<a|s,Vt=i+e}else Kt=1<<i|r<<a|s,Vt=e}function uc(e){e.return!==null&&(Or(e,1),pp(e,1,0))}function hc(e){for(;e===di;)di=wn[--kn],wn[kn]=null,ui=wn[--kn],wn[kn]=null;for(;e===qr;)qr=gt[--xt],gt[xt]=null,Vt=gt[--xt],gt[xt]=null,Kt=gt[--xt],gt[xt]=null}var dt=null,ct=null,ue=!1,Tt=null;function fp(e,t){var r=yt(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Rd(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,dt=e,ct=yr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,dt=e,ct=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=qr!==null?{id:Kt,overflow:Vt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=yt(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,dt=e,ct=null,!0):!1;default:return!1}}function ll(e){return(e.mode&1)!==0&&(e.flags&128)===0}function cl(e){if(ue){var t=ct;if(t){var r=t;if(!Rd(e,t)){if(ll(e))throw Error(z(418));t=yr(r.nextSibling);var s=dt;t&&Rd(e,t)?fp(s,r):(e.flags=e.flags&-4097|2,ue=!1,dt=e)}}else{if(ll(e))throw Error(z(418));e.flags=e.flags&-4097|2,ue=!1,dt=e}}}function Od(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;dt=e}function wa(e){if(e!==dt)return!1;if(!ue)return Od(e),ue=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!sl(e.type,e.memoizedProps)),t&&(t=ct)){if(ll(e))throw mp(),Error(z(418));for(;t;)fp(e,t),t=yr(t.nextSibling)}if(Od(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(z(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){ct=yr(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}ct=null}}else ct=dt?yr(e.stateNode.nextSibling):null;return!0}function mp(){for(var e=ct;e;)e=yr(e.nextSibling)}function $n(){ct=dt=null,ue=!1}function pc(e){Tt===null?Tt=[e]:Tt.push(e)}var Zg=er.ReactCurrentBatchConfig;function ts(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(z(309));var s=r.stateNode}if(!s)throw Error(z(147,e));var a=s,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var l=a.refs;o===null?delete l[i]:l[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(z(284));if(!r._owner)throw Error(z(290,e))}return e}function ka(e,t){throw e=Object.prototype.toString.call(t),Error(z(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ld(e){var t=e._init;return t(e._payload)}function gp(e){function t(g,f){if(e){var m=g.deletions;m===null?(g.deletions=[f],g.flags|=16):m.push(f)}}function r(g,f){if(!e)return null;for(;f!==null;)t(g,f),f=f.sibling;return null}function s(g,f){for(g=new Map;f!==null;)f.key!==null?g.set(f.key,f):g.set(f.index,f),f=f.sibling;return g}function a(g,f){return g=kr(g,f),g.index=0,g.sibling=null,g}function i(g,f,m){return g.index=m,e?(m=g.alternate,m!==null?(m=m.index,m<f?(g.flags|=2,f):m):(g.flags|=2,f)):(g.flags|=1048576,f)}function o(g){return e&&g.alternate===null&&(g.flags|=2),g}function l(g,f,m,k){return f===null||f.tag!==6?(f=wo(m,g.mode,k),f.return=g,f):(f=a(f,m),f.return=g,f)}function c(g,f,m,k){var N=m.type;return N===mn?h(g,f,m.props.children,k,m.key):f!==null&&(f.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ir&&Ld(N)===f.type)?(k=a(f,m.props),k.ref=ts(g,f,m),k.return=g,k):(k=Ja(m.type,m.key,m.props,null,g.mode,k),k.ref=ts(g,f,m),k.return=g,k)}function d(g,f,m,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=ko(m,g.mode,k),f.return=g,f):(f=a(f,m.children||[]),f.return=g,f)}function h(g,f,m,k,N){return f===null||f.tag!==7?(f=Mr(m,g.mode,k,N),f.return=g,f):(f=a(f,m),f.return=g,f)}function u(g,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=wo(""+f,g.mode,m),f.return=g,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ua:return m=Ja(f.type,f.key,f.props,null,g.mode,m),m.ref=ts(g,null,f),m.return=g,m;case fn:return f=ko(f,g.mode,m),f.return=g,f;case ir:var k=f._init;return u(g,k(f._payload),m)}if(ls(f)||Jn(f))return f=Mr(f,g.mode,m,null),f.return=g,f;ka(g,f)}return null}function p(g,f,m,k){var N=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return N!==null?null:l(g,f,""+m,k);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ua:return m.key===N?c(g,f,m,k):null;case fn:return m.key===N?d(g,f,m,k):null;case ir:return N=m._init,p(g,f,N(m._payload),k)}if(ls(m)||Jn(m))return N!==null?null:h(g,f,m,k,null);ka(g,m)}return null}function x(g,f,m,k,N){if(typeof k=="string"&&k!==""||typeof k=="number")return g=g.get(m)||null,l(f,g,""+k,N);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case ua:return g=g.get(k.key===null?m:k.key)||null,c(f,g,k,N);case fn:return g=g.get(k.key===null?m:k.key)||null,d(f,g,k,N);case ir:var S=k._init;return x(g,f,m,S(k._payload),N)}if(ls(k)||Jn(k))return g=g.get(m)||null,h(f,g,k,N,null);ka(f,k)}return null}function v(g,f,m,k){for(var N=null,S=null,_=f,D=f=0,q=null;_!==null&&D<m.length;D++){_.index>D?(q=_,_=null):q=_.sibling;var T=p(g,_,m[D],k);if(T===null){_===null&&(_=q);break}e&&_&&T.alternate===null&&t(g,_),f=i(T,f,D),S===null?N=T:S.sibling=T,S=T,_=q}if(D===m.length)return r(g,_),ue&&Or(g,D),N;if(_===null){for(;D<m.length;D++)_=u(g,m[D],k),_!==null&&(f=i(_,f,D),S===null?N=_:S.sibling=_,S=_);return ue&&Or(g,D),N}for(_=s(g,_);D<m.length;D++)q=x(_,g,D,m[D],k),q!==null&&(e&&q.alternate!==null&&_.delete(q.key===null?D:q.key),f=i(q,f,D),S===null?N=q:S.sibling=q,S=q);return e&&_.forEach(function(Q){return t(g,Q)}),ue&&Or(g,D),N}function b(g,f,m,k){var N=Jn(m);if(typeof N!="function")throw Error(z(150));if(m=N.call(m),m==null)throw Error(z(151));for(var S=N=null,_=f,D=f=0,q=null,T=m.next();_!==null&&!T.done;D++,T=m.next()){_.index>D?(q=_,_=null):q=_.sibling;var Q=p(g,_,T.value,k);if(Q===null){_===null&&(_=q);break}e&&_&&Q.alternate===null&&t(g,_),f=i(Q,f,D),S===null?N=Q:S.sibling=Q,S=Q,_=q}if(T.done)return r(g,_),ue&&Or(g,D),N;if(_===null){for(;!T.done;D++,T=m.next())T=u(g,T.value,k),T!==null&&(f=i(T,f,D),S===null?N=T:S.sibling=T,S=T);return ue&&Or(g,D),N}for(_=s(g,_);!T.done;D++,T=m.next())T=x(_,g,D,T.value,k),T!==null&&(e&&T.alternate!==null&&_.delete(T.key===null?D:T.key),f=i(T,f,D),S===null?N=T:S.sibling=T,S=T);return e&&_.forEach(function(de){return t(g,de)}),ue&&Or(g,D),N}function w(g,f,m,k){if(typeof m=="object"&&m!==null&&m.type===mn&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case ua:e:{for(var N=m.key,S=f;S!==null;){if(S.key===N){if(N=m.type,N===mn){if(S.tag===7){r(g,S.sibling),f=a(S,m.props.children),f.return=g,g=f;break e}}else if(S.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ir&&Ld(N)===S.type){r(g,S.sibling),f=a(S,m.props),f.ref=ts(g,S,m),f.return=g,g=f;break e}r(g,S);break}else t(g,S);S=S.sibling}m.type===mn?(f=Mr(m.props.children,g.mode,k,m.key),f.return=g,g=f):(k=Ja(m.type,m.key,m.props,null,g.mode,k),k.ref=ts(g,f,m),k.return=g,g=k)}return o(g);case fn:e:{for(S=m.key;f!==null;){if(f.key===S)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){r(g,f.sibling),f=a(f,m.children||[]),f.return=g,g=f;break e}else{r(g,f);break}else t(g,f);f=f.sibling}f=ko(m,g.mode,k),f.return=g,g=f}return o(g);case ir:return S=m._init,w(g,f,S(m._payload),k)}if(ls(m))return v(g,f,m,k);if(Jn(m))return b(g,f,m,k);ka(g,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(r(g,f.sibling),f=a(f,m),f.return=g,g=f):(r(g,f),f=wo(m,g.mode,k),f.return=g,g=f),o(g)):r(g,f)}return w}var Dn=gp(!0),xp=gp(!1),hi=Cr(null),pi=null,jn=null,fc=null;function mc(){fc=jn=pi=null}function gc(e){var t=hi.current;le(hi),e._currentValue=t}function dl(e,t,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===r)break;e=e.return}}function Pn(e,t){pi=e,fc=jn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(rt=!0),e.firstContext=null)}function bt(e){var t=e._currentValue;if(fc!==e)if(e={context:e,memoizedValue:t,next:null},jn===null){if(pi===null)throw Error(z(308));jn=e,pi.dependencies={lanes:0,firstContext:e}}else jn=jn.next=e;return t}var Ur=null;function xc(e){Ur===null?Ur=[e]:Ur.push(e)}function yp(e,t,r,s){var a=t.interleaved;return a===null?(r.next=r,xc(t)):(r.next=a.next,a.next=r),t.interleaved=r,Xt(e,s)}function Xt(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var or=!1;function yc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function vp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Yt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function vr(e,t,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,Z&2){var a=s.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),s.pending=t,Xt(e,r)}return a=s.interleaved,a===null?(t.next=t,xc(s)):(t.next=a.next,a.next=t),s.interleaved=t,Xt(e,r)}function Ha(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,nc(e,r)}}function Id(e,t){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var a=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var o={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?a=i=o:i=i.next=o,r=r.next}while(r!==null);i===null?a=i=t:i=i.next=t}else a=i=t;r={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:s.shared,effects:s.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function fi(e,t,r,s){var a=e.updateQueue;or=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var c=l,d=c.next;c.next=null,o===null?i=d:o.next=d,o=c;var h=e.alternate;h!==null&&(h=h.updateQueue,l=h.lastBaseUpdate,l!==o&&(l===null?h.firstBaseUpdate=d:l.next=d,h.lastBaseUpdate=c))}if(i!==null){var u=a.baseState;o=0,h=d=c=null,l=i;do{var p=l.lane,x=l.eventTime;if((s&p)===p){h!==null&&(h=h.next={eventTime:x,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var v=e,b=l;switch(p=t,x=r,b.tag){case 1:if(v=b.payload,typeof v=="function"){u=v.call(x,u,p);break e}u=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=b.payload,p=typeof v=="function"?v.call(x,u,p):v,p==null)break e;u=ge({},u,p);break e;case 2:or=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,p=a.effects,p===null?a.effects=[l]:p.push(l))}else x={eventTime:x,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},h===null?(d=h=x,c=u):h=h.next=x,o|=p;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;p=l,l=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);if(h===null&&(c=u),a.baseState=c,a.firstBaseUpdate=d,a.lastBaseUpdate=h,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else i===null&&(a.shared.lanes=0);Kr|=o,e.lanes=o,e.memoizedState=u}}function $d(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],a=s.callback;if(a!==null){if(s.callback=null,s=r,typeof a!="function")throw Error(z(191,a));a.call(s)}}}var oa={},Wt=Cr(oa),Bs=Cr(oa),Ws=Cr(oa);function Br(e){if(e===oa)throw Error(z(174));return e}function vc(e,t){switch(ie(Ws,t),ie(Bs,e),ie(Wt,oa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ho(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ho(t,e)}le(Wt),ie(Wt,t)}function Un(){le(Wt),le(Bs),le(Ws)}function bp(e){Br(Ws.current);var t=Br(Wt.current),r=Ho(t,e.type);t!==r&&(ie(Bs,e),ie(Wt,r))}function bc(e){Bs.current===e&&(le(Wt),le(Bs))}var fe=Cr(0);function mi(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var mo=[];function wc(){for(var e=0;e<mo.length;e++)mo[e]._workInProgressVersionPrimary=null;mo.length=0}var qa=er.ReactCurrentDispatcher,go=er.ReactCurrentBatchConfig,Gr=0,me=null,Te=null,Ae=null,gi=!1,vs=!1,Fs=0,ex=0;function Fe(){throw Error(z(321))}function kc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!zt(e[r],t[r]))return!1;return!0}function jc(e,t,r,s,a,i){if(Gr=i,me=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,qa.current=e===null||e.memoizedState===null?sx:ax,e=r(s,a),vs){i=0;do{if(vs=!1,Fs=0,25<=i)throw Error(z(301));i+=1,Ae=Te=null,t.updateQueue=null,qa.current=ix,e=r(s,a)}while(vs)}if(qa.current=xi,t=Te!==null&&Te.next!==null,Gr=0,Ae=Te=me=null,gi=!1,t)throw Error(z(300));return e}function Nc(){var e=Fs!==0;return Fs=0,e}function It(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ae===null?me.memoizedState=Ae=e:Ae=Ae.next=e,Ae}function wt(){if(Te===null){var e=me.alternate;e=e!==null?e.memoizedState:null}else e=Te.next;var t=Ae===null?me.memoizedState:Ae.next;if(t!==null)Ae=t,Te=e;else{if(e===null)throw Error(z(310));Te=e,e={memoizedState:Te.memoizedState,baseState:Te.baseState,baseQueue:Te.baseQueue,queue:Te.queue,next:null},Ae===null?me.memoizedState=Ae=e:Ae=Ae.next=e}return Ae}function Ms(e,t){return typeof t=="function"?t(e):t}function xo(e){var t=wt(),r=t.queue;if(r===null)throw Error(z(311));r.lastRenderedReducer=e;var s=Te,a=s.baseQueue,i=r.pending;if(i!==null){if(a!==null){var o=a.next;a.next=i.next,i.next=o}s.baseQueue=a=i,r.pending=null}if(a!==null){i=a.next,s=s.baseState;var l=o=null,c=null,d=i;do{var h=d.lane;if((Gr&h)===h)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),s=d.hasEagerState?d.eagerState:e(s,d.action);else{var u={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=u,o=s):c=c.next=u,me.lanes|=h,Kr|=h}d=d.next}while(d!==null&&d!==i);c===null?o=s:c.next=l,zt(s,t.memoizedState)||(rt=!0),t.memoizedState=s,t.baseState=o,t.baseQueue=c,r.lastRenderedState=s}if(e=r.interleaved,e!==null){a=e;do i=a.lane,me.lanes|=i,Kr|=i,a=a.next;while(a!==e)}else a===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function yo(e){var t=wt(),r=t.queue;if(r===null)throw Error(z(311));r.lastRenderedReducer=e;var s=r.dispatch,a=r.pending,i=t.memoizedState;if(a!==null){r.pending=null;var o=a=a.next;do i=e(i,o.action),o=o.next;while(o!==a);zt(i,t.memoizedState)||(rt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),r.lastRenderedState=i}return[i,s]}function wp(){}function kp(e,t){var r=me,s=wt(),a=t(),i=!zt(s.memoizedState,a);if(i&&(s.memoizedState=a,rt=!0),s=s.queue,Sc(Sp.bind(null,r,s,e),[e]),s.getSnapshot!==t||i||Ae!==null&&Ae.memoizedState.tag&1){if(r.flags|=2048,Hs(9,Np.bind(null,r,s,a,t),void 0,null),ze===null)throw Error(z(349));Gr&30||jp(r,t,a)}return a}function jp(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=me.updateQueue,t===null?(t={lastEffect:null,stores:null},me.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Np(e,t,r,s){t.value=r,t.getSnapshot=s,_p(t)&&Cp(e)}function Sp(e,t,r){return r(function(){_p(t)&&Cp(e)})}function _p(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!zt(e,r)}catch{return!0}}function Cp(e){var t=Xt(e,1);t!==null&&At(t,e,1,-1)}function Dd(e){var t=It();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ms,lastRenderedState:e},t.queue=e,e=e.dispatch=nx.bind(null,me,e),[t.memoizedState,e]}function Hs(e,t,r,s){return e={tag:e,create:t,destroy:r,deps:s,next:null},t=me.updateQueue,t===null?(t={lastEffect:null,stores:null},me.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,t.lastEffect=e)),e}function Tp(){return wt().memoizedState}function Ga(e,t,r,s){var a=It();me.flags|=e,a.memoizedState=Hs(1|t,r,void 0,s===void 0?null:s)}function Ii(e,t,r,s){var a=wt();s=s===void 0?null:s;var i=void 0;if(Te!==null){var o=Te.memoizedState;if(i=o.destroy,s!==null&&kc(s,o.deps)){a.memoizedState=Hs(t,r,i,s);return}}me.flags|=e,a.memoizedState=Hs(1|t,r,i,s)}function Ud(e,t){return Ga(8390656,8,e,t)}function Sc(e,t){return Ii(2048,8,e,t)}function Ep(e,t){return Ii(4,2,e,t)}function Ap(e,t){return Ii(4,4,e,t)}function zp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Pp(e,t,r){return r=r!=null?r.concat([e]):null,Ii(4,4,zp.bind(null,t,e),r)}function _c(){}function Rp(e,t){var r=wt();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&kc(t,s[1])?s[0]:(r.memoizedState=[e,t],e)}function Op(e,t){var r=wt();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&kc(t,s[1])?s[0]:(e=e(),r.memoizedState=[e,t],e)}function Lp(e,t,r){return Gr&21?(zt(r,t)||(r=Bh(),me.lanes|=r,Kr|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,rt=!0),e.memoizedState=r)}function tx(e,t){var r=te;te=r!==0&&4>r?r:4,e(!0);var s=go.transition;go.transition={};try{e(!1),t()}finally{te=r,go.transition=s}}function Ip(){return wt().memoizedState}function rx(e,t,r){var s=wr(e);if(r={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null},$p(e))Dp(t,r);else if(r=yp(e,t,r,s),r!==null){var a=Je();At(r,e,s,a),Up(r,t,s)}}function nx(e,t,r){var s=wr(e),a={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null};if($p(e))Dp(t,a);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,l=i(o,r);if(a.hasEagerState=!0,a.eagerState=l,zt(l,o)){var c=t.interleaved;c===null?(a.next=a,xc(t)):(a.next=c.next,c.next=a),t.interleaved=a;return}}catch{}finally{}r=yp(e,t,a,s),r!==null&&(a=Je(),At(r,e,s,a),Up(r,t,s))}}function $p(e){var t=e.alternate;return e===me||t!==null&&t===me}function Dp(e,t){vs=gi=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Up(e,t,r){if(r&4194240){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,nc(e,r)}}var xi={readContext:bt,useCallback:Fe,useContext:Fe,useEffect:Fe,useImperativeHandle:Fe,useInsertionEffect:Fe,useLayoutEffect:Fe,useMemo:Fe,useReducer:Fe,useRef:Fe,useState:Fe,useDebugValue:Fe,useDeferredValue:Fe,useTransition:Fe,useMutableSource:Fe,useSyncExternalStore:Fe,useId:Fe,unstable_isNewReconciler:!1},sx={readContext:bt,useCallback:function(e,t){return It().memoizedState=[e,t===void 0?null:t],e},useContext:bt,useEffect:Ud,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Ga(4194308,4,zp.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Ga(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ga(4,2,e,t)},useMemo:function(e,t){var r=It();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var s=It();return t=r!==void 0?r(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=rx.bind(null,me,e),[s.memoizedState,e]},useRef:function(e){var t=It();return e={current:e},t.memoizedState=e},useState:Dd,useDebugValue:_c,useDeferredValue:function(e){return It().memoizedState=e},useTransition:function(){var e=Dd(!1),t=e[0];return e=tx.bind(null,e[1]),It().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var s=me,a=It();if(ue){if(r===void 0)throw Error(z(407));r=r()}else{if(r=t(),ze===null)throw Error(z(349));Gr&30||jp(s,t,r)}a.memoizedState=r;var i={value:r,getSnapshot:t};return a.queue=i,Ud(Sp.bind(null,s,i,e),[e]),s.flags|=2048,Hs(9,Np.bind(null,s,i,r,t),void 0,null),r},useId:function(){var e=It(),t=ze.identifierPrefix;if(ue){var r=Vt,s=Kt;r=(s&~(1<<32-Et(s)-1)).toString(32)+r,t=":"+t+"R"+r,r=Fs++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=ex++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},ax={readContext:bt,useCallback:Rp,useContext:bt,useEffect:Sc,useImperativeHandle:Pp,useInsertionEffect:Ep,useLayoutEffect:Ap,useMemo:Op,useReducer:xo,useRef:Tp,useState:function(){return xo(Ms)},useDebugValue:_c,useDeferredValue:function(e){var t=wt();return Lp(t,Te.memoizedState,e)},useTransition:function(){var e=xo(Ms)[0],t=wt().memoizedState;return[e,t]},useMutableSource:wp,useSyncExternalStore:kp,useId:Ip,unstable_isNewReconciler:!1},ix={readContext:bt,useCallback:Rp,useContext:bt,useEffect:Sc,useImperativeHandle:Pp,useInsertionEffect:Ep,useLayoutEffect:Ap,useMemo:Op,useReducer:yo,useRef:Tp,useState:function(){return yo(Ms)},useDebugValue:_c,useDeferredValue:function(e){var t=wt();return Te===null?t.memoizedState=e:Lp(t,Te.memoizedState,e)},useTransition:function(){var e=yo(Ms)[0],t=wt().memoizedState;return[e,t]},useMutableSource:wp,useSyncExternalStore:kp,useId:Ip,unstable_isNewReconciler:!1};function St(e,t){if(e&&e.defaultProps){t=ge({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function ul(e,t,r,s){t=e.memoizedState,r=r(s,t),r=r==null?t:ge({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var $i={isMounted:function(e){return(e=e._reactInternals)?Jr(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var s=Je(),a=wr(e),i=Yt(s,a);i.payload=t,r!=null&&(i.callback=r),t=vr(e,i,a),t!==null&&(At(t,e,a,s),Ha(t,e,a))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var s=Je(),a=wr(e),i=Yt(s,a);i.tag=1,i.payload=t,r!=null&&(i.callback=r),t=vr(e,i,a),t!==null&&(At(t,e,a,s),Ha(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Je(),s=wr(e),a=Yt(r,s);a.tag=2,t!=null&&(a.callback=t),t=vr(e,a,s),t!==null&&(At(t,e,s,r),Ha(t,e,s))}};function Bd(e,t,r,s,a,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,i,o):t.prototype&&t.prototype.isPureReactComponent?!Is(r,s)||!Is(a,i):!0}function Bp(e,t,r){var s=!1,a=Sr,i=t.contextType;return typeof i=="object"&&i!==null?i=bt(i):(a=st(t)?Hr:qe.current,s=t.contextTypes,i=(s=s!=null)?In(e,a):Sr),t=new t(r,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=$i,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=i),t}function Wd(e,t,r,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,s),t.state!==e&&$i.enqueueReplaceState(t,t.state,null)}function hl(e,t,r,s){var a=e.stateNode;a.props=r,a.state=e.memoizedState,a.refs={},yc(e);var i=t.contextType;typeof i=="object"&&i!==null?a.context=bt(i):(i=st(t)?Hr:qe.current,a.context=In(e,i)),a.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(ul(e,t,i,r),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&$i.enqueueReplaceState(a,a.state,null),fi(e,r,a,s),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Bn(e,t){try{var r="",s=t;do r+=Om(s),s=s.return;while(s);var a=r}catch(i){a=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:a,digest:null}}function vo(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function pl(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var ox=typeof WeakMap=="function"?WeakMap:Map;function Wp(e,t,r){r=Yt(-1,r),r.tag=3,r.payload={element:null};var s=t.value;return r.callback=function(){vi||(vi=!0,jl=s),pl(e,t)},r}function Fp(e,t,r){r=Yt(-1,r),r.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var a=t.value;r.payload=function(){return s(a)},r.callback=function(){pl(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){pl(e,t),typeof s!="function"&&(br===null?br=new Set([this]):br.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),r}function Fd(e,t,r){var s=e.pingCache;if(s===null){s=e.pingCache=new ox;var a=new Set;s.set(t,a)}else a=s.get(t),a===void 0&&(a=new Set,s.set(t,a));a.has(r)||(a.add(r),e=wx.bind(null,e,t,r),t.then(e,e))}function Md(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Hd(e,t,r,s,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Yt(-1,1),t.tag=2,vr(r,t,1))),r.lanes|=1),e)}var lx=er.ReactCurrentOwner,rt=!1;function Ye(e,t,r,s){t.child=e===null?xp(t,null,r,s):Dn(t,e.child,r,s)}function qd(e,t,r,s,a){r=r.render;var i=t.ref;return Pn(t,a),s=jc(e,t,r,s,i,a),r=Nc(),e!==null&&!rt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Zt(e,t,a)):(ue&&r&&uc(t),t.flags|=1,Ye(e,t,s,a),t.child)}function Gd(e,t,r,s,a){if(e===null){var i=r.type;return typeof i=="function"&&!Oc(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=i,Mp(e,t,i,s,a)):(e=Ja(r.type,null,s,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&a)){var o=i.memoizedProps;if(r=r.compare,r=r!==null?r:Is,r(o,s)&&e.ref===t.ref)return Zt(e,t,a)}return t.flags|=1,e=kr(i,s),e.ref=t.ref,e.return=t,t.child=e}function Mp(e,t,r,s,a){if(e!==null){var i=e.memoizedProps;if(Is(i,s)&&e.ref===t.ref)if(rt=!1,t.pendingProps=s=i,(e.lanes&a)!==0)e.flags&131072&&(rt=!0);else return t.lanes=e.lanes,Zt(e,t,a)}return fl(e,t,r,s,a)}function Hp(e,t,r){var s=t.pendingProps,a=s.children,i=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ie(Sn,ot),ot|=r;else{if(!(r&1073741824))return e=i!==null?i.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ie(Sn,ot),ot|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=i!==null?i.baseLanes:r,ie(Sn,ot),ot|=s}else i!==null?(s=i.baseLanes|r,t.memoizedState=null):s=r,ie(Sn,ot),ot|=s;return Ye(e,t,a,r),t.child}function qp(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function fl(e,t,r,s,a){var i=st(r)?Hr:qe.current;return i=In(t,i),Pn(t,a),r=jc(e,t,r,s,i,a),s=Nc(),e!==null&&!rt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Zt(e,t,a)):(ue&&s&&uc(t),t.flags|=1,Ye(e,t,r,a),t.child)}function Kd(e,t,r,s,a){if(st(r)){var i=!0;ci(t)}else i=!1;if(Pn(t,a),t.stateNode===null)Ka(e,t),Bp(t,r,s),hl(t,r,s,a),s=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var c=o.context,d=r.contextType;typeof d=="object"&&d!==null?d=bt(d):(d=st(r)?Hr:qe.current,d=In(t,d));var h=r.getDerivedStateFromProps,u=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";u||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==s||c!==d)&&Wd(t,o,s,d),or=!1;var p=t.memoizedState;o.state=p,fi(t,s,o,a),c=t.memoizedState,l!==s||p!==c||nt.current||or?(typeof h=="function"&&(ul(t,r,h,s),c=t.memoizedState),(l=or||Bd(t,r,l,s,p,c,d))?(u||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=c),o.props=s,o.state=c,o.context=d,s=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{o=t.stateNode,vp(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:St(t.type,l),o.props=d,u=t.pendingProps,p=o.context,c=r.contextType,typeof c=="object"&&c!==null?c=bt(c):(c=st(r)?Hr:qe.current,c=In(t,c));var x=r.getDerivedStateFromProps;(h=typeof x=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==u||p!==c)&&Wd(t,o,s,c),or=!1,p=t.memoizedState,o.state=p,fi(t,s,o,a);var v=t.memoizedState;l!==u||p!==v||nt.current||or?(typeof x=="function"&&(ul(t,r,x,s),v=t.memoizedState),(d=or||Bd(t,r,d,s,p,v,c)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(s,v,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(s,v,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=v),o.props=s,o.state=v,o.context=c,s=d):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),s=!1)}return ml(e,t,r,s,i,a)}function ml(e,t,r,s,a,i){qp(e,t);var o=(t.flags&128)!==0;if(!s&&!o)return a&&Pd(t,r,!1),Zt(e,t,i);s=t.stateNode,lx.current=t;var l=o&&typeof r.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&o?(t.child=Dn(t,e.child,null,i),t.child=Dn(t,null,l,i)):Ye(e,t,l,i),t.memoizedState=s.state,a&&Pd(t,r,!0),t.child}function Gp(e){var t=e.stateNode;t.pendingContext?zd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&zd(e,t.context,!1),vc(e,t.containerInfo)}function Vd(e,t,r,s,a){return $n(),pc(a),t.flags|=256,Ye(e,t,r,s),t.child}var gl={dehydrated:null,treeContext:null,retryLane:0};function xl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Kp(e,t,r){var s=t.pendingProps,a=fe.current,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(a&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),ie(fe,a&1),e===null)return cl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=s.children,e=s.fallback,i?(s=t.mode,i=t.child,o={mode:"hidden",children:o},!(s&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Bi(o,s,0,null),e=Mr(e,s,r,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=xl(r),t.memoizedState=gl,e):Cc(t,o));if(a=e.memoizedState,a!==null&&(l=a.dehydrated,l!==null))return cx(e,t,o,s,l,a,r);if(i){i=s.fallback,o=t.mode,a=e.child,l=a.sibling;var c={mode:"hidden",children:s.children};return!(o&1)&&t.child!==a?(s=t.child,s.childLanes=0,s.pendingProps=c,t.deletions=null):(s=kr(a,c),s.subtreeFlags=a.subtreeFlags&14680064),l!==null?i=kr(l,i):(i=Mr(i,o,r,null),i.flags|=2),i.return=t,s.return=t,s.sibling=i,t.child=s,s=i,i=t.child,o=e.child.memoizedState,o=o===null?xl(r):{baseLanes:o.baseLanes|r,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~r,t.memoizedState=gl,s}return i=e.child,e=i.sibling,s=kr(i,{mode:"visible",children:s.children}),!(t.mode&1)&&(s.lanes=r),s.return=t,s.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=s,t.memoizedState=null,s}function Cc(e,t){return t=Bi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ja(e,t,r,s){return s!==null&&pc(s),Dn(t,e.child,null,r),e=Cc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cx(e,t,r,s,a,i,o){if(r)return t.flags&256?(t.flags&=-257,s=vo(Error(z(422))),ja(e,t,o,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=s.fallback,a=t.mode,s=Bi({mode:"visible",children:s.children},a,0,null),i=Mr(i,a,o,null),i.flags|=2,s.return=t,i.return=t,s.sibling=i,t.child=s,t.mode&1&&Dn(t,e.child,null,o),t.child.memoizedState=xl(o),t.memoizedState=gl,i);if(!(t.mode&1))return ja(e,t,o,null);if(a.data==="$!"){if(s=a.nextSibling&&a.nextSibling.dataset,s)var l=s.dgst;return s=l,i=Error(z(419)),s=vo(i,s,void 0),ja(e,t,o,s)}if(l=(o&e.childLanes)!==0,rt||l){if(s=ze,s!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(s.suspendedLanes|o)?0:a,a!==0&&a!==i.retryLane&&(i.retryLane=a,Xt(e,a),At(s,e,a,-1))}return Rc(),s=vo(Error(z(421))),ja(e,t,o,s)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=kx.bind(null,e),a._reactRetry=t,null):(e=i.treeContext,ct=yr(a.nextSibling),dt=t,ue=!0,Tt=null,e!==null&&(gt[xt++]=Kt,gt[xt++]=Vt,gt[xt++]=qr,Kt=e.id,Vt=e.overflow,qr=t),t=Cc(t,s.children),t.flags|=4096,t)}function Yd(e,t,r){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),dl(e.return,t,r)}function bo(e,t,r,s,a){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:a}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=s,i.tail=r,i.tailMode=a)}function Vp(e,t,r){var s=t.pendingProps,a=s.revealOrder,i=s.tail;if(Ye(e,t,s.children,r),s=fe.current,s&2)s=s&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Yd(e,r,t);else if(e.tag===19)Yd(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(ie(fe,s),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(r=t.child,a=null;r!==null;)e=r.alternate,e!==null&&mi(e)===null&&(a=r),r=r.sibling;r=a,r===null?(a=t.child,t.child=null):(a=r.sibling,r.sibling=null),bo(t,!1,a,r,i);break;case"backwards":for(r=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&mi(e)===null){t.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}bo(t,!0,r,null,i);break;case"together":bo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ka(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Zt(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Kr|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(z(153));if(t.child!==null){for(e=t.child,r=kr(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=kr(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function dx(e,t,r){switch(t.tag){case 3:Gp(t),$n();break;case 5:bp(t);break;case 1:st(t.type)&&ci(t);break;case 4:vc(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,a=t.memoizedProps.value;ie(hi,s._currentValue),s._currentValue=a;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(ie(fe,fe.current&1),t.flags|=128,null):r&t.child.childLanes?Kp(e,t,r):(ie(fe,fe.current&1),e=Zt(e,t,r),e!==null?e.sibling:null);ie(fe,fe.current&1);break;case 19:if(s=(r&t.childLanes)!==0,e.flags&128){if(s)return Vp(e,t,r);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),ie(fe,fe.current),s)break;return null;case 22:case 23:return t.lanes=0,Hp(e,t,r)}return Zt(e,t,r)}var Yp,yl,Jp,Qp;Yp=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};yl=function(){};Jp=function(e,t,r,s){var a=e.memoizedProps;if(a!==s){e=t.stateNode,Br(Wt.current);var i=null;switch(r){case"input":a=Bo(e,a),s=Bo(e,s),i=[];break;case"select":a=ge({},a,{value:void 0}),s=ge({},s,{value:void 0}),i=[];break;case"textarea":a=Mo(e,a),s=Mo(e,s),i=[];break;default:typeof a.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=oi)}qo(r,s);var o;r=null;for(d in a)if(!s.hasOwnProperty(d)&&a.hasOwnProperty(d)&&a[d]!=null)if(d==="style"){var l=a[d];for(o in l)l.hasOwnProperty(o)&&(r||(r={}),r[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Es.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in s){var c=s[d];if(l=a!=null?a[d]:void 0,s.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(r||(r={}),r[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(r||(r={}),r[o]=c[o])}else r||(i||(i=[]),i.push(d,r)),r=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Es.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&oe("scroll",e),i||l===c||(i=[])):(i=i||[]).push(d,c))}r&&(i=i||[]).push("style",r);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};Qp=function(e,t,r,s){r!==s&&(t.flags|=4)};function rs(e,t){if(!ue)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Me(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(t)for(var a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags&14680064,s|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=s,e.childLanes=r,t}function ux(e,t,r){var s=t.pendingProps;switch(hc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Me(t),null;case 1:return st(t.type)&&li(),Me(t),null;case 3:return s=t.stateNode,Un(),le(nt),le(qe),wc(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(wa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Tt!==null&&(_l(Tt),Tt=null))),yl(e,t),Me(t),null;case 5:bc(t);var a=Br(Ws.current);if(r=t.type,e!==null&&t.stateNode!=null)Jp(e,t,r,s,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(z(166));return Me(t),null}if(e=Br(Wt.current),wa(t)){s=t.stateNode,r=t.type;var i=t.memoizedProps;switch(s[Ut]=t,s[Us]=i,e=(t.mode&1)!==0,r){case"dialog":oe("cancel",s),oe("close",s);break;case"iframe":case"object":case"embed":oe("load",s);break;case"video":case"audio":for(a=0;a<ds.length;a++)oe(ds[a],s);break;case"source":oe("error",s);break;case"img":case"image":case"link":oe("error",s),oe("load",s);break;case"details":oe("toggle",s);break;case"input":sd(s,i),oe("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!i.multiple},oe("invalid",s);break;case"textarea":id(s,i),oe("invalid",s)}qo(r,i),a=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?s.textContent!==l&&(i.suppressHydrationWarning!==!0&&ba(s.textContent,l,e),a=["children",l]):typeof l=="number"&&s.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&ba(s.textContent,l,e),a=["children",""+l]):Es.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&oe("scroll",s)}switch(r){case"input":ha(s),ad(s,i,!0);break;case"textarea":ha(s),od(s);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(s.onclick=oi)}s=a,t.updateQueue=s,s!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Sh(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=o.createElement(r,{is:s.is}):(e=o.createElement(r),r==="select"&&(o=e,s.multiple?o.multiple=!0:s.size&&(o.size=s.size))):e=o.createElementNS(e,r),e[Ut]=t,e[Us]=s,Yp(e,t,!1,!1),t.stateNode=e;e:{switch(o=Go(r,s),r){case"dialog":oe("cancel",e),oe("close",e),a=s;break;case"iframe":case"object":case"embed":oe("load",e),a=s;break;case"video":case"audio":for(a=0;a<ds.length;a++)oe(ds[a],e);a=s;break;case"source":oe("error",e),a=s;break;case"img":case"image":case"link":oe("error",e),oe("load",e),a=s;break;case"details":oe("toggle",e),a=s;break;case"input":sd(e,s),a=Bo(e,s),oe("invalid",e);break;case"option":a=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},a=ge({},s,{value:void 0}),oe("invalid",e);break;case"textarea":id(e,s),a=Mo(e,s),oe("invalid",e);break;default:a=s}qo(r,a),l=a;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?Th(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&_h(e,c)):i==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&As(e,c):typeof c=="number"&&As(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Es.hasOwnProperty(i)?c!=null&&i==="onScroll"&&oe("scroll",e):c!=null&&Ql(e,i,c,o))}switch(r){case"input":ha(e),ad(e,s,!1);break;case"textarea":ha(e),od(e);break;case"option":s.value!=null&&e.setAttribute("value",""+Nr(s.value));break;case"select":e.multiple=!!s.multiple,i=s.value,i!=null?Tn(e,!!s.multiple,i,!1):s.defaultValue!=null&&Tn(e,!!s.multiple,s.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=oi)}switch(r){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Me(t),null;case 6:if(e&&t.stateNode!=null)Qp(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(z(166));if(r=Br(Ws.current),Br(Wt.current),wa(t)){if(s=t.stateNode,r=t.memoizedProps,s[Ut]=t,(i=s.nodeValue!==r)&&(e=dt,e!==null))switch(e.tag){case 3:ba(s.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ba(s.nodeValue,r,(e.mode&1)!==0)}i&&(t.flags|=4)}else s=(r.nodeType===9?r:r.ownerDocument).createTextNode(s),s[Ut]=t,t.stateNode=s}return Me(t),null;case 13:if(le(fe),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ue&&ct!==null&&t.mode&1&&!(t.flags&128))mp(),$n(),t.flags|=98560,i=!1;else if(i=wa(t),s!==null&&s.dehydrated!==null){if(e===null){if(!i)throw Error(z(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(z(317));i[Ut]=t}else $n(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Me(t),i=!1}else Tt!==null&&(_l(Tt),Tt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,t.mode&1&&(e===null||fe.current&1?Ee===0&&(Ee=3):Rc())),t.updateQueue!==null&&(t.flags|=4),Me(t),null);case 4:return Un(),yl(e,t),e===null&&$s(t.stateNode.containerInfo),Me(t),null;case 10:return gc(t.type._context),Me(t),null;case 17:return st(t.type)&&li(),Me(t),null;case 19:if(le(fe),i=t.memoizedState,i===null)return Me(t),null;if(s=(t.flags&128)!==0,o=i.rendering,o===null)if(s)rs(i,!1);else{if(Ee!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=mi(e),o!==null){for(t.flags|=128,rs(i,!1),s=o.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=r,r=t.child;r!==null;)i=r,e=s,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return ie(fe,fe.current&1|2),t.child}e=e.sibling}i.tail!==null&&we()>Wn&&(t.flags|=128,s=!0,rs(i,!1),t.lanes=4194304)}else{if(!s)if(e=mi(o),e!==null){if(t.flags|=128,s=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),rs(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!ue)return Me(t),null}else 2*we()-i.renderingStartTime>Wn&&r!==1073741824&&(t.flags|=128,s=!0,rs(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(r=i.last,r!==null?r.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=we(),t.sibling=null,r=fe.current,ie(fe,s?r&1|2:r&1),t):(Me(t),null);case 22:case 23:return Pc(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&t.mode&1?ot&1073741824&&(Me(t),t.subtreeFlags&6&&(t.flags|=8192)):Me(t),null;case 24:return null;case 25:return null}throw Error(z(156,t.tag))}function hx(e,t){switch(hc(t),t.tag){case 1:return st(t.type)&&li(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Un(),le(nt),le(qe),wc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return bc(t),null;case 13:if(le(fe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(z(340));$n()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return le(fe),null;case 4:return Un(),null;case 10:return gc(t.type._context),null;case 22:case 23:return Pc(),null;case 24:return null;default:return null}}var Na=!1,He=!1,px=typeof WeakSet=="function"?WeakSet:Set,U=null;function Nn(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(s){ve(e,t,s)}else r.current=null}function vl(e,t,r){try{r()}catch(s){ve(e,t,s)}}var Jd=!1;function fx(e,t){if(rl=si,e=rp(),dc(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var a=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var o=0,l=-1,c=-1,d=0,h=0,u=e,p=null;t:for(;;){for(var x;u!==r||a!==0&&u.nodeType!==3||(l=o+a),u!==i||s!==0&&u.nodeType!==3||(c=o+s),u.nodeType===3&&(o+=u.nodeValue.length),(x=u.firstChild)!==null;)p=u,u=x;for(;;){if(u===e)break t;if(p===r&&++d===a&&(l=o),p===i&&++h===s&&(c=o),(x=u.nextSibling)!==null)break;u=p,p=u.parentNode}u=x}r=l===-1||c===-1?null:{start:l,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(nl={focusedElem:e,selectionRange:r},si=!1,U=t;U!==null;)if(t=U,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,U=e;else for(;U!==null;){t=U;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var b=v.memoizedProps,w=v.memoizedState,g=t.stateNode,f=g.getSnapshotBeforeUpdate(t.elementType===t.type?b:St(t.type,b),w);g.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(z(163))}}catch(k){ve(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,U=e;break}U=t.return}return v=Jd,Jd=!1,v}function bs(e,t,r){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&e)===e){var i=a.destroy;a.destroy=void 0,i!==void 0&&vl(t,r,i)}a=a.next}while(a!==s)}}function Di(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var s=r.create;r.destroy=s()}r=r.next}while(r!==t)}}function bl(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Xp(e){var t=e.alternate;t!==null&&(e.alternate=null,Xp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ut],delete t[Us],delete t[il],delete t[Jg],delete t[Qg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Zp(e){return e.tag===5||e.tag===3||e.tag===4}function Qd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Zp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function wl(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=oi));else if(s!==4&&(e=e.child,e!==null))for(wl(e,t,r),e=e.sibling;e!==null;)wl(e,t,r),e=e.sibling}function kl(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(kl(e,t,r),e=e.sibling;e!==null;)kl(e,t,r),e=e.sibling}var $e=null,Ct=!1;function ar(e,t,r){for(r=r.child;r!==null;)ef(e,t,r),r=r.sibling}function ef(e,t,r){if(Bt&&typeof Bt.onCommitFiberUnmount=="function")try{Bt.onCommitFiberUnmount(Ai,r)}catch{}switch(r.tag){case 5:He||Nn(r,t);case 6:var s=$e,a=Ct;$e=null,ar(e,t,r),$e=s,Ct=a,$e!==null&&(Ct?(e=$e,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):$e.removeChild(r.stateNode));break;case 18:$e!==null&&(Ct?(e=$e,r=r.stateNode,e.nodeType===8?po(e.parentNode,r):e.nodeType===1&&po(e,r),Os(e)):po($e,r.stateNode));break;case 4:s=$e,a=Ct,$e=r.stateNode.containerInfo,Ct=!0,ar(e,t,r),$e=s,Ct=a;break;case 0:case 11:case 14:case 15:if(!He&&(s=r.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){a=s=s.next;do{var i=a,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&vl(r,t,o),a=a.next}while(a!==s)}ar(e,t,r);break;case 1:if(!He&&(Nn(r,t),s=r.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=r.memoizedProps,s.state=r.memoizedState,s.componentWillUnmount()}catch(l){ve(r,t,l)}ar(e,t,r);break;case 21:ar(e,t,r);break;case 22:r.mode&1?(He=(s=He)||r.memoizedState!==null,ar(e,t,r),He=s):ar(e,t,r);break;default:ar(e,t,r)}}function Xd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new px),t.forEach(function(s){var a=jx.bind(null,e,s);r.has(s)||(r.add(s),s.then(a,a))})}}function jt(e,t){var r=t.deletions;if(r!==null)for(var s=0;s<r.length;s++){var a=r[s];try{var i=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:$e=l.stateNode,Ct=!1;break e;case 3:$e=l.stateNode.containerInfo,Ct=!0;break e;case 4:$e=l.stateNode.containerInfo,Ct=!0;break e}l=l.return}if($e===null)throw Error(z(160));ef(i,o,a),$e=null,Ct=!1;var c=a.alternate;c!==null&&(c.return=null),a.return=null}catch(d){ve(a,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)tf(t,e),t=t.sibling}function tf(e,t){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(jt(t,e),Ot(e),s&4){try{bs(3,e,e.return),Di(3,e)}catch(b){ve(e,e.return,b)}try{bs(5,e,e.return)}catch(b){ve(e,e.return,b)}}break;case 1:jt(t,e),Ot(e),s&512&&r!==null&&Nn(r,r.return);break;case 5:if(jt(t,e),Ot(e),s&512&&r!==null&&Nn(r,r.return),e.flags&32){var a=e.stateNode;try{As(a,"")}catch(b){ve(e,e.return,b)}}if(s&4&&(a=e.stateNode,a!=null)){var i=e.memoizedProps,o=r!==null?r.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&jh(a,i),Go(l,o);var d=Go(l,i);for(o=0;o<c.length;o+=2){var h=c[o],u=c[o+1];h==="style"?Th(a,u):h==="dangerouslySetInnerHTML"?_h(a,u):h==="children"?As(a,u):Ql(a,h,u,d)}switch(l){case"input":Wo(a,i);break;case"textarea":Nh(a,i);break;case"select":var p=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!i.multiple;var x=i.value;x!=null?Tn(a,!!i.multiple,x,!1):p!==!!i.multiple&&(i.defaultValue!=null?Tn(a,!!i.multiple,i.defaultValue,!0):Tn(a,!!i.multiple,i.multiple?[]:"",!1))}a[Us]=i}catch(b){ve(e,e.return,b)}}break;case 6:if(jt(t,e),Ot(e),s&4){if(e.stateNode===null)throw Error(z(162));a=e.stateNode,i=e.memoizedProps;try{a.nodeValue=i}catch(b){ve(e,e.return,b)}}break;case 3:if(jt(t,e),Ot(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{Os(t.containerInfo)}catch(b){ve(e,e.return,b)}break;case 4:jt(t,e),Ot(e);break;case 13:jt(t,e),Ot(e),a=e.child,a.flags&8192&&(i=a.memoizedState!==null,a.stateNode.isHidden=i,!i||a.alternate!==null&&a.alternate.memoizedState!==null||(Ac=we())),s&4&&Xd(e);break;case 22:if(h=r!==null&&r.memoizedState!==null,e.mode&1?(He=(d=He)||h,jt(t,e),He=d):jt(t,e),Ot(e),s&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(U=e,h=e.child;h!==null;){for(u=U=h;U!==null;){switch(p=U,x=p.child,p.tag){case 0:case 11:case 14:case 15:bs(4,p,p.return);break;case 1:Nn(p,p.return);var v=p.stateNode;if(typeof v.componentWillUnmount=="function"){s=p,r=p.return;try{t=s,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(b){ve(s,r,b)}}break;case 5:Nn(p,p.return);break;case 22:if(p.memoizedState!==null){eu(u);continue}}x!==null?(x.return=p,U=x):eu(u)}h=h.sibling}e:for(h=null,u=e;;){if(u.tag===5){if(h===null){h=u;try{a=u.stateNode,d?(i=a.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=u.stateNode,c=u.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Ch("display",o))}catch(b){ve(e,e.return,b)}}}else if(u.tag===6){if(h===null)try{u.stateNode.nodeValue=d?"":u.memoizedProps}catch(b){ve(e,e.return,b)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===e)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break e;for(;u.sibling===null;){if(u.return===null||u.return===e)break e;h===u&&(h=null),u=u.return}h===u&&(h=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:jt(t,e),Ot(e),s&4&&Xd(e);break;case 21:break;default:jt(t,e),Ot(e)}}function Ot(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Zp(r)){var s=r;break e}r=r.return}throw Error(z(160))}switch(s.tag){case 5:var a=s.stateNode;s.flags&32&&(As(a,""),s.flags&=-33);var i=Qd(e);kl(e,i,a);break;case 3:case 4:var o=s.stateNode.containerInfo,l=Qd(e);wl(e,l,o);break;default:throw Error(z(161))}}catch(c){ve(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function mx(e,t,r){U=e,rf(e)}function rf(e,t,r){for(var s=(e.mode&1)!==0;U!==null;){var a=U,i=a.child;if(a.tag===22&&s){var o=a.memoizedState!==null||Na;if(!o){var l=a.alternate,c=l!==null&&l.memoizedState!==null||He;l=Na;var d=He;if(Na=o,(He=c)&&!d)for(U=a;U!==null;)o=U,c=o.child,o.tag===22&&o.memoizedState!==null?tu(a):c!==null?(c.return=o,U=c):tu(a);for(;i!==null;)U=i,rf(i),i=i.sibling;U=a,Na=l,He=d}Zd(e)}else a.subtreeFlags&8772&&i!==null?(i.return=a,U=i):Zd(e)}}function Zd(e){for(;U!==null;){var t=U;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:He||Di(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!He)if(r===null)s.componentDidMount();else{var a=t.elementType===t.type?r.memoizedProps:St(t.type,r.memoizedProps);s.componentDidUpdate(a,r.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&$d(t,i,s);break;case 3:var o=t.updateQueue;if(o!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}$d(t,o,r)}break;case 5:var l=t.stateNode;if(r===null&&t.flags&4){r=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var u=h.dehydrated;u!==null&&Os(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(z(163))}He||t.flags&512&&bl(t)}catch(p){ve(t,t.return,p)}}if(t===e){U=null;break}if(r=t.sibling,r!==null){r.return=t.return,U=r;break}U=t.return}}function eu(e){for(;U!==null;){var t=U;if(t===e){U=null;break}var r=t.sibling;if(r!==null){r.return=t.return,U=r;break}U=t.return}}function tu(e){for(;U!==null;){var t=U;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Di(4,t)}catch(c){ve(t,r,c)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var a=t.return;try{s.componentDidMount()}catch(c){ve(t,a,c)}}var i=t.return;try{bl(t)}catch(c){ve(t,i,c)}break;case 5:var o=t.return;try{bl(t)}catch(c){ve(t,o,c)}}}catch(c){ve(t,t.return,c)}if(t===e){U=null;break}var l=t.sibling;if(l!==null){l.return=t.return,U=l;break}U=t.return}}var gx=Math.ceil,yi=er.ReactCurrentDispatcher,Tc=er.ReactCurrentOwner,vt=er.ReactCurrentBatchConfig,Z=0,ze=null,_e=null,De=0,ot=0,Sn=Cr(0),Ee=0,qs=null,Kr=0,Ui=0,Ec=0,ws=null,tt=null,Ac=0,Wn=1/0,Mt=null,vi=!1,jl=null,br=null,Sa=!1,pr=null,bi=0,ks=0,Nl=null,Va=-1,Ya=0;function Je(){return Z&6?we():Va!==-1?Va:Va=we()}function wr(e){return e.mode&1?Z&2&&De!==0?De&-De:Zg.transition!==null?(Ya===0&&(Ya=Bh()),Ya):(e=te,e!==0||(e=window.event,e=e===void 0?16:Kh(e.type)),e):1}function At(e,t,r,s){if(50<ks)throw ks=0,Nl=null,Error(z(185));sa(e,r,s),(!(Z&2)||e!==ze)&&(e===ze&&(!(Z&2)&&(Ui|=r),Ee===4&&cr(e,De)),at(e,s),r===1&&Z===0&&!(t.mode&1)&&(Wn=we()+500,Li&&Tr()))}function at(e,t){var r=e.callbackNode;Zm(e,t);var s=ni(e,e===ze?De:0);if(s===0)r!==null&&dd(r),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(r!=null&&dd(r),t===1)e.tag===0?Xg(ru.bind(null,e)):hp(ru.bind(null,e)),Vg(function(){!(Z&6)&&Tr()}),r=null;else{switch(Wh(s)){case 1:r=rc;break;case 4:r=Dh;break;case 16:r=ri;break;case 536870912:r=Uh;break;default:r=ri}r=uf(r,nf.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function nf(e,t){if(Va=-1,Ya=0,Z&6)throw Error(z(327));var r=e.callbackNode;if(Rn()&&e.callbackNode!==r)return null;var s=ni(e,e===ze?De:0);if(s===0)return null;if(s&30||s&e.expiredLanes||t)t=wi(e,s);else{t=s;var a=Z;Z|=2;var i=af();(ze!==e||De!==t)&&(Mt=null,Wn=we()+500,Fr(e,t));do try{vx();break}catch(l){sf(e,l)}while(!0);mc(),yi.current=i,Z=a,_e!==null?t=0:(ze=null,De=0,t=Ee)}if(t!==0){if(t===2&&(a=Qo(e),a!==0&&(s=a,t=Sl(e,a))),t===1)throw r=qs,Fr(e,0),cr(e,s),at(e,we()),r;if(t===6)cr(e,s);else{if(a=e.current.alternate,!(s&30)&&!xx(a)&&(t=wi(e,s),t===2&&(i=Qo(e),i!==0&&(s=i,t=Sl(e,i))),t===1))throw r=qs,Fr(e,0),cr(e,s),at(e,we()),r;switch(e.finishedWork=a,e.finishedLanes=s,t){case 0:case 1:throw Error(z(345));case 2:Lr(e,tt,Mt);break;case 3:if(cr(e,s),(s&130023424)===s&&(t=Ac+500-we(),10<t)){if(ni(e,0)!==0)break;if(a=e.suspendedLanes,(a&s)!==s){Je(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=al(Lr.bind(null,e,tt,Mt),t);break}Lr(e,tt,Mt);break;case 4:if(cr(e,s),(s&4194240)===s)break;for(t=e.eventTimes,a=-1;0<s;){var o=31-Et(s);i=1<<o,o=t[o],o>a&&(a=o),s&=~i}if(s=a,s=we()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*gx(s/1960))-s,10<s){e.timeoutHandle=al(Lr.bind(null,e,tt,Mt),s);break}Lr(e,tt,Mt);break;case 5:Lr(e,tt,Mt);break;default:throw Error(z(329))}}}return at(e,we()),e.callbackNode===r?nf.bind(null,e):null}function Sl(e,t){var r=ws;return e.current.memoizedState.isDehydrated&&(Fr(e,t).flags|=256),e=wi(e,t),e!==2&&(t=tt,tt=r,t!==null&&_l(t)),e}function _l(e){tt===null?tt=e:tt.push.apply(tt,e)}function xx(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var s=0;s<r.length;s++){var a=r[s],i=a.getSnapshot;a=a.value;try{if(!zt(i(),a))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function cr(e,t){for(t&=~Ec,t&=~Ui,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Et(t),s=1<<r;e[r]=-1,t&=~s}}function ru(e){if(Z&6)throw Error(z(327));Rn();var t=ni(e,0);if(!(t&1))return at(e,we()),null;var r=wi(e,t);if(e.tag!==0&&r===2){var s=Qo(e);s!==0&&(t=s,r=Sl(e,s))}if(r===1)throw r=qs,Fr(e,0),cr(e,t),at(e,we()),r;if(r===6)throw Error(z(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Lr(e,tt,Mt),at(e,we()),null}function zc(e,t){var r=Z;Z|=1;try{return e(t)}finally{Z=r,Z===0&&(Wn=we()+500,Li&&Tr())}}function Vr(e){pr!==null&&pr.tag===0&&!(Z&6)&&Rn();var t=Z;Z|=1;var r=vt.transition,s=te;try{if(vt.transition=null,te=1,e)return e()}finally{te=s,vt.transition=r,Z=t,!(Z&6)&&Tr()}}function Pc(){ot=Sn.current,le(Sn)}function Fr(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,Kg(r)),_e!==null)for(r=_e.return;r!==null;){var s=r;switch(hc(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&li();break;case 3:Un(),le(nt),le(qe),wc();break;case 5:bc(s);break;case 4:Un();break;case 13:le(fe);break;case 19:le(fe);break;case 10:gc(s.type._context);break;case 22:case 23:Pc()}r=r.return}if(ze=e,_e=e=kr(e.current,null),De=ot=t,Ee=0,qs=null,Ec=Ui=Kr=0,tt=ws=null,Ur!==null){for(t=0;t<Ur.length;t++)if(r=Ur[t],s=r.interleaved,s!==null){r.interleaved=null;var a=s.next,i=r.pending;if(i!==null){var o=i.next;i.next=a,s.next=o}r.pending=s}Ur=null}return e}function sf(e,t){do{var r=_e;try{if(mc(),qa.current=xi,gi){for(var s=me.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}gi=!1}if(Gr=0,Ae=Te=me=null,vs=!1,Fs=0,Tc.current=null,r===null||r.return===null){Ee=1,qs=t,_e=null;break}e:{var i=e,o=r.return,l=r,c=t;if(t=De,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,h=l,u=h.tag;if(!(h.mode&1)&&(u===0||u===11||u===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var x=Md(o);if(x!==null){x.flags&=-257,Hd(x,o,l,i,t),x.mode&1&&Fd(i,d,t),t=x,c=d;var v=t.updateQueue;if(v===null){var b=new Set;b.add(c),t.updateQueue=b}else v.add(c);break e}else{if(!(t&1)){Fd(i,d,t),Rc();break e}c=Error(z(426))}}else if(ue&&l.mode&1){var w=Md(o);if(w!==null){!(w.flags&65536)&&(w.flags|=256),Hd(w,o,l,i,t),pc(Bn(c,l));break e}}i=c=Bn(c,l),Ee!==4&&(Ee=2),ws===null?ws=[i]:ws.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var g=Wp(i,c,t);Id(i,g);break e;case 1:l=c;var f=i.type,m=i.stateNode;if(!(i.flags&128)&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(br===null||!br.has(m)))){i.flags|=65536,t&=-t,i.lanes|=t;var k=Fp(i,l,t);Id(i,k);break e}}i=i.return}while(i!==null)}lf(r)}catch(N){t=N,_e===r&&r!==null&&(_e=r=r.return);continue}break}while(!0)}function af(){var e=yi.current;return yi.current=xi,e===null?xi:e}function Rc(){(Ee===0||Ee===3||Ee===2)&&(Ee=4),ze===null||!(Kr&268435455)&&!(Ui&268435455)||cr(ze,De)}function wi(e,t){var r=Z;Z|=2;var s=af();(ze!==e||De!==t)&&(Mt=null,Fr(e,t));do try{yx();break}catch(a){sf(e,a)}while(!0);if(mc(),Z=r,yi.current=s,_e!==null)throw Error(z(261));return ze=null,De=0,Ee}function yx(){for(;_e!==null;)of(_e)}function vx(){for(;_e!==null&&!Hm();)of(_e)}function of(e){var t=df(e.alternate,e,ot);e.memoizedProps=e.pendingProps,t===null?lf(e):_e=t,Tc.current=null}function lf(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=hx(r,t),r!==null){r.flags&=32767,_e=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ee=6,_e=null;return}}else if(r=ux(r,t,ot),r!==null){_e=r;return}if(t=t.sibling,t!==null){_e=t;return}_e=t=e}while(t!==null);Ee===0&&(Ee=5)}function Lr(e,t,r){var s=te,a=vt.transition;try{vt.transition=null,te=1,bx(e,t,r,s)}finally{vt.transition=a,te=s}return null}function bx(e,t,r,s){do Rn();while(pr!==null);if(Z&6)throw Error(z(327));r=e.finishedWork;var a=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(z(177));e.callbackNode=null,e.callbackPriority=0;var i=r.lanes|r.childLanes;if(eg(e,i),e===ze&&(_e=ze=null,De=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Sa||(Sa=!0,uf(ri,function(){return Rn(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=vt.transition,vt.transition=null;var o=te;te=1;var l=Z;Z|=4,Tc.current=null,fx(e,r),tf(r,e),Bg(nl),si=!!rl,nl=rl=null,e.current=r,mx(r),qm(),Z=l,te=o,vt.transition=i}else e.current=r;if(Sa&&(Sa=!1,pr=e,bi=a),i=e.pendingLanes,i===0&&(br=null),Vm(r.stateNode),at(e,we()),t!==null)for(s=e.onRecoverableError,r=0;r<t.length;r++)a=t[r],s(a.value,{componentStack:a.stack,digest:a.digest});if(vi)throw vi=!1,e=jl,jl=null,e;return bi&1&&e.tag!==0&&Rn(),i=e.pendingLanes,i&1?e===Nl?ks++:(ks=0,Nl=e):ks=0,Tr(),null}function Rn(){if(pr!==null){var e=Wh(bi),t=vt.transition,r=te;try{if(vt.transition=null,te=16>e?16:e,pr===null)var s=!1;else{if(e=pr,pr=null,bi=0,Z&6)throw Error(z(331));var a=Z;for(Z|=4,U=e.current;U!==null;){var i=U,o=i.child;if(U.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(U=d;U!==null;){var h=U;switch(h.tag){case 0:case 11:case 15:bs(8,h,i)}var u=h.child;if(u!==null)u.return=h,U=u;else for(;U!==null;){h=U;var p=h.sibling,x=h.return;if(Xp(h),h===d){U=null;break}if(p!==null){p.return=x,U=p;break}U=x}}}var v=i.alternate;if(v!==null){var b=v.child;if(b!==null){v.child=null;do{var w=b.sibling;b.sibling=null,b=w}while(b!==null)}}U=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,U=o;else e:for(;U!==null;){if(i=U,i.flags&2048)switch(i.tag){case 0:case 11:case 15:bs(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,U=g;break e}U=i.return}}var f=e.current;for(U=f;U!==null;){o=U;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,U=m;else e:for(o=f;U!==null;){if(l=U,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Di(9,l)}}catch(N){ve(l,l.return,N)}if(l===o){U=null;break e}var k=l.sibling;if(k!==null){k.return=l.return,U=k;break e}U=l.return}}if(Z=a,Tr(),Bt&&typeof Bt.onPostCommitFiberRoot=="function")try{Bt.onPostCommitFiberRoot(Ai,e)}catch{}s=!0}return s}finally{te=r,vt.transition=t}}return!1}function nu(e,t,r){t=Bn(r,t),t=Wp(e,t,1),e=vr(e,t,1),t=Je(),e!==null&&(sa(e,1,t),at(e,t))}function ve(e,t,r){if(e.tag===3)nu(e,e,r);else for(;t!==null;){if(t.tag===3){nu(t,e,r);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(br===null||!br.has(s))){e=Bn(r,e),e=Fp(t,e,1),t=vr(t,e,1),e=Je(),t!==null&&(sa(t,1,e),at(t,e));break}}t=t.return}}function wx(e,t,r){var s=e.pingCache;s!==null&&s.delete(t),t=Je(),e.pingedLanes|=e.suspendedLanes&r,ze===e&&(De&r)===r&&(Ee===4||Ee===3&&(De&130023424)===De&&500>we()-Ac?Fr(e,0):Ec|=r),at(e,t)}function cf(e,t){t===0&&(e.mode&1?(t=ma,ma<<=1,!(ma&130023424)&&(ma=4194304)):t=1);var r=Je();e=Xt(e,t),e!==null&&(sa(e,t,r),at(e,r))}function kx(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),cf(e,r)}function jx(e,t){var r=0;switch(e.tag){case 13:var s=e.stateNode,a=e.memoizedState;a!==null&&(r=a.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(z(314))}s!==null&&s.delete(t),cf(e,r)}var df;df=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||nt.current)rt=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return rt=!1,dx(e,t,r);rt=!!(e.flags&131072)}else rt=!1,ue&&t.flags&1048576&&pp(t,ui,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;Ka(e,t),e=t.pendingProps;var a=In(t,qe.current);Pn(t,r),a=jc(null,t,s,e,a,r);var i=Nc();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,st(s)?(i=!0,ci(t)):i=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,yc(t),a.updater=$i,t.stateNode=a,a._reactInternals=t,hl(t,s,e,r),t=ml(null,t,s,!0,i,r)):(t.tag=0,ue&&i&&uc(t),Ye(null,t,a,r),t=t.child),t;case 16:s=t.elementType;e:{switch(Ka(e,t),e=t.pendingProps,a=s._init,s=a(s._payload),t.type=s,a=t.tag=Sx(s),e=St(s,e),a){case 0:t=fl(null,t,s,e,r);break e;case 1:t=Kd(null,t,s,e,r);break e;case 11:t=qd(null,t,s,e,r);break e;case 14:t=Gd(null,t,s,St(s.type,e),r);break e}throw Error(z(306,s,""))}return t;case 0:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:St(s,a),fl(e,t,s,a,r);case 1:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:St(s,a),Kd(e,t,s,a,r);case 3:e:{if(Gp(t),e===null)throw Error(z(387));s=t.pendingProps,i=t.memoizedState,a=i.element,vp(e,t),fi(t,s,null,r);var o=t.memoizedState;if(s=o.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){a=Bn(Error(z(423)),t),t=Vd(e,t,s,r,a);break e}else if(s!==a){a=Bn(Error(z(424)),t),t=Vd(e,t,s,r,a);break e}else for(ct=yr(t.stateNode.containerInfo.firstChild),dt=t,ue=!0,Tt=null,r=xp(t,null,s,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if($n(),s===a){t=Zt(e,t,r);break e}Ye(e,t,s,r)}t=t.child}return t;case 5:return bp(t),e===null&&cl(t),s=t.type,a=t.pendingProps,i=e!==null?e.memoizedProps:null,o=a.children,sl(s,a)?o=null:i!==null&&sl(s,i)&&(t.flags|=32),qp(e,t),Ye(e,t,o,r),t.child;case 6:return e===null&&cl(t),null;case 13:return Kp(e,t,r);case 4:return vc(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=Dn(t,null,s,r):Ye(e,t,s,r),t.child;case 11:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:St(s,a),qd(e,t,s,a,r);case 7:return Ye(e,t,t.pendingProps,r),t.child;case 8:return Ye(e,t,t.pendingProps.children,r),t.child;case 12:return Ye(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(s=t.type._context,a=t.pendingProps,i=t.memoizedProps,o=a.value,ie(hi,s._currentValue),s._currentValue=o,i!==null)if(zt(i.value,o)){if(i.children===a.children&&!nt.current){t=Zt(e,t,r);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var c=l.firstContext;c!==null;){if(c.context===s){if(i.tag===1){c=Yt(-1,r&-r),c.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?c.next=c:(c.next=h.next,h.next=c),d.pending=c}}i.lanes|=r,c=i.alternate,c!==null&&(c.lanes|=r),dl(i.return,r,t),l.lanes|=r;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(z(341));o.lanes|=r,l=o.alternate,l!==null&&(l.lanes|=r),dl(o,r,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Ye(e,t,a.children,r),t=t.child}return t;case 9:return a=t.type,s=t.pendingProps.children,Pn(t,r),a=bt(a),s=s(a),t.flags|=1,Ye(e,t,s,r),t.child;case 14:return s=t.type,a=St(s,t.pendingProps),a=St(s.type,a),Gd(e,t,s,a,r);case 15:return Mp(e,t,t.type,t.pendingProps,r);case 17:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:St(s,a),Ka(e,t),t.tag=1,st(s)?(e=!0,ci(t)):e=!1,Pn(t,r),Bp(t,s,a),hl(t,s,a,r),ml(null,t,s,!0,e,r);case 19:return Vp(e,t,r);case 22:return Hp(e,t,r)}throw Error(z(156,t.tag))};function uf(e,t){return $h(e,t)}function Nx(e,t,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function yt(e,t,r,s){return new Nx(e,t,r,s)}function Oc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Sx(e){if(typeof e=="function")return Oc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Zl)return 11;if(e===ec)return 14}return 2}function kr(e,t){var r=e.alternate;return r===null?(r=yt(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Ja(e,t,r,s,a,i){var o=2;if(s=e,typeof e=="function")Oc(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case mn:return Mr(r.children,a,i,t);case Xl:o=8,a|=8;break;case Io:return e=yt(12,r,t,a|2),e.elementType=Io,e.lanes=i,e;case $o:return e=yt(13,r,t,a),e.elementType=$o,e.lanes=i,e;case Do:return e=yt(19,r,t,a),e.elementType=Do,e.lanes=i,e;case bh:return Bi(r,a,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case yh:o=10;break e;case vh:o=9;break e;case Zl:o=11;break e;case ec:o=14;break e;case ir:o=16,s=null;break e}throw Error(z(130,e==null?e:typeof e,""))}return t=yt(o,r,t,a),t.elementType=e,t.type=s,t.lanes=i,t}function Mr(e,t,r,s){return e=yt(7,e,s,t),e.lanes=r,e}function Bi(e,t,r,s){return e=yt(22,e,s,t),e.elementType=bh,e.lanes=r,e.stateNode={isHidden:!1},e}function wo(e,t,r){return e=yt(6,e,null,t),e.lanes=r,e}function ko(e,t,r){return t=yt(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function _x(e,t,r,s,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=to(0),this.expirationTimes=to(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=to(0),this.identifierPrefix=s,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Lc(e,t,r,s,a,i,o,l,c){return e=new _x(e,t,r,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=yt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:s,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},yc(i),e}function Cx(e,t,r){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fn,key:s==null?null:""+s,children:e,containerInfo:t,implementation:r}}function hf(e){if(!e)return Sr;e=e._reactInternals;e:{if(Jr(e)!==e||e.tag!==1)throw Error(z(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(st(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(z(171))}if(e.tag===1){var r=e.type;if(st(r))return up(e,r,t)}return t}function pf(e,t,r,s,a,i,o,l,c){return e=Lc(r,s,!0,e,a,i,o,l,c),e.context=hf(null),r=e.current,s=Je(),a=wr(r),i=Yt(s,a),i.callback=t??null,vr(r,i,a),e.current.lanes=a,sa(e,a,s),at(e,s),e}function Wi(e,t,r,s){var a=t.current,i=Je(),o=wr(a);return r=hf(r),t.context===null?t.context=r:t.pendingContext=r,t=Yt(i,o),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=vr(a,t,o),e!==null&&(At(e,a,o,i),Ha(e,a,o)),o}function ki(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function su(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Ic(e,t){su(e,t),(e=e.alternate)&&su(e,t)}function Tx(){return null}var ff=typeof reportError=="function"?reportError:function(e){console.error(e)};function $c(e){this._internalRoot=e}Fi.prototype.render=$c.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(z(409));Wi(e,t,null,null)};Fi.prototype.unmount=$c.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Vr(function(){Wi(null,e,null,null)}),t[Qt]=null}};function Fi(e){this._internalRoot=e}Fi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Hh();e={blockedOn:null,target:e,priority:t};for(var r=0;r<lr.length&&t!==0&&t<lr[r].priority;r++);lr.splice(r,0,e),r===0&&Gh(e)}};function Dc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Mi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function au(){}function Ex(e,t,r,s,a){if(a){if(typeof s=="function"){var i=s;s=function(){var d=ki(o);i.call(d)}}var o=pf(t,s,e,0,null,!1,!1,"",au);return e._reactRootContainer=o,e[Qt]=o.current,$s(e.nodeType===8?e.parentNode:e),Vr(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof s=="function"){var l=s;s=function(){var d=ki(c);l.call(d)}}var c=Lc(e,0,!1,null,null,!1,!1,"",au);return e._reactRootContainer=c,e[Qt]=c.current,$s(e.nodeType===8?e.parentNode:e),Vr(function(){Wi(t,c,r,s)}),c}function Hi(e,t,r,s,a){var i=r._reactRootContainer;if(i){var o=i;if(typeof a=="function"){var l=a;a=function(){var c=ki(o);l.call(c)}}Wi(t,o,e,a)}else o=Ex(r,t,e,a,s);return ki(o)}Fh=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=cs(t.pendingLanes);r!==0&&(nc(t,r|1),at(t,we()),!(Z&6)&&(Wn=we()+500,Tr()))}break;case 13:Vr(function(){var s=Xt(e,1);if(s!==null){var a=Je();At(s,e,1,a)}}),Ic(e,1)}};sc=function(e){if(e.tag===13){var t=Xt(e,134217728);if(t!==null){var r=Je();At(t,e,134217728,r)}Ic(e,134217728)}};Mh=function(e){if(e.tag===13){var t=wr(e),r=Xt(e,t);if(r!==null){var s=Je();At(r,e,t,s)}Ic(e,t)}};Hh=function(){return te};qh=function(e,t){var r=te;try{return te=e,t()}finally{te=r}};Vo=function(e,t,r){switch(t){case"input":if(Wo(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var s=r[t];if(s!==e&&s.form===e.form){var a=Oi(s);if(!a)throw Error(z(90));kh(s),Wo(s,a)}}}break;case"textarea":Nh(e,r);break;case"select":t=r.value,t!=null&&Tn(e,!!r.multiple,t,!1)}};zh=zc;Ph=Vr;var Ax={usingClientEntryPoint:!1,Events:[ia,vn,Oi,Eh,Ah,zc]},ns={findFiberByHostInstance:Dr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},zx={bundleType:ns.bundleType,version:ns.version,rendererPackageName:ns.rendererPackageName,rendererConfig:ns.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:er.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Lh(e),e===null?null:e.stateNode},findFiberByHostInstance:ns.findFiberByHostInstance||Tx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _a=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_a.isDisabled&&_a.supportsFiber)try{Ai=_a.inject(zx),Bt=_a}catch{}}ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ax;ht.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Dc(t))throw Error(z(200));return Cx(e,t,null,r)};ht.createRoot=function(e,t){if(!Dc(e))throw Error(z(299));var r=!1,s="",a=ff;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Lc(e,1,!1,null,null,r,!1,s,a),e[Qt]=t.current,$s(e.nodeType===8?e.parentNode:e),new $c(t)};ht.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(z(188)):(e=Object.keys(e).join(","),Error(z(268,e)));return e=Lh(t),e=e===null?null:e.stateNode,e};ht.flushSync=function(e){return Vr(e)};ht.hydrate=function(e,t,r){if(!Mi(t))throw Error(z(200));return Hi(null,e,t,!0,r)};ht.hydrateRoot=function(e,t,r){if(!Dc(e))throw Error(z(405));var s=r!=null&&r.hydratedSources||null,a=!1,i="",o=ff;if(r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(o=r.onRecoverableError)),t=pf(t,null,e,1,r??null,a,!1,i,o),e[Qt]=t.current,$s(e),s)for(e=0;e<s.length;e++)r=s[e],a=r._getVersion,a=a(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,a]:t.mutableSourceEagerHydrationData.push(r,a);return new Fi(t)};ht.render=function(e,t,r){if(!Mi(t))throw Error(z(200));return Hi(null,e,t,!1,r)};ht.unmountComponentAtNode=function(e){if(!Mi(e))throw Error(z(40));return e._reactRootContainer?(Vr(function(){Hi(null,null,e,!1,function(){e._reactRootContainer=null,e[Qt]=null})}),!0):!1};ht.unstable_batchedUpdates=zc;ht.unstable_renderSubtreeIntoContainer=function(e,t,r,s){if(!Mi(r))throw Error(z(200));if(e==null||e._reactInternals===void 0)throw Error(z(38));return Hi(e,t,r,!1,s)};ht.version="18.3.1-next-f1338f8080-20240426";function mf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mf)}catch(e){console.error(e)}}mf(),fh.exports=ht;var Px=fh.exports,iu=Px;Oo.createRoot=iu.createRoot,Oo.hydrateRoot=iu.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Gs(){return Gs=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},Gs.apply(this,arguments)}var fr;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(fr||(fr={}));const ou="popstate";function Rx(e){e===void 0&&(e={});function t(s,a){let{pathname:i,search:o,hash:l}=s.location;return Cl("",{pathname:i,search:o,hash:l},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function r(s,a){return typeof a=="string"?a:ji(a)}return Lx(t,r,null,e)}function ke(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Uc(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ox(){return Math.random().toString(36).substr(2,8)}function lu(e,t){return{usr:e.state,key:e.key,idx:t}}function Cl(e,t,r,s){return r===void 0&&(r=null),Gs({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?qn(t):t,{state:r,key:t&&t.key||s||Ox()})}function ji(e){let{pathname:t="/",search:r="",hash:s=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),s&&s!=="#"&&(t+=s.charAt(0)==="#"?s:"#"+s),t}function qn(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let s=e.indexOf("?");s>=0&&(t.search=e.substr(s),e=e.substr(0,s)),e&&(t.pathname=e)}return t}function Lx(e,t,r,s){s===void 0&&(s={});let{window:a=document.defaultView,v5Compat:i=!1}=s,o=a.history,l=fr.Pop,c=null,d=h();d==null&&(d=0,o.replaceState(Gs({},o.state,{idx:d}),""));function h(){return(o.state||{idx:null}).idx}function u(){l=fr.Pop;let w=h(),g=w==null?null:w-d;d=w,c&&c({action:l,location:b.location,delta:g})}function p(w,g){l=fr.Push;let f=Cl(b.location,w,g);d=h()+1;let m=lu(f,d),k=b.createHref(f);try{o.pushState(m,"",k)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;a.location.assign(k)}i&&c&&c({action:l,location:b.location,delta:1})}function x(w,g){l=fr.Replace;let f=Cl(b.location,w,g);d=h();let m=lu(f,d),k=b.createHref(f);o.replaceState(m,"",k),i&&c&&c({action:l,location:b.location,delta:0})}function v(w){let g=a.location.origin!=="null"?a.location.origin:a.location.href,f=typeof w=="string"?w:ji(w);return f=f.replace(/ $/,"%20"),ke(g,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,g)}let b={get action(){return l},get location(){return e(a,o)},listen(w){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(ou,u),c=w,()=>{a.removeEventListener(ou,u),c=null}},createHref(w){return t(a,w)},createURL:v,encodeLocation(w){let g=v(w);return{pathname:g.pathname,search:g.search,hash:g.hash}},push:p,replace:x,go(w){return o.go(w)}};return b}var cu;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(cu||(cu={}));function Ix(e,t,r){return r===void 0&&(r="/"),$x(e,t,r)}function $x(e,t,r,s){let a=typeof t=="string"?qn(t):t,i=Bc(a.pathname||"/",r);if(i==null)return null;let o=gf(e);Dx(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let d=Jx(i);l=Kx(o[c],d)}return l}function gf(e,t,r,s){t===void 0&&(t=[]),r===void 0&&(r=[]),s===void 0&&(s="");let a=(i,o,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&(ke(c.relativePath.startsWith(s),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(s.length));let d=jr([s,c.relativePath]),h=r.concat(c);i.children&&i.children.length>0&&(ke(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),gf(i.children,t,h,d)),!(i.path==null&&!i.index)&&t.push({path:d,score:qx(d,i.index),routesMeta:h})};return e.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))a(i,o);else for(let c of xf(i.path))a(i,o,c)}),t}function xf(e){let t=e.split("/");if(t.length===0)return[];let[r,...s]=t,a=r.endsWith("?"),i=r.replace(/\?$/,"");if(s.length===0)return a?[i,""]:[i];let o=xf(s.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),a&&l.push(...o),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Dx(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Gx(t.routesMeta.map(s=>s.childrenIndex),r.routesMeta.map(s=>s.childrenIndex)))}const Ux=/^:[\w-]+$/,Bx=3,Wx=2,Fx=1,Mx=10,Hx=-2,du=e=>e==="*";function qx(e,t){let r=e.split("/"),s=r.length;return r.some(du)&&(s+=Hx),t&&(s+=Wx),r.filter(a=>!du(a)).reduce((a,i)=>a+(Ux.test(i)?Bx:i===""?Fx:Mx),s)}function Gx(e,t){return e.length===t.length&&e.slice(0,-1).every((s,a)=>s===t[a])?e[e.length-1]-t[t.length-1]:0}function Kx(e,t,r){let{routesMeta:s}=e,a={},i="/",o=[];for(let l=0;l<s.length;++l){let c=s[l],d=l===s.length-1,h=i==="/"?t:t.slice(i.length)||"/",u=Vx({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},h),p=c.route;if(!u)return null;Object.assign(a,u.params),o.push({params:a,pathname:jr([i,u.pathname]),pathnameBase:ty(jr([i,u.pathnameBase])),route:p}),u.pathnameBase!=="/"&&(i=jr([i,u.pathnameBase]))}return o}function Vx(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,s]=Yx(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:s.reduce((d,h,u)=>{let{paramName:p,isOptional:x}=h;if(p==="*"){let b=l[u]||"";o=i.slice(0,i.length-b.length).replace(/(.)\/+$/,"$1")}const v=l[u];return x&&!v?d[p]=void 0:d[p]=(v||"").replace(/%2F/g,"/"),d},{}),pathname:i,pathnameBase:o,pattern:e}}function Yx(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Uc(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let s=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c)=>(s.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(s.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),s]}function Jx(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Uc(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Bc(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,s=e.charAt(r);return s&&s!=="/"?null:e.slice(r)||"/"}const Qx=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Xx=e=>Qx.test(e);function Zx(e,t){t===void 0&&(t="/");let{pathname:r,search:s="",hash:a=""}=typeof e=="string"?qn(e):e,i;if(r)if(Xx(r))i=r;else{if(r.includes("//")){let o=r;r=r.replace(/\/\/+/g,"/"),Uc(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+r))}r.startsWith("/")?i=uu(r.substring(1),"/"):i=uu(r,t)}else i=t;return{pathname:i,search:ry(s),hash:ny(a)}}function uu(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?r.length>1&&r.pop():a!=="."&&r.push(a)}),r.length>1?r.join("/"):"/"}function jo(e,t,r,s){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ey(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Wc(e,t){let r=ey(e);return t?r.map((s,a)=>a===r.length-1?s.pathname:s.pathnameBase):r.map(s=>s.pathnameBase)}function Fc(e,t,r,s){s===void 0&&(s=!1);let a;typeof e=="string"?a=qn(e):(a=Gs({},e),ke(!a.pathname||!a.pathname.includes("?"),jo("?","pathname","search",a)),ke(!a.pathname||!a.pathname.includes("#"),jo("#","pathname","hash",a)),ke(!a.search||!a.search.includes("#"),jo("#","search","hash",a)));let i=e===""||a.pathname==="",o=i?"/":a.pathname,l;if(o==null)l=r;else{let u=t.length-1;if(!s&&o.startsWith("..")){let p=o.split("/");for(;p[0]==="..";)p.shift(),u-=1;a.pathname=p.join("/")}l=u>=0?t[u]:"/"}let c=Zx(a,l),d=o&&o!=="/"&&o.endsWith("/"),h=(i||o===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||h)&&(c.pathname+="/"),c}const jr=e=>e.join("/").replace(/\/\/+/g,"/"),ty=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),ry=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ny=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function sy(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const yf=["post","put","patch","delete"];new Set(yf);const ay=["get",...yf];new Set(ay);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ks(){return Ks=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},Ks.apply(this,arguments)}const Mc=y.createContext(null),iy=y.createContext(null),Er=y.createContext(null),qi=y.createContext(null),tr=y.createContext({outlet:null,matches:[],isDataRoute:!1}),vf=y.createContext(null);function oy(e,t){let{relative:r}=t===void 0?{}:t;Gn()||ke(!1);let{basename:s,navigator:a}=y.useContext(Er),{hash:i,pathname:o,search:l}=wf(e,{relative:r}),c=o;return s!=="/"&&(c=o==="/"?s:jr([s,o])),a.createHref({pathname:c,search:l,hash:i})}function Gn(){return y.useContext(qi)!=null}function Ar(){return Gn()||ke(!1),y.useContext(qi).location}function bf(e){y.useContext(Er).static||y.useLayoutEffect(e)}function re(){let{isDataRoute:e}=y.useContext(tr);return e?by():ly()}function ly(){Gn()||ke(!1);let e=y.useContext(Mc),{basename:t,future:r,navigator:s}=y.useContext(Er),{matches:a}=y.useContext(tr),{pathname:i}=Ar(),o=JSON.stringify(Wc(a,r.v7_relativeSplatPath)),l=y.useRef(!1);return bf(()=>{l.current=!0}),y.useCallback(function(d,h){if(h===void 0&&(h={}),!l.current)return;if(typeof d=="number"){s.go(d);return}let u=Fc(d,JSON.parse(o),i,h.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:jr([t,u.pathname])),(h.replace?s.replace:s.push)(u,h.state,h)},[t,s,o,i,e])}function Hc(){let{matches:e}=y.useContext(tr),t=e[e.length-1];return t?t.params:{}}function wf(e,t){let{relative:r}=t===void 0?{}:t,{future:s}=y.useContext(Er),{matches:a}=y.useContext(tr),{pathname:i}=Ar(),o=JSON.stringify(Wc(a,s.v7_relativeSplatPath));return y.useMemo(()=>Fc(e,JSON.parse(o),i,r==="path"),[e,o,i,r])}function cy(e,t){return dy(e,t)}function dy(e,t,r,s){Gn()||ke(!1);let{navigator:a}=y.useContext(Er),{matches:i}=y.useContext(tr),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let d=Ar(),h;if(t){var u;let w=typeof t=="string"?qn(t):t;c==="/"||(u=w.pathname)!=null&&u.startsWith(c)||ke(!1),h=w}else h=d;let p=h.pathname||"/",x=p;if(c!=="/"){let w=c.replace(/^\//,"").split("/");x="/"+p.replace(/^\//,"").split("/").slice(w.length).join("/")}let v=Ix(e,{pathname:x}),b=my(v&&v.map(w=>Object.assign({},w,{params:Object.assign({},l,w.params),pathname:jr([c,a.encodeLocation?a.encodeLocation(w.pathname).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?c:jr([c,a.encodeLocation?a.encodeLocation(w.pathnameBase).pathname:w.pathnameBase])})),i,r,s);return t&&b?y.createElement(qi.Provider,{value:{location:Ks({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:fr.Pop}},b):b}function uy(){let e=vy(),t=sy(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return y.createElement(y.Fragment,null,y.createElement("h2",null,"Unexpected Application Error!"),y.createElement("h3",{style:{fontStyle:"italic"}},t),r?y.createElement("pre",{style:a},r):null,null)}const hy=y.createElement(uy,null);class py extends y.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?y.createElement(tr.Provider,{value:this.props.routeContext},y.createElement(vf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function fy(e){let{routeContext:t,match:r,children:s}=e,a=y.useContext(Mc);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),y.createElement(tr.Provider,{value:t},s)}function my(e,t,r,s){var a;if(t===void 0&&(t=[]),r===void 0&&(r=null),s===void 0&&(s=null),e==null){var i;if(!r)return null;if(r.errors)e=r.matches;else if((i=s)!=null&&i.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,l=(a=r)==null?void 0:a.errors;if(l!=null){let h=o.findIndex(u=>u.route.id&&(l==null?void 0:l[u.route.id])!==void 0);h>=0||ke(!1),o=o.slice(0,Math.min(o.length,h+1))}let c=!1,d=-1;if(r&&s&&s.v7_partialHydration)for(let h=0;h<o.length;h++){let u=o[h];if((u.route.HydrateFallback||u.route.hydrateFallbackElement)&&(d=h),u.route.id){let{loaderData:p,errors:x}=r,v=u.route.loader&&p[u.route.id]===void 0&&(!x||x[u.route.id]===void 0);if(u.route.lazy||v){c=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((h,u,p)=>{let x,v=!1,b=null,w=null;r&&(x=l&&u.route.id?l[u.route.id]:void 0,b=u.route.errorElement||hy,c&&(d<0&&p===0?(wy("route-fallback"),v=!0,w=null):d===p&&(v=!0,w=u.route.hydrateFallbackElement||null)));let g=t.concat(o.slice(0,p+1)),f=()=>{let m;return x?m=b:v?m=w:u.route.Component?m=y.createElement(u.route.Component,null):u.route.element?m=u.route.element:m=h,y.createElement(fy,{match:u,routeContext:{outlet:h,matches:g,isDataRoute:r!=null},children:m})};return r&&(u.route.ErrorBoundary||u.route.errorElement||p===0)?y.createElement(py,{location:r.location,revalidation:r.revalidation,component:b,error:x,children:f(),routeContext:{outlet:null,matches:g,isDataRoute:!0}}):f()},null)}var kf=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(kf||{}),jf=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(jf||{});function gy(e){let t=y.useContext(Mc);return t||ke(!1),t}function xy(e){let t=y.useContext(iy);return t||ke(!1),t}function yy(e){let t=y.useContext(tr);return t||ke(!1),t}function Nf(e){let t=yy(),r=t.matches[t.matches.length-1];return r.route.id||ke(!1),r.route.id}function vy(){var e;let t=y.useContext(vf),r=xy(),s=Nf();return t!==void 0?t:(e=r.errors)==null?void 0:e[s]}function by(){let{router:e}=gy(kf.UseNavigateStable),t=Nf(jf.UseNavigateStable),r=y.useRef(!1);return bf(()=>{r.current=!0}),y.useCallback(function(a,i){i===void 0&&(i={}),r.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,Ks({fromRouteId:t},i)))},[e,t])}const hu={};function wy(e,t,r){hu[e]||(hu[e]=!0)}function ky(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function js(e){let{to:t,replace:r,state:s,relative:a}=e;Gn()||ke(!1);let{future:i,static:o}=y.useContext(Er),{matches:l}=y.useContext(tr),{pathname:c}=Ar(),d=re(),h=Fc(t,Wc(l,i.v7_relativeSplatPath),c,a==="path"),u=JSON.stringify(h);return y.useEffect(()=>d(JSON.parse(u),{replace:r,state:s,relative:a}),[d,u,a,r,s]),null}function X(e){ke(!1)}function jy(e){let{basename:t="/",children:r=null,location:s,navigationType:a=fr.Pop,navigator:i,static:o=!1,future:l}=e;Gn()&&ke(!1);let c=t.replace(/^\/*/,"/"),d=y.useMemo(()=>({basename:c,navigator:i,static:o,future:Ks({v7_relativeSplatPath:!1},l)}),[c,l,i,o]);typeof s=="string"&&(s=qn(s));let{pathname:h="/",search:u="",hash:p="",state:x=null,key:v="default"}=s,b=y.useMemo(()=>{let w=Bc(h,c);return w==null?null:{location:{pathname:w,search:u,hash:p,state:x,key:v},navigationType:a}},[c,h,u,p,x,v,a]);return b==null?null:y.createElement(Er.Provider,{value:d},y.createElement(qi.Provider,{children:r,value:b}))}function Ny(e){let{children:t,location:r}=e;return cy(Tl(t),r)}new Promise(()=>{});function Tl(e,t){t===void 0&&(t=[]);let r=[];return y.Children.forEach(e,(s,a)=>{if(!y.isValidElement(s))return;let i=[...t,a];if(s.type===y.Fragment){r.push.apply(r,Tl(s.props.children,i));return}s.type!==X&&ke(!1),!s.props.index||!s.props.children||ke(!1);let o={id:s.props.id||i.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(o.children=Tl(s.props.children,i)),r.push(o)}),r}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function El(){return El=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},El.apply(this,arguments)}function Sy(e,t){if(e==null)return{};var r={},s=Object.keys(e),a,i;for(i=0;i<s.length;i++)a=s[i],!(t.indexOf(a)>=0)&&(r[a]=e[a]);return r}function _y(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Cy(e,t){return e.button===0&&(!t||t==="_self")&&!_y(e)}function Al(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,r)=>{let s=e[r];return t.concat(Array.isArray(s)?s.map(a=>[r,a]):[[r,s]])},[]))}function Ty(e,t){let r=Al(e);return t&&t.forEach((s,a)=>{r.has(a)||t.getAll(a).forEach(i=>{r.append(a,i)})}),r}const Ey=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Ay="6";try{window.__reactRouterVersion=Ay}catch{}const zy="startTransition",pu=wm[zy];function Py(e){let{basename:t,children:r,future:s,window:a}=e,i=y.useRef();i.current==null&&(i.current=Rx({window:a,v5Compat:!0}));let o=i.current,[l,c]=y.useState({action:o.action,location:o.location}),{v7_startTransition:d}=s||{},h=y.useCallback(u=>{d&&pu?pu(()=>c(u)):c(u)},[c,d]);return y.useLayoutEffect(()=>o.listen(h),[o,h]),y.useEffect(()=>ky(s),[s]),y.createElement(jy,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:o,future:s})}const Ry=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Oy=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_n=y.forwardRef(function(t,r){let{onClick:s,relative:a,reloadDocument:i,replace:o,state:l,target:c,to:d,preventScrollReset:h,viewTransition:u}=t,p=Sy(t,Ey),{basename:x}=y.useContext(Er),v,b=!1;if(typeof d=="string"&&Oy.test(d)&&(v=d,Ry))try{let m=new URL(window.location.href),k=d.startsWith("//")?new URL(m.protocol+d):new URL(d),N=Bc(k.pathname,x);k.origin===m.origin&&N!=null?d=N+k.search+k.hash:b=!0}catch{}let w=oy(d,{relative:a}),g=Ly(d,{replace:o,state:l,target:c,preventScrollReset:h,relative:a,viewTransition:u});function f(m){s&&s(m),m.defaultPrevented||g(m)}return y.createElement("a",El({},p,{href:v||w,onClick:b||i?s:f,ref:r,target:c}))});var fu;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(fu||(fu={}));var mu;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(mu||(mu={}));function Ly(e,t){let{target:r,replace:s,state:a,preventScrollReset:i,relative:o,viewTransition:l}=t===void 0?{}:t,c=re(),d=Ar(),h=wf(e,{relative:o});return y.useCallback(u=>{if(Cy(u,r)){u.preventDefault();let p=s!==void 0?s:ji(d)===ji(h);c(e,{replace:p,state:a,preventScrollReset:i,relative:o,viewTransition:l})}},[d,c,h,s,a,r,e,i,o,l])}function Sf(e){let t=y.useRef(Al(e)),r=y.useRef(!1),s=Ar(),a=y.useMemo(()=>Ty(s.search,r.current?null:t.current),[s.search]),i=re(),o=y.useCallback((l,c)=>{const d=Al(typeof l=="function"?l(a):l);r.current=!0,i("?"+d,c)},[i,a]);return[a,o]}function Gi(e,t){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(r[s[a]]=e[s[a]]);return r}function Iy(e,t,r,s){function a(i){return i instanceof r?i:new r(function(o){o(i)})}return new(r||(r=Promise))(function(i,o){function l(h){try{d(s.next(h))}catch(u){o(u)}}function c(h){try{d(s.throw(h))}catch(u){o(u)}}function d(h){h.done?i(h.value):a(h.value).then(l,c)}d((s=s.apply(e,t||[])).next())})}const $y=e=>e?(...t)=>e(...t):(...t)=>fetch(...t);class qc extends Error{constructor(t,r="FunctionsError",s){super(t),this.name=r,this.context=s}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class Dy extends qc{constructor(t){super("Failed to send a request to the Edge Function","FunctionsFetchError",t)}}class gu extends qc{constructor(t){super("Relay Error invoking the Edge Function","FunctionsRelayError",t)}}class xu extends qc{constructor(t){super("Edge Function returned a non-2xx status code","FunctionsHttpError",t)}}var zl;(function(e){e.Any="any",e.ApNortheast1="ap-northeast-1",e.ApNortheast2="ap-northeast-2",e.ApSouth1="ap-south-1",e.ApSoutheast1="ap-southeast-1",e.ApSoutheast2="ap-southeast-2",e.CaCentral1="ca-central-1",e.EuCentral1="eu-central-1",e.EuWest1="eu-west-1",e.EuWest2="eu-west-2",e.EuWest3="eu-west-3",e.SaEast1="sa-east-1",e.UsEast1="us-east-1",e.UsWest1="us-west-1",e.UsWest2="us-west-2"})(zl||(zl={}));class Uy{constructor(t,{headers:r={},customFetch:s,region:a=zl.Any}={}){this.url=t,this.headers=r,this.region=a,this.fetch=$y(s)}setAuth(t){this.headers.Authorization=`Bearer ${t}`}invoke(t){return Iy(this,arguments,void 0,function*(r,s={}){var a;let i,o;try{const{headers:l,method:c,body:d,signal:h,timeout:u}=s;let p={},{region:x}=s;x||(x=this.region);const v=new URL(`${this.url}/${r}`);x&&x!=="any"&&(p["x-region"]=x,v.searchParams.set("forceFunctionRegion",x));let b;d&&(l&&!Object.prototype.hasOwnProperty.call(l,"Content-Type")||!l)?typeof Blob<"u"&&d instanceof Blob||d instanceof ArrayBuffer?(p["Content-Type"]="application/octet-stream",b=d):typeof d=="string"?(p["Content-Type"]="text/plain",b=d):typeof FormData<"u"&&d instanceof FormData?b=d:(p["Content-Type"]="application/json",b=JSON.stringify(d)):d&&typeof d!="string"&&!(typeof Blob<"u"&&d instanceof Blob)&&!(d instanceof ArrayBuffer)&&!(typeof FormData<"u"&&d instanceof FormData)?b=JSON.stringify(d):b=d;let w=h;u&&(o=new AbortController,i=setTimeout(()=>o.abort(),u),h?(w=o.signal,h.addEventListener("abort",()=>o.abort())):w=o.signal);const g=yield this.fetch(v.toString(),{method:c||"POST",headers:Object.assign(Object.assign(Object.assign({},p),this.headers),l),body:b,signal:w}).catch(N=>{throw new Dy(N)}),f=g.headers.get("x-relay-error");if(f&&f==="true")throw new gu(g);if(!g.ok)throw new xu(g);let m=((a=g.headers.get("Content-Type"))!==null&&a!==void 0?a:"text/plain").split(";")[0].trim(),k;return m==="application/json"?k=yield g.json():m==="application/octet-stream"||m==="application/pdf"?k=yield g.blob():m==="text/event-stream"?k=g:m==="multipart/form-data"?k=yield g.formData():k=yield g.text(),{data:k,error:null,response:g}}catch(l){return{data:null,error:l,response:l instanceof xu||l instanceof gu?l.context:void 0}}finally{i&&clearTimeout(i)}})}}const _f=3,yu=e=>Math.min(1e3*2**e,3e4),By=[520,503],Cf=["GET","HEAD","OPTIONS"];var Wy=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function vu(e,t){return new Promise(r=>{if(t!=null&&t.aborted){r();return}const s=setTimeout(()=>{t==null||t.removeEventListener("abort",a),r()},e);function a(){clearTimeout(s),r()}t==null||t.addEventListener("abort",a)})}function Fy(e,t,r,s){return!(!s||r>=_f||!Cf.includes(e)||!By.includes(t))}var My=class{constructor(e){var t,r,s,a,i;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=(t=e.shouldThrowOnError)!==null&&t!==void 0?t:!1,this.signal=e.signal,this.isMaybeSingle=(r=e.isMaybeSingle)!==null&&r!==void 0?r:!1,this.shouldStripNulls=(s=e.shouldStripNulls)!==null&&s!==void 0?s:!1,this.urlLengthLimit=(a=e.urlLengthLimit)!==null&&a!==void 0?a:8e3,this.retryEnabled=(i=e.retry)!==null&&i!==void 0?i:!0,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var r=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const o=this.headers.get("Accept");o==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!o||o==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const s=this.fetch;let i=(async()=>{let o=0;for(;;){const d=new Headers(r.headers);o>0&&d.set("X-Retry-Count",String(o));let h;try{h=await s(r.url.toString(),{method:r.method,headers:d,body:JSON.stringify(r.body,(u,p)=>typeof p=="bigint"?p.toString():p),signal:r.signal})}catch(u){if((u==null?void 0:u.name)==="AbortError"||(u==null?void 0:u.code)==="ABORT_ERR"||!Cf.includes(r.method))throw u;if(r.retryEnabled&&o<_f){const p=yu(o);o++,await vu(p,r.signal);continue}throw u}if(Fy(r.method,h.status,o,r.retryEnabled)){var l,c;const u=(l=(c=h.headers)===null||c===void 0?void 0:c.get("Retry-After"))!==null&&l!==void 0?l:null,p=u!==null?Math.max(0,parseInt(u,10)||0)*1e3:yu(o);await h.text(),o++,await vu(p,r.signal);continue}return await r.processResponse(h)}})();return this.shouldThrowOnError||(i=i.catch(o=>{var l;let c="",d="",h="";const u=o==null?void 0:o.cause;if(u){var p,x,v,b;const f=(p=u==null?void 0:u.message)!==null&&p!==void 0?p:"",m=(x=u==null?void 0:u.code)!==null&&x!==void 0?x:"";c=`${(v=o==null?void 0:o.name)!==null&&v!==void 0?v:"FetchError"}: ${o==null?void 0:o.message}`,c+=`

Caused by: ${(b=u==null?void 0:u.name)!==null&&b!==void 0?b:"Error"}: ${f}`,m&&(c+=` (${m})`),u!=null&&u.stack&&(c+=`
${u.stack}`)}else{var w;c=(w=o==null?void 0:o.stack)!==null&&w!==void 0?w:""}const g=this.url.toString().length;return(o==null?void 0:o.name)==="AbortError"||(o==null?void 0:o.code)==="ABORT_ERR"?(h="",d="Request was aborted (timeout or manual cancellation)",g>this.urlLengthLimit&&(d+=`. Note: Your request URL is ${g} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((u==null?void 0:u.name)==="HeadersOverflowError"||(u==null?void 0:u.code)==="UND_ERR_HEADERS_OVERFLOW")&&(h="",d="HTTP headers exceeded server limits (typically 16KB)",g>this.urlLengthLimit&&(d+=`. Your request URL is ${g} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(l=o==null?void 0:o.name)!==null&&l!==void 0?l:"FetchError"}: ${o==null?void 0:o.message}`,details:c,hint:d,code:h},data:null,count:null,status:0,statusText:""}})),i.then(e,t)}async processResponse(e){var t=this;let r=null,s=null,a=null,i=e.status,o=e.statusText;if(e.ok){var l,c;if(t.method!=="HEAD"){var d;const p=await e.text();p===""||(t.headers.get("Accept")==="text/csv"||t.headers.get("Accept")&&(!((d=t.headers.get("Accept"))===null||d===void 0)&&d.includes("application/vnd.pgrst.plan+text"))?s=p:s=JSON.parse(p))}const h=(l=t.headers.get("Prefer"))===null||l===void 0?void 0:l.match(/count=(exact|planned|estimated)/),u=(c=e.headers.get("content-range"))===null||c===void 0?void 0:c.split("/");h&&u&&u.length>1&&(a=parseInt(u[1])),t.isMaybeSingle&&Array.isArray(s)&&(s.length>1?(r={code:"PGRST116",details:`Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},s=null,a=null,i=406,o="Not Acceptable"):s.length===1?s=s[0]:s=null)}else{const h=await e.text();try{r=JSON.parse(h),Array.isArray(r)&&e.status===404&&(s=[],r=null,i=200,o="OK")}catch{e.status===404&&h===""?(i=204,o="No Content"):r={message:h}}if(r&&t.shouldThrowOnError)throw new Wy(r)}return{success:r===null,error:r,data:s,count:a,status:i,statusText:o}}returns(){return this}overrideTypes(){return this}},Hy=class extends My{select(e){let t=!1;const r=(e??"*").split("").map(s=>/\s/.test(s)&&!t?"":(s==='"'&&(t=!t),s)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(e,{ascending:t=!0,nullsFirst:r,foreignTable:s,referencedTable:a=s}={}){const i=a?`${a}.order`:"order",o=this.url.searchParams.get(i);return this.url.searchParams.set(i,`${o?`${o},`:""}${e}.${t?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:r=t}={}){const s=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${e}`),this}range(e,t,{foreignTable:r,referencedTable:s=r}={}){const a=typeof s>"u"?"offset":`${s}.offset`,i=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(a,`${e}`),this.url.searchParams.set(i,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:e=!1,verbose:t=!1,settings:r=!1,buffers:s=!1,wal:a=!1,format:i="text"}={}){var o;const l=[e?"analyze":null,t?"verbose":null,r?"settings":null,s?"buffers":null,a?"wal":null].filter(Boolean).join("|"),c=(o=this.headers.get("Accept"))!==null&&o!==void 0?o:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${i}; for="${c}"; options=${l};`),i==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(e){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${e}`),this}};const bu=new RegExp("[,()]");var dn=class extends Hy{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){const r=Array.from(new Set(t)).map(s=>typeof s=="string"&&bu.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(e,`in.(${r})`),this}notIn(e,t){const r=Array.from(new Set(t)).map(s=>typeof s=="string"&&bu.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(e,`not.in.(${r})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:r,type:s}={}){let a="";s==="plain"?a="pl":s==="phrase"?a="ph":s==="websearch"&&(a="w");const i=r===void 0?"":`(${r})`;return this.url.searchParams.append(e,`${a}fts${i}.${t}`),this}match(e){return Object.entries(e).filter(([t,r])=>r!==void 0).forEach(([t,r])=>{this.url.searchParams.append(t,`eq.${r}`)}),this}not(e,t,r){return this.url.searchParams.append(e,`not.${t}.${r}`),this}or(e,{foreignTable:t,referencedTable:r=t}={}){const s=r?`${r}.or`:"or";return this.url.searchParams.append(s,`(${e})`),this}filter(e,t,r){return this.url.searchParams.append(e,`${t}.${r}`),this}},qy=class{constructor(e,{headers:t={},schema:r,fetch:s,urlLengthLimit:a=8e3,retry:i}){this.url=e,this.headers=new Headers(t),this.schema=r,this.fetch=s,this.urlLengthLimit=a,this.retry=i}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){const{head:r=!1,count:s}=t??{},a=r?"HEAD":"GET";let i=!1;const o=(e??"*").split("").map(d=>/\s/.test(d)&&!i?"":(d==='"'&&(i=!i),d)).join(""),{url:l,headers:c}=this.cloneRequestState();return l.searchParams.set("select",o),s&&c.append("Prefer",`count=${s}`),new dn({method:a,url:l,headers:c,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:r=!0}={}){var s;const a="POST",{url:i,headers:o}=this.cloneRequestState();if(t&&o.append("Prefer",`count=${t}`),r||o.append("Prefer","missing=default"),Array.isArray(e)){const l=e.reduce((c,d)=>c.concat(Object.keys(d)),[]);if(l.length>0){const c=[...new Set(l)].map(d=>`"${d}"`);i.searchParams.set("columns",c.join(","))}}return new dn({method:a,url:i,headers:o,schema:this.schema,body:e,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:r=!1,count:s,defaultToNull:a=!0}={}){var i;const o="POST",{url:l,headers:c}=this.cloneRequestState();if(c.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),t!==void 0&&l.searchParams.set("on_conflict",t),s&&c.append("Prefer",`count=${s}`),a||c.append("Prefer","missing=default"),Array.isArray(e)){const d=e.reduce((h,u)=>h.concat(Object.keys(u)),[]);if(d.length>0){const h=[...new Set(d)].map(u=>`"${u}"`);l.searchParams.set("columns",h.join(","))}}return new dn({method:o,url:l,headers:c,schema:this.schema,body:e,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){var r;const s="PATCH",{url:a,headers:i}=this.cloneRequestState();return t&&i.append("Prefer",`count=${t}`),new dn({method:s,url:a,headers:i,schema:this.schema,body:e,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){var t;const r="DELETE",{url:s,headers:a}=this.cloneRequestState();return e&&a.append("Prefer",`count=${e}`),new dn({method:r,url:s,headers:a,schema:this.schema,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function Vs(e){"@babel/helpers - typeof";return Vs=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Vs(e)}function Gy(e,t){if(Vs(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var s=r.call(e,t);if(Vs(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ky(e){var t=Gy(e,"string");return Vs(t)=="symbol"?t:t+""}function Vy(e,t,r){return(t=Ky(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function wu(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,s)}return r}function Ca(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?wu(Object(r),!0).forEach(function(s){Vy(e,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):wu(Object(r)).forEach(function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(r,s))})}return e}var Yy=class Tf{constructor(t,{headers:r={},schema:s,fetch:a,timeout:i,urlLengthLimit:o=8e3,retry:l}={}){this.url=t,this.headers=new Headers(r),this.schemaName=s,this.urlLengthLimit=o;const c=a??globalThis.fetch;i!==void 0&&i>0?this.fetch=(d,h)=>{const u=new AbortController,p=setTimeout(()=>u.abort(),i),x=h==null?void 0:h.signal;if(x){if(x.aborted)return clearTimeout(p),c(d,h);const v=()=>{clearTimeout(p),u.abort()};return x.addEventListener("abort",v,{once:!0}),c(d,Ca(Ca({},h),{},{signal:u.signal})).finally(()=>{clearTimeout(p),x.removeEventListener("abort",v)})}return c(d,Ca(Ca({},h),{},{signal:u.signal})).finally(()=>clearTimeout(p))}:this.fetch=c,this.retry=l}from(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new qy(new URL(`${this.url}/${t}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new Tf(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(t,r={},{head:s=!1,get:a=!1,count:i}={}){var o;let l;const c=new URL(`${this.url}/rpc/${t}`);let d;const h=x=>x!==null&&typeof x=="object"&&(!Array.isArray(x)||x.some(h)),u=s&&Object.values(r).some(h);u?(l="POST",d=r):s||a?(l=s?"HEAD":"GET",Object.entries(r).filter(([x,v])=>v!==void 0).map(([x,v])=>[x,Array.isArray(v)?`{${v.join(",")}}`:`${v}`]).forEach(([x,v])=>{c.searchParams.append(x,v)})):(l="POST",d=r);const p=new Headers(this.headers);return u?p.set("Prefer",i?`count=${i},return=minimal`:"return=minimal"):i&&p.set("Prefer",`count=${i}`),new dn({method:l,url:c,headers:p,schema:this.schemaName,body:d,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class Jy{constructor(){}static detectEnvironment(){var t;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((t=navigator.userAgent)===null||t===void 0)&&t.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const s=r.versions;if(s&&s.node){const a=s.node,i=parseInt(a.replace(/^v/,"").split(".")[0]);return i>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${i} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${i} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const t=this.detectEnvironment();if(t.constructor)return t.constructor;let r=t.error||"WebSocket not supported in this environment.";throw t.workaround&&(r+=`

Suggested solution: ${t.workaround}`),new Error(r)}static isWebSocketSupported(){try{const t=this.detectEnvironment();return t.type==="native"||t.type==="ws"}catch{return!1}}}const Qy="2.103.3",Xy=`realtime-js/${Qy}`,Zy="1.0.0",Ef="2.0.0",ev=Ef,tv=1e4,rv=100,dr={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Af={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},Pl={connecting:"connecting",closing:"closing",closed:"closed"};class nv{constructor(t){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=t??[]}encode(t,r){if(t.event===this.BROADCAST_EVENT&&!(t.payload instanceof ArrayBuffer)&&typeof t.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(t));let s=[t.join_ref,t.ref,t.topic,t.event,t.payload];return r(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(t){var r;return this._isArrayBuffer((r=t.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(t):this._encodeJsonUserBroadcastPush(t)}_encodeBinaryUserBroadcastPush(t){var r,s;const a=(s=(r=t.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(t,this.BINARY_ENCODING,a)}_encodeJsonUserBroadcastPush(t){var r,s;const a=(s=(r=t.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:{},o=new TextEncoder().encode(JSON.stringify(a)).buffer;return this._encodeUserBroadcastPush(t,this.JSON_ENCODING,o)}_encodeUserBroadcastPush(t,r,s){var a,i;const o=t.topic,l=(a=t.ref)!==null&&a!==void 0?a:"",c=(i=t.join_ref)!==null&&i!==void 0?i:"",d=t.payload.event,h=this.allowedMetadataKeys?this._pick(t.payload,this.allowedMetadataKeys):{},u=Object.keys(h).length===0?"":JSON.stringify(h);if(c.length>255)throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const p=this.USER_BROADCAST_PUSH_META_LENGTH+c.length+l.length+o.length+d.length+u.length,x=new ArrayBuffer(this.HEADER_LENGTH+p);let v=new DataView(x),b=0;v.setUint8(b++,this.KINDS.userBroadcastPush),v.setUint8(b++,c.length),v.setUint8(b++,l.length),v.setUint8(b++,o.length),v.setUint8(b++,d.length),v.setUint8(b++,u.length),v.setUint8(b++,r),Array.from(c,g=>v.setUint8(b++,g.charCodeAt(0))),Array.from(l,g=>v.setUint8(b++,g.charCodeAt(0))),Array.from(o,g=>v.setUint8(b++,g.charCodeAt(0))),Array.from(d,g=>v.setUint8(b++,g.charCodeAt(0))),Array.from(u,g=>v.setUint8(b++,g.charCodeAt(0)));var w=new Uint8Array(x.byteLength+s.byteLength);return w.set(new Uint8Array(x),0),w.set(new Uint8Array(s),x.byteLength),w.buffer}decode(t,r){if(this._isArrayBuffer(t)){let s=this._binaryDecode(t);return r(s)}if(typeof t=="string"){const s=JSON.parse(t),[a,i,o,l,c]=s;return r({join_ref:a,ref:i,topic:o,event:l,payload:c})}return r({})}_binaryDecode(t){const r=new DataView(t),s=r.getUint8(0),a=new TextDecoder;switch(s){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(t,r,a)}}_decodeUserBroadcast(t,r,s){const a=r.getUint8(1),i=r.getUint8(2),o=r.getUint8(3),l=r.getUint8(4);let c=this.HEADER_LENGTH+4;const d=s.decode(t.slice(c,c+a));c=c+a;const h=s.decode(t.slice(c,c+i));c=c+i;const u=s.decode(t.slice(c,c+o));c=c+o;const p=t.slice(c,t.byteLength),x=l===this.JSON_ENCODING?JSON.parse(s.decode(p)):p,v={type:this.BROADCAST_EVENT,event:h,payload:x};return o>0&&(v.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:d,event:this.BROADCAST_EVENT,payload:v}}_isArrayBuffer(t){var r;return t instanceof ArrayBuffer||((r=t==null?void 0:t.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(t,r){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).filter(([s])=>r.includes(s)))}}var ae;(function(e){e.abstime="abstime",e.bool="bool",e.date="date",e.daterange="daterange",e.float4="float4",e.float8="float8",e.int2="int2",e.int4="int4",e.int4range="int4range",e.int8="int8",e.int8range="int8range",e.json="json",e.jsonb="jsonb",e.money="money",e.numeric="numeric",e.oid="oid",e.reltime="reltime",e.text="text",e.time="time",e.timestamp="timestamp",e.timestamptz="timestamptz",e.timetz="timetz",e.tsrange="tsrange",e.tstzrange="tstzrange"})(ae||(ae={}));const ku=(e,t,r={})=>{var s;const a=(s=r.skipTypes)!==null&&s!==void 0?s:[];return t?Object.keys(t).reduce((i,o)=>(i[o]=sv(o,e,t,a),i),{}):{}},sv=(e,t,r,s)=>{const a=t.find(l=>l.name===e),i=a==null?void 0:a.type,o=r[e];return i&&!s.includes(i)?zf(i,o):Rl(o)},zf=(e,t)=>{if(e.charAt(0)==="_"){const r=e.slice(1,e.length);return lv(t,r)}switch(e){case ae.bool:return av(t);case ae.float4:case ae.float8:case ae.int2:case ae.int4:case ae.int8:case ae.numeric:case ae.oid:return iv(t);case ae.json:case ae.jsonb:return ov(t);case ae.timestamp:return cv(t);case ae.abstime:case ae.date:case ae.daterange:case ae.int4range:case ae.int8range:case ae.money:case ae.reltime:case ae.text:case ae.time:case ae.timestamptz:case ae.timetz:case ae.tsrange:case ae.tstzrange:return Rl(t);default:return Rl(t)}},Rl=e=>e,av=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},iv=e=>{if(typeof e=="string"){const t=parseFloat(e);if(!Number.isNaN(t))return t}return e},ov=e=>{if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e},lv=(e,t)=>{if(typeof e!="string")return e;const r=e.length-1,s=e[r];if(e[0]==="{"&&s==="}"){let i;const o=e.slice(1,r);try{i=JSON.parse("["+o+"]")}catch{i=o?o.split(","):[]}return i.map(l=>zf(t,l))}return e},cv=e=>typeof e=="string"?e.replace(" ","T"):e,Pf=e=>{const t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,"http"),t.pathname=t.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),t.pathname===""||t.pathname==="/"?t.pathname="/api/broadcast":t.pathname=t.pathname+"/api/broadcast",t.href};var Ns=e=>typeof e=="function"?e:function(){return e},dv=typeof self<"u"?self:null,un=typeof window<"u"?window:null,$t=dv||un||globalThis,uv="2.0.0",hv=1e4,pv=1e3,Dt={connecting:0,open:1,closing:2,closed:3},et={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Ht={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},Ol={longpoll:"longpoll",websocket:"websocket"},fv={complete:4},Ll="base64url.bearer.phx.",Ta=class{constructor(e,t,r,s){this.channel=e,this.event=t,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=s,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:r}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},Rf=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},mv=class{constructor(e,t,r){this.state=et.closed,this.topic=e,this.params=Ns(t||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Ta(this,Ht.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Rf(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=et.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this.joinPush.receive("error",s=>{this.state=et.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=et.closed,this.socket.remove(this)}),this.onError(s=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.isJoining()&&this.joinPush.reset(),this.state=et.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Ta(this,Ht.leave,Ns({}),this.timeout).send(),this.state=et.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Ht.reply,(s,a)=>{this.trigger(this.replyEventName(a),s)})}join(e=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=et.closed,this.bindings=[]}onClose(e){this.on(Ht.close,e)}onError(e){return this.on(Ht.error,t=>e(t))}on(e,t){let r=this.bindingRef++;return this.bindings.push({event:e,ref:r,callback:t}),r}off(e,t){this.bindings=this.bindings.filter(r=>!(r.event===e&&(typeof t>"u"||t===r.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,r=this.timeout){if(t=t||{},!this.joinedOnce)throw new Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let s=new Ta(this,e,function(){return t},r);return this.canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=et.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(Ht.close,"leave")},r=new Ta(this,Ht.leave,Ns({}),e);return r.receive("ok",()=>t()).receive("timeout",()=>t()),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(e,t,r){return t}filterBindings(e,t,r){return!0}isMember(e,t,r,s){return this.topic!==e?!1:s&&s!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:e,event:t,payload:r,joinRef:s}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=et.joining,this.joinPush.resend(e))}trigger(e,t,r,s){let a=this.onMessage(e,t,r,s);if(t&&!a)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let i=this.bindings.filter(o=>o.event===e&&this.filterBindings(o,t,r));for(let o=0;o<i.length;o++)i[o].callback(a,r,s||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===et.closed}isErrored(){return this.state===et.errored}isJoined(){return this.state===et.joined}isJoining(){return this.state===et.joining}isLeaving(){return this.state===et.leaving}},Ni=class{static request(e,t,r,s,a,i,o){if($t.XDomainRequest){let l=new $t.XDomainRequest;return this.xdomainRequest(l,e,t,s,a,i,o)}else if($t.XMLHttpRequest){let l=new $t.XMLHttpRequest;return this.xhrRequest(l,e,t,r,s,a,i,o)}else{if($t.fetch&&$t.AbortController)return this.fetchRequest(e,t,r,s,a,i,o);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(e,t,r,s,a,i,o){let l={method:e,headers:r,body:s},c=null;return a&&(c=new AbortController,setTimeout(()=>c.abort(),a),l.signal=c.signal),$t.fetch(t,l).then(d=>d.text()).then(d=>this.parseJSON(d)).then(d=>o&&o(d)).catch(d=>{d.name==="AbortError"&&i?i():o&&o(null)}),c}static xdomainRequest(e,t,r,s,a,i,o){return e.timeout=a,e.open(t,r),e.onload=()=>{let l=this.parseJSON(e.responseText);o&&o(l)},i&&(e.ontimeout=i),e.onprogress=()=>{},e.send(s),e}static xhrRequest(e,t,r,s,a,i,o,l){e.open(t,r,!0),e.timeout=i;for(let[c,d]of Object.entries(s))e.setRequestHeader(c,d);return e.onerror=()=>l&&l(null),e.onreadystatechange=()=>{if(e.readyState===fv.complete&&l){let c=this.parseJSON(e.responseText);l(c)}},o&&(e.ontimeout=o),e.send(a),e}static parseJSON(e){if(!e||e==="")return null;try{return JSON.parse(e)}catch{return console&&console.log("failed to parse JSON response",e),null}}static serialize(e,t){let r=[];for(var s in e){if(!Object.prototype.hasOwnProperty.call(e,s))continue;let a=t?`${t}[${s}]`:s,i=e[s];typeof i=="object"?r.push(this.serialize(i,a)):r.push(encodeURIComponent(a)+"="+encodeURIComponent(i))}return r.join("&")}static appendParams(e,t){if(Object.keys(t).length===0)return e;let r=e.match(/\?/)?"&":"?";return`${e}${r}${this.serialize(t)}`}},gv=e=>{let t="",r=new Uint8Array(e),s=r.byteLength;for(let a=0;a<s;a++)t+=String.fromCharCode(r[a]);return btoa(t)},rn=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(Ll)&&(this.authToken=atob(t[1].slice(Ll.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=Dt.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+Ol.websocket),"$1/"+Ol.longpoll)}endpointURL(){return Ni.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,r){this.close(e,t,r),this.readyState=Dt.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===Dt.open||this.readyState===Dt.connecting}poll(){const e={Accept:"application/json"};this.authToken&&(e["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",e,null,()=>this.ontimeout(),t=>{if(t){var{status:r,token:s,messages:a}=t;if(r===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=s}else r=0;switch(r){case 200:a.forEach(i=>{setTimeout(()=>this.onmessage({data:i}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=Dt.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${r}`)}})}send(e){typeof e!="string"&&(e=gv(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},e.join(`
`),()=>this.onerror("timeout"),t=>{this.awaitingBatchAck=!1,!t||t.status!==200?(this.onerror(t&&t.status),this.closeAndRetry(1011,"internal server error",!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(e,t,r){for(let a of this.reqs)a.abort();this.readyState=Dt.closed;let s=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",s)):this.onclose(s)}ajax(e,t,r,s,a){let i,o=()=>{this.reqs.delete(i),s()};i=Ni.request(e,this.endpointURL(),t,r,this.timeout,o,l=>{this.reqs.delete(i),this.isActive()&&a(l)}),this.reqs.add(i)}},xv=class us{constructor(t,r={}){let s=r.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(s.state,a=>{let{onJoin:i,onLeave:o,onSync:l}=this.caller;this.joinRef=this.channel.joinRef(),this.state=us.syncState(this.state,a,i,o),this.pendingDiffs.forEach(c=>{this.state=us.syncDiff(this.state,c,i,o)}),this.pendingDiffs=[],l()}),this.channel.on(s.diff,a=>{let{onJoin:i,onLeave:o,onSync:l}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(a):(this.state=us.syncDiff(this.state,a,i,o),l())})}onJoin(t){this.caller.onJoin=t}onLeave(t){this.caller.onLeave=t}onSync(t){this.caller.onSync=t}list(t){return us.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(t,r,s,a){let i=this.clone(t),o={},l={};return this.map(i,(c,d)=>{r[c]||(l[c]=d)}),this.map(r,(c,d)=>{let h=i[c];if(h){let u=d.metas.map(b=>b.phx_ref),p=h.metas.map(b=>b.phx_ref),x=d.metas.filter(b=>p.indexOf(b.phx_ref)<0),v=h.metas.filter(b=>u.indexOf(b.phx_ref)<0);x.length>0&&(o[c]=d,o[c].metas=x),v.length>0&&(l[c]=this.clone(h),l[c].metas=v)}else o[c]=d}),this.syncDiff(i,{joins:o,leaves:l},s,a)}static syncDiff(t,r,s,a){let{joins:i,leaves:o}=this.clone(r);return s||(s=function(){}),a||(a=function(){}),this.map(i,(l,c)=>{let d=t[l];if(t[l]=this.clone(c),d){let h=t[l].metas.map(p=>p.phx_ref),u=d.metas.filter(p=>h.indexOf(p.phx_ref)<0);t[l].metas.unshift(...u)}s(l,d,c)}),this.map(o,(l,c)=>{let d=t[l];if(!d)return;let h=c.metas.map(u=>u.phx_ref);d.metas=d.metas.filter(u=>h.indexOf(u.phx_ref)<0),a(l,d,c),d.metas.length===0&&delete t[l]}),t}static list(t,r){return r||(r=function(s,a){return a}),this.map(t,(s,a)=>r(s,a))}static map(t,r){return Object.getOwnPropertyNames(t).map(s=>r(s,t[s]))}static clone(t){return JSON.parse(JSON.stringify(t))}},Ea={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let r=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(r))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[r,s,a,i,o]=JSON.parse(e);return t({join_ref:r,ref:s,topic:a,event:i,payload:o})}},binaryEncode(e){let{join_ref:t,ref:r,event:s,topic:a,payload:i}=e,o=this.META_LENGTH+t.length+r.length+a.length+s.length,l=new ArrayBuffer(this.HEADER_LENGTH+o),c=new DataView(l),d=0;c.setUint8(d++,this.KINDS.push),c.setUint8(d++,t.length),c.setUint8(d++,r.length),c.setUint8(d++,a.length),c.setUint8(d++,s.length),Array.from(t,u=>c.setUint8(d++,u.charCodeAt(0))),Array.from(r,u=>c.setUint8(d++,u.charCodeAt(0))),Array.from(a,u=>c.setUint8(d++,u.charCodeAt(0))),Array.from(s,u=>c.setUint8(d++,u.charCodeAt(0)));var h=new Uint8Array(l.byteLength+i.byteLength);return h.set(new Uint8Array(l),0),h.set(new Uint8Array(i),l.byteLength),h.buffer},binaryDecode(e){let t=new DataView(e),r=t.getUint8(0),s=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(e,t,s);case this.KINDS.reply:return this.decodeReply(e,t,s);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,s)}},decodePush(e,t,r){let s=t.getUint8(1),a=t.getUint8(2),i=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,l=r.decode(e.slice(o,o+s));o=o+s;let c=r.decode(e.slice(o,o+a));o=o+a;let d=r.decode(e.slice(o,o+i));o=o+i;let h=e.slice(o,e.byteLength);return{join_ref:l,ref:null,topic:c,event:d,payload:h}},decodeReply(e,t,r){let s=t.getUint8(1),a=t.getUint8(2),i=t.getUint8(3),o=t.getUint8(4),l=this.HEADER_LENGTH+this.META_LENGTH,c=r.decode(e.slice(l,l+s));l=l+s;let d=r.decode(e.slice(l,l+a));l=l+a;let h=r.decode(e.slice(l,l+i));l=l+i;let u=r.decode(e.slice(l,l+o));l=l+o;let p=e.slice(l,e.byteLength),x={status:u,response:p};return{join_ref:c,ref:d,topic:h,event:Ht.reply,payload:x}},decodeBroadcast(e,t,r){let s=t.getUint8(1),a=t.getUint8(2),i=this.HEADER_LENGTH+2,o=r.decode(e.slice(i,i+s));i=i+s;let l=r.decode(e.slice(i,i+a));i=i+a;let c=e.slice(i,e.byteLength);return{join_ref:null,ref:null,topic:o,event:l,payload:c}}},yv=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||hv,this.transport=t.transport||$t.WebSocket||rn,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null,this.sessionStore=t.sessionStorage||$t&&$t.sessionStorage,this.establishedConnections=0,this.defaultEncoder=Ea.encode.bind(Ea),this.defaultDecoder=Ea.decode.bind(Ea),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==rn?(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let r=null;un&&un.addEventListener&&(un.addEventListener("pagehide",s=>{this.conn&&(this.disconnect(),r=this.connectClock)}),un.addEventListener("pageshow",s=>{r===this.connectClock&&(r=null,this.connect())}),un.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=s=>t.rejoinAfterMs?t.rejoinAfterMs(s):[1e3,2e3,5e3][s-1]||1e4,this.reconnectAfterMs=s=>t.reconnectAfterMs?t.reconnectAfterMs(s):[10,50,100,150,200,250,500,1e3,2e3][s-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(s,a,i)=>{console.log(`${s}: ${a}`,i)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=Ns(t.params||{}),this.endPoint=`${e}/${Ol.websocket}`,this.vsn=t.vsn||uv,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Rf(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken}getLongPollTransport(){return rn}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=e}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let e=Ni.appendParams(Ni.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)!=="/"?e:e.charAt(1)==="/"?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`}disconnect(e,t,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,r)}connect(e){e&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=Ns(e)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==rn?this.connectWithFallback(rn,this.longPollFallbackMs):this.transportConnect())}log(e,t,r){this.logger&&this.logger(e,t,r)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:t});let s=this.onMessage(a=>{a.ref===t&&(this.off([s]),e(Date.now()-r))});return!0}transportName(e){switch(e){case rn:return"LongPoll";default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=["phoenix",`${Ll}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=t=>this.onConnError(t),this.conn.onmessage=t=>this.onConnMessage(t),this.conn.onclose=t=>this.onConnClose(t)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let r=!1,s=!0,a,i,o=this.transportName(e),l=c=>{this.log("transport",`falling back to ${o}...`,c),this.off([a,i]),s=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${o}`))return l("memorized");this.fallbackTimer=setTimeout(l,t),i=this.onError(c=>{this.log("transport","error",c),s&&!r&&(clearTimeout(this.fallbackTimer),l(c))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(r=!0,!s){let c=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${c}`,"true"),this.log("transport",`established ${c} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(l,t),this.ping(c=>{this.log("transport","connected to primary after",c),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(e){this.log("error","error in heartbeat callback",e)}this.triggerChanError(),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),pv,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,r){if(!this.conn)return e&&e();const s=this.conn;this.waitForBufferDone(s,()=>{t?s.close(t,r||""):s.close(),this.waitForSocketClosed(s,()=>{this.conn===s&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,r=1){if(r===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,r+1)},150*r)}waitForSocketClosed(e,t,r=1){if(r===5||e.readyState===Dt.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,r+1)},150*r)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",e),this.triggerChanError(),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",e)}onConnError(e){this.hasLogger()&&this.log("transport",e);let t=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",e,t,r),(t===this.transport||r>0)&&this.triggerChanError()}triggerChanError(){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(Ht.error)})}connectionState(){switch(this.conn&&this.conn.readyState){case Dt.connecting:return"connecting";case Dt.open:return"open";case Dt.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([r])=>e.indexOf(r)===-1)}channel(e,t={}){let r=new mv(e,t,this);return this.channels.push(r),r}push(e){if(this.hasLogger()){let{topic:t,event:r,payload:s,ref:a,join_ref:i}=e;this.log("push",`${t} ${r} (${i}, ${a})`,s)}this.isConnected()?this.encode(e,t=>this.conn.send(t)):this.sendBuffer.push(()=>this.encode(e,t=>this.conn.send(t)))}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(e){this.log("error","error in heartbeat callback",e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(e){this.log("error","error in heartbeat callback",e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,t=>{let{topic:r,event:s,payload:a,ref:i,join_ref:o}=t;if(i&&i===this.pendingHeartbeatRef){const l=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(a.status==="ok"?"ok":"error",l)}catch(c){this.log("error","error in heartbeat callback",c)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${a.status||""} ${r} ${s} ${i&&"("+i+")"||""}`.trim(),a);for(let l=0;l<this.channels.length;l++){const c=this.channels[l];c.isMember(r,s,a,o)&&c.trigger(s,a,i,o)}this.triggerStateCallbacks("message",t)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([r,s])=>{try{s(...t)}catch(a){this.log("error",`error in ${e} callback`,a)}})}catch(r){this.log("error",`error triggering ${e} callbacks`,r)}}leaveOpenTopic(e){let t=this.channels.find(r=>r.topic===e&&(r.isJoined()||r.isJoining()));t&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${e}"`),t.leave())}};class Ss{constructor(t,r){const s=bv(r);this.presence=new xv(t.getChannel(),s),this.presence.onJoin((a,i,o)=>{const l=Ss.onJoinPayload(a,i,o);t.getChannel().trigger("presence",l)}),this.presence.onLeave((a,i,o)=>{const l=Ss.onLeavePayload(a,i,o);t.getChannel().trigger("presence",l)}),this.presence.onSync(()=>{t.getChannel().trigger("presence",{event:"sync"})})}get state(){return Ss.transformState(this.presence.state)}static transformState(t){return t=vv(t),Object.getOwnPropertyNames(t).reduce((r,s)=>{const a=t[s];return r[s]=Qa(a),r},{})}static onJoinPayload(t,r,s){const a=ju(r),i=Qa(s);return{event:"join",key:t,currentPresences:a,newPresences:i}}static onLeavePayload(t,r,s){const a=ju(r),i=Qa(s);return{event:"leave",key:t,currentPresences:a,leftPresences:i}}}function Qa(e){return e.metas.map(t=>(t.presence_ref=t.phx_ref,delete t.phx_ref,delete t.phx_ref_prev,t))}function vv(e){return JSON.parse(JSON.stringify(e))}function bv(e){return(e==null?void 0:e.events)&&{events:e.events}}function ju(e){return e!=null&&e.metas?Qa(e):[]}var Nu;(function(e){e.SYNC="sync",e.JOIN="join",e.LEAVE="leave"})(Nu||(Nu={}));class wv{get state(){return this.presenceAdapter.state}constructor(t,r){this.channel=t,this.presenceAdapter=new Ss(this.channel.channelAdapter,r)}}class kv{constructor(t,r,s){const a=jv(s);this.channel=t.getSocket().channel(r,a),this.socket=t}get state(){return this.channel.state}set state(t){this.channel.state=t}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(t,r){return this.channel.on(t,r)}off(t,r){this.channel.off(t,r)}subscribe(t){return this.channel.join(t)}unsubscribe(t){return this.channel.leave(t)}teardown(){this.channel.teardown()}onClose(t){this.channel.onClose(t)}onError(t){return this.channel.onError(t)}push(t,r,s){let a;try{a=this.channel.push(t,r,s)}catch{throw new Error(`tried to push '${t}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>rv){const i=this.channel.pushBuffer.shift();i.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${i.event}`,i.payload())}return a}updateJoinPayload(t){const r=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},r),t)}canPush(){return this.socket.isConnected()&&this.state===dr.joined}isJoined(){return this.state===dr.joined}isJoining(){return this.state===dr.joining}isClosed(){return this.state===dr.closed}isLeaving(){return this.state===dr.leaving}updateFilterBindings(t){this.channel.filterBindings=t}updatePayloadTransform(t){this.channel.onMessage=t}getChannel(){return this.channel}}function jv(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},e.config)}}var Su;(function(e){e.ALL="*",e.INSERT="INSERT",e.UPDATE="UPDATE",e.DELETE="DELETE"})(Su||(Su={}));var Cn;(function(e){e.BROADCAST="broadcast",e.PRESENCE="presence",e.POSTGRES_CHANGES="postgres_changes",e.SYSTEM="system"})(Cn||(Cn={}));var qt;(function(e){e.SUBSCRIBED="SUBSCRIBED",e.TIMED_OUT="TIMED_OUT",e.CLOSED="CLOSED",e.CHANNEL_ERROR="CHANNEL_ERROR"})(qt||(qt={}));class _s{get state(){return this.channelAdapter.state}set state(t){this.channelAdapter.state=t}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(t,r={config:{}},s){var a,i;if(this.topic=t,this.params=r,this.socket=s,this.bindings={},this.subTopic=t.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.channelAdapter=new kv(this.socket.socketAdapter,t,this.params),this.presence=new wv(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Pf(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((i=(a=this.params.config)===null||a===void 0?void 0:a.broadcast)===null||i===void 0)&&i.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(t,r=this.timeout){var s,a,i;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:o,presence:l,private:c}}=this.params,d=(a=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(x=>x.filter))!==null&&a!==void 0?a:[],h=!!this.bindings[Cn.PRESENCE]&&this.bindings[Cn.PRESENCE].length>0||((i=this.params.config.presence)===null||i===void 0?void 0:i.enabled)===!0,u={},p={broadcast:o,presence:Object.assign(Object.assign({},l),{enabled:h}),postgres_changes:d,private:c};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(x=>{t==null||t(qt.CHANNEL_ERROR,x)}),this._onClose(()=>t==null?void 0:t(qt.CLOSED)),this.updateJoinPayload(Object.assign({config:p},u)),this._updateFilterMessage(),this.channelAdapter.subscribe(r).receive("ok",async({postgres_changes:x})=>{if(this.socket._isManualToken()||this.socket.setAuth(),x===void 0){t==null||t(qt.SUBSCRIBED);return}this._updatePostgresBindings(x,t)}).receive("error",x=>{this.state=dr.errored,t==null||t(qt.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(x).join(", ")||"error")))}).receive("timeout",()=>{t==null||t(qt.TIMED_OUT)})}return this}_updatePostgresBindings(t,r){var s;const a=this.bindings.postgres_changes,i=(s=a==null?void 0:a.length)!==null&&s!==void 0?s:0,o=[];for(let l=0;l<i;l++){const c=a[l],{filter:{event:d,schema:h,table:u,filter:p}}=c,x=t&&t[l];if(x&&x.event===d&&_s.isFilterValueEqual(x.schema,h)&&_s.isFilterValueEqual(x.table,u)&&_s.isFilterValueEqual(x.filter,p))o.push(Object.assign(Object.assign({},c),{id:x.id}));else{this.unsubscribe(),this.state=dr.errored,r==null||r(qt.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=o,this.state!=dr.errored&&r&&r(qt.SUBSCRIBED)}presenceState(){return this.presence.state}async track(t,r={}){return await this.send({type:"presence",event:"track",payload:t},r.timeout||this.timeout)}async untrack(t={}){return await this.send({type:"presence",event:"untrack"},t)}on(t,r,s){const a=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=t===Cn.PRESENCE||t===Cn.POSTGRES_CHANGES;if(a&&i)throw this.socket.log("channel",`cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(t,r,s)}async httpSend(t,r,s={}){var a;if(r==null)return Promise.reject(new Error("Payload is required for httpSend()"));const i={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o={method:"POST",headers:i,body:JSON.stringify({messages:[{topic:this.subTopic,event:t,payload:r,private:this.private}]})},l=await this._fetchWithTimeout(this.broadcastEndpointURL,o,(a=s.timeout)!==null&&a!==void 0?a:this.timeout);if(l.status===202)return{success:!0};let c=l.statusText;try{const d=await l.json();c=d.error||d.message||c}catch{}return Promise.reject(new Error(c))}async send(t,r={}){var s,a;if(!this.channelAdapter.canPush()&&t.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:o}=t,l={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(l.Authorization=`Bearer ${this.socket.accessTokenValue}`);const c={method:"POST",headers:l,body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:o,private:this.private}]})};try{const d=await this._fetchWithTimeout(this.broadcastEndpointURL,c,(s=r.timeout)!==null&&s!==void 0?s:this.timeout);return await((a=d.body)===null||a===void 0?void 0:a.cancel()),d.ok?"ok":"error"}catch(d){return d.name==="AbortError"?"timed out":"error"}}else return new Promise(i=>{var o,l,c;const d=this.channelAdapter.push(t.type,t,r.timeout||this.timeout);t.type==="broadcast"&&!(!((c=(l=(o=this.params)===null||o===void 0?void 0:o.config)===null||l===void 0?void 0:l.broadcast)===null||c===void 0)&&c.ack)&&i("ok"),d.receive("ok",()=>i("ok")),d.receive("error",()=>i("error")),d.receive("timeout",()=>i("timed out"))})}updateJoinPayload(t){this.channelAdapter.updateJoinPayload(t)}async unsubscribe(t=this.timeout){return new Promise(r=>{this.channelAdapter.unsubscribe(t).receive("ok",()=>r("ok")).receive("timeout",()=>r("timed out")).receive("error",()=>r("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(t,r,s){const a=new AbortController,i=setTimeout(()=>a.abort(),s),o=await this.socket.fetch(t,Object.assign(Object.assign({},r),{signal:a.signal}));return clearTimeout(i),o}_on(t,r,s){const a=t.toLocaleLowerCase(),i=this.channelAdapter.on(t,s),o={type:a,filter:r,callback:s,ref:i};return this.bindings[a]?this.bindings[a].push(o):this.bindings[a]=[o],this._updateFilterMessage(),this}_onClose(t){this.channelAdapter.onClose(t)}_onError(t){this.channelAdapter.onError(t)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((t,r,s)=>{var a,i,o,l,c,d,h;const u=t.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,s))return!1;const p=(a=this.bindings[u])===null||a===void 0?void 0:a.find(x=>x.ref===t.ref);if(!p)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in p){const x=p.id,v=(i=p.filter)===null||i===void 0?void 0:i.event;return x&&((o=r.ids)===null||o===void 0?void 0:o.includes(x))&&(v==="*"||(v==null?void 0:v.toLocaleLowerCase())===((l=r.data)===null||l===void 0?void 0:l.type.toLocaleLowerCase()))}else{const x=(d=(c=p==null?void 0:p.filter)===null||c===void 0?void 0:c.event)===null||d===void 0?void 0:d.toLocaleLowerCase();return x==="*"||x===((h=r==null?void 0:r.event)===null||h===void 0?void 0:h.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===u})}_notThisChannelEvent(t,r){const{close:s,error:a,leave:i,join:o}=Af;return r&&[s,a,i,o].includes(t)&&r!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((t,r,s)=>{if(typeof r=="object"&&"ids"in r){const a=r.data,{schema:i,table:o,commit_timestamp:l,type:c,errors:d}=a;return Object.assign(Object.assign({},{schema:i,table:o,commit_timestamp:l,eventType:c,new:{},old:{},errors:d}),this._getPayloadRecords(a))}return r})}copyBindings(t){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const r in t.bindings)for(const s of t.bindings[r])this._on(s.type,s.filter,s.callback)}static isFilterValueEqual(t,r){return(t??void 0)===(r??void 0)}_getPayloadRecords(t){const r={new:{},old:{}};return(t.type==="INSERT"||t.type==="UPDATE")&&(r.new=ku(t.columns,t.record)),(t.type==="UPDATE"||t.type==="DELETE")&&(r.old=ku(t.columns,t.old_record)),r}}class Nv{constructor(t,r){this.socket=new yv(t,r)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(t){this.socket.heartbeatCallback=t}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(t,r,s,a=1e4){return new Promise(i=>{setTimeout(()=>i("timeout"),a),this.socket.disconnect(()=>{t(),i("ok")},r,s)})}push(t){this.socket.push(t)}log(t,r,s){this.socket.log(t,r,s)}makeRef(){return this.socket.makeRef()}onOpen(t){this.socket.onOpen(t)}onClose(t){this.socket.onClose(t)}onError(t){this.socket.onError(t)}onMessage(t){this.socket.onMessage(t)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Pl.connecting}isDisconnecting(){return this.socket.connectionState()==Pl.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Sv={HEARTBEAT_INTERVAL:25e3},_v=[1e3,2e3,5e3,1e4],Cv=1e4,Tv=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Ev{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(t,r){var s;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new nv,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._resolveFetch=i=>i?(...o)=>i(...o):(...o)=>fetch(...o),!(!((s=r==null?void 0:r.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey;const a=this._initializeOptions(r);this.socketAdapter=new Nv(t,a),this.httpEndpoint=Pf(t),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(t){const r=t.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(t,r){return this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},t,r)}getChannels(){return this.channels}async removeChannel(t){const r=await t.unsubscribe();return r==="ok"&&t.teardown(),this.channels.length===0&&this.disconnect(),r}async removeAllChannels(){const t=this.channels.map(async s=>{const a=await s.unsubscribe();return s.teardown(),a}),r=await Promise.all(t);return this.disconnect(),r}log(t,r,s){this.socketAdapter.log(t,r,s)}connectionState(){return this.socketAdapter.connectionState()||Pl.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(t,r={config:{}}){const s=`realtime:${t}`,a=this.getChannels().find(i=>i.topic===s);if(a)return a;{const i=new _s(`realtime:${t}`,r,this);return this.channels.push(i),i}}push(t){this.socketAdapter.push(t)}async setAuth(t=null){this._authPromise=this._performAuth(t);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(t){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(t)}_makeRef(){return this.socketAdapter.makeRef()}_remove(t){this.channels=this.channels.filter(r=>r.topic!==t.topic)}async _performAuth(t=null){let r,s=!1;if(t)r=t,s=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(a){this.log("error","Error fetching access token from callback",a),r=this.accessTokenValue}else r=this.accessTokenValue;s?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(a=>{const i={access_token:r,version:Xy};r&&a.updateJoinPayload(i),a.joinedOnce&&a.channelAdapter.isJoined()&&a.channelAdapter.push(Af.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(t="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${t}`,r)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(r=>{this.log("error","error waiting for auth on connect",r)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(t=>{t.ref&&t.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(t){return(r,s)=>{r=="sent"&&this._setAuthSafely(),t&&t(r,s)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const t=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(t),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(t){let r;if(t)r=t;else{const s=new Blob([Tv],{type:"application/javascript"});r=URL.createObjectURL(s)}return r}_initializeOptions(t){var r,s,a,i,o,l,c,d,h;this.worker=(r=t==null?void 0:t.worker)!==null&&r!==void 0?r:!1,this.accessToken=(s=t==null?void 0:t.accessToken)!==null&&s!==void 0?s:null;const u={};u.timeout=(a=t==null?void 0:t.timeout)!==null&&a!==void 0?a:tv,u.heartbeatIntervalMs=(i=t==null?void 0:t.heartbeatIntervalMs)!==null&&i!==void 0?i:Sv.HEARTBEAT_INTERVAL,u.transport=(o=t==null?void 0:t.transport)!==null&&o!==void 0?o:Jy.getWebSocketConstructor(),u.params=t==null?void 0:t.params,u.logger=t==null?void 0:t.logger,u.heartbeatCallback=this._wrapHeartbeatCallback(t==null?void 0:t.heartbeatCallback),u.reconnectAfterMs=(l=t==null?void 0:t.reconnectAfterMs)!==null&&l!==void 0?l:b=>_v[b-1]||Cv;let p,x;const v=(c=t==null?void 0:t.vsn)!==null&&c!==void 0?c:ev;switch(v){case Zy:p=(b,w)=>w(JSON.stringify(b)),x=(b,w)=>w(JSON.parse(b));break;case Ef:p=this.serializer.encode.bind(this.serializer),x=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${u.vsn}`)}if(u.vsn=v,u.encode=(d=t==null?void 0:t.encode)!==null&&d!==void 0?d:p,u.decode=(h=t==null?void 0:t.decode)!==null&&h!==void 0?h:x,u.beforeReconnect=this._reconnectAuth.bind(this),(t!=null&&t.logLevel||t!=null&&t.log_level)&&(this.logLevel=t.logLevel||t.log_level,u.params=Object.assign(Object.assign({},u.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=t==null?void 0:t.workerUrl,u.autoSendHeartbeat=!this.worker}return u}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var Ys=class extends Error{constructor(e,t){var r;super(e),this.name="IcebergError",this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType==="CommitStateUnknownException"||[500,502,504].includes(t.status)&&((r=t.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Av(e,t,r){const s=new URL(t,e);if(r)for(const[a,i]of Object.entries(r))i!==void 0&&s.searchParams.set(a,i);return s.toString()}async function zv(e){return!e||e.type==="none"?{}:e.type==="bearer"?{Authorization:`Bearer ${e.token}`}:e.type==="header"?{[e.name]:e.value}:e.type==="custom"?await e.getHeaders():{}}function Pv(e){const t=e.fetchImpl??globalThis.fetch;return{async request({method:r,path:s,query:a,body:i,headers:o}){const l=Av(e.baseUrl,s,a),c=await zv(e.auth),d=await t(l,{method:r,headers:{...i?{"Content-Type":"application/json"}:{},...c,...o},body:i?JSON.stringify(i):void 0}),h=await d.text(),u=(d.headers.get("content-type")||"").includes("application/json"),p=u&&h?JSON.parse(h):h;if(!d.ok){const x=u?p:void 0,v=x==null?void 0:x.error;throw new Ys((v==null?void 0:v.message)??`Request failed with status ${d.status}`,{status:d.status,icebergType:v==null?void 0:v.type,icebergCode:v==null?void 0:v.code,details:x})}return{status:d.status,headers:d.headers,data:p}}}}function Aa(e){return e.join("")}var Rv=class{constructor(e,t=""){this.client=e,this.prefix=t}async listNamespaces(e){const t=e?{parent:Aa(e.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(e,t){const r={namespace:e.namespace,properties:t==null?void 0:t.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Aa(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Aa(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Aa(e.namespace)}`}),!0}catch(t){if(t instanceof Ys&&t.status===404)return!1;throw t}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(r){if(r instanceof Ys&&r.status===409)return;throw r}}};function nn(e){return e.join("")}var Ov=class{constructor(e,t="",r){this.client=e,this.prefix=t,this.accessDelegation=r}async listTables(e){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${nn(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${nn(e.namespace)}/tables`,body:t,headers:r})).data.metadata}async updateTable(e,t){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${nn(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(e,t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${nn(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String((t==null?void 0:t.purge)??!1)}})}async loadTable(e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${nn(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){const t={};this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${nn(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(r){if(r instanceof Ys&&r.status===404)return!1;throw r}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(r){if(r instanceof Ys&&r.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw r}}},Lv=class{constructor(e){var s;let t="v1";e.catalogName&&(t+=`/${e.catalogName}`);const r=e.baseUrl.endsWith("/")?e.baseUrl:`${e.baseUrl}/`;this.client=Pv({baseUrl:r,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=(s=e.accessDelegation)==null?void 0:s.join(","),this.namespaceOps=new Rv(this.client,t),this.tableOps=new Ov(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function Js(e){"@babel/helpers - typeof";return Js=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Js(e)}function Iv(e,t){if(Js(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var s=r.call(e,t);if(Js(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function $v(e){var t=Iv(e,"string");return Js(t)=="symbol"?t:t+""}function Dv(e,t,r){return(t=$v(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,s)}return r}function H(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?_u(Object(r),!0).forEach(function(s){Dv(e,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_u(Object(r)).forEach(function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(r,s))})}return e}var Ki=class extends Error{constructor(e,t="storage",r,s){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function Vi(e){return typeof e=="object"&&e!==null&&"__isStorageError"in e}var Il=class extends Ki{constructor(e,t,r,s="storage"){super(e,s,t,r),this.name=s==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=t,this.statusCode=r}toJSON(){return H({},super.toJSON())}},Of=class extends Ki{constructor(e,t,r="storage"){super(e,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=t}};const Uv=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),Bv=e=>{if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},$l=e=>{if(Array.isArray(e))return e.map(r=>$l(r));if(typeof e=="function"||e!==Object(e))return e;const t={};return Object.entries(e).forEach(([r,s])=>{const a=r.replace(/([-_][a-z])/gi,i=>i.toUpperCase().replace(/[-_]/g,""));t[a]=$l(s)}),t},Wv=e=>!e||typeof e!="string"||e.length===0||e.length>100||e.trim()!==e||e.includes("/")||e.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e),Cu=e=>{var t;return e.msg||e.message||e.error_description||(typeof e.error=="string"?e.error:(t=e.error)===null||t===void 0?void 0:t.message)||JSON.stringify(e)},Fv=async(e,t,r,s)=>{if(e!==null&&typeof e=="object"&&typeof e.json=="function"){const a=e;let i=parseInt(a.status,10);Number.isFinite(i)||(i=500),a.json().then(o=>{const l=(o==null?void 0:o.statusCode)||(o==null?void 0:o.code)||i+"";t(new Il(Cu(o),i,l,s))}).catch(()=>{const o=i+"";t(new Il(a.statusText||`HTTP ${i} error`,i,o,s))})}else t(new Of(Cu(e),e,s))},Mv=(e,t,r,s)=>{const a={method:e,headers:(t==null?void 0:t.headers)||{}};if(e==="GET"||e==="HEAD"||!s)return H(H({},a),r);if(Bv(s)){var i;const o=(t==null?void 0:t.headers)||{};let l;for(const[c,d]of Object.entries(o))c.toLowerCase()==="content-type"&&(l=d);a.headers=Hv(o,"Content-Type",(i=l)!==null&&i!==void 0?i:"application/json"),a.body=JSON.stringify(s)}else a.body=s;return t!=null&&t.duplex&&(a.duplex=t.duplex),H(H({},a),r)};function Hv(e,t,r){const s=H({},e);for(const a of Object.keys(s))a.toLowerCase()===t.toLowerCase()&&delete s[a];return s[t]=r,s}async function ss(e,t,r,s,a,i,o){return new Promise((l,c)=>{e(r,Mv(t,s,a,i)).then(d=>{if(!d.ok)throw d;if(s!=null&&s.noResolveJson)return d;if(o==="vectors"){const h=d.headers.get("content-type");if(d.headers.get("content-length")==="0"||d.status===204)return{};if(!h||!h.includes("application/json"))return{}}return d.json()}).then(d=>l(d)).catch(d=>Fv(d,c,s,o))})}function Lf(e="storage"){return{get:async(t,r,s,a)=>ss(t,"GET",r,s,a,void 0,e),post:async(t,r,s,a,i)=>ss(t,"POST",r,a,i,s,e),put:async(t,r,s,a,i)=>ss(t,"PUT",r,a,i,s,e),head:async(t,r,s,a)=>ss(t,"HEAD",r,H(H({},s),{},{noResolveJson:!0}),a,void 0,e),remove:async(t,r,s,a,i)=>ss(t,"DELETE",r,a,i,s,e)}}const qv=Lf("storage"),{get:Qs,post:_t,put:Dl,head:Gv,remove:Gc}=qv,lt=Lf("vectors");var Kn=class{constructor(e,t={},r,s="storage"){this.shouldThrowOnError=!1,this.url=e,this.headers=Object.fromEntries(Object.entries(t).map(([a,i])=>[a.toLowerCase(),i])),this.fetch=Uv(r),this.namespace=s}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=H(H({},this.headers),{},{[e.toLowerCase()]:t}),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(r){if(t.shouldThrowOnError)throw r;if(Vi(r))return{data:null,error:r};throw r}}},Kv=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Vi(t))return{data:null,error:t};throw t}}};let If;If=Symbol.toStringTag;var Vv=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[If]="BlobDownloadBuilder",this.promise=null}asStream(){return new Kv(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Vi(t))return{data:null,error:t};throw t}}};const Yv={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Tu={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Jv=class extends Kn{constructor(e,t={},r,s){super(e,t,s,"storage"),this.bucketId=r}async uploadOrUpdate(e,t,r,s){var a=this;return a.handleOperation(async()=>{let i;const o=H(H({},Tu),s);let l=H(H({},a.headers),e==="POST"&&{"x-upsert":String(o.upsert)});const c=o.metadata;typeof Blob<"u"&&r instanceof Blob?(i=new FormData,i.append("cacheControl",o.cacheControl),c&&i.append("metadata",a.encodeMetadata(c)),i.append("",r)):typeof FormData<"u"&&r instanceof FormData?(i=r,i.has("cacheControl")||i.append("cacheControl",o.cacheControl),c&&!i.has("metadata")&&i.append("metadata",a.encodeMetadata(c))):(i=r,l["cache-control"]=`max-age=${o.cacheControl}`,l["content-type"]=o.contentType,c&&(l["x-metadata"]=a.toBase64(a.encodeMetadata(c))),(typeof ReadableStream<"u"&&i instanceof ReadableStream||i&&typeof i=="object"&&"pipe"in i&&typeof i.pipe=="function")&&!o.duplex&&(o.duplex="half")),s!=null&&s.headers&&(l=H(H({},l),s.headers));const d=a._removeEmptyFolders(t),h=a._getFinalPath(d),u=await(e=="PUT"?Dl:_t)(a.fetch,`${a.url}/object/${h}`,i,H({headers:l},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{path:d,id:u.Id,fullPath:u.Key}})}async upload(e,t,r){return this.uploadOrUpdate("POST",e,t,r)}async uploadToSignedUrl(e,t,r,s){var a=this;const i=a._removeEmptyFolders(e),o=a._getFinalPath(i),l=new URL(a.url+`/object/upload/sign/${o}`);return l.searchParams.set("token",t),a.handleOperation(async()=>{let c;const d=H(H({},Tu),s),h=H(H({},a.headers),{"x-upsert":String(d.upsert)});return typeof Blob<"u"&&r instanceof Blob?(c=new FormData,c.append("cacheControl",d.cacheControl),c.append("",r)):typeof FormData<"u"&&r instanceof FormData?(c=r,c.append("cacheControl",d.cacheControl)):(c=r,h["cache-control"]=`max-age=${d.cacheControl}`,h["content-type"]=d.contentType),{path:i,fullPath:(await Dl(a.fetch,l.toString(),c,{headers:h})).Key}})}async createSignedUploadUrl(e,t){var r=this;return r.handleOperation(async()=>{let s=r._getFinalPath(e);const a=H({},r.headers);t!=null&&t.upsert&&(a["x-upsert"]="true");const i=await _t(r.fetch,`${r.url}/object/upload/sign/${s}`,{},{headers:a}),o=new URL(r.url+i.url),l=o.searchParams.get("token");if(!l)throw new Ki("No token returned by API");return{signedUrl:o.toString(),path:e,token:l}})}async update(e,t,r){return this.uploadOrUpdate("PUT",e,t,r)}async move(e,t,r){var s=this;return s.handleOperation(async()=>await _t(s.fetch,`${s.url}/object/move`,{bucketId:s.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:s.headers}))}async copy(e,t,r){var s=this;return s.handleOperation(async()=>({path:(await _t(s.fetch,`${s.url}/object/copy`,{bucketId:s.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:s.headers})).Key}))}async createSignedUrl(e,t,r){var s=this;return s.handleOperation(async()=>{let a=s._getFinalPath(e);const i=typeof(r==null?void 0:r.transform)=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let o=await _t(s.fetch,`${s.url}/object/sign/${a}`,H({expiresIn:t},i?{transform:r.transform}:{}),{headers:s.headers});const l=new URLSearchParams;r!=null&&r.download&&l.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&l.set("cacheNonce",String(r.cacheNonce));const c=l.toString();return{signedUrl:encodeURI(`${s.url}${o.signedURL}${c?`&${c}`:""}`)}})}async createSignedUrls(e,t,r){var s=this;return s.handleOperation(async()=>{const a=await _t(s.fetch,`${s.url}/object/sign/${s.bucketId}`,{expiresIn:t,paths:e},{headers:s.headers}),i=new URLSearchParams;r!=null&&r.download&&i.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&i.set("cacheNonce",String(r.cacheNonce));const o=i.toString();return a.map(l=>H(H({},l),{},{signedUrl:l.signedURL?encodeURI(`${s.url}${l.signedURL}${o?`&${o}`:""}`):null}))})}download(e,t,r){const s=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0?"render/image/authenticated":"object",a=new URLSearchParams;t!=null&&t.transform&&this.applyTransformOptsToQuery(a,t.transform),(t==null?void 0:t.cacheNonce)!=null&&a.set("cacheNonce",String(t.cacheNonce));const i=a.toString(),o=this._getFinalPath(e),l=()=>Qs(this.fetch,`${this.url}/${s}/${o}${i?`?${i}`:""}`,{headers:this.headers,noResolveJson:!0},r);return new Vv(l,this.shouldThrowOnError)}async info(e){var t=this;const r=t._getFinalPath(e);return t.handleOperation(async()=>$l(await Qs(t.fetch,`${t.url}/object/info/${r}`,{headers:t.headers})))}async exists(e){var t=this;const r=t._getFinalPath(e);try{return await Gv(t.fetch,`${t.url}/object/${r}`,{headers:t.headers}),{data:!0,error:null}}catch(a){if(t.shouldThrowOnError)throw a;if(Vi(a)){var s;const i=a instanceof Il?a.status:a instanceof Of?(s=a.originalError)===null||s===void 0?void 0:s.status:void 0;if(i!==void 0&&[400,404].includes(i))return{data:!1,error:a}}throw a}}getPublicUrl(e,t){const r=this._getFinalPath(e),s=new URLSearchParams;t!=null&&t.download&&s.set("download",t.download===!0?"":t.download),t!=null&&t.transform&&this.applyTransformOptsToQuery(s,t.transform),(t==null?void 0:t.cacheNonce)!=null&&s.set("cacheNonce",String(t.cacheNonce));const a=s.toString(),i=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${i}/public/${r}`)+(a?`?${a}`:"")}}}async remove(e){var t=this;return t.handleOperation(async()=>await Gc(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async list(e,t,r){var s=this;return s.handleOperation(async()=>{const a=H(H(H({},Yv),t),{},{prefix:e||""});return await _t(s.fetch,`${s.url}/object/list/${s.bucketId}`,a,{headers:s.headers},r)})}async listV2(e,t){var r=this;return r.handleOperation(async()=>{const s=H({},e);return await _t(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,s,{headers:r.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(e,t){return t.width&&e.set("width",t.width.toString()),t.height&&e.set("height",t.height.toString()),t.resize&&e.set("resize",t.resize),t.format&&e.set("format",t.format),t.quality&&e.set("quality",t.quality.toString()),e}};const Qv="2.103.3",la={"X-Client-Info":`storage-js/${Qv}`};var Xv=class extends Kn{constructor(e,t={},r,s){const a=new URL(e);s!=null&&s.useNewHostname&&/supabase\.(co|in|red)$/.test(a.hostname)&&!a.hostname.includes("storage.supabase.")&&(a.hostname=a.hostname.replace("supabase.","storage.supabase."));const i=a.href.replace(/\/$/,""),o=H(H({},la),t);super(i,o,r,"storage")}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const r=t.listBucketOptionsToQueryString(e);return await Qs(t.fetch,`${t.url}/bucket${r}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await Qs(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var r=this;return r.handleOperation(async()=>await _t(r.fetch,`${r.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers}))}async updateBucket(e,t){var r=this;return r.handleOperation(async()=>await Dl(r.fetch,`${r.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await _t(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Gc(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}},Zv=class extends Kn{constructor(e,t={},r){const s=e.replace(/\/$/,""),a=H(H({},la),t);super(s,a,r,"storage")}async createBucket(e){var t=this;return t.handleOperation(async()=>await _t(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const r=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&r.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&r.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&r.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&r.set("sortOrder",e.sortOrder),e!=null&&e.search&&r.set("search",e.search);const s=r.toString(),a=s?`${t.url}/bucket?${s}`:`${t.url}/bucket`;return await Qs(t.fetch,a,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Gc(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!Wv(e))throw new Ki("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new Lv({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:async()=>t.headers},fetch:this.fetch}),s=this.shouldThrowOnError;return new Proxy(r,{get(a,i){const o=a[i];return typeof o!="function"?o:async(...l)=>{try{return{data:await o.apply(a,l),error:null}}catch(c){if(s)throw c;return{data:null,error:c}}}}})}},e0=class extends Kn{constructor(e,t={},r){const s=e.replace(/\/$/,""),a=H(H({},la),{},{"Content-Type":"application/json"},t);super(s,a,r,"vectors")}async createIndex(e){var t=this;return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var r=this;return r.handleOperation(async()=>await lt.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var r=this;return r.handleOperation(async()=>await lt.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers})||{})}},t0=class extends Kn{constructor(e,t={},r){const s=e.replace(/\/$/,""),a=H(H({},la),{},{"Content-Type":"application/json"},t);super(s,a,r,"vectors")}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},r0=class extends Kn{constructor(e,t={},r){const s=e.replace(/\/$/,""),a=H(H({},la),{},{"Content-Type":"application/json"},t);super(s,a,r,"vectors")}async createBucket(e){var t=this;return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await lt.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},n0=class extends r0{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new s0(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,r=this;return t().call(r,e)}async getBucket(e){var t=()=>super.getBucket,r=this;return t().call(r,e)}async listBuckets(e={}){var t=()=>super.listBuckets,r=this;return t().call(r,e)}async deleteBucket(e){var t=()=>super.deleteBucket,r=this;return t().call(r,e)}},s0=class extends e0{constructor(e,t,r,s){super(e,t,s),this.vectorBucketName=r}async createIndex(e){var t=()=>super.createIndex,r=this;return t().call(r,H(H({},e),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,r=this;return t().call(r,H(H({},e),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,r=this;return t().call(r,r.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,r=this;return t().call(r,r.vectorBucketName,e)}index(e){return new a0(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},a0=class extends t0{constructor(e,t,r,s,a){super(e,t,a),this.vectorBucketName=r,this.indexName=s}async putVectors(e){var t=()=>super.putVectors,r=this;return t().call(r,H(H({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(e){var t=()=>super.getVectors,r=this;return t().call(r,H(H({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,r=this;return t().call(r,H(H({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,r=this;return t().call(r,H(H({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,r=this;return t().call(r,H(H({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},i0=class extends Xv{constructor(e,t={},r,s){super(e,t,r,s)}from(e){return new Jv(this.url,this.headers,e,this.fetch)}get vectors(){return new n0(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Zv(this.url+"/iceberg",this.headers,this.fetch)}};const $f="2.103.3",hn=30*1e3,Ul=3,No=Ul*hn,o0="http://localhost:9999",l0="supabase.auth.token",c0={"X-Client-Info":`gotrue-js/${$f}`},Bl="X-Supabase-Api-Version",Df={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},d0=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,u0=10*60*1e3;class Xs extends Error{constructor(t,r,s){super(t),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=s}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function B(e){return typeof e=="object"&&e!==null&&"__isAuthError"in e}class h0 extends Xs{constructor(t,r,s){super(t,r,s),this.name="AuthApiError",this.status=r,this.code=s}}function p0(e){return B(e)&&e.name==="AuthApiError"}class $r extends Xs{constructor(t,r){super(t),this.name="AuthUnknownError",this.originalError=r}}class rr extends Xs{constructor(t,r,s,a){super(t,s,a),this.name=r,this.status=s}}class it extends rr{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function za(e){return B(e)&&e.name==="AuthSessionMissingError"}class sn extends rr{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Pa extends rr{constructor(t){super(t,"AuthInvalidCredentialsError",400,void 0)}}class Ra extends rr{constructor(t,r=null){super(t,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function f0(e){return B(e)&&e.name==="AuthImplicitGrantRedirectError"}class Eu extends rr{constructor(t,r=null){super(t,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class m0 extends rr{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Wl extends rr{constructor(t,r){super(t,"AuthRetryableFetchError",r,void 0)}}function So(e){return B(e)&&e.name==="AuthRetryableFetchError"}class Au extends rr{constructor(t,r,s){super(t,"AuthWeakPasswordError",r,"weak_password"),this.reasons=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class Fl extends rr{constructor(t){super(t,"AuthInvalidJwtError",400,"invalid_jwt")}}const Si="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),zu=` 	
\r=`.split(""),g0=(()=>{const e=new Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<zu.length;t+=1)e[zu[t].charCodeAt(0)]=-2;for(let t=0;t<Si.length;t+=1)e[Si[t].charCodeAt(0)]=t;return e})();function Pu(e,t,r){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;){const s=t.queue>>t.queuedBits-6&63;r(Si[s]),t.queuedBits-=6}else if(t.queuedBits>0)for(t.queue=t.queue<<6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;){const s=t.queue>>t.queuedBits-6&63;r(Si[s]),t.queuedBits-=6}}function Uf(e,t,r){const s=g0[e];if(s>-1)for(t.queue=t.queue<<6|s,t.queuedBits+=6;t.queuedBits>=8;)r(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}}function Ru(e){const t=[],r=o=>{t.push(String.fromCodePoint(o))},s={utf8seq:0,codepoint:0},a={queue:0,queuedBits:0},i=o=>{v0(o,s,r)};for(let o=0;o<e.length;o+=1)Uf(e.charCodeAt(o),a,i);return t.join("")}function x0(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function y0(e,t){for(let r=0;r<e.length;r+=1){let s=e.charCodeAt(r);if(s>55295&&s<=56319){const a=(s-55296)*1024&65535;s=(e.charCodeAt(r+1)-56320&65535|a)+65536,r+=1}x0(s,t)}}function v0(e,t,r){if(t.utf8seq===0){if(e<=127){r(e);return}for(let s=1;s<6;s+=1)if(!(e>>7-s&1)){t.utf8seq=s;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw new Error("Invalid UTF-8 sequence");t.utf8seq-=1}else if(t.utf8seq>0){if(e<=127)throw new Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|e&63,t.utf8seq-=1,t.utf8seq===0&&r(t.codepoint)}}function On(e){const t=[],r={queue:0,queuedBits:0},s=a=>{t.push(a)};for(let a=0;a<e.length;a+=1)Uf(e.charCodeAt(a),r,s);return new Uint8Array(t)}function b0(e){const t=[];return y0(e,r=>t.push(r)),new Uint8Array(t)}function Wr(e){const t=[],r={queue:0,queuedBits:0},s=a=>{t.push(a)};return e.forEach(a=>Pu(a,r,s)),Pu(null,r,s),t.join("")}function w0(e){return Math.round(Date.now()/1e3)+e}function k0(){return Symbol("auth-callback")}const Ie=()=>typeof window<"u"&&typeof document<"u",Pr={tested:!1,writable:!1},Bf=()=>{if(!Ie())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Pr.tested)return Pr.writable;const e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),Pr.tested=!0,Pr.writable=!0}catch{Pr.tested=!0,Pr.writable=!1}return Pr.writable};function j0(e){const t={},r=new URL(e);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((a,i)=>{t[i]=a})}catch{}return r.searchParams.forEach((s,a)=>{t[a]=s}),t}const Wf=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),N0=e=>typeof e=="object"&&e!==null&&"status"in e&&"ok"in e&&"json"in e&&typeof e.json=="function",pn=async(e,t,r)=>{await e.setItem(t,JSON.stringify(r))},Rr=async(e,t)=>{const r=await e.getItem(t);if(!r)return null;try{return JSON.parse(r)}catch{return r}},Le=async(e,t)=>{await e.removeItem(t)};class Yi{constructor(){this.promise=new Yi.promiseConstructor((t,r)=>{this.resolve=t,this.reject=r})}}Yi.promiseConstructor=Promise;function Oa(e){const t=e.split(".");if(t.length!==3)throw new Fl("Invalid JWT structure");for(let s=0;s<t.length;s++)if(!d0.test(t[s]))throw new Fl("JWT not in base64url format");return{header:JSON.parse(Ru(t[0])),payload:JSON.parse(Ru(t[1])),signature:On(t[2]),raw:{header:t[0],payload:t[1]}}}async function S0(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function _0(e,t){return new Promise((s,a)=>{(async()=>{for(let i=0;i<1/0;i++)try{const o=await e(i);if(!t(i,null,o)){s(o);return}}catch(o){if(!t(i,o)){a(o);return}}})()})}function C0(e){return("0"+e.toString(16)).substr(-2)}function T0(){const t=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=r.length;let a="";for(let i=0;i<56;i++)a+=r.charAt(Math.floor(Math.random()*s));return a}return crypto.getRandomValues(t),Array.from(t,C0).join("")}async function E0(e){const r=new TextEncoder().encode(e),s=await crypto.subtle.digest("SHA-256",r),a=new Uint8Array(s);return Array.from(a).map(i=>String.fromCharCode(i)).join("")}async function A0(e){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),e;const r=await E0(e);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function an(e,t,r=!1){const s=T0();let a=s;r&&(a+="/PASSWORD_RECOVERY"),await pn(e,`${t}-code-verifier`,a);const i=await A0(s);return[i,s===i?"plain":"s256"]}const z0=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function P0(e){const t=e.headers.get(Bl);if(!t||!t.match(z0))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function R0(e){if(!e)throw new Error("Missing exp claim");const t=Math.floor(Date.now()/1e3);if(e<=t)throw new Error("JWT has expired")}function O0(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const L0=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function on(e){if(!L0.test(e))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function _o(){const e={};return new Proxy(e,{get:(t,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const s=r.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(t,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(t,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function I0(e,t){return new Proxy(e,{get:(r,s,a)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const i=s.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)"||i==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,s,a)}return!t.value&&typeof s=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),t.value=!0),Reflect.get(r,s,a)}})}function Ou(e){return JSON.parse(JSON.stringify(e))}const Ir=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),$0=[502,503,504,520,521,522,523,524,530];async function Lu(e){var t;if(!N0(e))throw new Wl(Ir(e),0);if($0.includes(e.status))throw new Wl(Ir(e),e.status);let r;try{r=await e.json()}catch(i){throw new $r(Ir(i),i)}let s;const a=P0(e);if(a&&a.getTime()>=Df["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?s=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(s=r.error_code),s){if(s==="weak_password")throw new Au(Ir(r),e.status,((t=r.weak_password)===null||t===void 0?void 0:t.reasons)||[]);if(s==="session_not_found")throw new it}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((i,o)=>i&&typeof o=="string",!0))throw new Au(Ir(r),e.status,r.weak_password.reasons);throw new h0(Ir(r),e.status||500,s)}const D0=(e,t,r,s)=>{const a={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"?a:(a.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t==null?void 0:t.headers),a.body=JSON.stringify(s),Object.assign(Object.assign({},a),r))};async function F(e,t,r,s){var a;const i=Object.assign({},s==null?void 0:s.headers);i[Bl]||(i[Bl]=Df["2024-01-01"].name),s!=null&&s.jwt&&(i.Authorization=`Bearer ${s.jwt}`);const o=(a=s==null?void 0:s.query)!==null&&a!==void 0?a:{};s!=null&&s.redirectTo&&(o.redirect_to=s.redirectTo);const l=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",c=await U0(e,t,r+l,{headers:i,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(c):{data:Object.assign({},c),error:null}}async function U0(e,t,r,s,a,i){const o=D0(t,s,a,i);let l;try{l=await e(r,Object.assign({},o))}catch(c){throw console.error(c),new Wl(Ir(c),0)}if(l.ok||await Lu(l),s!=null&&s.noResolveJson)return l;try{return await l.json()}catch(c){await Lu(c)}}function Nt(e){var t;let r=null;F0(e)&&(r=Object.assign({},e),e.expires_at||(r.expires_at=w0(e.expires_in)));const s=(t=e.user)!==null&&t!==void 0?t:e;return{data:{session:r,user:s},error:null}}function Iu(e){const t=Nt(e);return!t.error&&e.weak_password&&typeof e.weak_password=="object"&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message=="string"&&e.weak_password.reasons.reduce((r,s)=>r&&typeof s=="string",!0)&&(t.data.weak_password=e.weak_password),t}function ur(e){var t;return{data:{user:(t=e.user)!==null&&t!==void 0?t:e},error:null}}function B0(e){return{data:e,error:null}}function W0(e){const{action_link:t,email_otp:r,hashed_token:s,redirect_to:a,verification_type:i}=e,o=Gi(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),l={action_link:t,email_otp:r,hashed_token:s,redirect_to:a,verification_type:i},c=Object.assign({},o);return{data:{properties:l,user:c},error:null}}function $u(e){return e}function F0(e){return e.access_token&&e.refresh_token&&e.expires_in}const Co=["global","local","others"];class M0{constructor({url:t="",headers:r={},fetch:s}){this.url=t,this.headers=r,this.fetch=Wf(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(t,r=Co[0]){if(Co.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Co.join(", ")}`);try{return await F(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:t,noResolveJson:!0}),{data:null,error:null}}catch(s){if(B(s))return{data:null,error:s};throw s}}async inviteUserByEmail(t,r={}){try{return await F(this.fetch,"POST",`${this.url}/invite`,{body:{email:t,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:ur})}catch(s){if(B(s))return{data:{user:null},error:s};throw s}}async generateLink(t){try{const{options:r}=t,s=Gi(t,["options"]),a=Object.assign(Object.assign({},s),r);return"newEmail"in s&&(a.new_email=s==null?void 0:s.newEmail,delete a.newEmail),await F(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:a,headers:this.headers,xform:W0,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(B(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(t){try{return await F(this.fetch,"POST",`${this.url}/admin/users`,{body:t,headers:this.headers,xform:ur})}catch(r){if(B(r))return{data:{user:null},error:r};throw r}}async listUsers(t){var r,s,a,i,o,l,c;try{const d={nextPage:null,lastPage:0,total:0},h=await F(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=t==null?void 0:t.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(i=(a=t==null?void 0:t.perPage)===null||a===void 0?void 0:a.toString())!==null&&i!==void 0?i:""},xform:$u});if(h.error)throw h.error;const u=await h.json(),p=(o=h.headers.get("x-total-count"))!==null&&o!==void 0?o:0,x=(c=(l=h.headers.get("link"))===null||l===void 0?void 0:l.split(","))!==null&&c!==void 0?c:[];return x.length>0&&(x.forEach(v=>{const b=parseInt(v.split(";")[0].split("=")[1].substring(0,1)),w=JSON.parse(v.split(";")[1].split("=")[1]);d[`${w}Page`]=b}),d.total=parseInt(p)),{data:Object.assign(Object.assign({},u),d),error:null}}catch(d){if(B(d))return{data:{users:[]},error:d};throw d}}async getUserById(t){on(t);try{return await F(this.fetch,"GET",`${this.url}/admin/users/${t}`,{headers:this.headers,xform:ur})}catch(r){if(B(r))return{data:{user:null},error:r};throw r}}async updateUserById(t,r){on(t);try{return await F(this.fetch,"PUT",`${this.url}/admin/users/${t}`,{body:r,headers:this.headers,xform:ur})}catch(s){if(B(s))return{data:{user:null},error:s};throw s}}async deleteUser(t,r=!1){on(t);try{return await F(this.fetch,"DELETE",`${this.url}/admin/users/${t}`,{headers:this.headers,body:{should_soft_delete:r},xform:ur})}catch(s){if(B(s))return{data:{user:null},error:s};throw s}}async _listFactors(t){on(t.userId);try{const{data:r,error:s}=await F(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/factors`,{headers:this.headers,xform:a=>({data:{factors:a},error:null})});return{data:r,error:s}}catch(r){if(B(r))return{data:null,error:r};throw r}}async _deleteFactor(t){on(t.userId),on(t.id);try{return{data:await F(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/factors/${t.id}`,{headers:this.headers}),error:null}}catch(r){if(B(r))return{data:null,error:r};throw r}}async _listOAuthClients(t){var r,s,a,i,o,l,c;try{const d={nextPage:null,lastPage:0,total:0},h=await F(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=t==null?void 0:t.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(i=(a=t==null?void 0:t.perPage)===null||a===void 0?void 0:a.toString())!==null&&i!==void 0?i:""},xform:$u});if(h.error)throw h.error;const u=await h.json(),p=(o=h.headers.get("x-total-count"))!==null&&o!==void 0?o:0,x=(c=(l=h.headers.get("link"))===null||l===void 0?void 0:l.split(","))!==null&&c!==void 0?c:[];return x.length>0&&(x.forEach(v=>{const b=parseInt(v.split(";")[0].split("=")[1].substring(0,1)),w=JSON.parse(v.split(";")[1].split("=")[1]);d[`${w}Page`]=b}),d.total=parseInt(p)),{data:Object.assign(Object.assign({},u),d),error:null}}catch(d){if(B(d))return{data:{clients:[]},error:d};throw d}}async _createOAuthClient(t){try{return await F(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:t,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _getOAuthClient(t){try{return await F(this.fetch,"GET",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _updateOAuthClient(t,r){try{return await F(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${t}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(B(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(t){try{return await F(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(B(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(t){try{return await F(this.fetch,"POST",`${this.url}/admin/oauth/clients/${t}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _listCustomProviders(t){try{const r={};return t!=null&&t.type&&(r.type=t.type),await F(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:s=>{var a;return{data:{providers:(a=s==null?void 0:s.providers)!==null&&a!==void 0?a:[]},error:null}}})}catch(r){if(B(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(t){try{return await F(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:t,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _getCustomProvider(t){try{return await F(this.fetch,"GET",`${this.url}/admin/custom-providers/${t}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _updateCustomProvider(t,r){try{return await F(this.fetch,"PUT",`${this.url}/admin/custom-providers/${t}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(B(s))return{data:null,error:s};throw s}}async _deleteCustomProvider(t){try{return await F(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(B(r))return{data:null,error:r};throw r}}}function Du(e={}){return{getItem:t=>e[t]||null,setItem:(t,r)=>{e[t]=r},removeItem:t=>{delete e[t]}}}const Lt={debug:!!(globalThis&&Bf()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Ff extends Error{constructor(t){super(t),this.isAcquireTimeout=!0}}class Uu extends Ff{}async function H0(e,t,r){Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",e,t);const s=new globalThis.AbortController;let a;t>0&&(a=setTimeout(()=>{s.abort(),Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",e)},t)),await Promise.resolve();try{return await globalThis.navigator.locks.request(e,t===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async i=>{if(i){clearTimeout(a),Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",e,i.name);try{return await r()}finally{Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",e,i.name)}}else{if(t===0)throw Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",e),new Uu(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if(Lt.debug)try{const o=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(o,null,"  "))}catch(o){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",o)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),clearTimeout(a),await r()}})}catch(i){if(t>0&&clearTimeout(a),(i==null?void 0:i.name)==="AbortError"&&t>0){if(s.signal.aborted)return Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",e),console.warn(`@supabase/gotrue-js: Lock "${e}" was not released within ${t}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,{mode:"exclusive",steal:!0},async o=>{if(o){Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",e,o.name);try{return await r()}finally{Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",e,o.name)}}else return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await r()}));throw Lt.debug&&console.log("@supabase/gotrue-js: navigatorLock: lock was stolen by another request",e),new Uu(`Lock "${e}" was released because another request stole it`)}throw i}}function q0(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Mf(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function G0(e){return parseInt(e,16)}function K0(e){const t=new TextEncoder().encode(e);return"0x"+Array.from(t,s=>s.toString(16).padStart(2,"0")).join("")}function V0(e){var t;const{chainId:r,domain:s,expirationTime:a,issuedAt:i=new Date,nonce:o,notBefore:l,requestId:c,resources:d,scheme:h,uri:u,version:p}=e;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(o&&o.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((t=e.statement)===null||t===void 0)&&t.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`)}const x=Mf(e.address),v=h?`${h}://${s}`:s,b=e.statement?`${e.statement}
`:"",w=`${v} wants you to sign in with your Ethereum account:
${x}

${b}`;let g=`URI: ${u}
Version: ${p}
Chain ID: ${r}${o?`
Nonce: ${o}`:""}
Issued At: ${i.toISOString()}`;if(a&&(g+=`
Expiration Time: ${a.toISOString()}`),l&&(g+=`
Not Before: ${l.toISOString()}`),c&&(g+=`
Request ID: ${c}`),d){let f=`
Resources:`;for(const m of d){if(!m||typeof m!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${m}`);f+=`
- ${m}`}g+=f}return`${w}
${g}`}class Se extends Error{constructor({message:t,code:r,cause:s,name:a}){var i;super(t,{cause:s}),this.__isWebAuthnError=!0,this.name=(i=a??(s instanceof Error?s.name:void 0))!==null&&i!==void 0?i:"Unknown Error",this.code=r}}class _i extends Se{constructor(t,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:t}),this.name="WebAuthnUnknownError",this.originalError=r}}function Y0({error:e,options:t}){var r,s,a;const{publicKey:i}=t;if(!i)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new Se({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if(e.name==="ConstraintError"){if(((r=i.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new Se({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if(t.mediation==="conditional"&&((s=i.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new Se({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if(((a=i.authenticatorSelection)===null||a===void 0?void 0:a.userVerification)==="required")return new Se({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if(e.name==="InvalidStateError")return new Se({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if(e.name==="NotAllowedError")return new Se({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="NotSupportedError")return i.pubKeyCredParams.filter(l=>l.type==="public-key").length===0?new Se({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new Se({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if(e.name==="SecurityError"){const o=window.location.hostname;if(Hf(o)){if(i.rp.id!==o)return new Se({message:`The RP ID "${i.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new Se({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="TypeError"){if(i.user.id.byteLength<1||i.user.id.byteLength>64)return new Se({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if(e.name==="UnknownError")return new Se({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new Se({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}function J0({error:e,options:t}){const{publicKey:r}=t;if(!r)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new Se({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if(e.name==="NotAllowedError")return new Se({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="SecurityError"){const s=window.location.hostname;if(Hf(s)){if(r.rpId!==s)return new Se({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new Se({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="UnknownError")return new Se({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new Se({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}class Q0{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){const t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}}const X0=new Q0;function Z0(e){if(!e)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(e);const{challenge:t,user:r,excludeCredentials:s}=e,a=Gi(e,["challenge","user","excludeCredentials"]),i=On(t).buffer,o=Object.assign(Object.assign({},r),{id:On(r.id).buffer}),l=Object.assign(Object.assign({},a),{challenge:i,user:o});if(s&&s.length>0){l.excludeCredentials=new Array(s.length);for(let c=0;c<s.length;c++){const d=s[c];l.excludeCredentials[c]=Object.assign(Object.assign({},d),{id:On(d.id).buffer,type:d.type||"public-key",transports:d.transports})}}return l}function eb(e){if(!e)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(e);const{challenge:t,allowCredentials:r}=e,s=Gi(e,["challenge","allowCredentials"]),a=On(t).buffer,i=Object.assign(Object.assign({},s),{challenge:a});if(r&&r.length>0){i.allowCredentials=new Array(r.length);for(let o=0;o<r.length;o++){const l=r[o];i.allowCredentials[o]=Object.assign(Object.assign({},l),{id:On(l.id).buffer,type:l.type||"public-key",transports:l.transports})}}return i}function tb(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const r=e;return{id:e.id,rawId:e.id,response:{attestationObject:Wr(new Uint8Array(e.response.attestationObject)),clientDataJSON:Wr(new Uint8Array(e.response.clientDataJSON))},type:"public-key",clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:(t=r.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function rb(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const r=e,s=e.getClientExtensionResults(),a=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:Wr(new Uint8Array(a.authenticatorData)),clientDataJSON:Wr(new Uint8Array(a.clientDataJSON)),signature:Wr(new Uint8Array(a.signature)),userHandle:a.userHandle?Wr(new Uint8Array(a.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(t=r.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function Hf(e){return e==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function Bu(){var e,t;return!!(Ie()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.create)=="function"&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.get)=="function")}async function nb(e){try{const t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new _i("Browser returned unexpected credential type",t)}:{data:null,error:new _i("Empty credential response",t)}}catch(t){return{data:null,error:Y0({error:t,options:e})}}}async function sb(e){try{const t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new _i("Browser returned unexpected credential type",t)}:{data:null,error:new _i("Empty credential response",t)}}catch(t){return{data:null,error:J0({error:t,options:e})}}}const ab={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},ib={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Ci(...e){const t=a=>a!==null&&typeof a=="object"&&!Array.isArray(a),r=a=>a instanceof ArrayBuffer||ArrayBuffer.isView(a),s={};for(const a of e)if(a)for(const i in a){const o=a[i];if(o!==void 0)if(Array.isArray(o))s[i]=o;else if(r(o))s[i]=o;else if(t(o)){const l=s[i];t(l)?s[i]=Ci(l,o):s[i]=Ci(o)}else s[i]=o}return s}function ob(e,t){return Ci(ab,e,t||{})}function lb(e,t){return Ci(ib,e,t||{})}class cb{constructor(t){this.client=t,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(t){return this.client.mfa.enroll(Object.assign(Object.assign({},t),{factorType:"webauthn"}))}async _challenge({factorId:t,webauthn:r,friendlyName:s,signal:a},i){var o;try{const{data:l,error:c}=await this.client.mfa.challenge({factorId:t,webauthn:r});if(!l)return{data:null,error:c};const d=a??X0.createNewAbortSignal();if(l.webauthn.type==="create"){const{user:h}=l.webauthn.credential_options.publicKey;if(!h.name){const u=s;if(u)h.name=`${h.id}:${u}`;else{const x=(await this.client.getUser()).data.user,v=((o=x==null?void 0:x.user_metadata)===null||o===void 0?void 0:o.name)||(x==null?void 0:x.email)||(x==null?void 0:x.id)||"User";h.name=`${h.id}:${v}`}}h.displayName||(h.displayName=h.name)}switch(l.webauthn.type){case"create":{const h=ob(l.webauthn.credential_options.publicKey,i==null?void 0:i.create),{data:u,error:p}=await nb({publicKey:h,signal:d});return u?{data:{factorId:t,challengeId:l.id,webauthn:{type:l.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}case"request":{const h=lb(l.webauthn.credential_options.publicKey,i==null?void 0:i.request),{data:u,error:p}=await sb(Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:h,signal:d}));return u?{data:{factorId:t,challengeId:l.id,webauthn:{type:l.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}}}catch(l){return B(l)?{data:null,error:l}:{data:null,error:new $r("Unexpected error in challenge",l)}}}async _verify({challengeId:t,factorId:r,webauthn:s}){return this.client.mfa.verify({factorId:r,challengeId:t,webauthn:s})}async _authenticate({factorId:t,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:a}={}},i){if(!r)return{data:null,error:new Xs("rpId is required for WebAuthn authentication")};try{if(!Bu())return{data:null,error:new $r("Browser does not support WebAuthn",null)};const{data:o,error:l}=await this.challenge({factorId:t,webauthn:{rpId:r,rpOrigins:s},signal:a},{request:i});if(!o)return{data:null,error:l};const{webauthn:c}=o;return this._verify({factorId:t,challengeId:o.challengeId,webauthn:{type:c.type,rpId:r,rpOrigins:s,credential_response:c.credential_response}})}catch(o){return B(o)?{data:null,error:o}:{data:null,error:new $r("Unexpected error in authenticate",o)}}}async _register({friendlyName:t,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:a}={}},i){if(!r)return{data:null,error:new Xs("rpId is required for WebAuthn registration")};try{if(!Bu())return{data:null,error:new $r("Browser does not support WebAuthn",null)};const{data:o,error:l}=await this._enroll({friendlyName:t});if(!o)return await this.client.mfa.listFactors().then(h=>{var u;return(u=h.data)===null||u===void 0?void 0:u.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===t&&p.status!=="unverified")}).then(h=>h?this.client.mfa.unenroll({factorId:h==null?void 0:h.id}):void 0),{data:null,error:l};const{data:c,error:d}=await this._challenge({factorId:o.id,friendlyName:o.friendly_name,webauthn:{rpId:r,rpOrigins:s},signal:a},{create:i});return c?this._verify({factorId:o.id,challengeId:c.challengeId,webauthn:{rpId:r,rpOrigins:s,type:c.webauthn.type,credential_response:c.webauthn.credential_response}}):{data:null,error:d}}catch(o){return B(o)?{data:null,error:o}:{data:null,error:new $r("Unexpected error in register",o)}}}}q0();const db={url:o0,storageKey:l0,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:c0,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function Wu(e,t,r){return await r()}const ln={};class Zs{get jwks(){var t,r;return(r=(t=ln[this.storageKey])===null||t===void 0?void 0:t.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(t){ln[this.storageKey]=Object.assign(Object.assign({},ln[this.storageKey]),{jwks:t})}get jwks_cached_at(){var t,r;return(r=(t=ln[this.storageKey])===null||t===void 0?void 0:t.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(t){ln[this.storageKey]=Object.assign(Object.assign({},ln[this.storageKey]),{cachedAt:t})}constructor(t){var r,s,a;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const i=Object.assign(Object.assign({},db),t);if(this.storageKey=i.storageKey,this.instanceID=(r=Zs.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,Zs.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.instanceID>0&&Ie()){const o=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(o),this.logDebugMessages&&console.trace(o)}if(this.persistSession=i.persistSession,this.autoRefreshToken=i.autoRefreshToken,this.admin=new M0({url:i.url,headers:i.headers,fetch:i.fetch}),this.url=i.url,this.headers=i.headers,this.fetch=Wf(i.fetch),this.lock=i.lock||Wu,this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,this.throwOnError=i.throwOnError,this.lockAcquireTimeout=i.lockAcquireTimeout,i.lock?this.lock=i.lock:this.persistSession&&Ie()&&(!((s=globalThis==null?void 0:globalThis.navigator)===null||s===void 0)&&s.locks)?this.lock=H0:this.lock=Wu,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new cb(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:Bf()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Du(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=Du(this.memoryStorage)),Ie()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(o){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",o)}(a=this.broadcastChannel)===null||a===void 0||a.addEventListener("message",async o=>{this._debug("received broadcast notification from other tab or client",o);try{await this._notifyAllSubscribers(o.data.event,o.data.session,!1)}catch(l){this._debug("#broadcastChannel","error",l)}})}i.skipAutoInitialize||this.initialize().catch(o=>{this._debug("#initialize()","error",o)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(t){if(this.throwOnError&&t&&t.error)throw t.error;return t}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${$f}) ${new Date().toISOString()}`}_debug(...t){return this.logDebugMessages&&this.logger(this._logPrefix(),...t),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var t;try{let r={},s="none";if(Ie()&&(r=j0(window.location.href),this._isImplicitGrantCallback(r)?s="implicit":await this._isPKCECallback(r)&&(s="pkce")),Ie()&&this.detectSessionInUrl&&s!=="none"){const{data:a,error:i}=await this._getSessionFromURL(r,s);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),f0(i)){const c=(t=i.details)===null||t===void 0?void 0:t.code;if(c==="identity_already_exists"||c==="identity_not_found"||c==="single_identity_not_deletable")return{error:i}}return{error:i}}const{session:o,redirectType:l}=a;return this._debug("#_initialize()","detected session in URL",o,"redirect type",l),await this._saveSession(o),setTimeout(async()=>{l==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return B(r)?this._returnResult({error:r}):this._returnResult({error:new $r("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(t){var r,s,a;try{const i=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(r=t==null?void 0:t.options)===null||r===void 0?void 0:r.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(a=t==null?void 0:t.options)===null||a===void 0?void 0:a.captchaToken}},xform:Nt}),{data:o,error:l}=i;if(l||!o)return this._returnResult({data:{user:null,session:null},error:l});const c=o.session,d=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(i){if(B(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signUp(t){var r,s,a;try{let i;if("email"in t){const{email:h,password:u,options:p}=t;let x=null,v=null;this.flowType==="pkce"&&([x,v]=await an(this.storage,this.storageKey)),i=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:p==null?void 0:p.emailRedirectTo,body:{email:h,password:u,data:(r=p==null?void 0:p.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken},code_challenge:x,code_challenge_method:v},xform:Nt})}else if("phone"in t){const{phone:h,password:u,options:p}=t;i=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:h,password:u,data:(s=p==null?void 0:p.data)!==null&&s!==void 0?s:{},channel:(a=p==null?void 0:p.channel)!==null&&a!==void 0?a:"sms",gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken}},xform:Nt})}else throw new Pa("You must provide either an email or phone number and a password");const{data:o,error:l}=i;if(l||!o)return await Le(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:l});const c=o.session,d=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(i){if(await Le(this.storage,`${this.storageKey}-code-verifier`),B(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signInWithPassword(t){try{let r;if("email"in t){const{email:i,password:o,options:l}=t;r=await F(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:i,password:o,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken}},xform:Iu})}else if("phone"in t){const{phone:i,password:o,options:l}=t;r=await F(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:i,password:o,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken}},xform:Iu})}else throw new Pa("You must provide either an email or phone number and a password");const{data:s,error:a}=r;if(a)return this._returnResult({data:{user:null,session:null},error:a});if(!s||!s.session||!s.user){const i=new sn;return this._returnResult({data:{user:null,session:null},error:i})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:a})}catch(r){if(B(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(t){var r,s,a,i;return await this._handleProviderSignIn(t.provider,{redirectTo:(r=t.options)===null||r===void 0?void 0:r.redirectTo,scopes:(s=t.options)===null||s===void 0?void 0:s.scopes,queryParams:(a=t.options)===null||a===void 0?void 0:a.queryParams,skipBrowserRedirect:(i=t.options)===null||i===void 0?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(t){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(t))}async signInWithWeb3(t){const{chain:r}=t;switch(r){case"ethereum":return await this.signInWithEthereum(t);case"solana":return await this.signInWithSolana(t);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(t){var r,s,a,i,o,l,c,d,h,u,p;let x,v;if("message"in t)x=t.message,v=t.signature;else{const{chain:b,wallet:w,statement:g,options:f}=t;let m;if(Ie())if(typeof w=="object")m=w;else{const q=window;if("ethereum"in q&&typeof q.ethereum=="object"&&"request"in q.ethereum&&typeof q.ethereum.request=="function")m=q.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof w!="object"||!(f!=null&&f.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");m=w}const k=new URL((r=f==null?void 0:f.url)!==null&&r!==void 0?r:window.location.href),N=await m.request({method:"eth_requestAccounts"}).then(q=>q).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!N||N.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const S=Mf(N[0]);let _=(s=f==null?void 0:f.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!_){const q=await m.request({method:"eth_chainId"});_=G0(q)}const D={domain:k.host,address:S,statement:g,uri:k.href,version:"1",chainId:_,nonce:(a=f==null?void 0:f.signInWithEthereum)===null||a===void 0?void 0:a.nonce,issuedAt:(o=(i=f==null?void 0:f.signInWithEthereum)===null||i===void 0?void 0:i.issuedAt)!==null&&o!==void 0?o:new Date,expirationTime:(l=f==null?void 0:f.signInWithEthereum)===null||l===void 0?void 0:l.expirationTime,notBefore:(c=f==null?void 0:f.signInWithEthereum)===null||c===void 0?void 0:c.notBefore,requestId:(d=f==null?void 0:f.signInWithEthereum)===null||d===void 0?void 0:d.requestId,resources:(h=f==null?void 0:f.signInWithEthereum)===null||h===void 0?void 0:h.resources};x=V0(D),v=await m.request({method:"personal_sign",params:[K0(x),S]})}try{const{data:b,error:w}=await F(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:x,signature:v},!((u=t.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(p=t.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:Nt});if(w)throw w;if(!b||!b.session||!b.user){const g=new sn;return this._returnResult({data:{user:null,session:null},error:g})}return b.session&&(await this._saveSession(b.session),await this._notifyAllSubscribers("SIGNED_IN",b.session)),this._returnResult({data:Object.assign({},b),error:w})}catch(b){if(B(b))return this._returnResult({data:{user:null,session:null},error:b});throw b}}async signInWithSolana(t){var r,s,a,i,o,l,c,d,h,u,p,x;let v,b;if("message"in t)v=t.message,b=t.signature;else{const{chain:w,wallet:g,statement:f,options:m}=t;let k;if(Ie())if(typeof g=="object")k=g;else{const S=window;if("solana"in S&&typeof S.solana=="object"&&("signIn"in S.solana&&typeof S.solana.signIn=="function"||"signMessage"in S.solana&&typeof S.solana.signMessage=="function"))k=S.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof g!="object"||!(m!=null&&m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");k=g}const N=new URL((r=m==null?void 0:m.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in k&&k.signIn){const S=await k.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},m==null?void 0:m.signInWithSolana),{version:"1",domain:N.host,uri:N.href}),f?{statement:f}:null));let _;if(Array.isArray(S)&&S[0]&&typeof S[0]=="object")_=S[0];else if(S&&typeof S=="object"&&"signedMessage"in S&&"signature"in S)_=S;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in _&&"signature"in _&&(typeof _.signedMessage=="string"||_.signedMessage instanceof Uint8Array)&&_.signature instanceof Uint8Array)v=typeof _.signedMessage=="string"?_.signedMessage:new TextDecoder().decode(_.signedMessage),b=_.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in k)||typeof k.signMessage!="function"||!("publicKey"in k)||typeof k!="object"||!k.publicKey||!("toBase58"in k.publicKey)||typeof k.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");v=[`${N.host} wants you to sign in with your Solana account:`,k.publicKey.toBase58(),...f?["",f,""]:[""],"Version: 1",`URI: ${N.href}`,`Issued At: ${(a=(s=m==null?void 0:m.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&a!==void 0?a:new Date().toISOString()}`,...!((i=m==null?void 0:m.signInWithSolana)===null||i===void 0)&&i.notBefore?[`Not Before: ${m.signInWithSolana.notBefore}`]:[],...!((o=m==null?void 0:m.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${m.signInWithSolana.expirationTime}`]:[],...!((l=m==null?void 0:m.signInWithSolana)===null||l===void 0)&&l.chainId?[`Chain ID: ${m.signInWithSolana.chainId}`]:[],...!((c=m==null?void 0:m.signInWithSolana)===null||c===void 0)&&c.nonce?[`Nonce: ${m.signInWithSolana.nonce}`]:[],...!((d=m==null?void 0:m.signInWithSolana)===null||d===void 0)&&d.requestId?[`Request ID: ${m.signInWithSolana.requestId}`]:[],...!((u=(h=m==null?void 0:m.signInWithSolana)===null||h===void 0?void 0:h.resources)===null||u===void 0)&&u.length?["Resources",...m.signInWithSolana.resources.map(_=>`- ${_}`)]:[]].join(`
`);const S=await k.signMessage(new TextEncoder().encode(v),"utf8");if(!S||!(S instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");b=S}}try{const{data:w,error:g}=await F(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:v,signature:Wr(b)},!((p=t.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(x=t.options)===null||x===void 0?void 0:x.captchaToken}}:null),xform:Nt});if(g)throw g;if(!w||!w.session||!w.user){const f=new sn;return this._returnResult({data:{user:null,session:null},error:f})}return w.session&&(await this._saveSession(w.session),await this._notifyAllSubscribers("SIGNED_IN",w.session)),this._returnResult({data:Object.assign({},w),error:g})}catch(w){if(B(w))return this._returnResult({data:{user:null,session:null},error:w});throw w}}async _exchangeCodeForSession(t){const r=await Rr(this.storage,`${this.storageKey}-code-verifier`),[s,a]=(r??"").split("/");try{if(!s&&this.flowType==="pkce")throw new m0;const{data:i,error:o}=await F(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:t,code_verifier:s},xform:Nt});if(await Le(this.storage,`${this.storageKey}-code-verifier`),o)throw o;if(!i||!i.session||!i.user){const l=new sn;return this._returnResult({data:{user:null,session:null,redirectType:null},error:l})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign(Object.assign({},i),{redirectType:a??null}),error:o})}catch(i){if(await Le(this.storage,`${this.storageKey}-code-verifier`),B(i))return this._returnResult({data:{user:null,session:null,redirectType:null},error:i});throw i}}async signInWithIdToken(t){try{const{options:r,provider:s,token:a,access_token:i,nonce:o}=t,l=await F(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:a,access_token:i,nonce:o,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:Nt}),{data:c,error:d}=l;if(d)return this._returnResult({data:{user:null,session:null},error:d});if(!c||!c.session||!c.user){const h=new sn;return this._returnResult({data:{user:null,session:null},error:h})}return c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers("SIGNED_IN",c.session)),this._returnResult({data:c,error:d})}catch(r){if(B(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(t){var r,s,a,i,o;try{if("email"in t){const{email:l,options:c}=t;let d=null,h=null;this.flowType==="pkce"&&([d,h]=await an(this.storage,this.storageKey));const{error:u}=await F(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(r=c==null?void 0:c.data)!==null&&r!==void 0?r:{},create_user:(s=c==null?void 0:c.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:d,code_challenge_method:h},redirectTo:c==null?void 0:c.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in t){const{phone:l,options:c}=t,{data:d,error:h}=await F(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(a=c==null?void 0:c.data)!==null&&a!==void 0?a:{},create_user:(i=c==null?void 0:c.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(o=c==null?void 0:c.channel)!==null&&o!==void 0?o:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d==null?void 0:d.message_id},error:h})}throw new Pa("You must provide either an email or phone number.")}catch(l){if(await Le(this.storage,`${this.storageKey}-code-verifier`),B(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(t){var r,s;try{let a,i;"options"in t&&(a=(r=t.options)===null||r===void 0?void 0:r.redirectTo,i=(s=t.options)===null||s===void 0?void 0:s.captchaToken);const{data:o,error:l}=await F(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},t),{gotrue_meta_security:{captcha_token:i}}),redirectTo:a,xform:Nt});if(l)throw l;if(!o)throw new Error("An error occurred on token verification.");const c=o.session,d=o.user;return c!=null&&c.access_token&&(await this._saveSession(c),await this._notifyAllSubscribers(t.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(a){if(B(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithSSO(t){var r,s,a,i,o;try{let l=null,c=null;this.flowType==="pkce"&&([l,c]=await an(this.storage,this.storageKey));const d=await F(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in t?{provider_id:t.providerId}:null),"domain"in t?{domain:t.domain}:null),{redirect_to:(s=(r=t.options)===null||r===void 0?void 0:r.redirectTo)!==null&&s!==void 0?s:void 0}),!((a=t==null?void 0:t.options)===null||a===void 0)&&a.captchaToken?{gotrue_meta_security:{captcha_token:t.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:l,code_challenge_method:c}),headers:this.headers,xform:B0});return!((i=d.data)===null||i===void 0)&&i.url&&Ie()&&!(!((o=t.options)===null||o===void 0)&&o.skipBrowserRedirect)&&window.location.assign(d.data.url),this._returnResult(d)}catch(l){if(await Le(this.storage,`${this.storageKey}-code-verifier`),B(l))return this._returnResult({data:null,error:l});throw l}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async t=>{const{data:{session:r},error:s}=t;if(s)throw s;if(!r)throw new it;const{error:a}=await F(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:a})})}catch(t){if(B(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async resend(t){try{const r=`${this.url}/resend`;if("email"in t){const{email:s,type:a,options:i}=t,{error:o}=await F(this.fetch,"POST",r,{headers:this.headers,body:{email:s,type:a,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},redirectTo:i==null?void 0:i.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:o})}else if("phone"in t){const{phone:s,type:a,options:i}=t,{data:o,error:l}=await F(this.fetch,"POST",r,{headers:this.headers,body:{phone:s,type:a,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:l})}throw new Pa("You must provide either an email or phone number and a type")}catch(r){if(B(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async r=>r))}async _acquireLock(t,r){this._debug("#_acquireLock","begin",t);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),a=(async()=>(await s,await r()))();return this.pendingInLock.push((async()=>{try{await a}catch{}})()),a}return await this.lock(`lock:${this.storageKey}`,t,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=r();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const a=[...this.pendingInLock];await Promise.all(a),this.pendingInLock.splice(0,a.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(t){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await t(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let t=null;const r=await Rr(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?t=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!t)return{data:{session:null},error:null};const s=t.expires_at?t.expires_at*1e3-Date.now()<No:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",t.expires_at),!s){if(this.userStorage){const o=await Rr(this.userStorage,this.storageKey+"-user");o!=null&&o.user?t.user=o.user:t.user=_o()}if(this.storage.isServer&&t.user&&!t.user.__isUserNotAvailableProxy){const o={value:this.suppressGetSessionWarning};t.user=I0(t.user,o),o.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:t},error:null}}const{data:a,error:i}=await this._callRefreshToken(t.refresh_token);return i?this._returnResult({data:{session:null},error:i}):this._returnResult({data:{session:a},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(t){if(t)return await this._getUser(t);await this.initializePromise;const r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(t){try{return t?await F(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t,xform:ur}):await this._useSession(async r=>{var s,a,i;const{data:o,error:l}=r;if(l)throw l;return!(!((s=o.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new it}:await F(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(i=(a=o.session)===null||a===void 0?void 0:a.access_token)!==null&&i!==void 0?i:void 0,xform:ur})})}catch(r){if(B(r))return za(r)&&(await this._removeSession(),await Le(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(t,r={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(t,r))}async _updateUser(t,r={}){try{return await this._useSession(async s=>{const{data:a,error:i}=s;if(i)throw i;if(!a.session)throw new it;const o=a.session;let l=null,c=null;this.flowType==="pkce"&&t.email!=null&&([l,c]=await an(this.storage,this.storageKey));const{data:d,error:h}=await F(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},t),{code_challenge:l,code_challenge_method:c}),jwt:o.access_token,xform:ur});if(h)throw h;return o.user=d.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(s){if(await Le(this.storage,`${this.storageKey}-code-verifier`),B(s))return this._returnResult({data:{user:null},error:s});throw s}}async setSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(t))}async _setSession(t){try{if(!t.access_token||!t.refresh_token)throw new it;const r=Date.now()/1e3;let s=r,a=!0,i=null;const{payload:o}=Oa(t.access_token);if(o.exp&&(s=o.exp,a=s<=r),a){const{data:l,error:c}=await this._callRefreshToken(t.refresh_token);if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l)return{data:{user:null,session:null},error:null};i=l}else{const{data:l,error:c}=await this._getUser(t.access_token);if(c)return this._returnResult({data:{user:null,session:null},error:c});i={access_token:t.access_token,refresh_token:t.refresh_token,user:l.user,token_type:"bearer",expires_in:s-r,expires_at:s},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(r){if(B(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(t))}async _refreshSession(t){try{return await this._useSession(async r=>{var s;if(!t){const{data:o,error:l}=r;if(l)throw l;t=(s=o.session)!==null&&s!==void 0?s:void 0}if(!(t!=null&&t.refresh_token))throw new it;const{data:a,error:i}=await this._callRefreshToken(t.refresh_token);return i?this._returnResult({data:{user:null,session:null},error:i}):a?this._returnResult({data:{user:a.user,session:a},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(B(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(t,r){try{if(!Ie())throw new Ra("No browser detected.");if(t.error||t.error_description||t.error_code)throw new Ra(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new Eu("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ra("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!t.code)throw new Eu("No code detected.");const{data:f,error:m}=await this._exchangeCodeForSession(t.code);if(m)throw m;const k=new URL(window.location.href);return k.searchParams.delete("code"),window.history.replaceState(window.history.state,"",k.toString()),{data:{session:f.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:a,access_token:i,refresh_token:o,expires_in:l,expires_at:c,token_type:d}=t;if(!i||!l||!o||!d)throw new Ra("No session defined in URL");const h=Math.round(Date.now()/1e3),u=parseInt(l);let p=h+u;c&&(p=parseInt(c));const x=p-h;x*1e3<=hn&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${x}s, should have been closer to ${u}s`);const v=p-u;h-v>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",v,p,h):h-v<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",v,p,h);const{data:b,error:w}=await this._getUser(i);if(w)throw w;const g={provider_token:s,provider_refresh_token:a,access_token:i,expires_in:u,expires_at:p,refresh_token:o,token_type:d,user:b.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:g,redirectType:t.type},error:null})}catch(s){if(B(s))return this._returnResult({data:{session:null,redirectType:null},error:s});throw s}}_isImplicitGrantCallback(t){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),t):!!(t.access_token||t.error_description)}async _isPKCECallback(t){const r=await Rr(this.storage,`${this.storageKey}-code-verifier`);return!!(t.code&&r)}async signOut(t={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(t))}async _signOut({scope:t}={scope:"global"}){return await this._useSession(async r=>{var s;const{data:a,error:i}=r;if(i&&!za(i))return this._returnResult({error:i});const o=(s=a.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:l}=await this.admin.signOut(o,t);if(l&&!(p0(l)&&(l.status===404||l.status===401||l.status===403)||za(l)))return this._returnResult({error:l})}return t!=="others"&&(await this._removeSession(),await Le(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(t){const r=k0(),s={id:r,callback:t,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,s),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)})))(),{data:{subscription:s}}}async _emitInitialSession(t){return await this._useSession(async r=>{var s,a;try{const{data:{session:i},error:o}=r;if(o)throw o;await((s=this.stateChangeEmitters.get(t))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",i)),this._debug("INITIAL_SESSION","callback id",t,"session",i)}catch(i){await((a=this.stateChangeEmitters.get(t))===null||a===void 0?void 0:a.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",t,"error",i),za(i)?console.warn(i):console.error(i)}})}async resetPasswordForEmail(t,r={}){let s=null,a=null;this.flowType==="pkce"&&([s,a]=await an(this.storage,this.storageKey,!0));try{return await F(this.fetch,"POST",`${this.url}/recover`,{body:{email:t,code_challenge:s,code_challenge_method:a,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(i){if(await Le(this.storage,`${this.storageKey}-code-verifier`),B(i))return this._returnResult({data:null,error:i});throw i}}async getUserIdentities(){var t;try{const{data:r,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(t=r.user.identities)!==null&&t!==void 0?t:[]},error:null})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(t){return"token"in t?this.linkIdentityIdToken(t):this.linkIdentityOAuth(t)}async linkIdentityOAuth(t){var r;try{const{data:s,error:a}=await this._useSession(async i=>{var o,l,c,d,h;const{data:u,error:p}=i;if(p)throw p;const x=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,t.provider,{redirectTo:(o=t.options)===null||o===void 0?void 0:o.redirectTo,scopes:(l=t.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=t.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return await F(this.fetch,"GET",x,{headers:this.headers,jwt:(h=(d=u.session)===null||d===void 0?void 0:d.access_token)!==null&&h!==void 0?h:void 0})});if(a)throw a;return Ie()&&!(!((r=t.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),this._returnResult({data:{provider:t.provider,url:s==null?void 0:s.url},error:null})}catch(s){if(B(s))return this._returnResult({data:{provider:t.provider,url:null},error:s});throw s}}async linkIdentityIdToken(t){return await this._useSession(async r=>{var s;try{const{error:a,data:{session:i}}=r;if(a)throw a;const{options:o,provider:l,token:c,access_token:d,nonce:h}=t,u=await F(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=i==null?void 0:i.access_token)!==null&&s!==void 0?s:void 0,body:{provider:l,id_token:c,access_token:d,nonce:h,link_identity:!0,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Nt}),{data:p,error:x}=u;return x?this._returnResult({data:{user:null,session:null},error:x}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new sn}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:x}))}catch(a){if(await Le(this.storage,`${this.storageKey}-code-verifier`),B(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}})}async unlinkIdentity(t){try{return await this._useSession(async r=>{var s,a;const{data:i,error:o}=r;if(o)throw o;return await F(this.fetch,"DELETE",`${this.url}/user/identities/${t.identity_id}`,{headers:this.headers,jwt:(a=(s=i.session)===null||s===void 0?void 0:s.access_token)!==null&&a!==void 0?a:void 0})})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(t){const r=`#_refreshAccessToken(${t.substring(0,5)}...)`;this._debug(r,"begin");try{const s=Date.now();return await _0(async a=>(a>0&&await S0(200*Math.pow(2,a-1)),this._debug(r,"refreshing attempt",a),await F(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:t},headers:this.headers,xform:Nt})),(a,i)=>{const o=200*Math.pow(2,a);return i&&So(i)&&Date.now()+o-s<hn})}catch(s){if(this._debug(r,"error",s),B(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(r,"end")}}_isValidSession(t){return typeof t=="object"&&t!==null&&"access_token"in t&&"refresh_token"in t&&"expires_at"in t}async _handleProviderSignIn(t,r){const s=await this._getUrlForProvider(`${this.url}/authorize`,t,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",t,"options",r,"url",s),Ie()&&!r.skipBrowserRedirect&&window.location.assign(s),{data:{provider:t,url:s},error:null}}async _recoverAndRefresh(){var t,r;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const a=await Rr(this.storage,this.storageKey);if(a&&this.userStorage){let o=await Rr(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:a.user},await pn(this.userStorage,this.storageKey+"-user",o)),a.user=(t=o==null?void 0:o.user)!==null&&t!==void 0?t:_o()}else if(a&&!a.user&&!a.user){const o=await Rr(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(a.user=o.user,await Le(this.storage,this.storageKey+"-user"),await pn(this.storage,this.storageKey,a)):a.user=_o()}if(this._debug(s,"session from storage",a),!this._isValidSession(a)){this._debug(s,"session is not valid"),a!==null&&await this._removeSession();return}const i=((r=a.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<No;if(this._debug(s,`session has${i?"":" not"} expired with margin of ${No}s`),i){if(this.autoRefreshToken&&a.refresh_token){const{error:o}=await this._callRefreshToken(a.refresh_token);o&&(console.error(o),So(o)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(a.user&&a.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:l}=await this._getUser(a.access_token);!l&&(o!=null&&o.user)?(a.user=o.user,await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(s,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",a)}catch(a){this._debug(s,"error",a),console.error(a);return}finally{this._debug(s,"end")}}async _callRefreshToken(t){var r,s;if(!t)throw new it;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const a=`#_callRefreshToken(${t.substring(0,5)}...)`;this._debug(a,"begin");try{this.refreshingDeferred=new Yi;const{data:i,error:o}=await this._refreshAccessToken(t);if(o)throw o;if(!i.session)throw new it;await this._saveSession(i.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",i.session);const l={data:i.session,error:null};return this.refreshingDeferred.resolve(l),l}catch(i){if(this._debug(a,"error",i),B(i)){const o={data:null,error:i};return So(i)||await this._removeSession(),(r=this.refreshingDeferred)===null||r===void 0||r.resolve(o),o}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(i),i}finally{this.refreshingDeferred=null,this._debug(a,"end")}}async _notifyAllSubscribers(t,r,s=!0){const a=`#_notifyAllSubscribers(${t})`;this._debug(a,"begin",r,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:t,session:r});const i=[],o=Array.from(this.stateChangeEmitters.values()).map(async l=>{try{await l.callback(t,r)}catch(c){i.push(c)}});if(await Promise.all(o),i.length>0){for(let l=0;l<i.length;l+=1)console.error(i[l]);throw i[0]}}finally{this._debug(a,"end")}}async _saveSession(t){this._debug("#_saveSession()",t),this.suppressGetSessionWarning=!0,await Le(this.storage,`${this.storageKey}-code-verifier`);const r=Object.assign({},t),s=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&r.user&&await pn(this.userStorage,this.storageKey+"-user",{user:r.user});const a=Object.assign({},r);delete a.user;const i=Ou(a);await pn(this.storage,this.storageKey,i)}else{const a=Ou(r);await pn(this.storage,this.storageKey,a)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await Le(this.storage,this.storageKey),await Le(this.storage,this.storageKey+"-code-verifier"),await Le(this.storage,this.storageKey+"-user"),this.userStorage&&await Le(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const t=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{t&&Ie()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",t)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const t=setInterval(()=>this._autoRefreshTokenTick(),hn);this.autoRefreshTicker=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const t=this.autoRefreshTicker;this.autoRefreshTicker=null,t&&clearInterval(t);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const t=Date.now();try{return await this._useSession(async r=>{const{data:{session:s}}=r;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const a=Math.floor((s.expires_at*1e3-t)/hn);this._debug("#_autoRefreshTokenTick()",`access token expires in ${a} ticks, a tick lasts ${hn}ms, refresh threshold is ${Ul} ticks`),a<=Ul&&await this._callRefreshToken(s.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(t){if(t.isAcquireTimeout||t instanceof Ff)this._debug("auto refresh token tick lock not available");else throw t}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!Ie()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(t){this._debug("#visibilityChangedCallback","error",t)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(t){console.error("_handleVisibilityChange",t)}}async _onVisibilityChanged(t){const r=`#_onVisibilityChanged(${t})`;this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),t||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(t,r,s){const a=[`provider=${encodeURIComponent(r)}`];if(s!=null&&s.redirectTo&&a.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s!=null&&s.scopes&&a.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[i,o]=await an(this.storage,this.storageKey),l=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(o)}`});a.push(l.toString())}if(s!=null&&s.queryParams){const i=new URLSearchParams(s.queryParams);a.push(i.toString())}return s!=null&&s.skipBrowserRedirect&&a.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${t}?${a.join("&")}`}async _unenroll(t){try{return await this._useSession(async r=>{var s;const{data:a,error:i}=r;return i?this._returnResult({data:null,error:i}):await F(this.fetch,"DELETE",`${this.url}/factors/${t.factorId}`,{headers:this.headers,jwt:(s=a==null?void 0:a.session)===null||s===void 0?void 0:s.access_token})})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(t){try{return await this._useSession(async r=>{var s,a;const{data:i,error:o}=r;if(o)return this._returnResult({data:null,error:o});const l=Object.assign({friendly_name:t.friendlyName,factor_type:t.factorType},t.factorType==="phone"?{phone:t.phone}:t.factorType==="totp"?{issuer:t.issuer}:{}),{data:c,error:d}=await F(this.fetch,"POST",`${this.url}/factors`,{body:l,headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});return d?this._returnResult({data:null,error:d}):(t.factorType==="totp"&&c.type==="totp"&&(!((a=c==null?void 0:c.totp)===null||a===void 0)&&a.qr_code)&&(c.totp.qr_code=`data:image/svg+xml;utf-8,${c.totp.qr_code}`),this._returnResult({data:c,error:null}))})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async _verify(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var s;const{data:a,error:i}=r;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({challenge_id:t.challengeId},"webauthn"in t?{webauthn:Object.assign(Object.assign({},t.webauthn),{credential_response:t.webauthn.type==="create"?tb(t.webauthn.credential_response):rb(t.webauthn.credential_response)})}:{code:t.code}),{data:l,error:c}=await F(this.fetch,"POST",`${this.url}/factors/${t.factorId}/verify`,{body:o,headers:this.headers,jwt:(s=a==null?void 0:a.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}})}async _challenge(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var s;const{data:a,error:i}=r;if(i)return this._returnResult({data:null,error:i});const o=await F(this.fetch,"POST",`${this.url}/factors/${t.factorId}/challenge`,{body:t,headers:this.headers,jwt:(s=a==null?void 0:a.session)===null||s===void 0?void 0:s.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Z0(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:eb(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}})}async _challengeAndVerify(t){const{data:r,error:s}=await this._challenge({factorId:t.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:t.factorId,challengeId:r.id,code:t.code})}async _listFactors(){var t;const{data:{user:r},error:s}=await this.getUser();if(s)return{data:null,error:s};const a={all:[],phone:[],totp:[],webauthn:[]};for(const i of(t=r==null?void 0:r.factors)!==null&&t!==void 0?t:[])a.all.push(i),i.status==="verified"&&a[i.factor_type].push(i);return{data:a,error:null}}async _getAuthenticatorAssuranceLevel(t){var r,s,a,i;if(t)try{const{payload:x}=Oa(t);let v=null;x.aal&&(v=x.aal);let b=v;const{data:{user:w},error:g}=await this.getUser(t);if(g)return this._returnResult({data:null,error:g});((s=(r=w==null?void 0:w.factors)===null||r===void 0?void 0:r.filter(k=>k.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(b="aal2");const m=x.amr||[];return{data:{currentLevel:v,nextLevel:b,currentAuthenticationMethods:m},error:null}}catch(x){if(B(x))return this._returnResult({data:null,error:x});throw x}const{data:{session:o},error:l}=await this.getSession();if(l)return this._returnResult({data:null,error:l});if(!o)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:c}=Oa(o.access_token);let d=null;c.aal&&(d=c.aal);let h=d;((i=(a=o.user.factors)===null||a===void 0?void 0:a.filter(x=>x.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(h="aal2");const p=c.amr||[];return{data:{currentLevel:d,nextLevel:h,currentAuthenticationMethods:p},error:null}}async _getAuthorizationDetails(t){try{return await this._useSession(async r=>{const{data:{session:s},error:a}=r;return a?this._returnResult({data:null,error:a}):s?await F(this.fetch,"GET",`${this.url}/oauth/authorizations/${t}`,{headers:this.headers,jwt:s.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new it})})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(t,r){try{return await this._useSession(async s=>{const{data:{session:a},error:i}=s;if(i)return this._returnResult({data:null,error:i});if(!a)return this._returnResult({data:null,error:new it});const o=await F(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:a.access_token,body:{action:"approve"},xform:l=>({data:l,error:null})});return o.data&&o.data.redirect_url&&Ie()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(s){if(B(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(t,r){try{return await this._useSession(async s=>{const{data:{session:a},error:i}=s;if(i)return this._returnResult({data:null,error:i});if(!a)return this._returnResult({data:null,error:new it});const o=await F(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:a.access_token,body:{action:"deny"},xform:l=>({data:l,error:null})});return o.data&&o.data.redirect_url&&Ie()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(s){if(B(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async t=>{const{data:{session:r},error:s}=t;return s?this._returnResult({data:null,error:s}):r?await F(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new it})})}catch(t){if(B(t))return this._returnResult({data:null,error:t});throw t}}async _revokeOAuthGrant(t){try{return await this._useSession(async r=>{const{data:{session:s},error:a}=r;return a?this._returnResult({data:null,error:a}):s?(await F(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:t.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new it})})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(t,r={keys:[]}){let s=r.keys.find(l=>l.kid===t);if(s)return s;const a=Date.now();if(s=this.jwks.keys.find(l=>l.kid===t),s&&this.jwks_cached_at+u0>a)return s;const{data:i,error:o}=await F(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=a,s=i.keys.find(l=>l.kid===t),!s)?null:s}async getClaims(t,r={}){try{let s=t;if(!s){const{data:x,error:v}=await this.getSession();if(v||!x.session)return this._returnResult({data:null,error:v});s=x.session.access_token}const{header:a,payload:i,signature:o,raw:{header:l,payload:c}}=Oa(s);r!=null&&r.allowExpired||R0(i.exp);const d=!a.alg||a.alg.startsWith("HS")||!a.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(a.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!d){const{error:x}=await this.getUser(s);if(x)throw x;return{data:{claims:i,header:a,signature:o},error:null}}const h=O0(a.alg),u=await crypto.subtle.importKey("jwk",d,h,!0,["verify"]);if(!await crypto.subtle.verify(h,u,o,b0(`${l}.${c}`)))throw new Fl("Invalid JWT signature");return{data:{claims:i,header:a,signature:o},error:null}}catch(s){if(B(s))return this._returnResult({data:null,error:s});throw s}}}Zs.nextInstanceID={};const ub=Zs,hb="2.103.3";let hs="";typeof Deno<"u"?hs="deno":typeof document<"u"?hs="web":typeof navigator<"u"&&navigator.product==="ReactNative"?hs="react-native":hs="node";const pb={"X-Client-Info":`supabase-js-${hs}/${hb}`},fb={headers:pb},mb={schema:"public"},gb={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},xb={};function ea(e){"@babel/helpers - typeof";return ea=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ea(e)}function yb(e,t){if(ea(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var s=r.call(e,t);if(ea(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function vb(e){var t=yb(e,"string");return ea(t)=="symbol"?t:t+""}function bb(e,t,r){return(t=vb(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Fu(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,s)}return r}function ye(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Fu(Object(r),!0).forEach(function(s){bb(e,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Fu(Object(r)).forEach(function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(r,s))})}return e}const wb=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),kb=()=>Headers,jb=(e,t,r)=>{const s=wb(r),a=kb();return async(i,o)=>{var l;const c=(l=await t())!==null&&l!==void 0?l:e;let d=new a(o==null?void 0:o.headers);return d.has("apikey")||d.set("apikey",e),d.has("Authorization")||d.set("Authorization",`Bearer ${c}`),s(i,ye(ye({},o),{},{headers:d}))}};function Nb(e){return e.endsWith("/")?e:e+"/"}function Sb(e,t){var r,s;const{db:a,auth:i,realtime:o,global:l}=e,{db:c,auth:d,realtime:h,global:u}=t,p={db:ye(ye({},c),a),auth:ye(ye({},d),i),realtime:ye(ye({},h),o),storage:{},global:ye(ye(ye({},u),l),{},{headers:ye(ye({},(r=u==null?void 0:u.headers)!==null&&r!==void 0?r:{}),(s=l==null?void 0:l.headers)!==null&&s!==void 0?s:{})}),accessToken:async()=>""};return e.accessToken?p.accessToken=e.accessToken:delete p.accessToken,p}function _b(e){const t=e==null?void 0:e.trim();if(!t)throw new Error("supabaseUrl is required.");if(!t.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Nb(t))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Cb=class extends ub{constructor(e){super(e)}},Tb=class{constructor(e,t,r){var s,a;this.supabaseUrl=e,this.supabaseKey=t;const i=_b(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",i),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",i),this.storageUrl=new URL("storage/v1",i),this.functionsUrl=new URL("functions/v1",i);const o=`sb-${i.hostname.split(".")[0]}-auth-token`,l={db:mb,realtime:xb,auth:ye(ye({},gb),{},{storageKey:o}),global:fb},c=Sb(r??{},l);if(this.storageKey=(s=c.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(a=c.global.headers)!==null&&a!==void 0?a:{},c.accessToken)this.accessToken=c.accessToken,this.auth=new Proxy({},{get:(h,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var d;this.auth=this._initSupabaseAuthClient((d=c.auth)!==null&&d!==void 0?d:{},this.headers,c.global.fetch)}this.fetch=jb(t,this._getAccessToken.bind(this),c.global.fetch),this.realtime=this._initRealtimeClient(ye({headers:this.headers,accessToken:this._getAccessToken.bind(this)},c.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(h=>this.realtime.setAuth(h)).catch(h=>console.warn("Failed to set initial Realtime auth token:",h)),this.rest=new Yy(new URL("rest/v1",i).href,{headers:this.headers,schema:c.db.schema,fetch:this.fetch,timeout:c.db.timeout,urlLengthLimit:c.db.urlLengthLimit}),this.storage=new i0(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),c.accessToken||this._listenForAuthEvents()}get functions(){return new Uy(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,r)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e=this,t,r;if(e.accessToken)return await e.accessToken();const{data:s}=await e.auth.getSession();return(t=(r=s.session)===null||r===void 0?void 0:r.access_token)!==null&&t!==void 0?t:e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:s,userStorage:a,storageKey:i,flowType:o,lock:l,debug:c,throwOnError:d},h,u){const p={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Cb({url:this.authUrl.href,headers:ye(ye({},p),h),storageKey:i,autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:s,userStorage:a,flowType:o,lock:l,debug:c,throwOnError:d,fetch:u,hasCustomAuthorizationHeader:Object.keys(this.headers).some(x=>x.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new Ev(this.realtimeUrl.href,ye(ye({},e),{},{params:ye(ye({},{apikey:this.supabaseKey}),e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,"CLIENT",t==null?void 0:t.access_token)})}_handleTokenChanged(e,t,r){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const Eb=(e,t,r)=>new Tb(e,t,r);function Ab(){if(typeof window<"u")return!1;const e=globalThis.process;if(!e)return!1;const t=e.version;if(t==null)return!1;const r=t.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=18:!1}Ab()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const zb="https://placeholder.supabase.co",Pb="placeholder-key",P=Eb(zb,Pb,{auth:{persistSession:!0,autoRefreshToken:!0,storage:localStorage,storageKey:"hsc-auth"}});function Rb(e){const t=e.toLowerCase().replace(/[^a-z]/g,"").slice(0,8)||"player",r=Math.floor(1e3+Math.random()*9e3);return`${t}${r}`}function Ob(e){return e.trim().toLowerCase()}async function qf(){await P.auth.signOut()}async function Lb(e){if(!e)throw new Error("No player ID");await Promise.all([P.from("shot_logs").delete().eq("player_id",e),P.from("drill_logs").delete().eq("player_id",e),P.from("achievements").delete().eq("player_id",e)]),await P.from("players").delete().eq("id",e),await P.auth.signOut(),typeof localStorage<"u"&&localStorage.removeItem("activePlayerId")}async function Ib(){const{data:{user:e}}=await P.auth.getUser();if(!e)return null;const t=typeof localStorage<"u"?localStorage.getItem("activePlayerId"):null;try{const{data:s,error:a}=await P.from("players").select("*, team:teams(id, name, code)").eq("account_id",e.id).order("created_at");if(!a&&(s==null?void 0:s.length)>0){if(t){const i=s.find(o=>o.id===t);if(i)return i}return s[0]}}catch{}const{data:r}=await P.from("players").select("*, team:teams(id, name, code)").eq("id",e.id).maybeSingle();return r}async function Ml({firstName:e,displayName:t,position:r,ageBracket:s,teamId:a,clubId:i,clubName:o,lifetimeShotGoal:l=5e3,stickhandlingHourGoal:c=5}){const{data:{user:d}}=await P.auth.getUser();if(!d)throw new Error("Must be signed in with Google");const h=Rb(e||t),u=crypto.randomUUID(),{error:p}=await P.from("players").insert({id:u,display_name:t,first_name:(e==null?void 0:e.trim())||null,username:h,position:r,age_bracket:s,team_id:a||null,club_id:i||null,club_name:o||null,account_id:d.id,lifetime_shot_goal:l,stickhandling_hour_goal:c});if(p)throw p;return typeof localStorage<"u"&&localStorage.setItem("activePlayerId",u),{username:h,playerId:u}}async function $b(){const{data:{user:e}}=await P.auth.getUser();if(!e)return[];const{data:t}=await P.from("players").select("*, team:teams(id, name, code)").eq("account_id",e.id).order("created_at");return t||[]}async function Mu(){const{error:e}=await P.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+"/start?oauth=1"}});if(e)throw e}async function To(){const{error:e}=await P.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+"/coach/start"}});if(e)throw e}async function Db({email:e,password:t}){const r=Ob(e),{error:s}=await P.auth.signInWithPassword({email:r,password:t});if(s)throw s}const Gf=y.createContext(null);function Ub({children:e}){const[t,r]=y.useState(null),[s,a]=y.useState(!0),i=y.useCallback(async()=>{const o=await Ib();return r(o),o},[]);return y.useEffect(()=>{let o=!0;i().finally(()=>{o&&a(!1)});const{data:l}=P.auth.onAuthStateChange(async c=>{c==="SIGNED_OUT"?r(null):(c==="SIGNED_IN"||c==="TOKEN_REFRESHED")&&await i()});return()=>{o=!1,l.subscription.unsubscribe()}},[i]),n.jsx(Gf.Provider,{value:{player:t,loading:s,refresh:i,setPlayer:r},children:e})}function Ft(){const e=y.useContext(Gf);if(!e)throw new Error("useAuth must be used inside AuthProvider");return e}const K="https://hockeyshotchallenge.com",Bb="Hockey Shot Challenge — Track every shot. Climb the rankings.",Wb="Off-ice hockey practice tracking for kids ages 6-18. Log your shots, climb team and global leaderboards, earn ranks, and get better every day.",Fb=`${K}/og-image.png`;function mt(e,t,r){let s=document.querySelector(`meta[${e}="${t}"]`);s||(s=document.createElement("meta"),s.setAttribute(e,t),document.head.appendChild(s)),s.setAttribute("content",r)}function Mb(e,t){let r=document.querySelector(`link[rel="${e}"]`);r||(r=document.createElement("link"),r.setAttribute("rel",e),document.head.appendChild(r)),r.setAttribute("href",t)}function ce({title:e,description:t,image:r,url:s,type:a="website",noindex:i=!1}={}){const o=e?`${e} · Hockey Shot Challenge`:Bb,l=t||Wb,c=r||Fb,d=s||`${K}${typeof window<"u"?window.location.pathname:""}`;document.title=o,mt("name","description",l),mt("name","robots",i?"noindex, nofollow":"index, follow"),mt("property","og:title",o),mt("property","og:description",l),mt("property","og:image",c),mt("property","og:url",d),mt("property","og:type",a),mt("property","og:site_name","Hockey Shot Challenge"),mt("name","twitter:card","summary_large_image"),mt("name","twitter:title",o),mt("name","twitter:description",l),mt("name","twitter:image",c),Mb("canonical",d)}function ft(e){document.querySelectorAll("script[data-seo-jsonld]").forEach(r=>r.remove()),(Array.isArray(e)?e:[e]).forEach((r,s)=>{const a=document.createElement("script");a.type="application/ld+json",a.setAttribute("data-seo-jsonld",String(s)),a.textContent=JSON.stringify(r),document.head.appendChild(a)})}function Hl(){const[e,t]=y.useState(!1),[r,s]=y.useState(!1),[a,i]=y.useState(!1),[o,l]=y.useState(""),[c,d]=y.useState("#"),[h,u]=y.useState("email us directly");y.useEffect(()=>{const x="samuelmenard",v="gmail.com";d(`mailto:${x}@${v}?subject=Hockey%20Shot%20Challenge`),u(`${x}@${v}`)},[]);async function p(x){x.preventDefault(),l(""),s(!0);const v=x.currentTarget,b=new FormData(v);if(b.get("bot-field")){s(!1),i(!0);return}const w=new URLSearchParams;for(const[g,f]of b.entries())w.append(g,String(f));try{const g=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:w.toString()});if(!g.ok)throw new Error(`HTTP ${g.status}`);i(!0),v.reset()}catch{l("Couldn't send. Try again, or email directly below.")}finally{s(!1)}}return n.jsxs("section",{className:"contact-section",children:[n.jsxs("div",{className:"contact-inner",children:[n.jsxs("div",{className:"contact-head",children:[n.jsx("div",{className:"contact-eyebrow",children:"GET IN TOUCH"}),n.jsx("h2",{className:"contact-title",children:"Questions, ideas, or want to bring your club on board?"}),n.jsx("p",{className:"contact-sub",children:"Built by a hockey parent in Burlington, ON. I read everything."})]}),!e&&!a&&n.jsxs("div",{className:"contact-actions",children:[n.jsx("button",{className:"contact-btn-primary",onClick:()=>t(!0),children:"Send a message →"}),n.jsxs("span",{className:"contact-or",children:["or ",n.jsx("a",{className:"contact-mailto",href:c,children:h})]})]}),a&&n.jsxs("div",{className:"contact-success",children:[n.jsx("div",{className:"contact-success-check",children:"✓"}),n.jsxs("div",{children:[n.jsx("div",{className:"contact-success-title",children:"Message sent."}),n.jsx("div",{className:"contact-success-text",children:"Thanks — I'll get back to you soon."})]})]}),e&&!a&&n.jsxs("form",{className:"contact-form",name:"contact",method:"POST","data-netlify":"true","data-netlify-honeypot":"bot-field",onSubmit:p,children:[n.jsx("input",{type:"hidden",name:"form-name",value:"contact"}),n.jsx("p",{className:"contact-honeypot",children:n.jsxs("label",{children:["Don't fill this out if you're human: ",n.jsx("input",{name:"bot-field"})]})}),n.jsxs("div",{className:"contact-row",children:[n.jsxs("label",{className:"contact-field",children:[n.jsx("span",{className:"contact-label",children:"Name"}),n.jsx("input",{name:"name",required:!0,autoComplete:"name"})]}),n.jsxs("label",{className:"contact-field",children:[n.jsx("span",{className:"contact-label",children:"Email"}),n.jsx("input",{type:"email",name:"email",required:!0,autoComplete:"email"})]})]}),n.jsxs("label",{className:"contact-field",children:[n.jsx("span",{className:"contact-label",children:"I'm a…"}),n.jsxs("select",{name:"role",required:!0,defaultValue:"",children:[n.jsx("option",{value:"",disabled:!0,children:"Select one"}),n.jsx("option",{value:"coach",children:"Coach"}),n.jsx("option",{value:"club_admin",children:"Club admin / league director"}),n.jsx("option",{value:"parent",children:"Parent"}),n.jsx("option",{value:"player",children:"Player"}),n.jsx("option",{value:"other",children:"Other"})]})]}),n.jsxs("label",{className:"contact-field",children:[n.jsx("span",{className:"contact-label",children:"Message"}),n.jsx("textarea",{name:"message",rows:"4",required:!0})]}),o&&n.jsx("div",{className:"contact-error",children:o}),n.jsxs("div",{className:"contact-submit-row",children:[n.jsx("button",{type:"submit",className:"contact-btn-primary",disabled:r,children:r?"Sending…":"Send message →"}),n.jsx("button",{type:"button",className:"contact-btn-ghost",onClick:()=>t(!1),children:"Cancel"})]}),n.jsxs("div",{className:"contact-fallback",children:["Prefer email? ",n.jsx("a",{className:"contact-mailto",href:c,children:h})]})]})]}),n.jsx("style",{children:Hb})]})}const Hb=`
.contact-section {
  padding: 60px clamp(16px, 5vw, 40px);
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.03));
}
.contact-inner {
  max-width: 640px;
  margin: 0 auto;
}
.contact-head { text-align: center; margin-bottom: 28px; }
.contact-eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.contact-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.2px;
  color: white;
  margin: 0 0 10px;
}
.contact-sub {
  font-size: 15px;
  color: var(--text-soft);
  line-height: 1.5;
  margin: 0;
}
.contact-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}
.contact-or {
  color: var(--text-mute);
  font-size: 14px;
}
.contact-mailto {
  color: var(--ice);
  text-decoration: underline;
  text-decoration-color: rgba(168, 212, 245, 0.3);
  text-underline-offset: 3px;
}
.contact-mailto:hover { color: white; }

.contact-btn-primary {
  background: var(--accent);
  color: white;
  padding: 13px 22px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  transition: transform 0.1s, background 0.15s;
}
.contact-btn-primary:hover { background: var(--accent-soft); }
.contact-btn-primary:active { transform: scale(0.98); }
.contact-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.contact-btn-ghost {
  background: transparent;
  color: var(--text-soft);
  padding: 13px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}
.contact-btn-ghost:hover { color: white; }

.contact-form {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: contact-fade-in 0.2s ease-out;
}
@keyframes contact-fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.contact-honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.contact-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 600px) {
  .contact-row { grid-template-columns: 1fr 1fr; }
}
.contact-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.contact-label {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.contact-field input,
.contact-field select,
.contact-field textarea {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: 8px;
  padding: 11px 12px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15px;
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}
.contact-field input:focus,
.contact-field select:focus,
.contact-field textarea:focus {
  border-color: var(--accent);
}
.contact-field textarea {
  resize: vertical;
  min-height: 90px;
  font-family: var(--font-body);
}
.contact-field select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--text-mute) 50%), linear-gradient(135deg, var(--text-mute) 50%, transparent 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  padding-right: 32px;
}

.contact-error {
  background: rgba(255, 122, 41, 0.12);
  border: 0.5px solid rgba(255, 122, 41, 0.4);
  color: var(--warn-soft);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
}

.contact-submit-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 4px;
}

.contact-fallback {
  font-size: 13px;
  color: var(--text-mute);
  text-align: center;
  margin-top: 4px;
}

.contact-success {
  background: var(--surface);
  border: 0.5px solid rgba(61, 214, 140, 0.4);
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  animation: contact-fade-in 0.25s ease-out;
}
.contact-success-check {
  width: 38px; height: 38px;
  background: rgba(61, 214, 140, 0.18);
  color: var(--success);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  flex-shrink: 0;
}
.contact-success-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: white;
}
.contact-success-text {
  font-size: 14px;
  color: var(--text-soft);
  margin-top: 2px;
}
`;async function Hu({playerId:e,shotType:t,count:r=1}){const{error:s}=await P.from("shot_logs").insert({player_id:e,shot_type:t,count:r});if(s)throw s}function kt(){const e=new Date,r=(e.getUTCDay()+6)%7,s=new Date(e);return s.setUTCDate(e.getUTCDate()-r),s.toISOString().slice(0,10)}async function qb(e){const t=new Date().toISOString().slice(0,10),r=kt(),{data:s,error:a}=await P.from("shot_logs").select("shot_type, count, log_date").eq("player_id",e).gte("log_date",r);if(a)throw a;const i=(s||[]).filter(d=>d.log_date===t),o=i.reduce((d,h)=>d+h.count,0),l=(s||[]).reduce((d,h)=>d+h.count,0),c={Wrist:0,Snap:0,Slap:0,Backhand:0,Saves:0,"Toe Drag":0,"Figure 8":0,Lateral:0,"One-Hand":0};return i.forEach(d=>{c[d.shot_type]=(c[d.shot_type]||0)+d.count}),{todayTotal:o,weekTotal:l,todayByType:c}}async function Kf(e){const{data:t,error:r}=await P.from("shot_logs").select("shot_type, count").eq("player_id",e);if(r)throw r;const s={Wrist:0,Snap:0,Slap:0,Backhand:0,Saves:0};return(t||[]).forEach(a=>{s[a.shot_type]=(s[a.shot_type]||0)+a.count}),s}function Gb(e,t){let r=0;for(let s=0;s<e.length;s++)r=Math.imul(31,r)+e.charCodeAt(s)>>>0;return r%t}async function Kb(e,t){if(!e)return null;const r=new Date().toISOString().slice(0,10),s=kt(),{data:a}=await P.from("players").select("id, display_name, lifetime_shots").eq("team_id",e).neq("id",t).order("id");if(!a||a.length===0)return null;const i=t+s,o=a[Gb(i,a.length)],[{data:l},{data:c}]=await Promise.all([P.from("shot_logs").select("count").eq("player_id",o.id).eq("log_date",r),P.from("shot_logs").select("count").eq("player_id",o.id).gte("log_date",s)]),d=(l||[]).reduce((u,p)=>u+p.count,0),h=(c||[]).reduce((u,p)=>u+p.count,0);return{...o,today_shots:d,week_shots:h}}async function Vb({teamId:e,clubName:t,limit:r=50}){let s=P.from("players").select("id, username, display_name, position, lifetime_shots, current_streak, card_number, club_name, team:teams(id, name)").order("lifetime_shots",{ascending:!1}).limit(r);e&&(s=s.eq("team_id",e)),t&&(s=s.eq("club_name",t));const{data:a,error:i}=await s;if(i)throw i;return a||[]}async function Yb({teamId:e,clubName:t,limit:r=50}){const s=kt();let a=null;if(e||t){let u=P.from("players").select("id");e&&(u=u.eq("team_id",e)),t&&(u=u.eq("club_name",t));const{data:p}=await u;if(a=(p||[]).map(x=>x.id),a.length===0)return[]}let i=P.from("shot_logs").select("player_id, count").gte("log_date",s);a&&(i=i.in("player_id",a));const{data:o,error:l}=await i;if(l)throw l;const c={};(o||[]).forEach(u=>{c[u.player_id]=(c[u.player_id]||0)+u.count});const d=Object.keys(c);if(d.length===0)return[];const{data:h}=await P.from("players").select("id, username, display_name, position, lifetime_shots, current_streak, card_number, team:teams(id, name)").in("id",d);return(h||[]).map(u=>({...u,week_shots:c[u.id]||0})).sort((u,p)=>p.week_shots-u.week_shots).slice(0,r)}async function Jb(e){const{data:t}=await P.from("daily_progress").select("shots_total").eq("player_id",e).order("shots_total",{ascending:!1}).limit(1).maybeSingle();return(t==null?void 0:t.shots_total)??0}async function Qb(e){if(!e)return 0;const{count:t}=await P.from("players").select("*",{count:"exact",head:!0}).eq("team_id",e);return t||0}async function Xb(e){if(!e)return 0;const{count:t}=await P.from("players").select("*",{count:"exact",head:!0}).eq("club_name",e);return t||0}const Cs=["U7","U8","U9","U10","U11","U12","U13","U14","U15","U16","U17","U18"],Ts=["House","Select","A","AA","AAA"];async function Qr(e,t=10){if(!e||e.trim().length<2)return[];const r=e.trim().toLowerCase(),{data:s,error:a}=await P.from("clubs").select("id, name, slug, city, province, country, governing_body, gender_type, org_type, player_count").ilike("search_text",`%${r}%`).eq("is_seeded",!0).eq("is_active",!0).order("name").limit(t);return a?(console.warn("searchClubs error:",a),[]):s||[]}async function ta(e){if(!e)return null;const{data:t}=await P.from("clubs").select("id, name, slug, city, province, country, governing_body, gender_type, org_type, created_at").eq("slug",e).maybeSingle();return t}async function Kc(e){if(!e)return{playerCount:0,teamCount:0,totalShots:0};const[{count:t},{count:r},{data:s}]=await Promise.all([P.from("players").select("*",{count:"exact",head:!0}).eq("club_id",e),P.from("teams").select("*",{count:"exact",head:!0}).eq("club_id",e),P.from("players").select("lifetime_shots").eq("club_id",e)]),a=(s||[]).reduce((i,o)=>i+(o.lifetime_shots||0),0);return{playerCount:t||0,teamCount:r||0,totalShots:a}}async function Vc(e){if(!e)return[];const{data:t}=await P.from("teams").select("id, name, code").eq("club_id",e).order("name");return t||[]}async function Vf({clubId:e,ageDivision:t,tier:r,season:s="2025-26"}){const{data:a,error:i}=await P.rpc("find_or_create_team_for_player",{p_club_id:e,p_age_division:t,p_tier:r,p_season:s});if(i)throw i;const o=Array.isArray(a)?a[0]:a;if(!o)throw new Error("No team result");return{teamId:o.team_id,teamName:o.team_name,teamExisted:o.team_existed}}async function Zb({name:e,city:t,governingBody:r,contactEmail:s}){const{data:{user:a}}=await P.auth.getUser(),{data:i,error:o}=await P.from("pending_clubs").insert({name:e.trim(),city:(t==null?void 0:t.trim())||null,governing_body:(r==null?void 0:r.trim())||null,contact_email:(s==null?void 0:s.trim())||null,submitted_by:(a==null?void 0:a.id)||null}).select("*").single();if(o)throw console.warn("submitPendingClub error:",o),o;return i}async function ew({displayName:e,email:t,clubId:r,isDirector:s=!1}){const{data:{user:a}}=await P.auth.getUser();if(!a)throw new Error("Must be signed in");const{error:i}=await P.from("coaches").insert({id:a.id,display_name:e,email:t||a.email,club_id:r,is_director:s});if(i)throw i}async function ps(){const{data:{user:e}}=await P.auth.getUser();if(!e)return null;const{data:t}=await P.from("coaches").select("*, club:clubs(id, name, slug, city)").eq("id",e.id).maybeSingle();return t}async function tw(e){if(!e)return[];const{data:t}=await P.from("players").select("id, display_name, position, lifetime_shots, current_streak, card_number, team:teams(id, name)").eq("club_id",e).order("lifetime_shots",{ascending:!1});return t||[]}async function Yf(e){var N;if(!e)return null;const t=new Date,s=(t.getUTCDay()+6)%7,a=new Date(t);a.setUTCDate(t.getUTCDate()-s);const i=a.toISOString().slice(0,10),o=new Date(a);o.setUTCDate(a.getUTCDate()-7);const l=o.toISOString().slice(0,10),c=new Date(a);c.setUTCDate(a.getUTCDate()-1);const d=c.toISOString().slice(0,10),{data:h}=await P.from("players").select("id, display_name").eq("club_id",e);if(!(h!=null&&h.length))return null;const u=h.map(S=>S.id),p=Object.fromEntries(h.map(S=>[S.id,S.display_name])),{data:x}=await P.from("shot_logs").select("player_id, count, log_date").in("player_id",u).gte("log_date",l),v={};let b=0;for(const S of x||[])S.log_date>=i?v[S.player_id]=(v[S.player_id]||0)+S.count:S.log_date<=d&&(b+=S.count);const w=Object.values(v).reduce((S,_)=>S+_,0),g=Object.keys(v).length,f=(N=Object.entries(v).sort((S,_)=>_[1]-S[1])[0])==null?void 0:N[0],m=f?{name:p[f],shots:v[f]}:null,k=b===0?null:Math.round((w-b)/b*100);return{thisWeekTotal:w,lastWeekTotal:b,vsLastWeek:k,activePlayers:g,topPlayer:m,totalPlayers:h.length}}async function rw(e,t=5){if(!e)return[];const r=kt(),{data:s}=await P.from("players").select("id, display_name, position, team:teams(name, age_division, tier)").eq("club_id",e);if(!(s!=null&&s.length))return[];const a=s.map(c=>c.id),{data:i}=await P.from("shot_logs").select("player_id, count").in("player_id",a).gte("log_date",r);if(!(i!=null&&i.length))return[];const o={};for(const c of i)o[c.player_id]=(o[c.player_id]||0)+c.count;const l=Object.fromEntries(s.map(c=>[c.id,c]));return Object.entries(o).sort((c,d)=>d[1]-c[1]).slice(0,t).map(([c,d])=>({...l[c],week_shots:d}))}async function Jf(e){if(!e)return[];const t=kt(),{data:r}=await P.from("teams").select("id, name, age_division, tier").eq("club_id",e).eq("is_active",!0);if(!(r!=null&&r.length))return[];const{data:s}=await P.from("players").select("id, team_id").eq("club_id",e).not("team_id","is",null);if(!(s!=null&&s.length))return r.map(c=>({...c,week_shots:0,player_count:0}));const a=s.map(c=>c.id),{data:i}=await P.from("shot_logs").select("player_id, count").in("player_id",a).gte("log_date",t),o={};for(const c of i||[])o[c.player_id]=(o[c.player_id]||0)+c.count;const l={};for(const c of s)l[c.team_id]||(l[c.team_id]=[]),l[c.team_id].push(c.id);return r.map(c=>{const d=l[c.id]||[],h=d.reduce((u,p)=>u+(o[p]||0),0);return{...c,week_shots:h,player_count:d.length}}).sort((c,d)=>d.week_shots-c.week_shots)}async function nw(){const e=kt(),{data:t}=await P.from("players").select("id, team_id, team:teams(id, name, age_division, tier, club:clubs(id, name, city, slug))").not("team_id","is",null);if(!(t!=null&&t.length))return null;const r=t.map(l=>l.id),{data:s}=await P.from("shot_logs").select("player_id, count").in("player_id",r).gte("log_date",e);if(!(s!=null&&s.length))return null;const a={};for(const l of s)a[l.player_id]=(a[l.player_id]||0)+l.count;const i={};for(const l of t)l.team&&(i[l.team_id]||(i[l.team_id]={team:l.team,shots:0,players:0}),i[l.team_id].shots+=a[l.id]||0,a[l.id]&&(i[l.team_id].players+=1));return Object.values(i).filter(l=>l.shots>0).sort((l,c)=>c.shots-l.shots)[0]||null}async function sw(){const{data:e,error:t}=await P.from("players").select("club_id, lifetime_shots, club:clubs(id, name, city, slug, province)").not("club_id","is",null).gt("lifetime_shots",0);if(t)return[];const r={};for(const s of e||[]){if(!s.club)continue;const a=s.club_id;r[a]||(r[a]={club_id:a,name:s.club.name,city:s.club.city,slug:s.club.slug,province:s.club.province,total_shots:0,player_count:0}),r[a].total_shots+=s.lifetime_shots||0,r[a].player_count+=1}return Object.values(r).sort((s,a)=>a.total_shots-s.total_shots)}async function aw(e){if(!e)return[];const{data:t}=await P.from("players").select("id, display_name, team:teams(name)").eq("club_id",e);if(!(t!=null&&t.length))return[];const r=t.map(l=>l.id),s=(()=>{const l=new Date,c=l.getUTCDay(),d=new Date(l);return d.setUTCDate(l.getUTCDate()-(c+6)%7),d.toISOString().slice(0,10)})(),a=["Toe Drag","Figure 8","Lateral","One-Hand"],{data:i}=await P.from("shot_logs").select("player_id, shot_type, count").in("player_id",r).in("shot_type",a).gte("log_date",s),o={};for(const l of i||[])o[l.player_id]||(o[l.player_id]={total:0}),o[l.player_id].total+=l.count,o[l.player_id][l.shot_type]=(o[l.player_id][l.shot_type]||0)+l.count;return t.map(l=>({...l,drills:o[l.id]||{total:0}})).filter(l=>l.drills.total>0).sort((l,c)=>c.drills.total-l.drills.total)}function iw(){const e=re(),{player:t}=Ft(),[r,s]=y.useState(""),[a,i]=y.useState([]),[o,l]=y.useState(!1),[c,d]=y.useState(null),h=y.useRef(null),u=y.useRef(null);return y.useEffect(()=>{if(h.current&&clearTimeout(h.current),!r.trim()||r.trim().length<2){i([]),l(!1);return}return l(!0),h.current=setTimeout(async()=>{try{const p=await Qr(r,6);i(p||[])}catch{i([])}finally{l(!1)}},200),()=>{h.current&&clearTimeout(h.current)}},[r]),y.useEffect(()=>{P.rpc("get_total_shots").then(({data:p})=>{p&&d(p)})},[]),y.useEffect(()=>{ce({title:null,description:"Free off-ice hockey tracker for players and coaches. Kids log shots and stickhandling every day. Coaches see who's putting in the work. Compete in weekly 1v1 battles. Free for ages 6–18.",url:K}),ft({"@context":"https://schema.org","@type":"SoftwareApplication",name:"Hockey Shot Challenge",description:"Off-ice hockey training app for kids. Track shots and stickhandling reps, compete on leaderboards, coaches see who's working.",applicationCategory:"SportsApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"CAD"},aggregateRating:{"@type":"AggregateRating",ratingValue:"4.9",ratingCount:"50"}})},[]),n.jsxs("div",{className:"landing",children:[n.jsxs("nav",{className:"land-nav",children:[n.jsxs("button",{className:"land-brand",onClick:()=>e("/"),children:[n.jsx(qu,{}),n.jsx("span",{children:"Hockey Shot Challenge"})]}),n.jsxs("div",{className:"land-nav-actions",style:{display:"flex",alignItems:"center",gap:"16px"},children:[n.jsx("a",{href:"#how-it-works",className:"land-nav-link",style:{color:"var(--text-soft)",fontSize:"14px",textDecoration:"none"},children:"How it works"}),n.jsx("a",{href:"#faq",className:"land-nav-link",style:{color:"var(--text-soft)",fontSize:"14px",textDecoration:"none"},children:"FAQ"}),n.jsx("button",{className:"land-nav-link",onClick:()=>e("/challenges"),style:{color:"var(--text-soft)",fontSize:"14px",background:"transparent",cursor:"pointer",border:"none"},children:"Challenges"}),n.jsx("button",{className:"land-nav-link",onClick:()=>e("/province-wide-challenge"),style:{color:"var(--text-soft)",fontSize:"14px",background:"transparent",cursor:"pointer",border:"none"},children:"For Leagues"}),n.jsx("button",{className:"land-nav-cta",onClick:()=>e(t?"/home":"/start?mode=signin"),children:"My Dashboard →"})]})]}),n.jsxs("section",{className:"hero",children:[n.jsx("div",{className:"hero-eyebrow",children:"FREE · FOR HOCKEY PLAYERS · AGES 6–18"}),n.jsx("h1",{className:"hero-title",children:"Shoot more. Track it. Beat your rival."}),n.jsx("p",{className:"hero-sub",children:"Log your shots and stickhandling after every practice. Your teammates, parents, and coach can all see how hard you're working."}),c>0&&n.jsxs("div",{className:"hero-stat",children:["🏒 ",n.jsx("strong",{children:c.toLocaleString()})," shots logged by real players"]}),n.jsxs("div",{className:"hero-paths",children:[n.jsxs("button",{className:"hero-path hero-path--player",onClick:()=>e("/start"),children:[n.jsx("div",{className:"hero-path-eyebrow",children:"PLAYERS & PARENTS"}),n.jsx("div",{className:"hero-path-title",children:"Go outside. Shoot. Log it. Watch your rank climb."}),n.jsxs("div",{className:"hero-path-detail",children:[n.jsx("span",{children:"🥅 Shots"}),n.jsx("span",{children:"🏒 Stickhandling"}),n.jsx("span",{children:"🔥 Streaks"}),n.jsx("span",{children:"🏅 Ranks"})]}),n.jsx("div",{className:"hero-path-btn hero-path-btn--player",children:"Sign in to track shots →"})]}),n.jsxs("button",{className:"hero-path hero-path--coach",onClick:()=>e("/coach"),children:[n.jsx("div",{className:"hero-path-eyebrow",children:"COACHES"}),n.jsx("div",{className:"hero-path-title",children:"Know who's been shooting before they walk into practice."}),n.jsxs("div",{className:"hero-path-detail",children:[n.jsx("span",{children:"📊 Who logged this week"}),n.jsx("span",{children:"📈 Shot counts"}),n.jsx("span",{children:"⚔️ 1v1 battles"})]}),n.jsx("div",{className:"hero-path-btn hero-path-btn--coach",children:"Set up my team →"})]})]}),n.jsxs("div",{className:"hero-club-search",children:[n.jsx("div",{className:"hero-club-search-label",children:"Is your team already on here?"}),n.jsxs("div",{style:{position:"relative",maxWidth:420,margin:"0 auto"},children:[n.jsx("input",{ref:u,type:"text",className:"hero-search-input",placeholder:"Burlington Eagles, Mississauga…",value:r,onChange:p=>s(p.target.value),autoComplete:"off",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false"}),r.trim().length>=2&&n.jsxs("div",{className:"hero-search-dropdown",children:[o&&a.length===0&&n.jsx("div",{className:"hero-search-status",children:"Searching…"}),!o&&a.length===0&&n.jsxs("div",{className:"hero-search-status",children:["No clubs found. ",n.jsx("button",{className:"hero-search-add",onClick:()=>e("/coach"),children:"Add yours →"})]}),a.map(p=>n.jsxs("div",{className:"hero-search-result-wrap",children:[n.jsxs("button",{className:"hero-search-result",onClick:()=>{e(`/clubs/${p.slug}`),s(""),i([])},children:[n.jsx("span",{className:"hero-search-result-name",children:p.name}),n.jsx("span",{className:"hero-search-result-meta",children:[p.city,p.governing_body].filter(Boolean).join(" · ")})]}),n.jsx("button",{className:"hero-search-join",onClick:()=>{e(`/start?club=${p.slug}`),s(""),i([])},children:"Sign up →"})]},p.id))]})]})]})]}),n.jsxs("section",{id:"how-it-works",className:"hiw",children:[n.jsx("div",{className:"hiw-label",children:"HOW IT WORKS"}),n.jsxs("div",{className:"hiw-steps",children:[n.jsxs("div",{className:"hiw-step",children:[n.jsx("div",{className:"hiw-step-num",children:"1"}),n.jsxs("div",{className:"hiw-step-visual hiw-step-visual--signin",children:[n.jsxs("div",{className:"hiw-google-btn",children:[n.jsx(ow,{}),"Sign in with Google"]}),n.jsx("div",{className:"hiw-visual-hint",children:"Takes 30 seconds"})]}),n.jsx("div",{className:"hiw-step-text",children:"Sign in with your Google account. Pick a name for your player. Done."})]}),n.jsx("div",{className:"hiw-arrow",children:"→"}),n.jsxs("div",{className:"hiw-step",children:[n.jsx("div",{className:"hiw-step-num",children:"2"}),n.jsxs("div",{className:"hiw-step-visual hiw-step-visual--log",children:[n.jsxs("div",{className:"hiw-shot-types",children:[n.jsx("div",{className:"hiw-shot-pill hiw-shot-pill--active",children:"Wrist"}),n.jsx("div",{className:"hiw-shot-pill",children:"Snap"}),n.jsx("div",{className:"hiw-shot-pill",children:"Slap"}),n.jsx("div",{className:"hiw-shot-pill",children:"BH"})]}),n.jsxs("div",{className:"hiw-shot-count",children:[n.jsx("span",{className:"hiw-shot-num",children:"50"}),n.jsx("span",{className:"hiw-shot-save",children:"Save →"})]})]}),n.jsx("div",{className:"hiw-step-text",children:"After practice, tap a shot type, enter how many, hit save. Takes 5 seconds."})]}),n.jsx("div",{className:"hiw-arrow",children:"→"}),n.jsxs("div",{className:"hiw-step",children:[n.jsx("div",{className:"hiw-step-num",children:"3"}),n.jsx("div",{className:"hiw-step-visual hiw-step-visual--board",children:[{name:"Liam K.",shots:191,you:!1},{name:"You",shots:168,you:!0},{name:"Jake T.",shots:84,you:!1}].map((p,x)=>n.jsxs("div",{className:`hiw-board-row${p.you?" hiw-board-row--you":""}`,children:[n.jsxs("span",{className:"hiw-board-pos",children:["#",x+1]}),n.jsx("span",{className:"hiw-board-name",children:p.name}),n.jsx("span",{className:"hiw-board-shots",children:p.shots})]},p.name))}),n.jsx("div",{className:"hiw-step-text",children:"See exactly where you rank on your team. Your coach and parents can see it too."})]})]}),n.jsx("div",{className:"hiw-footer",children:"Next time you open the app — you're straight to your dashboard. Just log and go."})]}),n.jsxs("section",{className:"section section--compete",children:[n.jsxs("div",{className:"section-head",children:[n.jsx("div",{className:"section-eyebrow",children:"⚔️ 1V1 BATTLES"}),n.jsx("h2",{className:"section-title",children:"You vs one rival. All week."}),n.jsx("p",{className:"section-sub",children:"Every Monday you get matched against one player from another team. Every shot you log counts. Most shots by Sunday wins. Then it resets and you get a new rival."})]}),n.jsx(lw,{})]}),n.jsxs("section",{id:"faq",className:"section",children:[n.jsxs("div",{className:"section-head",children:[n.jsx("div",{className:"section-eyebrow",children:"FAQ"}),n.jsx("h2",{className:"section-title",children:"Quick answers"})]}),n.jsxs("div",{className:"faq-list",children:[n.jsxs("details",{className:"faq-item",children:[n.jsx("summary",{children:"Is it really free?"}),n.jsx("p",{children:"Yes. Players, parents, coaches, and clubs all use it free. No subscription, no app to download."})]}),n.jsxs("details",{className:"faq-item",children:[n.jsx("summary",{children:"Do kids need an email or password?"}),n.jsx("p",{children:"No. Parents sign in with their Google account. Kids pick a screen name and tap to log. That's it."})]}),n.jsxs("details",{className:"faq-item",children:[n.jsx("summary",{children:"What can players track?"}),n.jsx("p",{children:"Shots (wrist, snap, slap, backhand), saves for goalies, and stickhandling drills. Takes 5 seconds to log a session."})]}),n.jsxs("details",{className:"faq-item",children:[n.jsx("summary",{children:"How do coaches get their team on it?"}),n.jsx("p",{children:"Sign in with Google, set up your team, and you get one invite link. Send it to parents — they tap it, sign up, and their kid appears on your team leaderboard."})]})]})]}),n.jsxs("section",{className:"final-cta",children:[n.jsxs("h2",{className:"final-cta-title",children:["Go shoot some pucks.",n.jsx("br",{}),"Then log it."]}),n.jsxs("div",{className:"final-cta-paths",children:[n.jsx("button",{className:"final-cta-btn final-cta-btn--player",onClick:()=>e("/player"),children:"I'm a player or parent →"}),n.jsx("button",{className:"final-cta-btn final-cta-btn--coach",onClick:()=>e("/coach"),children:"I'm a coach →"})]}),n.jsx("div",{className:"final-cta-sub",children:"Free. No app to download. Takes 2 minutes to sign up."}),n.jsx("button",{className:"final-cta-guide",onClick:()=>e("/blog/getting-started"),children:"New to this? Read the parent guide →"})]}),n.jsx(Hl,{}),n.jsxs("footer",{className:"land-footer",children:[n.jsxs("button",{className:"foot-brand",onClick:()=>e("/"),children:[n.jsx(qu,{}),n.jsx("span",{children:"Hockey Shot Challenge"})]}),n.jsxs("div",{className:"foot-links",children:[n.jsx("button",{className:"foot-link",onClick:()=>e("/for-clubs"),children:"For clubs"}),n.jsx("button",{className:"foot-link",onClick:()=>e("/coach"),children:"Coaches"}),n.jsx("button",{className:"foot-link",onClick:()=>e("/blog"),children:"Guides"}),n.jsx("button",{className:"foot-link",onClick:()=>e("/start"),children:"Sign in"}),n.jsx("button",{className:"foot-link",onClick:()=>e("/privacy"),children:"Privacy"}),n.jsx("a",{href:"https://www.usahockey.com",target:"_blank",rel:"noopener noreferrer",className:"foot-link",style:{color:"var(--text-soft)",textDecoration:"none"},children:"USA Hockey"}),n.jsx("a",{href:"https://www.hockeycanada.ca",target:"_blank",rel:"noopener noreferrer",className:"foot-link",style:{color:"var(--text-soft)",textDecoration:"none"},children:"Hockey Canada"})]}),n.jsxs("div",{className:"foot-copy",children:["© ",new Date().getFullYear()," Hockey Shot Challenge · Built in Burlington, ON"]})]}),n.jsx("style",{children:cw})]})}function ow(){return n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 18 18",style:{flexShrink:0},children:[n.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",fill:"#4285F4"}),n.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z",fill:"#34A853"}),n.jsx("path",{d:"M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z",fill:"#FBBC05"}),n.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z",fill:"#EA4335"})]})}function qu(){return n.jsxs("svg",{width:"26",height:"26",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[n.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),n.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}function lw(){const s=Math.round(43.75);return n.jsx("div",{className:"sbm-wrap",children:n.jsxs("div",{className:"sbm-card",children:[n.jsxs("div",{className:"sbm-header",children:[n.jsx("div",{className:"sbm-eyebrow",children:"⚔️ 1V1 BATTLE · 3 DAYS LEFT"}),n.jsx("div",{className:"sbm-share-pill",children:"Share"})]}),n.jsxs("div",{className:"sbm-matchup",children:[n.jsxs("div",{className:"sbm-side",children:[n.jsx("div",{className:"sbm-name sbm-name--me",children:"You"}),n.jsx("div",{className:"sbm-score",children:147}),n.jsx("div",{className:"sbm-logged",children:"✓ logged today"})]}),n.jsx("div",{className:"sbm-vs",children:"VS"}),n.jsxs("div",{className:"sbm-side sbm-side--right",children:[n.jsx("div",{className:"sbm-name",children:"Tyler B."}),n.jsx("div",{className:"sbm-score sbm-score--lead",children:189}),n.jsx("div",{className:"sbm-logged sbm-logged--rival",children:"✓ logged today"})]})]}),n.jsx("div",{className:"sbm-bar-track",children:n.jsx("div",{className:"sbm-bar-fill",style:{width:`${s}%`}})}),n.jsx("div",{className:"sbm-rival-team",children:"Oakville U14 AA · resets Monday"}),n.jsx("div",{className:"sbm-status",children:"💪 Down 42 shots — time to push"}),n.jsx("div",{className:"sbm-log-btn",children:"+ Log shots now"})]})})}const cw=`
.landing {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
  max-width: none;
}
body:has(.landing) { background: var(--bg) !important; }

/* ── NAV ── */
.land-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  position: sticky; top: 0;
  background: rgba(10, 14, 26, 0.88);
  backdrop-filter: blur(10px);
  z-index: 100;
}
.land-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 15px; letter-spacing: 0.5px;
  background: transparent; color: white; padding: 0; cursor: pointer;
}
.land-nav-actions { display: flex; gap: 8px; align-items: center; }
.land-nav-link { color: var(--ice); padding: 8px 14px; font-size: 14px; font-weight: 500; }
@media (max-width: 600px) { .land-nav-link { display: none; } }
.land-nav-cta {
  background: var(--accent); color: white;
  padding: 9px 18px; border-radius: 999px;
  font-size: 14px; font-weight: 600;
  transition: transform 0.1s;
}
.land-nav-cta:active { transform: scale(0.97); }

/* ── HERO ── */
.hero {
  padding: 44px clamp(16px, 5vw, 40px) 40px;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}
.hero-eyebrow {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 11px; font-weight: 600; color: var(--ice);
  letter-spacing: 2px;
  background: var(--accent-bg);
  padding: 6px 12px; border-radius: 999px;
  margin-bottom: 18px;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 5.5vw, 48px);
  font-weight: 800; line-height: 1.05;
  letter-spacing: -0.5px;
  margin: 0 0 16px; color: white;
}
.hero-sub {
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.55; color: var(--text-soft);
  margin: 0 auto 16px; max-width: 560px;
}
.hero-stat {
  font-size: 14px; color: var(--text-soft);
  margin: 0 auto 28px; letter-spacing: 0.2px;
}
.hero-stat strong { color: white; font-weight: 700; }

/* Two-path cards */
.hero-paths {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 32px;
  text-align: left;
}
@media (max-width: 560px) {
  .hero-paths { grid-template-columns: 1fr; }
}
.hero-path {
  border-radius: 18px;
  padding: 22px 20px;
  display: flex; flex-direction: column; gap: 10px;
  cursor: pointer; transition: transform 0.12s;
  text-align: left;
}
.hero-path:active { transform: scale(0.98); }
.hero-path--player {
  background: #0f1e3a;
  border: 1.5px solid rgba(41,121,255,0.5);
  box-shadow: 0 4px 24px rgba(41,121,255,0.12);
}
.hero-path--coach {
  background: #0e1a14;
  border: 1.5px solid rgba(45,180,100,0.4);
  box-shadow: 0 4px 24px rgba(45,180,100,0.08);
}
.hero-path-eyebrow {
  font-size: 10px; font-weight: 700; letter-spacing: 2px;
  color: var(--text-mute);
}
.hero-path--player .hero-path-eyebrow { color: #60a5fa; }
.hero-path--coach .hero-path-eyebrow { color: #4ade80; }
.hero-path-title {
  font-family: var(--font-display);
  font-size: clamp(15px, 2.5vw, 18px);
  font-weight: 800; color: white;
  line-height: 1.2; flex: 1;
}
.hero-path-detail {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.hero-path-detail span {
  font-size: 12px; color: var(--text-soft);
  background: rgba(255,255,255,0.05);
  border-radius: 6px; padding: 3px 8px;
}
.hero-path-btn {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 800;
  padding: 12px 16px; border-radius: 10px;
  text-align: center; margin-top: 4px;
  letter-spacing: 0.2px;
}
.hero-path-btn--player {
  background: var(--accent); color: white;
  box-shadow: 0 2px 12px rgba(41,121,255,0.4);
}
.hero-path-btn--coach {
  background: rgba(45,180,100,0.18); color: #4ade80;
  border: 1.5px solid rgba(45,180,100,0.45);
}

/* Club search */
.hero-club-search {
  max-width: 520px; margin: 0 auto;
  text-align: center;
}
.hero-club-search-label {
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500; margin-bottom: 10px;
}
.hero-search-input {
  width: 100%;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--text); font-size: 14px;
  font-family: var(--font-body); outline: none;
  transition: border-color 0.15s; box-sizing: border-box;
}
.hero-search-input:focus { border-color: var(--accent); }
.hero-search-input::placeholder { color: var(--text-mute); }
.hero-search-dropdown {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  background: var(--surface); border: 0.5px solid var(--border);
  border-radius: 12px; overflow: hidden; z-index: 50;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.hero-search-result-wrap {
  display: flex; align-items: center;
  border-bottom: 0.5px solid var(--border-dim);
  padding-right: 10px;
}
.hero-search-result-wrap:last-child { border-bottom: none; }
.hero-search-result {
  display: flex; flex-direction: column; align-items: flex-start;
  flex: 1; padding: 12px 16px; text-align: left; transition: background 0.1s;
}
.hero-search-result:hover { background: var(--bg); }
.hero-search-join {
  background: rgba(41,121,255,0.15); color: #60a5fa;
  border: 1px solid rgba(41,121,255,0.3);
  border-radius: 8px; padding: 6px 12px;
  font-size: 13px; font-weight: 700; white-space: nowrap; flex-shrink: 0;
}
.hero-search-result-name {
  font-family: var(--font-display); font-size: 15px; font-weight: 700;
  color: white; letter-spacing: 0.2px;
}
.hero-search-result-meta { font-size: 12px; color: var(--text-mute); margin-top: 2px; }
.hero-search-status {
  padding: 14px 16px; font-size: 13px; color: var(--text-mute); text-align: center;
}
.hero-search-add {
  background: transparent; color: var(--accent); font-size: 13px;
  font-weight: 600; padding: 0; display: inline;
}

/* ── HOW IT WORKS ── */
.hiw {
  border-top: 0.5px solid var(--border-dim);
  padding: 44px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  text-align: center;
}
.hiw-label {
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px; margin-bottom: 28px;
}
.hiw-steps {
  display: flex; align-items: flex-start; justify-content: center;
  gap: 8px; flex-wrap: wrap;
}
.hiw-arrow {
  font-size: 20px; color: var(--border);
  padding-top: 52px; flex-shrink: 0;
}
@media (max-width: 640px) { .hiw-arrow { display: none; } }
.hiw-step {
  flex: 1; min-width: 180px; max-width: 240px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.hiw-step-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(41,121,255,0.15); border: 1px solid rgba(41,121,255,0.4);
  color: #60a5fa; font-family: var(--font-display); font-size: 13px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.hiw-step-visual {
  width: 100%; background: #0f1928;
  border: 1px solid #1e2f4a; border-radius: 14px;
  padding: 14px; min-height: 88px;
  display: flex; flex-direction: column; justify-content: center; gap: 8px;
}
.hiw-google-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: white; color: #1a1a2e;
  padding: 9px 12px; border-radius: 8px;
  font-family: var(--font-display); font-size: 12px; font-weight: 700;
}
.hiw-visual-hint { font-size: 11px; color: #4a6080; text-align: center; }
.hiw-shot-types { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
.hiw-shot-pill {
  font-size: 11px; font-weight: 600; color: #4a6080;
  background: #0a1220; border: 1px solid #1e2f4a;
  border-radius: 6px; padding: 4px 8px;
}
.hiw-shot-pill--active {
  background: rgba(41,121,255,0.2); border-color: rgba(41,121,255,0.5);
  color: #60a5fa;
}
.hiw-shot-count {
  display: flex; align-items: center; justify-content: space-between;
  background: #0a1220; border: 1px solid #1e2f4a;
  border-radius: 8px; padding: 8px 12px;
}
.hiw-shot-num {
  font-family: var(--font-display); font-size: 22px; font-weight: 800; color: white;
}
.hiw-shot-save {
  font-family: var(--font-display); font-size: 12px; font-weight: 700;
  color: white; background: var(--accent); padding: 5px 10px; border-radius: 6px;
}
.hiw-board-row {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px; border-radius: 7px;
}
.hiw-board-row--you {
  background: rgba(41,121,255,0.15); border: 1px solid rgba(41,121,255,0.3);
}
.hiw-board-pos { font-size: 11px; color: #4a6080; font-weight: 700; width: 20px; }
.hiw-board-row--you .hiw-board-pos { color: #60a5fa; }
.hiw-board-name { font-size: 12px; font-weight: 700; color: var(--text-soft); flex: 1; text-align: left; }
.hiw-board-row--you .hiw-board-name { color: white; }
.hiw-board-shots { font-family: var(--font-display); font-size: 13px; font-weight: 800; color: #60a5fa; }
.hiw-step-text { font-size: 13px; color: var(--text-soft); line-height: 1.5; text-align: center; }
.hiw-footer {
  margin-top: 28px; font-size: 14px; color: var(--text-soft);
  background: rgba(255,255,255,0.03); border: 1px solid var(--border-dim);
  border-radius: 10px; padding: 12px 20px; display: inline-block;
}

/* ── SECTIONS ── */
.section {
  padding: 56px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  border-top: 0.5px solid var(--border-dim);
}
.section-head {
  text-align: center; max-width: 640px; margin: 0 auto 32px;
}
.section-eyebrow {
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px; margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 36px); font-weight: 800;
  line-height: 1.1; letter-spacing: -0.3px; color: white; margin: 0 0 12px;
}
.section-sub { font-size: 15px; color: var(--text-soft); line-height: 1.55; margin: 0; }

/* ── BATTLE MOCK ── */
.section--compete {
  background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.04));
}
.sbm-wrap { max-width: 420px; margin: 0 auto; }
.sbm-card {
  background: var(--surface);
  border: 1px solid rgba(37,99,235,0.3);
  border-radius: 18px; padding: 18px 20px;
  box-shadow: 0 20px 60px rgba(37,99,235,0.12);
}
.sbm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.sbm-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 1.2px; color: var(--text-mute); text-transform: uppercase; }
.sbm-share-pill { font-size: 11px; font-weight: 700; color: var(--ice); border: 1px solid var(--border-dim); border-radius: 6px; padding: 3px 10px; }
.sbm-matchup { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.sbm-side { flex: 1; min-width: 0; }
.sbm-side--right { text-align: right; }
.sbm-name { font-size: 14px; font-weight: 700; color: var(--text-soft); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sbm-name--me { color: var(--ice); }
.sbm-vs { font-size: 12px; font-weight: 800; color: var(--text-mute); flex-shrink: 0; }
.sbm-score { font-size: 38px; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums; color: var(--text-soft); }
.sbm-score--lead { color: white; }
.sbm-logged { font-size: 11px; color: var(--text-mute); margin-top: 3px; }
.sbm-bar-track { height: 7px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden; margin-bottom: 6px; }
.sbm-bar-fill { height: 100%; background: linear-gradient(90deg, #1d4ed8, #67e8f9); border-radius: 99px; }
.sbm-rival-team { font-size: 11px; color: var(--text-mute); text-align: center; margin-bottom: 10px; }
.sbm-status { font-size: 12px; font-weight: 600; color: #f87171; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 8px 10px; margin-bottom: 10px; line-height: 1.4; }
.sbm-log-btn { width: 100%; background: var(--accent); color: white; border-radius: 10px; padding: 12px 16px; font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: 0.4px; text-align: center; }

/* ── FAQ ── */
.faq-list { display: flex; flex-direction: column; gap: 6px; max-width: 680px; margin: 0 auto; }
.faq-item { background: var(--surface); border-radius: 12px; padding: 4px 0; border: 0.5px solid var(--border-dim); transition: border-color 0.15s; }
.faq-item[open] { border-color: var(--accent); }
.faq-item summary { padding: 16px 18px; cursor: pointer; font-family: var(--font-display); font-size: 15px; font-weight: 700; color: white; letter-spacing: 0.3px; list-style: none; position: relative; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: '+'; position: absolute; right: 18px; top: 50%; transform: translateY(-50%); font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--text-mute); }
.faq-item[open] summary::after { content: '−'; }
.faq-item p { padding: 0 18px 16px; margin: 0; font-size: 14px; color: var(--text-soft); line-height: 1.55; }

/* ── FINAL CTA ── */
.final-cta {
  padding: 70px clamp(16px, 5vw, 40px);
  text-align: center;
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.08));
}
.final-cta-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 4.5vw, 36px); font-weight: 800;
  margin-bottom: 28px; line-height: 1.15; color: white; letter-spacing: -0.3px;
}
.final-cta-paths {
  display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
  margin-bottom: 16px;
}
.final-cta-btn {
  padding: 15px 28px; border-radius: 12px;
  font-family: var(--font-display); font-size: 16px; font-weight: 700;
  transition: transform 0.1s;
}
.final-cta-btn:active { transform: scale(0.98); }
.final-cta-btn--player { background: var(--accent); color: white; }
.final-cta-btn--coach { background: rgba(45,180,100,0.15); color: #4ade80; border: 1.5px solid rgba(45,180,100,0.4); }
.final-cta-sub { font-size: 13px; color: var(--text-mute); margin-bottom: 14px; }
.final-cta-guide {
  background: transparent; color: var(--text-mute);
  font-size: 13px; text-decoration: underline;
  text-underline-offset: 3px; padding: 0; cursor: pointer;
}
.final-cta-guide:hover { color: var(--ice); }

/* ── FOOTER ── */
.land-footer {
  padding: 36px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 16px;
  border-top: 0.5px solid var(--border-dim);
}
.foot-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
  letter-spacing: 0.4px; background: transparent; color: white; padding: 0; cursor: pointer;
}
.foot-links { display: flex; gap: 20px; flex-wrap: wrap; }
.foot-link { background: transparent; color: var(--text-mute); font-size: 13px; padding: 4px 0; }
.foot-link:hover { color: var(--ice); }
.foot-copy { font-size: 12px; color: var(--text-mute); }
`;function dw(){const e=re(),[t,r]=y.useState(""),[s,a]=y.useState([]),[i,o]=y.useState(!1),l=y.useRef(null),c=y.useRef(null);return y.useEffect(()=>{ce({title:"Hockey Clubs — Team Leaderboards & Off-Ice Training Tracker",description:"Find your hockey club or association on Hockey Shot Challenge. See team leaderboards, share signup links with coaches and parents, and track off-ice training across your whole association.",url:`${K}/for-clubs`}),ft({"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"What do players do on Hockey Shot Challenge?",acceptedAnswer:{"@type":"Answer",text:"Players log shots and stickhandling reps at home — driveway, basement, wherever. It takes 5 seconds. The more they log, the higher they climb on the team leaderboard."}},{"@type":"Question",name:"What do coaches see on Hockey Shot Challenge?",acceptedAnswer:{"@type":"Answer",text:"Coaches see a dashboard showing every player's weekly shot count, streak, and rank. You know who's putting in work before practice even starts."}},{"@type":"Question",name:"What does Hockey Shot Challenge cost?",acceptedAnswer:{"@type":"Answer",text:"Free. For coaches, players, parents, and clubs. No paid tier, no subscription, no app to download."}},{"@type":"Question",name:"Do kids need a password for Hockey Shot Challenge?",acceptedAnswer:{"@type":"Answer",text:"No. Parents sign in with their Google account and set up their child's profile. Kids just tap and log."}}]}),setTimeout(()=>{var d;return(d=c.current)==null?void 0:d.focus()},100)},[]),y.useEffect(()=>{if(l.current&&clearTimeout(l.current),!t.trim()||t.trim().length<2){a([]),o(!1);return}return o(!0),l.current=setTimeout(async()=>{try{const d=await Qr(t,8);a(d||[])}catch{a([])}finally{o(!1)}},200),()=>{l.current&&clearTimeout(l.current)}},[t]),n.jsxs("div",{className:"fcl-wrap",children:[n.jsxs("nav",{className:"fcl-nav",children:[n.jsx("button",{className:"fcl-back",onClick:()=>e("/"),children:"← Back"}),n.jsx("button",{className:"fcl-nav-cta",onClick:()=>e("/coach/start"),children:"Set up a team →"})]}),n.jsxs("section",{className:"fcl-hero",children:[n.jsx("div",{className:"fcl-eyebrow",children:"CLUBS & ASSOCIATIONS"}),n.jsx("h1",{className:"fcl-title",children:"Find your club."}),n.jsx("p",{className:"fcl-sub",children:"Search for your association to see team leaderboards and get sharing links for your coaches and parents."}),n.jsxs("div",{className:"fcl-search-wrap",children:[n.jsx("input",{ref:c,type:"text",className:"fcl-search-input",placeholder:"Burlington Eagles, Mississauga…",value:t,onChange:d=>r(d.target.value),autoComplete:"off",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false"}),t.trim().length>=2&&n.jsxs("div",{className:"fcl-search-dropdown",children:[i&&s.length===0&&n.jsx("div",{className:"fcl-search-status",children:"Searching…"}),!i&&s.length===0&&n.jsxs("div",{className:"fcl-search-empty",children:[n.jsxs("div",{className:"fcl-search-empty-title",children:['No clubs found for "',t,'"']}),n.jsx("div",{className:"fcl-search-empty-sub",children:"Your association might not be on here yet."}),n.jsx("button",{className:"fcl-search-add-btn",onClick:()=>e("/coach/start"),children:"Set up your club — free →"})]}),s.map(d=>n.jsxs("button",{className:"fcl-search-result",onClick:()=>e(`/clubs/${d.slug}`),children:[n.jsxs("div",{className:"fcl-result-left",children:[n.jsx("div",{className:"fcl-result-name",children:d.name}),n.jsx("div",{className:"fcl-result-meta",children:[d.city,d.governing_body].filter(Boolean).join(" · ")})]}),n.jsx("div",{className:"fcl-result-arrow",children:"→"})]},d.id))]})]})]}),n.jsx("section",{className:"fcl-what",children:n.jsxs("div",{className:"fcl-what-inner",children:[n.jsx("div",{className:"fcl-eyebrow",children:"WHAT YOUR CLUB PAGE HAS"}),n.jsxs("div",{className:"fcl-what-grid",children:[n.jsxs("div",{className:"fcl-what-card",children:[n.jsx("div",{className:"fcl-what-icon",children:"📊"}),n.jsx("div",{className:"fcl-what-title",children:"Team leaderboards"}),n.jsx("div",{className:"fcl-what-text",children:"See which teams are logging the most shots this week, all on one page."})]}),n.jsxs("div",{className:"fcl-what-card",children:[n.jsx("div",{className:"fcl-what-icon",children:"🔗"}),n.jsx("div",{className:"fcl-what-title",children:"Links to share"}),n.jsx("div",{className:"fcl-what-text",children:"Send your club page to coaches to set up their teams. Send parent links so players can sign up."})]}),n.jsxs("div",{className:"fcl-what-card",children:[n.jsx("div",{className:"fcl-what-icon",children:"🏆"}),n.jsx("div",{className:"fcl-what-title",children:"Top players"}),n.jsx("div",{className:"fcl-what-text",children:"Who's logging the most shots across all teams this week."})]})]})]})}),n.jsx("section",{className:"fcl-notlisted",children:n.jsxs("div",{className:"fcl-notlisted-inner",children:[n.jsx("div",{className:"fcl-eyebrow",children:"NOT LISTED YET?"}),n.jsx("h2",{className:"fcl-section-title",children:"Set up your club in 2 minutes."}),n.jsx("p",{className:"fcl-section-sub",children:"Any coach can set up a team and get the club on the leaderboard. Sign in with Google, pick your age group and tier, and your club page goes live automatically."}),n.jsx("button",{className:"fcl-cta",onClick:()=>e("/coach/start"),children:"Set up my team — free →"}),n.jsx("p",{className:"fcl-cta-hint",children:"Takes 2 minutes. Sign in with Google."})]})}),n.jsx("section",{className:"fcl-pitch",children:n.jsxs("div",{className:"fcl-pitch-inner",children:[n.jsx("div",{className:"fcl-eyebrow",children:"WHAT THIS IS"}),n.jsxs("div",{className:"fcl-pitch-grid",children:[n.jsxs("div",{className:"fcl-pitch-item",children:[n.jsx("div",{className:"fcl-pitch-q",children:"What do players do?"}),n.jsx("div",{className:"fcl-pitch-a",children:"Log shots and stickhandling reps at home — driveway, basement, wherever. It takes 5 seconds. The more they log, the higher they climb on the team leaderboard."})]}),n.jsxs("div",{className:"fcl-pitch-item",children:[n.jsx("div",{className:"fcl-pitch-q",children:"What do coaches see?"}),n.jsx("div",{className:"fcl-pitch-a",children:"A dashboard showing every player's weekly shot count, streak, and rank. You know who's putting in work before practice even starts."})]}),n.jsxs("div",{className:"fcl-pitch-item",children:[n.jsx("div",{className:"fcl-pitch-q",children:"What does it cost?"}),n.jsx("div",{className:"fcl-pitch-a",children:"Free. For coaches, players, parents, and clubs. No paid tier, no subscription, no app to download."})]}),n.jsxs("div",{className:"fcl-pitch-item",children:[n.jsx("div",{className:"fcl-pitch-q",children:"Do kids need a password?"}),n.jsx("div",{className:"fcl-pitch-a",children:"No. Parents sign in with their Google account and set up their kid's profile. Kids just tap and log."})]})]})]})}),n.jsxs("footer",{className:"fcl-footer",children:[n.jsx("button",{className:"fcl-foot-link",onClick:()=>e("/"),children:"← Home"}),n.jsx("button",{className:"fcl-foot-link",onClick:()=>e("/blog"),children:"Parent guides"}),n.jsxs("span",{className:"fcl-foot-copy",children:["© ",new Date().getFullYear()," Hockey Shot Challenge"]})]}),n.jsx("style",{children:uw})]})}const uw=`
.fcl-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
  max-width: none;
}
body:has(.fcl-wrap) { background: var(--bg) !important; }

.fcl-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  max-width: 720px;
  margin: 0 auto;
}
.fcl-back { color: #8899b4; font-size: 15px; background: transparent; }
.fcl-back:hover { color: white; }
.fcl-nav-cta {
  background: var(--accent); color: white;
  padding: 10px 18px; border-radius: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: 0.3px;
}

.fcl-hero {
  padding: 40px 20px 50px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.fcl-eyebrow {
  font-size: 12px; font-weight: 700;
  letter-spacing: 2px; color: #60a5fa;
  margin-bottom: 14px;
}
.fcl-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 8vw, 56px);
  font-weight: 800; color: white;
  line-height: 1.0; letter-spacing: -0.5px;
  margin-bottom: 14px;
}
.fcl-sub {
  font-size: 17px; color: #a8b8d0;
  line-height: 1.55; margin-bottom: 28px;
}
.fcl-section-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 800; color: white;
  margin-bottom: 12px; letter-spacing: 0.2px;
}
.fcl-section-sub {
  font-size: 16px; color: #8899b4; line-height: 1.55; margin-bottom: 24px;
}

.fcl-search-wrap {
  position: relative;
  max-width: 520px;
  margin: 0 auto;
}
.fcl-search-input {
  width: 100%;
  background: #0f1928;
  border: 2px solid #1e2f4a;
  border-radius: 14px;
  padding: 18px 20px;
  color: white;
  font-size: 17px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.fcl-search-input:focus { border-color: var(--accent); }
.fcl-search-input::placeholder { color: #3a5070; }
.fcl-search-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 14px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.fcl-search-status {
  padding: 18px 20px;
  font-size: 14px; color: #4a6080;
  text-align: center;
}
.fcl-search-empty {
  padding: 22px 20px;
  text-align: center;
}
.fcl-search-empty-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700; color: white;
  margin-bottom: 6px;
}
.fcl-search-empty-sub {
  font-size: 14px; color: #4a6080; margin-bottom: 16px;
}
.fcl-search-add-btn {
  background: var(--accent); color: white;
  padding: 12px 20px; border-radius: 10px;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
}
.fcl-search-result {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 20px;
  border-bottom: 1px solid #1a2847;
  text-align: left;
  cursor: pointer;
  transition: background 0.1s;
}
.fcl-search-result:last-child { border-bottom: none; }
.fcl-search-result:hover { background: #0a1220; }
.fcl-result-left { flex: 1; min-width: 0; }
.fcl-result-name {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800; color: white;
  letter-spacing: 0.2px;
}
.fcl-result-meta {
  font-size: 12px; color: #4a6080; margin-top: 3px;
}
.fcl-result-arrow {
  font-size: 18px; color: #2979ff; flex-shrink: 0;
}

.fcl-what {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.fcl-what-inner { max-width: 680px; margin: 0 auto; }
.fcl-what-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 24px;
}
@media (max-width: 540px) { .fcl-what-grid { grid-template-columns: 1fr; } }
.fcl-what-card {
  background: #0f1624; border: 1px solid #1a2847;
  border-radius: 16px; padding: 20px 16px;
}
.fcl-what-icon { font-size: 26px; margin-bottom: 10px; }
.fcl-what-title {
  font-family: var(--font-display);
  font-size: 17px; font-weight: 700; color: white; margin-bottom: 6px;
}
.fcl-what-text { font-size: 14px; color: #8899b4; line-height: 1.5; }

.fcl-notlisted {
  background: #060b18;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 60px 20px;
  text-align: center;
}
.fcl-notlisted-inner { max-width: 500px; margin: 0 auto; }
.fcl-cta {
  display: inline-block;
  background: var(--accent); color: white;
  padding: 16px 28px; border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px; font-weight: 700; letter-spacing: 0.3px;
  transition: transform 0.1s;
  width: 100%; max-width: 400px;
}
.fcl-cta:active { transform: scale(0.98); }
.fcl-cta-hint { font-size: 13px; color: #6b7fa8; margin-top: 10px; }

.fcl-pitch {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.fcl-pitch-inner { max-width: 640px; margin: 0 auto; }
.fcl-pitch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 24px;
}
@media (max-width: 480px) { .fcl-pitch-grid { grid-template-columns: 1fr; } }
.fcl-pitch-item { }
.fcl-pitch-q {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800; color: white;
  margin-bottom: 8px;
}
.fcl-pitch-a { font-size: 14px; color: #8899b4; line-height: 1.6; }

.fcl-footer {
  padding: 24px 20px;
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid #1a2035;
  max-width: 720px; margin: 0 auto;
}
.fcl-foot-link { background: transparent; color: #4a6080; font-size: 14px; }
.fcl-foot-link:hover { color: white; }
.fcl-foot-copy { font-size: 12px; color: #2a3a50; }
`;function hw(){const{slug:e}=Hc(),t=re(),[r,s]=y.useState(null),[a,i]=y.useState(null),[o,l]=y.useState([]),[c,d]=y.useState(null),[h,u]=y.useState([]),[p,x]=y.useState([]),[v,b]=y.useState(!0),[w,g]=y.useState(!1),[f,m]=y.useState(!1),[k,N]=y.useState(!1),[S,_]=y.useState(!1),[D,q]=y.useState(!1);y.useEffect(()=>{let O=!1;async function W(){b(!0);const M=await ta(e);if(O)return;if(!M){g(!0),b(!1),ce({title:"Club not found",description:"This club hasn't been set up on Hockey Shot Challenge yet.",url:`${K}/clubs/${e}`,noindex:!0});return}s(M);const[G,ne,se,be,Ke]=await Promise.all([Kc(M.id),Vc(M.id),Yf(M.id),Jf(M.id),rw(M.id,5)]);if(O)return;i(G),l(ne),d(se),u(be),x(Ke),b(!1);const R=M.city?`, ${M.city}`:"";ce({title:`${M.name}${R} — Off-Ice Training`,description:`Off-ice shot tracking and skill training for ${M.name}${R}. Coaches set up teams in 2 minutes. Players log shots and compete on the leaderboard. Free.`,url:`${K}/clubs/${e}`}),ft({"@context":"https://schema.org","@type":"SportsOrganization",name:M.name,sport:"Ice Hockey",url:`${K}/clubs/${e}`,...M.city?{address:{"@type":"PostalAddress",addressLocality:M.city,addressCountry:"CA"}}:{},memberOf:{"@type":"Organization",name:"Hockey Shot Challenge",url:K}})}return W(),()=>{O=!0}},[e]);const T=`${K}/clubs/${e}`,Q=`${K}/start?club=${e}`,de=async()=>{const O=r?`Hey coaches — set up your ${r.name} team on Hockey Shot Challenge. Sign in with Google, pick your age and tier, get a player invite link. 2 minutes, free: ${T}`:T;try{navigator.share?(await navigator.share({title:`${r==null?void 0:r.name} — Hockey Shot Challenge`,text:O,url:T}),_(!0),setTimeout(()=>_(!1),2500)):(await navigator.clipboard.writeText(T),m(!0),setTimeout(()=>m(!1),2500))}catch{}},he=async()=>{try{await navigator.clipboard.writeText(T),m(!0),setTimeout(()=>m(!1),2500)}catch{}},Be=async()=>{var ne;if(!c||!r)return;const O=h.find(se=>se.week_shots>0),W=O?` ${O.age_division} ${O.tier} leads with ${O.week_shots.toLocaleString()} shots.`:"",M=h.length>1&&((ne=h[1])==null?void 0:ne.week_shots)>0?` Can ${h[1].age_division} ${h[1].tier} catch up by Sunday?`:"",G=`${r.name} — ${c.thisWeekTotal.toLocaleString()} shots logged this week.${W}${M} 🏒 ${T}`;try{navigator.share?await navigator.share({title:`${r.name} — this week`,text:G,url:T}):(await navigator.clipboard.writeText(G),q(!0),setTimeout(()=>q(!1),2500))}catch{}};if(v)return n.jsxs("div",{className:"club-screen",children:[n.jsx(La,{nav:t}),n.jsx("div",{className:"club-loading",children:"Loading…"}),n.jsx("style",{children:Ia})]});if(w)return n.jsxs("div",{className:"club-screen",children:[n.jsx(La,{nav:t}),n.jsxs("div",{className:"club-404",children:[n.jsx("h1",{className:"club-404-title",children:"Club not found."}),n.jsx("p",{className:"club-404-text",children:"We couldn't find a club at that URL. Try searching from the home page."}),n.jsx("button",{className:"club-btn-primary",onClick:()=>t("/"),children:"← Back to home"})]}),n.jsx("style",{children:Ia})]});const Ge=(a==null?void 0:a.playerCount)>0||(a==null?void 0:a.totalShots)>0,je="/coach/start",V=`/start?club=${e}`,I=async()=>{try{await navigator.clipboard.writeText(Q),N(!0),setTimeout(()=>N(!1),2500)}catch{}},E=async()=>{const O=r?`Sign your player up for ${r.name} on Hockey Shot Challenge. They'll log shots and stickhandling reps at home, compete with teammates, and earn ranks. Free — takes 30 seconds: ${Q}`:Q;try{navigator.share?await navigator.share({title:`Sign up for ${r==null?void 0:r.name}`,text:O,url:Q}):(await navigator.clipboard.writeText(Q),N(!0),setTimeout(()=>N(!1),2500))}catch{}},$=["Hey coaches,","",`We're setting up Hockey Shot Challenge for ${r.name} this season. It's a free off-ice training tool for your players — they log shots at home (driveway, basement, wherever), follow skill videos, and compete on a team leaderboard. You can see who's putting in work between practices.`,"","To get your team on the platform:",`1. Go to ${T}`,"2. Sign in with Google","3. Pick your age group and tier","4. Get your player invite link and send it to your parents","","Takes 2 minutes. Free for coaches, players, and parents.","",`${T}`].join("%0A"),C=`mailto:?subject=Set up your ${r.name} team — Hockey Shot Challenge&body=${$}`;if(!Ge)return n.jsxs("div",{className:"club-screen",children:[n.jsx(La,{nav:t}),n.jsxs("section",{className:"club-hero",children:[n.jsxs("h1",{className:"club-h1",children:[n.jsx("span",{className:"club-h1-name",children:r.name}),n.jsx("span",{className:"club-h1-em",children:"isn't set up yet."})]}),n.jsx("p",{className:"club-lede",children:"Are you a coach or a director? Pick your path below."}),n.jsxs("div",{className:"club-paths",children:[n.jsxs("div",{className:"club-path-card",children:[n.jsx("div",{className:"club-path-eyebrow",children:"I'M A COACH"}),n.jsx("h2",{className:"club-path-title",children:"Set up my team"}),n.jsx("p",{className:"club-path-text",children:"Sign in with Google, pick your age group and tier, get a player invite link. Takes 2 minutes. Free."}),n.jsxs("button",{className:"club-google-btn",onClick:()=>t(je),children:[n.jsx(Gu,{}),"Set up my team — free"]})]}),n.jsxs("div",{className:"club-path-card",children:[n.jsx("div",{className:"club-path-eyebrow",children:"I'M A DIRECTOR"}),n.jsx("h2",{className:"club-path-title",children:"Send to my coaches"}),n.jsx("p",{className:"club-path-text",children:"Share this page. Each coach sets up their own team independently. You don't need to do anything after that."}),n.jsxs("div",{className:"club-share-row",children:[n.jsxs("button",{className:"club-share-btn",onClick:de,children:[n.jsx("span",{children:"💬"}),S?"Shared!":"Messages"]}),n.jsxs("a",{className:"club-share-btn",href:C,children:[n.jsx("span",{children:"✉️"}),"Email"]}),n.jsxs("button",{className:"club-share-btn",onClick:he,children:[n.jsx("span",{children:"📋"}),f?"Copied!":"Copy link"]})]})]})]})]}),n.jsxs("section",{className:"club-section",children:[n.jsx("div",{className:"club-eyebrow-left",children:"HOW IT WORKS"}),n.jsxs("div",{className:"club-steps",children:[n.jsxs("div",{className:"club-step",children:[n.jsx("div",{className:"club-step-num",children:"1"}),n.jsxs("div",{children:[n.jsx("div",{className:"club-step-title",children:"Sign in with Google"}),n.jsx("div",{className:"club-step-text",children:"No password to create. One tap."})]})]}),n.jsxs("div",{className:"club-step",children:[n.jsx("div",{className:"club-step-num",children:"2"}),n.jsxs("div",{children:[n.jsx("div",{className:"club-step-title",children:"Pick your team"}),n.jsx("div",{className:"club-step-text",children:"Choose your age division and tier — U12 AAA, U15 A, etc."})]})]}),n.jsxs("div",{className:"club-step",children:[n.jsx("div",{className:"club-step-num",children:"3"}),n.jsxs("div",{children:[n.jsx("div",{className:"club-step-title",children:"Get your invite link"}),n.jsx("div",{className:"club-step-text",children:"Send it to your players and parents. They sign up in 30 seconds."})]})]})]})]}),n.jsxs("section",{className:"club-section",children:[n.jsx("div",{className:"club-eyebrow-left",children:"FOR PLAYERS & PARENTS"}),n.jsx("h2",{className:"club-h2",children:"What your players get."}),n.jsxs("div",{className:"club-loop",children:[n.jsxs("div",{className:"club-loop-card",children:[n.jsx("div",{className:"club-loop-icon",children:"🎯"}),n.jsx("div",{className:"club-loop-verb",children:"LOG"}),n.jsx("h3",{className:"club-loop-title",children:"Every off-ice shot."}),n.jsx("p",{className:"club-loop-text",children:"Driveway, basement, garage — every rep shows up on the team leaderboard. You see the work that used to be invisible."})]}),n.jsxs("div",{className:"club-loop-card",children:[n.jsx("div",{className:"club-loop-icon",children:"📺"}),n.jsx("div",{className:"club-loop-verb",children:"LEARN"}),n.jsx("h3",{className:"club-loop-title",children:"Skill video library."}),n.jsx("p",{className:"club-loop-text",children:"Shooting and stickhandling videos players can follow at home. Growing all season."})]}),n.jsxs("div",{className:"club-loop-card",children:[n.jsx("div",{className:"club-loop-icon",children:"⚔️"}),n.jsx("div",{className:"club-loop-verb",children:"COMPETE"}),n.jsx("h3",{className:"club-loop-title",children:"Team leaderboard."}),n.jsx("p",{className:"club-loop-text",children:"Players compete within the team, across the club, against rivals. You choose the challenge."})]})]})]}),n.jsxs("section",{className:"club-section club-parents",children:[n.jsx("div",{className:"club-eyebrow-left",children:"👨‍👩‍👧 FOR PARENTS"}),n.jsx("h2",{className:"club-h2",children:"Sign up your player."}),n.jsx("p",{className:"club-section-text",children:"Players can sign up now — your coach just needs to set up their team first. Once they do, your player's stats will show up on the leaderboard automatically."}),n.jsxs("div",{className:"club-parent-link-row",children:[n.jsx("div",{className:"club-parent-link-url",children:Q.replace("https://","")}),n.jsx("button",{className:"club-parent-link-copy",onClick:I,children:k?"✓ Copied":"Copy"})]}),n.jsxs("div",{className:"club-share-row",style:{marginTop:12},children:[n.jsxs("button",{className:"club-share-btn",onClick:E,children:[n.jsx("span",{children:"💬"})," Share via messages"]}),n.jsxs("button",{className:"club-share-btn",onClick:()=>t(V),children:[n.jsx("span",{children:"→"})," Sign up now"]})]})]}),n.jsx(Hl,{}),n.jsx(Ku,{nav:t}),n.jsx("style",{children:Ia})]});const L=(c==null?void 0:c.thisWeekTotal)>0?`${c.thisWeekTotal.toLocaleString()} shots logged this week.`:null;return n.jsxs("div",{className:"club-screen",children:[n.jsx(La,{nav:t}),n.jsxs("section",{className:"club-hero",children:[n.jsx("div",{className:"club-eyebrow",children:"ACTIVE ON HOCKEY SHOT CHALLENGE"}),n.jsx("h1",{className:"club-h1",children:n.jsx("span",{className:"club-h1-name",children:r.name})}),L?n.jsx("p",{className:"club-lede club-lede--headline",children:L}):n.jsxs("p",{className:"club-lede",children:[r.name," players are logging off-ice shots and competing on the team leaderboard."]}),n.jsxs("div",{className:"club-hero-meta",children:[n.jsxs("span",{className:"club-hero-meta-item",children:[a.teamCount," team",a.teamCount!==1?"s":""]}),n.jsx("span",{className:"club-hero-meta-dot",children:"·"}),n.jsxs("span",{className:"club-hero-meta-item",children:[a.playerCount," player",a.playerCount!==1?"s":""]}),n.jsx("span",{className:"club-hero-meta-dot",children:"·"}),n.jsxs("span",{className:"club-hero-meta-item",children:[a.totalShots.toLocaleString()," shots all-time"]})]}),n.jsx("div",{className:"club-ctas",children:n.jsx("button",{className:"club-btn-primary",onClick:()=>t(V),children:"Sign in / Join →"})})]}),h.length>0&&n.jsxs("section",{className:"club-section",children:[n.jsxs("div",{className:"club-section-header",children:[n.jsx("div",{className:"club-eyebrow-left",children:"⚔️ TEAM LEADERBOARD — THIS WEEK"}),(c==null?void 0:c.thisWeekTotal)>0&&n.jsx("button",{className:"club-share-week",onClick:Be,children:D?"✓ Copied!":"Share →"})]}),n.jsx("div",{className:"club-board",children:h.map((O,W)=>{const M=W===0&&O.week_shots>0,G=(c==null?void 0:c.thisWeekTotal)>0?Math.max(4,Math.round(O.week_shots/c.thisWeekTotal*100)):0;return n.jsxs("div",{className:`club-board-row${M?" club-board-row--lead":""}`,children:[n.jsx("div",{className:"club-board-rank",children:M?"🥇":`#${W+1}`}),n.jsxs("div",{className:"club-board-info",children:[n.jsxs("div",{className:"club-board-name",children:[O.age_division," ",O.tier]}),n.jsx("div",{className:"club-board-bar-track",children:n.jsx("div",{className:"club-board-bar-fill",style:{width:O.week_shots>0?`${G}%`:"0%"}})})]}),n.jsx("div",{className:"club-board-shots",children:O.week_shots>0?O.week_shots.toLocaleString():"—"})]},O.id)})}),(c==null?void 0:c.thisWeekTotal)>0&&n.jsxs("div",{className:"club-board-foot",children:[c.activePlayers," active players this week",c.vsLastWeek!==null&&n.jsxs("span",{className:`club-board-delta ${c.vsLastWeek>=0?"club-board-delta--up":"club-board-delta--down"}`,children:[c.vsLastWeek>=0?" ↑":" ↓"," ",Math.abs(c.vsLastWeek),"% vs last week"]})]}),n.jsxs("p",{className:"club-teams-note",style:{marginTop:14},children:["Don't see your team? Ask your coach to set it up — or"," ",n.jsx("button",{className:"club-inline-link",onClick:()=>t(je),children:"set it up yourself"}),"."]})]}),n.jsxs("section",{className:"club-section club-parents",children:[n.jsx("div",{className:"club-eyebrow-left",children:"👨‍👩‍👧 FOR PARENTS"}),n.jsx("h2",{className:"club-h2",children:"Sign up your player."}),n.jsx("p",{className:"club-section-text",children:"Send this link to parents. They sign in with Google, pick their kid's team, and they're on the leaderboard in 30 seconds."}),n.jsxs("div",{className:"club-parent-link-row",children:[n.jsx("div",{className:"club-parent-link-url",children:Q.replace("https://","")}),n.jsx("button",{className:"club-parent-link-copy",onClick:I,children:k?"✓ Copied":"Copy"})]}),n.jsxs("div",{className:"club-share-row",style:{marginTop:12},children:[n.jsxs("button",{className:"club-share-btn",onClick:E,children:[n.jsx("span",{children:"💬"})," Share via messages"]}),n.jsxs("button",{className:"club-share-btn",onClick:()=>t(V),children:[n.jsx("span",{children:"→"})," Sign up now"]})]})]}),p.length>0&&n.jsxs("section",{className:"club-section",children:[n.jsx("div",{className:"club-eyebrow-left",children:"🔥 TOP PLAYERS — THIS WEEK"}),n.jsx("div",{className:"club-players-board",children:p.map((O,W)=>n.jsxs("div",{className:`club-player-row${W===0?" club-player-row--lead":""}`,children:[n.jsx("div",{className:"club-player-rank",children:W===0?"🥇":`#${W+1}`}),n.jsxs("div",{className:"club-player-info",children:[n.jsx("div",{className:"club-player-name",children:O.display_name}),O.team&&n.jsxs("div",{className:"club-player-team",children:[O.team.age_division," ",O.team.tier]})]}),n.jsx("div",{className:"club-player-shots",children:O.week_shots.toLocaleString()})]},O.id))})]}),n.jsxs("section",{className:"club-section",children:[n.jsxs("h2",{className:"club-h2",children:["What ",r.name," players do here"]}),n.jsxs("div",{className:"club-loop",children:[n.jsxs("div",{className:"club-loop-card",children:[n.jsx("div",{className:"club-loop-icon",children:"🎯"}),n.jsx("div",{className:"club-loop-verb",children:"LOG"}),n.jsx("h3",{className:"club-loop-title",children:"Every off-ice shot."}),n.jsx("p",{className:"club-loop-text",children:"Driveway, basement, garage — every rep shows up on the team leaderboard. Coaches see the work that used to be invisible."})]}),n.jsxs("div",{className:"club-loop-card",children:[n.jsx("div",{className:"club-loop-icon",children:"📺"}),n.jsx("div",{className:"club-loop-verb",children:"LEARN"}),n.jsx("h3",{className:"club-loop-title",children:"Skill video library."}),n.jsx("p",{className:"club-loop-text",children:"Shooting and stickhandling videos players can follow at home. Growing all season."})]}),n.jsxs("div",{className:"club-loop-card",children:[n.jsx("div",{className:"club-loop-icon",children:"⚔️"}),n.jsx("div",{className:"club-loop-verb",children:"COMPETE"}),n.jsx("h3",{className:"club-loop-title",children:"Team leaderboard."}),n.jsx("p",{className:"club-loop-text",children:"Compete within your team, across the club, against rivals. New challenges each month."})]})]})]}),n.jsx("section",{className:"club-section club-coach-cta",children:n.jsxs("div",{className:"club-coach-inner",children:[n.jsxs("div",{className:"club-coach-text",children:[n.jsx("div",{className:"club-coach-eyebrow",children:"FOR COACHES"}),n.jsxs("h2",{className:"club-coach-title",children:["Coach at ",r.name,"?"]}),n.jsx("p",{className:"club-coach-sub",children:"Set up your team in 2 minutes. Sign in with Google, pick your age and tier, get your player invite link."})]}),n.jsxs("div",{className:"club-coach-actions",children:[n.jsxs("button",{className:"club-google-btn club-google-btn--sm",onClick:()=>t(je),children:[n.jsx(Gu,{}),"Set up my team"]}),n.jsx("button",{className:"club-coach-dash",onClick:()=>t("/coach/dashboard"),children:"Go to my dashboard →"})]})]})}),n.jsxs("section",{className:"club-section club-director",children:[n.jsx("div",{className:"club-eyebrow-left",children:"FOR DIRECTORS & ADMINS"}),n.jsx("h2",{className:"club-h2",children:"Adding more teams?"}),n.jsx("p",{className:"club-section-text",children:"Send this page to any coach who hasn't set up their team yet. They sign in with Google, pick their team, and get their own player invite link."}),n.jsxs("div",{className:"club-share-row",children:[n.jsxs("button",{className:"club-share-btn",onClick:de,children:[n.jsx("span",{children:"💬"}),S?"Shared!":"Share via messages"]}),n.jsxs("a",{className:"club-share-btn",href:C,children:[n.jsx("span",{children:"✉️"}),"Email coaches"]}),n.jsxs("button",{className:"club-share-btn",onClick:he,children:[n.jsx("span",{children:"📋"}),f?"Copied!":"Copy link"]})]})]}),n.jsx(Hl,{}),n.jsx(Ku,{nav:t}),n.jsx("style",{children:Ia})]})}function Gu(){return n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg",style:{display:"block",flexShrink:0},children:[n.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z",fill:"#4285F4"}),n.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z",fill:"#34A853"}),n.jsx("path",{d:"M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z",fill:"#FBBC05"}),n.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z",fill:"#EA4335"})]})}function La({nav:e}){return n.jsxs("nav",{className:"club-nav",children:[n.jsx(Qf,{nav:e}),n.jsx("button",{className:"club-nav-link",onClick:()=>e("/"),children:"← Home"})]})}function Qf({nav:e}){return n.jsxs("button",{className:"club-brand",onClick:()=>e("/"),children:[n.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[n.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),n.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]}),n.jsx("span",{children:"Hockey Shot Challenge"})]})}function Ku({nav:e}){return n.jsxs("footer",{className:"club-footer",children:[n.jsx(Qf,{nav:e}),n.jsxs("div",{className:"club-foot-links",children:[n.jsx(_n,{to:"/",className:"club-foot-link",children:"Home"}),n.jsx(_n,{to:"/for-clubs",className:"club-foot-link",children:"For Clubs"})]}),n.jsxs("div",{className:"club-foot-copy",children:["© ",new Date().getFullYear()," Hockey Shot Challenge · Built in Burlington, ON"]})]})}const Ia=`
.club-screen {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}
body:has(.club-screen) { background: var(--bg) !important; }

.club-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px clamp(16px, 5vw, 24px);
  border-bottom: 0.5px solid var(--border-dim);
}
.club-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-weight: 800; font-size: 14px;
  letter-spacing: 0.5px; color: white; background: transparent; padding: 0; cursor: pointer;
}
.club-nav-link { background: transparent; color: var(--text-soft); font-size: 14px; padding: 6px 10px; }
.club-nav-link:hover { color: white; }

.club-loading {
  padding: 80px 24px; text-align: center; color: var(--text-mute);
  font-family: var(--font-display); letter-spacing: 1.5px; font-size: 12px;
}
.club-404 { padding: 80px clamp(16px, 5vw, 24px); text-align: center; }
.club-404-title { font-family: var(--font-display); font-size: 32px; font-weight: 800; color: white; margin: 0 0 12px; }
.club-404-text { color: var(--text-soft); font-size: 16px; margin: 0 0 24px; }

.club-hero {
  padding: 40px clamp(16px, 5vw, 24px) 32px;
  text-align: left;
}
.club-eyebrow {
  display: inline-block;
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px;
  background: var(--accent-bg); padding: 6px 12px; border-radius: 999px; margin-bottom: 16px;
}
.club-eyebrow-left {
  font-family: var(--font-display); font-size: 10px; font-weight: 700;
  color: var(--accent); letter-spacing: 2px; margin-bottom: 10px;
}
.club-h1 {
  font-family: var(--font-display); font-size: clamp(28px, 5.5vw, 42px);
  font-weight: 800; line-height: 1.05; letter-spacing: -0.3px; color: white; margin: 0 0 16px;
}
.club-h1-name { display: block; color: white; }
.club-h1-em { display: block; color: var(--ice); margin-top: 4px; }
.club-lede { font-size: 16px; line-height: 1.55; color: var(--text-soft); margin: 0 0 24px; }
.club-ctas { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }

.club-share-link {
  background: transparent; color: var(--text-mute); font-size: 13px;
  padding: 6px; cursor: pointer; display: block; margin: 0 auto;
  transition: color 0.15s;
}
.club-share-link:hover { color: var(--ice); }

.club-google-btn {
  display: inline-flex; align-items: center; gap: 10px;
  background: white; color: #3c4043;
  border-radius: 10px; padding: 14px 20px;
  font-size: 15px; font-weight: 700; font-family: var(--font-body);
  cursor: pointer; transition: box-shadow 0.15s;
}
.club-google-btn:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.club-google-btn--sm { padding: 11px 16px; font-size: 14px; }

.club-btn-primary {
  background: var(--accent); color: white; padding: 13px 22px; border-radius: 10px;
  font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: 0.4px;
  transition: transform 0.1s, background 0.15s;
}
.club-btn-primary:hover { background: var(--accent-soft); }
.club-btn-primary:active { transform: scale(0.98); }

.club-section {
  padding: 36px clamp(16px, 5vw, 24px);
  border-top: 0.5px solid var(--border-dim);
}
.club-h2 {
  font-family: var(--font-display); font-size: clamp(22px, 4vw, 28px);
  font-weight: 800; letter-spacing: -0.2px; color: white; margin: 0 0 14px;
}
.club-section-text { color: var(--text-soft); font-size: 15px; line-height: 1.6; margin: 0 0 20px; }

/* Steps */
.club-steps { display: flex; flex-direction: column; gap: 14px; }
.club-step {
  display: flex; align-items: flex-start; gap: 14px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 16px;
}
.club-step-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 14px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.club-step-title { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: white; margin-bottom: 3px; }
.club-step-text { font-size: 13px; color: var(--text-mute); line-height: 1.4; }

/* Two-path cards */
.club-paths { display: grid; grid-template-columns: 1fr; gap: 16px; width: 100%; text-align: left; }
@media (min-width: 600px) { .club-paths { grid-template-columns: 1fr 1fr; } }
.club-path-card {
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 12px;
}
.club-path-eyebrow {
  font-family: var(--font-display); font-size: 10px; font-weight: 700;
  color: var(--accent); letter-spacing: 2px;
}
.club-path-title {
  font-family: var(--font-display); font-size: 20px; font-weight: 800; color: white; margin: 0;
}
.club-path-text { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }

/* Player notice */
.club-player-notice { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.03)); }

/* Share row */
.club-director { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.04)); }
.club-share-row { display: flex; gap: 10px; flex-wrap: wrap; }
.club-share-btn {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 10px; padding: 11px 16px;
  font-size: 13px; font-weight: 600; color: var(--text-soft);
  cursor: pointer; transition: border-color 0.15s, color 0.15s;
  text-decoration: none; font-family: var(--font-body);
}
.club-share-btn:hover { border-color: var(--accent); color: white; }

/* Stats */
.club-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.club-stat {
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 18px 12px; text-align: center;
}
.club-stat-num {
  font-family: var(--font-display); font-size: clamp(24px, 5vw, 36px);
  font-weight: 800; color: var(--ice); line-height: 1; font-variant-numeric: tabular-nums;
}
.club-stat-label {
  font-family: var(--font-display); font-size: 11px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; margin-top: 8px;
}

/* Teams */
.club-teams { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
.club-team {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; background: var(--surface);
  border: 0.5px solid var(--border-dim); border-radius: 10px;
}
.club-team-name { font-family: var(--font-display); font-weight: 700; color: white; font-size: 15px; }
.club-team-code { font-family: var(--font-display); font-size: 11px; color: var(--text-mute); letter-spacing: 1.5px; font-weight: 600; }
.club-teams-note { font-size: 13px; color: var(--text-mute); margin: 0; }
.club-inline-link { color: var(--accent); font-size: 13px; background: transparent; padding: 0; cursor: pointer; font-weight: 600; }

/* Feature cards */
.club-loop { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 700px) { .club-loop { grid-template-columns: repeat(3, 1fr); } }
.club-loop-card { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 12px; padding: 20px; }
.club-loop-icon { font-size: 28px; margin-bottom: 10px; }
.club-loop-verb { font-family: var(--font-display); font-size: 10px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 5px; }
.club-loop-title { font-family: var(--font-display); font-size: 18px; font-weight: 800; color: white; margin: 0 0 8px; }
.club-loop-text { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }

/* Parents section */
.club-parents { background: linear-gradient(180deg, rgba(41,121,255,0.04), var(--bg)); }
.club-parent-link-row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg);
  border: 1px solid var(--border-dim);
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 4px;
}
.club-parent-link-url {
  flex: 1;
  font-size: 13px;
  color: #60a5fa;
  font-family: monospace;
  word-break: break-all;
  min-width: 0;
}
.club-parent-link-copy {
  background: rgba(41,121,255,0.15);
  border: 1px solid rgba(41,121,255,0.3);
  border-radius: 7px;
  color: #60a5fa;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  flex-shrink: 0;
  white-space: nowrap;
}

/* Families */
.club-families { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.04)); }

/* Coach CTA (active club) */
.club-coach-cta {
  background: linear-gradient(135deg, rgba(41,121,255,0.08), rgba(41,121,255,0.03));
  border-top: 0.5px solid rgba(41,121,255,0.2);
  border-bottom: 0.5px solid rgba(41,121,255,0.2);
}
.club-coach-inner { display: flex; flex-direction: column; gap: 18px; }
@media (min-width: 600px) {
  .club-coach-inner { flex-direction: row; align-items: center; justify-content: space-between; }
}
.club-coach-eyebrow { font-family: var(--font-display); font-size: 10px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 6px; }
.club-coach-title { font-family: var(--font-display); font-size: clamp(20px, 3.5vw, 26px); font-weight: 800; color: white; margin: 0 0 6px; }
.club-coach-sub { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }
.club-coach-actions { display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }
.club-coach-dash { color: var(--accent); font-size: 13px; font-weight: 600; background: transparent; padding: 4px 0; cursor: pointer; text-align: left; }

/* Hero meta line */
.club-lede--headline {
  font-family: var(--font-display); font-size: clamp(20px, 4vw, 28px);
  font-weight: 800; color: var(--ice); line-height: 1.1; margin-bottom: 10px;
}
.club-hero-meta {
  display: flex; gap: 6px; flex-wrap: wrap;
  font-size: 13px; color: var(--text-mute); margin-bottom: 24px; align-items: center;
}
.club-hero-meta-dot { color: var(--border-dim); }

/* Section header row */
.club-section-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
}
.club-section-header .club-eyebrow-left { margin-bottom: 0; }
.club-share-week {
  font-family: var(--font-display); font-size: 12px; font-weight: 700;
  color: var(--accent); background: transparent; padding: 0; cursor: pointer;
  letter-spacing: 0.3px; transition: opacity 0.15s;
}
.club-share-week:hover { opacity: 0.75; }

/* Team leaderboard board */
.club-board { display: flex; flex-direction: column; gap: 8px; }
.club-board-row {
  display: flex; align-items: center; gap: 12px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 14px 16px;
  transition: border-color 0.15s;
}
.club-board-row--lead {
  border-color: #f4c542;
  background: linear-gradient(90deg, rgba(244,197,66,0.07), var(--surface));
}
.club-board-rank {
  font-family: var(--font-display); font-size: 13px; font-weight: 800;
  color: var(--text-mute); min-width: 28px; text-align: center; flex-shrink: 0;
}
.club-board-row--lead .club-board-rank { color: #f4c542; }
.club-board-info { flex: 1; min-width: 0; }
.club-board-name {
  font-family: var(--font-display); font-weight: 700; font-size: 15px; color: white;
  margin-bottom: 6px;
}
.club-board-bar-track {
  height: 4px; background: rgba(168,212,245,0.1); border-radius: 2px; overflow: hidden;
}
.club-board-bar-fill {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), var(--ice));
  transition: width 0.4s ease;
}
.club-board-row--lead .club-board-bar-fill { background: linear-gradient(90deg, #f4c542, #fde68a); }
.club-board-shots {
  font-family: var(--font-display); font-size: 18px; font-weight: 800;
  color: var(--ice); font-variant-numeric: tabular-nums; flex-shrink: 0; min-width: 52px; text-align: right;
}
.club-board-row--lead .club-board-shots { color: #f4c542; }
.club-board-foot {
  font-size: 12px; color: var(--text-mute); margin-top: 10px;
}
.club-board-delta { font-weight: 600; }
.club-board-delta--up { color: #22c55e; }
.club-board-delta--down { color: #ef4444; }

/* Top players board */
.club-players-board {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  overflow: hidden;
}
.club-player-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  border-bottom: 0.5px solid var(--border-dim);
}
.club-player-row:last-child { border-bottom: none; }
.club-player-row--lead { background: rgba(41,121,255,0.07); }
.club-player-rank {
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  color: var(--text-mute);
  width: 28px; flex-shrink: 0; text-align: center;
}
.club-player-info { flex: 1; min-width: 0; }
.club-player-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white; line-height: 1.1;
}
.club-player-team { font-size: 11px; color: var(--text-mute); margin-top: 2px; }
.club-player-shots {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 800;
  color: var(--ice);
  flex-shrink: 0;
}

/* Footer */
.club-footer {
  padding: 24px clamp(16px, 5vw, 24px); text-align: center;
  border-top: 0.5px solid var(--border-dim);
  display: flex; flex-direction: column; gap: 10px; align-items: center;
}
.club-foot-links { display: flex; gap: 16px; }
.club-foot-link { color: var(--text-soft); font-size: 13px; text-decoration: none; }
.club-foot-link:hover { color: white; }
.club-foot-copy { font-size: 12px; color: var(--text-mute); }
`;function pw(){const e=re(),[t,r]=y.useState(""),[s,a]=y.useState([]),[i,o]=y.useState(!1),[l,c]=y.useState(!1),[d,h]=y.useState(!1),u=y.useRef(null);y.useEffect(()=>{ce({title:"Free off-ice training for your whole association — Hockey Shot Challenge",description:"Coaches set up their own teams. Players track their own shots. You get the stats. Free for everyone, all season.",url:`${K}/clubs`})},[]),y.useEffect(()=>{if(u.current&&clearTimeout(u.current),!t.trim()||t.trim().length<2){a([]),o(!1);return}return o(!0),u.current=setTimeout(async()=>{try{const f=await Qr(t);a(f||[])}catch{a([])}finally{o(!1)}},200),()=>{u.current&&clearTimeout(u.current)}},[t]);const p=`${K}/clubs`,x="We're setting up Hockey Shot Challenge for our players this season. Free off-ice training — shot tracking, skill videos, and team leaderboards. Coaches: set up your team here 👇",v=async()=>{try{await navigator.clipboard.writeText(`${x}
${p}`),c(!0),setTimeout(()=>c(!1),2500)}catch{}},b=async()=>{try{await navigator.share({title:"Hockey Shot Challenge",text:x,url:p}),h(!0),setTimeout(()=>h(!1),2500)}catch{}},w=`https://twitter.com/intent/tweet?text=${encodeURIComponent(x)}&url=${encodeURIComponent(p)}`,g=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(p)}`;return n.jsxs("div",{className:"cs-wrap",children:[n.jsxs("nav",{className:"cs-nav",children:[n.jsxs("button",{className:"cs-brand",onClick:()=>e("/"),children:[n.jsx(Vu,{}),n.jsx("span",{children:"Hockey Shot Challenge"})]}),n.jsx("button",{className:"cs-nav-link",onClick:()=>e("/coach"),children:"I'm a coach →"})]}),n.jsxs("section",{className:"cs-hero",children:[n.jsx("div",{className:"cs-eyebrow",children:"FOR ASSOCIATION DIRECTORS"}),n.jsx("h1",{className:"cs-title",children:"Give your players something to do between practices."}),n.jsx("p",{className:"cs-sub",children:"Hockey Shot Challenge is a free training tool for your whole association. Coaches set up their own teams. Players track their shots at home. You get the numbers to talk about all season."}),n.jsx("div",{className:"cs-hero-search",children:n.jsxs("div",{className:"cs-search-wrap",children:[n.jsx("input",{type:"text",value:t,onChange:f=>r(f.target.value),placeholder:"Search by city or club name…",autoCapitalize:"none",autoCorrect:"off",spellCheck:"false",className:"cs-input"}),t.length>=2&&n.jsxs("div",{className:"cs-results",children:[i&&n.jsx("div",{className:"cs-status",children:"Searching…"}),!i&&s.length===0&&n.jsxs("div",{className:"cs-status",children:["No clubs found."," ",n.jsx("button",{className:"cs-link",onClick:()=>e("/coach"),children:"Add yours →"})]}),s.map(f=>n.jsxs("button",{className:"cs-result",onClick:()=>e(`/clubs/${f.slug}`),children:[n.jsxs("div",{children:[n.jsx("div",{className:"cs-result-name",children:f.name}),n.jsx("div",{className:"cs-result-meta",children:[f.city,f.governing_body,f.gender_type==="girls"?"Girls":null].filter(Boolean).join(" · ")})]}),n.jsx("span",{className:"cs-result-arrow",children:"→"})]},f.id))]})]})}),n.jsxs("div",{className:"cs-hero-ctas",children:[n.jsx("button",{className:"cs-cta-ghost",onClick:()=>e("/coach"),children:"I'm a coach →"}),n.jsx("button",{className:"cs-cta-ghost",onClick:()=>e("/rankings"),children:"🏆 See rankings →"})]})]}),n.jsxs("section",{className:"cs-section",children:[n.jsx("div",{className:"cs-eyebrow-left",children:"FOR BUSY DIRECTORS"}),n.jsx("h2",{className:"cs-h2",children:"You don't have to manage any of it."}),n.jsx("p",{className:"cs-body",children:"You share one link. Each coach finds their team and sets up in 2 minutes on their own. Players sign up from their phones. You don't chase anyone."}),n.jsxs("div",{className:"cs-zero-cards",children:[n.jsxs("div",{className:"cs-zero-card",children:[n.jsx("div",{className:"cs-zero-icon",children:"👆"}),n.jsx("div",{className:"cs-zero-title",children:"One link to share"}),n.jsx("div",{className:"cs-zero-text",children:"Send this page to your coaches. That's it. They do the rest."})]}),n.jsxs("div",{className:"cs-zero-card",children:[n.jsx("div",{className:"cs-zero-icon",children:"⚙️"}),n.jsx("div",{className:"cs-zero-title",children:"Coaches set up their own teams"}),n.jsx("div",{className:"cs-zero-text",children:"Each coach signs in with Google, picks their age and tier, and gets their own player invite link."})]}),n.jsxs("div",{className:"cs-zero-card",children:[n.jsx("div",{className:"cs-zero-icon",children:"📲"}),n.jsx("div",{className:"cs-zero-title",children:"Players sign up themselves"}),n.jsx("div",{className:"cs-zero-text",children:"No app to install. No email needed. Kids are signed up in 30 seconds."})]})]})]}),n.jsxs("section",{className:"cs-section cs-social",children:[n.jsx("div",{className:"cs-eyebrow-left",children:"SHARE WITH YOUR COACHES & COMMUNITY"}),n.jsx("h2",{className:"cs-h2",children:"Spread the word in one tap."}),n.jsx("p",{className:"cs-body",style:{marginBottom:20},children:"Post it to your association's social channels. Copy the text below and use it as-is, or make it your own."}),n.jsx("div",{className:"cs-post-preview",children:n.jsxs("div",{className:"cs-post-text",children:[x,n.jsx("br",{}),n.jsx("span",{className:"cs-post-url",children:p})]})}),n.jsxs("div",{className:"cs-social-btns",children:[n.jsxs("button",{className:"cs-social-btn cs-social-btn--copy",onClick:v,children:[n.jsx("span",{children:"📋"})," ",l?"Copied!":"Copy post"]}),n.jsxs("button",{className:"cs-social-btn cs-social-btn--share",onClick:b,children:[n.jsx("span",{children:"↗"})," ",d?"Shared!":"Share"]}),n.jsxs("a",{className:"cs-social-btn cs-social-btn--x",href:w,target:"_blank",rel:"noopener noreferrer",children:[n.jsx(fw,{})," Post on X"]}),n.jsxs("a",{className:"cs-social-btn cs-social-btn--fb",href:g,target:"_blank",rel:"noopener noreferrer",children:[n.jsx(mw,{})," Share on Facebook"]})]})]}),n.jsxs("section",{className:"cs-section cs-talk",children:[n.jsx("div",{className:"cs-eyebrow-left",children:"SOMETHING TO TALK ABOUT"}),n.jsx("h2",{className:"cs-h2",children:"Real numbers. All season long."}),n.jsx("p",{className:"cs-body",children:"Your players are putting in work at home. Now you can see it — and talk about it. Post it on your socials. Share it at your AGM. Show parents their kids are getting better."}),n.jsxs("div",{className:"cs-stat-examples",children:[n.jsxs("div",{className:"cs-stat-ex",children:[n.jsx("div",{className:"cs-stat-ex-num",children:"12,400"}),n.jsx("div",{className:"cs-stat-ex-label",children:"shots logged this month"})]}),n.jsxs("div",{className:"cs-stat-ex",children:[n.jsx("div",{className:"cs-stat-ex-num",children:"#2"}),n.jsx("div",{className:"cs-stat-ex-label",children:"in Ontario this season"})]}),n.jsxs("div",{className:"cs-stat-ex",children:[n.jsx("div",{className:"cs-stat-ex-num",children:"84%"}),n.jsx("div",{className:"cs-stat-ex-label",children:"of players active this week"})]})]}),n.jsx("p",{className:"cs-stat-note",children:"These are the kinds of numbers your association will have to share."})]}),n.jsxs("section",{className:"cs-section",children:[n.jsx("div",{className:"cs-eyebrow-left",children:"WHAT PLAYERS GET"}),n.jsx("h2",{className:"cs-h2",children:"Kids actually want to use it."}),n.jsx("p",{className:"cs-body",style:{marginBottom:20},children:"It's not homework. It's a game. Players log shots, follow skill videos, and compete against teammates and rival clubs every day."}),n.jsxs("div",{className:"cs-cards",children:[n.jsxs("div",{className:"cs-card",children:[n.jsx("div",{className:"cs-card-icon",children:"📺"}),n.jsx("h3",{className:"cs-card-title",children:"Skill videos"}),n.jsx("p",{className:"cs-card-text",children:"Shooting drills and stickhandling videos players follow at home. New videos added all season."})]}),n.jsxs("div",{className:"cs-card",children:[n.jsx("div",{className:"cs-card-icon",children:"🔥"}),n.jsx("h3",{className:"cs-card-title",children:"Daily challenges"}),n.jsx("p",{className:"cs-card-text",children:"New challenges keep players coming back. Streaks, personal bests, team goals."})]}),n.jsxs("div",{className:"cs-card",children:[n.jsx("div",{className:"cs-card-icon",children:"🏆"}),n.jsx("h3",{className:"cs-card-title",children:"Rankings at every level"}),n.jsx("p",{className:"cs-card-text",children:"Players compete within their team, across your whole association, and against every club on the platform."})]})]})]}),n.jsxs("section",{className:"cs-section cs-rankings",children:[n.jsx("div",{className:"cs-eyebrow-left",children:"HOW RANKINGS WORK"}),n.jsx("h2",{className:"cs-h2",children:"Start local. Go national."}),n.jsxs("div",{className:"cs-rank-levels",children:[n.jsxs("div",{className:"cs-rank-level",children:[n.jsx("div",{className:"cs-rank-num",children:"1"}),n.jsxs("div",{children:[n.jsx("div",{className:"cs-rank-title",children:"Beat your teammates"}),n.jsx("div",{className:"cs-rank-text",children:"Every player on the team is ranked. Who put in the most work this week?"})]})]}),n.jsx("div",{className:"cs-rank-connector",children:"↓"}),n.jsxs("div",{className:"cs-rank-level",children:[n.jsx("div",{className:"cs-rank-num",children:"2"}),n.jsxs("div",{children:[n.jsx("div",{className:"cs-rank-title",children:"Compete across your association"}),n.jsx("div",{className:"cs-rank-text",children:"U12 AAA vs U12 AA vs U12 A. All your teams, one board."})]})]}),n.jsx("div",{className:"cs-rank-connector",children:"↓"}),n.jsxs("div",{className:"cs-rank-level",children:[n.jsx("div",{className:"cs-rank-num",children:"3"}),n.jsxs("div",{children:[n.jsx("div",{className:"cs-rank-title",children:"Your association vs everyone"}),n.jsx("div",{className:"cs-rank-text",children:"Burlington vs Oakville vs Stoney Creek. See where your club stands across Ontario."})]})]})]})]}),n.jsxs("section",{className:"cs-section cs-free",children:[n.jsx("div",{className:"cs-free-badge",children:"$0"}),n.jsx("h2",{className:"cs-h2",children:"Free. No budget needed."}),n.jsx("p",{className:"cs-body",children:'No credit card. No trial. No "ask the board." Every coach, every player, every parent uses it free. All season, every season.'}),n.jsxs("div",{className:"cs-free-pills",children:[n.jsx("span",{className:"cs-pill",children:"✓ Free for coaches"}),n.jsx("span",{className:"cs-pill",children:"✓ Free for players"}),n.jsx("span",{className:"cs-pill",children:"✓ Free for parents"}),n.jsx("span",{className:"cs-pill",children:"✓ No app to install"})]})]}),n.jsxs("footer",{className:"cs-footer",children:[n.jsxs("button",{className:"cs-brand",onClick:()=>e("/"),children:[n.jsx(Vu,{}),n.jsx("span",{children:"Hockey Shot Challenge"})]}),n.jsxs("div",{className:"cs-foot-copy",children:["© ",new Date().getFullYear()," Hockey Shot Challenge · Built in Burlington, ON · Free for all youth hockey"]})]}),n.jsx("style",{children:gw})]})}function fw(){return n.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",style:{display:"block",flexShrink:0},children:n.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}function mw(){return n.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",style:{display:"block",flexShrink:0},children:n.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})}function Vu(){return n.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[n.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),n.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const gw=`
.cs-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); }

.cs-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px clamp(16px, 5vw, 40px);
  border-bottom: 0.5px solid var(--border-dim);
}
.cs-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-weight: 800; font-size: 14px;
  letter-spacing: 0.5px; color: white; background: transparent; padding: 0; cursor: pointer;
}
.cs-nav-link { color: var(--ice); font-size: 14px; font-weight: 600; padding: 8px 12px; background: transparent; cursor: pointer; }
.cs-nav-link:hover { color: white; }

.cs-hero {
  max-width: 680px; margin: 0 auto;
  padding: 52px clamp(16px, 5vw, 24px) 44px;
}
.cs-eyebrow {
  display: inline-block;
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px;
  background: var(--accent-bg); padding: 6px 12px; border-radius: 999px; margin-bottom: 18px;
}
.cs-eyebrow-left {
  font-family: var(--font-display); font-size: 10px; font-weight: 700;
  color: var(--accent); letter-spacing: 2px; margin-bottom: 10px;
}
.cs-title {
  font-family: var(--font-display); font-size: clamp(30px, 5.5vw, 48px);
  font-weight: 800; line-height: 1.07; letter-spacing: -0.5px; color: white; margin: 0 0 16px;
}
.cs-sub { font-size: 17px; color: var(--text-soft); line-height: 1.6; margin: 0 0 28px; }
.cs-hero-ctas { display: flex; gap: 10px; flex-wrap: wrap; }
.cs-hero-search { width: 100%; margin-bottom: 16px; text-align: left; }
.cs-cta-primary {
  background: var(--accent); color: white; border-radius: 10px; padding: 14px 22px;
  font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: 0.4px;
  cursor: pointer; transition: background 0.15s;
}
.cs-cta-primary:hover { background: var(--accent-soft); }
.cs-cta-ghost {
  background: transparent; color: var(--ice); border: 0.5px solid var(--border);
  border-radius: 10px; padding: 14px 20px;
  font-family: var(--font-display); font-size: 14px; font-weight: 600;
  cursor: pointer; transition: background 0.15s;
}
.cs-cta-ghost:hover { background: var(--surface); }

.cs-h2 {
  font-family: var(--font-display); font-size: clamp(22px, 4vw, 30px);
  font-weight: 800; letter-spacing: -0.3px; color: white; margin: 0 0 12px;
}
.cs-body { font-size: 15px; color: var(--text-soft); line-height: 1.6; margin: 0; }

.cs-section {
  max-width: 680px; margin: 0 auto;
  padding: 44px clamp(16px, 5vw, 24px);
  border-top: 0.5px solid var(--border-dim);
}

/* Social share */
.cs-social { }
.cs-post-preview {
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 18px; margin-bottom: 16px;
}
.cs-post-text { font-size: 14px; color: var(--text-soft); line-height: 1.6; white-space: pre-wrap; }
.cs-post-url { color: var(--accent); font-size: 13px; }
.cs-social-btns { display: flex; flex-wrap: wrap; gap: 10px; }
.cs-social-btn {
  display: inline-flex; align-items: center; gap: 7px;
  border-radius: 10px; padding: 11px 16px;
  font-size: 13px; font-weight: 700; font-family: var(--font-body);
  cursor: pointer; text-decoration: none; transition: opacity 0.15s;
}
.cs-social-btn:hover { opacity: 0.85; }
.cs-social-btn--copy { background: var(--surface); border: 0.5px solid var(--border); color: var(--text-soft); }
.cs-social-btn--share { background: var(--surface); border: 0.5px solid var(--border); color: var(--text-soft); }
.cs-social-btn--x { background: #000; color: white; border: none; }
.cs-social-btn--fb { background: #1877F2; color: white; border: none; }

/* Zero work cards */
.cs-zero-cards { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 20px; }
@media (min-width: 600px) { .cs-zero-cards { grid-template-columns: repeat(3, 1fr); } }
.cs-zero-card { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 14px; padding: 20px; }
.cs-zero-icon { font-size: 26px; margin-bottom: 10px; }
.cs-zero-title { font-family: var(--font-display); font-size: 15px; font-weight: 800; color: white; margin-bottom: 6px; }
.cs-zero-text { font-size: 13px; color: var(--text-soft); line-height: 1.5; }

/* Stat examples */
.cs-talk { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.06)); }
.cs-stat-examples { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0 12px; }
.cs-stat-ex { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 12px; padding: 18px 12px; text-align: center; }
.cs-stat-ex-num { font-family: var(--font-display); font-size: clamp(22px, 4vw, 32px); font-weight: 800; color: var(--ice); line-height: 1; font-variant-numeric: tabular-nums; }
.cs-stat-ex-label { font-size: 12px; color: var(--text-mute); margin-top: 6px; line-height: 1.3; }
.cs-stat-note { font-size: 12px; color: var(--text-mute); font-style: italic; margin: 0; }

/* Feature cards */
.cs-cards { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 4px; }
@media (min-width: 600px) { .cs-cards { grid-template-columns: repeat(3, 1fr); } }
.cs-card { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 14px; padding: 22px; }
.cs-card-icon { font-size: 28px; margin-bottom: 12px; }
.cs-card-title { font-family: var(--font-display); font-size: 17px; font-weight: 800; color: white; margin: 0 0 8px; }
.cs-card-text { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }

/* Rankings */
.cs-rankings { }
.cs-rank-levels { display: flex; flex-direction: column; }
.cs-rank-level {
  display: flex; align-items: flex-start; gap: 14px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 16px 18px;
}
.cs-rank-connector { text-align: center; color: var(--accent); font-size: 20px; padding: 4px 0; margin-left: 22px; }
.cs-rank-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 14px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cs-rank-title { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: white; margin-bottom: 4px; }
.cs-rank-text { font-size: 13px; color: var(--text-mute); line-height: 1.4; }

/* Free */
.cs-free { text-align: center; background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.06)); }
.cs-free-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 22px; font-weight: 800; margin-bottom: 16px;
}
.cs-free-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 20px; }
.cs-pill {
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 999px; padding: 7px 14px;
  font-size: 13px; font-weight: 600; color: var(--ice);
  font-family: var(--font-display); letter-spacing: 0.3px;
}

/* Search */
.cs-search-wrap { position: relative; }
.cs-input {
  width: 100%; background: var(--surface); border: 1.5px solid var(--accent);
  border-radius: 14px; padding: 18px 22px; color: var(--text); font-size: 17px;
  outline: none; font-family: inherit;
}
.cs-input::placeholder { color: var(--text-mute); }
.cs-results {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  background: var(--surface); border: 0.5px solid var(--border);
  border-radius: 12px; overflow: hidden; z-index: 10;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.cs-status { text-align: center; font-size: 14px; color: var(--text-mute); padding: 16px; }
.cs-link { color: var(--accent); font-size: 14px; font-weight: 600; background: transparent; padding: 0; cursor: pointer; }
.cs-result {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px; text-align: left; cursor: pointer; width: 100%;
  border-bottom: 0.5px solid var(--border-dim); transition: background 0.1s;
}
.cs-result:last-child { border-bottom: none; }
.cs-result:hover { background: var(--surface-raised); }
.cs-result-name { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: white; margin-bottom: 2px; }
.cs-result-meta { font-size: 12px; color: var(--text-mute); }
.cs-result-arrow { color: var(--accent); font-size: 16px; flex-shrink: 0; margin-left: 12px; }

.cs-footer {
  border-top: 0.5px solid var(--border-dim);
  padding: 24px clamp(16px, 5vw, 40px);
  display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;
}
.cs-foot-copy { font-size: 12px; color: var(--text-mute); }
`;function xw(){var p;const{slug:e}=Hc(),t=re(),[r,s]=y.useState(null),[a,i]=y.useState({playerCount:0,teamCount:0,totalShots:0}),[o,l]=y.useState([]),[c,d]=y.useState(!0),[h,u]=y.useState(!1);return y.useEffect(()=>{e&&(async()=>{const x=await ta(e);if(!x){u(!0),d(!1),ce({title:"Club not found",noindex:!0});return}s(x);const[v,b]=await Promise.all([Kc(x.id),Vc(x.id)]);i(v),l(b),d(!1),ce({title:`Join ${x.name}`,description:`${x.name} is on Hockey Shot Challenge. ${v.playerCount} players, ${v.totalShots.toLocaleString()}+ shots logged. Join your team today.`,url:`${K}/join/${x.slug}`})})()},[e]),c?n.jsxs("div",{className:"join-wrap join-loading",children:[n.jsx("div",{children:"Loading…"}),n.jsx("style",{children:Eo})]}):h?n.jsxs("div",{className:"join-wrap",children:[n.jsxs("div",{className:"join-card",children:[n.jsx("h1",{className:"join-title",children:"Club not found"}),n.jsx("p",{className:"join-sub",children:"We couldn't find a club at that link. Double-check with the person who sent it."}),n.jsx("button",{className:"btn-primary-join",onClick:()=>t("/"),children:"Go to Hockey Shot Challenge"})]}),n.jsx("style",{children:Eo})]}):n.jsxs("div",{className:"join-wrap",children:[n.jsxs("div",{className:"join-card",children:[n.jsxs("div",{className:"join-brand",children:[n.jsx(yw,{}),n.jsx("span",{children:"Hockey Shot Challenge"})]}),n.jsx("div",{className:"join-crest",children:n.jsx("div",{className:"join-crest-letter",children:(p=r.name[0])==null?void 0:p.toUpperCase()})}),n.jsx("div",{className:"join-eyebrow",children:"YOU'VE BEEN INVITED TO JOIN"}),n.jsx("h1",{className:"join-title",children:r.name}),r.city&&n.jsx("div",{className:"join-city",children:r.city}),n.jsxs("div",{className:"join-stats",children:[n.jsxs("div",{className:"stat",children:[n.jsx("div",{className:"stat-num tnum",children:a.playerCount}),n.jsx("div",{className:"stat-label",children:"Players"})]}),n.jsxs("div",{className:"stat",children:[n.jsx("div",{className:"stat-num tnum",children:a.teamCount}),n.jsx("div",{className:"stat-label",children:"Teams"})]}),n.jsxs("div",{className:"stat",children:[n.jsx("div",{className:"stat-num tnum",children:a.totalShots.toLocaleString()}),n.jsx("div",{className:"stat-label",children:"Shots"})]})]}),n.jsxs("button",{className:"btn-primary-join",onClick:()=>t(`/start?club=${r.slug}`),children:["Join ",r.name," →"]}),n.jsx("div",{className:"join-hint",children:"Takes 30 seconds. No email needed."}),o.length>0&&n.jsxs("div",{className:"join-teams",children:[n.jsx("div",{className:"join-teams-label",children:"TEAMS IN THIS CLUB"}),n.jsxs("div",{className:"join-teams-list",children:[o.slice(0,10).map(x=>n.jsx("div",{className:"join-team-pill",children:x.name},x.id)),o.length>10&&n.jsxs("div",{className:"join-team-pill",children:["+",o.length-10," more"]})]})]})]}),n.jsx("div",{className:"join-foot",children:n.jsx("button",{className:"join-foot-link",onClick:()=>t("/"),children:"What is Hockey Shot Challenge? →"})}),n.jsx("style",{children:Eo})]})}function yw(){return n.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[n.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),n.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const Eo=`
.join-wrap {
  min-height: 100dvh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 20px 16px 40px;
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.08));
  width: 100%; max-width: none;
}
.join-loading {
  color: var(--text-mute);
  font-family: var(--font-display);
  letter-spacing: 2px;
  font-size: 12px;
}
.join-card {
  width: 100%; max-width: 420px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 24px;
  padding: 28px 24px;
  text-align: center;
  position: relative;
}
.join-brand {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-display);
  font-size: 12px; font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-soft);
  margin-bottom: 24px;
  text-transform: uppercase;
}
.join-crest {
  width: 76px; height: 76px;
  margin: 0 auto 20px;
  background: var(--accent-bg);
  border: 2px solid var(--accent);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 36px; font-weight: 800;
  color: white;
  letter-spacing: 1px;
}
.join-crest-letter { line-height: 1; }
.join-eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 10px;
}
.join-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: 0.3px;
  color: white;
  margin: 0 0 6px;
}
.join-city {
  font-size: 14px;
  color: var(--text-mute);
  margin-bottom: 24px;
}
.join-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg);
  border-radius: var(--radius);
}
.stat { text-align: center; }
.stat-num {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
}
.stat-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  margin-top: 5px;
  text-transform: uppercase;
}

.btn-primary-join {
  width: 100%;
  background: var(--accent);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.5px;
  transition: transform 0.1s, background 0.15s;
  margin-bottom: 10px;
}
.btn-primary-join:hover { background: var(--accent-soft); }
.btn-primary-join:active { transform: scale(0.98); }

.join-hint {
  font-size: 12px;
  color: var(--text-mute);
  margin-bottom: 20px;
}

.join-teams {
  padding-top: 20px;
  border-top: 0.5px solid var(--border-dim);
}
.join-teams-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  margin-bottom: 10px;
  font-weight: 500;
}
.join-teams-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}
.join-team-pill {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--ice);
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
}

.join-foot {
  margin-top: 20px;
  text-align: center;
}
.join-foot-link {
  color: var(--text-mute);
  font-size: 13px;
  padding: 8px 16px;
}
.join-foot-link:hover { color: var(--ice); }
`,Xa=[{name:"Rookie",floor:0,next:200},{name:"Junior",floor:200,next:750},{name:"Prospect",floor:750,next:2e3},{name:"Varsity",floor:2e3,next:5e3},{name:"Captain",floor:5e3,next:1e4},{name:"All-Star",floor:1e4,next:25e3},{name:"Legend",floor:25e3,next:1/0}];function ra(e){var r;const t=Math.max(0,e||0);for(let s=Xa.length-1;s>=0;s--){const a=Xa[s];if(t>=a.floor){const i=a.next===1/0?0:a.next-a.floor,o=a.next===1/0?1:(t-a.floor)/i;let l,c,d;if(a.next===1/0)l="III",c=a.floor,d=a.floor;else{const x=i/3;o<1/3?(l="I",c=a.floor,d=a.floor+x):o<2/3?(l="II",c=a.floor+x,d=a.floor+2*x):(l="III",c=a.floor+2*x,d=a.next)}const h=d>c?(t-c)/(d-c):1,u=a.next===1/0?0:a.next-t,p=a.next===1/0?0:Math.max(0,Math.ceil(d-t));return{name:a.name,tier:l,fullName:`${a.name} ${l}`,progress:o,tierProgress:Math.min(1,Math.max(0,h)),shotsToNextRank:Math.max(0,u),shotsToNextTier:p,nextRankName:((r=Xa[s+1])==null?void 0:r.name)??null,isMax:a.next===1/0}}}return{name:"Rookie",tier:"I",fullName:"Rookie I",progress:0,tierProgress:0,shotsToNextRank:200,shotsToNextTier:67,nextRankName:"Junior",isMax:!1}}function vw(){var w,g,f;const{username:e}=Hc(),t=re(),[r,s]=y.useState(null),[a,i]=y.useState(null),[o,l]=y.useState(!0),[c,d]=y.useState(!1);if(y.useEffect(()=>{e&&(async()=>{const{data:m}=await P.from("players").select("id, username, display_name, position, lifetime_shots, current_streak, card_number, created_at, club_name, team:teams(id, name), club:clubs(id, name, slug)").eq("username",e).maybeSingle();if(!m){d(!0),l(!1),ce({title:"Card not found",noindex:!0});return}s(m);const k=ra(m.lifetime_shots);ce({title:`${m.display_name}'s card`,description:`${k.fullName} · ${m.lifetime_shots.toLocaleString()} shots · Check out ${m.display_name}'s Hockey Shot Challenge card.`,url:`${K}/card/${e}`});const N=await Kf(m.id);i(N),l(!1)})()},[e]),o)return n.jsxs("div",{className:"pc-wrap pc-loading",children:[n.jsx("div",{children:"Loading…"}),n.jsx("style",{children:Ao})]});if(c)return n.jsxs("div",{className:"pc-wrap",children:[n.jsxs("div",{className:"pc-card",children:[n.jsx("h1",{style:{fontFamily:"var(--font-display)",fontSize:24,marginBottom:12},children:"Card not found"}),n.jsx("p",{style:{color:"var(--text-mute)",marginBottom:20},children:"We couldn't find a player with that username."}),n.jsx("button",{className:"pc-cta",onClick:()=>t("/"),children:"Go to Hockey Shot Challenge"})]}),n.jsx("style",{children:Ao})]});const h=ra(r.lifetime_shots),u=r.card_number?String(r.card_number).padStart(3,"0"):"000",p=r.position==="F"?"Forward":r.position==="D"?"Defense":"Goalie",x=a?Object.values(a).reduce((m,k)=>m+k,0):0,v=m=>x>0?Math.round(m/x*100):0,b=a?[{name:"Wrist",val:a.Wrist,pct:v(a.Wrist),color:"#2979ff"},{name:"Snap",val:a.Snap,pct:v(a.Snap),color:"#a8d4f5"},{name:"Slap",val:a.Slap,pct:v(a.Slap),color:"#ff7a29"},{name:"Backhand",val:a.Backhand,pct:v(a.Backhand),color:"#3dd68c"}].filter(m=>m.val>0):[];return n.jsxs("div",{className:"pc-wrap",children:[n.jsx("nav",{className:"pc-nav",children:n.jsxs("div",{className:"pc-brand",onClick:()=>t("/"),children:[n.jsx(bw,{}),n.jsx("span",{children:"Hockey Shot Challenge"})]})}),n.jsxs("div",{className:"pc-inner",children:[n.jsxs("div",{className:"pc-card",children:[n.jsxs("div",{className:"pc-meta",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"pc-meta-label",children:["HOCKEY SHOT CHALLENGE · ",new Date().getFullYear()]}),n.jsxs("div",{className:"pc-meta-handle",children:["@",r.username]})]}),n.jsxs("div",{style:{textAlign:"right"},children:[n.jsx("div",{className:"pc-meta-label",children:"CARD"}),n.jsxs("div",{className:"pc-meta-serial",children:["#",u]})]})]}),n.jsxs("div",{className:"pc-identity",children:[n.jsxs("div",{className:"pc-avatar",children:[n.jsxs("svg",{viewBox:"0 0 80 80",style:{width:"100%",height:"100%"},children:[n.jsx("polygon",{points:"40,4 72,22 72,58 40,76 8,58 8,22",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1.5"}),n.jsx("polygon",{points:"40,12 66,26 66,54 40,68 14,54 14,26",fill:"none",stroke:"#4a92ff",strokeWidth:"0.5",opacity:"0.6"})]}),n.jsx("div",{className:"pc-avatar-letters",children:r.display_name.slice(0,2).toUpperCase()})]}),n.jsxs("div",{style:{flex:1,minWidth:0},children:[n.jsx("div",{className:"pc-name",children:r.display_name}),n.jsxs("div",{className:"pc-pills",children:[n.jsx("div",{className:"pc-pill",children:p.toUpperCase()}),((w=r.team)==null?void 0:w.name)&&n.jsx("div",{className:"pc-pill",children:r.team.name}),(((g=r.club)==null?void 0:g.name)||r.club_name)&&n.jsx("div",{className:"pc-pill pc-pill--alt",children:((f=r.club)==null?void 0:f.name)||r.club_name})]})]})]}),n.jsxs("div",{className:"pc-rank",children:[n.jsx("div",{className:"pc-meta-label",children:"Current rank"}),n.jsxs("div",{className:"pc-rank-name",children:[h.name," ",n.jsx("span",{style:{color:"var(--gold)"},children:h.tier})]})]}),n.jsxs("div",{className:"pc-stats",children:[n.jsxs("div",{className:"pc-stat",children:[n.jsx("div",{className:"pc-stat-num",children:r.lifetime_shots.toLocaleString()}),n.jsx("div",{className:"pc-stat-label",children:"Lifetime"})]}),n.jsxs("div",{className:"pc-stat",children:[n.jsx("div",{className:"pc-stat-num",children:r.current_streak||0}),n.jsx("div",{className:"pc-stat-label",children:"Streak"})]}),n.jsxs("div",{className:"pc-stat",children:[n.jsx("div",{className:"pc-stat-num",children:r.position}),n.jsx("div",{className:"pc-stat-label",children:"Pos"})]})]}),b.length>0&&n.jsxs("div",{className:"pc-mix",children:[n.jsx("div",{className:"pc-meta-label",children:"Shot mix · lifetime"}),n.jsx("div",{className:"pc-mix-bar",children:b.map(m=>n.jsx("div",{style:{width:`${m.pct}%`,background:m.color}},m.name))}),n.jsx("div",{className:"pc-mix-legend",children:b.map(m=>n.jsxs("div",{className:"pc-mix-item",children:[n.jsx("span",{style:{color:m.color},children:"●"}),n.jsxs("span",{children:[m.name," ",m.pct,"%"]})]},m.name))})]})]}),n.jsx("button",{className:"pc-share",onClick:async()=>{const m=window.location.href,k=`Check out ${r.display_name}'s Hockey Shot Challenge card — ${r.lifetime_shots.toLocaleString()} shots, ${h.fullName}`;if(navigator.share)try{await navigator.share({title:r.display_name,text:k,url:m})}catch{}else await navigator.clipboard.writeText(m)},children:"Share this card ↗"}),n.jsx("button",{className:"pc-cta",onClick:()=>t("/start"),children:"Make your own card →"}),n.jsx("div",{className:"pc-hint",children:"Free. 30 seconds. No email needed."})]}),n.jsx("style",{children:Ao})]})}function bw(){return n.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 40 40",style:{display:"block"},children:[n.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),n.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const Ao=`
.pc-wrap {
  min-height: 100dvh;
  background: var(--bg);
  width: 100%; max-width: none;
}
.pc-loading {
  display: flex; align-items: center; justify-content: center;
  color: var(--text-mute);
  font-family: var(--font-display);
  letter-spacing: 2px; font-size: 12px;
}
.pc-nav {
  display: flex; justify-content: center;
  padding: 18px 20px;
  border-bottom: 0.5px solid var(--border-dim);
}
.pc-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
}
.pc-inner {
  max-width: 430px;
  margin: 0 auto;
  padding: 24px 16px 40px;
  text-align: center;
}
.pc-card {
  background: var(--surface-raised);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 18px;
  text-align: left;
}
.pc-meta {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 16px;
}
.pc-meta-label {
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 1.5px; font-weight: 500;
  text-transform: uppercase;
}
.pc-meta-handle {
  font-size: 11px; color: var(--ice);
  margin-top: 2px;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.5px;
}
.pc-meta-serial {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  margin-top: 2px;
}

.pc-identity {
  display: flex; gap: 12px; align-items: center;
  margin-bottom: 16px;
}
.pc-avatar {
  position: relative;
  width: 70px; height: 70px;
  flex-shrink: 0;
}
.pc-avatar-letters {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 24px; font-weight: 800;
  color: white;
  letter-spacing: 1px;
}
.pc-name {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 800;
  letter-spacing: 0.3px;
  line-height: 1.05;
  word-break: break-word;
}
.pc-pills {
  display: flex; gap: 5px; margin-top: 7px; flex-wrap: wrap;
}
.pc-pill {
  background: var(--accent-bg);
  color: var(--ice);
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-family: var(--font-display);
}
.pc-pill--alt {
  background: transparent;
  border: 0.5px solid var(--border);
  color: var(--text-soft);
}

.pc-rank {
  background: rgba(10,14,26,0.5);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 14px;
}
.pc-rank-name {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  letter-spacing: 0.4px;
  margin-top: 4px;
}

.pc-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}
.pc-stat {
  text-align: center;
  background: rgba(10,14,26,0.4);
  border-radius: 10px;
  padding: 10px 4px;
}
.pc-stat-num {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: white;
  line-height: 1;
}
.pc-stat-label {
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 1px; margin-top: 5px;
  text-transform: uppercase;
}

.pc-mix { }
.pc-mix-bar {
  display: flex; height: 6px;
  border-radius: 999px; overflow: hidden;
  background: var(--bg);
  margin: 8px 0;
}
.pc-mix-legend {
  display: flex; flex-wrap: wrap; gap: 8px 12px;
  font-size: 10px; color: var(--text-soft);
}
.pc-mix-item { display: flex; align-items: center; gap: 4px; }

.pc-cta {
  width: 100%;
  background: var(--accent);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}
.pc-share {
  width: 100%;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  cursor: pointer;
}
.pc-share:active { opacity: 0.7; }
.pc-cta:hover { background: var(--accent-soft); }
.pc-hint {
  font-size: 12px;
  color: var(--text-mute);
}
`;function Yu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:e.toLocaleString()}const ww=["🥇","🥈","🥉"];function kw(){var d,h;const[e,t]=y.useState([]),[r,s]=y.useState(null),[a,i]=y.useState(!0);y.useEffect(()=>{Promise.all([sw(),nw()]).then(([u,p])=>{t(u||[]),s(p)}).catch(u=>{console.error("Rankings error:",u),t([])}).finally(()=>i(!1))},[]);const o="https://hockeyshotchallenge.com/rankings",l=e[0]?`${e[0].name} leads Hockey Shot Challenge with ${Yu(e[0].total_shots)} shots fired! 🏒 Check the association rankings:`:"Check the Hockey Shot Challenge association rankings!",c=()=>{navigator.share?navigator.share({title:"Hockey Shot Challenge Rankings",text:l,url:o}):(navigator.clipboard.writeText(`${l} ${o}`),alert("Link copied!"))};return n.jsxs("div",{className:"rk-page",children:[n.jsxs("header",{className:"rk-header",children:[n.jsx(_n,{to:"/",className:"rk-back",children:"← Back"}),n.jsxs("div",{className:"rk-header-text",children:[n.jsx("h1",{className:"rk-title",children:"Association Rankings"}),n.jsx("p",{className:"rk-sub",children:"Total shots fired — all time"})]}),n.jsx("button",{className:"rk-share-btn",onClick:c,children:"Share"})]}),!a&&r&&n.jsxs("div",{className:"totw-card",children:[n.jsx("div",{className:"totw-eyebrow",children:"🏆 TEAM OF THE WEEK"}),n.jsxs("div",{className:"totw-name",children:[r.team.age_division," ",r.team.tier]}),n.jsxs("div",{className:"totw-club",children:[(d=r.team.club)==null?void 0:d.name,(h=r.team.club)!=null&&h.city?` · ${r.team.club.city}`:""]}),n.jsxs("div",{className:"totw-shots tnum",children:[r.shots.toLocaleString()," shots this week"]}),n.jsxs("div",{className:"totw-players",children:[r.players," active player",r.players!==1?"s":""]})]}),a&&n.jsx("div",{className:"rk-loading",children:"Loading rankings…"}),!a&&e.length===0&&n.jsxs("div",{className:"rk-empty",children:[n.jsx("p",{children:"No shots logged yet. Be the first association on the board!"}),n.jsx(_n,{to:"/clubs",className:"rk-cta-btn",children:"Find your association →"})]}),!a&&e.length>0&&n.jsx("div",{className:"rk-list",children:e.map((u,p)=>{const x=p+1,v=ww[p]||null,b=p<3;return n.jsxs(_n,{to:`/clubs/${u.slug}`,className:`rk-row${b?" rk-row--top":""}`,children:[n.jsx("div",{className:`rk-rank${b?" rk-rank--top":""}`,children:v||n.jsxs("span",{className:"rk-rank-num",children:["#",x]})}),n.jsxs("div",{className:"rk-info",children:[n.jsx("div",{className:"rk-name",children:u.name}),n.jsxs("div",{className:"rk-location",children:[[u.city,u.province].filter(Boolean).join(", "),n.jsxs("span",{className:"rk-players",children:[" · ",u.player_count," player",u.player_count!==1?"s":""]})]})]}),n.jsxs("div",{className:"rk-shots",children:[n.jsx("span",{className:"rk-shots-num",children:Yu(u.total_shots)}),n.jsx("span",{className:"rk-shots-label",children:"shots"})]})]},u.club_id)})}),n.jsxs("div",{className:"rk-footer",children:[n.jsx("p",{className:"rk-footer-text",children:"Is your association missing?"}),n.jsx(_n,{to:"/clubs",className:"rk-footer-link",children:"Find your club →"})]}),n.jsx("style",{children:jw})]})}const jw=`
.rk-page {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  padding-bottom: 48px;
}
.rk-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--border, #e5e7eb);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 10;
}
.rk-back {
  color: var(--accent, #2563eb);
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
}
.rk-header-text {
  flex: 1;
}
.rk-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}
.rk-sub {
  font-size: 12px;
  color: var(--text-muted, #6b7280);
  margin: 2px 0 0;
}
.rk-share-btn {
  background: var(--accent, #2563eb);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.totw-card {
  margin: 8px 16px 4px;
  background: linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(37,99,235,0.08) 100%);
  border: 1px solid rgba(251,191,36,0.3);
  border-radius: 14px;
  padding: 16px 18px;
  text-align: center;
}
.totw-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #92400e;
  margin-bottom: 8px;
}
.totw-name {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 2px;
}
.totw-club {
  font-size: 13px;
  color: var(--text-muted, #6b7280);
  margin-bottom: 10px;
}
.totw-shots {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent, #2563eb);
}
.totw-players {
  font-size: 11px;
  color: var(--text-muted, #6b7280);
  margin-top: 4px;
}

.rk-loading {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted, #6b7280);
  font-size: 15px;
}
.rk-empty {
  text-align: center;
  padding: 60px 24px;
}
.rk-empty p {
  color: var(--text-muted, #6b7280);
  margin-bottom: 20px;
}
.rk-cta-btn {
  display: inline-block;
  background: var(--accent, #2563eb);
  color: #fff;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}
.rk-list {
  padding: 8px 0;
}
.rk-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border, #e5e7eb);
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}
.rk-row:active,
.rk-row:hover {
  background: var(--surface, #f9fafb);
}
.rk-row--top {
  background: linear-gradient(135deg, rgba(251,191,36,0.06) 0%, transparent 100%);
}
.rk-rank {
  width: 36px;
  text-align: center;
  font-size: 22px;
  flex-shrink: 0;
}
.rk-rank--top {
  font-size: 26px;
}
.rk-rank-num {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted, #6b7280);
}
.rk-info {
  flex: 1;
  min-width: 0;
}
.rk-name {
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rk-location {
  font-size: 12px;
  color: var(--text-muted, #6b7280);
  margin-top: 2px;
}
.rk-players {
  color: var(--text-muted, #6b7280);
}
.rk-shots {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}
.rk-shots-num {
  font-size: 18px;
  font-weight: 800;
  color: var(--accent, #2563eb);
  line-height: 1;
}
.rk-shots-label {
  font-size: 11px;
  color: var(--text-muted, #6b7280);
  margin-top: 2px;
}
.rk-footer {
  text-align: center;
  padding: 32px 20px 0;
}
.rk-footer-text {
  color: var(--text-muted, #6b7280);
  font-size: 14px;
  margin-bottom: 8px;
}
.rk-footer-link {
  color: var(--accent, #2563eb);
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
}
`,Nw=typeof window<"u"?window.location.origin:"";function Sw(){const[e,t]=y.useState("signup"),[r,s]=y.useState(1),[a,i]=y.useState(null),[o,l]=y.useState(null),[c,d]=y.useState(""),[h,u]=y.useState(""),[p,x]=y.useState(null),[v,b]=y.useState(""),[w,g]=y.useState(""),[f,m]=y.useState(""),[k,N]=y.useState(null),[S,_]=y.useState(null),[D,q]=y.useState(""),[T,Q]=y.useState(""),[de,he]=y.useState(""),[Be,Ge]=y.useState(""),[je,V]=y.useState(""),[I,E]=y.useState(!1),[$,C]=y.useState(null),[L,O]=y.useState(""),[W,M]=y.useState([]),[G,ne]=y.useState(!1),[se,be]=y.useState(!1),Ke=y.useRef(null),[R,pe]=y.useState(""),[Pe,Re]=y.useState(5e3),[We,Pt]=y.useState(5),[Ze,Rt]=y.useState(!1),[Ve,ee]=y.useState(""),nr=re(),[zr]=Sf(),{player:Xr,loading:Zr,refresh:Vn}=Ft(),en=zr.get("oauth")==="1";y.useEffect(()=>{en&&!Zr&&(Xr?nr("/home",{replace:!0}):t("create"))},[en,Zr,Xr]),y.useEffect(()=>{ce({title:e==="signin"?"Sign in":"Create your card",description:"Sign up for Hockey Shot Challenge. Free. 30 seconds. No email needed.",noindex:!0})},[e]),y.useEffect(()=>{if(Ke.current&&clearTimeout(Ke.current),!L.trim()||L.trim().length<2){M([]),ne(!1);return}return ne(!0),Ke.current=setTimeout(async()=>{try{const j=await Qr(L,6);M(j||[])}catch{M([])}finally{ne(!1)}},200),()=>{Ke.current&&clearTimeout(Ke.current)}},[L]),y.useEffect(()=>{zr.get("mode")==="signin"&&t("signin")},[zr]),y.useEffect(()=>{const j=zr.get("club");j&&(async()=>{const Oe=await ta(j);Oe&&(x(Oe),l("club"),u(Oe.name))})()},[zr]);const Yn=j=>{l(j),ee("")};function A(j){const Oe=parseInt((j||"").replace("U",""),10);return Oe?Oe<=10?"6-10":Oe<=14?"11-14":Oe<=18?"15-18":"18+":null}const J=()=>{if(a||i("self"),o==="club"&&p){if(!v){ee("Pick your age division.");return}if(!w){ee("Pick your tier.");return}ee(""),s(2);return}if((o==="join"||o==="solo")&&$){if(!v){ee("Pick your age division.");return}if(!w){ee("Pick your tier.");return}ee(""),s(2);return}if(o==="join"&&!$&&!c.trim()){ee("Search for your club or enter a team name.");return}ee(""),s(2)},xe=async()=>{if(!R.trim()){ee("Add your first name so your coach knows who you are.");return}if(!f.trim()||!k){ee("Fill in your name and position.");return}const j=o==="club"&&p?p:$;if(j&&(!v||!w)){ee("Pick your age division and tier.");return}ee("");const Oe={path:o||"solo",signingUpFor:a||"self",clubId:(j==null?void 0:j.id)||null,clubName:(j==null?void 0:j.name)||null,ageDivision:v||null,tier:w||null,firstName:R.trim(),displayName:f.trim(),position:k,ageBracket:A(v),lifetimeShotGoal:Math.max(100,Math.min(5e4,Pe||5e3)),stickhandlingHourGoal:Math.max(1,Math.min(100,We||5))};localStorage.setItem("pendingProfile",JSON.stringify(Oe)),await Mu()},Ne=async(j,Oe)=>{try{await navigator.clipboard.writeText(j),V(Oe),setTimeout(()=>V(""),2e3)}catch{}},sr=async()=>{const j=`Join my team on Hockey Shot Challenge! Team name: ${de}
${Nw}`;try{navigator.share?(await navigator.share({title:"Join my team on Hockey Shot Challenge",text:j}),E(!0),setTimeout(()=>E(!1),2e3)):(await navigator.clipboard.writeText(j),V("share"),setTimeout(()=>V(""),2e3))}catch{}};if(en&&!Zr&&!Xr){const j=(()=>{try{return JSON.parse(localStorage.getItem("pendingProfile")||"{}")}catch{return{}}})(),Oe=async()=>{if(!j.firstName||!j.displayName||!j.position){ee("Something went wrong. Please start over.");return}Rt(!0),ee("");try{let Ce=null;j.clubId&&j.ageDivision&&j.tier&&(Ce=(await Vf({clubId:j.clubId,ageDivision:j.ageDivision,tier:j.tier})).teamId),await Ml({firstName:j.firstName,displayName:j.displayName,position:j.position,ageBracket:j.ageBracket,teamId:Ce,clubId:j.clubId,clubName:j.clubName,lifetimeShotGoal:j.lifetimeShotGoal,stickhandlingHourGoal:j.stickhandlingHourGoal}),localStorage.removeItem("pendingProfile"),await Vn(),nr("/home",{replace:!0})}catch(Ce){ee(Ce.message||"Something went wrong."),Rt(!1)}};if(j.firstName&&j.displayName&&j.position&&!Ze&&!Ve)return Oe(),n.jsxs("div",{className:"auth-wrap",children:[n.jsx("div",{className:"auth-card",style:{textAlign:"center",padding:40},children:n.jsx("div",{style:{fontFamily:"var(--font-display)",color:"var(--text-mute)",letterSpacing:2,fontSize:12},children:"SETTING UP YOUR CARD…"})}),n.jsx("style",{children:$a})]});const ca=async()=>{if(!R.trim()){ee("Add your first name.");return}if(!f.trim()||!k){ee("Fill in your name and position.");return}Rt(!0),ee("");try{await Ml({firstName:R.trim(),displayName:f.trim(),position:k,ageBracket:A(v)||null,clubId:($==null?void 0:$.id)||null,clubName:($==null?void 0:$.name)||null}),await Vn(),nr("/home",{replace:!0})}catch(Ce){ee(Ce.message||"Something went wrong.")}finally{Rt(!1)}};return n.jsxs("div",{className:"auth-wrap fade-in",children:[n.jsxs("div",{className:"auth-card",children:[n.jsxs("div",{className:"brand",children:[n.jsx(zo,{}),n.jsxs("div",{className:"brand-name",children:["Hockey Shot",n.jsx("br",{}),"Challenge"]})]}),n.jsx("h2",{className:"auth-title",children:"Almost there."}),n.jsx("p",{className:"auth-sub",children:"One quick setup and you're in."}),n.jsxs("label",{className:"input-label",children:[n.jsx("span",{children:"First name (shown to your coach)"}),n.jsx("input",{type:"text",value:R,onChange:Ce=>pe(Ce.target.value),placeholder:"Your real first name",className:"input-field",autoFocus:!0})]}),n.jsxs("label",{className:"input-label",style:{marginTop:12},children:[n.jsx("span",{children:"Player name (on leaderboards)"}),n.jsx("input",{type:"text",value:f,onChange:Ce=>m(Ce.target.value),placeholder:"Same as your name, or a nickname",className:"input-field"})]}),n.jsx("div",{className:"label-sm",style:{marginTop:14},children:"Position"}),n.jsx("div",{className:"chip-row chip-row--3",children:["F","D","G"].map(Ce=>n.jsxs("button",{className:`chip chip--big ${k===Ce?"chip--active":""}`,onClick:()=>N(Ce),children:[n.jsx("div",{className:"chip-letter",children:Ce}),n.jsx("div",{className:"chip-sub",children:Ce==="F"?"Forward":Ce==="D"?"Defense":"Goalie"})]},Ce))}),Ve&&n.jsx("div",{className:"error",children:Ve}),n.jsx("button",{className:"btn-primary",onClick:ca,disabled:!R||!f||!k||Ze,children:Ze?"Setting up…":"Make my card →"})]}),n.jsx("style",{children:$a})]})}return e==="signin"?n.jsxs("div",{className:"auth-wrap fade-in",children:[n.jsxs("div",{className:"auth-card",children:[n.jsxs("div",{className:"brand",children:[n.jsx(zo,{}),n.jsxs("div",{className:"brand-name",children:["Hockey Shot",n.jsx("br",{}),"Challenge"]})]}),n.jsx("h2",{className:"auth-title",children:"Welcome back."}),n.jsx("p",{className:"auth-sub",children:"Sign in with your Google account to get back to your dashboard."}),n.jsxs("button",{className:"google-btn",onClick:()=>Mu(),style:{marginBottom:24},children:[n.jsx(Ju,{}),"Continue with Google"]}),n.jsx("button",{className:"btn-primary",onClick:()=>{t("signup"),ee("")},style:{marginBottom:8},children:"New here? Create a card →"}),n.jsx("button",{className:"btn-text",onClick:()=>nr("/"),children:"← Back to home"})]}),n.jsx("style",{children:$a})]}):n.jsxs("div",{className:"auth-wrap fade-in",children:[n.jsxs("div",{className:"auth-card",children:[r===1&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"brand",children:[n.jsx(zo,{}),n.jsxs("div",{className:"brand-name",children:["Hockey Shot",n.jsx("br",{}),"Challenge"]})]}),p?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"club-banner",children:[n.jsx("div",{className:"club-banner-label",children:"JOINING"}),n.jsx("div",{className:"club-banner-name",children:p.name}),p.city&&n.jsx("div",{className:"club-banner-city",children:p.city})]}),n.jsx("div",{className:"picker-label",children:"PICK YOUR TEAM"}),n.jsxs("label",{className:"input-label",children:[n.jsx("span",{children:"Age division"}),n.jsxs("select",{value:v,onChange:j=>b(j.target.value),className:"input-field",autoFocus:!0,children:[n.jsx("option",{value:"",children:"Pick one"}),Cs.map(j=>n.jsx("option",{value:j,children:j},j))]})]}),n.jsxs("label",{className:"input-label",style:{marginTop:12},children:[n.jsx("span",{children:"Tier"}),n.jsxs("select",{value:w,onChange:j=>g(j.target.value),className:"input-field",children:[n.jsx("option",{value:"",children:"Pick one"}),Ts.map(j=>n.jsx("option",{value:j,children:j},j))]})]}),n.jsx("div",{className:"path-hint",style:{marginTop:10},children:"Not sure? Ask your coach or pick the closest match."}),Ve&&n.jsx("div",{className:"error",style:{marginTop:12},children:Ve}),n.jsx("button",{className:"btn-primary",onClick:J,disabled:!v||!w,style:{marginTop:16},children:"Continue →"}),n.jsx("button",{className:"btn-text",onClick:()=>{x(null),l(null),d(""),u(""),b(""),g("")},children:"Sign up without the club"})]}):n.jsxs(n.Fragment,{children:[n.jsx("h2",{className:"auth-title",children:"Let's get you set up."}),n.jsx("p",{className:"auth-sub",style:{marginBottom:14},children:"Takes 2 minutes. You'll sign in with Google at the end."}),n.jsxs("div",{className:"for-row",children:[n.jsx("div",{className:"for-label",children:"WHO ARE YOU SIGNING UP?"}),n.jsxs("div",{className:"for-options",children:[n.jsx("button",{className:`for-btn ${a==="self"?"for-btn--active":""}`,onClick:()=>{i("self"),ee("")},children:"Myself"}),n.jsx("button",{className:`for-btn ${a==="player"?"for-btn--active":""}`,onClick:()=>{i("player"),ee("")},children:"My kid"})]}),a==="player"&&n.jsx("div",{className:"for-parent-note",children:"Your Google account holds the profile. You can add more players later — one account for all your kids."})]}),n.jsxs("div",{className:`path-card ${o==="join"?"path-card--active":""}`,onClick:()=>Yn("join"),children:[n.jsxs("div",{className:"path-head",children:[n.jsx("div",{className:"path-icon",children:"🏒"}),n.jsxs("div",{children:[n.jsx("div",{className:"path-title",children:"Join a team"}),n.jsx("div",{className:"path-sub",children:"Compete with your teammates"})]}),n.jsx("div",{className:`path-check ${o==="join"?"path-check--active":""}`,children:o==="join"?"✓":""})]}),o==="join"&&n.jsx("div",{className:"path-body",children:$?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"join-club-selected",children:[n.jsx("div",{className:"join-club-selected-name",children:$.name}),$.city&&n.jsx("div",{className:"join-club-selected-city",children:$.city}),n.jsx("button",{className:"join-club-change",onClick:()=>{C(null),b(""),g("")},children:"Change"})]}),n.jsxs("label",{className:"input-label",style:{marginTop:12},children:[n.jsx("span",{children:"Age division"}),n.jsxs("select",{value:v,onChange:j=>b(j.target.value),className:"input-field",children:[n.jsx("option",{value:"",children:"Pick one"}),Cs.map(j=>n.jsx("option",{value:j,children:j},j))]})]}),n.jsxs("label",{className:"input-label",style:{marginTop:10},children:[n.jsx("span",{children:"Tier"}),n.jsxs("select",{value:w,onChange:j=>g(j.target.value),className:"input-field",children:[n.jsx("option",{value:"",children:"Pick one"}),Ts.map(j=>n.jsx("option",{value:j,children:j},j))]})]}),n.jsx("div",{className:"path-hint",style:{marginTop:6},children:"Not sure? Ask your coach."})]}):n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"path-hint",style:{marginBottom:10},children:"Search for your club to find your team."}),n.jsxs("div",{style:{position:"relative"},children:[n.jsx("input",{type:"text",value:L,onChange:j=>O(j.target.value),placeholder:"Burlington Eagles, Mississauga…",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false",className:"input-field",autoFocus:!0}),L.trim().length>=2&&n.jsxs("div",{className:"join-club-dropdown",children:[G&&n.jsx("div",{className:"join-club-status",children:"Searching…"}),!G&&W.length===0&&n.jsx("div",{className:"join-club-status",children:"No clubs found."}),W.map(j=>n.jsxs("button",{className:"join-club-result",onClick:()=>{C(j),O(""),M([])},children:[n.jsx("span",{className:"join-club-result-name",children:j.name}),j.city&&n.jsx("span",{className:"join-club-result-meta",children:j.city})]},j.id))]})]}),se?n.jsxs(n.Fragment,{children:[n.jsxs("label",{className:"input-label",style:{marginTop:12},children:[n.jsx("span",{children:"Team name"}),n.jsx("input",{type:"text",value:c,onChange:j=>d(j.target.value.toUpperCase()),placeholder:"e.g. NORTHSTARS",autoCapitalize:"characters",autoCorrect:"off",spellCheck:"false",className:"input-field input-field--code"})]}),n.jsx("div",{className:"path-hint",children:"Same name as your teammates = same leaderboard."})]}):n.jsx("button",{className:"btn-text",style:{marginTop:6,fontSize:11},onClick:()=>be(!0),children:"My club isn't listed"})]})})]}),n.jsx("div",{className:"or-divider",children:"or"}),n.jsxs("div",{className:`path-card ${o==="solo"?"path-card--active":""}`,onClick:()=>{o!=="solo"&&Yn("solo")},children:[n.jsxs("div",{className:"path-head",children:[n.jsx("div",{className:"path-icon",children:"🎯"}),n.jsxs("div",{children:[n.jsx("div",{className:"path-title",children:"No team invite yet"}),n.jsx("div",{className:"path-sub",children:"Start on your own — you can join a team later"})]}),n.jsx("div",{className:`path-check ${o==="solo"?"path-check--active":""}`,children:o==="solo"?"✓":""})]}),o==="solo"&&n.jsxs("div",{className:"path-body",onClick:j=>j.stopPropagation(),children:[n.jsx("div",{className:"path-hint",style:{marginBottom:10},children:"Find your club so your stats count on the association leaderboard."}),$?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"join-club-selected",children:[n.jsx("div",{className:"join-club-selected-name",children:$.name}),$.city&&n.jsx("div",{className:"join-club-selected-city",children:$.city}),n.jsx("button",{className:"join-club-change",onClick:()=>{C(null),b(""),g("")},children:"Change"})]}),n.jsxs("label",{className:"input-label",style:{marginTop:12},children:[n.jsx("span",{children:"Age division"}),n.jsxs("select",{value:v,onChange:j=>b(j.target.value),className:"input-field",children:[n.jsx("option",{value:"",children:"Pick one"}),Cs.map(j=>n.jsx("option",{value:j,children:j},j))]})]}),n.jsxs("label",{className:"input-label",style:{marginTop:10},children:[n.jsx("span",{children:"Tier"}),n.jsxs("select",{value:w,onChange:j=>g(j.target.value),className:"input-field",children:[n.jsx("option",{value:"",children:"Pick one"}),Ts.map(j=>n.jsx("option",{value:j,children:j},j))]})]}),n.jsx("div",{className:"path-hint",style:{marginTop:6},children:"Not sure? Ask your coach."})]}):n.jsxs(n.Fragment,{children:[n.jsxs("div",{style:{position:"relative"},children:[n.jsx("input",{type:"text",value:L,onChange:j=>O(j.target.value),placeholder:"Burlington Eagles, Mississauga…",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false",className:"input-field",autoFocus:!0}),L.trim().length>=2&&n.jsxs("div",{className:"join-club-dropdown",children:[G&&n.jsx("div",{className:"join-club-status",children:"Searching…"}),!G&&W.length===0&&n.jsx("div",{className:"join-club-status",children:"No clubs found."}),W.map(j=>n.jsxs("button",{className:"join-club-result",onClick:()=>{C(j),O(""),M([])},children:[n.jsx("span",{className:"join-club-result-name",children:j.name}),j.city&&n.jsx("span",{className:"join-club-result-meta",children:j.city})]},j.id))]})]}),se?n.jsx("div",{className:"path-hint",style:{marginTop:8},children:"No problem — your stats will be personal for now. You can link your club later."}):n.jsx("button",{className:"btn-text",style:{marginTop:6,fontSize:11},onClick:()=>be(!0),children:"My club isn't listed"})]})]})]}),Ve&&n.jsx("div",{className:"error",style:{marginTop:12},children:Ve}),n.jsx("button",{className:"btn-primary",onClick:J,disabled:!o,style:{marginTop:16},children:"Continue →"}),n.jsx("button",{className:"btn-text",onClick:()=>{t("signin"),ee("")},children:"Already playing? Sign in"}),n.jsx("button",{className:"btn-text",onClick:()=>nr("/"),children:"← Back to home"})]})]}),r===2&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"step-chip",children:"Step 2 of 2"}),n.jsx("h2",{className:"auth-title",children:a==="player"?"About your player.":"Who are you?"}),n.jsx("p",{className:"auth-sub",children:a==="player"?"Their coach will see their real name. Their leaderboard name is up to them.":"Your coach will see your real name. Your leaderboard name is up to you."}),n.jsxs("label",{className:"input-label",children:[n.jsx("span",{children:a==="player"?"Player's first name (shown to their coach)":"First name (shown to your coach)"}),n.jsx("input",{type:"text",value:R,onChange:j=>pe(j.target.value),placeholder:a==="player"?"Their real first name":"Your real first name",className:"input-field",autoFocus:!0})]}),n.jsxs("label",{className:"input-label",style:{marginTop:12},children:[n.jsx("span",{children:"Player name (on leaderboards)"}),n.jsx("input",{type:"text",value:f,onChange:j=>m(j.target.value),placeholder:a==="player"?"What do they go by?":"Same as your name, or a nickname",className:"input-field"})]}),n.jsx("div",{className:"label-sm",children:a==="player"?"Their position":"Position"}),n.jsx("div",{className:"chip-row chip-row--3",children:["F","D","G"].map(j=>n.jsxs("button",{className:`chip chip--big ${k===j?"chip--active":""}`,onClick:()=>N(j),children:[n.jsx("div",{className:"chip-letter",children:j}),n.jsx("div",{className:"chip-sub",children:j==="F"?"Forward":j==="D"?"Defense":"Goalie"})]},j))}),n.jsxs("div",{style:{marginTop:16,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.1)"},children:[n.jsx("div",{className:"label-sm",style:{marginBottom:8},children:"What's your shot goal? 🎯"}),n.jsx("div",{className:"label-sm",style:{fontSize:12,color:"var(--text-mute)",marginBottom:12,fontWeight:400},children:"This is your personal target. You can change it anytime."}),n.jsx("input",{type:"number",value:Pe,onChange:j=>Re(Math.max(100,parseInt(j.target.value)||5e3)),placeholder:"5000",className:"input-field",min:"100",max:"50000"}),n.jsx("div",{className:"label-sm",style:{fontSize:11,color:"var(--text-mute)",marginTop:8},children:"Stickhandling goal (hours)"}),n.jsx("input",{type:"number",value:We,onChange:j=>Pt(Math.max(1,parseInt(j.target.value)||5)),placeholder:"5",className:"input-field",min:"1",max:"100",style:{marginTop:6}})]}),Ve&&n.jsx("div",{className:"error",children:Ve}),n.jsxs("button",{className:"google-btn",onClick:xe,disabled:!R||!f||!k||Ze,style:{marginTop:8},children:[n.jsx(Ju,{}),Ze?"One sec…":a==="player"?"Save with Google →":"Continue with Google →"]}),n.jsx("div",{className:"path-hint",style:{textAlign:"center",marginBottom:4},children:a==="player"?"Your Google account. Their player profile.":"No password. Google keeps your account safe."}),n.jsx("button",{className:"btn-text",onClick:()=>s(1),children:"← Back"})]}),r===3&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"celebration",children:[n.jsx("div",{className:"celebration-ring",children:n.jsx("div",{className:"celebration-inner",children:"🎉"})}),n.jsxs("div",{className:"celebration-title",children:["You're in, ",f,"!"]}),Be&&n.jsxs("div",{className:"club-joined",children:["On ",Be,de?` · ${de}`:""]})]}),n.jsxs("div",{className:"screenshot-hero",children:[n.jsx("div",{className:"screenshot-icon",children:"📸"}),n.jsx("div",{className:"screenshot-title",children:"Screenshot this screen!"}),n.jsx("div",{className:"screenshot-sub",children:"This is how you sign back in. If you lose it, you lose your shots."})]}),n.jsxs("div",{className:"username-big",children:[n.jsx("div",{className:"username-label",children:"YOUR USERNAME"}),n.jsxs("div",{className:"username-value-big",children:["@",T]}),n.jsx("button",{className:`copy-btn ${je==="username"?"copy-btn--done":""}`,onClick:()=>Ne(T,"username"),children:je==="username"?"✓ Copied":"Copy username"})]}),n.jsx("div",{className:"save-tips",children:"Text it to a parent so they have it too."}),de&&!p&&n.jsxs("div",{className:"invite-card",children:[n.jsxs("div",{className:"invite-top",children:[n.jsx("div",{className:"invite-label",children:"YOUR TEAM"}),n.jsx("div",{className:"invite-team-name",children:de})]}),n.jsx("div",{className:"invite-hint",children:"Tell your teammates the team name so they can join you."}),n.jsx("button",{className:"invite-btn",onClick:sr,children:I||je==="share"?"✓ Ready to send":"↗ Invite teammates"})]}),p&&de&&n.jsxs("div",{className:"invite-card",children:[n.jsxs("div",{className:"invite-top",children:[n.jsx("div",{className:"invite-label",children:"YOUR TEAM"}),n.jsx("div",{className:"invite-team-name",children:de})]}),n.jsx("div",{className:"invite-hint",children:"Tell your teammates the age & tier so they can join you."})]}),n.jsx("button",{className:"btn-primary",onClick:()=>nr("/home"),children:"Got it — let's shoot 🏒"})]})]}),n.jsx("style",{children:$a})]})}function Ju(){return n.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg",style:{display:"block",flexShrink:0},children:[n.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z",fill:"#4285F4"}),n.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z",fill:"#34A853"}),n.jsx("path",{d:"M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z",fill:"#FBBC05"}),n.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z",fill:"#EA4335"})]})}function zo(){return n.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[n.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),n.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const $a=`
.auth-wrap {
  min-height: 100dvh;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  width: 100%; max-width: none;
}
.auth-card {
  width: 100%; max-width: 380px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius-lg);
  padding: 20px 18px;
}
.brand {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 20px;
}
.brand-name {
  font-family: var(--font-display);
  font-weight: 800; font-size: 17px;
  letter-spacing: 1px; text-transform: uppercase;
  line-height: 1.1;
}
.step-chip {
  display: inline-block;
  background: var(--bg);
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px; color: var(--text-mute);
  letter-spacing: 1px; text-transform: uppercase;
  font-weight: 500; margin-bottom: 12px;
}
.auth-title {
  font-family: var(--font-display);
  font-size: 22px; line-height: 1.1;
  margin-bottom: 4px; font-weight: 700;
  letter-spacing: 0.3px;
}
.auth-sub {
  font-size: 13px; color: var(--text-mute);
  margin: 0 0 18px;
}

.club-banner {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 18px;
  text-align: center;
}
.club-banner-label {
  font-size: 12px; color: var(--text-mute);
  letter-spacing: 2px; text-transform: uppercase;
  font-weight: 500;
}
.club-banner-name {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--ice);
  margin-top: 4px;
  letter-spacing: 0.5px;
  line-height: 1;
}
.club-banner-city {
  font-size: 12px; color: var(--text-mute);
  margin-top: 4px;
}

.picker-label {
  font-size: 13px; color: #8899b4;
  letter-spacing: 1px; text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 10px;
}

.input-label { display: block; margin-bottom: 4px; }
.input-label > span {
  display: block;
  font-size: 13px; color: #8899b4;
  letter-spacing: 0.5px; text-transform: uppercase;
  margin-bottom: 8px; font-weight: 600;
}
.input-field {
  width: 100%;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  color: var(--text);
  font-size: 16px;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
}
.input-field:focus { border-color: var(--accent); }
.input-field::placeholder {
  color: var(--text-mute);
  opacity: 0.5;
}
.input-field--code {
  letter-spacing: 2px;
  font-family: var(--font-display);
  font-weight: 700; color: var(--ice);
}
.input-field--code::placeholder { letter-spacing: 2px; }

.path-card {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px;
  cursor: pointer;
  transition: all 0.15s;
}
.path-card--active {
  background: var(--surface-raised);
  border-color: var(--accent);
}
.path-head {
  display: flex; align-items: center; gap: 12px;
}
.path-icon {
  width: 36px; height: 36px;
  font-size: 20px;
  background: var(--accent-bg);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.path-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800;
  letter-spacing: 0.4px; line-height: 1.1;
}
.path-sub {
  font-size: 12px; color: var(--text-mute);
  margin-top: 2px;
}
.path-check {
  margin-left: auto;
  width: 24px; height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text);
  font-size: 13px; font-weight: 700;
  flex-shrink: 0;
}
.path-check--active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
.path-body {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 0.5px solid var(--border-dim);
}
.path-hint {
  font-size: 13px; color: #8899b4;
  line-height: 1.4; margin-top: 6px;
}
.or-divider {
  text-align: center;
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 12px 0;
  font-weight: 500;
}

.chip-row { display: grid; gap: 6px; margin-bottom: 16px; }
.chip-row--3 { grid-template-columns: repeat(3, 1fr); }
.chip-row--4 { grid-template-columns: repeat(2, 1fr); }
.chip {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px 8px;
  color: var(--ice);
  font-size: 13px; text-align: center;
  transition: all 0.15s;
}
.chip--big { padding: 14px 6px; }
.chip--active {
  background: var(--accent);
  border-color: var(--accent-soft);
  color: white;
}
.chip-letter {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  letter-spacing: 1px; line-height: 1;
}
.chip-sub { font-size: 10px; margin-top: 3px; opacity: 0.75; }

.btn-primary {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 14px;
  font-size: 14px; font-weight: 600;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
  transition: transform 0.1s;
}
.btn-primary:active:not(:disabled) { transform: scale(0.98); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-text {
  width: 100%;
  color: var(--text-mute);
  font-size: 12px;
  padding: 10px;
  text-align: center;
}
.btn-text:hover { color: var(--ice); }
.error {
  background: rgba(255, 84, 84, 0.1);
  border: 0.5px solid rgba(255, 84, 84, 0.3);
  color: var(--danger);
  border-radius: var(--radius);
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 12px;
}

.celebration { text-align: center; margin: 4px 0 18px; }
.celebration-ring {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--accent-bg);
  border: 2px solid var(--accent);
  margin: 0 auto 10px;
  display: flex; align-items: center; justify-content: center;
}
.celebration-inner { font-size: 28px; }
.celebration-title {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 700;
  letter-spacing: 0.4px;
}
.club-joined {
  font-size: 13px;
  color: var(--ice);
  margin-top: 6px;
  letter-spacing: 0.3px;
}
.screenshot-hero {
  background: linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(168, 212, 245, 0.08));
  border: 1px solid rgba(41, 121, 255, 0.4);
  border-radius: var(--radius);
  padding: 16px;
  text-align: center;
  margin-bottom: 14px;
}
.screenshot-icon { font-size: 36px; line-height: 1; margin-bottom: 6px; }
.screenshot-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: white;
  margin-bottom: 4px;
}
.screenshot-sub {
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.4;
}
.username-big {
  background: var(--bg);
  border: 0.5px dashed var(--border);
  border-radius: var(--radius);
  padding: 16px 14px;
  text-align: center;
  margin-bottom: 10px;
}
.username-label {
  font-size: 12px; color: var(--text-mute);
  letter-spacing: 2px; font-weight: 500;
}
.username-value-big {
  font-family: var(--font-display);
  font-size: 28px; font-weight: 800;
  color: var(--ice);
  letter-spacing: 1px;
  margin: 6px 0 12px;
}
.copy-btn {
  width: 100%;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px;
  color: var(--ice);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.3px;
  font-family: inherit;
  transition: all 0.15s;
}
.copy-btn--done {
  background: rgba(61, 214, 140, 0.15);
  border-color: rgba(61, 214, 140, 0.4);
  color: var(--success);
}
.save-tips {
  text-align: center;
  font-size: 11px;
  color: var(--text-mute);
  margin-bottom: 16px;
  letter-spacing: 0.3px;
  line-height: 1.4;
}
.invite-card {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 14px;
}
.invite-top { text-align: center; margin-bottom: 8px; }
.invite-label {
  font-size: 12px; color: var(--text-mute);
  letter-spacing: 2px; font-weight: 500;
}
.invite-team-name {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--ice);
  letter-spacing: 1px;
  margin-top: 2px;
}
.invite-hint {
  font-size: 12px;
  color: var(--text-soft);
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.4;
}
.invite-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 12px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.for-row {
  margin-bottom: 18px;
}
.for-label {
  font-size: 13px; color: #8899b4;
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 600; margin-bottom: 8px;
}
.for-options {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
}
.for-btn {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 8px;
  color: var(--text-mute);
  font-size: 14px; font-weight: 600;
  text-align: center;
  transition: all 0.15s;
  font-family: inherit;
}
.for-btn--active {
  background: var(--surface-raised);
  border-color: var(--accent);
  color: white;
}
.for-parent-note {
  margin-top: 10px;
  font-size: 12px;
  color: var(--ice);
  line-height: 1.5;
  background: rgba(168,212,245,0.07);
  border: 0.5px solid rgba(168,212,245,0.2);
  border-radius: var(--radius);
  padding: 10px 12px;
}

.google-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: white;
  color: #3c4043;
  border: 1px solid #dadce0;
  border-radius: var(--radius);
  padding: 12px 14px;
  font-size: 14px; font-weight: 500;
  margin-bottom: 8px;
  transition: background 0.15s;
  font-family: inherit;
}
.google-btn:hover { background: #f8f9fa; }

.join-club-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  z-index: 30;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  overflow: hidden;
}
.join-club-result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px 14px;
  border-bottom: 0.5px solid var(--border-dim);
  text-align: left;
  transition: background 0.1s;
}
.join-club-result:last-child { border-bottom: none; }
.join-club-result:hover { background: var(--bg); }
.join-club-result-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white;
}
.join-club-result-meta { font-size: 11px; color: var(--text-mute); margin-top: 1px; }
.join-club-status {
  padding: 12px 14px;
  font-size: 12px;
  color: var(--text-mute);
  text-align: center;
}
.join-club-selected {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.join-club-selected-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white;
  flex: 1;
}
.join-club-selected-city { font-size: 11px; color: var(--text-mute); }
.join-club-change {
  background: transparent;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  padding: 0;
  flex-shrink: 0;
}

.label-sm {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  margin: 14px 0 6px;
}
`;async function _w({clubId:e,coachId:t,ageDivision:r,tier:s,season:a="2025-26"}){const{data:i,error:o}=await P.rpc("find_or_create_team",{p_club_id:e,p_coach_id:t,p_age_division:r,p_tier:s,p_season:a});if(o)throw o;const l=Array.isArray(i)?i[0]:i;if(!l)throw new Error("No team result");return{teamId:l.team_id,teamExisted:l.team_existed,ownerCoachName:l.owner_coach_name,isOwner:l.is_owner}}async function Cw({teamId:e,pendingCoachId:t,approverCoachId:r}){const{data:s,error:a}=await P.rpc("approve_team_coach",{p_team_id:e,p_pending_coach_id:t,p_approver_coach_id:r});if(a)throw a;return s}async function Tw(e){if(!e)return[];const{data:t}=await P.from("team_coaches").select("role, team:teams(id, name, age_division, tier, season, team_code, club:clubs(id, name, slug))").eq("coach_id",e).in("role",["owner","coach"]);return(t||[]).map(r=>({...r.team,role:r.role}))}async function Qu(e){if(!e)return[];const{data:t}=await P.from("team_coaches").select("team_id").eq("coach_id",e).eq("role","owner"),r=(t||[]).map(a=>a.team_id);if(r.length===0)return[];const{data:s}=await P.from("team_coaches").select("id, team_id, requested_at, coach:coaches(id, display_name, email), team:teams(id, name)").in("team_id",r).eq("role","pending").order("requested_at");return s||[]}async function Ew({teamId:e,coachId:t}){const{data:r,error:s}=await P.rpc("create_team_invite",{p_team_id:e,p_coach_id:t});if(s)throw s;return r}async function Aw(e){if(!e)return null;const{data:t}=await P.from("team_invites").select("id, code, uses_count, max_uses, expires_at, created_at").eq("team_id",e).eq("is_active",!0).order("created_at",{ascending:!1}).limit(1).maybeSingle();return t}async function Xu({teamId:e,coachId:t}){const r=await Aw(e);return r?r.code:await Ew({teamId:e,coachId:t})}function zw(){const e=re(),[t]=Sf(),[r,s]=y.useState("intro"),[a,i]=y.useState(1),[o,l]=y.useState(""),[c,d]=y.useState(""),[h,u]=y.useState(""),[p,x]=y.useState([]),[v,b]=y.useState(!1),[w,g]=y.useState(null),f=y.useRef(null),[m,k]=y.useState(!1),[N,S]=y.useState(!1),[_,D]=y.useState(!1),[q,T]=y.useState(""),[Q,de]=y.useState(""),[he,Be]=y.useState(""),[Ge,je]=y.useState(""),[V,I]=y.useState(!1),[E,$]=y.useState(""),[C,L]=y.useState(""),[O,W]=y.useState(!1),[M,G]=y.useState("");y.useEffect(()=>{ce({title:"For coaches & clubs",description:"Find your association, set up your team, invite your players. Free.",url:`${K}/coach`})},[]),y.useEffect(()=>{if(!N)return;let R=!1;return(async()=>{var pe,Pe,Re;try{const We=await ps();if(R)return;if(We){e("/coach/dashboard",{replace:!0});return}const{data:{session:Pt}}=await P.auth.getSession();if(R||!(Pt!=null&&Pt.user))return;const Ze=Pt.user;if(!(((pe=Ze.app_metadata)==null?void 0:pe.provider)==="google"||(Ze.identities||[]).some(Ve=>Ve.provider==="google")))return;l(((Pe=Ze.user_metadata)==null?void 0:Pe.full_name)||((Re=Ze.user_metadata)==null?void 0:Re.name)||""),d(Ze.email||""),I(!0),s("signup"),i(m?3:2)}catch{}})(),()=>{R=!0}},[N,e,m]),y.useEffect(()=>{const R=t.get("club");if(!R){S(!0);return}let pe=!1;return(async()=>{try{const Pe=await ta(R);if(pe)return;Pe?(g(Pe),k(!0),s("signup")):s("badslug")}catch{pe||s("badslug")}finally{pe||S(!0)}})(),()=>{pe=!0}},[t]),y.useEffect(()=>{if(f.current&&clearTimeout(f.current),!h.trim()||h.trim().length<2){x([]),b(!1);return}return b(!0),f.current=setTimeout(async()=>{try{const R=await Qr(h);x(R||[])}catch(R){console.warn("search error",R),x([])}finally{b(!1)}},250),()=>{f.current&&clearTimeout(f.current)}},[h]);const ne=()=>{if(G(""),!w)return G("Pick your association from the list, or submit yours.");i(3)},se=async()=>{if(G(""),!he)return G("Pick your age division.");if(!Ge)return G("Pick your tier.");if(!w)return G("Pick your association.");W(!0);try{await ew({displayName:o.trim(),email:c.trim(),clubId:w.id,isDirector:!1});let R=await ps();if(R||(await new Promise(pe=>setTimeout(pe,400)),R=await ps()),!R)throw new Error("We created your account but couldn't load your profile. Try signing in.");await _w({clubId:w.id,coachId:R.id,ageDivision:he,tier:Ge}),e("/coach/dashboard")}catch(R){const pe=((R==null?void 0:R.message)||"").toLowerCase();pe.includes("already registered")||pe.includes("user already")?G("That email is already in use. Try signing in instead."):pe.includes("rate limit")||pe.includes("too many")?G("You're making too many attempts. Wait a minute and try again."):G((R==null?void 0:R.message)||"Something went wrong. Try again.")}finally{W(!1)}},be=async()=>{if(G(""),!q.trim())return G("Enter your association name.");W(!0);try{await Zb({name:q.trim(),city:Q.trim()||null,contactEmail:c.trim()||null}),G(""),D(!1),s("submitted")}catch(R){G((R==null?void 0:R.message)||"Could not submit your association. Try again.")}finally{W(!1)}},Ke=async()=>{if(G(""),!E.trim()||!C)return G("Enter your email and password.");W(!0);try{if(await Db({email:E.trim(),password:C}),!await ps()){G("We couldn't find a coach profile for that account.");return}e("/coach/dashboard")}catch{G("Invalid email or password.")}finally{W(!1)}};return r==="badslug"?n.jsxs("div",{className:"coach-wrap c-centered",children:[n.jsxs("div",{className:"c-card",children:[n.jsxs("div",{className:"c-card-brand",children:[n.jsx(as,{}),n.jsx("span",{children:"Hockey Shot Challenge"})]}),n.jsx("h2",{className:"c-card-title",children:"Hmm — we can't find that club."}),n.jsx("p",{className:"c-card-sub",children:"The link you followed points to a club we don't recognize. You can search for your association on the next screen."}),n.jsx("button",{className:"c-btn",onClick:()=>{s("signup"),i(2)},children:"Search for my club →"}),n.jsx("button",{className:"c-text-btn",onClick:()=>e("/coach"),children:"← Back"})]}),n.jsx("style",{children:is})]}):r==="intro"?n.jsxs("div",{className:"coach-wrap c-centered",children:[n.jsxs("div",{className:"c-card",children:[n.jsxs("div",{className:"c-card-brand",children:[n.jsx(as,{}),n.jsx("span",{children:"Hockey Shot Challenge"})]}),n.jsx("h2",{className:"c-card-title",children:"Set up your team."}),n.jsx("p",{className:"c-card-sub",children:"Free for coaches and players. Takes 2 minutes."}),n.jsxs("button",{className:"c-google-btn c-google-btn--hero",onClick:To,children:[n.jsx(Da,{}),"Continue with Google — free"]}),n.jsx("button",{className:"c-text-btn",onClick:()=>s("signin"),children:"Already have an account? Sign in"}),n.jsx("button",{className:"c-text-btn",onClick:()=>e("/coach"),children:"← Back"})]}),n.jsx("style",{children:is})]}):r==="submitted"?n.jsxs("div",{className:"coach-wrap c-centered",children:[n.jsxs("div",{className:"c-card",children:[n.jsxs("div",{className:"c-card-brand",children:[n.jsx(as,{}),n.jsx("span",{children:"Thanks!"})]}),n.jsx("h2",{className:"c-card-title",children:"We got it."}),n.jsx("p",{className:"c-card-sub",children:"We'll get your association added soon. We'll email you when it's ready."}),n.jsx("button",{className:"c-btn",onClick:()=>e("/"),children:"Done"})]}),n.jsx("style",{children:is})]}):r==="signin"?n.jsxs("div",{className:"coach-wrap c-centered",children:[n.jsxs("div",{className:"c-card",children:[n.jsxs("div",{className:"c-card-brand",children:[n.jsx(as,{}),n.jsx("span",{children:"Coach sign-in"})]}),n.jsx("h2",{className:"c-card-title",children:"Welcome back."}),n.jsxs("label",{className:"c-label",children:[n.jsx("span",{children:"Email"}),n.jsx("input",{type:"email",value:E,onChange:R=>$(R.target.value),placeholder:"coach@example.com",autoCapitalize:"none",autoCorrect:"off",className:"c-input"})]}),n.jsxs("label",{className:"c-label",children:[n.jsx("span",{children:"Password"}),n.jsx("input",{type:"password",value:C,onChange:R=>L(R.target.value),placeholder:"••••••••",className:"c-input"})]}),M&&n.jsx("div",{className:"c-error",children:M}),n.jsx("button",{className:"c-btn",onClick:Ke,disabled:O,children:O?"Signing in…":"Sign in"}),n.jsx("div",{className:"c-divider",children:n.jsx("span",{children:"or"})}),n.jsxs("button",{className:"c-google-btn",onClick:To,children:[n.jsx(Da,{}),"Continue with Google"]}),n.jsx("button",{className:"c-text-btn",onClick:()=>{s("intro"),G("")},children:"← Back"})]}),n.jsx("style",{children:is})]}):n.jsxs("div",{className:"coach-wrap c-centered",children:[n.jsxs("div",{className:"c-card",children:[n.jsxs("div",{className:"c-card-brand",children:[n.jsx(as,{}),n.jsxs("span",{children:["Coach setup · Step ",V?a-1:m&&a===3?2:a," of ",V||m?2:3]})]}),a===1&&!V&&n.jsxs(n.Fragment,{children:[w&&n.jsxs("div",{className:"c-clubchip",children:[n.jsxs("div",{className:"c-clubchip-eyebrow",children:[w.governing_body||"ASSOCIATION",w.city?` · ${w.city}`:""]}),n.jsx("div",{className:"c-clubchip-name",children:w.name})]}),n.jsx("h2",{className:"c-card-title",children:"Coach signup"}),n.jsx("p",{className:"c-card-sub",children:w?`Create your coach account for ${w.name}. We'll set up your team next.`:"Sign in with Google to get started. Free."}),M&&n.jsx("div",{className:"c-error",children:M}),n.jsxs("button",{className:"c-google-btn c-google-btn--hero",onClick:To,children:[n.jsx(Da,{}),"Continue with Google — free"]}),n.jsx("button",{className:"c-text-btn",onClick:()=>s("signin"),children:"Already have an account? Sign in"}),n.jsx("button",{className:"c-text-btn",onClick:()=>{s("intro"),G("")},children:"← Back"})]}),a===2&&!m&&!_&&!w&&n.jsxs(n.Fragment,{children:[V&&n.jsxs("div",{className:"c-google-chip",children:[n.jsx(Da,{size:14}),n.jsx("span",{children:o||c})]}),n.jsx("h2",{className:"c-card-title",children:"Find your association."}),n.jsx("p",{className:"c-card-sub",children:"Search by city or team name."}),n.jsx("input",{type:"text",value:h,onChange:R=>u(R.target.value),placeholder:"burlington",autoCapitalize:"none",autoCorrect:"off",spellCheck:"false",className:"c-input",autoFocus:!0}),n.jsxs("div",{className:"c-results",children:[v&&p.length===0&&n.jsx("div",{className:"c-result-empty",children:"Searching…"}),!v&&h.length>=2&&p.length===0&&n.jsx("div",{className:"c-result-empty",children:"No matches. Try a different search."}),p.map(R=>n.jsxs("button",{className:"c-result",onClick:()=>g(R),children:[n.jsx("div",{className:"c-result-name",children:R.name}),n.jsxs("div",{className:"c-result-meta",children:[R.city||"",R.governing_body?` · ${R.governing_body}`:"",R.gender_type==="girls"?" · Girls":""]})]},R.id))]}),M&&n.jsx("div",{className:"c-error",children:M}),n.jsx("button",{className:"c-text-btn",onClick:()=>D(!0),children:"My association isn't listed"}),n.jsx("button",{className:"c-text-btn",onClick:async()=>{G(""),W(!0);try{const R=await ta("independent");if(!R)throw new Error("Could not load independent teams. Try again.");g(R),i(3)}catch(R){G((R==null?void 0:R.message)||"Something went wrong. Try again.")}finally{W(!1)}},disabled:O,children:O?"Loading…":"I don't have an association — just my team"}),n.jsx("button",{className:"c-text-btn",onClick:()=>i(1),children:"← Back"})]}),a===2&&!m&&w&&!_&&n.jsxs(n.Fragment,{children:[n.jsx("h2",{className:"c-card-title",children:"Confirm your association."}),n.jsxs("div",{className:"c-clubcard",children:[n.jsx("div",{className:"c-clubcard-name",children:w.name}),n.jsxs("div",{className:"c-clubcard-meta",children:[w.city||"",w.governing_body?` · ${w.governing_body}`:""]}),n.jsx("button",{className:"c-text-btn c-text-btn--inline",onClick:()=>g(null),children:"Change"})]}),M&&n.jsx("div",{className:"c-error",children:M}),n.jsx("button",{className:"c-btn",onClick:ne,children:"Continue →"}),n.jsx("button",{className:"c-text-btn",onClick:()=>i(1),children:"← Back"})]}),a===2&&!m&&_&&n.jsxs(n.Fragment,{children:[n.jsx("h2",{className:"c-card-title",children:"Tell us about your association."}),n.jsx("p",{className:"c-card-sub",children:"We'll get it added and email you when it's ready."}),n.jsxs("label",{className:"c-label",children:[n.jsx("span",{children:"Association name"}),n.jsx("input",{type:"text",value:q,onChange:R=>T(R.target.value),placeholder:"e.g. Smithtown Hockey Association",className:"c-input",autoFocus:!0})]}),n.jsxs("label",{className:"c-label",children:[n.jsx("span",{children:"City (optional)"}),n.jsx("input",{type:"text",value:Q,onChange:R=>de(R.target.value),placeholder:"Smithtown, ON",className:"c-input"})]}),M&&n.jsx("div",{className:"c-error",children:M}),n.jsx("button",{className:"c-btn",onClick:be,disabled:O,children:O?"Submitting…":"Submit"}),n.jsx("button",{className:"c-text-btn",onClick:()=>D(!1),children:"← Back to search"})]}),a===3&&n.jsxs(n.Fragment,{children:[w&&w.slug!=="independent"&&n.jsxs("div",{className:"c-clubchip",children:[n.jsxs("div",{className:"c-clubchip-eyebrow",children:[w.governing_body||"ASSOCIATION",w.city?` · ${w.city}`:""]}),n.jsx("div",{className:"c-clubchip-name",children:w.name}),!m&&n.jsx("button",{className:"c-text-btn c-text-btn--inline",onClick:()=>{i(2),g(null)},children:"Change"})]}),w&&w.slug==="independent"&&n.jsxs("div",{className:"c-clubchip",children:[n.jsx("div",{className:"c-clubchip-eyebrow",children:"NO ASSOCIATION"}),n.jsx("div",{className:"c-clubchip-name",children:"Just my team"}),n.jsx("button",{className:"c-text-btn c-text-btn--inline",onClick:()=>{i(2),g(null)},children:"Change"})]}),n.jsx("h2",{className:"c-card-title",children:"What team do you coach?"}),n.jsxs("label",{className:"c-label",children:[n.jsx("span",{children:"Age division"}),n.jsxs("select",{value:he,onChange:R=>Be(R.target.value),className:"c-input",children:[n.jsx("option",{value:"",children:"Pick one"}),Cs.map(R=>n.jsx("option",{value:R,children:R},R))]})]}),n.jsxs("label",{className:"c-label",children:[n.jsx("span",{children:"Tier"}),n.jsxs("select",{value:Ge,onChange:R=>je(R.target.value),className:"c-input",children:[n.jsx("option",{value:"",children:"Pick one"}),Ts.map(R=>n.jsx("option",{value:R,children:R},R))]})]}),n.jsx("p",{className:"c-card-sub",style:{marginBottom:0},children:"If another coach has already set up this team, we'll connect you to them."}),M&&n.jsx("div",{className:"c-error",children:M}),n.jsx("button",{className:"c-btn",onClick:se,disabled:O,children:O?"Setting up…":"Create my team →"}),n.jsx("button",{className:"c-text-btn",onClick:()=>i(2),children:"← Back"})]})]}),n.jsx("style",{children:is})]})}function Da({size:e=18}){return n.jsxs("svg",{width:e,height:e,viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg",style:{display:"block",flexShrink:0},children:[n.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z",fill:"#4285F4"}),n.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z",fill:"#34A853"}),n.jsx("path",{d:"M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z",fill:"#FBBC05"}),n.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z",fill:"#EA4335"})]})}function as(){return n.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[n.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),n.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const is=`
.coach-wrap {
  min-height: 100dvh;
  background: var(--bg);
  width: 100%; max-width: none;
  color: var(--text);
  font-family: var(--font-body);
}
.c-centered {
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.c-cta {
  width: 100%;
  background: var(--accent);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.c-cta:hover { background: var(--accent-soft); }
.c-text-btn {
  width: 100%;
  color: var(--text-mute);
  font-size: 13px;
  padding: 10px;
  text-align: center;
}
.c-text-btn:hover { color: var(--ice); }
.c-text-btn--inline {
  width: auto;
  padding: 4px 0;
  display: inline-block;
  text-align: left;
  font-size: 12px;
  color: var(--accent);
}
.c-card {
  width: 100%; max-width: 420px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius-lg);
  padding: 22px 20px;
}
.c-card-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 700; font-size: 12px;
  letter-spacing: 1px;
  color: var(--text-mute);
  margin-bottom: 18px;
  text-transform: uppercase;
}
.c-card-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: white;
  margin-bottom: 6px;
}
.c-card-sub {
  font-size: 13px;
  color: var(--text-mute);
  margin: 0 0 18px;
  line-height: 1.4;
}
.c-clubchip {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 14px;
}
.c-clubchip-eyebrow {
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}
.c-clubchip-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.3px;
  margin-top: 2px;
  line-height: 1.1;
}
.c-clubcard {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 14px;
}
.c-clubcard-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  color: white;
}
.c-clubcard-meta {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 4px;
}
.c-label {
  display: block;
  margin-bottom: 14px;
}
.c-label > span {
  display: block;
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 6px;
}
.c-input {
  width: 100%;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  color: var(--text);
  font-size: 16px;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
}
.c-input:focus { border-color: var(--accent); }
.c-results {
  display: flex; flex-direction: column;
  gap: 6px;
  margin: 12px 0 6px;
  max-height: 320px;
  overflow-y: auto;
}
.c-result {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}
.c-result:hover { border-color: var(--accent); }
.c-result-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 15px;
  color: white;
  letter-spacing: 0.3px;
  line-height: 1.1;
}
.c-result-meta {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 3px;
}
.c-result-empty {
  text-align: center;
  font-size: 13px;
  color: var(--text-mute);
  padding: 14px 8px;
}
.c-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-family: var(--font-display);
  margin: 14px 0 6px;
  transition: transform 0.1s, background 0.15s;
}
.c-btn:hover:not(:disabled) { background: var(--accent-soft); }
.c-btn:active:not(:disabled) { transform: scale(0.98); }
.c-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.c-error {
  background: rgba(255, 84, 84, 0.1);
  border: 0.5px solid rgba(255, 84, 84, 0.3);
  color: var(--danger);
  border-radius: var(--radius);
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 10px;
}
.c-google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: white;
  color: #3c4043;
  border: 1px solid #dadce0;
  border-radius: var(--radius);
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-body);
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
  margin-bottom: 6px;
}
.c-google-btn:hover { background: #f8f9fa; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
.c-google-btn--hero { padding: 16px 20px; font-size: 16px; margin-bottom: 8px; }
.c-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  color: var(--text-mute);
  font-size: 12px;
}
.c-divider::before, .c-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-dim);
}
.c-google-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-raised);
  border: 0.5px solid var(--border-dim);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  color: var(--text-mute);
  margin-bottom: 14px;
  width: fit-content;
}
`;function Po(e,t){let r=0;for(let s=0;s<e.length;s++)r=Math.imul(31,r)+e.charCodeAt(s)>>>0;return r%t}function Pw(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Rw(){const e=new Date().getDay();return e===0?0:7-e}async function Ow(e,t,r){if(!e||!t||!r)return null;const s=kt(),a=Pw(),{data:i}=await P.from("players").select("id, display_name").eq("team_id",t).order("id");if(!i||i.length<2)return null;const{data:o}=await P.from("teams").select("id, name, age_division, tier").eq("club_id",r).eq("is_active",!0).order("id");if(!o||o.length<2)return null;const l=o.filter(f=>f.id!==t),c=l[Po(t+s,l.length)],{data:d}=await P.from("players").select("id, display_name").eq("team_id",c.id).order("id");if(!(d!=null&&d.length))return null;const h=f=>[...f].sort((m,k)=>Po(m.id+s,1e5)-Po(k.id+s,1e5)),u=h(i),p=h(d),x=u.findIndex(f=>f.id===e);if(x===-1)return null;const v=p[x%p.length],[{data:b}]=await Promise.all([P.from("shot_logs").select("player_id, count, log_date").in("player_id",[e,v.id]).gte("log_date",s)]),w={},g={};for(const f of b||[])w[f.player_id]=(w[f.player_id]||0)+f.count,f.log_date===a&&(g[f.player_id]=(g[f.player_id]||0)+f.count);return{weekStart:s,daysLeft:Rw(),myShots:w[e]||0,myTodayShots:g[e]||0,loggedToday:(g[e]||0)>0,rivalName:v.display_name,rivalTeamName:`${c.age_division} ${c.tier}`,rivalShots:w[v.id]||0,rivalLoggedToday:(g[v.id]||0)>0}}async function Xf(e){if(!e)return null;const t=kt(),{data:r}=await P.from("team_challenges").select("*").eq("team_id",e).eq("week_start",t).maybeSingle();return r}async function Lw(e,t){const r=kt(),{data:{user:s}}=await P.auth.getUser(),{data:a,error:i}=await P.from("team_challenges").upsert({team_id:e,goal_shots:t,week_start:r,created_by:s==null?void 0:s.id},{onConflict:"team_id,week_start"}).select().maybeSingle();if(i)throw i;return a}async function Zf(e){if(!e)return 0;const t=kt(),{data:r}=await P.from("players").select("id").eq("team_id",e);if(!(r!=null&&r.length))return 0;const s=r.map(i=>i.id),{data:a}=await P.from("shot_logs").select("count").in("player_id",s).gte("log_date",t);return(a||[]).reduce((i,o)=>i+o.count,0)}async function Zu(e){if(!e)return null;const t=kt(),{data:r}=await P.from("team_battles").select(`
      id, week_start, status,
      team_a:teams!team_a_id(id, name, age_division, tier, club:clubs(id, name, slug)),
      team_b:teams!team_b_id(id, name, age_division, tier, club:clubs(id, name, slug))
    `).eq("week_start",t).eq("status","active").or(`team_a_id.eq.${e},team_b_id.eq.${e}`).maybeSingle();if(!r)return null;const s=r.team_a.id===e,a=s?r.team_a:r.team_b,i=s?r.team_b:r.team_a,{data:o}=await P.from("players").select("id, team_id").in("team_id",[a.id,i.id]);if(!(o!=null&&o.length))return{...r,myTeam:a,rivalTeam:i,myShots:0,rivalShots:0};const l=o.map(u=>u.id),{data:c}=await P.from("shot_logs").select("player_id, count").in("player_id",l).gte("log_date",r.week_start),d={};for(const u of c||[])d[u.player_id]=(d[u.player_id]||0)+u.count;const h=u=>o.filter(p=>p.team_id===u).reduce((p,x)=>p+(d[x.id]||0),0);return{id:r.id,weekStart:r.week_start,myTeam:a,rivalTeam:i,myShots:h(a.id),rivalShots:h(i.id)}}async function Iw(e,t){const{data:r}=await P.from("clubs").select("id").neq("id",t).eq("is_active",!0);if(!(r!=null&&r.length))return[];const s=r.map(i=>i.id),{data:a}=await P.from("teams").select("id, name, age_division, tier, club:clubs(id, name, city)").in("club_id",s).eq("is_active",!0).neq("id",e).order("age_division");return a||[]}async function $w(e,t){const r=kt(),{data:{user:s}}=await P.auth.getUser(),{data:a,error:i}=await P.from("team_battles").insert({team_a_id:e,team_b_id:t,week_start:r,initiated_by:s==null?void 0:s.id,status:"active"}).select().single();if(i)throw i;return a}function Dw(){var Zr,Vn,en,Yn;const e=re(),[t,r]=y.useState(null),[s,a]=y.useState(!0),[i,o]=y.useState({playerCount:0,teamCount:0,totalShots:0}),[l,c]=y.useState([]),[d,h]=y.useState([]),[u,p]=y.useState([]),[x,v]=y.useState(null),[b,w]=y.useState(null),[g,f]=y.useState([]),[m,k]=y.useState([]),[N,S]=y.useState([]),[_,D]=y.useState(null),[q,T]=y.useState(null),[Q,de]=y.useState(0),[he,Be]=y.useState(""),[Ge,je]=y.useState(!1),[V,I]=y.useState(null),[E,$]=y.useState([]),[C,L]=y.useState(""),[O,W]=y.useState(!1),[M,G]=y.useState(""),[ne,se]=y.useState("invite"),[be,Ke]=y.useState(""),[R,pe]=y.useState(!1);if(y.useEffect(()=>{ce({title:"Coach dashboard",noindex:!0}),(async()=>{var J;const A=await ps();if(!A){e("/coach");return}if(r(A),(J=A.club)!=null&&J.id){const[xe,Ne,sr,j,Oe,ca,Ce,Yc]=await Promise.all([Kc(A.club.id),Vc(A.club.id),tw(A.club.id),Tw(A.id),Qu(A.id),aw(A.club.id),Jf(A.club.id),Yf(A.club.id)]);if(o(xe),c(Ne),h(sr),p(j),f(Oe),k(ca),S(Ce),D(Yc),j.length>0){const Jc=j[0];v(Jc.id);try{const Qc=await Xu({teamId:Jc.id,coachId:A.id});w(Qc)}catch{}}}a(!1)})()},[e]),y.useEffect(()=>{!x||!(t!=null&&t.id)||(async()=>{var sr;try{const j=await Xu({teamId:x,coachId:t.id});w(j)}catch{w(null)}const[A,J,xe,Ne]=await Promise.all([Xf(x),Zf(x),Zu(x),Iw(x,(sr=t==null?void 0:t.club)==null?void 0:sr.id)]);T(A),de(J),Be(A!=null&&A.goal_shots?String(A.goal_shots):""),I(xe),$(Ne)})()},[x,t]),s)return n.jsxs("div",{className:"dash-wrap dash-loading",children:[n.jsx("div",{children:"Loading…"}),n.jsx("style",{children:Ro})]});if(!(t!=null&&t.club))return n.jsxs("div",{className:"dash-wrap",style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100dvh"},children:[n.jsxs("div",{style:{maxWidth:400,padding:"24px 20px",textAlign:"center"},children:[n.jsx("div",{style:{fontSize:40,marginBottom:16},children:"🏒"}),n.jsx("div",{style:{fontFamily:"var(--font-display)",fontSize:22,fontWeight:800,color:"white",marginBottom:10},children:"Finish setting up"}),n.jsx("div",{style:{fontSize:14,color:"var(--text-mute)",lineHeight:1.5,marginBottom:24},children:"You need to connect to your club and pick your team before you can invite players. It only takes a minute."}),n.jsx("button",{className:"dash-btn-ghost",onClick:()=>e("/coach"),style:{display:"inline-block",padding:"12px 28px",fontSize:14},children:"Complete setup →"}),n.jsx("button",{style:{display:"block",margin:"16px auto 0",color:"var(--text-mute)",fontSize:13},onClick:Xr,children:"Sign out"})]}),n.jsx("style",{children:Ro})]});const Pe=`${K}/join/${t.club.slug}`,Re=b?`${K}/j/${b}`:null,We=u.find(A=>A.id===x),Pt=async()=>{var A;if(!(!C||!x)){W(!0),G("");try{await $w(x,C);const J=await Zu(x);I(J),L("")}catch(J){G((A=J.message)!=null&&A.includes("unique")?"Your team already has a battle this week.":"Could not start battle. Try again.")}W(!1)}},Ze=async()=>{const A=parseInt(he,10);if(!(!A||A<1||!x)){je(!0);try{const J=await Lw(x,A);T(J)}catch(J){console.warn("setTeamChallenge error:",J)}je(!1)}},Rt=async(A,J)=>{try{await navigator.clipboard.writeText(A),Ke(J),setTimeout(()=>Ke(""),2e3)}catch{}},Ve=We?`${((Zr=We.club)==null?void 0:Zr.name)||t.club.name} ${We.age_division||""} ${We.tier||""}`.trim():t.club.name,ee=We&&Re?`Hey ${Ve} parents! 🏒

We're using Hockey Shot Challenge this season. Players log shots and stickhandling reps at home, earn ranks, and compete in 4-player squad battles against rival teams all week.

Sign up here (30 sec, free, no email needed):
${Re}`:"",nr=async(A,J,xe)=>{try{navigator.share?(await navigator.share({title:J,text:xe,url:A}),pe(!0),setTimeout(()=>pe(!1),2e3)):Rt(A,"link")}catch{}},zr=async A=>{if(x)try{if(await Cw({teamId:x,pendingCoachId:A,approverCoachId:t.id})){const xe=await Qu(t.id);f(xe)}}catch{}},Xr=async()=>{window.confirm("Sign out?")&&(await qf(),e("/coach"))};return n.jsxs("div",{className:"dash-wrap",children:[n.jsxs("nav",{className:"dash-nav",children:[n.jsxs("div",{className:"dash-brand",onClick:()=>e("/"),children:[n.jsx(Bw,{}),n.jsx("span",{children:"Coach dashboard"})]}),n.jsx("button",{className:"dash-signout",onClick:Xr,children:"Sign out"})]}),n.jsxs("div",{className:"dash-inner",children:[n.jsxs("div",{className:"dash-header",children:[n.jsx("div",{className:"dash-eyebrow",children:"YOUR CLUB"}),n.jsx("h1",{className:"dash-title",children:t.club.name}),t.club.city&&n.jsx("div",{className:"dash-city",children:t.club.city})]}),g.length>0&&n.jsxs("div",{className:"dash-pending",children:[n.jsxs("div",{className:"dash-pending-label",children:[g.length," coach",g.length===1?"":"es"," waiting for approval"]}),g.map(A=>{var J,xe;return n.jsxs("div",{className:"dash-pending-item",children:[n.jsxs("div",{children:[n.jsx("div",{className:"dash-pending-name",children:(J=A.coach)==null?void 0:J.display_name}),n.jsxs("div",{className:"dash-pending-sub",children:["wants to join ",(xe=A.team)==null?void 0:xe.name]})]}),n.jsx("button",{className:"dash-btn-mini",onClick:()=>{var Ne;return zr((Ne=A.coach)==null?void 0:Ne.id)},children:"Approve"})]},A.id)})]}),n.jsxs("div",{className:"dash-tabs",children:[n.jsx("button",{className:`dash-tab ${ne==="invite"?"dash-tab--active":""}`,onClick:()=>se("invite"),children:"Invite players"}),n.jsx("button",{className:`dash-tab ${ne==="overview"?"dash-tab--active":""}`,onClick:()=>se("overview"),children:"Overview"}),n.jsx("button",{className:`dash-tab ${ne==="roster"?"dash-tab--active":""}`,onClick:()=>se("roster"),children:"Roster"}),n.jsx("button",{className:`dash-tab ${ne==="drills"?"dash-tab--active":""}`,onClick:()=>se("drills"),children:"Drills"})]}),ne==="invite"&&n.jsx(n.Fragment,{children:u.length===0?n.jsxs("div",{className:"dash-empty",children:[n.jsx("div",{style:{fontSize:36,marginBottom:12},children:"👋"}),n.jsx("div",{className:"dash-empty-title",children:"You're not on a team yet"}),n.jsx("div",{className:"dash-empty-sub",children:"Go back to setup to pick your age group and tier. Once you're on a team, you'll get an invite link to send to parents."}),n.jsx("button",{className:"dash-btn-ghost",onClick:()=>e("/coach"),style:{marginTop:4},children:"Pick my team →"})]}):n.jsxs(n.Fragment,{children:[u.length>1&&n.jsxs("div",{className:"dash-section",children:[n.jsx("div",{className:"dash-label",children:"Which team?"}),n.jsx("div",{className:"dash-team-pills",children:u.map(A=>n.jsxs("button",{className:`dash-team-pill ${A.id===x?"dash-team-pill--active":""}`,onClick:()=>v(A.id),children:[A.age_division," ",A.tier,A.role==="owner"&&n.jsx("span",{className:"dash-pill-tag",children:"OWNER"})]},A.id))})]}),We&&Re&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"dash-section inv-hero",children:[n.jsxs("div",{className:"inv-team-name",children:[We.age_division," ",We.tier]}),n.jsx("div",{className:"inv-headline",children:"Send to parents"}),n.jsx("div",{className:"inv-sub",children:"One tap opens their messages app with the link pre-filled."}),n.jsxs("div",{className:"inv-channels",children:[n.jsxs("a",{className:"inv-channel inv-channel--sms",href:`sms:?body=${encodeURIComponent(ee)}`,children:[n.jsx("span",{className:"inv-channel-icon",children:"💬"}),n.jsx("span",{className:"inv-channel-label",children:"iMessage"})]}),n.jsxs("a",{className:"inv-channel inv-channel--wa",href:`https://wa.me/?text=${encodeURIComponent(ee)}`,target:"_blank",rel:"noopener noreferrer",children:[n.jsx("span",{className:"inv-channel-icon",children:n.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",children:n.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})})}),n.jsx("span",{className:"inv-channel-label",children:"WhatsApp"})]}),n.jsxs("a",{className:"inv-channel inv-channel--email",href:`mailto:?subject=${encodeURIComponent(`Join ${Ve} on Hockey Shot Challenge`)}&body=${encodeURIComponent(ee)}`,children:[n.jsx("span",{className:"inv-channel-icon",children:"✉️"}),n.jsx("span",{className:"inv-channel-label",children:"Email"})]})]}),n.jsx("button",{className:"inv-more-btn",onClick:()=>nr(Re,`Join ${Ve}`,ee),children:R?"✓ Sent!":"↗ More ways to share"})]}),n.jsxs("div",{className:"dash-section",children:[n.jsx("div",{className:"dash-label",children:"Your link"}),n.jsxs("div",{className:"dash-url-box",children:[n.jsx("div",{className:"dash-url tnum",children:Re}),n.jsx("button",{className:`dash-copy ${be==="link"?"dash-copy--done":""}`,onClick:()=>Rt(Re,"link"),children:be==="link"?"✓":"Copy"})]}),n.jsxs("div",{className:"dash-hint",children:["Or copy the full message: ",n.jsx("button",{className:"inv-copy-msg",onClick:()=>Rt(ee,"message"),children:be==="message"?"✓ Copied":"Copy message text"})]})]}),n.jsxs("div",{className:"dash-section",children:[n.jsx("div",{className:"dash-label",children:"QR code — show at practice"}),n.jsxs("div",{className:"dash-qr-box",children:[n.jsx(Uw,{url:Re}),n.jsx("div",{className:"dash-qr-caption",children:"Players scan with their phone and they're signed up in 30 seconds. No email needed."}),n.jsx("a",{className:"dash-btn-ghost",href:`https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(Re)}&bgcolor=0a0e1a&color=e8eef7&qzone=2`,target:"_blank",rel:"noopener noreferrer",children:"Download high-res QR ↗"})]})]}),n.jsxs("div",{className:"dash-section",children:[n.jsx("div",{className:"dash-label",children:"Tips"}),n.jsxs("ul",{className:"dash-tips",children:[n.jsx("li",{children:"Drop the link in your team group chat right after practice"}),n.jsx("li",{children:"Show the QR at the rink — easiest signup is in person"}),n.jsx("li",{children:"Tell kids their squad name resets every Monday — creates urgency"}),n.jsx("li",{children:'Make it a challenge: "Squad that logs the most shots picks the drill next practice"'})]})]})]})]})}),ne==="overview"&&n.jsxs(n.Fragment,{children:[x&&n.jsxs("div",{className:"battle-callout",children:[n.jsx("div",{className:"battle-callout-eyebrow",children:"⚔️ CROSS-CLUB BATTLE"}),V?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"battle-live-row",children:[n.jsxs("div",{className:"battle-live-side",children:[n.jsx("div",{className:"battle-live-club",children:"Your team"}),n.jsx("div",{className:"battle-live-score tnum",children:V.myShots.toLocaleString()})]}),n.jsx("div",{className:"battle-live-vs",children:"VS"}),n.jsxs("div",{className:"battle-live-side battle-live-side--right",children:[n.jsx("div",{className:"battle-live-club",children:((en=(Vn=V.rivalTeam)==null?void 0:Vn.club)==null?void 0:en.name)||((Yn=V.rivalTeam)==null?void 0:Yn.name)}),n.jsx("div",{className:"battle-live-score tnum",children:V.rivalShots.toLocaleString()})]})]}),n.jsx("div",{className:"battle-callout-status",children:V.myShots>=V.rivalShots?`Leading by ${(V.myShots-V.rivalShots).toLocaleString()} shots`:`Behind by ${(V.rivalShots-V.myShots).toLocaleString()} shots — keep logging`})]}):E.length>0?n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"battle-callout-body",children:"Challenge any rival team. Both teams see the live score on their home screen all week. Boys vs girls — any matchup works."}),n.jsxs("div",{className:"ch-set-goal",style:{marginTop:12},children:[n.jsxs("select",{className:"ch-goal-input",value:C,onChange:A=>L(A.target.value),children:[n.jsx("option",{value:"",children:"Pick a rival team…"}),E.map(A=>{var J;return n.jsxs("option",{value:A.id,children:[(J=A.club)==null?void 0:J.name," — ",A.age_division," ",A.tier]},A.id)})]}),n.jsx("button",{className:"ch-goal-btn",onClick:Pt,disabled:O||!C,children:O?"…":"Challenge"})]}),M&&n.jsx("div",{className:"dash-hint",style:{color:"#ef4444",marginTop:6},children:M})]}):n.jsxs("div",{className:"battle-callout-body",children:["No other clubs are set up yet. Share ",n.jsx("strong",{children:"hockeyshotchallenge.com"})," with rival coaches — once they join, you can challenge their teams."]})]}),_&&_.thisWeekTotal>0&&n.jsxs("div",{className:"recap-card",children:[n.jsxs("div",{className:"recap-header",children:[n.jsx("div",{className:"recap-label",children:"THIS WEEK"}),_.vsLastWeek!==null&&n.jsxs("div",{className:`recap-delta ${_.vsLastWeek>=0?"recap-delta--up":"recap-delta--down"}`,children:[_.vsLastWeek>=0?"↑":"↓"," ",Math.abs(_.vsLastWeek),"% vs last week"]})]}),n.jsx("div",{className:"recap-shots tnum",children:_.thisWeekTotal.toLocaleString()}),n.jsx("div",{className:"recap-shots-label",children:"shots logged"}),n.jsxs("div",{className:"recap-row",children:[n.jsxs("div",{className:"recap-stat",children:[n.jsx("div",{className:"recap-stat-num tnum",children:_.activePlayers}),n.jsx("div",{className:"recap-stat-label",children:"active players"})]}),n.jsx("div",{className:"recap-divider"}),n.jsxs("div",{className:"recap-stat",children:[n.jsx("div",{className:"recap-stat-num tnum",children:_.totalPlayers}),n.jsx("div",{className:"recap-stat-label",children:"total players"})]}),_.topPlayer&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"recap-divider"}),n.jsxs("div",{className:"recap-stat",children:[n.jsxs("div",{className:"recap-stat-num",style:{fontSize:13},children:["🏆 ",_.topPlayer.name]}),n.jsxs("div",{className:"recap-stat-label",children:[_.topPlayer.shots.toLocaleString()," shots"]})]})]})]})]}),n.jsxs("div",{className:"dash-stats",children:[n.jsxs("div",{className:"dash-stat",children:[n.jsx("div",{className:"dash-stat-num tnum",children:i.playerCount}),n.jsx("div",{className:"dash-stat-label",children:"Players"})]}),n.jsxs("div",{className:"dash-stat",children:[n.jsx("div",{className:"dash-stat-num tnum",children:i.teamCount}),n.jsx("div",{className:"dash-stat-label",children:"Teams"})]}),n.jsxs("div",{className:"dash-stat",children:[n.jsx("div",{className:"dash-stat-num tnum",children:i.totalShots.toLocaleString()}),n.jsx("div",{className:"dash-stat-label",children:"Shots logged"})]})]}),N.filter(A=>A.week_shots>0).length>0&&n.jsxs("div",{className:"dash-section",children:[n.jsx("div",{className:"dash-label",style:{marginBottom:10},children:"Team rankings — this week"}),n.jsx("div",{className:"tr-list",children:N.map((A,J)=>{const xe=u.some(sr=>sr.id===A.id),Ne=["🥇","🥈","🥉"];return n.jsxs("div",{className:`tr-row${xe?" tr-row--mine":""}`,children:[n.jsx("div",{className:"tr-rank",children:A.week_shots>0&&Ne[J]?Ne[J]:n.jsxs("span",{className:"tr-rank-num",children:["#",J+1]})}),n.jsxs("div",{className:"tr-info",children:[n.jsxs("div",{className:"tr-name",children:[A.age_division," ",A.tier,xe?n.jsx("span",{className:"tr-you",children:" YOU"}):""]}),n.jsxs("div",{className:"tr-players",children:[A.player_count," player",A.player_count!==1?"s":""]})]}),n.jsx("div",{className:"tr-shots tnum",children:A.week_shots.toLocaleString()})]},A.id)})})]}),n.jsxs("div",{className:"dash-section",children:[n.jsxs("div",{className:"dash-section-head",children:[n.jsx("div",{className:"dash-label",children:"Club page (public)"}),n.jsx("a",{className:"dash-visit",href:Pe,target:"_blank",rel:"noopener noreferrer",children:"View ↗"})]}),n.jsxs("div",{className:"dash-url-box",children:[n.jsx("div",{className:"dash-url tnum",children:Pe}),n.jsx("button",{className:`dash-copy ${be==="cluburl"?"dash-copy--done":""}`,onClick:()=>Rt(Pe,"cluburl"),children:be==="cluburl"?"✓":"Copy"})]}),n.jsx("div",{className:"dash-hint",children:"For sharing the whole club. For team-specific invites, use the Invite Players tab."})]}),u.length>0&&n.jsxs("div",{className:"dash-section",children:[n.jsx("div",{className:"dash-label",children:"Your teams"}),n.jsx("div",{className:"dash-pills",children:u.map(A=>n.jsxs("div",{className:"dash-pill",children:[A.age_division," ",A.tier,A.role==="owner"&&n.jsx("span",{className:"dash-pill-tag-inline",children:"OWNER"})]},A.id))})]}),x&&n.jsxs("div",{className:"dash-section",children:[n.jsx("div",{className:"dash-section-head",children:n.jsx("div",{className:"dash-label",children:"Team Challenge — this week"})}),q&&n.jsxs("div",{className:"ch-progress-wrap",children:[n.jsx("div",{className:"ch-progress-bar",children:n.jsx("div",{className:"ch-progress-fill",style:{width:`${Math.min(100,Math.round(Q/q.goal_shots*100))}%`}})}),n.jsxs("div",{className:"ch-progress-meta",children:[n.jsxs("span",{className:"ch-shots-done",children:[Q.toLocaleString()," shots"]}),n.jsxs("span",{className:"ch-shots-goal",children:["goal: ",q.goal_shots.toLocaleString()]})]}),Q>=q.goal_shots&&n.jsx("div",{className:"ch-complete",children:"🏆 Goal crushed! Update it to keep the momentum going."})]}),n.jsxs("div",{className:"ch-set-goal",children:[n.jsx("input",{className:"ch-goal-input",type:"number",min:"1",placeholder:"Set a shot goal (e.g. 500)",value:he,onChange:A=>Be(A.target.value),onKeyDown:A=>A.key==="Enter"&&Ze()}),n.jsx("button",{className:"ch-goal-btn",onClick:Ze,disabled:Ge||!he,children:Ge?"…":q?"Update":"Set goal"})]}),n.jsx("div",{className:"dash-hint",children:"Players will see a progress bar on their home screen."})]})]}),ne==="roster"&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"dash-label",style:{marginBottom:10},children:[d.length," player",d.length===1?"":"s"," in club"]}),d.length===0?n.jsxs("div",{className:"dash-empty",children:[n.jsx("div",{className:"dash-empty-title",children:"No players yet"}),n.jsx("div",{className:"dash-empty-sub",children:"Share your team invite link and they'll start appearing here."}),n.jsx("button",{className:"dash-btn-ghost",onClick:()=>se("invite"),children:"Invite players →"})]}):n.jsx("div",{className:"dash-roster",children:d.map((A,J)=>{var xe,Ne;return n.jsxs("div",{className:"dash-player",children:[n.jsx("div",{className:"dash-player-rank",children:J+1}),n.jsx("div",{className:"dash-player-avatar",children:(xe=A.display_name[0])==null?void 0:xe.toUpperCase()}),n.jsxs("div",{className:"dash-player-info",children:[n.jsx("div",{className:"dash-player-name",children:A.display_name}),n.jsxs("div",{className:"dash-player-sub",children:[((Ne=A.team)==null?void 0:Ne.name)||"No team"," · ",A.position||"—"]})]}),A.current_streak>0&&n.jsxs("div",{className:"dash-player-streak",children:["🔥 ",A.current_streak]}),n.jsx("div",{className:"dash-player-shots tnum",children:A.lifetime_shots.toLocaleString()})]},A.id)})})]}),ne==="drills"&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"dash-label",style:{marginBottom:10},children:["Stickhandling this week — ",m.length," player",m.length===1?"":"s"," active"]}),m.length===0?n.jsxs("div",{className:"dash-empty",children:[n.jsx("div",{className:"dash-empty-title",children:"No drills logged yet"}),n.jsx("div",{className:"dash-empty-sub",children:"Players will appear here once they log stickhandling reps on the home screen."})]}):n.jsx("div",{className:"dash-roster",children:m.map((A,J)=>{var xe;return n.jsxs("div",{className:"dash-player",children:[n.jsx("div",{className:"dash-player-rank",children:J+1}),n.jsx("div",{className:"dash-player-avatar",children:(xe=A.display_name[0])==null?void 0:xe.toUpperCase()}),n.jsxs("div",{className:"dash-player-info",children:[n.jsx("div",{className:"dash-player-name",children:A.display_name}),n.jsx("div",{className:"dash-player-sub",children:["Toe Drag","Figure 8","Lateral","One-Hand"].filter(Ne=>A.drills[Ne]).map(Ne=>`${Ne} ${A.drills[Ne]}`).join(" · ")})]}),n.jsx("div",{className:"dash-player-shots tnum",children:A.drills.total})]},A.id)})})]})]}),n.jsx("style",{children:Ro})]})}function Uw({url:e}){const t=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(e)}&bgcolor=0a0e1a&color=e8eef7&qzone=2`;return n.jsx("img",{src:t,alt:"Team join QR code",width:"220",height:"220",style:{display:"block",borderRadius:12,border:"0.5px solid var(--border-dim)",margin:"0 auto"}})}function Bw(){return n.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[n.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),n.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const Ro=`
.dash-wrap {
  min-height: 100dvh;
  background: var(--bg);
  width: 100%; max-width: none;
  color: var(--text);
}
.dash-loading {
  display: flex; align-items: center; justify-content: center;
  color: var(--text-mute);
  font-family: var(--font-display);
  letter-spacing: 2px; font-size: 12px;
}

.dash-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  border-bottom: 0.5px solid var(--border-dim);
}
.dash-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
}
.dash-signout {
  color: var(--text-mute);
  font-size: 13px;
  padding: 6px 12px;
}
.dash-signout:hover { color: var(--danger); }

.dash-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px clamp(16px, 5vw, 40px) 60px;
}

.dash-header { margin-bottom: 24px; }
.dash-eyebrow {
  font-family: var(--font-display);
  font-size: 11px; font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 6px;
}
.dash-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 40px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.3px;
  margin: 0;
  color: white;
}
.dash-city {
  font-size: 14px; color: var(--text-mute);
  margin-top: 4px;
}

.dash-pending {
  background: rgba(255, 122, 41, 0.12);
  border: 0.5px solid rgba(255, 122, 41, 0.35);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 16px;
}
.dash-pending-label {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  color: var(--warn-soft);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.dash-pending-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0;
  border-top: 0.5px solid rgba(255, 122, 41, 0.2);
}
.dash-pending-item:first-of-type { border-top: 0; }
.dash-pending-name {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: white;
}
.dash-pending-sub {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 2px;
}
.dash-btn-mini {
  background: var(--accent);
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
}

.dash-tabs {
  display: flex; gap: 4px;
  padding: 4px;
  background: var(--surface);
  border-radius: var(--radius);
  margin-bottom: 20px;
  overflow-x: auto;
}
.dash-tab {
  flex: 1;
  min-width: max-content;
  padding: 10px 14px;
  border-radius: 9px;
  color: var(--ice);
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.4px;
  background: transparent;
  white-space: nowrap;
}
.dash-tab--active {
  background: var(--accent);
  color: white;
}

.dash-team-pills {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.dash-team-pill {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--ice);
  padding: 8px 14px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.4px;
  display: inline-flex; align-items: center; gap: 8px;
}
.dash-team-pill--active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
.dash-pill-tag {
  font-size: 9px;
  letter-spacing: 1px;
  background: rgba(255,255,255,0.15);
  padding: 2px 6px;
  border-radius: 4px;
}
.dash-pill-tag-inline {
  font-size: 9px;
  letter-spacing: 1px;
  margin-left: 6px;
  color: var(--text-mute);
  font-weight: 600;
}

.dash-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--surface-raised);
  border-radius: var(--radius);
  border: 0.5px solid var(--border-dim);
}
.dash-stat { text-align: center; }
.dash-stat-num {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
}
.dash-stat-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  margin-top: 6px;
  text-transform: uppercase;
}

.dash-section {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 14px;
}
.dash-section-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 10px;
}
.dash-label {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.dash-visit {
  color: var(--ice);
  font-size: 12px;
  text-decoration: none;
  padding: 4px 10px;
  border: 0.5px solid var(--border-dim);
  border-radius: 999px;
}
.dash-team-info {
  font-family: var(--font-display);
  color: white;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}
.dash-url-box {
  display: flex; gap: 8px; align-items: center;
  background: var(--bg);
  border-radius: var(--radius);
  padding: 4px 4px 4px 14px;
  border: 0.5px solid var(--border-dim);
  margin-bottom: 12px;
}
.dash-url {
  flex: 1; min-width: 0;
  color: var(--ice);
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-display);
}
.dash-copy {
  background: var(--accent);
  color: white;
  padding: 9px 14px;
  border-radius: 9px;
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.3px;
  flex-shrink: 0;
  font-family: var(--font-display);
}
.dash-copy--done { background: var(--success); }

.dash-hint {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 10px;
  line-height: 1.4;
}

.dash-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.dash-action {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px 12px;
  display: flex; align-items: center; gap: 12px;
  text-align: left;
  transition: all 0.15s;
}
.dash-action:hover {
  border-color: var(--accent);
}
.dash-action-icon {
  width: 34px; height: 34px;
  background: var(--accent-bg);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  color: var(--ice);
  flex-shrink: 0;
}
.dash-action-title {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: white;
}
.dash-action-sub {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 2px;
}

.dash-pills {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.dash-pill {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--ice);
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px; font-weight: 600;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
}

/* Roster */
.dash-empty {
  text-align: center; padding: 40px 20px;
  background: var(--surface);
  border-radius: var(--radius);
}
.dash-empty-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
}
.dash-empty-sub {
  font-size: 13px;
  color: var(--text-mute);
  margin-bottom: 18px;
}
.dash-btn-ghost {
  background: transparent;
  border: 0.5px solid var(--accent);
  color: var(--accent);
  padding: 10px 18px;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
  display: inline-block;
  text-decoration: none;
}
.dash-btn-ghost:hover {
  background: var(--accent);
  color: white;
}

.dash-roster {
  display: flex; flex-direction: column; gap: 4px;
}
.dash-player {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface);
  border-radius: 10px;
  padding: 10px 12px;
}
.dash-player-rank {
  width: 24px;
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  color: var(--text-mute);
  text-align: center;
}
.dash-player-avatar {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-family: var(--font-display);
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.dash-player-info { flex: 1; min-width: 0; }
.dash-player-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.3px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.dash-player-sub {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 2px;
}
.dash-player-streak {
  font-size: 11px;
  color: var(--warn-soft);
  background: rgba(255, 122, 41, 0.15);
  padding: 3px 7px;
  border-radius: 999px;
  font-weight: 600;
}
.dash-player-shots {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800;
  color: white;
}

/* Email template */
.dash-email-preview {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  overflow: hidden;
  font-size: 13px;
}
.dash-email-line {
  display: flex; gap: 6px; align-items: baseline;
  padding: 8px 14px;
  border-bottom: 0.5px solid var(--border-dim);
  color: var(--text-mute);
  font-size: 12px;
}
.dash-email-field {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-mute);
  text-transform: uppercase;
  flex-shrink: 0;
}
.dash-email-body {
  padding: 14px;
  color: var(--text-soft);
  line-height: 1.6;
}
.dash-email-body p { margin: 0 0 10px; }
.dash-email-body p:last-child { margin-bottom: 0; }
.dash-email-link { color: var(--ice); word-break: break-all; }

/* QR */
.dash-qr-box {
  text-align: center;
  padding: 18px 0;
}
.dash-qr-caption {
  font-size: 13px;
  color: var(--text-soft);
  margin: 14px 0;
  line-height: 1.5;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}

.dash-tips {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.6;
}
.dash-tips li { margin-bottom: 6px; }

.recap-card {
  background: linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(6,182,212,0.08) 100%);
  border: 1px solid rgba(37,99,235,0.25);
  border-radius: 14px;
  padding: 16px 18px;
  margin-bottom: 16px;
}
.recap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.recap-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-soft);
}
.recap-delta {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 99px;
}
.recap-delta--up { background: rgba(34,197,94,0.15); color: #16a34a; }
.recap-delta--down { background: rgba(239,68,68,0.12); color: #dc2626; }
.recap-shots {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  color: var(--text);
}
.recap-shots-label {
  font-size: 12px;
  color: var(--text-soft);
  margin-bottom: 14px;
}
.recap-row {
  display: flex;
  align-items: center;
  gap: 0;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.recap-stat { flex: 1; text-align: center; }
.recap-stat-num { font-size: 15px; font-weight: 700; }
.recap-stat-label { font-size: 10px; color: var(--text-soft); margin-top: 2px; }
.recap-divider { width: 1px; background: rgba(255,255,255,0.1); align-self: stretch; margin: 0 4px; }

.matchup-card {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--surface-2, rgba(255,255,255,0.04));
  border: 1px solid var(--border-dim);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 10px;
}
.matchup-side {
  flex: 1;
  padding: 16px 14px;
  text-align: center;
}
.matchup-side--us { background: rgba(37,99,235,0.08); }
.matchup-side--them { background: rgba(255,255,255,0.02); }
.matchup-team-name { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
.matchup-team-label { font-size: 9px; letter-spacing: 1px; color: var(--text-soft); margin-bottom: 8px; }
.matchup-shots { font-size: 28px; font-weight: 800; color: var(--text-soft); }
.matchup-shots--lead { color: var(--ice, #67e8f9); }
.matchup-vs {
  font-size: 11px; font-weight: 800; letter-spacing: 1px;
  color: var(--text-soft); padding: 0 4px; flex-shrink: 0;
}
.matchup-status {
  font-size: 13px; color: var(--text-soft);
  padding: 6px 2px;
}
.matchup-status--lead { color: #22c55e; font-weight: 600; }
.matchup-status--down { color: #f97316; font-weight: 600; }

.tr-list { display: flex; flex-direction: column; gap: 6px; }
.tr-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface-2, rgba(255,255,255,0.04));
  border: 1px solid var(--border-dim);
}
.tr-row--mine {
  border-color: #2563eb;
  background: rgba(37,99,235,0.08);
}
.tr-rank { width: 28px; text-align: center; font-size: 18px; flex-shrink: 0; }
.tr-rank-num { font-size: 12px; font-weight: 600; color: var(--text-soft); }
.tr-info { flex: 1; min-width: 0; }
.tr-name { font-size: 14px; font-weight: 700; }
.tr-you { font-size: 10px; font-weight: 700; color: #2563eb; margin-left: 6px; letter-spacing: 0.5px; }
.tr-players { font-size: 11px; color: var(--text-soft); margin-top: 1px; }
.tr-shots { font-size: 16px; font-weight: 800; color: var(--ice, #67e8f9); flex-shrink: 0; }

.ch-progress-wrap { margin-bottom: 14px; }
.ch-progress-bar {
  height: 12px;
  background: var(--border, #e5e7eb);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 8px;
}
.ch-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  border-radius: 99px;
  transition: width 0.4s ease;
  min-width: 4px;
}
.ch-progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.ch-shots-done { font-weight: 700; color: var(--text); }
.ch-shots-goal { color: var(--text-soft); }
.ch-complete {
  margin-top: 10px;
  background: rgba(251,191,36,0.12);
  border: 1px solid rgba(251,191,36,0.3);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #92400e;
}
.ch-set-goal {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.ch-goal-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 8px;
  font-size: 14px;
  background: var(--surface);
  color: var(--text);
}
.ch-goal-input:focus { outline: 2px solid #2563eb; border-color: transparent; }
.ch-goal-btn {
  padding: 10px 18px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.ch-goal-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.battle-callout {
  background: linear-gradient(135deg, rgba(239,68,68,0.09) 0%, rgba(37,99,235,0.09) 100%);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 14px;
  padding: 16px 18px;
  margin-bottom: 14px;
}
.battle-callout-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #ef4444;
  margin-bottom: 12px;
}
.battle-callout-status {
  font-size: 12px;
  color: var(--text-soft);
  margin-top: 10px;
}
.battle-callout-body {
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.5;
}
.battle-callout-body strong { color: var(--ice); }

.battle-live {
  background: linear-gradient(135deg, rgba(239,68,68,0.07) 0%, rgba(37,99,235,0.07) 100%);
  border: 1px solid rgba(239,68,68,0.2);
  border-radius: 10px;
  padding: 12px 14px;
}
.battle-live-row {
  display: flex; align-items: center; gap: 8px;
}
.battle-live-side { flex: 1; }
.battle-live-side--right { text-align: right; }
.battle-live-club { font-size: 11px; color: var(--text-soft); margin-bottom: 2px; }
.battle-live-score { font-size: 22px; font-weight: 800; color: var(--ice, #67e8f9); }
.battle-live-vs { font-size: 11px; font-weight: 800; color: var(--text-mute); flex-shrink: 0; }

/* ── Invite hero ── */
.inv-hero { text-align: center; }
.inv-team-name {
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
  color: var(--ice); text-transform: uppercase; margin-bottom: 6px;
}
.inv-headline {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800; color: white;
  letter-spacing: 0.2px; margin-bottom: 6px;
}
.inv-sub {
  font-size: 13px; color: var(--text-soft);
  margin-bottom: 20px; line-height: 1.4;
}
.inv-channels {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 10px; margin-bottom: 12px;
}
.inv-channel {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  background: var(--bg);
  border: 1px solid var(--border-dim);
  border-radius: 14px; padding: 16px 8px;
  text-decoration: none; color: var(--text);
  transition: border-color 0.15s, transform 0.1s;
}
.inv-channel:active { transform: scale(0.97); }
.inv-channel--sms { border-color: rgba(34,197,94,0.3); }
.inv-channel--sms:hover { border-color: #22c55e; }
.inv-channel--wa { border-color: rgba(37,211,102,0.3); }
.inv-channel--wa:hover { border-color: #25d366; }
.inv-channel--wa .inv-channel-icon { color: #25d366; }
.inv-channel--email { border-color: rgba(37,99,235,0.3); }
.inv-channel--email:hover { border-color: var(--accent); }
.inv-channel-icon {
  font-size: 22px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
}
.inv-channel-label {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.3px; color: var(--text-soft);
}
.inv-more-btn {
  width: 100%; background: transparent;
  border: 0.5px solid var(--border-dim);
  color: var(--text-mute); font-size: 13px; font-weight: 600;
  border-radius: 10px; padding: 11px;
  transition: border-color 0.15s, color 0.15s;
}
.inv-more-btn:hover { border-color: var(--accent); color: var(--ice); }
.inv-copy-msg {
  background: transparent; border: none;
  color: var(--ice); font-size: 12px; font-weight: 600;
  padding: 0; cursor: pointer; text-decoration: underline;
}
`,Ti={daily_greeting:["Morning, {name}. Let's get after it.","Back at it. How's the bucket looking?","Here we go. Day {streak}.","What's the plan today — wrist, snap, or a bit of everything?","{name}. Stick in hand. Let's work.","Fresh day. Fresh bucket."],daily_greeting_no_streak:["Welcome back, {name}. Even 20 shots is a day's work.","Glad you're here. Every rep counts when you're starting out.","{name}. Let's build something.","Here's the thing about practice — the only bad one is the one you didn't do."],session_started:["There it is.","Let's go.","Locked in.","That's the stuff.","Bucket open."],mid_session_50:["50 deep. Nice pace.","Halfway through the bucket. Don't rush.","Form over speed, {name}.","Keep the wrists snapping.","Steady hands."],mid_session_100:["Triple digits. That's a workday.","100 in one sit-down. Respect.","This is how Captains are built.","Your wrists are earning it."],welcome_first_time:["Welcome to the squad, {name}. Log your first bucket and we're on.","Glad to have you, {name}. Let's see what you've got.","New name on the roster: {name}. Show me the work."],welcome_with_teammate:["Welcome, {name}. {teammate}'s been ripping {teammate_shots} a day — let's catch up.","{name}'s in. {teammate}'s the one to chase — {teammate_shots} this week."],goal_unstarted_today:["Daily goal's waiting, {name}.","Ring's empty. Fix that.","Today's bucket isn't going to fill itself."],goal_close:["Almost there. Finish strong.","Don't stop short, {name}.","One more set closes the ring."],goal_met:["Goal closed. Take the win.","Daily done. That's how it's built.","Ring's full. See you tomorrow."],goal_doubled:["Double goal. Hungry today.","Past the line and still going.","{name}'s on a different level today."],streak_at_risk:["Streak's on the line, {name}. Get one in.","Don't lose it tonight. Even 10 keeps it alive.","Day {streak} ends in a few hours. Move."],streak_saved_by_freeze:["Freeze used. Streak's safe — back at it tomorrow.","Saved you. One freeze left this month."],streak_lost:["Streak's reset. New one starts today.","Yesterday's gone. Today counts."],achievement_first_shot:["First shot in the books. Many more coming."],achievement_hundred:["100 shots. The grind is real."],achievement_one_k:["One thousand. You're not messing around."],achievement_ten_k:["10K Club. That's elite air."],achievement_week_streak:["Week streak unlocked. Few get here."],achievement_month_streak:["Thirty days. You're a different player now."],achievement_specialty:["Your shot's showing up. Lean into it."],achievement_card_holder:["Card's official. Welcome."],drill_watched:["Watch it. Try it. That's how it sticks.","Now go put it on the wall."]};function Ww(e,t={}){const r=Ti[e]||Ti.daily_greeting;return r[Math.floor(Math.random()*r.length)].replace(/\{(\w+)\}/g,(a,i)=>t[i]??"")}function Fw(e,t,r={}){const s=Ti[e]||Ti.daily_greeting,a=String(t).split("").reduce((o,l)=>o+l.charCodeAt(0),0);return s[a%s.length].replace(/\{(\w+)\}/g,(o,l)=>r[l]??"")}function Mw(e,t={}){const s={first_shot:"achievement_first_shot",hundred_club:"achievement_hundred",one_k:"achievement_one_k",ten_k:"achievement_ten_k",week_streak:"achievement_week_streak",month_streak:"achievement_month_streak",specialty_found:"achievement_specialty",card_holder:"achievement_card_holder"}[e];return s?Ww(s,t):"Unlocked."}async function Hw(e){const t=Vw(7),{data:r}=await P.from("daily_progress").select("day, shots_total, goal_met").eq("player_id",e).in("day",t),s={};for(const o of r||[])s[o.day]=o;const a=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],i=Kw();return t.map(o=>{const l=s[o],c=new Date(o+"T12:00:00");return{day:a[c.getDay()],date:o,shots:(l==null?void 0:l.shots_total)??0,goalMet:(l==null?void 0:l.goal_met)??!1,isToday:o===i}})}async function qw(e){const[t,r]=await Promise.all([P.from("achievement_defs").select("*").order("sort_order"),P.from("player_achievements").select("code, unlocked_at").eq("player_id",e)]),s={};for(const a of r.data||[])s[a.code]=a.unlocked_at;return(t.data||[]).map(a=>({...a,unlocked:!!s[a.code],unlocked_at:s[a.code]||null}))}async function Gw(e){const{data:t,error:r}=await P.rpc("claim_achievements_for_player",{p_player_id:e});return r?(console.error("claimAchievements error",r),[]):t||[]}function Kw(){const e=new Date,t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${r}-${s}`}function Vw(e){const t=[],r=new Date;for(let s=e-1;s>=0;s--){const a=new Date(r);a.setDate(r.getDate()-s);const i=a.getFullYear(),o=String(a.getMonth()+1).padStart(2,"0"),l=String(a.getDate()).padStart(2,"0");t.push(`${i}-${o}-${l}`)}return t}async function em(e=null){let t=P.from("skill_videos").select("id, title, youtube_id, skill_type, sort_order").eq("is_active",!0).order("sort_order");e&&(t=t.eq("skill_type",e));const{data:r}=await t;return r||[]}function Yw({type:e,onClose:t,onSave:r}){const[s,a]=y.useState(0),i=l=>{a(s+l)},o=()=>{s>0&&(r(s),a(0))};return n.jsx("div",{className:"numberpad-overlay",onClick:t,children:n.jsxs("div",{className:"numberpad",onClick:l=>l.stopPropagation(),children:[n.jsxs("div",{className:"numberpad-header",children:[n.jsx("div",{className:"numberpad-title",children:e==="Stickhandling"?"How many stickhandling minutes today?":`How many ${e.toLowerCase()} shots today?`}),n.jsx("button",{className:"numberpad-close",onClick:t,children:"×"})]}),n.jsx("div",{className:"numberpad-display",children:s}),n.jsx("div",{className:"numberpad-grid",children:[5,10].map(l=>n.jsxs("button",{className:"numberpad-btn",onClick:()=>i(l),children:["+",l]},l))}),n.jsxs("div",{className:"numberpad-actions",children:[n.jsx("button",{className:"numberpad-cancel",onClick:t,children:"Cancel"}),n.jsx("button",{className:"numberpad-save",onClick:o,disabled:s<=0,children:"Save"})]}),n.jsx("style",{children:Jw})]})})}const Jw=`
.numberpad-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.numberpad {
  width: 100%;
  background: var(--surface);
  border-radius: 20px 20px 0 0;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.numberpad-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.numberpad-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: white;
}
.numberpad-close {
  font-size: 32px;
  background: transparent;
  color: var(--text-soft);
  cursor: pointer;
  padding: 0;
  transition: color 0.1s;
}
.numberpad-close:active {
  color: var(--ice);
}
.numberpad-display {
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 800;
  color: var(--accent);
  text-align: center;
  margin-bottom: 28px;
  line-height: 1;
}
.numberpad-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}
.numberpad-btn {
  background: linear-gradient(135deg, var(--accent) 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 28px 16px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
  box-shadow: 0 4px 12px rgba(41, 121, 255, 0.3);
}
.numberpad-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 6px rgba(41, 121, 255, 0.5);
}
.numberpad-actions {
  display: flex;
  gap: 12px;
}
.numberpad-cancel {
  flex: 1;
  background: var(--surface);
  color: var(--text-soft);
  border: 1px solid var(--border-dim);
  border-radius: 14px;
  padding: 16px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.1s;
}
.numberpad-cancel:active {
  background: var(--bg);
}
.numberpad-save {
  flex: 1;
  background: linear-gradient(135deg, #3dd68c 0%, #2dbd72 100%);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 16px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.1s;
  box-shadow: 0 4px 12px rgba(61, 214, 140, 0.3);
}
.numberpad-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`,Qw={card_holder:{title:"Card Holder",icon:"🎫",sub:"Your card is official."},first_shot:{title:"First Shot",icon:"🏒",sub:"Logged your very first shot."},hundred_club:{title:"100 Club",icon:"💯",sub:"100 lifetime shots."},one_k:{title:"1,000 Shots",icon:"🔥",sub:"You crossed 1K."},ten_k:{title:"10,000 Shots",icon:"🏆",sub:"Elite tier. Few get here."},week_streak:{title:"Week Streak",icon:"⚡",sub:"7 days in a row."},month_streak:{title:"Month Streak",icon:"🌟",sub:"30 days in a row."},specialty_found:{title:"Found Your Shot",icon:"🎯",sub:"A specialty showed up."}};function Xw({codes:e,onDismiss:t}){const[r,s]=y.useState(0);if(y.useEffect(()=>{s(0)},[e]),!e||e.length===0)return null;const a=e[r],i=Qw[a];if(!i)return setTimeout(()=>o(),0),null;function o(){r+1>=e.length?t():s(r+1)}const l=async c=>{c.stopPropagation();const d=`Just unlocked "${i.title}" ${i.icon} on Hockey Shot Challenge — ${i.sub} hockeyshotchallenge.com`;if(navigator.share)try{await navigator.share({text:d})}catch{}else await navigator.clipboard.writeText(d)};return n.jsxs("div",{onClick:o,className:"ach-overlay",children:[n.jsx("div",{className:"ach-kicker",children:"ACHIEVEMENT UNLOCKED"}),n.jsx("div",{className:"ach-icon",children:i.icon}),n.jsx("div",{className:"ach-title",children:i.title}),n.jsx("div",{className:"ach-sub",children:i.sub}),n.jsxs("div",{className:"ach-quote",children:['"',Mw(a),'"']}),n.jsx("button",{className:"ach-share",onClick:l,children:"Share ↗"}),n.jsx("div",{className:"ach-tap",children:e.length>1?`${r+1} of ${e.length} — tap to continue`:"Tap anywhere to continue"}),n.jsx("style",{children:`
        .ach-overlay {
          position: fixed; inset: 0;
          background: rgba(10, 14, 26, 0.96);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 9999;
          cursor: pointer;
          padding: 24px;
          animation: achFade 0.3s ease-out;
        }
        .ach-kicker {
          font-size: 11px;
          color: var(--ice, #a8d4f5);
          letter-spacing: 3px;
          margin-bottom: 32px;
          font-weight: 600;
        }
        .ach-icon {
          font-size: 110px;
          margin-bottom: 20px;
          animation: achPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 0 24px rgba(41, 121, 255, 0.6));
        }
        .ach-title {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 800;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          text-align: center;
          line-height: 1;
        }
        .ach-sub {
          color: var(--ice, #a8d4f5);
          font-size: 15px;
          margin-bottom: 28px;
          text-align: center;
        }
        .ach-quote {
          background: rgba(41, 121, 255, 0.15);
          border: 0.5px solid rgba(41, 121, 255, 0.4);
          border-radius: 12px;
          padding: 12px 20px;
          max-width: 320px;
          text-align: center;
          color: #fff;
          font-style: italic;
          font-size: 14px;
          margin-bottom: 32px;
          line-height: 1.4;
        }
        .ach-share {
          background: rgba(41,121,255,0.2);
          border: 1px solid rgba(41,121,255,0.5);
          color: var(--ice, #a8d4f5);
          font-size: 14px; font-weight: 700;
          border-radius: 10px; padding: 10px 24px;
          cursor: pointer; margin-bottom: 24px;
        }
        .ach-share:active { opacity: 0.7; }
        .ach-tap {
          color: var(--text-mute, #6b7a99);
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        @keyframes achFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes achPop {
          0% { transform: scale(0); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `})]})}const Zw=["Wrist","Snap","Slap","Backhand"],e1=["Saves"],t1={Wrist:"🎯",Snap:"⚡",Slap:"💥",Backhand:"🔄",Saves:"🧤","Toe Drag":"👟","Figure 8":"8️⃣",Lateral:"↔️","One-Hand":"✋"};function r1(){var $;const{player:e,refresh:t}=Ft(),[r,s]=y.useState({todayTotal:0,weekTotal:0,todayByType:{}}),[a,i]=y.useState(null),[o,l]=y.useState(null),[c,d]=y.useState([]),[h,u]=y.useState(""),[p,x]=y.useState([]),[v,b]=y.useState(0),[w,g]=y.useState([]),[f,m]=y.useState(0),[k,N]=y.useState(!1),[S,_]=y.useState(null),[D,q]=y.useState(0),[T,Q]=y.useState(null),de=(e==null?void 0:e.position)==="G"?e1:Zw;y.useEffect(()=>{e&&(he(),Kb(e.team_id,e.id).then(i).catch(()=>{}),em().then(g).catch(()=>{}),Jb(e.id).then(m).catch(()=>{}),e.team_id&&Promise.all([Xf(e.team_id),Zf(e.team_id),Ow(e.id,e.team_id,e.club_id)]).then(([C,L,O])=>{_(C),q(L),Q(O)}).catch(C=>{console.error("Battle/challenge load error:",C)}))},[e]);const he=async()=>{if(!e)return;const C=await qb(e.id);s(C)};y.useEffect(()=>{if(!e)return;const C=setInterval(()=>{t()},4e3);return()=>clearInterval(C)},[e,t]);const Be=y.useMemo(()=>ra((e==null?void 0:e.lifetime_shots)||0),[e==null?void 0:e.lifetime_shots]);y.useMemo(()=>{if(!e)return"";const C=new Date().toISOString().slice(0,10),L=e.current_streak>0?"daily_greeting":"daily_greeting_no_streak";return Fw(L,`${e.id}-${C}`,{name:e.display_name,streak:e.current_streak||1})},[e]);const Ge=async(C,L)=>{if(!(!L||L<=0)){l(null),s(O=>({...O,todayTotal:O.todayTotal+L,weekTotal:O.weekTotal+L,todayByType:{...O.todayByType,[C]:(O.todayByType[C]||0)+L}})),d(O=>[...O.slice(-9),{type:C,count:L,ts:Date.now()}]),navigator.vibrate&&navigator.vibrate(20);try{await Hu({playerId:e.id,shotType:C,count:L}),setTimeout(he,400),b(be=>be+1);const O=r.todayTotal+L,W=e.daily_goal||50,M=e.lifetime_shots+L;O===W?V("🔥 Daily goal reached!"):O===100?V("💪 100 shots today!"):O===50&&V("⭐ 50 shots!");const G=[250,500,1e3,2500,5e3];for(const be of G)if(M===be){V(`${{250:"🥈",500:"🥇",1e3:"💎",2500:"👑",5e3:"🏆"}[be]} ${be.toLocaleString()} TOTAL SHOTS!`);break}["Wrist","Snap","Slap","Backhand","Saves"].includes(C)&&O>f&&f>0&&(m(O),N(!0),setTimeout(()=>N(!1),4e3));const se=await Gw(e.id);se.length>0&&x(se)}catch(O){console.error("Shot log error:",O),s(W=>({...W,todayTotal:Math.max(0,W.todayTotal-L),weekTotal:Math.max(0,W.weekTotal-L),todayByType:{...W.todayByType,[C]:Math.max(0,(W.todayByType[C]||0)-L)}})),d(W=>W.slice(0,-1)),V("Save failed: "+(O.message||"Unknown error"))}}},je=async()=>{const C=c[c.length-1];if(C){s(L=>({...L,todayTotal:Math.max(0,L.todayTotal-C.count),weekTotal:Math.max(0,L.weekTotal-C.count),todayByType:{...L.todayByType,[C.type]:Math.max(0,(L.todayByType[C.type]||0)-C.count)}})),d(L=>L.slice(0,-1));try{await Hu({playerId:e.id,shotType:C.type,count:-C.count}),setTimeout(he,400),b(L=>L+1)}catch{V("Undo failed")}}},V=C=>{u(C),setTimeout(()=>u(""),2e3)};if(!e)return null;const I=c[c.length-1],E=!!I;if(a){const C=a.today_shots||0,L=a.week_shots||0,O=r.todayTotal-C;r.weekTotal-L;const W=L>0?`${L.toLocaleString()} this week`:"no shots this week";C===0?`${a.display_name}${W}`:O>0?`${a.display_name}${C}`:O<0?`${a.display_name}${C}`:`${a.display_name}${C}`}return n.jsxs("div",{className:"home fade-in",children:[n.jsxs("header",{className:"topbar",children:[n.jsxs("div",{className:"me",children:[n.jsx("div",{className:"avatar",children:($=e.display_name[0])==null?void 0:$.toUpperCase()}),n.jsxs("div",{children:[n.jsx("div",{className:"me-name",children:e.display_name}),n.jsx("div",{className:"me-sub",children:Be.fullName})]})]}),e.current_streak>0&&n.jsxs("div",{className:"streak",children:[n.jsx(n1,{}),n.jsx("span",{className:"tnum",children:e.current_streak})]})]}),e.lifetime_shot_goal&&(()=>{const C=e.daily_goal||50,L=r.todayTotal>=C,O=[{name:"🥉 Bronze",threshold:0,nextThreshold:250},{name:"🥈 Silver",threshold:250,nextThreshold:500},{name:"🥇 Gold",threshold:500,nextThreshold:1e3},{name:"💎 Platinum",threshold:1e3,nextThreshold:2500},{name:"👑 LEGEND",threshold:2500,nextThreshold:5e3}],W=e.lifetime_shots+r.todayTotal,M=O.find(R=>W>=R.threshold&&W<R.nextThreshold)||O[O.length-1],G=M.nextThreshold-W,ne=Math.round((W-M.threshold)/(M.nextThreshold-M.threshold)*100);let se="";if(e.lifetime_shot_goal_date){const R=new Date;R.setHours(0,0,0,0);const pe=new Date(e.lifetime_shot_goal_date);pe.setHours(0,0,0,0);const Pe=Math.ceil((pe-R)/(1e3*60*60*24)),Re=Math.max(0,e.lifetime_shot_goal-W);if(Pe>0){const We=Math.ceil(Re/Pe),Pt=new Date(e.lifetime_shot_goal_date).toLocaleDateString("en-US",{month:"short",day:"numeric"});Re>0?se=`You need ${We} shots/day to hit ${e.lifetime_shot_goal.toLocaleString()} by ${Pt}`:se="🎉 Goal reached!"}else Pe===0?se=`Goal target is today! Need ${Re.toLocaleString()} more shots`:se="Target date passed — keep grinding!"}const be=["🚀 You're crushing it!","💪 Keep pushing!","🔥 Unstoppable!","⚡ On fire!","✨ You're amazing!"],Ke=be[Math.floor(W/100)%be.length];return n.jsxs("div",{style:{padding:"16px 14px 8px",marginBottom:8},children:[n.jsxs("div",{style:{marginBottom:12},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[n.jsx("div",{style:{fontSize:16,fontWeight:700},children:M.name}),n.jsxs("div",{style:{fontSize:12,fontWeight:600,color:"var(--accent)"},children:[G.toLocaleString()," to ",M.nextThreshold]})]}),n.jsx("div",{style:{width:"100%",height:8,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden",marginBottom:8},children:n.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, var(--accent) 0%, #2563eb 100%)",width:`${Math.min(100,ne)}%`,transition:"width 0.5s ease"}})}),n.jsx("div",{style:{fontSize:12,fontWeight:600,color:"var(--ice)",fontFamily:"var(--font-display)"},children:Ke})]}),n.jsxs("div",{style:{padding:12,background:L?"rgba(61, 214, 140, 0.15)":"rgba(41, 121, 255, 0.15)",border:`1.5px solid ${L?"rgba(61, 214, 140, 0.4)":"rgba(41, 121, 255, 0.4)"}`,borderRadius:10,display:"flex",alignItems:"center",gap:10,marginBottom:se?12:0},children:[n.jsx("input",{type:"checkbox",checked:L,disabled:!0,style:{width:18,height:18,cursor:"not-allowed",flexShrink:0}}),n.jsxs("div",{style:{flex:1},children:[n.jsx("div",{style:{fontSize:13,fontWeight:700,color:L?"#3dd68c":"white",marginBottom:2},children:"Today's Challenge"}),n.jsx("div",{style:{fontSize:12,color:"var(--text-soft)"},children:L?"✓ Goal met!":`${C} wrist shots`})]})]}),se&&n.jsx("div",{style:{padding:12,background:"rgba(156, 163, 175, 0.1)",border:"1.5px solid rgba(156, 163, 175, 0.3)",borderRadius:10,fontSize:13,fontWeight:600,color:"var(--ice)",textAlign:"center"},children:se})]})})(),(()=>{const C=e.lifetime_shots+r.todayTotal,L=1e4,O=Math.round(C/L*100),W=Math.max(0,L-C);return n.jsxs("div",{style:{margin:"16px 14px",padding:"16px",background:"linear-gradient(135deg, rgba(61, 214, 140, 0.15) 0%, rgba(41, 121, 255, 0.1) 100%)",border:"1.5px solid rgba(61, 214, 140, 0.3)",borderRadius:12},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:12,fontWeight:700,color:"var(--accent)",marginBottom:4},children:"🏒 10K CHALLENGE"}),n.jsxs("div",{style:{fontSize:18,fontWeight:800,color:"white"},children:[C.toLocaleString(),n.jsx("span",{style:{fontSize:14,color:"var(--text-soft)"},children:" / 10,000"})]})]}),n.jsxs("div",{style:{textAlign:"right"},children:[n.jsxs("div",{style:{fontSize:24,fontWeight:800,color:"var(--accent)"},children:[O,"%"]}),n.jsxs("div",{style:{fontSize:11,color:"var(--text-soft)",marginTop:2},children:[W.toLocaleString()," shots left"]})]})]}),n.jsx("div",{style:{width:"100%",height:12,background:"rgba(0,0,0,0.2)",borderRadius:6,overflow:"hidden",marginBottom:12},children:n.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, #3dd68c 0%, #2dbd72 100%)",width:`${Math.min(100,O)}%`,transition:"width 0.5s ease"}})}),n.jsx("div",{style:{fontSize:13,color:"var(--ice)",fontWeight:600},children:C>=L?"🎉 You hit 10,000! Keep going for 20K!":`${Math.ceil(W/7)} shots/week to finish by summer end`})]})})(),e.lifetime_shots===0&&n.jsxs("div",{className:"first-time-nudge",children:[n.jsx("div",{className:"ftn-title",children:"Log your first shots 🏒"}),n.jsx("div",{className:"ftn-body",children:"Tap any shot type below to get on the board. Every rep counts toward your rank."})]}),n.jsx("div",{style:{margin:"0 14px 12px",textAlign:"center"},children:n.jsx("div",{style:{fontSize:12,color:"var(--text-mute)",textTransform:"uppercase",letterSpacing:.5},children:"TAP A SHOT TYPE TO LOG IT"})}),n.jsx("div",{className:"shots-grid",children:de.map(C=>{const L=r.todayByType[C]||0;return n.jsxs("button",{className:"shot-card",onClick:()=>l(C),children:[n.jsxs("div",{className:"shot-name",children:[t1[C]," ",C]}),n.jsx("div",{className:"shot-value tnum",children:L}),n.jsx("div",{className:"shot-hint",children:"today"})]},C)})}),n.jsx("div",{style:{margin:"8px 14px"},children:n.jsxs("button",{onClick:()=>l("Stickhandling"),style:{width:"100%",padding:"12px 14px",background:"var(--surface)",border:"0.5px solid var(--border-dim)",borderRadius:12,display:"flex",alignItems:"center",gap:12,cursor:"pointer",transition:"all 0.15s"},onMouseDown:C=>C.currentTarget.style.transform="scale(0.98)",onMouseUp:C=>C.currentTarget.style.transform="scale(1)",children:[n.jsx("div",{style:{fontSize:20},children:"🏑"}),n.jsxs("div",{style:{flex:1,textAlign:"left"},children:[n.jsx("div",{style:{fontSize:13,fontWeight:600,color:"white"},children:"Stickhandling"}),n.jsxs("div",{style:{fontSize:11,color:"var(--text-mute)",marginTop:2},children:[(r.todayByType.Stickhandling||0).toLocaleString()," mins today"]})]}),n.jsx("div",{style:{fontSize:20,fontWeight:700,color:"var(--accent)"},children:"→"})]})}),E&&n.jsxs("button",{className:"undo-btn",onClick:je,children:[n.jsx("span",{className:"undo-icon",children:"↩"}),n.jsxs("span",{className:"undo-text",children:[n.jsx("span",{className:"undo-label",children:"Undo last entry"}),n.jsxs("span",{className:"undo-detail",children:["+",I.count," ",I.type]})]})]}),k&&n.jsxs("div",{className:"pb-banner",children:[n.jsxs("span",{children:["🏆 New personal best — ",r.todayTotal," shots today!"]}),n.jsx("button",{className:"pb-share",onClick:async()=>{const C=`New personal best — ${r.todayTotal} shots today! 🏒 #HockeyShotChallenge hockeyshotchallenge.com`;if(navigator.share)try{await navigator.share({text:C})}catch{}else await navigator.clipboard.writeText(C)},children:"Share"})]}),o&&n.jsx(Yw,{type:o,onClose:()=>l(null),onSave:C=>Ge(o,C)}),h&&n.jsx("div",{className:"toast",children:h}),p.length>0&&n.jsx(Xw,{codes:p,onDismiss:()=>x([])}),n.jsx("style",{children:s1})]})}function n1(){return n.jsx("svg",{width:"11",height:"13",viewBox:"0 0 12 14",style:{display:"block"},children:n.jsx("path",{d:"M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z",fill:"#ff7a29"})})}const s1=`
.home { padding: 12px 14px 20px; }
.topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 4px 14px;
}
.me { display: flex; align-items: center; gap: 10px; }
.avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700; color: white;
}
.me-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700;
  letter-spacing: 0.4px; line-height: 1.1;
}
.me-sub { font-size: 11px; color: var(--text-mute); margin-top: 2px; }
.streak {
  display: flex; align-items: center; gap: 5px;
  background: var(--surface);
  padding: 6px 11px; border-radius: 999px;
  font-size: 13px; color: var(--warn-soft); font-weight: 600;
}

.sam {
  background: var(--surface);
  border-left: 2px solid var(--ice);
  border-radius: var(--radius);
  padding: 11px 14px;
  margin-bottom: 14px;
  display: flex; gap: 10px; align-items: center;
}
.sam-bubble {
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--accent-bg);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 13px;
}
.sam-text { font-size: 14px; line-height: 1.4; }

.tap-hint {
  text-align: center;
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 10px;
}
.first-time-nudge {
  background: linear-gradient(135deg, rgba(41,121,255,0.12) 0%, rgba(41,121,255,0.06) 100%);
  border: 0.5px solid rgba(41,121,255,0.35);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-bottom: 14px;
  text-align: center;
}
.ftn-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 800;
  color: white;
  margin-bottom: 5px;
  letter-spacing: 0.3px;
}
.ftn-body {
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.45;
}

.shots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}
.shot-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 18px;
  padding: 18px 16px 14px;
  color: var(--text);
  text-align: left;
  min-height: 120px;
  transition: transform 0.1s, background 0.15s, border-color 0.15s;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
.shot-card:active {
  transform: scale(0.97);
  background: var(--surface-raised);
  border-color: var(--accent);
}
.shot-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700;
  letter-spacing: 0.6px; text-transform: uppercase;
  opacity: 0.9;
}
.shot-value {
  font-family: var(--font-display);
  font-size: 42px; font-weight: 800;
  margin-top: 6px; line-height: 1;
  color: var(--ice);
}
.shot-hint {
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 1px; margin-top: 6px;
  text-transform: uppercase; opacity: 0.7;
}

/* Stickhandling drills */
.stick-section { margin-bottom: 14px; }
.stick-header {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 8px;
}
.stick-hint { font-size: 10px; color: var(--text-mute); letter-spacing: 0.5px; }
.stick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.stick-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 12px 8px;
  text-align: center;
  transition: transform 0.1s, border-color 0.15s;
  -webkit-user-select: none; user-select: none;
}
.stick-card:active {
  transform: scale(0.96);
  border-color: var(--ice);
}
.stick-name {
  font-family: var(--font-display);
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.4px;
  color: var(--text-soft);
  margin-bottom: 6px;
  text-transform: uppercase;
}
.stick-value {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--ice); line-height: 1;
}

.undo-btn {
  width: 100%;
  background: rgba(255, 122, 41, 0.12);
  border: 0.5px solid rgba(255, 122, 41, 0.4);
  color: var(--warn-soft);
  border-radius: var(--radius);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  font-family: inherit;
  transition: all 0.15s;
  animation: fade-in 0.25s ease-out;
}
.undo-btn:active {
  background: rgba(255, 122, 41, 0.18);
  transform: scale(0.99);
}
.undo-icon {
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
}
.undo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}
.undo-label {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.undo-detail {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 1px;
}

.pb-banner {
  background: linear-gradient(135deg, rgba(41,121,255,0.2), rgba(168,212,245,0.1));
  border: 0.5px solid var(--ice);
  border-radius: var(--radius);
  padding: 12px 16px;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: var(--ice);
  letter-spacing: 0.3px;
  margin-bottom: 10px;
  animation: fade-in 0.3s ease-out;
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
}
.pb-share {
  font-size: 12px; font-weight: 700;
  color: var(--ice); border: 1px solid var(--ice);
  border-radius: 6px; padding: 4px 10px;
  background: transparent; cursor: pointer; white-space: nowrap; flex-shrink: 0;
}
.pb-share:active { opacity: 0.7; }

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.stat {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 10px 8px;
  text-align: center;
}
.stat-value {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  line-height: 1; margin-top: 4px;
}


.team-ch-bar {
  margin: 0 20px 12px;
  background: var(--surface);
  border: 1px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px 14px;
}
.team-ch-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.team-ch-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-mute);
}
.team-ch-fraction {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}
.team-ch-track {
  height: 8px;
  background: var(--border-dim);
  border-radius: 99px;
  overflow: hidden;
}
.team-ch-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  border-radius: 99px;
  transition: width 0.5s ease;
  min-width: 4px;
}
.team-ch-done {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ice);
}

.chase {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px 14px;
  display: flex; justify-content: space-between; align-items: center;
  border-left: 2px solid var(--border);
}
.chase--lead { border-left-color: var(--success); }
.chase--chase { border-left-color: var(--warn); }
.chase--neutral { border-left-color: var(--ice); }
.chase-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; margin-top: 2px;
  letter-spacing: 0.3px;
}
.chase-sub {
  font-size: 11px; color: var(--text-mute); margin-top: 2px;
}
.chase-tag {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 800;
  padding: 6px 14px;
  border-radius: 999px;
  letter-spacing: 0.5px;
}
.chase-tag--lead {
  background: rgba(61, 214, 140, 0.15);
  color: var(--success);
}
.chase-tag--chase {
  background: rgba(255, 122, 41, 0.15);
  color: var(--warn-soft);
}
.chase-tag--neutral {
  background: var(--bg);
  color: var(--text-mute);
}

.join-panel {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 14px;
  border-left: 2px solid var(--ice);
  margin-bottom: 12px;
}
.join-text {
  font-size: 13px;
  color: var(--text-soft);
  margin-top: 4px;
  margin-bottom: 10px;
  line-height: 1.4;
}
.join-form {
  display: flex;
  gap: 8px;
}
.join-input {
  flex: 1;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  min-height: 44px;
  -webkit-appearance: none;
}
.join-input:focus {
  outline: none;
  border-color: var(--ice);
}
.join-input::placeholder {
  color: var(--text-mute);
  font-weight: 500;
  letter-spacing: 0.3px;
}
.join-btn {
  background: var(--accent);
  color: white;
  border-radius: 10px;
  padding: 0 18px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  min-height: 44px;
  transition: transform 0.1s;
}
.join-btn:active:not(:disabled) {
  transform: scale(0.97);
}
.join-btn:disabled {
  opacity: 0.4;
}
.join-error {
  font-size: 12px;
  color: var(--warn-soft);
  margin-top: 8px;
  line-height: 1.4;
}

.solo {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px 14px;
  border-left: 2px solid var(--border);
}
.solo-text {
  font-size: 13px;
  color: var(--text-soft);
  margin-top: 4px;
  line-height: 1.4;
}

.pad-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fade-in 0.15s ease-out;
}
.pad-sheet {
  width: 100%;
  max-width: 430px;
  background: var(--surface);
  border-top: 0.5px solid var(--border);
  border-radius: 24px 24px 0 0;
  padding: 18px 16px calc(20px + var(--safe-bottom));
  animation: slide-up 0.25s ease-out;
}
.pad-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 10px;
}
.pad-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-top: 2px;
  text-transform: uppercase;
}
.pad-close {
  background: var(--bg);
  width: 32px; height: 32px;
  border-radius: 50%;
  color: var(--text-mute);
  font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.pad-display {
  background: var(--bg);
  border-radius: var(--radius);
  padding: 22px 16px;
  text-align: center;
  margin-bottom: 10px;
}
.pad-value {
  font-family: var(--font-display);
  font-size: clamp(48px, 14vw, 64px);
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
  letter-spacing: 1px;
}

.pad-quick {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 12px;
}
.pad-quick-btn {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--ice);
  padding: 10px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: all 0.1s;
}
.pad-quick-btn:active {
  background: var(--accent);
  color: white;
  transform: scale(0.96);
}

.pad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 12px;
}
.pad-btn {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--text);
  padding: 18px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  min-height: 56px;
  transition: all 0.08s;
}
.pad-btn:active {
  background: var(--accent);
  color: white;
  transform: scale(0.96);
}
.pad-btn--sm {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-mute);
  letter-spacing: 0.3px;
}
.pad-btn--sm:active {
  background: var(--surface);
  color: var(--text);
  transform: scale(0.96);
}

.pad-save {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 16px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  min-height: 52px;
}
.pad-save:disabled {
  opacity: 0.35;
}

.toast {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 16px;
  color: var(--text);
  font-size: 13px;
  z-index: 200;
  animation: fade-in 0.2s ease-out;
}

/* Drill of the Day */
.drill-section { margin-bottom: 14px; }
.drill-card {
  display: flex; gap: 12px; align-items: center;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text);
  transition: border-color 0.15s;
}
.drill-card:active { border-color: var(--accent); }
.drill-thumb-wrap {
  position: relative;
  flex-shrink: 0;
  width: 120px; height: 80px;
  background: var(--bg);
}
.drill-thumb {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
.drill-play {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.4);
  color: white; font-size: 20px;
}
.drill-info {
  flex: 1; min-width: 0;
  padding: 12px 12px 12px 0;
  display: flex; flex-direction: column; gap: 3px;
}
.drill-badge { font-size: 10px; color: var(--text-mute); }
.drill-title {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white; letter-spacing: 0.2px;
  line-height: 1.25;
}
.drill-cta {
  font-size: 12px; font-weight: 600;
  color: var(--ice); margin-top: 2px;
}

.videos-section { margin-bottom: 14px; }
.videos-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
.videos-scroll::-webkit-scrollbar { display: none; }
.video-card {
  flex-shrink: 0;
  width: 156px;
  text-decoration: none;
  color: var(--text);
  display: block;
}
.video-thumb-wrap {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 6px;
  aspect-ratio: 16 / 9;
  background: var(--surface);
}
.video-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.video-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  color: white;
  font-size: 22px;
}
.video-title {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  color: white;
  line-height: 1.25;
  letter-spacing: 0.2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 3px;
}
.video-badge {
  font-size: 10px;
  color: var(--text-mute);
}
`;function a1(){const[e,t]=y.useState([]),[r,s]=y.useState(!0);y.useEffect(()=>{em().then(t).catch(l=>{console.error("Failed to load videos:",l),t([])}).finally(()=>s(!1))},[]);const a=Math.floor(Date.now()/864e5),i=e.length>0?e[a%e.length]:null,o=i?e.filter(l=>l.id!==i.id):e;return n.jsxs("div",{className:"videos-screen fade-in",children:[n.jsxs("header",{className:"videos-header",children:[n.jsx("h1",{className:"videos-title",children:"Practice drills"}),n.jsx("div",{className:"videos-sub",children:"Watch and then put it on the wall 🎯"})]}),r&&n.jsx("div",{className:"videos-loading",children:"Loading drills…"}),!r&&i&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"featured-drill",children:[n.jsx("div",{className:"label-sm",style:{marginBottom:8,paddingLeft:14},children:"Drill of the day"}),n.jsxs("a",{href:`https://www.youtube.com/watch?v=${i.youtube_id}`,target:"_blank",rel:"noopener noreferrer",className:"featured-card",children:[n.jsxs("div",{className:"featured-thumb-wrap",children:[n.jsx("img",{src:`https://img.youtube.com/vi/${i.youtube_id}/mqdefault.jpg`,alt:i.title,className:"featured-thumb",loading:"lazy"}),n.jsx("div",{className:"featured-play",children:"▶"})]}),n.jsxs("div",{className:"featured-info",children:[n.jsx("div",{className:"featured-badge",children:i.skill_type==="shooting"?"🥅 Shooting":"🏑 Stickhandling"}),n.jsx("div",{className:"featured-title",children:i.title}),n.jsx("div",{className:"featured-cta",children:"Watch on YouTube →"})]})]})]}),o.length>0&&n.jsxs("div",{className:"more-drills",children:[n.jsx("div",{className:"label-sm",style:{marginBottom:8,paddingLeft:14},children:"More drills"}),n.jsx("div",{className:"drills-list",children:o.map(l=>n.jsxs("a",{href:`https://www.youtube.com/watch?v=${l.youtube_id}`,target:"_blank",rel:"noopener noreferrer",className:"drill-item",children:[n.jsxs("div",{className:"drill-thumb-wrap",children:[n.jsx("img",{src:`https://img.youtube.com/vi/${l.youtube_id}/mqdefault.jpg`,alt:l.title,className:"drill-thumb",loading:"lazy"}),n.jsx("div",{className:"drill-play-overlay",children:"▶"})]}),n.jsxs("div",{className:"drill-meta",children:[n.jsx("div",{className:"drill-title",children:l.title}),n.jsx("div",{className:"drill-badge",children:l.skill_type==="shooting"?"🥅 Shooting":"🏑 Stickhandling"})]})]},l.id))})]})]}),!r&&e.length===0&&n.jsxs("div",{className:"videos-empty",children:[n.jsx("div",{className:"videos-empty-icon",children:"🎬"}),n.jsx("div",{className:"videos-empty-text",children:"No drills yet"})]}),n.jsx("style",{children:`
        .videos-screen { padding: 14px 0 90px; }
        .videos-header {
          padding: 12px 14px 20px;
          border-bottom: 0.5px solid var(--border-dim);
        }
        .videos-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 4px;
          line-height: 1;
        }
        .videos-sub {
          font-size: 13px;
          color: var(--text-mute);
          margin: 0;
        }
        .videos-loading {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-mute);
          font-size: 14px;
        }
        .featured-drill { margin: 14px 0; }
        .featured-card {
          display: block;
          margin: 0 14px;
          background: var(--surface);
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          border: 0.5px solid var(--border-dim);
          transition: transform 0.15s;
        }
        .featured-card:active { transform: scale(0.98); }
        .featured-thumb-wrap {
          position: relative;
          padding-top: 56.25%;
          background: #000;
        }
        .featured-thumb {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .featured-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          background: rgba(0, 0, 0, 0.2);
          color: white;
        }
        .featured-info { padding: 14px; }
        .featured-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-mute);
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }
        .featured-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .featured-cta {
          font-size: 12px;
          color: var(--accent);
          font-weight: 600;
        }
        .more-drills { padding: 20px 14px 0; }
        .drills-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .drill-item {
          display: flex;
          gap: 12px;
          background: var(--surface);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          border: 0.5px solid var(--border-dim);
          transition: transform 0.15s;
        }
        .drill-item:active { transform: scale(0.98); }
        .drill-thumb-wrap {
          position: relative;
          width: 100px;
          height: 56px;
          flex-shrink: 0;
          background: #000;
        }
        .drill-thumb {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .drill-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: rgba(0, 0, 0, 0.2);
          color: white;
        }
        .drill-meta {
          flex: 1;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .drill-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .drill-badge {
          font-size: 10px;
          color: var(--text-mute);
          letter-spacing: 0.5px;
        }
        .videos-empty {
          text-align: center;
          padding: 80px 20px;
        }
        .videos-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .videos-empty-text {
          color: var(--text-mute);
          font-size: 14px;
        }
      `})]})}function i1({playerId:e}){const[t,r]=y.useState([]),[s,a]=y.useState(!1);if(y.useEffect(()=>{if(!e)return;let o=!0;return Hw(e).then(l=>{o&&(r(l),a(!0))}),()=>{o=!1}},[e]),!s)return null;const i=Math.max(...t.map(o=>o.shots),10);return n.jsxs("div",{className:"chart-wrap",children:[n.jsx("div",{className:"chart-label",children:"LAST 7 DAYS"}),n.jsx("div",{className:"chart-bars",children:t.map(o=>{const l=i>0?Math.max(2,o.shots/i*100):2;return n.jsxs("div",{className:"chart-col",children:[n.jsx("div",{className:"chart-num",children:o.shots}),n.jsx("div",{className:"chart-bar-track",children:n.jsx("div",{className:`chart-bar ${o.isToday?"chart-bar--today":""} ${o.goalMet?"chart-bar--goal":""}`,style:{height:`${l}%`}})}),n.jsx("div",{className:`chart-day ${o.isToday?"chart-day--today":""}`,children:o.day})]},o.date)})}),n.jsx("style",{children:`
        .chart-wrap {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 14px;
          margin-bottom: 14px;
        }
        .chart-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          color: var(--text-mute);
          font-weight: 600;
          margin-bottom: 12px;
        }
        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 6px;
          height: 130px;
        }
        .chart-col {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center;
          height: 100%;
        }
        .chart-num {
          font-size: 10px;
          color: var(--text-mute);
          font-weight: 600;
          margin-bottom: 4px;
          height: 14px;
        }
        .chart-bar-track {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .chart-bar {
          width: 100%;
          background: rgba(168,212,245,0.25);
          border-radius: 4px 4px 0 0;
          transition: height 0.5s ease;
          min-height: 2px;
        }
        .chart-bar--goal { background: var(--success, #3dd68c); }
        .chart-bar--today {
          background: var(--accent, #2979ff);
          box-shadow: 0 0 12px rgba(41,121,255,0.4);
        }
        .chart-bar--today.chart-bar--goal {
          background: var(--success, #3dd68c);
          box-shadow: 0 0 12px rgba(61,214,140,0.4);
        }
        .chart-day {
          font-size: 10px;
          color: var(--text-mute);
          margin-top: 6px;
          letter-spacing: 0.5px;
        }
        .chart-day--today {
          color: var(--ice);
          font-weight: 700;
        }
      `})]})}function o1({playerId:e}){const[t,r]=y.useState([]);if(y.useEffect(()=>{if(!e)return;let a=!0;return qw(e).then(i=>{a&&r(i)}),()=>{a=!1}},[e]),t.length===0)return null;const s=t.filter(a=>a.unlocked).length;return n.jsxs("div",{className:"badges-wrap",children:[n.jsxs("div",{className:"badges-header",children:[n.jsx("div",{className:"badges-label",children:"ACHIEVEMENTS"}),n.jsxs("div",{className:"badges-count",children:[s," / ",t.length]})]}),n.jsx("div",{className:"badges-row",children:t.map(a=>n.jsxs("div",{className:`badge ${a.unlocked?"badge--unlocked":"badge--locked"}`,title:a.unlocked?a.title:`Locked — ${a.description}`,children:[n.jsx("div",{className:"badge-icon",children:a.unlocked?a.icon:"🔒"}),n.jsx("div",{className:"badge-name",children:a.title})]},a.code))}),n.jsx("style",{children:`
        .badges-wrap {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 14px;
          margin-bottom: 14px;
        }
        .badges-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 12px;
        }
        .badges-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          color: var(--text-mute);
          font-weight: 600;
        }
        .badges-count {
          font-size: 11px;
          color: var(--ice);
          font-weight: 700;
          font-family: var(--font-display);
          letter-spacing: 0.5px;
        }
        .badges-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .badge {
          display: flex; flex-direction: column; align-items: center;
          padding: 8px 4px;
          border-radius: 10px;
          text-align: center;
        }
        .badge--unlocked {
          background: rgba(41,121,255,0.08);
          border: 0.5px solid rgba(41,121,255,0.3);
        }
        .badge--locked {
          background: rgba(168,212,245,0.04);
          opacity: 0.45;
        }
        .badge-icon {
          font-size: 22px;
          margin-bottom: 4px;
          filter: var(--badge-filter, none);
        }
        .badge--locked .badge-icon { filter: grayscale(1); }
        .badge-name {
          font-size: 11px;
          color: var(--text-soft);
          line-height: 1.2;
          font-weight: 500;
          letter-spacing: 0.2px;
        }
      `})]})}function l1(){var w;const{player:e}=Ft(),[t,r]=y.useState(null),[s,a]=y.useState(""),i=y.useRef(null);y.useEffect(()=>{e&&Kf(e.id).then(r)},[e]);const o=y.useMemo(()=>ra((e==null?void 0:e.lifetime_shots)||0),[e==null?void 0:e.lifetime_shots]);if(!e)return null;const l=e.created_at?new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—",c=e.card_number||0,d=String(c).padStart(3,"0"),h=e.position==="F"?"Forward":e.position==="D"?"Defense":"Goalie",u=t?Object.values(t).reduce((g,f)=>g+f,0):0,p=g=>u>0?Math.round(g/u*100):0,x=t?[{name:"Wrist",val:t.Wrist,pct:p(t.Wrist),color:"#2979ff"},{name:"Snap",val:t.Snap,pct:p(t.Snap),color:"#a8d4f5"},{name:"Slap",val:t.Slap,pct:p(t.Slap),color:"#ff7a29"},{name:"Backhand",val:t.Backhand,pct:p(t.Backhand),color:"#3dd68c"}].filter(g=>g.val>0):[];let v=null;if(x.length>0){const g=[...x].sort((f,m)=>m.pct-f.pct)[0];g.pct>=50?v=`${g.name} specialist`:x.length>=3?v="Balanced shooter":v=`${g.name} focused`}const b=async()=>{a("copying");try{const g=`${window.location.origin}/card/${e.username}`;navigator.share?(await navigator.share({title:`${e.display_name} on Hockey Shot Challenge`,text:`${o.fullName} · ${e.lifetime_shots.toLocaleString()} shots`,url:g}),a("")):(await navigator.clipboard.writeText(g),a("copied"),setTimeout(()=>a(""),2e3))}catch{a("")}};return n.jsxs("div",{className:"card-screen fade-in",children:[n.jsxs("header",{className:"card-header",children:[n.jsx("h1",{className:"card-title",children:"My card"}),n.jsx("button",{className:"share-link",onClick:b,children:s==="copied"?"✓ Link copied":"Share ↗"})]}),n.jsxs("div",{ref:i,className:"player-card",children:[n.jsx("div",{className:"player-card-bg",children:n.jsxs("svg",{viewBox:"0 0 320 220",preserveAspectRatio:"none",style:{width:"100%",height:"100%"},children:[n.jsx("path",{d:"M -20 140 Q 80 110, 180 150 T 360 130",stroke:"#a8d4f5",strokeWidth:"0.5",fill:"none",opacity:"0.3"}),n.jsx("path",{d:"M -20 160 Q 100 130, 200 170 T 360 150",stroke:"#a8d4f5",strokeWidth:"0.5",fill:"none",opacity:"0.25"}),n.jsx("path",{d:"M -20 180 Q 120 150, 220 190 T 360 170",stroke:"#a8d4f5",strokeWidth:"0.5",fill:"none",opacity:"0.2"}),n.jsx("circle",{cx:"40",cy:"40",r:"1",fill:"#a8d4f5",opacity:"0.6"}),n.jsx("circle",{cx:"280",cy:"30",r:"1",fill:"#a8d4f5",opacity:"0.5"}),n.jsx("circle",{cx:"180",cy:"50",r:"0.8",fill:"#a8d4f5",opacity:"0.5"}),n.jsx("circle",{cx:"80",cy:"70",r:"0.8",fill:"#a8d4f5",opacity:"0.4"}),n.jsx("circle",{cx:"290",cy:"80",r:"1",fill:"#a8d4f5",opacity:"0.5"})]})}),n.jsxs("div",{className:"player-card-content",children:[n.jsxs("div",{className:"card-meta",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"card-meta-label",children:["HOCKEY SHOT CHALLENGE · ",new Date().getFullYear()]}),n.jsxs("div",{className:"card-meta-handle",children:["@",e.username]})]}),n.jsxs("div",{style:{textAlign:"right"},children:[n.jsx("div",{className:"card-meta-label",children:"CARD"}),n.jsxs("div",{className:"card-meta-serial tnum",children:["#",d]})]})]}),n.jsxs("div",{className:"card-identity",children:[n.jsxs("div",{className:"card-avatar",children:[n.jsxs("svg",{viewBox:"0 0 80 80",style:{width:"100%",height:"100%"},children:[n.jsx("polygon",{points:"40,4 72,22 72,58 40,76 8,58 8,22",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1.5"}),n.jsx("polygon",{points:"40,12 66,26 66,54 40,68 14,54 14,26",fill:"none",stroke:"#4a92ff",strokeWidth:"0.5",opacity:"0.6"})]}),n.jsx("div",{className:"card-avatar-letters",children:e.display_name.slice(0,2).toUpperCase()})]}),n.jsxs("div",{className:"card-identity-text",children:[n.jsx("div",{className:"card-display-name",children:e.display_name}),n.jsxs("div",{className:"card-pills",children:[n.jsx("div",{className:"card-pill",children:h.toUpperCase()}),((w=e.team)==null?void 0:w.name)&&n.jsx("div",{className:"card-pill",children:e.team.name}),e.club_name&&n.jsx("div",{className:"card-pill card-pill--club",children:e.club_name})]})]})]}),n.jsxs("div",{className:"card-rank",children:[n.jsxs("div",{className:"card-rank-row",children:[n.jsxs("div",{children:[n.jsx("div",{className:"card-meta-label",children:"Current rank"}),n.jsxs("div",{className:"card-rank-name-row",children:[n.jsx(eh,{rank:o.name}),n.jsxs("div",{className:"card-rank-name",children:[o.name," ",n.jsx("span",{className:"card-rank-tier",children:o.tier})]})]})]}),!o.isMax&&n.jsxs("div",{style:{textAlign:"right"},children:[n.jsx("div",{className:"card-meta-label",children:"NEXT"}),n.jsx("div",{className:"card-rank-next",children:o.nextRankName}),n.jsxs("div",{className:"card-rank-togo tnum",children:[o.shotsToNextRank.toLocaleString()," to go"]})]})]}),!o.isMax&&n.jsx("div",{className:"card-rank-bar",children:n.jsx("div",{className:"card-rank-bar-fill",style:{width:`${Math.round(o.progress*100)}%`}})})]}),n.jsxs("div",{className:"card-stats",children:[n.jsxs("div",{className:"card-stat",children:[n.jsx("div",{className:"card-stat-num tnum",children:e.lifetime_shots.toLocaleString()}),n.jsx("div",{className:"card-stat-label",children:"Lifetime"})]}),n.jsxs("div",{className:"card-stat",children:[n.jsxs("div",{className:"card-stat-num-row",children:[e.current_streak>0&&n.jsx(c1,{}),n.jsx("div",{className:"card-stat-num tnum",children:e.current_streak})]}),n.jsx("div",{className:"card-stat-label",children:"Streak"})]}),n.jsxs("div",{className:"card-stat",children:[n.jsx("div",{className:"card-stat-num",children:e.position}),n.jsx("div",{className:"card-stat-label",children:"Position"})]})]}),x.length>0&&n.jsxs("div",{className:"card-mix",children:[n.jsxs("div",{className:"card-mix-head",children:[n.jsx("div",{className:"card-meta-label",children:"Shot mix · lifetime"}),v&&n.jsx("div",{className:"card-specialty",children:v})]}),n.jsx("div",{className:"card-mix-bar",children:x.map(g=>n.jsx("div",{style:{width:`${g.pct}%`,background:g.color}},g.name))}),n.jsx("div",{className:"card-mix-legend",children:x.map(g=>n.jsxs("div",{className:"card-mix-item",children:[n.jsx("span",{style:{color:g.color},children:"●"}),n.jsxs("span",{children:[g.name," ",g.pct,"%"]})]},g.name))})]}),n.jsxs("div",{className:"card-footer",children:[n.jsxs("div",{children:[n.jsx("div",{className:"card-meta-label",children:"Joined"}),n.jsx("div",{className:"card-footer-text",children:l})]}),n.jsx("div",{className:"card-meta-label",children:"HSC"})]})]})]}),n.jsx(i1,{playerId:e.id}),n.jsx(o1,{playerId:e.id}),n.jsxs("div",{className:"rank-ladder",children:[n.jsx("div",{className:"label-sm",style:{marginBottom:8,padding:"0 4px"},children:"The ladder"}),n.jsx("div",{className:"rank-ladder-rows",children:Xa.map(g=>{const f=e.lifetime_shots>=g.floor,m=o.name===g.name;return n.jsxs("div",{className:`ladder-row ${m?"ladder-row--current":""} ${f?"":"ladder-row--locked"}`,children:[n.jsx("div",{className:"ladder-icon",children:n.jsx(eh,{rank:g.name,small:!0})}),n.jsx("div",{className:"ladder-name",children:g.name}),n.jsx("div",{className:"ladder-range tnum",children:g.next===1/0?`${g.floor.toLocaleString()}+`:`${g.floor.toLocaleString()}–${g.next.toLocaleString()}`}),m&&n.jsx("div",{className:"ladder-current-tag",children:"You"})]},g.name)})})]}),n.jsx("style",{children:d1})]})}function eh({rank:e,small:t}){const r=t?16:22,s={width:r,height:r};switch(e){case"Rookie":return n.jsx("svg",{...s,viewBox:"0 0 16 16",children:n.jsx("circle",{cx:"8",cy:"8",r:"6",fill:"#a8d4f5",opacity:"0.7"})});case"Junior":return n.jsx("svg",{...s,viewBox:"0 0 16 16",children:n.jsx("polygon",{points:"8,2 14,14 2,14",fill:"#a8d4f5"})});case"Prospect":return n.jsx("svg",{...s,viewBox:"0 0 16 16",children:n.jsx("polygon",{points:"8,2 14,5 14,11 8,14 2,11 2,5",fill:"#7f77dd"})});case"Varsity":return n.jsx("svg",{...s,viewBox:"0 0 24 24",children:n.jsx("polygon",{points:"12,2 15,9 22,9 16.5,13.5 18.5,21 12,17 5.5,21 7.5,13.5 2,9 9,9",fill:"#ffb94a"})});case"Captain":return n.jsxs("svg",{...s,viewBox:"0 0 24 24",children:[n.jsx("path",{d:"M 6 4 L 18 4 L 18 10 Q 18 16, 12 19 Q 6 16, 6 10 Z",fill:"#ffb94a",stroke:"#ff9b1a",strokeWidth:"0.5"}),n.jsx("text",{x:"12",y:"14",textAnchor:"middle",fontFamily:"var(--font-display)",fontSize:"10",fontWeight:"700",fill:"#2a2416",children:"C"})]});case"All-Star":return n.jsx("svg",{...s,viewBox:"0 0 16 16",children:n.jsx("polygon",{points:"8,1 9.7,5.4 14.4,5.8 10.8,9 11.9,13.7 8,11.2 4.1,13.7 5.2,9 1.6,5.8 6.3,5.4",fill:"#ffb94a"})});case"Legend":return n.jsxs("svg",{...s,viewBox:"0 0 16 16",children:[n.jsx("path",{d:"M 4 4 L 12 4 L 12 8 Q 12 12, 8 13 Q 4 12, 4 8 Z",fill:"#ffb94a"}),n.jsx("rect",{x:"7.4",y:"1",width:"1.2",height:"3",fill:"#ffb94a"}),n.jsx("rect",{x:"3",y:"3",width:"10",height:"1.5",fill:"#ffb94a"})]});default:return n.jsx("svg",{...s,viewBox:"0 0 16 16",children:n.jsx("circle",{cx:"8",cy:"8",r:"6",fill:"#a8d4f5"})})}}function c1(){return n.jsx("svg",{width:"14",height:"16",viewBox:"0 0 12 14",style:{display:"block"},children:n.jsx("path",{d:"M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z",fill:"#ff7a29"})})}const d1=`
.card-screen { padding: 14px 14px 30px; }
.card-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 4px 4px 14px;
}
.card-title {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 700;
  letter-spacing: 0.5px;
}
.share-link {
  background: transparent;
  color: var(--ice);
  font-size: 13px; font-weight: 500;
  padding: 6px 12px;
  border-radius: 999px;
  border: 0.5px solid var(--border-dim);
}

.player-card {
  position: relative;
  background: var(--surface-raised);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 18px;
}
.player-card-bg { position: absolute; inset: 0; opacity: 0.22; pointer-events: none; }
.player-card-content { position: relative; padding: clamp(14px, 4vw, 18px); }

.card-meta {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 14px; gap: 10px;
}
.card-meta-label {
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500;
}
.card-meta-handle {
  font-size: 11px; color: var(--ice);
  margin-top: 2px;
  font-family: var(--font-display);
  font-weight: 600; letter-spacing: 0.5px;
}
.card-meta-serial {
  font-size: 14px; color: var(--text);
  font-family: var(--font-display);
  font-weight: 700; margin-top: 2px;
}

.card-identity {
  display: flex; gap: 14px; align-items: center;
  margin-bottom: 16px;
}
.card-avatar {
  position: relative;
  width: clamp(64px, 18vw, 78px);
  height: clamp(64px, 18vw, 78px);
  flex-shrink: 0;
}
.card-avatar-letters {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 800; color: white; letter-spacing: 1px;
}
.card-identity-text { flex: 1; min-width: 0; }
.card-display-name {
  font-family: var(--font-display);
  font-size: clamp(20px, 6vw, 24px);
  font-weight: 800; letter-spacing: 0.4px;
  line-height: 1.05; word-break: break-word;
}
.card-pills { display: flex; gap: 5px; margin-top: 7px; flex-wrap: wrap; }
.card-pill {
  background: var(--accent-bg);
  color: var(--ice);
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.5px;
  font-family: var(--font-display);
}
.card-pill--club {
  background: transparent;
  border: 0.5px solid var(--border);
  color: var(--text-soft);
}

.card-rank {
  background: rgba(10,14,26,0.5);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  margin-bottom: 14px;
}
.card-rank-row {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 8px; gap: 12px;
}
.card-rank-name-row {
  display: flex; align-items: center; gap: 8px;
  margin-top: 4px;
}
.card-rank-name {
  font-family: var(--font-display);
  font-size: clamp(18px, 5vw, 22px);
  font-weight: 800; letter-spacing: 0.5px;
}
.card-rank-tier { color: var(--gold); font-size: 14px; }
.card-rank-next {
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  color: var(--ice);
}
.card-rank-togo { font-size: 10px; color: var(--text-mute); margin-top: 1px; }
.card-rank-bar {
  height: 5px;
  background: var(--bg);
  border-radius: 999px;
  overflow: hidden;
}
.card-rank-bar-fill {
  height: 100%; background: var(--gold); border-radius: 999px;
  transition: width 0.4s;
}

.card-stats {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 8px; margin-bottom: 14px;
}
.card-stat {
  text-align: center;
  background: rgba(10,14,26,0.4);
  border-radius: 10px;
  padding: 10px 4px;
}
.card-stat-num {
  font-family: var(--font-display);
  font-size: clamp(18px, 5vw, 22px);
  font-weight: 800; line-height: 1; color: white;
}
.card-stat-num-row { display: inline-flex; align-items: center; gap: 4px; }
.card-stat-label {
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 1px; margin-top: 5px;
  text-transform: uppercase;
}

.card-mix { margin-bottom: 14px; }
.card-mix-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 8px;
}
.card-specialty {
  font-size: 10px; color: var(--ice);
  font-family: var(--font-display);
  font-weight: 700; letter-spacing: 0.5px;
}
.card-mix-bar {
  display: flex; height: 6px;
  border-radius: 999px; overflow: hidden;
  background: var(--bg);
  margin-bottom: 8px;
}
.card-mix-bar > div { transition: width 0.4s; }
.card-mix-legend {
  display: flex; flex-wrap: wrap; gap: 8px 12px;
  font-size: 10px; color: var(--text-soft);
}
.card-mix-item { display: flex; align-items: center; gap: 4px; }

.card-footer {
  padding-top: 12px;
  border-top: 0.5px solid var(--border-dim);
  display: flex; justify-content: space-between; align-items: center;
}
.card-footer-text { font-size: 11px; color: var(--text); margin-top: 1px; }

.rank-ladder {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px;
}
.rank-ladder-rows { display: flex; flex-direction: column; gap: 4px; }
.ladder-row {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px;
  background: var(--bg);
  border-radius: 10px;
  position: relative;
}
.ladder-row--current {
  background: var(--surface-raised);
  border: 0.5px solid var(--gold);
}
.ladder-row--locked { opacity: 0.45; }
.ladder-icon {
  width: 22px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ladder-name {
  flex: 1;
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.4px;
}
.ladder-range { font-size: 11px; color: var(--text-mute); }
.ladder-current-tag {
  background: var(--gold);
  color: var(--gold-bg);
  font-family: var(--font-display);
  font-size: 11px; font-weight: 800;
  letter-spacing: 1px;
  padding: 2px 7px;
  border-radius: 999px;
  margin-left: 6px;
}
`;function u1(){var f;const{player:e}=Ft(),[t,r]=y.useState(null),[s,a]=y.useState("week"),[i,o]=y.useState([]),[l,c]=y.useState(!0),[d,h]=y.useState(0);y.useEffect(()=>{e&&(e.team_id?r("team"):e.club_name?r("club"):r("global"))},[e==null?void 0:e.team_id,e==null?void 0:e.club_name]);const u=y.useMemo(()=>!e||!t?{}:t==="team"?{teamId:e.team_id}:t==="club"?{clubName:e.club_name}:{},[e,t]);y.useEffect(()=>{if(!e||!t)return;c(!0),(s==="week"?Yb:Vb)(u).then(k=>{o(k),c(!1)}),t==="team"&&e.team_id?Qb(e.team_id).then(h):t==="club"&&e.club_name?Xb(e.club_name).then(h):h(0)},[e,t,s,u]);const p=y.useMemo(()=>{if(!e)return null;const m=i.findIndex(k=>k.id===e.id);return m===-1?null:m+1},[i,e]),x=y.useMemo(()=>i.find(m=>m.id===(e==null?void 0:e.id)),[i,e]),v=y.useMemo(()=>{if(!e||i.length===0)return[];const m=i.findIndex(k=>k.id===e.id);return m===-1||m<5?[]:i.slice(Math.max(0,m-1),Math.min(i.length,m+2))},[i,e]),b=i.slice(0,5);if(!e||!t)return null;const w=((f=e.team)==null?void 0:f.name)||"Team",g=e.club_name||"Club";return n.jsxs("div",{className:"rank-screen fade-in",children:[n.jsx("header",{className:"rank-header",children:n.jsx("h1",{className:"rank-title",children:"Rankings"})}),n.jsxs("div",{className:"seg-control",children:[n.jsx("button",{className:`seg-btn ${t==="team"?"seg-btn--active":""}`,onClick:()=>r("team"),disabled:!e.team_id,children:w}),n.jsx("button",{className:`seg-btn ${t==="club"?"seg-btn--active":""}`,onClick:()=>r("club"),disabled:!e.club_name,children:g}),n.jsx("button",{className:`seg-btn ${t==="global"?"seg-btn--active":""}`,onClick:()=>r("global"),children:"Global"})]}),n.jsxs("div",{className:"period-row",children:[n.jsx("button",{className:`pill ${s==="week"?"pill--active":""}`,onClick:()=>a("week"),children:"This week"}),n.jsx("button",{className:`pill ${s==="all"?"pill--active":""}`,onClick:()=>a("all"),children:"All time"})]}),x&&p&&n.jsxs("div",{className:"my-spot",children:[n.jsxs("div",{children:[n.jsx("div",{className:"label-sm",children:"Your spot"}),n.jsxs("div",{className:"my-spot-rank tnum",children:["#",p,d>0&&n.jsxs("span",{className:"my-spot-of",children:[" of ",d]})]})]}),n.jsxs("div",{style:{textAlign:"right"},children:[n.jsx("div",{className:"label-sm",children:s==="week"?"Week shots":"Lifetime"}),n.jsx("div",{className:"my-spot-shots tnum",children:(s==="week"?x.week_shots:x.lifetime_shots).toLocaleString()})]})]}),!x&&s==="week"&&!l&&n.jsxs("div",{className:"empty-spot",children:[n.jsx("div",{children:"You haven't logged any shots this week yet."}),n.jsx("div",{style:{fontSize:12,color:"var(--text-mute)",marginTop:4},children:"Head to Home and rack 'em up."})]}),!l&&b.length>0&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"label-sm",style:{margin:"14px 4px 8px"},children:t==="team"?"Top of the team":t==="club"?"Top of the club":"Top of the board"}),n.jsx("div",{className:"board",children:b.map((m,k)=>n.jsx(th,{row:m,rank:k+1,isMe:m.id===e.id,period:s},m.id))})]}),v.length>0&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"dots",children:"· · ·"}),n.jsx("div",{className:"label-sm",style:{margin:"0 4px 8px"},children:"Around you"}),n.jsx("div",{className:"board",children:v.map(m=>{const k=i.findIndex(N=>N.id===m.id);return n.jsx(th,{row:m,rank:k+1,isMe:m.id===e.id,period:s},m.id)})})]}),!l&&i.length===0&&n.jsxs("div",{className:"empty-state",children:[n.jsx("div",{className:"empty-title",children:"No shots logged yet"}),n.jsx("div",{className:"empty-sub",children:t==="team"?"Be the first on your team.":t==="club"?"Be the first in your club.":"Be the first to put up a number."})]}),l&&n.jsx("div",{className:"empty-state",children:n.jsx("div",{className:"empty-sub",children:"Loading…"})}),n.jsx("style",{children:p1})]})}function th({row:e,rank:t,isMe:r,period:s}){var l;const a=ra(e.lifetime_shots),i=s==="week"?e.week_shots:e.lifetime_shots,o=((l=e.display_name)==null?void 0:l.slice(0,2).toUpperCase())||"??";return n.jsxs("div",{className:`row ${r?"row--me":""}`,children:[n.jsx("div",{className:`row-rank ${t===1?"row-rank--gold":t<=3?"row-rank--silver":""}`,children:t}),n.jsx("div",{className:"row-avatar",children:o}),n.jsxs("div",{className:"row-info",children:[n.jsxs("div",{className:"row-name",children:[r?"You":e.display_name,e.position&&n.jsxs("span",{className:"row-pos",children:[" · ",e.position]})]}),n.jsx("div",{className:"row-rank-name",children:a.fullName})]}),e.current_streak>0&&n.jsxs("div",{className:"row-streak",children:[n.jsx(h1,{}),n.jsx("span",{className:"tnum",children:e.current_streak})]}),n.jsx("div",{className:"row-shots tnum",children:i.toLocaleString()})]})}function h1(){return n.jsx("svg",{width:"9",height:"11",viewBox:"0 0 12 14",style:{display:"block"},children:n.jsx("path",{d:"M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z",fill:"#ff7a29"})})}const p1=`
.rank-screen { padding: 14px 14px 30px; }
.rank-header { padding: 4px 4px 14px; }
.rank-title {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 700;
  letter-spacing: 0.5px;
}

.seg-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 3px;
  background: var(--surface);
  border-radius: var(--radius);
  margin-bottom: 10px;
}
.seg-btn {
  padding: 9px 6px;
  border-radius: 9px;
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: var(--ice);
  text-align: center;
  background: transparent;
  text-transform: uppercase;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.seg-btn--active {
  background: var(--accent);
  color: white;
}
.seg-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.period-row {
  display: flex; gap: 6px; margin-bottom: 14px;
}
.pill {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--surface);
  color: var(--ice);
  font-size: 12px;
  font-weight: 500;
  border: 0.5px solid var(--border-dim);
  font-family: inherit;
}
.pill--active {
  background: var(--accent);
  color: white;
  border-color: var(--accent-soft);
}

.my-spot {
  background: var(--surface-raised);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 12px;
}
.my-spot-rank {
  font-family: var(--font-display);
  font-size: 28px; font-weight: 800;
  color: white;
  margin-top: 2px;
  line-height: 1;
}
.my-spot-of {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-mute);
  font-weight: 400;
}
.my-spot-shots {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 800;
  color: var(--ice);
  margin-top: 2px;
  line-height: 1;
}

.empty-spot {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 14px;
  text-align: center;
  margin-bottom: 14px;
  font-size: 13px;
}

.dots {
  text-align: center;
  font-size: 14px;
  color: var(--text-mute);
  letter-spacing: 4px;
  padding: 12px 0;
}

.board {
  display: flex; flex-direction: column; gap: 4px;
}
.row {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface);
  border-radius: 10px;
  padding: 10px;
}
.row--me {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
}
.row-rank {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  width: 26px; height: 26px;
  border-radius: 50%;
  background: var(--bg);
  color: var(--ice);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.row-rank--gold { background: var(--gold); color: var(--gold-bg); }
.row-rank--silver { background: var(--text-soft); color: var(--bg); }
.row-avatar {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: var(--accent-bg);
  color: var(--ice);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 11px; font-weight: 700;
  flex-shrink: 0;
}
.row-info { flex: 1; min-width: 0; }
.row-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row-pos { color: var(--text-mute); font-weight: 400; }
.row-rank-name {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 2px;
}
.row-streak {
  display: flex; align-items: center; gap: 3px;
  background: rgba(255, 122, 41, 0.15);
  padding: 3px 7px;
  border-radius: 999px;
  font-size: 11px;
  color: var(--warn-soft);
  font-weight: 600;
}
.row-shots {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 800;
  color: white;
  margin-left: 4px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-mute);
}
.empty-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}
.empty-sub { font-size: 13px; }
`,f1=typeof window<"u"?window.location.origin:"";function m1(){var V,I;const{player:e,refresh:t}=Ft(),r=re(),[s,a]=y.useState(!1),[i,o]=y.useState((e==null?void 0:e.daily_goal)||50),[l,c]=y.useState(!1),[d,h]=y.useState((e==null?void 0:e.lifetime_shot_goal)||5e3),[u,p]=y.useState((e==null?void 0:e.stickhandling_hour_goal)||5),[x,v]=y.useState((e==null?void 0:e.lifetime_shot_goal_date)||g()),[b,w]=y.useState(!1);function g(){const E=new Date;return E.setMonth(E.getMonth()+3),E.toISOString().split("T")[0]}const[f,m]=y.useState(!1),[k,N]=y.useState(!1),[S,_]=y.useState(!1),[D,q]=y.useState([]),[T,Q]=y.useState(null);if(y.useEffect(()=>{$b().then(q).catch(()=>{})},[]),!e)return null;const de=async E=>{E.id===e.id||T||(Q(E.id),localStorage.setItem("activePlayerId",E.id),await t(),Q(null))},he=async()=>{var C;const E=(C=e.team)==null?void 0:C.name;if(!E)return;const $=`Join my team on Hockey Shot Challenge! Team name: ${E}
${f1}`;try{navigator.share?(await navigator.share({title:"Join my team on Hockey Shot Challenge",text:$}),a(!0),setTimeout(()=>a(!1),2e3)):(await navigator.clipboard.writeText($),a(!0),setTimeout(()=>a(!1),2e3))}catch(L){console.error("Share failed:",L);try{await navigator.clipboard.writeText(E),a(!0),setTimeout(()=>a(!1),2e3)}catch(O){console.error("Copy failed:",O)}}},Be=async()=>{w(!0);try{const{error:E}=await P.from("players").update({lifetime_shot_goal:Math.max(1,Math.min(5e4,Math.round(d))),stickhandling_hour_goal:Math.max(.5,Math.min(500,Math.round(u*10)/10)),lifetime_shot_goal_date:x}).eq("id",e.id);if(E)throw E;await t()}catch(E){console.error("Failed to save goals:",E),h(e.lifetime_shot_goal||5e3),p(e.stickhandling_hour_goal||5),v((e==null?void 0:e.lifetime_shot_goal_date)||g())}finally{w(!1)}},Ge=async()=>{await qf(),await t(),r("/start")},je=async()=>{N(!0);try{await Lb(e.id),r("/start",{replace:!0})}catch{N(!1),m(!1),window.alert("Something went wrong. Try again.")}};return e.card_number&&`${String(e.card_number).padStart(3,"0")}`,n.jsxs("div",{className:"more-screen fade-in",children:[n.jsx("header",{className:"more-header",children:n.jsx("h1",{className:"more-title",children:"Settings"})}),((V=e.team)==null?void 0:V.name)&&n.jsxs("div",{className:"invite-card",children:[n.jsxs("div",{className:"invite-top",children:[n.jsx("div",{className:"label-sm",children:"Your team"}),n.jsx("div",{className:"invite-team-name",children:e.team.name}),e.club_name&&n.jsx("div",{className:"invite-club-name",children:e.club_name})]}),n.jsx("div",{className:"invite-hint",children:"Share your team name with friends so they can join and compete with you."}),n.jsx("button",{className:"invite-btn",onClick:he,children:s?"✓ Shared":"↗ Invite teammates"})]}),!((I=e.team)!=null&&I.name)&&n.jsxs("div",{className:"solo-card",children:[n.jsx("div",{className:"label-sm",children:"Solo mode"}),n.jsx("div",{className:"solo-card-title",children:"You're flying solo"}),n.jsx("div",{className:"solo-card-hint",children:"Start or join a team to compete on the rankings with teammates. Sign out and sign back in to change this."})]}),n.jsxs("button",{className:"drills-link",onClick:()=>r("/videos"),children:[n.jsx("div",{className:"drills-link-icon",children:"🎬"}),n.jsxs("div",{className:"drills-link-text",children:[n.jsx("div",{className:"drills-link-title",children:"Watch drills"}),n.jsx("div",{className:"drills-link-sub",children:"Learn new moves from pros"})]}),n.jsx("div",{className:"drills-link-arrow",children:"→"})]}),n.jsxs("div",{className:"section",children:[n.jsx("div",{className:"label-sm",style:{marginBottom:8},children:"My goals 🎯"}),n.jsxs("div",{className:"info-card",children:[n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("div",{className:"info-label",children:"Total shots to reach 🎯"}),n.jsx("div",{style:{display:"flex",gap:8,alignItems:"center",marginTop:8},children:n.jsx("input",{type:"number",value:d,onChange:E=>{const $=E.target.value.trim();if($===""){h("");return}const C=parseInt($);isNaN(C)||h(Math.max(1,C))},disabled:b,style:{flex:1,background:"var(--bg)",border:"0.5px solid var(--border-dim)",borderRadius:8,padding:"8px 12px",color:"white",fontSize:14,fontFamily:"var(--font-display)",fontWeight:600}})})]}),n.jsxs("div",{style:{marginBottom:16},children:[n.jsx("div",{className:"info-label",children:"Stick time hours ⏱️"}),n.jsx("div",{style:{display:"flex",gap:8,alignItems:"center",marginTop:8},children:n.jsx("input",{type:"number",step:"0.5",value:u,onChange:E=>{const $=E.target.value.trim();if($===""){p("");return}const C=parseFloat($);isNaN(C)||p(Math.max(.5,C))},disabled:b,style:{flex:1,background:"var(--bg)",border:"0.5px solid var(--border-dim)",borderRadius:8,padding:"8px 12px",color:"white",fontSize:14,fontFamily:"var(--font-display)",fontWeight:600}})})]}),n.jsxs("div",{children:[n.jsx("div",{className:"info-label",children:"Target date 📅"}),n.jsx("div",{style:{fontSize:12,color:"var(--text-mute)",marginTop:4,marginBottom:8},children:"When do you want to hit 5000 shots?"}),n.jsx("div",{style:{display:"flex",gap:8,alignItems:"center",marginTop:8},children:n.jsx("input",{type:"date",value:x,onChange:E=>v(E.target.value),disabled:b,style:{flex:1,background:"var(--bg)",border:"0.5px solid var(--border-dim)",borderRadius:8,padding:"8px 12px",color:"white",fontSize:14,fontFamily:"var(--font-display)",fontWeight:600}})})]}),n.jsx("button",{onClick:Be,disabled:b,style:{width:"100%",marginTop:14,background:"var(--accent)",color:"white",border:"none",borderRadius:8,padding:10,fontSize:13,fontWeight:600,cursor:b?"not-allowed":"pointer",opacity:b?.6:1},children:b?"Saving…":"Save goals"}),n.jsx("div",{className:"info-hint",children:"Set your personal goals. Progress shows on the home screen."})]})]}),D.length>0&&n.jsxs("div",{className:"section",children:[n.jsx("div",{className:"label-sm",style:{marginBottom:8},children:"Players on this account"}),n.jsx("div",{className:"players-list",children:D.map(E=>{var $,C;return n.jsxs("button",{className:`player-row ${E.id===e.id?"player-row--active":""}`,onClick:()=>de(E),disabled:T!==null,children:[n.jsx("div",{className:"player-row-avatar",children:($=E.display_name[0])==null?void 0:$.toUpperCase()}),n.jsxs("div",{className:"player-row-info",children:[n.jsx("div",{className:"player-row-name",children:E.display_name}),n.jsxs("div",{className:"player-row-sub",children:[E.position==="F"?"Forward":E.position==="D"?"Defense":E.position==="G"?"Goalie":"—",(C=E.team)!=null&&C.name?` · ${E.team.name}`:""]})]}),E.id===e.id?n.jsx("div",{className:"player-row-badge",children:"Active"}):T===E.id?n.jsx("div",{className:"player-row-switching",children:"Switching…"}):n.jsx("div",{className:"player-row-switch",children:"Switch →"})]},E.id)})}),n.jsx("button",{className:"add-player-btn",onClick:()=>r("/add-player"),children:"+ Add another player"})]}),n.jsx("button",{className:"signout-btn",onClick:()=>_(!0),children:"Sign out"}),n.jsx("button",{className:"privacy-link-btn",onClick:()=>r("/privacy"),children:"Privacy policy"}),n.jsx("button",{className:"delete-btn",onClick:()=>m(!0),children:"Delete account"}),S&&n.jsx("div",{className:"delete-overlay",onClick:()=>_(!1),children:n.jsxs("div",{className:"delete-modal",onClick:E=>E.stopPropagation(),children:[n.jsx("div",{className:"delete-modal-icon",children:"👋"}),n.jsx("h2",{className:"delete-modal-title",children:"Sign out?"}),n.jsx("p",{className:"delete-modal-body",children:e.username?n.jsxs(n.Fragment,{children:["Your username is ",n.jsxs("strong",{style:{color:"white"},children:["@",e.username]})," — save it so you can sign back in."]}):"You can sign back in with Google any time."}),n.jsx("button",{className:"signout-confirm-btn",onClick:Ge,children:"Sign out"}),n.jsx("button",{className:"delete-cancel-btn",onClick:()=>_(!1),children:"Cancel"})]})}),f&&n.jsx("div",{className:"delete-overlay",children:n.jsxs("div",{className:"delete-modal",children:[n.jsx("div",{className:"delete-modal-icon",children:"⚠️"}),n.jsx("h2",{className:"delete-modal-title",children:"Delete your account?"}),n.jsx("p",{className:"delete-modal-body",children:"This permanently deletes your shots, streak, rank, and card. There's no undo."}),n.jsx("button",{className:"delete-confirm-btn",onClick:je,disabled:k,children:k?"Deleting…":"Yes, delete everything"}),n.jsx("button",{className:"delete-cancel-btn",onClick:()=>m(!1),disabled:k,children:"Cancel"})]})}),n.jsx("style",{children:g1})]})}const g1=`
.more-screen { padding: 14px 14px 30px; }
.more-header { padding: 4px 4px 14px; }
.more-title {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 700;
  letter-spacing: 0.5px;
}

.invite-card {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 16px 14px;
  margin-bottom: 16px;
}
.invite-top { text-align: center; margin-bottom: 10px; }
.invite-team-name {
  font-family: var(--font-display);
  font-size: 26px; font-weight: 800;
  color: var(--ice);
  letter-spacing: 1px;
  margin-top: 4px;
  line-height: 1;
}
.invite-club-name {
  font-size: 11px; color: var(--text-mute);
  margin-top: 6px; letter-spacing: 0.5px;
}
.invite-hint {
  font-size: 13px;
  color: var(--text-soft);
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.4;
}
.invite-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 13px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
  transition: all 0.15s;
}
.invite-btn:active { transform: scale(0.98); }

.solo-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 16px;
}
.solo-card-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700;
  margin-top: 4px; letter-spacing: 0.3px;
}
.solo-card-hint {
  font-size: 12px; color: var(--text-mute);
  margin-top: 4px; line-height: 1.4;
}

/* Drills shortcut */
.drills-link {
  width: 100%;
  display: flex; align-items: center; gap: 14px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 16px;
  text-align: left;
  font-family: inherit;
  color: inherit;
  transition: transform 0.1s;
}
.drills-link:active {
  transform: scale(0.99);
  background: var(--surface-raised);
}
.drills-link-icon {
  font-size: 28px;
  flex-shrink: 0;
}
.drills-link-text { flex: 1; }
.drills-link-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--ice);
}
.drills-link-sub {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 2px;
}
.drills-link-arrow {
  font-size: 18px;
  color: var(--text-mute);
}

.section { margin-bottom: 16px; }

.info-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px 14px;
}

.info-row {
  display: flex; justify-content: space-between; align-items: center;
  gap: 10px;
}
.info-label {
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500;
}
.info-value {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 700;
  color: var(--ice);
  margin-top: 2px;
  letter-spacing: 0.5px;
}
.info-hint {
  font-size: 11px; color: var(--text-mute);
  margin-top: 10px; line-height: 1.4;
}
.copy-chip {
  background: var(--bg);
  color: var(--ice);
  font-size: 11px; font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  border: 0.5px solid var(--border-dim);
  flex-shrink: 0;
}
.copy-chip--done {
  background: rgba(61, 214, 140, 0.15);
  border-color: rgba(61, 214, 140, 0.4);
  color: var(--success);
}

/* Daily goal selection */
.goal-current-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px;
}
.goal-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 4px;
}
.goal-chip {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--text);
  padding: 10px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: all 0.1s;
}
.goal-chip:active { transform: scale(0.96); }
.goal-chip--active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}
.goal-chip:disabled { opacity: 0.5; }

.kv-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0;
  border-bottom: 0.5px solid var(--border-dim);
}
.kv-row:last-child { border-bottom: none; }
.kv-label { font-size: 13px; color: var(--text-mute); }
.kv-value {
  font-size: 13px; color: var(--text);
  font-weight: 500;
  text-align: right;
}

.players-list {
  display: flex; flex-direction: column; gap: 6px;
  margin-bottom: 10px;
}
.player-row {
  width: 100%;
  display: flex; align-items: center; gap: 12px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px 14px;
  text-align: left;
  transition: all 0.1s;
}
.player-row--active {
  border-color: var(--accent);
  background: rgba(41, 121, 255, 0.07);
}
.player-row:active:not(:disabled) { transform: scale(0.99); }
.player-row:disabled { opacity: 0.6; }
.player-row-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.player-row-info { flex: 1; min-width: 0; }
.player-row-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white; letter-spacing: 0.2px;
}
.player-row-sub {
  font-size: 11px; color: var(--text-mute);
  margin-top: 2px;
}
.player-row-badge {
  font-size: 10px; font-weight: 700;
  color: var(--ice);
  background: rgba(41, 121, 255, 0.15);
  padding: 3px 8px; border-radius: 999px;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.player-row-switch {
  font-size: 12px; color: var(--text-mute);
  flex-shrink: 0;
}
.player-row-switching {
  font-size: 11px; color: var(--text-mute);
  flex-shrink: 0;
}

.add-player-btn {
  width: 100%;
  background: var(--surface);
  border: 0.5px solid var(--accent);
  color: var(--ice);
  padding: 13px;
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.3px;
  margin-top: 8px;
  transition: all 0.15s;
}
.add-player-btn:active { background: rgba(41, 121, 255, 0.1); }

.signout-btn {
  width: 100%;
  background: transparent;
  border: 0.5px solid rgba(255, 84, 84, 0.3);
  color: var(--danger);
  padding: 12px;
  border-radius: var(--radius);
  font-size: 13px; font-weight: 500;
  margin-top: 8px;
}
.signout-btn:active { background: rgba(255, 84, 84, 0.08); }

.privacy-link-btn {
  width: 100%;
  background: transparent;
  color: var(--text-mute);
  padding: 10px;
  font-size: 12px;
  margin-top: 4px;
}
.privacy-link-btn:hover { color: var(--text-soft); }

.delete-btn {
  width: 100%;
  background: transparent;
  color: var(--text-mute);
  padding: 12px;
  font-size: 12px;
  margin-top: 4px;
}
.delete-btn:active { color: var(--danger); }

.delete-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: flex-end; justify-content: center;
  z-index: 100;
  padding: 16px;
}
.delete-modal {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  padding: 24px 20px 20px;
  width: 100%; max-width: 380px;
  text-align: center;
}
.delete-modal-icon { font-size: 32px; margin-bottom: 12px; }
.delete-modal-title {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 800;
  color: white; margin-bottom: 10px;
}
.delete-modal-body {
  font-size: 14px; color: var(--text-soft);
  line-height: 1.5; margin-bottom: 20px;
}
.signout-confirm-btn {
  width: 100%;
  background: var(--surface-raised, #1a2035);
  border: 0.5px solid rgba(255,84,84,0.3);
  color: var(--danger);
  border-radius: var(--radius);
  padding: 14px;
  font-size: 14px; font-weight: 600;
  margin-bottom: 10px;
}
.signout-confirm-btn:active { background: rgba(255,84,84,0.08); }

.delete-confirm-btn {
  width: 100%;
  background: var(--danger);
  color: white;
  border-radius: var(--radius);
  padding: 14px;
  font-size: 14px; font-weight: 600;
  margin-bottom: 10px;
}
.delete-confirm-btn:disabled { opacity: 0.6; }
.delete-cancel-btn {
  width: 100%;
  color: var(--text-mute);
  font-size: 13px;
  padding: 10px;
}
.delete-cancel-btn:disabled { opacity: 0.5; }
`;function x1(e){const t=parseInt((e||"").replace("U",""),10);return t?t<=10?"6-10":t<=14?"11-14":t<=18?"15-18":"18+":null}function y1(){const e=re(),{refresh:t}=Ft(),[r,s]=y.useState(""),[a,i]=y.useState(""),[o,l]=y.useState(null),[c,d]=y.useState(""),[h,u]=y.useState([]),[p,x]=y.useState(!1),[v,b]=y.useState(null),[w,g]=y.useState(""),[f,m]=y.useState(""),[k,N]=y.useState(!1),[S,_]=y.useState(""),D=y.useRef(null);y.useEffect(()=>{if(D.current&&clearTimeout(D.current),!c.trim()||c.trim().length<2){u([]),x(!1);return}return x(!0),D.current=setTimeout(async()=>{try{const T=await Qr(c,6);u(T||[])}catch{u([])}finally{x(!1)}},200),()=>{D.current&&clearTimeout(D.current)}},[c]);const q=async()=>{if(!r.trim()){_("Add the player's first name so their coach knows who they are.");return}if(!a.trim()){_("Add a player name for the leaderboard.");return}if(!o){_("Pick a position.");return}_(""),N(!0);try{let T=null;v&&w&&f&&(T=(await Vf({clubId:v.id,ageDivision:w,tier:f})).teamId),await Ml({firstName:r.trim(),displayName:a.trim(),position:o,ageBracket:x1(w),teamId:T,clubId:(v==null?void 0:v.id)||null,clubName:(v==null?void 0:v.name)||null}),await t(),e("/home",{replace:!0})}catch(T){_(T.message||"Something went wrong. Try again."),N(!1)}};return n.jsxs("div",{className:"add-player-wrap fade-in",children:[n.jsxs("div",{className:"add-player-card",children:[n.jsx("button",{className:"add-player-back",onClick:()=>e(-1),children:"← Back"}),n.jsx("h2",{className:"add-player-title",children:"Add a player"}),n.jsx("p",{className:"add-player-sub",children:"This creates a new player profile on your Google account. You can switch between players any time."}),n.jsxs("label",{className:"input-label",children:[n.jsx("span",{children:"First name (shown to their coach)"}),n.jsx("input",{type:"text",value:r,onChange:T=>s(T.target.value),placeholder:"Their real first name",className:"input-field",autoFocus:!0})]}),n.jsxs("label",{className:"input-label",style:{marginTop:12},children:[n.jsx("span",{children:"Player name (on leaderboards)"}),n.jsx("input",{type:"text",value:a,onChange:T=>i(T.target.value),placeholder:"What do they go by?",className:"input-field"})]}),n.jsx("div",{className:"add-player-pos-label",children:"Position"}),n.jsx("div",{className:"add-player-chips",children:["F","D","G"].map(T=>n.jsxs("button",{className:`add-player-chip ${o===T?"add-player-chip--active":""}`,onClick:()=>l(T),children:[n.jsx("div",{className:"add-player-chip-letter",children:T}),n.jsx("div",{className:"add-player-chip-sub",children:T==="F"?"Forward":T==="D"?"Defense":"Goalie"})]},T))}),n.jsx("div",{className:"add-player-section-label",children:"Club (optional)"}),n.jsx("div",{className:"add-player-club-hint",children:"Connect them to their association so coaches can see them."}),v?n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"join-club-selected",children:[n.jsx("div",{className:"join-club-selected-name",children:v.name}),v.city&&n.jsx("div",{className:"join-club-selected-city",children:v.city}),n.jsx("button",{className:"join-club-change",onClick:()=>{b(null),g(""),m("")},children:"Change"})]}),n.jsxs("label",{className:"input-label",style:{marginTop:12},children:[n.jsx("span",{children:"Age division"}),n.jsxs("select",{value:w,onChange:T=>g(T.target.value),className:"input-field",children:[n.jsx("option",{value:"",children:"Pick one"}),Cs.map(T=>n.jsx("option",{value:T,children:T},T))]})]}),n.jsxs("label",{className:"input-label",style:{marginTop:10},children:[n.jsx("span",{children:"Tier"}),n.jsxs("select",{value:f,onChange:T=>m(T.target.value),className:"input-field",children:[n.jsx("option",{value:"",children:"Pick one"}),Ts.map(T=>n.jsx("option",{value:T,children:T},T))]})]})]}):n.jsxs("div",{style:{position:"relative"},children:[n.jsx("input",{type:"text",value:c,onChange:T=>d(T.target.value),placeholder:"Search for their association…",className:"input-field",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false"}),c.trim().length>=2&&n.jsxs("div",{className:"join-club-dropdown",children:[p&&n.jsx("div",{className:"join-club-status",children:"Searching…"}),!p&&h.length===0&&n.jsx("div",{className:"join-club-status",children:"No clubs found — you can skip this for now."}),h.map(T=>n.jsxs("button",{className:"join-club-result",onClick:()=>{b(T),d(""),u([])},children:[n.jsx("span",{className:"join-club-result-name",children:T.name}),T.city&&n.jsx("span",{className:"join-club-result-meta",children:T.city})]},T.id))]})]}),S&&n.jsx("div",{className:"add-player-error",children:S}),n.jsx("button",{className:"add-player-submit",onClick:q,disabled:!r||!a||!o||k,children:k?"Creating profile…":"Create profile →"})]}),n.jsx("style",{children:v1})]})}const v1=`
.add-player-wrap {
  min-height: 100dvh;
  background: var(--bg);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 16px 60px;
}
.add-player-card {
  width: 100%;
  max-width: 400px;
}
.add-player-back {
  color: var(--text-mute);
  font-size: 13px;
  margin-bottom: 20px;
  display: block;
}
.add-player-back:hover { color: var(--ice); }
.add-player-title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.3px;
  margin-bottom: 6px;
}
.add-player-sub {
  font-size: 13px;
  color: var(--text-mute);
  line-height: 1.5;
  margin-bottom: 22px;
}
.add-player-pos-label {
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 16px 0 8px;
}
.add-player-chips {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 20px;
}
.add-player-chip {
  background: var(--surface);
  border: 1.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px 8px;
  text-align: center;
  transition: all 0.1s;
  cursor: pointer;
}
.add-player-chip--active {
  background: rgba(41, 121, 255, 0.15);
  border-color: var(--accent);
}
.add-player-chip:active { transform: scale(0.97); }
.add-player-chip-letter {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
}
.add-player-chip-sub {
  font-size: 10px;
  color: var(--text-mute);
  margin-top: 4px;
  letter-spacing: 0.3px;
}
.add-player-section-label {
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 4px;
}
.add-player-club-hint {
  font-size: 12px;
  color: var(--text-mute);
  margin-bottom: 10px;
  line-height: 1.4;
}
.add-player-error {
  color: #ef4444;
  font-size: 13px;
  margin: 12px 0;
  line-height: 1.4;
}
.add-player-submit {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 15px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-top: 18px;
  transition: all 0.15s;
}
.add-player-submit:active:not(:disabled) { transform: scale(0.98); }
.add-player-submit:disabled { opacity: 0.5; cursor: not-allowed; }

/* Reuse join-club styles from AuthScreen */
.join-club-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--surface-raised);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  z-index: 20;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.join-club-result {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border-bottom: 0.5px solid var(--border-dim);
  display: flex; flex-direction: column;
  transition: background 0.1s;
}
.join-club-result:last-child { border-bottom: none; }
.join-club-result:hover { background: var(--bg); }
.join-club-result-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; color: white;
}
.join-club-result-meta { font-size: 11px; color: var(--text-mute); margin-top: 1px; }
.join-club-status {
  padding: 12px 14px;
  font-size: 13px;
  color: var(--text-mute);
}
.join-club-selected {
  background: var(--surface);
  border-radius: 10px;
  padding: 12px 14px;
  display: flex; align-items: center;
  gap: 10px;
  margin-bottom: 2px;
}
.join-club-selected-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700; color: white;
  flex: 1;
}
.join-club-selected-city { font-size: 11px; color: var(--text-mute); }
.join-club-change {
  color: var(--ice);
  font-size: 12px; font-weight: 600;
  padding: 4px 10px;
  border: 0.5px solid var(--border-dim);
  border-radius: 999px;
  background: transparent;
  flex-shrink: 0;
}

.input-label { display: block; margin-bottom: 4px; }
.input-label > span {
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}
.input-field {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border-dim);
  color: var(--text);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  -webkit-appearance: none;
}
.input-field:focus { border-color: var(--accent); }
.input-field::placeholder { color: var(--text-mute); }
`;function b1(){const e=re();return y.useEffect(()=>{ce({title:"Privacy Policy",url:`${K}/privacy`})},[]),n.jsxs("div",{className:"privacy-wrap",children:[n.jsxs("div",{className:"privacy-inner",children:[n.jsx("button",{className:"privacy-back",onClick:()=>e(-1),children:"← Back"}),n.jsx("h1",{className:"privacy-title",children:"Privacy Policy"}),n.jsx("p",{className:"privacy-meta",children:"Hockey Shot Challenge · Last updated June 27, 2026"}),n.jsx("p",{children:'Hockey Shot Challenge ("we", "our", or "the app") is a shot-tracking app for hockey players. This policy explains what data we collect, how we use it, and your rights.'}),n.jsx("h2",{children:"What we collect"}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("strong",{children:"Account info:"})," When you sign up with Google, we receive your Google account name and email address. We use your name to set your in-app display name. Your email is stored by our auth provider (Supabase) and is never shown publicly or shared."]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Player profile:"})," Your display name, first name, position (forward / defense / goalie), team, and age group."]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Shot and drill logs:"})," The number and type of shots or reps you log each day. Logs include a timestamp and count — no location or video is recorded."]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Usage data:"})," Supabase and Netlify may collect standard server logs (IP address, request timestamps) as part of hosting the service."]})]}),n.jsx("h2",{children:"How we use your data"}),n.jsxs("ul",{children:[n.jsx("li",{children:"To power leaderboards, streaks, squad battles, and the coach dashboard"}),n.jsx("li",{children:"To show your stats to your coach (if you joined a team)"}),n.jsx("li",{children:"To generate your public player card (accessible via your username link)"})]}),n.jsx("p",{children:"We do not sell your data. We do not use it for advertising. We do not share it with third parties beyond the infrastructure providers needed to run the app (Supabase for the database and auth, Netlify for hosting)."}),n.jsx("h2",{children:"Children"}),n.jsx("p",{children:"Hockey Shot Challenge is used by players of all ages, including children under 13. We collect only the minimum data needed to run the app. Parents who sign up on behalf of their child control the account and can delete it at any time from Settings → Delete account."}),n.jsx("h2",{children:"Your rights"}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("strong",{children:"View your data:"})," All your data is visible inside the app."]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Delete your account:"})," Go to Settings (the More tab) → Delete account. This permanently removes all your shots, streak, rank, and player card. It cannot be undone."]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Data portability:"})," Contact us and we'll send you a copy of your data."]})]}),n.jsx("h2",{children:"Data retention"}),n.jsx("p",{children:"Your data is kept as long as your account is active. When you delete your account, all associated shot logs, drill logs, achievements, and your player profile are permanently deleted."}),n.jsx("h2",{children:"Third-party services"}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("strong",{children:"Supabase"})," — database, authentication, and file storage. ",n.jsx("a",{href:"https://supabase.com/privacy",target:"_blank",rel:"noopener noreferrer",children:"Privacy policy ↗"})]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Netlify"})," — web hosting. ",n.jsx("a",{href:"https://www.netlify.com/privacy/",target:"_blank",rel:"noopener noreferrer",children:"Privacy policy ↗"})]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Google Sign-In"})," — authentication only. We request your name and email address. ",n.jsx("a",{href:"https://policies.google.com/privacy",target:"_blank",rel:"noopener noreferrer",children:"Privacy policy ↗"})]})]}),n.jsx("h2",{children:"Contact"}),n.jsxs("p",{children:["Questions or requests? Email us at ",n.jsx("a",{href:"mailto:hello@hockeyshotchallenge.com",children:"hello@hockeyshotchallenge.com"}),"."]})]}),n.jsx("style",{children:w1})]})}const w1=`
.privacy-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  padding: 24px 20px 60px;
}
.privacy-inner {
  max-width: 680px;
  margin: 0 auto;
}
.privacy-back {
  color: var(--text-mute);
  font-size: 13px;
  margin-bottom: 24px;
  display: block;
  text-align: left;
}
.privacy-back:hover { color: var(--ice); }
.privacy-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}
.privacy-meta {
  font-size: 12px;
  color: var(--text-mute);
  margin-bottom: 24px;
}
.privacy-inner p, .privacy-inner ul, .privacy-inner li {
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-soft);
  margin-bottom: 14px;
}
.privacy-inner ul {
  padding-left: 20px;
}
.privacy-inner li { margin-bottom: 8px; }
.privacy-inner h2 {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 28px 0 10px;
  letter-spacing: 0.3px;
}
.privacy-inner strong { color: var(--text); }
.privacy-inner a { color: var(--ice); text-decoration: underline; }
`;function tm(){return n.jsxs("section",{className:"ls-mockup-wrap",children:[n.jsxs("div",{className:"ls-mockup-inner",children:[n.jsx("div",{className:"ls-eyebrow",children:"INSIDE THE APP"}),n.jsx("h2",{className:"ls-section-title",children:"Built to be opened, tapped, and closed in 10 seconds."}),n.jsx("p",{className:"ls-section-sub",children:"No fluff. No social feed. Just your numbers, your team, and who you're chasing today."}),n.jsxs("div",{className:"ls-phone",children:[n.jsxs("div",{className:"ls-phone-header",children:[n.jsx("div",{className:"ls-avatar",children:"C"}),n.jsxs("div",{className:"ls-player-info",children:[n.jsx("div",{className:"ls-player-name",children:"Connor"}),n.jsx("div",{className:"ls-player-meta",children:"Prospect II · 1,240 shots"})]}),n.jsx("div",{className:"ls-streak-badge",children:"🔥 12"})]}),n.jsxs("div",{className:"ls-shot-grid",children:[n.jsxs("div",{className:"ls-shot-cell",children:[n.jsx("div",{className:"ls-shot-label",children:"WRIST"}),n.jsx("div",{className:"ls-shot-num",children:"85"}),n.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]}),n.jsxs("div",{className:"ls-shot-cell",children:[n.jsx("div",{className:"ls-shot-label",children:"SNAP"}),n.jsx("div",{className:"ls-shot-num",children:"42"}),n.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]}),n.jsxs("div",{className:"ls-shot-cell",children:[n.jsx("div",{className:"ls-shot-label",children:"SLAP"}),n.jsx("div",{className:"ls-shot-num",children:"23"}),n.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]}),n.jsxs("div",{className:"ls-shot-cell",children:[n.jsx("div",{className:"ls-shot-label",children:"BACKHAND"}),n.jsx("div",{className:"ls-shot-num",children:"18"}),n.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]})]}),n.jsxs("div",{className:"ls-stickhandling-section",children:[n.jsx("div",{className:"ls-stickhandling-label",children:"STICKHANDLING"}),n.jsxs("div",{className:"ls-shot-grid ls-shot-grid--2",children:[n.jsxs("div",{className:"ls-shot-cell",children:[n.jsx("div",{className:"ls-shot-label",children:"REPS"}),n.jsx("div",{className:"ls-shot-num ls-shot-num--orange",children:"240"}),n.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]}),n.jsxs("div",{className:"ls-shot-cell",children:[n.jsx("div",{className:"ls-shot-label",children:"MINUTES"}),n.jsx("div",{className:"ls-shot-num ls-shot-num--orange",children:"8"}),n.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]})]})]}),n.jsxs("div",{className:"ls-chasing",children:[n.jsxs("div",{className:"ls-chasing-left",children:[n.jsx("div",{className:"ls-chasing-label",children:"CHASING TODAY"}),n.jsx("div",{className:"ls-chasing-name",children:"Liam K. · 191 today"})]}),n.jsx("div",{className:"ls-chasing-delta",children:"−23"})]})]})]}),n.jsx("style",{children:k1})]})}function rm(){const e=[{day:"MON",task:"100 wrist shots"},{day:"TUE",task:"10 min stickhandling"},{day:"WED",task:"75 snap + 25 backhand"},{day:"THU",task:"10 min stickhandling"},{day:"FRI",task:"100 mixed shots"},{day:"SAT",task:"Rest"},{day:"SUN",task:"Rest"}],t=[{day:"MON",task:"50 wrist shots"},{day:"TUE",task:"Rest / game"},{day:"WED",task:"5 min stickhandling"},{day:"THU",task:"Practice day"},{day:"FRI",task:"50 mixed shots"},{day:"SAT",task:"Game day"},{day:"SUN",task:"Rest"}];return n.jsxs("section",{className:"ls-routine-wrap",children:[n.jsxs("div",{className:"ls-routine-inner",children:[n.jsx("div",{className:"ls-eyebrow",children:"FOLLOW A ROUTINE"}),n.jsx("h2",{className:"ls-section-title",children:"A simple plan for summer and the season."}),n.jsx("p",{className:"ls-section-sub",children:"Big gains happen in the off-season. Then you keep it going through the year. Pick a routine, log your reps, watch yourself climb."}),n.jsxs("div",{className:"ls-routine-grid",children:[n.jsxs("div",{className:"ls-routine-card ls-routine-card--summer",children:[n.jsxs("div",{className:"ls-routine-card-header",children:[n.jsx("span",{className:"ls-routine-dot ls-routine-dot--yellow"}),n.jsx("span",{className:"ls-routine-tag",children:"SUMMER · HEAVY"})]}),n.jsx("div",{className:"ls-routine-title",children:"5 days a week."}),n.jsx("div",{className:"ls-routine-sub",children:"Build the engine. This is when you get fast."}),n.jsx("div",{className:"ls-day-list",children:e.map(({day:r,task:s})=>n.jsxs("div",{className:"ls-day-row",children:[n.jsx("span",{className:"ls-day-label",children:r}),n.jsx("span",{className:"ls-day-task",children:s})]},r))})]}),n.jsxs("div",{className:"ls-routine-card ls-routine-card--season",children:[n.jsxs("div",{className:"ls-routine-card-header",children:[n.jsx("span",{className:"ls-routine-dot ls-routine-dot--blue"}),n.jsx("span",{className:"ls-routine-tag",children:"IN-SEASON · LIGHTER"})]}),n.jsx("div",{className:"ls-routine-title",children:"3 days a week."}),n.jsx("div",{className:"ls-routine-sub",children:"Keep what you built. Stay sharp around games."}),n.jsx("div",{className:"ls-day-list",children:t.map(({day:r,task:s})=>n.jsxs("div",{className:"ls-day-row",children:[n.jsx("span",{className:"ls-day-label",children:r}),n.jsx("span",{className:"ls-day-task",children:s})]},r))})]})]}),n.jsx("p",{className:"ls-routine-footnote",children:"These are just starting points. You can do more, do less, or build your own. The app tracks whatever you log."})]}),n.jsx("style",{children:j1})]})}const k1=`
.ls-mockup-wrap {
  background: #060b18;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 60px 20px;
}
.ls-mockup-inner {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
.ls-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 14px;
}
.ls-section-title {
  font-family: var(--font-display);
  font-size: clamp(26px, 5vw, 38px);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  letter-spacing: 0.2px;
  margin-bottom: 14px;
}
.ls-section-sub {
  font-size: 16px;
  color: #8899b4;
  line-height: 1.55;
  margin-bottom: 36px;
}
.ls-phone {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 24px;
  padding: 20px 16px;
  max-width: 340px;
  margin: 0 auto;
  box-shadow: 0 0 60px rgba(41,121,255,0.08);
}
.ls-phone-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.ls-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2979ff;
  color: white;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ls-player-info { flex: 1; text-align: left; }
.ls-player-name {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 800;
  color: white;
}
.ls-player-meta {
  font-size: 12px;
  color: #6b7fa8;
}
.ls-streak-badge {
  background: rgba(234,88,12,0.2);
  border: 1px solid rgba(234,88,12,0.4);
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 700;
  color: #fb923c;
}
.ls-shot-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
}
.ls-shot-grid--2 {
  grid-template-columns: 1fr 1fr;
  margin-bottom: 0;
}
.ls-shot-cell {
  background: #0a1220;
  border-radius: 12px;
  padding: 12px 14px;
  text-align: left;
}
.ls-shot-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #4a6080;
  margin-bottom: 4px;
}
.ls-shot-num {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  color: #60a5fa;
  line-height: 1;
  margin-bottom: 2px;
}
.ls-shot-num--orange { color: #fb923c; }
.ls-shot-sub {
  font-size: 10px;
  color: #4a6080;
  letter-spacing: 1px;
}
.ls-stickhandling-section {
  margin-top: 8px;
}
.ls-stickhandling-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #4a6080;
  margin-bottom: 8px;
  text-align: left;
  padding: 0 2px;
}
.ls-chasing {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0a1220;
  border: 1px solid #f97316;
  border-left: 3px solid #f97316;
  border-radius: 12px;
  padding: 12px 14px;
  margin-top: 8px;
}
.ls-chasing-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #4a6080;
  margin-bottom: 3px;
}
.ls-chasing-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.ls-chasing-delta {
  background: rgba(234,88,12,0.25);
  border-radius: 20px;
  padding: 6px 12px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  color: #fb923c;
}
`,j1=`
.ls-routine-wrap {
  padding: 60px 20px;
  border-top: 1px solid #1a2035;
}
.ls-routine-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.ls-routine-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 36px 0 20px;
  text-align: left;
}
@media (max-width: 540px) {
  .ls-routine-grid { grid-template-columns: 1fr; }
}
.ls-routine-card {
  border-radius: 16px;
  padding: 22px 20px;
  background: #0a111e;
}
.ls-routine-card--summer { border-left: 3px solid #eab308; border: 1px solid #2a2010; border-left: 3px solid #eab308; }
.ls-routine-card--season { border-left: 3px solid #2979ff; border: 1px solid #101a2a; border-left: 3px solid #2979ff; }
.ls-routine-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.ls-routine-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ls-routine-dot--yellow { background: #eab308; }
.ls-routine-dot--blue { background: #2979ff; }
.ls-routine-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #6b7fa8;
}
.ls-routine-title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}
.ls-routine-sub {
  font-size: 13px;
  color: #6b7fa8;
  margin-bottom: 16px;
  line-height: 1.45;
}
.ls-day-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ls-day-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #060b18;
  border-radius: 8px;
  padding: 8px 12px;
}
.ls-day-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #2979ff;
  width: 30px;
  flex-shrink: 0;
}
.ls-day-task {
  font-size: 13px;
  color: #a8b8d0;
}
.ls-routine-footnote {
  font-size: 13px;
  color: #4a6080;
  text-align: center;
  line-height: 1.5;
}
`;function N1(){const e=re(),[t,r]=y.useState(""),[s,a]=y.useState([]),[i,o]=y.useState(!1),[l,c]=y.useState(null),d=y.useRef(null);y.useEffect(()=>{if(d.current&&clearTimeout(d.current),!t.trim()||t.trim().length<2){a([]),o(!1);return}return o(!0),d.current=setTimeout(async()=>{try{const u=await Qr(t,5);a(u||[])}catch{a([])}finally{o(!1)}},200),()=>{d.current&&clearTimeout(d.current)}},[t]);const h=()=>{e(l?`/start?club=${l.slug}`:"/start")};return y.useEffect(()=>{ce({title:"Hockey Shot Tracker for Kids — Log Shots & Earn Ranks",description:"Free off-ice hockey practice tracker for kids ages 6–18. Log shots and stickhandling every day, earn ranks from Rookie to Legend, and compete in weekly 1v1 battles.",url:`${K}/player`}),ft([{"@context":"https://schema.org","@type":"WebApplication",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com",applicationCategory:"SportsApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"CAD"},description:"Free off-ice hockey practice tracker for kids. Log shots and stickhandling reps, earn ranks, and compete in weekly 1v1 battles.",audience:{"@type":"Audience",audienceType:"Hockey players ages 6–18 and their parents"}},{"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"Is Hockey Shot Challenge free for players?",acceptedAnswer:{"@type":"Answer",text:"Yes. Hockey Shot Challenge is completely free for players and parents. No subscription, no app to download, no hidden fees."}},{"@type":"Question",name:"What age is Hockey Shot Challenge for?",acceptedAnswer:{"@type":"Answer",text:"Hockey Shot Challenge is designed for hockey players ages 6–18. Parents sign in with their Google account and set up their child's profile."}},{"@type":"Question",name:"What do kids track on Hockey Shot Challenge?",acceptedAnswer:{"@type":"Answer",text:"Kids log wrist shots, snap shots, slap shots, backhand shots, and stickhandling reps (toe drags, figure eights, lateral moves). Sessions take 5 seconds to log."}}]}])},[]),n.jsxs("div",{className:"pl-wrap",children:[n.jsxs("nav",{className:"pl-nav",children:[n.jsx("button",{className:"pl-back",onClick:()=>e("/"),children:"← Back"}),n.jsx("button",{className:"pl-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),n.jsxs("section",{className:"pl-hero",children:[n.jsx("div",{className:"pl-eyebrow",children:"FREE · SIGN IN WITH GOOGLE · AGES 6–18"}),n.jsxs("h1",{className:"pl-title",children:["Log your shots.",n.jsx("br",{}),"Beat your teammates."]}),n.jsx("p",{className:"pl-sub",children:"Every day, log how many shots and stickhandling reps you did at home. Watch your rank climb. Compete against other teams every week."}),n.jsxs("div",{className:"pl-club-search",children:[n.jsx("div",{className:"pl-club-search-label",children:"Find your club first (optional)"}),l?n.jsxs("div",{className:"pl-club-selected",children:[n.jsx("span",{className:"pl-club-selected-name",children:l.name}),l.city&&n.jsx("span",{className:"pl-club-selected-city",children:l.city}),n.jsx("button",{className:"pl-club-change",onClick:()=>{c(null),r("")},children:"Change"})]}):n.jsxs("div",{style:{position:"relative"},children:[n.jsx("input",{type:"text",className:"pl-club-input",placeholder:"Burlington Eagles, Mississauga…",value:t,onChange:u=>r(u.target.value),autoComplete:"off",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false"}),t.trim().length>=2&&n.jsxs("div",{className:"pl-club-dropdown",children:[i&&n.jsx("div",{className:"pl-club-status",children:"Searching…"}),!i&&s.length===0&&n.jsx("div",{className:"pl-club-status",children:"No clubs found — you can still sign up."}),s.map(u=>n.jsxs("button",{className:"pl-club-result",onClick:()=>{c(u),r(""),a([])},children:[n.jsx("span",{className:"pl-club-result-name",children:u.name}),u.city&&n.jsx("span",{className:"pl-club-result-meta",children:u.city})]},u.id))]})]})]}),n.jsx("button",{className:"pl-cta",onClick:h,children:l?`Start with ${l.name} →`:"Start for free — takes 30 seconds →"}),n.jsx("p",{className:"pl-cta-hint",children:"Sign in with your Google account. No credit card. Just hockey."})]}),n.jsxs("section",{className:"pl-steps",children:[n.jsx("h2",{className:"pl-section-title",children:"Here's how it works"}),n.jsxs("div",{className:"pl-step-list",children:[n.jsxs("div",{className:"pl-step",children:[n.jsx("div",{className:"pl-step-num",children:"1"}),n.jsxs("div",{className:"pl-step-body",children:[n.jsx("div",{className:"pl-step-title",children:"Sign up in 30 seconds"}),n.jsx("div",{className:"pl-step-text",children:"Sign in with Google. Pick your team. Create your screen name. Done."})]})]}),n.jsxs("div",{className:"pl-step",children:[n.jsx("div",{className:"pl-step-num",children:"2"}),n.jsxs("div",{className:"pl-step-body",children:[n.jsx("div",{className:"pl-step-title",children:"Log shots and stickhandling every day"}),n.jsx("div",{className:"pl-step-text",children:"Tap a shot type or stickhandling drill. Enter how many. Takes 5 seconds. The more you log, the higher you climb."})]})]}),n.jsxs("div",{className:"pl-step",children:[n.jsx("div",{className:"pl-step-num",children:"3"}),n.jsxs("div",{className:"pl-step-body",children:[n.jsx("div",{className:"pl-step-title",children:"Compete every week"}),n.jsx("div",{className:"pl-step-text",children:"Every Monday, you get matched against one player from another team. Most reps by Sunday wins. New rival every week."})]})]})]})]}),n.jsx(tm,{}),n.jsx(rm,{}),n.jsx("section",{className:"pl-videos",children:n.jsxs("div",{className:"pl-videos-inner",children:[n.jsx("div",{className:"pl-eyebrow",children:"SKILL VIDEOS"}),n.jsx("h2",{className:"pl-section-title pl-section-title--left",children:"Watch a drill. Then go do it."}),n.jsx("p",{className:"pl-section-sub pl-section-sub--left",children:"The app includes curated YouTube videos for every shot type and stickhandling skill — wrist shots, snap shots, toe drags, figure eights, and more. Pick a drill, watch it once, then log your reps."}),n.jsx("div",{className:"pl-video-types",children:["Wrist shots","Snap shots","Slap shots","Backhand shots","Toe drags","Figure eights","Lateral moves","One-hand drills"].map(u=>n.jsx("div",{className:"pl-video-tag",children:u},u))})]})}),n.jsxs("section",{className:"pl-what",children:[n.jsx("h2",{className:"pl-section-title",children:"What you track"}),n.jsxs("div",{className:"pl-what-grid",children:[n.jsxs("div",{className:"pl-what-card",children:[n.jsx("div",{className:"pl-what-icon",children:"🥅"}),n.jsx("div",{className:"pl-what-title",children:"Shots"}),n.jsx("div",{className:"pl-what-text",children:"Wrist, snap, slap, and backhand shots. Goalies track saves. Tap and log — takes 3 seconds."})]}),n.jsxs("div",{className:"pl-what-card",children:[n.jsx("div",{className:"pl-what-icon",children:"🏒"}),n.jsx("div",{className:"pl-what-title",children:"Stickhandling"}),n.jsx("div",{className:"pl-what-text",children:"Toe drags, figure eights, lateral moves, one-hand. Every rep counts."})]}),n.jsxs("div",{className:"pl-what-card",children:[n.jsx("div",{className:"pl-what-icon",children:"🔥"}),n.jsx("div",{className:"pl-what-title",children:"Streaks"}),n.jsx("div",{className:"pl-what-text",children:"Log every day and build your streak. Miss a day and it resets. Simple."})]}),n.jsxs("div",{className:"pl-what-card",children:[n.jsx("div",{className:"pl-what-icon",children:"🏅"}),n.jsx("div",{className:"pl-what-title",children:"Ranks"}),n.jsx("div",{className:"pl-what-text",children:"Start at Rookie. Work your way up to Pro, Elite, and Legend. Your rank shows on your player card."})]})]})]}),n.jsx("section",{className:"pl-parent",children:n.jsxs("div",{className:"pl-parent-inner",children:[n.jsx("div",{className:"pl-parent-badge",children:"FOR PARENTS"}),n.jsx("h2",{className:"pl-parent-title",children:"Signing up your kid?"}),n.jsxs("ul",{className:"pl-parent-list",children:[n.jsx("li",{children:"You sign in with your Google account — your kid never needs a password"}),n.jsx("li",{children:"You can add multiple kids to one account and switch between them"}),n.jsx("li",{children:"You can see your kid's shot count and rank any time"}),n.jsx("li",{children:"Free. No subscription. No hidden fees."})]}),n.jsx("button",{className:"pl-cta",onClick:()=>e("/start"),children:"Sign up for my player →"}),n.jsxs("p",{className:"pl-cta-hint",style:{marginTop:20},children:["New to this? Read our"," ",n.jsx("button",{className:"pl-inline-link",onClick:()=>e("/blog/getting-started"),children:"5-step parent guide →"})]})]})}),n.jsx("style",{children:`
        .pl-inline-link {
          background: transparent; color: #60a5fa;
          font-size: inherit; font-family: inherit;
          text-decoration: underline; text-underline-offset: 3px;
          cursor: pointer; padding: 0;
        }
        .pl-inline-link:hover { color: white; }
      `}),n.jsx("style",{children:S1})]})}const S1=`
.pl-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
}

.pl-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  max-width: 720px;
  margin: 0 auto;
}
.pl-back {
  color: #8899b4;
  font-size: 15px;
  background: transparent;
}
.pl-back:hover { color: white; }
.pl-nav-cta {
  background: var(--accent);
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.pl-hero {
  text-align: center;
  padding: 40px 20px 50px;
  max-width: 600px;
  margin: 0 auto;
}
.pl-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 16px;
}
.pl-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 8vw, 56px);
  font-weight: 800;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.5px;
  margin-bottom: 18px;
}
.pl-sub {
  font-size: 18px;
  color: #a8b8d0;
  line-height: 1.55;
  margin-bottom: 28px;
}
.pl-cta {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 16px 28px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: transform 0.1s;
  width: 100%;
  max-width: 400px;
}
.pl-cta:active { transform: scale(0.98); }
.pl-cta-hint {
  font-size: 13px;
  color: #6b7fa8;
  margin-top: 10px;
}

.pl-club-search {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 16px;
  text-align: left;
}
.pl-club-search-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #4a6080;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.pl-club-input {
  width: 100%;
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--text);
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.pl-club-input:focus { border-color: var(--accent); }
.pl-club-input::placeholder { color: #3a5070; }
.pl-club-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 10px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 12px 40px rgba(0,0,0,0.5);
}
.pl-club-result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 11px 14px;
  border-bottom: 1px solid #1a2847;
  text-align: left;
  transition: background 0.1s;
}
.pl-club-result:last-child { border-bottom: none; }
.pl-club-result:hover { background: #0a0e1a; }
.pl-club-result-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.pl-club-result-meta {
  font-size: 12px;
  color: #4a6080;
  margin-top: 2px;
}
.pl-club-status {
  padding: 12px 14px;
  font-size: 13px;
  color: #4a6080;
  text-align: center;
}
.pl-club-selected {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(41,121,255,0.12);
  border: 1px solid rgba(41,121,255,0.35);
  border-radius: 10px;
  padding: 10px 14px;
}
.pl-club-selected-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
  flex: 1;
}
.pl-club-selected-city {
  font-size: 12px;
  color: #6b7fa8;
}
.pl-club-change {
  background: transparent;
  color: #60a5fa;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.pl-steps {
  padding: 50px 20px;
  max-width: 640px;
  margin: 0 auto;
  border-top: 1px solid #1a2035;
}
.pl-section-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 800;
  color: white;
  margin-bottom: 28px;
  letter-spacing: 0.2px;
}
.pl-section-title--left { text-align: left; }
.pl-section-sub { font-size: 16px; color: #8899b4; line-height: 1.55; margin-bottom: 20px; }
.pl-section-sub--left { text-align: left; }
.pl-step-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.pl-step {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
.pl-step-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(41,121,255,0.15);
  border: 1.5px solid rgba(41,121,255,0.4);
  color: #60a5fa;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pl-step-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
}
.pl-step-text {
  font-size: 15px;
  color: #8899b4;
  line-height: 1.55;
}

.pl-videos {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.pl-videos-inner {
  max-width: 640px;
  margin: 0 auto;
}
.pl-video-types {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pl-video-tag {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 14px;
  color: #a8b8d0;
  font-weight: 500;
}

.pl-what {
  padding: 50px 20px;
  max-width: 640px;
  margin: 0 auto;
  border-top: 1px solid #1a2035;
}
.pl-what-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 400px) {
  .pl-what-grid { grid-template-columns: 1fr; }
}
.pl-what-card {
  background: #0f1624;
  border: 1px solid #1a2847;
  border-radius: 14px;
  padding: 18px 16px;
}
.pl-what-icon {
  font-size: 28px;
  margin-bottom: 10px;
}
.pl-what-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
}
.pl-what-text {
  font-size: 14px;
  color: #8899b4;
  line-height: 1.5;
}

.pl-parent {
  background: #080d1a;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 50px 20px;
}
.pl-parent-inner {
  max-width: 560px;
  margin: 0 auto;
}
.pl-parent-badge {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 12px;
}
.pl-parent-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
}
.pl-parent-list {
  list-style: none;
  padding: 0;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pl-parent-list li {
  font-size: 16px;
  color: #a8b8d0;
  line-height: 1.5;
  padding-left: 24px;
  position: relative;
}
.pl-parent-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #60a5fa;
  font-weight: 700;
}
`;function _1(){const e=re();return y.useEffect(()=>{ce({title:"Hockey Coaching Dashboard — Track Player Off-Ice Training Free",description:"Free hockey coaching tool. See which players are logging shots at home, track streaks and ranks, see weekly 1v1 battle results, and motivate your team — no app required.",url:`${K}/coach`}),ft({"@context":"https://schema.org","@type":"WebApplication",name:"Hockey Shot Challenge — Coach Dashboard",url:"https://hockeyshotchallenge.com/coach",applicationCategory:"SportsApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"CAD"},description:"Free hockey coaching dashboard. Track which players log shots and stickhandling at home, see weekly activity, see 1v1 battle results, and motivate your team.",audience:{"@type":"Audience",audienceType:"Hockey coaches and club managers"}})},[]),n.jsxs("div",{className:"cl-wrap",children:[n.jsxs("nav",{className:"cl-nav",children:[n.jsx("button",{className:"cl-back",onClick:()=>e("/"),children:"← Back"}),n.jsx("button",{className:"cl-nav-cta",onClick:()=>e("/coach/start"),children:"Set up my team →"})]}),n.jsxs("section",{className:"cl-hero",children:[n.jsx("div",{className:"cl-eyebrow",children:"FREE FOR COACHES · SIGN IN WITH GOOGLE"}),n.jsx("h1",{className:"cl-title",children:"See which players are putting in the work."}),n.jsx("p",{className:"cl-sub",children:"Your players log shots and stickhandling reps every day. You see who's showing up. Free for your whole team — no app store, no subscriptions."}),n.jsx("button",{className:"cl-cta",onClick:()=>e("/coach/start"),children:"Set up my team — it's free →"}),n.jsx("p",{className:"cl-cta-hint",children:"Takes 2 minutes. Sign in with Google."})]}),n.jsx("section",{className:"cl-features",children:n.jsxs("div",{className:"cl-features-inner",children:[n.jsxs("div",{className:"cl-feature",children:[n.jsx("div",{className:"cl-feature-icon",children:"📊"}),n.jsxs("div",{className:"cl-feature-body",children:[n.jsx("div",{className:"cl-feature-title",children:"Activity feed"}),n.jsx("div",{className:"cl-feature-text",children:"See every rep your players logged this week. Filter by player or shot type. Know who's putting in the work before practice."})]})]}),n.jsxs("div",{className:"cl-feature",children:[n.jsx("div",{className:"cl-feature-icon",children:"🏆"}),n.jsxs("div",{className:"cl-feature-body",children:[n.jsx("div",{className:"cl-feature-title",children:"Weekly 1v1 battles"}),n.jsx("div",{className:"cl-feature-text",children:"Every Monday, each player gets matched 1v1 against a player from another team. Most shots by Sunday wins. You can see every result."})]})]}),n.jsxs("div",{className:"cl-feature",children:[n.jsx("div",{className:"cl-feature-icon",children:"🎬"}),n.jsxs("div",{className:"cl-feature-body",children:[n.jsx("div",{className:"cl-feature-title",children:"Skill videos"}),n.jsx("div",{className:"cl-feature-text",children:"The app includes curated drill videos for every shot type and stickhandling skill. Your players can watch a drill and log it right after."})]})]}),n.jsxs("div",{className:"cl-feature",children:[n.jsx("div",{className:"cl-feature-icon",children:"📈"}),n.jsxs("div",{className:"cl-feature-body",children:[n.jsx("div",{className:"cl-feature-title",children:"Player progress"}),n.jsx("div",{className:"cl-feature-text",children:"Track lifetime shots, current rank, and day streaks for every player on your team. See who's building the habit."})]})]})]})}),n.jsx("section",{className:"cl-dashboard-preview",children:n.jsxs("div",{className:"cl-dashboard-inner",children:[n.jsx("div",{className:"cl-eyebrow",children:"THE COACH DASHBOARD"}),n.jsx("h2",{className:"cl-section-title",children:"Your whole team. One screen."}),n.jsx("p",{className:"cl-section-sub",children:"See every player, their shot count this week, their rank, and their streak — all in one place. No spreadsheets. No chasing kids for updates."}),n.jsxs("div",{className:"cl-dash-mock",children:[n.jsxs("div",{className:"cl-dash-header",children:[n.jsx("div",{className:"cl-dash-team",children:"Peewee AA · Burlington"}),n.jsx("div",{className:"cl-dash-week",children:"This week"})]}),n.jsx("div",{className:"cl-dash-players",children:[{name:"Olivia M.",rank:"Prospect II",shots:168,streak:12,active:!0},{name:"Liam K.",rank:"Prospect I",shots:191,streak:8,active:!0},{name:"Jake T.",rank:"Rookie III",shots:84,streak:3,active:!1},{name:"Owen S.",rank:"Rookie II",shots:42,streak:1,active:!1}].map(t=>n.jsxs("div",{className:`cl-dash-row ${t.active?"cl-dash-row--active":""}`,children:[n.jsxs("div",{className:"cl-dash-player-info",children:[n.jsx("div",{className:"cl-dash-player-name",children:t.name}),n.jsx("div",{className:"cl-dash-player-rank",children:t.rank})]}),n.jsxs("div",{className:"cl-dash-player-stats",children:[n.jsxs("div",{className:"cl-dash-stat",children:[n.jsx("span",{className:"cl-dash-stat-num",children:t.shots}),n.jsx("span",{className:"cl-dash-stat-label",children:"shots"})]}),n.jsx("div",{className:"cl-dash-stat",children:n.jsxs("span",{className:"cl-dash-stat-num cl-dash-stat-num--fire",children:["🔥 ",t.streak]})})]})]},t.name))})]})]})}),n.jsx(tm,{}),n.jsx(rm,{}),n.jsx("section",{className:"cl-videos",children:n.jsxs("div",{className:"cl-videos-inner",children:[n.jsx("div",{className:"cl-eyebrow",children:"SKILL VIDEOS"}),n.jsx("h2",{className:"cl-section-title",children:"Drills your players can watch and do."}),n.jsx("p",{className:"cl-section-sub",children:"Every shot type and stickhandling skill has curated YouTube drills built right in. Players pick a drill, watch it, then log their reps. You see everything."}),n.jsx("div",{className:"cl-video-tags",children:["Wrist shots","Snap shots","Slap shots","Backhand shots","Toe drags","Figure eights","Lateral moves","One-hand drills"].map(t=>n.jsx("div",{className:"cl-video-tag",children:t},t))})]})}),n.jsx("section",{className:"cl-free",children:n.jsxs("div",{className:"cl-free-inner",children:[n.jsx("div",{className:"cl-eyebrow",children:"PRICING"}),n.jsx("h2",{className:"cl-section-title",children:"Free. For everyone."}),n.jsxs("ul",{className:"cl-free-list",children:[n.jsx("li",{children:"Free for coaches"}),n.jsx("li",{children:"Free for players"}),n.jsx("li",{children:"No app store required — runs in any browser"}),n.jsx("li",{children:"No subscription, no hidden fees"})]}),n.jsx("button",{className:"cl-cta",onClick:()=>e("/coach/start"),children:"Set up my team →"}),n.jsx("p",{className:"cl-cta-hint",children:"Sign in with Google. Takes 2 minutes."}),n.jsxs("p",{style:{marginTop:20,fontSize:14,color:"#4a6080"},children:["Managing a full association?"," ",n.jsx("button",{className:"cl-assoc-link",onClick:()=>e("/for-clubs"),children:"See club & association tools →"})]})]})}),n.jsx("style",{children:C1+`
        .cl-assoc-link {
          background: transparent; color: #60a5fa;
          font-size: inherit; font-family: inherit;
          text-decoration: underline; text-underline-offset: 3px;
          cursor: pointer; padding: 0;
        }
        .cl-assoc-link:hover { color: white; }
      `})]})}const C1=`
.cl-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
}
.cl-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  max-width: 720px;
  margin: 0 auto;
}
.cl-back {
  color: #8899b4;
  font-size: 15px;
  background: transparent;
}
.cl-back:hover { color: white; }
.cl-nav-cta {
  background: var(--accent);
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.cl-hero {
  text-align: center;
  padding: 40px 20px 50px;
  max-width: 620px;
  margin: 0 auto;
}
.cl-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 16px;
}
.cl-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 7vw, 52px);
  font-weight: 800;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.5px;
  margin-bottom: 18px;
}
.cl-sub {
  font-size: 18px;
  color: #a8b8d0;
  line-height: 1.55;
  margin-bottom: 28px;
}
.cl-cta {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 16px 28px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: transform 0.1s;
  width: 100%;
  max-width: 420px;
}
.cl-cta:active { transform: scale(0.98); }
.cl-cta-hint {
  font-size: 13px;
  color: #6b7fa8;
  margin-top: 10px;
}

.cl-features {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.cl-features-inner {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.cl-feature {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
.cl-feature-icon {
  font-size: 26px;
  width: 44px;
  height: 44px;
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cl-feature-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
}
.cl-feature-text {
  font-size: 15px;
  color: #8899b4;
  line-height: 1.55;
}

.cl-dashboard-preview {
  background: #060b18;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 60px 20px;
}
.cl-dashboard-inner {
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
}
.cl-section-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 800;
  color: white;
  margin-bottom: 14px;
  letter-spacing: 0.2px;
}
.cl-section-sub {
  font-size: 16px;
  color: #8899b4;
  line-height: 1.55;
  margin-bottom: 32px;
}
.cl-dash-mock {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 20px;
  padding: 18px 16px;
  text-align: left;
}
.cl-dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #1a2847;
}
.cl-dash-team {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.3px;
}
.cl-dash-week {
  font-size: 12px;
  color: #4a6080;
  font-weight: 600;
}
.cl-dash-players {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cl-dash-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0a1220;
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid transparent;
}
.cl-dash-row--active { border-color: rgba(41,121,255,0.2); }
.cl-dash-player-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.cl-dash-player-rank {
  font-size: 12px;
  color: #4a6080;
  margin-top: 2px;
}
.cl-dash-player-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}
.cl-dash-stat {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.cl-dash-stat-num {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 800;
  color: #60a5fa;
}
.cl-dash-stat-num--fire {
  font-size: 13px;
  color: #fb923c;
}
.cl-dash-stat-label {
  font-size: 11px;
  color: #4a6080;
}

.cl-videos {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.cl-videos-inner {
  max-width: 640px;
  margin: 0 auto;
}
.cl-video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cl-video-tag {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 14px;
  color: #a8b8d0;
  font-weight: 500;
}

.cl-free {
  background: #080d1a;
  border-top: 1px solid #1a2035;
  padding: 60px 20px;
  text-align: center;
}
.cl-free-inner {
  max-width: 480px;
  margin: 0 auto;
}
.cl-free-list {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  display: inline-flex;
}
.cl-free-list li {
  font-size: 16px;
  color: #a8b8d0;
  padding-left: 24px;
  position: relative;
}
.cl-free-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #60a5fa;
  font-weight: 700;
}
`,T1=[{slug:"getting-started",title:"How to Get Your Kid Started on Hockey Shot Challenge (It Takes 5 Minutes)",description:"A step-by-step guide for parents. Sign in with Google, set up your player, find their team, and log the first session.",date:"July 2026"},{slug:"how-squad-battles-work",title:"What Happens Every Week on Hockey Shot Challenge",description:"1v1 battles, daily logging, ranks, streaks, and what coaches can see. Here's how a full week looks.",date:"July 2026"},{slug:"off-ice-drills",title:"Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home",description:"Hockey training doesn't need ice. These five drills build shooting accuracy, stickhandling, and strength—and take 30 minutes.",date:"August 2026"},{slug:"building-practice-routine",title:"How to Build a Consistent Hockey Practice Routine (Without Burnout)",description:"Weekly practice schedules that work. How much time per day? What drills hit all the skills? Here's what coaches recommend.",date:"August 2026"},{slug:"parents-guide-youth-hockey",title:"Parent's Guide to Youth Hockey Training: What Coaches Actually Look For",description:"Not sure what your kid should be practicing? Here's what separates players who improve fast from those who plateau.",date:"August 2026"}];function E1(){const e=re();return y.useEffect(()=>{ce({title:"Blog — Hockey Shot Challenge",description:"Tips and guides for parents, players, and coaches using Hockey Shot Challenge. Learn how to get started and make the most of off-ice training.",url:`${K}/blog`})},[]),n.jsxs("div",{className:"blog-wrap",children:[n.jsxs("nav",{className:"blog-nav",children:[n.jsx("button",{className:"blog-back",onClick:()=>e("/"),children:"← Home"}),n.jsx("button",{className:"blog-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),n.jsxs("header",{className:"blog-header",children:[n.jsx("div",{className:"blog-eyebrow",children:"GUIDES & TIPS"}),n.jsx("h1",{className:"blog-index-title",children:"For parents, players & coaches."}),n.jsx("p",{className:"blog-index-sub",children:"Short guides to get the most out of Hockey Shot Challenge."})]}),n.jsx("div",{className:"blog-list",children:T1.map(t=>n.jsxs("button",{className:"blog-card",onClick:()=>e(`/blog/${t.slug}`),children:[n.jsx("div",{className:"blog-card-date",children:t.date}),n.jsx("h2",{className:"blog-card-title",children:t.title}),n.jsx("p",{className:"blog-card-desc",children:t.description}),n.jsx("span",{className:"blog-card-read",children:"Read →"})]},t.slug))}),n.jsxs("footer",{className:"blog-footer",children:[n.jsx("button",{className:"blog-foot-link",onClick:()=>e("/"),children:"← Home"}),n.jsx("button",{className:"blog-foot-cta",onClick:()=>e("/start"),children:"Start free — it's 2 minutes →"})]}),n.jsx("style",{children:A1})]})}const A1=`
.blog-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
}
body:has(.blog-wrap) { background: var(--bg) !important; }

.blog-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; max-width: 720px; margin: 0 auto;
}
.blog-back { color: #8899b4; font-size: 15px; background: transparent; }
.blog-back:hover { color: white; }
.blog-nav-cta {
  background: var(--accent); color: white;
  padding: 10px 18px; border-radius: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
}

.blog-header {
  padding: 32px 20px 40px;
  max-width: 680px; margin: 0 auto; text-align: center;
}
.blog-eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 2px;
  color: #60a5fa; margin-bottom: 14px;
}
.blog-index-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 6vw, 42px);
  font-weight: 800; color: white; line-height: 1.05;
  margin-bottom: 12px; letter-spacing: -0.3px;
}
.blog-index-sub { font-size: 17px; color: #a8b8d0; line-height: 1.5; }

.blog-list {
  max-width: 680px; margin: 0 auto;
  padding: 0 20px 60px;
  display: flex; flex-direction: column; gap: 16px;
}
.blog-card {
  background: #0f1624;
  border: 1px solid #1a2847;
  border-radius: 16px;
  padding: 24px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  width: 100%;
}
.blog-card:hover { border-color: var(--accent); }
.blog-card:active { transform: scale(0.99); }
.blog-card-date { font-size: 13px; color: #4a6080; margin-bottom: 10px; }
.blog-card-title {
  font-family: var(--font-display);
  font-size: clamp(18px, 3vw, 22px);
  font-weight: 800; color: white;
  line-height: 1.2; margin-bottom: 10px;
}
.blog-card-desc { font-size: 15px; color: #8899b4; line-height: 1.55; margin-bottom: 14px; }
.blog-card-read { font-size: 14px; color: var(--accent); font-weight: 600; }

.blog-footer {
  border-top: 1px solid #1a2035;
  padding: 24px 20px;
  max-width: 680px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 12px;
}
.blog-foot-link { color: #4a6080; font-size: 14px; background: transparent; }
.blog-foot-link:hover { color: white; }
.blog-foot-cta {
  background: var(--accent); color: white;
  padding: 12px 20px; border-radius: 10px;
  font-family: var(--font-display); font-size: 15px; font-weight: 700;
}
`;function z1(){const e=re();return y.useEffect(()=>{ce({title:"How to Get Your Kid Started on Hockey Shot Challenge",description:"A step-by-step guide for hockey parents. Sign in with Google, set up your player profile, find their team, and log the first session. Takes 5 minutes.",url:`${K}/blog/getting-started`,type:"article"}),ft([{"@context":"https://schema.org","@type":"Article",headline:"How to Get Your Kid Started on Hockey Shot Challenge",description:"A step-by-step guide for hockey parents. Sign in with Google, set up your player profile, find their team, and log the first session. Takes 5 minutes.",datePublished:"2026-07-01",dateModified:"2026-07-01",author:{"@type":"Organization",name:"Hockey Shot Challenge"},publisher:{"@type":"Organization",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com"},url:`${K}/blog/getting-started`,mainEntityOfPage:`${K}/blog/getting-started`,articleSection:"Getting Started",keywords:"hockey practice tracker, off-ice hockey training, hockey for kids, hockey shot log"},{"@context":"https://schema.org","@type":"HowTo",name:"How to Get Your Kid Started on Hockey Shot Challenge",description:"Sign up and start logging shots in 5 minutes.",totalTime:"PT5M",step:[{"@type":"HowToStep",name:"Go to hockeyshotchallenge.com",text:"Open the site in any browser on your phone. No app to download."},{"@type":"HowToStep",name:"Sign in with your Google account",text:"Use your Gmail to sign in. You are the account holder — kids never need passwords."},{"@type":"HowToStep",name:"Set up your player's profile",text:"Pick a username, enter your child's age group. Takes about two minutes."},{"@type":"HowToStep",name:"Find their team",text:"Search for their club and join. Your kid appears on the team leaderboard right away."},{"@type":"HowToStep",name:"Log the first session",text:"After practice, open the app, tap Log shots, pick a shot type, enter the count, and save."}]},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://hockeyshotchallenge.com"},{"@type":"ListItem",position:2,name:"Guides",item:`${K}/blog`},{"@type":"ListItem",position:3,name:"Getting Started",item:`${K}/blog/getting-started`}]}])},[]),n.jsxs("div",{className:"post-wrap",children:[n.jsxs("nav",{className:"post-nav",children:[n.jsx("button",{className:"post-back",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),n.jsxs("article",{className:"post-article",children:[n.jsxs("header",{className:"post-header",children:[n.jsx("div",{className:"post-eyebrow",children:"GETTING STARTED · FOR PARENTS"}),n.jsx("h1",{className:"post-title",children:"How to Get Your Kid Started on Hockey Shot Challenge"}),n.jsx("p",{className:"post-subtitle",children:"(It Takes 5 Minutes)"}),n.jsx("p",{className:"post-date",children:"July 2026"})]}),n.jsxs("div",{className:"post-body",children:[n.jsx("p",{children:`If your son or daughter plays hockey, you've probably heard the advice a hundred times: "They need to work on their shot at home."`}),n.jsx("p",{children:"But actually getting them to do it? That's the hard part."}),n.jsx("p",{children:"Hockey Shot Challenge is a free tool that makes it easier. Kids log their shots and stickhandling reps from home — the driveway, the basement, wherever they practice — and they compete with their teammates on a weekly leaderboard. When there's a scoreboard involved, kids actually want to show up."}),n.jsx("p",{children:"Here's how to get started."}),n.jsx("h2",{children:"Step 1: Go to hockeyshotchallenge.com"}),n.jsx("p",{children:"No app to download. It works right in your phone's browser. Bookmark it so your kid can find it easily."}),n.jsx("h2",{children:"Step 2: Sign in with your Google account"}),n.jsx("p",{children:"You use your Gmail to sign in — not your kid's. You're the account holder, and you can add all your kids under one login. No passwords for kids to remember."}),n.jsx("h2",{children:"Step 3: Set up your player's profile"}),n.jsx("p",{children:"Pick a username, enter your child's age group, and you're in. Takes about two minutes. The username shows up on leaderboards, so let your kid choose it."}),n.jsx("h2",{children:"Step 4: Find their team (if their coach is on here)"}),n.jsxs("p",{children:["If their coach has already set up a team, search for it and join. Your kid will show up on the team leaderboard right away. Not sure if their coach is on it? Ask — or have your coach visit ",n.jsx("button",{className:"post-inline-link",onClick:()=>e("/coach"),children:"the coach page"})," to get set up for free."]}),n.jsx("h2",{children:"Step 5: Log the first session"}),n.jsx("p",{children:'After your kid does some shots in the driveway, open the app and tap "Log shots." Pick the shot type (wrist, snap, slap, backhand), enter the number, and hit save. Done. Three seconds.'}),n.jsxs("div",{className:"post-callout",children:[n.jsx("div",{className:"post-callout-title",children:"That's it."}),n.jsx("p",{children:"From now on, every time they practice, log it. Watch them climb the rankings."})]}),n.jsx("h2",{children:"Tips that help"}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("strong",{children:"Make it a habit right after practice."})," Log it while you're still outside. Takes 5 seconds."]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Let them see the leaderboard."})," Kids care a lot more when they can see exactly where they rank."]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Don't skip small sessions."})," Even 20 shots logged beats 0. Streaks are built on consistency, not big numbers."]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Multiple kids?"})," Add them all under your account. Switch between players from the menu."]})]}),n.jsxs("div",{className:"post-cta-block",children:[n.jsx("p",{children:"Ready to get started? It's free and takes less than 5 minutes."}),n.jsx("button",{className:"post-cta",onClick:()=>e("/start"),children:"Sign in with Google →"}),n.jsxs("p",{className:"post-cta-hint",children:["Also read: ",n.jsx("button",{className:"post-inline-link",onClick:()=>e("/blog/how-squad-battles-work"),children:"What happens every week on Hockey Shot Challenge →"})]})]})]})]}),n.jsxs("footer",{className:"post-footer",children:[n.jsx("button",{className:"post-foot-link",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-foot-link",onClick:()=>e("/"),children:"Home"})]}),n.jsx("style",{children:P1})]})}const P1=`
.post-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
}
body:has(.post-wrap) { background: var(--bg) !important; }

.post-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; max-width: 720px; margin: 0 auto;
}
.post-back { color: #8899b4; font-size: 15px; background: transparent; }
.post-back:hover { color: white; }
.post-nav-cta {
  background: var(--accent); color: white;
  padding: 10px 18px; border-radius: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
}

.post-article {
  max-width: 680px; margin: 0 auto; padding: 0 20px 60px;
}
.post-header { text-align: center; padding: 32px 0 40px; }
.post-eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 2px;
  color: #60a5fa; margin-bottom: 16px;
}
.post-title {
  font-family: var(--font-display);
  font-size: clamp(26px, 5vw, 40px);
  font-weight: 800; color: white;
  line-height: 1.1; letter-spacing: -0.3px;
  margin-bottom: 10px;
}
.post-subtitle {
  font-size: 18px; color: #8899b4; margin-bottom: 10px;
}
.post-date { font-size: 13px; color: #4a6080; }

.post-body p {
  font-size: 17px; line-height: 1.7; color: #c8d8f0;
  margin-bottom: 20px;
}
.post-body h2 {
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 800; color: white;
  margin: 36px 0 14px; letter-spacing: 0.1px;
}
.post-body ul {
  margin: 0 0 24px 0; padding-left: 20px;
}
.post-body li {
  font-size: 17px; line-height: 1.7; color: #c8d8f0;
  margin-bottom: 10px;
}
.post-body strong { color: white; font-weight: 600; }

.post-callout {
  background: #0f1624;
  border: 1px solid #1e3a6a;
  border-left: 3px solid var(--accent);
  border-radius: 12px;
  padding: 20px 22px;
  margin: 28px 0;
}
.post-callout-title {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 800; color: white;
  margin-bottom: 8px;
}
.post-callout p { margin: 0; }

.post-inline-link {
  background: transparent; color: var(--accent);
  font-size: inherit; font-family: inherit;
  text-decoration: underline; text-underline-offset: 3px;
  cursor: pointer; padding: 0;
}
.post-inline-link:hover { color: white; }

.post-cta-block {
  background: #0a1220;
  border: 1px solid #1a2847;
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  margin-top: 40px;
}
.post-cta-block p { color: #a8b8d0; margin-bottom: 16px; }
.post-cta {
  display: inline-block;
  background: var(--accent); color: white;
  padding: 16px 28px; border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px; font-weight: 700;
  margin-bottom: 16px;
  transition: transform 0.1s;
}
.post-cta:active { transform: scale(0.98); }
.post-cta-hint { font-size: 14px; color: #6b7fa8; margin: 0; }

.post-footer {
  border-top: 1px solid #1a2035;
  padding: 24px 20px;
  max-width: 680px; margin: 0 auto;
  display: flex; justify-content: space-between;
}
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; }
.post-foot-link:hover { color: white; }
`;function R1(){const e=re();return y.useEffect(()=>{ce({title:"How Hockey 1v1 Weekly Battles Work — Off-Ice Competition for Kids",description:"1v1 weekly battles, daily logging, ranks, streaks, and what coaches can see. Here's exactly how a full week looks on Hockey Shot Challenge.",url:`${K}/blog/how-squad-battles-work`,type:"article"}),ft([{"@context":"https://schema.org","@type":"Article",headline:"How Hockey 1v1 Weekly Battles Work — Off-Ice Competition for Kids",description:"1v1 weekly battles, daily logging, ranks, streaks, and what coaches can see on Hockey Shot Challenge.",datePublished:"2026-07-01",dateModified:"2026-07-03",author:{"@type":"Organization",name:"Hockey Shot Challenge"},publisher:{"@type":"Organization",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com"},url:`${K}/blog/how-squad-battles-work`,mainEntityOfPage:`${K}/blog/how-squad-battles-work`,articleSection:"How It Works",keywords:"hockey 1v1 battle, hockey weekly competition kids, off-ice hockey leaderboard, hockey shot tracker weekly"},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://hockeyshotchallenge.com"},{"@type":"ListItem",position:2,name:"Guides",item:`${K}/blog`},{"@type":"ListItem",position:3,name:"How Weekly Battles Work",item:`${K}/blog/how-squad-battles-work`}]}])},[]),n.jsxs("div",{className:"post-wrap",children:[n.jsxs("nav",{className:"post-nav",children:[n.jsx("button",{className:"post-back",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),n.jsxs("article",{className:"post-article",children:[n.jsxs("header",{className:"post-header",children:[n.jsx("div",{className:"post-eyebrow",children:"HOW IT WORKS · WEEKLY BATTLES"}),n.jsx("h1",{className:"post-title",children:"What Happens Every Week on Hockey Shot Challenge"}),n.jsx("p",{className:"post-date",children:"July 2026"})]}),n.jsxs("div",{className:"post-body",children:[n.jsx("p",{children:"Once your kid is set up, the app runs on a weekly rhythm. Here's exactly what a week looks like — from Monday to Sunday."}),n.jsx("h2",{children:"Monday: A new 1v1 battle starts"}),n.jsx("p",{children:"Every Monday, your child gets matched against one player from another team. One rival. One week. The goal: log more shots than them by Sunday."}),n.jsx("p",{children:"Kids can see exactly where they stand — their shot count vs. the rival's, updated live as both players log. It creates real pressure in the best way. When your kid sees they're behind, they want to go outside and shoot. When they're ahead, they want to extend the lead."}),n.jsx("h2",{children:"Every day: Log reps in 5 seconds"}),n.jsx("p",{children:"After a practice session at home, open the app and log what they did. Shots, stickhandling, or both. Tap a shot type, enter the number, hit save. The number goes up, the leaderboard updates, and their squad can see the contribution."}),n.jsx("p",{children:"It doesn't have to be a long session. Even 20 shots logged is better than nothing — and keeps the streak alive."}),n.jsx("h2",{children:"Sunday: The battle ends"}),n.jsx("p",{children:"Whichever squad logged more shots wins. Then Monday it resets and a new battle starts with a new rival. Every week is a fresh start."}),n.jsxs("div",{className:"post-callout",children:[n.jsx("div",{className:"post-callout-title",children:"Why this works"}),n.jsx("p",{children:"Kids don't practice because you tell them to. They practice because their name is on a scoreboard and there's one specific person they want to beat. That's the whole idea."})]}),n.jsx("h2",{children:"Ranks and streaks"}),n.jsx("p",{children:"As your kid logs more sessions, they earn ranks — starting at Rookie and working up through Prospect, Regional, Provincial, and beyond. Each rank has a shot requirement and a name your kid can show off."}),n.jsx("p",{children:"There's also a streak counter that tracks how many days in a row they've logged. Kids get surprisingly attached to keeping the streak alive. Missing a day feels real when it's visible."}),n.jsx("h2",{children:"What coaches can see"}),n.jsx("p",{children:"If your child's coach is on the platform, they can see the whole team's weekly activity — who logged, how many shots, who's been consistent all month. It's a great conversation starter before practice and it lets coaches recognize the players who are quietly putting in work at home."}),n.jsx("p",{children:"Coaches can see every 1v1 battle result for their players — who won, who lost, by how much. All without any extra work on your part — just keep logging."}),n.jsx("h2",{children:"What you track"}),n.jsxs("p",{children:[n.jsx("strong",{children:"Shots"})," — wrist shots, snap shots, slap shots, backhands. Goalies can track saves. Tap a type, tap a number, done."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Stickhandling"})," — log reps or minutes. Great for basement practice when shooting isn't an option."]}),n.jsxs("div",{className:"post-cta-block",children:[n.jsx("p",{children:"Not signed up yet? It's free and takes less than 5 minutes."}),n.jsx("button",{className:"post-cta",onClick:()=>e("/player"),children:"Get started — it's free →"}),n.jsxs("p",{className:"post-cta-hint",children:["Also read: ",n.jsx("button",{className:"post-inline-link",onClick:()=>e("/blog/getting-started"),children:"How to get your kid set up →"})]})]})]})]}),n.jsxs("footer",{className:"post-footer",children:[n.jsx("button",{className:"post-foot-link",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-foot-link",onClick:()=>e("/"),children:"Home"})]}),n.jsx("style",{children:O1})]})}const O1=`
.post-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
}
body:has(.post-wrap) { background: var(--bg) !important; }

.post-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; max-width: 720px; margin: 0 auto;
}
.post-back { color: #8899b4; font-size: 15px; background: transparent; }
.post-back:hover { color: white; }
.post-nav-cta {
  background: var(--accent); color: white;
  padding: 10px 18px; border-radius: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
}

.post-article {
  max-width: 680px; margin: 0 auto; padding: 0 20px 60px;
}
.post-header { text-align: center; padding: 32px 0 40px; }
.post-eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 2px;
  color: #60a5fa; margin-bottom: 16px;
}
.post-title {
  font-family: var(--font-display);
  font-size: clamp(26px, 5vw, 40px);
  font-weight: 800; color: white;
  line-height: 1.1; letter-spacing: -0.3px;
  margin-bottom: 10px;
}
.post-date { font-size: 13px; color: #4a6080; }

.post-body p {
  font-size: 17px; line-height: 1.7; color: #c8d8f0;
  margin-bottom: 20px;
}
.post-body h2 {
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 800; color: white;
  margin: 36px 0 14px; letter-spacing: 0.1px;
}
.post-body strong { color: white; font-weight: 600; }

.post-callout {
  background: #0f1624;
  border: 1px solid #1e3a6a;
  border-left: 3px solid var(--accent);
  border-radius: 12px;
  padding: 20px 22px;
  margin: 28px 0;
}
.post-callout-title {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 800; color: white;
  margin-bottom: 8px;
}
.post-callout p { margin: 0; }

.post-inline-link {
  background: transparent; color: var(--accent);
  font-size: inherit; font-family: inherit;
  text-decoration: underline; text-underline-offset: 3px;
  cursor: pointer; padding: 0;
}
.post-inline-link:hover { color: white; }

.post-cta-block {
  background: #0a1220;
  border: 1px solid #1a2847;
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  margin-top: 40px;
}
.post-cta-block p { color: #a8b8d0; margin-bottom: 16px; }
.post-cta {
  display: inline-block;
  background: var(--accent); color: white;
  padding: 16px 28px; border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px; font-weight: 700;
  margin-bottom: 16px;
  transition: transform 0.1s;
}
.post-cta:active { transform: scale(0.98); }
.post-cta-hint { font-size: 14px; color: #6b7fa8; margin: 0; }

.post-footer {
  border-top: 1px solid #1a2035;
  padding: 24px 20px;
  max-width: 680px; margin: 0 auto;
  display: flex; justify-content: space-between;
}
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; }
.post-foot-link:hover { color: white; }
`;function L1(){const e=re();return y.useEffect(()=>{ce({title:"Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home",description:"Five off-ice hockey drills that build shooting accuracy, stickhandling, and strength. No ice required. Perfect for home practice.",url:`${K}/blog/off-ice-drills`,type:"article"}),ft({"@context":"https://schema.org","@type":"Article",headline:"Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home",description:"Five off-ice hockey drills that build shooting accuracy, stickhandling, and strength. No ice required.",datePublished:"2026-08-01",dateModified:"2026-08-01",author:{"@type":"Organization",name:"Hockey Shot Challenge"},publisher:{"@type":"Organization",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com"},keywords:"hockey drills, off-ice hockey training, stickhandling drills, hockey practice at home, youth hockey training"})},[]),n.jsxs("div",{className:"post-wrap",children:[n.jsxs("nav",{className:"post-nav",children:[n.jsx("button",{className:"post-back",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),n.jsxs("article",{className:"post-article",children:[n.jsxs("header",{className:"post-header",children:[n.jsx("div",{className:"post-eyebrow",children:"HOCKEY DRILLS · FOR COACHES & PARENTS"}),n.jsx("h1",{className:"post-title",children:"Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home"}),n.jsx("p",{className:"post-subtitle",children:"No ice rink required. 30 minutes. Builds shooting, stickhandling, and strength."}),n.jsx("p",{className:"post-date",children:"August 2026"})]}),n.jsxs("div",{className:"post-body",children:[n.jsx("p",{children:"The difference between good hockey players and great ones isn't always made on the ice."}),n.jsx("p",{children:"It's made at home. On the driveway. In the basement. In the backyard. The kids who put in extra work away from team practice are the ones who stand out."}),n.jsx("p",{children:"If your player wants to level up their game, here are five off-ice drills that actually work. All of them take under 30 minutes, require minimal equipment, and target the skills coaches are looking for."}),n.jsx("h2",{children:"1. Wrist Shot Accuracy Ladder (10 minutes)"}),n.jsxs("p",{children:[n.jsx("strong",{children:"What it builds:"})," Shooting accuracy and consistency."]}),n.jsx("p",{children:"Set up a target (bucket, small cone, or taped circle on the wall) at knee height, about 10 feet away. Have your player shoot 10 wrist shots from different distances — 5 feet, 10 feet, 15 feet. Count how many hit the target."}),n.jsx("p",{children:"The goal: Hit 8+ from each distance. Repeat 3 sets."}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," Coaches notice players who can find the top corner. Accuracy wins games."]}),n.jsx("h2",{children:"2. Stickhandling Ladder Drill (8 minutes)"}),n.jsxs("p",{children:[n.jsx("strong",{children:"What it builds:"})," Hand-eye coordination and puck control."]}),n.jsx("p",{children:"Lay out a ladder (or use tape to mark a ladder pattern on pavement). Stickhandle through the ladder forward, backward, and sideways. Do three passes through, increasing speed each time."}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," Players with tight stickhandling can escape pressure. It's a fundamental that never goes away."]}),n.jsx("h2",{children:"3. One-Touch Passing Wall (7 minutes)"}),n.jsxs("p",{children:[n.jsx("strong",{children:"What it builds:"})," Passing accuracy and quick release."]}),n.jsx("p",{children:"Stand 6 feet from a wall. Pass the puck or ball to the wall with one touch, receive it, pass it back. Do 20 consecutive passes without stopping. Rest. Repeat 3 times."}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," Good passes move the puck faster than skating it. Quick-passing teams score more."]}),n.jsx("h2",{children:"4. Agility Cone Weave (5 minutes)"}),n.jsxs("p",{children:[n.jsx("strong",{children:"What it builds:"})," Lateral movement, footwork, and change of direction."]}),n.jsx("p",{children:"Set up 5 cones in a line, 3 feet apart. Skate or sprint (with the stick) through the cones in a weave pattern. Do three passes as fast as possible."}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," Hockey is about making sharp cuts, not just going straight. This builds the agility scouts see."]}),n.jsx("h2",{children:"5. Push-Up + Box Hop Circuit (5 minutes)"}),n.jsxs("p",{children:[n.jsx("strong",{children:"What it builds:"})," Upper body and leg strength."]}),n.jsx("p",{children:"Do 10 push-ups, then 10 box jumps or step-ups, then 10 more push-ups. One round = 2 minutes. Do 2-3 rounds."}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," Stronger players take harder shots and crash the net harder. Strength is half the game."]}),n.jsx("h2",{children:"Making It Stick: The Consistency Hack"}),n.jsx("p",{children:"Here's the thing: one session doesn't make a player. The difference is doing this 3-4 times per week, every week, for months."}),n.jsx("p",{children:"The best way to build that habit? Track it. Log your drills the same way you'd log game stats. When your player can see their practice reps add up over time, they'll want to keep going."}),n.jsx("p",{children:"That's exactly what Hockey Shot Challenge does — it gamifies practice so kids actually want to show up."}),n.jsx("h2",{children:"The Bottom Line"}),n.jsx("p",{children:"You don't need an ice rink to get better at hockey. You need 30 minutes, some space, and a willingness to grind. These five drills hit every skill that matters, and they work anywhere."}),n.jsx("p",{children:"Start with two drills this week. Add one more next week. By September, your player will feel a real difference."})]}),n.jsxs("div",{className:"post-footer",children:[n.jsx("button",{className:"post-foot-link",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-foot-cta",onClick:()=>e("/start"),children:"Start tracking drills →"})]})]}),n.jsx("style",{children:I1})]})}const I1=`
.post-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }
body:has(.post-wrap) { background: var(--bg) !important; }
.post-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 720px; margin: 0 auto; }
.post-back { color: #8899b4; font-size: 15px; background: transparent; cursor: pointer; }
.post-back:hover { color: white; }
.post-nav-cta { background: var(--accent); color: white; padding: 10px 18px; border-radius: 10px; font-family: var(--font-display); font-size: 14px; font-weight: 700; cursor: pointer; }
.post-article { max-width: 680px; margin: 0 auto; padding: 0 20px 60px; }
.post-header { padding: 40px 0 30px; }
.post-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #60a5fa; margin-bottom: 14px; }
.post-title { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 8px; letter-spacing: -0.3px; }
.post-subtitle { font-size: 18px; color: #a8b8d0; margin-bottom: 12px; }
.post-date { font-size: 13px; color: #4a6080; }
.post-body { font-size: 16px; line-height: 1.7; color: #d0dce8; }
.post-body p { margin-bottom: 18px; }
.post-body h2 { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: white; margin: 28px 0 16px; }
.post-body strong { font-weight: 600; color: white; }
.post-footer { border-top: 1px solid #1a2035; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; cursor: pointer; }
.post-foot-link:hover { color: white; }
.post-foot-cta { background: var(--accent); color: white; padding: 12px 20px; border-radius: 10px; font-family: var(--font-display); font-size: 15px; font-weight: 700; cursor: pointer; }
`;function $1(){const e=re();return y.useEffect(()=>{ce({title:"How to Build a Consistent Hockey Practice Routine (Without Burnout)",description:"Weekly hockey training schedules for youth players. How much time per day? What skills to focus on? Here's what coaches recommend.",url:`${K}/blog/building-practice-routine`,type:"article"}),ft({"@context":"https://schema.org","@type":"Article",headline:"How to Build a Consistent Hockey Practice Routine (Without Burnout)",description:"Weekly practice schedules for youth hockey players that actually work.",datePublished:"2026-08-01",dateModified:"2026-08-01",author:{"@type":"Organization",name:"Hockey Shot Challenge"},publisher:{"@type":"Organization",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com"},keywords:"hockey practice routine, hockey training schedule, youth hockey, off-ice training, hockey conditioning"})},[]),n.jsxs("div",{className:"post-wrap",children:[n.jsxs("nav",{className:"post-nav",children:[n.jsx("button",{className:"post-back",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),n.jsxs("article",{className:"post-article",children:[n.jsxs("header",{className:"post-header",children:[n.jsx("div",{className:"post-eyebrow",children:"PRACTICE ROUTINES · FOR PARENTS"}),n.jsx("h1",{className:"post-title",children:"How to Build a Consistent Hockey Practice Routine"}),n.jsx("p",{className:"post-subtitle",children:"(Without Burnout)"}),n.jsx("p",{className:"post-date",children:"August 2026"})]}),n.jsxs("div",{className:"post-body",children:[n.jsx("p",{children:"Here's what every hockey parent wonders: How much should my kid be practicing?"}),n.jsx("p",{children:'The answer: It depends on age, goals, and what "practice" actually means.'}),n.jsx("p",{children:"A 10-year-old playing rec league needs a different routine than a 16-year-old trying to make elite travel. And neither one needs to be grinding 2 hours a day (that leads to burnout, not improvement)."}),n.jsx("p",{children:"Here's how to build a practice routine that actually sticks, broken down by age and commitment level."}),n.jsx("h2",{children:"Ages 6–10: Foundation Phase (2–3 hours/week)"}),n.jsxs("p",{children:[n.jsx("strong",{children:"Goal:"})," Learn the fundamentals. Build love for the game. Have fun."]}),n.jsx("p",{children:n.jsx("strong",{children:"Weekly breakdown:"})}),n.jsxs("ul",{style:{marginLeft:"20px",marginBottom:"18px"},children:[n.jsx("li",{children:"2–3x team practices (coach-led)"}),n.jsx("li",{children:"1–2x off-ice practice (20–30 minutes)"}),n.jsx("li",{children:"1x skills video or drill"})]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Off-ice focus:"})," Stickhandling, basic shooting, balance, fun. Keep it light."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why this works:"})," Kids this age need variety. Three team practices + 30 minutes of home drills per week is plenty. The goal is consistency, not intensity."]}),n.jsx("h2",{children:"Ages 11–14: Development Phase (4–6 hours/week)"}),n.jsxs("p",{children:[n.jsx("strong",{children:"Goal:"})," Build skating skills, shot accuracy, game sense. Start specializing."]}),n.jsx("p",{children:n.jsx("strong",{children:"Weekly breakdown:"})}),n.jsxs("ul",{style:{marginLeft:"20px",marginBottom:"18px"},children:[n.jsx("li",{children:"2–3x team practices"}),n.jsx("li",{children:"1–2x power skating or skills clinic"}),n.jsx("li",{children:"2–3x off-ice practice (30–45 minutes each)"}),n.jsx("li",{children:"1x strength/conditioning"})]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Off-ice focus:"})," Shooting accuracy, stickhandling under pressure, agility work, basic strength."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why this works:"})," This is when skill gaps start showing. Kids who add 2–3 hours of focused practice per week pull ahead. But still keep it fun — burnout is real at this age."]}),n.jsx("h2",{children:"Ages 15+: Competitive Phase (6–10 hours/week)"}),n.jsxs("p",{children:[n.jsx("strong",{children:"Goal:"})," Elite-level skills. Fitness. Game strategy. Preparing for tryouts."]}),n.jsx("p",{children:n.jsx("strong",{children:"Weekly breakdown:"})}),n.jsxs("ul",{style:{marginLeft:"20px",marginBottom:"18px"},children:[n.jsx("li",{children:"3–4x team practices"}),n.jsx("li",{children:"1–2x skills clinic or extra ice time"}),n.jsx("li",{children:"3–4x off-ice practice (45–60 minutes each)"}),n.jsx("li",{children:"2–3x strength/conditioning"}),n.jsx("li",{children:"1x video review or strategy study"})]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Off-ice focus:"})," Advanced shooting, game-speed stickhandling, footwork, strength, speed, agility."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why this works:"})," At this level, tournament and elite teams play 25+ games per season. Year-round training is expected. Serious players add 3–5 hours of off-ice work weekly."]}),n.jsx("h2",{children:"The Consistency Formula That Actually Works"}),n.jsx("p",{children:'Forget the idea of "big practice days." Consistency beats intensity every time.'}),n.jsx("p",{children:"A player who practices 30 minutes, 3x per week = 90 min/week = 4.7 hours/month. Over a year, that's 56 hours of extra skill work."}),n.jsx("p",{children:"A player who tries to do a 2-hour marathon session once per month? They burn out, miss sessions, and end up with less total work."}),n.jsxs("p",{children:[n.jsx("strong",{children:"The rule:"})," 3–4x per week, 30–60 minutes per session, is the sweet spot for most players."]}),n.jsx("h2",{children:"How to Actually Stick With It"}),n.jsxs("p",{children:[n.jsx("strong",{children:"1. Make it routine."})," Same day, same time each week. Wednesday night after school. Saturday morning. Muscle memory applies to schedules too."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"2. Track it."})," Players who see their practice reps add up — and know they're working toward a goal — stay motivated longer. Use an app to log drills."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"3. Vary the drills."})," Doing the same drill every day gets boring. Mix it up: shooting one day, stickhandling the next, fitness the third."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"4. Make it social."})," Practice with a friend when possible. Working out alone is harder."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"5. Celebrate small wins."})," Hit 5 consecutive shots? Log 20 drills this week? That's progress. Notice it."]}),n.jsx("h2",{children:"The Burnout Warning Signs"}),n.jsx("p",{children:"If your player is:"}),n.jsxs("ul",{style:{marginLeft:"20px",marginBottom:"18px"},children:[n.jsx("li",{children:"Dreading practice instead of excited for it"}),n.jsx("li",{children:"Complaining about sore joints or constant fatigue"}),n.jsx("li",{children:"Losing interest in hockey entirely"}),n.jsx("li",{children:"Missing friends because all free time is hockey"})]}),n.jsx("p",{children:"...you've gone too far. Pull back. Cut hours. Shift focus to fun. Burnout is real, and it kills hockey careers."}),n.jsx("h2",{children:"The Bottom Line"}),n.jsx("p",{children:"Your kid doesn't need to practice 3 hours a day to improve. They need to practice consistently — 3–4x per week, focused on skill, with variety — and actually show up every week."}),n.jsx("p",{children:"Consistency > intensity. Every time."}),n.jsx("p",{children:"Start with your kid's age group, add one extra session per week, and build from there. Check in every month. If they're still hungry, add more. If they're burned out, dial it back."}),n.jsx("p",{children:"The goal is to build a player (and a person) who loves hockey. The wins will follow."})]}),n.jsxs("div",{className:"post-footer",children:[n.jsx("button",{className:"post-foot-link",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-foot-cta",onClick:()=>e("/start"),children:"Track practice sessions →"})]})]}),n.jsx("style",{children:D1})]})}const D1=`
.post-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }
body:has(.post-wrap) { background: var(--bg) !important; }
.post-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 720px; margin: 0 auto; }
.post-back { color: #8899b4; font-size: 15px; background: transparent; cursor: pointer; }
.post-back:hover { color: white; }
.post-nav-cta { background: var(--accent); color: white; padding: 10px 18px; border-radius: 10px; font-family: var(--font-display); font-size: 14px; font-weight: 700; cursor: pointer; }
.post-article { max-width: 680px; margin: 0 auto; padding: 0 20px 60px; }
.post-header { padding: 40px 0 30px; }
.post-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #60a5fa; margin-bottom: 14px; }
.post-title { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 8px; letter-spacing: -0.3px; }
.post-subtitle { font-size: 18px; color: #a8b8d0; margin-bottom: 12px; }
.post-date { font-size: 13px; color: #4a6080; }
.post-body { font-size: 16px; line-height: 1.7; color: #d0dce8; }
.post-body p { margin-bottom: 18px; }
.post-body h2 { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: white; margin: 28px 0 16px; }
.post-body ul { list-style-type: disc; }
.post-body ul li { margin-bottom: 8px; }
.post-body strong { font-weight: 600; color: white; }
.post-footer { border-top: 1px solid #1a2035; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; cursor: pointer; }
.post-foot-link:hover { color: white; }
.post-foot-cta { background: var(--accent); color: white; padding: 12px 20px; border-radius: 10px; font-family: var(--font-display); font-size: 15px; font-weight: 700; cursor: pointer; }
`;function U1(){const e=re();return y.useEffect(()=>{ce({title:"Parent's Guide to Youth Hockey Training: What Coaches Actually Look For",description:"What skills do hockey coaches evaluate? How to help your kid stand out. Focus on the fundamentals that matter.",url:`${K}/blog/parents-guide-youth-hockey`,type:"article"}),ft({"@context":"https://schema.org","@type":"Article",headline:"Parent's Guide to Youth Hockey Training: What Coaches Actually Look For",description:"What skills separate good hockey players from great ones. A parent's guide to helping your kid improve.",datePublished:"2026-08-01",dateModified:"2026-08-01",author:{"@type":"Organization",name:"Hockey Shot Challenge"},publisher:{"@type":"Organization",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com"},keywords:"youth hockey training, hockey development, how to get better at hockey, hockey parent guide, hockey skills"})},[]),n.jsxs("div",{className:"post-wrap",children:[n.jsxs("nav",{className:"post-nav",children:[n.jsx("button",{className:"post-back",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),n.jsxs("article",{className:"post-article",children:[n.jsxs("header",{className:"post-header",children:[n.jsx("div",{className:"post-eyebrow",children:"COACHING INSIGHTS · FOR PARENTS"}),n.jsx("h1",{className:"post-title",children:"Parent's Guide to Youth Hockey Training"}),n.jsx("p",{className:"post-subtitle",children:"What Coaches Actually Look For"}),n.jsx("p",{className:"post-date",children:"August 2026"})]}),n.jsxs("div",{className:"post-body",children:[n.jsx("p",{children:`If you're a hockey parent, you've probably asked yourself: "What should my kid be working on?"`}),n.jsx("p",{children:`Sometimes the answer your kid's coach gives you is vague. "Work on your game." Helpful, right?`}),n.jsx("p",{children:"Here's what we've learned from talking to coaches across age groups: There are specific skills that separate players who improve fast from those who plateau. And most of them have nothing to do with raw talent."}),n.jsx("h2",{children:"The Top Skills Coaches Look For"}),n.jsx("h3",{children:"1. Shot Accuracy (Not Power)"}),n.jsx("p",{children:"Here's what coaches actually watch for: Can your player find the top corner from the slot?"}),n.jsx("p",{children:"Not how hard they can shoot. Lots of kids can wind up and rip it. But kids who can snap a quick shot into the top shelf? That's a skill that changes game outcomes."}),n.jsxs("p",{children:[n.jsx("strong",{children:"What to work on:"})," Shooting accuracy drills. Pick a specific target — top right corner, top left corner, low blocker side — and practice hitting it 20 times per session."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," A player who scores from unexpected spots gets more ice time. It's that simple."]}),n.jsx("h3",{children:"2. Stickhandling Under Pressure"}),n.jsx("p",{children:"Every player can stickhandle in open space. The ones who stand out can keep control when a defenseman is closing on them."}),n.jsx("p",{children:"Tight hands in tight spaces. That's the difference between a good player and a player who gets drafted."}),n.jsxs("p",{children:[n.jsx("strong",{children:"What to work on:"})," Stickhandling drills where they're rushed. Cone weaves at game speed. Passing and receiving while moving."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," Hockey is a contact sport. Players who can create space with their stick — not just their skates — control the puck."]}),n.jsx("h3",{children:"3. Hockey IQ (Reading the Play)"}),n.jsx("p",{children:"This is the skill parents can't easily coach. But you can help."}),n.jsx("p",{children:'Watch games with your kid. Ask: "Why did that player pass instead of shoot?" "Where was the open ice?" "How did the defenseman predict that pass?"'}),n.jsx("p",{children:"Kids who understand why things happen on ice make better decisions when it's their turn to make them."}),n.jsxs("p",{children:[n.jsx("strong",{children:"What to work on:"})," Watching full games (not just highlight reels). Playing different positions in practice. Playing shinny/pond hockey where they make all decisions."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," A player with low talent but high IQ outperforms a player with high talent and low IQ. Every time."]}),n.jsx("h3",{children:"4. Work Ethic & Consistency"}),n.jsx("p",{children:`Here's what coaches tell us: "I can teach skills. I can't teach want."`}),n.jsx("p",{children:"The player who shows up to practice first and leaves last. Who asks for extra reps. Who logs their drills instead of making excuses. That's the player who improves."}),n.jsxs("p",{children:[n.jsx("strong",{children:"What to work on:"})," Showing up. Being on time (actually, being 10 minutes early). Paying attention. Asking questions. Tracking practice sessions so they see the compounding effect over weeks and months."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," Talent gets you noticed at age 12. Work ethic gets you drafted at 16. By age 20, everyone who made it is talented. The only difference is who outworked everyone else."]}),n.jsx("h3",{children:"5. Skating (Edges, Transitions, Speed)"}),n.jsx("p",{children:"Bad skaters can't apply their skills under game pressure."}),n.jsx("p",{children:"Good skaters can explode to the net, transition fast, and stop on a dime. These aren't born abilities. They're practiced."}),n.jsxs("p",{children:[n.jsx("strong",{children:"What to work on:"})," Skating camps. Power skating. Agility drills. Transitions (forward to backward, crossovers, quick stops)."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"Why it matters:"})," A less talented player who skates better than their peers will out-produce them. Speed is the great equalizer."]}),n.jsx("h2",{children:"The Skills That DON'T Matter As Much As Parents Think"}),n.jsx("h3",{children:"Shooting Power"}),n.jsx("p",{children:"Parents get obsessed with wrist shot velocity. Coaches care about accuracy and release time."}),n.jsx("p",{children:"A quick, accurate snap shot beats a slow, hard slapshot. Every time."}),n.jsx("h3",{children:"Individual Highlight Plays"}),n.jsx("p",{children:"Your kid did a spinorama goal? Cool. But can they pass to an open teammate? Can they backceck? Can they win a board battle?"}),n.jsx("p",{children:"Coaches notice hustle plays more than highlight plays."}),n.jsx("h3",{children:'Being "The Star"'}),n.jsx("p",{children:"Players who only score, never pass, don't go far. Players who make their teammates better go to the next level."}),n.jsx("p",{children:"Teach your kid that making a play is as valuable as scoring."}),n.jsx("h2",{children:"How to Actually Help Your Kid Improve"}),n.jsxs("p",{children:[n.jsx("strong",{children:"1. Help them track what they're working on."}),' Not just "we went to practice." What specifically did they drill? How many reps?']}),n.jsxs("p",{children:[n.jsx("strong",{children:"2. Ask about mistakes, not just goals."}),' "What was hard today?" Not "Did you score?"']}),n.jsxs("p",{children:[n.jsx("strong",{children:"3. Be the person who believes in them."}),` Coaches will critique them (that's their job). You be the one who says "I see you improving."`]}),n.jsxs("p",{children:[n.jsx("strong",{children:"4. Let them struggle."})," If you fix everything, they never learn resilience. Let them have bad games. Let them work through it."]}),n.jsxs("p",{children:[n.jsx("strong",{children:"5. Celebrate consistent effort, not just results."}),' "You showed up and worked hard" beats "You scored." Both matter, but effort compounds over years.']}),n.jsx("h2",{children:"The Honest Truth"}),n.jsx("p",{children:"Most kids won't make the NHL. That's not defeatism — it's math. But almost every kid who works can improve dramatically from where they start."}),n.jsx("p",{children:"Your job as a parent isn't to make them a pro. It's to help them become the best version of themselves. And to show them that work compounds."}),n.jsx("p",{children:"Do that, and they'll succeed at hockey. And life."})]}),n.jsxs("div",{className:"post-footer",children:[n.jsx("button",{className:"post-foot-link",onClick:()=>e("/blog"),children:"← All guides"}),n.jsx("button",{className:"post-foot-cta",onClick:()=>e("/start"),children:"Help your kid track progress →"})]})]}),n.jsx("style",{children:B1})]})}const B1=`
.post-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }
body:has(.post-wrap) { background: var(--bg) !important; }
.post-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 720px; margin: 0 auto; }
.post-back { color: #8899b4; font-size: 15px; background: transparent; cursor: pointer; }
.post-back:hover { color: white; }
.post-nav-cta { background: var(--accent); color: white; padding: 10px 18px; border-radius: 10px; font-family: var(--font-display); font-size: 14px; font-weight: 700; cursor: pointer; }
.post-article { max-width: 680px; margin: 0 auto; padding: 0 20px 60px; }
.post-header { padding: 40px 0 30px; }
.post-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #60a5fa; margin-bottom: 14px; }
.post-title { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 8px; letter-spacing: -0.3px; }
.post-subtitle { font-size: 18px; color: #a8b8d0; margin-bottom: 12px; }
.post-date { font-size: 13px; color: #4a6080; }
.post-body { font-size: 16px; line-height: 1.7; color: #d0dce8; }
.post-body p { margin-bottom: 18px; }
.post-body h2 { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: white; margin: 28px 0 16px; }
.post-body h3 { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #a8b8d0; margin: 20px 0 12px; }
.post-body strong { font-weight: 600; color: white; }
.post-footer { border-top: 1px solid #1a2035; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; cursor: pointer; }
.post-foot-link:hover { color: white; }
.post-foot-cta { background: var(--accent); color: white; padding: 12px 20px; border-radius: 10px; font-family: var(--font-display); font-size: 15px; font-weight: 700; cursor: pointer; }
`;function W1(){const e=re();y.useEffect(()=>{ce({title:"10,000 Shot Challenge Tracker — Free Printable Log Sheet & Online Tracker",description:"Free printable 10000 shot challenge tracker + online app. Log your shots, track progress, compete with teammates. Perfect for summer hockey training.",url:`${K}/10000-shot-challenge`}),ft({"@context":"https://schema.org","@type":"WebPage",name:"10,000 Shot Challenge Tracker",description:"Free 10000 shot challenge tracking sheet and online app for hockey players and associations.",url:`${K}/10000-shot-challenge`,mainEntity:{"@type":"SoftwareApplication",name:"Hockey Shot Challenge",applicationCategory:"SportsApplication",url:"https://hockeyshotchallenge.com"}})},[]);const t=()=>{const r=document.createElement("a");r.href="/10k-challenge-tracker.pdf",r.download="10K-Shot-Challenge-Tracker.pdf",document.body.appendChild(r),r.click(),document.body.removeChild(r)};return n.jsxs("div",{className:"tenk-wrap",children:[n.jsxs("nav",{className:"tenk-nav",children:[n.jsx("button",{className:"tenk-logo",onClick:()=>e("/"),children:"🏒 Hockey Shot Challenge"}),n.jsx("button",{className:"tenk-start",onClick:()=>e("/start"),children:"Start tracking →"})]}),n.jsxs("section",{className:"tenk-hero",children:[n.jsx("div",{className:"tenk-eyebrow",children:"10,000 SHOT CHALLENGE"}),n.jsx("h1",{className:"tenk-title",children:"The Modern Way to Track Your Summer Challenge"}),n.jsx("p",{className:"tenk-sub",children:"Free printable tracking sheet + online app. Stop using spreadsheets. Start competing."}),n.jsxs("div",{className:"tenk-hero-cta",children:[n.jsx("button",{className:"tenk-btn tenk-btn--primary",onClick:t,children:"📥 Download Free PDF Tracker"}),n.jsx("button",{className:"tenk-btn tenk-btn--secondary",onClick:()=>e("/start"),children:"Try Online Tracker (Free) →"})]}),n.jsx("div",{className:"tenk-hero-image",children:n.jsxs("div",{className:"tenk-tracker-preview",children:[n.jsxs("div",{className:"tenk-preview-row",children:[n.jsx("span",{className:"tenk-preview-label",children:"Player"}),n.jsx("span",{className:"tenk-preview-label",children:"Week 1"}),n.jsx("span",{className:"tenk-preview-label",children:"Total"})]}),n.jsxs("div",{className:"tenk-preview-row",children:[n.jsx("span",{className:"tenk-preview-name",children:"Your Name"}),n.jsx("span",{className:"tenk-preview-value",children:"150"}),n.jsx("span",{className:"tenk-preview-value tenk-preview-total",children:"1,250"})]}),n.jsxs("div",{className:"tenk-preview-row",children:[n.jsx("span",{className:"tenk-preview-name",children:"Teammate 1"}),n.jsx("span",{className:"tenk-preview-value",children:"200"}),n.jsx("span",{className:"tenk-preview-value",children:"1,100"})]}),n.jsxs("div",{className:"tenk-preview-row",children:[n.jsx("span",{className:"tenk-preview-name",children:"Teammate 2"}),n.jsx("span",{className:"tenk-preview-value",children:"180"}),n.jsx("span",{className:"tenk-preview-value",children:"950"})]})]})})]}),n.jsxs("section",{className:"tenk-section",children:[n.jsx("h2",{children:"Why Kids Use Hockey Shot Challenge Instead of PDF Sheets"}),n.jsxs("div",{className:"tenk-grid",children:[n.jsxs("div",{className:"tenk-card",children:[n.jsx("div",{className:"tenk-card-icon",children:"⚡"}),n.jsx("h3",{children:"Instant Updates"}),n.jsx("p",{children:"Log shots in 5 seconds. Leaderboard updates live. No manually entering counts."})]}),n.jsxs("div",{className:"tenk-card",children:[n.jsx("div",{className:"tenk-card-icon",children:"🏆"}),n.jsx("h3",{children:"Real Competition"}),n.jsx("p",{children:"See your rank instantly. Compete with your team. The scoreboard effect actually works."})]}),n.jsxs("div",{className:"tenk-card",children:[n.jsx("div",{className:"tenk-card-icon",children:"📊"}),n.jsx("h3",{children:"See Your Progress"}),n.jsx("p",{children:"Weekly breakdowns, streaks, shots by type. PDF sheets don't show this."})]}),n.jsxs("div",{className:"tenk-card",children:[n.jsx("div",{className:"tenk-card-icon",children:"📱"}),n.jsx("h3",{children:"Works Everywhere"}),n.jsx("p",{children:"Phone, tablet, no app to download. Works on any device, instantly."})]}),n.jsxs("div",{className:"tenk-card",children:[n.jsx("div",{className:"tenk-card-icon",children:"🔗"}),n.jsx("h3",{children:"Share Your Progress"}),n.jsx("p",{children:"Send your leaderboard link to parents and coaches. Everyone stays updated."})]}),n.jsxs("div",{className:"tenk-card",children:[n.jsx("div",{className:"tenk-card-icon",children:"🎯"}),n.jsx("h3",{children:"Milestone Celebrations"}),n.jsx("p",{children:"Hit 5K? 10K? Get a celebration. Kids actually stay motivated."})]})]})]}),n.jsxs("section",{className:"tenk-section tenk-section--how",children:[n.jsx("h2",{children:"How It Works (2 Minutes to Set Up)"}),n.jsxs("div",{className:"tenk-steps",children:[n.jsxs("div",{className:"tenk-step",children:[n.jsx("div",{className:"tenk-step-num",children:"1"}),n.jsx("h3",{children:"Download the Free PDF"}),n.jsx("p",{children:"Print and post it. Classic tracking sheet format — nothing fancy."})]}),n.jsxs("div",{className:"tenk-step",children:[n.jsx("div",{className:"tenk-step-num",children:"2"}),n.jsx("h3",{children:"Or Use the Free App"}),n.jsx("p",{children:"Create your team leaderboard on Hockey Shot Challenge. No credit card required."})]}),n.jsxs("div",{className:"tenk-step",children:[n.jsx("div",{className:"tenk-step-num",children:"3"}),n.jsx("h3",{children:"Log Shots After Practice"}),n.jsx("p",{children:"Tap the app or mark the sheet. Everyone sees the updated leaderboard instantly."})]}),n.jsxs("div",{className:"tenk-step",children:[n.jsx("div",{className:"tenk-step-num",children:"4"}),n.jsx("h3",{children:"Winner Gets Bragging Rights"}),n.jsx("p",{children:"Hit 10,000 first? Celebrate. The leaderboard keeps everyone pushing all summer."})]})]})]}),n.jsxs("section",{className:"tenk-section tenk-section--assoc",children:[n.jsx("h2",{children:"Running a 10K Challenge for Your Association?"}),n.jsxs("div",{className:"tenk-assoc-content",children:[n.jsx("p",{className:"tenk-assoc-sub",children:"Hundreds of associations run 10K Challenges every summer. Most use PDF sheets or outdated tools. We've built a better way — free for you, better experience for your families."}),n.jsxs("div",{className:"tenk-assoc-offer",children:[n.jsx("h3",{children:"Free Association Leaderboards"}),n.jsx("p",{children:"We set up a branded leaderboard for your association. Your families sign up, log shots, compete. No cost. No ads. You manage everything."}),n.jsx("button",{className:"tenk-btn tenk-btn--secondary",onClick:()=>e("/association-partnership"),children:"Learn About Association Partnerships →"})]})]})]}),n.jsxs("section",{className:"tenk-section",children:[n.jsx("h2",{children:"FAQ"}),n.jsxs("div",{className:"tenk-faq",children:[n.jsxs("details",{className:"tenk-faq-item",children:[n.jsx("summary",{children:"Can we really use this for free?"}),n.jsx("p",{children:"Yes. Hockey Shot Challenge is free for players, teams, and associations. Forever. No hidden tiers."})]}),n.jsxs("details",{className:"tenk-faq-item",children:[n.jsx("summary",{children:"Do kids need an app?"}),n.jsx("p",{children:"No. Works in any web browser on phone or computer. No app to download, no accounts for each player."})]}),n.jsxs("details",{className:"tenk-faq-item",children:[n.jsx("summary",{children:"Can we run this for our whole association?"}),n.jsx("p",{children:"Yes. We can set up a branded leaderboard for your association, league, or club. All free. Email us to get started."})]}),n.jsxs("details",{className:"tenk-faq-item",children:[n.jsx("summary",{children:"What if we prefer PDF sheets?"}),n.jsx("p",{children:"Download the free PDF above. But if you want live leaderboards + real-time competition, try the app."})]}),n.jsxs("details",{className:"tenk-faq-item",children:[n.jsx("summary",{children:"Can parents see the leaderboard?"}),n.jsx("p",{children:"Yes. Share the link with anyone. Coaches, parents, players — everyone sees the real-time standings."})]})]})]}),n.jsxs("section",{className:"tenk-section tenk-section--final",children:[n.jsx("h2",{children:"Start Your 10K Challenge Today"}),n.jsx("p",{className:"tenk-final-sub",children:"Free. Takes 2 minutes to set up. No credit card required."}),n.jsxs("div",{className:"tenk-final-btns",children:[n.jsx("button",{className:"tenk-btn tenk-btn--primary",onClick:()=>e("/start"),children:"Create Your Challenge →"}),n.jsx("button",{className:"tenk-btn tenk-btn--outline",onClick:t,children:"Download PDF Instead"})]})]}),n.jsxs("footer",{className:"tenk-footer",children:[n.jsxs("p",{children:["Questions? ",n.jsx("a",{href:"mailto:samuelmenard@gmail.com",style:{color:"var(--accent)",textDecoration:"none"},children:"Email us"})]}),n.jsx("p",{style:{fontSize:"12px",color:"var(--text-mute)",marginTop:"8px"},children:"Hockey Shot Challenge — Free 10,000 shot challenge tracker for players and associations"})]}),n.jsx("style",{children:F1})]})}const F1=`
.tenk-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); }
body:has(.tenk-wrap) { background: var(--bg) !important; }

.tenk-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 1200px; margin: 0 auto; }
.tenk-logo { font-size: 18px; font-weight: 700; background: transparent; cursor: pointer; color: white; }
.tenk-start { background: var(--accent); color: white; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }

.tenk-hero { max-width: 1000px; margin: 0 auto; padding: 60px 20px 40px; text-align: center; }
.tenk-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 16px; }
.tenk-title { font-family: var(--font-display); font-size: clamp(32px, 8vw, 56px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 16px; }
.tenk-sub { font-size: 18px; color: var(--text-soft); margin-bottom: 32px; }

.tenk-hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
.tenk-btn { border: none; border-radius: 10px; padding: 14px 28px; font-weight: 700; font-family: var(--font-display); font-size: 16px; cursor: pointer; transition: all 0.2s; }
.tenk-btn--primary { background: var(--accent); color: white; }
.tenk-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(41, 121, 255, 0.3); }
.tenk-btn--secondary { background: transparent; color: white; border: 2px solid var(--accent); }
.tenk-btn--secondary:hover { background: rgba(41, 121, 255, 0.1); }
.tenk-btn--outline { background: transparent; color: var(--accent); border: 2px solid var(--accent); }

.tenk-hero-image { margin-top: 40px; }
.tenk-tracker-preview { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 20px; font-family: monospace; font-size: 13px; }
.tenk-preview-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; padding: 12px 0; border-bottom: 1px solid #1a2847; }
.tenk-preview-row:last-child { border-bottom: none; }
.tenk-preview-label { color: var(--text-soft); font-weight: 600; }
.tenk-preview-name { color: white; font-weight: 600; }
.tenk-preview-value { color: var(--ice); text-align: right; }
.tenk-preview-total { color: var(--accent); font-weight: 700; }

.tenk-section { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
.tenk-section h2 { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; margin-bottom: 40px; text-align: center; }

.tenk-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.tenk-card { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 24px; }
.tenk-card-icon { font-size: 40px; margin-bottom: 12px; }
.tenk-card h3 { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: white; margin-bottom: 8px; }
.tenk-card p { font-size: 14px; color: var(--text-soft); line-height: 1.5; }

.tenk-section--how { background: rgba(41, 121, 255, 0.05); }
.tenk-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.tenk-step { text-align: center; }
.tenk-step-num { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: var(--accent); color: white; border-radius: 50%; font-weight: 800; font-size: 20px; margin-bottom: 16px; }
.tenk-step h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.tenk-step p { font-size: 14px; color: var(--text-soft); }

.tenk-section--assoc { background: #0f1624; border-radius: 16px; }
.tenk-assoc-sub { font-size: 16px; color: var(--text-soft); margin-bottom: 24px; line-height: 1.6; }
.tenk-assoc-offer { background: rgba(41, 121, 255, 0.1); border: 1px solid rgba(41, 121, 255, 0.3); border-radius: 12px; padding: 24px; margin-top: 24px; }
.tenk-assoc-offer h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.tenk-assoc-offer p { margin-bottom: 16px; }

.tenk-faq { display: flex; flex-direction: column; gap: 12px; }
.tenk-faq-item { background: #0f1624; border: 1px solid #1a2847; border-radius: 10px; padding: 16px; cursor: pointer; }
.tenk-faq-item summary { font-weight: 700; color: white; outline: none; }
.tenk-faq-item p { margin-top: 12px; color: var(--text-soft); font-size: 14px; line-height: 1.6; }

.tenk-section--final { text-align: center; background: rgba(61, 214, 140, 0.05); border-radius: 16px; }
.tenk-final-sub { font-size: 16px; color: var(--text-soft); margin-bottom: 24px; }
.tenk-final-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

.tenk-footer { border-top: 1px solid #1a2035; padding: 40px 20px; text-align: center; max-width: 1200px; margin: 0 auto; font-size: 14px; color: var(--text-soft); }
`;function M1(){const e=re();return y.useEffect(()=>{ce({title:"Free 10K Challenge Tracking for Hockey Associations — Partner With Us",description:"Run your association's 10,000 shot challenge on Hockey Shot Challenge. Free branded leaderboards, zero setup hassle. We handle the tech.",url:`${K}/association-partnership`}),ft({"@context":"https://schema.org","@type":"WebPage",name:"Association Partnership Program",description:"Free hockey association leaderboard platform for 10,000 shot challenges.",url:`${K}/association-partnership`})},[]),n.jsxs("div",{className:"assoc-wrap",children:[n.jsxs("nav",{className:"assoc-nav",children:[n.jsx("button",{className:"assoc-logo",onClick:()=>e("/"),children:"🏒 Hockey Shot Challenge"}),n.jsx("button",{className:"assoc-contact",onClick:()=>window.location.href="mailto:samuelmenard@gmail.com?subject=Association Partnership",children:"Get Started →"})]}),n.jsxs("section",{className:"assoc-hero",children:[n.jsx("div",{className:"assoc-eyebrow",children:"FOR HOCKEY ASSOCIATIONS"}),n.jsx("h1",{className:"assoc-title",children:"Run Your 10K Challenge Better"}),n.jsx("p",{className:"assoc-sub",children:"Hundreds of associations run summer 10,000 shot challenges. Most use PDF sheets or outdated tools. We've built the modern platform — free for you to use."}),n.jsx("button",{className:"assoc-btn assoc-btn--primary",onClick:()=>window.location.href="mailto:samuelmenard@gmail.com?subject=Association Partnership",children:"Partner With Us (Free)"})]}),n.jsxs("section",{className:"assoc-section",children:[n.jsx("h2",{children:"The Problem With PDF Sheets"}),n.jsxs("div",{className:"assoc-problems",children:[n.jsxs("div",{className:"assoc-problem",children:[n.jsx("div",{className:"assoc-problem-icon",children:"❌"}),n.jsx("h3",{children:"Manual Updates"}),n.jsx("p",{children:"Families email counts. You manually enter them. Takes hours per week."})]}),n.jsxs("div",{className:"assoc-problem",children:[n.jsx("div",{className:"assoc-problem-icon",children:"❌"}),n.jsx("h3",{children:"No Real Competition"}),n.jsx("p",{children:"Kids don't see live leaderboards. No scoreboard effect. Engagement drops."})]}),n.jsxs("div",{className:"assoc-problem",children:[n.jsx("div",{className:"assoc-problem-icon",children:"❌"}),n.jsx("h3",{children:"No Accountability"}),n.jsx("p",{children:"Hard to verify. Parents question counts. No easy way to track trends."})]}),n.jsxs("div",{className:"assoc-problem",children:[n.jsx("div",{className:"assoc-problem-icon",children:"❌"}),n.jsx("h3",{children:"Poor Experience"}),n.jsx("p",{children:"PDF sheets feel outdated. Families expect apps. Looks unprofessional."})]})]})]}),n.jsxs("section",{className:"assoc-section assoc-section--solution",children:[n.jsx("h2",{children:"The Better Way"}),n.jsxs("div",{className:"assoc-solution",children:[n.jsx("div",{className:"assoc-solution-icon",children:"✅"}),n.jsx("h3",{children:"We Handle Everything"}),n.jsx("p",{children:"We set up your branded leaderboard. You send families one link. They sign up and log shots. Done."})]}),n.jsxs("div",{className:"assoc-features",children:[n.jsxs("div",{className:"assoc-feature",children:[n.jsx("div",{className:"assoc-feature-emoji",children:"⚡"}),n.jsx("h3",{children:"Instant Updates"}),n.jsx("p",{children:"Kids log shots in 5 seconds. Leaderboard updates live. No manual entry."})]}),n.jsxs("div",{className:"assoc-feature",children:[n.jsx("div",{className:"assoc-feature-emoji",children:"📊"}),n.jsx("h3",{children:"Real Competition"}),n.jsx("p",{children:"Live leaderboard keeps families engaged all summer. Kids see their rank instantly."})]}),n.jsxs("div",{className:"assoc-feature",children:[n.jsx("div",{className:"assoc-feature-emoji",children:"✔️"}),n.jsx("h3",{children:"Built-in Verification"}),n.jsx("p",{children:"Kids log their own shots. Timestamps prove authenticity. No disputes."})]}),n.jsxs("div",{className:"assoc-feature",children:[n.jsx("div",{className:"assoc-feature-emoji",children:"📱"}),n.jsx("h3",{children:"Mobile-First Design"}),n.jsx("p",{children:"Works on any phone. No app to download. Professional, modern look."})]}),n.jsxs("div",{className:"assoc-feature",children:[n.jsx("div",{className:"assoc-feature-emoji",children:"🎯"}),n.jsx("h3",{children:"Celebration Milestones"}),n.jsx("p",{children:"Kids get celebrated when they hit 5K, 10K, etc. Keeps motivation high."})]}),n.jsxs("div",{className:"assoc-feature",children:[n.jsx("div",{className:"assoc-feature-emoji",children:"👨‍💼"}),n.jsx("h3",{children:"You Stay in Control"}),n.jsx("p",{children:"Your association branding. Your leaderboard. You manage everything. We just provide the platform."})]})]})]}),n.jsxs("section",{className:"assoc-section",children:[n.jsx("h2",{children:"How It Works (4 Steps)"}),n.jsxs("div",{className:"assoc-steps",children:[n.jsxs("div",{className:"assoc-step",children:[n.jsx("div",{className:"assoc-step-num",children:"1"}),n.jsx("h3",{children:"Email Us"}),n.jsx("p",{children:"Tell us your association name and how many players you expect. We'll set everything up."})]}),n.jsxs("div",{className:"assoc-step",children:[n.jsx("div",{className:"assoc-step-num",children:"2"}),n.jsx("h3",{children:"We Build Your Leaderboard"}),n.jsx("p",{children:"We create a branded leaderboard with your association name and colors. Takes 1 business day."})]}),n.jsxs("div",{className:"assoc-step",children:[n.jsx("div",{className:"assoc-step-num",children:"3"}),n.jsx("h3",{children:"Share the Link"}),n.jsx("p",{children:"Send families one link. They sign up, create a player profile, start logging shots."})]}),n.jsxs("div",{className:"assoc-step",children:[n.jsx("div",{className:"assoc-step-num",children:"4"}),n.jsx("h3",{children:"Watch It Happen"}),n.jsx("p",{children:"Families compete all summer. Kids log shots. Leaderboard updates live. You're done."})]})]})]}),n.jsxs("section",{className:"assoc-section assoc-section--pricing",children:[n.jsx("h2",{children:"Pricing"}),n.jsx("div",{className:"assoc-pricing",children:n.jsxs("div",{className:"assoc-price-card",children:[n.jsx("h3",{children:"Complete. Totally Free."}),n.jsx("p",{children:"No setup fees. No transaction fees. No hidden costs. Forever."}),n.jsxs("ul",{style:{marginTop:"20px",marginLeft:"20px"},children:[n.jsx("li",{children:"Branded leaderboard"}),n.jsx("li",{children:"Unlimited players"}),n.jsx("li",{children:"Live updates all summer"}),n.jsx("li",{children:"Full shot tracking"}),n.jsx("li",{children:"Milestone celebrations"}),n.jsx("li",{children:"Shareable player links"})]})]})})]}),n.jsxs("section",{className:"assoc-section",children:[n.jsx("h2",{children:"What Associations Say"}),n.jsxs("div",{className:"assoc-testimonials",children:[n.jsxs("div",{className:"assoc-testimonial",children:[n.jsx("p",{className:"assoc-quote",children:'"We used to spend hours manually updating a spreadsheet. This is so much better — families are more engaged and kids love seeing the live leaderboard."'}),n.jsx("p",{className:"assoc-author",children:"— Hockey Coach, U14 AA"})]}),n.jsxs("div",{className:"assoc-testimonial",children:[n.jsx("p",{className:"assoc-quote",children:`"The kids are actually pushing harder because they can see where they rank in real-time. The engagement is night and day compared to last year's PDF sheet."`}),n.jsx("p",{className:"assoc-author",children:"— Association Director"})]})]})]}),n.jsxs("section",{className:"assoc-section",children:[n.jsx("h2",{children:"FAQ"}),n.jsxs("div",{className:"assoc-faq",children:[n.jsxs("details",{className:"assoc-faq-item",children:[n.jsx("summary",{children:"How much does this cost?"}),n.jsx("p",{children:"Nothing. Completely free for associations. No setup fees, no per-player fees, no transaction fees."})]}),n.jsxs("details",{className:"assoc-faq-item",children:[n.jsx("summary",{children:"Do we need to set up individual accounts for each player?"}),n.jsx("p",{children:"No. Kids sign up themselves when they get the link. Parents manage accounts via their Google login."})]}),n.jsxs("details",{className:"assoc-faq-item",children:[n.jsx("summary",{children:"Can we customize it with our association colors and logo?"}),n.jsx("p",{children:"Yes. We brand the leaderboard with your association name. For logos and colors, email us and we'll make it happen."})]}),n.jsxs("details",{className:"assoc-faq-item",children:[n.jsx("summary",{children:"What if parents don't want to use the app?"}),n.jsx("p",{children:"They can use the free PDF sheet we provide instead. Or you can offer both — some families use the app, others use the sheet."})]}),n.jsxs("details",{className:"assoc-faq-item",children:[n.jsx("summary",{children:"How do we know the shot counts are real?"}),n.jsx("p",{children:"Kids log them themselves. Each entry is timestamped. It's actually more transparent than manual spreadsheets."})]}),n.jsxs("details",{className:"assoc-faq-item",children:[n.jsx("summary",{children:"How long does setup take?"}),n.jsx("p",{children:"1 business day. Email us your association name and we'll have your leaderboard ready to go."})]})]})]}),n.jsxs("section",{className:"assoc-section assoc-section--final",children:[n.jsx("h2",{children:"Ready to Run a Better Challenge?"}),n.jsx("p",{className:"assoc-final-sub",children:"Email us to set up your association's free leaderboard."}),n.jsx("button",{className:"assoc-btn assoc-btn--primary",onClick:()=>window.location.href="mailto:samuelmenard@gmail.com?subject=Association Partnership - 10K Challenge",children:"Get Started (Free)"})]}),n.jsxs("footer",{className:"assoc-footer",children:[n.jsxs("p",{children:["Questions? ",n.jsx("a",{href:"mailto:samuelmenard@gmail.com",style:{color:"var(--accent)",textDecoration:"none"},children:"Email us"})]}),n.jsx("p",{style:{fontSize:"12px",color:"var(--text-mute)",marginTop:"8px"},children:"Hockey Shot Challenge — Free 10K Challenge Platform for Associations"})]}),n.jsx("style",{children:H1})]})}const H1=`
.assoc-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); }
body:has(.assoc-wrap) { background: var(--bg) !important; }

.assoc-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 1200px; margin: 0 auto; }
.assoc-logo { font-size: 18px; font-weight: 700; background: transparent; cursor: pointer; color: white; border: none; }
.assoc-contact { background: var(--accent); color: white; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; border: none; }

.assoc-hero { max-width: 1000px; margin: 0 auto; padding: 60px 20px 40px; text-align: center; }
.assoc-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 16px; }
.assoc-title { font-family: var(--font-display); font-size: clamp(32px, 8vw, 56px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 16px; }
.assoc-sub { font-size: 18px; color: var(--text-soft); margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto; }

.assoc-btn { border: none; border-radius: 10px; padding: 14px 28px; font-weight: 700; font-family: var(--font-display); font-size: 16px; cursor: pointer; transition: all 0.2s; }
.assoc-btn--primary { background: var(--accent); color: white; }
.assoc-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(41, 121, 255, 0.3); }

.assoc-section { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
.assoc-section h2 { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; margin-bottom: 40px; text-align: center; }

.assoc-problems { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.assoc-problem { text-align: center; }
.assoc-problem-icon { font-size: 40px; margin-bottom: 12px; }
.assoc-problem h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.assoc-problem p { font-size: 14px; color: var(--text-soft); }

.assoc-section--solution { background: rgba(41, 121, 255, 0.05); border-radius: 16px; }
.assoc-solution { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 24px; margin-bottom: 40px; text-align: center; }
.assoc-solution-icon { font-size: 48px; margin-bottom: 12px; }
.assoc-solution h3 { font-family: var(--font-display); font-size: 24px; font-weight: 700; margin-bottom: 12px; }
.assoc-solution p { font-size: 16px; color: var(--text-soft); }

.assoc-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.assoc-feature { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 20px; }
.assoc-feature-emoji { font-size: 32px; margin-bottom: 8px; }
.assoc-feature h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.assoc-feature p { font-size: 14px; color: var(--text-soft); }

.assoc-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.assoc-step { text-align: center; }
.assoc-step-num { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: var(--accent); color: white; border-radius: 50%; font-weight: 800; font-size: 20px; margin-bottom: 16px; }
.assoc-step h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.assoc-step p { font-size: 14px; color: var(--text-soft); }

.assoc-section--pricing { text-align: center; }
.assoc-pricing { max-width: 600px; margin: 0 auto; }
.assoc-price-card { background: #0f1624; border: 2px solid var(--accent); border-radius: 12px; padding: 32px; }
.assoc-price-card h3 { font-family: var(--font-display); font-size: 28px; font-weight: 800; margin-bottom: 8px; }
.assoc-price-card p { font-size: 16px; color: var(--text-soft); }

.assoc-testimonials { display: grid; gap: 24px; }
.assoc-testimonial { background: #0f1624; border-left: 4px solid var(--accent); border-radius: 8px; padding: 24px; }
.assoc-quote { font-size: 16px; color: white; line-height: 1.6; margin: 0 0 12px 0; font-style: italic; }
.assoc-author { font-size: 13px; color: var(--text-soft); margin: 0; }

.assoc-faq { display: flex; flex-direction: column; gap: 12px; }
.assoc-faq-item { background: #0f1624; border: 1px solid #1a2847; border-radius: 10px; padding: 16px; cursor: pointer; }
.assoc-faq-item summary { font-weight: 700; color: white; outline: none; }
.assoc-faq-item p { margin-top: 12px; color: var(--text-soft); font-size: 14px; line-height: 1.6; }

.assoc-section--final { text-align: center; background: rgba(61, 214, 140, 0.05); border-radius: 16px; }
.assoc-final-sub { font-size: 16px; color: var(--text-soft); margin-bottom: 24px; }

.assoc-footer { border-top: 1px solid #1a2035; padding: 40px 20px; text-align: center; max-width: 1200px; margin: 0 auto; font-size: 14px; color: var(--text-soft); }
`;function q1(){const e=re();y.useEffect(()=>{ce({title:"Choose Your Hockey Challenge — 5K, 10K, or Custom",description:"Pick your hockey challenge: 5000 shot challenge, 10000 shot challenge, or create a custom goal. Free tracking with live leaderboards.",url:"https://hockeyshotchallenge.com/challenges"})},[]);const t=[{id:"5k",title:"5,000 Shot Challenge",subtitle:"Beginner to Intermediate",shots:5e3,weeks:8,description:"Perfect for young players or a 2-month challenge",pace:"625 shots/week",color:"from-orange-500 to-red-600",onClick:()=>e("/challenges/5k")},{id:"10k",title:"10,000 Shot Challenge",subtitle:"Intermediate to Advanced",shots:1e4,weeks:8,description:"The classic summer challenge for dedicated players",pace:"1,250 shots/week",color:"from-blue-500 to-cyan-600",onClick:()=>e("/challenges/10k")},{id:"custom",title:"Custom Challenge",subtitle:"Your Goal",shots:"?",weeks:"?",description:"Set your own goal and track progress in real-time",pace:"Your pace",color:"from-purple-500 to-pink-600",onClick:()=>e("/challenges/custom")}];return n.jsxs("div",{style:{minHeight:"100dvh",background:"var(--bg)",color:"var(--text)",fontFamily:"var(--font-body)"},children:[n.jsxs("nav",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",maxWidth:"1200px",margin:"0 auto"},children:[n.jsx("button",{style:{fontSize:18,fontWeight:700,background:"transparent",cursor:"pointer",color:"white",border:"none"},onClick:()=>e("/"),children:"🏒 Hockey Shot Challenge"}),n.jsx("button",{style:{background:"var(--accent)",color:"white",padding:"10px 20px",borderRadius:8,fontWeight:700,cursor:"pointer",border:"none"},onClick:()=>e("/start"),children:"Start tracking →"})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px 40px",textAlign:"center"},children:[n.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:2,color:"var(--accent)",marginBottom:16},children:"PICK YOUR CHALLENGE"}),n.jsx("h1",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(32px, 8vw, 56px)",fontWeight:800,color:"white",lineHeight:1.1,marginBottom:16},children:"Choose Your Shot Challenge"}),n.jsx("p",{style:{fontSize:18,color:"var(--text-soft)",marginBottom:32,maxWidth:600,marginLeft:"auto",marginRight:"auto"},children:"Whether it's a quick 5K or an ambitious 10K, we've got you covered. Track your progress in real-time with live leaderboards and celebrate every milestone."})]}),n.jsx("section",{style:{maxWidth:"1200px",margin:"0 auto",padding:"0 20px 60px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:24},children:t.map(r=>n.jsxs("button",{onClick:r.onClick,style:{background:`linear-gradient(135deg, rgba(${r.id==="5k"?"249, 115, 22":r.id==="10k"?"59, 130, 246":"147, 51, 234"}, 0.1) 0%, rgba(${r.id==="5k"?"220, 38, 38":r.id==="10k"?"6, 182, 212":"236, 72, 153"}, 0.05) 100%)`,border:`1.5px solid rgba(${r.id==="5k"?"249, 115, 22":r.id==="10k"?"59, 130, 246":"147, 51, 234"}, 0.3)`,borderRadius:16,padding:32,cursor:"pointer",transition:"all 0.3s ease",textAlign:"left",color:"white"},onMouseEnter:s=>{s.currentTarget.style.transform="translateY(-4px)",s.currentTarget.style.borderColor=`rgba(${r.id==="5k"?"249, 115, 22":r.id==="10k"?"59, 130, 246":"147, 51, 234"}, 0.6)`},onMouseLeave:s=>{s.currentTarget.style.transform="translateY(0)",s.currentTarget.style.borderColor=`rgba(${r.id==="5k"?"249, 115, 22":r.id==="10k"?"59, 130, 246":"147, 51, 234"}, 0.3)`},children:[n.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:1,color:"var(--accent)",marginBottom:8},children:r.subtitle}),n.jsx("h3",{style:{fontFamily:"var(--font-display)",fontSize:24,fontWeight:800,marginBottom:12},children:r.title}),n.jsx("p",{style:{fontSize:14,color:"var(--text-soft)",marginBottom:20},children:r.description}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.1)"},children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:12,color:"var(--text-mute)"},children:"TARGET SHOTS"}),n.jsx("div",{style:{fontSize:20,fontWeight:800,color:"var(--ice)"},children:r.shots.toLocaleString()})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontSize:12,color:"var(--text-mute)"},children:"DAILY PACE"}),n.jsx("div",{style:{fontSize:20,fontWeight:800,color:"var(--ice)"},children:r.pace})]})]})]},r.id))}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px",textAlign:"center",background:"rgba(61, 214, 140, 0.05)",borderRadius:16,marginBottom:60},children:[n.jsx("h2",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(24px, 6vw, 36px)",fontWeight:800,color:"white",marginBottom:16},children:"Running a League Challenge?"}),n.jsx("p",{style:{fontSize:16,color:"var(--text-soft)",marginBottom:24,maxWidth:600,marginLeft:"auto",marginRight:"auto"},children:"Associations and leagues can set up branded leaderboards for their members — completely free. We handle the tech, you keep the community."}),n.jsx("button",{onClick:()=>e("/association-partnership"),style:{background:"var(--accent)",color:"white",border:"none",borderRadius:10,padding:"14px 28px",fontWeight:700,fontFamily:"var(--font-display)",fontSize:16,cursor:"pointer",transition:"all 0.2s"},onMouseEnter:r=>{r.currentTarget.style.transform="translateY(-2px)",r.currentTarget.style.boxShadow="0 8px 16px rgba(41, 121, 255, 0.3)"},onMouseLeave:r=>{r.currentTarget.style.transform="translateY(0)",r.currentTarget.style.boxShadow="none"},children:"Set Up Your League Challenge"})]})]})}function G1(){const e=re();return y.useEffect(()=>{ce({title:"Province-Wide Hockey Challenge Platform — For Leagues & Associations",description:"Run your province-wide 5K or 10K challenge digitally. Live leaderboards, real-time tracking, 300+ associations. Free platform for OMHA, OWHA, and regional hockey organizations.",url:`${K}/province-wide-challenge`}),ft({"@context":"https://schema.org","@type":"WebPage",name:"Province-Wide Challenge Platform",description:"Digital platform for managing province-wide hockey challenges across multiple associations.",url:`${K}/province-wide-challenge`})},[]),n.jsxs("div",{style:{minHeight:"100dvh",background:"var(--bg)",color:"var(--text)",fontFamily:"var(--font-body)"},children:[n.jsxs("nav",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",maxWidth:"1200px",margin:"0 auto"},children:[n.jsx("button",{style:{fontSize:18,fontWeight:700,background:"transparent",cursor:"pointer",color:"white",border:"none"},onClick:()=>e("/"),children:"🏒 Hockey Shot Challenge"}),n.jsx("button",{style:{background:"var(--accent)",color:"white",padding:"10px 20px",borderRadius:8,fontWeight:700,cursor:"pointer",border:"none"},onClick:()=>window.location.href="mailto:samuelmenard@gmail.com?subject=Province-Wide Challenge Partnership",children:"Let's Talk →"})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"80px 20px 40px",textAlign:"center"},children:[n.jsx("div",{style:{fontSize:12,fontWeight:700,letterSpacing:2,color:"var(--accent)",marginBottom:16},children:"FOR OMHA, OWHA & REGIONAL ORGANIZATIONS"}),n.jsx("h1",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(36px, 8vw, 60px)",fontWeight:800,color:"white",lineHeight:1.1,marginBottom:24},children:"Digitize Your Province-Wide Challenge"}),n.jsx("p",{style:{fontSize:20,color:"var(--text-soft)",marginBottom:32,maxWidth:700,marginLeft:"auto",marginRight:"auto",lineHeight:1.6},children:"300+ member associations. One platform. Real-time tracking across your entire province. No more PDF sheets. No more manual updates."}),n.jsx("button",{onClick:()=>window.location.href="mailto:samuelmenard@gmail.com?subject=Province-Wide Challenge Partnership - OMHA/OWHA",style:{background:"var(--accent)",color:"white",border:"none",borderRadius:10,padding:"16px 32px",fontWeight:700,fontFamily:"var(--font-display)",fontSize:18,cursor:"pointer",transition:"all 0.2s"},onMouseEnter:t=>{t.currentTarget.style.transform="translateY(-2px)",t.currentTarget.style.boxShadow="0 12px 24px rgba(41, 121, 255, 0.4)"},onMouseLeave:t=>{t.currentTarget.style.transform="translateY(0)",t.currentTarget.style.boxShadow="none"},children:"Schedule a Demo"})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px"},children:[n.jsx("h2",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(28px, 6vw, 42px)",fontWeight:800,color:"white",marginBottom:40,textAlign:"center"},children:"The Problem With PDF Sheets at Scale"}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:24},children:[{icon:"📋",title:"Manual Tracking",desc:"300+ associations manually entering shot counts"},{icon:"⏱️",title:"Days Behind",desc:"Leaderboards update weekly, not in real-time"},{icon:"📞",title:"Tons of Admin",desc:"Constant emails asking for updates and counts"},{icon:"📉",title:"Low Engagement",desc:"Kids don't see live competition — motivation drops"},{icon:"❌",title:"No Visibility",desc:"Can't track province-wide trends or participation"},{icon:"💾",title:"Data Silos",desc:"All shot data scattered across 300 PDFs"}].map((t,r)=>n.jsxs("div",{style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:24},children:[n.jsx("div",{style:{fontSize:32,marginBottom:12},children:t.icon}),n.jsx("h3",{style:{fontWeight:700,marginBottom:8},children:t.title}),n.jsx("p",{style:{fontSize:14,color:"var(--text-soft)"},children:t.desc})]},r))})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px",background:"rgba(61, 214, 140, 0.05)",borderRadius:16,marginBottom:40},children:[n.jsx("h2",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(28px, 6vw, 42px)",fontWeight:800,color:"white",marginBottom:40,textAlign:"center"},children:"The Modern Way"}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:24},children:[{icon:"⚡",title:"Instant Updates",desc:"Players log shots instantly. Province-wide leaderboard updates live. No delays."},{icon:"🏆",title:"Province-Wide Leaderboard",desc:"See top players, top associations, regional standings — all in one place."},{icon:"📊",title:"Real Competition",desc:"Kids see live rankings across your entire province. Engagement skyrockets."},{icon:"🚀",title:"Zero Admin",desc:"Families sign up once. Players log shots. Everything syncs automatically."},{icon:"📱",title:"Mobile-First",desc:"Web app works on any phone. No download needed. Takes 5 seconds to log."},{icon:"📈",title:"Full Visibility",desc:"See participation rates, shot counts, trends across your entire organization."}].map((t,r)=>n.jsxs("div",{style:{background:"rgba(0,0,0,0.2)",borderRadius:12,padding:24,border:"1px solid rgba(61, 214, 140, 0.2)"},children:[n.jsx("div",{style:{fontSize:36,marginBottom:12},children:t.icon}),n.jsx("h3",{style:{fontWeight:700,marginBottom:8},children:t.title}),n.jsx("p",{style:{fontSize:14,color:"var(--text-soft)"},children:t.desc})]},r))})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px"},children:[n.jsx("h2",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(28px, 6vw, 42px)",fontWeight:800,color:"white",marginBottom:40,textAlign:"center"},children:"How It Works (3 Steps)"}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:24},children:[{num:"1",title:"You Pick Your Challenge",desc:"Choose a 5K or 10K challenge (or custom goal). We set the framework and rules."},{num:"2",title:"Associations Join",desc:"Send member associations a link. They create a branded leaderboard for their players."},{num:"3",title:"Players Compete",desc:"Players log shots. Live leaderboards show their progress. You see real-time province-wide data."}].map((t,r)=>n.jsxs("div",{style:{textAlign:"center"},children:[n.jsx("div",{style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:60,height:60,background:"var(--accent)",color:"white",borderRadius:"50%",fontWeight:800,fontSize:28,marginBottom:16},children:t.num}),n.jsx("h3",{style:{fontFamily:"var(--font-display)",fontWeight:700,marginBottom:8,fontSize:18},children:t.title}),n.jsx("p",{style:{fontSize:14,color:"var(--text-soft)"},children:t.desc})]},r))})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px",textAlign:"center"},children:[n.jsx("h2",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(28px, 6vw, 42px)",fontWeight:800,color:"white",marginBottom:40},children:"Your Scale"}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:24},children:[{number:"300+",label:"Member Associations"},{number:"50K+",label:"Active Players"},{number:"1M+",label:"Shots Logged in Summer"},{number:"100%",label:"Free for Your Members"}].map((t,r)=>n.jsxs("div",{style:{background:"rgba(61, 214, 140, 0.1)",borderRadius:12,padding:24,border:"1px solid rgba(61, 214, 140, 0.3)"},children:[n.jsx("div",{style:{fontSize:32,fontWeight:800,color:"var(--accent)",marginBottom:8},children:t.number}),n.jsx("div",{style:{fontSize:14,color:"var(--text-soft)"},children:t.label})]},r))})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px"},children:[n.jsx("h2",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(28px, 6vw, 42px)",fontWeight:800,color:"white",marginBottom:40,textAlign:"center"},children:"What's Included"}),n.jsx("div",{style:{overflowX:"auto"},children:n.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[n.jsx("thead",{children:n.jsxs("tr",{style:{borderBottom:"2px solid rgba(255,255,255,0.2)"},children:[n.jsx("th",{style:{textAlign:"left",padding:"16px 12px",fontWeight:700,color:"var(--accent)"},children:"Feature"}),n.jsx("th",{style:{textAlign:"center",padding:"16px 12px",fontWeight:700,color:"var(--accent)"},children:"PDF Sheets"}),n.jsx("th",{style:{textAlign:"center",padding:"16px 12px",fontWeight:700,color:"var(--accent)"},children:"Hockey Shot Challenge"})]})}),n.jsx("tbody",{children:[["Live Leaderboards","❌","✅"],["Real-Time Updates","❌","✅"],["Province-Wide Dashboard","❌","✅"],["Association-Level Tracking","⚠️","✅"],["Mobile App (No Download)","❌","✅"],["Automated Data Collection","❌","✅"],["Participation Analytics","❌","✅"],["Zero Admin Work","❌","✅"],["Completely Free","✅","✅"]].map((t,r)=>n.jsxs("tr",{style:{borderBottom:"1px solid rgba(255,255,255,0.1)"},children:[n.jsx("td",{style:{padding:"12px",fontSize:14},children:t[0]}),n.jsx("td",{style:{padding:"12px",textAlign:"center",fontSize:16},children:t[1]}),n.jsx("td",{style:{padding:"12px",textAlign:"center",fontSize:16,color:"var(--accent)"},children:t[2]})]},r))})]})})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px",textAlign:"center",background:"rgba(41, 121, 255, 0.05)",borderRadius:16,marginBottom:40},children:[n.jsx("h2",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(28px, 6vw, 42px)",fontWeight:800,color:"white",marginBottom:16},children:"Completely Free"}),n.jsx("p",{style:{fontSize:16,color:"var(--text-soft)",marginBottom:24,maxWidth:600,marginLeft:"auto",marginRight:"auto"},children:"No setup fees. No per-association costs. No per-player fees. No transaction fees. This is completely free for OMHA, OWHA, and all your member associations and families."}),n.jsx("div",{style:{fontSize:14,color:"var(--text-mute)"},children:"We grow by making hockey better for everyone. Your success is our success."})]}),n.jsxs("section",{style:{maxWidth:"1000px",margin:"0 auto",padding:"60px 20px",textAlign:"center",background:"rgba(61, 214, 140, 0.05)",borderRadius:16,marginBottom:60},children:[n.jsx("h2",{style:{fontFamily:"var(--font-display)",fontSize:"clamp(28px, 6vw, 42px)",fontWeight:800,color:"white",marginBottom:16},children:"Ready to Modernize Your Challenge?"}),n.jsx("p",{style:{fontSize:16,color:"var(--text-soft)",marginBottom:32,maxWidth:600,marginLeft:"auto",marginRight:"auto"},children:"Let's talk about bringing live tracking and real-time leaderboards to your entire province."}),n.jsx("button",{onClick:()=>window.location.href="mailto:samuelmenard@gmail.com?subject=Province-Wide Challenge Partnership - Schedule Demo",style:{background:"var(--accent)",color:"white",border:"none",borderRadius:10,padding:"16px 32px",fontWeight:700,fontFamily:"var(--font-display)",fontSize:18,cursor:"pointer",transition:"all 0.2s"},onMouseEnter:t=>{t.currentTarget.style.transform="translateY(-2px)",t.currentTarget.style.boxShadow="0 12px 24px rgba(41, 121, 255, 0.4)"},onMouseLeave:t=>{t.currentTarget.style.transform="translateY(0)",t.currentTarget.style.boxShadow="none"},children:"Schedule a Demo"})]}),n.jsxs("footer",{style:{borderTop:"1px solid #1a2035",padding:"40px 20px",textAlign:"center",maxWidth:"1200px",margin:"0 auto",fontSize:14,color:"var(--text-soft)"},children:[n.jsxs("p",{children:["Questions? ",n.jsx("a",{href:"mailto:samuelmenard@gmail.com",style:{color:"var(--accent)",textDecoration:"none"},children:"Email us"})]}),n.jsx("p",{style:{fontSize:12,color:"var(--text-mute)",marginTop:8},children:"Hockey Shot Challenge — Digital Platform for Province-Wide & League Challenges"})]})]})}function nm(){return n.jsx("div",{style:{minHeight:"100dvh",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)"},children:n.jsx("div",{style:{fontFamily:"var(--font-display)",color:"var(--text-mute)",letterSpacing:2,fontSize:12},children:"LOADING…"})})}function cn({children:e}){const{player:t,loading:r}=Ft();return r?n.jsx(nm,{}):t?e:n.jsx(js,{to:"/start",replace:!0})}function K1(){const{player:e,loading:t}=Ft();return t?n.jsx(nm,{}):e?n.jsx(js,{to:"/home",replace:!0}):n.jsx(iw,{})}function V1(){const e=Ar(),t=re(),{player:r}=Ft();if(!["/home","/videos","/card","/rank","/more"].includes(e.pathname)||!r)return null;const a=[{path:"/home",label:"Dashboard",icon:n.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:n.jsx("path",{d:"M10 2 L3 8 V17 H8 V12 H12 V17 H17 V8 Z",fill:"currentColor"})})},{path:"/videos",label:"Videos",icon:n.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:[n.jsx("rect",{x:"2",y:"4",width:"16",height:"12",rx:"2",fill:"currentColor"}),n.jsx("path",{d:"M8 9 L14 12 L8 15 Z",fill:"var(--bg)"})]})},{path:"/card",label:"Card",icon:n.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:n.jsx("rect",{x:"3",y:"4",width:"14",height:"12",rx:"2",fill:"currentColor"})})},{path:"/rank",label:"Rank",icon:n.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:[n.jsx("rect",{x:"3",y:"10",width:"3",height:"7",fill:"currentColor"}),n.jsx("rect",{x:"8.5",y:"6",width:"3",height:"11",fill:"currentColor"}),n.jsx("rect",{x:"14",y:"3",width:"3",height:"14",fill:"currentColor"})]})},{path:"/more",label:"More",icon:n.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:[n.jsx("circle",{cx:"5",cy:"10",r:"1.5",fill:"currentColor"}),n.jsx("circle",{cx:"10",cy:"10",r:"1.5",fill:"currentColor"}),n.jsx("circle",{cx:"15",cy:"10",r:"1.5",fill:"currentColor"})]})}];return n.jsxs("nav",{className:"bottom-nav","aria-label":"Main navigation",children:[a.map(i=>n.jsxs("button",{className:`nav-btn ${e.pathname===i.path?"nav-btn--active":""}`,onClick:()=>t(i.path),"aria-label":i.label,"aria-current":e.pathname===i.path?"page":void 0,children:[i.icon,n.jsx("span",{children:i.label})]},i.path)),n.jsx("style",{children:Q1})]})}function Y1(){const e=Ar(),t=["/home","/videos","/card","/rank","/more"].includes(e.pathname);return n.jsxs("div",{className:t?"app-shell":"full-width",children:[n.jsxs(Ny,{children:[n.jsx(X,{path:"/",element:n.jsx(K1,{})}),n.jsx(X,{path:"/for-clubs",element:n.jsx(dw,{})}),n.jsx(X,{path:"/clubs",element:n.jsx(pw,{})}),n.jsx(X,{path:"/clubs/:slug",element:n.jsx(hw,{})}),n.jsx(X,{path:"/start",element:n.jsx(Sw,{})}),n.jsx(X,{path:"/join/:slug",element:n.jsx(xw,{})}),n.jsx(X,{path:"/card/:username",element:n.jsx(vw,{})}),n.jsx(X,{path:"/rankings",element:n.jsx(kw,{})}),n.jsx(X,{path:"/auth",element:n.jsx(js,{to:"/start",replace:!0})}),n.jsx(X,{path:"/coach",element:n.jsx(_1,{})}),n.jsx(X,{path:"/coach/start",element:n.jsx(zw,{})}),n.jsx(X,{path:"/coach/dashboard",element:n.jsx(Dw,{})}),n.jsx(X,{path:"/home",element:n.jsx(cn,{children:n.jsx(r1,{})})}),n.jsx(X,{path:"/videos",element:n.jsx(cn,{children:n.jsx(a1,{})})}),n.jsx(X,{path:"/card",element:n.jsx(cn,{children:n.jsx(l1,{})})}),n.jsx(X,{path:"/rank",element:n.jsx(cn,{children:n.jsx(u1,{})})}),n.jsx(X,{path:"/teams",element:n.jsx(js,{to:"/rank",replace:!0})}),n.jsx(X,{path:"/more",element:n.jsx(cn,{children:n.jsx(m1,{})})}),n.jsx(X,{path:"/add-player",element:n.jsx(cn,{children:n.jsx(y1,{})})}),n.jsx(X,{path:"/privacy",element:n.jsx(b1,{})}),n.jsx(X,{path:"/player",element:n.jsx(N1,{})}),n.jsx(X,{path:"/blog",element:n.jsx(E1,{})}),n.jsx(X,{path:"/blog/getting-started",element:n.jsx(z1,{})}),n.jsx(X,{path:"/blog/how-squad-battles-work",element:n.jsx(R1,{})}),n.jsx(X,{path:"/blog/off-ice-drills",element:n.jsx(L1,{})}),n.jsx(X,{path:"/blog/building-practice-routine",element:n.jsx($1,{})}),n.jsx(X,{path:"/blog/parents-guide-youth-hockey",element:n.jsx(U1,{})}),n.jsx(X,{path:"/challenges",element:n.jsx(q1,{})}),n.jsx(X,{path:"/10000-shot-challenge",element:n.jsx(W1,{})}),n.jsx(X,{path:"/association-partnership",element:n.jsx(M1,{})}),n.jsx(X,{path:"/province-wide-challenge",element:n.jsx(G1,{})}),n.jsx(X,{path:"*",element:n.jsx(js,{to:"/",replace:!0})})]}),n.jsx(V1,{})]})}function J1(){return n.jsx(Ub,{children:n.jsx(Y1,{})})}const Q1=`
.bottom-nav {
  position: fixed;
  left: 50%; transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  max-width: 430px;
  background: rgba(10, 14, 26, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 0.5px solid var(--border-dim);
  display: flex;
  justify-content: space-around;
  padding: 8px 0 calc(8px + var(--safe-bottom));
  z-index: 10;
}
@media (min-width: 500px) {
  .bottom-nav {
    border-radius: 0 0 24px 24px;
    bottom: 20px;
  }
}
.nav-btn {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px;
  color: var(--text-soft);
  padding: 8px 16px;
  min-width: 60px;
  min-height: 50px;
  transition: all 0.1s;
  border-radius: 12px;
}
.nav-btn span {
  font-size: 11px;
  letter-spacing: 0.5px;
  font-weight: 600;
}
.nav-btn--active {
  color: var(--ice);
  background: rgba(41, 121, 255, 0.1);
}
.nav-btn:active { transform: scale(0.95); }

.full-width {
  width: 100%;
  min-height: 100dvh;
}
`;Oo.createRoot(document.getElementById("root")).render(n.jsx(hh.StrictMode,{children:n.jsx(Py,{children:n.jsx(J1,{})})}));
