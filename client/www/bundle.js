var dc=Object.defineProperty;var uc=Object.getOwnPropertyDescriptor;var v=(r,e,o,t)=>{for(var a=t>1?void 0:t?uc(e,o):e,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=(t?s(e,o,a):s(a))||a);return t&&a&&dc(e,o,a),a};var so,wa="fast-kernel";try{if(document.currentScript)so=document.currentScript.getAttribute(wa);else{let r=document.getElementsByTagName("script");so=r[r.length-1].getAttribute(wa)}}catch{so="isolate"}var Be;switch(so){case"share":Be=Object.freeze({updateQueue:1,observable:2,contextEvent:3,elementRegistry:4});break;case"share-v2":Be=Object.freeze({updateQueue:1.2,observable:2.2,contextEvent:3.2,elementRegistry:4.2});break;default:let r=`-${Math.random().toString(36).substring(2,8)}`;Be=Object.freeze({updateQueue:`1.2${r}`,observable:`2.2${r}`,contextEvent:`3.2${r}`,elementRegistry:`4.2${r}`});break}var W=r=>typeof r=="function",j=r=>typeof r=="string",Aa=()=>{};(function(){if(!(typeof globalThis<"u"))if(typeof global<"u")global.globalThis=global;else if(typeof self<"u")self.globalThis=self;else if(typeof window<"u")window.globalThis=window;else{let e=new Function("return this")();e.globalThis=e}})();var La={configurable:!1,enumerable:!1,writable:!1};globalThis.FAST===void 0&&Reflect.defineProperty(globalThis,"FAST",Object.assign({value:Object.create(null)},La));var b=globalThis.FAST;if(b.getById===void 0){let r=Object.create(null);Reflect.defineProperty(b,"getById",Object.assign({value(e,o){let t=r[e];return t===void 0&&(t=o?r[e]=o():null),t}},La))}b.error===void 0&&Object.assign(b,{warn(){},error(r){return new Error(`Error ${r}`)},addMessages(){}});var C=Object.freeze([]);function sr(){let r=new Map;return Object.freeze({register(e){return r.has(e.type)?!1:(r.set(e.type,e),!0)},getByType(e){return r.get(e)},getForInstance(e){if(e!=null)return r.get(e.constructor)}})}function co(){let r=new WeakMap;return function(e){let o=r.get(e);if(o===void 0){let t=Reflect.getPrototypeOf(e);for(;o===void 0&&t!==null;)o=r.get(t),t=Reflect.getPrototypeOf(t);o=o===void 0?[]:o.slice(0),r.set(e,o)}return o}}function se(r){r.prototype.toJSON=Aa}var M=Object.freeze({none:0,attribute:1,booleanAttribute:2,property:3,content:4,tokenList:5,event:6}),Ha=r=>r,gc=globalThis.trustedTypes?globalThis.trustedTypes.createPolicy("fast-html",{createHTML:Ha}):{createHTML:Ha},io=Object.freeze({createHTML(r){return gc.createHTML(r)},protect(r,e,o,t){return t}}),hc=io,Ae=Object.freeze({get policy(){return io},setPolicy(r){if(io!==hc)throw b.error(1201);io=r},setAttribute(r,e,o){o==null?r.removeAttribute(e):r.setAttribute(e,o)},setBooleanAttribute(r,e,o){o?r.setAttribute(e,""):r.removeAttribute(e)}});var be=b.getById(Be.updateQueue,()=>{let r=[],e=[],o=globalThis.requestAnimationFrame,t=!0;function a(){if(e.length)throw e.shift()}function n(d){try{d.call()}catch(c){if(t)e.push(c),setTimeout(a,0);else throw r.length=0,c}}function s(){let c=0;for(;c<r.length;)if(n(r[c]),c++,c>1024){for(let l=0,u=r.length-c;l<u;l++)r[l]=r[l+c];r.length-=c,c=0}r.length=0}function i(d){r.push(d),r.length<2&&(t?o(s):s())}return Object.freeze({enqueue:i,next:()=>new Promise(i),process:s,setMode:d=>t=d})});var Re=class{constructor(e,o){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.subject=e,this.sub1=o}has(e){return this.spillover===void 0?this.sub1===e||this.sub2===e:this.spillover.indexOf(e)!==-1}subscribe(e){let o=this.spillover;if(o===void 0){if(this.has(e))return;if(this.sub1===void 0){this.sub1=e;return}if(this.sub2===void 0){this.sub2=e;return}this.spillover=[this.sub1,this.sub2,e],this.sub1=void 0,this.sub2=void 0}else o.indexOf(e)===-1&&o.push(e)}unsubscribe(e){let o=this.spillover;if(o===void 0)this.sub1===e?this.sub1=void 0:this.sub2===e&&(this.sub2=void 0);else{let t=o.indexOf(e);t!==-1&&o.splice(t,1)}}notify(e){let o=this.spillover,t=this.subject;if(o===void 0){let a=this.sub1,n=this.sub2;a!==void 0&&a.handleChange(t,e),n!==void 0&&n.handleChange(t,e)}else for(let a=0,n=o.length;a<n;++a)o[a].handleChange(t,e)}},cr=class{constructor(e){this.subscribers={},this.subjectSubscribers=null,this.subject=e}notify(e){var o,t;(o=this.subscribers[e])===null||o===void 0||o.notify(e),(t=this.subjectSubscribers)===null||t===void 0||t.notify(e)}subscribe(e,o){var t,a;let n;o?n=(t=this.subscribers[o])!==null&&t!==void 0?t:this.subscribers[o]=new Re(this.subject):n=(a=this.subjectSubscribers)!==null&&a!==void 0?a:this.subjectSubscribers=new Re(this.subject),n.subscribe(e)}unsubscribe(e,o){var t,a;o?(t=this.subscribers[o])===null||t===void 0||t.unsubscribe(e):(a=this.subjectSubscribers)===null||a===void 0||a.unsubscribe(e)}};var ir=Object.freeze({unknown:void 0,coupled:1}),T=b.getById(Be.observable,()=>{let r=be.enqueue,e=/(:|&&|\|\||if|\?\.)/,o=new WeakMap,t,a=c=>{throw b.error(1101)};function n(c){var l;let u=(l=c.$fastController)!==null&&l!==void 0?l:o.get(c);return u===void 0&&(Array.isArray(c)?u=a(c):o.set(c,u=new cr(c))),u}let s=co();class i{constructor(l){this.name=l,this.field=`_${l}`,this.callback=`${l}Changed`}getValue(l){return t!==void 0&&t.watch(l,this.name),l[this.field]}setValue(l,u){let h=this.field,B=l[h];if(B!==u){l[h]=u;let A=l[this.callback];W(A)&&A.call(l,B,u),n(l).notify(this.name)}}}class d extends Re{constructor(l,u,h=!1){super(l,u),this.expression=l,this.isVolatileBinding=h,this.needsRefresh=!0,this.needsQueue=!0,this.isAsync=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}setMode(l){this.isAsync=this.needsQueue=l}bind(l){this.controller=l;let u=this.observe(l.source,l.context);return!l.isBound&&this.requiresUnbind(l)&&l.onUnbind(this),u}requiresUnbind(l){return l.sourceLifetime!==ir.coupled||this.first!==this.last||this.first.propertySource!==l.source}unbind(l){this.dispose()}observe(l,u){this.needsRefresh&&this.last!==null&&this.dispose();let h=t;t=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;let B;try{B=this.expression(l,u)}finally{t=h}return B}disconnect(){this.dispose()}dispose(){if(this.last!==null){let l=this.first;for(;l!==void 0;)l.notifier.unsubscribe(this,l.propertyName),l=l.next;this.last=null,this.needsRefresh=this.needsQueue=this.isAsync}}watch(l,u){let h=this.last,B=n(l),A=h===null?this.first:{};if(A.propertySource=l,A.propertyName=u,A.notifier=B,B.subscribe(this,u),h!==null){if(!this.needsRefresh){let ge;t=void 0,ge=h.propertySource[h.propertyName],t=this,l===ge&&(this.needsRefresh=!0)}h.next=A}this.last=A}handleChange(){this.needsQueue?(this.needsQueue=!1,r(this)):this.isAsync||this.call()}call(){this.last!==null&&(this.needsQueue=this.isAsync,this.notify(this))}*records(){let l=this.first;for(;l!==void 0;)yield l,l=l.next}}return se(d),Object.freeze({setArrayObserverFactory(c){a=c},getNotifier:n,track(c,l){t&&t.watch(c,l)},trackVolatile(){t&&(t.needsRefresh=!0)},notify(c,l){n(c).notify(l)},defineProperty(c,l){j(l)&&(l=new i(l)),s(c).push(l),Reflect.defineProperty(c,l.name,{enumerable:!0,get(){return l.getValue(this)},set(u){l.setValue(this,u)}})},getAccessors:s,binding(c,l,u=this.isVolatileBinding(c)){return new d(c,l,u)},isVolatileBinding(c){return e.test(c.toString())}})});function L(r,e){T.defineProperty(r,e)}var Ca=b.getById(Be.contextEvent,()=>{let r=null;return{get(){return r},set(e){r=e}}}),Le=Object.freeze({default:{index:0,length:0,get event(){return Le.getEvent()},eventDetail(){return this.event.detail},eventTarget(){return this.event.target}},getEvent(){return Ca.get()},setEvent(r){Ca.set(r)}});var le=class{constructor(e,o,t){this.index=e,this.removed=o,this.addedCount=t}adjustTo(e){let o=this.index,t=e.length;return o>t?o=t-this.addedCount:o<0&&(o=t+this.removed.length+o-this.addedCount),this.index=o<0?0:o,this}},pc=Object.freeze({reset:1,splice:2,optimized:3}),$a=new le(0,C,0);$a.reset=!0;var Ia=[$a];function vc(r,e,o,t,a,n){let s=n-a+1,i=o-e+1,d=new Array(s),c,l;for(let u=0;u<s;++u)d[u]=new Array(i),d[u][0]=u;for(let u=0;u<i;++u)d[0][u]=u;for(let u=1;u<s;++u)for(let h=1;h<i;++h)r[e+h-1]===t[a+u-1]?d[u][h]=d[u-1][h-1]:(c=d[u-1][h]+1,l=d[u][h-1]+1,d[u][h]=c<l?c:l);return d}function fc(r){let e=r.length-1,o=r[0].length-1,t=r[e][o],a=[];for(;e>0||o>0;){if(e===0){a.push(2),o--;continue}if(o===0){a.push(3),e--;continue}let n=r[e-1][o-1],s=r[e-1][o],i=r[e][o-1],d;s<i?d=s<n?s:n:d=i<n?i:n,d===n?(n===t?a.push(0):(a.push(1),t=n),e--,o--):d===s?(a.push(3),e--,t=s):(a.push(2),o--,t=i)}return a.reverse()}function Bc(r,e,o){for(let t=0;t<o;++t)if(r[t]!==e[t])return t;return o}function bc(r,e,o){let t=r.length,a=e.length,n=0;for(;n<o&&r[--t]===e[--a];)n++;return n}function mc(r,e,o,t){return e<o||t<r?-1:e===o||t===r?0:r<o?e<t?e-o:t-o:t<e?t-r:e-r}function kc(r,e,o,t,a,n){let s=0,i=0,d=Math.min(o-e,n-a);if(e===0&&a===0&&(s=Bc(r,t,d)),o===r.length&&n===t.length&&(i=bc(r,t,d-s)),e+=s,a+=s,o-=i,n-=i,o-e===0&&n-a===0)return C;if(e===o){let A=new le(e,[],0);for(;a<n;)A.removed.push(t[a++]);return[A]}else if(a===n)return[new le(e,[],o-e)];let c=fc(vc(r,e,o,t,a,n)),l=[],u,h=e,B=a;for(let A=0;A<c.length;++A)switch(c[A]){case 0:u!==void 0&&(l.push(u),u=void 0),h++,B++;break;case 1:u===void 0&&(u=new le(h,[],0)),u.addedCount++,h++,u.removed.push(t[B]),B++;break;case 2:u===void 0&&(u=new le(h,[],0)),u.addedCount++,h++;break;case 3:u===void 0&&(u=new le(h,[],0)),u.removed.push(t[B]),B++;break}return u!==void 0&&l.push(u),l}function Sc(r,e){let o=!1,t=0;for(let a=0;a<e.length;a++){let n=e[a];if(n.index+=t,o)continue;let s=mc(r.index,r.index+r.removed.length,n.index,n.index+n.addedCount);if(s>=0){e.splice(a,1),a--,t-=n.addedCount-n.removed.length,r.addedCount+=n.addedCount-s;let i=r.removed.length+n.removed.length-s;if(!r.addedCount&&!i)o=!0;else{let d=n.removed;if(r.index<n.index){let c=r.removed.slice(0,n.index-r.index);c.push(...d),d=c}if(r.index+r.removed.length>n.index+n.addedCount){let c=r.removed.slice(n.index+n.addedCount-r.index);d.push(...c)}r.removed=d,n.index<r.index&&(r.index=n.index)}}else if(r.index<n.index){o=!0,e.splice(a,0,r),a++;let i=r.addedCount-r.removed.length;n.index+=i,t+=i}}o||e.push(r)}function Fc(r,e){let o=[],t=[];for(let a=0,n=e.length;a<n;a++)Sc(e[a],t);for(let a=0,n=t.length;a<n;++a){let s=t[a];if(s.addedCount===1&&s.removed.length===1){s.removed[0]!==r[s.index]&&o.push(s);continue}o=o.concat(kc(r,s.index,s.index+s.addedCount,s.removed,0,s.removed.length))}return o}var ut=Object.freeze({support:pc.optimized,normalize(r,e,o){return r===void 0?o===void 0?C:Fc(e,o):Ia},pop(r,e,o,t){let a=r.length>0,n=o.apply(r,t);return a&&e.addSplice(new le(r.length,[n],0)),n},push(r,e,o,t){let a=o.apply(r,t);return e.addSplice(new le(r.length-t.length,[],t.length).adjustTo(r)),a},reverse(r,e,o,t){let a=o.apply(r,t);return e.reset(r),a},shift(r,e,o,t){let a=r.length>0,n=o.apply(r,t);return a&&e.addSplice(new le(0,[n],0)),n},sort(r,e,o,t){let a=o.apply(r,t);return e.reset(r),a},splice(r,e,o,t){let a=o.apply(r,t);return e.addSplice(new le(+t[0],a,t.length>2?t.length-2:0).adjustTo(r)),a},unshift(r,e,o,t){let a=o.apply(r,t);return e.addSplice(new le(0,[],t.length).adjustTo(r)),a}}),Hg=Object.freeze({reset:Ia,setDefaultStrategy(r){ut=r}});function Da(r,e,o){Reflect.defineProperty(r,e,{value:o,enumerable:!1})}var dt=class extends Re{constructor(e){super(e),this.oldCollection=void 0,this.splices=void 0,this.needsQueue=!0,this._strategy=null,this._lengthObserver=void 0,this.call=this.flush,Da(e,"$fastController",this)}get strategy(){return this._strategy}set strategy(e){this._strategy=e}get lengthObserver(){let e=this._lengthObserver;if(e===void 0){let o=this.subject;this._lengthObserver=e={length:o.length,handleChange(){this.length!==o.length&&(this.length=o.length,T.notify(e,"length"))}},this.subscribe(e)}return e}subscribe(e){this.flush(),super.subscribe(e)}addSplice(e){this.splices===void 0?this.splices=[e]:this.splices.push(e),this.enqueue()}reset(e){this.oldCollection=e,this.enqueue()}flush(){var e;let o=this.splices,t=this.oldCollection;o===void 0&&t===void 0||(this.needsQueue=!0,this.splices=void 0,this.oldCollection=void 0,this.notify(((e=this._strategy)!==null&&e!==void 0?e:ut).normalize(t,this.subject,o)))}enqueue(){this.needsQueue&&(this.needsQueue=!1,be.enqueue(this))}},Ta=!1,Oa=Object.freeze({enable(){if(Ta)return;Ta=!0,T.setArrayObserverFactory(e=>new dt(e));let r=Array.prototype;r.$fastPatch||(Da(r,"$fastPatch",1),[r.pop,r.push,r.reverse,r.shift,r.sort,r.splice,r.unshift].forEach(e=>{r[e.name]=function(...o){var t;let a=this.$fastController;return a===void 0?e.apply(this,o):((t=a.strategy)!==null&&t!==void 0?t:ut)[e.name](this,a,e,o)}}))}});var ce=class{constructor(e,o,t=!1){this.evaluate=e,this.policy=o,this.isVolatile=t}};var gt=class extends ce{createObserver(e){return T.binding(this.evaluate,e,this.isVolatile)}};function dr(r,e,o=T.isVolatileBinding(r)){return new gt(r,e,o)}var uo=class extends ce{createObserver(){return this}bind(e){return this.evaluate(e.source,e.context)}};se(uo);function ur(r,e){return new uo(r,e)}function ht(r){return W(r)?dr(r):r instanceof ce?r:ur(()=>r)}var Ra;function Ma(r){return r.map(e=>e instanceof re?Ma(e.styles):[e]).reduce((e,o)=>e.concat(o),[])}var re=class r{constructor(e){this.styles=e,this.targets=new WeakSet,this._strategy=null,this.behaviors=e.map(o=>o instanceof r?o.behaviors:null).reduce((o,t)=>t===null?o:o===null?t:o.concat(t),null)}get strategy(){return this._strategy===null&&this.withStrategy(Ra),this._strategy}addStylesTo(e){this.strategy.addStylesTo(e),this.targets.add(e)}removeStylesFrom(e){this.strategy.removeStylesFrom(e),this.targets.delete(e)}isAttachedTo(e){return this.targets.has(e)}withBehaviors(...e){return this.behaviors=this.behaviors===null?e:this.behaviors.concat(e),this}withStrategy(e){return this._strategy=new e(Ma(this.styles)),this}static setDefaultStrategy(e){Ra=e}static normalize(e){return e===void 0?void 0:Array.isArray(e)?new r(e):e instanceof r?e:new r([e])}};re.supportsAdoptedStyleSheets=Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype;var pt=sr(),Hr=Object.freeze({getForInstance:pt.getForInstance,getByType:pt.getByType,define(r){return pt.register({type:r}),r}});function vt(r,e,o){e.source.style.setProperty(r.targetAspect,o.bind(e))}var gr=class{constructor(e,o){this.dataBinding=e,this.targetAspect=o}createCSS(e){return e(this),`var(${this.targetAspect})`}addedCallback(e){var o;let t=e.source;if(!t.$cssBindings){t.$cssBindings=new Map;let n=t.setAttribute;t.setAttribute=(s,i)=>{n.call(t,s,i),s==="style"&&t.$cssBindings.forEach((d,c)=>vt(c,d.controller,d.observer))}}let a=(o=e[this.targetAspect])!==null&&o!==void 0?o:e[this.targetAspect]=this.dataBinding.createObserver(this,this);a.controller=e,e.source.$cssBindings.set(this,{controller:e,observer:a})}connectedCallback(e){vt(this,e,e[this.targetAspect])}removedCallback(e){e.source.$cssBindings&&e.source.$cssBindings.delete(this)}handleChange(e,o){vt(this,o.controller,o)}};Hr.define(gr);var yc=`${Math.random().toString(36).substring(2,8)}`,Pc=0,za=()=>`--v${yc}${++Pc}`;function Ea(r,e){let o=[],t="",a=[],n=s=>{a.push(s)};for(let s=0,i=r.length-1;s<i;++s){t+=r[s];let d=e[s];W(d)?d=new gr(dr(d),za()).createCSS(n):d instanceof ce?d=new gr(d,za()).createCSS(n):Hr.getForInstance(d)!==void 0&&(d=d.createCSS(n)),d instanceof re||d instanceof CSSStyleSheet?(t.trim()!==""&&(o.push(t),t=""),o.push(d)):t+=d}return t+=r[r.length-1],t.trim()!==""&&o.push(t),{styles:o,behaviors:a}}var y=(r,...e)=>{let{styles:o,behaviors:t}=Ea(r,e),a=new re(o);return t.length?a.withBehaviors(...t):a},go=class{constructor(e,o){this.behaviors=o,this.css="";let t=e.reduce((a,n)=>(j(n)?this.css+=n:a.push(n),a),[]);t.length&&(this.styles=new re(t))}createCSS(e){return this.behaviors.forEach(e),this.styles&&e(this),this.css}addedCallback(e){e.addStyles(this.styles)}removedCallback(e){e.removeStyles(this.styles)}};Hr.define(go);y.partial=(r,...e)=>{let{styles:o,behaviors:t}=Ea(r,e);return new go(o,t)};var ft=`fast-${Math.random().toString(36).substring(2,8)}`,ho=`${ft}{`,Cr=`}${ft}`,xc=Cr.length,Nc=0,Tr=()=>`${ft}-${++Nc}`,hr=Object.freeze({interpolation:r=>`${ho}${r}${Cr}`,attribute:r=>`${Tr()}="${ho}${r}${Cr}"`,comment:r=>`<!--${ho}${r}${Cr}-->`}),$r=Object.freeze({parse(r,e){let o=r.split(ho);if(o.length===1)return null;let t=[];for(let a=0,n=o.length;a<n;++a){let s=o[a],i=s.indexOf(Cr),d;if(i===-1)d=s;else{let c=s.substring(0,i);t.push(e[c]),d=s.substring(i+xc)}d!==""&&t.push(d)}return t}});var Bt=sr(),z=Object.freeze({getForInstance:Bt.getForInstance,getByType:Bt.getByType,define(r,e){return e=e||{},e.type=r,Bt.register(e),r},assignAspect(r,e){if(!e){r.aspectType=M.content;return}switch(r.sourceAspect=e,e[0]){case":":r.targetAspect=e.substring(1),r.aspectType=r.targetAspect==="classList"?M.tokenList:M.property;break;case"?":r.targetAspect=e.substring(1),r.aspectType=M.booleanAttribute;break;case"@":r.targetAspect=e.substring(1),r.aspectType=M.event;break;default:r.targetAspect=e,r.aspectType=M.attribute;break}}});var Ke=class{constructor(e){this.options=e}createHTML(e){return hr.attribute(e(this))}createBehavior(){return this}};se(Ke);function wc(r,e,o,t){if(o==null&&(o=""),o.create){r.textContent="";let a=r.$fastView;a===void 0?a=o.create():r.$fastTemplate!==o&&(a.isComposed&&(a.remove(),a.unbind()),a=o.create()),a.isComposed?a.needsBindOnly&&(a.needsBindOnly=!1,a.bind(t.source,t.context)):(a.isComposed=!0,a.bind(t.source,t.context),a.insertBefore(r),r.$fastView=a,r.$fastTemplate=o)}else{let a=r.$fastView;a!==void 0&&a.isComposed&&(a.isComposed=!1,a.remove(),a.needsBindOnly?a.needsBindOnly=!1:a.unbind()),r.textContent=o}}function Ac(r,e,o){var t;let a=`${this.id}-t`,n=(t=r[a])!==null&&t!==void 0?t:r[a]={v:0,cv:Object.create(null)},s=n.cv,i=n.v,d=r[e];if(o!=null&&o.length){let c=o.split(/\s+/);for(let l=0,u=c.length;l<u;++l){let h=c[l];h!==""&&(s[h]=i,d.add(h))}}if(n.v=i+1,i!==0){i-=1;for(let c in s)s[c]===i&&d.remove(c)}}var Lc={[M.attribute]:Ae.setAttribute,[M.booleanAttribute]:Ae.setBooleanAttribute,[M.property]:(r,e,o)=>r[e]=o,[M.content]:wc,[M.tokenList]:Ac,[M.event]:()=>{}},me=class{constructor(e){this.dataBinding=e,this.updateTarget=null,this.aspectType=M.content}createHTML(e){return hr.interpolation(e(this))}createBehavior(){var e;if(this.updateTarget===null){let o=Lc[this.aspectType],t=(e=this.dataBinding.policy)!==null&&e!==void 0?e:this.policy;if(!o)throw b.error(1205);this.data=`${this.id}-d`,this.updateTarget=t.protect(this.targetTagName,this.aspectType,this.targetAspect,o)}return this}bind(e){var o;let t=e.targets[this.targetNodeId];switch(this.aspectType){case M.event:t[this.data]=e,t.addEventListener(this.targetAspect,this,this.dataBinding.options);break;case M.content:e.onUnbind(this);default:let a=(o=t[this.data])!==null&&o!==void 0?o:t[this.data]=this.dataBinding.createObserver(this,this);a.target=t,a.controller=e,this.updateTarget(t,this.targetAspect,a.bind(e),e);break}}unbind(e){let t=e.targets[this.targetNodeId].$fastView;t!==void 0&&t.isComposed&&(t.unbind(),t.needsBindOnly=!0)}handleEvent(e){let o=e.currentTarget[this.data];if(o.isBound){Le.setEvent(e);let t=this.dataBinding.evaluate(o.source,o.context);Le.setEvent(null),t!==!0&&e.preventDefault()}}handleChange(e,o){let t=o.target,a=o.controller;this.updateTarget(t,this.targetAspect,o.bind(a),a)}};z.define(me,{aspected:!0});function Va(r,e){let o=r.parentNode,t=r,a;for(;t!==e;)a=t.nextSibling,o.removeChild(t),t=a;o.removeChild(e)}var He=class{constructor(e,o,t){this.fragment=e,this.factories=o,this.targets=t,this.behaviors=null,this.unbindables=[],this.source=null,this.isBound=!1,this.sourceLifetime=ir.unknown,this.context=this,this.index=0,this.length=0,this.firstChild=e.firstChild,this.lastChild=e.lastChild}get event(){return Le.getEvent()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}eventDetail(){return this.event.detail}eventTarget(){return this.event.target}appendTo(e){e.appendChild(this.fragment)}insertBefore(e){if(this.fragment.hasChildNodes())e.parentNode.insertBefore(this.fragment,e);else{let o=this.lastChild;if(e.previousSibling===o)return;let t=e.parentNode,a=this.firstChild,n;for(;a!==o;)n=a.nextSibling,t.insertBefore(a,e),a=n;t.insertBefore(o,e)}}remove(){let e=this.fragment,o=this.lastChild,t=this.firstChild,a;for(;t!==o;)a=t.nextSibling,e.appendChild(t),t=a;e.appendChild(o)}dispose(){Va(this.firstChild,this.lastChild),this.unbind()}onUnbind(e){this.unbindables.push(e)}bind(e,o=this){if(this.source===e)return;let t=this.behaviors;if(t===null){this.source=e,this.context=o,this.behaviors=t=new Array(this.factories.length);let a=this.factories;for(let n=0,s=a.length;n<s;++n){let i=a[n].createBehavior();i.bind(this),t[n]=i}}else{this.source!==null&&this.evaluateUnbindables(),this.isBound=!1,this.source=e,this.context=o;for(let a=0,n=t.length;a<n;++a)t[a].bind(this)}this.isBound=!0}unbind(){!this.isBound||this.source===null||(this.evaluateUnbindables(),this.source=null,this.context=this,this.isBound=!1)}evaluateUnbindables(){let e=this.unbindables;for(let o=0,t=e.length;o<t;++o)e[o].unbind(this);e.length=0}static disposeContiguousBatch(e){if(e.length!==0){Va(e[0].firstChild,e[e.length-1].lastChild);for(let o=0,t=e.length;o<t;++o)e[o].unbind()}}};se(He);T.defineProperty(He.prototype,"index");T.defineProperty(He.prototype,"length");var Xa=(r,e)=>`${r}.${e}`,Wa={},ke={index:0,node:null};function ja(r){r.startsWith("fast-")||b.warn(1204,{name:r})}var Hc=new Proxy(document.createElement("div"),{get(r,e){ja(e);let o=Reflect.get(r,e);return W(o)?o.bind(r):o},set(r,e,o){return ja(e),Reflect.set(r,e,o)}}),bt=class{constructor(e,o,t){this.fragment=e,this.directives=o,this.policy=t,this.proto=null,this.nodeIds=new Set,this.descriptors={},this.factories=[]}addFactory(e,o,t,a,n){var s,i;this.nodeIds.has(t)||(this.nodeIds.add(t),this.addTargetDescriptor(o,t,a)),e.id=(s=e.id)!==null&&s!==void 0?s:Tr(),e.targetNodeId=t,e.targetTagName=n,e.policy=(i=e.policy)!==null&&i!==void 0?i:this.policy,this.factories.push(e)}freeze(){return this.proto=Object.create(null,this.descriptors),this}addTargetDescriptor(e,o,t){let a=this.descriptors;if(o==="r"||o==="h"||a[o])return;if(!a[e]){let s=e.lastIndexOf("."),i=e.substring(0,s),d=parseInt(e.substring(s+1));this.addTargetDescriptor(i,e,d)}let n=Wa[o];if(!n){let s=`_${o}`;Wa[o]=n={get(){var i;return(i=this[s])!==null&&i!==void 0?i:this[s]=this[e].childNodes[t]}}}a[o]=n}createView(e){let o=this.fragment.cloneNode(!0),t=Object.create(this.proto);t.r=o,t.h=e??Hc;for(let a of this.nodeIds)t[a];return new He(o,this.factories,t)}};function _a(r,e,o,t,a,n=!1){let s=o.attributes,i=r.directives;for(let d=0,c=s.length;d<c;++d){let l=s[d],u=l.value,h=$r.parse(u,i),B=null;h===null?n&&(B=new me(ur(()=>u,r.policy)),z.assignAspect(B,l.name)):B=po.aggregate(h,r.policy),B!==null&&(o.removeAttributeNode(l),d--,c--,r.addFactory(B,e,t,a,o.tagName))}}function Cc(r,e,o,t,a){let n=$r.parse(e.textContent,r.directives);if(n===null)return ke.node=e.nextSibling,ke.index=a+1,ke;let s,i=s=e;for(let d=0,c=n.length;d<c;++d){let l=n[d];d!==0&&(a++,t=Xa(o,a),s=i.parentNode.insertBefore(document.createTextNode(""),i.nextSibling)),j(l)?s.textContent=l:(s.textContent=" ",z.assignAspect(l),r.addFactory(l,o,t,a,null)),i=s}return ke.index=a+1,ke.node=i.nextSibling,ke}function Ya(r,e,o){let t=0,a=e.firstChild;for(;a;){let n=Tc(r,o,a,t);a=n.node,t=n.index}}function Tc(r,e,o,t){let a=Xa(e,t);switch(o.nodeType){case 1:_a(r,e,o,a,t),Ya(r,o,a);break;case 3:return Cc(r,o,e,a,t);case 8:let n=$r.parse(o.data,r.directives);n!==null&&r.addFactory(po.aggregate(n),e,a,t,null);break}return ke.index=t+1,ke.node=o.nextSibling,ke}function $c(r,e){return r&&r.nodeType==8&&$r.parse(r.data,e)!==null}var Ga="TEMPLATE",po={compile(r,e,o=Ae.policy){let t;if(j(r)){t=document.createElement(Ga),t.innerHTML=o.createHTML(r);let s=t.content.firstElementChild;s!==null&&s.tagName===Ga&&(t=s)}else t=r;!t.content.firstChild&&!t.content.lastChild&&t.content.appendChild(document.createComment(""));let a=document.adoptNode(t.content),n=new bt(a,e,o);return _a(n,"",t,"h",0,!0),($c(a.firstChild,e)||a.childNodes.length===1&&Object.keys(e).length>0)&&a.insertBefore(document.createComment(""),a.firstChild),Ya(n,a,"r"),ke.node=null,n.freeze()},setDefaultStrategy(r){this.compile=r},aggregate(r,e=Ae.policy){if(r.length===1)return r[0];let o,t,a=!1,n,s=r.length,i=r.map(l=>j(l)?()=>l:(o=l.sourceAspect||o,t=l.dataBinding||t,a=a||l.dataBinding.isVolatile,n=n||l.dataBinding.policy,l.dataBinding.evaluate)),d=(l,u)=>{let h="";for(let B=0;B<s;++B)h+=i[B](l,u);return h};t.evaluate=d,t.isVolatile=a,t.policy=n??e;let c=new me(t);return z.assignAspect(c,o),c}};var Ic=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,Dc=Object.create(null),he=class{constructor(e,o=Dc){this.html=e,this.factories=o}createHTML(e){let o=this.factories;for(let t in o)e(o[t]);return this.html}};he.empty=new he("");z.define(he);function Oc(r,e,o,t=z.getForInstance(r)){if(t.aspected){let a=Ic.exec(e);a!==null&&z.assignAspect(r,a[2])}return r.createHTML(o)}var Ir=class r{constructor(e,o={},t){this.policy=t,this.result=null,this.html=e,this.factories=o}create(e){return this.result===null&&(this.result=po.compile(this.html,this.factories,this.policy)),this.result.createView(e)}inline(){return new he(j(this.html)?this.html:this.html.innerHTML,this.factories)}withPolicy(e){if(this.result)throw b.error(1208);if(this.policy)throw b.error(1207);return this.policy=e,this}render(e,o,t){let a=this.create(t);return a.bind(e),a.appendTo(o),a}static create(e,o,t){let a="",n=Object.create(null),s=i=>{var d;let c=(d=i.id)!==null&&d!==void 0?d:i.id=Tr();return n[c]=i,c};for(let i=0,d=e.length-1;i<d;++i){let c=e[i],l=o[i],u;if(a+=c,W(l))l=new me(dr(l));else if(l instanceof ce)l=new me(l);else if(!(u=z.getForInstance(l))){let h=l;l=new me(ur(()=>h))}a+=Oc(l,c,s,u)}return new r(a+e[e.length-1],n,t)}};se(Ir);var m=(r,...e)=>{if(Array.isArray(r)&&Array.isArray(r.raw))return Ir.create(r,e);throw b.error(1206)};m.partial=r=>new he(r);var Dr=class extends Ke{bind(e){e.source[this.options]=e.targets[this.targetNodeId]}};z.define(Dr);var pr=r=>new Dr(r);var Rc=()=>null;function qa(r){return r===void 0?Rc:W(r)?r:()=>r}function mt(r,e,o){let t=W(r)?r:()=>r,a=qa(e),n=qa(o);return(s,i)=>t(s,i)?a(s,i):n(s,i)}var Ua=Object.freeze({positioning:!1,recycle:!0});function Mc(r,e,o,t){r.context.parent=t.source,r.context.parentContext=t.context,r.bind(e[o])}function zc(r,e,o,t){r.context.parent=t.source,r.context.parentContext=t.context,r.context.length=e.length,r.context.index=o,r.bind(e[o])}var vo=class{constructor(e){this.directive=e,this.items=null,this.itemsObserver=null,this.bindView=Mc,this.views=[],this.itemsBindingObserver=e.dataBinding.createObserver(this,e),this.templateBindingObserver=e.templateBinding.createObserver(this,e),e.options.positioning&&(this.bindView=zc)}bind(e){this.location=e.targets[this.directive.targetNodeId],this.controller=e,this.items=this.itemsBindingObserver.bind(e),this.template=this.templateBindingObserver.bind(e),this.observeItems(!0),this.refreshAllViews(),e.onUnbind(this)}unbind(){this.itemsObserver!==null&&this.itemsObserver.unsubscribe(this),this.unbindAllViews()}handleChange(e,o){if(o===this.itemsBindingObserver)this.items=this.itemsBindingObserver.bind(this.controller),this.observeItems(),this.refreshAllViews();else if(o===this.templateBindingObserver)this.template=this.templateBindingObserver.bind(this.controller),this.refreshAllViews(!0);else if(o[0])o[0].reset?this.refreshAllViews():this.updateViews(o);else return}observeItems(e=!1){if(!this.items){this.items=C;return}let o=this.itemsObserver,t=this.itemsObserver=T.getNotifier(this.items),a=o!==t;a&&o!==null&&o.unsubscribe(this),(a||e)&&t.subscribe(this)}updateViews(e){let o=this.views,t=this.bindView,a=this.items,n=this.template,s=this.controller,i=this.directive.options.recycle,d=[],c=0,l=0;for(let u=0,h=e.length;u<h;++u){let B=e[u],A=B.removed,ge=0,nr=B.index,sc=nr+B.addedCount,Lr=o.splice(B.index,A.length),cc=l=d.length+Lr.length;for(;nr<sc;++nr){let Na=o[nr],ic=Na?Na.firstChild:this.location,lr;i&&l>0?(ge<=cc&&Lr.length>0?(lr=Lr[ge],ge++):(lr=d[c],c++),l--):lr=n.create(),o.splice(nr,0,lr),t(lr,a,nr,s),lr.insertBefore(ic)}Lr[ge]&&d.push(...Lr.slice(ge))}for(let u=c,h=d.length;u<h;++u)d[u].dispose();if(this.directive.options.positioning)for(let u=0,h=o.length;u<h;++u){let B=o[u].context;B.length=h,B.index=u}}refreshAllViews(e=!1){let o=this.items,t=this.template,a=this.location,n=this.bindView,s=this.controller,i=o.length,d=this.views,c=d.length;if((i===0||e||!this.directive.options.recycle)&&(He.disposeContiguousBatch(d),c=0),c===0){this.views=d=new Array(i);for(let l=0;l<i;++l){let u=t.create();n(u,o,l,s),d[l]=u,u.insertBefore(a)}}else{let l=0;for(;l<i;++l)if(l<c){let h=d[l];n(h,o,l,s)}else{let h=t.create();n(h,o,l,s),d.push(h),h.insertBefore(a)}let u=d.splice(l,c-l);for(l=0,i=u.length;l<i;++l)u[l].dispose()}}unbindAllViews(){let e=this.views;for(let o=0,t=e.length;o<t;++o)e[o].unbind()}},Or=class{constructor(e,o,t){this.dataBinding=e,this.templateBinding=o,this.options=t,Oa.enable()}createHTML(e){return hr.comment(e(this))}createBehavior(){return new vo(this)}};z.define(Or);function fo(r,e,o=Ua){let t=ht(r),a=ht(e);return new Or(t,a,Object.assign(Object.assign({},Ua),o))}var Bo=class extends Ke{get id(){return this._id}set id(e){this._id=e,this._controllerProperty=`${e}-c`}bind(e){let o=e.targets[this.targetNodeId];o[this._controllerProperty]=e,this.updateTarget(e.source,this.computeNodes(o)),this.observe(o),e.onUnbind(this)}unbind(e){let o=e.targets[this.targetNodeId];this.updateTarget(e.source,C),this.disconnect(o),o[this._controllerProperty]=null}getSource(e){return e[this._controllerProperty].source}updateTarget(e,o){e[this.options.property]=o}computeNodes(e){let o=this.getNodes(e);return"filter"in this.options&&(o=o.filter(this.options.filter)),o}};var Ka="slotchange",Rr=class extends Bo{observe(e){e.addEventListener(Ka,this)}disconnect(e){e.removeEventListener(Ka,this)}getNodes(e){return e.assignedNodes(this.options)}handleEvent(e){let o=e.currentTarget;this.updateTarget(this.getSource(o),this.computeNodes(o))}};z.define(Rr);function kt(r){return j(r)&&(r={property:r}),new Rr(r)}var Qa="boolean",Ja="reflect",vr=Object.freeze({locate:co()}),St={toView(r){return r?"true":"false"},fromView(r){return!(r==null||r==="false"||r===!1||r===0)}};var Mr=class r{constructor(e,o,t=o.toLowerCase(),a=Ja,n){this.guards=new Set,this.Owner=e,this.name=o,this.attribute=t,this.mode=a,this.converter=n,this.fieldName=`_${o}`,this.callbackName=`${o}Changed`,this.hasCallback=this.callbackName in e.prototype,a===Qa&&n===void 0&&(this.converter=St)}setValue(e,o){let t=e[this.fieldName],a=this.converter;a!==void 0&&(o=a.fromView(o)),t!==o&&(e[this.fieldName]=o,this.tryReflectToAttribute(e),this.hasCallback&&e[this.callbackName](t,o),e.$fastController.notify(this.name))}getValue(e){return T.track(e,this.name),e[this.fieldName]}onAttributeChangedCallback(e,o){this.guards.has(e)||(this.guards.add(e),this.setValue(e,o),this.guards.delete(e))}tryReflectToAttribute(e){let o=this.mode,t=this.guards;t.has(e)||o==="fromView"||be.enqueue(()=>{t.add(e);let a=e[this.fieldName];switch(o){case Ja:let n=this.converter;Ae.setAttribute(e,this.attribute,n!==void 0?n.toView(a):a);break;case Qa:Ae.setBooleanAttribute(e,this.attribute,a);break}t.delete(e)})}static collect(e,...o){let t=[];o.push(vr.locate(e));for(let a=0,n=o.length;a<n;++a){let s=o[a];if(s!==void 0)for(let i=0,d=s.length;i<d;++i){let c=s[i];j(c)?t.push(new r(e,c)):t.push(new r(e,c.property,c.attribute,c.mode,c.converter))}}return t}};function f(r,e){let o;function t(a,n){arguments.length>1&&(o.property=n),vr.locate(a.constructor).push(o)}if(arguments.length>1){o={},t(r,e);return}return o=r===void 0?{}:r,t}var Za={mode:"open"},en={},rn=new Set,bo=b.getById(Be.elementRegistry,()=>sr()),ie=class r{constructor(e,o=e.definition){var t;this.platformDefined=!1,j(o)&&(o={name:o}),this.type=e,this.name=o.name,this.template=o.template,this.registry=(t=o.registry)!==null&&t!==void 0?t:customElements;let a=e.prototype,n=Mr.collect(e,o.attributes),s=new Array(n.length),i={},d={};for(let c=0,l=n.length;c<l;++c){let u=n[c];s[c]=u.attribute,i[u.name]=u,d[u.attribute]=u,T.defineProperty(a,u)}Reflect.defineProperty(e,"observedAttributes",{value:s,enumerable:!0}),this.attributes=n,this.propertyLookup=i,this.attributeLookup=d,this.shadowOptions=o.shadowOptions===void 0?Za:o.shadowOptions===null?void 0:Object.assign(Object.assign({},Za),o.shadowOptions),this.elementOptions=o.elementOptions===void 0?en:Object.assign(Object.assign({},en),o.elementOptions),this.styles=re.normalize(o.styles),bo.register(this)}get isDefined(){return this.platformDefined}define(e=this.registry){let o=this.type;return e.get(this.name)||(this.platformDefined=!0,e.define(this.name,o,this.elementOptions)),this}static compose(e,o){return rn.has(e)||bo.getByType(e)?new r(class extends e{},o):new r(e,o)}static registerBaseType(e){rn.add(e)}};ie.getByType=bo.getByType;ie.getForInstance=bo.getForInstance;var Ec={bubbles:!0,composed:!0,cancelable:!0},Ft="isConnected",an=new WeakMap;function mo(r){var e,o;return(o=(e=r.shadowRoot)!==null&&e!==void 0?e:an.get(r))!==null&&o!==void 0?o:null}var on,Qe=class extends cr{constructor(e,o){super(e),this.boundObservables=null,this.needsInitialization=!0,this.hasExistingShadowRoot=!1,this._template=null,this.stage=3,this.guardBehaviorConnection=!1,this.behaviors=null,this._mainStyles=null,this.$fastController=this,this.view=null,this.source=e,this.definition=o;let t=o.shadowOptions;if(t!==void 0){let n=e.shadowRoot;n?this.hasExistingShadowRoot=!0:(n=e.attachShadow(t),t.mode==="closed"&&an.set(e,n))}let a=T.getAccessors(e);if(a.length>0){let n=this.boundObservables=Object.create(null);for(let s=0,i=a.length;s<i;++s){let d=a[s].name,c=e[d];c!==void 0&&(delete e[d],n[d]=c)}}}get isConnected(){return T.track(this,Ft),this.stage===1}get context(){var e,o;return(o=(e=this.view)===null||e===void 0?void 0:e.context)!==null&&o!==void 0?o:Le.default}get isBound(){var e,o;return(o=(e=this.view)===null||e===void 0?void 0:e.isBound)!==null&&o!==void 0?o:!1}get sourceLifetime(){var e;return(e=this.view)===null||e===void 0?void 0:e.sourceLifetime}get template(){var e;if(this._template===null){let o=this.definition;this.source.resolveTemplate?this._template=this.source.resolveTemplate():o.template&&(this._template=(e=o.template)!==null&&e!==void 0?e:null)}return this._template}set template(e){this._template!==e&&(this._template=e,this.needsInitialization||this.renderTemplate(e))}get mainStyles(){var e;if(this._mainStyles===null){let o=this.definition;this.source.resolveStyles?this._mainStyles=this.source.resolveStyles():o.styles&&(this._mainStyles=(e=o.styles)!==null&&e!==void 0?e:null)}return this._mainStyles}set mainStyles(e){this._mainStyles!==e&&(this._mainStyles!==null&&this.removeStyles(this._mainStyles),this._mainStyles=e,this.needsInitialization||this.addStyles(e))}onUnbind(e){var o;(o=this.view)===null||o===void 0||o.onUnbind(e)}addBehavior(e){var o,t;let a=(o=this.behaviors)!==null&&o!==void 0?o:this.behaviors=new Map,n=(t=a.get(e))!==null&&t!==void 0?t:0;n===0?(a.set(e,1),e.addedCallback&&e.addedCallback(this),e.connectedCallback&&!this.guardBehaviorConnection&&(this.stage===1||this.stage===0)&&e.connectedCallback(this)):a.set(e,n+1)}removeBehavior(e,o=!1){let t=this.behaviors;if(t===null)return;let a=t.get(e);a!==void 0&&(a===1||o?(t.delete(e),e.disconnectedCallback&&this.stage!==3&&e.disconnectedCallback(this),e.removedCallback&&e.removedCallback(this)):t.set(e,a-1))}addStyles(e){var o;if(!e)return;let t=this.source;if(e instanceof HTMLElement)((o=mo(t))!==null&&o!==void 0?o:this.source).append(e);else if(!e.isAttachedTo(t)){let a=e.behaviors;if(e.addStylesTo(t),a!==null)for(let n=0,s=a.length;n<s;++n)this.addBehavior(a[n])}}removeStyles(e){var o;if(!e)return;let t=this.source;if(e instanceof HTMLElement)((o=mo(t))!==null&&o!==void 0?o:t).removeChild(e);else if(e.isAttachedTo(t)){let a=e.behaviors;if(e.removeStylesFrom(t),a!==null)for(let n=0,s=a.length;n<s;++n)this.removeBehavior(a[n])}}connect(){if(this.stage!==3)return;if(this.stage=0,this.boundObservables!==null){let o=this.source,t=this.boundObservables,a=Object.keys(t);for(let n=0,s=a.length;n<s;++n){let i=a[n];o[i]=t[i]}this.boundObservables=null}let e=this.behaviors;if(e!==null){this.guardBehaviorConnection=!0;for(let o of e.keys())o.connectedCallback&&o.connectedCallback(this);this.guardBehaviorConnection=!1}this.needsInitialization?(this.renderTemplate(this.template),this.addStyles(this.mainStyles),this.needsInitialization=!1):this.view!==null&&this.view.bind(this.source),this.stage=1,T.notify(this,Ft)}disconnect(){if(this.stage!==1)return;this.stage=2,T.notify(this,Ft),this.view!==null&&this.view.unbind();let e=this.behaviors;if(e!==null)for(let o of e.keys())o.disconnectedCallback&&o.disconnectedCallback(this);this.stage=3}onAttributeChangedCallback(e,o,t){let a=this.definition.attributeLookup[e];a!==void 0&&a.onAttributeChangedCallback(this.source,t)}emit(e,o,t){return this.stage===1?this.source.dispatchEvent(new CustomEvent(e,Object.assign(Object.assign({detail:o},Ec),t))):!1}renderTemplate(e){var o;let t=this.source,a=(o=mo(t))!==null&&o!==void 0?o:t;if(this.view!==null)this.view.dispose(),this.view=null;else if(!this.needsInitialization||this.hasExistingShadowRoot){this.hasExistingShadowRoot=!1;for(let n=a.firstChild;n!==null;n=a.firstChild)a.removeChild(n)}e&&(this.view=e.render(t,a,t),this.view.sourceLifetime=ir.coupled)}static forCustomElement(e){let o=e.$fastController;if(o!==void 0)return o;let t=ie.getForInstance(e);if(t===void 0)throw b.error(1401);return e.$fastController=new on(e,t)}static setStrategy(e){on=e}};se(Qe);Qe.setStrategy(Qe);function ko(r){var e;return"adoptedStyleSheets"in r?r:(e=mo(r))!==null&&e!==void 0?e:r.getRootNode()}var So=class r{constructor(e){let o=r.styleSheetCache;this.sheets=e.map(t=>{if(t instanceof CSSStyleSheet)return t;let a=o.get(t);return a===void 0&&(a=new CSSStyleSheet,a.replaceSync(t),o.set(t,a)),a})}addStylesTo(e){nn(ko(e),this.sheets)}removeStylesFrom(e){ln(ko(e),this.sheets)}};So.styleSheetCache=new Map;var Vc=0,Wc=()=>`fast-${++Vc}`;function tn(r){return r===document?document.body:r}var yt=class{constructor(e){this.styles=e,this.styleClass=Wc()}addStylesTo(e){e=tn(ko(e));let o=this.styles,t=this.styleClass;for(let a=0;a<o.length;a++){let n=document.createElement("style");n.innerHTML=o[a],n.className=t,e.append(n)}}removeStylesFrom(e){e=tn(ko(e));let o=e.querySelectorAll(`.${this.styleClass}`);for(let t=0,a=o.length;t<a;++t)e.removeChild(o[t])}},nn=(r,e)=>{r.adoptedStyleSheets=[...r.adoptedStyleSheets,...e]},ln=(r,e)=>{r.adoptedStyleSheets=r.adoptedStyleSheets.filter(o=>e.indexOf(o)===-1)};if(re.supportsAdoptedStyleSheets){try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),nn=(r,e)=>{r.adoptedStyleSheets.push(...e)},ln=(r,e)=>{for(let o of e){let t=r.adoptedStyleSheets.indexOf(o);t!==-1&&r.adoptedStyleSheets.splice(t,1)}}}catch{}re.setDefaultStrategy(So)}else re.setDefaultStrategy(yt);function sn(r){let e=class extends r{constructor(){super(),Qe.forCustomElement(this)}$emit(o,t,a){return this.$fastController.emit(o,t,a)}connectedCallback(){this.$fastController.connect()}disconnectedCallback(){this.$fastController.disconnect()}attributeChangedCallback(o,t,a){this.$fastController.onAttributeChangedCallback(o,t,a)}};return ie.registerBaseType(e),e}function jc(r,e){return W(r)?ie.compose(r,e):ie.compose(this,r)}function cn(r,e){return W(r)?ie.compose(r,e).define().type:ie.compose(this,r).define().type}function Gc(r){return sn(r)}var P=Object.assign(sn(HTMLElement),{from:Gc,define:cn,compose:jc});function N(r){return function(e){cn(e,r)}}var Pt=new Map;"metadata"in Reflect||(Reflect.metadata=function(r,e){return function(o){Reflect.defineMetadata(r,e,o)}},Reflect.defineMetadata=function(r,e,o){let t=Pt.get(o);t===void 0&&Pt.set(o,t=new Map),t.set(r,e)},Reflect.getOwnMetadata=function(r,e){let o=Pt.get(e);if(o!==void 0)return o.get(r)});var dn="annotation:paramtypes",Xc="design:paramtypes",Ce=Object.freeze({getDesignParamTypes:r=>{var e;return(e=Reflect.getOwnMetadata(Xc,r))!==null&&e!==void 0?e:C},getAnnotationParamTypes:r=>{var e;return(e=Reflect.getOwnMetadata(dn,r))!==null&&e!==void 0?e:C},getOrCreateAnnotationParamTypes(r){let e=this.getAnnotationParamTypes(r);return e===C&&Reflect.defineMetadata(dn,e=[],r),e}});var un=new Map,Fo="context-request",xt,oe=Object.freeze({eventType:Fo,for(r){let e=un.get(r);return e===void 0&&(e=oe.create(r),un.set(r,e)),e},create(r,e){let o=function(t,a,n){if(t==null||new.target!==void 0)throw b.error(1501,{name:o.name});if(a)oe.defineProperty(t,a,o);else{let s=Ce.getOrCreateAnnotationParamTypes(t);s[n]=o}};return o.$isInterface=!0,o.initialValue=e,Reflect.defineProperty(o,"name",{value:r}),o.handle=(t,a)=>oe.handle(t,a,o),o.provide=(t,a)=>oe.provide(t,o,a),o.get=t=>oe.get(t,o),o.request=(t,a,n)=>oe.request(t,o,a,n),o.toString=()=>`Context<${o.name}>`,o},setDefaultRequestStrategy(r){xt=r},get(r,e){var o;let t;return xt(r,e,a=>t=a,!1),(o=t)!==null&&o!==void 0?o:e.initialValue},request(r,e,o,t=!1){xt(r,e,o,t)},dispatch(r,e,o,t=!1){r.dispatchEvent(new Nt(e,o,t))},provide(r,e,o){oe.handle(r,t=>{t.stopImmediatePropagation(),t.callback(o)},e)},handle(r,e,o){o?r.addEventListener(Fo,t=>{t.context===o&&e(t)}):r.addEventListener(Fo,e)},defineProperty(r,e,o){let t=Symbol.for(`fast:di:${e}`);Reflect.defineProperty(r,e,{get:function(){var a;return(a=this[t])!==null&&a!==void 0?a:this[t]=oe.get(this,o)}})}});oe.setDefaultRequestStrategy(oe.dispatch);var Nt=class extends Event{constructor(e,o,t){super(Fo,{bubbles:!0,composed:!0}),this.context=e,this.callback=o,this.multiple=t}};var Ot=function(r,e,o,t){function a(n){return n instanceof o?n:new o(function(s){s(n)})}return new(o||(o=Promise))(function(n,s){function i(l){try{c(t.next(l))}catch(u){s(u)}}function d(l){try{c(t.throw(l))}catch(u){s(u)}}function c(l){l.done?n(l.value):a(l.value).then(i,d)}c((t=t.apply(r,e||[])).next())})},Tt=class{constructor(e,o){this.container=e,this.key=o}instance(e){return this.registerResolver(0,e)}singleton(e){return this.registerResolver(1,e)}transient(e){return this.registerResolver(2,e)}callback(e){return this.registerResolver(3,e)}cachedCallback(e){return this.registerResolver(3,bn(e))}aliasTo(e){return this.registerResolver(5,e)}registerResolver(e,o){let{container:t,key:a}=this;return this.container=this.key=void 0,t.registerResolver(a,new J(a,e,o))}};function zr(r){let e=r.slice(),o=Object.keys(r),t=o.length,a;for(let n=0;n<t;++n)a=o[n],mn(a)||(e[a]=r[a]);return e}var _c=Object.freeze({none(r){throw b.error(1512,{key:r})},singleton(r){return new J(r,1,r)},transient(r){return new J(r,2,r)}}),wt=Object.freeze({default:Object.freeze({parentLocator:()=>null,asyncRegistrationLocator:()=>Ot(void 0,void 0,void 0,function*(){return null}),responsibleForOwnerRequests:!1,defaultResolver:_c.singleton})});function Yc(r,e){let o=typeof r=="function"?r:e,t=typeof r=="string"?r:r&&"friendlyName"in r&&r.friendlyName||Ct,a=typeof r=="string"?!1:r&&"respectConnection"in r&&r.respectConnection||!1,n=function(s,i,d){if(s==null||new.target!==void 0)throw b.error(1501,{name:n.name});if(i)E.defineProperty(s,i,n,a);else{let c=Ce.getOrCreateAnnotationParamTypes(s);c[d]=n}};return n.$isInterface=!0,Reflect.defineProperty(n,"name",{value:t??Ct}),o!=null&&(n.register=function(s,i){return o(new Tt(s,i??n))}),n.toString=function(){return`DIContext<${n.name}>`},n}var gn=new Map,hn=null,pn=0,E=Object.freeze({installAsContextRequestStrategy(r){oe.setDefaultRequestStrategy((e,o,t)=>{let a=E.findResponsibleContainer(e,r);t(a.get(o))})},createContainer(r){return new Vr(null,Object.assign({},wt.default,r))},findResponsibleContainer(r,e){let o=r.$$container$$;return o&&o.responsibleForOwnerRequests?o:E.findParentContainer(r,e)},findParentContainer(r,e){if(pn<1)return e?e():E.getOrCreateDOMContainer();let o;return oe.dispatch(r,qc,t=>o=t),o??(e?e():E.getOrCreateDOMContainer())},getOrCreateDOMContainer(r,e){if(!r)return hn||(hn=new Vr(typeof window<"u"?window:null,Object.assign({},wt.default,e,{parentLocator:()=>null})));let o=r.$$container$$;return o===void 0&&(pn++,o=new Vr(r,Object.assign({},wt.default,e,{parentLocator:E.findParentContainer}))),o},getDependencies(r){let e=gn.get(r);if(e===void 0){let o=r.inject;if(o===void 0){let t=Ce.getDesignParamTypes(r),a=Ce.getAnnotationParamTypes(r);if(t===C)if(a===C){let n=Object.getPrototypeOf(r);typeof n=="function"&&n!==Function.prototype?e=zr(E.getDependencies(n)):e=[]}else e=zr(a);else if(a===C)e=zr(t);else{e=zr(t);let n=a.length,s;for(let c=0;c<n;++c)s=a[c],s!==void 0&&(e[c]=s);let i=Object.keys(a);n=i.length;let d;for(let c=0;c<n;++c)d=i[c],mn(d)||(e[d]=a[d])}}else e=zr(o);gn.set(r,e)}return e},defineProperty(r,e,o,t=!1){let a=Symbol.for(`fast:di:${e}`);Reflect.defineProperty(r,e,{get:function(){let n=this[a];if(n===void 0&&(n=(this instanceof Node?E.findResponsibleContainer(this):E.getOrCreateDOMContainer()).get(o),this[a]=n,t)){let i=this.$fastController;if(!i)throw b.error(1514);let d=()=>{let l=E.findResponsibleContainer(this).get(o),u=this[a];l!==u&&(this[a]=n,i.notify(e))};i.subscribe({handleChange:d},"isConnected")}return n}})},createContext:Yc,inject(...r){return function(e,o,t){if(typeof t=="number"){let a=Ce.getOrCreateAnnotationParamTypes(e),n=r[0];n!==void 0&&(a[t]=n)}else if(o)E.defineProperty(e,o,r[0]);else{let a=t?Ce.getOrCreateAnnotationParamTypes(t.value):Ce.getOrCreateAnnotationParamTypes(e),n;for(let s=0;s<r.length;++s)n=r[s],n!==void 0&&(a[s]=n)}}},transient(r){return r.register=function(o){return Dt.transient(r,r).register(o)},r.registerInRequestor=!1,r},singleton(r,e=Uc){return r.register=function(t){return Dt.singleton(r,r).register(t)},r.registerInRequestor=e.scoped,r}}),$t=E.createContext("Container"),qc=$t;function xo(r){return function(e){let o=function(t,a,n){E.inject(o)(t,a,n)};return o.$isResolver=!0,o.resolve=function(t,a){return r(e,t,a)},o}}var Je=E.inject;var Uc={scoped:!1};function Kc(r){return function(e,o){o=!!o;let t=function(a,n,s){E.inject(t)(a,n,s)};return t.$isResolver=!0,t.resolve=function(a,n){return r(e,a,n,o)},t}}var Yp=Kc((r,e,o,t)=>o.getAll(r,t)),qp=xo((r,e,o)=>()=>o.get(r)),Up=xo((r,e,o)=>{if(o.has(r,!0))return o.get(r)});function Rt(r,e,o){E.inject(Rt)(r,e,o)}Rt.$isResolver=!0;Rt.resolve=()=>{};var Kp=xo((r,e,o)=>{let t=Bn(r,e),a=new J(r,0,t);return o.registerResolver(r,a),t}),Qp=xo((r,e,o)=>Bn(r,e));function Bn(r,e){return e.getFactory(r).construct(e)}var J=class{constructor(e,o,t){this.key=e,this.strategy=o,this.state=t,this.resolving=!1}get $isResolver(){return!0}register(e){return e.registerResolver(this.key,this)}resolveAsync(e,o){switch(this.strategy){case 1:{if(this.resolving)throw b.error(1513,{name:this.state.name});return this.resolving=!0,e.getFactory(this.state).constructAsync(o).then(t=>(this.state=t,this.strategy=0,this.resolving=!1,t))}case 2:{let t=e.getFactory(this.state);if(t===null)throw b.error(1502,{key:this.key});return t.constructAsync(o)}default:return Promise.resolve(this.resolve(e,o))}}resolve(e,o){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw b.error(1513,{name:this.state.name});return this.resolving=!0,this.state=e.getFactory(this.state).construct(o),this.strategy=0,this.resolving=!1,this.state}case 2:{let t=e.getFactory(this.state);if(t===null)throw b.error(1502,{key:this.key});return t.construct(o)}case 3:return this.state(e,o,this);case 4:return this.state[0].resolve(e,o);case 5:return o.get(this.state);default:throw b.error(1503,{strategy:this.strategy})}}getFactory(e){var o,t,a;switch(this.strategy){case 1:case 2:return e.getFactory(this.state);case 5:return(a=(t=(o=e.getResolver(this.state))===null||o===void 0?void 0:o.getFactory)===null||t===void 0?void 0:t.call(o,e))!==null&&a!==void 0?a:null;default:return null}}};function Qc(r){return this.get(r)}function Jc(r,e){return e(r)}var It=class{constructor(e,o){this.Type=e,this.dependencies=o,this.transformers=null}constructAsync(e,o){return Ot(this,void 0,void 0,function*(){let t=yield Promise.all(this.dependencies.map(a=>e.getAsync(a)));return this.constructCore(t,o)})}construct(e,o){let t=this.dependencies.map(Qc,e);return this.constructCore(t,o)}constructCore(e,o){let t;return o===void 0?t=new this.Type(...e):t=new this.Type(...e,...o),this.transformers===null?t:this.transformers.reduce(Jc,t)}registerTransformer(e){(this.transformers||(this.transformers=[])).push(e)}},Zc={$isResolver:!0,resolve(r,e){return e},resolveAsync:function(r,e){return Promise.resolve(e)}};function Po(r){return typeof r.register=="function"}function ei(r){return Po(r)&&typeof r.registerInRequestor=="boolean"}function At(r){return ei(r)&&r.registerInRequestor}function ri(r){return r.prototype!==void 0}var oi=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),Lt=new Map,Vr=class r{constructor(e,o){this.owner=e,this.config=o,this._parent=void 0,this.registerDepth=0,this.isHandlingContextRequests=!1,this.resolvers=new Map,this.resolvers.set($t,Zc),e&&(e.$$container$$=this,"addEventListener"in e&&oe.handle(e,t=>{if(this.isHandlingContextRequests)try{let a=this.get(t.context);t.stopImmediatePropagation(),t.callback(a)}catch{}else t.context===$t&&t.composedPath()[0]!==this.owner&&(t.stopImmediatePropagation(),t.callback(this))}))}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}handleContextRequests(e){this.isHandlingContextRequests=e}register(...e){if(++this.registerDepth===100)throw b.error(1504);let o,t,a,n,s;for(let i=0,d=e.length;i<d;++i)if(o=e[i],!!fn(o))if(Po(o))o.register(this);else if(ri(o))Dt.singleton(o,o).register(this);else for(t=Object.keys(o),n=0,s=t.length;n<s;++n)a=o[t[n]],fn(a)&&(Po(a)?a.register(this):this.register(a));return--this.registerDepth,this}registerResolver(e,o){Er(e);let t=this.resolvers,a=t.get(e);return a==null?t.set(e,o):a instanceof J&&a.strategy===4?a.state.push(o):t.set(e,new J(e,4,[a,o])),o}registerTransformer(e,o){let t=this.getResolver(e);if(t==null)return!1;if(t.getFactory){let a=t.getFactory(this);return a==null?!1:(a.registerTransformer(o),!0)}return!1}getResolver(e,o=!0){if(Er(e),e.resolve!==void 0)return e;let t=this,a;for(;t!=null;)if(a=t.resolvers.get(e),a==null){if(t.parent==null){let n=At(e)?this:t;return o?this.jitRegister(e,n):null}t=t.parent}else return a;return null}has(e,o=!1){return this.resolvers.has(e)?!0:o&&this.parent!=null?this.parent.has(e,!0):!1}getAsync(e){return Ot(this,void 0,void 0,function*(){if(Er(e),e.$isResolver)return e.resolveAsync(this,this);let o=this,t;for(;o!=null;)if(t=o.resolvers.get(e),t==null){if(o.parent==null){let a=yield this.config.asyncRegistrationLocator(e);if(!a)throw b.error(1505,{key:e});let n=At(e)?this:o;return t=a.register(n),t.resolveAsync(o,this)}o=o.parent}else return t.resolveAsync(o,this);throw b.error(1505,{key:e})})}get(e){if(Er(e),e.$isResolver)return e.resolve(this,this);let o=this,t;for(;o!=null;)if(t=o.resolvers.get(e),t==null){if(o.parent==null){let a=At(e)?this:o;return t=this.jitRegister(e,a),t.resolve(o,this)}o=o.parent}else return t.resolve(o,this);throw b.error(1505,{key:e})}getAll(e,o=!1){Er(e);let t=this,a=t,n;if(o){let s=C;for(;a!=null;)n=a.resolvers.get(e),n!=null&&(s=s.concat(vn(n,a,t))),a=a.parent;return s}else for(;a!=null;)if(n=a.resolvers.get(e),n==null){if(a=a.parent,a==null)return C}else return vn(n,a,t);return C}getFactory(e){let o=Lt.get(e);if(o===void 0){if(ti(e))throw b.error(1506,{name:e.name});Lt.set(e,o=new It(e,E.getDependencies(e)))}return o}registerFactory(e,o){Lt.set(e,o)}createChild(e){return new r(null,Object.assign({},this.config,e,{parentLocator:()=>this}))}jitRegister(e,o){if(typeof e!="function")throw b.error(1507,{value:e});if(oi.has(e.name))throw b.error(1508,{value:e.name});if(Po(e)){let t=e.register(o);if(!(t instanceof Object)||t.resolve==null){let a=o.resolvers.get(e);if(a!=null)return a;throw b.error(1510)}return t}else{if(e.$isInterface)throw b.error(1509,{value:e.name});{let t=this.config.defaultResolver(e,o);return o.resolvers.set(e,t),t}}}},Ht=new WeakMap;function bn(r){return function(e,o,t){if(Ht.has(t))return Ht.get(t);let a=r(e,o,t);return Ht.set(t,a),a}}var Dt=Object.freeze({instance(r,e){return new J(r,0,e)},singleton(r,e){return new J(r,1,e)},transient(r,e){return new J(r,2,e)},callback(r,e){return new J(r,3,e)},cachedCallback(r,e){return new J(r,3,bn(e))},aliasTo(r,e){return new J(e,5,r)}});function Er(r){if(r==null)throw b.error(1511)}function vn(r,e,o){if(r instanceof J&&r.strategy===4){let t=r.state,a=t.length,n=new Array(a);for(;a--;)n[a]=t[a].resolve(e,o);return n}return[r.resolve(e,o)]}var Ct="(anonymous)";function fn(r){return typeof r=="object"&&r!==null||typeof r=="function"}var ti=function(){let r=new WeakMap,e=!1,o="",t=0;return function(a){return e=r.get(a),e===void 0&&(o=a.toString(),t=o.length,e=t>=29&&t<=100&&o.charCodeAt(t-1)===125&&o.charCodeAt(t-2)<=32&&o.charCodeAt(t-3)===93&&o.charCodeAt(t-4)===101&&o.charCodeAt(t-5)===100&&o.charCodeAt(t-6)===111&&o.charCodeAt(t-7)===99&&o.charCodeAt(t-8)===32&&o.charCodeAt(t-9)===101&&o.charCodeAt(t-10)===118&&o.charCodeAt(t-11)===105&&o.charCodeAt(t-12)===116&&o.charCodeAt(t-13)===97&&o.charCodeAt(t-14)===110&&o.charCodeAt(t-15)===88,r.set(a,e)),e}}(),yo={};function mn(r){switch(typeof r){case"number":return r>=0&&(r|0)===r;case"string":{let e=yo[r];if(e!==void 0)return e;let o=r.length;if(o===0)return yo[r]=!1;let t=0;for(let a=0;a<o;++a)if(t=r.charCodeAt(a),a===0&&t===48&&o>1||t<48||t>57)return yo[r]=!1;return yo[r]=!0}default:return!1}}var fr=class{constructor(){this.os="windows"}};v([L],fr.prototype,"os",2);var ze={borderRadiusLayerApp:"8px",borderRadiusLayerBase:"8px",borderRadiusLayerCard:"8px",borderRadiusLayerDialog:"8px",borderRadiusLayerFlyout:"8px",borderRadiusLayerPill:"99px"},Br={borderRadiusLarge:"8px"},Sn={...ze,borderRadiusLayerBase:"0px"},Fn={...Br},Ao={borderRadiusLayerApp:"12px",borderRadiusLayerBase:"16px",borderRadiusLayerCard:"12px",borderRadiusLayerDialog:"12px",borderRadiusLayerFlyout:"12px",borderRadiusLayerPill:"99px"},Lo={borderRadiusMedium:"8px",borderRadiusLarge:"8px",borderRadiusXLarge:"8px"},Ho={...ze,borderRadiusLayerApp:"12px",borderRadiusLayerBase:"16px"},Co={...Br},F={10:"#151B29",20:"#1A2338",30:"#202E4F",40:"#243966",50:"#264587",60:"#2551A8",70:"#235CCF",80:"#2169EB",90:"#3275F0",100:"#4082F5",110:"#4D8DFA",120:"#69A1FA",130:"#86B3FC",140:"#A7C9FC",150:"#C4DCFF",160:"#E0EDFF"},Ee={colorBrandForeground1Hover:F[70],colorBrandForeground1Pressed:F[60],colorBrandForeground1Selected:F[80],colorBrandForeground2Selected:F[70],colorBrandStroke:F[80],colorBrandStrokeHover:F[70],colorBrandStrokePressed:F[60],colorLabelBerry:"#C239B3",colorLabelBlue:"#296EEB",colorLabelBrass:"#986F0B",colorLabelHotPink:"#E3008C",colorLabelMink:"#706D6B",colorLabelPumpkin:"#CA5010",colorLabelPurple:"#8230FF",colorLabelRoyalBlue:"#004E8C",colorLabelTeal:"#038387",colorLayerBackgroundApp:"#FFFFFF80",colorLayerBackgroundBase:"#FFFFFF80",colorLayerBackgroundCard:"#FFFFFF80",colorLayerBackgroundDialog:"#FFFFFF",colorLayerBackgroundTooltip:"#FFFFFF",colorLayerBackgroundTooltipStaticInverted:"#333333",colorLayerStrokeBase:"#75757566",colorLayerStrokeFlyout:"#0000000F",colorNeutralBackgroundFloating:"#FFFFFF",colorNeutralBackgroundFloatingDisabled:"#F0F0F0",colorNeutralBackgroundFloatingHover:"#F5F5F5",colorNeutralBackgroundFloatingPressed:"#E0E0E0",colorNeutralBackgroundFloatingSelected:"#F0F0F0",colorNeutralBackgroundTabActive:"#FFFFFFD9",colorNeutralBackgroundTabHover:"#0000000D",colorNeutralForegroundDisabledOnBrand:"#FFFFFF85",colorNeutralForegroundHint:"#0000008F",colorNeutralForegroundOnLabel:"#FFFFFF"},jr={colorLayerBackgroundApp:"#FAFAFA",colorLayerBackgroundBase:"#F0F0F0",colorLayerBackgroundCard:"#FFFFFF"},Ze={colorBrandForeground2Pressed:F[40],colorNeutralBackground1:"#FFFFFFB3",colorNeutralBackground1Hover:"#0000000A",colorNeutralBackground1Pressed:"#0000001F",colorNeutralBackground1Selected:"#00000014",colorNeutralBackground2:"#00000005",colorNeutralBackground2Hover:"#0000000F",colorNeutralBackground2Pressed:"#00000024",colorNeutralBackground2Selected:"#00000019",colorNeutralBackground3:"#0000000A",colorNeutralBackground3Hover:"#00000014",colorNeutralBackground3Pressed:"#00000029",colorNeutralBackground3Selected:"#0000001F",colorNeutralBackground4:"#0000000F",colorNeutralBackground5:"#00000014",colorNeutralBackgroundDisabled:"#0000000F",colorNeutralForeground1:"#000000DB",colorNeutralForeground1Hover:"#000000DB",colorNeutralForeground1Pressed:"#000000DB",colorNeutralForeground1Selected:"#000000DB",colorNeutralForeground2:"#000000BD",colorNeutralForeground2Hover:"#000000DB",colorNeutralForeground2Pressed:"#000000DB",colorNeutralForeground2Selected:"#000000DB",colorNeutralForeground3:"#0000009e",colorNeutralForeground3Hover:"#0000009e",colorNeutralForeground3Pressed:"#0000009e",colorNeutralForeground3Selected:"#0000009e",colorNeutralForeground4:"#0000008F",colorNeutralForegroundDisabled:"#00000042",colorNeutralForegroundInvertedDisabled:"#FFFFFF66",colorNeutralForegroundStaticInverted:"#FFFFFF",colorNeutralStroke1:"#0000002E",colorNeutralStroke1Hover:"#00000038",colorNeutralStroke1Pressed:"#0000004C",colorNeutralStroke1Selected:"#00000042",colorNeutralStroke2:"#0000001F",colorNeutralStroke3:"#0000000F",colorNeutralStrokeAccessible:"#0000009E",colorNeutralStrokeAccessibleHover:"#000000A8",colorNeutralStrokeAccessiblePressed:"#000000B2",colorNeutralStrokeDisabled:"#0000001F",colorNeutralStrokeInvertedDisabled:"#FFFFFF66",colorNeutralStrokeOnBrand:"#FFFFFF",colorNeutralStrokeOnBrand2:"#FFFFFF",colorNeutralStrokeOnBrand2Hover:"#FFFFFF",colorNeutralStrokeOnBrand2Pressed:"#FFFFFF",colorNeutralStrokeOnBrand2Selected:"#FFFFFF",colorStrokeFocus1:"#FFFFFF",colorSubtleBackground:"#00000000",colorSubtleBackgroundHover:"#0000000A",colorSubtleBackgroundPressed:"#00000006",colorSubtleBackgroundSelected:"#00000014"},Ve={colorBrandForeground1Hover:F[120],colorBrandForeground1Pressed:F[130],colorBrandForeground1Selected:F[110],colorBrandForeground2Selected:F[120],colorBrandStroke:F[110],colorBrandStrokeHover:F[120],colorBrandStrokePressed:F[130],colorLabelBerry:"#CF87DA",colorLabelBlue:"#69A1FA",colorLabelBrass:"#C1A256",colorLabelHotPink:"#EE5FB7",colorLabelMink:"#84817E",colorLabelPumpkin:"#DF8E64",colorLabelPurple:"#B696FF",colorLabelRoyalBlue:"#4A89BA",colorLabelTeal:"#4CB4B7",colorLayerBackgroundApp:"#3A3A3A4D",colorLayerBackgroundBase:"#3A3A3A5E",colorLayerBackgroundCard:"#FFFFFF0D",colorLayerBackgroundDialog:"#292929",colorLayerBackgroundTooltip:"#292929",colorLayerBackgroundTooltipStaticInverted:"#3D3D3D",colorLayerStrokeBase:"#75757566",colorLayerStrokeFlyout:"#00000033",colorNeutralBackgroundTabActive:"#FFFFFF22",colorNeutralBackgroundTabHover:"#FFFFFF0F",colorNeutralForegroundDisabledOnBrand:"#FFFFFF3D",colorNeutralForegroundHint:"#FFFFFF85",colorNeutralForegroundOnLabel:"#000000e5",colorNeutralBackgroundFloating:"#292929",colorNeutralBackgroundFloatingHover:"#3D3D3D",colorNeutralBackgroundFloatingPressed:"#1F1F1F",colorNeutralBackgroundFloatingSelected:"#1F1F1F",colorNeutralBackgroundFloatingDisabled:"#141414"},Gr={colorLayerBackgroundCard:"#292929",colorLayerBackgroundApp:"#1F1F1F",colorLayerBackgroundBase:"#0A0A0A"},er={colorBrandBackground2:F[40],colorBrandForeground1:F[110],colorBrandForeground2:F[120],colorBrandForeground2Pressed:F[110],colorBrandForegroundLink:F[110],colorBrandForegroundLinkHover:F[120],colorBrandForegroundLinkSelected:F[110],colorNeutralBackground1:"#FFFFFF0B",colorNeutralBackground1Hover:"#FFFFFF22",colorNeutralBackground1Pressed:"#FFFFFF00",colorNeutralBackground1Selected:"#FFFFFF1C",colorNeutralBackground2:"#3A3A3A4D",colorNeutralBackground2Hover:"#3A3A3ABF",colorNeutralBackground2Pressed:"#3A3A3A57",colorNeutralBackground2Selected:"#3A3A3AC9",colorNeutralBackground3:"#3A3A3A4D",colorNeutralBackground3Hover:"#3A3A3AB3",colorNeutralBackground3Pressed:"#3A3A3A2E",colorNeutralBackground3Selected:"#3A3A3A9E",colorNeutralBackground4:"#3A3A3A2E",colorNeutralBackgroundDisabled:"#3A3A3A4D",colorNeutralForeground1:"#FFFFFF",colorNeutralForeground1Hover:"#FFFFFF",colorNeutralForeground1Pressed:"#FFFFFF",colorNeutralForeground1Selected:"#FFFFFF",colorNeutralForeground2:"#FFFFFFD6",colorNeutralForeground2Hover:"#FFFFFF",colorNeutralForeground2Pressed:"#FFFFFF",colorNeutralForeground2Selected:"#FFFFFF",colorNeutralForeground3:"#FFFFFFAD",colorNeutralForeground3Hover:"#FFFFFFD6",colorNeutralForeground3Pressed:"#FFFFFFD6",colorNeutralForeground3Selected:"#FFFFFFD6",colorNeutralForeground4:"#FFFFFF85",colorNeutralForegroundDisabled:"#FFFFFF3D",colorNeutralForegroundInvertedDisabled:"#FFFFFF66",colorNeutralForegroundStaticInverted:"#FFFFFF",colorNeutralStroke1:"#FFFFFF49",colorNeutralStroke1Hover:"#FFFFFF75",colorNeutralStroke1Pressed:"#FFFFFF6B",colorNeutralStroke1Selected:"#FFFFFF70",colorNeutralStroke2:"#FFFFFF31",colorNeutralStroke3:"#FFFFFF3D",colorNeutralStrokeAccessible:"#FFFFFF",colorNeutralStrokeAccessibleHover:"#FFFFFF",colorNeutralStrokeAccessiblePressed:"#FFFFFF",colorNeutralStrokeDisabled:"#FFFFFF42",colorNeutralStrokeOnBrand2:"#FFFFFF",colorNeutralStrokeOnBrand2Hover:"#FFFFFF",colorNeutralStrokeOnBrand2Pressed:"#FFFFFF",colorNeutralStrokeOnBrand2Selected:"#FFFFFF",colorStrokeFocus2:"#FFFFFF",colorSubtleBackground:"#FFFFFF00",colorSubtleBackgroundHover:"#FFFFFF10",colorSubtleBackgroundPressed:"#FFFFFF0B",colorSubtleBackgroundSelected:"#FFFFFF22"},Mt={acrylicBackdropFilter:"blur(30px) saturate(150%)",acrylicBackgroundBlendMode:"luminosity",acrylicBackgroundColor:"#F0F0F0B9",acrylicBackgroundImage:"none",micaBackdropFilter:"blur(120px) saturate(150%)",micaBackgroundBlendMode:"luminosity",micaBackgroundColor:"#F0F0F0B9",micaBackgroundImage:"none",micaInactiveBackgroundColor:"#E5E5E5D9"},Xr={acrylicBackdropFilter:"none",acrylicBackgroundBlendMode:"normal",acrylicBackgroundColor:"#F5F5F5",acrylicBackgroundImage:"none",micaBackdropFilter:"none",micaBackgroundBlendMode:"normal",micaBackgroundColor:"#F0F0F0",micaBackgroundImage:"none",micaInactiveBackgroundColor:"#F3F3F3"},zt={acrylicBackdropFilter:"blur(30px) saturate(150%)",acrylicBackgroundBlendMode:"color, luminosity",acrylicBackgroundColor:"#141414B9",acrylicBackgroundImage:"linear-gradient(0deg, #2C2C2C26, #2C2C2C26), none",micaBackdropFilter:"blur(120px) saturate(150%)",micaBackgroundBlendMode:"color, luminosity",micaBackgroundColor:"#141414B9",micaBackgroundImage:"linear-gradient(0deg, #2C2C2C26, #2C2C2C26), none",micaInactiveBackgroundColor:"#202020D9"},_r={acrylicBackdropFilter:"none",acrylicBackgroundBlendMode:"normal",acrylicBackgroundColor:"#141414",acrylicBackgroundImage:"none",micaBackdropFilter:"none",micaBackgroundBlendMode:"normal",micaBackgroundColor:"#0A0A0A",micaBackgroundImage:"none",micaInactiveBackgroundColor:"#202020"},We={shadowBaseX:"0px",shadowDiffuseX:"0px",shadow2BaseY:"0px",shadow2BaseBlur:"2px",shadow2DiffuseY:"1px",shadow2DiffuseBlur:"2px",shadow4BaseY:"0px",shadow4BaseBlur:"2px",shadow4DiffuseY:"2px",shadow4DiffuseBlur:"4px",shadow8BaseY:"0px",shadow8BaseBlur:"2px",shadow8DiffuseY:"4px",shadow8DiffuseBlur:"8px",shadow16BaseY:"0px",shadow16BaseBlur:"8px",shadow16DiffuseY:"8px",shadow16DiffuseBlur:"16px",shadow28BaseY:"0px",shadow28BaseBlur:"8px",shadow28DiffuseY:"14px",shadow28DiffuseBlur:"28px",shadow64BaseY:"0px",shadow64BaseBlur:"8px",shadow64DiffuseY:"32px",shadow64DiffuseBlur:"64px",shadowBaseLayer:"0px 2px 21px 0px rgba(0, 0, 0, 0.22), 0px 32px 64px 0px rgba(0, 0, 0, 0.28)",shadowBaseLayerInactive:"0px 2px 10.67px 0px rgba(0, 0, 0, 0.15), 0px 16px 32px 0px rgba(0, 0, 0, 0.19)",shadowBaseLayerBaseY:"2px",shadowBaseLayerBaseBlur:"21px",shadowBaseLayerDiffuseY:"32px",shadowBaseLayerDiffuseBlur:"64px"},je={shadowBaseX:"0px",shadowDiffuseX:"0px",shadow2BaseY:"0px",shadow2BaseBlur:"2px",shadow2DiffuseY:"1px",shadow2DiffuseBlur:"2px",shadow4BaseY:"0px",shadow4BaseBlur:"2px",shadow4DiffuseY:"2px",shadow4DiffuseBlur:"4px",shadow8BaseY:"0px",shadow8BaseBlur:"2px",shadow8DiffuseY:"4px",shadow8DiffuseBlur:"8px",shadow16BaseY:"0px",shadow16BaseBlur:"8px",shadow16DiffuseY:"8px",shadow16DiffuseBlur:"16px",shadow28BaseY:"0px",shadow28BaseBlur:"8px",shadow28DiffuseY:"14px",shadow28DiffuseBlur:"28px",shadow64BaseY:"0px",shadow64BaseBlur:"8px",shadow64DiffuseY:"32px",shadow64DiffuseBlur:"64px",shadowBaseLayer:"0px 2px 21px 0px rgba(0, 0, 0, 0.55), 0px 32px 64px 0px rgba(0, 0, 0, 0.56)",shadowBaseLayerInactive:"0px 2px 10.67px 0px rgba(0, 0, 0, 0.37), 0px 16px 32px 0px rgba(0, 0, 0, 0.37)",shadowBaseLayerBaseY:"2px",shadowBaseLayerBaseBlur:"21px",shadowBaseLayerDiffuseY:"32px",shadowBaseLayerDiffuseBlur:"64px"},g={2:"#050505",4:"#0a0a0a",6:"#0f0f0f",8:"#141414",10:"#1a1a1a",12:"#1f1f1f",14:"#242424",16:"#292929",18:"#2e2e2e",20:"#333333",22:"#383838",24:"#3d3d3d",26:"#424242",28:"#474747",30:"#4d4d4d",32:"#525252",34:"#575757",36:"#5c5c5c",38:"#616161",40:"#666666",42:"#6b6b6b",44:"#707070",46:"#757575",48:"#7a7a7a",50:"#808080",52:"#858585",54:"#8a8a8a",56:"#8f8f8f",58:"#949494",60:"#999999",62:"#9e9e9e",64:"#a3a3a3",66:"#a8a8a8",68:"#adadad",70:"#b3b3b3",72:"#b8b8b8",74:"#bdbdbd",76:"#c2c2c2",78:"#c7c7c7",80:"#cccccc",82:"#d1d1d1",84:"#d6d6d6",86:"#dbdbdb",88:"#e0e0e0",90:"#e6e6e6",92:"#ebebeb",94:"#f0f0f0",96:"#f5f5f5",98:"#fafafa"},G={5:"rgba(255, 255, 255, 0.05)",10:"rgba(255, 255, 255, 0.1)",20:"rgba(255, 255, 255, 0.2)",30:"rgba(255, 255, 255, 0.3)",40:"rgba(255, 255, 255, 0.4)",50:"rgba(255, 255, 255, 0.5)",60:"rgba(255, 255, 255, 0.6)",70:"rgba(255, 255, 255, 0.7)",80:"rgba(255, 255, 255, 0.8)",90:"rgba(255, 255, 255, 0.9)"},de={5:"rgba(0, 0, 0, 0.05)",10:"rgba(0, 0, 0, 0.1)",20:"rgba(0, 0, 0, 0.2)",30:"rgba(0, 0, 0, 0.3)",40:"rgba(0, 0, 0, 0.4)",50:"rgba(0, 0, 0, 0.5)",60:"rgba(0, 0, 0, 0.6)",70:"rgba(0, 0, 0, 0.7)",80:"rgba(0, 0, 0, 0.8)",90:"rgba(0, 0, 0, 0.9)"},ai={5:"rgba(26, 26, 26, 0.05)",10:"rgba(26, 26, 26, 0.1)",20:"rgba(26, 26, 26, 0.2)",30:"rgba(26, 26, 26, 0.3)",40:"rgba(26, 26, 26, 0.4)",50:"rgba(26, 26, 26, 0.5)",60:"rgba(26, 26, 26, 0.6)",70:"rgba(26, 26, 26, 0.7)",80:"rgba(26, 26, 26, 0.8)",90:"rgba(26, 26, 26, 0.9)"},ni={5:"rgba(31, 31, 31, 0.05)",10:"rgba(31, 31, 31, 0.1)",20:"rgba(31, 31, 31, 0.2)",30:"rgba(31, 31, 31, 0.3)",40:"rgba(31, 31, 31, 0.4)",50:"rgba(31, 31, 31, 0.5)",60:"rgba(31, 31, 31, 0.6)",70:"rgba(31, 31, 31, 0.7)",80:"rgba(31, 31, 31, 0.8)",90:"rgba(31, 31, 31, 0.9)"},kn={5:"rgba(36, 36, 36, 0.05)",10:"rgba(36, 36, 36, 0.1)",20:"rgba(36, 36, 36, 0.2)",30:"rgba(36, 36, 36, 0.3)",40:"rgba(36, 36, 36, 0.4)",50:"rgba(36, 36, 36, 0.5)",60:"rgba(36, 36, 36, 0.6)",70:"rgba(36, 36, 36, 0.7)",80:"rgba(36, 36, 36, 0.8)",90:"rgba(36, 36, 36, 0.9)"},k="#ffffff",No="#000000";var Et="#1aebff";var Wr="#000000",V="#ffffff";var li={shade50:"#130204",shade40:"#230308",shade30:"#420610",shade20:"#590815",shade10:"#690a19",primary:"#750b1c",tint10:"#861b2c",tint20:"#962f3f",tint30:"#ac4f5e",tint40:"#d69ca5",tint50:"#e9c7cd",tint60:"#f9f0f2"},yn={shade50:"#200205",shade40:"#3b0509",shade30:"#6e0811",shade20:"#960b18",shade10:"#b10e1c",primary:"#c50f1f",tint10:"#cc2635",tint20:"#d33f4c",tint30:"#dc626d",tint40:"#eeacb2",tint50:"#f6d1d5",tint60:"#fdf3f4"},si={shade50:"#210809",shade40:"#3f1011",shade30:"#751d1f",shade20:"#9f282b",shade10:"#bc2f32",primary:"#d13438",tint10:"#d7494c",tint20:"#dc5e62",tint30:"#e37d80",tint40:"#f1bbbc",tint50:"#f8dadb",tint60:"#fdf6f6"},ci={shade50:"#230900",shade40:"#411200",shade30:"#7a2101",shade20:"#a62d01",shade10:"#c43501",primary:"#da3b01",tint10:"#de501c",tint20:"#e36537",tint30:"#e9835e",tint40:"#f4bfab",tint50:"#f9dcd1",tint60:"#fdf6f3"},ii={shade50:"#200d03",shade40:"#3d1805",shade30:"#712d09",shade20:"#9a3d0c",shade10:"#b6480e",primary:"#ca5010",tint10:"#d06228",tint20:"#d77440",tint30:"#df8e64",tint40:"#efc4ad",tint50:"#f7dfd2",tint60:"#fdf7f4"},di={shade50:"#271002",shade40:"#4a1e04",shade30:"#8a3707",shade20:"#bc4b09",shade10:"#de590b",primary:"#f7630c",tint10:"#f87528",tint20:"#f98845",tint30:"#faa06b",tint40:"#fdcfb4",tint50:"#fee5d7",tint60:"#fff9f5"},ui={shade50:"#291600",shade40:"#4d2a00",shade30:"#8f4e00",shade20:"#c26a00",shade10:"#e67e00",primary:"#ff8c00",tint10:"#ff9a1f",tint20:"#ffa83d",tint30:"#ffba66",tint40:"#ffddb3",tint50:"#ffedd6",tint60:"#fffaf5"},gi={shade50:"#251a00",shade40:"#463100",shade30:"#835b00",shade20:"#b27c00",shade10:"#d39300",primary:"#eaa300",tint10:"#edad1c",tint20:"#efb839",tint30:"#f2c661",tint40:"#f9e2ae",tint50:"#fcefd3",tint60:"#fefbf4"},hi={primary:"#fde300",shade10:"#e4cc00",shade20:"#c0ad00",shade30:"#817400",shade40:"#4c4400",shade50:"#282400",tint10:"#fde61e",tint20:"#fdea3d",tint30:"#feee66",tint40:"#fef7b2",tint50:"#fffad6",tint60:"#fffef5"},pi={shade50:"#1f1900",shade40:"#3a2f00",shade30:"#6c5700",shade20:"#937700",shade10:"#ae8c00",primary:"#c19c00",tint10:"#c8a718",tint20:"#d0b232",tint30:"#dac157",tint40:"#ecdfa5",tint50:"#f5eece",tint60:"#fdfbf2"},vi={shade50:"#181202",shade40:"#2e2103",shade30:"#553e06",shade20:"#745408",shade10:"#89640a",primary:"#986f0b",tint10:"#a47d1e",tint20:"#b18c34",tint30:"#c1a256",tint40:"#e0cea2",tint50:"#efe4cb",tint60:"#fbf8f2"},fi={shade50:"#170e07",shade40:"#2b1a0e",shade30:"#50301a",shade20:"#6c4123",shade10:"#804d29",primary:"#8e562e",tint10:"#9c663f",tint20:"#a97652",tint30:"#bb8f6f",tint40:"#ddc3b0",tint50:"#edded3",tint60:"#faf7f4"},Bi={shade50:"#0c1501",shade40:"#162702",shade30:"#294903",shade20:"#376304",shade10:"#427505",primary:"#498205",tint10:"#599116",tint20:"#6ba02b",tint30:"#85b44c",tint40:"#bdd99b",tint50:"#dbebc7",tint60:"#f6faf0"},bi={shade50:"#002111",shade40:"#003d20",shade30:"#00723b",shade20:"#009b51",shade10:"#00b85f",primary:"#00cc6a",tint10:"#19d279",tint20:"#34d889",tint30:"#5ae0a0",tint40:"#a8f0cd",tint50:"#cff7e4",tint60:"#f3fdf8"},mi={shade50:"#031a02",shade40:"#063004",shade30:"#0b5a08",shade20:"#0e7a0b",shade10:"#11910d",primary:"#13a10e",tint10:"#27ac22",tint20:"#3db838",tint30:"#5ec75a",tint40:"#a7e3a5",tint50:"#cef0cd",tint60:"#f2fbf2"},Pn={shade50:"#031403",shade40:"#052505",shade30:"#094509",shade20:"#0c5e0c",shade10:"#0e700e",primary:"#107c10",tint10:"#218c21",tint20:"#359b35",tint30:"#54b054",tint40:"#9fd89f",tint50:"#c9eac9",tint60:"#f1faf1"},ki={shade50:"#021102",shade40:"#032003",shade30:"#063b06",shade20:"#085108",shade10:"#0a5f0a",primary:"#0b6a0b",tint10:"#1a7c1a",tint20:"#2d8e2d",tint30:"#4da64d",tint40:"#9ad29a",tint50:"#c6e7c6",tint60:"#f0f9f0"},Si={shade50:"#001d1f",shade40:"#00373a",shade30:"#00666d",shade20:"#008b94",shade10:"#00a5af",primary:"#00b7c3",tint10:"#18bfca",tint20:"#32c8d1",tint30:"#58d3db",tint40:"#a6e9ed",tint50:"#cef3f5",tint60:"#f2fcfd"},Fi={shade50:"#001516",shade40:"#012728",shade30:"#02494c",shade20:"#026467",shade10:"#037679",primary:"#038387",tint10:"#159195",tint20:"#2aa0a4",tint30:"#4cb4b7",tint40:"#9bd9db",tint50:"#c7ebec",tint60:"#f0fafa"},yi={shade50:"#000f12",shade40:"#001b22",shade30:"#00333f",shade20:"#004555",shade10:"#005265",primary:"#005b70",tint10:"#0f6c81",tint20:"#237d92",tint30:"#4496a9",tint40:"#94c8d4",tint50:"#c3e1e8",tint60:"#eff7f9"},Pi={shade50:"#001322",shade40:"#002440",shade30:"#004377",shade20:"#005ba1",shade10:"#006cbf",primary:"#0078d4",tint10:"#1a86d9",tint20:"#3595de",tint30:"#5caae5",tint40:"#a9d3f2",tint50:"#d0e7f8",tint60:"#f3f9fd"},xi={shade50:"#000c16",shade40:"#00172a",shade30:"#002c4e",shade20:"#003b6a",shade10:"#00467e",primary:"#004e8c",tint10:"#125e9a",tint20:"#286fa8",tint30:"#4a89ba",tint40:"#9abfdc",tint50:"#c7dced",tint60:"#f0f6fa"},Ni={shade50:"#0d1126",shade40:"#182047",shade30:"#2c3c85",shade20:"#3c51b4",shade10:"#4760d5",primary:"#4f6bed",tint10:"#637cef",tint20:"#778df1",tint30:"#93a4f4",tint40:"#c8d1fa",tint50:"#e1e6fc",tint60:"#f7f9fe"},wi={shade50:"#00061d",shade40:"#000c36",shade30:"#001665",shade20:"#001e89",shade10:"#0023a2",primary:"#0027b4",tint10:"#173bbd",tint20:"#3050c6",tint30:"#546fd2",tint40:"#a3b2e8",tint50:"#ccd5f3",tint60:"#f2f4fc"},Ai={shade50:"#120f25",shade40:"#221d46",shade30:"#3f3682",shade20:"#5649b0",shade10:"#6656d1",primary:"#7160e8",tint10:"#8172eb",tint20:"#9184ee",tint30:"#a79cf1",tint40:"#d2ccf8",tint50:"#e7e4fb",tint60:"#f9f8fe"},Li={shade50:"#0f0717",shade40:"#1c0e2b",shade30:"#341a51",shade20:"#46236e",shade10:"#532982",primary:"#5c2e91",tint10:"#6b3f9e",tint20:"#7c52ab",tint30:"#9470bd",tint40:"#c6b1de",tint50:"#e0d3ed",tint60:"#f7f4fb"},Hi={shade50:"#160418",shade40:"#29072e",shade30:"#4c0d55",shade20:"#671174",shade10:"#7a1589",primary:"#881798",tint10:"#952aa4",tint20:"#a33fb1",tint30:"#b55fc1",tint40:"#d9a7e0",tint50:"#eaceef",tint60:"#faf2fb"},Ci={shade50:"#1f091d",shade40:"#3a1136",shade30:"#6d2064",shade20:"#932b88",shade10:"#af33a1",primary:"#c239b3",tint10:"#c94cbc",tint20:"#d161c4",tint30:"#da7ed0",tint40:"#edbbe7",tint50:"#f5daf2",tint60:"#fdf5fc"},Ti={shade50:"#1c0b1f",shade40:"#35153a",shade30:"#63276d",shade20:"#863593",shade10:"#9f3faf",primary:"#b146c2",tint10:"#ba58c9",tint20:"#c36bd1",tint30:"#cf87da",tint40:"#e6bfed",tint50:"#f2dcf5",tint60:"#fcf6fd"},$i={shade50:"#24091b",shade40:"#441232",shade30:"#80215d",shade20:"#ad2d7e",shade10:"#cd3595",primary:"#e43ba6",tint10:"#e750b0",tint20:"#ea66ba",tint30:"#ef85c8",tint40:"#f7c0e3",tint50:"#fbddf0",tint60:"#fef6fb"},Ii={shade50:"#1f0013",shade40:"#390024",shade30:"#6b0043",shade20:"#91005a",shade10:"#ac006b",primary:"#bf0077",tint10:"#c71885",tint20:"#ce3293",tint30:"#d957a8",tint40:"#eca5d1",tint50:"#f5cee6",tint60:"#fcf2f9"},Di={shade50:"#13000c",shade40:"#240017",shade30:"#43002b",shade20:"#5a003b",shade10:"#6b0045",primary:"#77004d",tint10:"#87105d",tint20:"#98246f",tint30:"#ad4589",tint40:"#d696c0",tint50:"#e9c4dc",tint60:"#faf0f6"},Oi={shade50:"#141313",shade40:"#252323",shade30:"#444241",shade20:"#5d5958",shade10:"#6e6968",primary:"#7a7574",tint10:"#8a8584",tint20:"#9a9594",tint30:"#afabaa",tint40:"#d7d4d4",tint50:"#eae8e8",tint60:"#faf9f9"},Ri={shade50:"#0f0e0e",shade40:"#1c1b1a",shade30:"#343231",shade20:"#474443",shade10:"#54514f",primary:"#5d5a58",tint10:"#706d6b",tint20:"#84817e",tint30:"#9e9b99",tint40:"#cecccb",tint50:"#e5e4e3",tint60:"#f8f8f8"},Mi={shade50:"#111314",shade40:"#1f2426",shade30:"#3b4447",shade20:"#505c60",shade10:"#5f6d71",primary:"#69797e",tint10:"#79898d",tint20:"#89989d",tint30:"#a0adb2",tint40:"#cdd6d8",tint50:"#e4e9ea",tint60:"#f8f9fa"},zi={shade50:"#090a0b",shade40:"#111315",shade30:"#202427",shade20:"#2b3135",shade10:"#333a3f",primary:"#394146",tint10:"#4d565c",tint20:"#626c72",tint30:"#808a90",tint40:"#bcc3c7",tint50:"#dbdfe1",tint60:"#f6f7f8"},x={red:si,green:Pn,darkOrange:ci,yellow:hi,berry:Ci,lightGreen:mi,marigold:gi},Me={darkRed:li,cranberry:yn,pumpkin:ii,peach:ui,gold:pi,brass:vi,brown:fi,forest:Bi,seafoam:bi,darkGreen:ki,lightTeal:Si,teal:Fi,steel:yi,blue:Pi,royalBlue:xi,cornflower:Ni,navy:wi,lavender:Ai,purple:Li,grape:Hi,lilac:Ti,pink:$i,magenta:Ii,plum:Di,beige:Oi,mink:Ri,platinum:Mi,anchor:zi},w={cranberry:yn,green:Pn,orange:di},Vt=["red","green","darkOrange","yellow","berry","lightGreen","marigold"],Wt=["darkRed","cranberry","pumpkin","peach","gold","brass","brown","forest","seafoam","darkGreen","lightTeal","teal","steel","blue","royalBlue","cornflower","navy","lavender","purple","grape","lilac","pink","magenta","plum","beige","mink","platinum","anchor"],pe={success:"green",warning:"orange",danger:"cranberry"},Yr=Vt.reduce((r,e)=>{let o=e.slice(0,1).toUpperCase()+e.slice(1),t={[`colorPalette${o}Background1`]:x[e].tint60,[`colorPalette${o}Background2`]:x[e].tint40,[`colorPalette${o}Background3`]:x[e].primary,[`colorPalette${o}Foreground1`]:x[e].shade10,[`colorPalette${o}Foreground2`]:x[e].shade30,[`colorPalette${o}Foreground3`]:x[e].primary,[`colorPalette${o}BorderActive`]:x[e].primary,[`colorPalette${o}Border1`]:x[e].tint40,[`colorPalette${o}Border2`]:x[e].primary};return Object.assign(r,t)},{});Yr.colorPaletteYellowForeground1=x.yellow.shade30;Yr.colorPaletteRedForegroundInverted=x.red.tint20;Yr.colorPaletteGreenForegroundInverted=x.green.tint20;Yr.colorPaletteYellowForegroundInverted=x.yellow.tint40;var Ei=Wt.reduce((r,e)=>{let o=e.slice(0,1).toUpperCase()+e.slice(1),t={[`colorPalette${o}Background2`]:Me[e].tint40,[`colorPalette${o}Foreground2`]:Me[e].shade30,[`colorPalette${o}BorderActive`]:Me[e].primary};return Object.assign(r,t)},{}),Vi={...Yr,...Ei},To=Object.entries(pe).reduce((r,[e,o])=>{let t=e.slice(0,1).toUpperCase()+e.slice(1),a={[`colorStatus${t}Background1`]:w[o].tint60,[`colorStatus${t}Background2`]:w[o].tint40,[`colorStatus${t}Background3`]:w[o].primary,[`colorStatus${t}Foreground1`]:w[o].shade10,[`colorStatus${t}Foreground2`]:w[o].shade30,[`colorStatus${t}Foreground3`]:w[o].primary,[`colorStatus${t}ForegroundInverted`]:w[o].tint30,[`colorStatus${t}BorderActive`]:w[o].primary,[`colorStatus${t}Border1`]:w[o].tint40,[`colorStatus${t}Border2`]:w[o].primary};return Object.assign(r,a)},{});To.colorStatusWarningForeground1=w[pe.warning].shade20;To.colorStatusWarningForeground3=w[pe.warning].shade20;To.colorStatusWarningBorder2=w[pe.warning].shade20;var Wi=r=>({colorNeutralForeground1:g[14],colorNeutralForeground1Hover:g[14],colorNeutralForeground1Pressed:g[14],colorNeutralForeground1Selected:g[14],colorNeutralForeground2:g[26],colorNeutralForeground2Hover:g[14],colorNeutralForeground2Pressed:g[14],colorNeutralForeground2Selected:g[14],colorNeutralForeground2BrandHover:r[80],colorNeutralForeground2BrandPressed:r[70],colorNeutralForeground2BrandSelected:r[80],colorNeutralForeground3:g[38],colorNeutralForeground3Hover:g[26],colorNeutralForeground3Pressed:g[26],colorNeutralForeground3Selected:g[26],colorNeutralForeground3BrandHover:r[80],colorNeutralForeground3BrandPressed:r[70],colorNeutralForeground3BrandSelected:r[80],colorNeutralForeground4:g[44],colorNeutralForegroundDisabled:g[74],colorNeutralForegroundInvertedDisabled:G[40],colorBrandForegroundLink:r[70],colorBrandForegroundLinkHover:r[60],colorBrandForegroundLinkPressed:r[40],colorBrandForegroundLinkSelected:r[70],colorNeutralForeground2Link:g[26],colorNeutralForeground2LinkHover:g[14],colorNeutralForeground2LinkPressed:g[14],colorNeutralForeground2LinkSelected:g[14],colorCompoundBrandForeground1:r[80],colorCompoundBrandForeground1Hover:r[70],colorCompoundBrandForeground1Pressed:r[60],colorBrandForeground1:r[80],colorBrandForeground2:r[70],colorBrandForeground2Hover:r[60],colorBrandForeground2Pressed:r[30],colorNeutralForeground1Static:g[14],colorNeutralForegroundStaticInverted:k,colorNeutralForegroundInverted:k,colorNeutralForegroundInvertedHover:k,colorNeutralForegroundInvertedPressed:k,colorNeutralForegroundInvertedSelected:k,colorNeutralForegroundInverted2:k,colorNeutralForegroundOnBrand:k,colorNeutralForegroundInvertedLink:k,colorNeutralForegroundInvertedLinkHover:k,colorNeutralForegroundInvertedLinkPressed:k,colorNeutralForegroundInvertedLinkSelected:k,colorBrandForegroundInverted:r[100],colorBrandForegroundInvertedHover:r[110],colorBrandForegroundInvertedPressed:r[100],colorBrandForegroundOnLight:r[80],colorBrandForegroundOnLightHover:r[70],colorBrandForegroundOnLightPressed:r[50],colorBrandForegroundOnLightSelected:r[60],colorNeutralBackground1:k,colorNeutralBackground1Hover:g[96],colorNeutralBackground1Pressed:g[88],colorNeutralBackground1Selected:g[92],colorNeutralBackground2:g[98],colorNeutralBackground2Hover:g[94],colorNeutralBackground2Pressed:g[86],colorNeutralBackground2Selected:g[90],colorNeutralBackground3:g[96],colorNeutralBackground3Hover:g[92],colorNeutralBackground3Pressed:g[84],colorNeutralBackground3Selected:g[88],colorNeutralBackground4:g[94],colorNeutralBackground4Hover:g[98],colorNeutralBackground4Pressed:g[96],colorNeutralBackground4Selected:k,colorNeutralBackground5:g[92],colorNeutralBackground5Hover:g[96],colorNeutralBackground5Pressed:g[94],colorNeutralBackground5Selected:g[98],colorNeutralBackground6:g[90],colorNeutralBackgroundInverted:g[16],colorNeutralBackgroundStatic:g[20],colorNeutralBackgroundAlpha:G[50],colorNeutralBackgroundAlpha2:G[80],colorSubtleBackground:"transparent",colorSubtleBackgroundHover:g[96],colorSubtleBackgroundPressed:g[88],colorSubtleBackgroundSelected:g[92],colorSubtleBackgroundLightAlphaHover:G[70],colorSubtleBackgroundLightAlphaPressed:G[50],colorSubtleBackgroundLightAlphaSelected:"transparent",colorSubtleBackgroundInverted:"transparent",colorSubtleBackgroundInvertedHover:de[10],colorSubtleBackgroundInvertedPressed:de[30],colorSubtleBackgroundInvertedSelected:de[20],colorTransparentBackground:"transparent",colorTransparentBackgroundHover:"transparent",colorTransparentBackgroundPressed:"transparent",colorTransparentBackgroundSelected:"transparent",colorNeutralBackgroundDisabled:g[94],colorNeutralBackgroundInvertedDisabled:G[10],colorNeutralStencil1:g[90],colorNeutralStencil2:g[98],colorNeutralStencil1Alpha:de[10],colorNeutralStencil2Alpha:de[5],colorBackgroundOverlay:de[40],colorScrollbarOverlay:de[50],colorBrandBackground:r[80],colorBrandBackgroundHover:r[70],colorBrandBackgroundPressed:r[40],colorBrandBackgroundSelected:r[60],colorCompoundBrandBackground:r[80],colorCompoundBrandBackgroundHover:r[70],colorCompoundBrandBackgroundPressed:r[60],colorBrandBackgroundStatic:r[80],colorBrandBackground2:r[160],colorBrandBackground2Hover:r[150],colorBrandBackground2Pressed:r[130],colorBrandBackgroundInverted:k,colorBrandBackgroundInvertedHover:r[160],colorBrandBackgroundInvertedPressed:r[140],colorBrandBackgroundInvertedSelected:r[150],colorNeutralStrokeAccessible:g[38],colorNeutralStrokeAccessibleHover:g[34],colorNeutralStrokeAccessiblePressed:g[30],colorNeutralStrokeAccessibleSelected:r[80],colorNeutralStroke1:g[82],colorNeutralStroke1Hover:g[78],colorNeutralStroke1Pressed:g[70],colorNeutralStroke1Selected:g[74],colorNeutralStroke2:g[88],colorNeutralStroke3:g[94],colorNeutralStrokeSubtle:g[88],colorNeutralStrokeOnBrand:k,colorNeutralStrokeOnBrand2:k,colorNeutralStrokeOnBrand2Hover:k,colorNeutralStrokeOnBrand2Pressed:k,colorNeutralStrokeOnBrand2Selected:k,colorBrandStroke1:r[80],colorBrandStroke2:r[140],colorBrandStroke2Hover:r[120],colorBrandStroke2Pressed:r[80],colorBrandStroke2Contrast:r[140],colorCompoundBrandStroke:r[80],colorCompoundBrandStrokeHover:r[70],colorCompoundBrandStrokePressed:r[60],colorNeutralStrokeDisabled:g[88],colorNeutralStrokeInvertedDisabled:G[40],colorTransparentStroke:"transparent",colorTransparentStrokeInteractive:"transparent",colorTransparentStrokeDisabled:"transparent",colorNeutralStrokeAlpha:de[5],colorNeutralStrokeAlpha2:G[20],colorStrokeFocus1:k,colorStrokeFocus2:No,colorNeutralShadowAmbient:"rgba(0,0,0,0.12)",colorNeutralShadowKey:"rgba(0,0,0,0.14)",colorNeutralShadowAmbientLighter:"rgba(0,0,0,0.06)",colorNeutralShadowKeyLighter:"rgba(0,0,0,0.07)",colorNeutralShadowAmbientDarker:"rgba(0,0,0,0.20)",colorNeutralShadowKeyDarker:"rgba(0,0,0,0.24)",colorBrandShadowAmbient:"rgba(0,0,0,0.30)",colorBrandShadowKey:"rgba(0,0,0,0.25)"}),xn={borderRadiusNone:"0",borderRadiusSmall:"2px",borderRadiusMedium:"4px",borderRadiusLarge:"6px",borderRadiusXLarge:"8px",borderRadiusCircular:"10000px"},Nn={curveAccelerateMax:"cubic-bezier(0.9,0.1,1,0.2)",curveAccelerateMid:"cubic-bezier(1,0,1,1)",curveAccelerateMin:"cubic-bezier(0.8,0,0.78,1)",curveDecelerateMax:"cubic-bezier(0.1,0.9,0.2,1)",curveDecelerateMid:"cubic-bezier(0,0,0,1)",curveDecelerateMin:"cubic-bezier(0.33,0,0.1,1)",curveEasyEaseMax:"cubic-bezier(0.8,0,0.2,1)",curveEasyEase:"cubic-bezier(0.33,0,0.67,1)",curveLinear:"cubic-bezier(0,0,1,1)"},wn={durationUltraFast:"50ms",durationFaster:"100ms",durationFast:"150ms",durationNormal:"200ms",durationGentle:"250ms",durationSlow:"300ms",durationSlower:"400ms",durationUltraSlow:"500ms"},An={fontSizeBase100:"10px",fontSizeBase200:"12px",fontSizeBase300:"14px",fontSizeBase400:"16px",fontSizeBase500:"20px",fontSizeBase600:"24px",fontSizeHero700:"28px",fontSizeHero800:"32px",fontSizeHero900:"40px",fontSizeHero1000:"68px"},Ln={lineHeightBase100:"14px",lineHeightBase200:"16px",lineHeightBase300:"20px",lineHeightBase400:"22px",lineHeightBase500:"28px",lineHeightBase600:"32px",lineHeightHero700:"36px",lineHeightHero800:"40px",lineHeightHero900:"52px",lineHeightHero1000:"92px"},Hn={fontWeightRegular:400,fontWeightMedium:500,fontWeightSemibold:600,fontWeightBold:700},Cn={fontFamilyBase:"'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",fontFamilyMonospace:"Consolas, 'Courier New', Courier, monospace",fontFamilyNumeric:"Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"},$={none:"0",xxs:"2px",xs:"4px",sNudge:"6px",s:"8px",mNudge:"10px",m:"12px",l:"16px",xl:"20px",xxl:"24px",xxxl:"32px"},Tn={spacingHorizontalNone:$.none,spacingHorizontalXXS:$.xxs,spacingHorizontalXS:$.xs,spacingHorizontalSNudge:$.sNudge,spacingHorizontalS:$.s,spacingHorizontalMNudge:$.mNudge,spacingHorizontalM:$.m,spacingHorizontalL:$.l,spacingHorizontalXL:$.xl,spacingHorizontalXXL:$.xxl,spacingHorizontalXXXL:$.xxxl},$n={spacingVerticalNone:$.none,spacingVerticalXXS:$.xxs,spacingVerticalXS:$.xs,spacingVerticalSNudge:$.sNudge,spacingVerticalS:$.s,spacingVerticalMNudge:$.mNudge,spacingVerticalM:$.m,spacingVerticalL:$.l,spacingVerticalXL:$.xl,spacingVerticalXXL:$.xxl,spacingVerticalXXXL:$.xxxl},In={strokeWidthThin:"1px",strokeWidthThick:"2px",strokeWidthThicker:"3px",strokeWidthThickest:"4px"},p={colorNeutralForeground1:"var(--colorNeutralForeground1)",colorNeutralForeground1Hover:"var(--colorNeutralForeground1Hover)",colorNeutralForeground1Pressed:"var(--colorNeutralForeground1Pressed)",colorNeutralForeground1Selected:"var(--colorNeutralForeground1Selected)",colorNeutralForeground2:"var(--colorNeutralForeground2)",colorNeutralForeground2Hover:"var(--colorNeutralForeground2Hover)",colorNeutralForeground2Pressed:"var(--colorNeutralForeground2Pressed)",colorNeutralForeground2Selected:"var(--colorNeutralForeground2Selected)",colorNeutralForeground2BrandHover:"var(--colorNeutralForeground2BrandHover)",colorNeutralForeground2BrandPressed:"var(--colorNeutralForeground2BrandPressed)",colorNeutralForeground2BrandSelected:"var(--colorNeutralForeground2BrandSelected)",colorNeutralForeground3:"var(--colorNeutralForeground3)",colorNeutralForeground3Hover:"var(--colorNeutralForeground3Hover)",colorNeutralForeground3Pressed:"var(--colorNeutralForeground3Pressed)",colorNeutralForeground3Selected:"var(--colorNeutralForeground3Selected)",colorNeutralForeground3BrandHover:"var(--colorNeutralForeground3BrandHover)",colorNeutralForeground3BrandPressed:"var(--colorNeutralForeground3BrandPressed)",colorNeutralForeground3BrandSelected:"var(--colorNeutralForeground3BrandSelected)",colorNeutralForeground4:"var(--colorNeutralForeground4)",colorNeutralForegroundDisabled:"var(--colorNeutralForegroundDisabled)",colorBrandForegroundLink:"var(--colorBrandForegroundLink)",colorBrandForegroundLinkHover:"var(--colorBrandForegroundLinkHover)",colorBrandForegroundLinkPressed:"var(--colorBrandForegroundLinkPressed)",colorBrandForegroundLinkSelected:"var(--colorBrandForegroundLinkSelected)",colorNeutralForeground2Link:"var(--colorNeutralForeground2Link)",colorNeutralForeground2LinkHover:"var(--colorNeutralForeground2LinkHover)",colorNeutralForeground2LinkPressed:"var(--colorNeutralForeground2LinkPressed)",colorNeutralForeground2LinkSelected:"var(--colorNeutralForeground2LinkSelected)",colorCompoundBrandForeground1:"var(--colorCompoundBrandForeground1)",colorCompoundBrandForeground1Hover:"var(--colorCompoundBrandForeground1Hover)",colorCompoundBrandForeground1Pressed:"var(--colorCompoundBrandForeground1Pressed)",colorNeutralForegroundOnBrand:"var(--colorNeutralForegroundOnBrand)",colorNeutralForegroundInverted:"var(--colorNeutralForegroundInverted)",colorNeutralForegroundInvertedHover:"var(--colorNeutralForegroundInvertedHover)",colorNeutralForegroundInvertedPressed:"var(--colorNeutralForegroundInvertedPressed)",colorNeutralForegroundInvertedSelected:"var(--colorNeutralForegroundInvertedSelected)",colorNeutralForegroundInverted2:"var(--colorNeutralForegroundInverted2)",colorNeutralForegroundStaticInverted:"var(--colorNeutralForegroundStaticInverted)",colorNeutralForegroundInvertedLink:"var(--colorNeutralForegroundInvertedLink)",colorNeutralForegroundInvertedLinkHover:"var(--colorNeutralForegroundInvertedLinkHover)",colorNeutralForegroundInvertedLinkPressed:"var(--colorNeutralForegroundInvertedLinkPressed)",colorNeutralForegroundInvertedLinkSelected:"var(--colorNeutralForegroundInvertedLinkSelected)",colorNeutralForegroundInvertedDisabled:"var(--colorNeutralForegroundInvertedDisabled)",colorBrandForeground1:"var(--colorBrandForeground1)",colorBrandForeground2:"var(--colorBrandForeground2)",colorBrandForeground2Hover:"var(--colorBrandForeground2Hover)",colorBrandForeground2Pressed:"var(--colorBrandForeground2Pressed)",colorNeutralForeground1Static:"var(--colorNeutralForeground1Static)",colorBrandForegroundInverted:"var(--colorBrandForegroundInverted)",colorBrandForegroundInvertedHover:"var(--colorBrandForegroundInvertedHover)",colorBrandForegroundInvertedPressed:"var(--colorBrandForegroundInvertedPressed)",colorBrandForegroundOnLight:"var(--colorBrandForegroundOnLight)",colorBrandForegroundOnLightHover:"var(--colorBrandForegroundOnLightHover)",colorBrandForegroundOnLightPressed:"var(--colorBrandForegroundOnLightPressed)",colorBrandForegroundOnLightSelected:"var(--colorBrandForegroundOnLightSelected)",colorNeutralBackground1:"var(--colorNeutralBackground1)",colorNeutralBackground1Hover:"var(--colorNeutralBackground1Hover)",colorNeutralBackground1Pressed:"var(--colorNeutralBackground1Pressed)",colorNeutralBackground1Selected:"var(--colorNeutralBackground1Selected)",colorNeutralBackground2:"var(--colorNeutralBackground2)",colorNeutralBackground2Hover:"var(--colorNeutralBackground2Hover)",colorNeutralBackground2Pressed:"var(--colorNeutralBackground2Pressed)",colorNeutralBackground2Selected:"var(--colorNeutralBackground2Selected)",colorNeutralBackground3:"var(--colorNeutralBackground3)",colorNeutralBackground3Hover:"var(--colorNeutralBackground3Hover)",colorNeutralBackground3Pressed:"var(--colorNeutralBackground3Pressed)",colorNeutralBackground3Selected:"var(--colorNeutralBackground3Selected)",colorNeutralBackground4:"var(--colorNeutralBackground4)",colorNeutralBackground4Hover:"var(--colorNeutralBackground4Hover)",colorNeutralBackground4Pressed:"var(--colorNeutralBackground4Pressed)",colorNeutralBackground4Selected:"var(--colorNeutralBackground4Selected)",colorNeutralBackground5:"var(--colorNeutralBackground5)",colorNeutralBackground5Hover:"var(--colorNeutralBackground5Hover)",colorNeutralBackground5Pressed:"var(--colorNeutralBackground5Pressed)",colorNeutralBackground5Selected:"var(--colorNeutralBackground5Selected)",colorNeutralBackground6:"var(--colorNeutralBackground6)",colorNeutralBackgroundInverted:"var(--colorNeutralBackgroundInverted)",colorNeutralBackgroundStatic:"var(--colorNeutralBackgroundStatic)",colorNeutralBackgroundAlpha:"var(--colorNeutralBackgroundAlpha)",colorNeutralBackgroundAlpha2:"var(--colorNeutralBackgroundAlpha2)",colorSubtleBackground:"var(--colorSubtleBackground)",colorSubtleBackgroundHover:"var(--colorSubtleBackgroundHover)",colorSubtleBackgroundPressed:"var(--colorSubtleBackgroundPressed)",colorSubtleBackgroundSelected:"var(--colorSubtleBackgroundSelected)",colorSubtleBackgroundLightAlphaHover:"var(--colorSubtleBackgroundLightAlphaHover)",colorSubtleBackgroundLightAlphaPressed:"var(--colorSubtleBackgroundLightAlphaPressed)",colorSubtleBackgroundLightAlphaSelected:"var(--colorSubtleBackgroundLightAlphaSelected)",colorSubtleBackgroundInverted:"var(--colorSubtleBackgroundInverted)",colorSubtleBackgroundInvertedHover:"var(--colorSubtleBackgroundInvertedHover)",colorSubtleBackgroundInvertedPressed:"var(--colorSubtleBackgroundInvertedPressed)",colorSubtleBackgroundInvertedSelected:"var(--colorSubtleBackgroundInvertedSelected)",colorTransparentBackground:"var(--colorTransparentBackground)",colorTransparentBackgroundHover:"var(--colorTransparentBackgroundHover)",colorTransparentBackgroundPressed:"var(--colorTransparentBackgroundPressed)",colorTransparentBackgroundSelected:"var(--colorTransparentBackgroundSelected)",colorNeutralBackgroundDisabled:"var(--colorNeutralBackgroundDisabled)",colorNeutralBackgroundInvertedDisabled:"var(--colorNeutralBackgroundInvertedDisabled)",colorNeutralStencil1:"var(--colorNeutralStencil1)",colorNeutralStencil2:"var(--colorNeutralStencil2)",colorNeutralStencil1Alpha:"var(--colorNeutralStencil1Alpha)",colorNeutralStencil2Alpha:"var(--colorNeutralStencil2Alpha)",colorBackgroundOverlay:"var(--colorBackgroundOverlay)",colorScrollbarOverlay:"var(--colorScrollbarOverlay)",colorBrandBackground:"var(--colorBrandBackground)",colorBrandBackgroundHover:"var(--colorBrandBackgroundHover)",colorBrandBackgroundPressed:"var(--colorBrandBackgroundPressed)",colorBrandBackgroundSelected:"var(--colorBrandBackgroundSelected)",colorCompoundBrandBackground:"var(--colorCompoundBrandBackground)",colorCompoundBrandBackgroundHover:"var(--colorCompoundBrandBackgroundHover)",colorCompoundBrandBackgroundPressed:"var(--colorCompoundBrandBackgroundPressed)",colorBrandBackgroundStatic:"var(--colorBrandBackgroundStatic)",colorBrandBackground2:"var(--colorBrandBackground2)",colorBrandBackground2Hover:"var(--colorBrandBackground2Hover)",colorBrandBackground2Pressed:"var(--colorBrandBackground2Pressed)",colorBrandBackgroundInverted:"var(--colorBrandBackgroundInverted)",colorBrandBackgroundInvertedHover:"var(--colorBrandBackgroundInvertedHover)",colorBrandBackgroundInvertedPressed:"var(--colorBrandBackgroundInvertedPressed)",colorBrandBackgroundInvertedSelected:"var(--colorBrandBackgroundInvertedSelected)",colorNeutralStrokeAccessible:"var(--colorNeutralStrokeAccessible)",colorNeutralStrokeAccessibleHover:"var(--colorNeutralStrokeAccessibleHover)",colorNeutralStrokeAccessiblePressed:"var(--colorNeutralStrokeAccessiblePressed)",colorNeutralStrokeAccessibleSelected:"var(--colorNeutralStrokeAccessibleSelected)",colorNeutralStroke1:"var(--colorNeutralStroke1)",colorNeutralStroke1Hover:"var(--colorNeutralStroke1Hover)",colorNeutralStroke1Pressed:"var(--colorNeutralStroke1Pressed)",colorNeutralStroke1Selected:"var(--colorNeutralStroke1Selected)",colorNeutralStroke2:"var(--colorNeutralStroke2)",colorNeutralStroke3:"var(--colorNeutralStroke3)",colorNeutralStrokeSubtle:"var(--colorNeutralStrokeSubtle)",colorNeutralStrokeOnBrand:"var(--colorNeutralStrokeOnBrand)",colorNeutralStrokeOnBrand2:"var(--colorNeutralStrokeOnBrand2)",colorNeutralStrokeOnBrand2Hover:"var(--colorNeutralStrokeOnBrand2Hover)",colorNeutralStrokeOnBrand2Pressed:"var(--colorNeutralStrokeOnBrand2Pressed)",colorNeutralStrokeOnBrand2Selected:"var(--colorNeutralStrokeOnBrand2Selected)",colorBrandStroke1:"var(--colorBrandStroke1)",colorBrandStroke2:"var(--colorBrandStroke2)",colorBrandStroke2Hover:"var(--colorBrandStroke2Hover)",colorBrandStroke2Pressed:"var(--colorBrandStroke2Pressed)",colorBrandStroke2Contrast:"var(--colorBrandStroke2Contrast)",colorCompoundBrandStroke:"var(--colorCompoundBrandStroke)",colorCompoundBrandStrokeHover:"var(--colorCompoundBrandStrokeHover)",colorCompoundBrandStrokePressed:"var(--colorCompoundBrandStrokePressed)",colorNeutralStrokeDisabled:"var(--colorNeutralStrokeDisabled)",colorNeutralStrokeInvertedDisabled:"var(--colorNeutralStrokeInvertedDisabled)",colorTransparentStroke:"var(--colorTransparentStroke)",colorTransparentStrokeInteractive:"var(--colorTransparentStrokeInteractive)",colorTransparentStrokeDisabled:"var(--colorTransparentStrokeDisabled)",colorNeutralStrokeAlpha:"var(--colorNeutralStrokeAlpha)",colorNeutralStrokeAlpha2:"var(--colorNeutralStrokeAlpha2)",colorStrokeFocus1:"var(--colorStrokeFocus1)",colorStrokeFocus2:"var(--colorStrokeFocus2)",colorNeutralShadowAmbient:"var(--colorNeutralShadowAmbient)",colorNeutralShadowKey:"var(--colorNeutralShadowKey)",colorNeutralShadowAmbientLighter:"var(--colorNeutralShadowAmbientLighter)",colorNeutralShadowKeyLighter:"var(--colorNeutralShadowKeyLighter)",colorNeutralShadowAmbientDarker:"var(--colorNeutralShadowAmbientDarker)",colorNeutralShadowKeyDarker:"var(--colorNeutralShadowKeyDarker)",colorBrandShadowAmbient:"var(--colorBrandShadowAmbient)",colorBrandShadowKey:"var(--colorBrandShadowKey)",colorPaletteRedBackground1:"var(--colorPaletteRedBackground1)",colorPaletteRedBackground2:"var(--colorPaletteRedBackground2)",colorPaletteRedBackground3:"var(--colorPaletteRedBackground3)",colorPaletteRedBorderActive:"var(--colorPaletteRedBorderActive)",colorPaletteRedBorder1:"var(--colorPaletteRedBorder1)",colorPaletteRedBorder2:"var(--colorPaletteRedBorder2)",colorPaletteRedForeground1:"var(--colorPaletteRedForeground1)",colorPaletteRedForeground2:"var(--colorPaletteRedForeground2)",colorPaletteRedForeground3:"var(--colorPaletteRedForeground3)",colorPaletteRedForegroundInverted:"var(--colorPaletteRedForegroundInverted)",colorPaletteGreenBackground1:"var(--colorPaletteGreenBackground1)",colorPaletteGreenBackground2:"var(--colorPaletteGreenBackground2)",colorPaletteGreenBackground3:"var(--colorPaletteGreenBackground3)",colorPaletteGreenBorderActive:"var(--colorPaletteGreenBorderActive)",colorPaletteGreenBorder1:"var(--colorPaletteGreenBorder1)",colorPaletteGreenBorder2:"var(--colorPaletteGreenBorder2)",colorPaletteGreenForeground1:"var(--colorPaletteGreenForeground1)",colorPaletteGreenForeground2:"var(--colorPaletteGreenForeground2)",colorPaletteGreenForeground3:"var(--colorPaletteGreenForeground3)",colorPaletteGreenForegroundInverted:"var(--colorPaletteGreenForegroundInverted)",colorPaletteDarkOrangeBackground1:"var(--colorPaletteDarkOrangeBackground1)",colorPaletteDarkOrangeBackground2:"var(--colorPaletteDarkOrangeBackground2)",colorPaletteDarkOrangeBackground3:"var(--colorPaletteDarkOrangeBackground3)",colorPaletteDarkOrangeBorderActive:"var(--colorPaletteDarkOrangeBorderActive)",colorPaletteDarkOrangeBorder1:"var(--colorPaletteDarkOrangeBorder1)",colorPaletteDarkOrangeBorder2:"var(--colorPaletteDarkOrangeBorder2)",colorPaletteDarkOrangeForeground1:"var(--colorPaletteDarkOrangeForeground1)",colorPaletteDarkOrangeForeground2:"var(--colorPaletteDarkOrangeForeground2)",colorPaletteDarkOrangeForeground3:"var(--colorPaletteDarkOrangeForeground3)",colorPaletteYellowBackground1:"var(--colorPaletteYellowBackground1)",colorPaletteYellowBackground2:"var(--colorPaletteYellowBackground2)",colorPaletteYellowBackground3:"var(--colorPaletteYellowBackground3)",colorPaletteYellowBorderActive:"var(--colorPaletteYellowBorderActive)",colorPaletteYellowBorder1:"var(--colorPaletteYellowBorder1)",colorPaletteYellowBorder2:"var(--colorPaletteYellowBorder2)",colorPaletteYellowForeground1:"var(--colorPaletteYellowForeground1)",colorPaletteYellowForeground2:"var(--colorPaletteYellowForeground2)",colorPaletteYellowForeground3:"var(--colorPaletteYellowForeground3)",colorPaletteYellowForegroundInverted:"var(--colorPaletteYellowForegroundInverted)",colorPaletteBerryBackground1:"var(--colorPaletteBerryBackground1)",colorPaletteBerryBackground2:"var(--colorPaletteBerryBackground2)",colorPaletteBerryBackground3:"var(--colorPaletteBerryBackground3)",colorPaletteBerryBorderActive:"var(--colorPaletteBerryBorderActive)",colorPaletteBerryBorder1:"var(--colorPaletteBerryBorder1)",colorPaletteBerryBorder2:"var(--colorPaletteBerryBorder2)",colorPaletteBerryForeground1:"var(--colorPaletteBerryForeground1)",colorPaletteBerryForeground2:"var(--colorPaletteBerryForeground2)",colorPaletteBerryForeground3:"var(--colorPaletteBerryForeground3)",colorPaletteMarigoldBackground1:"var(--colorPaletteMarigoldBackground1)",colorPaletteMarigoldBackground2:"var(--colorPaletteMarigoldBackground2)",colorPaletteMarigoldBackground3:"var(--colorPaletteMarigoldBackground3)",colorPaletteMarigoldBorderActive:"var(--colorPaletteMarigoldBorderActive)",colorPaletteMarigoldBorder1:"var(--colorPaletteMarigoldBorder1)",colorPaletteMarigoldBorder2:"var(--colorPaletteMarigoldBorder2)",colorPaletteMarigoldForeground1:"var(--colorPaletteMarigoldForeground1)",colorPaletteMarigoldForeground2:"var(--colorPaletteMarigoldForeground2)",colorPaletteMarigoldForeground3:"var(--colorPaletteMarigoldForeground3)",colorPaletteLightGreenBackground1:"var(--colorPaletteLightGreenBackground1)",colorPaletteLightGreenBackground2:"var(--colorPaletteLightGreenBackground2)",colorPaletteLightGreenBackground3:"var(--colorPaletteLightGreenBackground3)",colorPaletteLightGreenBorderActive:"var(--colorPaletteLightGreenBorderActive)",colorPaletteLightGreenBorder1:"var(--colorPaletteLightGreenBorder1)",colorPaletteLightGreenBorder2:"var(--colorPaletteLightGreenBorder2)",colorPaletteLightGreenForeground1:"var(--colorPaletteLightGreenForeground1)",colorPaletteLightGreenForeground2:"var(--colorPaletteLightGreenForeground2)",colorPaletteLightGreenForeground3:"var(--colorPaletteLightGreenForeground3)",colorPaletteAnchorBackground2:"var(--colorPaletteAnchorBackground2)",colorPaletteAnchorBorderActive:"var(--colorPaletteAnchorBorderActive)",colorPaletteAnchorForeground2:"var(--colorPaletteAnchorForeground2)",colorPaletteBeigeBackground2:"var(--colorPaletteBeigeBackground2)",colorPaletteBeigeBorderActive:"var(--colorPaletteBeigeBorderActive)",colorPaletteBeigeForeground2:"var(--colorPaletteBeigeForeground2)",colorPaletteBlueBackground2:"var(--colorPaletteBlueBackground2)",colorPaletteBlueBorderActive:"var(--colorPaletteBlueBorderActive)",colorPaletteBlueForeground2:"var(--colorPaletteBlueForeground2)",colorPaletteBrassBackground2:"var(--colorPaletteBrassBackground2)",colorPaletteBrassBorderActive:"var(--colorPaletteBrassBorderActive)",colorPaletteBrassForeground2:"var(--colorPaletteBrassForeground2)",colorPaletteBrownBackground2:"var(--colorPaletteBrownBackground2)",colorPaletteBrownBorderActive:"var(--colorPaletteBrownBorderActive)",colorPaletteBrownForeground2:"var(--colorPaletteBrownForeground2)",colorPaletteCornflowerBackground2:"var(--colorPaletteCornflowerBackground2)",colorPaletteCornflowerBorderActive:"var(--colorPaletteCornflowerBorderActive)",colorPaletteCornflowerForeground2:"var(--colorPaletteCornflowerForeground2)",colorPaletteCranberryBackground2:"var(--colorPaletteCranberryBackground2)",colorPaletteCranberryBorderActive:"var(--colorPaletteCranberryBorderActive)",colorPaletteCranberryForeground2:"var(--colorPaletteCranberryForeground2)",colorPaletteDarkGreenBackground2:"var(--colorPaletteDarkGreenBackground2)",colorPaletteDarkGreenBorderActive:"var(--colorPaletteDarkGreenBorderActive)",colorPaletteDarkGreenForeground2:"var(--colorPaletteDarkGreenForeground2)",colorPaletteDarkRedBackground2:"var(--colorPaletteDarkRedBackground2)",colorPaletteDarkRedBorderActive:"var(--colorPaletteDarkRedBorderActive)",colorPaletteDarkRedForeground2:"var(--colorPaletteDarkRedForeground2)",colorPaletteForestBackground2:"var(--colorPaletteForestBackground2)",colorPaletteForestBorderActive:"var(--colorPaletteForestBorderActive)",colorPaletteForestForeground2:"var(--colorPaletteForestForeground2)",colorPaletteGoldBackground2:"var(--colorPaletteGoldBackground2)",colorPaletteGoldBorderActive:"var(--colorPaletteGoldBorderActive)",colorPaletteGoldForeground2:"var(--colorPaletteGoldForeground2)",colorPaletteGrapeBackground2:"var(--colorPaletteGrapeBackground2)",colorPaletteGrapeBorderActive:"var(--colorPaletteGrapeBorderActive)",colorPaletteGrapeForeground2:"var(--colorPaletteGrapeForeground2)",colorPaletteLavenderBackground2:"var(--colorPaletteLavenderBackground2)",colorPaletteLavenderBorderActive:"var(--colorPaletteLavenderBorderActive)",colorPaletteLavenderForeground2:"var(--colorPaletteLavenderForeground2)",colorPaletteLightTealBackground2:"var(--colorPaletteLightTealBackground2)",colorPaletteLightTealBorderActive:"var(--colorPaletteLightTealBorderActive)",colorPaletteLightTealForeground2:"var(--colorPaletteLightTealForeground2)",colorPaletteLilacBackground2:"var(--colorPaletteLilacBackground2)",colorPaletteLilacBorderActive:"var(--colorPaletteLilacBorderActive)",colorPaletteLilacForeground2:"var(--colorPaletteLilacForeground2)",colorPaletteMagentaBackground2:"var(--colorPaletteMagentaBackground2)",colorPaletteMagentaBorderActive:"var(--colorPaletteMagentaBorderActive)",colorPaletteMagentaForeground2:"var(--colorPaletteMagentaForeground2)",colorPaletteMinkBackground2:"var(--colorPaletteMinkBackground2)",colorPaletteMinkBorderActive:"var(--colorPaletteMinkBorderActive)",colorPaletteMinkForeground2:"var(--colorPaletteMinkForeground2)",colorPaletteNavyBackground2:"var(--colorPaletteNavyBackground2)",colorPaletteNavyBorderActive:"var(--colorPaletteNavyBorderActive)",colorPaletteNavyForeground2:"var(--colorPaletteNavyForeground2)",colorPalettePeachBackground2:"var(--colorPalettePeachBackground2)",colorPalettePeachBorderActive:"var(--colorPalettePeachBorderActive)",colorPalettePeachForeground2:"var(--colorPalettePeachForeground2)",colorPalettePinkBackground2:"var(--colorPalettePinkBackground2)",colorPalettePinkBorderActive:"var(--colorPalettePinkBorderActive)",colorPalettePinkForeground2:"var(--colorPalettePinkForeground2)",colorPalettePlatinumBackground2:"var(--colorPalettePlatinumBackground2)",colorPalettePlatinumBorderActive:"var(--colorPalettePlatinumBorderActive)",colorPalettePlatinumForeground2:"var(--colorPalettePlatinumForeground2)",colorPalettePlumBackground2:"var(--colorPalettePlumBackground2)",colorPalettePlumBorderActive:"var(--colorPalettePlumBorderActive)",colorPalettePlumForeground2:"var(--colorPalettePlumForeground2)",colorPalettePumpkinBackground2:"var(--colorPalettePumpkinBackground2)",colorPalettePumpkinBorderActive:"var(--colorPalettePumpkinBorderActive)",colorPalettePumpkinForeground2:"var(--colorPalettePumpkinForeground2)",colorPalettePurpleBackground2:"var(--colorPalettePurpleBackground2)",colorPalettePurpleBorderActive:"var(--colorPalettePurpleBorderActive)",colorPalettePurpleForeground2:"var(--colorPalettePurpleForeground2)",colorPaletteRoyalBlueBackground2:"var(--colorPaletteRoyalBlueBackground2)",colorPaletteRoyalBlueBorderActive:"var(--colorPaletteRoyalBlueBorderActive)",colorPaletteRoyalBlueForeground2:"var(--colorPaletteRoyalBlueForeground2)",colorPaletteSeafoamBackground2:"var(--colorPaletteSeafoamBackground2)",colorPaletteSeafoamBorderActive:"var(--colorPaletteSeafoamBorderActive)",colorPaletteSeafoamForeground2:"var(--colorPaletteSeafoamForeground2)",colorPaletteSteelBackground2:"var(--colorPaletteSteelBackground2)",colorPaletteSteelBorderActive:"var(--colorPaletteSteelBorderActive)",colorPaletteSteelForeground2:"var(--colorPaletteSteelForeground2)",colorPaletteTealBackground2:"var(--colorPaletteTealBackground2)",colorPaletteTealBorderActive:"var(--colorPaletteTealBorderActive)",colorPaletteTealForeground2:"var(--colorPaletteTealForeground2)",colorStatusSuccessBackground1:"var(--colorStatusSuccessBackground1)",colorStatusSuccessBackground2:"var(--colorStatusSuccessBackground2)",colorStatusSuccessBackground3:"var(--colorStatusSuccessBackground3)",colorStatusSuccessForeground1:"var(--colorStatusSuccessForeground1)",colorStatusSuccessForeground2:"var(--colorStatusSuccessForeground2)",colorStatusSuccessForeground3:"var(--colorStatusSuccessForeground3)",colorStatusSuccessForegroundInverted:"var(--colorStatusSuccessForegroundInverted)",colorStatusSuccessBorderActive:"var(--colorStatusSuccessBorderActive)",colorStatusSuccessBorder1:"var(--colorStatusSuccessBorder1)",colorStatusSuccessBorder2:"var(--colorStatusSuccessBorder2)",colorStatusWarningBackground1:"var(--colorStatusWarningBackground1)",colorStatusWarningBackground2:"var(--colorStatusWarningBackground2)",colorStatusWarningBackground3:"var(--colorStatusWarningBackground3)",colorStatusWarningForeground1:"var(--colorStatusWarningForeground1)",colorStatusWarningForeground2:"var(--colorStatusWarningForeground2)",colorStatusWarningForeground3:"var(--colorStatusWarningForeground3)",colorStatusWarningForegroundInverted:"var(--colorStatusWarningForegroundInverted)",colorStatusWarningBorderActive:"var(--colorStatusWarningBorderActive)",colorStatusWarningBorder1:"var(--colorStatusWarningBorder1)",colorStatusWarningBorder2:"var(--colorStatusWarningBorder2)",colorStatusDangerBackground1:"var(--colorStatusDangerBackground1)",colorStatusDangerBackground2:"var(--colorStatusDangerBackground2)",colorStatusDangerBackground3:"var(--colorStatusDangerBackground3)",colorStatusDangerForeground1:"var(--colorStatusDangerForeground1)",colorStatusDangerForeground2:"var(--colorStatusDangerForeground2)",colorStatusDangerForeground3:"var(--colorStatusDangerForeground3)",colorStatusDangerForegroundInverted:"var(--colorStatusDangerForegroundInverted)",colorStatusDangerBorderActive:"var(--colorStatusDangerBorderActive)",colorStatusDangerBorder1:"var(--colorStatusDangerBorder1)",colorStatusDangerBorder2:"var(--colorStatusDangerBorder2)",borderRadiusNone:"var(--borderRadiusNone)",borderRadiusSmall:"var(--borderRadiusSmall)",borderRadiusMedium:"var(--borderRadiusMedium)",borderRadiusLarge:"var(--borderRadiusLarge)",borderRadiusXLarge:"var(--borderRadiusXLarge)",borderRadiusCircular:"var(--borderRadiusCircular)",fontFamilyBase:"var(--fontFamilyBase)",fontFamilyMonospace:"var(--fontFamilyMonospace)",fontFamilyNumeric:"var(--fontFamilyNumeric)",fontSizeBase100:"var(--fontSizeBase100)",fontSizeBase200:"var(--fontSizeBase200)",fontSizeBase300:"var(--fontSizeBase300)",fontSizeBase400:"var(--fontSizeBase400)",fontSizeBase500:"var(--fontSizeBase500)",fontSizeBase600:"var(--fontSizeBase600)",fontSizeHero700:"var(--fontSizeHero700)",fontSizeHero800:"var(--fontSizeHero800)",fontSizeHero900:"var(--fontSizeHero900)",fontSizeHero1000:"var(--fontSizeHero1000)",fontWeightRegular:"var(--fontWeightRegular)",fontWeightMedium:"var(--fontWeightMedium)",fontWeightSemibold:"var(--fontWeightSemibold)",fontWeightBold:"var(--fontWeightBold)",lineHeightBase100:"var(--lineHeightBase100)",lineHeightBase200:"var(--lineHeightBase200)",lineHeightBase300:"var(--lineHeightBase300)",lineHeightBase400:"var(--lineHeightBase400)",lineHeightBase500:"var(--lineHeightBase500)",lineHeightBase600:"var(--lineHeightBase600)",lineHeightHero700:"var(--lineHeightHero700)",lineHeightHero800:"var(--lineHeightHero800)",lineHeightHero900:"var(--lineHeightHero900)",lineHeightHero1000:"var(--lineHeightHero1000)",shadow2:"var(--shadow2)",shadow4:"var(--shadow4)",shadow8:"var(--shadow8)",shadow16:"var(--shadow16)",shadow28:"var(--shadow28)",shadow64:"var(--shadow64)",shadow2Brand:"var(--shadow2Brand)",shadow4Brand:"var(--shadow4Brand)",shadow8Brand:"var(--shadow8Brand)",shadow16Brand:"var(--shadow16Brand)",shadow28Brand:"var(--shadow28Brand)",shadow64Brand:"var(--shadow64Brand)",strokeWidthThin:"var(--strokeWidthThin)",strokeWidthThick:"var(--strokeWidthThick)",strokeWidthThicker:"var(--strokeWidthThicker)",strokeWidthThickest:"var(--strokeWidthThickest)",spacingHorizontalNone:"var(--spacingHorizontalNone)",spacingHorizontalXXS:"var(--spacingHorizontalXXS)",spacingHorizontalXS:"var(--spacingHorizontalXS)",spacingHorizontalSNudge:"var(--spacingHorizontalSNudge)",spacingHorizontalS:"var(--spacingHorizontalS)",spacingHorizontalMNudge:"var(--spacingHorizontalMNudge)",spacingHorizontalM:"var(--spacingHorizontalM)",spacingHorizontalL:"var(--spacingHorizontalL)",spacingHorizontalXL:"var(--spacingHorizontalXL)",spacingHorizontalXXL:"var(--spacingHorizontalXXL)",spacingHorizontalXXXL:"var(--spacingHorizontalXXXL)",spacingVerticalNone:"var(--spacingVerticalNone)",spacingVerticalXXS:"var(--spacingVerticalXXS)",spacingVerticalXS:"var(--spacingVerticalXS)",spacingVerticalSNudge:"var(--spacingVerticalSNudge)",spacingVerticalS:"var(--spacingVerticalS)",spacingVerticalMNudge:"var(--spacingVerticalMNudge)",spacingVerticalM:"var(--spacingVerticalM)",spacingVerticalL:"var(--spacingVerticalL)",spacingVerticalXL:"var(--spacingVerticalXL)",spacingVerticalXXL:"var(--spacingVerticalXXL)",spacingVerticalXXXL:"var(--spacingVerticalXXXL)",durationUltraFast:"var(--durationUltraFast)",durationFaster:"var(--durationFaster)",durationFast:"var(--durationFast)",durationNormal:"var(--durationNormal)",durationGentle:"var(--durationGentle)",durationSlow:"var(--durationSlow)",durationSlower:"var(--durationSlower)",durationUltraSlow:"var(--durationUltraSlow)",curveAccelerateMax:"var(--curveAccelerateMax)",curveAccelerateMid:"var(--curveAccelerateMid)",curveAccelerateMin:"var(--curveAccelerateMin)",curveDecelerateMax:"var(--curveDecelerateMax)",curveDecelerateMid:"var(--curveDecelerateMid)",curveDecelerateMin:"var(--curveDecelerateMin)",curveEasyEaseMax:"var(--curveEasyEaseMax)",curveEasyEase:"var(--curveEasyEase)",curveLinear:"var(--curveLinear)"},ov={body1:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase300,fontWeight:p.fontWeightRegular,lineHeight:p.lineHeightBase300},body1Strong:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase300,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightBase300},body1Stronger:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase300,fontWeight:p.fontWeightBold,lineHeight:p.lineHeightBase300},body2:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase400,fontWeight:p.fontWeightRegular,lineHeight:p.lineHeightBase400},caption1:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase200,fontWeight:p.fontWeightRegular,lineHeight:p.lineHeightBase200},caption1Strong:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase200,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightBase200},caption1Stronger:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase200,fontWeight:p.fontWeightBold,lineHeight:p.lineHeightBase200},caption2:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase100,fontWeight:p.fontWeightRegular,lineHeight:p.lineHeightBase100},caption2Strong:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase100,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightBase100},subtitle1:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase500,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightBase500},subtitle2:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase400,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightBase400},subtitle2Stronger:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase400,fontWeight:p.fontWeightBold,lineHeight:p.lineHeightBase400},title1:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeHero800,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightHero800},title2:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeHero700,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightHero700},title3:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeBase600,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightBase600},largeTitle:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeHero900,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightHero900},display:{fontFamily:p.fontFamilyBase,fontSize:p.fontSizeHero1000,fontWeight:p.fontWeightSemibold,lineHeight:p.lineHeightHero1000}};function wo(r,e,o=""){return{[`shadow2${o}`]:`0 0 2px ${r}, 0 1px 2px ${e}`,[`shadow4${o}`]:`0 0 2px ${r}, 0 2px 4px ${e}`,[`shadow8${o}`]:`0 0 2px ${r}, 0 4px 8px ${e}`,[`shadow16${o}`]:`0 0 2px ${r}, 0 8px 16px ${e}`,[`shadow28${o}`]:`0 0 8px ${r}, 0 14px 28px ${e}`,[`shadow64${o}`]:`0 0 8px ${r}, 0 32px 64px ${e}`}}var Ge=r=>{let e=Wi(r);return{...xn,...An,...Ln,...Cn,...Hn,...In,...Tn,...$n,...wn,...Nn,...e,...Vi,...To,...wo(e.colorNeutralShadowAmbient,e.colorNeutralShadowKey),...wo(e.colorBrandShadowAmbient,e.colorBrandShadowKey,"Brand")}},Dn={10:"#061724",20:"#082338",30:"#0a2e4a",40:"#0c3b5e",50:"#0e4775",60:"#0f548c",70:"#115ea3",80:"#0f6cbd",90:"#2886de",100:"#479ef5",110:"#62abf5",120:"#77b7f7",130:"#96c6fa",140:"#b4d6fa",150:"#cfe4fa",160:"#ebf3fc"},Se=Vt.reduce((r,e)=>{let o=e.slice(0,1).toUpperCase()+e.slice(1),t={[`colorPalette${o}Background1`]:x[e].shade40,[`colorPalette${o}Background2`]:x[e].shade30,[`colorPalette${o}Background3`]:x[e].primary,[`colorPalette${o}Foreground1`]:x[e].tint30,[`colorPalette${o}Foreground2`]:x[e].tint40,[`colorPalette${o}Foreground3`]:x[e].tint20,[`colorPalette${o}BorderActive`]:x[e].tint30,[`colorPalette${o}Border1`]:x[e].primary,[`colorPalette${o}Border2`]:x[e].tint20};return Object.assign(r,t)},{});Se.colorPaletteRedForeground3=x.red.tint30;Se.colorPaletteRedBorder2=x.red.tint30;Se.colorPaletteGreenForeground3=x.green.tint40;Se.colorPaletteGreenBorder2=x.green.tint40;Se.colorPaletteDarkOrangeForeground3=x.darkOrange.tint30;Se.colorPaletteDarkOrangeBorder2=x.darkOrange.tint30;Se.colorPaletteRedForegroundInverted=x.red.primary;Se.colorPaletteGreenForegroundInverted=x.green.primary;Se.colorPaletteYellowForegroundInverted=x.yellow.shade30;var jt=Wt.reduce((r,e)=>{let o=e.slice(0,1).toUpperCase()+e.slice(1),t={[`colorPalette${o}Background2`]:Me[e].shade30,[`colorPalette${o}Foreground2`]:Me[e].tint40,[`colorPalette${o}BorderActive`]:Me[e].tint30};return Object.assign(r,t)},{});jt.colorPaletteDarkRedBackground2=Me.darkRed.shade20;jt.colorPalettePlumBackground2=Me.plum.shade20;var ji={...Se,...jt},br=Object.entries(pe).reduce((r,[e,o])=>{let t=e.slice(0,1).toUpperCase()+e.slice(1),a={[`colorStatus${t}Background1`]:w[o].shade40,[`colorStatus${t}Background2`]:w[o].shade30,[`colorStatus${t}Background3`]:w[o].primary,[`colorStatus${t}Foreground1`]:w[o].tint30,[`colorStatus${t}Foreground2`]:w[o].tint40,[`colorStatus${t}Foreground3`]:w[o].tint20,[`colorStatus${t}BorderActive`]:w[o].tint30,[`colorStatus${t}ForegroundInverted`]:w[o].shade10,[`colorStatus${t}Border1`]:w[o].primary,[`colorStatus${t}Border2`]:w[o].tint20};return Object.assign(r,a)},{});br.colorStatusDangerForeground3=w[pe.danger].tint30;br.colorStatusDangerBorder2=w[pe.danger].tint30;br.colorStatusSuccessForeground3=w[pe.success].tint40;br.colorStatusSuccessBorder2=w[pe.success].tint40;br.colorStatusWarningForegroundInverted=w[pe.warning].shade20;var $o=Vt.reduce((r,e)=>{let o=e.slice(0,1).toUpperCase()+e.slice(1),t={[`colorPalette${o}Background1`]:Wr,[`colorPalette${o}Background2`]:Wr,[`colorPalette${o}Background3`]:V,[`colorPalette${o}Foreground1`]:V,[`colorPalette${o}Foreground2`]:V,[`colorPalette${o}Foreground3`]:V,[`colorPalette${o}BorderActive`]:Et,[`colorPalette${o}Border1`]:V,[`colorPalette${o}Border2`]:V};return Object.assign(r,t)},{});$o.colorPaletteRedForegroundInverted=V;$o.colorPaletteGreenForegroundInverted=V;$o.colorPaletteYellowForegroundInverted=V;var Gi=Wt.reduce((r,e)=>{let o=e.slice(0,1).toUpperCase()+e.slice(1),t={[`colorPalette${o}Background2`]:Wr,[`colorPalette${o}Foreground2`]:V,[`colorPalette${o}BorderActive`]:Et};return Object.assign(r,t)},{}),tv={...$o,...Gi},av=Object.entries(pe).reduce((r,[e,o])=>{let t=e.slice(0,1).toUpperCase()+e.slice(1),a={[`colorStatus${t}Background1`]:Wr,[`colorStatus${t}Background2`]:Wr,[`colorStatus${t}Background3`]:V,[`colorStatus${t}Foreground1`]:V,[`colorStatus${t}Foreground2`]:V,[`colorStatus${t}Foreground3`]:V,[`colorStatus${t}BorderActive`]:Et,[`colorStatus${t}ForegroundInverted`]:V,[`colorStatus${t}Border1`]:V,[`colorStatus${t}Border2`]:V};return Object.assign(r,a)},{});var Xi=Ge(Dn),_i=r=>({colorNeutralForeground1:k,colorNeutralForeground1Hover:k,colorNeutralForeground1Pressed:k,colorNeutralForeground1Selected:k,colorNeutralForeground2:g[84],colorNeutralForeground2Hover:k,colorNeutralForeground2Pressed:k,colorNeutralForeground2Selected:k,colorNeutralForeground2BrandHover:r[100],colorNeutralForeground2BrandPressed:r[90],colorNeutralForeground2BrandSelected:r[100],colorNeutralForeground3:g[68],colorNeutralForeground3Hover:g[84],colorNeutralForeground3Pressed:g[84],colorNeutralForeground3Selected:g[84],colorNeutralForeground3BrandHover:r[100],colorNeutralForeground3BrandPressed:r[90],colorNeutralForeground3BrandSelected:r[100],colorNeutralForeground4:g[60],colorNeutralForegroundDisabled:g[36],colorNeutralForegroundInvertedDisabled:G[40],colorBrandForegroundLink:r[100],colorBrandForegroundLinkHover:r[110],colorBrandForegroundLinkPressed:r[90],colorBrandForegroundLinkSelected:r[100],colorNeutralForeground2Link:g[84],colorNeutralForeground2LinkHover:k,colorNeutralForeground2LinkPressed:k,colorNeutralForeground2LinkSelected:k,colorCompoundBrandForeground1:r[100],colorCompoundBrandForeground1Hover:r[110],colorCompoundBrandForeground1Pressed:r[90],colorBrandForeground1:r[100],colorBrandForeground2:r[110],colorBrandForeground2Hover:r[130],colorBrandForeground2Pressed:r[160],colorNeutralForeground1Static:g[14],colorNeutralForegroundStaticInverted:k,colorNeutralForegroundInverted:g[14],colorNeutralForegroundInvertedHover:g[14],colorNeutralForegroundInvertedPressed:g[14],colorNeutralForegroundInvertedSelected:g[14],colorNeutralForegroundInverted2:g[14],colorNeutralForegroundOnBrand:k,colorNeutralForegroundInvertedLink:k,colorNeutralForegroundInvertedLinkHover:k,colorNeutralForegroundInvertedLinkPressed:k,colorNeutralForegroundInvertedLinkSelected:k,colorBrandForegroundInverted:r[80],colorBrandForegroundInvertedHover:r[70],colorBrandForegroundInvertedPressed:r[60],colorBrandForegroundOnLight:r[80],colorBrandForegroundOnLightHover:r[70],colorBrandForegroundOnLightPressed:r[50],colorBrandForegroundOnLightSelected:r[60],colorNeutralBackground1:g[16],colorNeutralBackground1Hover:g[24],colorNeutralBackground1Pressed:g[12],colorNeutralBackground1Selected:g[22],colorNeutralBackground2:g[12],colorNeutralBackground2Hover:g[20],colorNeutralBackground2Pressed:g[8],colorNeutralBackground2Selected:g[18],colorNeutralBackground3:g[8],colorNeutralBackground3Hover:g[16],colorNeutralBackground3Pressed:g[4],colorNeutralBackground3Selected:g[14],colorNeutralBackground4:g[4],colorNeutralBackground4Hover:g[12],colorNeutralBackground4Pressed:No,colorNeutralBackground4Selected:g[10],colorNeutralBackground5:No,colorNeutralBackground5Hover:g[8],colorNeutralBackground5Pressed:g[2],colorNeutralBackground5Selected:g[6],colorNeutralBackground6:g[20],colorNeutralBackgroundInverted:k,colorNeutralBackgroundStatic:g[24],colorNeutralBackgroundAlpha:ai[50],colorNeutralBackgroundAlpha2:ni[70],colorSubtleBackground:"transparent",colorSubtleBackgroundHover:g[22],colorSubtleBackgroundPressed:g[18],colorSubtleBackgroundSelected:g[20],colorSubtleBackgroundLightAlphaHover:kn[80],colorSubtleBackgroundLightAlphaPressed:kn[50],colorSubtleBackgroundLightAlphaSelected:"transparent",colorSubtleBackgroundInverted:"transparent",colorSubtleBackgroundInvertedHover:de[10],colorSubtleBackgroundInvertedPressed:de[30],colorSubtleBackgroundInvertedSelected:de[20],colorTransparentBackground:"transparent",colorTransparentBackgroundHover:"transparent",colorTransparentBackgroundPressed:"transparent",colorTransparentBackgroundSelected:"transparent",colorNeutralBackgroundDisabled:g[8],colorNeutralBackgroundInvertedDisabled:G[10],colorNeutralStencil1:g[34],colorNeutralStencil2:g[20],colorNeutralStencil1Alpha:G[10],colorNeutralStencil2Alpha:G[5],colorBackgroundOverlay:de[50],colorScrollbarOverlay:G[60],colorBrandBackground:r[70],colorBrandBackgroundHover:r[80],colorBrandBackgroundPressed:r[40],colorBrandBackgroundSelected:r[60],colorCompoundBrandBackground:r[100],colorCompoundBrandBackgroundHover:r[110],colorCompoundBrandBackgroundPressed:r[90],colorBrandBackgroundStatic:r[80],colorBrandBackground2:r[20],colorBrandBackground2Hover:r[40],colorBrandBackground2Pressed:r[10],colorBrandBackgroundInverted:k,colorBrandBackgroundInvertedHover:r[160],colorBrandBackgroundInvertedPressed:r[140],colorBrandBackgroundInvertedSelected:r[150],colorNeutralStrokeAccessible:g[68],colorNeutralStrokeAccessibleHover:g[74],colorNeutralStrokeAccessiblePressed:g[70],colorNeutralStrokeAccessibleSelected:r[100],colorNeutralStroke1:g[40],colorNeutralStroke1Hover:g[46],colorNeutralStroke1Pressed:g[42],colorNeutralStroke1Selected:g[44],colorNeutralStroke2:g[32],colorNeutralStroke3:g[24],colorNeutralStrokeSubtle:g[4],colorNeutralStrokeOnBrand:g[16],colorNeutralStrokeOnBrand2:k,colorNeutralStrokeOnBrand2Hover:k,colorNeutralStrokeOnBrand2Pressed:k,colorNeutralStrokeOnBrand2Selected:k,colorBrandStroke1:r[100],colorBrandStroke2:r[50],colorBrandStroke2Hover:r[50],colorBrandStroke2Pressed:r[30],colorBrandStroke2Contrast:r[50],colorCompoundBrandStroke:r[100],colorCompoundBrandStrokeHover:r[110],colorCompoundBrandStrokePressed:r[90],colorNeutralStrokeDisabled:g[26],colorNeutralStrokeInvertedDisabled:G[40],colorTransparentStroke:"transparent",colorTransparentStrokeInteractive:"transparent",colorTransparentStrokeDisabled:"transparent",colorNeutralStrokeAlpha:G[10],colorNeutralStrokeAlpha2:G[20],colorStrokeFocus1:No,colorStrokeFocus2:k,colorNeutralShadowAmbient:"rgba(0,0,0,0.24)",colorNeutralShadowKey:"rgba(0,0,0,0.28)",colorNeutralShadowAmbientLighter:"rgba(0,0,0,0.12)",colorNeutralShadowKeyLighter:"rgba(0,0,0,0.14)",colorNeutralShadowAmbientDarker:"rgba(0,0,0,0.40)",colorNeutralShadowKeyDarker:"rgba(0,0,0,0.48)",colorBrandShadowAmbient:"rgba(0,0,0,0.30)",colorBrandShadowKey:"rgba(0,0,0,0.25)"}),Xe=r=>{let e=_i(r);return{...xn,...An,...Ln,...Cn,...Hn,...In,...Tn,...$n,...wn,...Nn,...e,...ji,...br,...wo(e.colorNeutralShadowAmbient,e.colorNeutralShadowKey),...wo(e.colorBrandShadowAmbient,e.colorBrandShadowKey,"Brand")}},Yi=Xe(Dn);function qi(r){let e={},o=Object.keys(r);for(let t of o)e[t]=`var(--${String(t)})`;return e}var Fe={fontFamilyBase:'"Segoe UI Variable Display", "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif'},Io={fontFamilyBase:'SF Pro Text, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif'},X={durationSuperFast:"80ms"},_={curveLinearDecelerateMax:"cubic-bezier(0.55, 0.55, 0, 1)"},te={curveAccelerateMax:"cubic-bezier(1,0,1,1)",curveAccelerateMid:"cubic-bezier(0.7,0,1,0.5)",curveDecelerateMax:"cubic-bezier(0,0,0,1)",curveDecelerateMid:"cubic-bezier(0.1,0.9,0.2,1)",curveEasyEaseMax:"cubic-bezier(0.8,0,0.1,1)"},_e={colorScrollbarForeground:"#00000072",colorScrollbarForegroundHover:"#0000009b",colorScrollbarForegroundPressed:"#0000009e",colorScrollbarOverlay:"#00000080",colorBackgroundOverlay:"#00000066"},Ye={colorScrollbarForeground:"#ffffff8b",colorScrollbarForegroundHover:"#ffffff8b",colorScrollbarForegroundPressed:"#ffffff8b",colorScrollbarOverlay:"#ffffff99",colorBackgroundOverlay:"#00000080"};var Gt={...Ge(F),...Ze,...Fe,...Br,...te,...Mt,...Ee,...We,...ze,..._,...X,..._e},On={...Xe(F),...er,...Fe,...Br,...te,...zt,...Ve,...je,...ze,..._,...X,...Ye},nv={...Ge(F),...Ze,...Fe,...Br,...te,...Xr,...Ee,...jr,...We,...ze,..._,...X,..._e},lv={...Xe(F),...er,...Fe,...Br,...te,..._r,...Ve,...Gr,...je,...ze,..._,...X,...Ye},sv={...Ge(F),...Ze,...Fe,...Lo,...te,...Mt,...Ee,...We,...Ao,..._,...X,..._e},cv={...Xe(F),...er,...Fe,...Lo,...te,...zt,...Ve,...je,...Ao,..._,...X,...Ye},iv={...Ge(F),...Ze,...Fe,...Lo,...te,...Xr,...Ee,...jr,...We,...Ao,..._,...X,..._e},dv={...Xe(F),...er,...Fe,...Lo,...te,..._r,...Ve,...Gr,...je,...Ao,..._,...X,...Ye},uv={...Ge(F),...Ze,...Fe,...Fn,...te,...Xr,...Ee,...jr,...We,...Sn,..._,...X,..._e},gv={...Xe(F),...er,...Fe,...Fn,...te,..._r,...Ve,...Gr,...je,...Sn,..._,...X,...Ye},hv={...Ge(F),...Ze,...Io,...Co,...te,...Mt,...Ee,...We,...Ho,..._,...X,..._e},pv={...Xe(F),...er,...Io,...Co,...te,...zt,...Ve,...je,...Ho,..._,...X,...Ye},vv={...Ge(F),...Ze,...Io,...Co,...te,...Xr,...Ee,...jr,...We,...Ho,..._,...X,..._e},fv={...Xe(F),...er,...Io,...Co,...te,..._r,...Ve,...Gr,...je,...Ho,..._,...X,...Ye},Rn={...Xi,...Xr,...Ee,...jr,...We,...ze,..._,...X,..._e},Mn={...Yi,..._r,...Ve,...Gr,...je,...ze,..._,...X,...Ye};var ae="var(--borderRadiusSmall)",zn="var(--borderRadiusMedium)";var Xt="var(--borderRadiusCircular)";var mr="var(--fontSizeBase200)",Do="var(--fontSizeBase300)";var kr="var(--lineHeightBase200)",Oo="var(--lineHeightBase300)";var ye="var(--fontFamilyBase)";var Pe="var(--fontWeightRegular)";var ve="var(--strokeWidthThin)";var En="var(--spacingHorizontalXXS)",ue="var(--spacingHorizontalXS)";var Te="var(--spacingHorizontalS)",Vn="var(--spacingHorizontalMNudge)",Wn="var(--spacingHorizontalM)",jn="var(--spacingHorizontalL)";var Gn="var(--spacingVerticalXXS)";var Y="var(--colorNeutralForeground1)";var Xn="var(--colorNeutralForeground4)";var _n="var(--colorSubtleBackgroundHover)",Yn="var(--colorSubtleBackgroundPressed)";var Ro="var(--colorNeutralStroke1)",qn="var(--colorNeutralStroke1Hover)",Un="var(--colorNeutralStroke1Pressed)";var Kn="var(--shadow28)";var Mo="var(--micaBackdropFilter)",zo="var(--micaBackgroundBlendMode)",Eo="var(--micaBackgroundColor)";var Qn="var(--shadowBaseLayer)";var Bv=qi(Gt);var Qo=(r,e=document)=>{let o=new CSSStyleSheet,a=Object.keys(r).reduce((n,s)=>n+`--${s}: ${r[s]};`,"");o.replaceSync(`:${e instanceof ShadowRoot?"host":"root"} {${a}}`),e.adoptedStyleSheets.push(o)},Wo,Jn="fast-kernel";try{if(document.currentScript)Wo=document.currentScript.getAttribute(Jn);else{let r=document.getElementsByTagName("script");Wo=r[r.length-1].getAttribute(Jn)}}catch{Wo="isolate"}var rr;switch(Wo){case"share":rr=Object.freeze({updateQueue:1,observable:2,contextEvent:3,elementRegistry:4});break;case"share-v2":rr=Object.freeze({updateQueue:1.2,observable:2.2,contextEvent:3.2,elementRegistry:4.2});break;default:let r=`-${Math.random().toString(36).substring(2,8)}`;rr=Object.freeze({updateQueue:`1.2${r}`,observable:`2.2${r}`,contextEvent:`3.2${r}`,elementRegistry:`4.2${r}`});break}var yr=r=>typeof r=="function",Ie=r=>typeof r=="string",Ui=()=>{};(function(){if(!(typeof globalThis<"u"))if(typeof global<"u")global.globalThis=global;else if(typeof self<"u")self.globalThis=self;else if(typeof window<"u")window.globalThis=window;else{let e=new Function("return this")();e.globalThis=e}})();var Nl={configurable:!1,enumerable:!1,writable:!1};globalThis.FAST===void 0&&Reflect.defineProperty(globalThis,"FAST",Object.assign({value:Object.create(null)},Nl));var q=globalThis.FAST;if(q.getById===void 0){let r=Object.create(null);Reflect.defineProperty(q,"getById",Object.assign({value(e,o){let t=r[e];return t===void 0&&(t=o?r[e]=o():null),t}},Nl))}q.error===void 0&&Object.assign(q,{warn(){},error(r){return new Error(`Error ${r}`)},addMessages(){}});var wl=Object.freeze([]);function oa(){let r=new Map;return Object.freeze({register(e){return r.has(e.type)?!1:(r.set(e.type,e),!0)},getByType(e){return r.get(e)},getForInstance(e){if(e!=null)return r.get(e.constructor)}})}function Al(){let r=new WeakMap;return function(e){let o=r.get(e);if(o===void 0){let t=Reflect.getPrototypeOf(e);for(;o===void 0&&t!==null;)o=r.get(t),t=Reflect.getPrototypeOf(t);o=o===void 0?[]:o.slice(0),r.set(e,o)}return o}}function Pr(r){r.prototype.toJSON=Ui}var Z=Object.freeze({none:0,attribute:1,booleanAttribute:2,property:3,content:4,tokenList:5,event:6}),Zn=r=>r,Ki=globalThis.trustedTypes?globalThis.trustedTypes.createPolicy("fast-html",{createHTML:Zn}):{createHTML:Zn},jo=Object.freeze({createHTML(r){return Ki.createHTML(r)},protect(r,e,o,t){return t}}),Qi=jo,Fr=Object.freeze({get policy(){return jo},setPolicy(r){if(jo!==Qi)throw q.error(1201);jo=r},setAttribute(r,e,o){o==null?r.removeAttribute(e):r.setAttribute(e,o)},setBooleanAttribute(r,e,o){o?r.setAttribute(e,""):r.removeAttribute(e)}}),_o=q.getById(rr.updateQueue,()=>{let r=[],e=[],o=globalThis.requestAnimationFrame,t=!0;function a(){if(e.length)throw e.shift()}function n(d){try{d.call()}catch(c){if(t)e.push(c),setTimeout(a,0);else throw r.length=0,c}}function s(){let c=0;for(;c<r.length;)if(n(r[c]),c++,c>1024){for(let l=0,u=r.length-c;l<u;l++)r[l]=r[l+c];r.length-=c,c=0}r.length=0}function i(d){r.push(d),r.length<2&&(t?o(s):s())}return Object.freeze({enqueue:i,next:()=>new Promise(i),process:s,setMode:d=>t=d})}),Qt=class{constructor(r,e){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.subject=r,this.sub1=e}has(r){return this.spillover===void 0?this.sub1===r||this.sub2===r:this.spillover.indexOf(r)!==-1}subscribe(r){let e=this.spillover;if(e===void 0){if(this.has(r))return;if(this.sub1===void 0){this.sub1=r;return}if(this.sub2===void 0){this.sub2=r;return}this.spillover=[this.sub1,this.sub2,r],this.sub1=void 0,this.sub2=void 0}else e.indexOf(r)===-1&&e.push(r)}unsubscribe(r){let e=this.spillover;if(e===void 0)this.sub1===r?this.sub1=void 0:this.sub2===r&&(this.sub2=void 0);else{let o=e.indexOf(r);o!==-1&&e.splice(o,1)}}notify(r){let e=this.spillover,o=this.subject;if(e===void 0){let t=this.sub1,a=this.sub2;t!==void 0&&t.handleChange(o,r),a!==void 0&&a.handleChange(o,r)}else for(let t=0,a=e.length;t<a;++t)e[t].handleChange(o,r)}},Ll=class{constructor(r){this.subscribers={},this.subjectSubscribers=null,this.subject=r}notify(r){var e,o;(e=this.subscribers[r])===null||e===void 0||e.notify(r),(o=this.subjectSubscribers)===null||o===void 0||o.notify(r)}subscribe(r,e){var o,t;let a;e?a=(o=this.subscribers[e])!==null&&o!==void 0?o:this.subscribers[e]=new Qt(this.subject):a=(t=this.subjectSubscribers)!==null&&t!==void 0?t:this.subjectSubscribers=new Qt(this.subject),a.subscribe(r)}unsubscribe(r,e){var o,t;e?(o=this.subscribers[e])===null||o===void 0||o.unsubscribe(r):(t=this.subjectSubscribers)===null||t===void 0||t.unsubscribe(r)}},ta=Object.freeze({unknown:void 0,coupled:1}),fe=q.getById(rr.observable,()=>{let r=_o.enqueue,e=/(:|&&|\|\||if|\?\.)/,o=new WeakMap,t,a=c=>{throw q.error(1101)};function n(c){var l;let u=(l=c.$fastController)!==null&&l!==void 0?l:o.get(c);return u===void 0&&(Array.isArray(c)?u=a(c):o.set(c,u=new Ll(c))),u}let s=Al();class i{constructor(l){this.name=l,this.field=`_${l}`,this.callback=`${l}Changed`}getValue(l){return t!==void 0&&t.watch(l,this.name),l[this.field]}setValue(l,u){let h=this.field,B=l[h];if(B!==u){l[h]=u;let A=l[this.callback];yr(A)&&A.call(l,B,u),n(l).notify(this.name)}}}class d extends Qt{constructor(l,u,h=!1){super(l,u),this.expression=l,this.isVolatileBinding=h,this.needsRefresh=!0,this.needsQueue=!0,this.isAsync=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}setMode(l){this.isAsync=this.needsQueue=l}bind(l){this.controller=l;let u=this.observe(l.source,l.context);return!l.isBound&&this.requiresUnbind(l)&&l.onUnbind(this),u}requiresUnbind(l){return l.sourceLifetime!==ta.coupled||this.first!==this.last||this.first.propertySource!==l.source}unbind(l){this.dispose()}observe(l,u){this.needsRefresh&&this.last!==null&&this.dispose();let h=t;t=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;let B;try{B=this.expression(l,u)}finally{t=h}return B}disconnect(){this.dispose()}dispose(){if(this.last!==null){let l=this.first;for(;l!==void 0;)l.notifier.unsubscribe(this,l.propertyName),l=l.next;this.last=null,this.needsRefresh=this.needsQueue=this.isAsync}}watch(l,u){let h=this.last,B=n(l),A=h===null?this.first:{};if(A.propertySource=l,A.propertyName=u,A.notifier=B,B.subscribe(this,u),h!==null){if(!this.needsRefresh){let ge;t=void 0,ge=h.propertySource[h.propertyName],t=this,l===ge&&(this.needsRefresh=!0)}h.next=A}this.last=A}handleChange(){this.needsQueue?(this.needsQueue=!1,r(this)):this.isAsync||this.call()}call(){this.last!==null&&(this.needsQueue=this.isAsync,this.notify(this))}*records(){let l=this.first;for(;l!==void 0;)yield l,l=l.next}}return Pr(d),Object.freeze({setArrayObserverFactory(c){a=c},getNotifier:n,track(c,l){t&&t.watch(c,l)},trackVolatile(){t&&(t.needsRefresh=!0)},notify(c,l){n(c).notify(l)},defineProperty(c,l){Ie(l)&&(l=new i(l)),s(c).push(l),Reflect.defineProperty(c,l.name,{enumerable:!0,get(){return l.getValue(this)},set(u){l.setValue(this,u)}})},getAccessors:s,binding(c,l,u=this.isVolatileBinding(c)){return new d(c,l,u)},isVolatileBinding(c){return e.test(c.toString())}})});function Hl(r,e){fe.defineProperty(r,e)}var el=q.getById(rr.contextEvent,()=>{let r=null;return{get(){return r},set(e){r=e}}}),Qr=Object.freeze({default:{index:0,length:0,get event(){return Qr.getEvent()},eventDetail(){return this.event.detail},eventTarget(){return this.event.target}},getEvent(){return el.get()},setEvent(r){el.set(r)}}),Jo=class{constructor(r,e,o=!1){this.evaluate=r,this.policy=e,this.isVolatile=o}},Ji=class extends Jo{createObserver(r){return fe.binding(this.evaluate,r,this.isVolatile)}};function Cl(r,e,o=fe.isVolatileBinding(r)){return new Ji(r,e,o)}var Tl=class extends Jo{createObserver(){return this}bind(r){return this.evaluate(r.source,r.context)}};Pr(Tl);function $l(r,e){return new Tl(r,e)}var rl;function Il(r){return r.map(e=>e instanceof $e?Il(e.styles):[e]).reduce((e,o)=>e.concat(o),[])}var $e=class Ur{constructor(e){this.styles=e,this.targets=new WeakSet,this._strategy=null,this.behaviors=e.map(o=>o instanceof Ur?o.behaviors:null).reduce((o,t)=>t===null?o:o===null?t:o.concat(t),null)}get strategy(){return this._strategy===null&&this.withStrategy(rl),this._strategy}addStylesTo(e){this.strategy.addStylesTo(e),this.targets.add(e)}removeStylesFrom(e){this.strategy.removeStylesFrom(e),this.targets.delete(e)}isAttachedTo(e){return this.targets.has(e)}withBehaviors(...e){return this.behaviors=this.behaviors===null?e:this.behaviors.concat(e),this}withStrategy(e){return this._strategy=new e(Il(this.styles)),this}static setDefaultStrategy(e){rl=e}static normalize(e){return e===void 0?void 0:Array.isArray(e)?new Ur(e):e instanceof Ur?e:new Ur([e])}};$e.supportsAdoptedStyleSheets=Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype;var _t=oa(),aa=Object.freeze({getForInstance:_t.getForInstance,getByType:_t.getByType,define(r){return _t.register({type:r}),r}});function Yt(r,e,o){e.source.style.setProperty(r.targetAspect,o.bind(e))}var Jt=class{constructor(r,e){this.dataBinding=r,this.targetAspect=e}createCSS(r){return r(this),`var(${this.targetAspect})`}addedCallback(r){var e;let o=r.source;if(!o.$cssBindings){o.$cssBindings=new Map;let a=o.setAttribute;o.setAttribute=(n,s)=>{a.call(o,n,s),n==="style"&&o.$cssBindings.forEach((i,d)=>Yt(d,i.controller,i.observer))}}let t=(e=r[this.targetAspect])!==null&&e!==void 0?e:r[this.targetAspect]=this.dataBinding.createObserver(this,this);t.controller=r,r.source.$cssBindings.set(this,{controller:r,observer:t})}connectedCallback(r){Yt(this,r,r[this.targetAspect])}removedCallback(r){r.source.$cssBindings&&r.source.$cssBindings.delete(this)}handleChange(r,e){Yt(this,e.controller,e)}};aa.define(Jt);var Zi=`${Math.random().toString(36).substring(2,8)}`,ed=0,ol=()=>`--v${Zi}${++ed}`;function Dl(r,e){let o=[],t="",a=[],n=s=>{a.push(s)};for(let s=0,i=r.length-1;s<i;++s){t+=r[s];let d=e[s];yr(d)?d=new Jt(Cl(d),ol()).createCSS(n):d instanceof Jo?d=new Jt(d,ol()).createCSS(n):aa.getForInstance(d)!==void 0&&(d=d.createCSS(n)),d instanceof $e||d instanceof CSSStyleSheet?(t.trim()!==""&&(o.push(t),t=""),o.push(d)):t+=d}return t+=r[r.length-1],t.trim()!==""&&o.push(t),{styles:o,behaviors:a}}var Zt=(r,...e)=>{let{styles:o,behaviors:t}=Dl(r,e),a=new $e(o);return t.length?a.withBehaviors(...t):a},Ol=class{constructor(r,e){this.behaviors=e,this.css="";let o=r.reduce((t,a)=>(Ie(a)?this.css+=a:t.push(a),t),[]);o.length&&(this.styles=new $e(o))}createCSS(r){return this.behaviors.forEach(r),this.styles&&r(this),this.css}addedCallback(r){r.addStyles(this.styles)}removedCallback(r){r.removeStyles(this.styles)}};aa.define(Ol);Zt.partial=(r,...e)=>{let{styles:o,behaviors:t}=Dl(r,e);return new Ol(o,t)};var na=`fast-${Math.random().toString(36).substring(2,8)}`,Go=`${na}{`,Kr=`}${na}`,rd=Kr.length,od=0,la=()=>`${na}-${++od}`,Rl=Object.freeze({interpolation:r=>`${Go}${r}${Kr}`,attribute:r=>`${la()}="${Go}${r}${Kr}"`,comment:r=>`<!--${Go}${r}${Kr}-->`}),Zo=Object.freeze({parse(r,e){let o=r.split(Go);if(o.length===1)return null;let t=[];for(let a=0,n=o.length;a<n;++a){let s=o[a],i=s.indexOf(Kr),d;if(i===-1)d=s;else{let c=s.substring(0,i);t.push(e[c]),d=s.substring(i+rd)}d!==""&&t.push(d)}return t}}),qt=oa(),Ne=Object.freeze({getForInstance:qt.getForInstance,getByType:qt.getByType,define(r,e){return e=e||{},e.type=r,qt.register(e),r},assignAspect(r,e){if(!e){r.aspectType=Z.content;return}switch(r.sourceAspect=e,e[0]){case":":r.targetAspect=e.substring(1),r.aspectType=r.targetAspect==="classList"?Z.tokenList:Z.property;break;case"?":r.targetAspect=e.substring(1),r.aspectType=Z.booleanAttribute;break;case"@":r.targetAspect=e.substring(1),r.aspectType=Z.event;break;default:r.targetAspect=e,r.aspectType=Z.attribute;break}}}),sa=class{constructor(r){this.options=r}createHTML(r){return Rl.attribute(r(this))}createBehavior(){return this}};Pr(sa);function td(r,e,o,t){if(o==null&&(o=""),o.create){r.textContent="";let a=r.$fastView;a===void 0?a=o.create():r.$fastTemplate!==o&&(a.isComposed&&(a.remove(),a.unbind()),a=o.create()),a.isComposed?a.needsBindOnly&&(a.needsBindOnly=!1,a.bind(t.source,t.context)):(a.isComposed=!0,a.bind(t.source,t.context),a.insertBefore(r),r.$fastView=a,r.$fastTemplate=o)}else{let a=r.$fastView;a!==void 0&&a.isComposed&&(a.isComposed=!1,a.remove(),a.needsBindOnly?a.needsBindOnly=!1:a.unbind()),r.textContent=o}}function ad(r,e,o){var t;let a=`${this.id}-t`,n=(t=r[a])!==null&&t!==void 0?t:r[a]={v:0,cv:Object.create(null)},s=n.cv,i=n.v,d=r[e];if(o!=null&&o.length){let c=o.split(/\s+/);for(let l=0,u=c.length;l<u;++l){let h=c[l];h!==""&&(s[h]=i,d.add(h))}}if(n.v=i+1,i!==0){i-=1;for(let c in s)s[c]===i&&d.remove(c)}}var nd={[Z.attribute]:Fr.setAttribute,[Z.booleanAttribute]:Fr.setBooleanAttribute,[Z.property]:(r,e,o)=>r[e]=o,[Z.content]:td,[Z.tokenList]:ad,[Z.event]:()=>{}},Sr=class{constructor(r){this.dataBinding=r,this.updateTarget=null,this.aspectType=Z.content}createHTML(r){return Rl.interpolation(r(this))}createBehavior(){var r;if(this.updateTarget===null){let e=nd[this.aspectType],o=(r=this.dataBinding.policy)!==null&&r!==void 0?r:this.policy;if(!e)throw q.error(1205);this.data=`${this.id}-d`,this.updateTarget=o.protect(this.targetTagName,this.aspectType,this.targetAspect,e)}return this}bind(r){var e;let o=r.targets[this.targetNodeId];switch(this.aspectType){case Z.event:o[this.data]=r,o.addEventListener(this.targetAspect,this,this.dataBinding.options);break;case Z.content:r.onUnbind(this);default:let t=(e=o[this.data])!==null&&e!==void 0?e:o[this.data]=this.dataBinding.createObserver(this,this);t.target=o,t.controller=r,this.updateTarget(o,this.targetAspect,t.bind(r),r);break}}unbind(r){let o=r.targets[this.targetNodeId].$fastView;o!==void 0&&o.isComposed&&(o.unbind(),o.needsBindOnly=!0)}handleEvent(r){let e=r.currentTarget[this.data];if(e.isBound){Qr.setEvent(r);let o=this.dataBinding.evaluate(e.source,e.context);Qr.setEvent(null),o!==!0&&r.preventDefault()}}handleChange(r,e){let o=e.target,t=e.controller;this.updateTarget(o,this.targetAspect,e.bind(t),t)}};Ne.define(Sr,{aspected:!0});function tl(r,e){let o=r.parentNode,t=r,a;for(;t!==e;)a=t.nextSibling,o.removeChild(t),t=a;o.removeChild(e)}var et=class{constructor(r,e,o){this.fragment=r,this.factories=e,this.targets=o,this.behaviors=null,this.unbindables=[],this.source=null,this.isBound=!1,this.sourceLifetime=ta.unknown,this.context=this,this.index=0,this.length=0,this.firstChild=r.firstChild,this.lastChild=r.lastChild}get event(){return Qr.getEvent()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}eventDetail(){return this.event.detail}eventTarget(){return this.event.target}appendTo(r){r.appendChild(this.fragment)}insertBefore(r){if(this.fragment.hasChildNodes())r.parentNode.insertBefore(this.fragment,r);else{let e=this.lastChild;if(r.previousSibling===e)return;let o=r.parentNode,t=this.firstChild,a;for(;t!==e;)a=t.nextSibling,o.insertBefore(t,r),t=a;o.insertBefore(e,r)}}remove(){let r=this.fragment,e=this.lastChild,o=this.firstChild,t;for(;o!==e;)t=o.nextSibling,r.appendChild(o),o=t;r.appendChild(e)}dispose(){tl(this.firstChild,this.lastChild),this.unbind()}onUnbind(r){this.unbindables.push(r)}bind(r,e=this){if(this.source===r)return;let o=this.behaviors;if(o===null){this.source=r,this.context=e,this.behaviors=o=new Array(this.factories.length);let t=this.factories;for(let a=0,n=t.length;a<n;++a){let s=t[a].createBehavior();s.bind(this),o[a]=s}}else{this.source!==null&&this.evaluateUnbindables(),this.isBound=!1,this.source=r,this.context=e;for(let t=0,a=o.length;t<a;++t)o[t].bind(this)}this.isBound=!0}unbind(){!this.isBound||this.source===null||(this.evaluateUnbindables(),this.source=null,this.context=this,this.isBound=!1)}evaluateUnbindables(){let r=this.unbindables;for(let e=0,o=r.length;e<o;++e)r[e].unbind(this);r.length=0}static disposeContiguousBatch(r){if(r.length!==0){tl(r[0].firstChild,r[r.length-1].lastChild);for(let e=0,o=r.length;e<o;++e)r[e].unbind()}}};Pr(et);fe.defineProperty(et.prototype,"index");fe.defineProperty(et.prototype,"length");var Ml=(r,e)=>`${r}.${e}`,al={},xe={index:0,node:null};function nl(r){r.startsWith("fast-")||q.warn(1204,{name:r})}var ld=new Proxy(document.createElement("div"),{get(r,e){nl(e);let o=Reflect.get(r,e);return yr(o)?o.bind(r):o},set(r,e,o){return nl(e),Reflect.set(r,e,o)}}),sd=class{constructor(r,e,o){this.fragment=r,this.directives=e,this.policy=o,this.proto=null,this.nodeIds=new Set,this.descriptors={},this.factories=[]}addFactory(r,e,o,t,a){var n,s;this.nodeIds.has(o)||(this.nodeIds.add(o),this.addTargetDescriptor(e,o,t)),r.id=(n=r.id)!==null&&n!==void 0?n:la(),r.targetNodeId=o,r.targetTagName=a,r.policy=(s=r.policy)!==null&&s!==void 0?s:this.policy,this.factories.push(r)}freeze(){return this.proto=Object.create(null,this.descriptors),this}addTargetDescriptor(r,e,o){let t=this.descriptors;if(e==="r"||e==="h"||t[e])return;if(!t[r]){let n=r.lastIndexOf("."),s=r.substring(0,n),i=parseInt(r.substring(n+1));this.addTargetDescriptor(s,r,i)}let a=al[e];if(!a){let n=`_${e}`;al[e]=a={get(){var s;return(s=this[n])!==null&&s!==void 0?s:this[n]=this[r].childNodes[o]}}}t[e]=a}createView(r){let e=this.fragment.cloneNode(!0),o=Object.create(this.proto);o.r=e,o.h=r??ld;for(let t of this.nodeIds)o[t];return new et(e,this.factories,o)}};function zl(r,e,o,t,a,n=!1){let s=o.attributes,i=r.directives;for(let d=0,c=s.length;d<c;++d){let l=s[d],u=l.value,h=Zo.parse(u,i),B=null;h===null?n&&(B=new Sr($l(()=>u,r.policy)),Ne.assignAspect(B,l.name)):B=ca.aggregate(h,r.policy),B!==null&&(o.removeAttributeNode(l),d--,c--,r.addFactory(B,e,t,a,o.tagName))}}function cd(r,e,o,t,a){let n=Zo.parse(e.textContent,r.directives);if(n===null)return xe.node=e.nextSibling,xe.index=a+1,xe;let s,i=s=e;for(let d=0,c=n.length;d<c;++d){let l=n[d];d!==0&&(a++,t=Ml(o,a),s=i.parentNode.insertBefore(document.createTextNode(""),i.nextSibling)),Ie(l)?s.textContent=l:(s.textContent=" ",Ne.assignAspect(l),r.addFactory(l,o,t,a,null)),i=s}return xe.index=a+1,xe.node=i.nextSibling,xe}function El(r,e,o){let t=0,a=e.firstChild;for(;a;){let n=id(r,o,a,t);a=n.node,t=n.index}}function id(r,e,o,t){let a=Ml(e,t);switch(o.nodeType){case 1:zl(r,e,o,a,t),El(r,o,a);break;case 3:return cd(r,o,e,a,t);case 8:let n=Zo.parse(o.data,r.directives);n!==null&&r.addFactory(ca.aggregate(n),e,a,t,null);break}return xe.index=t+1,xe.node=o.nextSibling,xe}function dd(r,e){return r&&r.nodeType==8&&Zo.parse(r.data,e)!==null}var ll="TEMPLATE",ca={compile(r,e,o=Fr.policy){let t;if(Ie(r)){t=document.createElement(ll),t.innerHTML=o.createHTML(r);let s=t.content.firstElementChild;s!==null&&s.tagName===ll&&(t=s)}else t=r;!t.content.firstChild&&!t.content.lastChild&&t.content.appendChild(document.createComment(""));let a=document.adoptNode(t.content),n=new sd(a,e,o);return zl(n,"",t,"h",0,!0),(dd(a.firstChild,e)||a.childNodes.length===1&&Object.keys(e).length>0)&&a.insertBefore(document.createComment(""),a.firstChild),El(n,a,"r"),xe.node=null,n.freeze()},setDefaultStrategy(r){this.compile=r},aggregate(r,e=Fr.policy){if(r.length===1)return r[0];let o,t,a=!1,n,s=r.length,i=r.map(l=>Ie(l)?()=>l:(o=l.sourceAspect||o,t=l.dataBinding||t,a=a||l.dataBinding.isVolatile,n=n||l.dataBinding.policy,l.dataBinding.evaluate)),d=(l,u)=>{let h="";for(let B=0;B<s;++B)h+=i[B](l,u);return h};t.evaluate=d,t.isVolatile=a,t.policy=n??e;let c=new Sr(t);return Ne.assignAspect(c,o),c}},ud=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,gd=Object.create(null),or=class{constructor(r,e=gd){this.html=r,this.factories=e}createHTML(r){let e=this.factories;for(let o in e)r(e[o]);return this.html}};or.empty=new or("");Ne.define(or);function hd(r,e,o,t=Ne.getForInstance(r)){if(t.aspected){let a=ud.exec(e);a!==null&&Ne.assignAspect(r,a[2])}return r.createHTML(o)}var Vl=class Wl{constructor(e,o={},t){this.policy=t,this.result=null,this.html=e,this.factories=o}create(e){return this.result===null&&(this.result=ca.compile(this.html,this.factories,this.policy)),this.result.createView(e)}inline(){return new or(Ie(this.html)?this.html:this.html.innerHTML,this.factories)}withPolicy(e){if(this.result)throw q.error(1208);if(this.policy)throw q.error(1207);return this.policy=e,this}render(e,o,t){let a=this.create(t);return a.bind(e),a.appendTo(o),a}static create(e,o,t){let a="",n=Object.create(null),s=i=>{var d;let c=(d=i.id)!==null&&d!==void 0?d:i.id=la();return n[c]=i,c};for(let i=0,d=e.length-1;i<d;++i){let c=e[i],l=o[i],u;if(a+=c,yr(l))l=new Sr(Cl(l));else if(l instanceof Jo)l=new Sr(l);else if(!(u=Ne.getForInstance(l))){let h=l;l=new Sr($l(()=>h))}a+=hd(l,c,s,u)}return new Wl(a+e[e.length-1],n,t)}};Pr(Vl);var rt=(r,...e)=>{if(Array.isArray(r)&&Array.isArray(r.raw))return Vl.create(r,e);throw q.error(1206)};rt.partial=r=>new or(r);var jl=class extends sa{bind(r){r.source[this.options]=r.targets[this.targetNodeId]}};Ne.define(jl);var ia=r=>new jl(r),pd=class extends sa{get id(){return this._id}set id(r){this._id=r,this._controllerProperty=`${r}-c`}bind(r){let e=r.targets[this.targetNodeId];e[this._controllerProperty]=r,this.updateTarget(r.source,this.computeNodes(e)),this.observe(e),r.onUnbind(this)}unbind(r){let e=r.targets[this.targetNodeId];this.updateTarget(r.source,wl),this.disconnect(e),e[this._controllerProperty]=null}getSource(r){return r[this._controllerProperty].source}updateTarget(r,e){r[this.options.property]=e}computeNodes(r){let e=this.getNodes(r);return"filter"in this.options&&(e=e.filter(this.options.filter)),e}},sl="slotchange",Gl=class extends pd{observe(r){r.addEventListener(sl,this)}disconnect(r){r.removeEventListener(sl,this)}getNodes(r){return r.assignedNodes(this.options)}handleEvent(r){let e=r.currentTarget;this.updateTarget(this.getSource(e),this.computeNodes(e))}};Ne.define(Gl);function vd(r){return Ie(r)&&(r={property:r}),new Gl(r)}var cl="boolean",il="reflect",Yo=Object.freeze({locate:Al()}),fd={toView(r){return r?"true":"false"},fromView(r){return!(r==null||r==="false"||r===!1||r===0)}},Bd=class ea{constructor(e,o,t=o.toLowerCase(),a=il,n){this.guards=new Set,this.Owner=e,this.name=o,this.attribute=t,this.mode=a,this.converter=n,this.fieldName=`_${o}`,this.callbackName=`${o}Changed`,this.hasCallback=this.callbackName in e.prototype,a===cl&&n===void 0&&(this.converter=fd)}setValue(e,o){let t=e[this.fieldName],a=this.converter;a!==void 0&&(o=a.fromView(o)),t!==o&&(e[this.fieldName]=o,this.tryReflectToAttribute(e),this.hasCallback&&e[this.callbackName](t,o),e.$fastController.notify(this.name))}getValue(e){return fe.track(e,this.name),e[this.fieldName]}onAttributeChangedCallback(e,o){this.guards.has(e)||(this.guards.add(e),this.setValue(e,o),this.guards.delete(e))}tryReflectToAttribute(e){let o=this.mode,t=this.guards;t.has(e)||o==="fromView"||_o.enqueue(()=>{t.add(e);let a=e[this.fieldName];switch(o){case il:let n=this.converter;Fr.setAttribute(e,this.attribute,n!==void 0?n.toView(a):a);break;case cl:Fr.setBooleanAttribute(e,this.attribute,a);break}t.delete(e)})}static collect(e,...o){let t=[];o.push(Yo.locate(e));for(let a=0,n=o.length;a<n;++a){let s=o[a];if(s!==void 0)for(let i=0,d=s.length;i<d;++i){let c=s[i];Ie(c)?t.push(new ea(e,c)):t.push(new ea(e,c.property,c.attribute,c.mode,c.converter))}}return t}};function S(r,e){let o;function t(a,n){arguments.length>1&&(o.property=n),Yo.locate(a.constructor).push(o)}if(arguments.length>1){o={},t(r,e);return}return o=r===void 0?{}:r,t}var dl={mode:"open"},ul={},gl=new Set,qo=q.getById(rr.elementRegistry,()=>oa()),qe=class ra{constructor(e,o=e.definition){var t;this.platformDefined=!1,Ie(o)&&(o={name:o}),this.type=e,this.name=o.name,this.template=o.template,this.registry=(t=o.registry)!==null&&t!==void 0?t:customElements;let a=e.prototype,n=Bd.collect(e,o.attributes),s=new Array(n.length),i={},d={};for(let c=0,l=n.length;c<l;++c){let u=n[c];s[c]=u.attribute,i[u.name]=u,d[u.attribute]=u,fe.defineProperty(a,u)}Reflect.defineProperty(e,"observedAttributes",{value:s,enumerable:!0}),this.attributes=n,this.propertyLookup=i,this.attributeLookup=d,this.shadowOptions=o.shadowOptions===void 0?dl:o.shadowOptions===null?void 0:Object.assign(Object.assign({},dl),o.shadowOptions),this.elementOptions=o.elementOptions===void 0?ul:Object.assign(Object.assign({},ul),o.elementOptions),this.styles=$e.normalize(o.styles),qo.register(this)}get isDefined(){return this.platformDefined}define(e=this.registry){let o=this.type;return e.get(this.name)||(this.platformDefined=!0,e.define(this.name,o,this.elementOptions)),this}static compose(e,o){return gl.has(e)||qo.getByType(e)?new ra(class extends e{},o):new ra(e,o)}static registerBaseType(e){gl.add(e)}};qe.getByType=qo.getByType;qe.getForInstance=qo.getForInstance;var bd={bubbles:!0,composed:!0,cancelable:!0},Ut="isConnected",Xl=new WeakMap;function Xo(r){var e,o;return(o=(e=r.shadowRoot)!==null&&e!==void 0?e:Xl.get(r))!==null&&o!==void 0?o:null}var hl,Uo=class extends Ll{constructor(r,e){super(r),this.boundObservables=null,this.needsInitialization=!0,this.hasExistingShadowRoot=!1,this._template=null,this.stage=3,this.guardBehaviorConnection=!1,this.behaviors=null,this._mainStyles=null,this.$fastController=this,this.view=null,this.source=r,this.definition=e;let o=e.shadowOptions;if(o!==void 0){let a=r.shadowRoot;a?this.hasExistingShadowRoot=!0:(a=r.attachShadow(o),o.mode==="closed"&&Xl.set(r,a))}let t=fe.getAccessors(r);if(t.length>0){let a=this.boundObservables=Object.create(null);for(let n=0,s=t.length;n<s;++n){let i=t[n].name,d=r[i];d!==void 0&&(delete r[i],a[i]=d)}}}get isConnected(){return fe.track(this,Ut),this.stage===1}get context(){var r,e;return(e=(r=this.view)===null||r===void 0?void 0:r.context)!==null&&e!==void 0?e:Qr.default}get isBound(){var r,e;return(e=(r=this.view)===null||r===void 0?void 0:r.isBound)!==null&&e!==void 0?e:!1}get sourceLifetime(){var r;return(r=this.view)===null||r===void 0?void 0:r.sourceLifetime}get template(){var r;if(this._template===null){let e=this.definition;this.source.resolveTemplate?this._template=this.source.resolveTemplate():e.template&&(this._template=(r=e.template)!==null&&r!==void 0?r:null)}return this._template}set template(r){this._template!==r&&(this._template=r,this.needsInitialization||this.renderTemplate(r))}get mainStyles(){var r;if(this._mainStyles===null){let e=this.definition;this.source.resolveStyles?this._mainStyles=this.source.resolveStyles():e.styles&&(this._mainStyles=(r=e.styles)!==null&&r!==void 0?r:null)}return this._mainStyles}set mainStyles(r){this._mainStyles!==r&&(this._mainStyles!==null&&this.removeStyles(this._mainStyles),this._mainStyles=r,this.needsInitialization||this.addStyles(r))}onUnbind(r){var e;(e=this.view)===null||e===void 0||e.onUnbind(r)}addBehavior(r){var e,o;let t=(e=this.behaviors)!==null&&e!==void 0?e:this.behaviors=new Map,a=(o=t.get(r))!==null&&o!==void 0?o:0;a===0?(t.set(r,1),r.addedCallback&&r.addedCallback(this),r.connectedCallback&&!this.guardBehaviorConnection&&(this.stage===1||this.stage===0)&&r.connectedCallback(this)):t.set(r,a+1)}removeBehavior(r,e=!1){let o=this.behaviors;if(o===null)return;let t=o.get(r);t!==void 0&&(t===1||e?(o.delete(r),r.disconnectedCallback&&this.stage!==3&&r.disconnectedCallback(this),r.removedCallback&&r.removedCallback(this)):o.set(r,t-1))}addStyles(r){var e;if(!r)return;let o=this.source;if(r instanceof HTMLElement)((e=Xo(o))!==null&&e!==void 0?e:this.source).append(r);else if(!r.isAttachedTo(o)){let t=r.behaviors;if(r.addStylesTo(o),t!==null)for(let a=0,n=t.length;a<n;++a)this.addBehavior(t[a])}}removeStyles(r){var e;if(!r)return;let o=this.source;if(r instanceof HTMLElement)((e=Xo(o))!==null&&e!==void 0?e:o).removeChild(r);else if(r.isAttachedTo(o)){let t=r.behaviors;if(r.removeStylesFrom(o),t!==null)for(let a=0,n=t.length;a<n;++a)this.removeBehavior(t[a])}}connect(){if(this.stage!==3)return;if(this.stage=0,this.boundObservables!==null){let e=this.source,o=this.boundObservables,t=Object.keys(o);for(let a=0,n=t.length;a<n;++a){let s=t[a];e[s]=o[s]}this.boundObservables=null}let r=this.behaviors;if(r!==null){this.guardBehaviorConnection=!0;for(let e of r.keys())e.connectedCallback&&e.connectedCallback(this);this.guardBehaviorConnection=!1}this.needsInitialization?(this.renderTemplate(this.template),this.addStyles(this.mainStyles),this.needsInitialization=!1):this.view!==null&&this.view.bind(this.source),this.stage=1,fe.notify(this,Ut)}disconnect(){if(this.stage!==1)return;this.stage=2,fe.notify(this,Ut),this.view!==null&&this.view.unbind();let r=this.behaviors;if(r!==null)for(let e of r.keys())e.disconnectedCallback&&e.disconnectedCallback(this);this.stage=3}onAttributeChangedCallback(r,e,o){let t=this.definition.attributeLookup[r];t!==void 0&&t.onAttributeChangedCallback(this.source,o)}emit(r,e,o){return this.stage===1?this.source.dispatchEvent(new CustomEvent(r,Object.assign(Object.assign({detail:e},bd),o))):!1}renderTemplate(r){var e;let o=this.source,t=(e=Xo(o))!==null&&e!==void 0?e:o;if(this.view!==null)this.view.dispose(),this.view=null;else if(!this.needsInitialization||this.hasExistingShadowRoot){this.hasExistingShadowRoot=!1;for(let a=t.firstChild;a!==null;a=t.firstChild)t.removeChild(a)}r&&(this.view=r.render(o,t,o),this.view.sourceLifetime=ta.coupled)}static forCustomElement(r){let e=r.$fastController;if(e!==void 0)return e;let o=qe.getForInstance(r);if(o===void 0)throw q.error(1401);return r.$fastController=new hl(r,o)}static setStrategy(r){hl=r}};Pr(Uo);Uo.setStrategy(Uo);function Ko(r){var e;return"adoptedStyleSheets"in r?r:(e=Xo(r))!==null&&e!==void 0?e:r.getRootNode()}var _l=class Yl{constructor(e){let o=Yl.styleSheetCache;this.sheets=e.map(t=>{if(t instanceof CSSStyleSheet)return t;let a=o.get(t);return a===void 0&&(a=new CSSStyleSheet,a.replaceSync(t),o.set(t,a)),a})}addStylesTo(e){ql(Ko(e),this.sheets)}removeStylesFrom(e){Ul(Ko(e),this.sheets)}};_l.styleSheetCache=new Map;var md=0,kd=()=>`fast-${++md}`;function pl(r){return r===document?document.body:r}var Sd=class{constructor(r){this.styles=r,this.styleClass=kd()}addStylesTo(r){r=pl(Ko(r));let e=this.styles,o=this.styleClass;for(let t=0;t<e.length;t++){let a=document.createElement("style");a.innerHTML=e[t],a.className=o,r.append(a)}}removeStylesFrom(r){r=pl(Ko(r));let e=r.querySelectorAll(`.${this.styleClass}`);for(let o=0,t=e.length;o<t;++o)r.removeChild(e[o])}},ql=(r,e)=>{r.adoptedStyleSheets=[...r.adoptedStyleSheets,...e]},Ul=(r,e)=>{r.adoptedStyleSheets=r.adoptedStyleSheets.filter(o=>e.indexOf(o)===-1)};if($e.supportsAdoptedStyleSheets){try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),ql=(r,e)=>{r.adoptedStyleSheets.push(...e)},Ul=(r,e)=>{for(let o of e){let t=r.adoptedStyleSheets.indexOf(o);t!==-1&&r.adoptedStyleSheets.splice(t,1)}}}catch{}$e.setDefaultStrategy(_l)}else $e.setDefaultStrategy(Sd);function Kl(r){let e=class extends r{constructor(){super(),Uo.forCustomElement(this)}$emit(o,t,a){return this.$fastController.emit(o,t,a)}connectedCallback(){this.$fastController.connect()}disconnectedCallback(){this.$fastController.disconnect()}attributeChangedCallback(o,t,a){this.$fastController.onAttributeChangedCallback(o,t,a)}};return qe.registerBaseType(e),e}function Fd(r,e){return yr(r)?qe.compose(r,e):qe.compose(this,r)}function yd(r,e){return yr(r)?qe.compose(r,e).define().type:qe.compose(this,r).define().type}function Pd(r){return Kl(r)}var xd=Object.assign(Kl(HTMLElement),{from:Pd,define:yd,compose:Fd}),Nd="Enter",D=function(r,e,o,t){var a=arguments.length,n=a<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,o):t,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,o,t);else for(var i=r.length-1;i>=0;i--)(s=r[i])&&(n=(a<3?s(n):a>3?s(e,o,n):s(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n},I=class{};D([S({attribute:"aria-atomic"})],I.prototype,"ariaAtomic",void 0);D([S({attribute:"aria-busy"})],I.prototype,"ariaBusy",void 0);D([S({attribute:"aria-controls"})],I.prototype,"ariaControls",void 0);D([S({attribute:"aria-current"})],I.prototype,"ariaCurrent",void 0);D([S({attribute:"aria-describedby"})],I.prototype,"ariaDescribedby",void 0);D([S({attribute:"aria-details"})],I.prototype,"ariaDetails",void 0);D([S({attribute:"aria-disabled"})],I.prototype,"ariaDisabled",void 0);D([S({attribute:"aria-errormessage"})],I.prototype,"ariaErrormessage",void 0);D([S({attribute:"aria-flowto"})],I.prototype,"ariaFlowto",void 0);D([S({attribute:"aria-haspopup"})],I.prototype,"ariaHaspopup",void 0);D([S({attribute:"aria-hidden"})],I.prototype,"ariaHidden",void 0);D([S({attribute:"aria-invalid"})],I.prototype,"ariaInvalid",void 0);D([S({attribute:"aria-keyshortcuts"})],I.prototype,"ariaKeyshortcuts",void 0);D([S({attribute:"aria-label"})],I.prototype,"ariaLabel",void 0);D([S({attribute:"aria-labelledby"})],I.prototype,"ariaLabelledby",void 0);D([S({attribute:"aria-live"})],I.prototype,"ariaLive",void 0);D([S({attribute:"aria-owns"})],I.prototype,"ariaOwns",void 0);D([S({attribute:"aria-relevant"})],I.prototype,"ariaRelevant",void 0);D([S({attribute:"aria-roledescription"})],I.prototype,"ariaRoledescription",void 0);function Ql(r){return r?typeof r=="string"?new or(r):"inline"in r?r.inline():r:or.empty}var wd=class{};function Ad(r){return rt` <slot name="end" ${ia("end")}>${Ql(r.end)}</slot> `.inline()}function Ld(r){return rt` <slot name="start" ${ia("start")}>${Ql(r.start)}</slot> `.inline()}function Jl(r,...e){let o=Yo.locate(r);e.forEach(t=>{Object.getOwnPropertyNames(t.prototype).forEach(n=>{n!=="constructor"&&Object.defineProperty(r.prototype,n,Object.getOwnPropertyDescriptor(t.prototype,n))}),Yo.locate(t).forEach(n=>o.push(n))})}var Hd=class{constructor(r){this.listenerCache=new WeakMap,this.query=r}connectedCallback(r){let{query:e}=this,o=this.listenerCache.get(r);o||(o=this.constructListener(r),this.listenerCache.set(r,o)),o.bind(e)(),e.addEventListener("change",o)}disconnectedCallback(r){let e=this.listenerCache.get(r);e&&this.query.removeEventListener("change",e)}},da=class Zl extends Hd{constructor(e,o){super(e),this.styles=o}static with(e){return o=>new Zl(e,o)}constructListener(e){let o=!1,t=this.styles;return function(){let{matches:n}=this;n&&!o?(e.addStyles(t),o=n):!n&&o&&(e.removeStyles(t),o=n)}}removedCallback(e){e.removeStyles(this.styles)}},Cd=da.with(window.matchMedia("(forced-colors)")),mv=da.with(window.matchMedia("(prefers-color-scheme: dark)")),kv=da.with(window.matchMedia("(prefers-color-scheme: light)")),Td=":host([hidden]){display:none}";function $d(r){return`${Td}:host{display:${r}}`}var Id="--colorNeutralForeground1",Dd="--colorNeutralForeground1Hover",Od="--colorNeutralForeground1Pressed",vl="--colorNeutralForeground2",Rd="--colorNeutralForeground2Hover",Md="--colorNeutralForeground2Pressed",fl="--colorNeutralForeground2BrandHover",Bl="--colorNeutralForeground2BrandPressed",zd="--colorNeutralForegroundDisabled",Kt="--colorNeutralForegroundOnBrand",Ed="--colorNeutralBackground1",Vd="--colorNeutralBackground1Hover",Wd="--colorNeutralBackground1Pressed",jd="--colorSubtleBackground",Gd="--colorSubtleBackgroundHover",Xd="--colorSubtleBackgroundPressed",qr="--colorTransparentBackground",bl="--colorTransparentBackgroundHover",ml="--colorTransparentBackgroundPressed",_d="--colorNeutralBackgroundDisabled",Yd="--colorBrandBackground",qd="--colorBrandBackgroundHover",Ud="--colorBrandBackgroundPressed",Kd="--colorNeutralStroke1",Qd="--colorNeutralStroke1Hover",Jd="--colorNeutralStroke1Pressed",Zd="--colorNeutralStrokeDisabled",kl="--colorTransparentStroke",Sl="--colorStrokeFocus2",eu="--borderRadiusNone",ru="--borderRadiusSmall",ou="--borderRadiusMedium",tu="--borderRadiusLarge",au="--borderRadiusCircular",nu="--fontFamilyBase",lu="--fontSizeBase200",su="--fontSizeBase300",cu="--fontSizeBase400",iu="--fontWeightRegular",du="--fontWeightSemibold",uu="--lineHeightBase200",gu="--lineHeightBase300",hu="--lineHeightBase400",pu="--shadow2",vu="--shadow4",fu="--strokeWidthThin",Bu="--strokeWidthThick",bu="--spacingHorizontalXS",mu="--spacingHorizontalSNudge",ku="--spacingHorizontalS",Su="--spacingHorizontalM",Fu="--spacingHorizontalL",yu="--durationFaster",Pu="--curveEasyEase",Vo={submit:"submit",reset:"reset",button:"button"},xu=Zt`
  ${$d("inline-flex")}

  :host {
    --icon-spacing: var(${mu});
    contain: layout style;
    vertical-align: middle;
  }

  :host .control {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    text-decoration-line: none;
    margin: 0;
    min-height: 32px;
    outline-style: none;
    background-color: var(${Ed});
    color: var(${Id});
    border: var(${fu}) solid var(${Kd});
    padding: 0 var(${Su});
    min-width: 96px;
    border-radius: var(${ou});
    font-size: var(${su});
    font-family: var(${nu});
    font-weight: var(${du});
    line-height: var(${gu});
    transition-duration: var(${yu});
    transition-property: background, border, color;
    transition-timing-function: var(${Pu});
    cursor: pointer;
  }

  .content {
    display: inherit;
  }

  :host(:hover) .control {
    background-color: var(${Vd});
    color: var(${Dd});
    border-color: var(${Qd});
  }

  :host(:hover:active) .control {
    background-color: var(${Wd});
    border-color: var(${Jd});
    color: var(${Od});
    outline-style: none;
  }

  :host .control:focus-visible {
    border-color: var(${kl});
    outline: var(${Bu}) solid var(${kl});
    box-shadow: var(${vu}), 0 0 0 2px var(${Sl});
  }

  @media screen and (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }

  ::slotted(svg) {
    font-size: 20px;
    height: 20px;
    width: 20px;
    fill: currentColor;
  }

  [slot='start'],
  ::slotted([slot='start']) {
    margin-inline-end: var(--icon-spacing);
  }

  [slot='end'],
  ::slotted([slot='end']) {
    margin-inline-start: var(--icon-spacing);
  }

  :host([icon-only]) .control {
    min-width: 32px;
    max-width: 32px;
  }

  :host([size='small']) {
    --icon-spacing: var(${bu});
  }

  :host([size='small']) .control {
    min-height: 24px;
    min-width: 64px;
    padding: 0 var(${ku});
    border-radius: var(${ru});
    font-size: var(${lu});
    line-height: var(${uu});
    font-weight: var(${iu});
  }

  :host([size='small'][icon-only]) .control {
    min-width: 24px;
    max-width: 24px;
  }

  :host([size='large']) .control {
    min-height: 40px;
    border-radius: var(${tu});
    padding: 0 var(${Fu});
    font-size: var(${cu});
    line-height: var(${hu});
  }

  :host([size='large'][icon-only]) .control {
    min-width: 40px;
    max-width: 40px;
  }

  :host([size='large']) ::slotted(svg) {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }

  :host([shape='circular']) .control,
  :host([shape='circular']) .control:focus-visible {
    border-radius: var(${au});
  }

  :host([shape='square']) .control,
  :host([shape='square']) .control:focus-visible {
    border-radius: var(${eu});
  }

  :host([appearance='primary']) .control {
    background-color: var(${Yd});
    color: var(${Kt});
    border-color: transparent;
  }

  :host([appearance='primary']:hover) .control {
    background-color: var(${qd});
  }

  :host([appearance='primary']:hover) .control,
  :host([appearance='primary']:hover:active) .control {
    border-color: transparent;
    color: var(${Kt});
  }

  :host([appearance='primary']:hover:active) .control {
    background-color: var(${Ud});
  }

  :host([appearance='primary']) .control:focus-visible {
    border-color: var(${Kt});
    box-shadow: var(${pu}), 0 0 0 2px var(${Sl});
  }

  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"])) .control,
  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"]):hover) .control,
  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"]):hover:active) .control {
    border-color: transparent;
  }

  :host([appearance='outline']) .control {
    background-color: var(${qr});
  }

  :host([appearance='outline']:hover) .control {
    background-color: var(${bl});
  }

  :host([appearance='outline']:hover:active) .control {
    background-color: var(${ml});
  }

  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"])) .control,
  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"]):hover) .control,
  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"]):hover:active) .control {
    background-color: var(${qr});
  }

  :host([appearance='subtle']) .control {
    background-color: var(${jd});
    color: var(${vl});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) .control {
    background-color: var(${Gd});
    color: var(${Rd});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover:active) .control {
    background-color: var(${Xd});
    color: var(${Md});
    border-color: transparent;
  }

  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"])) .control,
  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"]):hover) .control,
  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"]):hover:active) .control {
    background-color: var(${qr});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) ::slotted(svg) {
    fill: var(${fl});
  }

  :host([appearance='subtle']:hover:active) ::slotted(svg) {
    fill: var(${Bl});
  }

  :host([appearance='transparent']) .control {
    background-color: var(${qr});
    color: var(${vl});
  }

  :host([appearance='transparent']:hover) .control {
    background-color: var(${bl});
    color: var(${fl});
  }

  :host([appearance='transparent']:hover:active) .control {
    background-color: var(${ml});
    color: var(${Bl});
  }

  :host([appearance='transparent']) .control,
  :host([appearance='transparent']:hover) .control,
  :host([appearance='transparent']:hover:active) .control {
    border-color: transparent;
  }

  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"])) .control,
  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"]):hover) .control,
  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"]):hover:active) .control {
    border-color: transparent;
    background-color: var(${qr});
  }

  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable])) .control,
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover) .control,
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover:active)
    .control {
    background-color: var(${_d});
    border-color: var(${Zd});
    color: var(${zd});
    cursor: not-allowed;
  }
`.withBehaviors(Cd(Zt`
    :host([appearance='transparent']:hover) .control {
      border-color: Highlight;
    }
  `)),Fl="form-associated-proxy",yl="ElementInternals",Pl=yl in window&&"setFormValue"in window[yl].prototype,xl=new WeakMap;function Nu(r){let e=class extends r{constructor(...o){super(...o),this.dirtyValue=!1,this.initialValue="",this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Pl}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){let o=this.proxy.labels,t=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),a=o?t.concat(Array.from(o)):t;return Object.freeze(a)}else return wl}valueChanged(o,t){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(o,t){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(o,t){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),_o.enqueue(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(o,t){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(o,t){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),_o.enqueue(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Pl)return null;let o=xl.get(this);return o||(o=this.attachInternals(),xl.set(this,o)),o}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(o=>this.proxy.removeEventListener(o,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(o,t,a){this.elementInternals?this.elementInternals.setValidity(o,t,a):typeof t=="string"&&this.proxy.setCustomValidity(t)}formDisabledCallback(o){this.disabled=o}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var o;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(t=>this.proxy.addEventListener(t,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",Fl),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",Fl)),(o=this.shadowRoot)===null||o===void 0||o.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var o;this.removeChild(this.proxy),(o=this.shadowRoot)===null||o===void 0||o.removeChild(this.proxySlot)}validate(o){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,o)}setFormValue(o,t){this.elementInternals&&this.elementInternals.setFormValue(o,t||o)}_keypressHandler(o){switch(o.key){case Nd:if(this.form instanceof HTMLFormElement){let t=this.form.querySelector("[type=submit]");t?.click()}break}}stopPropagation(o){o.stopPropagation()}};return S({mode:"boolean"})(e.prototype,"disabled"),S({mode:"fromView",attribute:"value"})(e.prototype,"initialValue"),S({attribute:"current-value"})(e.prototype,"currentValue"),S(e.prototype,"name"),S({mode:"boolean"})(e.prototype,"required"),Hl(e.prototype,"value"),e}var wu=class extends xd{},Au=class extends Nu(wu){constructor(){super(...arguments),this.proxy=document.createElement("input")}},U=function(r,e,o,t){var a=arguments.length,n=a<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,o):t,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,o,t);else for(var i=r.length-1;i>=0;i--)(s=r[i])&&(n=(a<3?s(n):a>3?s(e,o,n):s(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n},K=class extends Au{constructor(){super(...arguments),this.iconOnly=!1,this.disabledFocusable=!1,this.handleDisabledFocusableClick=r=>{if(r&&this.disabledFocusable){r.stopImmediatePropagation();return}},this.handleSubmission=()=>{if(!this.form)return;let r=this.proxy.isConnected;r||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),r||this.detachProxy()},this.handleFormReset=()=>{var r;(r=this.form)===null||r===void 0||r.reset()}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(r,e){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),e===Vo.submit&&this.addEventListener("click",this.handleSubmission),r===Vo.submit&&this.removeEventListener("click",this.handleSubmission),e===Vo.reset&&this.addEventListener("click",this.handleFormReset),r===Vo.reset&&this.removeEventListener("click",this.handleFormReset)}disabledFocusableChanged(r,e){this.$fastController.isConnected&&(this.disabledFocusable?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}validate(){super.validate(this.control)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.addEventListener("click",this.handleDisabledFocusableClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleDisabledFocusableClick)}};U([S({mode:"boolean"})],K.prototype,"autofocus",void 0);U([S({attribute:"form"})],K.prototype,"formId",void 0);U([S],K.prototype,"formaction",void 0);U([S],K.prototype,"formenctype",void 0);U([S],K.prototype,"formmethod",void 0);U([S({mode:"boolean"})],K.prototype,"formnovalidate",void 0);U([S],K.prototype,"formtarget",void 0);U([S],K.prototype,"type",void 0);U([S],K.prototype,"appearance",void 0);U([S],K.prototype,"shape",void 0);U([S],K.prototype,"size",void 0);U([S({attribute:"icon-only",mode:"boolean"})],K.prototype,"iconOnly",void 0);U([S({attribute:"disabled-focusable",mode:"boolean"})],K.prototype,"disabledFocusable",void 0);U([Hl],K.prototype,"defaultSlottedContent",void 0);var ot=class{};U([S({attribute:"aria-expanded"})],ot.prototype,"ariaExpanded",void 0);U([S({attribute:"aria-pressed"})],ot.prototype,"ariaPressed",void 0);Jl(ot,I);Jl(K,wd,ot);function Lu(r={}){return rt`
    <button
      class="control"
      part="control"
      ?autofocus="${e=>e.autofocus}"
      ?disabled="${e=>e.disabled}"
      form="${e=>e.formId}"
      formaction="${e=>e.formaction}"
      formenctype="${e=>e.formenctype}"
      formmethod="${e=>e.formmethod}"
      ?formnovalidate="${e=>e.formnovalidate}"
      formtarget="${e=>e.formtarget}"
      name="${e=>e.name}"
      type="${e=>e.type}"
      value="${e=>e.value}"
      aria-atomic="${e=>e.ariaAtomic}"
      aria-busy="${e=>e.ariaBusy}"
      aria-controls="${e=>e.ariaControls}"
      aria-current="${e=>e.ariaCurrent}"
      aria-describedby="${e=>e.ariaDescribedby}"
      aria-details="${e=>e.ariaDetails}"
      aria-disabled="${e=>e.ariaDisabled}"
      aria-errormessage="${e=>e.ariaErrormessage}"
      aria-expanded="${e=>e.ariaExpanded}"
      aria-flowto="${e=>e.ariaFlowto}"
      aria-haspopup="${e=>e.ariaHaspopup}"
      aria-hidden="${e=>e.ariaHidden}"
      aria-invalid="${e=>e.ariaInvalid}"
      aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
      aria-label="${e=>e.ariaLabel}"
      aria-labelledby="${e=>e.ariaLabelledby}"
      aria-live="${e=>e.ariaLive}"
      aria-owns="${e=>e.ariaOwns}"
      aria-pressed="${e=>e.ariaPressed}"
      aria-relevant="${e=>e.ariaRelevant}"
      aria-roledescription="${e=>e.ariaRoledescription}"
      ${ia("control")}
    >
      ${Ld(r)}
      <span class="content" part="content">
        <slot ${vd("defaultSlottedContent")}></slot>
      </span>
      ${Ad(r)}
    </button>
  `}var Hu=Lu(),Sv=K.compose({name:"phx-button",template:Hu,styles:xu,shadowOptions:{delegatesFocus:!0}});var es={borderRadiusSmall:"4px",borderRadiusMedium:"8px",borderRadiusLarge:"16px",micaBackdropFilter:"blur(120px) saturate(150%)",micaBackgroundBlendMode:"luminosity"},Cu={...Rn,...es,colorShellFillTaksbarItemPrimary:"#FFFFFFB2",colorShellFillTaksbarItemSecondary:"#FFFFFF80",colorShellFillTaksbarItemTeritary:"#FFFFFF4D",colorShellStrokeTaskbarItemSecondary:"#0000000f",colorShellStrokeTaskbarItemQuinary:"#00000005",colorShellFillTaskbarItemIndicator:"#00000070",colorFillAccent:"#005FB8",micaBackgroundColor:"rgba(243,243,243,0.7)"},Tu={...Mn,...es,colorShellFillTaksbarItemPrimary:"#FFFFFF15",colorShellFillTaksbarItemSecondary:"#FFFFFF0F",colorShellFillTaksbarItemTeritary:"#FFFFFF0B",colorShellStrokeTaskbarItemSecondary:"#FFFFFF1A",colorShellStrokeTaskbarItemQuinary:"#FFFFFF0F",colorShellFillTaskbarItemIndicator:"#FFFFFF63",colorFillAccent:"#005FB8",micaBackgroundColor:"rgba(32,32,32,0.7)"};function rs(r){Qo(r==="dark"?Tu:Cu)}var os="var(--colorShellFillTaksbarItemPrimary)",ne="var(--colorShellFillTaksbarItemSecondary)",ee="var(--colorShellFillTaksbarItemTeritary)",ts="var(--colorShellStrokeTaskbarItemQuinary)",as="var(--colorShellStrokeTaskbarItemSecondary)",ns="var(--colorShellFillTaskbarItemIndicator)",ls="var(--colorFillAccent)";var we=class{constructor(){this.theme="light";this.windows=[];this.activeWindowId=null}openWindow(e){let o=crypto.randomUUID(),t=Math.min(window.innerWidth-48,1920),a=t*.75;return a=Math.min(a,window.innerHeight-96),this.windows=[...this.windows,{id:o,appName:e,height:a,maximized:!1,minHeight:200,minimized:!1,minWidth:300,width:t,xPos:window.innerWidth-t-24+24*this.windows.length,yPos:(window.innerHeight-48-a)/2+24*this.windows.length,zIndex:this.windows.length+1}],this.activeWindowId=o,o}closeWindow(e){this.windows=this.windows.filter(o=>o.id!==e),this.activateNextWindow(e)}activateWindow(e){this.activeWindowId=e}activateNextWindow(e){this.activeWindowId===e&&(this.activeWindowId=this.windows.find(o=>o.id!==e&&!o.minimized)?.id||null)}minimizeWindow(e){this.windows=this.windows.map(o=>o.id===e?{...o,minimized:!0}:o),this.activateNextWindow(e)}restoreWindow(e){this.windows=this.windows.map(o=>o.id===e?{...o,minimized:!1,maximized:!1}:o),this.activateWindow(e)}maximizeWindow(e){this.windows=this.windows.map(o=>o.id===e?{...o,maximized:!0}:o)}};v([L],we.prototype,"theme",2),v([L],we.prototype,"windows",2),v([L],we.prototype,"activeWindowId",2);var Ue=class{constructor(){this.theme="system";this.showFavoritesBar="always";this.showSideBar=!0}};v([L],Ue.prototype,"theme",2),v([L],Ue.prototype,"showFavoritesBar",2),v([L],Ue.prototype,"showSideBar",2);var Jr=class{};var ss="Enter";var O=function(r,e,o,t){var a=arguments.length,n=a<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,o):t,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,o,t);else for(var i=r.length-1;i>=0;i--)(s=r[i])&&(n=(a<3?s(n):a>3?s(e,o,n):s(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n},H=class{};O([f({attribute:"aria-atomic"})],H.prototype,"ariaAtomic",void 0);O([f({attribute:"aria-busy"})],H.prototype,"ariaBusy",void 0);O([f({attribute:"aria-controls"})],H.prototype,"ariaControls",void 0);O([f({attribute:"aria-current"})],H.prototype,"ariaCurrent",void 0);O([f({attribute:"aria-describedby"})],H.prototype,"ariaDescribedby",void 0);O([f({attribute:"aria-details"})],H.prototype,"ariaDetails",void 0);O([f({attribute:"aria-disabled"})],H.prototype,"ariaDisabled",void 0);O([f({attribute:"aria-errormessage"})],H.prototype,"ariaErrormessage",void 0);O([f({attribute:"aria-flowto"})],H.prototype,"ariaFlowto",void 0);O([f({attribute:"aria-haspopup"})],H.prototype,"ariaHaspopup",void 0);O([f({attribute:"aria-hidden"})],H.prototype,"ariaHidden",void 0);O([f({attribute:"aria-invalid"})],H.prototype,"ariaInvalid",void 0);O([f({attribute:"aria-keyshortcuts"})],H.prototype,"ariaKeyshortcuts",void 0);O([f({attribute:"aria-label"})],H.prototype,"ariaLabel",void 0);O([f({attribute:"aria-labelledby"})],H.prototype,"ariaLabelledby",void 0);O([f({attribute:"aria-live"})],H.prototype,"ariaLive",void 0);O([f({attribute:"aria-owns"})],H.prototype,"ariaOwns",void 0);O([f({attribute:"aria-relevant"})],H.prototype,"ariaRelevant",void 0);O([f({attribute:"aria-roledescription"})],H.prototype,"ariaRoledescription",void 0);function ua(r){return r?typeof r=="string"?new he(r):"inline"in r?r.inline():r:he.empty}var tt=class{};function cs(r){return m` <slot name="end" ${pr("end")}>${ua(r.end)}</slot> `.inline()}function is(r){return m` <slot name="start" ${pr("start")}>${ua(r.start)}</slot> `.inline()}function ga(r,...e){let o=vr.locate(r);e.forEach(t=>{Object.getOwnPropertyNames(t.prototype).forEach(n=>{n!=="constructor"&&Object.defineProperty(r.prototype,n,Object.getOwnPropertyDescriptor(t.prototype,n))}),vr.locate(t).forEach(n=>o.push(n))})}var at=class{constructor(e){this.listenerCache=new WeakMap,this.query=e}connectedCallback(e){let{query:o}=this,t=this.listenerCache.get(e);t||(t=this.constructListener(e),this.listenerCache.set(e,t)),t.bind(o)(),o.addEventListener("change",t)}disconnectedCallback(e){let o=this.listenerCache.get(e);o&&this.query.removeEventListener("change",o)}},xr=class r extends at{constructor(e,o){super(e),this.styles=o}static with(e){return o=>new r(e,o)}constructListener(e){let o=!1,t=this.styles;return function(){let{matches:n}=this;n&&!o?(e.addStyles(t),o=n):!n&&o&&(e.removeStyles(t),o=n)}}removedCallback(e){e.removeStyles(this.styles)}},ha=xr.with(window.matchMedia("(forced-colors)")),$u=xr.with(window.matchMedia("(prefers-color-scheme: dark)")),Iu=xr.with(window.matchMedia("(prefers-color-scheme: light)"));var pa=":host([hidden]){display:none}";function nt(r){return`${pa}:host{display:${r}}`}var ds="--colorNeutralForeground1",us="--colorNeutralForeground1Hover",gs="--colorNeutralForeground1Pressed";var va="--colorNeutralForeground2",hs="--colorNeutralForeground2Hover",ps="--colorNeutralForeground2Pressed";var fa="--colorNeutralForeground2BrandHover",Ba="--colorNeutralForeground2BrandPressed";var vs="--colorNeutralForegroundDisabled";var lt="--colorNeutralForegroundOnBrand";var fs="--colorNeutralBackground1",Bs="--colorNeutralBackground1Hover",bs="--colorNeutralBackground1Pressed";var ms="--colorSubtleBackground",ks="--colorSubtleBackgroundHover",Ss="--colorSubtleBackgroundPressed";var Nr="--colorTransparentBackground",ba="--colorTransparentBackgroundHover",ma="--colorTransparentBackgroundPressed";var Fs="--colorNeutralBackgroundDisabled";var ys="--colorBrandBackground",Ps="--colorBrandBackgroundHover",xs="--colorBrandBackgroundPressed";var Ns="--colorNeutralStroke1",ws="--colorNeutralStroke1Hover",As="--colorNeutralStroke1Pressed";var Ls="--colorNeutralStrokeDisabled";var ka="--colorTransparentStroke";var Sa="--colorStrokeFocus2";var Hs="--borderRadiusNone",Cs="--borderRadiusSmall",Ts="--borderRadiusMedium",$s="--borderRadiusLarge";var Is="--borderRadiusCircular",Ds="--fontFamilyBase";var Os="--fontSizeBase200",Rs="--fontSizeBase300",Ms="--fontSizeBase400";var zs="--fontWeightRegular";var Es="--fontWeightSemibold";var Vs="--lineHeightBase200",Ws="--lineHeightBase300",js="--lineHeightBase400";var Gs="--shadow2",Xs="--shadow4";var _s="--strokeWidthThin",Ys="--strokeWidthThick";var qs="--spacingHorizontalXS",Us="--spacingHorizontalSNudge",Ks="--spacingHorizontalS";var Qs="--spacingHorizontalM",Js="--spacingHorizontalL";var Zs="--durationFaster";var ec="--curveEasyEase";var Zr={submit:"submit",reset:"reset",button:"button"};var Fa=y`
  ${nt("inline-flex")}

  :host {
    --icon-spacing: var(${Us});
    contain: layout style;
    vertical-align: middle;
  }

  :host .control {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    text-decoration-line: none;
    margin: 0;
    min-height: 32px;
    outline-style: none;
    background-color: var(${fs});
    color: var(${ds});
    border: var(${_s}) solid var(${Ns});
    padding: 0 var(${Qs});
    min-width: 96px;
    border-radius: var(${Ts});
    font-size: var(${Rs});
    font-family: var(${Ds});
    font-weight: var(${Es});
    line-height: var(${Ws});
    transition-duration: var(${Zs});
    transition-property: background, border, color;
    transition-timing-function: var(${ec});
    cursor: pointer;
  }

  .content {
    display: inherit;
  }

  :host(:hover) .control {
    background-color: var(${Bs});
    color: var(${us});
    border-color: var(${ws});
  }

  :host(:hover:active) .control {
    background-color: var(${bs});
    border-color: var(${As});
    color: var(${gs});
    outline-style: none;
  }

  :host .control:focus-visible {
    border-color: var(${ka});
    outline: var(${Ys}) solid var(${ka});
    box-shadow: var(${Xs}), 0 0 0 2px var(${Sa});
  }

  @media screen and (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }

  ::slotted(svg) {
    font-size: 20px;
    height: 20px;
    width: 20px;
    fill: currentColor;
  }

  [slot='start'],
  ::slotted([slot='start']) {
    margin-inline-end: var(--icon-spacing);
  }

  [slot='end'],
  ::slotted([slot='end']) {
    margin-inline-start: var(--icon-spacing);
  }

  :host([icon-only]) .control {
    min-width: 32px;
    max-width: 32px;
  }

  :host([size='small']) {
    --icon-spacing: var(${qs});
  }

  :host([size='small']) .control {
    min-height: 24px;
    min-width: 64px;
    padding: 0 var(${Ks});
    border-radius: var(${Cs});
    font-size: var(${Os});
    line-height: var(${Vs});
    font-weight: var(${zs});
  }

  :host([size='small'][icon-only]) .control {
    min-width: 24px;
    max-width: 24px;
  }

  :host([size='large']) .control {
    min-height: 40px;
    border-radius: var(${$s});
    padding: 0 var(${Js});
    font-size: var(${Ms});
    line-height: var(${js});
  }

  :host([size='large'][icon-only]) .control {
    min-width: 40px;
    max-width: 40px;
  }

  :host([size='large']) ::slotted(svg) {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }

  :host([shape='circular']) .control,
  :host([shape='circular']) .control:focus-visible {
    border-radius: var(${Is});
  }

  :host([shape='square']) .control,
  :host([shape='square']) .control:focus-visible {
    border-radius: var(${Hs});
  }

  :host([appearance='primary']) .control {
    background-color: var(${ys});
    color: var(${lt});
    border-color: transparent;
  }

  :host([appearance='primary']:hover) .control {
    background-color: var(${Ps});
  }

  :host([appearance='primary']:hover) .control,
  :host([appearance='primary']:hover:active) .control {
    border-color: transparent;
    color: var(${lt});
  }

  :host([appearance='primary']:hover:active) .control {
    background-color: var(${xs});
  }

  :host([appearance='primary']) .control:focus-visible {
    border-color: var(${lt});
    box-shadow: var(${Gs}), 0 0 0 2px var(${Sa});
  }

  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"])) .control,
  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"]):hover) .control,
  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"]):hover:active) .control {
    border-color: transparent;
  }

  :host([appearance='outline']) .control {
    background-color: var(${Nr});
  }

  :host([appearance='outline']:hover) .control {
    background-color: var(${ba});
  }

  :host([appearance='outline']:hover:active) .control {
    background-color: var(${ma});
  }

  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"])) .control,
  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"]):hover) .control,
  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"]):hover:active) .control {
    background-color: var(${Nr});
  }

  :host([appearance='subtle']) .control {
    background-color: var(${ms});
    color: var(${va});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) .control {
    background-color: var(${ks});
    color: var(${hs});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover:active) .control {
    background-color: var(${Ss});
    color: var(${ps});
    border-color: transparent;
  }

  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"])) .control,
  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"]):hover) .control,
  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"]):hover:active) .control {
    background-color: var(${Nr});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) ::slotted(svg) {
    fill: var(${fa});
  }

  :host([appearance='subtle']:hover:active) ::slotted(svg) {
    fill: var(${Ba});
  }

  :host([appearance='transparent']) .control {
    background-color: var(${Nr});
    color: var(${va});
  }

  :host([appearance='transparent']:hover) .control {
    background-color: var(${ba});
    color: var(${fa});
  }

  :host([appearance='transparent']:hover:active) .control {
    background-color: var(${ma});
    color: var(${Ba});
  }

  :host([appearance='transparent']) .control,
  :host([appearance='transparent']:hover) .control,
  :host([appearance='transparent']:hover:active) .control {
    border-color: transparent;
  }

  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"])) .control,
  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"]):hover) .control,
  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"]):hover:active) .control {
    border-color: transparent;
    background-color: var(${Nr});
  }

  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable])) .control,
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover) .control,
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover:active)
    .control {
    background-color: var(${Fs});
    border-color: var(${Ls});
    color: var(${vs});
    cursor: not-allowed;
  }
`.withBehaviors(ha(y`
    :host([appearance='transparent']:hover) .control {
      border-color: Highlight;
    }
  `));var rc="form-associated-proxy",oc="ElementInternals",tc=oc in window&&"setFormValue"in window[oc].prototype,ac=new WeakMap;function nc(r){let e=class extends r{constructor(...o){super(...o),this.dirtyValue=!1,this.initialValue="",this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return tc}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){let o=this.proxy.labels,t=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),a=o?t.concat(Array.from(o)):t;return Object.freeze(a)}else return C}valueChanged(o,t){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(o,t){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(o,t){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),be.enqueue(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(o,t){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(o,t){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),be.enqueue(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!tc)return null;let o=ac.get(this);return o||(o=this.attachInternals(),ac.set(this,o)),o}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(o=>this.proxy.removeEventListener(o,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(o,t,a){this.elementInternals?this.elementInternals.setValidity(o,t,a):typeof t=="string"&&this.proxy.setCustomValidity(t)}formDisabledCallback(o){this.disabled=o}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var o;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(t=>this.proxy.addEventListener(t,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",rc),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",rc)),(o=this.shadowRoot)===null||o===void 0||o.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var o;this.removeChild(this.proxy),(o=this.shadowRoot)===null||o===void 0||o.removeChild(this.proxySlot)}validate(o){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,o)}setFormValue(o,t){this.elementInternals&&this.elementInternals.setFormValue(o,t||o)}_keypressHandler(o){switch(o.key){case ss:if(this.form instanceof HTMLFormElement){let t=this.form.querySelector("[type=submit]");t?.click()}break}}stopPropagation(o){o.stopPropagation()}};return f({mode:"boolean"})(e.prototype,"disabled"),f({mode:"fromView",attribute:"value"})(e.prototype,"initialValue"),f({attribute:"current-value"})(e.prototype,"currentValue"),f(e.prototype,"name"),f({mode:"boolean"})(e.prototype,"required"),L(e.prototype,"value"),e}var ya=class extends P{},st=class extends nc(ya){constructor(){super(...arguments),this.proxy=document.createElement("input")}};var Q=function(r,e,o,t){var a=arguments.length,n=a<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,o):t,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,e,o,t);else for(var i=r.length-1;i>=0;i--)(s=r[i])&&(n=(a<3?s(n):a>3?s(e,o,n):s(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n},R=class extends st{constructor(){super(...arguments),this.iconOnly=!1,this.disabledFocusable=!1,this.handleDisabledFocusableClick=e=>{if(e&&this.disabledFocusable){e.stopImmediatePropagation();return}},this.handleSubmission=()=>{if(!this.form)return;let e=this.proxy.isConnected;e||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),e||this.detachProxy()},this.handleFormReset=()=>{var e;(e=this.form)===null||e===void 0||e.reset()}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(e,o){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),o===Zr.submit&&this.addEventListener("click",this.handleSubmission),e===Zr.submit&&this.removeEventListener("click",this.handleSubmission),o===Zr.reset&&this.addEventListener("click",this.handleFormReset),e===Zr.reset&&this.removeEventListener("click",this.handleFormReset)}disabledFocusableChanged(e,o){this.$fastController.isConnected&&(this.disabledFocusable?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"))}validate(){super.validate(this.control)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.addEventListener("click",this.handleDisabledFocusableClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleDisabledFocusableClick)}};Q([f({mode:"boolean"})],R.prototype,"autofocus",void 0);Q([f({attribute:"form"})],R.prototype,"formId",void 0);Q([f],R.prototype,"formaction",void 0);Q([f],R.prototype,"formenctype",void 0);Q([f],R.prototype,"formmethod",void 0);Q([f({mode:"boolean"})],R.prototype,"formnovalidate",void 0);Q([f],R.prototype,"formtarget",void 0);Q([f],R.prototype,"type",void 0);Q([f],R.prototype,"appearance",void 0);Q([f],R.prototype,"shape",void 0);Q([f],R.prototype,"size",void 0);Q([f({attribute:"icon-only",mode:"boolean"})],R.prototype,"iconOnly",void 0);Q([f({attribute:"disabled-focusable",mode:"boolean"})],R.prototype,"disabledFocusable",void 0);Q([L],R.prototype,"defaultSlottedContent",void 0);var wr=class{};Q([f({attribute:"aria-expanded"})],wr.prototype,"ariaExpanded",void 0);Q([f({attribute:"aria-pressed"})],wr.prototype,"ariaPressed",void 0);ga(wr,H);ga(R,tt,wr);function Du(r={}){return m`
    <button
      class="control"
      part="control"
      ?autofocus="${e=>e.autofocus}"
      ?disabled="${e=>e.disabled}"
      form="${e=>e.formId}"
      formaction="${e=>e.formaction}"
      formenctype="${e=>e.formenctype}"
      formmethod="${e=>e.formmethod}"
      ?formnovalidate="${e=>e.formnovalidate}"
      formtarget="${e=>e.formtarget}"
      name="${e=>e.name}"
      type="${e=>e.type}"
      value="${e=>e.value}"
      aria-atomic="${e=>e.ariaAtomic}"
      aria-busy="${e=>e.ariaBusy}"
      aria-controls="${e=>e.ariaControls}"
      aria-current="${e=>e.ariaCurrent}"
      aria-describedby="${e=>e.ariaDescribedby}"
      aria-details="${e=>e.ariaDetails}"
      aria-disabled="${e=>e.ariaDisabled}"
      aria-errormessage="${e=>e.ariaErrormessage}"
      aria-expanded="${e=>e.ariaExpanded}"
      aria-flowto="${e=>e.ariaFlowto}"
      aria-haspopup="${e=>e.ariaHaspopup}"
      aria-hidden="${e=>e.ariaHidden}"
      aria-invalid="${e=>e.ariaInvalid}"
      aria-keyshortcuts="${e=>e.ariaKeyshortcuts}"
      aria-label="${e=>e.ariaLabel}"
      aria-labelledby="${e=>e.ariaLabelledby}"
      aria-live="${e=>e.ariaLive}"
      aria-owns="${e=>e.ariaOwns}"
      aria-pressed="${e=>e.ariaPressed}"
      aria-relevant="${e=>e.ariaRelevant}"
      aria-roledescription="${e=>e.ariaRoledescription}"
      ${pr("control")}
    >
      ${is(r)}
      <span class="content" part="content">
        <slot ${kt("defaultSlottedContent")}></slot>
      </span>
      ${cs(r)}
    </button>
  `}var Pa=Du();var lc=R.compose({name:"phx-button",template:Pa,styles:Fa,shadowOptions:{delegatesFocus:!0}});lc.define(customElements);var Ou=m`
  <button>
    <slot name="image">
      <img src="img/edge/profile_guest.png" alt="Profile picture" />
    </slot>
    <slot>${r=>r.appearance==="guest"?"Guest":""}</slot>
  </button>
`,Ru=y`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${En};
  }

  button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${ue};
    background: none;
    cursor: pointer;
    border-radius: ${Xt};
    padding-block: ${ve};
    padding-inline-start: ${ve};
    padding-inline-end: ${Vn};
    border: ${ve} solid ${Ro};

    /* caption1 */
    font-family: ${ye};
    font-size: ${mr};
    line-height: ${kr};
    font-weight: ${Pe};
    color: ${Y};
  }

  button:hover {
    border: ${ve} solid ${qn};
    background-color: ${_n};
  }

  button:hover:active {
    border: ${ve} solid ${Un};
    background-color: ${Yn};
  }

  slot[name='image'] img,
  slot[name='image']::slotted(*) {
    width: 24px;
    height: 24px;
    border-radius: ${Xt};
  }
`,tr=class extends P{constructor(){super(...arguments);this.appearance="guest";this.error=null;this.notify=!1}};v([f],tr.prototype,"appearance",2),v([f],tr.prototype,"error",2),v([f({mode:"boolean"})],tr.prototype,"notify",2),tr=v([N({name:"identity-control",template:Ou,styles:Ru})],tr);var Mu=m`
  <div class="group">
    <identity-control></identity-control>
  </div>
  <div class="group">
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#layer-diagonal-20-regular"></use>
      </svg>
    </phx-button>
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#tab-position-horizontal-20-regular"></use>
      </svg>
    </phx-button>
  </div>
`,zu=y`
  :host {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${Te};
    height: 40px;
    padding-inline: ${ue};
    padding-block-end: ${Gn};
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${ue};
  }
`,ct=class extends P{connectedCallback(){super.connectedCallback()}};ct=v([N({name:"tab-bar",template:Mu,styles:zu})],ct);var Eu=m`
  <tab-bar></tab-bar>
  <address-bar></address-bar>
  <div class="row">
    <div class="column">
      ${r=>r.es.showFavoritesBar==="always"?m`<favorites-bar></favorites-bar>`:""}
      <web-content></web-content>
    </div>
    ${r=>r.es.showSideBar?m`<side-bar></side-bar>`:""}
  </div>
`,Vu=y`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background: ${Eo};
    backdrop-filter: ${Mo};
    background-blend-mode: ${zo};
    color: ${Y};
    fill: currentColor;

    /* body1 */
    font-family: ${ye};
    font-size: ${Do};
    font-weight: ${Pe};
    line-height: ${Oo};
  }
`,Ar=class extends P{constructor(){super(...arguments);this.ews=new Jr}connectedCallback(){super.connectedCallback();let t=(this.es.theme==="system"?this.ws.theme:this.es.theme)==="dark"?On:Gt;Qo(t,this.shadowRoot)}};v([Je(we)],Ar.prototype,"ws",2),v([Je(Ue)],Ar.prototype,"es",2),Ar=v([N({name:"microsoft-edge",template:Eu,styles:Vu})],Ar);var xa=[{name:"Start",lightIcon:"img/windows/start-24.svg",darkIcon:"img/windows/start-24-dark.svg"},{name:"Search",lightIcon:"img/windows/search-24.svg",darkIcon:"img/windows/search-24-dark.svg"},{name:"Task View",lightIcon:"img/windows/task-view-24.svg",darkIcon:"img/windows/task-view-24-dark.svg"},{name:"Chat",lightIcon:"img/windows/chat-24.svg",darkIcon:"img/windows/chat-24-dark.svg"},{name:"File Explorer",lightIcon:"img/windows/file-explorer-24.svg"},{name:"Microsoft Edge",lightIcon:"img/windows/edge-24.svg",element:m`<microsoft-edge></microsoft-edge>`},{name:"Microsoft Store",lightIcon:"img/windows/store-24.svg",darkIcon:"img/windows/store-24-dark.svg"},{name:"Settings",lightIcon:"img/windows/settings-24.svg"}];var Wu=m`
  <button>
    <slot></slot>
    <div part="backplate"></div>
    <div part="indicator"></div>
  </button>
`,ju=y`
  button {
    position: relative;
    width: 44px;
    height: 44px;
    cursor: pointer;
    border: none;
    background: none;
    user-select: none;
  }

  [part='backplate'] {
    position: absolute;
    inset: 2px;
    border-radius: ${ae};
    overflow: hidden;
    z-index: -1;
  }

  button:hover [part='backplate'],
  :host([running][active]) [part='backplate'] {
    background: ${ne};
    border: ${ve} solid ${as};
  }

  button:hover:active [part='backplate'] {
    background: ${ee};
    border: ${ve} solid ${ts};
  }

  :host([running][active]) button:hover [part='backplate'] {
    background: ${os};
  }

  :host([running][active]) button:hover:active [part='backplate'] {
    background: ${ee};
  }

  :host([running]) [part='indicator'] {
    background: ${ns};
    position: absolute;
    bottom: 2px;
    left: calc(50% - 3px);
    width: 6px;
    height: 3px;
    border-radius: 3px;
  }

  :host([running][active]) [part='indicator'] {
    background: ${ls};
    width: 16px;
    left: calc(50% - 8px);
  }

  slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`,eo=class extends P{};eo=v([N({name:"taskbar-button",template:Wu,styles:ju})],eo);var Gu=m`
  <button>
    <caption-1>${r=>r.time}</caption-1>
    <caption-1>${r=>r.date}</caption-1>
  </button>
`,Xu=y`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    user-select: none;
    padding: 0 ${Te};
    cursor: pointer;
    height: 44px;
    border-radius: ${ae};
    border: none;
    background: none;
  }
  button:hover {
    background: ${ne};
  }
  button:hover:active {
    background: ${ee};
  }
  caption-1 {
    font-family: ${ye};
    font-size: ${mr};
    font-weight: ${Pe};
    line-height: ${kr};
    white-space: nowrap;
    color: ${Y};
  }
`,ar=class extends P{constructor(){super(...arguments);this.time=this.formatTime();this.date=this.formatDate()}connectedCallback(){super.connectedCallback();let t=60-new Date().getSeconds();setTimeout(()=>{this.time=this.formatTime(),this.date=this.formatDate(),setInterval(()=>{this.time=this.formatTime(),this.date=this.formatDate()},6e4)},t*1e3)}formatTime(){return new Date().toLocaleTimeString().replace(/:\d+\s/," ")}formatDate(){return new Date().toLocaleDateString()}};v([L],ar.prototype,"time",2),v([L],ar.prototype,"date",2),ar=v([N({name:"clock-widget",template:Gu,styles:Xu})],ar);var _u=m`
  <button>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#wifi" />
    </svg>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#volume" />
    </svg>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#battery" />
    </svg>
  </button>
`,Yu=y`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${Te};
    user-select: none;
    padding: 0 ${ue};
    cursor: pointer;
    height: 44px;
    border-radius: ${ae};
    border: none;
    background: none;
    color: ${Y};
  }

  button:hover {
    background: ${ne};
  }

  button:hover:active {
    background: ${ee};
  }
`,ro=class extends P{};ro=v([N({name:"system-tray",template:_u,styles:Yu})],ro);var qu=y`
  button {
    user-select: none;
    width: ${Wn};
    cursor: pointer;
    height: 44px;
    border-radius: ${ae};
    border: none;
    background: none;
  }
  button:hover {
    background: ${ne};
  }
  button:hover:active {
    background: ${ee};
  }
`,oo=class extends P{};oo=v([N({name:"show-desktop-button",template:m`<button>&NonBreakingSpace;</button>`,styles:qu})],oo);var Uu=m`
  <button>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#chevron-up"></use>
    </svg>
  </button>
`,Ku=y`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${ue};
    user-select: none;
    padding: 0 ${ue};
    cursor: pointer;
    height: 44px;
    border-radius: ${ae};
    border: none;
    background: none;
    color: ${Y};
  }
  button:hover {
    background: ${ne};
  }
  button:hover:active {
    background: ${ee};
  }
`,to=class extends P{};to=v([N({name:"show-more-button",template:Uu,styles:Ku})],to);var Qu=m`
  <button>
    <img src="img/windows/copilot-24.svg" />
  </button>
`,Ju=y`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    height: 44px;
    width: 44px;
    border-radius: ${ae};
    border: none;
    background: none;
    color: ${Y};
  }
  button:hover {
    background: ${ne};
  }
  button:hover:active {
    background: ${ee};
  }
