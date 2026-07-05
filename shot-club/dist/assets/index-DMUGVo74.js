function om(e,t){for(var r=0;r<t.length;r++){const n=t[r];if(typeof n!="string"&&!Array.isArray(n)){for(const s in n)if(s!=="default"&&!(s in e)){const i=Object.getOwnPropertyDescriptor(n,s);i&&Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:()=>n[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();function lm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var th={exports:{}},_i={},rh={exports:{}},K={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Za=Symbol.for("react.element"),cm=Symbol.for("react.portal"),dm=Symbol.for("react.fragment"),um=Symbol.for("react.strict_mode"),hm=Symbol.for("react.profiler"),pm=Symbol.for("react.provider"),fm=Symbol.for("react.context"),mm=Symbol.for("react.forward_ref"),gm=Symbol.for("react.suspense"),xm=Symbol.for("react.memo"),vm=Symbol.for("react.lazy"),Jc=Symbol.iterator;function ym(e){return e===null||typeof e!="object"?null:(e=Jc&&e[Jc]||e["@@iterator"],typeof e=="function"?e:null)}var nh={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ah=Object.assign,sh={};function Ln(e,t,r){this.props=e,this.context=t,this.refs=sh,this.updater=r||nh}Ln.prototype.isReactComponent={};Ln.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ln.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ih(){}ih.prototype=Ln.prototype;function Fl(e,t,r){this.props=e,this.context=t,this.refs=sh,this.updater=r||nh}var Hl=Fl.prototype=new ih;Hl.constructor=Fl;ah(Hl,Ln.prototype);Hl.isPureReactComponent=!0;var Qc=Array.isArray,oh=Object.prototype.hasOwnProperty,Wl={current:null},lh={key:!0,ref:!0,__self:!0,__source:!0};function ch(e,t,r){var n,s={},i=null,o=null;if(t!=null)for(n in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)oh.call(t,n)&&!lh.hasOwnProperty(n)&&(s[n]=t[n]);var l=arguments.length-2;if(l===1)s.children=r;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];s.children=c}if(e&&e.defaultProps)for(n in l=e.defaultProps,l)s[n]===void 0&&(s[n]=l[n]);return{$$typeof:Za,type:e,key:i,ref:o,props:s,_owner:Wl.current}}function bm(e,t){return{$$typeof:Za,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ql(e){return typeof e=="object"&&e!==null&&e.$$typeof===Za}function wm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var Xc=/\/+/g;function Vi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?wm(""+e.key):t.toString(36)}function Is(e,t,r,n,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Za:case cm:o=!0}}if(o)return o=e,s=s(o),e=n===""?"."+Vi(o,0):n,Qc(s)?(r="",e!=null&&(r=e.replace(Xc,"$&/")+"/"),Is(s,t,r,"",function(d){return d})):s!=null&&(ql(s)&&(s=bm(s,r+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Xc,"$&/")+"/")+e)),t.push(s)),1;if(o=0,n=n===""?".":n+":",Qc(e))for(var l=0;l<e.length;l++){i=e[l];var c=n+Vi(i,l);o+=Is(i,t,r,c,s)}else if(c=ym(e),typeof c=="function")for(e=c.call(e),l=0;!(i=e.next()).done;)i=i.value,c=n+Vi(i,l++),o+=Is(i,t,r,c,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function os(e,t,r){if(e==null)return e;var n=[],s=0;return Is(e,n,"","",function(i){return t.call(r,i,s++)}),n}function km(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ye={current:null},$s={transition:null},jm={ReactCurrentDispatcher:Ye,ReactCurrentBatchConfig:$s,ReactCurrentOwner:Wl};function dh(){throw Error("act(...) is not supported in production builds of React.")}K.Children={map:os,forEach:function(e,t,r){os(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return os(e,function(){t++}),t},toArray:function(e){return os(e,function(t){return t})||[]},only:function(e){if(!ql(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};K.Component=Ln;K.Fragment=dm;K.Profiler=hm;K.PureComponent=Fl;K.StrictMode=um;K.Suspense=gm;K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jm;K.act=dh;K.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=ah({},e.props),s=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=Wl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)oh.call(t,c)&&!lh.hasOwnProperty(c)&&(n[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)n.children=r;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];n.children=l}return{$$typeof:Za,type:e.type,key:s,ref:i,props:n,_owner:o}};K.createContext=function(e){return e={$$typeof:fm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:pm,_context:e},e.Consumer=e};K.createElement=ch;K.createFactory=function(e){var t=ch.bind(null,e);return t.type=e,t};K.createRef=function(){return{current:null}};K.forwardRef=function(e){return{$$typeof:mm,render:e}};K.isValidElement=ql;K.lazy=function(e){return{$$typeof:vm,_payload:{_status:-1,_result:e},_init:km}};K.memo=function(e,t){return{$$typeof:xm,type:e,compare:t===void 0?null:t}};K.startTransition=function(e){var t=$s.transition;$s.transition={};try{e()}finally{$s.transition=t}};K.unstable_act=dh;K.useCallback=function(e,t){return Ye.current.useCallback(e,t)};K.useContext=function(e){return Ye.current.useContext(e)};K.useDebugValue=function(){};K.useDeferredValue=function(e){return Ye.current.useDeferredValue(e)};K.useEffect=function(e,t){return Ye.current.useEffect(e,t)};K.useId=function(){return Ye.current.useId()};K.useImperativeHandle=function(e,t,r){return Ye.current.useImperativeHandle(e,t,r)};K.useInsertionEffect=function(e,t){return Ye.current.useInsertionEffect(e,t)};K.useLayoutEffect=function(e,t){return Ye.current.useLayoutEffect(e,t)};K.useMemo=function(e,t){return Ye.current.useMemo(e,t)};K.useReducer=function(e,t,r){return Ye.current.useReducer(e,t,r)};K.useRef=function(e){return Ye.current.useRef(e)};K.useState=function(e){return Ye.current.useState(e)};K.useSyncExternalStore=function(e,t,r){return Ye.current.useSyncExternalStore(e,t,r)};K.useTransition=function(){return Ye.current.useTransition()};K.version="18.3.1";rh.exports=K;var v=rh.exports;const uh=lm(v),Nm=om({__proto__:null,default:uh},[v]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sm=v,_m=Symbol.for("react.element"),Cm=Symbol.for("react.fragment"),Tm=Object.prototype.hasOwnProperty,Em=Sm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Am={key:!0,ref:!0,__self:!0,__source:!0};function hh(e,t,r){var n,s={},i=null,o=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(n in t)Tm.call(t,n)&&!Am.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)s[n]===void 0&&(s[n]=t[n]);return{$$typeof:_m,type:e,key:i,ref:o,props:s,_owner:Em.current}}_i.Fragment=Cm;_i.jsx=hh;_i.jsxs=hh;th.exports=_i;var a=th.exports,Po={},ph={exports:{}},ct={},fh={exports:{}},mh={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(R,D){var $=R.length;R.push(D);e:for(;0<$;){var V=$-1>>>1,A=R[V];if(0<s(A,D))R[V]=D,R[$]=A,$=V;else break e}}function r(R){return R.length===0?null:R[0]}function n(R){if(R.length===0)return null;var D=R[0],$=R.pop();if($!==D){R[0]=$;e:for(var V=0,A=R.length,P=A>>>1;V<P;){var M=2*(V+1)-1,F=R[M],H=M+1,re=R[H];if(0>s(F,$))H<A&&0>s(re,F)?(R[V]=re,R[H]=$,V=H):(R[V]=F,R[M]=$,V=M);else if(H<A&&0>s(re,$))R[V]=re,R[H]=$,V=H;else break e}}return D}function s(R,D){var $=R.sortIndex-D.sortIndex;return $!==0?$:R.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var c=[],d=[],h=1,u=null,p=3,x=!1,y=!1,b=!1,w=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(R){for(var D=r(d);D!==null;){if(D.callback===null)n(d);else if(D.startTime<=R)n(d),D.sortIndex=D.expirationTime,t(c,D);else break;D=r(d)}}function k(R){if(b=!1,m(R),!y)if(r(c)!==null)y=!0,ve(N);else{var D=r(d);D!==null&&I(k,D.startTime-R)}}function N(R,D){y=!1,b&&(b=!1,g(L),L=-1),x=!0;var $=p;try{for(m(D),u=r(c);u!==null&&(!(u.expirationTime>D)||R&&!Z());){var V=u.callback;if(typeof V=="function"){u.callback=null,p=u.priorityLevel;var A=V(u.expirationTime<=D);D=e.unstable_now(),typeof A=="function"?u.callback=A:u===r(c)&&n(c),m(D)}else n(c);u=r(c)}if(u!==null)var P=!0;else{var M=r(d);M!==null&&I(k,M.startTime-D),P=!1}return P}finally{u=null,p=$,x=!1}}var S=!1,_=null,L=-1,G=5,C=-1;function Z(){return!(e.unstable_now()-C<G)}function le(){if(_!==null){var R=e.unstable_now();C=R;var D=!0;try{D=_(!0,R)}finally{D?ue():(S=!1,_=null)}}else S=!1}var ue;if(typeof f=="function")ue=function(){f(le)};else if(typeof MessageChannel<"u"){var De=new MessageChannel,Re=De.port2;De.port1.onmessage=le,ue=function(){Re.postMessage(null)}}else ue=function(){w(le,0)};function ve(R){_=R,S||(S=!0,ue())}function I(R,D){L=w(function(){R(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(R){R.callback=null},e.unstable_continueExecution=function(){y||x||(y=!0,ve(N))},e.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):G=0<R?Math.floor(1e3/R):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return r(c)},e.unstable_next=function(R){switch(p){case 1:case 2:case 3:var D=3;break;default:D=p}var $=p;p=D;try{return R()}finally{p=$}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(R,D){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var $=p;p=R;try{return D()}finally{p=$}},e.unstable_scheduleCallback=function(R,D,$){var V=e.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?V+$:V):$=V,R){case 1:var A=-1;break;case 2:A=250;break;case 5:A=1073741823;break;case 4:A=1e4;break;default:A=5e3}return A=$+A,R={id:h++,callback:D,priorityLevel:R,startTime:$,expirationTime:A,sortIndex:-1},$>V?(R.sortIndex=$,t(d,R),r(c)===null&&R===r(d)&&(b?(g(L),L=-1):b=!0,I(k,$-V))):(R.sortIndex=A,t(c,R),y||x||(y=!0,ve(N))),R},e.unstable_shouldYield=Z,e.unstable_wrapCallback=function(R){var D=p;return function(){var $=p;p=D;try{return R.apply(this,arguments)}finally{p=$}}}})(mh);fh.exports=mh;var Pm=fh.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zm=v,lt=Pm;function T(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var gh=new Set,Sa={};function Wr(e,t){Tn(e,t),Tn(e+"Capture",t)}function Tn(e,t){for(Sa[e]=t,e=0;e<t.length;e++)gh.add(t[e])}var Kt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zo=Object.prototype.hasOwnProperty,Rm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Zc={},ed={};function Om(e){return zo.call(ed,e)?!0:zo.call(Zc,e)?!1:Rm.test(e)?ed[e]=!0:(Zc[e]=!0,!1)}function Lm(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Im(e,t,r,n){if(t===null||typeof t>"u"||Lm(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Je(e,t,r,n,s,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=s,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var Ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ue[e]=new Je(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ue[t]=new Je(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ue[e]=new Je(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ue[e]=new Je(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ue[e]=new Je(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ue[e]=new Je(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ue[e]=new Je(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ue[e]=new Je(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ue[e]=new Je(e,5,!1,e.toLowerCase(),null,!1,!1)});var Gl=/[\-:]([a-z])/g;function Vl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Gl,Vl);Ue[t]=new Je(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Gl,Vl);Ue[t]=new Je(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Gl,Vl);Ue[t]=new Je(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ue[e]=new Je(e,1,!1,e.toLowerCase(),null,!1,!1)});Ue.xlinkHref=new Je("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ue[e]=new Je(e,1,!1,e.toLowerCase(),null,!0,!0)});function Kl(e,t,r,n){var s=Ue.hasOwnProperty(t)?Ue[t]:null;(s!==null?s.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Im(t,r,s,n)&&(r=null),n||s===null?Om(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):s.mustUseProperty?e[s.propertyName]=r===null?s.type===3?!1:"":r:(t=s.attributeName,n=s.attributeNamespace,r===null?e.removeAttribute(t):(s=s.type,r=s===3||s===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var Xt=zm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ls=Symbol.for("react.element"),on=Symbol.for("react.portal"),ln=Symbol.for("react.fragment"),Yl=Symbol.for("react.strict_mode"),Ro=Symbol.for("react.profiler"),xh=Symbol.for("react.provider"),vh=Symbol.for("react.context"),Jl=Symbol.for("react.forward_ref"),Oo=Symbol.for("react.suspense"),Lo=Symbol.for("react.suspense_list"),Ql=Symbol.for("react.memo"),rr=Symbol.for("react.lazy"),yh=Symbol.for("react.offscreen"),td=Symbol.iterator;function Gn(e){return e===null||typeof e!="object"?null:(e=td&&e[td]||e["@@iterator"],typeof e=="function"?e:null)}var me=Object.assign,Ki;function na(e){if(Ki===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Ki=t&&t[1]||""}return`
`+Ki+e}var Yi=!1;function Ji(e,t){if(!e||Yi)return"";Yi=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var n=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){n=d}e.call(t.prototype)}else{try{throw Error()}catch(d){n=d}e()}}catch(d){if(d&&n&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),i=n.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var c=`
`+s[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=l);break}}}finally{Yi=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?na(e):""}function $m(e){switch(e.tag){case 5:return na(e.type);case 16:return na("Lazy");case 13:return na("Suspense");case 19:return na("SuspenseList");case 0:case 2:case 15:return e=Ji(e.type,!1),e;case 11:return e=Ji(e.type.render,!1),e;case 1:return e=Ji(e.type,!0),e;default:return""}}function Io(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ln:return"Fragment";case on:return"Portal";case Ro:return"Profiler";case Yl:return"StrictMode";case Oo:return"Suspense";case Lo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case vh:return(e.displayName||"Context")+".Consumer";case xh:return(e._context.displayName||"Context")+".Provider";case Jl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ql:return t=e.displayName||null,t!==null?t:Io(e.type)||"Memo";case rr:t=e._payload,e=e._init;try{return Io(e(t))}catch{}}return null}function Um(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Io(t);case 8:return t===Yl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function br(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function bh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Dm(e){var t=bh(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var s=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function cs(e){e._valueTracker||(e._valueTracker=Dm(e))}function wh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=bh(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function Js(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function $o(e,t){var r=t.checked;return me({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function rd(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=br(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function kh(e,t){t=t.checked,t!=null&&Kl(e,"checked",t,!1)}function Uo(e,t){kh(e,t);var r=br(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Do(e,t.type,r):t.hasOwnProperty("defaultValue")&&Do(e,t.type,br(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function nd(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Do(e,t,r){(t!=="number"||Js(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var aa=Array.isArray;function wn(e,t,r,n){if(e=e.options,t){t={};for(var s=0;s<r.length;s++)t["$"+r[s]]=!0;for(r=0;r<e.length;r++)s=t.hasOwnProperty("$"+e[r].value),e[r].selected!==s&&(e[r].selected=s),s&&n&&(e[r].defaultSelected=!0)}else{for(r=""+br(r),t=null,s=0;s<e.length;s++){if(e[s].value===r){e[s].selected=!0,n&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Bo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(T(91));return me({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ad(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(T(92));if(aa(r)){if(1<r.length)throw Error(T(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:br(r)}}function jh(e,t){var r=br(t.value),n=br(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function sd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Nh(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Mo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Nh(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ds,Sh=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,s){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ds=ds||document.createElement("div"),ds.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ds.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function _a(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var da={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Bm=["Webkit","ms","Moz","O"];Object.keys(da).forEach(function(e){Bm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),da[t]=da[e]})});function _h(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||da.hasOwnProperty(e)&&da[e]?(""+t).trim():t+"px"}function Ch(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,s=_h(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,s):e[r]=s}}var Mm=me({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fo(e,t){if(t){if(Mm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(T(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(T(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(T(61))}if(t.style!=null&&typeof t.style!="object")throw Error(T(62))}}function Ho(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Wo=null;function Xl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var qo=null,kn=null,jn=null;function id(e){if(e=rs(e)){if(typeof qo!="function")throw Error(T(280));var t=e.stateNode;t&&(t=Pi(t),qo(e.stateNode,e.type,t))}}function Th(e){kn?jn?jn.push(e):jn=[e]:kn=e}function Eh(){if(kn){var e=kn,t=jn;if(jn=kn=null,id(e),t)for(e=0;e<t.length;e++)id(t[e])}}function Ah(e,t){return e(t)}function Ph(){}var Qi=!1;function zh(e,t,r){if(Qi)return e(t,r);Qi=!0;try{return Ah(e,t,r)}finally{Qi=!1,(kn!==null||jn!==null)&&(Ph(),Eh())}}function Ca(e,t){var r=e.stateNode;if(r===null)return null;var n=Pi(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(T(231,t,typeof r));return r}var Go=!1;if(Kt)try{var Vn={};Object.defineProperty(Vn,"passive",{get:function(){Go=!0}}),window.addEventListener("test",Vn,Vn),window.removeEventListener("test",Vn,Vn)}catch{Go=!1}function Fm(e,t,r,n,s,i,o,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(h){this.onError(h)}}var ua=!1,Qs=null,Xs=!1,Vo=null,Hm={onError:function(e){ua=!0,Qs=e}};function Wm(e,t,r,n,s,i,o,l,c){ua=!1,Qs=null,Fm.apply(Hm,arguments)}function qm(e,t,r,n,s,i,o,l,c){if(Wm.apply(this,arguments),ua){if(ua){var d=Qs;ua=!1,Qs=null}else throw Error(T(198));Xs||(Xs=!0,Vo=d)}}function qr(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function Rh(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function od(e){if(qr(e)!==e)throw Error(T(188))}function Gm(e){var t=e.alternate;if(!t){if(t=qr(e),t===null)throw Error(T(188));return t!==e?null:e}for(var r=e,n=t;;){var s=r.return;if(s===null)break;var i=s.alternate;if(i===null){if(n=s.return,n!==null){r=n;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===r)return od(s),e;if(i===n)return od(s),t;i=i.sibling}throw Error(T(188))}if(r.return!==n.return)r=s,n=i;else{for(var o=!1,l=s.child;l;){if(l===r){o=!0,r=s,n=i;break}if(l===n){o=!0,n=s,r=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===r){o=!0,r=i,n=s;break}if(l===n){o=!0,n=i,r=s;break}l=l.sibling}if(!o)throw Error(T(189))}}if(r.alternate!==n)throw Error(T(190))}if(r.tag!==3)throw Error(T(188));return r.stateNode.current===r?e:t}function Oh(e){return e=Gm(e),e!==null?Lh(e):null}function Lh(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Lh(e);if(t!==null)return t;e=e.sibling}return null}var Ih=lt.unstable_scheduleCallback,ld=lt.unstable_cancelCallback,Vm=lt.unstable_shouldYield,Km=lt.unstable_requestPaint,ye=lt.unstable_now,Ym=lt.unstable_getCurrentPriorityLevel,Zl=lt.unstable_ImmediatePriority,$h=lt.unstable_UserBlockingPriority,Zs=lt.unstable_NormalPriority,Jm=lt.unstable_LowPriority,Uh=lt.unstable_IdlePriority,Ci=null,Ot=null;function Qm(e){if(Ot&&typeof Ot.onCommitFiberRoot=="function")try{Ot.onCommitFiberRoot(Ci,e,void 0,(e.current.flags&128)===128)}catch{}}var St=Math.clz32?Math.clz32:eg,Xm=Math.log,Zm=Math.LN2;function eg(e){return e>>>=0,e===0?32:31-(Xm(e)/Zm|0)|0}var us=64,hs=4194304;function sa(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ei(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,s=e.suspendedLanes,i=e.pingedLanes,o=r&268435455;if(o!==0){var l=o&~s;l!==0?n=sa(l):(i&=o,i!==0&&(n=sa(i)))}else o=r&~s,o!==0?n=sa(o):i!==0&&(n=sa(i));if(n===0)return 0;if(t!==0&&t!==n&&!(t&s)&&(s=n&-n,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-St(t),s=1<<r,n|=e[r],t&=~s;return n}function tg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rg(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-St(i),l=1<<o,c=s[o];c===-1?(!(l&r)||l&n)&&(s[o]=tg(l,t)):c<=t&&(e.expiredLanes|=l),i&=~l}}function Ko(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Dh(){var e=us;return us<<=1,!(us&4194240)&&(us=64),e}function Xi(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function es(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-St(t),e[t]=r}function ng(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var s=31-St(r),i=1<<s;t[s]=0,n[s]=-1,e[s]=-1,r&=~i}}function ec(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-St(r),s=1<<n;s&t|e[n]&t&&(e[n]|=t),r&=~s}}var te=0;function Bh(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Mh,tc,Fh,Hh,Wh,Yo=!1,ps=[],ur=null,hr=null,pr=null,Ta=new Map,Ea=new Map,ar=[],ag="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function cd(e,t){switch(e){case"focusin":case"focusout":ur=null;break;case"dragenter":case"dragleave":hr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":Ta.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ea.delete(t.pointerId)}}function Kn(e,t,r,n,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[s]},t!==null&&(t=rs(t),t!==null&&tc(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function sg(e,t,r,n,s){switch(t){case"focusin":return ur=Kn(ur,e,t,r,n,s),!0;case"dragenter":return hr=Kn(hr,e,t,r,n,s),!0;case"mouseover":return pr=Kn(pr,e,t,r,n,s),!0;case"pointerover":var i=s.pointerId;return Ta.set(i,Kn(Ta.get(i)||null,e,t,r,n,s)),!0;case"gotpointercapture":return i=s.pointerId,Ea.set(i,Kn(Ea.get(i)||null,e,t,r,n,s)),!0}return!1}function qh(e){var t=Rr(e.target);if(t!==null){var r=qr(t);if(r!==null){if(t=r.tag,t===13){if(t=Rh(r),t!==null){e.blockedOn=t,Wh(e.priority,function(){Fh(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Us(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Jo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);Wo=n,r.target.dispatchEvent(n),Wo=null}else return t=rs(r),t!==null&&tc(t),e.blockedOn=r,!1;t.shift()}return!0}function dd(e,t,r){Us(e)&&r.delete(t)}function ig(){Yo=!1,ur!==null&&Us(ur)&&(ur=null),hr!==null&&Us(hr)&&(hr=null),pr!==null&&Us(pr)&&(pr=null),Ta.forEach(dd),Ea.forEach(dd)}function Yn(e,t){e.blockedOn===t&&(e.blockedOn=null,Yo||(Yo=!0,lt.unstable_scheduleCallback(lt.unstable_NormalPriority,ig)))}function Aa(e){function t(s){return Yn(s,e)}if(0<ps.length){Yn(ps[0],e);for(var r=1;r<ps.length;r++){var n=ps[r];n.blockedOn===e&&(n.blockedOn=null)}}for(ur!==null&&Yn(ur,e),hr!==null&&Yn(hr,e),pr!==null&&Yn(pr,e),Ta.forEach(t),Ea.forEach(t),r=0;r<ar.length;r++)n=ar[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<ar.length&&(r=ar[0],r.blockedOn===null);)qh(r),r.blockedOn===null&&ar.shift()}var Nn=Xt.ReactCurrentBatchConfig,ti=!0;function og(e,t,r,n){var s=te,i=Nn.transition;Nn.transition=null;try{te=1,rc(e,t,r,n)}finally{te=s,Nn.transition=i}}function lg(e,t,r,n){var s=te,i=Nn.transition;Nn.transition=null;try{te=4,rc(e,t,r,n)}finally{te=s,Nn.transition=i}}function rc(e,t,r,n){if(ti){var s=Jo(e,t,r,n);if(s===null)lo(e,t,n,ri,r),cd(e,n);else if(sg(s,e,t,r,n))n.stopPropagation();else if(cd(e,n),t&4&&-1<ag.indexOf(e)){for(;s!==null;){var i=rs(s);if(i!==null&&Mh(i),i=Jo(e,t,r,n),i===null&&lo(e,t,n,ri,r),i===s)break;s=i}s!==null&&n.stopPropagation()}else lo(e,t,n,null,r)}}var ri=null;function Jo(e,t,r,n){if(ri=null,e=Xl(n),e=Rr(e),e!==null)if(t=qr(e),t===null)e=null;else if(r=t.tag,r===13){if(e=Rh(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ri=e,null}function Gh(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ym()){case Zl:return 1;case $h:return 4;case Zs:case Jm:return 16;case Uh:return 536870912;default:return 16}default:return 16}}var lr=null,nc=null,Ds=null;function Vh(){if(Ds)return Ds;var e,t=nc,r=t.length,n,s="value"in lr?lr.value:lr.textContent,i=s.length;for(e=0;e<r&&t[e]===s[e];e++);var o=r-e;for(n=1;n<=o&&t[r-n]===s[i-n];n++);return Ds=s.slice(e,1<n?1-n:void 0)}function Bs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function fs(){return!0}function ud(){return!1}function dt(e){function t(r,n,s,i,o){this._reactName=r,this._targetInst=s,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(r=e[l],this[l]=r?r(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?fs:ud,this.isPropagationStopped=ud,this}return me(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=fs)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=fs)},persist:function(){},isPersistent:fs}),t}var In={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ac=dt(In),ts=me({},In,{view:0,detail:0}),cg=dt(ts),Zi,eo,Jn,Ti=me({},ts,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Jn&&(Jn&&e.type==="mousemove"?(Zi=e.screenX-Jn.screenX,eo=e.screenY-Jn.screenY):eo=Zi=0,Jn=e),Zi)},movementY:function(e){return"movementY"in e?e.movementY:eo}}),hd=dt(Ti),dg=me({},Ti,{dataTransfer:0}),ug=dt(dg),hg=me({},ts,{relatedTarget:0}),to=dt(hg),pg=me({},In,{animationName:0,elapsedTime:0,pseudoElement:0}),fg=dt(pg),mg=me({},In,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),gg=dt(mg),xg=me({},In,{data:0}),pd=dt(xg),vg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},yg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},bg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function wg(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=bg[e])?!!t[e]:!1}function sc(){return wg}var kg=me({},ts,{key:function(e){if(e.key){var t=vg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Bs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?yg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sc,charCode:function(e){return e.type==="keypress"?Bs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Bs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jg=dt(kg),Ng=me({},Ti,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fd=dt(Ng),Sg=me({},ts,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sc}),_g=dt(Sg),Cg=me({},In,{propertyName:0,elapsedTime:0,pseudoElement:0}),Tg=dt(Cg),Eg=me({},Ti,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ag=dt(Eg),Pg=[9,13,27,32],ic=Kt&&"CompositionEvent"in window,ha=null;Kt&&"documentMode"in document&&(ha=document.documentMode);var zg=Kt&&"TextEvent"in window&&!ha,Kh=Kt&&(!ic||ha&&8<ha&&11>=ha),md=" ",gd=!1;function Yh(e,t){switch(e){case"keyup":return Pg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var cn=!1;function Rg(e,t){switch(e){case"compositionend":return Jh(t);case"keypress":return t.which!==32?null:(gd=!0,md);case"textInput":return e=t.data,e===md&&gd?null:e;default:return null}}function Og(e,t){if(cn)return e==="compositionend"||!ic&&Yh(e,t)?(e=Vh(),Ds=nc=lr=null,cn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Kh&&t.locale!=="ko"?null:t.data;default:return null}}var Lg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Lg[e.type]:t==="textarea"}function Qh(e,t,r,n){Th(n),t=ni(t,"onChange"),0<t.length&&(r=new ac("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var pa=null,Pa=null;function Ig(e){lp(e,0)}function Ei(e){var t=hn(e);if(wh(t))return e}function $g(e,t){if(e==="change")return t}var Xh=!1;if(Kt){var ro;if(Kt){var no="oninput"in document;if(!no){var vd=document.createElement("div");vd.setAttribute("oninput","return;"),no=typeof vd.oninput=="function"}ro=no}else ro=!1;Xh=ro&&(!document.documentMode||9<document.documentMode)}function yd(){pa&&(pa.detachEvent("onpropertychange",Zh),Pa=pa=null)}function Zh(e){if(e.propertyName==="value"&&Ei(Pa)){var t=[];Qh(t,Pa,e,Xl(e)),zh(Ig,t)}}function Ug(e,t,r){e==="focusin"?(yd(),pa=t,Pa=r,pa.attachEvent("onpropertychange",Zh)):e==="focusout"&&yd()}function Dg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ei(Pa)}function Bg(e,t){if(e==="click")return Ei(t)}function Mg(e,t){if(e==="input"||e==="change")return Ei(t)}function Fg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ct=typeof Object.is=="function"?Object.is:Fg;function za(e,t){if(Ct(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var s=r[n];if(!zo.call(t,s)||!Ct(e[s],t[s]))return!1}return!0}function bd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wd(e,t){var r=bd(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=bd(r)}}function ep(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ep(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function tp(){for(var e=window,t=Js();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Js(e.document)}return t}function oc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Hg(e){var t=tp(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&ep(r.ownerDocument.documentElement,r)){if(n!==null&&oc(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=r.textContent.length,i=Math.min(n.start,s);n=n.end===void 0?i:Math.min(n.end,s),!e.extend&&i>n&&(s=n,n=i,i=s),s=wd(r,i);var o=wd(r,n);s&&o&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>n?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Wg=Kt&&"documentMode"in document&&11>=document.documentMode,dn=null,Qo=null,fa=null,Xo=!1;function kd(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Xo||dn==null||dn!==Js(n)||(n=dn,"selectionStart"in n&&oc(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),fa&&za(fa,n)||(fa=n,n=ni(Qo,"onSelect"),0<n.length&&(t=new ac("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=dn)))}function ms(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var un={animationend:ms("Animation","AnimationEnd"),animationiteration:ms("Animation","AnimationIteration"),animationstart:ms("Animation","AnimationStart"),transitionend:ms("Transition","TransitionEnd")},ao={},rp={};Kt&&(rp=document.createElement("div").style,"AnimationEvent"in window||(delete un.animationend.animation,delete un.animationiteration.animation,delete un.animationstart.animation),"TransitionEvent"in window||delete un.transitionend.transition);function Ai(e){if(ao[e])return ao[e];if(!un[e])return e;var t=un[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in rp)return ao[e]=t[r];return e}var np=Ai("animationend"),ap=Ai("animationiteration"),sp=Ai("animationstart"),ip=Ai("transitionend"),op=new Map,jd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function kr(e,t){op.set(e,t),Wr(t,[e])}for(var so=0;so<jd.length;so++){var io=jd[so],qg=io.toLowerCase(),Gg=io[0].toUpperCase()+io.slice(1);kr(qg,"on"+Gg)}kr(np,"onAnimationEnd");kr(ap,"onAnimationIteration");kr(sp,"onAnimationStart");kr("dblclick","onDoubleClick");kr("focusin","onFocus");kr("focusout","onBlur");kr(ip,"onTransitionEnd");Tn("onMouseEnter",["mouseout","mouseover"]);Tn("onMouseLeave",["mouseout","mouseover"]);Tn("onPointerEnter",["pointerout","pointerover"]);Tn("onPointerLeave",["pointerout","pointerover"]);Wr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ia="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vg=new Set("cancel close invalid load scroll toggle".split(" ").concat(ia));function Nd(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,qm(n,t,void 0,e),e.currentTarget=null}function lp(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],s=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var o=n.length-1;0<=o;o--){var l=n[o],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==i&&s.isPropagationStopped())break e;Nd(s,l,d),i=c}else for(o=0;o<n.length;o++){if(l=n[o],c=l.instance,d=l.currentTarget,l=l.listener,c!==i&&s.isPropagationStopped())break e;Nd(s,l,d),i=c}}}if(Xs)throw e=Vo,Xs=!1,Vo=null,e}function ie(e,t){var r=t[nl];r===void 0&&(r=t[nl]=new Set);var n=e+"__bubble";r.has(n)||(cp(t,e,2,!1),r.add(n))}function oo(e,t,r){var n=0;t&&(n|=4),cp(r,e,n,t)}var gs="_reactListening"+Math.random().toString(36).slice(2);function Ra(e){if(!e[gs]){e[gs]=!0,gh.forEach(function(r){r!=="selectionchange"&&(Vg.has(r)||oo(r,!1,e),oo(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[gs]||(t[gs]=!0,oo("selectionchange",!1,t))}}function cp(e,t,r,n){switch(Gh(t)){case 1:var s=og;break;case 4:s=lg;break;default:s=rc}r=s.bind(null,t,r,e),s=void 0,!Go||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),n?s!==void 0?e.addEventListener(t,r,{capture:!0,passive:s}):e.addEventListener(t,r,!0):s!==void 0?e.addEventListener(t,r,{passive:s}):e.addEventListener(t,r,!1)}function lo(e,t,r,n,s){var i=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var o=n.tag;if(o===3||o===4){var l=n.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=n.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Rr(l),o===null)return;if(c=o.tag,c===5||c===6){n=i=o;continue e}l=l.parentNode}}n=n.return}zh(function(){var d=i,h=Xl(r),u=[];e:{var p=op.get(e);if(p!==void 0){var x=ac,y=e;switch(e){case"keypress":if(Bs(r)===0)break e;case"keydown":case"keyup":x=jg;break;case"focusin":y="focus",x=to;break;case"focusout":y="blur",x=to;break;case"beforeblur":case"afterblur":x=to;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=hd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=ug;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=_g;break;case np:case ap:case sp:x=fg;break;case ip:x=Tg;break;case"scroll":x=cg;break;case"wheel":x=Ag;break;case"copy":case"cut":case"paste":x=gg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=fd}var b=(t&4)!==0,w=!b&&e==="scroll",g=b?p!==null?p+"Capture":null:p;b=[];for(var f=d,m;f!==null;){m=f;var k=m.stateNode;if(m.tag===5&&k!==null&&(m=k,g!==null&&(k=Ca(f,g),k!=null&&b.push(Oa(f,k,m)))),w)break;f=f.return}0<b.length&&(p=new x(p,y,null,r,h),u.push({event:p,listeners:b}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",p&&r!==Wo&&(y=r.relatedTarget||r.fromElement)&&(Rr(y)||y[Yt]))break e;if((x||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,x?(y=r.relatedTarget||r.toElement,x=d,y=y?Rr(y):null,y!==null&&(w=qr(y),y!==w||y.tag!==5&&y.tag!==6)&&(y=null)):(x=null,y=d),x!==y)){if(b=hd,k="onMouseLeave",g="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(b=fd,k="onPointerLeave",g="onPointerEnter",f="pointer"),w=x==null?p:hn(x),m=y==null?p:hn(y),p=new b(k,f+"leave",x,r,h),p.target=w,p.relatedTarget=m,k=null,Rr(h)===d&&(b=new b(g,f+"enter",y,r,h),b.target=m,b.relatedTarget=w,k=b),w=k,x&&y)t:{for(b=x,g=y,f=0,m=b;m;m=Kr(m))f++;for(m=0,k=g;k;k=Kr(k))m++;for(;0<f-m;)b=Kr(b),f--;for(;0<m-f;)g=Kr(g),m--;for(;f--;){if(b===g||g!==null&&b===g.alternate)break t;b=Kr(b),g=Kr(g)}b=null}else b=null;x!==null&&Sd(u,p,x,b,!1),y!==null&&w!==null&&Sd(u,w,y,b,!0)}}e:{if(p=d?hn(d):window,x=p.nodeName&&p.nodeName.toLowerCase(),x==="select"||x==="input"&&p.type==="file")var N=$g;else if(xd(p))if(Xh)N=Mg;else{N=Dg;var S=Ug}else(x=p.nodeName)&&x.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(N=Bg);if(N&&(N=N(e,d))){Qh(u,N,r,h);break e}S&&S(e,p,d),e==="focusout"&&(S=p._wrapperState)&&S.controlled&&p.type==="number"&&Do(p,"number",p.value)}switch(S=d?hn(d):window,e){case"focusin":(xd(S)||S.contentEditable==="true")&&(dn=S,Qo=d,fa=null);break;case"focusout":fa=Qo=dn=null;break;case"mousedown":Xo=!0;break;case"contextmenu":case"mouseup":case"dragend":Xo=!1,kd(u,r,h);break;case"selectionchange":if(Wg)break;case"keydown":case"keyup":kd(u,r,h)}var _;if(ic)e:{switch(e){case"compositionstart":var L="onCompositionStart";break e;case"compositionend":L="onCompositionEnd";break e;case"compositionupdate":L="onCompositionUpdate";break e}L=void 0}else cn?Yh(e,r)&&(L="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(L="onCompositionStart");L&&(Kh&&r.locale!=="ko"&&(cn||L!=="onCompositionStart"?L==="onCompositionEnd"&&cn&&(_=Vh()):(lr=h,nc="value"in lr?lr.value:lr.textContent,cn=!0)),S=ni(d,L),0<S.length&&(L=new pd(L,e,null,r,h),u.push({event:L,listeners:S}),_?L.data=_:(_=Jh(r),_!==null&&(L.data=_)))),(_=zg?Rg(e,r):Og(e,r))&&(d=ni(d,"onBeforeInput"),0<d.length&&(h=new pd("onBeforeInput","beforeinput",null,r,h),u.push({event:h,listeners:d}),h.data=_))}lp(u,t)})}function Oa(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ni(e,t){for(var r=t+"Capture",n=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Ca(e,r),i!=null&&n.unshift(Oa(e,i,s)),i=Ca(e,t),i!=null&&n.push(Oa(e,i,s))),e=e.return}return n}function Kr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Sd(e,t,r,n,s){for(var i=t._reactName,o=[];r!==null&&r!==n;){var l=r,c=l.alternate,d=l.stateNode;if(c!==null&&c===n)break;l.tag===5&&d!==null&&(l=d,s?(c=Ca(r,i),c!=null&&o.unshift(Oa(r,c,l))):s||(c=Ca(r,i),c!=null&&o.push(Oa(r,c,l)))),r=r.return}o.length!==0&&e.push({event:t,listeners:o})}var Kg=/\r\n?/g,Yg=/\u0000|\uFFFD/g;function _d(e){return(typeof e=="string"?e:""+e).replace(Kg,`
`).replace(Yg,"")}function xs(e,t,r){if(t=_d(t),_d(e)!==t&&r)throw Error(T(425))}function ai(){}var Zo=null,el=null;function tl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var rl=typeof setTimeout=="function"?setTimeout:void 0,Jg=typeof clearTimeout=="function"?clearTimeout:void 0,Cd=typeof Promise=="function"?Promise:void 0,Qg=typeof queueMicrotask=="function"?queueMicrotask:typeof Cd<"u"?function(e){return Cd.resolve(null).then(e).catch(Xg)}:rl;function Xg(e){setTimeout(function(){throw e})}function co(e,t){var r=t,n=0;do{var s=r.nextSibling;if(e.removeChild(r),s&&s.nodeType===8)if(r=s.data,r==="/$"){if(n===0){e.removeChild(s),Aa(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=s}while(r);Aa(t)}function fr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Td(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var $n=Math.random().toString(36).slice(2),Rt="__reactFiber$"+$n,La="__reactProps$"+$n,Yt="__reactContainer$"+$n,nl="__reactEvents$"+$n,Zg="__reactListeners$"+$n,ex="__reactHandles$"+$n;function Rr(e){var t=e[Rt];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Yt]||r[Rt]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Td(e);e!==null;){if(r=e[Rt])return r;e=Td(e)}return t}e=r,r=e.parentNode}return null}function rs(e){return e=e[Rt]||e[Yt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function hn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(T(33))}function Pi(e){return e[La]||null}var al=[],pn=-1;function jr(e){return{current:e}}function oe(e){0>pn||(e.current=al[pn],al[pn]=null,pn--)}function se(e,t){pn++,al[pn]=e.current,e.current=t}var wr={},qe=jr(wr),et=jr(!1),Dr=wr;function En(e,t){var r=e.type.contextTypes;if(!r)return wr;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in r)s[i]=t[i];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function tt(e){return e=e.childContextTypes,e!=null}function si(){oe(et),oe(qe)}function Ed(e,t,r){if(qe.current!==wr)throw Error(T(168));se(qe,t),se(et,r)}function dp(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var s in n)if(!(s in t))throw Error(T(108,Um(e)||"Unknown",s));return me({},r,n)}function ii(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||wr,Dr=qe.current,se(qe,e),se(et,et.current),!0}function Ad(e,t,r){var n=e.stateNode;if(!n)throw Error(T(169));r?(e=dp(e,t,Dr),n.__reactInternalMemoizedMergedChildContext=e,oe(et),oe(qe),se(qe,e)):oe(et),se(et,r)}var Wt=null,zi=!1,uo=!1;function up(e){Wt===null?Wt=[e]:Wt.push(e)}function tx(e){zi=!0,up(e)}function Nr(){if(!uo&&Wt!==null){uo=!0;var e=0,t=te;try{var r=Wt;for(te=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}Wt=null,zi=!1}catch(s){throw Wt!==null&&(Wt=Wt.slice(e+1)),Ih(Zl,Nr),s}finally{te=t,uo=!1}}return null}var fn=[],mn=0,oi=null,li=0,ht=[],pt=0,Br=null,qt=1,Gt="";function Er(e,t){fn[mn++]=li,fn[mn++]=oi,oi=e,li=t}function hp(e,t,r){ht[pt++]=qt,ht[pt++]=Gt,ht[pt++]=Br,Br=e;var n=qt;e=Gt;var s=32-St(n)-1;n&=~(1<<s),r+=1;var i=32-St(t)+s;if(30<i){var o=s-s%5;i=(n&(1<<o)-1).toString(32),n>>=o,s-=o,qt=1<<32-St(t)+s|r<<s|n,Gt=i+e}else qt=1<<i|r<<s|n,Gt=e}function lc(e){e.return!==null&&(Er(e,1),hp(e,1,0))}function cc(e){for(;e===oi;)oi=fn[--mn],fn[mn]=null,li=fn[--mn],fn[mn]=null;for(;e===Br;)Br=ht[--pt],ht[pt]=null,Gt=ht[--pt],ht[pt]=null,qt=ht[--pt],ht[pt]=null}var ot=null,it=null,de=!1,Nt=null;function pp(e,t){var r=ft(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Pd(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ot=e,it=fr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ot=e,it=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Br!==null?{id:qt,overflow:Gt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=ft(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,ot=e,it=null,!0):!1;default:return!1}}function sl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function il(e){if(de){var t=it;if(t){var r=t;if(!Pd(e,t)){if(sl(e))throw Error(T(418));t=fr(r.nextSibling);var n=ot;t&&Pd(e,t)?pp(n,r):(e.flags=e.flags&-4097|2,de=!1,ot=e)}}else{if(sl(e))throw Error(T(418));e.flags=e.flags&-4097|2,de=!1,ot=e}}}function zd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ot=e}function vs(e){if(e!==ot)return!1;if(!de)return zd(e),de=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!tl(e.type,e.memoizedProps)),t&&(t=it)){if(sl(e))throw fp(),Error(T(418));for(;t;)pp(e,t),t=fr(t.nextSibling)}if(zd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(T(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){it=fr(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}it=null}}else it=ot?fr(e.stateNode.nextSibling):null;return!0}function fp(){for(var e=it;e;)e=fr(e.nextSibling)}function An(){it=ot=null,de=!1}function dc(e){Nt===null?Nt=[e]:Nt.push(e)}var rx=Xt.ReactCurrentBatchConfig;function Qn(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(T(309));var n=r.stateNode}if(!n)throw Error(T(147,e));var s=n,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(T(284));if(!r._owner)throw Error(T(290,e))}return e}function ys(e,t){throw e=Object.prototype.toString.call(t),Error(T(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Rd(e){var t=e._init;return t(e._payload)}function mp(e){function t(g,f){if(e){var m=g.deletions;m===null?(g.deletions=[f],g.flags|=16):m.push(f)}}function r(g,f){if(!e)return null;for(;f!==null;)t(g,f),f=f.sibling;return null}function n(g,f){for(g=new Map;f!==null;)f.key!==null?g.set(f.key,f):g.set(f.index,f),f=f.sibling;return g}function s(g,f){return g=vr(g,f),g.index=0,g.sibling=null,g}function i(g,f,m){return g.index=m,e?(m=g.alternate,m!==null?(m=m.index,m<f?(g.flags|=2,f):m):(g.flags|=2,f)):(g.flags|=1048576,f)}function o(g){return e&&g.alternate===null&&(g.flags|=2),g}function l(g,f,m,k){return f===null||f.tag!==6?(f=vo(m,g.mode,k),f.return=g,f):(f=s(f,m),f.return=g,f)}function c(g,f,m,k){var N=m.type;return N===ln?h(g,f,m.props.children,k,m.key):f!==null&&(f.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===rr&&Rd(N)===f.type)?(k=s(f,m.props),k.ref=Qn(g,f,m),k.return=g,k):(k=Vs(m.type,m.key,m.props,null,g.mode,k),k.ref=Qn(g,f,m),k.return=g,k)}function d(g,f,m,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=yo(m,g.mode,k),f.return=g,f):(f=s(f,m.children||[]),f.return=g,f)}function h(g,f,m,k,N){return f===null||f.tag!==7?(f=Ur(m,g.mode,k,N),f.return=g,f):(f=s(f,m),f.return=g,f)}function u(g,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=vo(""+f,g.mode,m),f.return=g,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ls:return m=Vs(f.type,f.key,f.props,null,g.mode,m),m.ref=Qn(g,null,f),m.return=g,m;case on:return f=yo(f,g.mode,m),f.return=g,f;case rr:var k=f._init;return u(g,k(f._payload),m)}if(aa(f)||Gn(f))return f=Ur(f,g.mode,m,null),f.return=g,f;ys(g,f)}return null}function p(g,f,m,k){var N=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return N!==null?null:l(g,f,""+m,k);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ls:return m.key===N?c(g,f,m,k):null;case on:return m.key===N?d(g,f,m,k):null;case rr:return N=m._init,p(g,f,N(m._payload),k)}if(aa(m)||Gn(m))return N!==null?null:h(g,f,m,k,null);ys(g,m)}return null}function x(g,f,m,k,N){if(typeof k=="string"&&k!==""||typeof k=="number")return g=g.get(m)||null,l(f,g,""+k,N);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case ls:return g=g.get(k.key===null?m:k.key)||null,c(f,g,k,N);case on:return g=g.get(k.key===null?m:k.key)||null,d(f,g,k,N);case rr:var S=k._init;return x(g,f,m,S(k._payload),N)}if(aa(k)||Gn(k))return g=g.get(m)||null,h(f,g,k,N,null);ys(f,k)}return null}function y(g,f,m,k){for(var N=null,S=null,_=f,L=f=0,G=null;_!==null&&L<m.length;L++){_.index>L?(G=_,_=null):G=_.sibling;var C=p(g,_,m[L],k);if(C===null){_===null&&(_=G);break}e&&_&&C.alternate===null&&t(g,_),f=i(C,f,L),S===null?N=C:S.sibling=C,S=C,_=G}if(L===m.length)return r(g,_),de&&Er(g,L),N;if(_===null){for(;L<m.length;L++)_=u(g,m[L],k),_!==null&&(f=i(_,f,L),S===null?N=_:S.sibling=_,S=_);return de&&Er(g,L),N}for(_=n(g,_);L<m.length;L++)G=x(_,g,L,m[L],k),G!==null&&(e&&G.alternate!==null&&_.delete(G.key===null?L:G.key),f=i(G,f,L),S===null?N=G:S.sibling=G,S=G);return e&&_.forEach(function(Z){return t(g,Z)}),de&&Er(g,L),N}function b(g,f,m,k){var N=Gn(m);if(typeof N!="function")throw Error(T(150));if(m=N.call(m),m==null)throw Error(T(151));for(var S=N=null,_=f,L=f=0,G=null,C=m.next();_!==null&&!C.done;L++,C=m.next()){_.index>L?(G=_,_=null):G=_.sibling;var Z=p(g,_,C.value,k);if(Z===null){_===null&&(_=G);break}e&&_&&Z.alternate===null&&t(g,_),f=i(Z,f,L),S===null?N=Z:S.sibling=Z,S=Z,_=G}if(C.done)return r(g,_),de&&Er(g,L),N;if(_===null){for(;!C.done;L++,C=m.next())C=u(g,C.value,k),C!==null&&(f=i(C,f,L),S===null?N=C:S.sibling=C,S=C);return de&&Er(g,L),N}for(_=n(g,_);!C.done;L++,C=m.next())C=x(_,g,L,C.value,k),C!==null&&(e&&C.alternate!==null&&_.delete(C.key===null?L:C.key),f=i(C,f,L),S===null?N=C:S.sibling=C,S=C);return e&&_.forEach(function(le){return t(g,le)}),de&&Er(g,L),N}function w(g,f,m,k){if(typeof m=="object"&&m!==null&&m.type===ln&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case ls:e:{for(var N=m.key,S=f;S!==null;){if(S.key===N){if(N=m.type,N===ln){if(S.tag===7){r(g,S.sibling),f=s(S,m.props.children),f.return=g,g=f;break e}}else if(S.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===rr&&Rd(N)===S.type){r(g,S.sibling),f=s(S,m.props),f.ref=Qn(g,S,m),f.return=g,g=f;break e}r(g,S);break}else t(g,S);S=S.sibling}m.type===ln?(f=Ur(m.props.children,g.mode,k,m.key),f.return=g,g=f):(k=Vs(m.type,m.key,m.props,null,g.mode,k),k.ref=Qn(g,f,m),k.return=g,g=k)}return o(g);case on:e:{for(S=m.key;f!==null;){if(f.key===S)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){r(g,f.sibling),f=s(f,m.children||[]),f.return=g,g=f;break e}else{r(g,f);break}else t(g,f);f=f.sibling}f=yo(m,g.mode,k),f.return=g,g=f}return o(g);case rr:return S=m._init,w(g,f,S(m._payload),k)}if(aa(m))return y(g,f,m,k);if(Gn(m))return b(g,f,m,k);ys(g,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(r(g,f.sibling),f=s(f,m),f.return=g,g=f):(r(g,f),f=vo(m,g.mode,k),f.return=g,g=f),o(g)):r(g,f)}return w}var Pn=mp(!0),gp=mp(!1),ci=jr(null),di=null,gn=null,uc=null;function hc(){uc=gn=di=null}function pc(e){var t=ci.current;oe(ci),e._currentValue=t}function ol(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function Sn(e,t){di=e,uc=gn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ze=!0),e.firstContext=null)}function gt(e){var t=e._currentValue;if(uc!==e)if(e={context:e,memoizedValue:t,next:null},gn===null){if(di===null)throw Error(T(308));gn=e,di.dependencies={lanes:0,firstContext:e}}else gn=gn.next=e;return t}var Or=null;function fc(e){Or===null?Or=[e]:Or.push(e)}function xp(e,t,r,n){var s=t.interleaved;return s===null?(r.next=r,fc(t)):(r.next=s.next,s.next=r),t.interleaved=r,Jt(e,n)}function Jt(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var nr=!1;function mc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function vp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Vt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function mr(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,X&2){var s=n.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),n.pending=t,Jt(e,r)}return s=n.interleaved,s===null?(t.next=t,fc(n)):(t.next=s.next,s.next=t),n.interleaved=t,Jt(e,r)}function Ms(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,ec(e,r)}}function Od(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var s=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var o={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?s=i=o:i=i.next=o,r=r.next}while(r!==null);i===null?s=i=t:i=i.next=t}else s=i=t;r={baseState:n.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function ui(e,t,r,n){var s=e.updateQueue;nr=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,d=c.next;c.next=null,o===null?i=d:o.next=d,o=c;var h=e.alternate;h!==null&&(h=h.updateQueue,l=h.lastBaseUpdate,l!==o&&(l===null?h.firstBaseUpdate=d:l.next=d,h.lastBaseUpdate=c))}if(i!==null){var u=s.baseState;o=0,h=d=c=null,l=i;do{var p=l.lane,x=l.eventTime;if((n&p)===p){h!==null&&(h=h.next={eventTime:x,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=e,b=l;switch(p=t,x=r,b.tag){case 1:if(y=b.payload,typeof y=="function"){u=y.call(x,u,p);break e}u=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=b.payload,p=typeof y=="function"?y.call(x,u,p):y,p==null)break e;u=me({},u,p);break e;case 2:nr=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,p=s.effects,p===null?s.effects=[l]:p.push(l))}else x={eventTime:x,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},h===null?(d=h=x,c=u):h=h.next=x,o|=p;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;p=l,l=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);if(h===null&&(c=u),s.baseState=c,s.firstBaseUpdate=d,s.lastBaseUpdate=h,t=s.shared.interleaved,t!==null){s=t;do o|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);Fr|=o,e.lanes=o,e.memoizedState=u}}function Ld(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],s=n.callback;if(s!==null){if(n.callback=null,n=r,typeof s!="function")throw Error(T(191,s));s.call(n)}}}var ns={},Lt=jr(ns),Ia=jr(ns),$a=jr(ns);function Lr(e){if(e===ns)throw Error(T(174));return e}function gc(e,t){switch(se($a,t),se(Ia,e),se(Lt,ns),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Mo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Mo(t,e)}oe(Lt),se(Lt,t)}function zn(){oe(Lt),oe(Ia),oe($a)}function yp(e){Lr($a.current);var t=Lr(Lt.current),r=Mo(t,e.type);t!==r&&(se(Ia,e),se(Lt,r))}function xc(e){Ia.current===e&&(oe(Lt),oe(Ia))}var pe=jr(0);function hi(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ho=[];function vc(){for(var e=0;e<ho.length;e++)ho[e]._workInProgressVersionPrimary=null;ho.length=0}var Fs=Xt.ReactCurrentDispatcher,po=Xt.ReactCurrentBatchConfig,Mr=0,fe=null,Se=null,Ae=null,pi=!1,ma=!1,Ua=0,nx=0;function Fe(){throw Error(T(321))}function yc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Ct(e[r],t[r]))return!1;return!0}function bc(e,t,r,n,s,i){if(Mr=i,fe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Fs.current=e===null||e.memoizedState===null?ox:lx,e=r(n,s),ma){i=0;do{if(ma=!1,Ua=0,25<=i)throw Error(T(301));i+=1,Ae=Se=null,t.updateQueue=null,Fs.current=cx,e=r(n,s)}while(ma)}if(Fs.current=fi,t=Se!==null&&Se.next!==null,Mr=0,Ae=Se=fe=null,pi=!1,t)throw Error(T(300));return e}function wc(){var e=Ua!==0;return Ua=0,e}function At(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ae===null?fe.memoizedState=Ae=e:Ae=Ae.next=e,Ae}function xt(){if(Se===null){var e=fe.alternate;e=e!==null?e.memoizedState:null}else e=Se.next;var t=Ae===null?fe.memoizedState:Ae.next;if(t!==null)Ae=t,Se=e;else{if(e===null)throw Error(T(310));Se=e,e={memoizedState:Se.memoizedState,baseState:Se.baseState,baseQueue:Se.baseQueue,queue:Se.queue,next:null},Ae===null?fe.memoizedState=Ae=e:Ae=Ae.next=e}return Ae}function Da(e,t){return typeof t=="function"?t(e):t}function fo(e){var t=xt(),r=t.queue;if(r===null)throw Error(T(311));r.lastRenderedReducer=e;var n=Se,s=n.baseQueue,i=r.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}n.baseQueue=s=i,r.pending=null}if(s!==null){i=s.next,n=n.baseState;var l=o=null,c=null,d=i;do{var h=d.lane;if((Mr&h)===h)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),n=d.hasEagerState?d.eagerState:e(n,d.action);else{var u={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=u,o=n):c=c.next=u,fe.lanes|=h,Fr|=h}d=d.next}while(d!==null&&d!==i);c===null?o=n:c.next=l,Ct(n,t.memoizedState)||(Ze=!0),t.memoizedState=n,t.baseState=o,t.baseQueue=c,r.lastRenderedState=n}if(e=r.interleaved,e!==null){s=e;do i=s.lane,fe.lanes|=i,Fr|=i,s=s.next;while(s!==e)}else s===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function mo(e){var t=xt(),r=t.queue;if(r===null)throw Error(T(311));r.lastRenderedReducer=e;var n=r.dispatch,s=r.pending,i=t.memoizedState;if(s!==null){r.pending=null;var o=s=s.next;do i=e(i,o.action),o=o.next;while(o!==s);Ct(i,t.memoizedState)||(Ze=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),r.lastRenderedState=i}return[i,n]}function bp(){}function wp(e,t){var r=fe,n=xt(),s=t(),i=!Ct(n.memoizedState,s);if(i&&(n.memoizedState=s,Ze=!0),n=n.queue,kc(Np.bind(null,r,n,e),[e]),n.getSnapshot!==t||i||Ae!==null&&Ae.memoizedState.tag&1){if(r.flags|=2048,Ba(9,jp.bind(null,r,n,s,t),void 0,null),Pe===null)throw Error(T(349));Mr&30||kp(r,t,s)}return s}function kp(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=fe.updateQueue,t===null?(t={lastEffect:null,stores:null},fe.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function jp(e,t,r,n){t.value=r,t.getSnapshot=n,Sp(t)&&_p(e)}function Np(e,t,r){return r(function(){Sp(t)&&_p(e)})}function Sp(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Ct(e,r)}catch{return!0}}function _p(e){var t=Jt(e,1);t!==null&&_t(t,e,1,-1)}function Id(e){var t=At();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Da,lastRenderedState:e},t.queue=e,e=e.dispatch=ix.bind(null,fe,e),[t.memoizedState,e]}function Ba(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=fe.updateQueue,t===null?(t={lastEffect:null,stores:null},fe.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function Cp(){return xt().memoizedState}function Hs(e,t,r,n){var s=At();fe.flags|=e,s.memoizedState=Ba(1|t,r,void 0,n===void 0?null:n)}function Ri(e,t,r,n){var s=xt();n=n===void 0?null:n;var i=void 0;if(Se!==null){var o=Se.memoizedState;if(i=o.destroy,n!==null&&yc(n,o.deps)){s.memoizedState=Ba(t,r,i,n);return}}fe.flags|=e,s.memoizedState=Ba(1|t,r,i,n)}function $d(e,t){return Hs(8390656,8,e,t)}function kc(e,t){return Ri(2048,8,e,t)}function Tp(e,t){return Ri(4,2,e,t)}function Ep(e,t){return Ri(4,4,e,t)}function Ap(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Pp(e,t,r){return r=r!=null?r.concat([e]):null,Ri(4,4,Ap.bind(null,t,e),r)}function jc(){}function zp(e,t){var r=xt();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&yc(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Rp(e,t){var r=xt();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&yc(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function Op(e,t,r){return Mr&21?(Ct(r,t)||(r=Dh(),fe.lanes|=r,Fr|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ze=!0),e.memoizedState=r)}function ax(e,t){var r=te;te=r!==0&&4>r?r:4,e(!0);var n=po.transition;po.transition={};try{e(!1),t()}finally{te=r,po.transition=n}}function Lp(){return xt().memoizedState}function sx(e,t,r){var n=xr(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},Ip(e))$p(t,r);else if(r=xp(e,t,r,n),r!==null){var s=Ke();_t(r,e,n,s),Up(r,t,n)}}function ix(e,t,r){var n=xr(e),s={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(Ip(e))$p(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,l=i(o,r);if(s.hasEagerState=!0,s.eagerState=l,Ct(l,o)){var c=t.interleaved;c===null?(s.next=s,fc(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}r=xp(e,t,s,n),r!==null&&(s=Ke(),_t(r,e,n,s),Up(r,t,n))}}function Ip(e){var t=e.alternate;return e===fe||t!==null&&t===fe}function $p(e,t){ma=pi=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Up(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,ec(e,r)}}var fi={readContext:gt,useCallback:Fe,useContext:Fe,useEffect:Fe,useImperativeHandle:Fe,useInsertionEffect:Fe,useLayoutEffect:Fe,useMemo:Fe,useReducer:Fe,useRef:Fe,useState:Fe,useDebugValue:Fe,useDeferredValue:Fe,useTransition:Fe,useMutableSource:Fe,useSyncExternalStore:Fe,useId:Fe,unstable_isNewReconciler:!1},ox={readContext:gt,useCallback:function(e,t){return At().memoizedState=[e,t===void 0?null:t],e},useContext:gt,useEffect:$d,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Hs(4194308,4,Ap.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Hs(4194308,4,e,t)},useInsertionEffect:function(e,t){return Hs(4,2,e,t)},useMemo:function(e,t){var r=At();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=At();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=sx.bind(null,fe,e),[n.memoizedState,e]},useRef:function(e){var t=At();return e={current:e},t.memoizedState=e},useState:Id,useDebugValue:jc,useDeferredValue:function(e){return At().memoizedState=e},useTransition:function(){var e=Id(!1),t=e[0];return e=ax.bind(null,e[1]),At().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=fe,s=At();if(de){if(r===void 0)throw Error(T(407));r=r()}else{if(r=t(),Pe===null)throw Error(T(349));Mr&30||kp(n,t,r)}s.memoizedState=r;var i={value:r,getSnapshot:t};return s.queue=i,$d(Np.bind(null,n,i,e),[e]),n.flags|=2048,Ba(9,jp.bind(null,n,i,r,t),void 0,null),r},useId:function(){var e=At(),t=Pe.identifierPrefix;if(de){var r=Gt,n=qt;r=(n&~(1<<32-St(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=Ua++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=nx++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},lx={readContext:gt,useCallback:zp,useContext:gt,useEffect:kc,useImperativeHandle:Pp,useInsertionEffect:Tp,useLayoutEffect:Ep,useMemo:Rp,useReducer:fo,useRef:Cp,useState:function(){return fo(Da)},useDebugValue:jc,useDeferredValue:function(e){var t=xt();return Op(t,Se.memoizedState,e)},useTransition:function(){var e=fo(Da)[0],t=xt().memoizedState;return[e,t]},useMutableSource:bp,useSyncExternalStore:wp,useId:Lp,unstable_isNewReconciler:!1},cx={readContext:gt,useCallback:zp,useContext:gt,useEffect:kc,useImperativeHandle:Pp,useInsertionEffect:Tp,useLayoutEffect:Ep,useMemo:Rp,useReducer:mo,useRef:Cp,useState:function(){return mo(Da)},useDebugValue:jc,useDeferredValue:function(e){var t=xt();return Se===null?t.memoizedState=e:Op(t,Se.memoizedState,e)},useTransition:function(){var e=mo(Da)[0],t=xt().memoizedState;return[e,t]},useMutableSource:bp,useSyncExternalStore:wp,useId:Lp,unstable_isNewReconciler:!1};function wt(e,t){if(e&&e.defaultProps){t=me({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function ll(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:me({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Oi={isMounted:function(e){return(e=e._reactInternals)?qr(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=Ke(),s=xr(e),i=Vt(n,s);i.payload=t,r!=null&&(i.callback=r),t=mr(e,i,s),t!==null&&(_t(t,e,s,n),Ms(t,e,s))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=Ke(),s=xr(e),i=Vt(n,s);i.tag=1,i.payload=t,r!=null&&(i.callback=r),t=mr(e,i,s),t!==null&&(_t(t,e,s,n),Ms(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Ke(),n=xr(e),s=Vt(r,n);s.tag=2,t!=null&&(s.callback=t),t=mr(e,s,n),t!==null&&(_t(t,e,n,r),Ms(t,e,n))}};function Ud(e,t,r,n,s,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,i,o):t.prototype&&t.prototype.isPureReactComponent?!za(r,n)||!za(s,i):!0}function Dp(e,t,r){var n=!1,s=wr,i=t.contextType;return typeof i=="object"&&i!==null?i=gt(i):(s=tt(t)?Dr:qe.current,n=t.contextTypes,i=(n=n!=null)?En(e,s):wr),t=new t(r,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Oi,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function Dd(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&Oi.enqueueReplaceState(t,t.state,null)}function cl(e,t,r,n){var s=e.stateNode;s.props=r,s.state=e.memoizedState,s.refs={},mc(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=gt(i):(i=tt(t)?Dr:qe.current,s.context=En(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(ll(e,t,i,r),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Oi.enqueueReplaceState(s,s.state,null),ui(e,r,s,n),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Rn(e,t){try{var r="",n=t;do r+=$m(n),n=n.return;while(n);var s=r}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function go(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function dl(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var dx=typeof WeakMap=="function"?WeakMap:Map;function Bp(e,t,r){r=Vt(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){gi||(gi=!0,bl=n),dl(e,t)},r}function Mp(e,t,r){r=Vt(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var s=t.value;r.payload=function(){return n(s)},r.callback=function(){dl(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){dl(e,t),typeof n!="function"&&(gr===null?gr=new Set([this]):gr.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),r}function Bd(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new dx;var s=new Set;n.set(t,s)}else s=n.get(t),s===void 0&&(s=new Set,n.set(t,s));s.has(r)||(s.add(r),e=Nx.bind(null,e,t,r),t.then(e,e))}function Md(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Fd(e,t,r,n,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Vt(-1,1),t.tag=2,mr(r,t,1))),r.lanes|=1),e)}var ux=Xt.ReactCurrentOwner,Ze=!1;function Ve(e,t,r,n){t.child=e===null?gp(t,null,r,n):Pn(t,e.child,r,n)}function Hd(e,t,r,n,s){r=r.render;var i=t.ref;return Sn(t,s),n=bc(e,t,r,n,i,s),r=wc(),e!==null&&!Ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Qt(e,t,s)):(de&&r&&lc(t),t.flags|=1,Ve(e,t,n,s),t.child)}function Wd(e,t,r,n,s){if(e===null){var i=r.type;return typeof i=="function"&&!Pc(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=i,Fp(e,t,i,n,s)):(e=Vs(r.type,null,n,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&s)){var o=i.memoizedProps;if(r=r.compare,r=r!==null?r:za,r(o,n)&&e.ref===t.ref)return Qt(e,t,s)}return t.flags|=1,e=vr(i,n),e.ref=t.ref,e.return=t,t.child=e}function Fp(e,t,r,n,s){if(e!==null){var i=e.memoizedProps;if(za(i,n)&&e.ref===t.ref)if(Ze=!1,t.pendingProps=n=i,(e.lanes&s)!==0)e.flags&131072&&(Ze=!0);else return t.lanes=e.lanes,Qt(e,t,s)}return ul(e,t,r,n,s)}function Hp(e,t,r){var n=t.pendingProps,s=n.children,i=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},se(vn,at),at|=r;else{if(!(r&1073741824))return e=i!==null?i.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,se(vn,at),at|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=i!==null?i.baseLanes:r,se(vn,at),at|=n}else i!==null?(n=i.baseLanes|r,t.memoizedState=null):n=r,se(vn,at),at|=n;return Ve(e,t,s,r),t.child}function Wp(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function ul(e,t,r,n,s){var i=tt(r)?Dr:qe.current;return i=En(t,i),Sn(t,s),r=bc(e,t,r,n,i,s),n=wc(),e!==null&&!Ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Qt(e,t,s)):(de&&n&&lc(t),t.flags|=1,Ve(e,t,r,s),t.child)}function qd(e,t,r,n,s){if(tt(r)){var i=!0;ii(t)}else i=!1;if(Sn(t,s),t.stateNode===null)Ws(e,t),Dp(t,r,n),cl(t,r,n,s),n=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var c=o.context,d=r.contextType;typeof d=="object"&&d!==null?d=gt(d):(d=tt(r)?Dr:qe.current,d=En(t,d));var h=r.getDerivedStateFromProps,u=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";u||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==n||c!==d)&&Dd(t,o,n,d),nr=!1;var p=t.memoizedState;o.state=p,ui(t,n,o,s),c=t.memoizedState,l!==n||p!==c||et.current||nr?(typeof h=="function"&&(ll(t,r,h,n),c=t.memoizedState),(l=nr||Ud(t,r,l,n,p,c,d))?(u||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),o.props=n,o.state=c,o.context=d,n=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{o=t.stateNode,vp(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:wt(t.type,l),o.props=d,u=t.pendingProps,p=o.context,c=r.contextType,typeof c=="object"&&c!==null?c=gt(c):(c=tt(r)?Dr:qe.current,c=En(t,c));var x=r.getDerivedStateFromProps;(h=typeof x=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==u||p!==c)&&Dd(t,o,n,c),nr=!1,p=t.memoizedState,o.state=p,ui(t,n,o,s);var y=t.memoizedState;l!==u||p!==y||et.current||nr?(typeof x=="function"&&(ll(t,r,x,n),y=t.memoizedState),(d=nr||Ud(t,r,d,n,p,y,c)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,y,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,y,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=y),o.props=n,o.state=y,o.context=c,n=d):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),n=!1)}return hl(e,t,r,n,i,s)}function hl(e,t,r,n,s,i){Wp(e,t);var o=(t.flags&128)!==0;if(!n&&!o)return s&&Ad(t,r,!1),Qt(e,t,i);n=t.stateNode,ux.current=t;var l=o&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&o?(t.child=Pn(t,e.child,null,i),t.child=Pn(t,null,l,i)):Ve(e,t,l,i),t.memoizedState=n.state,s&&Ad(t,r,!0),t.child}function qp(e){var t=e.stateNode;t.pendingContext?Ed(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ed(e,t.context,!1),gc(e,t.containerInfo)}function Gd(e,t,r,n,s){return An(),dc(s),t.flags|=256,Ve(e,t,r,n),t.child}var pl={dehydrated:null,treeContext:null,retryLane:0};function fl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Gp(e,t,r){var n=t.pendingProps,s=pe.current,i=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),se(pe,s&1),e===null)return il(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=n.children,e=n.fallback,i?(n=t.mode,i=t.child,o={mode:"hidden",children:o},!(n&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=$i(o,n,0,null),e=Ur(e,n,r,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=fl(r),t.memoizedState=pl,e):Nc(t,o));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return hx(e,t,o,n,l,s,r);if(i){i=n.fallback,o=t.mode,s=e.child,l=s.sibling;var c={mode:"hidden",children:n.children};return!(o&1)&&t.child!==s?(n=t.child,n.childLanes=0,n.pendingProps=c,t.deletions=null):(n=vr(s,c),n.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=vr(l,i):(i=Ur(i,o,r,null),i.flags|=2),i.return=t,n.return=t,n.sibling=i,t.child=n,n=i,i=t.child,o=e.child.memoizedState,o=o===null?fl(r):{baseLanes:o.baseLanes|r,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~r,t.memoizedState=pl,n}return i=e.child,e=i.sibling,n=vr(i,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function Nc(e,t){return t=$i({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function bs(e,t,r,n){return n!==null&&dc(n),Pn(t,e.child,null,r),e=Nc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function hx(e,t,r,n,s,i,o){if(r)return t.flags&256?(t.flags&=-257,n=go(Error(T(422))),bs(e,t,o,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=n.fallback,s=t.mode,n=$i({mode:"visible",children:n.children},s,0,null),i=Ur(i,s,o,null),i.flags|=2,n.return=t,i.return=t,n.sibling=i,t.child=n,t.mode&1&&Pn(t,e.child,null,o),t.child.memoizedState=fl(o),t.memoizedState=pl,i);if(!(t.mode&1))return bs(e,t,o,null);if(s.data==="$!"){if(n=s.nextSibling&&s.nextSibling.dataset,n)var l=n.dgst;return n=l,i=Error(T(419)),n=go(i,n,void 0),bs(e,t,o,n)}if(l=(o&e.childLanes)!==0,Ze||l){if(n=Pe,n!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(n.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Jt(e,s),_t(n,e,s,-1))}return Ac(),n=go(Error(T(421))),bs(e,t,o,n)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Sx.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,it=fr(s.nextSibling),ot=t,de=!0,Nt=null,e!==null&&(ht[pt++]=qt,ht[pt++]=Gt,ht[pt++]=Br,qt=e.id,Gt=e.overflow,Br=t),t=Nc(t,n.children),t.flags|=4096,t)}function Vd(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),ol(e.return,t,r)}function xo(e,t,r,n,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=n,i.tail=r,i.tailMode=s)}function Vp(e,t,r){var n=t.pendingProps,s=n.revealOrder,i=n.tail;if(Ve(e,t,n.children,r),n=pe.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Vd(e,r,t);else if(e.tag===19)Vd(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(se(pe,n),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(r=t.child,s=null;r!==null;)e=r.alternate,e!==null&&hi(e)===null&&(s=r),r=r.sibling;r=s,r===null?(s=t.child,t.child=null):(s=r.sibling,r.sibling=null),xo(t,!1,s,r,i);break;case"backwards":for(r=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&hi(e)===null){t.child=s;break}e=s.sibling,s.sibling=r,r=s,s=e}xo(t,!0,r,null,i);break;case"together":xo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ws(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Qt(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Fr|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(T(153));if(t.child!==null){for(e=t.child,r=vr(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=vr(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function px(e,t,r){switch(t.tag){case 3:qp(t),An();break;case 5:yp(t);break;case 1:tt(t.type)&&ii(t);break;case 4:gc(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,s=t.memoizedProps.value;se(ci,n._currentValue),n._currentValue=s;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(se(pe,pe.current&1),t.flags|=128,null):r&t.child.childLanes?Gp(e,t,r):(se(pe,pe.current&1),e=Qt(e,t,r),e!==null?e.sibling:null);se(pe,pe.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return Vp(e,t,r);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),se(pe,pe.current),n)break;return null;case 22:case 23:return t.lanes=0,Hp(e,t,r)}return Qt(e,t,r)}var Kp,ml,Yp,Jp;Kp=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};ml=function(){};Yp=function(e,t,r,n){var s=e.memoizedProps;if(s!==n){e=t.stateNode,Lr(Lt.current);var i=null;switch(r){case"input":s=$o(e,s),n=$o(e,n),i=[];break;case"select":s=me({},s,{value:void 0}),n=me({},n,{value:void 0}),i=[];break;case"textarea":s=Bo(e,s),n=Bo(e,n),i=[];break;default:typeof s.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=ai)}Fo(r,n);var o;r=null;for(d in s)if(!n.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var l=s[d];for(o in l)l.hasOwnProperty(o)&&(r||(r={}),r[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Sa.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in n){var c=n[d];if(l=s!=null?s[d]:void 0,n.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(r||(r={}),r[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(r||(r={}),r[o]=c[o])}else r||(i||(i=[]),i.push(d,r)),r=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(i=i||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Sa.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&ie("scroll",e),i||l===c||(i=[])):(i=i||[]).push(d,c))}r&&(i=i||[]).push("style",r);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};Jp=function(e,t,r,n){r!==n&&(t.flags|=4)};function Xn(e,t){if(!de)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function He(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var s=e.child;s!==null;)r|=s.lanes|s.childLanes,n|=s.subtreeFlags&14680064,n|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)r|=s.lanes|s.childLanes,n|=s.subtreeFlags,n|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function fx(e,t,r){var n=t.pendingProps;switch(cc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return He(t),null;case 1:return tt(t.type)&&si(),He(t),null;case 3:return n=t.stateNode,zn(),oe(et),oe(qe),vc(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(vs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Nt!==null&&(jl(Nt),Nt=null))),ml(e,t),He(t),null;case 5:xc(t);var s=Lr($a.current);if(r=t.type,e!==null&&t.stateNode!=null)Yp(e,t,r,n,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(T(166));return He(t),null}if(e=Lr(Lt.current),vs(t)){n=t.stateNode,r=t.type;var i=t.memoizedProps;switch(n[Rt]=t,n[La]=i,e=(t.mode&1)!==0,r){case"dialog":ie("cancel",n),ie("close",n);break;case"iframe":case"object":case"embed":ie("load",n);break;case"video":case"audio":for(s=0;s<ia.length;s++)ie(ia[s],n);break;case"source":ie("error",n);break;case"img":case"image":case"link":ie("error",n),ie("load",n);break;case"details":ie("toggle",n);break;case"input":rd(n,i),ie("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!i.multiple},ie("invalid",n);break;case"textarea":ad(n,i),ie("invalid",n)}Fo(r,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?n.textContent!==l&&(i.suppressHydrationWarning!==!0&&xs(n.textContent,l,e),s=["children",l]):typeof l=="number"&&n.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&xs(n.textContent,l,e),s=["children",""+l]):Sa.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&ie("scroll",n)}switch(r){case"input":cs(n),nd(n,i,!0);break;case"textarea":cs(n),sd(n);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(n.onclick=ai)}n=s,t.updateQueue=n,n!==null&&(t.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Nh(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=o.createElement(r,{is:n.is}):(e=o.createElement(r),r==="select"&&(o=e,n.multiple?o.multiple=!0:n.size&&(o.size=n.size))):e=o.createElementNS(e,r),e[Rt]=t,e[La]=n,Kp(e,t,!1,!1),t.stateNode=e;e:{switch(o=Ho(r,n),r){case"dialog":ie("cancel",e),ie("close",e),s=n;break;case"iframe":case"object":case"embed":ie("load",e),s=n;break;case"video":case"audio":for(s=0;s<ia.length;s++)ie(ia[s],e);s=n;break;case"source":ie("error",e),s=n;break;case"img":case"image":case"link":ie("error",e),ie("load",e),s=n;break;case"details":ie("toggle",e),s=n;break;case"input":rd(e,n),s=$o(e,n),ie("invalid",e);break;case"option":s=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},s=me({},n,{value:void 0}),ie("invalid",e);break;case"textarea":ad(e,n),s=Bo(e,n),ie("invalid",e);break;default:s=n}Fo(r,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var c=l[i];i==="style"?Ch(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Sh(e,c)):i==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&_a(e,c):typeof c=="number"&&_a(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Sa.hasOwnProperty(i)?c!=null&&i==="onScroll"&&ie("scroll",e):c!=null&&Kl(e,i,c,o))}switch(r){case"input":cs(e),nd(e,n,!1);break;case"textarea":cs(e),sd(e);break;case"option":n.value!=null&&e.setAttribute("value",""+br(n.value));break;case"select":e.multiple=!!n.multiple,i=n.value,i!=null?wn(e,!!n.multiple,i,!1):n.defaultValue!=null&&wn(e,!!n.multiple,n.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=ai)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return He(t),null;case 6:if(e&&t.stateNode!=null)Jp(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(T(166));if(r=Lr($a.current),Lr(Lt.current),vs(t)){if(n=t.stateNode,r=t.memoizedProps,n[Rt]=t,(i=n.nodeValue!==r)&&(e=ot,e!==null))switch(e.tag){case 3:xs(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xs(n.nodeValue,r,(e.mode&1)!==0)}i&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[Rt]=t,t.stateNode=n}return He(t),null;case 13:if(oe(pe),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(de&&it!==null&&t.mode&1&&!(t.flags&128))fp(),An(),t.flags|=98560,i=!1;else if(i=vs(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(T(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(T(317));i[Rt]=t}else An(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;He(t),i=!1}else Nt!==null&&(jl(Nt),Nt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||pe.current&1?_e===0&&(_e=3):Ac())),t.updateQueue!==null&&(t.flags|=4),He(t),null);case 4:return zn(),ml(e,t),e===null&&Ra(t.stateNode.containerInfo),He(t),null;case 10:return pc(t.type._context),He(t),null;case 17:return tt(t.type)&&si(),He(t),null;case 19:if(oe(pe),i=t.memoizedState,i===null)return He(t),null;if(n=(t.flags&128)!==0,o=i.rendering,o===null)if(n)Xn(i,!1);else{if(_e!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=hi(e),o!==null){for(t.flags|=128,Xn(i,!1),n=o.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)i=r,e=n,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return se(pe,pe.current&1|2),t.child}e=e.sibling}i.tail!==null&&ye()>On&&(t.flags|=128,n=!0,Xn(i,!1),t.lanes=4194304)}else{if(!n)if(e=hi(o),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Xn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!de)return He(t),null}else 2*ye()-i.renderingStartTime>On&&r!==1073741824&&(t.flags|=128,n=!0,Xn(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(r=i.last,r!==null?r.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ye(),t.sibling=null,r=pe.current,se(pe,n?r&1|2:r&1),t):(He(t),null);case 22:case 23:return Ec(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?at&1073741824&&(He(t),t.subtreeFlags&6&&(t.flags|=8192)):He(t),null;case 24:return null;case 25:return null}throw Error(T(156,t.tag))}function mx(e,t){switch(cc(t),t.tag){case 1:return tt(t.type)&&si(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return zn(),oe(et),oe(qe),vc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return xc(t),null;case 13:if(oe(pe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(T(340));An()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return oe(pe),null;case 4:return zn(),null;case 10:return pc(t.type._context),null;case 22:case 23:return Ec(),null;case 24:return null;default:return null}}var ws=!1,We=!1,gx=typeof WeakSet=="function"?WeakSet:Set,U=null;function xn(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){xe(e,t,n)}else r.current=null}function gl(e,t,r){try{r()}catch(n){xe(e,t,n)}}var Kd=!1;function xx(e,t){if(Zo=ti,e=tp(),oc(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var s=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var o=0,l=-1,c=-1,d=0,h=0,u=e,p=null;t:for(;;){for(var x;u!==r||s!==0&&u.nodeType!==3||(l=o+s),u!==i||n!==0&&u.nodeType!==3||(c=o+n),u.nodeType===3&&(o+=u.nodeValue.length),(x=u.firstChild)!==null;)p=u,u=x;for(;;){if(u===e)break t;if(p===r&&++d===s&&(l=o),p===i&&++h===n&&(c=o),(x=u.nextSibling)!==null)break;u=p,p=u.parentNode}u=x}r=l===-1||c===-1?null:{start:l,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(el={focusedElem:e,selectionRange:r},ti=!1,U=t;U!==null;)if(t=U,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,U=e;else for(;U!==null;){t=U;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var b=y.memoizedProps,w=y.memoizedState,g=t.stateNode,f=g.getSnapshotBeforeUpdate(t.elementType===t.type?b:wt(t.type,b),w);g.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(T(163))}}catch(k){xe(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,U=e;break}U=t.return}return y=Kd,Kd=!1,y}function ga(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var s=n=n.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&gl(t,r,i)}s=s.next}while(s!==n)}}function Li(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function xl(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Qp(e){var t=e.alternate;t!==null&&(e.alternate=null,Qp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Rt],delete t[La],delete t[nl],delete t[Zg],delete t[ex])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Xp(e){return e.tag===5||e.tag===3||e.tag===4}function Yd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Xp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function vl(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=ai));else if(n!==4&&(e=e.child,e!==null))for(vl(e,t,r),e=e.sibling;e!==null;)vl(e,t,r),e=e.sibling}function yl(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(yl(e,t,r),e=e.sibling;e!==null;)yl(e,t,r),e=e.sibling}var Ie=null,jt=!1;function tr(e,t,r){for(r=r.child;r!==null;)Zp(e,t,r),r=r.sibling}function Zp(e,t,r){if(Ot&&typeof Ot.onCommitFiberUnmount=="function")try{Ot.onCommitFiberUnmount(Ci,r)}catch{}switch(r.tag){case 5:We||xn(r,t);case 6:var n=Ie,s=jt;Ie=null,tr(e,t,r),Ie=n,jt=s,Ie!==null&&(jt?(e=Ie,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):Ie.removeChild(r.stateNode));break;case 18:Ie!==null&&(jt?(e=Ie,r=r.stateNode,e.nodeType===8?co(e.parentNode,r):e.nodeType===1&&co(e,r),Aa(e)):co(Ie,r.stateNode));break;case 4:n=Ie,s=jt,Ie=r.stateNode.containerInfo,jt=!0,tr(e,t,r),Ie=n,jt=s;break;case 0:case 11:case 14:case 15:if(!We&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){s=n=n.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&gl(r,t,o),s=s.next}while(s!==n)}tr(e,t,r);break;case 1:if(!We&&(xn(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(l){xe(r,t,l)}tr(e,t,r);break;case 21:tr(e,t,r);break;case 22:r.mode&1?(We=(n=We)||r.memoizedState!==null,tr(e,t,r),We=n):tr(e,t,r);break;default:tr(e,t,r)}}function Jd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new gx),t.forEach(function(n){var s=_x.bind(null,e,n);r.has(n)||(r.add(n),n.then(s,s))})}}function yt(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var s=r[n];try{var i=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:Ie=l.stateNode,jt=!1;break e;case 3:Ie=l.stateNode.containerInfo,jt=!0;break e;case 4:Ie=l.stateNode.containerInfo,jt=!0;break e}l=l.return}if(Ie===null)throw Error(T(160));Zp(i,o,s),Ie=null,jt=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(d){xe(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)ef(t,e),t=t.sibling}function ef(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(yt(t,e),Tt(e),n&4){try{ga(3,e,e.return),Li(3,e)}catch(b){xe(e,e.return,b)}try{ga(5,e,e.return)}catch(b){xe(e,e.return,b)}}break;case 1:yt(t,e),Tt(e),n&512&&r!==null&&xn(r,r.return);break;case 5:if(yt(t,e),Tt(e),n&512&&r!==null&&xn(r,r.return),e.flags&32){var s=e.stateNode;try{_a(s,"")}catch(b){xe(e,e.return,b)}}if(n&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,o=r!==null?r.memoizedProps:i,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&kh(s,i),Ho(l,o);var d=Ho(l,i);for(o=0;o<c.length;o+=2){var h=c[o],u=c[o+1];h==="style"?Ch(s,u):h==="dangerouslySetInnerHTML"?Sh(s,u):h==="children"?_a(s,u):Kl(s,h,u,d)}switch(l){case"input":Uo(s,i);break;case"textarea":jh(s,i);break;case"select":var p=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var x=i.value;x!=null?wn(s,!!i.multiple,x,!1):p!==!!i.multiple&&(i.defaultValue!=null?wn(s,!!i.multiple,i.defaultValue,!0):wn(s,!!i.multiple,i.multiple?[]:"",!1))}s[La]=i}catch(b){xe(e,e.return,b)}}break;case 6:if(yt(t,e),Tt(e),n&4){if(e.stateNode===null)throw Error(T(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(b){xe(e,e.return,b)}}break;case 3:if(yt(t,e),Tt(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{Aa(t.containerInfo)}catch(b){xe(e,e.return,b)}break;case 4:yt(t,e),Tt(e);break;case 13:yt(t,e),Tt(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Cc=ye())),n&4&&Jd(e);break;case 22:if(h=r!==null&&r.memoizedState!==null,e.mode&1?(We=(d=We)||h,yt(t,e),We=d):yt(t,e),Tt(e),n&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(U=e,h=e.child;h!==null;){for(u=U=h;U!==null;){switch(p=U,x=p.child,p.tag){case 0:case 11:case 14:case 15:ga(4,p,p.return);break;case 1:xn(p,p.return);var y=p.stateNode;if(typeof y.componentWillUnmount=="function"){n=p,r=p.return;try{t=n,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(b){xe(n,r,b)}}break;case 5:xn(p,p.return);break;case 22:if(p.memoizedState!==null){Xd(u);continue}}x!==null?(x.return=p,U=x):Xd(u)}h=h.sibling}e:for(h=null,u=e;;){if(u.tag===5){if(h===null){h=u;try{s=u.stateNode,d?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=u.stateNode,c=u.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=_h("display",o))}catch(b){xe(e,e.return,b)}}}else if(u.tag===6){if(h===null)try{u.stateNode.nodeValue=d?"":u.memoizedProps}catch(b){xe(e,e.return,b)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===e)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break e;for(;u.sibling===null;){if(u.return===null||u.return===e)break e;h===u&&(h=null),u=u.return}h===u&&(h=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:yt(t,e),Tt(e),n&4&&Jd(e);break;case 21:break;default:yt(t,e),Tt(e)}}function Tt(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Xp(r)){var n=r;break e}r=r.return}throw Error(T(160))}switch(n.tag){case 5:var s=n.stateNode;n.flags&32&&(_a(s,""),n.flags&=-33);var i=Yd(e);yl(e,i,s);break;case 3:case 4:var o=n.stateNode.containerInfo,l=Yd(e);vl(e,l,o);break;default:throw Error(T(161))}}catch(c){xe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function vx(e,t,r){U=e,tf(e)}function tf(e,t,r){for(var n=(e.mode&1)!==0;U!==null;){var s=U,i=s.child;if(s.tag===22&&n){var o=s.memoizedState!==null||ws;if(!o){var l=s.alternate,c=l!==null&&l.memoizedState!==null||We;l=ws;var d=We;if(ws=o,(We=c)&&!d)for(U=s;U!==null;)o=U,c=o.child,o.tag===22&&o.memoizedState!==null?Zd(s):c!==null?(c.return=o,U=c):Zd(s);for(;i!==null;)U=i,tf(i),i=i.sibling;U=s,ws=l,We=d}Qd(e)}else s.subtreeFlags&8772&&i!==null?(i.return=s,U=i):Qd(e)}}function Qd(e){for(;U!==null;){var t=U;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:We||Li(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!We)if(r===null)n.componentDidMount();else{var s=t.elementType===t.type?r.memoizedProps:wt(t.type,r.memoizedProps);n.componentDidUpdate(s,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ld(t,i,n);break;case 3:var o=t.updateQueue;if(o!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}Ld(t,o,r)}break;case 5:var l=t.stateNode;if(r===null&&t.flags&4){r=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var u=h.dehydrated;u!==null&&Aa(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(T(163))}We||t.flags&512&&xl(t)}catch(p){xe(t,t.return,p)}}if(t===e){U=null;break}if(r=t.sibling,r!==null){r.return=t.return,U=r;break}U=t.return}}function Xd(e){for(;U!==null;){var t=U;if(t===e){U=null;break}var r=t.sibling;if(r!==null){r.return=t.return,U=r;break}U=t.return}}function Zd(e){for(;U!==null;){var t=U;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Li(4,t)}catch(c){xe(t,r,c)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var s=t.return;try{n.componentDidMount()}catch(c){xe(t,s,c)}}var i=t.return;try{xl(t)}catch(c){xe(t,i,c)}break;case 5:var o=t.return;try{xl(t)}catch(c){xe(t,o,c)}}}catch(c){xe(t,t.return,c)}if(t===e){U=null;break}var l=t.sibling;if(l!==null){l.return=t.return,U=l;break}U=t.return}}var yx=Math.ceil,mi=Xt.ReactCurrentDispatcher,Sc=Xt.ReactCurrentOwner,mt=Xt.ReactCurrentBatchConfig,X=0,Pe=null,Ne=null,$e=0,at=0,vn=jr(0),_e=0,Ma=null,Fr=0,Ii=0,_c=0,xa=null,Xe=null,Cc=0,On=1/0,Mt=null,gi=!1,bl=null,gr=null,ks=!1,cr=null,xi=0,va=0,wl=null,qs=-1,Gs=0;function Ke(){return X&6?ye():qs!==-1?qs:qs=ye()}function xr(e){return e.mode&1?X&2&&$e!==0?$e&-$e:rx.transition!==null?(Gs===0&&(Gs=Dh()),Gs):(e=te,e!==0||(e=window.event,e=e===void 0?16:Gh(e.type)),e):1}function _t(e,t,r,n){if(50<va)throw va=0,wl=null,Error(T(185));es(e,r,n),(!(X&2)||e!==Pe)&&(e===Pe&&(!(X&2)&&(Ii|=r),_e===4&&sr(e,$e)),rt(e,n),r===1&&X===0&&!(t.mode&1)&&(On=ye()+500,zi&&Nr()))}function rt(e,t){var r=e.callbackNode;rg(e,t);var n=ei(e,e===Pe?$e:0);if(n===0)r!==null&&ld(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&ld(r),t===1)e.tag===0?tx(eu.bind(null,e)):up(eu.bind(null,e)),Qg(function(){!(X&6)&&Nr()}),r=null;else{switch(Bh(n)){case 1:r=Zl;break;case 4:r=$h;break;case 16:r=Zs;break;case 536870912:r=Uh;break;default:r=Zs}r=df(r,rf.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function rf(e,t){if(qs=-1,Gs=0,X&6)throw Error(T(327));var r=e.callbackNode;if(_n()&&e.callbackNode!==r)return null;var n=ei(e,e===Pe?$e:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=vi(e,n);else{t=n;var s=X;X|=2;var i=af();(Pe!==e||$e!==t)&&(Mt=null,On=ye()+500,$r(e,t));do try{kx();break}catch(l){nf(e,l)}while(!0);hc(),mi.current=i,X=s,Ne!==null?t=0:(Pe=null,$e=0,t=_e)}if(t!==0){if(t===2&&(s=Ko(e),s!==0&&(n=s,t=kl(e,s))),t===1)throw r=Ma,$r(e,0),sr(e,n),rt(e,ye()),r;if(t===6)sr(e,n);else{if(s=e.current.alternate,!(n&30)&&!bx(s)&&(t=vi(e,n),t===2&&(i=Ko(e),i!==0&&(n=i,t=kl(e,i))),t===1))throw r=Ma,$r(e,0),sr(e,n),rt(e,ye()),r;switch(e.finishedWork=s,e.finishedLanes=n,t){case 0:case 1:throw Error(T(345));case 2:Ar(e,Xe,Mt);break;case 3:if(sr(e,n),(n&130023424)===n&&(t=Cc+500-ye(),10<t)){if(ei(e,0)!==0)break;if(s=e.suspendedLanes,(s&n)!==n){Ke(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=rl(Ar.bind(null,e,Xe,Mt),t);break}Ar(e,Xe,Mt);break;case 4:if(sr(e,n),(n&4194240)===n)break;for(t=e.eventTimes,s=-1;0<n;){var o=31-St(n);i=1<<o,o=t[o],o>s&&(s=o),n&=~i}if(n=s,n=ye()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*yx(n/1960))-n,10<n){e.timeoutHandle=rl(Ar.bind(null,e,Xe,Mt),n);break}Ar(e,Xe,Mt);break;case 5:Ar(e,Xe,Mt);break;default:throw Error(T(329))}}}return rt(e,ye()),e.callbackNode===r?rf.bind(null,e):null}function kl(e,t){var r=xa;return e.current.memoizedState.isDehydrated&&($r(e,t).flags|=256),e=vi(e,t),e!==2&&(t=Xe,Xe=r,t!==null&&jl(t)),e}function jl(e){Xe===null?Xe=e:Xe.push.apply(Xe,e)}function bx(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var s=r[n],i=s.getSnapshot;s=s.value;try{if(!Ct(i(),s))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function sr(e,t){for(t&=~_c,t&=~Ii,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-St(t),n=1<<r;e[r]=-1,t&=~n}}function eu(e){if(X&6)throw Error(T(327));_n();var t=ei(e,0);if(!(t&1))return rt(e,ye()),null;var r=vi(e,t);if(e.tag!==0&&r===2){var n=Ko(e);n!==0&&(t=n,r=kl(e,n))}if(r===1)throw r=Ma,$r(e,0),sr(e,t),rt(e,ye()),r;if(r===6)throw Error(T(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ar(e,Xe,Mt),rt(e,ye()),null}function Tc(e,t){var r=X;X|=1;try{return e(t)}finally{X=r,X===0&&(On=ye()+500,zi&&Nr())}}function Hr(e){cr!==null&&cr.tag===0&&!(X&6)&&_n();var t=X;X|=1;var r=mt.transition,n=te;try{if(mt.transition=null,te=1,e)return e()}finally{te=n,mt.transition=r,X=t,!(X&6)&&Nr()}}function Ec(){at=vn.current,oe(vn)}function $r(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,Jg(r)),Ne!==null)for(r=Ne.return;r!==null;){var n=r;switch(cc(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&si();break;case 3:zn(),oe(et),oe(qe),vc();break;case 5:xc(n);break;case 4:zn();break;case 13:oe(pe);break;case 19:oe(pe);break;case 10:pc(n.type._context);break;case 22:case 23:Ec()}r=r.return}if(Pe=e,Ne=e=vr(e.current,null),$e=at=t,_e=0,Ma=null,_c=Ii=Fr=0,Xe=xa=null,Or!==null){for(t=0;t<Or.length;t++)if(r=Or[t],n=r.interleaved,n!==null){r.interleaved=null;var s=n.next,i=r.pending;if(i!==null){var o=i.next;i.next=s,n.next=o}r.pending=n}Or=null}return e}function nf(e,t){do{var r=Ne;try{if(hc(),Fs.current=fi,pi){for(var n=fe.memoizedState;n!==null;){var s=n.queue;s!==null&&(s.pending=null),n=n.next}pi=!1}if(Mr=0,Ae=Se=fe=null,ma=!1,Ua=0,Sc.current=null,r===null||r.return===null){_e=1,Ma=t,Ne=null;break}e:{var i=e,o=r.return,l=r,c=t;if(t=$e,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,h=l,u=h.tag;if(!(h.mode&1)&&(u===0||u===11||u===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var x=Md(o);if(x!==null){x.flags&=-257,Fd(x,o,l,i,t),x.mode&1&&Bd(i,d,t),t=x,c=d;var y=t.updateQueue;if(y===null){var b=new Set;b.add(c),t.updateQueue=b}else y.add(c);break e}else{if(!(t&1)){Bd(i,d,t),Ac();break e}c=Error(T(426))}}else if(de&&l.mode&1){var w=Md(o);if(w!==null){!(w.flags&65536)&&(w.flags|=256),Fd(w,o,l,i,t),dc(Rn(c,l));break e}}i=c=Rn(c,l),_e!==4&&(_e=2),xa===null?xa=[i]:xa.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var g=Bp(i,c,t);Od(i,g);break e;case 1:l=c;var f=i.type,m=i.stateNode;if(!(i.flags&128)&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(gr===null||!gr.has(m)))){i.flags|=65536,t&=-t,i.lanes|=t;var k=Mp(i,l,t);Od(i,k);break e}}i=i.return}while(i!==null)}of(r)}catch(N){t=N,Ne===r&&r!==null&&(Ne=r=r.return);continue}break}while(!0)}function af(){var e=mi.current;return mi.current=fi,e===null?fi:e}function Ac(){(_e===0||_e===3||_e===2)&&(_e=4),Pe===null||!(Fr&268435455)&&!(Ii&268435455)||sr(Pe,$e)}function vi(e,t){var r=X;X|=2;var n=af();(Pe!==e||$e!==t)&&(Mt=null,$r(e,t));do try{wx();break}catch(s){nf(e,s)}while(!0);if(hc(),X=r,mi.current=n,Ne!==null)throw Error(T(261));return Pe=null,$e=0,_e}function wx(){for(;Ne!==null;)sf(Ne)}function kx(){for(;Ne!==null&&!Vm();)sf(Ne)}function sf(e){var t=cf(e.alternate,e,at);e.memoizedProps=e.pendingProps,t===null?of(e):Ne=t,Sc.current=null}function of(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=mx(r,t),r!==null){r.flags&=32767,Ne=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{_e=6,Ne=null;return}}else if(r=fx(r,t,at),r!==null){Ne=r;return}if(t=t.sibling,t!==null){Ne=t;return}Ne=t=e}while(t!==null);_e===0&&(_e=5)}function Ar(e,t,r){var n=te,s=mt.transition;try{mt.transition=null,te=1,jx(e,t,r,n)}finally{mt.transition=s,te=n}return null}function jx(e,t,r,n){do _n();while(cr!==null);if(X&6)throw Error(T(327));r=e.finishedWork;var s=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(T(177));e.callbackNode=null,e.callbackPriority=0;var i=r.lanes|r.childLanes;if(ng(e,i),e===Pe&&(Ne=Pe=null,$e=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||ks||(ks=!0,df(Zs,function(){return _n(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=mt.transition,mt.transition=null;var o=te;te=1;var l=X;X|=4,Sc.current=null,xx(e,r),ef(r,e),Hg(el),ti=!!Zo,el=Zo=null,e.current=r,vx(r),Km(),X=l,te=o,mt.transition=i}else e.current=r;if(ks&&(ks=!1,cr=e,xi=s),i=e.pendingLanes,i===0&&(gr=null),Qm(r.stateNode),rt(e,ye()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)s=t[r],n(s.value,{componentStack:s.stack,digest:s.digest});if(gi)throw gi=!1,e=bl,bl=null,e;return xi&1&&e.tag!==0&&_n(),i=e.pendingLanes,i&1?e===wl?va++:(va=0,wl=e):va=0,Nr(),null}function _n(){if(cr!==null){var e=Bh(xi),t=mt.transition,r=te;try{if(mt.transition=null,te=16>e?16:e,cr===null)var n=!1;else{if(e=cr,cr=null,xi=0,X&6)throw Error(T(331));var s=X;for(X|=4,U=e.current;U!==null;){var i=U,o=i.child;if(U.flags&16){var l=i.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(U=d;U!==null;){var h=U;switch(h.tag){case 0:case 11:case 15:ga(8,h,i)}var u=h.child;if(u!==null)u.return=h,U=u;else for(;U!==null;){h=U;var p=h.sibling,x=h.return;if(Qp(h),h===d){U=null;break}if(p!==null){p.return=x,U=p;break}U=x}}}var y=i.alternate;if(y!==null){var b=y.child;if(b!==null){y.child=null;do{var w=b.sibling;b.sibling=null,b=w}while(b!==null)}}U=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,U=o;else e:for(;U!==null;){if(i=U,i.flags&2048)switch(i.tag){case 0:case 11:case 15:ga(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,U=g;break e}U=i.return}}var f=e.current;for(U=f;U!==null;){o=U;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,U=m;else e:for(o=f;U!==null;){if(l=U,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Li(9,l)}}catch(N){xe(l,l.return,N)}if(l===o){U=null;break e}var k=l.sibling;if(k!==null){k.return=l.return,U=k;break e}U=l.return}}if(X=s,Nr(),Ot&&typeof Ot.onPostCommitFiberRoot=="function")try{Ot.onPostCommitFiberRoot(Ci,e)}catch{}n=!0}return n}finally{te=r,mt.transition=t}}return!1}function tu(e,t,r){t=Rn(r,t),t=Bp(e,t,1),e=mr(e,t,1),t=Ke(),e!==null&&(es(e,1,t),rt(e,t))}function xe(e,t,r){if(e.tag===3)tu(e,e,r);else for(;t!==null;){if(t.tag===3){tu(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(gr===null||!gr.has(n))){e=Rn(r,e),e=Mp(t,e,1),t=mr(t,e,1),e=Ke(),t!==null&&(es(t,1,e),rt(t,e));break}}t=t.return}}function Nx(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=Ke(),e.pingedLanes|=e.suspendedLanes&r,Pe===e&&($e&r)===r&&(_e===4||_e===3&&($e&130023424)===$e&&500>ye()-Cc?$r(e,0):_c|=r),rt(e,t)}function lf(e,t){t===0&&(e.mode&1?(t=hs,hs<<=1,!(hs&130023424)&&(hs=4194304)):t=1);var r=Ke();e=Jt(e,t),e!==null&&(es(e,t,r),rt(e,r))}function Sx(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),lf(e,r)}function _x(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,s=e.memoizedState;s!==null&&(r=s.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(T(314))}n!==null&&n.delete(t),lf(e,r)}var cf;cf=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||et.current)Ze=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return Ze=!1,px(e,t,r);Ze=!!(e.flags&131072)}else Ze=!1,de&&t.flags&1048576&&hp(t,li,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Ws(e,t),e=t.pendingProps;var s=En(t,qe.current);Sn(t,r),s=bc(null,t,n,e,s,r);var i=wc();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,tt(n)?(i=!0,ii(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,mc(t),s.updater=Oi,t.stateNode=s,s._reactInternals=t,cl(t,n,e,r),t=hl(null,t,n,!0,i,r)):(t.tag=0,de&&i&&lc(t),Ve(null,t,s,r),t=t.child),t;case 16:n=t.elementType;e:{switch(Ws(e,t),e=t.pendingProps,s=n._init,n=s(n._payload),t.type=n,s=t.tag=Tx(n),e=wt(n,e),s){case 0:t=ul(null,t,n,e,r);break e;case 1:t=qd(null,t,n,e,r);break e;case 11:t=Hd(null,t,n,e,r);break e;case 14:t=Wd(null,t,n,wt(n.type,e),r);break e}throw Error(T(306,n,""))}return t;case 0:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:wt(n,s),ul(e,t,n,s,r);case 1:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:wt(n,s),qd(e,t,n,s,r);case 3:e:{if(qp(t),e===null)throw Error(T(387));n=t.pendingProps,i=t.memoizedState,s=i.element,vp(e,t),ui(t,n,null,r);var o=t.memoizedState;if(n=o.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=Rn(Error(T(423)),t),t=Gd(e,t,n,r,s);break e}else if(n!==s){s=Rn(Error(T(424)),t),t=Gd(e,t,n,r,s);break e}else for(it=fr(t.stateNode.containerInfo.firstChild),ot=t,de=!0,Nt=null,r=gp(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(An(),n===s){t=Qt(e,t,r);break e}Ve(e,t,n,r)}t=t.child}return t;case 5:return yp(t),e===null&&il(t),n=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,o=s.children,tl(n,s)?o=null:i!==null&&tl(n,i)&&(t.flags|=32),Wp(e,t),Ve(e,t,o,r),t.child;case 6:return e===null&&il(t),null;case 13:return Gp(e,t,r);case 4:return gc(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Pn(t,null,n,r):Ve(e,t,n,r),t.child;case 11:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:wt(n,s),Hd(e,t,n,s,r);case 7:return Ve(e,t,t.pendingProps,r),t.child;case 8:return Ve(e,t,t.pendingProps.children,r),t.child;case 12:return Ve(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,s=t.pendingProps,i=t.memoizedProps,o=s.value,se(ci,n._currentValue),n._currentValue=o,i!==null)if(Ct(i.value,o)){if(i.children===s.children&&!et.current){t=Qt(e,t,r);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var c=l.firstContext;c!==null;){if(c.context===n){if(i.tag===1){c=Vt(-1,r&-r),c.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?c.next=c:(c.next=h.next,h.next=c),d.pending=c}}i.lanes|=r,c=i.alternate,c!==null&&(c.lanes|=r),ol(i.return,r,t),l.lanes|=r;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(T(341));o.lanes|=r,l=o.alternate,l!==null&&(l.lanes|=r),ol(o,r,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Ve(e,t,s.children,r),t=t.child}return t;case 9:return s=t.type,n=t.pendingProps.children,Sn(t,r),s=gt(s),n=n(s),t.flags|=1,Ve(e,t,n,r),t.child;case 14:return n=t.type,s=wt(n,t.pendingProps),s=wt(n.type,s),Wd(e,t,n,s,r);case 15:return Fp(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:wt(n,s),Ws(e,t),t.tag=1,tt(n)?(e=!0,ii(t)):e=!1,Sn(t,r),Dp(t,n,s),cl(t,n,s,r),hl(null,t,n,!0,e,r);case 19:return Vp(e,t,r);case 22:return Hp(e,t,r)}throw Error(T(156,t.tag))};function df(e,t){return Ih(e,t)}function Cx(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ft(e,t,r,n){return new Cx(e,t,r,n)}function Pc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Tx(e){if(typeof e=="function")return Pc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Jl)return 11;if(e===Ql)return 14}return 2}function vr(e,t){var r=e.alternate;return r===null?(r=ft(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Vs(e,t,r,n,s,i){var o=2;if(n=e,typeof e=="function")Pc(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case ln:return Ur(r.children,s,i,t);case Yl:o=8,s|=8;break;case Ro:return e=ft(12,r,t,s|2),e.elementType=Ro,e.lanes=i,e;case Oo:return e=ft(13,r,t,s),e.elementType=Oo,e.lanes=i,e;case Lo:return e=ft(19,r,t,s),e.elementType=Lo,e.lanes=i,e;case yh:return $i(r,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case xh:o=10;break e;case vh:o=9;break e;case Jl:o=11;break e;case Ql:o=14;break e;case rr:o=16,n=null;break e}throw Error(T(130,e==null?e:typeof e,""))}return t=ft(o,r,t,s),t.elementType=e,t.type=n,t.lanes=i,t}function Ur(e,t,r,n){return e=ft(7,e,n,t),e.lanes=r,e}function $i(e,t,r,n){return e=ft(22,e,n,t),e.elementType=yh,e.lanes=r,e.stateNode={isHidden:!1},e}function vo(e,t,r){return e=ft(6,e,null,t),e.lanes=r,e}function yo(e,t,r){return t=ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ex(e,t,r,n,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xi(0),this.expirationTimes=Xi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xi(0),this.identifierPrefix=n,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function zc(e,t,r,n,s,i,o,l,c){return e=new Ex(e,t,r,l,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=ft(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},mc(i),e}function Ax(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:on,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function uf(e){if(!e)return wr;e=e._reactInternals;e:{if(qr(e)!==e||e.tag!==1)throw Error(T(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(tt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(T(171))}if(e.tag===1){var r=e.type;if(tt(r))return dp(e,r,t)}return t}function hf(e,t,r,n,s,i,o,l,c){return e=zc(r,n,!0,e,s,i,o,l,c),e.context=uf(null),r=e.current,n=Ke(),s=xr(r),i=Vt(n,s),i.callback=t??null,mr(r,i,s),e.current.lanes=s,es(e,s,n),rt(e,n),e}function Ui(e,t,r,n){var s=t.current,i=Ke(),o=xr(s);return r=uf(r),t.context===null?t.context=r:t.pendingContext=r,t=Vt(i,o),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=mr(s,t,o),e!==null&&(_t(e,s,o,i),Ms(e,s,o)),o}function yi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ru(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Rc(e,t){ru(e,t),(e=e.alternate)&&ru(e,t)}function Px(){return null}var pf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Oc(e){this._internalRoot=e}Di.prototype.render=Oc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(T(409));Ui(e,t,null,null)};Di.prototype.unmount=Oc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Hr(function(){Ui(null,e,null,null)}),t[Yt]=null}};function Di(e){this._internalRoot=e}Di.prototype.unstable_scheduleHydration=function(e){if(e){var t=Hh();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ar.length&&t!==0&&t<ar[r].priority;r++);ar.splice(r,0,e),r===0&&qh(e)}};function Lc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Bi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function nu(){}function zx(e,t,r,n,s){if(s){if(typeof n=="function"){var i=n;n=function(){var d=yi(o);i.call(d)}}var o=hf(t,n,e,0,null,!1,!1,"",nu);return e._reactRootContainer=o,e[Yt]=o.current,Ra(e.nodeType===8?e.parentNode:e),Hr(),o}for(;s=e.lastChild;)e.removeChild(s);if(typeof n=="function"){var l=n;n=function(){var d=yi(c);l.call(d)}}var c=zc(e,0,!1,null,null,!1,!1,"",nu);return e._reactRootContainer=c,e[Yt]=c.current,Ra(e.nodeType===8?e.parentNode:e),Hr(function(){Ui(t,c,r,n)}),c}function Mi(e,t,r,n,s){var i=r._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var c=yi(o);l.call(c)}}Ui(t,o,e,s)}else o=zx(r,t,e,s,n);return yi(o)}Mh=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=sa(t.pendingLanes);r!==0&&(ec(t,r|1),rt(t,ye()),!(X&6)&&(On=ye()+500,Nr()))}break;case 13:Hr(function(){var n=Jt(e,1);if(n!==null){var s=Ke();_t(n,e,1,s)}}),Rc(e,1)}};tc=function(e){if(e.tag===13){var t=Jt(e,134217728);if(t!==null){var r=Ke();_t(t,e,134217728,r)}Rc(e,134217728)}};Fh=function(e){if(e.tag===13){var t=xr(e),r=Jt(e,t);if(r!==null){var n=Ke();_t(r,e,t,n)}Rc(e,t)}};Hh=function(){return te};Wh=function(e,t){var r=te;try{return te=e,t()}finally{te=r}};qo=function(e,t,r){switch(t){case"input":if(Uo(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var s=Pi(n);if(!s)throw Error(T(90));wh(n),Uo(n,s)}}}break;case"textarea":jh(e,r);break;case"select":t=r.value,t!=null&&wn(e,!!r.multiple,t,!1)}};Ah=Tc;Ph=Hr;var Rx={usingClientEntryPoint:!1,Events:[rs,hn,Pi,Th,Eh,Tc]},Zn={findFiberByHostInstance:Rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ox={bundleType:Zn.bundleType,version:Zn.version,rendererPackageName:Zn.rendererPackageName,rendererConfig:Zn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Oh(e),e===null?null:e.stateNode},findFiberByHostInstance:Zn.findFiberByHostInstance||Px,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var js=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!js.isDisabled&&js.supportsFiber)try{Ci=js.inject(Ox),Ot=js}catch{}}ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rx;ct.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Lc(t))throw Error(T(200));return Ax(e,t,null,r)};ct.createRoot=function(e,t){if(!Lc(e))throw Error(T(299));var r=!1,n="",s=pf;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=zc(e,1,!1,null,null,r,!1,n,s),e[Yt]=t.current,Ra(e.nodeType===8?e.parentNode:e),new Oc(t)};ct.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(T(188)):(e=Object.keys(e).join(","),Error(T(268,e)));return e=Oh(t),e=e===null?null:e.stateNode,e};ct.flushSync=function(e){return Hr(e)};ct.hydrate=function(e,t,r){if(!Bi(t))throw Error(T(200));return Mi(null,e,t,!0,r)};ct.hydrateRoot=function(e,t,r){if(!Lc(e))throw Error(T(405));var n=r!=null&&r.hydratedSources||null,s=!1,i="",o=pf;if(r!=null&&(r.unstable_strictMode===!0&&(s=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(o=r.onRecoverableError)),t=hf(t,null,e,1,r??null,s,!1,i,o),e[Yt]=t.current,Ra(e),n)for(e=0;e<n.length;e++)r=n[e],s=r._getVersion,s=s(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,s]:t.mutableSourceEagerHydrationData.push(r,s);return new Di(t)};ct.render=function(e,t,r){if(!Bi(t))throw Error(T(200));return Mi(null,e,t,!1,r)};ct.unmountComponentAtNode=function(e){if(!Bi(e))throw Error(T(40));return e._reactRootContainer?(Hr(function(){Mi(null,null,e,!1,function(){e._reactRootContainer=null,e[Yt]=null})}),!0):!1};ct.unstable_batchedUpdates=Tc;ct.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!Bi(r))throw Error(T(200));if(e==null||e._reactInternals===void 0)throw Error(T(38));return Mi(e,t,r,!1,n)};ct.version="18.3.1-next-f1338f8080-20240426";function ff(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ff)}catch(e){console.error(e)}}ff(),ph.exports=ct;var Lx=ph.exports,au=Lx;Po.createRoot=au.createRoot,Po.hydrateRoot=au.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Fa(){return Fa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Fa.apply(this,arguments)}var dr;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(dr||(dr={}));const su="popstate";function Ix(e){e===void 0&&(e={});function t(n,s){let{pathname:i,search:o,hash:l}=n.location;return Nl("",{pathname:i,search:o,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function r(n,s){return typeof s=="string"?s:bi(s)}return Ux(t,r,null,e)}function be(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ic(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function $x(){return Math.random().toString(36).substr(2,8)}function iu(e,t){return{usr:e.state,key:e.key,idx:t}}function Nl(e,t,r,n){return r===void 0&&(r=null),Fa({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Un(t):t,{state:r,key:t&&t.key||n||$x()})}function bi(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Un(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function Ux(e,t,r,n){n===void 0&&(n={});let{window:s=document.defaultView,v5Compat:i=!1}=n,o=s.history,l=dr.Pop,c=null,d=h();d==null&&(d=0,o.replaceState(Fa({},o.state,{idx:d}),""));function h(){return(o.state||{idx:null}).idx}function u(){l=dr.Pop;let w=h(),g=w==null?null:w-d;d=w,c&&c({action:l,location:b.location,delta:g})}function p(w,g){l=dr.Push;let f=Nl(b.location,w,g);d=h()+1;let m=iu(f,d),k=b.createHref(f);try{o.pushState(m,"",k)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;s.location.assign(k)}i&&c&&c({action:l,location:b.location,delta:1})}function x(w,g){l=dr.Replace;let f=Nl(b.location,w,g);d=h();let m=iu(f,d),k=b.createHref(f);o.replaceState(m,"",k),i&&c&&c({action:l,location:b.location,delta:0})}function y(w){let g=s.location.origin!=="null"?s.location.origin:s.location.href,f=typeof w=="string"?w:bi(w);return f=f.replace(/ $/,"%20"),be(g,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,g)}let b={get action(){return l},get location(){return e(s,o)},listen(w){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(su,u),c=w,()=>{s.removeEventListener(su,u),c=null}},createHref(w){return t(s,w)},createURL:y,encodeLocation(w){let g=y(w);return{pathname:g.pathname,search:g.search,hash:g.hash}},push:p,replace:x,go(w){return o.go(w)}};return b}var ou;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(ou||(ou={}));function Dx(e,t,r){return r===void 0&&(r="/"),Bx(e,t,r)}function Bx(e,t,r,n){let s=typeof t=="string"?Un(t):t,i=$c(s.pathname||"/",r);if(i==null)return null;let o=mf(e);Mx(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let d=Zx(i);l=Jx(o[c],d)}return l}function mf(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let s=(i,o,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&(be(c.relativePath.startsWith(n),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(n.length));let d=yr([n,c.relativePath]),h=r.concat(c);i.children&&i.children.length>0&&(be(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),mf(i.children,t,h,d)),!(i.path==null&&!i.index)&&t.push({path:d,score:Kx(d,i.index),routesMeta:h})};return e.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,o);else for(let c of gf(i.path))s(i,o,c)}),t}function gf(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,s=r.endsWith("?"),i=r.replace(/\?$/,"");if(n.length===0)return s?[i,""]:[i];let o=gf(n.join("/")),l=[];return l.push(...o.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...o),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Mx(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Yx(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const Fx=/^:[\w-]+$/,Hx=3,Wx=2,qx=1,Gx=10,Vx=-2,lu=e=>e==="*";function Kx(e,t){let r=e.split("/"),n=r.length;return r.some(lu)&&(n+=Vx),t&&(n+=Wx),r.filter(s=>!lu(s)).reduce((s,i)=>s+(Fx.test(i)?Hx:i===""?qx:Gx),n)}function Yx(e,t){return e.length===t.length&&e.slice(0,-1).every((n,s)=>n===t[s])?e[e.length-1]-t[t.length-1]:0}function Jx(e,t,r){let{routesMeta:n}=e,s={},i="/",o=[];for(let l=0;l<n.length;++l){let c=n[l],d=l===n.length-1,h=i==="/"?t:t.slice(i.length)||"/",u=Qx({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},h),p=c.route;if(!u)return null;Object.assign(s,u.params),o.push({params:s,pathname:yr([i,u.pathname]),pathnameBase:av(yr([i,u.pathnameBase])),route:p}),u.pathnameBase!=="/"&&(i=yr([i,u.pathnameBase]))}return o}function Qx(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Xx(e.path,e.caseSensitive,e.end),s=t.match(r);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:n.reduce((d,h,u)=>{let{paramName:p,isOptional:x}=h;if(p==="*"){let b=l[u]||"";o=i.slice(0,i.length-b.length).replace(/(.)\/+$/,"$1")}const y=l[u];return x&&!y?d[p]=void 0:d[p]=(y||"").replace(/%2F/g,"/"),d},{}),pathname:i,pathnameBase:o,pattern:e}}function Xx(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Ic(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c)=>(n.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),n]}function Zx(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ic(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function $c(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}const ev=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,tv=e=>ev.test(e);function rv(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:s=""}=typeof e=="string"?Un(e):e,i;if(r)if(tv(r))i=r;else{if(r.includes("//")){let o=r;r=r.replace(/\/\/+/g,"/"),Ic(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+r))}r.startsWith("/")?i=cu(r.substring(1),"/"):i=cu(r,t)}else i=t;return{pathname:i,search:sv(n),hash:iv(s)}}function cu(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?r.length>1&&r.pop():s!=="."&&r.push(s)}),r.length>1?r.join("/"):"/"}function bo(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function nv(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Uc(e,t){let r=nv(e);return t?r.map((n,s)=>s===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function Dc(e,t,r,n){n===void 0&&(n=!1);let s;typeof e=="string"?s=Un(e):(s=Fa({},e),be(!s.pathname||!s.pathname.includes("?"),bo("?","pathname","search",s)),be(!s.pathname||!s.pathname.includes("#"),bo("#","pathname","hash",s)),be(!s.search||!s.search.includes("#"),bo("#","search","hash",s)));let i=e===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=r;else{let u=t.length-1;if(!n&&o.startsWith("..")){let p=o.split("/");for(;p[0]==="..";)p.shift(),u-=1;s.pathname=p.join("/")}l=u>=0?t[u]:"/"}let c=rv(s,l),d=o&&o!=="/"&&o.endsWith("/"),h=(i||o===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||h)&&(c.pathname+="/"),c}const yr=e=>e.join("/").replace(/\/\/+/g,"/"),av=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),sv=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,iv=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function ov(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const xf=["post","put","patch","delete"];new Set(xf);const lv=["get",...xf];new Set(lv);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ha(){return Ha=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Ha.apply(this,arguments)}const Bc=v.createContext(null),cv=v.createContext(null),Sr=v.createContext(null),Fi=v.createContext(null),Zt=v.createContext({outlet:null,matches:[],isDataRoute:!1}),vf=v.createContext(null);function dv(e,t){let{relative:r}=t===void 0?{}:t;Dn()||be(!1);let{basename:n,navigator:s}=v.useContext(Sr),{hash:i,pathname:o,search:l}=bf(e,{relative:r}),c=o;return n!=="/"&&(c=o==="/"?n:yr([n,o])),s.createHref({pathname:c,search:l,hash:i})}function Dn(){return v.useContext(Fi)!=null}function _r(){return Dn()||be(!1),v.useContext(Fi).location}function yf(e){v.useContext(Sr).static||v.useLayoutEffect(e)}function we(){let{isDataRoute:e}=v.useContext(Zt);return e?jv():uv()}function uv(){Dn()||be(!1);let e=v.useContext(Bc),{basename:t,future:r,navigator:n}=v.useContext(Sr),{matches:s}=v.useContext(Zt),{pathname:i}=_r(),o=JSON.stringify(Uc(s,r.v7_relativeSplatPath)),l=v.useRef(!1);return yf(()=>{l.current=!0}),v.useCallback(function(d,h){if(h===void 0&&(h={}),!l.current)return;if(typeof d=="number"){n.go(d);return}let u=Dc(d,JSON.parse(o),i,h.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:yr([t,u.pathname])),(h.replace?n.replace:n.push)(u,h.state,h)},[t,n,o,i,e])}function Mc(){let{matches:e}=v.useContext(Zt),t=e[e.length-1];return t?t.params:{}}function bf(e,t){let{relative:r}=t===void 0?{}:t,{future:n}=v.useContext(Sr),{matches:s}=v.useContext(Zt),{pathname:i}=_r(),o=JSON.stringify(Uc(s,n.v7_relativeSplatPath));return v.useMemo(()=>Dc(e,JSON.parse(o),i,r==="path"),[e,o,i,r])}function hv(e,t){return pv(e,t)}function pv(e,t,r,n){Dn()||be(!1);let{navigator:s}=v.useContext(Sr),{matches:i}=v.useContext(Zt),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let d=_r(),h;if(t){var u;let w=typeof t=="string"?Un(t):t;c==="/"||(u=w.pathname)!=null&&u.startsWith(c)||be(!1),h=w}else h=d;let p=h.pathname||"/",x=p;if(c!=="/"){let w=c.replace(/^\//,"").split("/");x="/"+p.replace(/^\//,"").split("/").slice(w.length).join("/")}let y=Dx(e,{pathname:x}),b=vv(y&&y.map(w=>Object.assign({},w,{params:Object.assign({},l,w.params),pathname:yr([c,s.encodeLocation?s.encodeLocation(w.pathname).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?c:yr([c,s.encodeLocation?s.encodeLocation(w.pathnameBase).pathname:w.pathnameBase])})),i,r,n);return t&&b?v.createElement(Fi.Provider,{value:{location:Ha({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:dr.Pop}},b):b}function fv(){let e=kv(),t=ov(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),r?v.createElement("pre",{style:s},r):null,null)}const mv=v.createElement(fv,null);class gv extends v.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?v.createElement(Zt.Provider,{value:this.props.routeContext},v.createElement(vf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function xv(e){let{routeContext:t,match:r,children:n}=e,s=v.useContext(Bc);return s&&s.static&&s.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=r.route.id),v.createElement(Zt.Provider,{value:t},n)}function vv(e,t,r,n){var s;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var i;if(!r)return null;if(r.errors)e=r.matches;else if((i=n)!=null&&i.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,l=(s=r)==null?void 0:s.errors;if(l!=null){let h=o.findIndex(u=>u.route.id&&(l==null?void 0:l[u.route.id])!==void 0);h>=0||be(!1),o=o.slice(0,Math.min(o.length,h+1))}let c=!1,d=-1;if(r&&n&&n.v7_partialHydration)for(let h=0;h<o.length;h++){let u=o[h];if((u.route.HydrateFallback||u.route.hydrateFallbackElement)&&(d=h),u.route.id){let{loaderData:p,errors:x}=r,y=u.route.loader&&p[u.route.id]===void 0&&(!x||x[u.route.id]===void 0);if(u.route.lazy||y){c=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((h,u,p)=>{let x,y=!1,b=null,w=null;r&&(x=l&&u.route.id?l[u.route.id]:void 0,b=u.route.errorElement||mv,c&&(d<0&&p===0?(Nv("route-fallback"),y=!0,w=null):d===p&&(y=!0,w=u.route.hydrateFallbackElement||null)));let g=t.concat(o.slice(0,p+1)),f=()=>{let m;return x?m=b:y?m=w:u.route.Component?m=v.createElement(u.route.Component,null):u.route.element?m=u.route.element:m=h,v.createElement(xv,{match:u,routeContext:{outlet:h,matches:g,isDataRoute:r!=null},children:m})};return r&&(u.route.ErrorBoundary||u.route.errorElement||p===0)?v.createElement(gv,{location:r.location,revalidation:r.revalidation,component:b,error:x,children:f(),routeContext:{outlet:null,matches:g,isDataRoute:!0}}):f()},null)}var wf=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(wf||{}),kf=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(kf||{});function yv(e){let t=v.useContext(Bc);return t||be(!1),t}function bv(e){let t=v.useContext(cv);return t||be(!1),t}function wv(e){let t=v.useContext(Zt);return t||be(!1),t}function jf(e){let t=wv(),r=t.matches[t.matches.length-1];return r.route.id||be(!1),r.route.id}function kv(){var e;let t=v.useContext(vf),r=bv(),n=jf();return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function jv(){let{router:e}=yv(wf.UseNavigateStable),t=jf(kf.UseNavigateStable),r=v.useRef(!1);return yf(()=>{r.current=!0}),v.useCallback(function(s,i){i===void 0&&(i={}),r.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,Ha({fromRouteId:t},i)))},[e,t])}const du={};function Nv(e,t,r){du[e]||(du[e]=!0)}function Sv(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function ya(e){let{to:t,replace:r,state:n,relative:s}=e;Dn()||be(!1);let{future:i,static:o}=v.useContext(Sr),{matches:l}=v.useContext(Zt),{pathname:c}=_r(),d=we(),h=Dc(t,Uc(l,i.v7_relativeSplatPath),c,s==="path"),u=JSON.stringify(h);return v.useEffect(()=>d(JSON.parse(u),{replace:r,state:n,relative:s}),[d,u,s,r,n]),null}function ne(e){be(!1)}function _v(e){let{basename:t="/",children:r=null,location:n,navigationType:s=dr.Pop,navigator:i,static:o=!1,future:l}=e;Dn()&&be(!1);let c=t.replace(/^\/*/,"/"),d=v.useMemo(()=>({basename:c,navigator:i,static:o,future:Ha({v7_relativeSplatPath:!1},l)}),[c,l,i,o]);typeof n=="string"&&(n=Un(n));let{pathname:h="/",search:u="",hash:p="",state:x=null,key:y="default"}=n,b=v.useMemo(()=>{let w=$c(h,c);return w==null?null:{location:{pathname:w,search:u,hash:p,state:x,key:y},navigationType:s}},[c,h,u,p,x,y,s]);return b==null?null:v.createElement(Sr.Provider,{value:d},v.createElement(Fi.Provider,{children:r,value:b}))}function Cv(e){let{children:t,location:r}=e;return hv(Sl(t),r)}new Promise(()=>{});function Sl(e,t){t===void 0&&(t=[]);let r=[];return v.Children.forEach(e,(n,s)=>{if(!v.isValidElement(n))return;let i=[...t,s];if(n.type===v.Fragment){r.push.apply(r,Sl(n.props.children,i));return}n.type!==ne&&be(!1),!n.props.index||!n.props.children||be(!1);let o={id:n.props.id||i.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(o.children=Sl(n.props.children,i)),r.push(o)}),r}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function _l(){return _l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_l.apply(this,arguments)}function Tv(e,t){if(e==null)return{};var r={},n=Object.keys(e),s,i;for(i=0;i<n.length;i++)s=n[i],!(t.indexOf(s)>=0)&&(r[s]=e[s]);return r}function Ev(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Av(e,t){return e.button===0&&(!t||t==="_self")&&!Ev(e)}function Cl(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,r)=>{let n=e[r];return t.concat(Array.isArray(n)?n.map(s=>[r,s]):[[r,n]])},[]))}function Pv(e,t){let r=Cl(e);return t&&t.forEach((n,s)=>{r.has(s)||t.getAll(s).forEach(i=>{r.append(s,i)})}),r}const zv=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Rv="6";try{window.__reactRouterVersion=Rv}catch{}const Ov="startTransition",uu=Nm[Ov];function Lv(e){let{basename:t,children:r,future:n,window:s}=e,i=v.useRef();i.current==null&&(i.current=Ix({window:s,v5Compat:!0}));let o=i.current,[l,c]=v.useState({action:o.action,location:o.location}),{v7_startTransition:d}=n||{},h=v.useCallback(u=>{d&&uu?uu(()=>c(u)):c(u)},[c,d]);return v.useLayoutEffect(()=>o.listen(h),[o,h]),v.useEffect(()=>Sv(n),[n]),v.createElement(_v,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:o,future:n})}const Iv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",$v=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,yn=v.forwardRef(function(t,r){let{onClick:n,relative:s,reloadDocument:i,replace:o,state:l,target:c,to:d,preventScrollReset:h,viewTransition:u}=t,p=Tv(t,zv),{basename:x}=v.useContext(Sr),y,b=!1;if(typeof d=="string"&&$v.test(d)&&(y=d,Iv))try{let m=new URL(window.location.href),k=d.startsWith("//")?new URL(m.protocol+d):new URL(d),N=$c(k.pathname,x);k.origin===m.origin&&N!=null?d=N+k.search+k.hash:b=!0}catch{}let w=dv(d,{relative:s}),g=Uv(d,{replace:o,state:l,target:c,preventScrollReset:h,relative:s,viewTransition:u});function f(m){n&&n(m),m.defaultPrevented||g(m)}return v.createElement("a",_l({},p,{href:y||w,onClick:b||i?n:f,ref:r,target:c}))});var hu;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(hu||(hu={}));var pu;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(pu||(pu={}));function Uv(e,t){let{target:r,replace:n,state:s,preventScrollReset:i,relative:o,viewTransition:l}=t===void 0?{}:t,c=we(),d=_r(),h=bf(e,{relative:o});return v.useCallback(u=>{if(Av(u,r)){u.preventDefault();let p=n!==void 0?n:bi(d)===bi(h);c(e,{replace:p,state:s,preventScrollReset:i,relative:o,viewTransition:l})}},[d,c,h,n,s,r,e,i,o,l])}function Nf(e){let t=v.useRef(Cl(e)),r=v.useRef(!1),n=_r(),s=v.useMemo(()=>Pv(n.search,r.current?null:t.current),[n.search]),i=we(),o=v.useCallback((l,c)=>{const d=Cl(typeof l=="function"?l(s):l);r.current=!0,i("?"+d,c)},[i,s]);return[s,o]}function Hi(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(r[n[s]]=e[n[s]]);return r}function Dv(e,t,r,n){function s(i){return i instanceof r?i:new r(function(o){o(i)})}return new(r||(r=Promise))(function(i,o){function l(h){try{d(n.next(h))}catch(u){o(u)}}function c(h){try{d(n.throw(h))}catch(u){o(u)}}function d(h){h.done?i(h.value):s(h.value).then(l,c)}d((n=n.apply(e,t||[])).next())})}const Bv=e=>e?(...t)=>e(...t):(...t)=>fetch(...t);class Fc extends Error{constructor(t,r="FunctionsError",n){super(t),this.name=r,this.context=n}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class Mv extends Fc{constructor(t){super("Failed to send a request to the Edge Function","FunctionsFetchError",t)}}class fu extends Fc{constructor(t){super("Relay Error invoking the Edge Function","FunctionsRelayError",t)}}class mu extends Fc{constructor(t){super("Edge Function returned a non-2xx status code","FunctionsHttpError",t)}}var Tl;(function(e){e.Any="any",e.ApNortheast1="ap-northeast-1",e.ApNortheast2="ap-northeast-2",e.ApSouth1="ap-south-1",e.ApSoutheast1="ap-southeast-1",e.ApSoutheast2="ap-southeast-2",e.CaCentral1="ca-central-1",e.EuCentral1="eu-central-1",e.EuWest1="eu-west-1",e.EuWest2="eu-west-2",e.EuWest3="eu-west-3",e.SaEast1="sa-east-1",e.UsEast1="us-east-1",e.UsWest1="us-west-1",e.UsWest2="us-west-2"})(Tl||(Tl={}));class Fv{constructor(t,{headers:r={},customFetch:n,region:s=Tl.Any}={}){this.url=t,this.headers=r,this.region=s,this.fetch=Bv(n)}setAuth(t){this.headers.Authorization=`Bearer ${t}`}invoke(t){return Dv(this,arguments,void 0,function*(r,n={}){var s;let i,o;try{const{headers:l,method:c,body:d,signal:h,timeout:u}=n;let p={},{region:x}=n;x||(x=this.region);const y=new URL(`${this.url}/${r}`);x&&x!=="any"&&(p["x-region"]=x,y.searchParams.set("forceFunctionRegion",x));let b;d&&(l&&!Object.prototype.hasOwnProperty.call(l,"Content-Type")||!l)?typeof Blob<"u"&&d instanceof Blob||d instanceof ArrayBuffer?(p["Content-Type"]="application/octet-stream",b=d):typeof d=="string"?(p["Content-Type"]="text/plain",b=d):typeof FormData<"u"&&d instanceof FormData?b=d:(p["Content-Type"]="application/json",b=JSON.stringify(d)):d&&typeof d!="string"&&!(typeof Blob<"u"&&d instanceof Blob)&&!(d instanceof ArrayBuffer)&&!(typeof FormData<"u"&&d instanceof FormData)?b=JSON.stringify(d):b=d;let w=h;u&&(o=new AbortController,i=setTimeout(()=>o.abort(),u),h?(w=o.signal,h.addEventListener("abort",()=>o.abort())):w=o.signal);const g=yield this.fetch(y.toString(),{method:c||"POST",headers:Object.assign(Object.assign(Object.assign({},p),this.headers),l),body:b,signal:w}).catch(N=>{throw new Mv(N)}),f=g.headers.get("x-relay-error");if(f&&f==="true")throw new fu(g);if(!g.ok)throw new mu(g);let m=((s=g.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),k;return m==="application/json"?k=yield g.json():m==="application/octet-stream"||m==="application/pdf"?k=yield g.blob():m==="text/event-stream"?k=g:m==="multipart/form-data"?k=yield g.formData():k=yield g.text(),{data:k,error:null,response:g}}catch(l){return{data:null,error:l,response:l instanceof mu||l instanceof fu?l.context:void 0}}finally{i&&clearTimeout(i)}})}}const Sf=3,gu=e=>Math.min(1e3*2**e,3e4),Hv=[520,503],_f=["GET","HEAD","OPTIONS"];var Wv=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function xu(e,t){return new Promise(r=>{if(t!=null&&t.aborted){r();return}const n=setTimeout(()=>{t==null||t.removeEventListener("abort",s),r()},e);function s(){clearTimeout(n),r()}t==null||t.addEventListener("abort",s)})}function qv(e,t,r,n){return!(!n||r>=Sf||!_f.includes(e)||!Hv.includes(t))}var Gv=class{constructor(e){var t,r,n,s,i;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=(t=e.shouldThrowOnError)!==null&&t!==void 0?t:!1,this.signal=e.signal,this.isMaybeSingle=(r=e.isMaybeSingle)!==null&&r!==void 0?r:!1,this.shouldStripNulls=(n=e.shouldStripNulls)!==null&&n!==void 0?n:!1,this.urlLengthLimit=(s=e.urlLengthLimit)!==null&&s!==void 0?s:8e3,this.retryEnabled=(i=e.retry)!==null&&i!==void 0?i:!0,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var r=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const o=this.headers.get("Accept");o==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!o||o==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const n=this.fetch;let i=(async()=>{let o=0;for(;;){const d=new Headers(r.headers);o>0&&d.set("X-Retry-Count",String(o));let h;try{h=await n(r.url.toString(),{method:r.method,headers:d,body:JSON.stringify(r.body,(u,p)=>typeof p=="bigint"?p.toString():p),signal:r.signal})}catch(u){if((u==null?void 0:u.name)==="AbortError"||(u==null?void 0:u.code)==="ABORT_ERR"||!_f.includes(r.method))throw u;if(r.retryEnabled&&o<Sf){const p=gu(o);o++,await xu(p,r.signal);continue}throw u}if(qv(r.method,h.status,o,r.retryEnabled)){var l,c;const u=(l=(c=h.headers)===null||c===void 0?void 0:c.get("Retry-After"))!==null&&l!==void 0?l:null,p=u!==null?Math.max(0,parseInt(u,10)||0)*1e3:gu(o);await h.text(),o++,await xu(p,r.signal);continue}return await r.processResponse(h)}})();return this.shouldThrowOnError||(i=i.catch(o=>{var l;let c="",d="",h="";const u=o==null?void 0:o.cause;if(u){var p,x,y,b;const f=(p=u==null?void 0:u.message)!==null&&p!==void 0?p:"",m=(x=u==null?void 0:u.code)!==null&&x!==void 0?x:"";c=`${(y=o==null?void 0:o.name)!==null&&y!==void 0?y:"FetchError"}: ${o==null?void 0:o.message}`,c+=`

Caused by: ${(b=u==null?void 0:u.name)!==null&&b!==void 0?b:"Error"}: ${f}`,m&&(c+=` (${m})`),u!=null&&u.stack&&(c+=`
${u.stack}`)}else{var w;c=(w=o==null?void 0:o.stack)!==null&&w!==void 0?w:""}const g=this.url.toString().length;return(o==null?void 0:o.name)==="AbortError"||(o==null?void 0:o.code)==="ABORT_ERR"?(h="",d="Request was aborted (timeout or manual cancellation)",g>this.urlLengthLimit&&(d+=`. Note: Your request URL is ${g} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((u==null?void 0:u.name)==="HeadersOverflowError"||(u==null?void 0:u.code)==="UND_ERR_HEADERS_OVERFLOW")&&(h="",d="HTTP headers exceeded server limits (typically 16KB)",g>this.urlLengthLimit&&(d+=`. Your request URL is ${g} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(l=o==null?void 0:o.name)!==null&&l!==void 0?l:"FetchError"}: ${o==null?void 0:o.message}`,details:c,hint:d,code:h},data:null,count:null,status:0,statusText:""}})),i.then(e,t)}async processResponse(e){var t=this;let r=null,n=null,s=null,i=e.status,o=e.statusText;if(e.ok){var l,c;if(t.method!=="HEAD"){var d;const p=await e.text();p===""||(t.headers.get("Accept")==="text/csv"||t.headers.get("Accept")&&(!((d=t.headers.get("Accept"))===null||d===void 0)&&d.includes("application/vnd.pgrst.plan+text"))?n=p:n=JSON.parse(p))}const h=(l=t.headers.get("Prefer"))===null||l===void 0?void 0:l.match(/count=(exact|planned|estimated)/),u=(c=e.headers.get("content-range"))===null||c===void 0?void 0:c.split("/");h&&u&&u.length>1&&(s=parseInt(u[1])),t.isMaybeSingle&&Array.isArray(n)&&(n.length>1?(r={code:"PGRST116",details:`Results contain ${n.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},n=null,s=null,i=406,o="Not Acceptable"):n.length===1?n=n[0]:n=null)}else{const h=await e.text();try{r=JSON.parse(h),Array.isArray(r)&&e.status===404&&(n=[],r=null,i=200,o="OK")}catch{e.status===404&&h===""?(i=204,o="No Content"):r={message:h}}if(r&&t.shouldThrowOnError)throw new Wv(r)}return{success:r===null,error:r,data:n,count:s,status:i,statusText:o}}returns(){return this}overrideTypes(){return this}},Vv=class extends Gv{select(e){let t=!1;const r=(e??"*").split("").map(n=>/\s/.test(n)&&!t?"":(n==='"'&&(t=!t),n)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(e,{ascending:t=!0,nullsFirst:r,foreignTable:n,referencedTable:s=n}={}){const i=s?`${s}.order`:"order",o=this.url.searchParams.get(i);return this.url.searchParams.set(i,`${o?`${o},`:""}${e}.${t?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:r=t}={}){const n=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(n,`${e}`),this}range(e,t,{foreignTable:r,referencedTable:n=r}={}){const s=typeof n>"u"?"offset":`${n}.offset`,i=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${e}`),this.url.searchParams.set(i,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:e=!1,verbose:t=!1,settings:r=!1,buffers:n=!1,wal:s=!1,format:i="text"}={}){var o;const l=[e?"analyze":null,t?"verbose":null,r?"settings":null,n?"buffers":null,s?"wal":null].filter(Boolean).join("|"),c=(o=this.headers.get("Accept"))!==null&&o!==void 0?o:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${i}; for="${c}"; options=${l};`),i==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(e){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${e}`),this}};const vu=new RegExp("[,()]");var rn=class extends Vv{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){const r=Array.from(new Set(t)).map(n=>typeof n=="string"&&vu.test(n)?`"${n}"`:`${n}`).join(",");return this.url.searchParams.append(e,`in.(${r})`),this}notIn(e,t){const r=Array.from(new Set(t)).map(n=>typeof n=="string"&&vu.test(n)?`"${n}"`:`${n}`).join(",");return this.url.searchParams.append(e,`not.in.(${r})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:r,type:n}={}){let s="";n==="plain"?s="pl":n==="phrase"?s="ph":n==="websearch"&&(s="w");const i=r===void 0?"":`(${r})`;return this.url.searchParams.append(e,`${s}fts${i}.${t}`),this}match(e){return Object.entries(e).filter(([t,r])=>r!==void 0).forEach(([t,r])=>{this.url.searchParams.append(t,`eq.${r}`)}),this}not(e,t,r){return this.url.searchParams.append(e,`not.${t}.${r}`),this}or(e,{foreignTable:t,referencedTable:r=t}={}){const n=r?`${r}.or`:"or";return this.url.searchParams.append(n,`(${e})`),this}filter(e,t,r){return this.url.searchParams.append(e,`${t}.${r}`),this}},Kv=class{constructor(e,{headers:t={},schema:r,fetch:n,urlLengthLimit:s=8e3,retry:i}){this.url=e,this.headers=new Headers(t),this.schema=r,this.fetch=n,this.urlLengthLimit=s,this.retry=i}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){const{head:r=!1,count:n}=t??{},s=r?"HEAD":"GET";let i=!1;const o=(e??"*").split("").map(d=>/\s/.test(d)&&!i?"":(d==='"'&&(i=!i),d)).join(""),{url:l,headers:c}=this.cloneRequestState();return l.searchParams.set("select",o),n&&c.append("Prefer",`count=${n}`),new rn({method:s,url:l,headers:c,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:r=!0}={}){var n;const s="POST",{url:i,headers:o}=this.cloneRequestState();if(t&&o.append("Prefer",`count=${t}`),r||o.append("Prefer","missing=default"),Array.isArray(e)){const l=e.reduce((c,d)=>c.concat(Object.keys(d)),[]);if(l.length>0){const c=[...new Set(l)].map(d=>`"${d}"`);i.searchParams.set("columns",c.join(","))}}return new rn({method:s,url:i,headers:o,schema:this.schema,body:e,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:r=!1,count:n,defaultToNull:s=!0}={}){var i;const o="POST",{url:l,headers:c}=this.cloneRequestState();if(c.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),t!==void 0&&l.searchParams.set("on_conflict",t),n&&c.append("Prefer",`count=${n}`),s||c.append("Prefer","missing=default"),Array.isArray(e)){const d=e.reduce((h,u)=>h.concat(Object.keys(u)),[]);if(d.length>0){const h=[...new Set(d)].map(u=>`"${u}"`);l.searchParams.set("columns",h.join(","))}}return new rn({method:o,url:l,headers:c,schema:this.schema,body:e,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){var r;const n="PATCH",{url:s,headers:i}=this.cloneRequestState();return t&&i.append("Prefer",`count=${t}`),new rn({method:n,url:s,headers:i,schema:this.schema,body:e,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){var t;const r="DELETE",{url:n,headers:s}=this.cloneRequestState();return e&&s.append("Prefer",`count=${e}`),new rn({method:r,url:n,headers:s,schema:this.schema,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function Wa(e){"@babel/helpers - typeof";return Wa=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Wa(e)}function Yv(e,t){if(Wa(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Wa(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Jv(e){var t=Yv(e,"string");return Wa(t)=="symbol"?t:t+""}function Qv(e,t,r){return(t=Jv(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function yu(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function Ns(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?yu(Object(r),!0).forEach(function(n){Qv(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):yu(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var Xv=class Cf{constructor(t,{headers:r={},schema:n,fetch:s,timeout:i,urlLengthLimit:o=8e3,retry:l}={}){this.url=t,this.headers=new Headers(r),this.schemaName=n,this.urlLengthLimit=o;const c=s??globalThis.fetch;i!==void 0&&i>0?this.fetch=(d,h)=>{const u=new AbortController,p=setTimeout(()=>u.abort(),i),x=h==null?void 0:h.signal;if(x){if(x.aborted)return clearTimeout(p),c(d,h);const y=()=>{clearTimeout(p),u.abort()};return x.addEventListener("abort",y,{once:!0}),c(d,Ns(Ns({},h),{},{signal:u.signal})).finally(()=>{clearTimeout(p),x.removeEventListener("abort",y)})}return c(d,Ns(Ns({},h),{},{signal:u.signal})).finally(()=>clearTimeout(p))}:this.fetch=c,this.retry=l}from(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Kv(new URL(`${this.url}/${t}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new Cf(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(t,r={},{head:n=!1,get:s=!1,count:i}={}){var o;let l;const c=new URL(`${this.url}/rpc/${t}`);let d;const h=x=>x!==null&&typeof x=="object"&&(!Array.isArray(x)||x.some(h)),u=n&&Object.values(r).some(h);u?(l="POST",d=r):n||s?(l=n?"HEAD":"GET",Object.entries(r).filter(([x,y])=>y!==void 0).map(([x,y])=>[x,Array.isArray(y)?`{${y.join(",")}}`:`${y}`]).forEach(([x,y])=>{c.searchParams.append(x,y)})):(l="POST",d=r);const p=new Headers(this.headers);return u?p.set("Prefer",i?`count=${i},return=minimal`:"return=minimal"):i&&p.set("Prefer",`count=${i}`),new rn({method:l,url:c,headers:p,schema:this.schemaName,body:d,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class Zv{constructor(){}static detectEnvironment(){var t;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((t=navigator.userAgent)===null||t===void 0)&&t.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const n=r.versions;if(n&&n.node){const s=n.node,i=parseInt(s.replace(/^v/,"").split(".")[0]);return i>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${i} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${i} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const t=this.detectEnvironment();if(t.constructor)return t.constructor;let r=t.error||"WebSocket not supported in this environment.";throw t.workaround&&(r+=`

Suggested solution: ${t.workaround}`),new Error(r)}static isWebSocketSupported(){try{const t=this.detectEnvironment();return t.type==="native"||t.type==="ws"}catch{return!1}}}const ey="2.103.3",ty=`realtime-js/${ey}`,ry="1.0.0",Tf="2.0.0",ny=Tf,ay=1e4,sy=100,ir={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Ef={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},El={connecting:"connecting",closing:"closing",closed:"closed"};class iy{constructor(t){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=t??[]}encode(t,r){if(t.event===this.BROADCAST_EVENT&&!(t.payload instanceof ArrayBuffer)&&typeof t.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(t));let n=[t.join_ref,t.ref,t.topic,t.event,t.payload];return r(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(t){var r;return this._isArrayBuffer((r=t.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(t):this._encodeJsonUserBroadcastPush(t)}_encodeBinaryUserBroadcastPush(t){var r,n;const s=(n=(r=t.payload)===null||r===void 0?void 0:r.payload)!==null&&n!==void 0?n:new ArrayBuffer(0);return this._encodeUserBroadcastPush(t,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(t){var r,n;const s=(n=(r=t.payload)===null||r===void 0?void 0:r.payload)!==null&&n!==void 0?n:{},o=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(t,this.JSON_ENCODING,o)}_encodeUserBroadcastPush(t,r,n){var s,i;const o=t.topic,l=(s=t.ref)!==null&&s!==void 0?s:"",c=(i=t.join_ref)!==null&&i!==void 0?i:"",d=t.payload.event,h=this.allowedMetadataKeys?this._pick(t.payload,this.allowedMetadataKeys):{},u=Object.keys(h).length===0?"":JSON.stringify(h);if(c.length>255)throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const p=this.USER_BROADCAST_PUSH_META_LENGTH+c.length+l.length+o.length+d.length+u.length,x=new ArrayBuffer(this.HEADER_LENGTH+p);let y=new DataView(x),b=0;y.setUint8(b++,this.KINDS.userBroadcastPush),y.setUint8(b++,c.length),y.setUint8(b++,l.length),y.setUint8(b++,o.length),y.setUint8(b++,d.length),y.setUint8(b++,u.length),y.setUint8(b++,r),Array.from(c,g=>y.setUint8(b++,g.charCodeAt(0))),Array.from(l,g=>y.setUint8(b++,g.charCodeAt(0))),Array.from(o,g=>y.setUint8(b++,g.charCodeAt(0))),Array.from(d,g=>y.setUint8(b++,g.charCodeAt(0))),Array.from(u,g=>y.setUint8(b++,g.charCodeAt(0)));var w=new Uint8Array(x.byteLength+n.byteLength);return w.set(new Uint8Array(x),0),w.set(new Uint8Array(n),x.byteLength),w.buffer}decode(t,r){if(this._isArrayBuffer(t)){let n=this._binaryDecode(t);return r(n)}if(typeof t=="string"){const n=JSON.parse(t),[s,i,o,l,c]=n;return r({join_ref:s,ref:i,topic:o,event:l,payload:c})}return r({})}_binaryDecode(t){const r=new DataView(t),n=r.getUint8(0),s=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(t,r,s)}}_decodeUserBroadcast(t,r,n){const s=r.getUint8(1),i=r.getUint8(2),o=r.getUint8(3),l=r.getUint8(4);let c=this.HEADER_LENGTH+4;const d=n.decode(t.slice(c,c+s));c=c+s;const h=n.decode(t.slice(c,c+i));c=c+i;const u=n.decode(t.slice(c,c+o));c=c+o;const p=t.slice(c,t.byteLength),x=l===this.JSON_ENCODING?JSON.parse(n.decode(p)):p,y={type:this.BROADCAST_EVENT,event:h,payload:x};return o>0&&(y.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:d,event:this.BROADCAST_EVENT,payload:y}}_isArrayBuffer(t){var r;return t instanceof ArrayBuffer||((r=t==null?void 0:t.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(t,r){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).filter(([n])=>r.includes(n)))}}var ae;(function(e){e.abstime="abstime",e.bool="bool",e.date="date",e.daterange="daterange",e.float4="float4",e.float8="float8",e.int2="int2",e.int4="int4",e.int4range="int4range",e.int8="int8",e.int8range="int8range",e.json="json",e.jsonb="jsonb",e.money="money",e.numeric="numeric",e.oid="oid",e.reltime="reltime",e.text="text",e.time="time",e.timestamp="timestamp",e.timestamptz="timestamptz",e.timetz="timetz",e.tsrange="tsrange",e.tstzrange="tstzrange"})(ae||(ae={}));const bu=(e,t,r={})=>{var n;const s=(n=r.skipTypes)!==null&&n!==void 0?n:[];return t?Object.keys(t).reduce((i,o)=>(i[o]=oy(o,e,t,s),i),{}):{}},oy=(e,t,r,n)=>{const s=t.find(l=>l.name===e),i=s==null?void 0:s.type,o=r[e];return i&&!n.includes(i)?Af(i,o):Al(o)},Af=(e,t)=>{if(e.charAt(0)==="_"){const r=e.slice(1,e.length);return uy(t,r)}switch(e){case ae.bool:return ly(t);case ae.float4:case ae.float8:case ae.int2:case ae.int4:case ae.int8:case ae.numeric:case ae.oid:return cy(t);case ae.json:case ae.jsonb:return dy(t);case ae.timestamp:return hy(t);case ae.abstime:case ae.date:case ae.daterange:case ae.int4range:case ae.int8range:case ae.money:case ae.reltime:case ae.text:case ae.time:case ae.timestamptz:case ae.timetz:case ae.tsrange:case ae.tstzrange:return Al(t);default:return Al(t)}},Al=e=>e,ly=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},cy=e=>{if(typeof e=="string"){const t=parseFloat(e);if(!Number.isNaN(t))return t}return e},dy=e=>{if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e},uy=(e,t)=>{if(typeof e!="string")return e;const r=e.length-1,n=e[r];if(e[0]==="{"&&n==="}"){let i;const o=e.slice(1,r);try{i=JSON.parse("["+o+"]")}catch{i=o?o.split(","):[]}return i.map(l=>Af(t,l))}return e},hy=e=>typeof e=="string"?e.replace(" ","T"):e,Pf=e=>{const t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,"http"),t.pathname=t.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),t.pathname===""||t.pathname==="/"?t.pathname="/api/broadcast":t.pathname=t.pathname+"/api/broadcast",t.href};var ba=e=>typeof e=="function"?e:function(){return e},py=typeof self<"u"?self:null,nn=typeof window<"u"?window:null,Pt=py||nn||globalThis,fy="2.0.0",my=1e4,gy=1e3,zt={connecting:0,open:1,closing:2,closed:3},Qe={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Ft={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},Pl={longpoll:"longpoll",websocket:"websocket"},xy={complete:4},zl="base64url.bearer.phx.",Ss=class{constructor(e,t,r,n){this.channel=e,this.event=t,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=n,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:r}){this.recHooks.filter(n=>n.status===e).forEach(n=>n.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},zf=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},vy=class{constructor(e,t,r){this.state=Qe.closed,this.topic=e,this.params=ba(t||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Ss(this,Ft.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new zf(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=Qe.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(n=>n.send()),this.pushBuffer=[]}),this.joinPush.receive("error",n=>{this.state=Qe.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,n),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=Qe.closed,this.socket.remove(this)}),this.onError(n=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,n),this.isJoining()&&this.joinPush.reset(),this.state=Qe.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Ss(this,Ft.leave,ba({}),this.timeout).send(),this.state=Qe.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Ft.reply,(n,s)=>{this.trigger(this.replyEventName(s),n)})}join(e=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=Qe.closed,this.bindings=[]}onClose(e){this.on(Ft.close,e)}onError(e){return this.on(Ft.error,t=>e(t))}on(e,t){let r=this.bindingRef++;return this.bindings.push({event:e,ref:r,callback:t}),r}off(e,t){this.bindings=this.bindings.filter(r=>!(r.event===e&&(typeof t>"u"||t===r.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,r=this.timeout){if(t=t||{},!this.joinedOnce)throw new Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let n=new Ss(this,e,function(){return t},r);return this.canPush()?n.send():(n.startTimeout(),this.pushBuffer.push(n)),n}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=Qe.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(Ft.close,"leave")},r=new Ss(this,Ft.leave,ba({}),e);return r.receive("ok",()=>t()).receive("timeout",()=>t()),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(e,t,r){return t}filterBindings(e,t,r){return!0}isMember(e,t,r,n){return this.topic!==e?!1:n&&n!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:e,event:t,payload:r,joinRef:n}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=Qe.joining,this.joinPush.resend(e))}trigger(e,t,r,n){let s=this.onMessage(e,t,r,n);if(t&&!s)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let i=this.bindings.filter(o=>o.event===e&&this.filterBindings(o,t,r));for(let o=0;o<i.length;o++)i[o].callback(s,r,n||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===Qe.closed}isErrored(){return this.state===Qe.errored}isJoined(){return this.state===Qe.joined}isJoining(){return this.state===Qe.joining}isLeaving(){return this.state===Qe.leaving}},wi=class{static request(e,t,r,n,s,i,o){if(Pt.XDomainRequest){let l=new Pt.XDomainRequest;return this.xdomainRequest(l,e,t,n,s,i,o)}else if(Pt.XMLHttpRequest){let l=new Pt.XMLHttpRequest;return this.xhrRequest(l,e,t,r,n,s,i,o)}else{if(Pt.fetch&&Pt.AbortController)return this.fetchRequest(e,t,r,n,s,i,o);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(e,t,r,n,s,i,o){let l={method:e,headers:r,body:n},c=null;return s&&(c=new AbortController,setTimeout(()=>c.abort(),s),l.signal=c.signal),Pt.fetch(t,l).then(d=>d.text()).then(d=>this.parseJSON(d)).then(d=>o&&o(d)).catch(d=>{d.name==="AbortError"&&i?i():o&&o(null)}),c}static xdomainRequest(e,t,r,n,s,i,o){return e.timeout=s,e.open(t,r),e.onload=()=>{let l=this.parseJSON(e.responseText);o&&o(l)},i&&(e.ontimeout=i),e.onprogress=()=>{},e.send(n),e}static xhrRequest(e,t,r,n,s,i,o,l){e.open(t,r,!0),e.timeout=i;for(let[c,d]of Object.entries(n))e.setRequestHeader(c,d);return e.onerror=()=>l&&l(null),e.onreadystatechange=()=>{if(e.readyState===xy.complete&&l){let c=this.parseJSON(e.responseText);l(c)}},o&&(e.ontimeout=o),e.send(s),e}static parseJSON(e){if(!e||e==="")return null;try{return JSON.parse(e)}catch{return console&&console.log("failed to parse JSON response",e),null}}static serialize(e,t){let r=[];for(var n in e){if(!Object.prototype.hasOwnProperty.call(e,n))continue;let s=t?`${t}[${n}]`:n,i=e[n];typeof i=="object"?r.push(this.serialize(i,s)):r.push(encodeURIComponent(s)+"="+encodeURIComponent(i))}return r.join("&")}static appendParams(e,t){if(Object.keys(t).length===0)return e;let r=e.match(/\?/)?"&":"?";return`${e}${r}${this.serialize(t)}`}},yy=e=>{let t="",r=new Uint8Array(e),n=r.byteLength;for(let s=0;s<n;s++)t+=String.fromCharCode(r[s]);return btoa(t)},Yr=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(zl)&&(this.authToken=atob(t[1].slice(zl.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=zt.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+Pl.websocket),"$1/"+Pl.longpoll)}endpointURL(){return wi.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,r){this.close(e,t,r),this.readyState=zt.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===zt.open||this.readyState===zt.connecting}poll(){const e={Accept:"application/json"};this.authToken&&(e["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",e,null,()=>this.ontimeout(),t=>{if(t){var{status:r,token:n,messages:s}=t;if(r===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=n}else r=0;switch(r){case 200:s.forEach(i=>{setTimeout(()=>this.onmessage({data:i}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=zt.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${r}`)}})}send(e){typeof e!="string"&&(e=yy(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},e.join(`
`),()=>this.onerror("timeout"),t=>{this.awaitingBatchAck=!1,!t||t.status!==200?(this.onerror(t&&t.status),this.closeAndRetry(1011,"internal server error",!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(e,t,r){for(let s of this.reqs)s.abort();this.readyState=zt.closed;let n=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",n)):this.onclose(n)}ajax(e,t,r,n,s){let i,o=()=>{this.reqs.delete(i),n()};i=wi.request(e,this.endpointURL(),t,r,this.timeout,o,l=>{this.reqs.delete(i),this.isActive()&&s(l)}),this.reqs.add(i)}},by=class oa{constructor(t,r={}){let n=r.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(n.state,s=>{let{onJoin:i,onLeave:o,onSync:l}=this.caller;this.joinRef=this.channel.joinRef(),this.state=oa.syncState(this.state,s,i,o),this.pendingDiffs.forEach(c=>{this.state=oa.syncDiff(this.state,c,i,o)}),this.pendingDiffs=[],l()}),this.channel.on(n.diff,s=>{let{onJoin:i,onLeave:o,onSync:l}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=oa.syncDiff(this.state,s,i,o),l())})}onJoin(t){this.caller.onJoin=t}onLeave(t){this.caller.onLeave=t}onSync(t){this.caller.onSync=t}list(t){return oa.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(t,r,n,s){let i=this.clone(t),o={},l={};return this.map(i,(c,d)=>{r[c]||(l[c]=d)}),this.map(r,(c,d)=>{let h=i[c];if(h){let u=d.metas.map(b=>b.phx_ref),p=h.metas.map(b=>b.phx_ref),x=d.metas.filter(b=>p.indexOf(b.phx_ref)<0),y=h.metas.filter(b=>u.indexOf(b.phx_ref)<0);x.length>0&&(o[c]=d,o[c].metas=x),y.length>0&&(l[c]=this.clone(h),l[c].metas=y)}else o[c]=d}),this.syncDiff(i,{joins:o,leaves:l},n,s)}static syncDiff(t,r,n,s){let{joins:i,leaves:o}=this.clone(r);return n||(n=function(){}),s||(s=function(){}),this.map(i,(l,c)=>{let d=t[l];if(t[l]=this.clone(c),d){let h=t[l].metas.map(p=>p.phx_ref),u=d.metas.filter(p=>h.indexOf(p.phx_ref)<0);t[l].metas.unshift(...u)}n(l,d,c)}),this.map(o,(l,c)=>{let d=t[l];if(!d)return;let h=c.metas.map(u=>u.phx_ref);d.metas=d.metas.filter(u=>h.indexOf(u.phx_ref)<0),s(l,d,c),d.metas.length===0&&delete t[l]}),t}static list(t,r){return r||(r=function(n,s){return s}),this.map(t,(n,s)=>r(n,s))}static map(t,r){return Object.getOwnPropertyNames(t).map(n=>r(n,t[n]))}static clone(t){return JSON.parse(JSON.stringify(t))}},_s={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let r=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(r))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[r,n,s,i,o]=JSON.parse(e);return t({join_ref:r,ref:n,topic:s,event:i,payload:o})}},binaryEncode(e){let{join_ref:t,ref:r,event:n,topic:s,payload:i}=e,o=this.META_LENGTH+t.length+r.length+s.length+n.length,l=new ArrayBuffer(this.HEADER_LENGTH+o),c=new DataView(l),d=0;c.setUint8(d++,this.KINDS.push),c.setUint8(d++,t.length),c.setUint8(d++,r.length),c.setUint8(d++,s.length),c.setUint8(d++,n.length),Array.from(t,u=>c.setUint8(d++,u.charCodeAt(0))),Array.from(r,u=>c.setUint8(d++,u.charCodeAt(0))),Array.from(s,u=>c.setUint8(d++,u.charCodeAt(0))),Array.from(n,u=>c.setUint8(d++,u.charCodeAt(0)));var h=new Uint8Array(l.byteLength+i.byteLength);return h.set(new Uint8Array(l),0),h.set(new Uint8Array(i),l.byteLength),h.buffer},binaryDecode(e){let t=new DataView(e),r=t.getUint8(0),n=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(e,t,n);case this.KINDS.reply:return this.decodeReply(e,t,n);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,n)}},decodePush(e,t,r){let n=t.getUint8(1),s=t.getUint8(2),i=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,l=r.decode(e.slice(o,o+n));o=o+n;let c=r.decode(e.slice(o,o+s));o=o+s;let d=r.decode(e.slice(o,o+i));o=o+i;let h=e.slice(o,e.byteLength);return{join_ref:l,ref:null,topic:c,event:d,payload:h}},decodeReply(e,t,r){let n=t.getUint8(1),s=t.getUint8(2),i=t.getUint8(3),o=t.getUint8(4),l=this.HEADER_LENGTH+this.META_LENGTH,c=r.decode(e.slice(l,l+n));l=l+n;let d=r.decode(e.slice(l,l+s));l=l+s;let h=r.decode(e.slice(l,l+i));l=l+i;let u=r.decode(e.slice(l,l+o));l=l+o;let p=e.slice(l,e.byteLength),x={status:u,response:p};return{join_ref:c,ref:d,topic:h,event:Ft.reply,payload:x}},decodeBroadcast(e,t,r){let n=t.getUint8(1),s=t.getUint8(2),i=this.HEADER_LENGTH+2,o=r.decode(e.slice(i,i+n));i=i+n;let l=r.decode(e.slice(i,i+s));i=i+s;let c=e.slice(i,e.byteLength);return{join_ref:null,ref:null,topic:o,event:l,payload:c}}},wy=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||my,this.transport=t.transport||Pt.WebSocket||Yr,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null,this.sessionStore=t.sessionStorage||Pt&&Pt.sessionStorage,this.establishedConnections=0,this.defaultEncoder=_s.encode.bind(_s),this.defaultDecoder=_s.decode.bind(_s),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==Yr?(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let r=null;nn&&nn.addEventListener&&(nn.addEventListener("pagehide",n=>{this.conn&&(this.disconnect(),r=this.connectClock)}),nn.addEventListener("pageshow",n=>{r===this.connectClock&&(r=null,this.connect())}),nn.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=n=>t.rejoinAfterMs?t.rejoinAfterMs(n):[1e3,2e3,5e3][n-1]||1e4,this.reconnectAfterMs=n=>t.reconnectAfterMs?t.reconnectAfterMs(n):[10,50,100,150,200,250,500,1e3,2e3][n-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(n,s,i)=>{console.log(`${n}: ${s}`,i)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=ba(t.params||{}),this.endPoint=`${e}/${Pl.websocket}`,this.vsn=t.vsn||fy,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new zf(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken}getLongPollTransport(){return Yr}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=e}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let e=wi.appendParams(wi.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)!=="/"?e:e.charAt(1)==="/"?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`}disconnect(e,t,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,r)}connect(e){e&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=ba(e)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Yr?this.connectWithFallback(Yr,this.longPollFallbackMs):this.transportConnect())}log(e,t,r){this.logger&&this.logger(e,t,r)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:t});let n=this.onMessage(s=>{s.ref===t&&(this.off([n]),e(Date.now()-r))});return!0}transportName(e){switch(e){case Yr:return"LongPoll";default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=["phoenix",`${zl}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=t=>this.onConnError(t),this.conn.onmessage=t=>this.onConnMessage(t),this.conn.onclose=t=>this.onConnClose(t)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let r=!1,n=!0,s,i,o=this.transportName(e),l=c=>{this.log("transport",`falling back to ${o}...`,c),this.off([s,i]),n=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${o}`))return l("memorized");this.fallbackTimer=setTimeout(l,t),i=this.onError(c=>{this.log("transport","error",c),n&&!r&&(clearTimeout(this.fallbackTimer),l(c))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(r=!0,!n){let c=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${c}`,"true"),this.log("transport",`established ${c} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(l,t),this.ping(c=>{this.log("transport","connected to primary after",c),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(e){this.log("error","error in heartbeat callback",e)}this.triggerChanError(),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),gy,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,r){if(!this.conn)return e&&e();const n=this.conn;this.waitForBufferDone(n,()=>{t?n.close(t,r||""):n.close(),this.waitForSocketClosed(n,()=>{this.conn===n&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,r=1){if(r===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,r+1)},150*r)}waitForSocketClosed(e,t,r=1){if(r===5||e.readyState===zt.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,r+1)},150*r)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",e),this.triggerChanError(),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",e)}onConnError(e){this.hasLogger()&&this.log("transport",e);let t=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",e,t,r),(t===this.transport||r>0)&&this.triggerChanError()}triggerChanError(){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(Ft.error)})}connectionState(){switch(this.conn&&this.conn.readyState){case zt.connecting:return"connecting";case zt.open:return"open";case zt.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([r])=>e.indexOf(r)===-1)}channel(e,t={}){let r=new vy(e,t,this);return this.channels.push(r),r}push(e){if(this.hasLogger()){let{topic:t,event:r,payload:n,ref:s,join_ref:i}=e;this.log("push",`${t} ${r} (${i}, ${s})`,n)}this.isConnected()?this.encode(e,t=>this.conn.send(t)):this.sendBuffer.push(()=>this.encode(e,t=>this.conn.send(t)))}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(e){this.log("error","error in heartbeat callback",e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(e){this.log("error","error in heartbeat callback",e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,t=>{let{topic:r,event:n,payload:s,ref:i,join_ref:o}=t;if(i&&i===this.pendingHeartbeatRef){const l=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(s.status==="ok"?"ok":"error",l)}catch(c){this.log("error","error in heartbeat callback",c)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${s.status||""} ${r} ${n} ${i&&"("+i+")"||""}`.trim(),s);for(let l=0;l<this.channels.length;l++){const c=this.channels[l];c.isMember(r,n,s,o)&&c.trigger(n,s,i,o)}this.triggerStateCallbacks("message",t)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([r,n])=>{try{n(...t)}catch(s){this.log("error",`error in ${e} callback`,s)}})}catch(r){this.log("error",`error triggering ${e} callbacks`,r)}}leaveOpenTopic(e){let t=this.channels.find(r=>r.topic===e&&(r.isJoined()||r.isJoining()));t&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${e}"`),t.leave())}};class wa{constructor(t,r){const n=jy(r);this.presence=new by(t.getChannel(),n),this.presence.onJoin((s,i,o)=>{const l=wa.onJoinPayload(s,i,o);t.getChannel().trigger("presence",l)}),this.presence.onLeave((s,i,o)=>{const l=wa.onLeavePayload(s,i,o);t.getChannel().trigger("presence",l)}),this.presence.onSync(()=>{t.getChannel().trigger("presence",{event:"sync"})})}get state(){return wa.transformState(this.presence.state)}static transformState(t){return t=ky(t),Object.getOwnPropertyNames(t).reduce((r,n)=>{const s=t[n];return r[n]=Ks(s),r},{})}static onJoinPayload(t,r,n){const s=wu(r),i=Ks(n);return{event:"join",key:t,currentPresences:s,newPresences:i}}static onLeavePayload(t,r,n){const s=wu(r),i=Ks(n);return{event:"leave",key:t,currentPresences:s,leftPresences:i}}}function Ks(e){return e.metas.map(t=>(t.presence_ref=t.phx_ref,delete t.phx_ref,delete t.phx_ref_prev,t))}function ky(e){return JSON.parse(JSON.stringify(e))}function jy(e){return(e==null?void 0:e.events)&&{events:e.events}}function wu(e){return e!=null&&e.metas?Ks(e):[]}var ku;(function(e){e.SYNC="sync",e.JOIN="join",e.LEAVE="leave"})(ku||(ku={}));class Ny{get state(){return this.presenceAdapter.state}constructor(t,r){this.channel=t,this.presenceAdapter=new wa(this.channel.channelAdapter,r)}}class Sy{constructor(t,r,n){const s=_y(n);this.channel=t.getSocket().channel(r,s),this.socket=t}get state(){return this.channel.state}set state(t){this.channel.state=t}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(t,r){return this.channel.on(t,r)}off(t,r){this.channel.off(t,r)}subscribe(t){return this.channel.join(t)}unsubscribe(t){return this.channel.leave(t)}teardown(){this.channel.teardown()}onClose(t){this.channel.onClose(t)}onError(t){return this.channel.onError(t)}push(t,r,n){let s;try{s=this.channel.push(t,r,n)}catch{throw new Error(`tried to push '${t}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>sy){const i=this.channel.pushBuffer.shift();i.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${i.event}`,i.payload())}return s}updateJoinPayload(t){const r=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},r),t)}canPush(){return this.socket.isConnected()&&this.state===ir.joined}isJoined(){return this.state===ir.joined}isJoining(){return this.state===ir.joining}isClosed(){return this.state===ir.closed}isLeaving(){return this.state===ir.leaving}updateFilterBindings(t){this.channel.filterBindings=t}updatePayloadTransform(t){this.channel.onMessage=t}getChannel(){return this.channel}}function _y(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},e.config)}}var ju;(function(e){e.ALL="*",e.INSERT="INSERT",e.UPDATE="UPDATE",e.DELETE="DELETE"})(ju||(ju={}));var bn;(function(e){e.BROADCAST="broadcast",e.PRESENCE="presence",e.POSTGRES_CHANGES="postgres_changes",e.SYSTEM="system"})(bn||(bn={}));var Ht;(function(e){e.SUBSCRIBED="SUBSCRIBED",e.TIMED_OUT="TIMED_OUT",e.CLOSED="CLOSED",e.CHANNEL_ERROR="CHANNEL_ERROR"})(Ht||(Ht={}));class ka{get state(){return this.channelAdapter.state}set state(t){this.channelAdapter.state=t}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(t,r={config:{}},n){var s,i;if(this.topic=t,this.params=r,this.socket=n,this.bindings={},this.subTopic=t.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.channelAdapter=new Sy(this.socket.socketAdapter,t,this.params),this.presence=new Ny(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Pf(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((i=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||i===void 0)&&i.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(t,r=this.timeout){var n,s,i;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:o,presence:l,private:c}}=this.params,d=(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(x=>x.filter))!==null&&s!==void 0?s:[],h=!!this.bindings[bn.PRESENCE]&&this.bindings[bn.PRESENCE].length>0||((i=this.params.config.presence)===null||i===void 0?void 0:i.enabled)===!0,u={},p={broadcast:o,presence:Object.assign(Object.assign({},l),{enabled:h}),postgres_changes:d,private:c};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(x=>{t==null||t(Ht.CHANNEL_ERROR,x)}),this._onClose(()=>t==null?void 0:t(Ht.CLOSED)),this.updateJoinPayload(Object.assign({config:p},u)),this._updateFilterMessage(),this.channelAdapter.subscribe(r).receive("ok",async({postgres_changes:x})=>{if(this.socket._isManualToken()||this.socket.setAuth(),x===void 0){t==null||t(Ht.SUBSCRIBED);return}this._updatePostgresBindings(x,t)}).receive("error",x=>{this.state=ir.errored,t==null||t(Ht.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(x).join(", ")||"error")))}).receive("timeout",()=>{t==null||t(Ht.TIMED_OUT)})}return this}_updatePostgresBindings(t,r){var n;const s=this.bindings.postgres_changes,i=(n=s==null?void 0:s.length)!==null&&n!==void 0?n:0,o=[];for(let l=0;l<i;l++){const c=s[l],{filter:{event:d,schema:h,table:u,filter:p}}=c,x=t&&t[l];if(x&&x.event===d&&ka.isFilterValueEqual(x.schema,h)&&ka.isFilterValueEqual(x.table,u)&&ka.isFilterValueEqual(x.filter,p))o.push(Object.assign(Object.assign({},c),{id:x.id}));else{this.unsubscribe(),this.state=ir.errored,r==null||r(Ht.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=o,this.state!=ir.errored&&r&&r(Ht.SUBSCRIBED)}presenceState(){return this.presence.state}async track(t,r={}){return await this.send({type:"presence",event:"track",payload:t},r.timeout||this.timeout)}async untrack(t={}){return await this.send({type:"presence",event:"untrack"},t)}on(t,r,n){const s=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=t===bn.PRESENCE||t===bn.POSTGRES_CHANGES;if(s&&i)throw this.socket.log("channel",`cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(t,r,n)}async httpSend(t,r,n={}){var s;if(r==null)return Promise.reject(new Error("Payload is required for httpSend()"));const i={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o={method:"POST",headers:i,body:JSON.stringify({messages:[{topic:this.subTopic,event:t,payload:r,private:this.private}]})},l=await this._fetchWithTimeout(this.broadcastEndpointURL,o,(s=n.timeout)!==null&&s!==void 0?s:this.timeout);if(l.status===202)return{success:!0};let c=l.statusText;try{const d=await l.json();c=d.error||d.message||c}catch{}return Promise.reject(new Error(c))}async send(t,r={}){var n,s;if(!this.channelAdapter.canPush()&&t.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:o}=t,l={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(l.Authorization=`Bearer ${this.socket.accessTokenValue}`);const c={method:"POST",headers:l,body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:o,private:this.private}]})};try{const d=await this._fetchWithTimeout(this.broadcastEndpointURL,c,(n=r.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=d.body)===null||s===void 0?void 0:s.cancel()),d.ok?"ok":"error"}catch(d){return d.name==="AbortError"?"timed out":"error"}}else return new Promise(i=>{var o,l,c;const d=this.channelAdapter.push(t.type,t,r.timeout||this.timeout);t.type==="broadcast"&&!(!((c=(l=(o=this.params)===null||o===void 0?void 0:o.config)===null||l===void 0?void 0:l.broadcast)===null||c===void 0)&&c.ack)&&i("ok"),d.receive("ok",()=>i("ok")),d.receive("error",()=>i("error")),d.receive("timeout",()=>i("timed out"))})}updateJoinPayload(t){this.channelAdapter.updateJoinPayload(t)}async unsubscribe(t=this.timeout){return new Promise(r=>{this.channelAdapter.unsubscribe(t).receive("ok",()=>r("ok")).receive("timeout",()=>r("timed out")).receive("error",()=>r("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(t,r,n){const s=new AbortController,i=setTimeout(()=>s.abort(),n),o=await this.socket.fetch(t,Object.assign(Object.assign({},r),{signal:s.signal}));return clearTimeout(i),o}_on(t,r,n){const s=t.toLocaleLowerCase(),i=this.channelAdapter.on(t,n),o={type:s,filter:r,callback:n,ref:i};return this.bindings[s]?this.bindings[s].push(o):this.bindings[s]=[o],this._updateFilterMessage(),this}_onClose(t){this.channelAdapter.onClose(t)}_onError(t){this.channelAdapter.onError(t)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((t,r,n)=>{var s,i,o,l,c,d,h;const u=t.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,n))return!1;const p=(s=this.bindings[u])===null||s===void 0?void 0:s.find(x=>x.ref===t.ref);if(!p)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in p){const x=p.id,y=(i=p.filter)===null||i===void 0?void 0:i.event;return x&&((o=r.ids)===null||o===void 0?void 0:o.includes(x))&&(y==="*"||(y==null?void 0:y.toLocaleLowerCase())===((l=r.data)===null||l===void 0?void 0:l.type.toLocaleLowerCase()))}else{const x=(d=(c=p==null?void 0:p.filter)===null||c===void 0?void 0:c.event)===null||d===void 0?void 0:d.toLocaleLowerCase();return x==="*"||x===((h=r==null?void 0:r.event)===null||h===void 0?void 0:h.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===u})}_notThisChannelEvent(t,r){const{close:n,error:s,leave:i,join:o}=Ef;return r&&[n,s,i,o].includes(t)&&r!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((t,r,n)=>{if(typeof r=="object"&&"ids"in r){const s=r.data,{schema:i,table:o,commit_timestamp:l,type:c,errors:d}=s;return Object.assign(Object.assign({},{schema:i,table:o,commit_timestamp:l,eventType:c,new:{},old:{},errors:d}),this._getPayloadRecords(s))}return r})}copyBindings(t){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const r in t.bindings)for(const n of t.bindings[r])this._on(n.type,n.filter,n.callback)}static isFilterValueEqual(t,r){return(t??void 0)===(r??void 0)}_getPayloadRecords(t){const r={new:{},old:{}};return(t.type==="INSERT"||t.type==="UPDATE")&&(r.new=bu(t.columns,t.record)),(t.type==="UPDATE"||t.type==="DELETE")&&(r.old=bu(t.columns,t.old_record)),r}}class Cy{constructor(t,r){this.socket=new wy(t,r)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(t){this.socket.heartbeatCallback=t}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(t,r,n,s=1e4){return new Promise(i=>{setTimeout(()=>i("timeout"),s),this.socket.disconnect(()=>{t(),i("ok")},r,n)})}push(t){this.socket.push(t)}log(t,r,n){this.socket.log(t,r,n)}makeRef(){return this.socket.makeRef()}onOpen(t){this.socket.onOpen(t)}onClose(t){this.socket.onClose(t)}onError(t){this.socket.onError(t)}onMessage(t){this.socket.onMessage(t)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==El.connecting}isDisconnecting(){return this.socket.connectionState()==El.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Ty={HEARTBEAT_INTERVAL:25e3},Ey=[1e3,2e3,5e3,1e4],Ay=1e4,Py=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class zy{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(t,r){var n;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new iy,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._resolveFetch=i=>i?(...o)=>i(...o):(...o)=>fetch(...o),!(!((n=r==null?void 0:r.params)===null||n===void 0)&&n.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey;const s=this._initializeOptions(r);this.socketAdapter=new Cy(t,s),this.httpEndpoint=Pf(t),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(t){const r=t.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(t,r){return this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},t,r)}getChannels(){return this.channels}async removeChannel(t){const r=await t.unsubscribe();return r==="ok"&&t.teardown(),this.channels.length===0&&this.disconnect(),r}async removeAllChannels(){const t=this.channels.map(async n=>{const s=await n.unsubscribe();return n.teardown(),s}),r=await Promise.all(t);return this.disconnect(),r}log(t,r,n){this.socketAdapter.log(t,r,n)}connectionState(){return this.socketAdapter.connectionState()||El.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(t,r={config:{}}){const n=`realtime:${t}`,s=this.getChannels().find(i=>i.topic===n);if(s)return s;{const i=new ka(`realtime:${t}`,r,this);return this.channels.push(i),i}}push(t){this.socketAdapter.push(t)}async setAuth(t=null){this._authPromise=this._performAuth(t);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(t){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(t)}_makeRef(){return this.socketAdapter.makeRef()}_remove(t){this.channels=this.channels.filter(r=>r.topic!==t.topic)}async _performAuth(t=null){let r,n=!1;if(t)r=t,n=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(s){this.log("error","Error fetching access token from callback",s),r=this.accessTokenValue}else r=this.accessTokenValue;n?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(s=>{const i={access_token:r,version:ty};r&&s.updateJoinPayload(i),s.joinedOnce&&s.channelAdapter.isJoined()&&s.channelAdapter.push(Ef.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(t="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${t}`,r)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(r=>{this.log("error","error waiting for auth on connect",r)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(t=>{t.ref&&t.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(t){return(r,n)=>{r=="sent"&&this._setAuthSafely(),t&&t(r,n)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const t=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(t),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(t){let r;if(t)r=t;else{const n=new Blob([Py],{type:"application/javascript"});r=URL.createObjectURL(n)}return r}_initializeOptions(t){var r,n,s,i,o,l,c,d,h;this.worker=(r=t==null?void 0:t.worker)!==null&&r!==void 0?r:!1,this.accessToken=(n=t==null?void 0:t.accessToken)!==null&&n!==void 0?n:null;const u={};u.timeout=(s=t==null?void 0:t.timeout)!==null&&s!==void 0?s:ay,u.heartbeatIntervalMs=(i=t==null?void 0:t.heartbeatIntervalMs)!==null&&i!==void 0?i:Ty.HEARTBEAT_INTERVAL,u.transport=(o=t==null?void 0:t.transport)!==null&&o!==void 0?o:Zv.getWebSocketConstructor(),u.params=t==null?void 0:t.params,u.logger=t==null?void 0:t.logger,u.heartbeatCallback=this._wrapHeartbeatCallback(t==null?void 0:t.heartbeatCallback),u.reconnectAfterMs=(l=t==null?void 0:t.reconnectAfterMs)!==null&&l!==void 0?l:b=>Ey[b-1]||Ay;let p,x;const y=(c=t==null?void 0:t.vsn)!==null&&c!==void 0?c:ny;switch(y){case ry:p=(b,w)=>w(JSON.stringify(b)),x=(b,w)=>w(JSON.parse(b));break;case Tf:p=this.serializer.encode.bind(this.serializer),x=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${u.vsn}`)}if(u.vsn=y,u.encode=(d=t==null?void 0:t.encode)!==null&&d!==void 0?d:p,u.decode=(h=t==null?void 0:t.decode)!==null&&h!==void 0?h:x,u.beforeReconnect=this._reconnectAuth.bind(this),(t!=null&&t.logLevel||t!=null&&t.log_level)&&(this.logLevel=t.logLevel||t.log_level,u.params=Object.assign(Object.assign({},u.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=t==null?void 0:t.workerUrl,u.autoSendHeartbeat=!this.worker}return u}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var qa=class extends Error{constructor(e,t){var r;super(e),this.name="IcebergError",this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType==="CommitStateUnknownException"||[500,502,504].includes(t.status)&&((r=t.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Ry(e,t,r){const n=new URL(t,e);if(r)for(const[s,i]of Object.entries(r))i!==void 0&&n.searchParams.set(s,i);return n.toString()}async function Oy(e){return!e||e.type==="none"?{}:e.type==="bearer"?{Authorization:`Bearer ${e.token}`}:e.type==="header"?{[e.name]:e.value}:e.type==="custom"?await e.getHeaders():{}}function Ly(e){const t=e.fetchImpl??globalThis.fetch;return{async request({method:r,path:n,query:s,body:i,headers:o}){const l=Ry(e.baseUrl,n,s),c=await Oy(e.auth),d=await t(l,{method:r,headers:{...i?{"Content-Type":"application/json"}:{},...c,...o},body:i?JSON.stringify(i):void 0}),h=await d.text(),u=(d.headers.get("content-type")||"").includes("application/json"),p=u&&h?JSON.parse(h):h;if(!d.ok){const x=u?p:void 0,y=x==null?void 0:x.error;throw new qa((y==null?void 0:y.message)??`Request failed with status ${d.status}`,{status:d.status,icebergType:y==null?void 0:y.type,icebergCode:y==null?void 0:y.code,details:x})}return{status:d.status,headers:d.headers,data:p}}}}function Cs(e){return e.join("")}var Iy=class{constructor(e,t=""){this.client=e,this.prefix=t}async listNamespaces(e){const t=e?{parent:Cs(e.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(n=>({namespace:n}))}async createNamespace(e,t){const r={namespace:e.namespace,properties:t==null?void 0:t.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Cs(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Cs(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Cs(e.namespace)}`}),!0}catch(t){if(t instanceof qa&&t.status===404)return!1;throw t}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(r){if(r instanceof qa&&r.status===409)return;throw r}}};function Jr(e){return e.join("")}var $y=class{constructor(e,t="",r){this.client=e,this.prefix=t,this.accessDelegation=r}async listTables(e){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Jr(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Jr(e.namespace)}/tables`,body:t,headers:r})).data.metadata}async updateTable(e,t){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Jr(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(e,t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Jr(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String((t==null?void 0:t.purge)??!1)}})}async loadTable(e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Jr(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){const t={};this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Jr(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(r){if(r instanceof qa&&r.status===404)return!1;throw r}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(r){if(r instanceof qa&&r.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw r}}},Uy=class{constructor(e){var n;let t="v1";e.catalogName&&(t+=`/${e.catalogName}`);const r=e.baseUrl.endsWith("/")?e.baseUrl:`${e.baseUrl}/`;this.client=Ly({baseUrl:r,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=(n=e.accessDelegation)==null?void 0:n.join(","),this.namespaceOps=new Iy(this.client,t),this.tableOps=new $y(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function Ga(e){"@babel/helpers - typeof";return Ga=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ga(e)}function Dy(e,t){if(Ga(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Ga(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function By(e){var t=Dy(e,"string");return Ga(t)=="symbol"?t:t+""}function My(e,t,r){return(t=By(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Nu(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function q(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Nu(Object(r),!0).forEach(function(n){My(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Nu(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var Wi=class extends Error{constructor(e,t="storage",r,n){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=n}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function qi(e){return typeof e=="object"&&e!==null&&"__isStorageError"in e}var Rl=class extends Wi{constructor(e,t,r,n="storage"){super(e,n,t,r),this.name=n==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=t,this.statusCode=r}toJSON(){return q({},super.toJSON())}},Rf=class extends Wi{constructor(e,t,r="storage"){super(e,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=t}};const Fy=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),Hy=e=>{if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Ol=e=>{if(Array.isArray(e))return e.map(r=>Ol(r));if(typeof e=="function"||e!==Object(e))return e;const t={};return Object.entries(e).forEach(([r,n])=>{const s=r.replace(/([-_][a-z])/gi,i=>i.toUpperCase().replace(/[-_]/g,""));t[s]=Ol(n)}),t},Wy=e=>!e||typeof e!="string"||e.length===0||e.length>100||e.trim()!==e||e.includes("/")||e.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e),Su=e=>{var t;return e.msg||e.message||e.error_description||(typeof e.error=="string"?e.error:(t=e.error)===null||t===void 0?void 0:t.message)||JSON.stringify(e)},qy=async(e,t,r,n)=>{if(e!==null&&typeof e=="object"&&typeof e.json=="function"){const s=e;let i=parseInt(s.status,10);Number.isFinite(i)||(i=500),s.json().then(o=>{const l=(o==null?void 0:o.statusCode)||(o==null?void 0:o.code)||i+"";t(new Rl(Su(o),i,l,n))}).catch(()=>{const o=i+"";t(new Rl(s.statusText||`HTTP ${i} error`,i,o,n))})}else t(new Rf(Su(e),e,n))},Gy=(e,t,r,n)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};if(e==="GET"||e==="HEAD"||!n)return q(q({},s),r);if(Hy(n)){var i;const o=(t==null?void 0:t.headers)||{};let l;for(const[c,d]of Object.entries(o))c.toLowerCase()==="content-type"&&(l=d);s.headers=Vy(o,"Content-Type",(i=l)!==null&&i!==void 0?i:"application/json"),s.body=JSON.stringify(n)}else s.body=n;return t!=null&&t.duplex&&(s.duplex=t.duplex),q(q({},s),r)};function Vy(e,t,r){const n=q({},e);for(const s of Object.keys(n))s.toLowerCase()===t.toLowerCase()&&delete n[s];return n[t]=r,n}async function ea(e,t,r,n,s,i,o){return new Promise((l,c)=>{e(r,Gy(t,n,s,i)).then(d=>{if(!d.ok)throw d;if(n!=null&&n.noResolveJson)return d;if(o==="vectors"){const h=d.headers.get("content-type");if(d.headers.get("content-length")==="0"||d.status===204)return{};if(!h||!h.includes("application/json"))return{}}return d.json()}).then(d=>l(d)).catch(d=>qy(d,c,n,o))})}function Of(e="storage"){return{get:async(t,r,n,s)=>ea(t,"GET",r,n,s,void 0,e),post:async(t,r,n,s,i)=>ea(t,"POST",r,s,i,n,e),put:async(t,r,n,s,i)=>ea(t,"PUT",r,s,i,n,e),head:async(t,r,n,s)=>ea(t,"HEAD",r,q(q({},n),{},{noResolveJson:!0}),s,void 0,e),remove:async(t,r,n,s,i)=>ea(t,"DELETE",r,s,i,n,e)}}const Ky=Of("storage"),{get:Va,post:kt,put:Ll,head:Yy,remove:Hc}=Ky,st=Of("vectors");var Bn=class{constructor(e,t={},r,n="storage"){this.shouldThrowOnError=!1,this.url=e,this.headers=Object.fromEntries(Object.entries(t).map(([s,i])=>[s.toLowerCase(),i])),this.fetch=Fy(r),this.namespace=n}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=q(q({},this.headers),{},{[e.toLowerCase()]:t}),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(r){if(t.shouldThrowOnError)throw r;if(qi(r))return{data:null,error:r};throw r}}},Jy=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(qi(t))return{data:null,error:t};throw t}}};let Lf;Lf=Symbol.toStringTag;var Qy=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[Lf]="BlobDownloadBuilder",this.promise=null}asStream(){return new Jy(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(qi(t))return{data:null,error:t};throw t}}};const Xy={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},_u={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Zy=class extends Bn{constructor(e,t={},r,n){super(e,t,n,"storage"),this.bucketId=r}async uploadOrUpdate(e,t,r,n){var s=this;return s.handleOperation(async()=>{let i;const o=q(q({},_u),n);let l=q(q({},s.headers),e==="POST"&&{"x-upsert":String(o.upsert)});const c=o.metadata;typeof Blob<"u"&&r instanceof Blob?(i=new FormData,i.append("cacheControl",o.cacheControl),c&&i.append("metadata",s.encodeMetadata(c)),i.append("",r)):typeof FormData<"u"&&r instanceof FormData?(i=r,i.has("cacheControl")||i.append("cacheControl",o.cacheControl),c&&!i.has("metadata")&&i.append("metadata",s.encodeMetadata(c))):(i=r,l["cache-control"]=`max-age=${o.cacheControl}`,l["content-type"]=o.contentType,c&&(l["x-metadata"]=s.toBase64(s.encodeMetadata(c))),(typeof ReadableStream<"u"&&i instanceof ReadableStream||i&&typeof i=="object"&&"pipe"in i&&typeof i.pipe=="function")&&!o.duplex&&(o.duplex="half")),n!=null&&n.headers&&(l=q(q({},l),n.headers));const d=s._removeEmptyFolders(t),h=s._getFinalPath(d),u=await(e=="PUT"?Ll:kt)(s.fetch,`${s.url}/object/${h}`,i,q({headers:l},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{path:d,id:u.Id,fullPath:u.Key}})}async upload(e,t,r){return this.uploadOrUpdate("POST",e,t,r)}async uploadToSignedUrl(e,t,r,n){var s=this;const i=s._removeEmptyFolders(e),o=s._getFinalPath(i),l=new URL(s.url+`/object/upload/sign/${o}`);return l.searchParams.set("token",t),s.handleOperation(async()=>{let c;const d=q(q({},_u),n),h=q(q({},s.headers),{"x-upsert":String(d.upsert)});return typeof Blob<"u"&&r instanceof Blob?(c=new FormData,c.append("cacheControl",d.cacheControl),c.append("",r)):typeof FormData<"u"&&r instanceof FormData?(c=r,c.append("cacheControl",d.cacheControl)):(c=r,h["cache-control"]=`max-age=${d.cacheControl}`,h["content-type"]=d.contentType),{path:i,fullPath:(await Ll(s.fetch,l.toString(),c,{headers:h})).Key}})}async createSignedUploadUrl(e,t){var r=this;return r.handleOperation(async()=>{let n=r._getFinalPath(e);const s=q({},r.headers);t!=null&&t.upsert&&(s["x-upsert"]="true");const i=await kt(r.fetch,`${r.url}/object/upload/sign/${n}`,{},{headers:s}),o=new URL(r.url+i.url),l=o.searchParams.get("token");if(!l)throw new Wi("No token returned by API");return{signedUrl:o.toString(),path:e,token:l}})}async update(e,t,r){return this.uploadOrUpdate("PUT",e,t,r)}async move(e,t,r){var n=this;return n.handleOperation(async()=>await kt(n.fetch,`${n.url}/object/move`,{bucketId:n.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:n.headers}))}async copy(e,t,r){var n=this;return n.handleOperation(async()=>({path:(await kt(n.fetch,`${n.url}/object/copy`,{bucketId:n.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:n.headers})).Key}))}async createSignedUrl(e,t,r){var n=this;return n.handleOperation(async()=>{let s=n._getFinalPath(e);const i=typeof(r==null?void 0:r.transform)=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let o=await kt(n.fetch,`${n.url}/object/sign/${s}`,q({expiresIn:t},i?{transform:r.transform}:{}),{headers:n.headers});const l=new URLSearchParams;r!=null&&r.download&&l.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&l.set("cacheNonce",String(r.cacheNonce));const c=l.toString();return{signedUrl:encodeURI(`${n.url}${o.signedURL}${c?`&${c}`:""}`)}})}async createSignedUrls(e,t,r){var n=this;return n.handleOperation(async()=>{const s=await kt(n.fetch,`${n.url}/object/sign/${n.bucketId}`,{expiresIn:t,paths:e},{headers:n.headers}),i=new URLSearchParams;r!=null&&r.download&&i.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&i.set("cacheNonce",String(r.cacheNonce));const o=i.toString();return s.map(l=>q(q({},l),{},{signedUrl:l.signedURL?encodeURI(`${n.url}${l.signedURL}${o?`&${o}`:""}`):null}))})}download(e,t,r){const n=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0?"render/image/authenticated":"object",s=new URLSearchParams;t!=null&&t.transform&&this.applyTransformOptsToQuery(s,t.transform),(t==null?void 0:t.cacheNonce)!=null&&s.set("cacheNonce",String(t.cacheNonce));const i=s.toString(),o=this._getFinalPath(e),l=()=>Va(this.fetch,`${this.url}/${n}/${o}${i?`?${i}`:""}`,{headers:this.headers,noResolveJson:!0},r);return new Qy(l,this.shouldThrowOnError)}async info(e){var t=this;const r=t._getFinalPath(e);return t.handleOperation(async()=>Ol(await Va(t.fetch,`${t.url}/object/info/${r}`,{headers:t.headers})))}async exists(e){var t=this;const r=t._getFinalPath(e);try{return await Yy(t.fetch,`${t.url}/object/${r}`,{headers:t.headers}),{data:!0,error:null}}catch(s){if(t.shouldThrowOnError)throw s;if(qi(s)){var n;const i=s instanceof Rl?s.status:s instanceof Rf?(n=s.originalError)===null||n===void 0?void 0:n.status:void 0;if(i!==void 0&&[400,404].includes(i))return{data:!1,error:s}}throw s}}getPublicUrl(e,t){const r=this._getFinalPath(e),n=new URLSearchParams;t!=null&&t.download&&n.set("download",t.download===!0?"":t.download),t!=null&&t.transform&&this.applyTransformOptsToQuery(n,t.transform),(t==null?void 0:t.cacheNonce)!=null&&n.set("cacheNonce",String(t.cacheNonce));const s=n.toString(),i=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${i}/public/${r}`)+(s?`?${s}`:"")}}}async remove(e){var t=this;return t.handleOperation(async()=>await Hc(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async list(e,t,r){var n=this;return n.handleOperation(async()=>{const s=q(q(q({},Xy),t),{},{prefix:e||""});return await kt(n.fetch,`${n.url}/object/list/${n.bucketId}`,s,{headers:n.headers},r)})}async listV2(e,t){var r=this;return r.handleOperation(async()=>{const n=q({},e);return await kt(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,n,{headers:r.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(e,t){return t.width&&e.set("width",t.width.toString()),t.height&&e.set("height",t.height.toString()),t.resize&&e.set("resize",t.resize),t.format&&e.set("format",t.format),t.quality&&e.set("quality",t.quality.toString()),e}};const e0="2.103.3",as={"X-Client-Info":`storage-js/${e0}`};var t0=class extends Bn{constructor(e,t={},r,n){const s=new URL(e);n!=null&&n.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const i=s.href.replace(/\/$/,""),o=q(q({},as),t);super(i,o,r,"storage")}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const r=t.listBucketOptionsToQueryString(e);return await Va(t.fetch,`${t.url}/bucket${r}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await Va(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var r=this;return r.handleOperation(async()=>await kt(r.fetch,`${r.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers}))}async updateBucket(e,t){var r=this;return r.handleOperation(async()=>await Ll(r.fetch,`${r.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await kt(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Hc(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}},r0=class extends Bn{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=q(q({},as),t);super(n,s,r,"storage")}async createBucket(e){var t=this;return t.handleOperation(async()=>await kt(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const r=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&r.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&r.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&r.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&r.set("sortOrder",e.sortOrder),e!=null&&e.search&&r.set("search",e.search);const n=r.toString(),s=n?`${t.url}/bucket?${n}`:`${t.url}/bucket`;return await Va(t.fetch,s,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Hc(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!Wy(e))throw new Wi("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new Uy({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:async()=>t.headers},fetch:this.fetch}),n=this.shouldThrowOnError;return new Proxy(r,{get(s,i){const o=s[i];return typeof o!="function"?o:async(...l)=>{try{return{data:await o.apply(s,l),error:null}}catch(c){if(n)throw c;return{data:null,error:c}}}}})}},n0=class extends Bn{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=q(q({},as),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async createIndex(e){var t=this;return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var r=this;return r.handleOperation(async()=>await st.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var r=this;return r.handleOperation(async()=>await st.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers})||{})}},a0=class extends Bn{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=q(q({},as),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},s0=class extends Bn{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=q(q({},as),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async createBucket(e){var t=this;return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await st.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},i0=class extends s0{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new o0(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,r=this;return t().call(r,e)}async getBucket(e){var t=()=>super.getBucket,r=this;return t().call(r,e)}async listBuckets(e={}){var t=()=>super.listBuckets,r=this;return t().call(r,e)}async deleteBucket(e){var t=()=>super.deleteBucket,r=this;return t().call(r,e)}},o0=class extends n0{constructor(e,t,r,n){super(e,t,n),this.vectorBucketName=r}async createIndex(e){var t=()=>super.createIndex,r=this;return t().call(r,q(q({},e),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,r=this;return t().call(r,q(q({},e),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,r=this;return t().call(r,r.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,r=this;return t().call(r,r.vectorBucketName,e)}index(e){return new l0(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},l0=class extends a0{constructor(e,t,r,n,s){super(e,t,s),this.vectorBucketName=r,this.indexName=n}async putVectors(e){var t=()=>super.putVectors,r=this;return t().call(r,q(q({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(e){var t=()=>super.getVectors,r=this;return t().call(r,q(q({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,r=this;return t().call(r,q(q({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,r=this;return t().call(r,q(q({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,r=this;return t().call(r,q(q({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},c0=class extends t0{constructor(e,t={},r,n){super(e,t,r,n)}from(e){return new Zy(this.url,this.headers,e,this.fetch)}get vectors(){return new i0(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new r0(this.url+"/iceberg",this.headers,this.fetch)}};const If="2.103.3",an=30*1e3,Il=3,wo=Il*an,d0="http://localhost:9999",u0="supabase.auth.token",h0={"X-Client-Info":`gotrue-js/${If}`},$l="X-Supabase-Api-Version",$f={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},p0=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,f0=10*60*1e3;class Ka extends Error{constructor(t,r,n){super(t),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=n}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function B(e){return typeof e=="object"&&e!==null&&"__isAuthError"in e}class m0 extends Ka{constructor(t,r,n){super(t,r,n),this.name="AuthApiError",this.status=r,this.code=n}}function g0(e){return B(e)&&e.name==="AuthApiError"}class zr extends Ka{constructor(t,r){super(t),this.name="AuthUnknownError",this.originalError=r}}class er extends Ka{constructor(t,r,n,s){super(t,n,s),this.name=r,this.status=n}}class nt extends er{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Ts(e){return B(e)&&e.name==="AuthSessionMissingError"}class Qr extends er{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Es extends er{constructor(t){super(t,"AuthInvalidCredentialsError",400,void 0)}}class As extends er{constructor(t,r=null){super(t,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function x0(e){return B(e)&&e.name==="AuthImplicitGrantRedirectError"}class Cu extends er{constructor(t,r=null){super(t,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class v0 extends er{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Ul extends er{constructor(t,r){super(t,"AuthRetryableFetchError",r,void 0)}}function ko(e){return B(e)&&e.name==="AuthRetryableFetchError"}class Tu extends er{constructor(t,r,n){super(t,"AuthWeakPasswordError",r,"weak_password"),this.reasons=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class Dl extends er{constructor(t){super(t,"AuthInvalidJwtError",400,"invalid_jwt")}}const ki="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Eu=` 	
\r=`.split(""),y0=(()=>{const e=new Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<Eu.length;t+=1)e[Eu[t].charCodeAt(0)]=-2;for(let t=0;t<ki.length;t+=1)e[ki[t].charCodeAt(0)]=t;return e})();function Au(e,t,r){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;){const n=t.queue>>t.queuedBits-6&63;r(ki[n]),t.queuedBits-=6}else if(t.queuedBits>0)for(t.queue=t.queue<<6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;){const n=t.queue>>t.queuedBits-6&63;r(ki[n]),t.queuedBits-=6}}function Uf(e,t,r){const n=y0[e];if(n>-1)for(t.queue=t.queue<<6|n,t.queuedBits+=6;t.queuedBits>=8;)r(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else{if(n===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}}function Pu(e){const t=[],r=o=>{t.push(String.fromCodePoint(o))},n={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},i=o=>{k0(o,n,r)};for(let o=0;o<e.length;o+=1)Uf(e.charCodeAt(o),s,i);return t.join("")}function b0(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function w0(e,t){for(let r=0;r<e.length;r+=1){let n=e.charCodeAt(r);if(n>55295&&n<=56319){const s=(n-55296)*1024&65535;n=(e.charCodeAt(r+1)-56320&65535|s)+65536,r+=1}b0(n,t)}}function k0(e,t,r){if(t.utf8seq===0){if(e<=127){r(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw new Error("Invalid UTF-8 sequence");t.utf8seq-=1}else if(t.utf8seq>0){if(e<=127)throw new Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|e&63,t.utf8seq-=1,t.utf8seq===0&&r(t.codepoint)}}function Cn(e){const t=[],r={queue:0,queuedBits:0},n=s=>{t.push(s)};for(let s=0;s<e.length;s+=1)Uf(e.charCodeAt(s),r,n);return new Uint8Array(t)}function j0(e){const t=[];return w0(e,r=>t.push(r)),new Uint8Array(t)}function Ir(e){const t=[],r={queue:0,queuedBits:0},n=s=>{t.push(s)};return e.forEach(s=>Au(s,r,n)),Au(null,r,n),t.join("")}function N0(e){return Math.round(Date.now()/1e3)+e}function S0(){return Symbol("auth-callback")}const Le=()=>typeof window<"u"&&typeof document<"u",Cr={tested:!1,writable:!1},Df=()=>{if(!Le())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Cr.tested)return Cr.writable;const e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),Cr.tested=!0,Cr.writable=!0}catch{Cr.tested=!0,Cr.writable=!1}return Cr.writable};function _0(e){const t={},r=new URL(e);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((s,i)=>{t[i]=s})}catch{}return r.searchParams.forEach((n,s)=>{t[s]=n}),t}const Bf=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),C0=e=>typeof e=="object"&&e!==null&&"status"in e&&"ok"in e&&"json"in e&&typeof e.json=="function",sn=async(e,t,r)=>{await e.setItem(t,JSON.stringify(r))},Tr=async(e,t)=>{const r=await e.getItem(t);if(!r)return null;try{return JSON.parse(r)}catch{return r}},Oe=async(e,t)=>{await e.removeItem(t)};class Gi{constructor(){this.promise=new Gi.promiseConstructor((t,r)=>{this.resolve=t,this.reject=r})}}Gi.promiseConstructor=Promise;function Ps(e){const t=e.split(".");if(t.length!==3)throw new Dl("Invalid JWT structure");for(let n=0;n<t.length;n++)if(!p0.test(t[n]))throw new Dl("JWT not in base64url format");return{header:JSON.parse(Pu(t[0])),payload:JSON.parse(Pu(t[1])),signature:Cn(t[2]),raw:{header:t[0],payload:t[1]}}}async function T0(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function E0(e,t){return new Promise((n,s)=>{(async()=>{for(let i=0;i<1/0;i++)try{const o=await e(i);if(!t(i,null,o)){n(o);return}}catch(o){if(!t(i,o)){s(o);return}}})()})}function A0(e){return("0"+e.toString(16)).substr(-2)}function P0(){const t=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=r.length;let s="";for(let i=0;i<56;i++)s+=r.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(t),Array.from(t,A0).join("")}async function z0(e){const r=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",r),s=new Uint8Array(n);return Array.from(s).map(i=>String.fromCharCode(i)).join("")}async function R0(e){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),e;const r=await z0(e);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Xr(e,t,r=!1){const n=P0();let s=n;r&&(s+="/PASSWORD_RECOVERY"),await sn(e,`${t}-code-verifier`,s);const i=await R0(n);return[i,n===i?"plain":"s256"]}const O0=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function L0(e){const t=e.headers.get($l);if(!t||!t.match(O0))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function I0(e){if(!e)throw new Error("Missing exp claim");const t=Math.floor(Date.now()/1e3);if(e<=t)throw new Error("JWT has expired")}function $0(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const U0=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Zr(e){if(!U0.test(e))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function jo(){const e={};return new Proxy(e,{get:(t,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const n=r.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(t,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(t,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function D0(e,t){return new Proxy(e,{get:(r,n,s)=>{if(n==="__isInsecureUserWarningProxy")return!0;if(typeof n=="symbol"){const i=n.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)"||i==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,n,s)}return!t.value&&typeof n=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),t.value=!0),Reflect.get(r,n,s)}})}function zu(e){return JSON.parse(JSON.stringify(e))}const Pr=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),B0=[502,503,504,520,521,522,523,524,530];async function Ru(e){var t;if(!C0(e))throw new Ul(Pr(e),0);if(B0.includes(e.status))throw new Ul(Pr(e),e.status);let r;try{r=await e.json()}catch(i){throw new zr(Pr(i),i)}let n;const s=L0(e);if(s&&s.getTime()>=$f["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?n=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(n=r.error_code),n){if(n==="weak_password")throw new Tu(Pr(r),e.status,((t=r.weak_password)===null||t===void 0?void 0:t.reasons)||[]);if(n==="session_not_found")throw new nt}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((i,o)=>i&&typeof o=="string",!0))throw new Tu(Pr(r),e.status,r.weak_password.reasons);throw new m0(Pr(r),e.status||500,n)}const M0=(e,t,r,n)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t==null?void 0:t.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),r))};async function W(e,t,r,n){var s;const i=Object.assign({},n==null?void 0:n.headers);i[$l]||(i[$l]=$f["2024-01-01"].name),n!=null&&n.jwt&&(i.Authorization=`Bearer ${n.jwt}`);const o=(s=n==null?void 0:n.query)!==null&&s!==void 0?s:{};n!=null&&n.redirectTo&&(o.redirect_to=n.redirectTo);const l=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",c=await F0(e,t,r+l,{headers:i,noResolveJson:n==null?void 0:n.noResolveJson},{},n==null?void 0:n.body);return n!=null&&n.xform?n==null?void 0:n.xform(c):{data:Object.assign({},c),error:null}}async function F0(e,t,r,n,s,i){const o=M0(t,n,s,i);let l;try{l=await e(r,Object.assign({},o))}catch(c){throw console.error(c),new Ul(Pr(c),0)}if(l.ok||await Ru(l),n!=null&&n.noResolveJson)return l;try{return await l.json()}catch(c){await Ru(c)}}function bt(e){var t;let r=null;q0(e)&&(r=Object.assign({},e),e.expires_at||(r.expires_at=N0(e.expires_in)));const n=(t=e.user)!==null&&t!==void 0?t:e;return{data:{session:r,user:n},error:null}}function Ou(e){const t=bt(e);return!t.error&&e.weak_password&&typeof e.weak_password=="object"&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message=="string"&&e.weak_password.reasons.reduce((r,n)=>r&&typeof n=="string",!0)&&(t.data.weak_password=e.weak_password),t}function or(e){var t;return{data:{user:(t=e.user)!==null&&t!==void 0?t:e},error:null}}function H0(e){return{data:e,error:null}}function W0(e){const{action_link:t,email_otp:r,hashed_token:n,redirect_to:s,verification_type:i}=e,o=Hi(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),l={action_link:t,email_otp:r,hashed_token:n,redirect_to:s,verification_type:i},c=Object.assign({},o);return{data:{properties:l,user:c},error:null}}function Lu(e){return e}function q0(e){return e.access_token&&e.refresh_token&&e.expires_in}const No=["global","local","others"];class G0{constructor({url:t="",headers:r={},fetch:n}){this.url=t,this.headers=r,this.fetch=Bf(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(t,r=No[0]){if(No.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${No.join(", ")}`);try{return await W(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:t,noResolveJson:!0}),{data:null,error:null}}catch(n){if(B(n))return{data:null,error:n};throw n}}async inviteUserByEmail(t,r={}){try{return await W(this.fetch,"POST",`${this.url}/invite`,{body:{email:t,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:or})}catch(n){if(B(n))return{data:{user:null},error:n};throw n}}async generateLink(t){try{const{options:r}=t,n=Hi(t,["options"]),s=Object.assign(Object.assign({},n),r);return"newEmail"in n&&(s.new_email=n==null?void 0:n.newEmail,delete s.newEmail),await W(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:W0,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(B(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(t){try{return await W(this.fetch,"POST",`${this.url}/admin/users`,{body:t,headers:this.headers,xform:or})}catch(r){if(B(r))return{data:{user:null},error:r};throw r}}async listUsers(t){var r,n,s,i,o,l,c;try{const d={nextPage:null,lastPage:0,total:0},h=await W(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=t==null?void 0:t.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(i=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:""},xform:Lu});if(h.error)throw h.error;const u=await h.json(),p=(o=h.headers.get("x-total-count"))!==null&&o!==void 0?o:0,x=(c=(l=h.headers.get("link"))===null||l===void 0?void 0:l.split(","))!==null&&c!==void 0?c:[];return x.length>0&&(x.forEach(y=>{const b=parseInt(y.split(";")[0].split("=")[1].substring(0,1)),w=JSON.parse(y.split(";")[1].split("=")[1]);d[`${w}Page`]=b}),d.total=parseInt(p)),{data:Object.assign(Object.assign({},u),d),error:null}}catch(d){if(B(d))return{data:{users:[]},error:d};throw d}}async getUserById(t){Zr(t);try{return await W(this.fetch,"GET",`${this.url}/admin/users/${t}`,{headers:this.headers,xform:or})}catch(r){if(B(r))return{data:{user:null},error:r};throw r}}async updateUserById(t,r){Zr(t);try{return await W(this.fetch,"PUT",`${this.url}/admin/users/${t}`,{body:r,headers:this.headers,xform:or})}catch(n){if(B(n))return{data:{user:null},error:n};throw n}}async deleteUser(t,r=!1){Zr(t);try{return await W(this.fetch,"DELETE",`${this.url}/admin/users/${t}`,{headers:this.headers,body:{should_soft_delete:r},xform:or})}catch(n){if(B(n))return{data:{user:null},error:n};throw n}}async _listFactors(t){Zr(t.userId);try{const{data:r,error:n}=await W(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:r,error:n}}catch(r){if(B(r))return{data:null,error:r};throw r}}async _deleteFactor(t){Zr(t.userId),Zr(t.id);try{return{data:await W(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/factors/${t.id}`,{headers:this.headers}),error:null}}catch(r){if(B(r))return{data:null,error:r};throw r}}async _listOAuthClients(t){var r,n,s,i,o,l,c;try{const d={nextPage:null,lastPage:0,total:0},h=await W(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=t==null?void 0:t.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(i=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:""},xform:Lu});if(h.error)throw h.error;const u=await h.json(),p=(o=h.headers.get("x-total-count"))!==null&&o!==void 0?o:0,x=(c=(l=h.headers.get("link"))===null||l===void 0?void 0:l.split(","))!==null&&c!==void 0?c:[];return x.length>0&&(x.forEach(y=>{const b=parseInt(y.split(";")[0].split("=")[1].substring(0,1)),w=JSON.parse(y.split(";")[1].split("=")[1]);d[`${w}Page`]=b}),d.total=parseInt(p)),{data:Object.assign(Object.assign({},u),d),error:null}}catch(d){if(B(d))return{data:{clients:[]},error:d};throw d}}async _createOAuthClient(t){try{return await W(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:t,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _getOAuthClient(t){try{return await W(this.fetch,"GET",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _updateOAuthClient(t,r){try{return await W(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${t}`,{body:r,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(B(n))return{data:null,error:n};throw n}}async _deleteOAuthClient(t){try{return await W(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(B(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(t){try{return await W(this.fetch,"POST",`${this.url}/admin/oauth/clients/${t}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _listCustomProviders(t){try{const r={};return t!=null&&t.type&&(r.type=t.type),await W(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:n=>{var s;return{data:{providers:(s=n==null?void 0:n.providers)!==null&&s!==void 0?s:[]},error:null}}})}catch(r){if(B(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(t){try{return await W(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:t,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _getCustomProvider(t){try{return await W(this.fetch,"GET",`${this.url}/admin/custom-providers/${t}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(B(r))return{data:null,error:r};throw r}}async _updateCustomProvider(t,r){try{return await W(this.fetch,"PUT",`${this.url}/admin/custom-providers/${t}`,{body:r,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(B(n))return{data:null,error:n};throw n}}async _deleteCustomProvider(t){try{return await W(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(B(r))return{data:null,error:r};throw r}}}function Iu(e={}){return{getItem:t=>e[t]||null,setItem:(t,r)=>{e[t]=r},removeItem:t=>{delete e[t]}}}const Et={debug:!!(globalThis&&Df()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Mf extends Error{constructor(t){super(t),this.isAcquireTimeout=!0}}class $u extends Mf{}async function V0(e,t,r){Et.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",e,t);const n=new globalThis.AbortController;let s;t>0&&(s=setTimeout(()=>{n.abort(),Et.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",e)},t)),await Promise.resolve();try{return await globalThis.navigator.locks.request(e,t===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async i=>{if(i){clearTimeout(s),Et.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",e,i.name);try{return await r()}finally{Et.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",e,i.name)}}else{if(t===0)throw Et.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",e),new $u(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if(Et.debug)try{const o=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(o,null,"  "))}catch(o){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",o)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),clearTimeout(s),await r()}})}catch(i){if(t>0&&clearTimeout(s),(i==null?void 0:i.name)==="AbortError"&&t>0){if(n.signal.aborted)return Et.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",e),console.warn(`@supabase/gotrue-js: Lock "${e}" was not released within ${t}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,{mode:"exclusive",steal:!0},async o=>{if(o){Et.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",e,o.name);try{return await r()}finally{Et.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",e,o.name)}}else return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await r()}));throw Et.debug&&console.log("@supabase/gotrue-js: navigatorLock: lock was stolen by another request",e),new $u(`Lock "${e}" was released because another request stole it`)}throw i}}function K0(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Ff(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function Y0(e){return parseInt(e,16)}function J0(e){const t=new TextEncoder().encode(e);return"0x"+Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}function Q0(e){var t;const{chainId:r,domain:n,expirationTime:s,issuedAt:i=new Date,nonce:o,notBefore:l,requestId:c,resources:d,scheme:h,uri:u,version:p}=e;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!n)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(o&&o.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((t=e.statement)===null||t===void 0)&&t.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`)}const x=Ff(e.address),y=h?`${h}://${n}`:n,b=e.statement?`${e.statement}
`:"",w=`${y} wants you to sign in with your Ethereum account:
${x}

${b}`;let g=`URI: ${u}
Version: ${p}
Chain ID: ${r}${o?`
Nonce: ${o}`:""}
Issued At: ${i.toISOString()}`;if(s&&(g+=`
Expiration Time: ${s.toISOString()}`),l&&(g+=`
Not Before: ${l.toISOString()}`),c&&(g+=`
Request ID: ${c}`),d){let f=`
Resources:`;for(const m of d){if(!m||typeof m!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${m}`);f+=`
- ${m}`}g+=f}return`${w}
${g}`}class je extends Error{constructor({message:t,code:r,cause:n,name:s}){var i;super(t,{cause:n}),this.__isWebAuthnError=!0,this.name=(i=s??(n instanceof Error?n.name:void 0))!==null&&i!==void 0?i:"Unknown Error",this.code=r}}class ji extends je{constructor(t,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:t}),this.name="WebAuthnUnknownError",this.originalError=r}}function X0({error:e,options:t}){var r,n,s;const{publicKey:i}=t;if(!i)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new je({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if(e.name==="ConstraintError"){if(((r=i.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new je({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if(t.mediation==="conditional"&&((n=i.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new je({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if(((s=i.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new je({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if(e.name==="InvalidStateError")return new je({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if(e.name==="NotAllowedError")return new je({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="NotSupportedError")return i.pubKeyCredParams.filter(l=>l.type==="public-key").length===0?new je({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new je({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if(e.name==="SecurityError"){const o=window.location.hostname;if(Hf(o)){if(i.rp.id!==o)return new je({message:`The RP ID "${i.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new je({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="TypeError"){if(i.user.id.byteLength<1||i.user.id.byteLength>64)return new je({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if(e.name==="UnknownError")return new je({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new je({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}function Z0({error:e,options:t}){const{publicKey:r}=t;if(!r)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new je({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if(e.name==="NotAllowedError")return new je({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="SecurityError"){const n=window.location.hostname;if(Hf(n)){if(r.rpId!==n)return new je({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new je({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="UnknownError")return new je({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new je({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}class eb{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){const t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}}const tb=new eb;function rb(e){if(!e)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(e);const{challenge:t,user:r,excludeCredentials:n}=e,s=Hi(e,["challenge","user","excludeCredentials"]),i=Cn(t).buffer,o=Object.assign(Object.assign({},r),{id:Cn(r.id).buffer}),l=Object.assign(Object.assign({},s),{challenge:i,user:o});if(n&&n.length>0){l.excludeCredentials=new Array(n.length);for(let c=0;c<n.length;c++){const d=n[c];l.excludeCredentials[c]=Object.assign(Object.assign({},d),{id:Cn(d.id).buffer,type:d.type||"public-key",transports:d.transports})}}return l}function nb(e){if(!e)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(e);const{challenge:t,allowCredentials:r}=e,n=Hi(e,["challenge","allowCredentials"]),s=Cn(t).buffer,i=Object.assign(Object.assign({},n),{challenge:s});if(r&&r.length>0){i.allowCredentials=new Array(r.length);for(let o=0;o<r.length;o++){const l=r[o];i.allowCredentials[o]=Object.assign(Object.assign({},l),{id:Cn(l.id).buffer,type:l.type||"public-key",transports:l.transports})}}return i}function ab(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const r=e;return{id:e.id,rawId:e.id,response:{attestationObject:Ir(new Uint8Array(e.response.attestationObject)),clientDataJSON:Ir(new Uint8Array(e.response.clientDataJSON))},type:"public-key",clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:(t=r.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function sb(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const r=e,n=e.getClientExtensionResults(),s=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:Ir(new Uint8Array(s.authenticatorData)),clientDataJSON:Ir(new Uint8Array(s.clientDataJSON)),signature:Ir(new Uint8Array(s.signature)),userHandle:s.userHandle?Ir(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:n,authenticatorAttachment:(t=r.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function Hf(e){return e==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function Uu(){var e,t;return!!(Le()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.create)=="function"&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.get)=="function")}async function ib(e){try{const t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new ji("Browser returned unexpected credential type",t)}:{data:null,error:new ji("Empty credential response",t)}}catch(t){return{data:null,error:X0({error:t,options:e})}}}async function ob(e){try{const t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new ji("Browser returned unexpected credential type",t)}:{data:null,error:new ji("Empty credential response",t)}}catch(t){return{data:null,error:Z0({error:t,options:e})}}}const lb={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},cb={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Ni(...e){const t=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),r=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),n={};for(const s of e)if(s)for(const i in s){const o=s[i];if(o!==void 0)if(Array.isArray(o))n[i]=o;else if(r(o))n[i]=o;else if(t(o)){const l=n[i];t(l)?n[i]=Ni(l,o):n[i]=Ni(o)}else n[i]=o}return n}function db(e,t){return Ni(lb,e,t||{})}function ub(e,t){return Ni(cb,e,t||{})}class hb{constructor(t){this.client=t,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(t){return this.client.mfa.enroll(Object.assign(Object.assign({},t),{factorType:"webauthn"}))}async _challenge({factorId:t,webauthn:r,friendlyName:n,signal:s},i){var o;try{const{data:l,error:c}=await this.client.mfa.challenge({factorId:t,webauthn:r});if(!l)return{data:null,error:c};const d=s??tb.createNewAbortSignal();if(l.webauthn.type==="create"){const{user:h}=l.webauthn.credential_options.publicKey;if(!h.name){const u=n;if(u)h.name=`${h.id}:${u}`;else{const x=(await this.client.getUser()).data.user,y=((o=x==null?void 0:x.user_metadata)===null||o===void 0?void 0:o.name)||(x==null?void 0:x.email)||(x==null?void 0:x.id)||"User";h.name=`${h.id}:${y}`}}h.displayName||(h.displayName=h.name)}switch(l.webauthn.type){case"create":{const h=db(l.webauthn.credential_options.publicKey,i==null?void 0:i.create),{data:u,error:p}=await ib({publicKey:h,signal:d});return u?{data:{factorId:t,challengeId:l.id,webauthn:{type:l.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}case"request":{const h=ub(l.webauthn.credential_options.publicKey,i==null?void 0:i.request),{data:u,error:p}=await ob(Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:h,signal:d}));return u?{data:{factorId:t,challengeId:l.id,webauthn:{type:l.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}}}catch(l){return B(l)?{data:null,error:l}:{data:null,error:new zr("Unexpected error in challenge",l)}}}async _verify({challengeId:t,factorId:r,webauthn:n}){return this.client.mfa.verify({factorId:r,challengeId:t,webauthn:n})}async _authenticate({factorId:t,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},i){if(!r)return{data:null,error:new Ka("rpId is required for WebAuthn authentication")};try{if(!Uu())return{data:null,error:new zr("Browser does not support WebAuthn",null)};const{data:o,error:l}=await this.challenge({factorId:t,webauthn:{rpId:r,rpOrigins:n},signal:s},{request:i});if(!o)return{data:null,error:l};const{webauthn:c}=o;return this._verify({factorId:t,challengeId:o.challengeId,webauthn:{type:c.type,rpId:r,rpOrigins:n,credential_response:c.credential_response}})}catch(o){return B(o)?{data:null,error:o}:{data:null,error:new zr("Unexpected error in authenticate",o)}}}async _register({friendlyName:t,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},i){if(!r)return{data:null,error:new Ka("rpId is required for WebAuthn registration")};try{if(!Uu())return{data:null,error:new zr("Browser does not support WebAuthn",null)};const{data:o,error:l}=await this._enroll({friendlyName:t});if(!o)return await this.client.mfa.listFactors().then(h=>{var u;return(u=h.data)===null||u===void 0?void 0:u.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===t&&p.status!=="unverified")}).then(h=>h?this.client.mfa.unenroll({factorId:h==null?void 0:h.id}):void 0),{data:null,error:l};const{data:c,error:d}=await this._challenge({factorId:o.id,friendlyName:o.friendly_name,webauthn:{rpId:r,rpOrigins:n},signal:s},{create:i});return c?this._verify({factorId:o.id,challengeId:c.challengeId,webauthn:{rpId:r,rpOrigins:n,type:c.webauthn.type,credential_response:c.webauthn.credential_response}}):{data:null,error:d}}catch(o){return B(o)?{data:null,error:o}:{data:null,error:new zr("Unexpected error in register",o)}}}}K0();const pb={url:d0,storageKey:u0,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:h0,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function Du(e,t,r){return await r()}const en={};class Ya{get jwks(){var t,r;return(r=(t=en[this.storageKey])===null||t===void 0?void 0:t.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(t){en[this.storageKey]=Object.assign(Object.assign({},en[this.storageKey]),{jwks:t})}get jwks_cached_at(){var t,r;return(r=(t=en[this.storageKey])===null||t===void 0?void 0:t.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(t){en[this.storageKey]=Object.assign(Object.assign({},en[this.storageKey]),{cachedAt:t})}constructor(t){var r,n,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const i=Object.assign(Object.assign({},pb),t);if(this.storageKey=i.storageKey,this.instanceID=(r=Ya.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,Ya.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.instanceID>0&&Le()){const o=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(o),this.logDebugMessages&&console.trace(o)}if(this.persistSession=i.persistSession,this.autoRefreshToken=i.autoRefreshToken,this.admin=new G0({url:i.url,headers:i.headers,fetch:i.fetch}),this.url=i.url,this.headers=i.headers,this.fetch=Bf(i.fetch),this.lock=i.lock||Du,this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,this.throwOnError=i.throwOnError,this.lockAcquireTimeout=i.lockAcquireTimeout,i.lock?this.lock=i.lock:this.persistSession&&Le()&&(!((n=globalThis==null?void 0:globalThis.navigator)===null||n===void 0)&&n.locks)?this.lock=V0:this.lock=Du,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new hb(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:Df()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Iu(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=Iu(this.memoryStorage)),Le()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(o){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",o)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async o=>{this._debug("received broadcast notification from other tab or client",o);try{await this._notifyAllSubscribers(o.data.event,o.data.session,!1)}catch(l){this._debug("#broadcastChannel","error",l)}})}i.skipAutoInitialize||this.initialize().catch(o=>{this._debug("#initialize()","error",o)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(t){if(this.throwOnError&&t&&t.error)throw t.error;return t}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${If}) ${new Date().toISOString()}`}_debug(...t){return this.logDebugMessages&&this.logger(this._logPrefix(),...t),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var t;try{let r={},n="none";if(Le()&&(r=_0(window.location.href),this._isImplicitGrantCallback(r)?n="implicit":await this._isPKCECallback(r)&&(n="pkce")),Le()&&this.detectSessionInUrl&&n!=="none"){const{data:s,error:i}=await this._getSessionFromURL(r,n);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),x0(i)){const c=(t=i.details)===null||t===void 0?void 0:t.code;if(c==="identity_already_exists"||c==="identity_not_found"||c==="single_identity_not_deletable")return{error:i}}return{error:i}}const{session:o,redirectType:l}=s;return this._debug("#_initialize()","detected session in URL",o,"redirect type",l),await this._saveSession(o),setTimeout(async()=>{l==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return B(r)?this._returnResult({error:r}):this._returnResult({error:new zr("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(t){var r,n,s;try{const i=await W(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(r=t==null?void 0:t.options)===null||r===void 0?void 0:r.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=t==null?void 0:t.options)===null||s===void 0?void 0:s.captchaToken}},xform:bt}),{data:o,error:l}=i;if(l||!o)return this._returnResult({data:{user:null,session:null},error:l});const c=o.session,d=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(i){if(B(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signUp(t){var r,n,s;try{let i;if("email"in t){const{email:h,password:u,options:p}=t;let x=null,y=null;this.flowType==="pkce"&&([x,y]=await Xr(this.storage,this.storageKey)),i=await W(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:p==null?void 0:p.emailRedirectTo,body:{email:h,password:u,data:(r=p==null?void 0:p.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken},code_challenge:x,code_challenge_method:y},xform:bt})}else if("phone"in t){const{phone:h,password:u,options:p}=t;i=await W(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:h,password:u,data:(n=p==null?void 0:p.data)!==null&&n!==void 0?n:{},channel:(s=p==null?void 0:p.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken}},xform:bt})}else throw new Es("You must provide either an email or phone number and a password");const{data:o,error:l}=i;if(l||!o)return await Oe(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:l});const c=o.session,d=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(i){if(await Oe(this.storage,`${this.storageKey}-code-verifier`),B(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signInWithPassword(t){try{let r;if("email"in t){const{email:i,password:o,options:l}=t;r=await W(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:i,password:o,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken}},xform:Ou})}else if("phone"in t){const{phone:i,password:o,options:l}=t;r=await W(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:i,password:o,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken}},xform:Ou})}else throw new Es("You must provide either an email or phone number and a password");const{data:n,error:s}=r;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!n||!n.session||!n.user){const i=new Qr;return this._returnResult({data:{user:null,session:null},error:i})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(r){if(B(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(t){var r,n,s,i;return await this._handleProviderSignIn(t.provider,{redirectTo:(r=t.options)===null||r===void 0?void 0:r.redirectTo,scopes:(n=t.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=t.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(i=t.options)===null||i===void 0?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(t){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(t))}async signInWithWeb3(t){const{chain:r}=t;switch(r){case"ethereum":return await this.signInWithEthereum(t);case"solana":return await this.signInWithSolana(t);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(t){var r,n,s,i,o,l,c,d,h,u,p;let x,y;if("message"in t)x=t.message,y=t.signature;else{const{chain:b,wallet:w,statement:g,options:f}=t;let m;if(Le())if(typeof w=="object")m=w;else{const G=window;if("ethereum"in G&&typeof G.ethereum=="object"&&"request"in G.ethereum&&typeof G.ethereum.request=="function")m=G.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof w!="object"||!(f!=null&&f.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");m=w}const k=new URL((r=f==null?void 0:f.url)!==null&&r!==void 0?r:window.location.href),N=await m.request({method:"eth_requestAccounts"}).then(G=>G).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!N||N.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const S=Ff(N[0]);let _=(n=f==null?void 0:f.signInWithEthereum)===null||n===void 0?void 0:n.chainId;if(!_){const G=await m.request({method:"eth_chainId"});_=Y0(G)}const L={domain:k.host,address:S,statement:g,uri:k.href,version:"1",chainId:_,nonce:(s=f==null?void 0:f.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(o=(i=f==null?void 0:f.signInWithEthereum)===null||i===void 0?void 0:i.issuedAt)!==null&&o!==void 0?o:new Date,expirationTime:(l=f==null?void 0:f.signInWithEthereum)===null||l===void 0?void 0:l.expirationTime,notBefore:(c=f==null?void 0:f.signInWithEthereum)===null||c===void 0?void 0:c.notBefore,requestId:(d=f==null?void 0:f.signInWithEthereum)===null||d===void 0?void 0:d.requestId,resources:(h=f==null?void 0:f.signInWithEthereum)===null||h===void 0?void 0:h.resources};x=Q0(L),y=await m.request({method:"personal_sign",params:[J0(x),S]})}try{const{data:b,error:w}=await W(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:x,signature:y},!((u=t.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(p=t.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:bt});if(w)throw w;if(!b||!b.session||!b.user){const g=new Qr;return this._returnResult({data:{user:null,session:null},error:g})}return b.session&&(await this._saveSession(b.session),await this._notifyAllSubscribers("SIGNED_IN",b.session)),this._returnResult({data:Object.assign({},b),error:w})}catch(b){if(B(b))return this._returnResult({data:{user:null,session:null},error:b});throw b}}async signInWithSolana(t){var r,n,s,i,o,l,c,d,h,u,p,x;let y,b;if("message"in t)y=t.message,b=t.signature;else{const{chain:w,wallet:g,statement:f,options:m}=t;let k;if(Le())if(typeof g=="object")k=g;else{const S=window;if("solana"in S&&typeof S.solana=="object"&&("signIn"in S.solana&&typeof S.solana.signIn=="function"||"signMessage"in S.solana&&typeof S.solana.signMessage=="function"))k=S.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof g!="object"||!(m!=null&&m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");k=g}const N=new URL((r=m==null?void 0:m.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in k&&k.signIn){const S=await k.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},m==null?void 0:m.signInWithSolana),{version:"1",domain:N.host,uri:N.href}),f?{statement:f}:null));let _;if(Array.isArray(S)&&S[0]&&typeof S[0]=="object")_=S[0];else if(S&&typeof S=="object"&&"signedMessage"in S&&"signature"in S)_=S;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in _&&"signature"in _&&(typeof _.signedMessage=="string"||_.signedMessage instanceof Uint8Array)&&_.signature instanceof Uint8Array)y=typeof _.signedMessage=="string"?_.signedMessage:new TextDecoder().decode(_.signedMessage),b=_.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in k)||typeof k.signMessage!="function"||!("publicKey"in k)||typeof k!="object"||!k.publicKey||!("toBase58"in k.publicKey)||typeof k.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");y=[`${N.host} wants you to sign in with your Solana account:`,k.publicKey.toBase58(),...f?["",f,""]:[""],"Version: 1",`URI: ${N.href}`,`Issued At: ${(s=(n=m==null?void 0:m.signInWithSolana)===null||n===void 0?void 0:n.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((i=m==null?void 0:m.signInWithSolana)===null||i===void 0)&&i.notBefore?[`Not Before: ${m.signInWithSolana.notBefore}`]:[],...!((o=m==null?void 0:m.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${m.signInWithSolana.expirationTime}`]:[],...!((l=m==null?void 0:m.signInWithSolana)===null||l===void 0)&&l.chainId?[`Chain ID: ${m.signInWithSolana.chainId}`]:[],...!((c=m==null?void 0:m.signInWithSolana)===null||c===void 0)&&c.nonce?[`Nonce: ${m.signInWithSolana.nonce}`]:[],...!((d=m==null?void 0:m.signInWithSolana)===null||d===void 0)&&d.requestId?[`Request ID: ${m.signInWithSolana.requestId}`]:[],...!((u=(h=m==null?void 0:m.signInWithSolana)===null||h===void 0?void 0:h.resources)===null||u===void 0)&&u.length?["Resources",...m.signInWithSolana.resources.map(_=>`- ${_}`)]:[]].join(`
`);const S=await k.signMessage(new TextEncoder().encode(y),"utf8");if(!S||!(S instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");b=S}}try{const{data:w,error:g}=await W(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:y,signature:Ir(b)},!((p=t.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(x=t.options)===null||x===void 0?void 0:x.captchaToken}}:null),xform:bt});if(g)throw g;if(!w||!w.session||!w.user){const f=new Qr;return this._returnResult({data:{user:null,session:null},error:f})}return w.session&&(await this._saveSession(w.session),await this._notifyAllSubscribers("SIGNED_IN",w.session)),this._returnResult({data:Object.assign({},w),error:g})}catch(w){if(B(w))return this._returnResult({data:{user:null,session:null},error:w});throw w}}async _exchangeCodeForSession(t){const r=await Tr(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(r??"").split("/");try{if(!n&&this.flowType==="pkce")throw new v0;const{data:i,error:o}=await W(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:t,code_verifier:n},xform:bt});if(await Oe(this.storage,`${this.storageKey}-code-verifier`),o)throw o;if(!i||!i.session||!i.user){const l=new Qr;return this._returnResult({data:{user:null,session:null,redirectType:null},error:l})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign(Object.assign({},i),{redirectType:s??null}),error:o})}catch(i){if(await Oe(this.storage,`${this.storageKey}-code-verifier`),B(i))return this._returnResult({data:{user:null,session:null,redirectType:null},error:i});throw i}}async signInWithIdToken(t){try{const{options:r,provider:n,token:s,access_token:i,nonce:o}=t,l=await W(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:i,nonce:o,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:bt}),{data:c,error:d}=l;if(d)return this._returnResult({data:{user:null,session:null},error:d});if(!c||!c.session||!c.user){const h=new Qr;return this._returnResult({data:{user:null,session:null},error:h})}return c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers("SIGNED_IN",c.session)),this._returnResult({data:c,error:d})}catch(r){if(B(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(t){var r,n,s,i,o;try{if("email"in t){const{email:l,options:c}=t;let d=null,h=null;this.flowType==="pkce"&&([d,h]=await Xr(this.storage,this.storageKey));const{error:u}=await W(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(r=c==null?void 0:c.data)!==null&&r!==void 0?r:{},create_user:(n=c==null?void 0:c.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:d,code_challenge_method:h},redirectTo:c==null?void 0:c.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in t){const{phone:l,options:c}=t,{data:d,error:h}=await W(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(s=c==null?void 0:c.data)!==null&&s!==void 0?s:{},create_user:(i=c==null?void 0:c.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(o=c==null?void 0:c.channel)!==null&&o!==void 0?o:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d==null?void 0:d.message_id},error:h})}throw new Es("You must provide either an email or phone number.")}catch(l){if(await Oe(this.storage,`${this.storageKey}-code-verifier`),B(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(t){var r,n;try{let s,i;"options"in t&&(s=(r=t.options)===null||r===void 0?void 0:r.redirectTo,i=(n=t.options)===null||n===void 0?void 0:n.captchaToken);const{data:o,error:l}=await W(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},t),{gotrue_meta_security:{captcha_token:i}}),redirectTo:s,xform:bt});if(l)throw l;if(!o)throw new Error("An error occurred on token verification.");const c=o.session,d=o.user;return c!=null&&c.access_token&&(await this._saveSession(c),await this._notifyAllSubscribers(t.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(s){if(B(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(t){var r,n,s,i,o;try{let l=null,c=null;this.flowType==="pkce"&&([l,c]=await Xr(this.storage,this.storageKey));const d=await W(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in t?{provider_id:t.providerId}:null),"domain"in t?{domain:t.domain}:null),{redirect_to:(n=(r=t.options)===null||r===void 0?void 0:r.redirectTo)!==null&&n!==void 0?n:void 0}),!((s=t==null?void 0:t.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:t.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:l,code_challenge_method:c}),headers:this.headers,xform:H0});return!((i=d.data)===null||i===void 0)&&i.url&&Le()&&!(!((o=t.options)===null||o===void 0)&&o.skipBrowserRedirect)&&window.location.assign(d.data.url),this._returnResult(d)}catch(l){if(await Oe(this.storage,`${this.storageKey}-code-verifier`),B(l))return this._returnResult({data:null,error:l});throw l}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async t=>{const{data:{session:r},error:n}=t;if(n)throw n;if(!r)throw new nt;const{error:s}=await W(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(t){if(B(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async resend(t){try{const r=`${this.url}/resend`;if("email"in t){const{email:n,type:s,options:i}=t,{error:o}=await W(this.fetch,"POST",r,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},redirectTo:i==null?void 0:i.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:o})}else if("phone"in t){const{phone:n,type:s,options:i}=t,{data:o,error:l}=await W(this.fetch,"POST",r,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:l})}throw new Es("You must provide either an email or phone number and a type")}catch(r){if(B(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async r=>r))}async _acquireLock(t,r){this._debug("#_acquireLock","begin",t);try{if(this.lockAcquired){const n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await r()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,t,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const n=r();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(t){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await t(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let t=null;const r=await Tr(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?t=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!t)return{data:{session:null},error:null};const n=t.expires_at?t.expires_at*1e3-Date.now()<wo:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",t.expires_at),!n){if(this.userStorage){const o=await Tr(this.userStorage,this.storageKey+"-user");o!=null&&o.user?t.user=o.user:t.user=jo()}if(this.storage.isServer&&t.user&&!t.user.__isUserNotAvailableProxy){const o={value:this.suppressGetSessionWarning};t.user=D0(t.user,o),o.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:t},error:null}}const{data:s,error:i}=await this._callRefreshToken(t.refresh_token);return i?this._returnResult({data:{session:null},error:i}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(t){if(t)return await this._getUser(t);await this.initializePromise;const r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(t){try{return t?await W(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t,xform:or}):await this._useSession(async r=>{var n,s,i;const{data:o,error:l}=r;if(l)throw l;return!(!((n=o.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new nt}:await W(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(i=(s=o.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0,xform:or})})}catch(r){if(B(r))return Ts(r)&&(await this._removeSession(),await Oe(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(t,r={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(t,r))}async _updateUser(t,r={}){try{return await this._useSession(async n=>{const{data:s,error:i}=n;if(i)throw i;if(!s.session)throw new nt;const o=s.session;let l=null,c=null;this.flowType==="pkce"&&t.email!=null&&([l,c]=await Xr(this.storage,this.storageKey));const{data:d,error:h}=await W(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},t),{code_challenge:l,code_challenge_method:c}),jwt:o.access_token,xform:or});if(h)throw h;return o.user=d.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(n){if(await Oe(this.storage,`${this.storageKey}-code-verifier`),B(n))return this._returnResult({data:{user:null},error:n});throw n}}async setSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(t))}async _setSession(t){try{if(!t.access_token||!t.refresh_token)throw new nt;const r=Date.now()/1e3;let n=r,s=!0,i=null;const{payload:o}=Ps(t.access_token);if(o.exp&&(n=o.exp,s=n<=r),s){const{data:l,error:c}=await this._callRefreshToken(t.refresh_token);if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l)return{data:{user:null,session:null},error:null};i=l}else{const{data:l,error:c}=await this._getUser(t.access_token);if(c)return this._returnResult({data:{user:null,session:null},error:c});i={access_token:t.access_token,refresh_token:t.refresh_token,user:l.user,token_type:"bearer",expires_in:n-r,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(r){if(B(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(t))}async _refreshSession(t){try{return await this._useSession(async r=>{var n;if(!t){const{data:o,error:l}=r;if(l)throw l;t=(n=o.session)!==null&&n!==void 0?n:void 0}if(!(t!=null&&t.refresh_token))throw new nt;const{data:s,error:i}=await this._callRefreshToken(t.refresh_token);return i?this._returnResult({data:{user:null,session:null},error:i}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(B(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(t,r){try{if(!Le())throw new As("No browser detected.");if(t.error||t.error_description||t.error_code)throw new As(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new Cu("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new As("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!t.code)throw new Cu("No code detected.");const{data:f,error:m}=await this._exchangeCodeForSession(t.code);if(m)throw m;const k=new URL(window.location.href);return k.searchParams.delete("code"),window.history.replaceState(window.history.state,"",k.toString()),{data:{session:f.session,redirectType:null},error:null}}const{provider_token:n,provider_refresh_token:s,access_token:i,refresh_token:o,expires_in:l,expires_at:c,token_type:d}=t;if(!i||!l||!o||!d)throw new As("No session defined in URL");const h=Math.round(Date.now()/1e3),u=parseInt(l);let p=h+u;c&&(p=parseInt(c));const x=p-h;x*1e3<=an&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${x}s, should have been closer to ${u}s`);const y=p-u;h-y>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",y,p,h):h-y<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",y,p,h);const{data:b,error:w}=await this._getUser(i);if(w)throw w;const g={provider_token:n,provider_refresh_token:s,access_token:i,expires_in:u,expires_at:p,refresh_token:o,token_type:d,user:b.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:g,redirectType:t.type},error:null})}catch(n){if(B(n))return this._returnResult({data:{session:null,redirectType:null},error:n});throw n}}_isImplicitGrantCallback(t){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),t):!!(t.access_token||t.error_description)}async _isPKCECallback(t){const r=await Tr(this.storage,`${this.storageKey}-code-verifier`);return!!(t.code&&r)}async signOut(t={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(t))}async _signOut({scope:t}={scope:"global"}){return await this._useSession(async r=>{var n;const{data:s,error:i}=r;if(i&&!Ts(i))return this._returnResult({error:i});const o=(n=s.session)===null||n===void 0?void 0:n.access_token;if(o){const{error:l}=await this.admin.signOut(o,t);if(l&&!(g0(l)&&(l.status===404||l.status===401||l.status===403)||Ts(l)))return this._returnResult({error:l})}return t!=="others"&&(await this._removeSession(),await Oe(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(t){const r=S0(),n={id:r,callback:t,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,n),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)})))(),{data:{subscription:n}}}async _emitInitialSession(t){return await this._useSession(async r=>{var n,s;try{const{data:{session:i},error:o}=r;if(o)throw o;await((n=this.stateChangeEmitters.get(t))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",i)),this._debug("INITIAL_SESSION","callback id",t,"session",i)}catch(i){await((s=this.stateChangeEmitters.get(t))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",t,"error",i),Ts(i)?console.warn(i):console.error(i)}})}async resetPasswordForEmail(t,r={}){let n=null,s=null;this.flowType==="pkce"&&([n,s]=await Xr(this.storage,this.storageKey,!0));try{return await W(this.fetch,"POST",`${this.url}/recover`,{body:{email:t,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(i){if(await Oe(this.storage,`${this.storageKey}-code-verifier`),B(i))return this._returnResult({data:null,error:i});throw i}}async getUserIdentities(){var t;try{const{data:r,error:n}=await this.getUser();if(n)throw n;return this._returnResult({data:{identities:(t=r.user.identities)!==null&&t!==void 0?t:[]},error:null})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(t){return"token"in t?this.linkIdentityIdToken(t):this.linkIdentityOAuth(t)}async linkIdentityOAuth(t){var r;try{const{data:n,error:s}=await this._useSession(async i=>{var o,l,c,d,h;const{data:u,error:p}=i;if(p)throw p;const x=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,t.provider,{redirectTo:(o=t.options)===null||o===void 0?void 0:o.redirectTo,scopes:(l=t.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=t.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return await W(this.fetch,"GET",x,{headers:this.headers,jwt:(h=(d=u.session)===null||d===void 0?void 0:d.access_token)!==null&&h!==void 0?h:void 0})});if(s)throw s;return Le()&&!(!((r=t.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),this._returnResult({data:{provider:t.provider,url:n==null?void 0:n.url},error:null})}catch(n){if(B(n))return this._returnResult({data:{provider:t.provider,url:null},error:n});throw n}}async linkIdentityIdToken(t){return await this._useSession(async r=>{var n;try{const{error:s,data:{session:i}}=r;if(s)throw s;const{options:o,provider:l,token:c,access_token:d,nonce:h}=t,u=await W(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(n=i==null?void 0:i.access_token)!==null&&n!==void 0?n:void 0,body:{provider:l,id_token:c,access_token:d,nonce:h,link_identity:!0,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:bt}),{data:p,error:x}=u;return x?this._returnResult({data:{user:null,session:null},error:x}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new Qr}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:x}))}catch(s){if(await Oe(this.storage,`${this.storageKey}-code-verifier`),B(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(t){try{return await this._useSession(async r=>{var n,s;const{data:i,error:o}=r;if(o)throw o;return await W(this.fetch,"DELETE",`${this.url}/user/identities/${t.identity_id}`,{headers:this.headers,jwt:(s=(n=i.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(t){const r=`#_refreshAccessToken(${t.substring(0,5)}...)`;this._debug(r,"begin");try{const n=Date.now();return await E0(async s=>(s>0&&await T0(200*Math.pow(2,s-1)),this._debug(r,"refreshing attempt",s),await W(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:t},headers:this.headers,xform:bt})),(s,i)=>{const o=200*Math.pow(2,s);return i&&ko(i)&&Date.now()+o-n<an})}catch(n){if(this._debug(r,"error",n),B(n))return this._returnResult({data:{session:null,user:null},error:n});throw n}finally{this._debug(r,"end")}}_isValidSession(t){return typeof t=="object"&&t!==null&&"access_token"in t&&"refresh_token"in t&&"expires_at"in t}async _handleProviderSignIn(t,r){const n=await this._getUrlForProvider(`${this.url}/authorize`,t,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",t,"options",r,"url",n),Le()&&!r.skipBrowserRedirect&&window.location.assign(n),{data:{provider:t,url:n},error:null}}async _recoverAndRefresh(){var t,r;const n="#_recoverAndRefresh()";this._debug(n,"begin");try{const s=await Tr(this.storage,this.storageKey);if(s&&this.userStorage){let o=await Tr(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:s.user},await sn(this.userStorage,this.storageKey+"-user",o)),s.user=(t=o==null?void 0:o.user)!==null&&t!==void 0?t:jo()}else if(s&&!s.user&&!s.user){const o=await Tr(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(s.user=o.user,await Oe(this.storage,this.storageKey+"-user"),await sn(this.storage,this.storageKey,s)):s.user=jo()}if(this._debug(n,"session from storage",s),!this._isValidSession(s)){this._debug(n,"session is not valid"),s!==null&&await this._removeSession();return}const i=((r=s.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<wo;if(this._debug(n,`session has${i?"":" not"} expired with margin of ${wo}s`),i){if(this.autoRefreshToken&&s.refresh_token){const{error:o}=await this._callRefreshToken(s.refresh_token);o&&(console.error(o),ko(o)||(this._debug(n,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:l}=await this._getUser(s.access_token);!l&&(o!=null&&o.user)?(s.user=o.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(n,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(n,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(n,"error",s),console.error(s);return}finally{this._debug(n,"end")}}async _callRefreshToken(t){var r,n;if(!t)throw new nt;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${t.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new Gi;const{data:i,error:o}=await this._refreshAccessToken(t);if(o)throw o;if(!i.session)throw new nt;await this._saveSession(i.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",i.session);const l={data:i.session,error:null};return this.refreshingDeferred.resolve(l),l}catch(i){if(this._debug(s,"error",i),B(i)){const o={data:null,error:i};return ko(i)||await this._removeSession(),(r=this.refreshingDeferred)===null||r===void 0||r.resolve(o),o}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(i),i}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(t,r,n=!0){const s=`#_notifyAllSubscribers(${t})`;this._debug(s,"begin",r,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:t,session:r});const i=[],o=Array.from(this.stateChangeEmitters.values()).map(async l=>{try{await l.callback(t,r)}catch(c){i.push(c)}});if(await Promise.all(o),i.length>0){for(let l=0;l<i.length;l+=1)console.error(i[l]);throw i[0]}}finally{this._debug(s,"end")}}async _saveSession(t){this._debug("#_saveSession()",t),this.suppressGetSessionWarning=!0,await Oe(this.storage,`${this.storageKey}-code-verifier`);const r=Object.assign({},t),n=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&r.user&&await sn(this.userStorage,this.storageKey+"-user",{user:r.user});const s=Object.assign({},r);delete s.user;const i=zu(s);await sn(this.storage,this.storageKey,i)}else{const s=zu(r);await sn(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await Oe(this.storage,this.storageKey),await Oe(this.storage,this.storageKey+"-code-verifier"),await Oe(this.storage,this.storageKey+"-user"),this.userStorage&&await Oe(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const t=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{t&&Le()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",t)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const t=setInterval(()=>this._autoRefreshTokenTick(),an);this.autoRefreshTicker=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const t=this.autoRefreshTicker;this.autoRefreshTicker=null,t&&clearInterval(t);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const t=Date.now();try{return await this._useSession(async r=>{const{data:{session:n}}=r;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((n.expires_at*1e3-t)/an);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${an}ms, refresh threshold is ${Il} ticks`),s<=Il&&await this._callRefreshToken(n.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(t){if(t.isAcquireTimeout||t instanceof Mf)this._debug("auto refresh token tick lock not available");else throw t}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!Le()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(t){this._debug("#visibilityChangedCallback","error",t)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(t){console.error("_handleVisibilityChange",t)}}async _onVisibilityChanged(t){const r=`#_onVisibilityChanged(${t})`;this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),t||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(t,r,n){const s=[`provider=${encodeURIComponent(r)}`];if(n!=null&&n.redirectTo&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n!=null&&n.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){const[i,o]=await Xr(this.storage,this.storageKey),l=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(o)}`});s.push(l.toString())}if(n!=null&&n.queryParams){const i=new URLSearchParams(n.queryParams);s.push(i.toString())}return n!=null&&n.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${t}?${s.join("&")}`}async _unenroll(t){try{return await this._useSession(async r=>{var n;const{data:s,error:i}=r;return i?this._returnResult({data:null,error:i}):await W(this.fetch,"DELETE",`${this.url}/factors/${t.factorId}`,{headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(t){try{return await this._useSession(async r=>{var n,s;const{data:i,error:o}=r;if(o)return this._returnResult({data:null,error:o});const l=Object.assign({friendly_name:t.friendlyName,factor_type:t.factorType},t.factorType==="phone"?{phone:t.phone}:t.factorType==="totp"?{issuer:t.issuer}:{}),{data:c,error:d}=await W(this.fetch,"POST",`${this.url}/factors`,{body:l,headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token});return d?this._returnResult({data:null,error:d}):(t.factorType==="totp"&&c.type==="totp"&&(!((s=c==null?void 0:c.totp)===null||s===void 0)&&s.qr_code)&&(c.totp.qr_code=`data:image/svg+xml;utf-8,${c.totp.qr_code}`),this._returnResult({data:c,error:null}))})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async _verify(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var n;const{data:s,error:i}=r;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({challenge_id:t.challengeId},"webauthn"in t?{webauthn:Object.assign(Object.assign({},t.webauthn),{credential_response:t.webauthn.type==="create"?ab(t.webauthn.credential_response):sb(t.webauthn.credential_response)})}:{code:t.code}),{data:l,error:c}=await W(this.fetch,"POST",`${this.url}/factors/${t.factorId}/verify`,{body:o,headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}})}async _challenge(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var n;const{data:s,error:i}=r;if(i)return this._returnResult({data:null,error:i});const o=await W(this.fetch,"POST",`${this.url}/factors/${t.factorId}/challenge`,{body:t,headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:rb(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:nb(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}})}async _challengeAndVerify(t){const{data:r,error:n}=await this._challenge({factorId:t.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:t.factorId,challengeId:r.id,code:t.code})}async _listFactors(){var t;const{data:{user:r},error:n}=await this.getUser();if(n)return{data:null,error:n};const s={all:[],phone:[],totp:[],webauthn:[]};for(const i of(t=r==null?void 0:r.factors)!==null&&t!==void 0?t:[])s.all.push(i),i.status==="verified"&&s[i.factor_type].push(i);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(t){var r,n,s,i;if(t)try{const{payload:x}=Ps(t);let y=null;x.aal&&(y=x.aal);let b=y;const{data:{user:w},error:g}=await this.getUser(t);if(g)return this._returnResult({data:null,error:g});((n=(r=w==null?void 0:w.factors)===null||r===void 0?void 0:r.filter(k=>k.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(b="aal2");const m=x.amr||[];return{data:{currentLevel:y,nextLevel:b,currentAuthenticationMethods:m},error:null}}catch(x){if(B(x))return this._returnResult({data:null,error:x});throw x}const{data:{session:o},error:l}=await this.getSession();if(l)return this._returnResult({data:null,error:l});if(!o)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:c}=Ps(o.access_token);let d=null;c.aal&&(d=c.aal);let h=d;((i=(s=o.user.factors)===null||s===void 0?void 0:s.filter(x=>x.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(h="aal2");const p=c.amr||[];return{data:{currentLevel:d,nextLevel:h,currentAuthenticationMethods:p},error:null}}async _getAuthorizationDetails(t){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?this._returnResult({data:null,error:s}):n?await W(this.fetch,"GET",`${this.url}/oauth/authorizations/${t}`,{headers:this.headers,jwt:n.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new nt})})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(t,r){try{return await this._useSession(async n=>{const{data:{session:s},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new nt});const o=await W(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:l=>({data:l,error:null})});return o.data&&o.data.redirect_url&&Le()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(n){if(B(n))return this._returnResult({data:null,error:n});throw n}}async _denyAuthorization(t,r){try{return await this._useSession(async n=>{const{data:{session:s},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new nt});const o=await W(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:l=>({data:l,error:null})});return o.data&&o.data.redirect_url&&Le()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(n){if(B(n))return this._returnResult({data:null,error:n});throw n}}async _listOAuthGrants(){try{return await this._useSession(async t=>{const{data:{session:r},error:n}=t;return n?this._returnResult({data:null,error:n}):r?await W(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new nt})})}catch(t){if(B(t))return this._returnResult({data:null,error:t});throw t}}async _revokeOAuthGrant(t){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?this._returnResult({data:null,error:s}):n?(await W(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:t.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new nt})})}catch(r){if(B(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(t,r={keys:[]}){let n=r.keys.find(l=>l.kid===t);if(n)return n;const s=Date.now();if(n=this.jwks.keys.find(l=>l.kid===t),n&&this.jwks_cached_at+f0>s)return n;const{data:i,error:o}=await W(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=s,n=i.keys.find(l=>l.kid===t),!n)?null:n}async getClaims(t,r={}){try{let n=t;if(!n){const{data:x,error:y}=await this.getSession();if(y||!x.session)return this._returnResult({data:null,error:y});n=x.session.access_token}const{header:s,payload:i,signature:o,raw:{header:l,payload:c}}=Ps(n);r!=null&&r.allowExpired||I0(i.exp);const d=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!d){const{error:x}=await this.getUser(n);if(x)throw x;return{data:{claims:i,header:s,signature:o},error:null}}const h=$0(s.alg),u=await crypto.subtle.importKey("jwk",d,h,!0,["verify"]);if(!await crypto.subtle.verify(h,u,o,j0(`${l}.${c}`)))throw new Dl("Invalid JWT signature");return{data:{claims:i,header:s,signature:o},error:null}}catch(n){if(B(n))return this._returnResult({data:null,error:n});throw n}}}Ya.nextInstanceID={};const fb=Ya,mb="2.103.3";let la="";typeof Deno<"u"?la="deno":typeof document<"u"?la="web":typeof navigator<"u"&&navigator.product==="ReactNative"?la="react-native":la="node";const gb={"X-Client-Info":`supabase-js-${la}/${mb}`},xb={headers:gb},vb={schema:"public"},yb={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},bb={};function Ja(e){"@babel/helpers - typeof";return Ja=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ja(e)}function wb(e,t){if(Ja(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Ja(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function kb(e){var t=wb(e,"string");return Ja(t)=="symbol"?t:t+""}function jb(e,t,r){return(t=kb(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Bu(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function ge(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Bu(Object(r),!0).forEach(function(n){jb(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Bu(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}const Nb=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),Sb=()=>Headers,_b=(e,t,r)=>{const n=Nb(r),s=Sb();return async(i,o)=>{var l;const c=(l=await t())!==null&&l!==void 0?l:e;let d=new s(o==null?void 0:o.headers);return d.has("apikey")||d.set("apikey",e),d.has("Authorization")||d.set("Authorization",`Bearer ${c}`),n(i,ge(ge({},o),{},{headers:d}))}};function Cb(e){return e.endsWith("/")?e:e+"/"}function Tb(e,t){var r,n;const{db:s,auth:i,realtime:o,global:l}=e,{db:c,auth:d,realtime:h,global:u}=t,p={db:ge(ge({},c),s),auth:ge(ge({},d),i),realtime:ge(ge({},h),o),storage:{},global:ge(ge(ge({},u),l),{},{headers:ge(ge({},(r=u==null?void 0:u.headers)!==null&&r!==void 0?r:{}),(n=l==null?void 0:l.headers)!==null&&n!==void 0?n:{})}),accessToken:async()=>""};return e.accessToken?p.accessToken=e.accessToken:delete p.accessToken,p}function Eb(e){const t=e==null?void 0:e.trim();if(!t)throw new Error("supabaseUrl is required.");if(!t.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Cb(t))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Ab=class extends fb{constructor(e){super(e)}},Pb=class{constructor(e,t,r){var n,s;this.supabaseUrl=e,this.supabaseKey=t;const i=Eb(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",i),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",i),this.storageUrl=new URL("storage/v1",i),this.functionsUrl=new URL("functions/v1",i);const o=`sb-${i.hostname.split(".")[0]}-auth-token`,l={db:vb,realtime:bb,auth:ge(ge({},yb),{},{storageKey:o}),global:xb},c=Tb(r??{},l);if(this.storageKey=(n=c.auth.storageKey)!==null&&n!==void 0?n:"",this.headers=(s=c.global.headers)!==null&&s!==void 0?s:{},c.accessToken)this.accessToken=c.accessToken,this.auth=new Proxy({},{get:(h,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var d;this.auth=this._initSupabaseAuthClient((d=c.auth)!==null&&d!==void 0?d:{},this.headers,c.global.fetch)}this.fetch=_b(t,this._getAccessToken.bind(this),c.global.fetch),this.realtime=this._initRealtimeClient(ge({headers:this.headers,accessToken:this._getAccessToken.bind(this)},c.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(h=>this.realtime.setAuth(h)).catch(h=>console.warn("Failed to set initial Realtime auth token:",h)),this.rest=new Xv(new URL("rest/v1",i).href,{headers:this.headers,schema:c.db.schema,fetch:this.fetch,timeout:c.db.timeout,urlLengthLimit:c.db.urlLengthLimit}),this.storage=new c0(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),c.accessToken||this._listenForAuthEvents()}get functions(){return new Fv(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,r)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e=this,t,r;if(e.accessToken)return await e.accessToken();const{data:n}=await e.auth.getSession();return(t=(r=n.session)===null||r===void 0?void 0:r.access_token)!==null&&t!==void 0?t:e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:n,userStorage:s,storageKey:i,flowType:o,lock:l,debug:c,throwOnError:d},h,u){const p={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Ab({url:this.authUrl.href,headers:ge(ge({},p),h),storageKey:i,autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:n,userStorage:s,flowType:o,lock:l,debug:c,throwOnError:d,fetch:u,hasCustomAuthorizationHeader:Object.keys(this.headers).some(x=>x.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new zy(this.realtimeUrl.href,ge(ge({},e),{},{params:ge(ge({},{apikey:this.supabaseKey}),e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,"CLIENT",t==null?void 0:t.access_token)})}_handleTokenChanged(e,t,r){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const zb=(e,t,r)=>new Pb(e,t,r);function Rb(){if(typeof window<"u")return!1;const e=globalThis.process;if(!e)return!1;const t=e.version;if(t==null)return!1;const r=t.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=18:!1}Rb()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const Ob="https://placeholder.supabase.co",Lb="placeholder-key",z=zb(Ob,Lb,{auth:{persistSession:!0,autoRefreshToken:!0,storage:localStorage,storageKey:"hsc-auth"}}),Ib="hsc.app",$b="shotclub-pw-v1";function Ub(e){const t=e.toLowerCase().replace(/[^a-z]/g,"").slice(0,8)||"player",r=Math.floor(1e3+Math.random()*9e3);return`${t}${r}`}function Db(e){return`${e.toLowerCase()}@${Ib}`}function Bb(e){return e.trim().toLowerCase()}async function Mb({username:e}){const t=Db(e.trim()),{error:r}=await z.auth.signInWithPassword({email:t,password:$b});if(r)throw r}async function Wf(){await z.auth.signOut()}async function Fb(e){if(!e)throw new Error("No player ID");await Promise.all([z.from("shot_logs").delete().eq("player_id",e),z.from("drill_logs").delete().eq("player_id",e),z.from("achievements").delete().eq("player_id",e)]),await z.from("players").delete().eq("id",e),await z.auth.signOut(),typeof localStorage<"u"&&localStorage.removeItem("activePlayerId")}async function Hb(){const{data:{user:e}}=await z.auth.getUser();if(!e)return null;const t=typeof localStorage<"u"?localStorage.getItem("activePlayerId"):null;try{const{data:n,error:s}=await z.from("players").select("*, team:teams(id, name, code)").eq("account_id",e.id).order("created_at");if(!s&&(n==null?void 0:n.length)>0){if(t){const i=n.find(o=>o.id===t);if(i)return i}return n[0]}}catch{}const{data:r}=await z.from("players").select("*, team:teams(id, name, code)").eq("id",e.id).maybeSingle();return r}async function Bl({firstName:e,displayName:t,position:r,ageBracket:n,teamId:s,clubId:i,clubName:o}){const{data:{user:l}}=await z.auth.getUser();if(!l)throw new Error("Must be signed in with Google");const c=Ub(e||t),d=crypto.randomUUID(),{error:h}=await z.from("players").insert({id:d,display_name:t,first_name:(e==null?void 0:e.trim())||null,username:c,position:r,age_bracket:n,team_id:s||null,club_id:i||null,club_name:o||null,account_id:l.id});if(h)throw h;return typeof localStorage<"u"&&localStorage.setItem("activePlayerId",d),{username:c,playerId:d}}async function Wb(){const{data:{user:e}}=await z.auth.getUser();if(!e)return[];const{data:t}=await z.from("players").select("*, team:teams(id, name, code)").eq("account_id",e.id).order("created_at");return t||[]}async function Mu(){const{error:e}=await z.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+"/start?oauth=1"}});if(e)throw e}async function So(){const{error:e}=await z.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+"/coach/start"}});if(e)throw e}async function qb({email:e,password:t}){const r=Bb(e),{error:n}=await z.auth.signInWithPassword({email:r,password:t});if(n)throw n}const qf=v.createContext(null);function Gb({children:e}){const[t,r]=v.useState(null),[n,s]=v.useState(!0),i=v.useCallback(async()=>{const o=await Hb();return r(o),o},[]);return v.useEffect(()=>{let o=!0;i().finally(()=>{o&&s(!1)});const{data:l}=z.auth.onAuthStateChange(async c=>{c==="SIGNED_OUT"?r(null):(c==="SIGNED_IN"||c==="TOKEN_REFRESHED")&&await i()});return()=>{o=!1,l.subscription.unsubscribe()}},[i]),a.jsx(qf.Provider,{value:{player:t,loading:n,refresh:i,setPlayer:r},children:e})}function It(){const e=v.useContext(qf);if(!e)throw new Error("useAuth must be used inside AuthProvider");return e}const ee="https://hockeyshotchallenge.com",Vb="Hockey Shot Challenge — Track every shot. Climb the rankings.",Kb="Off-ice hockey practice tracking for kids ages 6-18. Log your shots, climb team and global leaderboards, earn ranks, and get better every day.",Yb=`${ee}/og-image.png`;function ut(e,t,r){let n=document.querySelector(`meta[${e}="${t}"]`);n||(n=document.createElement("meta"),n.setAttribute(e,t),document.head.appendChild(n)),n.setAttribute("content",r)}function Jb(e,t){let r=document.querySelector(`link[rel="${e}"]`);r||(r=document.createElement("link"),r.setAttribute("rel",e),document.head.appendChild(r)),r.setAttribute("href",t)}function ze({title:e,description:t,image:r,url:n,type:s="website",noindex:i=!1}={}){const o=e?`${e} · Hockey Shot Challenge`:Vb,l=t||Kb,c=r||Yb,d=n||`${ee}${typeof window<"u"?window.location.pathname:""}`;document.title=o,ut("name","description",l),ut("name","robots",i?"noindex, nofollow":"index, follow"),ut("property","og:title",o),ut("property","og:description",l),ut("property","og:image",c),ut("property","og:url",d),ut("property","og:type",s),ut("property","og:site_name","Hockey Shot Challenge"),ut("name","twitter:card","summary_large_image"),ut("name","twitter:title",o),ut("name","twitter:description",l),ut("name","twitter:image",c),Jb("canonical",d)}function Gr(e){document.querySelectorAll("script[data-seo-jsonld]").forEach(r=>r.remove()),(Array.isArray(e)?e:[e]).forEach((r,n)=>{const s=document.createElement("script");s.type="application/ld+json",s.setAttribute("data-seo-jsonld",String(n)),s.textContent=JSON.stringify(r),document.head.appendChild(s)})}function Ml(){const[e,t]=v.useState(!1),[r,n]=v.useState(!1),[s,i]=v.useState(!1),[o,l]=v.useState(""),[c,d]=v.useState("#"),[h,u]=v.useState("email us directly");v.useEffect(()=>{const x="samuelmenard",y="gmail.com";d(`mailto:${x}@${y}?subject=Hockey%20Shot%20Challenge`),u(`${x}@${y}`)},[]);async function p(x){x.preventDefault(),l(""),n(!0);const y=x.currentTarget,b=new FormData(y);if(b.get("bot-field")){n(!1),i(!0);return}const w=new URLSearchParams;for(const[g,f]of b.entries())w.append(g,String(f));try{const g=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:w.toString()});if(!g.ok)throw new Error(`HTTP ${g.status}`);i(!0),y.reset()}catch{l("Couldn't send. Try again, or email directly below.")}finally{n(!1)}}return a.jsxs("section",{className:"contact-section",children:[a.jsxs("div",{className:"contact-inner",children:[a.jsxs("div",{className:"contact-head",children:[a.jsx("div",{className:"contact-eyebrow",children:"GET IN TOUCH"}),a.jsx("h2",{className:"contact-title",children:"Questions, ideas, or want to bring your club on board?"}),a.jsx("p",{className:"contact-sub",children:"Built by a hockey parent in Burlington, ON. I read everything."})]}),!e&&!s&&a.jsxs("div",{className:"contact-actions",children:[a.jsx("button",{className:"contact-btn-primary",onClick:()=>t(!0),children:"Send a message →"}),a.jsxs("span",{className:"contact-or",children:["or ",a.jsx("a",{className:"contact-mailto",href:c,children:h})]})]}),s&&a.jsxs("div",{className:"contact-success",children:[a.jsx("div",{className:"contact-success-check",children:"✓"}),a.jsxs("div",{children:[a.jsx("div",{className:"contact-success-title",children:"Message sent."}),a.jsx("div",{className:"contact-success-text",children:"Thanks — I'll get back to you soon."})]})]}),e&&!s&&a.jsxs("form",{className:"contact-form",name:"contact",method:"POST","data-netlify":"true","data-netlify-honeypot":"bot-field",onSubmit:p,children:[a.jsx("input",{type:"hidden",name:"form-name",value:"contact"}),a.jsx("p",{className:"contact-honeypot",children:a.jsxs("label",{children:["Don't fill this out if you're human: ",a.jsx("input",{name:"bot-field"})]})}),a.jsxs("div",{className:"contact-row",children:[a.jsxs("label",{className:"contact-field",children:[a.jsx("span",{className:"contact-label",children:"Name"}),a.jsx("input",{name:"name",required:!0,autoComplete:"name"})]}),a.jsxs("label",{className:"contact-field",children:[a.jsx("span",{className:"contact-label",children:"Email"}),a.jsx("input",{type:"email",name:"email",required:!0,autoComplete:"email"})]})]}),a.jsxs("label",{className:"contact-field",children:[a.jsx("span",{className:"contact-label",children:"I'm a…"}),a.jsxs("select",{name:"role",required:!0,defaultValue:"",children:[a.jsx("option",{value:"",disabled:!0,children:"Select one"}),a.jsx("option",{value:"coach",children:"Coach"}),a.jsx("option",{value:"club_admin",children:"Club admin / league director"}),a.jsx("option",{value:"parent",children:"Parent"}),a.jsx("option",{value:"player",children:"Player"}),a.jsx("option",{value:"other",children:"Other"})]})]}),a.jsxs("label",{className:"contact-field",children:[a.jsx("span",{className:"contact-label",children:"Message"}),a.jsx("textarea",{name:"message",rows:"4",required:!0})]}),o&&a.jsx("div",{className:"contact-error",children:o}),a.jsxs("div",{className:"contact-submit-row",children:[a.jsx("button",{type:"submit",className:"contact-btn-primary",disabled:r,children:r?"Sending…":"Send message →"}),a.jsx("button",{type:"button",className:"contact-btn-ghost",onClick:()=>t(!1),children:"Cancel"})]}),a.jsxs("div",{className:"contact-fallback",children:["Prefer email? ",a.jsx("a",{className:"contact-mailto",href:c,children:h})]})]})]}),a.jsx("style",{children:Qb})]})}const Qb=`
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
`;async function Fu({playerId:e,shotType:t,count:r=1}){const{error:n}=await z.from("shot_logs").insert({player_id:e,shot_type:t,count:r});if(n)throw n}function vt(){const e=new Date,r=(e.getUTCDay()+6)%7,n=new Date(e);return n.setUTCDate(e.getUTCDate()-r),n.toISOString().slice(0,10)}async function Xb(e){const t=new Date().toISOString().slice(0,10),r=vt(),{data:n,error:s}=await z.from("shot_logs").select("shot_type, count, log_date").eq("player_id",e).gte("log_date",r);if(s)throw s;const i=(n||[]).filter(d=>d.log_date===t),o=i.reduce((d,h)=>d+h.count,0),l=(n||[]).reduce((d,h)=>d+h.count,0),c={Wrist:0,Snap:0,Slap:0,Backhand:0,Saves:0,"Toe Drag":0,"Figure 8":0,Lateral:0,"One-Hand":0};return i.forEach(d=>{c[d.shot_type]=(c[d.shot_type]||0)+d.count}),{todayTotal:o,weekTotal:l,todayByType:c}}async function Gf(e){const{data:t,error:r}=await z.from("shot_logs").select("shot_type, count").eq("player_id",e);if(r)throw r;const n={Wrist:0,Snap:0,Slap:0,Backhand:0,Saves:0};return(t||[]).forEach(s=>{n[s.shot_type]=(n[s.shot_type]||0)+s.count}),n}function Zb(e,t){let r=0;for(let n=0;n<e.length;n++)r=Math.imul(31,r)+e.charCodeAt(n)>>>0;return r%t}async function ew(e,t){if(!e)return null;const r=new Date().toISOString().slice(0,10),n=vt(),{data:s}=await z.from("players").select("id, display_name, lifetime_shots").eq("team_id",e).neq("id",t).order("id");if(!s||s.length===0)return null;const i=t+n,o=s[Zb(i,s.length)],[{data:l},{data:c}]=await Promise.all([z.from("shot_logs").select("count").eq("player_id",o.id).eq("log_date",r),z.from("shot_logs").select("count").eq("player_id",o.id).gte("log_date",n)]),d=(l||[]).reduce((u,p)=>u+p.count,0),h=(c||[]).reduce((u,p)=>u+p.count,0);return{...o,today_shots:d,week_shots:h}}async function tw({teamId:e,clubName:t,limit:r=50}){let n=z.from("players").select("id, username, display_name, position, lifetime_shots, current_streak, card_number, club_name, team:teams(id, name)").order("lifetime_shots",{ascending:!1}).limit(r);e&&(n=n.eq("team_id",e)),t&&(n=n.eq("club_name",t));const{data:s,error:i}=await n;if(i)throw i;return s||[]}async function rw({teamId:e,clubName:t,limit:r=50}){const n=vt();let s=null;if(e||t){let u=z.from("players").select("id");e&&(u=u.eq("team_id",e)),t&&(u=u.eq("club_name",t));const{data:p}=await u;if(s=(p||[]).map(x=>x.id),s.length===0)return[]}let i=z.from("shot_logs").select("player_id, count").gte("log_date",n);s&&(i=i.in("player_id",s));const{data:o,error:l}=await i;if(l)throw l;const c={};(o||[]).forEach(u=>{c[u.player_id]=(c[u.player_id]||0)+u.count});const d=Object.keys(c);if(d.length===0)return[];const{data:h}=await z.from("players").select("id, username, display_name, position, lifetime_shots, current_streak, card_number, team:teams(id, name)").in("id",d);return(h||[]).map(u=>({...u,week_shots:c[u.id]||0})).sort((u,p)=>p.week_shots-u.week_shots).slice(0,r)}async function nw(e){const{data:t}=await z.from("daily_progress").select("shots_total").eq("player_id",e).order("shots_total",{ascending:!1}).limit(1).maybeSingle();return(t==null?void 0:t.shots_total)??0}async function aw(e){if(!e)return 0;const{count:t}=await z.from("players").select("*",{count:"exact",head:!0}).eq("team_id",e);return t||0}async function sw(e){if(!e)return 0;const{count:t}=await z.from("players").select("*",{count:"exact",head:!0}).eq("club_name",e);return t||0}const ja=["U7","U8","U9","U10","U11","U12","U13","U14","U15","U16","U17","U18"],Na=["House","Select","A","AA","AAA"];async function Vr(e,t=10){if(!e||e.trim().length<2)return[];const r=e.trim().toLowerCase(),{data:n,error:s}=await z.from("clubs").select("id, name, slug, city, province, country, governing_body, gender_type, org_type, player_count").ilike("search_text",`%${r}%`).eq("is_seeded",!0).eq("is_active",!0).order("name").limit(t);return s?(console.warn("searchClubs error:",s),[]):n||[]}async function Qa(e){if(!e)return null;const{data:t}=await z.from("clubs").select("id, name, slug, city, province, country, governing_body, gender_type, org_type, created_at").eq("slug",e).maybeSingle();return t}async function Wc(e){if(!e)return{playerCount:0,teamCount:0,totalShots:0};const[{count:t},{count:r},{data:n}]=await Promise.all([z.from("players").select("*",{count:"exact",head:!0}).eq("club_id",e),z.from("teams").select("*",{count:"exact",head:!0}).eq("club_id",e),z.from("players").select("lifetime_shots").eq("club_id",e)]),s=(n||[]).reduce((i,o)=>i+(o.lifetime_shots||0),0);return{playerCount:t||0,teamCount:r||0,totalShots:s}}async function qc(e){if(!e)return[];const{data:t}=await z.from("teams").select("id, name, code").eq("club_id",e).order("name");return t||[]}async function Vf({clubId:e,ageDivision:t,tier:r,season:n="2025-26"}){const{data:s,error:i}=await z.rpc("find_or_create_team_for_player",{p_club_id:e,p_age_division:t,p_tier:r,p_season:n});if(i)throw i;const o=Array.isArray(s)?s[0]:s;if(!o)throw new Error("No team result");return{teamId:o.team_id,teamName:o.team_name,teamExisted:o.team_existed}}async function iw({name:e,city:t,governingBody:r,contactEmail:n}){const{data:{user:s}}=await z.auth.getUser(),{data:i,error:o}=await z.from("pending_clubs").insert({name:e.trim(),city:(t==null?void 0:t.trim())||null,governing_body:(r==null?void 0:r.trim())||null,contact_email:(n==null?void 0:n.trim())||null,submitted_by:(s==null?void 0:s.id)||null}).select("*").single();if(o)throw console.warn("submitPendingClub error:",o),o;return i}async function ow({displayName:e,email:t,clubId:r,isDirector:n=!1}){const{data:{user:s}}=await z.auth.getUser();if(!s)throw new Error("Must be signed in");const{error:i}=await z.from("coaches").insert({id:s.id,display_name:e,email:t||s.email,club_id:r,is_director:n});if(i)throw i}async function ca(){const{data:{user:e}}=await z.auth.getUser();if(!e)return null;const{data:t}=await z.from("coaches").select("*, club:clubs(id, name, slug, city)").eq("id",e.id).maybeSingle();return t}async function lw(e){if(!e)return[];const{data:t}=await z.from("players").select("id, display_name, position, lifetime_shots, current_streak, card_number, team:teams(id, name)").eq("club_id",e).order("lifetime_shots",{ascending:!1});return t||[]}async function Kf(e){var N;if(!e)return null;const t=new Date,n=(t.getUTCDay()+6)%7,s=new Date(t);s.setUTCDate(t.getUTCDate()-n);const i=s.toISOString().slice(0,10),o=new Date(s);o.setUTCDate(s.getUTCDate()-7);const l=o.toISOString().slice(0,10),c=new Date(s);c.setUTCDate(s.getUTCDate()-1);const d=c.toISOString().slice(0,10),{data:h}=await z.from("players").select("id, display_name").eq("club_id",e);if(!(h!=null&&h.length))return null;const u=h.map(S=>S.id),p=Object.fromEntries(h.map(S=>[S.id,S.display_name])),{data:x}=await z.from("shot_logs").select("player_id, count, log_date").in("player_id",u).gte("log_date",l),y={};let b=0;for(const S of x||[])S.log_date>=i?y[S.player_id]=(y[S.player_id]||0)+S.count:S.log_date<=d&&(b+=S.count);const w=Object.values(y).reduce((S,_)=>S+_,0),g=Object.keys(y).length,f=(N=Object.entries(y).sort((S,_)=>_[1]-S[1])[0])==null?void 0:N[0],m=f?{name:p[f],shots:y[f]}:null,k=b===0?null:Math.round((w-b)/b*100);return{thisWeekTotal:w,lastWeekTotal:b,vsLastWeek:k,activePlayers:g,topPlayer:m,totalPlayers:h.length}}async function cw(e,t=5){if(!e)return[];const r=vt(),{data:n}=await z.from("players").select("id, display_name, position, team:teams(name, age_division, tier)").eq("club_id",e);if(!(n!=null&&n.length))return[];const s=n.map(c=>c.id),{data:i}=await z.from("shot_logs").select("player_id, count").in("player_id",s).gte("log_date",r);if(!(i!=null&&i.length))return[];const o={};for(const c of i)o[c.player_id]=(o[c.player_id]||0)+c.count;const l=Object.fromEntries(n.map(c=>[c.id,c]));return Object.entries(o).sort((c,d)=>d[1]-c[1]).slice(0,t).map(([c,d])=>({...l[c],week_shots:d}))}async function Yf(e){if(!e)return[];const t=vt(),{data:r}=await z.from("teams").select("id, name, age_division, tier").eq("club_id",e).eq("is_active",!0);if(!(r!=null&&r.length))return[];const{data:n}=await z.from("players").select("id, team_id").eq("club_id",e).not("team_id","is",null);if(!(n!=null&&n.length))return r.map(c=>({...c,week_shots:0,player_count:0}));const s=n.map(c=>c.id),{data:i}=await z.from("shot_logs").select("player_id, count").in("player_id",s).gte("log_date",t),o={};for(const c of i||[])o[c.player_id]=(o[c.player_id]||0)+c.count;const l={};for(const c of n)l[c.team_id]||(l[c.team_id]=[]),l[c.team_id].push(c.id);return r.map(c=>{const d=l[c.id]||[],h=d.reduce((u,p)=>u+(o[p]||0),0);return{...c,week_shots:h,player_count:d.length}}).sort((c,d)=>d.week_shots-c.week_shots)}async function dw(){const e=vt(),{data:t}=await z.from("players").select("id, team_id, team:teams(id, name, age_division, tier, club:clubs(id, name, city, slug))").not("team_id","is",null);if(!(t!=null&&t.length))return null;const r=t.map(l=>l.id),{data:n}=await z.from("shot_logs").select("player_id, count").in("player_id",r).gte("log_date",e);if(!(n!=null&&n.length))return null;const s={};for(const l of n)s[l.player_id]=(s[l.player_id]||0)+l.count;const i={};for(const l of t)l.team&&(i[l.team_id]||(i[l.team_id]={team:l.team,shots:0,players:0}),i[l.team_id].shots+=s[l.id]||0,s[l.id]&&(i[l.team_id].players+=1));return Object.values(i).filter(l=>l.shots>0).sort((l,c)=>c.shots-l.shots)[0]||null}async function uw(){const{data:e,error:t}=await z.from("players").select("club_id, lifetime_shots, club:clubs(id, name, city, slug, province)").not("club_id","is",null).gt("lifetime_shots",0);if(t)return[];const r={};for(const n of e||[]){if(!n.club)continue;const s=n.club_id;r[s]||(r[s]={club_id:s,name:n.club.name,city:n.club.city,slug:n.club.slug,province:n.club.province,total_shots:0,player_count:0}),r[s].total_shots+=n.lifetime_shots||0,r[s].player_count+=1}return Object.values(r).sort((n,s)=>s.total_shots-n.total_shots)}async function hw(e){if(!e)return[];const{data:t}=await z.from("players").select("id, display_name, team:teams(name)").eq("club_id",e);if(!(t!=null&&t.length))return[];const r=t.map(l=>l.id),n=(()=>{const l=new Date,c=l.getUTCDay(),d=new Date(l);return d.setUTCDate(l.getUTCDate()-(c+6)%7),d.toISOString().slice(0,10)})(),s=["Toe Drag","Figure 8","Lateral","One-Hand"],{data:i}=await z.from("shot_logs").select("player_id, shot_type, count").in("player_id",r).in("shot_type",s).gte("log_date",n),o={};for(const l of i||[])o[l.player_id]||(o[l.player_id]={total:0}),o[l.player_id].total+=l.count,o[l.player_id][l.shot_type]=(o[l.player_id][l.shot_type]||0)+l.count;return t.map(l=>({...l,drills:o[l.id]||{total:0}})).filter(l=>l.drills.total>0).sort((l,c)=>c.drills.total-l.drills.total)}function pw(){const e=we(),{player:t}=It(),[r,n]=v.useState(""),[s,i]=v.useState([]),[o,l]=v.useState(!1),[c,d]=v.useState(null),h=v.useRef(null),u=v.useRef(null);return v.useEffect(()=>{if(h.current&&clearTimeout(h.current),!r.trim()||r.trim().length<2){i([]),l(!1);return}return l(!0),h.current=setTimeout(async()=>{try{const p=await Vr(r,6);i(p||[])}catch{i([])}finally{l(!1)}},200),()=>{h.current&&clearTimeout(h.current)}},[r]),v.useEffect(()=>{z.rpc("get_total_shots").then(({data:p})=>{p&&d(p)})},[]),v.useEffect(()=>{ze({title:null,description:"Free off-ice hockey tracker for players and coaches. Kids log shots and stickhandling every day. Coaches see who's putting in the work. Compete in weekly 1v1 battles. Free for ages 6–18.",url:ee}),Gr({"@context":"https://schema.org","@type":"SoftwareApplication",name:"Hockey Shot Challenge",description:"Off-ice hockey training app for kids. Track shots and stickhandling reps, compete on leaderboards, coaches see who's working.",applicationCategory:"SportsApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"CAD"},aggregateRating:{"@type":"AggregateRating",ratingValue:"4.9",ratingCount:"50"}})},[]),a.jsxs("div",{className:"landing",children:[a.jsxs("nav",{className:"land-nav",children:[a.jsxs("button",{className:"land-brand",onClick:()=>e("/"),children:[a.jsx(Hu,{}),a.jsx("span",{children:"Hockey Shot Challenge"})]}),a.jsx("div",{className:"land-nav-actions",children:t?a.jsx("button",{className:"land-nav-cta",onClick:()=>e("/home"),children:"My Dashboard →"}):a.jsxs(a.Fragment,{children:[a.jsx("button",{className:"land-nav-link",onClick:()=>e("/start"),children:"Sign in"}),a.jsx("button",{className:"land-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]})})]}),a.jsxs("section",{className:"hero",children:[a.jsx("div",{className:"hero-eyebrow",children:"FREE · FOR HOCKEY PLAYERS · AGES 6–18"}),a.jsx("h1",{className:"hero-title",children:"Shoot more. Track it. Beat your rival."}),a.jsx("p",{className:"hero-sub",children:"Log your shots and stickhandling after every practice. Your teammates, parents, and coach can all see how hard you're working."}),c>0&&a.jsxs("div",{className:"hero-stat",children:["🏒 ",a.jsx("strong",{children:c.toLocaleString()})," shots logged by real players"]}),a.jsxs("div",{className:"hero-paths",children:[a.jsxs("button",{className:"hero-path hero-path--player",onClick:()=>e("/start"),children:[a.jsx("div",{className:"hero-path-eyebrow",children:"PLAYERS & PARENTS"}),a.jsx("div",{className:"hero-path-title",children:"Go outside. Shoot. Log it. Watch your rank climb."}),a.jsxs("div",{className:"hero-path-detail",children:[a.jsx("span",{children:"🥅 Shots"}),a.jsx("span",{children:"🏒 Stickhandling"}),a.jsx("span",{children:"🔥 Streaks"}),a.jsx("span",{children:"🏅 Ranks"})]}),a.jsx("div",{className:"hero-path-btn hero-path-btn--player",children:"Sign in to track shots →"})]}),a.jsxs("button",{className:"hero-path hero-path--coach",onClick:()=>e("/coach"),children:[a.jsx("div",{className:"hero-path-eyebrow",children:"COACHES"}),a.jsx("div",{className:"hero-path-title",children:"Know who's been shooting before they walk into practice."}),a.jsxs("div",{className:"hero-path-detail",children:[a.jsx("span",{children:"📊 Who logged this week"}),a.jsx("span",{children:"📈 Shot counts"}),a.jsx("span",{children:"⚔️ 1v1 battles"})]}),a.jsx("div",{className:"hero-path-btn hero-path-btn--coach",children:"Set up my team →"})]})]}),a.jsxs("div",{className:"hero-club-search",children:[a.jsx("div",{className:"hero-club-search-label",children:"Is your team already on here?"}),a.jsxs("div",{style:{position:"relative",maxWidth:420,margin:"0 auto"},children:[a.jsx("input",{ref:u,type:"text",className:"hero-search-input",placeholder:"Burlington Eagles, Mississauga…",value:r,onChange:p=>n(p.target.value),autoComplete:"off",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false"}),r.trim().length>=2&&a.jsxs("div",{className:"hero-search-dropdown",children:[o&&s.length===0&&a.jsx("div",{className:"hero-search-status",children:"Searching…"}),!o&&s.length===0&&a.jsxs("div",{className:"hero-search-status",children:["No clubs found. ",a.jsx("button",{className:"hero-search-add",onClick:()=>e("/coach"),children:"Add yours →"})]}),s.map(p=>a.jsxs("div",{className:"hero-search-result-wrap",children:[a.jsxs("button",{className:"hero-search-result",onClick:()=>{e(`/clubs/${p.slug}`),n(""),i([])},children:[a.jsx("span",{className:"hero-search-result-name",children:p.name}),a.jsx("span",{className:"hero-search-result-meta",children:[p.city,p.governing_body].filter(Boolean).join(" · ")})]}),a.jsx("button",{className:"hero-search-join",onClick:()=>{e(`/start?club=${p.slug}`),n(""),i([])},children:"Sign up →"})]},p.id))]})]})]})]}),a.jsxs("section",{className:"hiw",children:[a.jsx("div",{className:"hiw-label",children:"HOW IT WORKS"}),a.jsxs("div",{className:"hiw-steps",children:[a.jsxs("div",{className:"hiw-step",children:[a.jsx("div",{className:"hiw-step-num",children:"1"}),a.jsxs("div",{className:"hiw-step-visual hiw-step-visual--signin",children:[a.jsxs("div",{className:"hiw-google-btn",children:[a.jsx(fw,{}),"Sign in with Google"]}),a.jsx("div",{className:"hiw-visual-hint",children:"Takes 30 seconds"})]}),a.jsx("div",{className:"hiw-step-text",children:"Sign in with your Google account. Pick a name for your player. Done."})]}),a.jsx("div",{className:"hiw-arrow",children:"→"}),a.jsxs("div",{className:"hiw-step",children:[a.jsx("div",{className:"hiw-step-num",children:"2"}),a.jsxs("div",{className:"hiw-step-visual hiw-step-visual--log",children:[a.jsxs("div",{className:"hiw-shot-types",children:[a.jsx("div",{className:"hiw-shot-pill hiw-shot-pill--active",children:"Wrist"}),a.jsx("div",{className:"hiw-shot-pill",children:"Snap"}),a.jsx("div",{className:"hiw-shot-pill",children:"Slap"}),a.jsx("div",{className:"hiw-shot-pill",children:"BH"})]}),a.jsxs("div",{className:"hiw-shot-count",children:[a.jsx("span",{className:"hiw-shot-num",children:"50"}),a.jsx("span",{className:"hiw-shot-save",children:"Save →"})]})]}),a.jsx("div",{className:"hiw-step-text",children:"After practice, tap a shot type, enter how many, hit save. Takes 5 seconds."})]}),a.jsx("div",{className:"hiw-arrow",children:"→"}),a.jsxs("div",{className:"hiw-step",children:[a.jsx("div",{className:"hiw-step-num",children:"3"}),a.jsx("div",{className:"hiw-step-visual hiw-step-visual--board",children:[{name:"Liam K.",shots:191,you:!1},{name:"You",shots:168,you:!0},{name:"Jake T.",shots:84,you:!1}].map((p,x)=>a.jsxs("div",{className:`hiw-board-row${p.you?" hiw-board-row--you":""}`,children:[a.jsxs("span",{className:"hiw-board-pos",children:["#",x+1]}),a.jsx("span",{className:"hiw-board-name",children:p.name}),a.jsx("span",{className:"hiw-board-shots",children:p.shots})]},p.name))}),a.jsx("div",{className:"hiw-step-text",children:"See exactly where you rank on your team. Your coach and parents can see it too."})]})]}),a.jsx("div",{className:"hiw-footer",children:"Next time you open the app — you're straight to your dashboard. Just log and go."})]}),a.jsxs("section",{className:"section section--compete",children:[a.jsxs("div",{className:"section-head",children:[a.jsx("div",{className:"section-eyebrow",children:"⚔️ 1V1 BATTLES"}),a.jsx("h2",{className:"section-title",children:"You vs one rival. All week."}),a.jsx("p",{className:"section-sub",children:"Every Monday you get matched against one player from another team. Every shot you log counts. Most shots by Sunday wins. Then it resets and you get a new rival."})]}),a.jsx(mw,{})]}),a.jsxs("section",{className:"section",children:[a.jsxs("div",{className:"section-head",children:[a.jsx("div",{className:"section-eyebrow",children:"FAQ"}),a.jsx("h2",{className:"section-title",children:"Quick answers"})]}),a.jsxs("div",{className:"faq-list",children:[a.jsxs("details",{className:"faq-item",children:[a.jsx("summary",{children:"Is it really free?"}),a.jsx("p",{children:"Yes. Players, parents, coaches, and clubs all use it free. No subscription, no app to download."})]}),a.jsxs("details",{className:"faq-item",children:[a.jsx("summary",{children:"Do kids need an email or password?"}),a.jsx("p",{children:"No. Parents sign in with their Google account. Kids pick a screen name and tap to log. That's it."})]}),a.jsxs("details",{className:"faq-item",children:[a.jsx("summary",{children:"What can players track?"}),a.jsx("p",{children:"Shots (wrist, snap, slap, backhand), saves for goalies, and stickhandling drills. Takes 5 seconds to log a session."})]}),a.jsxs("details",{className:"faq-item",children:[a.jsx("summary",{children:"How do coaches get their team on it?"}),a.jsx("p",{children:"Sign in with Google, set up your team, and you get one invite link. Send it to parents — they tap it, sign up, and their kid appears on your team leaderboard."})]})]})]}),a.jsxs("section",{className:"final-cta",children:[a.jsxs("h2",{className:"final-cta-title",children:["Go shoot some pucks.",a.jsx("br",{}),"Then log it."]}),a.jsxs("div",{className:"final-cta-paths",children:[a.jsx("button",{className:"final-cta-btn final-cta-btn--player",onClick:()=>e("/player"),children:"I'm a player or parent →"}),a.jsx("button",{className:"final-cta-btn final-cta-btn--coach",onClick:()=>e("/coach"),children:"I'm a coach →"})]}),a.jsx("div",{className:"final-cta-sub",children:"Free. No app to download. Takes 2 minutes to sign up."}),a.jsx("button",{className:"final-cta-guide",onClick:()=>e("/blog/getting-started"),children:"New to this? Read the parent guide →"})]}),a.jsx(Ml,{}),a.jsxs("footer",{className:"land-footer",children:[a.jsxs("button",{className:"foot-brand",onClick:()=>e("/"),children:[a.jsx(Hu,{}),a.jsx("span",{children:"Hockey Shot Challenge"})]}),a.jsxs("div",{className:"foot-links",children:[a.jsx("button",{className:"foot-link",onClick:()=>e("/for-clubs"),children:"For clubs"}),a.jsx("button",{className:"foot-link",onClick:()=>e("/coach"),children:"Coaches"}),a.jsx("button",{className:"foot-link",onClick:()=>e("/blog"),children:"Guides"}),a.jsx("button",{className:"foot-link",onClick:()=>e("/start"),children:"Sign in"}),a.jsx("button",{className:"foot-link",onClick:()=>e("/privacy"),children:"Privacy"})]}),a.jsxs("div",{className:"foot-copy",children:["© ",new Date().getFullYear()," Hockey Shot Challenge · Built in Burlington, ON"]})]}),a.jsx("style",{children:gw})]})}function fw(){return a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 18 18",style:{flexShrink:0},children:[a.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",fill:"#4285F4"}),a.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z",fill:"#34A853"}),a.jsx("path",{d:"M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z",fill:"#FBBC05"}),a.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z",fill:"#EA4335"})]})}function Hu(){return a.jsxs("svg",{width:"26",height:"26",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[a.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),a.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}function mw(){const n=Math.round(43.75);return a.jsx("div",{className:"sbm-wrap",children:a.jsxs("div",{className:"sbm-card",children:[a.jsxs("div",{className:"sbm-header",children:[a.jsx("div",{className:"sbm-eyebrow",children:"⚔️ 1V1 BATTLE · 3 DAYS LEFT"}),a.jsx("div",{className:"sbm-share-pill",children:"Share"})]}),a.jsxs("div",{className:"sbm-matchup",children:[a.jsxs("div",{className:"sbm-side",children:[a.jsx("div",{className:"sbm-name sbm-name--me",children:"You"}),a.jsx("div",{className:"sbm-score",children:147}),a.jsx("div",{className:"sbm-logged",children:"✓ logged today"})]}),a.jsx("div",{className:"sbm-vs",children:"VS"}),a.jsxs("div",{className:"sbm-side sbm-side--right",children:[a.jsx("div",{className:"sbm-name",children:"Tyler B."}),a.jsx("div",{className:"sbm-score sbm-score--lead",children:189}),a.jsx("div",{className:"sbm-logged sbm-logged--rival",children:"✓ logged today"})]})]}),a.jsx("div",{className:"sbm-bar-track",children:a.jsx("div",{className:"sbm-bar-fill",style:{width:`${n}%`}})}),a.jsx("div",{className:"sbm-rival-team",children:"Oakville U14 AA · resets Monday"}),a.jsx("div",{className:"sbm-status",children:"💪 Down 42 shots — time to push"}),a.jsx("div",{className:"sbm-log-btn",children:"+ Log shots now"})]})})}const gw=`
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
`;function xw(){const e=we(),[t,r]=v.useState(""),[n,s]=v.useState([]),[i,o]=v.useState(!1),l=v.useRef(null),c=v.useRef(null);return v.useEffect(()=>{ze({title:"Hockey Clubs — Team Leaderboards & Off-Ice Training Tracker",description:"Find your hockey club or association on Hockey Shot Challenge. See team leaderboards, share signup links with coaches and parents, and track off-ice training across your whole association.",url:`${ee}/for-clubs`}),Gr({"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"What do players do on Hockey Shot Challenge?",acceptedAnswer:{"@type":"Answer",text:"Players log shots and stickhandling reps at home — driveway, basement, wherever. It takes 5 seconds. The more they log, the higher they climb on the team leaderboard."}},{"@type":"Question",name:"What do coaches see on Hockey Shot Challenge?",acceptedAnswer:{"@type":"Answer",text:"Coaches see a dashboard showing every player's weekly shot count, streak, and rank. You know who's putting in work before practice even starts."}},{"@type":"Question",name:"What does Hockey Shot Challenge cost?",acceptedAnswer:{"@type":"Answer",text:"Free. For coaches, players, parents, and clubs. No paid tier, no subscription, no app to download."}},{"@type":"Question",name:"Do kids need a password for Hockey Shot Challenge?",acceptedAnswer:{"@type":"Answer",text:"No. Parents sign in with their Google account and set up their child's profile. Kids just tap and log."}}]}),setTimeout(()=>{var d;return(d=c.current)==null?void 0:d.focus()},100)},[]),v.useEffect(()=>{if(l.current&&clearTimeout(l.current),!t.trim()||t.trim().length<2){s([]),o(!1);return}return o(!0),l.current=setTimeout(async()=>{try{const d=await Vr(t,8);s(d||[])}catch{s([])}finally{o(!1)}},200),()=>{l.current&&clearTimeout(l.current)}},[t]),a.jsxs("div",{className:"fcl-wrap",children:[a.jsxs("nav",{className:"fcl-nav",children:[a.jsx("button",{className:"fcl-back",onClick:()=>e("/"),children:"← Back"}),a.jsx("button",{className:"fcl-nav-cta",onClick:()=>e("/coach/start"),children:"Set up a team →"})]}),a.jsxs("section",{className:"fcl-hero",children:[a.jsx("div",{className:"fcl-eyebrow",children:"CLUBS & ASSOCIATIONS"}),a.jsx("h1",{className:"fcl-title",children:"Find your club."}),a.jsx("p",{className:"fcl-sub",children:"Search for your association to see team leaderboards and get sharing links for your coaches and parents."}),a.jsxs("div",{className:"fcl-search-wrap",children:[a.jsx("input",{ref:c,type:"text",className:"fcl-search-input",placeholder:"Burlington Eagles, Mississauga…",value:t,onChange:d=>r(d.target.value),autoComplete:"off",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false"}),t.trim().length>=2&&a.jsxs("div",{className:"fcl-search-dropdown",children:[i&&n.length===0&&a.jsx("div",{className:"fcl-search-status",children:"Searching…"}),!i&&n.length===0&&a.jsxs("div",{className:"fcl-search-empty",children:[a.jsxs("div",{className:"fcl-search-empty-title",children:['No clubs found for "',t,'"']}),a.jsx("div",{className:"fcl-search-empty-sub",children:"Your association might not be on here yet."}),a.jsx("button",{className:"fcl-search-add-btn",onClick:()=>e("/coach/start"),children:"Set up your club — free →"})]}),n.map(d=>a.jsxs("button",{className:"fcl-search-result",onClick:()=>e(`/clubs/${d.slug}`),children:[a.jsxs("div",{className:"fcl-result-left",children:[a.jsx("div",{className:"fcl-result-name",children:d.name}),a.jsx("div",{className:"fcl-result-meta",children:[d.city,d.governing_body].filter(Boolean).join(" · ")})]}),a.jsx("div",{className:"fcl-result-arrow",children:"→"})]},d.id))]})]})]}),a.jsx("section",{className:"fcl-what",children:a.jsxs("div",{className:"fcl-what-inner",children:[a.jsx("div",{className:"fcl-eyebrow",children:"WHAT YOUR CLUB PAGE HAS"}),a.jsxs("div",{className:"fcl-what-grid",children:[a.jsxs("div",{className:"fcl-what-card",children:[a.jsx("div",{className:"fcl-what-icon",children:"📊"}),a.jsx("div",{className:"fcl-what-title",children:"Team leaderboards"}),a.jsx("div",{className:"fcl-what-text",children:"See which teams are logging the most shots this week, all on one page."})]}),a.jsxs("div",{className:"fcl-what-card",children:[a.jsx("div",{className:"fcl-what-icon",children:"🔗"}),a.jsx("div",{className:"fcl-what-title",children:"Links to share"}),a.jsx("div",{className:"fcl-what-text",children:"Send your club page to coaches to set up their teams. Send parent links so players can sign up."})]}),a.jsxs("div",{className:"fcl-what-card",children:[a.jsx("div",{className:"fcl-what-icon",children:"🏆"}),a.jsx("div",{className:"fcl-what-title",children:"Top players"}),a.jsx("div",{className:"fcl-what-text",children:"Who's logging the most shots across all teams this week."})]})]})]})}),a.jsx("section",{className:"fcl-notlisted",children:a.jsxs("div",{className:"fcl-notlisted-inner",children:[a.jsx("div",{className:"fcl-eyebrow",children:"NOT LISTED YET?"}),a.jsx("h2",{className:"fcl-section-title",children:"Set up your club in 2 minutes."}),a.jsx("p",{className:"fcl-section-sub",children:"Any coach can set up a team and get the club on the leaderboard. Sign in with Google, pick your age group and tier, and your club page goes live automatically."}),a.jsx("button",{className:"fcl-cta",onClick:()=>e("/coach/start"),children:"Set up my team — free →"}),a.jsx("p",{className:"fcl-cta-hint",children:"Takes 2 minutes. Sign in with Google."})]})}),a.jsx("section",{className:"fcl-pitch",children:a.jsxs("div",{className:"fcl-pitch-inner",children:[a.jsx("div",{className:"fcl-eyebrow",children:"WHAT THIS IS"}),a.jsxs("div",{className:"fcl-pitch-grid",children:[a.jsxs("div",{className:"fcl-pitch-item",children:[a.jsx("div",{className:"fcl-pitch-q",children:"What do players do?"}),a.jsx("div",{className:"fcl-pitch-a",children:"Log shots and stickhandling reps at home — driveway, basement, wherever. It takes 5 seconds. The more they log, the higher they climb on the team leaderboard."})]}),a.jsxs("div",{className:"fcl-pitch-item",children:[a.jsx("div",{className:"fcl-pitch-q",children:"What do coaches see?"}),a.jsx("div",{className:"fcl-pitch-a",children:"A dashboard showing every player's weekly shot count, streak, and rank. You know who's putting in work before practice even starts."})]}),a.jsxs("div",{className:"fcl-pitch-item",children:[a.jsx("div",{className:"fcl-pitch-q",children:"What does it cost?"}),a.jsx("div",{className:"fcl-pitch-a",children:"Free. For coaches, players, parents, and clubs. No paid tier, no subscription, no app to download."})]}),a.jsxs("div",{className:"fcl-pitch-item",children:[a.jsx("div",{className:"fcl-pitch-q",children:"Do kids need a password?"}),a.jsx("div",{className:"fcl-pitch-a",children:"No. Parents sign in with their Google account and set up their kid's profile. Kids just tap and log."})]})]})]})}),a.jsxs("footer",{className:"fcl-footer",children:[a.jsx("button",{className:"fcl-foot-link",onClick:()=>e("/"),children:"← Home"}),a.jsx("button",{className:"fcl-foot-link",onClick:()=>e("/blog"),children:"Parent guides"}),a.jsxs("span",{className:"fcl-foot-copy",children:["© ",new Date().getFullYear()," Hockey Shot Challenge"]})]}),a.jsx("style",{children:vw})]})}const vw=`
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
`;function yw(){const{slug:e}=Mc(),t=we(),[r,n]=v.useState(null),[s,i]=v.useState(null),[o,l]=v.useState([]),[c,d]=v.useState(null),[h,u]=v.useState([]),[p,x]=v.useState([]),[y,b]=v.useState(!0),[w,g]=v.useState(!1),[f,m]=v.useState(!1),[k,N]=v.useState(!1),[S,_]=v.useState(!1),[L,G]=v.useState(!1);v.useEffect(()=>{let P=!1;async function M(){b(!0);const F=await Qa(e);if(P)return;if(!F){g(!0),b(!1),ze({title:"Club not found",description:"This club hasn't been set up on Hockey Shot Challenge yet.",url:`${ee}/clubs/${e}`,noindex:!0});return}n(F);const[H,re,Be,Ge,Ce]=await Promise.all([Wc(F.id),qc(F.id),Kf(F.id),Yf(F.id),cw(F.id,5)]);if(P)return;i(H),l(re),d(Be),u(Ge),x(Ce),b(!1);const O=F.city?`, ${F.city}`:"";ze({title:`${F.name}${O} — Off-Ice Training`,description:`Off-ice shot tracking and skill training for ${F.name}${O}. Coaches set up teams in 2 minutes. Players log shots and compete on the leaderboard. Free.`,url:`${ee}/clubs/${e}`}),Gr({"@context":"https://schema.org","@type":"SportsOrganization",name:F.name,sport:"Ice Hockey",url:`${ee}/clubs/${e}`,...F.city?{address:{"@type":"PostalAddress",addressLocality:F.city,addressCountry:"CA"}}:{},memberOf:{"@type":"Organization",name:"Hockey Shot Challenge",url:ee}})}return M(),()=>{P=!0}},[e]);const C=`${ee}/clubs/${e}`,Z=`${ee}/start?club=${e}`,le=async()=>{const P=r?`Hey coaches — set up your ${r.name} team on Hockey Shot Challenge. Sign in with Google, pick your age and tier, get a player invite link. 2 minutes, free: ${C}`:C;try{navigator.share?(await navigator.share({title:`${r==null?void 0:r.name} — Hockey Shot Challenge`,text:P,url:C}),_(!0),setTimeout(()=>_(!1),2500)):(await navigator.clipboard.writeText(C),m(!0),setTimeout(()=>m(!1),2500))}catch{}},ue=async()=>{try{await navigator.clipboard.writeText(C),m(!0),setTimeout(()=>m(!1),2500)}catch{}},De=async()=>{var re;if(!c||!r)return;const P=h.find(Be=>Be.week_shots>0),M=P?` ${P.age_division} ${P.tier} leads with ${P.week_shots.toLocaleString()} shots.`:"",F=h.length>1&&((re=h[1])==null?void 0:re.week_shots)>0?` Can ${h[1].age_division} ${h[1].tier} catch up by Sunday?`:"",H=`${r.name} — ${c.thisWeekTotal.toLocaleString()} shots logged this week.${M}${F} 🏒 ${C}`;try{navigator.share?await navigator.share({title:`${r.name} — this week`,text:H,url:C}):(await navigator.clipboard.writeText(H),G(!0),setTimeout(()=>G(!1),2500))}catch{}};if(y)return a.jsxs("div",{className:"club-screen",children:[a.jsx(zs,{nav:t}),a.jsx("div",{className:"club-loading",children:"Loading…"}),a.jsx("style",{children:Rs})]});if(w)return a.jsxs("div",{className:"club-screen",children:[a.jsx(zs,{nav:t}),a.jsxs("div",{className:"club-404",children:[a.jsx("h1",{className:"club-404-title",children:"Club not found."}),a.jsx("p",{className:"club-404-text",children:"We couldn't find a club at that URL. Try searching from the home page."}),a.jsx("button",{className:"club-btn-primary",onClick:()=>t("/"),children:"← Back to home"})]}),a.jsx("style",{children:Rs})]});const Re=(s==null?void 0:s.playerCount)>0||(s==null?void 0:s.totalShots)>0,ve="/coach/start",I=`/start?club=${e}`,R=async()=>{try{await navigator.clipboard.writeText(Z),N(!0),setTimeout(()=>N(!1),2500)}catch{}},D=async()=>{const P=r?`Sign your player up for ${r.name} on Hockey Shot Challenge. They'll log shots and stickhandling reps at home, compete with teammates, and earn ranks. Free — takes 30 seconds: ${Z}`:Z;try{navigator.share?await navigator.share({title:`Sign up for ${r==null?void 0:r.name}`,text:P,url:Z}):(await navigator.clipboard.writeText(Z),N(!0),setTimeout(()=>N(!1),2500))}catch{}},$=["Hey coaches,","",`We're setting up Hockey Shot Challenge for ${r.name} this season. It's a free off-ice training tool for your players — they log shots at home (driveway, basement, wherever), follow skill videos, and compete on a team leaderboard. You can see who's putting in work between practices.`,"","To get your team on the platform:",`1. Go to ${C}`,"2. Sign in with Google","3. Pick your age group and tier","4. Get your player invite link and send it to your parents","","Takes 2 minutes. Free for coaches, players, and parents.","",`${C}`].join("%0A"),V=`mailto:?subject=Set up your ${r.name} team — Hockey Shot Challenge&body=${$}`;if(!Re)return a.jsxs("div",{className:"club-screen",children:[a.jsx(zs,{nav:t}),a.jsxs("section",{className:"club-hero",children:[a.jsxs("h1",{className:"club-h1",children:[a.jsx("span",{className:"club-h1-name",children:r.name}),a.jsx("span",{className:"club-h1-em",children:"isn't set up yet."})]}),a.jsx("p",{className:"club-lede",children:"Are you a coach or a director? Pick your path below."}),a.jsxs("div",{className:"club-paths",children:[a.jsxs("div",{className:"club-path-card",children:[a.jsx("div",{className:"club-path-eyebrow",children:"I'M A COACH"}),a.jsx("h2",{className:"club-path-title",children:"Set up my team"}),a.jsx("p",{className:"club-path-text",children:"Sign in with Google, pick your age group and tier, get a player invite link. Takes 2 minutes. Free."}),a.jsxs("button",{className:"club-google-btn",onClick:()=>t(ve),children:[a.jsx(Wu,{}),"Set up my team — free"]})]}),a.jsxs("div",{className:"club-path-card",children:[a.jsx("div",{className:"club-path-eyebrow",children:"I'M A DIRECTOR"}),a.jsx("h2",{className:"club-path-title",children:"Send to my coaches"}),a.jsx("p",{className:"club-path-text",children:"Share this page. Each coach sets up their own team independently. You don't need to do anything after that."}),a.jsxs("div",{className:"club-share-row",children:[a.jsxs("button",{className:"club-share-btn",onClick:le,children:[a.jsx("span",{children:"💬"}),S?"Shared!":"Messages"]}),a.jsxs("a",{className:"club-share-btn",href:V,children:[a.jsx("span",{children:"✉️"}),"Email"]}),a.jsxs("button",{className:"club-share-btn",onClick:ue,children:[a.jsx("span",{children:"📋"}),f?"Copied!":"Copy link"]})]})]})]})]}),a.jsxs("section",{className:"club-section",children:[a.jsx("div",{className:"club-eyebrow-left",children:"HOW IT WORKS"}),a.jsxs("div",{className:"club-steps",children:[a.jsxs("div",{className:"club-step",children:[a.jsx("div",{className:"club-step-num",children:"1"}),a.jsxs("div",{children:[a.jsx("div",{className:"club-step-title",children:"Sign in with Google"}),a.jsx("div",{className:"club-step-text",children:"No password to create. One tap."})]})]}),a.jsxs("div",{className:"club-step",children:[a.jsx("div",{className:"club-step-num",children:"2"}),a.jsxs("div",{children:[a.jsx("div",{className:"club-step-title",children:"Pick your team"}),a.jsx("div",{className:"club-step-text",children:"Choose your age division and tier — U12 AAA, U15 A, etc."})]})]}),a.jsxs("div",{className:"club-step",children:[a.jsx("div",{className:"club-step-num",children:"3"}),a.jsxs("div",{children:[a.jsx("div",{className:"club-step-title",children:"Get your invite link"}),a.jsx("div",{className:"club-step-text",children:"Send it to your players and parents. They sign up in 30 seconds."})]})]})]})]}),a.jsxs("section",{className:"club-section",children:[a.jsx("div",{className:"club-eyebrow-left",children:"FOR PLAYERS & PARENTS"}),a.jsx("h2",{className:"club-h2",children:"What your players get."}),a.jsxs("div",{className:"club-loop",children:[a.jsxs("div",{className:"club-loop-card",children:[a.jsx("div",{className:"club-loop-icon",children:"🎯"}),a.jsx("div",{className:"club-loop-verb",children:"LOG"}),a.jsx("h3",{className:"club-loop-title",children:"Every off-ice shot."}),a.jsx("p",{className:"club-loop-text",children:"Driveway, basement, garage — every rep shows up on the team leaderboard. You see the work that used to be invisible."})]}),a.jsxs("div",{className:"club-loop-card",children:[a.jsx("div",{className:"club-loop-icon",children:"📺"}),a.jsx("div",{className:"club-loop-verb",children:"LEARN"}),a.jsx("h3",{className:"club-loop-title",children:"Skill video library."}),a.jsx("p",{className:"club-loop-text",children:"Shooting and stickhandling videos players can follow at home. Growing all season."})]}),a.jsxs("div",{className:"club-loop-card",children:[a.jsx("div",{className:"club-loop-icon",children:"⚔️"}),a.jsx("div",{className:"club-loop-verb",children:"COMPETE"}),a.jsx("h3",{className:"club-loop-title",children:"Team leaderboard."}),a.jsx("p",{className:"club-loop-text",children:"Players compete within the team, across the club, against rivals. You choose the challenge."})]})]})]}),a.jsxs("section",{className:"club-section club-parents",children:[a.jsx("div",{className:"club-eyebrow-left",children:"👨‍👩‍👧 FOR PARENTS"}),a.jsx("h2",{className:"club-h2",children:"Sign up your player."}),a.jsx("p",{className:"club-section-text",children:"Players can sign up now — your coach just needs to set up their team first. Once they do, your player's stats will show up on the leaderboard automatically."}),a.jsxs("div",{className:"club-parent-link-row",children:[a.jsx("div",{className:"club-parent-link-url",children:Z.replace("https://","")}),a.jsx("button",{className:"club-parent-link-copy",onClick:R,children:k?"✓ Copied":"Copy"})]}),a.jsxs("div",{className:"club-share-row",style:{marginTop:12},children:[a.jsxs("button",{className:"club-share-btn",onClick:D,children:[a.jsx("span",{children:"💬"})," Share via messages"]}),a.jsxs("button",{className:"club-share-btn",onClick:()=>t(I),children:[a.jsx("span",{children:"→"})," Sign up now"]})]})]}),a.jsx(Ml,{}),a.jsx(qu,{nav:t}),a.jsx("style",{children:Rs})]});const A=(c==null?void 0:c.thisWeekTotal)>0?`${c.thisWeekTotal.toLocaleString()} shots logged this week.`:null;return a.jsxs("div",{className:"club-screen",children:[a.jsx(zs,{nav:t}),a.jsxs("section",{className:"club-hero",children:[a.jsx("div",{className:"club-eyebrow",children:"ACTIVE ON HOCKEY SHOT CHALLENGE"}),a.jsx("h1",{className:"club-h1",children:a.jsx("span",{className:"club-h1-name",children:r.name})}),A?a.jsx("p",{className:"club-lede club-lede--headline",children:A}):a.jsxs("p",{className:"club-lede",children:[r.name," players are logging off-ice shots and competing on the team leaderboard."]}),a.jsxs("div",{className:"club-hero-meta",children:[a.jsxs("span",{className:"club-hero-meta-item",children:[s.teamCount," team",s.teamCount!==1?"s":""]}),a.jsx("span",{className:"club-hero-meta-dot",children:"·"}),a.jsxs("span",{className:"club-hero-meta-item",children:[s.playerCount," player",s.playerCount!==1?"s":""]}),a.jsx("span",{className:"club-hero-meta-dot",children:"·"}),a.jsxs("span",{className:"club-hero-meta-item",children:[s.totalShots.toLocaleString()," shots all-time"]})]}),a.jsx("div",{className:"club-ctas",children:a.jsx("button",{className:"club-btn-primary",onClick:()=>t(I),children:"Sign in / Join →"})})]}),h.length>0&&a.jsxs("section",{className:"club-section",children:[a.jsxs("div",{className:"club-section-header",children:[a.jsx("div",{className:"club-eyebrow-left",children:"⚔️ TEAM LEADERBOARD — THIS WEEK"}),(c==null?void 0:c.thisWeekTotal)>0&&a.jsx("button",{className:"club-share-week",onClick:De,children:L?"✓ Copied!":"Share →"})]}),a.jsx("div",{className:"club-board",children:h.map((P,M)=>{const F=M===0&&P.week_shots>0,H=(c==null?void 0:c.thisWeekTotal)>0?Math.max(4,Math.round(P.week_shots/c.thisWeekTotal*100)):0;return a.jsxs("div",{className:`club-board-row${F?" club-board-row--lead":""}`,children:[a.jsx("div",{className:"club-board-rank",children:F?"🥇":`#${M+1}`}),a.jsxs("div",{className:"club-board-info",children:[a.jsxs("div",{className:"club-board-name",children:[P.age_division," ",P.tier]}),a.jsx("div",{className:"club-board-bar-track",children:a.jsx("div",{className:"club-board-bar-fill",style:{width:P.week_shots>0?`${H}%`:"0%"}})})]}),a.jsx("div",{className:"club-board-shots",children:P.week_shots>0?P.week_shots.toLocaleString():"—"})]},P.id)})}),(c==null?void 0:c.thisWeekTotal)>0&&a.jsxs("div",{className:"club-board-foot",children:[c.activePlayers," active players this week",c.vsLastWeek!==null&&a.jsxs("span",{className:`club-board-delta ${c.vsLastWeek>=0?"club-board-delta--up":"club-board-delta--down"}`,children:[c.vsLastWeek>=0?" ↑":" ↓"," ",Math.abs(c.vsLastWeek),"% vs last week"]})]}),a.jsxs("p",{className:"club-teams-note",style:{marginTop:14},children:["Don't see your team? Ask your coach to set it up — or"," ",a.jsx("button",{className:"club-inline-link",onClick:()=>t(ve),children:"set it up yourself"}),"."]})]}),a.jsxs("section",{className:"club-section club-parents",children:[a.jsx("div",{className:"club-eyebrow-left",children:"👨‍👩‍👧 FOR PARENTS"}),a.jsx("h2",{className:"club-h2",children:"Sign up your player."}),a.jsx("p",{className:"club-section-text",children:"Send this link to parents. They sign in with Google, pick their kid's team, and they're on the leaderboard in 30 seconds."}),a.jsxs("div",{className:"club-parent-link-row",children:[a.jsx("div",{className:"club-parent-link-url",children:Z.replace("https://","")}),a.jsx("button",{className:"club-parent-link-copy",onClick:R,children:k?"✓ Copied":"Copy"})]}),a.jsxs("div",{className:"club-share-row",style:{marginTop:12},children:[a.jsxs("button",{className:"club-share-btn",onClick:D,children:[a.jsx("span",{children:"💬"})," Share via messages"]}),a.jsxs("button",{className:"club-share-btn",onClick:()=>t(I),children:[a.jsx("span",{children:"→"})," Sign up now"]})]})]}),p.length>0&&a.jsxs("section",{className:"club-section",children:[a.jsx("div",{className:"club-eyebrow-left",children:"🔥 TOP PLAYERS — THIS WEEK"}),a.jsx("div",{className:"club-players-board",children:p.map((P,M)=>a.jsxs("div",{className:`club-player-row${M===0?" club-player-row--lead":""}`,children:[a.jsx("div",{className:"club-player-rank",children:M===0?"🥇":`#${M+1}`}),a.jsxs("div",{className:"club-player-info",children:[a.jsx("div",{className:"club-player-name",children:P.display_name}),P.team&&a.jsxs("div",{className:"club-player-team",children:[P.team.age_division," ",P.team.tier]})]}),a.jsx("div",{className:"club-player-shots",children:P.week_shots.toLocaleString()})]},P.id))})]}),a.jsxs("section",{className:"club-section",children:[a.jsxs("h2",{className:"club-h2",children:["What ",r.name," players do here"]}),a.jsxs("div",{className:"club-loop",children:[a.jsxs("div",{className:"club-loop-card",children:[a.jsx("div",{className:"club-loop-icon",children:"🎯"}),a.jsx("div",{className:"club-loop-verb",children:"LOG"}),a.jsx("h3",{className:"club-loop-title",children:"Every off-ice shot."}),a.jsx("p",{className:"club-loop-text",children:"Driveway, basement, garage — every rep shows up on the team leaderboard. Coaches see the work that used to be invisible."})]}),a.jsxs("div",{className:"club-loop-card",children:[a.jsx("div",{className:"club-loop-icon",children:"📺"}),a.jsx("div",{className:"club-loop-verb",children:"LEARN"}),a.jsx("h3",{className:"club-loop-title",children:"Skill video library."}),a.jsx("p",{className:"club-loop-text",children:"Shooting and stickhandling videos players can follow at home. Growing all season."})]}),a.jsxs("div",{className:"club-loop-card",children:[a.jsx("div",{className:"club-loop-icon",children:"⚔️"}),a.jsx("div",{className:"club-loop-verb",children:"COMPETE"}),a.jsx("h3",{className:"club-loop-title",children:"Team leaderboard."}),a.jsx("p",{className:"club-loop-text",children:"Compete within your team, across the club, against rivals. New challenges each month."})]})]})]}),a.jsx("section",{className:"club-section club-coach-cta",children:a.jsxs("div",{className:"club-coach-inner",children:[a.jsxs("div",{className:"club-coach-text",children:[a.jsx("div",{className:"club-coach-eyebrow",children:"FOR COACHES"}),a.jsxs("h2",{className:"club-coach-title",children:["Coach at ",r.name,"?"]}),a.jsx("p",{className:"club-coach-sub",children:"Set up your team in 2 minutes. Sign in with Google, pick your age and tier, get your player invite link."})]}),a.jsxs("div",{className:"club-coach-actions",children:[a.jsxs("button",{className:"club-google-btn club-google-btn--sm",onClick:()=>t(ve),children:[a.jsx(Wu,{}),"Set up my team"]}),a.jsx("button",{className:"club-coach-dash",onClick:()=>t("/coach/dashboard"),children:"Go to my dashboard →"})]})]})}),a.jsxs("section",{className:"club-section club-director",children:[a.jsx("div",{className:"club-eyebrow-left",children:"FOR DIRECTORS & ADMINS"}),a.jsx("h2",{className:"club-h2",children:"Adding more teams?"}),a.jsx("p",{className:"club-section-text",children:"Send this page to any coach who hasn't set up their team yet. They sign in with Google, pick their team, and get their own player invite link."}),a.jsxs("div",{className:"club-share-row",children:[a.jsxs("button",{className:"club-share-btn",onClick:le,children:[a.jsx("span",{children:"💬"}),S?"Shared!":"Share via messages"]}),a.jsxs("a",{className:"club-share-btn",href:V,children:[a.jsx("span",{children:"✉️"}),"Email coaches"]}),a.jsxs("button",{className:"club-share-btn",onClick:ue,children:[a.jsx("span",{children:"📋"}),f?"Copied!":"Copy link"]})]})]}),a.jsx(Ml,{}),a.jsx(qu,{nav:t}),a.jsx("style",{children:Rs})]})}function Wu(){return a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg",style:{display:"block",flexShrink:0},children:[a.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z",fill:"#4285F4"}),a.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z",fill:"#34A853"}),a.jsx("path",{d:"M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z",fill:"#FBBC05"}),a.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z",fill:"#EA4335"})]})}function zs({nav:e}){return a.jsxs("nav",{className:"club-nav",children:[a.jsx(Jf,{nav:e}),a.jsx("button",{className:"club-nav-link",onClick:()=>e("/"),children:"← Home"})]})}function Jf({nav:e}){return a.jsxs("button",{className:"club-brand",onClick:()=>e("/"),children:[a.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[a.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),a.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]}),a.jsx("span",{children:"Hockey Shot Challenge"})]})}function qu({nav:e}){return a.jsxs("footer",{className:"club-footer",children:[a.jsx(Jf,{nav:e}),a.jsxs("div",{className:"club-foot-links",children:[a.jsx(yn,{to:"/",className:"club-foot-link",children:"Home"}),a.jsx(yn,{to:"/for-clubs",className:"club-foot-link",children:"For Clubs"})]}),a.jsxs("div",{className:"club-foot-copy",children:["© ",new Date().getFullYear()," Hockey Shot Challenge · Built in Burlington, ON"]})]})}const Rs=`
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
`;function bw(){const e=we(),[t,r]=v.useState(""),[n,s]=v.useState([]),[i,o]=v.useState(!1),[l,c]=v.useState(!1),[d,h]=v.useState(!1),u=v.useRef(null);v.useEffect(()=>{ze({title:"Free off-ice training for your whole association — Hockey Shot Challenge",description:"Coaches set up their own teams. Players track their own shots. You get the stats. Free for everyone, all season.",url:`${ee}/clubs`})},[]),v.useEffect(()=>{if(u.current&&clearTimeout(u.current),!t.trim()||t.trim().length<2){s([]),o(!1);return}return o(!0),u.current=setTimeout(async()=>{try{const f=await Vr(t);s(f||[])}catch{s([])}finally{o(!1)}},200),()=>{u.current&&clearTimeout(u.current)}},[t]);const p=`${ee}/clubs`,x="We're setting up Hockey Shot Challenge for our players this season. Free off-ice training — shot tracking, skill videos, and team leaderboards. Coaches: set up your team here 👇",y=async()=>{try{await navigator.clipboard.writeText(`${x}
${p}`),c(!0),setTimeout(()=>c(!1),2500)}catch{}},b=async()=>{try{await navigator.share({title:"Hockey Shot Challenge",text:x,url:p}),h(!0),setTimeout(()=>h(!1),2500)}catch{}},w=`https://twitter.com/intent/tweet?text=${encodeURIComponent(x)}&url=${encodeURIComponent(p)}`,g=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(p)}`;return a.jsxs("div",{className:"cs-wrap",children:[a.jsxs("nav",{className:"cs-nav",children:[a.jsxs("button",{className:"cs-brand",onClick:()=>e("/"),children:[a.jsx(Gu,{}),a.jsx("span",{children:"Hockey Shot Challenge"})]}),a.jsx("button",{className:"cs-nav-link",onClick:()=>e("/coach"),children:"I'm a coach →"})]}),a.jsxs("section",{className:"cs-hero",children:[a.jsx("div",{className:"cs-eyebrow",children:"FOR ASSOCIATION DIRECTORS"}),a.jsx("h1",{className:"cs-title",children:"Give your players something to do between practices."}),a.jsx("p",{className:"cs-sub",children:"Hockey Shot Challenge is a free training tool for your whole association. Coaches set up their own teams. Players track their shots at home. You get the numbers to talk about all season."}),a.jsx("div",{className:"cs-hero-search",children:a.jsxs("div",{className:"cs-search-wrap",children:[a.jsx("input",{type:"text",value:t,onChange:f=>r(f.target.value),placeholder:"Search by city or club name…",autoCapitalize:"none",autoCorrect:"off",spellCheck:"false",className:"cs-input"}),t.length>=2&&a.jsxs("div",{className:"cs-results",children:[i&&a.jsx("div",{className:"cs-status",children:"Searching…"}),!i&&n.length===0&&a.jsxs("div",{className:"cs-status",children:["No clubs found."," ",a.jsx("button",{className:"cs-link",onClick:()=>e("/coach"),children:"Add yours →"})]}),n.map(f=>a.jsxs("button",{className:"cs-result",onClick:()=>e(`/clubs/${f.slug}`),children:[a.jsxs("div",{children:[a.jsx("div",{className:"cs-result-name",children:f.name}),a.jsx("div",{className:"cs-result-meta",children:[f.city,f.governing_body,f.gender_type==="girls"?"Girls":null].filter(Boolean).join(" · ")})]}),a.jsx("span",{className:"cs-result-arrow",children:"→"})]},f.id))]})]})}),a.jsxs("div",{className:"cs-hero-ctas",children:[a.jsx("button",{className:"cs-cta-ghost",onClick:()=>e("/coach"),children:"I'm a coach →"}),a.jsx("button",{className:"cs-cta-ghost",onClick:()=>e("/rankings"),children:"🏆 See rankings →"})]})]}),a.jsxs("section",{className:"cs-section",children:[a.jsx("div",{className:"cs-eyebrow-left",children:"FOR BUSY DIRECTORS"}),a.jsx("h2",{className:"cs-h2",children:"You don't have to manage any of it."}),a.jsx("p",{className:"cs-body",children:"You share one link. Each coach finds their team and sets up in 2 minutes on their own. Players sign up from their phones. You don't chase anyone."}),a.jsxs("div",{className:"cs-zero-cards",children:[a.jsxs("div",{className:"cs-zero-card",children:[a.jsx("div",{className:"cs-zero-icon",children:"👆"}),a.jsx("div",{className:"cs-zero-title",children:"One link to share"}),a.jsx("div",{className:"cs-zero-text",children:"Send this page to your coaches. That's it. They do the rest."})]}),a.jsxs("div",{className:"cs-zero-card",children:[a.jsx("div",{className:"cs-zero-icon",children:"⚙️"}),a.jsx("div",{className:"cs-zero-title",children:"Coaches set up their own teams"}),a.jsx("div",{className:"cs-zero-text",children:"Each coach signs in with Google, picks their age and tier, and gets their own player invite link."})]}),a.jsxs("div",{className:"cs-zero-card",children:[a.jsx("div",{className:"cs-zero-icon",children:"📲"}),a.jsx("div",{className:"cs-zero-title",children:"Players sign up themselves"}),a.jsx("div",{className:"cs-zero-text",children:"No app to install. No email needed. Kids are signed up in 30 seconds."})]})]})]}),a.jsxs("section",{className:"cs-section cs-social",children:[a.jsx("div",{className:"cs-eyebrow-left",children:"SHARE WITH YOUR COACHES & COMMUNITY"}),a.jsx("h2",{className:"cs-h2",children:"Spread the word in one tap."}),a.jsx("p",{className:"cs-body",style:{marginBottom:20},children:"Post it to your association's social channels. Copy the text below and use it as-is, or make it your own."}),a.jsx("div",{className:"cs-post-preview",children:a.jsxs("div",{className:"cs-post-text",children:[x,a.jsx("br",{}),a.jsx("span",{className:"cs-post-url",children:p})]})}),a.jsxs("div",{className:"cs-social-btns",children:[a.jsxs("button",{className:"cs-social-btn cs-social-btn--copy",onClick:y,children:[a.jsx("span",{children:"📋"})," ",l?"Copied!":"Copy post"]}),a.jsxs("button",{className:"cs-social-btn cs-social-btn--share",onClick:b,children:[a.jsx("span",{children:"↗"})," ",d?"Shared!":"Share"]}),a.jsxs("a",{className:"cs-social-btn cs-social-btn--x",href:w,target:"_blank",rel:"noopener noreferrer",children:[a.jsx(ww,{})," Post on X"]}),a.jsxs("a",{className:"cs-social-btn cs-social-btn--fb",href:g,target:"_blank",rel:"noopener noreferrer",children:[a.jsx(kw,{})," Share on Facebook"]})]})]}),a.jsxs("section",{className:"cs-section cs-talk",children:[a.jsx("div",{className:"cs-eyebrow-left",children:"SOMETHING TO TALK ABOUT"}),a.jsx("h2",{className:"cs-h2",children:"Real numbers. All season long."}),a.jsx("p",{className:"cs-body",children:"Your players are putting in work at home. Now you can see it — and talk about it. Post it on your socials. Share it at your AGM. Show parents their kids are getting better."}),a.jsxs("div",{className:"cs-stat-examples",children:[a.jsxs("div",{className:"cs-stat-ex",children:[a.jsx("div",{className:"cs-stat-ex-num",children:"12,400"}),a.jsx("div",{className:"cs-stat-ex-label",children:"shots logged this month"})]}),a.jsxs("div",{className:"cs-stat-ex",children:[a.jsx("div",{className:"cs-stat-ex-num",children:"#2"}),a.jsx("div",{className:"cs-stat-ex-label",children:"in Ontario this season"})]}),a.jsxs("div",{className:"cs-stat-ex",children:[a.jsx("div",{className:"cs-stat-ex-num",children:"84%"}),a.jsx("div",{className:"cs-stat-ex-label",children:"of players active this week"})]})]}),a.jsx("p",{className:"cs-stat-note",children:"These are the kinds of numbers your association will have to share."})]}),a.jsxs("section",{className:"cs-section",children:[a.jsx("div",{className:"cs-eyebrow-left",children:"WHAT PLAYERS GET"}),a.jsx("h2",{className:"cs-h2",children:"Kids actually want to use it."}),a.jsx("p",{className:"cs-body",style:{marginBottom:20},children:"It's not homework. It's a game. Players log shots, follow skill videos, and compete against teammates and rival clubs every day."}),a.jsxs("div",{className:"cs-cards",children:[a.jsxs("div",{className:"cs-card",children:[a.jsx("div",{className:"cs-card-icon",children:"📺"}),a.jsx("h3",{className:"cs-card-title",children:"Skill videos"}),a.jsx("p",{className:"cs-card-text",children:"Shooting drills and stickhandling videos players follow at home. New videos added all season."})]}),a.jsxs("div",{className:"cs-card",children:[a.jsx("div",{className:"cs-card-icon",children:"🔥"}),a.jsx("h3",{className:"cs-card-title",children:"Daily challenges"}),a.jsx("p",{className:"cs-card-text",children:"New challenges keep players coming back. Streaks, personal bests, team goals."})]}),a.jsxs("div",{className:"cs-card",children:[a.jsx("div",{className:"cs-card-icon",children:"🏆"}),a.jsx("h3",{className:"cs-card-title",children:"Rankings at every level"}),a.jsx("p",{className:"cs-card-text",children:"Players compete within their team, across your whole association, and against every club on the platform."})]})]})]}),a.jsxs("section",{className:"cs-section cs-rankings",children:[a.jsx("div",{className:"cs-eyebrow-left",children:"HOW RANKINGS WORK"}),a.jsx("h2",{className:"cs-h2",children:"Start local. Go national."}),a.jsxs("div",{className:"cs-rank-levels",children:[a.jsxs("div",{className:"cs-rank-level",children:[a.jsx("div",{className:"cs-rank-num",children:"1"}),a.jsxs("div",{children:[a.jsx("div",{className:"cs-rank-title",children:"Beat your teammates"}),a.jsx("div",{className:"cs-rank-text",children:"Every player on the team is ranked. Who put in the most work this week?"})]})]}),a.jsx("div",{className:"cs-rank-connector",children:"↓"}),a.jsxs("div",{className:"cs-rank-level",children:[a.jsx("div",{className:"cs-rank-num",children:"2"}),a.jsxs("div",{children:[a.jsx("div",{className:"cs-rank-title",children:"Compete across your association"}),a.jsx("div",{className:"cs-rank-text",children:"U12 AAA vs U12 AA vs U12 A. All your teams, one board."})]})]}),a.jsx("div",{className:"cs-rank-connector",children:"↓"}),a.jsxs("div",{className:"cs-rank-level",children:[a.jsx("div",{className:"cs-rank-num",children:"3"}),a.jsxs("div",{children:[a.jsx("div",{className:"cs-rank-title",children:"Your association vs everyone"}),a.jsx("div",{className:"cs-rank-text",children:"Burlington vs Oakville vs Stoney Creek. See where your club stands across Ontario."})]})]})]})]}),a.jsxs("section",{className:"cs-section cs-free",children:[a.jsx("div",{className:"cs-free-badge",children:"$0"}),a.jsx("h2",{className:"cs-h2",children:"Free. No budget needed."}),a.jsx("p",{className:"cs-body",children:'No credit card. No trial. No "ask the board." Every coach, every player, every parent uses it free. All season, every season.'}),a.jsxs("div",{className:"cs-free-pills",children:[a.jsx("span",{className:"cs-pill",children:"✓ Free for coaches"}),a.jsx("span",{className:"cs-pill",children:"✓ Free for players"}),a.jsx("span",{className:"cs-pill",children:"✓ Free for parents"}),a.jsx("span",{className:"cs-pill",children:"✓ No app to install"})]})]}),a.jsxs("footer",{className:"cs-footer",children:[a.jsxs("button",{className:"cs-brand",onClick:()=>e("/"),children:[a.jsx(Gu,{}),a.jsx("span",{children:"Hockey Shot Challenge"})]}),a.jsxs("div",{className:"cs-foot-copy",children:["© ",new Date().getFullYear()," Hockey Shot Challenge · Built in Burlington, ON · Free for all youth hockey"]})]}),a.jsx("style",{children:jw})]})}function ww(){return a.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",style:{display:"block",flexShrink:0},children:a.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}function kw(){return a.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",style:{display:"block",flexShrink:0},children:a.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})}function Gu(){return a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[a.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),a.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const jw=`
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
`;function Nw(){var p;const{slug:e}=Mc(),t=we(),[r,n]=v.useState(null),[s,i]=v.useState({playerCount:0,teamCount:0,totalShots:0}),[o,l]=v.useState([]),[c,d]=v.useState(!0),[h,u]=v.useState(!1);return v.useEffect(()=>{e&&(async()=>{const x=await Qa(e);if(!x){u(!0),d(!1),ze({title:"Club not found",noindex:!0});return}n(x);const[y,b]=await Promise.all([Wc(x.id),qc(x.id)]);i(y),l(b),d(!1),ze({title:`Join ${x.name}`,description:`${x.name} is on Hockey Shot Challenge. ${y.playerCount} players, ${y.totalShots.toLocaleString()}+ shots logged. Join your team today.`,url:`${ee}/join/${x.slug}`})})()},[e]),c?a.jsxs("div",{className:"join-wrap join-loading",children:[a.jsx("div",{children:"Loading…"}),a.jsx("style",{children:_o})]}):h?a.jsxs("div",{className:"join-wrap",children:[a.jsxs("div",{className:"join-card",children:[a.jsx("h1",{className:"join-title",children:"Club not found"}),a.jsx("p",{className:"join-sub",children:"We couldn't find a club at that link. Double-check with the person who sent it."}),a.jsx("button",{className:"btn-primary-join",onClick:()=>t("/"),children:"Go to Hockey Shot Challenge"})]}),a.jsx("style",{children:_o})]}):a.jsxs("div",{className:"join-wrap",children:[a.jsxs("div",{className:"join-card",children:[a.jsxs("div",{className:"join-brand",children:[a.jsx(Sw,{}),a.jsx("span",{children:"Hockey Shot Challenge"})]}),a.jsx("div",{className:"join-crest",children:a.jsx("div",{className:"join-crest-letter",children:(p=r.name[0])==null?void 0:p.toUpperCase()})}),a.jsx("div",{className:"join-eyebrow",children:"YOU'VE BEEN INVITED TO JOIN"}),a.jsx("h1",{className:"join-title",children:r.name}),r.city&&a.jsx("div",{className:"join-city",children:r.city}),a.jsxs("div",{className:"join-stats",children:[a.jsxs("div",{className:"stat",children:[a.jsx("div",{className:"stat-num tnum",children:s.playerCount}),a.jsx("div",{className:"stat-label",children:"Players"})]}),a.jsxs("div",{className:"stat",children:[a.jsx("div",{className:"stat-num tnum",children:s.teamCount}),a.jsx("div",{className:"stat-label",children:"Teams"})]}),a.jsxs("div",{className:"stat",children:[a.jsx("div",{className:"stat-num tnum",children:s.totalShots.toLocaleString()}),a.jsx("div",{className:"stat-label",children:"Shots"})]})]}),a.jsxs("button",{className:"btn-primary-join",onClick:()=>t(`/start?club=${r.slug}`),children:["Join ",r.name," →"]}),a.jsx("div",{className:"join-hint",children:"Takes 30 seconds. No email needed."}),o.length>0&&a.jsxs("div",{className:"join-teams",children:[a.jsx("div",{className:"join-teams-label",children:"TEAMS IN THIS CLUB"}),a.jsxs("div",{className:"join-teams-list",children:[o.slice(0,10).map(x=>a.jsx("div",{className:"join-team-pill",children:x.name},x.id)),o.length>10&&a.jsxs("div",{className:"join-team-pill",children:["+",o.length-10," more"]})]})]})]}),a.jsx("div",{className:"join-foot",children:a.jsx("button",{className:"join-foot-link",onClick:()=>t("/"),children:"What is Hockey Shot Challenge? →"})}),a.jsx("style",{children:_o})]})}function Sw(){return a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[a.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),a.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const _o=`
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
`,Ys=[{name:"Rookie",floor:0,next:200},{name:"Junior",floor:200,next:750},{name:"Prospect",floor:750,next:2e3},{name:"Varsity",floor:2e3,next:5e3},{name:"Captain",floor:5e3,next:1e4},{name:"All-Star",floor:1e4,next:25e3},{name:"Legend",floor:25e3,next:1/0}];function Xa(e){var r;const t=Math.max(0,e||0);for(let n=Ys.length-1;n>=0;n--){const s=Ys[n];if(t>=s.floor){const i=s.next===1/0?0:s.next-s.floor,o=s.next===1/0?1:(t-s.floor)/i;let l,c,d;if(s.next===1/0)l="III",c=s.floor,d=s.floor;else{const x=i/3;o<1/3?(l="I",c=s.floor,d=s.floor+x):o<2/3?(l="II",c=s.floor+x,d=s.floor+2*x):(l="III",c=s.floor+2*x,d=s.next)}const h=d>c?(t-c)/(d-c):1,u=s.next===1/0?0:s.next-t,p=s.next===1/0?0:Math.max(0,Math.ceil(d-t));return{name:s.name,tier:l,fullName:`${s.name} ${l}`,progress:o,tierProgress:Math.min(1,Math.max(0,h)),shotsToNextRank:Math.max(0,u),shotsToNextTier:p,nextRankName:((r=Ys[n+1])==null?void 0:r.name)??null,isMax:s.next===1/0}}}return{name:"Rookie",tier:"I",fullName:"Rookie I",progress:0,tierProgress:0,shotsToNextRank:200,shotsToNextTier:67,nextRankName:"Junior",isMax:!1}}function _w(){var w,g,f;const{username:e}=Mc(),t=we(),[r,n]=v.useState(null),[s,i]=v.useState(null),[o,l]=v.useState(!0),[c,d]=v.useState(!1);if(v.useEffect(()=>{e&&(async()=>{const{data:m}=await z.from("players").select("id, username, display_name, position, lifetime_shots, current_streak, card_number, created_at, club_name, team:teams(id, name), club:clubs(id, name, slug)").eq("username",e).maybeSingle();if(!m){d(!0),l(!1),ze({title:"Card not found",noindex:!0});return}n(m);const k=Xa(m.lifetime_shots);ze({title:`${m.display_name}'s card`,description:`${k.fullName} · ${m.lifetime_shots.toLocaleString()} shots · Check out ${m.display_name}'s Hockey Shot Challenge card.`,url:`${ee}/card/${e}`});const N=await Gf(m.id);i(N),l(!1)})()},[e]),o)return a.jsxs("div",{className:"pc-wrap pc-loading",children:[a.jsx("div",{children:"Loading…"}),a.jsx("style",{children:Co})]});if(c)return a.jsxs("div",{className:"pc-wrap",children:[a.jsxs("div",{className:"pc-card",children:[a.jsx("h1",{style:{fontFamily:"var(--font-display)",fontSize:24,marginBottom:12},children:"Card not found"}),a.jsx("p",{style:{color:"var(--text-mute)",marginBottom:20},children:"We couldn't find a player with that username."}),a.jsx("button",{className:"pc-cta",onClick:()=>t("/"),children:"Go to Hockey Shot Challenge"})]}),a.jsx("style",{children:Co})]});const h=Xa(r.lifetime_shots),u=r.card_number?String(r.card_number).padStart(3,"0"):"000",p=r.position==="F"?"Forward":r.position==="D"?"Defense":"Goalie",x=s?Object.values(s).reduce((m,k)=>m+k,0):0,y=m=>x>0?Math.round(m/x*100):0,b=s?[{name:"Wrist",val:s.Wrist,pct:y(s.Wrist),color:"#2979ff"},{name:"Snap",val:s.Snap,pct:y(s.Snap),color:"#a8d4f5"},{name:"Slap",val:s.Slap,pct:y(s.Slap),color:"#ff7a29"},{name:"Backhand",val:s.Backhand,pct:y(s.Backhand),color:"#3dd68c"}].filter(m=>m.val>0):[];return a.jsxs("div",{className:"pc-wrap",children:[a.jsx("nav",{className:"pc-nav",children:a.jsxs("div",{className:"pc-brand",onClick:()=>t("/"),children:[a.jsx(Cw,{}),a.jsx("span",{children:"Hockey Shot Challenge"})]})}),a.jsxs("div",{className:"pc-inner",children:[a.jsxs("div",{className:"pc-card",children:[a.jsxs("div",{className:"pc-meta",children:[a.jsxs("div",{children:[a.jsxs("div",{className:"pc-meta-label",children:["HOCKEY SHOT CHALLENGE · ",new Date().getFullYear()]}),a.jsxs("div",{className:"pc-meta-handle",children:["@",r.username]})]}),a.jsxs("div",{style:{textAlign:"right"},children:[a.jsx("div",{className:"pc-meta-label",children:"CARD"}),a.jsxs("div",{className:"pc-meta-serial",children:["#",u]})]})]}),a.jsxs("div",{className:"pc-identity",children:[a.jsxs("div",{className:"pc-avatar",children:[a.jsxs("svg",{viewBox:"0 0 80 80",style:{width:"100%",height:"100%"},children:[a.jsx("polygon",{points:"40,4 72,22 72,58 40,76 8,58 8,22",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1.5"}),a.jsx("polygon",{points:"40,12 66,26 66,54 40,68 14,54 14,26",fill:"none",stroke:"#4a92ff",strokeWidth:"0.5",opacity:"0.6"})]}),a.jsx("div",{className:"pc-avatar-letters",children:r.display_name.slice(0,2).toUpperCase()})]}),a.jsxs("div",{style:{flex:1,minWidth:0},children:[a.jsx("div",{className:"pc-name",children:r.display_name}),a.jsxs("div",{className:"pc-pills",children:[a.jsx("div",{className:"pc-pill",children:p.toUpperCase()}),((w=r.team)==null?void 0:w.name)&&a.jsx("div",{className:"pc-pill",children:r.team.name}),(((g=r.club)==null?void 0:g.name)||r.club_name)&&a.jsx("div",{className:"pc-pill pc-pill--alt",children:((f=r.club)==null?void 0:f.name)||r.club_name})]})]})]}),a.jsxs("div",{className:"pc-rank",children:[a.jsx("div",{className:"pc-meta-label",children:"Current rank"}),a.jsxs("div",{className:"pc-rank-name",children:[h.name," ",a.jsx("span",{style:{color:"var(--gold)"},children:h.tier})]})]}),a.jsxs("div",{className:"pc-stats",children:[a.jsxs("div",{className:"pc-stat",children:[a.jsx("div",{className:"pc-stat-num",children:r.lifetime_shots.toLocaleString()}),a.jsx("div",{className:"pc-stat-label",children:"Lifetime"})]}),a.jsxs("div",{className:"pc-stat",children:[a.jsx("div",{className:"pc-stat-num",children:r.current_streak||0}),a.jsx("div",{className:"pc-stat-label",children:"Streak"})]}),a.jsxs("div",{className:"pc-stat",children:[a.jsx("div",{className:"pc-stat-num",children:r.position}),a.jsx("div",{className:"pc-stat-label",children:"Pos"})]})]}),b.length>0&&a.jsxs("div",{className:"pc-mix",children:[a.jsx("div",{className:"pc-meta-label",children:"Shot mix · lifetime"}),a.jsx("div",{className:"pc-mix-bar",children:b.map(m=>a.jsx("div",{style:{width:`${m.pct}%`,background:m.color}},m.name))}),a.jsx("div",{className:"pc-mix-legend",children:b.map(m=>a.jsxs("div",{className:"pc-mix-item",children:[a.jsx("span",{style:{color:m.color},children:"●"}),a.jsxs("span",{children:[m.name," ",m.pct,"%"]})]},m.name))})]})]}),a.jsx("button",{className:"pc-share",onClick:async()=>{const m=window.location.href,k=`Check out ${r.display_name}'s Hockey Shot Challenge card — ${r.lifetime_shots.toLocaleString()} shots, ${h.fullName}`;if(navigator.share)try{await navigator.share({title:r.display_name,text:k,url:m})}catch{}else await navigator.clipboard.writeText(m)},children:"Share this card ↗"}),a.jsx("button",{className:"pc-cta",onClick:()=>t("/start"),children:"Make your own card →"}),a.jsx("div",{className:"pc-hint",children:"Free. 30 seconds. No email needed."})]}),a.jsx("style",{children:Co})]})}function Cw(){return a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 40 40",style:{display:"block"},children:[a.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),a.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const Co=`
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
`;function Vu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:e.toLocaleString()}const Tw=["🥇","🥈","🥉"];function Ew(){var d,h;const[e,t]=v.useState([]),[r,n]=v.useState(null),[s,i]=v.useState(!0);v.useEffect(()=>{Promise.all([uw(),dw()]).then(([u,p])=>{t(u||[]),n(p)}).catch(u=>{console.error("Rankings error:",u),t([])}).finally(()=>i(!1))},[]);const o="https://hockeyshotchallenge.com/rankings",l=e[0]?`${e[0].name} leads Hockey Shot Challenge with ${Vu(e[0].total_shots)} shots fired! 🏒 Check the association rankings:`:"Check the Hockey Shot Challenge association rankings!",c=()=>{navigator.share?navigator.share({title:"Hockey Shot Challenge Rankings",text:l,url:o}):(navigator.clipboard.writeText(`${l} ${o}`),alert("Link copied!"))};return a.jsxs("div",{className:"rk-page",children:[a.jsxs("header",{className:"rk-header",children:[a.jsx(yn,{to:"/",className:"rk-back",children:"← Back"}),a.jsxs("div",{className:"rk-header-text",children:[a.jsx("h1",{className:"rk-title",children:"Association Rankings"}),a.jsx("p",{className:"rk-sub",children:"Total shots fired — all time"})]}),a.jsx("button",{className:"rk-share-btn",onClick:c,children:"Share"})]}),!s&&r&&a.jsxs("div",{className:"totw-card",children:[a.jsx("div",{className:"totw-eyebrow",children:"🏆 TEAM OF THE WEEK"}),a.jsxs("div",{className:"totw-name",children:[r.team.age_division," ",r.team.tier]}),a.jsxs("div",{className:"totw-club",children:[(d=r.team.club)==null?void 0:d.name,(h=r.team.club)!=null&&h.city?` · ${r.team.club.city}`:""]}),a.jsxs("div",{className:"totw-shots tnum",children:[r.shots.toLocaleString()," shots this week"]}),a.jsxs("div",{className:"totw-players",children:[r.players," active player",r.players!==1?"s":""]})]}),s&&a.jsx("div",{className:"rk-loading",children:"Loading rankings…"}),!s&&e.length===0&&a.jsxs("div",{className:"rk-empty",children:[a.jsx("p",{children:"No shots logged yet. Be the first association on the board!"}),a.jsx(yn,{to:"/clubs",className:"rk-cta-btn",children:"Find your association →"})]}),!s&&e.length>0&&a.jsx("div",{className:"rk-list",children:e.map((u,p)=>{const x=p+1,y=Tw[p]||null,b=p<3;return a.jsxs(yn,{to:`/clubs/${u.slug}`,className:`rk-row${b?" rk-row--top":""}`,children:[a.jsx("div",{className:`rk-rank${b?" rk-rank--top":""}`,children:y||a.jsxs("span",{className:"rk-rank-num",children:["#",x]})}),a.jsxs("div",{className:"rk-info",children:[a.jsx("div",{className:"rk-name",children:u.name}),a.jsxs("div",{className:"rk-location",children:[[u.city,u.province].filter(Boolean).join(", "),a.jsxs("span",{className:"rk-players",children:[" · ",u.player_count," player",u.player_count!==1?"s":""]})]})]}),a.jsxs("div",{className:"rk-shots",children:[a.jsx("span",{className:"rk-shots-num",children:Vu(u.total_shots)}),a.jsx("span",{className:"rk-shots-label",children:"shots"})]})]},u.club_id)})}),a.jsxs("div",{className:"rk-footer",children:[a.jsx("p",{className:"rk-footer-text",children:"Is your association missing?"}),a.jsx(yn,{to:"/clubs",className:"rk-footer-link",children:"Find your club →"})]}),a.jsx("style",{children:Aw})]})}const Aw=`
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
`,Pw=typeof window<"u"?window.location.origin:"";function zw(){const[e,t]=v.useState("signup"),[r,n]=v.useState(1),[s,i]=v.useState(null),[o,l]=v.useState(null),[c,d]=v.useState(""),[h,u]=v.useState(""),[p,x]=v.useState(null),[y,b]=v.useState(""),[w,g]=v.useState(""),[f,m]=v.useState(""),[k,N]=v.useState(null),[S,_]=v.useState(null),[L,G]=v.useState(""),[C,Z]=v.useState(""),[le,ue]=v.useState(""),[De,Re]=v.useState(""),[ve,I]=v.useState(""),[R,D]=v.useState(!1),[$,V]=v.useState(null),[A,P]=v.useState(""),[M,F]=v.useState([]),[H,re]=v.useState(!1),[Be,Ge]=v.useState(!1),Ce=v.useRef(null),[O,ke]=v.useState(""),[Te,Ee]=v.useState(!1),[he,Q]=v.useState(""),Me=we(),[$t]=Nf(),{player:Ut,loading:Dt,refresh:Mn}=It(),Fn=$t.get("oauth")==="1";v.useEffect(()=>{Fn&&!Dt&&(Ut?Me("/home",{replace:!0}):t("create"))},[Fn,Dt,Ut]),v.useEffect(()=>{ze({title:e==="signin"?"Sign in":"Create your card",description:"Sign up for Hockey Shot Challenge. Free. 30 seconds. No email needed.",noindex:!0})},[e]),v.useEffect(()=>{if(Ce.current&&clearTimeout(Ce.current),!A.trim()||A.trim().length<2){F([]),re(!1);return}return re(!0),Ce.current=setTimeout(async()=>{try{const j=await Vr(A,6);F(j||[])}catch{F([])}finally{re(!1)}},200),()=>{Ce.current&&clearTimeout(Ce.current)}},[A]),v.useEffect(()=>{const j=$t.get("club");j&&(async()=>{const J=await Qa(j);J&&(x(J),l("club"),u(J.name))})()},[$t]);const Hn=j=>{l(j),Q("")};function Wn(j){const J=parseInt((j||"").replace("U",""),10);return J?J<=10?"6-10":J<=14?"11-14":J<=18?"15-18":"18+":null}const qn=()=>{if(s||i("self"),o==="club"&&p){if(!y){Q("Pick your age division.");return}if(!w){Q("Pick your tier.");return}Q(""),n(2);return}if((o==="join"||o==="solo")&&$){if(!y){Q("Pick your age division.");return}if(!w){Q("Pick your tier.");return}Q(""),n(2);return}if(o==="join"&&!$&&!c.trim()){Q("Search for your club or enter a team name.");return}Q(""),n(2)},ss=async()=>{if(!O.trim()){Q("Add your first name so your coach knows who you are.");return}if(!f.trim()||!k){Q("Fill in your name and position.");return}const j=o==="club"&&p?p:$;if(j&&(!y||!w)){Q("Pick your age division and tier.");return}Q("");const J={path:o||"solo",signingUpFor:s||"self",clubId:(j==null?void 0:j.id)||null,clubName:(j==null?void 0:j.name)||null,ageDivision:y||null,tier:w||null,firstName:O.trim(),displayName:f.trim(),position:k,ageBracket:Wn(y)};localStorage.setItem("pendingProfile",JSON.stringify(J)),await Mu()},is=async()=>{Ee(!0),Q("");try{await Mb({username:L}),await Mn(),Me("/home")}catch{Q("Username not found. Check the spelling.")}finally{Ee(!1)}},E=async(j,J)=>{try{await navigator.clipboard.writeText(j),I(J),setTimeout(()=>I(""),2e3)}catch{}},Y=async()=>{const j=`Join my team on Hockey Shot Challenge! Team name: ${le}
${Pw}`;try{navigator.share?(await navigator.share({title:"Join my team on Hockey Shot Challenge",text:j}),D(!0),setTimeout(()=>D(!1),2e3)):(await navigator.clipboard.writeText(j),I("share"),setTimeout(()=>I(""),2e3))}catch{}};if(Fn&&!Dt&&!Ut){const j=(()=>{try{return JSON.parse(localStorage.getItem("pendingProfile")||"{}")}catch{return{}}})(),J=async()=>{if(!j.firstName||!j.displayName||!j.position){Q("Something went wrong. Please start over.");return}Ee(!0),Q("");try{let ce=null;j.clubId&&j.ageDivision&&j.tier&&(ce=(await Vf({clubId:j.clubId,ageDivision:j.ageDivision,tier:j.tier})).teamId),await Bl({firstName:j.firstName,displayName:j.displayName,position:j.position,ageBracket:j.ageBracket,teamId:ce,clubId:j.clubId,clubName:j.clubName}),localStorage.removeItem("pendingProfile"),await Mn(),Me("/home",{replace:!0})}catch(ce){Q(ce.message||"Something went wrong."),Ee(!1)}};if(j.firstName&&j.displayName&&j.position&&!Te&&!he)return J(),a.jsxs("div",{className:"auth-wrap",children:[a.jsx("div",{className:"auth-card",style:{textAlign:"center",padding:40},children:a.jsx("div",{style:{fontFamily:"var(--font-display)",color:"var(--text-mute)",letterSpacing:2,fontSize:12},children:"SETTING UP YOUR CARD…"})}),a.jsx("style",{children:Os})]});const Bt=async()=>{if(!O.trim()){Q("Add your first name.");return}if(!f.trim()||!k){Q("Fill in your name and position.");return}Ee(!0),Q("");try{await Bl({firstName:O.trim(),displayName:f.trim(),position:k,ageBracket:Wn(y)||null,clubId:($==null?void 0:$.id)||null,clubName:($==null?void 0:$.name)||null}),await Mn(),Me("/home",{replace:!0})}catch(ce){Q(ce.message||"Something went wrong.")}finally{Ee(!1)}};return a.jsxs("div",{className:"auth-wrap fade-in",children:[a.jsxs("div",{className:"auth-card",children:[a.jsxs("div",{className:"brand",children:[a.jsx(To,{}),a.jsxs("div",{className:"brand-name",children:["Hockey Shot",a.jsx("br",{}),"Challenge"]})]}),a.jsx("h2",{className:"auth-title",children:"Almost there."}),a.jsx("p",{className:"auth-sub",children:"One quick setup and you're in."}),a.jsxs("label",{className:"input-label",children:[a.jsx("span",{children:"First name (shown to your coach)"}),a.jsx("input",{type:"text",value:O,onChange:ce=>ke(ce.target.value),placeholder:"Your real first name",className:"input-field",autoFocus:!0})]}),a.jsxs("label",{className:"input-label",style:{marginTop:12},children:[a.jsx("span",{children:"Player name (on leaderboards)"}),a.jsx("input",{type:"text",value:f,onChange:ce=>m(ce.target.value),placeholder:"Same as your name, or a nickname",className:"input-field"})]}),a.jsx("div",{className:"label-sm",style:{marginTop:14},children:"Position"}),a.jsx("div",{className:"chip-row chip-row--3",children:["F","D","G"].map(ce=>a.jsxs("button",{className:`chip chip--big ${k===ce?"chip--active":""}`,onClick:()=>N(ce),children:[a.jsx("div",{className:"chip-letter",children:ce}),a.jsx("div",{className:"chip-sub",children:ce==="F"?"Forward":ce==="D"?"Defense":"Goalie"})]},ce))}),he&&a.jsx("div",{className:"error",children:he}),a.jsx("button",{className:"btn-primary",onClick:Bt,disabled:!O||!f||!k||Te,children:Te?"Setting up…":"Make my card →"})]}),a.jsx("style",{children:Os})]})}return e==="signin"?a.jsxs("div",{className:"auth-wrap fade-in",children:[a.jsxs("div",{className:"auth-card",children:[a.jsxs("div",{className:"brand",children:[a.jsx(To,{}),a.jsxs("div",{className:"brand-name",children:["Hockey Shot",a.jsx("br",{}),"Challenge"]})]}),a.jsx("h2",{className:"auth-title",children:"Welcome back."}),a.jsx("p",{className:"auth-sub",children:"Sign in with Google, or use your username if you set up an older account."}),a.jsxs("button",{className:"google-btn",onClick:()=>Mu(),style:{marginBottom:16},children:[a.jsx(Ku,{}),"Continue with Google"]}),a.jsx("div",{className:"or-divider",children:"or sign in with username"}),a.jsxs("label",{className:"input-label",style:{marginTop:8},children:[a.jsx("span",{children:"Username"}),a.jsx("input",{type:"text",value:L,onChange:j=>G(j.target.value.replace("@","")),placeholder:"e.g. connor7511",autoCapitalize:"none",autoCorrect:"off",spellCheck:"false",className:"input-field"})]}),he&&a.jsx("div",{className:"error",children:he}),a.jsx("button",{className:"btn-primary",onClick:is,disabled:!L||Te,children:Te?"Signing in…":"Sign in with username"}),a.jsx("button",{className:"btn-text",onClick:()=>{t("signup"),Q("")},children:"New here? Create a card"}),a.jsx("button",{className:"btn-text",onClick:()=>Me("/"),children:"← Back to home"})]}),a.jsx("style",{children:Os})]}):a.jsxs("div",{className:"auth-wrap fade-in",children:[a.jsxs("div",{className:"auth-card",children:[r===1&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"brand",children:[a.jsx(To,{}),a.jsxs("div",{className:"brand-name",children:["Hockey Shot",a.jsx("br",{}),"Challenge"]})]}),p?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"club-banner",children:[a.jsx("div",{className:"club-banner-label",children:"JOINING"}),a.jsx("div",{className:"club-banner-name",children:p.name}),p.city&&a.jsx("div",{className:"club-banner-city",children:p.city})]}),a.jsx("div",{className:"picker-label",children:"PICK YOUR TEAM"}),a.jsxs("label",{className:"input-label",children:[a.jsx("span",{children:"Age division"}),a.jsxs("select",{value:y,onChange:j=>b(j.target.value),className:"input-field",autoFocus:!0,children:[a.jsx("option",{value:"",children:"Pick one"}),ja.map(j=>a.jsx("option",{value:j,children:j},j))]})]}),a.jsxs("label",{className:"input-label",style:{marginTop:12},children:[a.jsx("span",{children:"Tier"}),a.jsxs("select",{value:w,onChange:j=>g(j.target.value),className:"input-field",children:[a.jsx("option",{value:"",children:"Pick one"}),Na.map(j=>a.jsx("option",{value:j,children:j},j))]})]}),a.jsx("div",{className:"path-hint",style:{marginTop:10},children:"Not sure? Ask your coach or pick the closest match."}),he&&a.jsx("div",{className:"error",style:{marginTop:12},children:he}),a.jsx("button",{className:"btn-primary",onClick:qn,disabled:!y||!w,style:{marginTop:16},children:"Continue →"}),a.jsx("button",{className:"btn-text",onClick:()=>{x(null),l(null),d(""),u(""),b(""),g("")},children:"Sign up without the club"})]}):a.jsxs(a.Fragment,{children:[a.jsx("h2",{className:"auth-title",children:"Let's get you set up."}),a.jsx("p",{className:"auth-sub",style:{marginBottom:14},children:"Takes 2 minutes. You'll sign in with Google at the end."}),a.jsxs("div",{className:"for-row",children:[a.jsx("div",{className:"for-label",children:"WHO ARE YOU SIGNING UP?"}),a.jsxs("div",{className:"for-options",children:[a.jsx("button",{className:`for-btn ${s==="self"?"for-btn--active":""}`,onClick:()=>{i("self"),Q("")},children:"Myself"}),a.jsx("button",{className:`for-btn ${s==="player"?"for-btn--active":""}`,onClick:()=>{i("player"),Q("")},children:"My kid"})]}),s==="player"&&a.jsx("div",{className:"for-parent-note",children:"Your Google account holds the profile. You can add more players later — one account for all your kids."})]}),a.jsxs("div",{className:`path-card ${o==="join"?"path-card--active":""}`,onClick:()=>Hn("join"),children:[a.jsxs("div",{className:"path-head",children:[a.jsx("div",{className:"path-icon",children:"🏒"}),a.jsxs("div",{children:[a.jsx("div",{className:"path-title",children:"Join a team"}),a.jsx("div",{className:"path-sub",children:"Compete with your teammates"})]}),a.jsx("div",{className:`path-check ${o==="join"?"path-check--active":""}`,children:o==="join"?"✓":""})]}),o==="join"&&a.jsx("div",{className:"path-body",children:$?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"join-club-selected",children:[a.jsx("div",{className:"join-club-selected-name",children:$.name}),$.city&&a.jsx("div",{className:"join-club-selected-city",children:$.city}),a.jsx("button",{className:"join-club-change",onClick:()=>{V(null),b(""),g("")},children:"Change"})]}),a.jsxs("label",{className:"input-label",style:{marginTop:12},children:[a.jsx("span",{children:"Age division"}),a.jsxs("select",{value:y,onChange:j=>b(j.target.value),className:"input-field",children:[a.jsx("option",{value:"",children:"Pick one"}),ja.map(j=>a.jsx("option",{value:j,children:j},j))]})]}),a.jsxs("label",{className:"input-label",style:{marginTop:10},children:[a.jsx("span",{children:"Tier"}),a.jsxs("select",{value:w,onChange:j=>g(j.target.value),className:"input-field",children:[a.jsx("option",{value:"",children:"Pick one"}),Na.map(j=>a.jsx("option",{value:j,children:j},j))]})]}),a.jsx("div",{className:"path-hint",style:{marginTop:6},children:"Not sure? Ask your coach."})]}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"path-hint",style:{marginBottom:10},children:"Search for your club to find your team."}),a.jsxs("div",{style:{position:"relative"},children:[a.jsx("input",{type:"text",value:A,onChange:j=>P(j.target.value),placeholder:"Burlington Eagles, Mississauga…",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false",className:"input-field",autoFocus:!0}),A.trim().length>=2&&a.jsxs("div",{className:"join-club-dropdown",children:[H&&a.jsx("div",{className:"join-club-status",children:"Searching…"}),!H&&M.length===0&&a.jsx("div",{className:"join-club-status",children:"No clubs found."}),M.map(j=>a.jsxs("button",{className:"join-club-result",onClick:()=>{V(j),P(""),F([])},children:[a.jsx("span",{className:"join-club-result-name",children:j.name}),j.city&&a.jsx("span",{className:"join-club-result-meta",children:j.city})]},j.id))]})]}),Be?a.jsxs(a.Fragment,{children:[a.jsxs("label",{className:"input-label",style:{marginTop:12},children:[a.jsx("span",{children:"Team name"}),a.jsx("input",{type:"text",value:c,onChange:j=>d(j.target.value.toUpperCase()),placeholder:"e.g. NORTHSTARS",autoCapitalize:"characters",autoCorrect:"off",spellCheck:"false",className:"input-field input-field--code"})]}),a.jsx("div",{className:"path-hint",children:"Same name as your teammates = same leaderboard."})]}):a.jsx("button",{className:"btn-text",style:{marginTop:6,fontSize:11},onClick:()=>Ge(!0),children:"My club isn't listed"})]})})]}),a.jsx("div",{className:"or-divider",children:"or"}),a.jsxs("div",{className:`path-card ${o==="solo"?"path-card--active":""}`,onClick:()=>{o!=="solo"&&Hn("solo")},children:[a.jsxs("div",{className:"path-head",children:[a.jsx("div",{className:"path-icon",children:"🎯"}),a.jsxs("div",{children:[a.jsx("div",{className:"path-title",children:"No team invite yet"}),a.jsx("div",{className:"path-sub",children:"Start on your own — you can join a team later"})]}),a.jsx("div",{className:`path-check ${o==="solo"?"path-check--active":""}`,children:o==="solo"?"✓":""})]}),o==="solo"&&a.jsxs("div",{className:"path-body",onClick:j=>j.stopPropagation(),children:[a.jsx("div",{className:"path-hint",style:{marginBottom:10},children:"Find your club so your stats count on the association leaderboard."}),$?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"join-club-selected",children:[a.jsx("div",{className:"join-club-selected-name",children:$.name}),$.city&&a.jsx("div",{className:"join-club-selected-city",children:$.city}),a.jsx("button",{className:"join-club-change",onClick:()=>{V(null),b(""),g("")},children:"Change"})]}),a.jsxs("label",{className:"input-label",style:{marginTop:12},children:[a.jsx("span",{children:"Age division"}),a.jsxs("select",{value:y,onChange:j=>b(j.target.value),className:"input-field",children:[a.jsx("option",{value:"",children:"Pick one"}),ja.map(j=>a.jsx("option",{value:j,children:j},j))]})]}),a.jsxs("label",{className:"input-label",style:{marginTop:10},children:[a.jsx("span",{children:"Tier"}),a.jsxs("select",{value:w,onChange:j=>g(j.target.value),className:"input-field",children:[a.jsx("option",{value:"",children:"Pick one"}),Na.map(j=>a.jsx("option",{value:j,children:j},j))]})]}),a.jsx("div",{className:"path-hint",style:{marginTop:6},children:"Not sure? Ask your coach."})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{style:{position:"relative"},children:[a.jsx("input",{type:"text",value:A,onChange:j=>P(j.target.value),placeholder:"Burlington Eagles, Mississauga…",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false",className:"input-field",autoFocus:!0}),A.trim().length>=2&&a.jsxs("div",{className:"join-club-dropdown",children:[H&&a.jsx("div",{className:"join-club-status",children:"Searching…"}),!H&&M.length===0&&a.jsx("div",{className:"join-club-status",children:"No clubs found."}),M.map(j=>a.jsxs("button",{className:"join-club-result",onClick:()=>{V(j),P(""),F([])},children:[a.jsx("span",{className:"join-club-result-name",children:j.name}),j.city&&a.jsx("span",{className:"join-club-result-meta",children:j.city})]},j.id))]})]}),Be?a.jsx("div",{className:"path-hint",style:{marginTop:8},children:"No problem — your stats will be personal for now. You can link your club later."}):a.jsx("button",{className:"btn-text",style:{marginTop:6,fontSize:11},onClick:()=>Ge(!0),children:"My club isn't listed"})]})]})]}),he&&a.jsx("div",{className:"error",style:{marginTop:12},children:he}),a.jsx("button",{className:"btn-primary",onClick:qn,disabled:!o,style:{marginTop:16},children:"Continue →"}),a.jsx("button",{className:"btn-text",onClick:()=>{t("signin"),Q("")},children:"Already playing? Sign in"}),a.jsx("button",{className:"btn-text",onClick:()=>Me("/"),children:"← Back to home"})]})]}),r===2&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"step-chip",children:"Step 2 of 2"}),a.jsx("h2",{className:"auth-title",children:s==="player"?"About your player.":"Who are you?"}),a.jsx("p",{className:"auth-sub",children:s==="player"?"Their coach will see their real name. Their leaderboard name is up to them.":"Your coach will see your real name. Your leaderboard name is up to you."}),a.jsxs("label",{className:"input-label",children:[a.jsx("span",{children:s==="player"?"Player's first name (shown to their coach)":"First name (shown to your coach)"}),a.jsx("input",{type:"text",value:O,onChange:j=>ke(j.target.value),placeholder:s==="player"?"Their real first name":"Your real first name",className:"input-field",autoFocus:!0})]}),a.jsxs("label",{className:"input-label",style:{marginTop:12},children:[a.jsx("span",{children:"Player name (on leaderboards)"}),a.jsx("input",{type:"text",value:f,onChange:j=>m(j.target.value),placeholder:s==="player"?"What do they go by?":"Same as your name, or a nickname",className:"input-field"})]}),a.jsx("div",{className:"label-sm",children:s==="player"?"Their position":"Position"}),a.jsx("div",{className:"chip-row chip-row--3",children:["F","D","G"].map(j=>a.jsxs("button",{className:`chip chip--big ${k===j?"chip--active":""}`,onClick:()=>N(j),children:[a.jsx("div",{className:"chip-letter",children:j}),a.jsx("div",{className:"chip-sub",children:j==="F"?"Forward":j==="D"?"Defense":"Goalie"})]},j))}),he&&a.jsx("div",{className:"error",children:he}),a.jsxs("button",{className:"google-btn",onClick:ss,disabled:!O||!f||!k||Te,style:{marginTop:8},children:[a.jsx(Ku,{}),Te?"One sec…":s==="player"?"Save with Google →":"Continue with Google →"]}),a.jsx("div",{className:"path-hint",style:{textAlign:"center",marginBottom:4},children:s==="player"?"Your Google account. Their player profile.":"No password. Google keeps your account safe."}),a.jsx("button",{className:"btn-text",onClick:()=>n(1),children:"← Back"})]}),r===3&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"celebration",children:[a.jsx("div",{className:"celebration-ring",children:a.jsx("div",{className:"celebration-inner",children:"🎉"})}),a.jsxs("div",{className:"celebration-title",children:["You're in, ",f,"!"]}),De&&a.jsxs("div",{className:"club-joined",children:["On ",De,le?` · ${le}`:""]})]}),a.jsxs("div",{className:"screenshot-hero",children:[a.jsx("div",{className:"screenshot-icon",children:"📸"}),a.jsx("div",{className:"screenshot-title",children:"Screenshot this screen!"}),a.jsx("div",{className:"screenshot-sub",children:"This is how you sign back in. If you lose it, you lose your shots."})]}),a.jsxs("div",{className:"username-big",children:[a.jsx("div",{className:"username-label",children:"YOUR USERNAME"}),a.jsxs("div",{className:"username-value-big",children:["@",C]}),a.jsx("button",{className:`copy-btn ${ve==="username"?"copy-btn--done":""}`,onClick:()=>E(C,"username"),children:ve==="username"?"✓ Copied":"Copy username"})]}),a.jsx("div",{className:"save-tips",children:"Text it to a parent so they have it too."}),le&&!p&&a.jsxs("div",{className:"invite-card",children:[a.jsxs("div",{className:"invite-top",children:[a.jsx("div",{className:"invite-label",children:"YOUR TEAM"}),a.jsx("div",{className:"invite-team-name",children:le})]}),a.jsx("div",{className:"invite-hint",children:"Tell your teammates the team name so they can join you."}),a.jsx("button",{className:"invite-btn",onClick:Y,children:R||ve==="share"?"✓ Ready to send":"↗ Invite teammates"})]}),p&&le&&a.jsxs("div",{className:"invite-card",children:[a.jsxs("div",{className:"invite-top",children:[a.jsx("div",{className:"invite-label",children:"YOUR TEAM"}),a.jsx("div",{className:"invite-team-name",children:le})]}),a.jsx("div",{className:"invite-hint",children:"Tell your teammates the age & tier so they can join you."})]}),a.jsx("button",{className:"btn-primary",onClick:()=>Me("/home"),children:"Got it — let's shoot 🏒"})]})]}),a.jsx("style",{children:Os})]})}function Ku(){return a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg",style:{display:"block",flexShrink:0},children:[a.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z",fill:"#4285F4"}),a.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z",fill:"#34A853"}),a.jsx("path",{d:"M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z",fill:"#FBBC05"}),a.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z",fill:"#EA4335"})]})}function To(){return a.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[a.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),a.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const Os=`
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
`;async function Rw({clubId:e,coachId:t,ageDivision:r,tier:n,season:s="2025-26"}){const{data:i,error:o}=await z.rpc("find_or_create_team",{p_club_id:e,p_coach_id:t,p_age_division:r,p_tier:n,p_season:s});if(o)throw o;const l=Array.isArray(i)?i[0]:i;if(!l)throw new Error("No team result");return{teamId:l.team_id,teamExisted:l.team_existed,ownerCoachName:l.owner_coach_name,isOwner:l.is_owner}}async function Ow({teamId:e,pendingCoachId:t,approverCoachId:r}){const{data:n,error:s}=await z.rpc("approve_team_coach",{p_team_id:e,p_pending_coach_id:t,p_approver_coach_id:r});if(s)throw s;return n}async function Lw(e){if(!e)return[];const{data:t}=await z.from("team_coaches").select("role, team:teams(id, name, age_division, tier, season, team_code, club:clubs(id, name, slug))").eq("coach_id",e).in("role",["owner","coach"]);return(t||[]).map(r=>({...r.team,role:r.role}))}async function Yu(e){if(!e)return[];const{data:t}=await z.from("team_coaches").select("team_id").eq("coach_id",e).eq("role","owner"),r=(t||[]).map(s=>s.team_id);if(r.length===0)return[];const{data:n}=await z.from("team_coaches").select("id, team_id, requested_at, coach:coaches(id, display_name, email), team:teams(id, name)").in("team_id",r).eq("role","pending").order("requested_at");return n||[]}async function Iw({teamId:e,coachId:t}){const{data:r,error:n}=await z.rpc("create_team_invite",{p_team_id:e,p_coach_id:t});if(n)throw n;return r}async function $w(e){if(!e)return null;const{data:t}=await z.from("team_invites").select("id, code, uses_count, max_uses, expires_at, created_at").eq("team_id",e).eq("is_active",!0).order("created_at",{ascending:!1}).limit(1).maybeSingle();return t}async function Ju({teamId:e,coachId:t}){const r=await $w(e);return r?r.code:await Iw({teamId:e,coachId:t})}function Uw(){const e=we(),[t]=Nf(),[r,n]=v.useState("intro"),[s,i]=v.useState(1),[o,l]=v.useState(""),[c,d]=v.useState(""),[h,u]=v.useState(""),[p,x]=v.useState([]),[y,b]=v.useState(!1),[w,g]=v.useState(null),f=v.useRef(null),[m,k]=v.useState(!1),[N,S]=v.useState(!1),[_,L]=v.useState(!1),[G,C]=v.useState(""),[Z,le]=v.useState(""),[ue,De]=v.useState(""),[Re,ve]=v.useState(""),[I,R]=v.useState(!1),[D,$]=v.useState(""),[V,A]=v.useState(""),[P,M]=v.useState(!1),[F,H]=v.useState("");v.useEffect(()=>{ze({title:"For coaches & clubs",description:"Find your association, set up your team, invite your players. Free.",url:`${ee}/coach`})},[]),v.useEffect(()=>{if(!N)return;let O=!1;return(async()=>{var ke,Te,Ee;try{const he=await ca();if(O)return;if(he){e("/coach/dashboard",{replace:!0});return}const{data:{session:Q}}=await z.auth.getSession();if(O||!(Q!=null&&Q.user))return;const Me=Q.user;if(!(((ke=Me.app_metadata)==null?void 0:ke.provider)==="google"||(Me.identities||[]).some(Ut=>Ut.provider==="google")))return;l(((Te=Me.user_metadata)==null?void 0:Te.full_name)||((Ee=Me.user_metadata)==null?void 0:Ee.name)||""),d(Me.email||""),R(!0),n("signup"),i(m?3:2)}catch{}})(),()=>{O=!0}},[N,e,m]),v.useEffect(()=>{const O=t.get("club");if(!O){S(!0);return}let ke=!1;return(async()=>{try{const Te=await Qa(O);if(ke)return;Te?(g(Te),k(!0),n("signup")):n("badslug")}catch{ke||n("badslug")}finally{ke||S(!0)}})(),()=>{ke=!0}},[t]),v.useEffect(()=>{if(f.current&&clearTimeout(f.current),!h.trim()||h.trim().length<2){x([]),b(!1);return}return b(!0),f.current=setTimeout(async()=>{try{const O=await Vr(h);x(O||[])}catch(O){console.warn("search error",O),x([])}finally{b(!1)}},250),()=>{f.current&&clearTimeout(f.current)}},[h]);const re=()=>{if(H(""),!w)return H("Pick your association from the list, or submit yours.");i(3)},Be=async()=>{if(H(""),!ue)return H("Pick your age division.");if(!Re)return H("Pick your tier.");if(!w)return H("Pick your association.");M(!0);try{await ow({displayName:o.trim(),email:c.trim(),clubId:w.id,isDirector:!1});let O=await ca();if(O||(await new Promise(ke=>setTimeout(ke,400)),O=await ca()),!O)throw new Error("We created your account but couldn't load your profile. Try signing in.");await Rw({clubId:w.id,coachId:O.id,ageDivision:ue,tier:Re}),e("/coach/dashboard")}catch(O){const ke=((O==null?void 0:O.message)||"").toLowerCase();ke.includes("already registered")||ke.includes("user already")?H("That email is already in use. Try signing in instead."):ke.includes("rate limit")||ke.includes("too many")?H("You're making too many attempts. Wait a minute and try again."):H((O==null?void 0:O.message)||"Something went wrong. Try again.")}finally{M(!1)}},Ge=async()=>{if(H(""),!G.trim())return H("Enter your association name.");M(!0);try{await iw({name:G.trim(),city:Z.trim()||null,contactEmail:c.trim()||null}),H(""),L(!1),n("submitted")}catch(O){H((O==null?void 0:O.message)||"Could not submit your association. Try again.")}finally{M(!1)}},Ce=async()=>{if(H(""),!D.trim()||!V)return H("Enter your email and password.");M(!0);try{if(await qb({email:D.trim(),password:V}),!await ca()){H("We couldn't find a coach profile for that account.");return}e("/coach/dashboard")}catch{H("Invalid email or password.")}finally{M(!1)}};return r==="badslug"?a.jsxs("div",{className:"coach-wrap c-centered",children:[a.jsxs("div",{className:"c-card",children:[a.jsxs("div",{className:"c-card-brand",children:[a.jsx(ta,{}),a.jsx("span",{children:"Hockey Shot Challenge"})]}),a.jsx("h2",{className:"c-card-title",children:"Hmm — we can't find that club."}),a.jsx("p",{className:"c-card-sub",children:"The link you followed points to a club we don't recognize. You can search for your association on the next screen."}),a.jsx("button",{className:"c-btn",onClick:()=>{n("signup"),i(2)},children:"Search for my club →"}),a.jsx("button",{className:"c-text-btn",onClick:()=>e("/coach"),children:"← Back"})]}),a.jsx("style",{children:ra})]}):r==="intro"?a.jsxs("div",{className:"coach-wrap c-centered",children:[a.jsxs("div",{className:"c-card",children:[a.jsxs("div",{className:"c-card-brand",children:[a.jsx(ta,{}),a.jsx("span",{children:"Hockey Shot Challenge"})]}),a.jsx("h2",{className:"c-card-title",children:"Set up your team."}),a.jsx("p",{className:"c-card-sub",children:"Free for coaches and players. Takes 2 minutes."}),a.jsxs("button",{className:"c-google-btn c-google-btn--hero",onClick:So,children:[a.jsx(Ls,{}),"Continue with Google — free"]}),a.jsx("button",{className:"c-text-btn",onClick:()=>n("signin"),children:"Already have an account? Sign in"}),a.jsx("button",{className:"c-text-btn",onClick:()=>e("/coach"),children:"← Back"})]}),a.jsx("style",{children:ra})]}):r==="submitted"?a.jsxs("div",{className:"coach-wrap c-centered",children:[a.jsxs("div",{className:"c-card",children:[a.jsxs("div",{className:"c-card-brand",children:[a.jsx(ta,{}),a.jsx("span",{children:"Thanks!"})]}),a.jsx("h2",{className:"c-card-title",children:"We got it."}),a.jsx("p",{className:"c-card-sub",children:"We'll get your association added soon. We'll email you when it's ready."}),a.jsx("button",{className:"c-btn",onClick:()=>e("/"),children:"Done"})]}),a.jsx("style",{children:ra})]}):r==="signin"?a.jsxs("div",{className:"coach-wrap c-centered",children:[a.jsxs("div",{className:"c-card",children:[a.jsxs("div",{className:"c-card-brand",children:[a.jsx(ta,{}),a.jsx("span",{children:"Coach sign-in"})]}),a.jsx("h2",{className:"c-card-title",children:"Welcome back."}),a.jsxs("label",{className:"c-label",children:[a.jsx("span",{children:"Email"}),a.jsx("input",{type:"email",value:D,onChange:O=>$(O.target.value),placeholder:"coach@example.com",autoCapitalize:"none",autoCorrect:"off",className:"c-input"})]}),a.jsxs("label",{className:"c-label",children:[a.jsx("span",{children:"Password"}),a.jsx("input",{type:"password",value:V,onChange:O=>A(O.target.value),placeholder:"••••••••",className:"c-input"})]}),F&&a.jsx("div",{className:"c-error",children:F}),a.jsx("button",{className:"c-btn",onClick:Ce,disabled:P,children:P?"Signing in…":"Sign in"}),a.jsx("div",{className:"c-divider",children:a.jsx("span",{children:"or"})}),a.jsxs("button",{className:"c-google-btn",onClick:So,children:[a.jsx(Ls,{}),"Continue with Google"]}),a.jsx("button",{className:"c-text-btn",onClick:()=>{n("intro"),H("")},children:"← Back"})]}),a.jsx("style",{children:ra})]}):a.jsxs("div",{className:"coach-wrap c-centered",children:[a.jsxs("div",{className:"c-card",children:[a.jsxs("div",{className:"c-card-brand",children:[a.jsx(ta,{}),a.jsxs("span",{children:["Coach setup · Step ",I?s-1:m&&s===3?2:s," of ",I||m?2:3]})]}),s===1&&!I&&a.jsxs(a.Fragment,{children:[w&&a.jsxs("div",{className:"c-clubchip",children:[a.jsxs("div",{className:"c-clubchip-eyebrow",children:[w.governing_body||"ASSOCIATION",w.city?` · ${w.city}`:""]}),a.jsx("div",{className:"c-clubchip-name",children:w.name})]}),a.jsx("h2",{className:"c-card-title",children:"Coach signup"}),a.jsx("p",{className:"c-card-sub",children:w?`Create your coach account for ${w.name}. We'll set up your team next.`:"Sign in with Google to get started. Free."}),F&&a.jsx("div",{className:"c-error",children:F}),a.jsxs("button",{className:"c-google-btn c-google-btn--hero",onClick:So,children:[a.jsx(Ls,{}),"Continue with Google — free"]}),a.jsx("button",{className:"c-text-btn",onClick:()=>n("signin"),children:"Already have an account? Sign in"}),a.jsx("button",{className:"c-text-btn",onClick:()=>{n("intro"),H("")},children:"← Back"})]}),s===2&&!m&&!_&&!w&&a.jsxs(a.Fragment,{children:[I&&a.jsxs("div",{className:"c-google-chip",children:[a.jsx(Ls,{size:14}),a.jsx("span",{children:o||c})]}),a.jsx("h2",{className:"c-card-title",children:"Find your association."}),a.jsx("p",{className:"c-card-sub",children:"Search by city or team name."}),a.jsx("input",{type:"text",value:h,onChange:O=>u(O.target.value),placeholder:"burlington",autoCapitalize:"none",autoCorrect:"off",spellCheck:"false",className:"c-input",autoFocus:!0}),a.jsxs("div",{className:"c-results",children:[y&&p.length===0&&a.jsx("div",{className:"c-result-empty",children:"Searching…"}),!y&&h.length>=2&&p.length===0&&a.jsx("div",{className:"c-result-empty",children:"No matches. Try a different search."}),p.map(O=>a.jsxs("button",{className:"c-result",onClick:()=>g(O),children:[a.jsx("div",{className:"c-result-name",children:O.name}),a.jsxs("div",{className:"c-result-meta",children:[O.city||"",O.governing_body?` · ${O.governing_body}`:"",O.gender_type==="girls"?" · Girls":""]})]},O.id))]}),F&&a.jsx("div",{className:"c-error",children:F}),a.jsx("button",{className:"c-text-btn",onClick:()=>L(!0),children:"My association isn't listed"}),a.jsx("button",{className:"c-text-btn",onClick:async()=>{H(""),M(!0);try{const O=await Qa("independent");if(!O)throw new Error("Could not load independent teams. Try again.");g(O),i(3)}catch(O){H((O==null?void 0:O.message)||"Something went wrong. Try again.")}finally{M(!1)}},disabled:P,children:P?"Loading…":"I don't have an association — just my team"}),a.jsx("button",{className:"c-text-btn",onClick:()=>i(1),children:"← Back"})]}),s===2&&!m&&w&&!_&&a.jsxs(a.Fragment,{children:[a.jsx("h2",{className:"c-card-title",children:"Confirm your association."}),a.jsxs("div",{className:"c-clubcard",children:[a.jsx("div",{className:"c-clubcard-name",children:w.name}),a.jsxs("div",{className:"c-clubcard-meta",children:[w.city||"",w.governing_body?` · ${w.governing_body}`:""]}),a.jsx("button",{className:"c-text-btn c-text-btn--inline",onClick:()=>g(null),children:"Change"})]}),F&&a.jsx("div",{className:"c-error",children:F}),a.jsx("button",{className:"c-btn",onClick:re,children:"Continue →"}),a.jsx("button",{className:"c-text-btn",onClick:()=>i(1),children:"← Back"})]}),s===2&&!m&&_&&a.jsxs(a.Fragment,{children:[a.jsx("h2",{className:"c-card-title",children:"Tell us about your association."}),a.jsx("p",{className:"c-card-sub",children:"We'll get it added and email you when it's ready."}),a.jsxs("label",{className:"c-label",children:[a.jsx("span",{children:"Association name"}),a.jsx("input",{type:"text",value:G,onChange:O=>C(O.target.value),placeholder:"e.g. Smithtown Hockey Association",className:"c-input",autoFocus:!0})]}),a.jsxs("label",{className:"c-label",children:[a.jsx("span",{children:"City (optional)"}),a.jsx("input",{type:"text",value:Z,onChange:O=>le(O.target.value),placeholder:"Smithtown, ON",className:"c-input"})]}),F&&a.jsx("div",{className:"c-error",children:F}),a.jsx("button",{className:"c-btn",onClick:Ge,disabled:P,children:P?"Submitting…":"Submit"}),a.jsx("button",{className:"c-text-btn",onClick:()=>L(!1),children:"← Back to search"})]}),s===3&&a.jsxs(a.Fragment,{children:[w&&w.slug!=="independent"&&a.jsxs("div",{className:"c-clubchip",children:[a.jsxs("div",{className:"c-clubchip-eyebrow",children:[w.governing_body||"ASSOCIATION",w.city?` · ${w.city}`:""]}),a.jsx("div",{className:"c-clubchip-name",children:w.name}),!m&&a.jsx("button",{className:"c-text-btn c-text-btn--inline",onClick:()=>{i(2),g(null)},children:"Change"})]}),w&&w.slug==="independent"&&a.jsxs("div",{className:"c-clubchip",children:[a.jsx("div",{className:"c-clubchip-eyebrow",children:"NO ASSOCIATION"}),a.jsx("div",{className:"c-clubchip-name",children:"Just my team"}),a.jsx("button",{className:"c-text-btn c-text-btn--inline",onClick:()=>{i(2),g(null)},children:"Change"})]}),a.jsx("h2",{className:"c-card-title",children:"What team do you coach?"}),a.jsxs("label",{className:"c-label",children:[a.jsx("span",{children:"Age division"}),a.jsxs("select",{value:ue,onChange:O=>De(O.target.value),className:"c-input",children:[a.jsx("option",{value:"",children:"Pick one"}),ja.map(O=>a.jsx("option",{value:O,children:O},O))]})]}),a.jsxs("label",{className:"c-label",children:[a.jsx("span",{children:"Tier"}),a.jsxs("select",{value:Re,onChange:O=>ve(O.target.value),className:"c-input",children:[a.jsx("option",{value:"",children:"Pick one"}),Na.map(O=>a.jsx("option",{value:O,children:O},O))]})]}),a.jsx("p",{className:"c-card-sub",style:{marginBottom:0},children:"If another coach has already set up this team, we'll connect you to them."}),F&&a.jsx("div",{className:"c-error",children:F}),a.jsx("button",{className:"c-btn",onClick:Be,disabled:P,children:P?"Setting up…":"Create my team →"}),a.jsx("button",{className:"c-text-btn",onClick:()=>i(2),children:"← Back"})]})]}),a.jsx("style",{children:ra})]})}function Ls({size:e=18}){return a.jsxs("svg",{width:e,height:e,viewBox:"0 0 18 18",xmlns:"http://www.w3.org/2000/svg",style:{display:"block",flexShrink:0},children:[a.jsx("path",{d:"M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z",fill:"#4285F4"}),a.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z",fill:"#34A853"}),a.jsx("path",{d:"M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z",fill:"#FBBC05"}),a.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z",fill:"#EA4335"})]})}function ta(){return a.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[a.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),a.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const ra=`
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
`;function Eo(e,t){let r=0;for(let n=0;n<e.length;n++)r=Math.imul(31,r)+e.charCodeAt(n)>>>0;return r%t}function Dw(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Bw(){const e=new Date().getDay();return e===0?0:7-e}async function Mw(e,t,r){if(!e||!t||!r)return null;const n=vt(),s=Dw(),{data:i}=await z.from("players").select("id, display_name").eq("team_id",t).order("id");if(!i||i.length<2)return null;const{data:o}=await z.from("teams").select("id, name, age_division, tier").eq("club_id",r).eq("is_active",!0).order("id");if(!o||o.length<2)return null;const l=o.filter(f=>f.id!==t),c=l[Eo(t+n,l.length)],{data:d}=await z.from("players").select("id, display_name").eq("team_id",c.id).order("id");if(!(d!=null&&d.length))return null;const h=f=>[...f].sort((m,k)=>Eo(m.id+n,1e5)-Eo(k.id+n,1e5)),u=h(i),p=h(d),x=u.findIndex(f=>f.id===e);if(x===-1)return null;const y=p[x%p.length],[{data:b}]=await Promise.all([z.from("shot_logs").select("player_id, count, log_date").in("player_id",[e,y.id]).gte("log_date",n)]),w={},g={};for(const f of b||[])w[f.player_id]=(w[f.player_id]||0)+f.count,f.log_date===s&&(g[f.player_id]=(g[f.player_id]||0)+f.count);return{weekStart:n,daysLeft:Bw(),myShots:w[e]||0,myTodayShots:g[e]||0,loggedToday:(g[e]||0)>0,rivalName:y.display_name,rivalTeamName:`${c.age_division} ${c.tier}`,rivalShots:w[y.id]||0,rivalLoggedToday:(g[y.id]||0)>0}}async function Qf(e){if(!e)return null;const t=vt(),{data:r}=await z.from("team_challenges").select("*").eq("team_id",e).eq("week_start",t).maybeSingle();return r}async function Fw(e,t){const r=vt(),{data:{user:n}}=await z.auth.getUser(),{data:s,error:i}=await z.from("team_challenges").upsert({team_id:e,goal_shots:t,week_start:r,created_by:n==null?void 0:n.id},{onConflict:"team_id,week_start"}).select().maybeSingle();if(i)throw i;return s}async function Xf(e){if(!e)return 0;const t=vt(),{data:r}=await z.from("players").select("id").eq("team_id",e);if(!(r!=null&&r.length))return 0;const n=r.map(i=>i.id),{data:s}=await z.from("shot_logs").select("count").in("player_id",n).gte("log_date",t);return(s||[]).reduce((i,o)=>i+o.count,0)}async function Qu(e){if(!e)return null;const t=vt(),{data:r}=await z.from("team_battles").select(`
      id, week_start, status,
      team_a:teams!team_a_id(id, name, age_division, tier, club:clubs(id, name, slug)),
      team_b:teams!team_b_id(id, name, age_division, tier, club:clubs(id, name, slug))
    `).eq("week_start",t).eq("status","active").or(`team_a_id.eq.${e},team_b_id.eq.${e}`).maybeSingle();if(!r)return null;const n=r.team_a.id===e,s=n?r.team_a:r.team_b,i=n?r.team_b:r.team_a,{data:o}=await z.from("players").select("id, team_id").in("team_id",[s.id,i.id]);if(!(o!=null&&o.length))return{...r,myTeam:s,rivalTeam:i,myShots:0,rivalShots:0};const l=o.map(u=>u.id),{data:c}=await z.from("shot_logs").select("player_id, count").in("player_id",l).gte("log_date",r.week_start),d={};for(const u of c||[])d[u.player_id]=(d[u.player_id]||0)+u.count;const h=u=>o.filter(p=>p.team_id===u).reduce((p,x)=>p+(d[x.id]||0),0);return{id:r.id,weekStart:r.week_start,myTeam:s,rivalTeam:i,myShots:h(s.id),rivalShots:h(i.id)}}async function Hw(e,t){const{data:r}=await z.from("clubs").select("id").neq("id",t).eq("is_active",!0);if(!(r!=null&&r.length))return[];const n=r.map(i=>i.id),{data:s}=await z.from("teams").select("id, name, age_division, tier, club:clubs(id, name, city)").in("club_id",n).eq("is_active",!0).neq("id",e).order("age_division");return s||[]}async function Ww(e,t){const r=vt(),{data:{user:n}}=await z.auth.getUser(),{data:s,error:i}=await z.from("team_battles").insert({team_a_id:e,team_b_id:t,week_start:r,initiated_by:n==null?void 0:n.id,status:"active"}).select().single();if(i)throw i;return s}function qw(){var Wn,qn,ss,is;const e=we(),[t,r]=v.useState(null),[n,s]=v.useState(!0),[i,o]=v.useState({playerCount:0,teamCount:0,totalShots:0}),[l,c]=v.useState([]),[d,h]=v.useState([]),[u,p]=v.useState([]),[x,y]=v.useState(null),[b,w]=v.useState(null),[g,f]=v.useState([]),[m,k]=v.useState([]),[N,S]=v.useState([]),[_,L]=v.useState(null),[G,C]=v.useState(null),[Z,le]=v.useState(0),[ue,De]=v.useState(""),[Re,ve]=v.useState(!1),[I,R]=v.useState(null),[D,$]=v.useState([]),[V,A]=v.useState(""),[P,M]=v.useState(!1),[F,H]=v.useState(""),[re,Be]=v.useState("invite"),[Ge,Ce]=v.useState(""),[O,ke]=v.useState(!1);if(v.useEffect(()=>{ze({title:"Coach dashboard",noindex:!0}),(async()=>{var Y;const E=await ca();if(!E){e("/coach");return}if(r(E),(Y=E.club)!=null&&Y.id){const[j,J,Bt,ce,Vc,am,sm,im]=await Promise.all([Wc(E.club.id),qc(E.club.id),lw(E.club.id),Lw(E.id),Yu(E.id),hw(E.club.id),Yf(E.club.id),Kf(E.club.id)]);if(o(j),c(J),h(Bt),p(ce),f(Vc),k(am),S(sm),L(im),ce.length>0){const Kc=ce[0];y(Kc.id);try{const Yc=await Ju({teamId:Kc.id,coachId:E.id});w(Yc)}catch{}}}s(!1)})()},[e]),v.useEffect(()=>{!x||!(t!=null&&t.id)||(async()=>{var Bt;try{const ce=await Ju({teamId:x,coachId:t.id});w(ce)}catch{w(null)}const[E,Y,j,J]=await Promise.all([Qf(x),Xf(x),Qu(x),Hw(x,(Bt=t==null?void 0:t.club)==null?void 0:Bt.id)]);C(E),le(Y),De(E!=null&&E.goal_shots?String(E.goal_shots):""),R(j),$(J)})()},[x,t]),n)return a.jsxs("div",{className:"dash-wrap dash-loading",children:[a.jsx("div",{children:"Loading…"}),a.jsx("style",{children:Ao})]});if(!(t!=null&&t.club))return a.jsxs("div",{className:"dash-wrap",style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100dvh"},children:[a.jsxs("div",{style:{maxWidth:400,padding:"24px 20px",textAlign:"center"},children:[a.jsx("div",{style:{fontSize:40,marginBottom:16},children:"🏒"}),a.jsx("div",{style:{fontFamily:"var(--font-display)",fontSize:22,fontWeight:800,color:"white",marginBottom:10},children:"Finish setting up"}),a.jsx("div",{style:{fontSize:14,color:"var(--text-mute)",lineHeight:1.5,marginBottom:24},children:"You need to connect to your club and pick your team before you can invite players. It only takes a minute."}),a.jsx("button",{className:"dash-btn-ghost",onClick:()=>e("/coach"),style:{display:"inline-block",padding:"12px 28px",fontSize:14},children:"Complete setup →"}),a.jsx("button",{style:{display:"block",margin:"16px auto 0",color:"var(--text-mute)",fontSize:13},onClick:Hn,children:"Sign out"})]}),a.jsx("style",{children:Ao})]});const Te=`${ee}/join/${t.club.slug}`,Ee=b?`${ee}/j/${b}`:null,he=u.find(E=>E.id===x),Q=async()=>{var E;if(!(!V||!x)){M(!0),H("");try{await Ww(x,V);const Y=await Qu(x);R(Y),A("")}catch(Y){H((E=Y.message)!=null&&E.includes("unique")?"Your team already has a battle this week.":"Could not start battle. Try again.")}M(!1)}},Me=async()=>{const E=parseInt(ue,10);if(!(!E||E<1||!x)){ve(!0);try{const Y=await Fw(x,E);C(Y)}catch(Y){console.warn("setTeamChallenge error:",Y)}ve(!1)}},$t=async(E,Y)=>{try{await navigator.clipboard.writeText(E),Ce(Y),setTimeout(()=>Ce(""),2e3)}catch{}},Ut=he?`${((Wn=he.club)==null?void 0:Wn.name)||t.club.name} ${he.age_division||""} ${he.tier||""}`.trim():t.club.name,Dt=he&&Ee?`Hey ${Ut} parents! 🏒

We're using Hockey Shot Challenge this season. Players log shots and stickhandling reps at home, earn ranks, and compete in 4-player squad battles against rival teams all week.

Sign up here (30 sec, free, no email needed):
${Ee}`:"",Mn=async(E,Y,j)=>{try{navigator.share?(await navigator.share({title:Y,text:j,url:E}),ke(!0),setTimeout(()=>ke(!1),2e3)):$t(E,"link")}catch{}},Fn=async E=>{if(x)try{if(await Ow({teamId:x,pendingCoachId:E,approverCoachId:t.id})){const j=await Yu(t.id);f(j)}}catch{}},Hn=async()=>{window.confirm("Sign out?")&&(await Wf(),e("/coach"))};return a.jsxs("div",{className:"dash-wrap",children:[a.jsxs("nav",{className:"dash-nav",children:[a.jsxs("div",{className:"dash-brand",onClick:()=>e("/"),children:[a.jsx(Vw,{}),a.jsx("span",{children:"Coach dashboard"})]}),a.jsx("button",{className:"dash-signout",onClick:Hn,children:"Sign out"})]}),a.jsxs("div",{className:"dash-inner",children:[a.jsxs("div",{className:"dash-header",children:[a.jsx("div",{className:"dash-eyebrow",children:"YOUR CLUB"}),a.jsx("h1",{className:"dash-title",children:t.club.name}),t.club.city&&a.jsx("div",{className:"dash-city",children:t.club.city})]}),g.length>0&&a.jsxs("div",{className:"dash-pending",children:[a.jsxs("div",{className:"dash-pending-label",children:[g.length," coach",g.length===1?"":"es"," waiting for approval"]}),g.map(E=>{var Y,j;return a.jsxs("div",{className:"dash-pending-item",children:[a.jsxs("div",{children:[a.jsx("div",{className:"dash-pending-name",children:(Y=E.coach)==null?void 0:Y.display_name}),a.jsxs("div",{className:"dash-pending-sub",children:["wants to join ",(j=E.team)==null?void 0:j.name]})]}),a.jsx("button",{className:"dash-btn-mini",onClick:()=>{var J;return Fn((J=E.coach)==null?void 0:J.id)},children:"Approve"})]},E.id)})]}),a.jsxs("div",{className:"dash-tabs",children:[a.jsx("button",{className:`dash-tab ${re==="invite"?"dash-tab--active":""}`,onClick:()=>Be("invite"),children:"Invite players"}),a.jsx("button",{className:`dash-tab ${re==="overview"?"dash-tab--active":""}`,onClick:()=>Be("overview"),children:"Overview"}),a.jsx("button",{className:`dash-tab ${re==="roster"?"dash-tab--active":""}`,onClick:()=>Be("roster"),children:"Roster"}),a.jsx("button",{className:`dash-tab ${re==="drills"?"dash-tab--active":""}`,onClick:()=>Be("drills"),children:"Drills"})]}),re==="invite"&&a.jsx(a.Fragment,{children:u.length===0?a.jsxs("div",{className:"dash-empty",children:[a.jsx("div",{style:{fontSize:36,marginBottom:12},children:"👋"}),a.jsx("div",{className:"dash-empty-title",children:"You're not on a team yet"}),a.jsx("div",{className:"dash-empty-sub",children:"Go back to setup to pick your age group and tier. Once you're on a team, you'll get an invite link to send to parents."}),a.jsx("button",{className:"dash-btn-ghost",onClick:()=>e("/coach"),style:{marginTop:4},children:"Pick my team →"})]}):a.jsxs(a.Fragment,{children:[u.length>1&&a.jsxs("div",{className:"dash-section",children:[a.jsx("div",{className:"dash-label",children:"Which team?"}),a.jsx("div",{className:"dash-team-pills",children:u.map(E=>a.jsxs("button",{className:`dash-team-pill ${E.id===x?"dash-team-pill--active":""}`,onClick:()=>y(E.id),children:[E.age_division," ",E.tier,E.role==="owner"&&a.jsx("span",{className:"dash-pill-tag",children:"OWNER"})]},E.id))})]}),he&&Ee&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"dash-section inv-hero",children:[a.jsxs("div",{className:"inv-team-name",children:[he.age_division," ",he.tier]}),a.jsx("div",{className:"inv-headline",children:"Send to parents"}),a.jsx("div",{className:"inv-sub",children:"One tap opens their messages app with the link pre-filled."}),a.jsxs("div",{className:"inv-channels",children:[a.jsxs("a",{className:"inv-channel inv-channel--sms",href:`sms:?body=${encodeURIComponent(Dt)}`,children:[a.jsx("span",{className:"inv-channel-icon",children:"💬"}),a.jsx("span",{className:"inv-channel-label",children:"iMessage"})]}),a.jsxs("a",{className:"inv-channel inv-channel--wa",href:`https://wa.me/?text=${encodeURIComponent(Dt)}`,target:"_blank",rel:"noopener noreferrer",children:[a.jsx("span",{className:"inv-channel-icon",children:a.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",children:a.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})})}),a.jsx("span",{className:"inv-channel-label",children:"WhatsApp"})]}),a.jsxs("a",{className:"inv-channel inv-channel--email",href:`mailto:?subject=${encodeURIComponent(`Join ${Ut} on Hockey Shot Challenge`)}&body=${encodeURIComponent(Dt)}`,children:[a.jsx("span",{className:"inv-channel-icon",children:"✉️"}),a.jsx("span",{className:"inv-channel-label",children:"Email"})]})]}),a.jsx("button",{className:"inv-more-btn",onClick:()=>Mn(Ee,`Join ${Ut}`,Dt),children:O?"✓ Sent!":"↗ More ways to share"})]}),a.jsxs("div",{className:"dash-section",children:[a.jsx("div",{className:"dash-label",children:"Your link"}),a.jsxs("div",{className:"dash-url-box",children:[a.jsx("div",{className:"dash-url tnum",children:Ee}),a.jsx("button",{className:`dash-copy ${Ge==="link"?"dash-copy--done":""}`,onClick:()=>$t(Ee,"link"),children:Ge==="link"?"✓":"Copy"})]}),a.jsxs("div",{className:"dash-hint",children:["Or copy the full message: ",a.jsx("button",{className:"inv-copy-msg",onClick:()=>$t(Dt,"message"),children:Ge==="message"?"✓ Copied":"Copy message text"})]})]}),a.jsxs("div",{className:"dash-section",children:[a.jsx("div",{className:"dash-label",children:"QR code — show at practice"}),a.jsxs("div",{className:"dash-qr-box",children:[a.jsx(Gw,{url:Ee}),a.jsx("div",{className:"dash-qr-caption",children:"Players scan with their phone and they're signed up in 30 seconds. No email needed."}),a.jsx("a",{className:"dash-btn-ghost",href:`https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(Ee)}&bgcolor=0a0e1a&color=e8eef7&qzone=2`,target:"_blank",rel:"noopener noreferrer",children:"Download high-res QR ↗"})]})]}),a.jsxs("div",{className:"dash-section",children:[a.jsx("div",{className:"dash-label",children:"Tips"}),a.jsxs("ul",{className:"dash-tips",children:[a.jsx("li",{children:"Drop the link in your team group chat right after practice"}),a.jsx("li",{children:"Show the QR at the rink — easiest signup is in person"}),a.jsx("li",{children:"Tell kids their squad name resets every Monday — creates urgency"}),a.jsx("li",{children:'Make it a challenge: "Squad that logs the most shots picks the drill next practice"'})]})]})]})]})}),re==="overview"&&a.jsxs(a.Fragment,{children:[x&&a.jsxs("div",{className:"battle-callout",children:[a.jsx("div",{className:"battle-callout-eyebrow",children:"⚔️ CROSS-CLUB BATTLE"}),I?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"battle-live-row",children:[a.jsxs("div",{className:"battle-live-side",children:[a.jsx("div",{className:"battle-live-club",children:"Your team"}),a.jsx("div",{className:"battle-live-score tnum",children:I.myShots.toLocaleString()})]}),a.jsx("div",{className:"battle-live-vs",children:"VS"}),a.jsxs("div",{className:"battle-live-side battle-live-side--right",children:[a.jsx("div",{className:"battle-live-club",children:((ss=(qn=I.rivalTeam)==null?void 0:qn.club)==null?void 0:ss.name)||((is=I.rivalTeam)==null?void 0:is.name)}),a.jsx("div",{className:"battle-live-score tnum",children:I.rivalShots.toLocaleString()})]})]}),a.jsx("div",{className:"battle-callout-status",children:I.myShots>=I.rivalShots?`Leading by ${(I.myShots-I.rivalShots).toLocaleString()} shots`:`Behind by ${(I.rivalShots-I.myShots).toLocaleString()} shots — keep logging`})]}):D.length>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"battle-callout-body",children:"Challenge any rival team. Both teams see the live score on their home screen all week. Boys vs girls — any matchup works."}),a.jsxs("div",{className:"ch-set-goal",style:{marginTop:12},children:[a.jsxs("select",{className:"ch-goal-input",value:V,onChange:E=>A(E.target.value),children:[a.jsx("option",{value:"",children:"Pick a rival team…"}),D.map(E=>{var Y;return a.jsxs("option",{value:E.id,children:[(Y=E.club)==null?void 0:Y.name," — ",E.age_division," ",E.tier]},E.id)})]}),a.jsx("button",{className:"ch-goal-btn",onClick:Q,disabled:P||!V,children:P?"…":"Challenge"})]}),F&&a.jsx("div",{className:"dash-hint",style:{color:"#ef4444",marginTop:6},children:F})]}):a.jsxs("div",{className:"battle-callout-body",children:["No other clubs are set up yet. Share ",a.jsx("strong",{children:"hockeyshotchallenge.com"})," with rival coaches — once they join, you can challenge their teams."]})]}),_&&_.thisWeekTotal>0&&a.jsxs("div",{className:"recap-card",children:[a.jsxs("div",{className:"recap-header",children:[a.jsx("div",{className:"recap-label",children:"THIS WEEK"}),_.vsLastWeek!==null&&a.jsxs("div",{className:`recap-delta ${_.vsLastWeek>=0?"recap-delta--up":"recap-delta--down"}`,children:[_.vsLastWeek>=0?"↑":"↓"," ",Math.abs(_.vsLastWeek),"% vs last week"]})]}),a.jsx("div",{className:"recap-shots tnum",children:_.thisWeekTotal.toLocaleString()}),a.jsx("div",{className:"recap-shots-label",children:"shots logged"}),a.jsxs("div",{className:"recap-row",children:[a.jsxs("div",{className:"recap-stat",children:[a.jsx("div",{className:"recap-stat-num tnum",children:_.activePlayers}),a.jsx("div",{className:"recap-stat-label",children:"active players"})]}),a.jsx("div",{className:"recap-divider"}),a.jsxs("div",{className:"recap-stat",children:[a.jsx("div",{className:"recap-stat-num tnum",children:_.totalPlayers}),a.jsx("div",{className:"recap-stat-label",children:"total players"})]}),_.topPlayer&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"recap-divider"}),a.jsxs("div",{className:"recap-stat",children:[a.jsxs("div",{className:"recap-stat-num",style:{fontSize:13},children:["🏆 ",_.topPlayer.name]}),a.jsxs("div",{className:"recap-stat-label",children:[_.topPlayer.shots.toLocaleString()," shots"]})]})]})]})]}),a.jsxs("div",{className:"dash-stats",children:[a.jsxs("div",{className:"dash-stat",children:[a.jsx("div",{className:"dash-stat-num tnum",children:i.playerCount}),a.jsx("div",{className:"dash-stat-label",children:"Players"})]}),a.jsxs("div",{className:"dash-stat",children:[a.jsx("div",{className:"dash-stat-num tnum",children:i.teamCount}),a.jsx("div",{className:"dash-stat-label",children:"Teams"})]}),a.jsxs("div",{className:"dash-stat",children:[a.jsx("div",{className:"dash-stat-num tnum",children:i.totalShots.toLocaleString()}),a.jsx("div",{className:"dash-stat-label",children:"Shots logged"})]})]}),N.filter(E=>E.week_shots>0).length>0&&a.jsxs("div",{className:"dash-section",children:[a.jsx("div",{className:"dash-label",style:{marginBottom:10},children:"Team rankings — this week"}),a.jsx("div",{className:"tr-list",children:N.map((E,Y)=>{const j=u.some(Bt=>Bt.id===E.id),J=["🥇","🥈","🥉"];return a.jsxs("div",{className:`tr-row${j?" tr-row--mine":""}`,children:[a.jsx("div",{className:"tr-rank",children:E.week_shots>0&&J[Y]?J[Y]:a.jsxs("span",{className:"tr-rank-num",children:["#",Y+1]})}),a.jsxs("div",{className:"tr-info",children:[a.jsxs("div",{className:"tr-name",children:[E.age_division," ",E.tier,j?a.jsx("span",{className:"tr-you",children:" YOU"}):""]}),a.jsxs("div",{className:"tr-players",children:[E.player_count," player",E.player_count!==1?"s":""]})]}),a.jsx("div",{className:"tr-shots tnum",children:E.week_shots.toLocaleString()})]},E.id)})})]}),a.jsxs("div",{className:"dash-section",children:[a.jsxs("div",{className:"dash-section-head",children:[a.jsx("div",{className:"dash-label",children:"Club page (public)"}),a.jsx("a",{className:"dash-visit",href:Te,target:"_blank",rel:"noopener noreferrer",children:"View ↗"})]}),a.jsxs("div",{className:"dash-url-box",children:[a.jsx("div",{className:"dash-url tnum",children:Te}),a.jsx("button",{className:`dash-copy ${Ge==="cluburl"?"dash-copy--done":""}`,onClick:()=>$t(Te,"cluburl"),children:Ge==="cluburl"?"✓":"Copy"})]}),a.jsx("div",{className:"dash-hint",children:"For sharing the whole club. For team-specific invites, use the Invite Players tab."})]}),u.length>0&&a.jsxs("div",{className:"dash-section",children:[a.jsx("div",{className:"dash-label",children:"Your teams"}),a.jsx("div",{className:"dash-pills",children:u.map(E=>a.jsxs("div",{className:"dash-pill",children:[E.age_division," ",E.tier,E.role==="owner"&&a.jsx("span",{className:"dash-pill-tag-inline",children:"OWNER"})]},E.id))})]}),x&&a.jsxs("div",{className:"dash-section",children:[a.jsx("div",{className:"dash-section-head",children:a.jsx("div",{className:"dash-label",children:"Team Challenge — this week"})}),G&&a.jsxs("div",{className:"ch-progress-wrap",children:[a.jsx("div",{className:"ch-progress-bar",children:a.jsx("div",{className:"ch-progress-fill",style:{width:`${Math.min(100,Math.round(Z/G.goal_shots*100))}%`}})}),a.jsxs("div",{className:"ch-progress-meta",children:[a.jsxs("span",{className:"ch-shots-done",children:[Z.toLocaleString()," shots"]}),a.jsxs("span",{className:"ch-shots-goal",children:["goal: ",G.goal_shots.toLocaleString()]})]}),Z>=G.goal_shots&&a.jsx("div",{className:"ch-complete",children:"🏆 Goal crushed! Update it to keep the momentum going."})]}),a.jsxs("div",{className:"ch-set-goal",children:[a.jsx("input",{className:"ch-goal-input",type:"number",min:"1",placeholder:"Set a shot goal (e.g. 500)",value:ue,onChange:E=>De(E.target.value),onKeyDown:E=>E.key==="Enter"&&Me()}),a.jsx("button",{className:"ch-goal-btn",onClick:Me,disabled:Re||!ue,children:Re?"…":G?"Update":"Set goal"})]}),a.jsx("div",{className:"dash-hint",children:"Players will see a progress bar on their home screen."})]})]}),re==="roster"&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"dash-label",style:{marginBottom:10},children:[d.length," player",d.length===1?"":"s"," in club"]}),d.length===0?a.jsxs("div",{className:"dash-empty",children:[a.jsx("div",{className:"dash-empty-title",children:"No players yet"}),a.jsx("div",{className:"dash-empty-sub",children:"Share your team invite link and they'll start appearing here."}),a.jsx("button",{className:"dash-btn-ghost",onClick:()=>Be("invite"),children:"Invite players →"})]}):a.jsx("div",{className:"dash-roster",children:d.map((E,Y)=>{var j,J;return a.jsxs("div",{className:"dash-player",children:[a.jsx("div",{className:"dash-player-rank",children:Y+1}),a.jsx("div",{className:"dash-player-avatar",children:(j=E.display_name[0])==null?void 0:j.toUpperCase()}),a.jsxs("div",{className:"dash-player-info",children:[a.jsx("div",{className:"dash-player-name",children:E.display_name}),a.jsxs("div",{className:"dash-player-sub",children:[((J=E.team)==null?void 0:J.name)||"No team"," · ",E.position||"—"]})]}),E.current_streak>0&&a.jsxs("div",{className:"dash-player-streak",children:["🔥 ",E.current_streak]}),a.jsx("div",{className:"dash-player-shots tnum",children:E.lifetime_shots.toLocaleString()})]},E.id)})})]}),re==="drills"&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"dash-label",style:{marginBottom:10},children:["Stickhandling this week — ",m.length," player",m.length===1?"":"s"," active"]}),m.length===0?a.jsxs("div",{className:"dash-empty",children:[a.jsx("div",{className:"dash-empty-title",children:"No drills logged yet"}),a.jsx("div",{className:"dash-empty-sub",children:"Players will appear here once they log stickhandling reps on the home screen."})]}):a.jsx("div",{className:"dash-roster",children:m.map((E,Y)=>{var j;return a.jsxs("div",{className:"dash-player",children:[a.jsx("div",{className:"dash-player-rank",children:Y+1}),a.jsx("div",{className:"dash-player-avatar",children:(j=E.display_name[0])==null?void 0:j.toUpperCase()}),a.jsxs("div",{className:"dash-player-info",children:[a.jsx("div",{className:"dash-player-name",children:E.display_name}),a.jsx("div",{className:"dash-player-sub",children:["Toe Drag","Figure 8","Lateral","One-Hand"].filter(J=>E.drills[J]).map(J=>`${J} ${E.drills[J]}`).join(" · ")})]}),a.jsx("div",{className:"dash-player-shots tnum",children:E.drills.total})]},E.id)})})]})]}),a.jsx("style",{children:Ao})]})}function Gw({url:e}){const t=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(e)}&bgcolor=0a0e1a&color=e8eef7&qzone=2`;return a.jsx("img",{src:t,alt:"Team join QR code",width:"220",height:"220",style:{display:"block",borderRadius:12,border:"0.5px solid var(--border-dim)",margin:"0 auto"}})}function Vw(){return a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 40 40",style:{display:"block",flexShrink:0},children:[a.jsx("circle",{cx:"20",cy:"20",r:"17",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1"}),a.jsx("path",{d:"M 12 22 L 17.5 27 L 28 15",stroke:"#a8d4f5",strokeWidth:"2.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}const Ao=`
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
`,Si={daily_greeting:["Morning, {name}. Let's get after it.","Back at it. How's the bucket looking?","Here we go. Day {streak}.","What's the plan today — wrist, snap, or a bit of everything?","{name}. Stick in hand. Let's work.","Fresh day. Fresh bucket."],daily_greeting_no_streak:["Welcome back, {name}. Even 20 shots is a day's work.","Glad you're here. Every rep counts when you're starting out.","{name}. Let's build something.","Here's the thing about practice — the only bad one is the one you didn't do."],session_started:["There it is.","Let's go.","Locked in.","That's the stuff.","Bucket open."],mid_session_50:["50 deep. Nice pace.","Halfway through the bucket. Don't rush.","Form over speed, {name}.","Keep the wrists snapping.","Steady hands."],mid_session_100:["Triple digits. That's a workday.","100 in one sit-down. Respect.","This is how Captains are built.","Your wrists are earning it."],welcome_first_time:["Welcome to the squad, {name}. Log your first bucket and we're on.","Glad to have you, {name}. Let's see what you've got.","New name on the roster: {name}. Show me the work."],welcome_with_teammate:["Welcome, {name}. {teammate}'s been ripping {teammate_shots} a day — let's catch up.","{name}'s in. {teammate}'s the one to chase — {teammate_shots} this week."],goal_unstarted_today:["Daily goal's waiting, {name}.","Ring's empty. Fix that.","Today's bucket isn't going to fill itself."],goal_close:["Almost there. Finish strong.","Don't stop short, {name}.","One more set closes the ring."],goal_met:["Goal closed. Take the win.","Daily done. That's how it's built.","Ring's full. See you tomorrow."],goal_doubled:["Double goal. Hungry today.","Past the line and still going.","{name}'s on a different level today."],streak_at_risk:["Streak's on the line, {name}. Get one in.","Don't lose it tonight. Even 10 keeps it alive.","Day {streak} ends in a few hours. Move."],streak_saved_by_freeze:["Freeze used. Streak's safe — back at it tomorrow.","Saved you. One freeze left this month."],streak_lost:["Streak's reset. New one starts today.","Yesterday's gone. Today counts."],achievement_first_shot:["First shot in the books. Many more coming."],achievement_hundred:["100 shots. The grind is real."],achievement_one_k:["One thousand. You're not messing around."],achievement_ten_k:["10K Club. That's elite air."],achievement_week_streak:["Week streak unlocked. Few get here."],achievement_month_streak:["Thirty days. You're a different player now."],achievement_specialty:["Your shot's showing up. Lean into it."],achievement_card_holder:["Card's official. Welcome."],drill_watched:["Watch it. Try it. That's how it sticks.","Now go put it on the wall."]};function Kw(e,t={}){const r=Si[e]||Si.daily_greeting;return r[Math.floor(Math.random()*r.length)].replace(/\{(\w+)\}/g,(s,i)=>t[i]??"")}function Zf(e,t,r={}){const n=Si[e]||Si.daily_greeting,s=String(t).split("").reduce((o,l)=>o+l.charCodeAt(0),0);return n[s%n.length].replace(/\{(\w+)\}/g,(o,l)=>r[l]??"")}function Yw(e,t={}){const n={first_shot:"achievement_first_shot",hundred_club:"achievement_hundred",one_k:"achievement_one_k",ten_k:"achievement_ten_k",week_streak:"achievement_week_streak",month_streak:"achievement_month_streak",specialty_found:"achievement_specialty",card_holder:"achievement_card_holder"}[e];return n?Kw(n,t):"Unlocked."}async function Jw(e,t){const r=Gc(),{data:n}=await z.from("daily_progress").select("shots_total, goal_met").eq("player_id",e).eq("day",r).maybeSingle(),s=(n==null?void 0:n.shots_total)??0,i=Math.max(1,t||50);return{shotsToday:s,goalMet:s>=i,pctOfGoal:Math.min(100,Math.round(s/i*100))}}async function Qw(e,t){const r=Math.max(10,Math.min(500,Math.round(t))),{error:n}=await z.from("players").update({daily_goal:r}).eq("id",e);if(n)throw n;return r}async function Xw(e){const t=i1(7),{data:r}=await z.from("daily_progress").select("day, shots_total, goal_met").eq("player_id",e).in("day",t),n={};for(const o of r||[])n[o.day]=o;const s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],i=Gc();return t.map(o=>{const l=n[o],c=new Date(o+"T12:00:00");return{day:s[c.getDay()],date:o,shots:(l==null?void 0:l.shots_total)??0,goalMet:(l==null?void 0:l.goal_met)??!1,isToday:o===i}})}function Zw(e){return!e||(e.current_streak??0)===0||e.last_shot_date===Gc()?!1:new Date().getHours()>=17}function e1(e){if(!e)return 0;const t=e.last_freeze_used_at;if(!t)return e.streak_freezes_remaining??2;const r=new Date(t+"T12:00:00"),n=new Date;return r.getMonth()!==n.getMonth()||r.getFullYear()!==n.getFullYear()?2:e.streak_freezes_remaining??0}async function t1(e){const[t,r]=await Promise.all([z.from("achievement_defs").select("*").order("sort_order"),z.from("player_achievements").select("code, unlocked_at").eq("player_id",e)]),n={};for(const s of r.data||[])n[s.code]=s.unlocked_at;return(t.data||[]).map(s=>({...s,unlocked:!!n[s.code],unlocked_at:n[s.code]||null}))}async function r1(e){const{data:t,error:r}=await z.rpc("claim_achievements_for_player",{p_player_id:e});return r?(console.error("claimAchievements error",r),[]):t||[]}function n1(e){return!e||(e.current_streak??0)>0||!e.last_shot_date?!1:e.last_shot_date===s1(2)}function a1(e){return Math.max(20,((e==null?void 0:e.daily_goal)||50)*2)}function Gc(){const e=new Date,t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${r}-${n}`}function s1(e=1){const t=new Date;t.setDate(t.getDate()-e);const r=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${r}-${n}-${s}`}function i1(e){const t=[],r=new Date;for(let n=e-1;n>=0;n--){const s=new Date(r);s.setDate(r.getDate()-n);const i=s.getFullYear(),o=String(s.getMonth()+1).padStart(2,"0"),l=String(s.getDate()).padStart(2,"0");t.push(`${i}-${o}-${l}`)}return t}async function em(e=null){let t=z.from("skill_videos").select("id, title, youtube_id, skill_type, sort_order").eq("is_active",!0).order("sort_order");e&&(t=t.eq("skill_type",e));const{data:r}=await t;return r||[]}function o1({playerId:e,dailyGoal:t,refreshKey:r,goalType:n="wrist"}){const[s,i]=v.useState({shotsToday:0,goalMet:!1,pctOfGoal:0});v.useEffect(()=>{if(!e)return;let u=!0;return Jw(e,t).then(p=>{u&&i(p)}),()=>{u=!1}},[e,t,r]);const o=88,l=8,c=(o-l)/2,d=2*Math.PI*c,h=d*(1-s.pctOfGoal/100);return a.jsxs("div",{className:"goal-ring-wrap",children:[a.jsxs("svg",{width:o,height:o,className:"goal-ring-svg","aria-hidden":!0,children:[a.jsx("circle",{cx:o/2,cy:o/2,r:c,fill:"none",stroke:"rgba(168,212,245,0.12)",strokeWidth:l}),a.jsx("circle",{cx:o/2,cy:o/2,r:c,fill:"none",stroke:s.goalMet?"var(--success, #3dd68c)":"var(--accent, #2979ff)",strokeWidth:l,strokeDasharray:d,strokeDashoffset:h,strokeLinecap:"round",transform:`rotate(-90 ${o/2} ${o/2})`,style:{transition:"stroke-dashoffset 0.6s ease, stroke 0.3s"}})]}),a.jsxs("div",{className:"goal-ring-inner",children:[a.jsx("div",{className:"goal-ring-num",children:s.shotsToday}),a.jsxs("div",{className:"goal-ring-sub",children:["/ ",t]})]}),a.jsx("div",{className:"goal-ring-label",children:s.goalMet?"GOAL MET ✓":`SHOOT ${t} ${n.toUpperCase()} SHOTS`}),a.jsx("style",{children:`
        .goal-ring-wrap {
          display: flex; flex-direction: column; align-items: center;
          padding: 4px 0 12px;
          position: relative;
        }
        .goal-ring-svg { display: block; }
        .goal-ring-inner {
          position: absolute;
          top: 4px;
          width: 88px; height: 88px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          pointer-events: none;
        }
        .goal-ring-num {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 800;
          color: var(--ice);
          line-height: 1;
        }
        .goal-ring-sub {
          font-size: 10px; color: var(--text-mute);
          letter-spacing: 0.5px;
          margin-top: 1px;
        }
        .goal-ring-label {
          font-size: 11px; color: var(--text-mute);
          letter-spacing: 1.5px;
          margin-top: 6px;
          font-weight: 600;
        }
      `})]})}function l1({player:e}){if(!e||!Zw(e))return null;const t=e1(e),r=Zf("streak_at_risk",`${e.id}-${new Date().toDateString()}`,{name:e.display_name,streak:e.current_streak});return a.jsxs("div",{className:"risk-banner",children:[a.jsx("div",{className:"risk-icon",children:"⚠️"}),a.jsxs("div",{className:"risk-body",children:[a.jsx("div",{className:"risk-title",children:r}),t>0&&a.jsxs("div",{className:"risk-sub",children:[t," freeze",t===1?"":"s"," left this month — keeps your streak alive if you skip"]})]}),a.jsx("style",{children:`
        .risk-banner {
          display: flex; gap: 10px; align-items: flex-start;
          background: rgba(255, 159, 67, 0.1);
          border: 0.5px solid rgba(255, 159, 67, 0.4);
          border-radius: var(--radius);
          padding: 12px 14px;
          margin-bottom: 12px;
        }
        .risk-icon { font-size: 18px; line-height: 1.2; flex-shrink: 0; }
        .risk-title {
          font-size: 13px; color: var(--text);
          font-weight: 600;
          line-height: 1.3;
        }
        .risk-sub {
          font-size: 11px; color: var(--text-mute);
          margin-top: 3px; line-height: 1.4;
        }
      `})]})}function c1({player:e,todayShots:t}){if(!e)return null;const r=a1(e),n=Math.min(100,Math.round(t/r*100)),s=t>=r,i=Math.max(0,r-t);return a.jsxs("div",{className:`srb${s?" srb--done":""}`,children:[s?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"srb-icon",children:"🔥"}),a.jsxs("div",{className:"srb-body",children:[a.jsx("div",{className:"srb-title",children:"Comeback complete!"}),a.jsxs("div",{className:"srb-sub",children:["You hit ",r," shots. Streak is back. Don't miss again."]})]}),a.jsx("button",{className:"srb-share",onClick:async o=>{o.stopPropagation();const l=`Just did a ${r}-shot comeback to save my streak on Hockey Shot Challenge 🔥 hockeyshotchallenge.com`;if(navigator.share)try{await navigator.share({text:l})}catch{}else await navigator.clipboard.writeText(l)},children:"Share"})]}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"srb-icon",children:"💀"}),a.jsxs("div",{className:"srb-body",children:[a.jsxs("div",{className:"srb-title",children:["Streak recovery — ",i," shots to go"]}),a.jsxs("div",{className:"srb-sub",children:["You missed yesterday. Hit ",r," shots today to bring it back."]}),a.jsx("div",{className:"srb-track",children:a.jsx("div",{className:"srb-fill",style:{width:`${n}%`}})}),a.jsxs("div",{className:"srb-count tnum",children:[t," / ",r]})]})]}),a.jsx("style",{children:`
        .srb {
          display: flex; gap: 10px; align-items: flex-start;
          background: rgba(239, 68, 68, 0.08);
          border: 0.5px solid rgba(239, 68, 68, 0.35);
          border-radius: var(--radius);
          padding: 12px 14px;
          margin-bottom: 12px;
        }
        .srb--done {
          background: rgba(34, 197, 94, 0.08);
          border-color: rgba(34, 197, 94, 0.35);
          align-items: center;
        }
        .srb-icon { font-size: 20px; line-height: 1.2; flex-shrink: 0; }
        .srb-body { flex: 1; min-width: 0; }
        .srb-title {
          font-size: 13px; font-weight: 700;
          color: var(--text); line-height: 1.3;
        }
        .srb-sub {
          font-size: 11px; color: var(--text-mute);
          margin-top: 3px; line-height: 1.4;
        }
        .srb-track {
          height: 6px;
          background: rgba(239, 68, 68, 0.2);
          border-radius: 99px;
          overflow: hidden;
          margin-top: 8px;
        }
        .srb-fill {
          height: 100%;
          background: linear-gradient(90deg, #ef4444, #f97316);
          border-radius: 99px;
          transition: width 0.4s ease;
          min-width: 4px;
        }
        .srb-count {
          font-size: 11px; color: var(--text-mute);
          margin-top: 4px; text-align: right;
        }
        .srb-share {
          font-size: 12px; font-weight: 700;
          color: #16a34a; border: 1px solid #16a34a;
          border-radius: 6px; padding: 4px 10px;
          background: transparent; cursor: pointer; white-space: nowrap; flex-shrink: 0;
        }
        .srb-share:active { opacity: 0.7; }
      `})]})}function d1({type:e,onClose:t,onSave:r}){const[n,s]=v.useState(0),i=l=>{s(n+l)},o=()=>{n>0&&(r(n),s(0))};return a.jsx("div",{className:"numberpad-overlay",onClick:t,children:a.jsxs("div",{className:"numberpad",onClick:l=>l.stopPropagation(),children:[a.jsxs("div",{className:"numberpad-header",children:[a.jsxs("div",{className:"numberpad-title",children:["Add ",e," shots"]}),a.jsx("button",{className:"numberpad-close",onClick:t,children:"×"})]}),a.jsx("div",{className:"numberpad-display",children:n}),a.jsx("div",{className:"numberpad-grid",children:[5,10].map(l=>a.jsxs("button",{className:"numberpad-btn",onClick:()=>i(l),children:["+",l]},l))}),a.jsxs("div",{className:"numberpad-actions",children:[a.jsx("button",{className:"numberpad-cancel",onClick:t,children:"Cancel"}),a.jsx("button",{className:"numberpad-save",onClick:o,disabled:n<=0,children:"Save"})]}),a.jsx("style",{children:u1})]})})}const u1=`
.numberpad-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
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
`,h1={card_holder:{title:"Card Holder",icon:"🎫",sub:"Your card is official."},first_shot:{title:"First Shot",icon:"🏒",sub:"Logged your very first shot."},hundred_club:{title:"100 Club",icon:"💯",sub:"100 lifetime shots."},one_k:{title:"1,000 Shots",icon:"🔥",sub:"You crossed 1K."},ten_k:{title:"10,000 Shots",icon:"🏆",sub:"Elite tier. Few get here."},week_streak:{title:"Week Streak",icon:"⚡",sub:"7 days in a row."},month_streak:{title:"Month Streak",icon:"🌟",sub:"30 days in a row."},specialty_found:{title:"Found Your Shot",icon:"🎯",sub:"A specialty showed up."}};function p1({codes:e,onDismiss:t}){const[r,n]=v.useState(0);if(v.useEffect(()=>{n(0)},[e]),!e||e.length===0)return null;const s=e[r],i=h1[s];if(!i)return setTimeout(()=>o(),0),null;function o(){r+1>=e.length?t():n(r+1)}const l=async c=>{c.stopPropagation();const d=`Just unlocked "${i.title}" ${i.icon} on Hockey Shot Challenge — ${i.sub} hockeyshotchallenge.com`;if(navigator.share)try{await navigator.share({text:d})}catch{}else await navigator.clipboard.writeText(d)};return a.jsxs("div",{onClick:o,className:"ach-overlay",children:[a.jsx("div",{className:"ach-kicker",children:"ACHIEVEMENT UNLOCKED"}),a.jsx("div",{className:"ach-icon",children:i.icon}),a.jsx("div",{className:"ach-title",children:i.title}),a.jsx("div",{className:"ach-sub",children:i.sub}),a.jsxs("div",{className:"ach-quote",children:['"',Yw(s),'"']}),a.jsx("button",{className:"ach-share",onClick:l,children:"Share ↗"}),a.jsx("div",{className:"ach-tap",children:e.length>1?`${r+1} of ${e.length} — tap to continue`:"Tap anywhere to continue"}),a.jsx("style",{children:`
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
      `})]})}const f1=["Wrist","Snap","Slap","Backhand"],m1=["Saves"],g1=["Toe Drag","Figure 8","Lateral","One-Hand"],Xu={Wrist:"🎯",Snap:"⚡",Slap:"💥",Backhand:"🔄",Saves:"🧤","Toe Drag":"👟","Figure 8":"8️⃣",Lateral:"↔️","One-Hand":"✋"};function x1(){var V;const{player:e,refresh:t}=It(),[r,n]=v.useState({todayTotal:0,weekTotal:0,todayByType:{}}),[s,i]=v.useState(null),[o,l]=v.useState(null),[c,d]=v.useState([]),[h,u]=v.useState(""),[p,x]=v.useState([]),[y,b]=v.useState(0),[w,g]=v.useState([]),[f,m]=v.useState(0),[k,N]=v.useState(!1),[S,_]=v.useState(null),[L,G]=v.useState(0),[C,Z]=v.useState(null),le=(e==null?void 0:e.position)==="G"?m1:f1;v.useEffect(()=>{e&&(ue(),ew(e.team_id,e.id).then(i).catch(()=>{}),em().then(g).catch(()=>{}),nw(e.id).then(m).catch(()=>{}),e.team_id&&Promise.all([Qf(e.team_id),Xf(e.team_id),Mw(e.id,e.team_id,e.club_id)]).then(([A,P,M])=>{_(A),G(P),Z(M)}).catch(A=>{console.error("Battle/challenge load error:",A)}))},[e]);const ue=async()=>{if(!e)return;const A=await Xb(e.id);n(A)};v.useEffect(()=>{if(!e)return;const A=setInterval(()=>{t()},4e3);return()=>clearInterval(A)},[e,t]);const De=v.useMemo(()=>Xa((e==null?void 0:e.lifetime_shots)||0),[e==null?void 0:e.lifetime_shots]),Re=v.useMemo(()=>{if(!e)return"";const A=new Date().toISOString().slice(0,10),P=e.current_streak>0?"daily_greeting":"daily_greeting_no_streak";return Zf(P,`${e.id}-${A}`,{name:e.display_name,streak:e.current_streak||1})},[e]),ve=async(A,P)=>{if(!(!P||P<=0)){l(null),n(M=>({...M,todayTotal:M.todayTotal+P,weekTotal:M.weekTotal+P,todayByType:{...M.todayByType,[A]:(M.todayByType[A]||0)+P}})),d(M=>[...M.slice(-9),{type:A,count:P,ts:Date.now()}]),navigator.vibrate&&navigator.vibrate(20);try{await Fu({playerId:e.id,shotType:A,count:P}),setTimeout(ue,400),b(Ce=>Ce+1);const M=r.todayTotal+P,F=e.daily_goal||50,H=e.lifetime_shots+P;M===F?R("🔥 Daily goal reached!"):M===100?R("💪 100 shots today!"):M===50&&R("⭐ 50 shots!");const re=[250,500,1e3,2500,5e3];for(const Ce of re)if(H===Ce){R(`${{250:"🥈",500:"🥇",1e3:"💎",2500:"👑",5e3:"🏆"}[Ce]} ${Ce.toLocaleString()} TOTAL SHOTS!`);break}["Wrist","Snap","Slap","Backhand","Saves"].includes(A)&&M>f&&f>0&&(m(M),N(!0),setTimeout(()=>N(!1),4e3));const Ge=await r1(e.id);Ge.length>0&&x(Ge)}catch(M){console.error("Shot log error:",M),n(F=>({...F,todayTotal:Math.max(0,F.todayTotal-P),weekTotal:Math.max(0,F.weekTotal-P),todayByType:{...F.todayByType,[A]:Math.max(0,(F.todayByType[A]||0)-P)}})),d(F=>F.slice(0,-1)),R("Save failed: "+(M.message||"Unknown error"))}}},I=async()=>{const A=c[c.length-1];if(A){n(P=>({...P,todayTotal:Math.max(0,P.todayTotal-A.count),weekTotal:Math.max(0,P.weekTotal-A.count),todayByType:{...P.todayByType,[A.type]:Math.max(0,(P.todayByType[A.type]||0)-A.count)}})),d(P=>P.slice(0,-1));try{await Fu({playerId:e.id,shotType:A.type,count:-A.count}),setTimeout(ue,400),b(P=>P+1)}catch{R("Undo failed")}}},R=A=>{u(A),setTimeout(()=>u(""),2e3)};if(!e)return null;const D=c[c.length-1],$=!!D;if(s){const A=s.today_shots||0,P=s.week_shots||0,M=r.todayTotal-A;r.weekTotal-P;const F=P>0?`${P.toLocaleString()} this week`:"no shots this week";A===0?`${s.display_name}${F}`:M>0?`${s.display_name}${A}`:M<0?`${s.display_name}${A}`:`${s.display_name}${A}`}return a.jsxs("div",{className:"home fade-in",children:[a.jsxs("header",{className:"topbar",children:[a.jsxs("div",{className:"me",children:[a.jsx("div",{className:"avatar",children:(V=e.display_name[0])==null?void 0:V.toUpperCase()}),a.jsxs("div",{children:[a.jsx("div",{className:"me-name",children:e.display_name}),a.jsxs("div",{className:"me-sub",children:[De.fullName," · ",e.lifetime_shots.toLocaleString()," shots"]})]})]}),e.current_streak>0&&a.jsxs("div",{className:"streak",children:[a.jsx(v1,{}),a.jsx("span",{className:"tnum",children:e.current_streak})]})]}),n1(e)?a.jsx(c1,{player:e,todayShots:r.todayTotal}):a.jsx(l1,{player:e}),a.jsx(o1,{playerId:e.id,dailyGoal:e.daily_goal||50,refreshKey:y,goalType:"wrist"}),Re&&a.jsxs("div",{className:"sam",children:[a.jsx("div",{className:"sam-bubble",children:"🏒"}),a.jsx("div",{className:"sam-text",children:Re})]}),e.lifetime_shots===0&&a.jsxs("div",{className:"first-time-nudge",children:[a.jsx("div",{className:"ftn-title",children:"Log your first shots 🏒"}),a.jsx("div",{className:"ftn-body",children:"Tap any shot type below to get on the board. Every rep counts toward your rank."})]}),e.lifetime_shots>0&&a.jsx("div",{className:"tap-hint",children:"Tap a shot type to log it"}),a.jsx("div",{className:"shots-grid",children:le.map(A=>{const P=r.todayByType[A]||0;return a.jsxs("button",{className:"shot-card",onClick:()=>l(A),children:[a.jsxs("div",{className:"shot-name",children:[Xu[A]," ",A]}),a.jsx("div",{className:"shot-value tnum",children:P}),a.jsx("div",{className:"shot-hint",children:"today"})]},A)})}),a.jsxs("div",{className:"stick-section",children:[a.jsxs("div",{className:"stick-header",children:[a.jsx("div",{className:"label-sm",children:"Stick skills 🏑"}),a.jsx("div",{className:"stick-hint",children:"reps today"})]}),a.jsx("div",{className:"stick-grid",children:g1.map(A=>{const P=r.todayByType[A]||0;return a.jsxs("button",{className:"stick-card",onClick:()=>l(A),children:[a.jsxs("div",{className:"stick-name",children:[Xu[A]," ",A]}),a.jsx("div",{className:"stick-value tnum",children:P||"—"})]},A)})})]}),e.lifetime_shot_goal&&(()=>{const A=Math.round(e.lifetime_shots/e.lifetime_shot_goal*100),P=e.lifetime_shot_goal-e.lifetime_shots,M=H=>H<250?"🥉 Bronze":H<500?"🥈 Silver":H<1e3?"🥇 Gold":H<2500?"💎 Platinum":"👑 LEGEND",F=H=>H===100?"🏆 CHAMPION! YOU DID IT!":H>=75?"💪 Almost there! Keep pushing!":H>=50?"🔥 Halfway! You're unstoppable!":H>=25?"⚡ Great momentum! Keep it up!":H>=10?"🚀 You're off to a hot start!":"📈 Let's go! Build that streak!";return a.jsxs("div",{className:"progress-section",children:[a.jsxs("div",{style:{marginBottom:16},children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8},children:[a.jsxs("div",{children:[a.jsx("div",{className:"label-sm",style:{marginBottom:2},children:"Total shots 🎯"}),a.jsx("div",{style:{fontSize:20,fontWeight:800,fontFamily:"var(--font-display)",color:"var(--accent)"},children:M(e.lifetime_shots)})]}),a.jsxs("div",{style:{textAlign:"right"},children:[a.jsx("div",{className:"info-value tnum",style:{fontSize:14},children:e.lifetime_shots.toLocaleString()}),a.jsxs("div",{className:"info-value tnum",style:{fontSize:10,color:"var(--text-mute)"},children:["of ",e.lifetime_shot_goal.toLocaleString()]})]})]}),a.jsx("div",{style:{width:"100%",height:8,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden",marginBottom:8},children:a.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, var(--accent) 0%, #2563eb 100%)",width:`${Math.min(100,A)}%`,transition:"width 0.5s ease"}})}),a.jsxs("div",{style:{fontSize:12,color:"var(--text-mute)",marginBottom:8},children:[A,"% complete • ",P.toLocaleString()," shots to go"]}),a.jsx("div",{style:{fontSize:13,fontWeight:600,color:"var(--ice)",fontFamily:"var(--font-display)"},children:F(A)})]}),e.stickhandling_hour_goal&&a.jsxs("div",{children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6},children:[a.jsx("div",{className:"label-sm",children:"Stick time ⏱️"}),a.jsxs("div",{className:"info-value tnum",style:{fontSize:11},children:[(e.lifetime_drill_minutes/60).toFixed(1)," / ",e.stickhandling_hour_goal]})]}),a.jsx("div",{style:{width:"100%",height:6,background:"rgba(255,255,255,0.1)",borderRadius:3,overflow:"hidden"},children:a.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, #3dd68c 0%, #2dbd72 100%)",width:`${Math.min(100,Math.round(e.lifetime_drill_minutes/60/e.stickhandling_hour_goal*100))}%`,transition:"width 0.3s ease"}})})]})]})})(),$&&a.jsxs("button",{className:"undo-btn",onClick:I,children:[a.jsx("span",{className:"undo-icon",children:"↩"}),a.jsxs("span",{className:"undo-text",children:[a.jsx("span",{className:"undo-label",children:"Undo last entry"}),a.jsxs("span",{className:"undo-detail",children:["+",D.count," ",D.type]})]})]}),k&&a.jsxs("div",{className:"pb-banner",children:[a.jsxs("span",{children:["🏆 New personal best — ",r.todayTotal," shots today!"]}),a.jsx("button",{className:"pb-share",onClick:async()=>{const A=`New personal best — ${r.todayTotal} shots today! 🏒 #HockeyShotChallenge hockeyshotchallenge.com`;if(navigator.share)try{await navigator.share({text:A})}catch{}else await navigator.clipboard.writeText(A)},children:"Share"})]}),o&&a.jsx(d1,{type:o,onClose:()=>l(null),onSave:A=>ve(o,A)}),h&&a.jsx("div",{className:"toast",children:h}),p.length>0&&a.jsx(p1,{codes:p,onDismiss:()=>x([])}),a.jsx("style",{children:y1})]})}function v1(){return a.jsx("svg",{width:"11",height:"13",viewBox:"0 0 12 14",style:{display:"block"},children:a.jsx("path",{d:"M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z",fill:"#ff7a29"})})}const y1=`
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
`;function b1(){const[e,t]=v.useState([]),[r,n]=v.useState(!0);v.useEffect(()=>{em().then(t).catch(l=>{console.error("Failed to load videos:",l),t([])}).finally(()=>n(!1))},[]);const s=Math.floor(Date.now()/864e5),i=e.length>0?e[s%e.length]:null,o=i?e.filter(l=>l.id!==i.id):e;return a.jsxs("div",{className:"videos-screen fade-in",children:[a.jsxs("header",{className:"videos-header",children:[a.jsx("h1",{className:"videos-title",children:"Practice drills"}),a.jsx("div",{className:"videos-sub",children:"Watch and then put it on the wall 🎯"})]}),r&&a.jsx("div",{className:"videos-loading",children:"Loading drills…"}),!r&&i&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"featured-drill",children:[a.jsx("div",{className:"label-sm",style:{marginBottom:8,paddingLeft:14},children:"Drill of the day"}),a.jsxs("a",{href:`https://www.youtube.com/watch?v=${i.youtube_id}`,target:"_blank",rel:"noopener noreferrer",className:"featured-card",children:[a.jsxs("div",{className:"featured-thumb-wrap",children:[a.jsx("img",{src:`https://img.youtube.com/vi/${i.youtube_id}/mqdefault.jpg`,alt:i.title,className:"featured-thumb",loading:"lazy"}),a.jsx("div",{className:"featured-play",children:"▶"})]}),a.jsxs("div",{className:"featured-info",children:[a.jsx("div",{className:"featured-badge",children:i.skill_type==="shooting"?"🥅 Shooting":"🏑 Stickhandling"}),a.jsx("div",{className:"featured-title",children:i.title}),a.jsx("div",{className:"featured-cta",children:"Watch on YouTube →"})]})]})]}),o.length>0&&a.jsxs("div",{className:"more-drills",children:[a.jsx("div",{className:"label-sm",style:{marginBottom:8,paddingLeft:14},children:"More drills"}),a.jsx("div",{className:"drills-list",children:o.map(l=>a.jsxs("a",{href:`https://www.youtube.com/watch?v=${l.youtube_id}`,target:"_blank",rel:"noopener noreferrer",className:"drill-item",children:[a.jsxs("div",{className:"drill-thumb-wrap",children:[a.jsx("img",{src:`https://img.youtube.com/vi/${l.youtube_id}/mqdefault.jpg`,alt:l.title,className:"drill-thumb",loading:"lazy"}),a.jsx("div",{className:"drill-play-overlay",children:"▶"})]}),a.jsxs("div",{className:"drill-meta",children:[a.jsx("div",{className:"drill-title",children:l.title}),a.jsx("div",{className:"drill-badge",children:l.skill_type==="shooting"?"🥅 Shooting":"🏑 Stickhandling"})]})]},l.id))})]})]}),!r&&e.length===0&&a.jsxs("div",{className:"videos-empty",children:[a.jsx("div",{className:"videos-empty-icon",children:"🎬"}),a.jsx("div",{className:"videos-empty-text",children:"No drills yet"})]}),a.jsx("style",{children:`
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
      `})]})}function w1({playerId:e}){const[t,r]=v.useState([]),[n,s]=v.useState(!1);if(v.useEffect(()=>{if(!e)return;let o=!0;return Xw(e).then(l=>{o&&(r(l),s(!0))}),()=>{o=!1}},[e]),!n)return null;const i=Math.max(...t.map(o=>o.shots),10);return a.jsxs("div",{className:"chart-wrap",children:[a.jsx("div",{className:"chart-label",children:"LAST 7 DAYS"}),a.jsx("div",{className:"chart-bars",children:t.map(o=>{const l=i>0?Math.max(2,o.shots/i*100):2;return a.jsxs("div",{className:"chart-col",children:[a.jsx("div",{className:"chart-num",children:o.shots}),a.jsx("div",{className:"chart-bar-track",children:a.jsx("div",{className:`chart-bar ${o.isToday?"chart-bar--today":""} ${o.goalMet?"chart-bar--goal":""}`,style:{height:`${l}%`}})}),a.jsx("div",{className:`chart-day ${o.isToday?"chart-day--today":""}`,children:o.day})]},o.date)})}),a.jsx("style",{children:`
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
      `})]})}function k1({playerId:e}){const[t,r]=v.useState([]);if(v.useEffect(()=>{if(!e)return;let s=!0;return t1(e).then(i=>{s&&r(i)}),()=>{s=!1}},[e]),t.length===0)return null;const n=t.filter(s=>s.unlocked).length;return a.jsxs("div",{className:"badges-wrap",children:[a.jsxs("div",{className:"badges-header",children:[a.jsx("div",{className:"badges-label",children:"ACHIEVEMENTS"}),a.jsxs("div",{className:"badges-count",children:[n," / ",t.length]})]}),a.jsx("div",{className:"badges-row",children:t.map(s=>a.jsxs("div",{className:`badge ${s.unlocked?"badge--unlocked":"badge--locked"}`,title:s.unlocked?s.title:`Locked — ${s.description}`,children:[a.jsx("div",{className:"badge-icon",children:s.unlocked?s.icon:"🔒"}),a.jsx("div",{className:"badge-name",children:s.title})]},s.code))}),a.jsx("style",{children:`
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
      `})]})}function j1(){var w;const{player:e}=It(),[t,r]=v.useState(null),[n,s]=v.useState(""),i=v.useRef(null);v.useEffect(()=>{e&&Gf(e.id).then(r)},[e]);const o=v.useMemo(()=>Xa((e==null?void 0:e.lifetime_shots)||0),[e==null?void 0:e.lifetime_shots]);if(!e)return null;const l=e.created_at?new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—",c=e.card_number||0,d=String(c).padStart(3,"0"),h=e.position==="F"?"Forward":e.position==="D"?"Defense":"Goalie",u=t?Object.values(t).reduce((g,f)=>g+f,0):0,p=g=>u>0?Math.round(g/u*100):0,x=t?[{name:"Wrist",val:t.Wrist,pct:p(t.Wrist),color:"#2979ff"},{name:"Snap",val:t.Snap,pct:p(t.Snap),color:"#a8d4f5"},{name:"Slap",val:t.Slap,pct:p(t.Slap),color:"#ff7a29"},{name:"Backhand",val:t.Backhand,pct:p(t.Backhand),color:"#3dd68c"}].filter(g=>g.val>0):[];let y=null;if(x.length>0){const g=[...x].sort((f,m)=>m.pct-f.pct)[0];g.pct>=50?y=`${g.name} specialist`:x.length>=3?y="Balanced shooter":y=`${g.name} focused`}const b=async()=>{s("copying");try{const g=`${window.location.origin}/card/${e.username}`;navigator.share?(await navigator.share({title:`${e.display_name} on Hockey Shot Challenge`,text:`${o.fullName} · ${e.lifetime_shots.toLocaleString()} shots`,url:g}),s("")):(await navigator.clipboard.writeText(g),s("copied"),setTimeout(()=>s(""),2e3))}catch{s("")}};return a.jsxs("div",{className:"card-screen fade-in",children:[a.jsxs("header",{className:"card-header",children:[a.jsx("h1",{className:"card-title",children:"My card"}),a.jsx("button",{className:"share-link",onClick:b,children:n==="copied"?"✓ Link copied":"Share ↗"})]}),a.jsxs("div",{ref:i,className:"player-card",children:[a.jsx("div",{className:"player-card-bg",children:a.jsxs("svg",{viewBox:"0 0 320 220",preserveAspectRatio:"none",style:{width:"100%",height:"100%"},children:[a.jsx("path",{d:"M -20 140 Q 80 110, 180 150 T 360 130",stroke:"#a8d4f5",strokeWidth:"0.5",fill:"none",opacity:"0.3"}),a.jsx("path",{d:"M -20 160 Q 100 130, 200 170 T 360 150",stroke:"#a8d4f5",strokeWidth:"0.5",fill:"none",opacity:"0.25"}),a.jsx("path",{d:"M -20 180 Q 120 150, 220 190 T 360 170",stroke:"#a8d4f5",strokeWidth:"0.5",fill:"none",opacity:"0.2"}),a.jsx("circle",{cx:"40",cy:"40",r:"1",fill:"#a8d4f5",opacity:"0.6"}),a.jsx("circle",{cx:"280",cy:"30",r:"1",fill:"#a8d4f5",opacity:"0.5"}),a.jsx("circle",{cx:"180",cy:"50",r:"0.8",fill:"#a8d4f5",opacity:"0.5"}),a.jsx("circle",{cx:"80",cy:"70",r:"0.8",fill:"#a8d4f5",opacity:"0.4"}),a.jsx("circle",{cx:"290",cy:"80",r:"1",fill:"#a8d4f5",opacity:"0.5"})]})}),a.jsxs("div",{className:"player-card-content",children:[a.jsxs("div",{className:"card-meta",children:[a.jsxs("div",{children:[a.jsxs("div",{className:"card-meta-label",children:["HOCKEY SHOT CHALLENGE · ",new Date().getFullYear()]}),a.jsxs("div",{className:"card-meta-handle",children:["@",e.username]})]}),a.jsxs("div",{style:{textAlign:"right"},children:[a.jsx("div",{className:"card-meta-label",children:"CARD"}),a.jsxs("div",{className:"card-meta-serial tnum",children:["#",d]})]})]}),a.jsxs("div",{className:"card-identity",children:[a.jsxs("div",{className:"card-avatar",children:[a.jsxs("svg",{viewBox:"0 0 80 80",style:{width:"100%",height:"100%"},children:[a.jsx("polygon",{points:"40,4 72,22 72,58 40,76 8,58 8,22",fill:"#1a2847",stroke:"#2979ff",strokeWidth:"1.5"}),a.jsx("polygon",{points:"40,12 66,26 66,54 40,68 14,54 14,26",fill:"none",stroke:"#4a92ff",strokeWidth:"0.5",opacity:"0.6"})]}),a.jsx("div",{className:"card-avatar-letters",children:e.display_name.slice(0,2).toUpperCase()})]}),a.jsxs("div",{className:"card-identity-text",children:[a.jsx("div",{className:"card-display-name",children:e.display_name}),a.jsxs("div",{className:"card-pills",children:[a.jsx("div",{className:"card-pill",children:h.toUpperCase()}),((w=e.team)==null?void 0:w.name)&&a.jsx("div",{className:"card-pill",children:e.team.name}),e.club_name&&a.jsx("div",{className:"card-pill card-pill--club",children:e.club_name})]})]})]}),a.jsxs("div",{className:"card-rank",children:[a.jsxs("div",{className:"card-rank-row",children:[a.jsxs("div",{children:[a.jsx("div",{className:"card-meta-label",children:"Current rank"}),a.jsxs("div",{className:"card-rank-name-row",children:[a.jsx(Zu,{rank:o.name}),a.jsxs("div",{className:"card-rank-name",children:[o.name," ",a.jsx("span",{className:"card-rank-tier",children:o.tier})]})]})]}),!o.isMax&&a.jsxs("div",{style:{textAlign:"right"},children:[a.jsx("div",{className:"card-meta-label",children:"NEXT"}),a.jsx("div",{className:"card-rank-next",children:o.nextRankName}),a.jsxs("div",{className:"card-rank-togo tnum",children:[o.shotsToNextRank.toLocaleString()," to go"]})]})]}),!o.isMax&&a.jsx("div",{className:"card-rank-bar",children:a.jsx("div",{className:"card-rank-bar-fill",style:{width:`${Math.round(o.progress*100)}%`}})})]}),a.jsxs("div",{className:"card-stats",children:[a.jsxs("div",{className:"card-stat",children:[a.jsx("div",{className:"card-stat-num tnum",children:e.lifetime_shots.toLocaleString()}),a.jsx("div",{className:"card-stat-label",children:"Lifetime"})]}),a.jsxs("div",{className:"card-stat",children:[a.jsxs("div",{className:"card-stat-num-row",children:[e.current_streak>0&&a.jsx(N1,{}),a.jsx("div",{className:"card-stat-num tnum",children:e.current_streak})]}),a.jsx("div",{className:"card-stat-label",children:"Streak"})]}),a.jsxs("div",{className:"card-stat",children:[a.jsx("div",{className:"card-stat-num",children:e.position}),a.jsx("div",{className:"card-stat-label",children:"Position"})]})]}),x.length>0&&a.jsxs("div",{className:"card-mix",children:[a.jsxs("div",{className:"card-mix-head",children:[a.jsx("div",{className:"card-meta-label",children:"Shot mix · lifetime"}),y&&a.jsx("div",{className:"card-specialty",children:y})]}),a.jsx("div",{className:"card-mix-bar",children:x.map(g=>a.jsx("div",{style:{width:`${g.pct}%`,background:g.color}},g.name))}),a.jsx("div",{className:"card-mix-legend",children:x.map(g=>a.jsxs("div",{className:"card-mix-item",children:[a.jsx("span",{style:{color:g.color},children:"●"}),a.jsxs("span",{children:[g.name," ",g.pct,"%"]})]},g.name))})]}),a.jsxs("div",{className:"card-footer",children:[a.jsxs("div",{children:[a.jsx("div",{className:"card-meta-label",children:"Joined"}),a.jsx("div",{className:"card-footer-text",children:l})]}),a.jsx("div",{className:"card-meta-label",children:"HSC"})]})]})]}),a.jsx(w1,{playerId:e.id}),a.jsx(k1,{playerId:e.id}),a.jsxs("div",{className:"rank-ladder",children:[a.jsx("div",{className:"label-sm",style:{marginBottom:8,padding:"0 4px"},children:"The ladder"}),a.jsx("div",{className:"rank-ladder-rows",children:Ys.map(g=>{const f=e.lifetime_shots>=g.floor,m=o.name===g.name;return a.jsxs("div",{className:`ladder-row ${m?"ladder-row--current":""} ${f?"":"ladder-row--locked"}`,children:[a.jsx("div",{className:"ladder-icon",children:a.jsx(Zu,{rank:g.name,small:!0})}),a.jsx("div",{className:"ladder-name",children:g.name}),a.jsx("div",{className:"ladder-range tnum",children:g.next===1/0?`${g.floor.toLocaleString()}+`:`${g.floor.toLocaleString()}–${g.next.toLocaleString()}`}),m&&a.jsx("div",{className:"ladder-current-tag",children:"You"})]},g.name)})})]}),a.jsx("style",{children:S1})]})}function Zu({rank:e,small:t}){const r=t?16:22,n={width:r,height:r};switch(e){case"Rookie":return a.jsx("svg",{...n,viewBox:"0 0 16 16",children:a.jsx("circle",{cx:"8",cy:"8",r:"6",fill:"#a8d4f5",opacity:"0.7"})});case"Junior":return a.jsx("svg",{...n,viewBox:"0 0 16 16",children:a.jsx("polygon",{points:"8,2 14,14 2,14",fill:"#a8d4f5"})});case"Prospect":return a.jsx("svg",{...n,viewBox:"0 0 16 16",children:a.jsx("polygon",{points:"8,2 14,5 14,11 8,14 2,11 2,5",fill:"#7f77dd"})});case"Varsity":return a.jsx("svg",{...n,viewBox:"0 0 24 24",children:a.jsx("polygon",{points:"12,2 15,9 22,9 16.5,13.5 18.5,21 12,17 5.5,21 7.5,13.5 2,9 9,9",fill:"#ffb94a"})});case"Captain":return a.jsxs("svg",{...n,viewBox:"0 0 24 24",children:[a.jsx("path",{d:"M 6 4 L 18 4 L 18 10 Q 18 16, 12 19 Q 6 16, 6 10 Z",fill:"#ffb94a",stroke:"#ff9b1a",strokeWidth:"0.5"}),a.jsx("text",{x:"12",y:"14",textAnchor:"middle",fontFamily:"var(--font-display)",fontSize:"10",fontWeight:"700",fill:"#2a2416",children:"C"})]});case"All-Star":return a.jsx("svg",{...n,viewBox:"0 0 16 16",children:a.jsx("polygon",{points:"8,1 9.7,5.4 14.4,5.8 10.8,9 11.9,13.7 8,11.2 4.1,13.7 5.2,9 1.6,5.8 6.3,5.4",fill:"#ffb94a"})});case"Legend":return a.jsxs("svg",{...n,viewBox:"0 0 16 16",children:[a.jsx("path",{d:"M 4 4 L 12 4 L 12 8 Q 12 12, 8 13 Q 4 12, 4 8 Z",fill:"#ffb94a"}),a.jsx("rect",{x:"7.4",y:"1",width:"1.2",height:"3",fill:"#ffb94a"}),a.jsx("rect",{x:"3",y:"3",width:"10",height:"1.5",fill:"#ffb94a"})]});default:return a.jsx("svg",{...n,viewBox:"0 0 16 16",children:a.jsx("circle",{cx:"8",cy:"8",r:"6",fill:"#a8d4f5"})})}}function N1(){return a.jsx("svg",{width:"14",height:"16",viewBox:"0 0 12 14",style:{display:"block"},children:a.jsx("path",{d:"M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z",fill:"#ff7a29"})})}const S1=`
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
`;function _1(){var f;const{player:e}=It(),[t,r]=v.useState(null),[n,s]=v.useState("week"),[i,o]=v.useState([]),[l,c]=v.useState(!0),[d,h]=v.useState(0);v.useEffect(()=>{e&&(e.team_id?r("team"):e.club_name?r("club"):r("global"))},[e==null?void 0:e.team_id,e==null?void 0:e.club_name]);const u=v.useMemo(()=>!e||!t?{}:t==="team"?{teamId:e.team_id}:t==="club"?{clubName:e.club_name}:{},[e,t]);v.useEffect(()=>{if(!e||!t)return;c(!0),(n==="week"?rw:tw)(u).then(k=>{o(k),c(!1)}),t==="team"&&e.team_id?aw(e.team_id).then(h):t==="club"&&e.club_name?sw(e.club_name).then(h):h(0)},[e,t,n,u]);const p=v.useMemo(()=>{if(!e)return null;const m=i.findIndex(k=>k.id===e.id);return m===-1?null:m+1},[i,e]),x=v.useMemo(()=>i.find(m=>m.id===(e==null?void 0:e.id)),[i,e]),y=v.useMemo(()=>{if(!e||i.length===0)return[];const m=i.findIndex(k=>k.id===e.id);return m===-1||m<5?[]:i.slice(Math.max(0,m-1),Math.min(i.length,m+2))},[i,e]),b=i.slice(0,5);if(!e||!t)return null;const w=((f=e.team)==null?void 0:f.name)||"Team",g=e.club_name||"Club";return a.jsxs("div",{className:"rank-screen fade-in",children:[a.jsx("header",{className:"rank-header",children:a.jsx("h1",{className:"rank-title",children:"Rankings"})}),a.jsxs("div",{className:"seg-control",children:[a.jsx("button",{className:`seg-btn ${t==="team"?"seg-btn--active":""}`,onClick:()=>r("team"),disabled:!e.team_id,children:w}),a.jsx("button",{className:`seg-btn ${t==="club"?"seg-btn--active":""}`,onClick:()=>r("club"),disabled:!e.club_name,children:g}),a.jsx("button",{className:`seg-btn ${t==="global"?"seg-btn--active":""}`,onClick:()=>r("global"),children:"Global"})]}),a.jsxs("div",{className:"period-row",children:[a.jsx("button",{className:`pill ${n==="week"?"pill--active":""}`,onClick:()=>s("week"),children:"This week"}),a.jsx("button",{className:`pill ${n==="all"?"pill--active":""}`,onClick:()=>s("all"),children:"All time"})]}),x&&p&&a.jsxs("div",{className:"my-spot",children:[a.jsxs("div",{children:[a.jsx("div",{className:"label-sm",children:"Your spot"}),a.jsxs("div",{className:"my-spot-rank tnum",children:["#",p,d>0&&a.jsxs("span",{className:"my-spot-of",children:[" of ",d]})]})]}),a.jsxs("div",{style:{textAlign:"right"},children:[a.jsx("div",{className:"label-sm",children:n==="week"?"Week shots":"Lifetime"}),a.jsx("div",{className:"my-spot-shots tnum",children:(n==="week"?x.week_shots:x.lifetime_shots).toLocaleString()})]})]}),!x&&n==="week"&&!l&&a.jsxs("div",{className:"empty-spot",children:[a.jsx("div",{children:"You haven't logged any shots this week yet."}),a.jsx("div",{style:{fontSize:12,color:"var(--text-mute)",marginTop:4},children:"Head to Home and rack 'em up."})]}),!l&&b.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"label-sm",style:{margin:"14px 4px 8px"},children:t==="team"?"Top of the team":t==="club"?"Top of the club":"Top of the board"}),a.jsx("div",{className:"board",children:b.map((m,k)=>a.jsx(eh,{row:m,rank:k+1,isMe:m.id===e.id,period:n},m.id))})]}),y.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"dots",children:"· · ·"}),a.jsx("div",{className:"label-sm",style:{margin:"0 4px 8px"},children:"Around you"}),a.jsx("div",{className:"board",children:y.map(m=>{const k=i.findIndex(N=>N.id===m.id);return a.jsx(eh,{row:m,rank:k+1,isMe:m.id===e.id,period:n},m.id)})})]}),!l&&i.length===0&&a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-title",children:"No shots logged yet"}),a.jsx("div",{className:"empty-sub",children:t==="team"?"Be the first on your team.":t==="club"?"Be the first in your club.":"Be the first to put up a number."})]}),l&&a.jsx("div",{className:"empty-state",children:a.jsx("div",{className:"empty-sub",children:"Loading…"})}),a.jsx("style",{children:T1})]})}function eh({row:e,rank:t,isMe:r,period:n}){var l;const s=Xa(e.lifetime_shots),i=n==="week"?e.week_shots:e.lifetime_shots,o=((l=e.display_name)==null?void 0:l.slice(0,2).toUpperCase())||"??";return a.jsxs("div",{className:`row ${r?"row--me":""}`,children:[a.jsx("div",{className:`row-rank ${t===1?"row-rank--gold":t<=3?"row-rank--silver":""}`,children:t}),a.jsx("div",{className:"row-avatar",children:o}),a.jsxs("div",{className:"row-info",children:[a.jsxs("div",{className:"row-name",children:[r?"You":e.display_name,e.position&&a.jsxs("span",{className:"row-pos",children:[" · ",e.position]})]}),a.jsx("div",{className:"row-rank-name",children:s.fullName})]}),e.current_streak>0&&a.jsxs("div",{className:"row-streak",children:[a.jsx(C1,{}),a.jsx("span",{className:"tnum",children:e.current_streak})]}),a.jsx("div",{className:"row-shots tnum",children:i.toLocaleString()})]})}function C1(){return a.jsx("svg",{width:"9",height:"11",viewBox:"0 0 12 14",style:{display:"block"},children:a.jsx("path",{d:"M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z",fill:"#ff7a29"})})}const T1=`
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
`,E1=typeof window<"u"?window.location.origin:"",A1=[25,50,100,200];function P1(){var Re,ve;const{player:e,refresh:t}=It(),r=we(),[n,s]=v.useState(!1),[i,o]=v.useState((e==null?void 0:e.daily_goal)||50),[l,c]=v.useState(!1),[d,h]=v.useState((e==null?void 0:e.lifetime_shot_goal)||5e3),[u,p]=v.useState((e==null?void 0:e.stickhandling_hour_goal)||5),[x,y]=v.useState(!1),[b,w]=v.useState(!1),[g,f]=v.useState(!1),[m,k]=v.useState(!1),[N,S]=v.useState([]),[_,L]=v.useState(null);if(v.useEffect(()=>{Wb().then(S).catch(()=>{})},[]),!e)return null;const G=async I=>{I.id===e.id||_||(L(I.id),localStorage.setItem("activePlayerId",I.id),await t(),L(null))},C=async()=>{var D;const I=(D=e.team)==null?void 0:D.name;if(!I)return;const R=`Join my team on Hockey Shot Challenge! Team name: ${I}
${E1}`;try{navigator.share?(await navigator.share({title:"Join my team on Hockey Shot Challenge",text:R}),s(!0),setTimeout(()=>s(!1),2e3)):(await navigator.clipboard.writeText(R),s(!0),setTimeout(()=>s(!1),2e3))}catch($){console.error("Share failed:",$);try{await navigator.clipboard.writeText(I),s(!0),setTimeout(()=>s(!1),2e3)}catch(V){console.error("Copy failed:",V)}}},Z=async I=>{o(I),c(!0);try{await Qw(e.id,I),await t()}catch{o(e.daily_goal||50)}finally{c(!1)}},le=async()=>{y(!0);try{const{error:I}=await z.from("players").update({lifetime_shot_goal:Math.max(100,Math.min(5e4,Math.round(d))),stickhandling_hour_goal:Math.max(1,Math.min(500,Math.round(u*10)/10))}).eq("id",e.id);if(I)throw I;await t()}catch(I){console.error("Failed to save goals:",I),h(e.lifetime_shot_goal||5e3),p(e.stickhandling_hour_goal||5)}finally{y(!1)}},ue=async()=>{await Wf(),await t(),r("/start")},De=async()=>{f(!0);try{await Fb(e.id),r("/start",{replace:!0})}catch{f(!1),w(!1),window.alert("Something went wrong. Try again.")}};return e.card_number&&`${String(e.card_number).padStart(3,"0")}`,a.jsxs("div",{className:"more-screen fade-in",children:[a.jsx("header",{className:"more-header",children:a.jsx("h1",{className:"more-title",children:"Settings"})}),((Re=e.team)==null?void 0:Re.name)&&a.jsxs("div",{className:"invite-card",children:[a.jsxs("div",{className:"invite-top",children:[a.jsx("div",{className:"label-sm",children:"Your team"}),a.jsx("div",{className:"invite-team-name",children:e.team.name}),e.club_name&&a.jsx("div",{className:"invite-club-name",children:e.club_name})]}),a.jsx("div",{className:"invite-hint",children:"Share your team name with friends so they can join and compete with you."}),a.jsx("button",{className:"invite-btn",onClick:C,children:n?"✓ Shared":"↗ Invite teammates"})]}),!((ve=e.team)!=null&&ve.name)&&a.jsxs("div",{className:"solo-card",children:[a.jsx("div",{className:"label-sm",children:"Solo mode"}),a.jsx("div",{className:"solo-card-title",children:"You're flying solo"}),a.jsx("div",{className:"solo-card-hint",children:"Start or join a team to compete on the rankings with teammates. Sign out and sign back in to change this."})]}),a.jsxs("button",{className:"drills-link",onClick:()=>r("/videos"),children:[a.jsx("div",{className:"drills-link-icon",children:"🎬"}),a.jsxs("div",{className:"drills-link-text",children:[a.jsx("div",{className:"drills-link-title",children:"Watch drills"}),a.jsx("div",{className:"drills-link-sub",children:"Learn new moves from pros"})]}),a.jsx("div",{className:"drills-link-arrow",children:"→"})]}),a.jsxs("div",{className:"section",children:[a.jsx("div",{className:"label-sm",style:{marginBottom:8},children:"Daily goal"}),a.jsxs("div",{className:"info-card",children:[a.jsxs("div",{className:"goal-current-row",children:[a.jsxs("div",{children:[a.jsx("div",{className:"info-label",children:"Today's target"}),a.jsxs("div",{className:"info-value tnum",children:[i," shots"]})]}),l&&a.jsx("div",{style:{color:"var(--text-mute)",fontSize:11},children:"saving…"})]}),a.jsx("div",{className:"goal-options",children:A1.map(I=>a.jsx("button",{className:`goal-chip ${i===I?"goal-chip--active":""}`,onClick:()=>Z(I),disabled:l,children:I},I))}),a.jsx("div",{className:"info-hint",children:"How many shots you're aiming for each day. The ring on Home fills as you log."})]})]}),a.jsxs("div",{className:"section",children:[a.jsx("div",{className:"label-sm",style:{marginBottom:8},children:"My goals 🎯"}),a.jsxs("div",{className:"info-card",children:[a.jsxs("div",{style:{marginBottom:16},children:[a.jsx("div",{className:"info-label",children:"Total shots to reach 🎯"}),a.jsx("div",{style:{display:"flex",gap:8,alignItems:"center",marginTop:8},children:a.jsx("input",{type:"number",value:d,onChange:I=>h(Math.max(100,parseInt(I.target.value)||100)),disabled:x,style:{flex:1,background:"var(--bg)",border:"0.5px solid var(--border-dim)",borderRadius:8,padding:"8px 12px",color:"white",fontSize:14,fontFamily:"var(--font-display)",fontWeight:600}})})]}),a.jsxs("div",{children:[a.jsx("div",{className:"info-label",children:"Stick time hours ⏱️"}),a.jsx("div",{style:{display:"flex",gap:8,alignItems:"center",marginTop:8},children:a.jsx("input",{type:"number",step:"0.5",value:u,onChange:I=>p(Math.max(1,parseFloat(I.target.value)||1)),disabled:x,style:{flex:1,background:"var(--bg)",border:"0.5px solid var(--border-dim)",borderRadius:8,padding:"8px 12px",color:"white",fontSize:14,fontFamily:"var(--font-display)",fontWeight:600}})})]}),a.jsx("button",{onClick:le,disabled:x,style:{width:"100%",marginTop:14,background:"var(--accent)",color:"white",border:"none",borderRadius:8,padding:10,fontSize:13,fontWeight:600,cursor:x?"not-allowed":"pointer",opacity:x?.6:1},children:x?"Saving…":"Save goals"}),a.jsx("div",{className:"info-hint",children:"Set your personal goals. Progress shows on the home screen."})]})]}),N.length>0&&a.jsxs("div",{className:"section",children:[a.jsx("div",{className:"label-sm",style:{marginBottom:8},children:"Players on this account"}),a.jsx("div",{className:"players-list",children:N.map(I=>{var R,D;return a.jsxs("button",{className:`player-row ${I.id===e.id?"player-row--active":""}`,onClick:()=>G(I),disabled:_!==null,children:[a.jsx("div",{className:"player-row-avatar",children:(R=I.display_name[0])==null?void 0:R.toUpperCase()}),a.jsxs("div",{className:"player-row-info",children:[a.jsx("div",{className:"player-row-name",children:I.display_name}),a.jsxs("div",{className:"player-row-sub",children:[I.position==="F"?"Forward":I.position==="D"?"Defense":I.position==="G"?"Goalie":"—",(D=I.team)!=null&&D.name?` · ${I.team.name}`:""]})]}),I.id===e.id?a.jsx("div",{className:"player-row-badge",children:"Active"}):_===I.id?a.jsx("div",{className:"player-row-switching",children:"Switching…"}):a.jsx("div",{className:"player-row-switch",children:"Switch →"})]},I.id)})}),a.jsx("button",{className:"add-player-btn",onClick:()=>r("/add-player"),children:"+ Add another player"})]}),a.jsx("button",{className:"signout-btn",onClick:()=>k(!0),children:"Sign out"}),a.jsx("button",{className:"privacy-link-btn",onClick:()=>r("/privacy"),children:"Privacy policy"}),a.jsx("button",{className:"delete-btn",onClick:()=>w(!0),children:"Delete account"}),m&&a.jsx("div",{className:"delete-overlay",onClick:()=>k(!1),children:a.jsxs("div",{className:"delete-modal",onClick:I=>I.stopPropagation(),children:[a.jsx("div",{className:"delete-modal-icon",children:"👋"}),a.jsx("h2",{className:"delete-modal-title",children:"Sign out?"}),a.jsx("p",{className:"delete-modal-body",children:e.username?a.jsxs(a.Fragment,{children:["Your username is ",a.jsxs("strong",{style:{color:"white"},children:["@",e.username]})," — save it so you can sign back in."]}):"You can sign back in with Google any time."}),a.jsx("button",{className:"signout-confirm-btn",onClick:ue,children:"Sign out"}),a.jsx("button",{className:"delete-cancel-btn",onClick:()=>k(!1),children:"Cancel"})]})}),b&&a.jsx("div",{className:"delete-overlay",children:a.jsxs("div",{className:"delete-modal",children:[a.jsx("div",{className:"delete-modal-icon",children:"⚠️"}),a.jsx("h2",{className:"delete-modal-title",children:"Delete your account?"}),a.jsx("p",{className:"delete-modal-body",children:"This permanently deletes your shots, streak, rank, and card. There's no undo."}),a.jsx("button",{className:"delete-confirm-btn",onClick:De,disabled:g,children:g?"Deleting…":"Yes, delete everything"}),a.jsx("button",{className:"delete-cancel-btn",onClick:()=>w(!1),disabled:g,children:"Cancel"})]})}),a.jsx("style",{children:z1})]})}const z1=`
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
`;function R1(e){const t=parseInt((e||"").replace("U",""),10);return t?t<=10?"6-10":t<=14?"11-14":t<=18?"15-18":"18+":null}function O1(){const e=we(),{refresh:t}=It(),[r,n]=v.useState(""),[s,i]=v.useState(""),[o,l]=v.useState(null),[c,d]=v.useState(""),[h,u]=v.useState([]),[p,x]=v.useState(!1),[y,b]=v.useState(null),[w,g]=v.useState(""),[f,m]=v.useState(""),[k,N]=v.useState(!1),[S,_]=v.useState(""),L=v.useRef(null);v.useEffect(()=>{if(L.current&&clearTimeout(L.current),!c.trim()||c.trim().length<2){u([]),x(!1);return}return x(!0),L.current=setTimeout(async()=>{try{const C=await Vr(c,6);u(C||[])}catch{u([])}finally{x(!1)}},200),()=>{L.current&&clearTimeout(L.current)}},[c]);const G=async()=>{if(!r.trim()){_("Add the player's first name so their coach knows who they are.");return}if(!s.trim()){_("Add a player name for the leaderboard.");return}if(!o){_("Pick a position.");return}_(""),N(!0);try{let C=null;y&&w&&f&&(C=(await Vf({clubId:y.id,ageDivision:w,tier:f})).teamId),await Bl({firstName:r.trim(),displayName:s.trim(),position:o,ageBracket:R1(w),teamId:C,clubId:(y==null?void 0:y.id)||null,clubName:(y==null?void 0:y.name)||null}),await t(),e("/home",{replace:!0})}catch(C){_(C.message||"Something went wrong. Try again."),N(!1)}};return a.jsxs("div",{className:"add-player-wrap fade-in",children:[a.jsxs("div",{className:"add-player-card",children:[a.jsx("button",{className:"add-player-back",onClick:()=>e(-1),children:"← Back"}),a.jsx("h2",{className:"add-player-title",children:"Add a player"}),a.jsx("p",{className:"add-player-sub",children:"This creates a new player profile on your Google account. You can switch between players any time."}),a.jsxs("label",{className:"input-label",children:[a.jsx("span",{children:"First name (shown to their coach)"}),a.jsx("input",{type:"text",value:r,onChange:C=>n(C.target.value),placeholder:"Their real first name",className:"input-field",autoFocus:!0})]}),a.jsxs("label",{className:"input-label",style:{marginTop:12},children:[a.jsx("span",{children:"Player name (on leaderboards)"}),a.jsx("input",{type:"text",value:s,onChange:C=>i(C.target.value),placeholder:"What do they go by?",className:"input-field"})]}),a.jsx("div",{className:"add-player-pos-label",children:"Position"}),a.jsx("div",{className:"add-player-chips",children:["F","D","G"].map(C=>a.jsxs("button",{className:`add-player-chip ${o===C?"add-player-chip--active":""}`,onClick:()=>l(C),children:[a.jsx("div",{className:"add-player-chip-letter",children:C}),a.jsx("div",{className:"add-player-chip-sub",children:C==="F"?"Forward":C==="D"?"Defense":"Goalie"})]},C))}),a.jsx("div",{className:"add-player-section-label",children:"Club (optional)"}),a.jsx("div",{className:"add-player-club-hint",children:"Connect them to their association so coaches can see them."}),y?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"join-club-selected",children:[a.jsx("div",{className:"join-club-selected-name",children:y.name}),y.city&&a.jsx("div",{className:"join-club-selected-city",children:y.city}),a.jsx("button",{className:"join-club-change",onClick:()=>{b(null),g(""),m("")},children:"Change"})]}),a.jsxs("label",{className:"input-label",style:{marginTop:12},children:[a.jsx("span",{children:"Age division"}),a.jsxs("select",{value:w,onChange:C=>g(C.target.value),className:"input-field",children:[a.jsx("option",{value:"",children:"Pick one"}),ja.map(C=>a.jsx("option",{value:C,children:C},C))]})]}),a.jsxs("label",{className:"input-label",style:{marginTop:10},children:[a.jsx("span",{children:"Tier"}),a.jsxs("select",{value:f,onChange:C=>m(C.target.value),className:"input-field",children:[a.jsx("option",{value:"",children:"Pick one"}),Na.map(C=>a.jsx("option",{value:C,children:C},C))]})]})]}):a.jsxs("div",{style:{position:"relative"},children:[a.jsx("input",{type:"text",value:c,onChange:C=>d(C.target.value),placeholder:"Search for their association…",className:"input-field",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false"}),c.trim().length>=2&&a.jsxs("div",{className:"join-club-dropdown",children:[p&&a.jsx("div",{className:"join-club-status",children:"Searching…"}),!p&&h.length===0&&a.jsx("div",{className:"join-club-status",children:"No clubs found — you can skip this for now."}),h.map(C=>a.jsxs("button",{className:"join-club-result",onClick:()=>{b(C),d(""),u([])},children:[a.jsx("span",{className:"join-club-result-name",children:C.name}),C.city&&a.jsx("span",{className:"join-club-result-meta",children:C.city})]},C.id))]})]}),S&&a.jsx("div",{className:"add-player-error",children:S}),a.jsx("button",{className:"add-player-submit",onClick:G,disabled:!r||!s||!o||k,children:k?"Creating profile…":"Create profile →"})]}),a.jsx("style",{children:L1})]})}const L1=`
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
`;function I1(){const e=we();return v.useEffect(()=>{ze({title:"Privacy Policy",url:`${ee}/privacy`})},[]),a.jsxs("div",{className:"privacy-wrap",children:[a.jsxs("div",{className:"privacy-inner",children:[a.jsx("button",{className:"privacy-back",onClick:()=>e(-1),children:"← Back"}),a.jsx("h1",{className:"privacy-title",children:"Privacy Policy"}),a.jsx("p",{className:"privacy-meta",children:"Hockey Shot Challenge · Last updated June 27, 2026"}),a.jsx("p",{children:'Hockey Shot Challenge ("we", "our", or "the app") is a shot-tracking app for hockey players. This policy explains what data we collect, how we use it, and your rights.'}),a.jsx("h2",{children:"What we collect"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"Account info:"})," When you sign up with Google, we receive your Google account name and email address. We use your name to set your in-app display name. Your email is stored by our auth provider (Supabase) and is never shown publicly or shared."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Player profile:"})," Your display name, first name, position (forward / defense / goalie), team, and age group."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Shot and drill logs:"})," The number and type of shots or reps you log each day. Logs include a timestamp and count — no location or video is recorded."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Usage data:"})," Supabase and Netlify may collect standard server logs (IP address, request timestamps) as part of hosting the service."]})]}),a.jsx("h2",{children:"How we use your data"}),a.jsxs("ul",{children:[a.jsx("li",{children:"To power leaderboards, streaks, squad battles, and the coach dashboard"}),a.jsx("li",{children:"To show your stats to your coach (if you joined a team)"}),a.jsx("li",{children:"To generate your public player card (accessible via your username link)"})]}),a.jsx("p",{children:"We do not sell your data. We do not use it for advertising. We do not share it with third parties beyond the infrastructure providers needed to run the app (Supabase for the database and auth, Netlify for hosting)."}),a.jsx("h2",{children:"Children"}),a.jsx("p",{children:"Hockey Shot Challenge is used by players of all ages, including children under 13. We collect only the minimum data needed to run the app. Parents who sign up on behalf of their child control the account and can delete it at any time from Settings → Delete account."}),a.jsx("h2",{children:"Your rights"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"View your data:"})," All your data is visible inside the app."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Delete your account:"})," Go to Settings (the More tab) → Delete account. This permanently removes all your shots, streak, rank, and player card. It cannot be undone."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Data portability:"})," Contact us and we'll send you a copy of your data."]})]}),a.jsx("h2",{children:"Data retention"}),a.jsx("p",{children:"Your data is kept as long as your account is active. When you delete your account, all associated shot logs, drill logs, achievements, and your player profile are permanently deleted."}),a.jsx("h2",{children:"Third-party services"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"Supabase"})," — database, authentication, and file storage. ",a.jsx("a",{href:"https://supabase.com/privacy",target:"_blank",rel:"noopener noreferrer",children:"Privacy policy ↗"})]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Netlify"})," — web hosting. ",a.jsx("a",{href:"https://www.netlify.com/privacy/",target:"_blank",rel:"noopener noreferrer",children:"Privacy policy ↗"})]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Google Sign-In"})," — authentication only. We request your name and email address. ",a.jsx("a",{href:"https://policies.google.com/privacy",target:"_blank",rel:"noopener noreferrer",children:"Privacy policy ↗"})]})]}),a.jsx("h2",{children:"Contact"}),a.jsxs("p",{children:["Questions or requests? Email us at ",a.jsx("a",{href:"mailto:hello@hockeyshotchallenge.com",children:"hello@hockeyshotchallenge.com"}),"."]})]}),a.jsx("style",{children:$1})]})}const $1=`
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
`;function tm(){return a.jsxs("section",{className:"ls-mockup-wrap",children:[a.jsxs("div",{className:"ls-mockup-inner",children:[a.jsx("div",{className:"ls-eyebrow",children:"INSIDE THE APP"}),a.jsx("h2",{className:"ls-section-title",children:"Built to be opened, tapped, and closed in 10 seconds."}),a.jsx("p",{className:"ls-section-sub",children:"No fluff. No social feed. Just your numbers, your team, and who you're chasing today."}),a.jsxs("div",{className:"ls-phone",children:[a.jsxs("div",{className:"ls-phone-header",children:[a.jsx("div",{className:"ls-avatar",children:"C"}),a.jsxs("div",{className:"ls-player-info",children:[a.jsx("div",{className:"ls-player-name",children:"Connor"}),a.jsx("div",{className:"ls-player-meta",children:"Prospect II · 1,240 shots"})]}),a.jsx("div",{className:"ls-streak-badge",children:"🔥 12"})]}),a.jsxs("div",{className:"ls-shot-grid",children:[a.jsxs("div",{className:"ls-shot-cell",children:[a.jsx("div",{className:"ls-shot-label",children:"WRIST"}),a.jsx("div",{className:"ls-shot-num",children:"85"}),a.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]}),a.jsxs("div",{className:"ls-shot-cell",children:[a.jsx("div",{className:"ls-shot-label",children:"SNAP"}),a.jsx("div",{className:"ls-shot-num",children:"42"}),a.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]}),a.jsxs("div",{className:"ls-shot-cell",children:[a.jsx("div",{className:"ls-shot-label",children:"SLAP"}),a.jsx("div",{className:"ls-shot-num",children:"23"}),a.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]}),a.jsxs("div",{className:"ls-shot-cell",children:[a.jsx("div",{className:"ls-shot-label",children:"BACKHAND"}),a.jsx("div",{className:"ls-shot-num",children:"18"}),a.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]})]}),a.jsxs("div",{className:"ls-stickhandling-section",children:[a.jsx("div",{className:"ls-stickhandling-label",children:"STICKHANDLING"}),a.jsxs("div",{className:"ls-shot-grid ls-shot-grid--2",children:[a.jsxs("div",{className:"ls-shot-cell",children:[a.jsx("div",{className:"ls-shot-label",children:"REPS"}),a.jsx("div",{className:"ls-shot-num ls-shot-num--orange",children:"240"}),a.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]}),a.jsxs("div",{className:"ls-shot-cell",children:[a.jsx("div",{className:"ls-shot-label",children:"MINUTES"}),a.jsx("div",{className:"ls-shot-num ls-shot-num--orange",children:"8"}),a.jsx("div",{className:"ls-shot-sub",children:"TODAY"})]})]})]}),a.jsxs("div",{className:"ls-chasing",children:[a.jsxs("div",{className:"ls-chasing-left",children:[a.jsx("div",{className:"ls-chasing-label",children:"CHASING TODAY"}),a.jsx("div",{className:"ls-chasing-name",children:"Liam K. · 191 today"})]}),a.jsx("div",{className:"ls-chasing-delta",children:"−23"})]})]})]}),a.jsx("style",{children:U1})]})}function rm(){const e=[{day:"MON",task:"100 wrist shots"},{day:"TUE",task:"10 min stickhandling"},{day:"WED",task:"75 snap + 25 backhand"},{day:"THU",task:"10 min stickhandling"},{day:"FRI",task:"100 mixed shots"},{day:"SAT",task:"Rest"},{day:"SUN",task:"Rest"}],t=[{day:"MON",task:"50 wrist shots"},{day:"TUE",task:"Rest / game"},{day:"WED",task:"5 min stickhandling"},{day:"THU",task:"Practice day"},{day:"FRI",task:"50 mixed shots"},{day:"SAT",task:"Game day"},{day:"SUN",task:"Rest"}];return a.jsxs("section",{className:"ls-routine-wrap",children:[a.jsxs("div",{className:"ls-routine-inner",children:[a.jsx("div",{className:"ls-eyebrow",children:"FOLLOW A ROUTINE"}),a.jsx("h2",{className:"ls-section-title",children:"A simple plan for summer and the season."}),a.jsx("p",{className:"ls-section-sub",children:"Big gains happen in the off-season. Then you keep it going through the year. Pick a routine, log your reps, watch yourself climb."}),a.jsxs("div",{className:"ls-routine-grid",children:[a.jsxs("div",{className:"ls-routine-card ls-routine-card--summer",children:[a.jsxs("div",{className:"ls-routine-card-header",children:[a.jsx("span",{className:"ls-routine-dot ls-routine-dot--yellow"}),a.jsx("span",{className:"ls-routine-tag",children:"SUMMER · HEAVY"})]}),a.jsx("div",{className:"ls-routine-title",children:"5 days a week."}),a.jsx("div",{className:"ls-routine-sub",children:"Build the engine. This is when you get fast."}),a.jsx("div",{className:"ls-day-list",children:e.map(({day:r,task:n})=>a.jsxs("div",{className:"ls-day-row",children:[a.jsx("span",{className:"ls-day-label",children:r}),a.jsx("span",{className:"ls-day-task",children:n})]},r))})]}),a.jsxs("div",{className:"ls-routine-card ls-routine-card--season",children:[a.jsxs("div",{className:"ls-routine-card-header",children:[a.jsx("span",{className:"ls-routine-dot ls-routine-dot--blue"}),a.jsx("span",{className:"ls-routine-tag",children:"IN-SEASON · LIGHTER"})]}),a.jsx("div",{className:"ls-routine-title",children:"3 days a week."}),a.jsx("div",{className:"ls-routine-sub",children:"Keep what you built. Stay sharp around games."}),a.jsx("div",{className:"ls-day-list",children:t.map(({day:r,task:n})=>a.jsxs("div",{className:"ls-day-row",children:[a.jsx("span",{className:"ls-day-label",children:r}),a.jsx("span",{className:"ls-day-task",children:n})]},r))})]})]}),a.jsx("p",{className:"ls-routine-footnote",children:"These are just starting points. You can do more, do less, or build your own. The app tracks whatever you log."})]}),a.jsx("style",{children:D1})]})}const U1=`
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
`,D1=`
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
`;function B1(){const e=we(),[t,r]=v.useState(""),[n,s]=v.useState([]),[i,o]=v.useState(!1),[l,c]=v.useState(null),d=v.useRef(null);v.useEffect(()=>{if(d.current&&clearTimeout(d.current),!t.trim()||t.trim().length<2){s([]),o(!1);return}return o(!0),d.current=setTimeout(async()=>{try{const u=await Vr(t,5);s(u||[])}catch{s([])}finally{o(!1)}},200),()=>{d.current&&clearTimeout(d.current)}},[t]);const h=()=>{e(l?`/start?club=${l.slug}`:"/start")};return v.useEffect(()=>{ze({title:"Hockey Shot Tracker for Kids — Log Shots & Earn Ranks",description:"Free off-ice hockey practice tracker for kids ages 6–18. Log shots and stickhandling every day, earn ranks from Rookie to Legend, and compete in weekly 1v1 battles.",url:`${ee}/player`}),Gr([{"@context":"https://schema.org","@type":"WebApplication",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com",applicationCategory:"SportsApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"CAD"},description:"Free off-ice hockey practice tracker for kids. Log shots and stickhandling reps, earn ranks, and compete in weekly 1v1 battles.",audience:{"@type":"Audience",audienceType:"Hockey players ages 6–18 and their parents"}},{"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"Is Hockey Shot Challenge free for players?",acceptedAnswer:{"@type":"Answer",text:"Yes. Hockey Shot Challenge is completely free for players and parents. No subscription, no app to download, no hidden fees."}},{"@type":"Question",name:"What age is Hockey Shot Challenge for?",acceptedAnswer:{"@type":"Answer",text:"Hockey Shot Challenge is designed for hockey players ages 6–18. Parents sign in with their Google account and set up their child's profile."}},{"@type":"Question",name:"What do kids track on Hockey Shot Challenge?",acceptedAnswer:{"@type":"Answer",text:"Kids log wrist shots, snap shots, slap shots, backhand shots, and stickhandling reps (toe drags, figure eights, lateral moves). Sessions take 5 seconds to log."}}]}])},[]),a.jsxs("div",{className:"pl-wrap",children:[a.jsxs("nav",{className:"pl-nav",children:[a.jsx("button",{className:"pl-back",onClick:()=>e("/"),children:"← Back"}),a.jsx("button",{className:"pl-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),a.jsxs("section",{className:"pl-hero",children:[a.jsx("div",{className:"pl-eyebrow",children:"FREE · SIGN IN WITH GOOGLE · AGES 6–18"}),a.jsxs("h1",{className:"pl-title",children:["Log your shots.",a.jsx("br",{}),"Beat your teammates."]}),a.jsx("p",{className:"pl-sub",children:"Every day, log how many shots and stickhandling reps you did at home. Watch your rank climb. Compete against other teams every week."}),a.jsxs("div",{className:"pl-club-search",children:[a.jsx("div",{className:"pl-club-search-label",children:"Find your club first (optional)"}),l?a.jsxs("div",{className:"pl-club-selected",children:[a.jsx("span",{className:"pl-club-selected-name",children:l.name}),l.city&&a.jsx("span",{className:"pl-club-selected-city",children:l.city}),a.jsx("button",{className:"pl-club-change",onClick:()=>{c(null),r("")},children:"Change"})]}):a.jsxs("div",{style:{position:"relative"},children:[a.jsx("input",{type:"text",className:"pl-club-input",placeholder:"Burlington Eagles, Mississauga…",value:t,onChange:u=>r(u.target.value),autoComplete:"off",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false"}),t.trim().length>=2&&a.jsxs("div",{className:"pl-club-dropdown",children:[i&&a.jsx("div",{className:"pl-club-status",children:"Searching…"}),!i&&n.length===0&&a.jsx("div",{className:"pl-club-status",children:"No clubs found — you can still sign up."}),n.map(u=>a.jsxs("button",{className:"pl-club-result",onClick:()=>{c(u),r(""),s([])},children:[a.jsx("span",{className:"pl-club-result-name",children:u.name}),u.city&&a.jsx("span",{className:"pl-club-result-meta",children:u.city})]},u.id))]})]})]}),a.jsx("button",{className:"pl-cta",onClick:h,children:l?`Start with ${l.name} →`:"Start for free — takes 30 seconds →"}),a.jsx("p",{className:"pl-cta-hint",children:"Sign in with your Google account. No credit card. Just hockey."})]}),a.jsxs("section",{className:"pl-steps",children:[a.jsx("h2",{className:"pl-section-title",children:"Here's how it works"}),a.jsxs("div",{className:"pl-step-list",children:[a.jsxs("div",{className:"pl-step",children:[a.jsx("div",{className:"pl-step-num",children:"1"}),a.jsxs("div",{className:"pl-step-body",children:[a.jsx("div",{className:"pl-step-title",children:"Sign up in 30 seconds"}),a.jsx("div",{className:"pl-step-text",children:"Sign in with Google. Pick your team. Create your screen name. Done."})]})]}),a.jsxs("div",{className:"pl-step",children:[a.jsx("div",{className:"pl-step-num",children:"2"}),a.jsxs("div",{className:"pl-step-body",children:[a.jsx("div",{className:"pl-step-title",children:"Log shots and stickhandling every day"}),a.jsx("div",{className:"pl-step-text",children:"Tap a shot type or stickhandling drill. Enter how many. Takes 5 seconds. The more you log, the higher you climb."})]})]}),a.jsxs("div",{className:"pl-step",children:[a.jsx("div",{className:"pl-step-num",children:"3"}),a.jsxs("div",{className:"pl-step-body",children:[a.jsx("div",{className:"pl-step-title",children:"Compete every week"}),a.jsx("div",{className:"pl-step-text",children:"Every Monday, you get matched against one player from another team. Most reps by Sunday wins. New rival every week."})]})]})]})]}),a.jsx(tm,{}),a.jsx(rm,{}),a.jsx("section",{className:"pl-videos",children:a.jsxs("div",{className:"pl-videos-inner",children:[a.jsx("div",{className:"pl-eyebrow",children:"SKILL VIDEOS"}),a.jsx("h2",{className:"pl-section-title pl-section-title--left",children:"Watch a drill. Then go do it."}),a.jsx("p",{className:"pl-section-sub pl-section-sub--left",children:"The app includes curated YouTube videos for every shot type and stickhandling skill — wrist shots, snap shots, toe drags, figure eights, and more. Pick a drill, watch it once, then log your reps."}),a.jsx("div",{className:"pl-video-types",children:["Wrist shots","Snap shots","Slap shots","Backhand shots","Toe drags","Figure eights","Lateral moves","One-hand drills"].map(u=>a.jsx("div",{className:"pl-video-tag",children:u},u))})]})}),a.jsxs("section",{className:"pl-what",children:[a.jsx("h2",{className:"pl-section-title",children:"What you track"}),a.jsxs("div",{className:"pl-what-grid",children:[a.jsxs("div",{className:"pl-what-card",children:[a.jsx("div",{className:"pl-what-icon",children:"🥅"}),a.jsx("div",{className:"pl-what-title",children:"Shots"}),a.jsx("div",{className:"pl-what-text",children:"Wrist, snap, slap, and backhand shots. Goalies track saves. Tap and log — takes 3 seconds."})]}),a.jsxs("div",{className:"pl-what-card",children:[a.jsx("div",{className:"pl-what-icon",children:"🏒"}),a.jsx("div",{className:"pl-what-title",children:"Stickhandling"}),a.jsx("div",{className:"pl-what-text",children:"Toe drags, figure eights, lateral moves, one-hand. Every rep counts."})]}),a.jsxs("div",{className:"pl-what-card",children:[a.jsx("div",{className:"pl-what-icon",children:"🔥"}),a.jsx("div",{className:"pl-what-title",children:"Streaks"}),a.jsx("div",{className:"pl-what-text",children:"Log every day and build your streak. Miss a day and it resets. Simple."})]}),a.jsxs("div",{className:"pl-what-card",children:[a.jsx("div",{className:"pl-what-icon",children:"🏅"}),a.jsx("div",{className:"pl-what-title",children:"Ranks"}),a.jsx("div",{className:"pl-what-text",children:"Start at Rookie. Work your way up to Pro, Elite, and Legend. Your rank shows on your player card."})]})]})]}),a.jsx("section",{className:"pl-parent",children:a.jsxs("div",{className:"pl-parent-inner",children:[a.jsx("div",{className:"pl-parent-badge",children:"FOR PARENTS"}),a.jsx("h2",{className:"pl-parent-title",children:"Signing up your kid?"}),a.jsxs("ul",{className:"pl-parent-list",children:[a.jsx("li",{children:"You sign in with your Google account — your kid never needs a password"}),a.jsx("li",{children:"You can add multiple kids to one account and switch between them"}),a.jsx("li",{children:"You can see your kid's shot count and rank any time"}),a.jsx("li",{children:"Free. No subscription. No hidden fees."})]}),a.jsx("button",{className:"pl-cta",onClick:()=>e("/start"),children:"Sign up for my player →"}),a.jsxs("p",{className:"pl-cta-hint",style:{marginTop:20},children:["New to this? Read our"," ",a.jsx("button",{className:"pl-inline-link",onClick:()=>e("/blog/getting-started"),children:"5-step parent guide →"})]})]})}),a.jsx("style",{children:`
        .pl-inline-link {
          background: transparent; color: #60a5fa;
          font-size: inherit; font-family: inherit;
          text-decoration: underline; text-underline-offset: 3px;
          cursor: pointer; padding: 0;
        }
        .pl-inline-link:hover { color: white; }
      `}),a.jsx("style",{children:M1})]})}const M1=`
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
`;function F1(){const e=we();return v.useEffect(()=>{ze({title:"Hockey Coaching Dashboard — Track Player Off-Ice Training Free",description:"Free hockey coaching tool. See which players are logging shots at home, track streaks and ranks, see weekly 1v1 battle results, and motivate your team — no app required.",url:`${ee}/coach`}),Gr({"@context":"https://schema.org","@type":"WebApplication",name:"Hockey Shot Challenge — Coach Dashboard",url:"https://hockeyshotchallenge.com/coach",applicationCategory:"SportsApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"CAD"},description:"Free hockey coaching dashboard. Track which players log shots and stickhandling at home, see weekly activity, see 1v1 battle results, and motivate your team.",audience:{"@type":"Audience",audienceType:"Hockey coaches and club managers"}})},[]),a.jsxs("div",{className:"cl-wrap",children:[a.jsxs("nav",{className:"cl-nav",children:[a.jsx("button",{className:"cl-back",onClick:()=>e("/"),children:"← Back"}),a.jsx("button",{className:"cl-nav-cta",onClick:()=>e("/coach/start"),children:"Set up my team →"})]}),a.jsxs("section",{className:"cl-hero",children:[a.jsx("div",{className:"cl-eyebrow",children:"FREE FOR COACHES · SIGN IN WITH GOOGLE"}),a.jsx("h1",{className:"cl-title",children:"See which players are putting in the work."}),a.jsx("p",{className:"cl-sub",children:"Your players log shots and stickhandling reps every day. You see who's showing up. Free for your whole team — no app store, no subscriptions."}),a.jsx("button",{className:"cl-cta",onClick:()=>e("/coach/start"),children:"Set up my team — it's free →"}),a.jsx("p",{className:"cl-cta-hint",children:"Takes 2 minutes. Sign in with Google."})]}),a.jsx("section",{className:"cl-features",children:a.jsxs("div",{className:"cl-features-inner",children:[a.jsxs("div",{className:"cl-feature",children:[a.jsx("div",{className:"cl-feature-icon",children:"📊"}),a.jsxs("div",{className:"cl-feature-body",children:[a.jsx("div",{className:"cl-feature-title",children:"Activity feed"}),a.jsx("div",{className:"cl-feature-text",children:"See every rep your players logged this week. Filter by player or shot type. Know who's putting in the work before practice."})]})]}),a.jsxs("div",{className:"cl-feature",children:[a.jsx("div",{className:"cl-feature-icon",children:"🏆"}),a.jsxs("div",{className:"cl-feature-body",children:[a.jsx("div",{className:"cl-feature-title",children:"Weekly 1v1 battles"}),a.jsx("div",{className:"cl-feature-text",children:"Every Monday, each player gets matched 1v1 against a player from another team. Most shots by Sunday wins. You can see every result."})]})]}),a.jsxs("div",{className:"cl-feature",children:[a.jsx("div",{className:"cl-feature-icon",children:"🎬"}),a.jsxs("div",{className:"cl-feature-body",children:[a.jsx("div",{className:"cl-feature-title",children:"Skill videos"}),a.jsx("div",{className:"cl-feature-text",children:"The app includes curated drill videos for every shot type and stickhandling skill. Your players can watch a drill and log it right after."})]})]}),a.jsxs("div",{className:"cl-feature",children:[a.jsx("div",{className:"cl-feature-icon",children:"📈"}),a.jsxs("div",{className:"cl-feature-body",children:[a.jsx("div",{className:"cl-feature-title",children:"Player progress"}),a.jsx("div",{className:"cl-feature-text",children:"Track lifetime shots, current rank, and day streaks for every player on your team. See who's building the habit."})]})]})]})}),a.jsx("section",{className:"cl-dashboard-preview",children:a.jsxs("div",{className:"cl-dashboard-inner",children:[a.jsx("div",{className:"cl-eyebrow",children:"THE COACH DASHBOARD"}),a.jsx("h2",{className:"cl-section-title",children:"Your whole team. One screen."}),a.jsx("p",{className:"cl-section-sub",children:"See every player, their shot count this week, their rank, and their streak — all in one place. No spreadsheets. No chasing kids for updates."}),a.jsxs("div",{className:"cl-dash-mock",children:[a.jsxs("div",{className:"cl-dash-header",children:[a.jsx("div",{className:"cl-dash-team",children:"Peewee AA · Burlington"}),a.jsx("div",{className:"cl-dash-week",children:"This week"})]}),a.jsx("div",{className:"cl-dash-players",children:[{name:"Olivia M.",rank:"Prospect II",shots:168,streak:12,active:!0},{name:"Liam K.",rank:"Prospect I",shots:191,streak:8,active:!0},{name:"Jake T.",rank:"Rookie III",shots:84,streak:3,active:!1},{name:"Owen S.",rank:"Rookie II",shots:42,streak:1,active:!1}].map(t=>a.jsxs("div",{className:`cl-dash-row ${t.active?"cl-dash-row--active":""}`,children:[a.jsxs("div",{className:"cl-dash-player-info",children:[a.jsx("div",{className:"cl-dash-player-name",children:t.name}),a.jsx("div",{className:"cl-dash-player-rank",children:t.rank})]}),a.jsxs("div",{className:"cl-dash-player-stats",children:[a.jsxs("div",{className:"cl-dash-stat",children:[a.jsx("span",{className:"cl-dash-stat-num",children:t.shots}),a.jsx("span",{className:"cl-dash-stat-label",children:"shots"})]}),a.jsx("div",{className:"cl-dash-stat",children:a.jsxs("span",{className:"cl-dash-stat-num cl-dash-stat-num--fire",children:["🔥 ",t.streak]})})]})]},t.name))})]})]})}),a.jsx(tm,{}),a.jsx(rm,{}),a.jsx("section",{className:"cl-videos",children:a.jsxs("div",{className:"cl-videos-inner",children:[a.jsx("div",{className:"cl-eyebrow",children:"SKILL VIDEOS"}),a.jsx("h2",{className:"cl-section-title",children:"Drills your players can watch and do."}),a.jsx("p",{className:"cl-section-sub",children:"Every shot type and stickhandling skill has curated YouTube drills built right in. Players pick a drill, watch it, then log their reps. You see everything."}),a.jsx("div",{className:"cl-video-tags",children:["Wrist shots","Snap shots","Slap shots","Backhand shots","Toe drags","Figure eights","Lateral moves","One-hand drills"].map(t=>a.jsx("div",{className:"cl-video-tag",children:t},t))})]})}),a.jsx("section",{className:"cl-free",children:a.jsxs("div",{className:"cl-free-inner",children:[a.jsx("div",{className:"cl-eyebrow",children:"PRICING"}),a.jsx("h2",{className:"cl-section-title",children:"Free. For everyone."}),a.jsxs("ul",{className:"cl-free-list",children:[a.jsx("li",{children:"Free for coaches"}),a.jsx("li",{children:"Free for players"}),a.jsx("li",{children:"No app store required — runs in any browser"}),a.jsx("li",{children:"No subscription, no hidden fees"})]}),a.jsx("button",{className:"cl-cta",onClick:()=>e("/coach/start"),children:"Set up my team →"}),a.jsx("p",{className:"cl-cta-hint",children:"Sign in with Google. Takes 2 minutes."}),a.jsxs("p",{style:{marginTop:20,fontSize:14,color:"#4a6080"},children:["Managing a full association?"," ",a.jsx("button",{className:"cl-assoc-link",onClick:()=>e("/for-clubs"),children:"See club & association tools →"})]})]})}),a.jsx("style",{children:H1+`
        .cl-assoc-link {
          background: transparent; color: #60a5fa;
          font-size: inherit; font-family: inherit;
          text-decoration: underline; text-underline-offset: 3px;
          cursor: pointer; padding: 0;
        }
        .cl-assoc-link:hover { color: white; }
      `})]})}const H1=`
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
`,W1=[{slug:"getting-started",title:"How to Get Your Kid Started on Hockey Shot Challenge (It Takes 5 Minutes)",description:"A step-by-step guide for parents. Sign in with Google, set up your player, find their team, and log the first session.",date:"July 2026"},{slug:"how-squad-battles-work",title:"What Happens Every Week on Hockey Shot Challenge",description:"1v1 battles, daily logging, ranks, streaks, and what coaches can see. Here's how a full week looks.",date:"July 2026"}];function q1(){const e=we();return v.useEffect(()=>{ze({title:"Blog — Hockey Shot Challenge",description:"Tips and guides for parents, players, and coaches using Hockey Shot Challenge. Learn how to get started and make the most of off-ice training.",url:`${ee}/blog`})},[]),a.jsxs("div",{className:"blog-wrap",children:[a.jsxs("nav",{className:"blog-nav",children:[a.jsx("button",{className:"blog-back",onClick:()=>e("/"),children:"← Home"}),a.jsx("button",{className:"blog-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),a.jsxs("header",{className:"blog-header",children:[a.jsx("div",{className:"blog-eyebrow",children:"GUIDES & TIPS"}),a.jsx("h1",{className:"blog-index-title",children:"For parents, players & coaches."}),a.jsx("p",{className:"blog-index-sub",children:"Short guides to get the most out of Hockey Shot Challenge."})]}),a.jsx("div",{className:"blog-list",children:W1.map(t=>a.jsxs("button",{className:"blog-card",onClick:()=>e(`/blog/${t.slug}`),children:[a.jsx("div",{className:"blog-card-date",children:t.date}),a.jsx("h2",{className:"blog-card-title",children:t.title}),a.jsx("p",{className:"blog-card-desc",children:t.description}),a.jsx("span",{className:"blog-card-read",children:"Read →"})]},t.slug))}),a.jsxs("footer",{className:"blog-footer",children:[a.jsx("button",{className:"blog-foot-link",onClick:()=>e("/"),children:"← Home"}),a.jsx("button",{className:"blog-foot-cta",onClick:()=>e("/start"),children:"Start free — it's 2 minutes →"})]}),a.jsx("style",{children:G1})]})}const G1=`
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
`;function V1(){const e=we();return v.useEffect(()=>{ze({title:"How to Get Your Kid Started on Hockey Shot Challenge",description:"A step-by-step guide for hockey parents. Sign in with Google, set up your player profile, find their team, and log the first session. Takes 5 minutes.",url:`${ee}/blog/getting-started`,type:"article"}),Gr([{"@context":"https://schema.org","@type":"Article",headline:"How to Get Your Kid Started on Hockey Shot Challenge",description:"A step-by-step guide for hockey parents. Sign in with Google, set up your player profile, find their team, and log the first session. Takes 5 minutes.",datePublished:"2026-07-01",dateModified:"2026-07-01",author:{"@type":"Organization",name:"Hockey Shot Challenge"},publisher:{"@type":"Organization",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com"},url:`${ee}/blog/getting-started`,mainEntityOfPage:`${ee}/blog/getting-started`,articleSection:"Getting Started",keywords:"hockey practice tracker, off-ice hockey training, hockey for kids, hockey shot log"},{"@context":"https://schema.org","@type":"HowTo",name:"How to Get Your Kid Started on Hockey Shot Challenge",description:"Sign up and start logging shots in 5 minutes.",totalTime:"PT5M",step:[{"@type":"HowToStep",name:"Go to hockeyshotchallenge.com",text:"Open the site in any browser on your phone. No app to download."},{"@type":"HowToStep",name:"Sign in with your Google account",text:"Use your Gmail to sign in. You are the account holder — kids never need passwords."},{"@type":"HowToStep",name:"Set up your player's profile",text:"Pick a username, enter your child's age group. Takes about two minutes."},{"@type":"HowToStep",name:"Find their team",text:"Search for their club and join. Your kid appears on the team leaderboard right away."},{"@type":"HowToStep",name:"Log the first session",text:"After practice, open the app, tap Log shots, pick a shot type, enter the count, and save."}]},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://hockeyshotchallenge.com"},{"@type":"ListItem",position:2,name:"Guides",item:`${ee}/blog`},{"@type":"ListItem",position:3,name:"Getting Started",item:`${ee}/blog/getting-started`}]}])},[]),a.jsxs("div",{className:"post-wrap",children:[a.jsxs("nav",{className:"post-nav",children:[a.jsx("button",{className:"post-back",onClick:()=>e("/blog"),children:"← All guides"}),a.jsx("button",{className:"post-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),a.jsxs("article",{className:"post-article",children:[a.jsxs("header",{className:"post-header",children:[a.jsx("div",{className:"post-eyebrow",children:"GETTING STARTED · FOR PARENTS"}),a.jsx("h1",{className:"post-title",children:"How to Get Your Kid Started on Hockey Shot Challenge"}),a.jsx("p",{className:"post-subtitle",children:"(It Takes 5 Minutes)"}),a.jsx("p",{className:"post-date",children:"July 2026"})]}),a.jsxs("div",{className:"post-body",children:[a.jsx("p",{children:`If your son or daughter plays hockey, you've probably heard the advice a hundred times: "They need to work on their shot at home."`}),a.jsx("p",{children:"But actually getting them to do it? That's the hard part."}),a.jsx("p",{children:"Hockey Shot Challenge is a free tool that makes it easier. Kids log their shots and stickhandling reps from home — the driveway, the basement, wherever they practice — and they compete with their teammates on a weekly leaderboard. When there's a scoreboard involved, kids actually want to show up."}),a.jsx("p",{children:"Here's how to get started."}),a.jsx("h2",{children:"Step 1: Go to hockeyshotchallenge.com"}),a.jsx("p",{children:"No app to download. It works right in your phone's browser. Bookmark it so your kid can find it easily."}),a.jsx("h2",{children:"Step 2: Sign in with your Google account"}),a.jsx("p",{children:"You use your Gmail to sign in — not your kid's. You're the account holder, and you can add all your kids under one login. No passwords for kids to remember."}),a.jsx("h2",{children:"Step 3: Set up your player's profile"}),a.jsx("p",{children:"Pick a username, enter your child's age group, and you're in. Takes about two minutes. The username shows up on leaderboards, so let your kid choose it."}),a.jsx("h2",{children:"Step 4: Find their team (if their coach is on here)"}),a.jsxs("p",{children:["If their coach has already set up a team, search for it and join. Your kid will show up on the team leaderboard right away. Not sure if their coach is on it? Ask — or have your coach visit ",a.jsx("button",{className:"post-inline-link",onClick:()=>e("/coach"),children:"the coach page"})," to get set up for free."]}),a.jsx("h2",{children:"Step 5: Log the first session"}),a.jsx("p",{children:'After your kid does some shots in the driveway, open the app and tap "Log shots." Pick the shot type (wrist, snap, slap, backhand), enter the number, and hit save. Done. Three seconds.'}),a.jsxs("div",{className:"post-callout",children:[a.jsx("div",{className:"post-callout-title",children:"That's it."}),a.jsx("p",{children:"From now on, every time they practice, log it. Watch them climb the rankings."})]}),a.jsx("h2",{children:"Tips that help"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"Make it a habit right after practice."})," Log it while you're still outside. Takes 5 seconds."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Let them see the leaderboard."})," Kids care a lot more when they can see exactly where they rank."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Don't skip small sessions."})," Even 20 shots logged beats 0. Streaks are built on consistency, not big numbers."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"Multiple kids?"})," Add them all under your account. Switch between players from the menu."]})]}),a.jsxs("div",{className:"post-cta-block",children:[a.jsx("p",{children:"Ready to get started? It's free and takes less than 5 minutes."}),a.jsx("button",{className:"post-cta",onClick:()=>e("/start"),children:"Sign in with Google →"}),a.jsxs("p",{className:"post-cta-hint",children:["Also read: ",a.jsx("button",{className:"post-inline-link",onClick:()=>e("/blog/how-squad-battles-work"),children:"What happens every week on Hockey Shot Challenge →"})]})]})]})]}),a.jsxs("footer",{className:"post-footer",children:[a.jsx("button",{className:"post-foot-link",onClick:()=>e("/blog"),children:"← All guides"}),a.jsx("button",{className:"post-foot-link",onClick:()=>e("/"),children:"Home"})]}),a.jsx("style",{children:K1})]})}const K1=`
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
`;function Y1(){const e=we();return v.useEffect(()=>{ze({title:"How Hockey 1v1 Weekly Battles Work — Off-Ice Competition for Kids",description:"1v1 weekly battles, daily logging, ranks, streaks, and what coaches can see. Here's exactly how a full week looks on Hockey Shot Challenge.",url:`${ee}/blog/how-squad-battles-work`,type:"article"}),Gr([{"@context":"https://schema.org","@type":"Article",headline:"How Hockey 1v1 Weekly Battles Work — Off-Ice Competition for Kids",description:"1v1 weekly battles, daily logging, ranks, streaks, and what coaches can see on Hockey Shot Challenge.",datePublished:"2026-07-01",dateModified:"2026-07-03",author:{"@type":"Organization",name:"Hockey Shot Challenge"},publisher:{"@type":"Organization",name:"Hockey Shot Challenge",url:"https://hockeyshotchallenge.com"},url:`${ee}/blog/how-squad-battles-work`,mainEntityOfPage:`${ee}/blog/how-squad-battles-work`,articleSection:"How It Works",keywords:"hockey 1v1 battle, hockey weekly competition kids, off-ice hockey leaderboard, hockey shot tracker weekly"},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://hockeyshotchallenge.com"},{"@type":"ListItem",position:2,name:"Guides",item:`${ee}/blog`},{"@type":"ListItem",position:3,name:"How Weekly Battles Work",item:`${ee}/blog/how-squad-battles-work`}]}])},[]),a.jsxs("div",{className:"post-wrap",children:[a.jsxs("nav",{className:"post-nav",children:[a.jsx("button",{className:"post-back",onClick:()=>e("/blog"),children:"← All guides"}),a.jsx("button",{className:"post-nav-cta",onClick:()=>e("/start"),children:"Start free →"})]}),a.jsxs("article",{className:"post-article",children:[a.jsxs("header",{className:"post-header",children:[a.jsx("div",{className:"post-eyebrow",children:"HOW IT WORKS · WEEKLY BATTLES"}),a.jsx("h1",{className:"post-title",children:"What Happens Every Week on Hockey Shot Challenge"}),a.jsx("p",{className:"post-date",children:"July 2026"})]}),a.jsxs("div",{className:"post-body",children:[a.jsx("p",{children:"Once your kid is set up, the app runs on a weekly rhythm. Here's exactly what a week looks like — from Monday to Sunday."}),a.jsx("h2",{children:"Monday: A new 1v1 battle starts"}),a.jsx("p",{children:"Every Monday, your child gets matched against one player from another team. One rival. One week. The goal: log more shots than them by Sunday."}),a.jsx("p",{children:"Kids can see exactly where they stand — their shot count vs. the rival's, updated live as both players log. It creates real pressure in the best way. When your kid sees they're behind, they want to go outside and shoot. When they're ahead, they want to extend the lead."}),a.jsx("h2",{children:"Every day: Log reps in 5 seconds"}),a.jsx("p",{children:"After a practice session at home, open the app and log what they did. Shots, stickhandling, or both. Tap a shot type, enter the number, hit save. The number goes up, the leaderboard updates, and their squad can see the contribution."}),a.jsx("p",{children:"It doesn't have to be a long session. Even 20 shots logged is better than nothing — and keeps the streak alive."}),a.jsx("h2",{children:"Sunday: The battle ends"}),a.jsx("p",{children:"Whichever squad logged more shots wins. Then Monday it resets and a new battle starts with a new rival. Every week is a fresh start."}),a.jsxs("div",{className:"post-callout",children:[a.jsx("div",{className:"post-callout-title",children:"Why this works"}),a.jsx("p",{children:"Kids don't practice because you tell them to. They practice because their name is on a scoreboard and there's one specific person they want to beat. That's the whole idea."})]}),a.jsx("h2",{children:"Ranks and streaks"}),a.jsx("p",{children:"As your kid logs more sessions, they earn ranks — starting at Rookie and working up through Prospect, Regional, Provincial, and beyond. Each rank has a shot requirement and a name your kid can show off."}),a.jsx("p",{children:"There's also a streak counter that tracks how many days in a row they've logged. Kids get surprisingly attached to keeping the streak alive. Missing a day feels real when it's visible."}),a.jsx("h2",{children:"What coaches can see"}),a.jsx("p",{children:"If your child's coach is on the platform, they can see the whole team's weekly activity — who logged, how many shots, who's been consistent all month. It's a great conversation starter before practice and it lets coaches recognize the players who are quietly putting in work at home."}),a.jsx("p",{children:"Coaches can see every 1v1 battle result for their players — who won, who lost, by how much. All without any extra work on your part — just keep logging."}),a.jsx("h2",{children:"What you track"}),a.jsxs("p",{children:[a.jsx("strong",{children:"Shots"})," — wrist shots, snap shots, slap shots, backhands. Goalies can track saves. Tap a type, tap a number, done."]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Stickhandling"})," — log reps or minutes. Great for basement practice when shooting isn't an option."]}),a.jsxs("div",{className:"post-cta-block",children:[a.jsx("p",{children:"Not signed up yet? It's free and takes less than 5 minutes."}),a.jsx("button",{className:"post-cta",onClick:()=>e("/player"),children:"Get started — it's free →"}),a.jsxs("p",{className:"post-cta-hint",children:["Also read: ",a.jsx("button",{className:"post-inline-link",onClick:()=>e("/blog/getting-started"),children:"How to get your kid set up →"})]})]})]})]}),a.jsxs("footer",{className:"post-footer",children:[a.jsx("button",{className:"post-foot-link",onClick:()=>e("/blog"),children:"← All guides"}),a.jsx("button",{className:"post-foot-link",onClick:()=>e("/"),children:"Home"})]}),a.jsx("style",{children:J1})]})}const J1=`
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
`;function nm(){return a.jsx("div",{style:{minHeight:"100dvh",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)"},children:a.jsx("div",{style:{fontFamily:"var(--font-display)",color:"var(--text-mute)",letterSpacing:2,fontSize:12},children:"LOADING…"})})}function tn({children:e}){const{player:t,loading:r}=It();return r?a.jsx(nm,{}):t?e:a.jsx(ya,{to:"/start",replace:!0})}function Q1(){const{player:e,loading:t}=It();return t?a.jsx(nm,{}):e?a.jsx(ya,{to:"/home",replace:!0}):a.jsx(pw,{})}function X1(){const e=_r(),t=we(),{player:r}=It();if(!["/home","/videos","/card","/rank","/more"].includes(e.pathname)||!r)return null;const s=[{path:"/home",label:"Home",icon:a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:a.jsx("path",{d:"M10 2 L3 8 V17 H8 V12 H12 V17 H17 V8 Z",fill:"currentColor"})})},{path:"/videos",label:"Videos",icon:a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:[a.jsx("rect",{x:"2",y:"4",width:"16",height:"12",rx:"2",fill:"currentColor"}),a.jsx("path",{d:"M8 9 L14 12 L8 15 Z",fill:"var(--bg)"})]})},{path:"/card",label:"Card",icon:a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:a.jsx("rect",{x:"3",y:"4",width:"14",height:"12",rx:"2",fill:"currentColor"})})},{path:"/rank",label:"Rank",icon:a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:[a.jsx("rect",{x:"3",y:"10",width:"3",height:"7",fill:"currentColor"}),a.jsx("rect",{x:"8.5",y:"6",width:"3",height:"11",fill:"currentColor"}),a.jsx("rect",{x:"14",y:"3",width:"3",height:"14",fill:"currentColor"})]})},{path:"/more",label:"More",icon:a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:[a.jsx("circle",{cx:"5",cy:"10",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"10",cy:"10",r:"1.5",fill:"currentColor"}),a.jsx("circle",{cx:"15",cy:"10",r:"1.5",fill:"currentColor"})]})}];return a.jsxs("nav",{className:"bottom-nav","aria-label":"Main navigation",children:[s.map(i=>a.jsxs("button",{className:`nav-btn ${e.pathname===i.path?"nav-btn--active":""}`,onClick:()=>t(i.path),"aria-label":i.label,"aria-current":e.pathname===i.path?"page":void 0,children:[i.icon,a.jsx("span",{children:i.label})]},i.path)),a.jsx("style",{children:tk})]})}function Z1(){const e=_r(),t=["/home","/videos","/card","/rank","/more"].includes(e.pathname);return a.jsxs("div",{className:t?"app-shell":"full-width",children:[a.jsxs(Cv,{children:[a.jsx(ne,{path:"/",element:a.jsx(Q1,{})}),a.jsx(ne,{path:"/for-clubs",element:a.jsx(xw,{})}),a.jsx(ne,{path:"/clubs",element:a.jsx(bw,{})}),a.jsx(ne,{path:"/clubs/:slug",element:a.jsx(yw,{})}),a.jsx(ne,{path:"/start",element:a.jsx(zw,{})}),a.jsx(ne,{path:"/join/:slug",element:a.jsx(Nw,{})}),a.jsx(ne,{path:"/card/:username",element:a.jsx(_w,{})}),a.jsx(ne,{path:"/rankings",element:a.jsx(Ew,{})}),a.jsx(ne,{path:"/auth",element:a.jsx(ya,{to:"/start",replace:!0})}),a.jsx(ne,{path:"/coach",element:a.jsx(F1,{})}),a.jsx(ne,{path:"/coach/start",element:a.jsx(Uw,{})}),a.jsx(ne,{path:"/coach/dashboard",element:a.jsx(qw,{})}),a.jsx(ne,{path:"/home",element:a.jsx(tn,{children:a.jsx(x1,{})})}),a.jsx(ne,{path:"/videos",element:a.jsx(tn,{children:a.jsx(b1,{})})}),a.jsx(ne,{path:"/card",element:a.jsx(tn,{children:a.jsx(j1,{})})}),a.jsx(ne,{path:"/rank",element:a.jsx(tn,{children:a.jsx(_1,{})})}),a.jsx(ne,{path:"/teams",element:a.jsx(ya,{to:"/rank",replace:!0})}),a.jsx(ne,{path:"/more",element:a.jsx(tn,{children:a.jsx(P1,{})})}),a.jsx(ne,{path:"/add-player",element:a.jsx(tn,{children:a.jsx(O1,{})})}),a.jsx(ne,{path:"/privacy",element:a.jsx(I1,{})}),a.jsx(ne,{path:"/player",element:a.jsx(B1,{})}),a.jsx(ne,{path:"/blog",element:a.jsx(q1,{})}),a.jsx(ne,{path:"/blog/getting-started",element:a.jsx(V1,{})}),a.jsx(ne,{path:"/blog/how-squad-battles-work",element:a.jsx(Y1,{})}),a.jsx(ne,{path:"*",element:a.jsx(ya,{to:"/",replace:!0})})]}),a.jsx(X1,{})]})}function ek(){return a.jsx(Gb,{children:a.jsx(Z1,{})})}const tk=`
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
`;Po.createRoot(document.getElementById("root")).render(a.jsx(uh.StrictMode,{children:a.jsx(Lv,{children:a.jsx(ek,{})})}));