`,ao=class extends P{};ao=v([N({name:"copilot-button",template:Qu,styles:Ju})],ao);var Zu={"01":"img/windows/weather-sunny-24.svg","02":"img/windows/weather-partly-sunny-24.svg","03":"img/windows/weather-cloudy-24.svg","04":"img/windows/weather-cloudy-24.svg","09":"img/windows/weather-rain-24.svg",10:"img/windows/weather-rain-24.svg",11:"img/windows/weather-thunder-24.svg",13:"img/windows/weather-cloudy-24.svg",50:"img/windows/weather-cloudy-24.svg"},eg=m`
  <button>
    ${mt(r=>!r.loaded,m`<caption-1>Loading weather...</caption-1>`,m` <img src="${r=>Zu[r.icon]}" />
        <div>
          <caption-1>${r=>r.temp}ºF</caption-1>
          <caption-1>${r=>r.condition}</caption-1>
        </div>`)}
  </button>
`,rg=y`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${Te};
    user-select: none;
    padding: 0 ${Te};
    cursor: pointer;
    height: 44px;
    border-radius: ${ae};
    border: none;
    background: none;

    & div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
  button:hover {
    background: ${ne};
  }
  button:hover:active {
    background: ${ee};
  }
  caption-1 {
    font-family: ${ye};
    font-size: ${mr};
    font-weight: ${Pe};
    line-height: ${kr};
    white-space: nowrap;
    color: ${Y};

    &:nth-of-type(2) {
      color: ${Xn};
    }
  }
`,De=class extends P{constructor(){super(...arguments);this.temp=0;this.condition="";this.icon="01";this.loaded=!1}connectedCallback(){super.connectedCallback(),navigator.geolocation.getCurrentPosition(o=>{let{latitude:t,longitude:a}=o.coords;fetch(`http://localhost:4000/api/weather?lat=${t}&lon=${a}`).then(n=>n.json()).then(n=>{this.temp=n.temp,this.condition=n.condition,this.icon=n.icon,this.loaded=!0}).catch(n=>{console.log(n)})})}};v([L],De.prototype,"temp",2),v([L],De.prototype,"condition",2),v([L],De.prototype,"icon",2),v([L],De.prototype,"loaded",2),De=v([N({name:"weather-widget",template:eg,styles:rg})],De);var og=m`
  <div class="group">
    <weather-widget></weather-widget>
  </div>
  <div class="group">
    <slot></slot>
  </div>
  <div class="group">
    <show-more-button></show-more-button>
    <system-tray></system-tray>
    <clock-widget></clock-widget>
    <copilot-button></copilot-button>
    <show-desktop-button></show-desktop-button>
  </div>
`,tg=y`
  :host {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${jn};
    height: 48px;
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    border-top: ${ve} solid ${Ro};
    padding-inline-start: ${ue};
    /* Mica */
    background: ${Eo};
    backdrop-filter: ${Mo};
    background-blend-mode: ${zo};
    z-index: 1000;
  }
  .group {
    height: 100%;
    display: flex;
    align-items: center;

    &:first-of-type {
      justify-content: flex-start;
    }

    &:nth-of-type(2) {
      justify-content: center;
    }

    &:last-of-type {
      justify-content: flex-end;
    }
  }
`,it=class extends P{};it=v([N({name:"task-bar",template:og,styles:tg})],it);var ag=m`<slot></slot>`,ng=y`
  :host {
    display: block;
    position: absolute;
    border-radius: ${zn};
    z-index: ${r=>r.zIndex};
    width: ${r=>r.width};
    height: ${r=>r.height};
    top: ${r=>r.yPos};
    left: ${r=>r.xPos};
    box-shadow: ${Kn};
    overflow: hidden;
  }

  :host([active]) {
    box-shadow: ${Qn};
  }

  :host([minimized]) {
    display: none;
  }

  :host([maximized]) {
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
    width: auto;
    height: auto;
    border-radius: 0;
    box-shadow: none;
  }
`,Oe=class extends P{constructor(){super(...arguments);this.width="800px";this.height="600px";this.xPos="100px";this.yPos="100px";this.zIndex=0}};v([f],Oe.prototype,"width",2),v([f],Oe.prototype,"height",2),v([f],Oe.prototype,"xPos",2),v([f],Oe.prototype,"yPos",2),v([f],Oe.prototype,"zIndex",2),Oe=v([N({name:"app-window",template:ag,styles:ng})],Oe);var lg=y`
  :host {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: ${Y};
    fill: currentColor;

    /* body1 */
    font-family: ${ye};
    font-size: ${Do};
    font-weight: ${Pe};
    line-height: ${Oo};
  }

  #desktop {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-image: ${r=>r.ws.theme==="dark"?"url('/img/windows/desktopDark.jpg')":"url('/img/windows/desktopLight.jpg')"};
    background-size: cover;
    background-position: center;
  }
`,sg=m`
  <div id="desktop"></div>
  ${fo(r=>r.ws.windows,m`
      <app-window
        width="${r=>r.width}px"
        height="${r=>r.height}px"
        xPos="${r=>r.xPos}px"
        yPos="${r=>r.yPos}px"
        zIndex="${r=>r.zIndex}"
        ?minimized="${r=>r.minimized}"
        ?maximized="${r=>r.maximized}"
        ?active="${(r,e)=>r.id===e.parent.ws.activeWindowId}"
      >
        ${r=>xa.filter(e=>e.name===r.appName)[0].element||""}
      </app-window>
    `)}
  <task-bar>
    ${fo(()=>xa,m`
        <taskbar-button
          ?running="${(r,e)=>e.parent.ws.windows.some(o=>o.appName===r.name)}"
          ?active="${(r,e)=>e.parent.ws.windows.find(o=>o.id===e.parent.ws.activeWindowId)?.appName===r.name}"
          @click="${(r,e)=>r.element?e.parent.handleTaskbarButtonClick(r.name):""}"
        >
          <img
            src="${(r,e)=>e.parent.ws.theme==="dark"&&r.darkIcon?r.darkIcon:r.lightIcon}"
          />
        </taskbar-button>
      `)}
  </task-bar>
`,no=class extends P{connectedCallback(){super.connectedCallback(),rs(this.ws.theme),this.ws.openWindow("Microsoft Edge")}handleTaskbarButtonClick(e){let o=this.ws.windows.filter(t=>t.appName===e);if(o.length===0){this.ws.openWindow(e);return}if(o.length===1){if(o[0].minimized){this.ws.restoreWindow(o[0].id);return}if(o[0].id!==this.ws.activeWindowId){this.ws.activateWindow(o[0].id);return}this.ws.minimizeWindow(o[0].id);return}}};v([Je(we)],no.prototype,"ws",2),no=v([N({name:"windows-shell",template:sg,styles:lg})],no);var cg=m` ${r=>r.ps.os==="windows"?m`<windows-shell></windows-shell>`:""}`,ig=y`
  :host {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`,lo=class extends P{};v([Je(fr)],lo.prototype,"ps",2),lo=v([N({name:"app-root",template:cg,styles:ig})],lo);export{lo as AppRoot};
