var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var jszip_min = {exports: {}};

/*!

JSZip v3.10.2 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

(function (module, exports) {
	!function(e){module.exports=e();}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof commonjsRequire&&commonjsRequire;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h);}return o[r].exports}for(var l="function"==typeof commonjsRequire&&commonjsRequire,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l};},{"./support":30,"./utils":32}],2:[function(e,t,r){var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i;}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o;},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate");},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e;}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return -1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return -1^e}(0|t,e,e.length,0):0};},{"./utils":32}],5:[function(e,t,r){r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null;},{}],6:[function(e,t,r){var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n};},{lie:37}],7:[function(e,t,r){var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={};}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1);},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0);},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null;},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta});};},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})};},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[];}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}));},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}});}else this.accumulate=!0;},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null;},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}});},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume();},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e);}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end();}),e.on("error",function(e){t.error(e);}),this},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return !1;for(var r=0;r<t.length;r++)try{t[r].error(e);}catch(e){}return !0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock();},t.exports=s;},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o);}),o.entriesCount=h;}catch(e){o.error(e);}return o};},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e};}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.2",n.loadAsync=function(e,t){return (new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n;},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e);}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e();}).resume();})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s);}return t.zipComment.length&&(h.comment=t.zipComment),h})};},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t);}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}});}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e);}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end();});},s.prototype.pause=function(){return !!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s;},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t);}).on("error",function(e){n.emit("error",e);}).on("end",function(){n.push(null);});}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume();},t.exports=n;},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}};},{}],15:[function(e,t,r){function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h;}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return "/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return "[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n);},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t);}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return !t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n);}catch(e){(t=new l("error")).error(e);}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return (e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n;},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){t.exports=e("stream");},{stream:void 0}],17:[function(e,t,r){var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t];}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return -1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return [];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0;}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e);},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e;},skip:function(e){this.setIndex(this.index+e);},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i;},{"../utils":32}],19:[function(e,t,r){var n=e("./Uint8ArrayReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){var n=e("./DataReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){var n=e("./ArrayReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)};},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b";},{}],24:[function(e,t,r){var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e;}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta});},t.exports=s;},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0);}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e);},t.exports=s;},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0);}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length;}i.prototype.processChunk.call(this,e);},t.exports=s;},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat();},function(e){t.error(e);});}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null;},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0));},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return !1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t);}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s;},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null;}n.prototype={push:function(e){this.emit("data",e);},end:function(){if(this.isFinished)return !1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0;}catch(e){this.emit("error",e);}return !0},error:function(e){return !this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[];},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t);},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e);}),e.on("end",function(){t.end();}),e.on("error",function(e){t.error(e);}),this},pause:function(){return !this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return !1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e);},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e]);},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock();},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n;},{}],29:[function(e,t,r){var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter");}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t);}).on("error",function(e){n=[],r(e);}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e);}catch(e){r(e);}n=[];}).resume();})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string";}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock();}catch(e){this._worker=new s("error"),this._worker.error(e);}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return "data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta);}):this._worker.on(e,function(){h.delay(t,arguments,r);}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f;},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else {var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size;}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size;}catch(e){r.blob=!1;}}}try{r.nodestream=!!e("readable-stream").Readable;}catch(e){r.nodestream=!1;}},{"readable-stream":16}],31:[function(e,t,s){for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null;}function l(){n.call(this,"utf-8 encode");}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else {for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n);}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length);}else t=this.leftOver.concat(t);this.leftOver=null;}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta});},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null);},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta});},s.Utf8EncodeWorker=l;},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return !1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return !1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2);}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i));}return r.join("/")},a.getTypeOf=function(e){if("string"==typeof e)return "string";var t=Object.prototype.toString.call(e);return "[object Array]"===t?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&"[object Uint8Array]"===t?"uint8array":o.arraybuffer&&"[object ArrayBuffer]"===t?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[]);});},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r;},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))?void 0!==Blob.prototype.arrayBuffer?n.arrayBuffer():"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result);},e.onerror=function(e){r(e.target.error);},e.readAsArrayBuffer(n);}):u.Promise.reject(new Error(r+" is a Blob, but we have no way of reading it.")):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})};},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e;}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r);},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r};},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes();},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw !this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral();}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e);},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles();}},t.exports=h;},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t;}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize));},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength);},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0);},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4));}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i);},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else {var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else {var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r);}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else {var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i);}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l;},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions};}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker));}catch(e){(t=new h("error")).error(e);}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n;},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2;};}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null;},t.document.documentElement.appendChild(e);}:function(){setTimeout(u,0);};else {var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0);};}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length;}n=!1;}l.exports=function(e){1!==h.push(e)||n||r();};}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],37:[function(e,t,r){var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e);}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected);}function f(t,r,n){i(function(){var e;try{e=r(n);}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e);});}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments);}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e));}function i(e){r||(r=!0,l.resolve(t,e));}var s=p(function(){e(i,n);});"error"===s.status&&n(s.value);}function p(e,t){var r={};try{r.value=e(t),r.status="success";}catch(e){r.status="error",r.value=e;}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e);},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e);},h.prototype.callRejected=function(e){l.reject(this.promise,e);},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e);},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else {e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t);}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s));},function(e){i||(i=!0,l.reject(o,e));});}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e));},function(e){n||(n=!0,l.reject(s,e));});var a;return s};},{immediate:36}],38:[function(e,t,r){var n={};(0, e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n;},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0;}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return !1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)));}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e);},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg;},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return (t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return (t=t||{}).gzip=!0,n(e,t)};},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header);}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return !1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0);}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e);},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg;},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return (t=t||{}).raw=!0,o(e,t)},r.ungzip=o;},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n]);}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s];},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s];},flattenChunks:function(e){return [].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s));},r.setTyped(n);},{}],42:[function(e,t,r){var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0]);}catch(e){i=!1;}try{String.fromCharCode.apply(null,new Uint8Array(1));}catch(e){s=!1;}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else {for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i);}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t};},{"./common":41}],43:[function(e,t,r){t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521;}return i|s<<16|0};},{}],44:[function(e,t,r){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};},{}],45:[function(e,t,r){var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e;}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return -1^e};},{}],46:[function(e,t,r){var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return (e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0;}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0));}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm);}function U(e,t){e.pending_buf[e.pending++]=t;}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t;}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a];}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f;}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++;}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--;}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i;}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0;}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0;}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return (e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else {var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1;}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73);}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s);}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91);}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s);}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103);}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead);}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r);}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)";},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1;};},{}],48:[function(e,t,r){t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else {if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C;}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C;}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C;}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]));}else {for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]));}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p;};},{}],49:[function(e,t,r){var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return (e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0;}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1;}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5;}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0;}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0;}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30;}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3;}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else {if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2;}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3;}else {for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7;}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k;}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}u>>>=v,l-=v,r.back+=v;}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra;}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}u>>>=v,l-=v,r.back+=v;}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra;}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window;}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8;}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0;}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0;}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return -4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)";},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return -1;if(0<z&&(0===e||1!==w))return -1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]];}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0;}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0};},{"../utils/common":41}],51:[function(e,t,r){t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};},{}],52:[function(e,t,r){var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0;}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length;}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t;}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255;}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r);}function L(e,t,r){P(e,r[2*t],r[2*t+1]);}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o));}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0;}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0;}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n;}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t);}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2;}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--);}}(e,t),Z(s,u,e.bl_count);}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4));}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4);}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r;}(e,t,r,!0);}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p);}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e);},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1);}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e);},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8);}(e);};},{"../utils/common":41}],53:[function(e,t,r){t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0;};},{}],54:[function(e,t,r){(function(e){!function(r,n){if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e);});}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1;},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*");}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data);},function(e){t.port2.postMessage(e);}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null;},s.appendChild(t);}):function(e){setTimeout(c,0,e);},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f;}function f(e){delete h[e];}function c(e){if(u)setTimeout(c,0,e);else {var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r);}}(t);}finally{f(e),u=!1;}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length));}}("undefined"==typeof self?void 0===e?this:e:self);}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}]},{},[10])(10)}); 
} (jszip_min));

var jszip_minExports = jszip_min.exports;
var JSZip = /*@__PURE__*/getDefaultExportFromCjs(jszip_minExports);

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * パラメータ名・パーツ名・Drawable名を保持
 *
 * パラメータ名・パーツ名・Drawable名を保持するクラス。
 *
 * @note 指定したID文字列からCubismIdを取得する際はこのクラスの生成メソッドを呼ばず、
 *       CubismIdManager().getId(id)を使用してください
 */
class CubismId {
    /**
     * 内部で使用するCubismIdクラス生成メソッド
     *
     * @param id ID文字列
     * @return CubismId
     * @note 指定したID文字列からCubismIdを取得する際は
     *       CubismIdManager().getId(id)を使用してください
     */
    static createIdInternal(id) {
        return new CubismId(id);
    }
    /**
     * ID名を取得する
     */
    getString() {
        return this._id;
    }
    /**
     * idを比較
     * @param c 比較するid
     * @return 同じならばtrue,異なっていればfalseを返す
     */
    isEqual(c) {
        if (typeof c === 'string') {
            return this._id == c;
        }
        else if (c instanceof CubismId) {
            return this._id == c._id;
        }
        return false;
    }
    /**
     * idを比較
     * @param c 比較するid
     * @return 同じならばtrue,異なっていればfalseを返す
     */
    isNotEqual(c) {
        if (typeof c == 'string') {
            return !(this._id == c);
        }
        else if (c instanceof CubismId) {
            return !(this._id == c._id);
        }
        return false;
    }
    /**
     * プライベートコンストラクタ
     *
     * @note ユーザーによる生成は許可しません
     */
    constructor(id) {
        this._id = id;
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$f;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismId = CubismId;
})(Live2DCubismFramework$f || (Live2DCubismFramework$f = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * ID名の管理
 *
 * ID名を管理する。
 */
class CubismIdManager {
    /**
     * コンストラクタ
     */
    constructor() {
        this._ids = new Array();
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        for (let i = 0; i < this._ids.length; ++i) {
            this._ids[i] = void 0;
        }
        this._ids = null;
    }
    /**
     * ID名をリストから登録
     *
     * @param ids ID名リスト
     * @param count IDの個数
     */
    registerIds(ids) {
        for (let i = 0; i < ids.length; i++) {
            this.registerId(ids[i]);
        }
    }
    /**
     * ID名を登録
     *
     * @param id ID名
     */
    registerId(id) {
        let result = null;
        if ('string' == typeof id) {
            if ((result = this.findId(id)) != null) {
                return result;
            }
            result = CubismId.createIdInternal(id);
            this._ids.push(result);
        }
        else {
            return this.registerId(id);
        }
        return result;
    }
    /**
     * ID名からIDを取得する
     *
     * @param id ID名
     */
    getId(id) {
        return this.registerId(id);
    }
    /**
     * ID名からIDの確認
     *
     * @return true 存在する
     * @return false 存在しない
     */
    isExist(id) {
        if ('string' == typeof id) {
            return this.findId(id) != null;
        }
        return this.isExist(id);
    }
    /**
     * ID名からIDを検索する。
     *
     * @param id ID名
     * @return 登録されているID。なければNULL。
     */
    findId(id) {
        for (let i = 0; i < this._ids.length; ++i) {
            if (this._ids[i].getString() == id) {
                return this._ids[i];
            }
        }
        return null;
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$e;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismIdManager = CubismIdManager;
})(Live2DCubismFramework$e || (Live2DCubismFramework$e = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * 2次元ベクトル型
 *
 * 2次元ベクトル型の機能を提供する。
 */
class CubismVector2 {
    /**
     * コンストラクタ
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.x = x == undefined ? 0.0 : x;
        this.y = y == undefined ? 0.0 : y;
    }
    /**
     * ベクトルの加算
     *
     * @param vector2 加算するベクトル値
     * @return 加算結果 ベクトル値
     */
    add(vector2) {
        const ret = new CubismVector2(0.0, 0.0);
        ret.x = this.x + vector2.x;
        ret.y = this.y + vector2.y;
        return ret;
    }
    /**
     * ベクトルの減算
     *
     * @param vector2 減算するベクトル値
     * @return 減算結果 ベクトル値
     */
    substract(vector2) {
        const ret = new CubismVector2(0.0, 0.0);
        ret.x = this.x - vector2.x;
        ret.y = this.y - vector2.y;
        return ret;
    }
    /**
     * ベクトルの乗算
     *
     * @param vector2 乗算するベクトル値
     * @return 乗算結果 ベクトル値
     */
    multiply(vector2) {
        const ret = new CubismVector2(0.0, 0.0);
        ret.x = this.x * vector2.x;
        ret.y = this.y * vector2.y;
        return ret;
    }
    /**
     * ベクトルの乗算(スカラー)
     *
     * @param scalar 乗算するスカラー値
     * @return 乗算結果 ベクトル値
     */
    multiplyByScaler(scalar) {
        return this.multiply(new CubismVector2(scalar, scalar));
    }
    /**
     * ベクトルの除算
     *
     * @param vector2 除算するベクトル値
     * @return 除算結果 ベクトル値
     */
    division(vector2) {
        const ret = new CubismVector2(0.0, 0.0);
        ret.x = this.x / vector2.x;
        ret.y = this.y / vector2.y;
        return ret;
    }
    /**
     * ベクトルの除算(スカラー)
     *
     * @param scalar 除算するスカラー値
     * @return 除算結果 ベクトル値
     */
    divisionByScalar(scalar) {
        return this.division(new CubismVector2(scalar, scalar));
    }
    /**
     * ベクトルの長さを取得する
     *
     * @return ベクトルの長さ
     */
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * ベクトルの距離の取得
     *
     * @param a 点
     * @return ベクトルの距離
     */
    getDistanceWith(a) {
        return Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y));
    }
    /**
     * ドット積の計算
     *
     * @param a 値
     * @return 結果
     */
    dot(a) {
        return this.x * a.x + this.y * a.y;
    }
    /**
     * 正規化の適用
     */
    normalize() {
        const length = Math.pow(this.x * this.x + this.y * this.y, 0.5);
        this.x = this.x / length;
        this.y = this.y / length;
    }
    /**
     * 等しさの確認（等しいか？）
     *
     * 値が等しいか？
     *
     * @param rhs 確認する値
     * @return true 値は等しい
     * @return false 値は等しくない
     */
    isEqual(rhs) {
        return this.x == rhs.x && this.y == rhs.y;
    }
    /**
     * 等しさの確認（等しくないか？）
     *
     * 値が等しくないか？
     *
     * @param rhs 確認する値
     * @return true 値は等しくない
     * @return false 値は等しい
     */
    isNotEqual(rhs) {
        return !this.isEqual(rhs);
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$d;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismVector2 = CubismVector2;
})(Live2DCubismFramework$d || (Live2DCubismFramework$d = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * 数値計算などに使用するユーティリティクラス
 */
class CubismMath {
    /**
     * 第一引数の値を最小値と最大値の範囲に収めた値を返す
     *
     * @param value 収められる値
     * @param min   範囲の最小値
     * @param max   範囲の最大値
     * @return 最小値と最大値の範囲に収めた値
     */
    static range(value, min, max) {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }
    /**
     * サイン関数の値を求める
     *
     * @param x 角度値（ラジアン）
     * @return サイン関数sin(x)の値
     */
    static sin(x) {
        return Math.sin(x);
    }
    /**
     * コサイン関数の値を求める
     *
     * @param x 角度値(ラジアン)
     * @return コサイン関数cos(x)の値
     */
    static cos(x) {
        return Math.cos(x);
    }
    /**
     * 値の絶対値を求める
     *
     * @param x 絶対値を求める値
     * @return 値の絶対値
     */
    static abs(x) {
        return Math.abs(x);
    }
    /**
     * 平方根(ルート)を求める
     * @param x -> 平方根を求める値
     * @return 値の平方根
     */
    static sqrt(x) {
        return Math.sqrt(x);
    }
    /**
     * 立方根を求める
     * @param x -> 立方根を求める値
     * @return 値の立方根
     */
    static cbrt(x) {
        if (x === 0) {
            return x;
        }
        let cx = x;
        const isNegativeNumber = cx < 0;
        if (isNegativeNumber) {
            cx = -cx;
        }
        let ret;
        if (cx === Infinity) {
            ret = Infinity;
        }
        else {
            ret = Math.exp(Math.log(cx) / 3);
            ret = (cx / (ret * ret) + 2 * ret) / 3;
        }
        return isNegativeNumber ? -ret : ret;
    }
    /**
     * イージング処理されたサインを求める
     * フェードイン・アウト時のイージングに利用できる
     *
     * @param value イージングを行う値
     * @return イージング処理されたサイン値
     */
    static getEasingSine(value) {
        if (value < 0.0) {
            return 0.0;
        }
        else if (value > 1.0) {
            return 1.0;
        }
        return 0.5 - 0.5 * this.cos(value * Math.PI);
    }
    /**
     * 大きい方の値を返す
     *
     * @param left 左辺の値
     * @param right 右辺の値
     * @return 大きい方の値
     */
    static max(left, right) {
        return left > right ? left : right;
    }
    /**
     * 小さい方の値を返す
     *
     * @param left  左辺の値
     * @param right 右辺の値
     * @return 小さい方の値
     */
    static min(left, right) {
        return left > right ? right : left;
    }
    static clamp(val, min, max) {
        if (val < min) {
            return min;
        }
        else if (max < val) {
            return max;
        }
        return val;
    }
    /**
     * 角度値をラジアン値に変換する
     *
     * @param degrees   角度値
     * @return 角度値から変換したラジアン値
     */
    static degreesToRadian(degrees) {
        return (degrees / 180.0) * Math.PI;
    }
    /**
     * ラジアン値を角度値に変換する
     *
     * @param radian    ラジアン値
     * @return ラジアン値から変換した角度値
     */
    static radianToDegrees(radian) {
        return (radian * 180.0) / Math.PI;
    }
    /**
     * ２つのベクトルからラジアン値を求める
     *
     * @param from  始点ベクトル
     * @param to    終点ベクトル
     * @return ラジアン値から求めた方向ベクトル
     */
    static directionToRadian(from, to) {
        const q1 = Math.atan2(to.y, to.x);
        const q2 = Math.atan2(from.y, from.x);
        let ret = q1 - q2;
        while (ret < -Math.PI) {
            ret += Math.PI * 2.0;
        }
        while (ret > Math.PI) {
            ret -= Math.PI * 2.0;
        }
        return ret;
    }
    /**
     * ２つのベクトルから角度値を求める
     *
     * @param from  始点ベクトル
     * @param to    終点ベクトル
     * @return 角度値から求めた方向ベクトル
     */
    static directionToDegrees(from, to) {
        const radian = this.directionToRadian(from, to);
        let degree = this.radianToDegrees(radian);
        if (to.x - from.x > 0.0) {
            degree = -degree;
        }
        return degree;
    }
    /**
     * ラジアン値を方向ベクトルに変換する。
     *
     * @param totalAngle    ラジアン値
     * @return ラジアン値から変換した方向ベクトル
     */
    static radianToDirection(totalAngle) {
        const ret = new CubismVector2();
        ret.x = this.sin(totalAngle);
        ret.y = this.cos(totalAngle);
        return ret;
    }
    /**
     * 三次方程式の三次項の係数が0になったときに補欠的に二次方程式の解をもとめる。
     * a * x^2 + b * x + c = 0
     *
     * @param   a -> 二次項の係数値
     * @param   b -> 一次項の係数値
     * @param   c -> 定数項の値
     * @return  二次方程式の解
     */
    static quadraticEquation(a, b, c) {
        if (this.abs(a) < CubismMath.Epsilon) {
            if (this.abs(b) < CubismMath.Epsilon) {
                return -c;
            }
            return -c / b;
        }
        return -(b + this.sqrt(b * b - 4.0 * a * c)) / (2.0 * a);
    }
    /**
     * カルダノの公式によってベジェのt値に該当する３次方程式の解を求める。
     * 重解になったときには0.0～1.0の値になる解を返す。
     *
     * a * x^3 + b * x^2 + c * x + d = 0
     *
     * @param   a -> 三次項の係数値
     * @param   b -> 二次項の係数値
     * @param   c -> 一次項の係数値
     * @param   d -> 定数項の値
     * @return  0.0～1.0の間にある解
     */
    static cardanoAlgorithmForBezier(a, b, c, d) {
        if (this.abs(a) < CubismMath.Epsilon) {
            return this.range(this.quadraticEquation(b, c, d), 0.0, 1.0);
        }
        const ba = b / a;
        const ca = c / a;
        const da = d / a;
        const p = (3.0 * ca - ba * ba) / 3.0;
        const p3 = p / 3.0;
        const q = (2.0 * ba * ba * ba - 9.0 * ba * ca + 27.0 * da) / 27.0;
        const q2 = q / 2.0;
        const discriminant = q2 * q2 + p3 * p3 * p3;
        const center = 0.5;
        const threshold = center + 0.01;
        if (discriminant < 0.0) {
            const mp3 = -p / 3.0;
            const mp33 = mp3 * mp3 * mp3;
            const r = this.sqrt(mp33);
            const t = -q / (2.0 * r);
            const cosphi = this.range(t, -1.0, 1.0);
            const phi = Math.acos(cosphi);
            const crtr = this.cbrt(r);
            const t1 = 2.0 * crtr;
            const root1 = t1 * this.cos(phi / 3.0) - ba / 3.0;
            if (this.abs(root1 - center) < threshold) {
                return this.range(root1, 0.0, 1.0);
            }
            const root2 = t1 * this.cos((phi + 2.0 * Math.PI) / 3.0) - ba / 3.0;
            if (this.abs(root2 - center) < threshold) {
                return this.range(root2, 0.0, 1.0);
            }
            const root3 = t1 * this.cos((phi + 4.0 * Math.PI) / 3.0) - ba / 3.0;
            return this.range(root3, 0.0, 1.0);
        }
        if (discriminant == 0.0) {
            let u1;
            if (q2 < 0.0) {
                u1 = this.cbrt(-q2);
            }
            else {
                u1 = -this.cbrt(q2);
            }
            const root1 = 2.0 * u1 - ba / 3.0;
            if (this.abs(root1 - center) < threshold) {
                return this.range(root1, 0.0, 1.0);
            }
            const root2 = -u1 - ba / 3.0;
            return this.range(root2, 0.0, 1.0);
        }
        const sd = this.sqrt(discriminant);
        const u1 = this.cbrt(sd - q2);
        const v1 = this.cbrt(sd + q2);
        const root1 = u1 - v1 - ba / 3.0;
        return this.range(root1, 0.0, 1.0);
    }
    /**
     * 浮動小数点の余りを求める。
     *
     * @param dividend 被除数（割られる値）
     * @param divisor 除数（割る値）
     * @return 余り
     */
    static mod(dividend, divisor) {
        if (!isFinite(dividend) ||
            divisor === 0 ||
            isNaN(dividend) ||
            isNaN(divisor)) {
            console.warn(`divided: ${dividend}, divisor: ${divisor} mod() returns 'NaN'.`);
            return NaN;
        }
        // 絶対値に変換する。
        const absDividend = Math.abs(dividend);
        const absDivisor = Math.abs(divisor);
        // 絶対値で割り算する。
        let result = absDividend - Math.floor(absDividend / absDivisor) * absDivisor;
        // 符号を被除数のものに指定する。
        result *= Math.sign(dividend);
        return result;
    }
    /**
     * コンストラクタ
     */
    constructor() { }
}
CubismMath.Epsilon = 0.00001;
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$c;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMath = CubismMath;
})(Live2DCubismFramework$c || (Live2DCubismFramework$c = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * 4x4の行列
 *
 * 4x4行列の便利クラス。
 */
class CubismMatrix44 {
    /**
     * コンストラクタ
     */
    constructor() {
        this._tr = new Float32Array(16); // 4 * 4のサイズ
        this.loadIdentity();
    }
    /**
     * 受け取った２つの行列の乗算を行う。
     *
     * @param a 行列a
     * @param b 行列b
     *
     * @return 乗算結果の行列
     */
    static multiply(a, b, dst) {
        const c = new Float32Array([
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0
        ]);
        const n = 4;
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                for (let k = 0; k < n; ++k) {
                    c[j + i * 4] += a[k + i * 4] * b[j + k * 4];
                }
            }
        }
        for (let i = 0; i < 16; ++i) {
            dst[i] = c[i];
        }
    }
    /**
     * 単位行列に初期化する
     */
    loadIdentity() {
        const c = new Float32Array([
            1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
            1.0
        ]);
        this.setMatrix(c);
    }
    /**
     * 行列を設定
     *
     * @param tr 16個の浮動小数点数で表される4x4の行列
     */
    setMatrix(tr) {
        for (let i = 0; i < 16; ++i) {
            this._tr[i] = tr[i];
        }
    }
    /**
     * 行列を浮動小数点数の配列で取得
     *
     * @return 16個の浮動小数点数で表される4x4の行列
     */
    getArray() {
        return this._tr;
    }
    /**
     * X軸の拡大率を取得
     *
     * @return X軸の拡大率
     */
    getScaleX() {
        return this._tr[0];
    }
    /**
     * Y軸の拡大率を取得する
     *
     * @return Y軸の拡大率
     */
    getScaleY() {
        return this._tr[5];
    }
    /**
     * X軸の移動量を取得
     *
     * @return X軸の移動量
     */
    getTranslateX() {
        return this._tr[12];
    }
    /**
     * Y軸の移動量を取得
     *
     * @return Y軸の移動量
     */
    getTranslateY() {
        return this._tr[13];
    }
    /**
     * X軸の値を現在の行列で計算
     *
     * @param src X軸の値
     *
     * @return 現在の行列で計算されたX軸の値
     */
    transformX(src) {
        return this._tr[0] * src + this._tr[12];
    }
    /**
     * Y軸の値を現在の行列で計算
     *
     * @param src Y軸の値
     *
     * @return 現在の行列で計算されたY軸の値
     */
    transformY(src) {
        return this._tr[5] * src + this._tr[13];
    }
    /**
     * X軸の値を現在の行列で逆計算
     */
    invertTransformX(src) {
        return (src - this._tr[12]) / this._tr[0];
    }
    /**
     * Y軸の値を現在の行列で逆計算
     */
    invertTransformY(src) {
        return (src - this._tr[13]) / this._tr[5];
    }
    /**
     * 現在の行列の位置を起点にして移動
     *
     * 現在の行列の位置を起点にして相対的に移動する。
     *
     * @param x X軸の移動量
     * @param y Y軸の移動量
     */
    translateRelative(x, y) {
        const tr1 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            x,
            y,
            0.0,
            1.0
        ]);
        CubismMatrix44.multiply(tr1, this._tr, this._tr);
    }
    /**
     * 現在の行列の位置を移動
     *
     * 現在の行列の位置を指定した位置へ移動する
     *
     * @param x X軸の移動量
     * @param y y軸の移動量
     */
    translate(x, y) {
        this._tr[12] = x;
        this._tr[13] = y;
    }
    /**
     * 現在の行列のX軸の位置を指定した位置へ移動する
     *
     * @param x X軸の移動量
     */
    translateX(x) {
        this._tr[12] = x;
    }
    /**
     * 現在の行列のY軸の位置を指定した位置へ移動する
     *
     * @param y Y軸の移動量
     */
    translateY(y) {
        this._tr[13] = y;
    }
    /**
     * 現在の行列の拡大率を相対的に設定する
     *
     * @param x X軸の拡大率
     * @param y Y軸の拡大率
     */
    scaleRelative(x, y) {
        const tr1 = new Float32Array([
            x,
            0.0,
            0.0,
            0.0,
            0.0,
            y,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0
        ]);
        CubismMatrix44.multiply(tr1, this._tr, this._tr);
    }
    /**
     * 現在の行列の拡大率を指定した倍率に設定する
     *
     * @param x X軸の拡大率
     * @param y Y軸の拡大率
     */
    scale(x, y) {
        this._tr[0] = x;
        this._tr[5] = y;
    }
    /**
     * 引数で与えられた行列にこの行列を乗算する。
     * (引数で与えられた行列) * (この行列)
     *
     * @note 関数名と実際の計算内容に乖離があるため、今後計算順が修正される可能性があります。
     * @param m 行列
     */
    multiplyByMatrix(m) {
        CubismMatrix44.multiply(m.getArray(), this._tr, this._tr);
    }
    /**
     * 現在の行列の逆行列を求める。
     *
     * @return 現在の行列で計算された逆行列の値を返す
     */
    getInvert() {
        const r00 = this._tr[0];
        const r10 = this._tr[1];
        const r20 = this._tr[2];
        const r01 = this._tr[4];
        const r11 = this._tr[5];
        const r21 = this._tr[6];
        const r02 = this._tr[8];
        const r12 = this._tr[9];
        const r22 = this._tr[10];
        const tx = this._tr[12];
        const ty = this._tr[13];
        const tz = this._tr[14];
        const det = r00 * (r11 * r22 - r12 * r21) -
            r01 * (r10 * r22 - r12 * r20) +
            r02 * (r10 * r21 - r11 * r20);
        const dst = new CubismMatrix44();
        if (CubismMath.abs(det) < CubismMath.Epsilon) {
            dst.loadIdentity();
            return dst;
        }
        const invDet = 1.0 / det;
        const inv00 = (r11 * r22 - r12 * r21) * invDet;
        const inv01 = -(r01 * r22 - r02 * r21) * invDet;
        const inv02 = (r01 * r12 - r02 * r11) * invDet;
        const inv10 = -(r10 * r22 - r12 * r20) * invDet;
        const inv11 = (r00 * r22 - r02 * r20) * invDet;
        const inv12 = -(r00 * r12 - r02 * r10) * invDet;
        const inv20 = (r10 * r21 - r11 * r20) * invDet;
        const inv21 = -(r00 * r21 - r01 * r20) * invDet;
        const inv22 = (r00 * r11 - r01 * r10) * invDet;
        dst._tr[0] = inv00;
        dst._tr[1] = inv10;
        dst._tr[2] = inv20;
        dst._tr[3] = 0.0;
        dst._tr[4] = inv01;
        dst._tr[5] = inv11;
        dst._tr[6] = inv21;
        dst._tr[7] = 0.0;
        dst._tr[8] = inv02;
        dst._tr[9] = inv12;
        dst._tr[10] = inv22;
        dst._tr[11] = 0.0;
        dst._tr[12] = -(inv00 * tx + inv01 * ty + inv02 * tz);
        dst._tr[13] = -(inv10 * tx + inv11 * ty + inv12 * tz);
        dst._tr[14] = -(inv20 * tx + inv21 * ty + inv22 * tz);
        dst._tr[15] = 1.0;
        return dst;
    }
    /**
     * オブジェクトのコピーを生成する
     */
    clone() {
        const cloneMatrix = new CubismMatrix44();
        for (let i = 0; i < this._tr.length; i++) {
            cloneMatrix._tr[i] = this._tr[i];
        }
        return cloneMatrix;
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$b;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMatrix44 = CubismMatrix44;
})(Live2DCubismFramework$b || (Live2DCubismFramework$b = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * 矩形形状（座標・長さはfloat値）を定義するクラス
 */
class csmRect {
    /**
     * コンストラクタ
     * @param x 左端X座標
     * @param y 上端Y座標
     * @param w 幅
     * @param h 高さ
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    /**
     * 矩形中央のX座標を取得する
     */
    getCenterX() {
        return this.x + 0.5 * this.width;
    }
    /**
     * 矩形中央のY座標を取得する
     */
    getCenterY() {
        return this.y + 0.5 * this.height;
    }
    /**
     * 右側のX座標を取得する
     */
    getRight() {
        return this.x + this.width;
    }
    /**
     * 下端のY座標を取得する
     */
    getBottom() {
        return this.y + this.height;
    }
    /**
     * 矩形に値をセットする
     * @param r 矩形のインスタンス
     */
    setRect(r) {
        this.x = r.x;
        this.y = r.y;
        this.width = r.width;
        this.height = r.height;
    }
    /**
     * 矩形中央を軸にして縦横を拡縮する
     * @param w 幅方向に拡縮する量
     * @param h 高さ方向に拡縮する量
     */
    expand(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += w * 2.0;
        this.height += h * 2.0;
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$a;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.csmRect = csmRect;
})(Live2DCubismFramework$a || (Live2DCubismFramework$a = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
const CubismLogPrint = (level, fmt, args) => {
    CubismDebug.print(level, '[CSM]' + fmt, args);
};
const CubismLogPrintIn = (level, fmt, args) => {
    CubismLogPrint(level, fmt + '\n', args);
};
const CSM_ASSERT = (expr) => {
    console.assert(expr);
};
let CubismLogInfo;
let CubismLogWarning;
let CubismLogError;
{
    CubismLogInfo = (fmt, ...args) => {
        CubismLogPrintIn(LogLevel.LogLevel_Info, '[I]' + fmt, args);
    };
    CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
/**
 * デバッグ用のユーティリティクラス。
 * ログの出力、バイトのダンプなど
 */
class CubismDebug {
    /**
     * ログを出力する。第一引数にログレベルを設定する。
     * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
     *
     * @param logLevel ログレベルの設定
     * @param format 書式付き文字列
     * @param args 可変長引数
     */
    static print(logLevel, format, args) {
        // オプションで設定されたログ出力レベルを下回る場合はログに出さない
        if (logLevel < CubismFramework.getLoggingLevel()) {
            return;
        }
        const logPrint = CubismFramework.coreLogFunction;
        if (!logPrint)
            return;
        const buffer = format.replace(/\{(\d+)\}/g, (m, k) => {
            return args[k];
        });
        logPrint(buffer);
    }
    /**
     * データから指定した長さだけダンプ出力する。
     * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
     *
     * @param logLevel ログレベルの設定
     * @param data ダンプするデータ
     * @param length ダンプする長さ
     */
    static dumpBytes(logLevel, data, length) {
        for (let i = 0; i < length; i++) {
            if (i % 16 == 0 && i > 0)
                this.print(logLevel, '\n');
            else if (i % 8 == 0 && i > 0)
                this.print(logLevel, '  ');
            this.print(logLevel, '{0} ', [data[i] & 0xff]);
        }
        this.print(logLevel, '\n');
    }
    /**
     * private コンストラクタ
     */
    constructor() { }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$9;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismDebug = CubismDebug;
})(Live2DCubismFramework$9 || (Live2DCubismFramework$9 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * モデル描画を処理するレンダラ
 *
 * サブクラスに環境依存の描画命令を記述する。
 */
class CubismRenderer {
    /**
     * レンダラのインスタンスを生成して取得する
     *
     * @return レンダラのインスタンス
     */
    static create() {
        return null;
    }
    /**
     * レンダラのインスタンスを解放する
     */
    static delete(renderer) {
    }
    /**
     * レンダラの初期化処理を実行する
     * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
     *
     * @param model モデルのインスタンス
     */
    initialize(model) {
        this._model = model;
        // ブレンドモード使用時は必ず高精細にする
        if (model.isBlendModeEnabled()) {
            this.useHighPrecisionMask(true);
            CubismLogInfo('This model uses a high-resolution mask because it operates in blend mode.');
        }
    }
    /**
     * モデルを描画する
     * @param shaderPath ブレンドモード用シェーダのパス
     */
    drawModel(shaderPath = null) {
        if (this.getModel() == null)
            return;
        // NOTE: WebGL最適化のため、デフォルトではコメントアウト
        //this.saveProfile();
        this.doDrawModel(shaderPath);
        // NOTE: WebGL最適化のため、デフォルトではコメントアウト
        //this.restoreProfile();
    }
    /**
     * Model-View-Projection 行列をセットする
     * 配列は複製されるので、元の配列は外で破棄して良い
     *
     * @param matrix44 Model-View-Projection 行列
     */
    setMvpMatrix(matrix44) {
        this._mvpMatrix4x4.setMatrix(matrix44.getArray());
    }
    /**
     * Model-View-Projection 行列を取得する
     *
     * @return Model-View-Projection 行列
     */
    getMvpMatrix() {
        return this._mvpMatrix4x4;
    }
    /**
     * モデルの色をセットする
     * 各色0.0~1.0の間で指定する（1.0が標準の状態）
     *
     * @param red 赤チャンネルの値
     * @param green 緑チャンネルの値
     * @param blue 青チャンネルの値
     * @param alpha αチャンネルの値
     */
    setModelColor(red, green, blue, alpha) {
        this._modelColor.r = CubismMath.clamp(red, 0.0, 1.0);
        this._modelColor.g = CubismMath.clamp(green, 0.0, 1.0);
        this._modelColor.b = CubismMath.clamp(blue, 0.0, 1.0);
        this._modelColor.a = CubismMath.clamp(alpha, 0.0, 1.0);
    }
    /**
     * モデルの色を取得する
     * 各色0.0~1.0の間で指定する(1.0が標準の状態)
     *
     * @return RGBAのカラー情報
     */
    getModelColor() {
        return JSON.parse(JSON.stringify(this._modelColor));
    }
    /**
     * 透明度を考慮したモデルの色を計算する。
     *
     * @param opacity 透明度
     *
     * @return RGBAのカラー情報
     */
    getModelColorWithOpacity(opacity) {
        const modelColorRGBA = this.getModelColor();
        modelColorRGBA.a *= opacity;
        if (this.isPremultipliedAlpha()) {
            modelColorRGBA.r *= modelColorRGBA.a;
            modelColorRGBA.g *= modelColorRGBA.a;
            modelColorRGBA.b *= modelColorRGBA.a;
        }
        return modelColorRGBA;
    }
    /**
     * 乗算済みαの有効・無効をセットする
     * 有効にするならtrue、無効にするならfalseをセットする
     */
    setIsPremultipliedAlpha(enable) {
        this._isPremultipliedAlpha = enable;
    }
    /**
     * 乗算済みαの有効・無効を取得する
     * @return true 乗算済みのα有効
     *         false 乗算済みのα無効
     */
    isPremultipliedAlpha() {
        return this._isPremultipliedAlpha;
    }
    /**
     * カリング（片面描画）の有効・無効をセットする。
     * 有効にするならtrue、無効にするならfalseをセットする
     */
    setIsCulling(culling) {
        this._isCulling = culling;
    }
    /**
     * カリング（片面描画）の有効・無効を取得する。
     *
     * @return true カリング有効
     *         false カリング無効
     */
    isCulling() {
        return this._isCulling;
    }
    /**
     * テクスチャの異方性フィルタリングのパラメータをセットする
     * パラメータ値の影響度はレンダラの実装に依存する
     *
     * @param n パラメータの値
     */
    setAnisotropy(n) {
        this._anisotropy = n;
    }
    /**
     * テクスチャの異方性フィルタリングのパラメータをセットする
     *
     * @return 異方性フィルタリングのパラメータ
     */
    getAnisotropy() {
        return this._anisotropy;
    }
    /**
     * レンダリングするモデルを取得する
     *
     * @return レンダリングするモデル
     */
    getModel() {
        return this._model;
    }
    /**
     * マスク描画の方式を変更する。
     * falseの場合、マスクを1枚のテクスチャに分割してレンダリングする（デフォルト）
     * 高速だが、マスク個数の上限が36に限定され、質も荒くなる
     * trueの場合、パーツ描画の前にその都度必要なマスクを描き直す
     * レンダリング品質は高いが描画処理負荷は増す
     *
     * @param high 高精細マスクに切り替えるか？
     */
    useHighPrecisionMask(high) {
        this._useHighPrecisionMask = high;
    }
    /**
     * マスクの描画方式を取得する
     *
     * @return true 高精細方式
     *         false デフォルト
     */
    isUsingHighPrecisionMask() {
        return this._useHighPrecisionMask;
    }
    /**
     * モデルを描画したバッファのサイズを設定
     *
     * @param[in]   width  -> モデルを描画したバッファの幅
     * @param[in]   height -> モデルを描画したバッファの高さ
     */
    setRenderTargetSize(width, height) {
        this._modelRenderTargetWidth = width;
        this._modelRenderTargetHeight = height;
    }
    /**
     * コンストラクタ
     */
    constructor(width, height) {
        this._modelRenderTargetWidth = width;
        this._modelRenderTargetHeight = height;
        this._isCulling = false;
        this._isPremultipliedAlpha = false;
        this._anisotropy = 0.0;
        this._model = null;
        this._modelColor = new CubismTextureColor();
        this._useHighPrecisionMask = false;
        // 単位行列に初期化
        this._mvpMatrix4x4 = new CubismMatrix44();
        this._mvpMatrix4x4.loadIdentity();
    }
}
var CubismBlendMode;
(function (CubismBlendMode) {
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Normal"] = 0] = "CubismBlendMode_Normal";
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Additive"] = 1] = "CubismBlendMode_Additive";
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Multiplicative"] = 2] = "CubismBlendMode_Multiplicative"; // 乗算
})(CubismBlendMode || (CubismBlendMode = {}));
/**
 * オブジェクトのタイプ
 */
var DrawableObjectType;
(function (DrawableObjectType) {
    DrawableObjectType[DrawableObjectType["DrawableObjectType_Drawable"] = 0] = "DrawableObjectType_Drawable";
    DrawableObjectType[DrawableObjectType["DrawableObjectType_Offscreen"] = 1] = "DrawableObjectType_Offscreen";
})(DrawableObjectType || (DrawableObjectType = {}));
/**
 * テクスチャの色をRGBAで扱うためのクラス
 */
class CubismTextureColor {
    /**
     * コンストラクタ
     */
    constructor(r = 1.0, g = 1.0, b = 1.0, a = 1.0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
/**
 * クリッピングマスクのコンテキスト
 */
class CubismClippingContext {
    /**
     * 引数付きコンストラクタ
     */
    constructor(clippingDrawableIndices, clipCount) {
        // クリップしている（＝マスク用の）Drawableのインデックスリスト
        this._clippingIdList = clippingDrawableIndices;
        // マスクの数
        this._clippingIdCount = clipCount;
        this._allClippedDrawRect = new csmRect();
        this._layoutBounds = new csmRect();
        this._clippedDrawableIndexList = [];
        this._clippedOffscreenIndexList = [];
        this._matrixForMask = new CubismMatrix44();
        this._matrixForDraw = new CubismMatrix44();
        this._bufferIndex = 0;
        this._layoutChannelIndex = 0;
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        if (this._layoutBounds != null) {
            this._layoutBounds = null;
        }
        if (this._allClippedDrawRect != null) {
            this._allClippedDrawRect = null;
        }
        if (this._clippedDrawableIndexList != null) {
            this._clippedDrawableIndexList = null;
        }
        if (this._clippedOffscreenIndexList != null) {
            this._clippedOffscreenIndexList = null;
        }
    }
    /**
     * このマスクにクリップされる描画オブジェクトを追加する
     *
     * @param drawableIndex クリッピング対象に追加する描画オブジェクトのインデックス
     */
    addClippedDrawable(drawableIndex) {
        this._clippedDrawableIndexList.push(drawableIndex);
    }
    /**
     * このマスクにクリップされるオフスクリーンオブジェクトを追加する
     *
     * @param offscreenIndex クリッピング対象に追加するオフスクリーンオブジェクトのインデックス
     */
    addClippedOffscreen(offscreenIndex) {
        this._clippedOffscreenIndexList.push(offscreenIndex);
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$8;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismBlendMode = CubismBlendMode;
    Live2DCubismFramework.CubismRenderer = CubismRenderer;
    Live2DCubismFramework.CubismTextureColor = CubismTextureColor;
})(Live2DCubismFramework$8 || (Live2DCubismFramework$8 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * CubismJsonで実装されているJsonパーサを使用せず、
 * TypeScript標準のJsonパーサなどを使用し出力された結果を
 * Cubism SDKで定義されているJSONエレメントの要素に
 * 置き換える処理をするクラス。
 */
class CubismJsonExtension {
    static parseJsonObject(obj, map) {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] == 'boolean') {
                const convValue = Boolean(obj[key]);
                map.put(key, new JsonBoolean(convValue));
            }
            else if (typeof obj[key] == 'string') {
                const convValue = String(obj[key]);
                map.put(key, new JsonString(convValue));
            }
            else if (typeof obj[key] == 'number') {
                const convValue = Number(obj[key]);
                map.put(key, new JsonFloat(convValue));
            }
            else if (obj[key] instanceof Array) {
                // HACK: Array 単体で変換できないので unknown に変更してから Value にしている
                map.put(key, CubismJsonExtension.parseJsonArray(obj[key]));
            }
            else if (obj[key] instanceof Object) {
                map.put(key, CubismJsonExtension.parseJsonObject(obj[key], new JsonMap()));
            }
            else if (obj[key] == null) {
                map.put(key, new JsonNullvalue());
            }
            else {
                // どれにも当てはまらない場合でも処理する
                map.put(key, obj[key]);
            }
        });
        return map;
    }
    static parseJsonArray(obj) {
        const arr = new JsonArray();
        Object.keys(obj).forEach(key => {
            const convKey = Number(key);
            if (typeof convKey == 'number') {
                if (typeof obj[key] == 'boolean') {
                    const convValue = Boolean(obj[key]);
                    arr.add(new JsonBoolean(convValue));
                }
                else if (typeof obj[key] == 'string') {
                    const convValue = String(obj[key]);
                    arr.add(new JsonString(convValue));
                }
                else if (typeof obj[key] == 'number') {
                    const convValue = Number(obj[key]);
                    arr.add(new JsonFloat(convValue));
                }
                else if (obj[key] instanceof Array) {
                    // HACK: Array 単体で変換できないので unknown に変更してから Value にしている
                    arr.add(this.parseJsonArray(obj[key]));
                }
                else if (obj[key] instanceof Object) {
                    arr.add(this.parseJsonObject(obj[key], new JsonMap()));
                }
                else if (obj[key] == null) {
                    arr.add(new JsonNullvalue());
                }
                else {
                    // どれにも当てはまらない場合でも処理する
                    arr.add(obj[key]);
                }
            }
            else if (obj[key] instanceof Array) {
                // HACK: Array 単体で変換できないので unknown に変更してから Value にしている
                arr.add(this.parseJsonArray(obj[key]));
            }
            else if (obj[key] instanceof Object) {
                arr.add(this.parseJsonObject(obj[key], new JsonMap()));
            }
            else if (obj[key] == null) {
                arr.add(new JsonNullvalue());
            }
            else {
                const convValue = Array(obj[key]);
                // 配列ともObjectとも判定できなかった場合でも処理する
                for (let i = 0; i < convValue.length; i++) {
                    arr.add(convValue[i]);
                }
            }
        });
        return arr;
    }
}

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
// StaticInitializeNotForClientCall()で初期化する
const CSM_JSON_ERROR_TYPE_MISMATCH = 'Error: type mismatch';
const CSM_JSON_ERROR_INDEX_OF_BOUNDS = 'Error: index out of bounds';
/**
 * パースしたJSONエレメントの要素の基底クラス。
 */
class Value {
    /**
     * コンストラクタ
     */
    constructor() { }
    /**
     * 要素を文字列型で返す(string)
     */
    getRawString(defaultValue, indent) {
        return this.getString(defaultValue, indent);
    }
    /**
     * 要素を数値型で返す(number)
     */
    toInt(defaultValue = 0) {
        return defaultValue;
    }
    /**
     * 要素を数値型で返す(number)
     */
    toFloat(defaultValue = 0) {
        return defaultValue;
    }
    /**
     * 要素を真偽値で返す(boolean)
     */
    toBoolean(defaultValue = false) {
        return defaultValue;
    }
    /**
     * サイズを返す
     */
    getSize() {
        return 0;
    }
    /**
     * 要素を配列で返す(Value[])
     */
    getArray(defaultValue = null) {
        return defaultValue;
    }
    /**
     * 要素をコンテナで返す(array)
     */
    getVector(defaultValue = new Array()) {
        return defaultValue;
    }
    /**
     * 要素をマップで返す(Map<String, Value>)
     */
    getMap(defaultValue) {
        return defaultValue;
    }
    /**
     * 添字演算子[index]
     */
    getValueByIndex(index) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    }
    /**
     * 添字演算子[string]
     */
    getValueByString(s) {
        return Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    }
    /**
     * マップのキー一覧をコンテナで返す
     *
     * @return マップのキーの一覧
     */
    getKeys() {
        return Value.dummyKeys;
    }
    /**
     * Valueの種類がエラー値ならtrue
     */
    isError() {
        return false;
    }
    /**
     * Valueの種類がnullならtrue
     */
    isNull() {
        return false;
    }
    /**
     * Valueの種類が真偽値ならtrue
     */
    isBool() {
        return false;
    }
    /**
     * Valueの種類が数値型ならtrue
     */
    isFloat() {
        return false;
    }
    /**
     * Valueの種類が文字列ならtrue
     */
    isString() {
        return false;
    }
    /**
     * Valueの種類が配列ならtrue
     */
    isArray() {
        return false;
    }
    /**
     * Valueの種類がマップ型ならtrue
     */
    isMap() {
        return false;
    }
    equals(value) {
        return false;
    }
    /**
     * Valueの値が静的ならtrue、静的なら解放しない
     */
    isStatic() {
        return false;
    }
    /**
     * Valueにエラー値をセットする
     */
    setErrorNotForClientCall(errorStr) {
        return JsonError.errorValue;
    }
    /**
     * 初期化用メソッド
     */
    static staticInitializeNotForClientCall() {
        JsonBoolean.trueValue = new JsonBoolean(true);
        JsonBoolean.falseValue = new JsonBoolean(false);
        Value.errorValue = new JsonError('ERROR', true);
        Value.nullValue = new JsonNullvalue();
        Value.dummyKeys = new Array();
    }
    /**
     * リリース用メソッド
     */
    static staticReleaseNotForClientCall() {
        JsonBoolean.trueValue = null;
        JsonBoolean.falseValue = null;
        Value.errorValue = null;
        Value.nullValue = null;
        Value.dummyKeys = null;
    }
}
/**
 * Ascii文字のみ対応した最小限の軽量JSONパーサ。
 * 仕様はJSONのサブセットとなる。
 * 設定ファイル(model3.json)などのロード用
 *
 * [未対応項目]
 * ・日本語などの非ASCII文字
 * ・eによる指数表現
 */
class CubismJson {
    /**
     * コンストラクタ
     */
    constructor(buffer, length) {
        this._parseCallback = CubismJsonExtension.parseJsonObject; // パース時に使う処理のコールバック関数
        this._error = null;
        this._lineCount = 0;
        this._root = null;
        if (buffer != undefined) {
            this.parseBytes(buffer, length, this._parseCallback);
        }
    }
    /**
     * バイトデータから直接ロードしてパースする
     *
     * @param buffer バッファ
     * @param size バッファサイズ
     * @return CubismJsonクラスのインスタンス。失敗したらNULL
     */
    static create(buffer, size) {
        const json = new CubismJson();
        const succeeded = json.parseBytes(buffer, size, json._parseCallback);
        if (!succeeded) {
            CubismJson.delete(json);
            return null;
        }
        else {
            return json;
        }
    }
    /**
     * パースしたJSONオブジェクトの解放処理
     *
     * @param instance CubismJsonクラスのインスタンス
     */
    static delete(instance) {
    }
    /**
     * パースしたJSONのルート要素を返す
     */
    getRoot() {
        return this._root;
    }
    /**
     *  UnicodeのバイナリをStringに変換
     *
     * @param buffer 変換するバイナリデータ
     * @return 変換後の文字列
     */
    static arrayBufferToString(buffer) {
        const uint8Array = new Uint8Array(buffer);
        let str = '';
        for (let i = 0, len = uint8Array.length; i < len; ++i) {
            str += '%' + this.pad(uint8Array[i].toString(16));
        }
        str = decodeURIComponent(str);
        return str;
    }
    /**
     * エンコード、パディング
     */
    static pad(n) {
        return n.length < 2 ? '0' + n : n;
    }
    /**
     * JSONのパースを実行する
     * @param buffer    パース対象のデータバイト
     * @param size      データバイトのサイズ
     * return true : 成功
     * return false: 失敗
     */
    parseBytes(buffer, size, parseCallback) {
        const endPos = new Array(1); // 参照渡しにするため配列
        const decodeBuffer = CubismJson.arrayBufferToString(buffer);
        if (parseCallback == undefined) {
            this._root = this.parseValue(decodeBuffer, size, 0, endPos);
        }
        else {
            // TypeScript標準のJSONパーサを使う
            this._root = parseCallback(JSON.parse(decodeBuffer), new JsonMap());
        }
        if (this._error) {
            let strbuf = '\0';
            strbuf = 'Json parse error : @line ' + (this._lineCount + 1) + '\n';
            this._root = new JsonString(strbuf);
            CubismLogInfo('{0}', this._root.getRawString());
            return false;
        }
        else if (this._root == null) {
            this._root = new JsonError(this._error, false); // rootは解放されるのでエラーオブジェクトを別途作成する
            return false;
        }
        return true;
    }
    /**
     * パース時のエラー値を返す
     */
    getParseError() {
        return this._error;
    }
    /**
     * ルート要素の次の要素がファイルの終端だったらtrueを返す
     */
    checkEndOfFile() {
        return this._root.getArray()[1].equals('EOF');
    }
    /**
     * JSONエレメントからValue(float,String,Value*,Array,null,true,false)をパースする
     * エレメントの書式に応じて内部でParseString(), ParseObject(), ParseArray()を呼ぶ
     *
     * @param   buffer      JSONエレメントのバッファ
     * @param   length      パースする長さ
     * @param   begin       パースを開始する位置
     * @param   outEndPos   パース終了時の位置
     * @return      パースから取得したValueオブジェクト
     */
    parseValue(buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        let o = null;
        let i = begin;
        let f;
        for (; i < length; i++) {
            const c = buffer[i];
            switch (c) {
                case '-':
                case '.':
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': {
                    const afterString = new Array(1); // 参照渡しにするため
                    f = strtod(buffer.slice(i), afterString);
                    outEndPos[0] = buffer.indexOf(afterString[0]);
                    return new JsonFloat(f);
                }
                case '"':
                    return new JsonString(this.parseString(buffer, length, i + 1, outEndPos)); // \"の次の文字から
                case '[':
                    o = this.parseArray(buffer, length, i + 1, outEndPos);
                    return o;
                case '{':
                    o = this.parseObject(buffer, length, i + 1, outEndPos);
                    return o;
                case 'n': // null以外にない
                    if (i + 3 < length) {
                        o = new JsonNullvalue(); // 解放できるようにする
                        outEndPos[0] = i + 4;
                    }
                    else {
                        this._error = 'parse null';
                    }
                    return o;
                case 't': // true以外にない
                    if (i + 3 < length) {
                        o = JsonBoolean.trueValue;
                        outEndPos[0] = i + 4;
                    }
                    else {
                        this._error = 'parse true';
                    }
                    return o;
                case 'f': // false以外にない
                    if (i + 4 < length) {
                        o = JsonBoolean.falseValue;
                        outEndPos[0] = i + 5;
                    }
                    else {
                        this._error = "illegal ',' position";
                    }
                    return o;
                case ',': // Array separator
                    this._error = "illegal ',' position";
                    return null;
                case ']': // 不正な｝だがスキップする。配列の最後に不要な , があると思われる
                    outEndPos[0] = i; // 同じ文字を再処理
                    return null;
                case '\n':
                    this._lineCount++;
            }
        }
        this._error = 'illegal end of value';
        return null;
    }
    /**
     * 次の「"」までの文字列をパースする。
     *
     * @param   string  ->  パース対象の文字列
     * @param   length  ->  パースする長さ
     * @param   begin   ->  パースを開始する位置
     * @param  outEndPos   ->  パース終了時の位置
     * @return      パースした文F字列要素
     */
    parseString(string, length, begin, outEndPos) {
        if (this._error) {
            return null;
        }
        if (!string) {
            this._error = 'string is null';
            return null;
        }
        let i = begin;
        let c, c2;
        let ret = '';
        let bufStart = begin; // sbufに登録されていない文字の開始位置
        for (; i < length; i++) {
            c = string[i];
            switch (c) {
                case '"': {
                    // 終端の”、エスケープ文字は別に処理されるのでここに来ない
                    outEndPos[0] = i + 1; // ”の次の文字
                    ret += string.substr(bufStart, i - bufStart); // 前の文字までを登録する
                    return ret;
                }
                // falls through
                case '//': {
                    // エスケープの場合
                    i++; // ２文字をセットで扱う
                    if (i - 1 > bufStart) {
                        ret += string.substr(bufStart, i - bufStart); // 前の文字までを登録する
                    }
                    bufStart = i + 1; // エスケープ（２文字)の次の文字から
                    if (i < length) {
                        c2 = string[i];
                        switch (c2) {
                            case '\\':
                                ret += '\\';
                                break;
                            case '"':
                                ret += '"';
                                break;
                            case '/':
                                ret += '/';
                                break;
                            case 'b':
                                ret += '\b';
                                break;
                            case 'f':
                                ret += '\f';
                                break;
                            case 'n':
                                ret += '\n';
                                break;
                            case 'r':
                                ret += '\r';
                                break;
                            case 't':
                                ret += '\t';
                                break;
                            case 'u':
                                this._error = 'parse string/unicord escape not supported';
                                break;
                        }
                    }
                    else {
                        this._error = 'parse string/escape error';
                    }
                }
            }
        }
        this._error = 'parse string/illegal end';
        return null;
    }
    /**
     * JSONのオブジェクトエレメントをパースしてValueオブジェクトを返す
     *
     * @param buffer    JSONエレメントのバッファ
     * @param length    パースする長さ
     * @param begin     パースを開始する位置
     * @param outEndPos パース終了時の位置
     * @return パースから取得したValueオブジェクト
     */
    parseObject(buffer, length, begin, outEndPos) {
        if (this._error) {
            return null;
        }
        if (!buffer) {
            this._error = 'buffer is null';
            return null;
        }
        const ret = new JsonMap();
        // Key: Value
        let key = '';
        let i = begin;
        let c = '';
        const localRetEndPos2 = Array(1);
        let ok = false;
        // , が続く限りループ
        for (; i < length; i++) {
            FOR_LOOP: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case '"':
                        key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                        if (this._error) {
                            return null;
                        }
                        i = localRetEndPos2[0];
                        ok = true;
                        break FOR_LOOP; //-- loopから出る
                    case '}': // 閉じカッコ
                        outEndPos[0] = i + 1;
                        return ret; // 空
                    case ':':
                        this._error = "illegal ':' position";
                        break;
                    case '\n':
                        this._lineCount++;
                }
            }
            if (!ok) {
                this._error = 'key not found';
                return null;
            }
            ok = false;
            // : をチェック
            FOR_LOOP2: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ':':
                        ok = true;
                        i++;
                        break FOR_LOOP2;
                    case '}':
                        this._error = "illegal '}' position";
                        break;
                    // falls through
                    case '\n':
                        this._lineCount++;
                }
            }
            if (!ok) {
                this._error = "':' not found";
                return null;
            }
            // 値をチェック
            const value = this.parseValue(buffer, length, i, localRetEndPos2);
            if (this._error) {
                return null;
            }
            i = localRetEndPos2[0];
            // ret.put(key, value);
            ret.put(key, value);
            FOR_LOOP3: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ',':
                        break FOR_LOOP3;
                    case '}':
                        outEndPos[0] = i + 1;
                        return ret; // 正常終了
                    case '\n':
                        this._lineCount++;
                }
            }
        }
        this._error = 'illegal end of perseObject';
        return null;
    }
    /**
     * 次の「"」までの文字列をパースする。
     * @param buffer    JSONエレメントのバッファ
     * @param length    パースする長さ
     * @param begin     パースを開始する位置
     * @param outEndPos パース終了時の位置
     * @return パースから取得したValueオブジェクト
     */
    parseArray(buffer, length, begin, outEndPos) {
        if (this._error) {
            return null;
        }
        if (!buffer) {
            this._error = 'buffer is null';
            return null;
        }
        let ret = new JsonArray();
        // key : value
        let i = begin;
        let c;
        const localRetEndpos2 = new Array(1);
        // , が続く限りループ
        for (; i < length; i++) {
            // : をチェック
            const value = this.parseValue(buffer, length, i, localRetEndpos2);
            if (this._error) {
                return null;
            }
            i = localRetEndpos2[0];
            if (value) {
                ret.add(value);
            }
            // FOR_LOOP3:
            // boolean breakflag = false;
            FOR_LOOP: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ',':
                        // breakflag = true;
                        // break; // 次のKEY, VAlUEへ
                        break FOR_LOOP;
                    case ']':
                        outEndPos[0] = i + 1;
                        return ret; // 終了
                    case '\n':
                        ++this._lineCount;
                }
            }
        }
        ret = void 0;
        this._error = 'illegal end of parseObject';
        return null;
    }
}
/**
 * パースしたJSONの要素をfloat値として扱う
 */
class JsonFloat extends Value {
    /**
     * コンストラクタ
     */
    constructor(v) {
        super();
        this._value = v;
    }
    /**
     * Valueの種類が数値型ならtrue
     */
    isFloat() {
        return true;
    }
    /**
     * 要素を文字列で返す(string型)
     */
    getString(defaultValue, indent) {
        const strbuf = '\0';
        this._value = parseFloat(strbuf);
        this._stringBuffer = strbuf;
        return this._stringBuffer;
    }
    /**
     * 要素を数値型で返す(number)
     */
    toInt(defaultValue = 0) {
        return parseInt(this._value.toString());
    }
    /**
     * 要素を数値型で返す(number)
     */
    toFloat(defaultValue = 0.0) {
        return this._value;
    }
    equals(value) {
        if ('number' === typeof value) {
            // int
            if (Math.round(value)) {
                return false;
            }
            // float
            else {
                return value == this._value;
            }
        }
        return false;
    }
}
/**
 * パースしたJSONの要素を真偽値として扱う
 */
class JsonBoolean extends Value {
    /**
     * Valueの種類が真偽値ならtrue
     */
    isBool() {
        return true;
    }
    /**
     * 要素を真偽値で返す(boolean)
     */
    toBoolean(defaultValue = false) {
        return this._boolValue;
    }
    /**
     * 要素を文字列で返す(string型)
     */
    getString(defaultValue, indent) {
        this._stringBuffer = this._boolValue ? 'true' : 'false';
        return this._stringBuffer;
    }
    equals(value) {
        if ('boolean' === typeof value) {
            return value == this._boolValue;
        }
        return false;
    }
    /**
     * Valueの値が静的ならtrue, 静的なら解放しない
     */
    isStatic() {
        return true;
    }
    /**
     * 引数付きコンストラクタ
     */
    constructor(v) {
        super();
        this._boolValue = v;
    }
}
/**
 * パースしたJSONの要素を文字列として扱う
 */
class JsonString extends Value {
    /**
     * 引数付きコンストラクタ
     */
    constructor(s) {
        super();
        this._stringBuffer = s;
    }
    /**
     * Valueの種類が文字列ならtrue
     */
    isString() {
        return true;
    }
    /**
     * 要素を文字列で返す(string型)
     */
    getString(defaultValue, indent) {
        return this._stringBuffer;
    }
    equals(value) {
        if ('string' === typeof value) {
            return this._stringBuffer == value;
        }
        return false;
    }
}
/**
 * JSONパース時のエラー結果。文字列型のようにふるまう
 */
class JsonError extends JsonString {
    /**
     * Valueの値が静的ならtrue、静的なら解放しない
     */
    isStatic() {
        return this._isStatic;
    }
    /**
     * エラー情報をセットする
     */
    setErrorNotForClientCall(s) {
        this._stringBuffer = s;
        return this;
    }
    /**
     * 引数付きコンストラクタ
     */
    constructor(s, isStatic) {
        if ('string' === typeof s) {
            super(s);
        }
        else {
            super(s);
        }
        this._isStatic = isStatic;
    }
    /**
     * Valueの種類がエラー値ならtrue
     */
    isError() {
        return true;
    }
}
/**
 * パースしたJSONの要素をNULL値として持つ
 */
class JsonNullvalue extends Value {
    /**
     * Valueの種類がNULL値ならtrue
     */
    isNull() {
        return true;
    }
    /**
     * 要素を文字列で返す(string型)
     */
    getString(defaultValue, indent) {
        return this._stringBuffer;
    }
    /**
     * Valueの値が静的ならtrue, 静的なら解放しない
     */
    isStatic() {
        return true;
    }
    /**
     * Valueにエラー値をセットする
     */
    setErrorNotForClientCall(s) {
        this._stringBuffer = s;
        return JsonError.nullValue;
    }
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this._stringBuffer = 'NullValue';
    }
}
/**
 * パースしたJSONの要素を配列として持つ
 */
class JsonArray extends Value {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this._array = new Array();
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        for (let i = 0; i < this._array.length; i++) {
            let v = this._array[i];
            if (v && !v.isStatic()) {
                v = void 0;
                v = null;
            }
        }
    }
    /**
     * Valueの種類が配列ならtrue
     */
    isArray() {
        return true;
    }
    /**
     * 添字演算子[index]
     */
    getValueByIndex(index) {
        if (index < 0 || this._array.length <= index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
        }
        const v = this._array[index];
        if (v == null) {
            return Value.nullValue;
        }
        return v;
    }
    /**
     * 添字演算子[string]
     */
    getValueByString(s) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    }
    /**
     * 要素を文字列で返す(string型)
     */
    getString(defaultValue, indent) {
        const stringBuffer = indent + '[\n';
        for (let i = 0; i < this._array.length; i++) {
            const v = this._array[i];
            this._stringBuffer += indent + '' + v.getString(indent + ' ') + '\n';
        }
        this._stringBuffer = stringBuffer + indent + ']\n';
        return this._stringBuffer;
    }
    /**
     * 配列要素を追加する
     * @param v 追加する要素
     */
    add(v) {
        this._array.push(v);
    }
    /**
     * 要素をコンテナで返す(Array<Value>)
     */
    getVector(defaultValue = null) {
        return this._array;
    }
    /**
     * 要素の数を返す
     */
    getSize() {
        return this._array.length;
    }
}
/**
 * パースしたJSONの要素をマップとして持つ
 */
class JsonMap extends Value {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this._map = new Map();
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        this._map.clear();
    }
    /**
     * Valueの値がMap型ならtrue
     */
    isMap() {
        return true;
    }
    /**
     * 添字演算子[string]
     */
    getValueByString(s) {
        const ret = this._map.get(s);
        if (ret != undefined) {
            return ret;
        }
        return Value.nullValue;
    }
    /**
     * 添字演算子[index]
     */
    getValueByIndex(index) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    }
    /**
     * 要素を文字列で返す(string型)
     */
    getString(defaultValue, indent) {
        this._stringBuffer = indent + '{\n';
        for (const element of this._map) {
            const key = element[0];
            const v = element[1];
            this._stringBuffer +=
                indent + ' ' + key + ' : ' + v.getString(indent + '   ') + ' \n';
        }
        this._stringBuffer += indent + '}\n';
        return this._stringBuffer;
    }
    /**
     * 要素をMap型で返す
     */
    getMap(defaultValue) {
        return this._map;
    }
    /**
     * Mapに要素を追加する
     */
    put(key, v) {
        this._map.set(key, v);
    }
    /**
     * Mapからキーのリストを取得する
     */
    getKeys() {
        if (!this._keys) {
            this._keys = [...this._map.keys()];
        }
        return this._keys;
    }
    /**
     * Mapの要素数を取得する
     */
    getSize() {
        return this._keys.length;
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$7;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismJson = CubismJson;
    Live2DCubismFramework.JsonArray = JsonArray;
    Live2DCubismFramework.JsonBoolean = JsonBoolean;
    Live2DCubismFramework.JsonError = JsonError;
    Live2DCubismFramework.JsonFloat = JsonFloat;
    Live2DCubismFramework.JsonMap = JsonMap;
    Live2DCubismFramework.JsonNullvalue = JsonNullvalue;
    Live2DCubismFramework.JsonString = JsonString;
    Live2DCubismFramework.Value = Value;
})(Live2DCubismFramework$7 || (Live2DCubismFramework$7 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
function strtod(s, endPtr) {
    let index = 0;
    for (let i = 1;; i++) {
        const testC = s.slice(i - 1, i);
        // 指数・マイナスの可能性があるのでスキップする
        if (testC == 'e' || testC == '-' || testC == 'E') {
            continue;
        } // 文字列の範囲を広げていく
        const test = s.substring(0, i);
        const number = Number(test);
        if (isNaN(number)) {
            // 数値として認識できなくなったので終了
            break;
        } // 最後に数値としてできたindexを格納しておく
        index = i;
    }
    let d = parseFloat(s); // パースした数値
    if (isNaN(d)) {
        // 数値として認識できなくなったので終了
        d = NaN;
    }
    endPtr[0] = s.slice(index); // 後続の文字列
    return d;
}
// ファイルスコープの変数を初期化
let s_isStarted = false;
let s_isInitialized = false;
let s_option = null;
let s_cubismIdManager = null;
/**
 * Framework内で使う定数の宣言
 */
const Constant = Object.freeze({
    vertexOffset: 0, // メッシュ頂点のオフセット値
    vertexStep: 2 // メッシュ頂点のステップ値
});
function csmDelete(address) {
    if (!address) {
        return;
    }
    address = void 0;
}
/**
 * Live2D Cubism SDK Original Workflow SDKのエントリポイント
 * 利用開始時はCubismFramework.initialize()を呼び、CubismFramework.dispose()で終了する。
 */
class CubismFramework {
    /**
     * Cubism FrameworkのAPIを使用可能にする。
     *  APIを実行する前に必ずこの関数を実行すること。
     *  一度準備が完了して以降は、再び実行しても内部処理がスキップされます。
     *
     * @param    option      Optionクラスのインスタンス
     *
     * @return   準備処理が完了したらtrueが返ります。
     */
    static startUp(option = null) {
        if (s_isStarted) {
            CubismLogInfo('CubismFramework.startUp() is already done.');
            return s_isStarted;
        }
        s_option = option;
        if (s_option != null) {
            Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
        }
        s_isStarted = true;
        // Live2D Cubism Coreバージョン情報を表示
        if (s_isStarted) {
            const version = Live2DCubismCore.Version.csmGetVersion();
            const major = (version & 0xff000000) >> 24;
            const minor = (version & 0x00ff0000) >> 16;
            const patch = version & 0x0000ffff;
            const versionNumber = version;
            CubismLogInfo(`Live2D Cubism Core version: {0}.{1}.{2} ({3})`, ('00' + major).slice(-2), ('00' + minor).slice(-2), ('0000' + patch).slice(-4), versionNumber);
        }
        CubismLogInfo('CubismFramework.startUp() is complete.');
        return s_isStarted;
    }
    /**
     * StartUp()で初期化したCubismFrameworkの各パラメータをクリアします。
     * Dispose()したCubismFrameworkを再利用する際に利用してください。
     */
    static cleanUp() {
        s_isStarted = false;
        s_isInitialized = false;
        s_option = null;
        s_cubismIdManager = null;
    }
    /**
     * Cubism Framework内のリソースを初期化してモデルを表示可能な状態にします。<br>
     *     再度Initialize()するには先にDispose()を実行する必要があります。
     *
     * @param memorySize 初期化時メモリ量 [byte(s)]
     *    複数モデル表示時などにモデルが更新されない際に使用してください。
     *    指定する際は必ず1024*1024*16 byte(16MB)以上の値を指定してください。
     *    それ以外はすべて1024*1024*16 byteに丸めます。
     */
    static initialize(memorySize = 0) {
        CSM_ASSERT(s_isStarted);
        if (!s_isStarted) {
            CubismLogWarning('CubismFramework is not started.');
            return;
        }
        // --- s_isInitializedによる連続初期化ガード ---
        // 連続してリソース確保が行われないようにする。
        // 再度Initialize()するには先にDispose()を実行する必要がある。
        if (s_isInitialized) {
            CubismLogWarning('CubismFramework.initialize() skipped, already initialized.');
            return;
        }
        //---- static 初期化 ----
        Value.staticInitializeNotForClientCall();
        s_cubismIdManager = new CubismIdManager();
        // --- HACK: 初期化時メモリ量の拡張(単位byte) ---
        // 複数モデル表示時などにモデルが更新されない際に使用してください。
        // 指定する際は必ず1024*1024*16 byte(16MB)以上の値を指定してください。
        // それ以外はすべて1024*1024*16 byteに丸めます。
        Live2DCubismCore.Memory.initializeAmountOfMemory(memorySize);
        s_isInitialized = true;
        CubismLogInfo('CubismFramework.initialize() is complete.');
    }
    /**
     * Cubism Framework内の全てのリソースを解放します。
     *      ただし、外部で確保されたリソースについては解放しません。
     *      外部で適切に破棄する必要があります。
     */
    static dispose() {
        CSM_ASSERT(s_isStarted);
        if (!s_isStarted) {
            CubismLogWarning('CubismFramework is not started.');
            return;
        }
        // --- s_isInitializedによる未初期化解放ガード ---
        // dispose()するには先にinitialize()を実行する必要がある。
        if (!s_isInitialized) {
            // false...リソース未確保の場合
            CubismLogWarning('CubismFramework.dispose() skipped, not initialized.');
            return;
        }
        Value.staticReleaseNotForClientCall();
        s_cubismIdManager.release();
        s_cubismIdManager = null;
        // レンダラの静的リソース（シェーダプログラム他）を解放する
        CubismRenderer.staticRelease();
        s_isInitialized = false;
        CubismLogInfo('CubismFramework.dispose() is complete.');
    }
    /**
     * Cubism FrameworkのAPIを使用する準備が完了したかどうか
     * @return APIを使用する準備が完了していればtrueが返ります。
     */
    static isStarted() {
        return s_isStarted;
    }
    /**
     * Cubism Frameworkのリソース初期化がすでに行われているかどうか
     * @return リソース確保が完了していればtrueが返ります
     */
    static isInitialized() {
        return s_isInitialized;
    }
    /**
     * Core APIにバインドしたログ関数を実行する
     *
     * @praram message ログメッセージ
     */
    static coreLogFunction(message) {
        // Return if logging not possible.
        if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
            return;
        }
        Live2DCubismCore.Logging.csmGetLogFunction()(message);
    }
    /**
     * 現在のログ出力レベル設定の値を返す。
     *
     * @return  現在のログ出力レベル設定の値
     */
    static getLoggingLevel() {
        if (s_option != null) {
            return s_option.loggingLevel;
        }
        return LogLevel.LogLevel_Off;
    }
    /**
     * IDマネージャのインスタンスを取得する
     * @return CubismManagerクラスのインスタンス
     */
    static getIdManager() {
        return s_cubismIdManager;
    }
    /**
     * 静的クラスとして使用する
     * インスタンス化させない
     */
    constructor() { }
}
/**
 * ログ出力のレベル
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["LogLevel_Verbose"] = 0] = "LogLevel_Verbose";
    LogLevel[LogLevel["LogLevel_Debug"] = 1] = "LogLevel_Debug";
    LogLevel[LogLevel["LogLevel_Info"] = 2] = "LogLevel_Info";
    LogLevel[LogLevel["LogLevel_Warning"] = 3] = "LogLevel_Warning";
    LogLevel[LogLevel["LogLevel_Error"] = 4] = "LogLevel_Error";
    LogLevel[LogLevel["LogLevel_Off"] = 5] = "LogLevel_Off"; // ログ出力無効
})(LogLevel || (LogLevel = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$6;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.Constant = Constant;
    Live2DCubismFramework.csmDelete = csmDelete;
    Live2DCubismFramework.CubismFramework = CubismFramework;
})(Live2DCubismFramework$6 || (Live2DCubismFramework$6 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * SDK側から与えられた描画オブジェクトの乗算色・スクリーン色上書きフラグと
 * その色を保持する構造体
 */
class ColorData {
    constructor(isOverridden = false, color = new CubismTextureColor()) {
        this.isOverridden = isOverridden;
        this.color = color;
    }
}
/**
 * Handling multiply and screen colors of the model.
 */
class CubismModelMultiplyAndScreenColor {
    /**
     * Constructor.
     *
     * @param model cubism model.
     */
    constructor(model) {
        this._model = model;
        this._isOverriddenModelMultiplyColors = false;
        this._isOverriddenModelScreenColors = false;
        this._userPartScreenColors = [];
        this._userPartMultiplyColors = [];
        this._userDrawableScreenColors = [];
        this._userDrawableMultiplyColors = [];
        this._userOffscreenScreenColors = [];
        this._userOffscreenMultiplyColors = [];
    }
    /**
     * Initialization for using multiply and screen colors.
     *
     * @param partCount number of parts.
     * @param drawableCount number of drawables.
     * @param offscreenCount number of offscreen.
     */
    initialize(partCount, drawableCount, offscreenCount) {
        // 乗算色の初期値
        const userMultiplyColor = new ColorData(false, new CubismTextureColor(1.0, 1.0, 1.0, 1.0));
        // スクリーン色の初期値
        const userScreenColor = new ColorData(false, new CubismTextureColor(0.0, 0.0, 0.0, 1.0));
        // Part
        this._userPartMultiplyColors = new Array(partCount);
        this._userPartScreenColors = new Array(partCount);
        for (let i = 0; i < partCount; i++) {
            this._userPartMultiplyColors[i] = new ColorData(userMultiplyColor.isOverridden, new CubismTextureColor(userMultiplyColor.color.r, userMultiplyColor.color.g, userMultiplyColor.color.b, userMultiplyColor.color.a));
            this._userPartScreenColors[i] = new ColorData(userScreenColor.isOverridden, new CubismTextureColor(userScreenColor.color.r, userScreenColor.color.g, userScreenColor.color.b, userScreenColor.color.a));
        }
        // Drawable
        this._userDrawableMultiplyColors = new Array(drawableCount);
        this._userDrawableScreenColors = new Array(drawableCount);
        for (let i = 0; i < drawableCount; i++) {
            this._userDrawableMultiplyColors[i] = new ColorData(userMultiplyColor.isOverridden, new CubismTextureColor(userMultiplyColor.color.r, userMultiplyColor.color.g, userMultiplyColor.color.b, userMultiplyColor.color.a));
            this._userDrawableScreenColors[i] = new ColorData(userScreenColor.isOverridden, new CubismTextureColor(userScreenColor.color.r, userScreenColor.color.g, userScreenColor.color.b, userScreenColor.color.a));
        }
        // Offscreen
        this._userOffscreenMultiplyColors = new Array(offscreenCount);
        this._userOffscreenScreenColors = new Array(offscreenCount);
        for (let i = 0; i < offscreenCount; i++) {
            this._userOffscreenMultiplyColors[i] = new ColorData(userMultiplyColor.isOverridden, new CubismTextureColor(userMultiplyColor.color.r, userMultiplyColor.color.g, userMultiplyColor.color.b, userMultiplyColor.color.a));
            this._userOffscreenScreenColors[i] = new ColorData(userScreenColor.isOverridden, new CubismTextureColor(userScreenColor.color.r, userScreenColor.color.g, userScreenColor.color.b, userScreenColor.color.a));
        }
    }
    /**
     * Outputs a warning message for index out of range errors.
     *
     * @param functionName Name of the calling function
     * @param index The invalid index value
     * @param maxIndex The maximum valid index (length - 1)
     */
    warnIndexOutOfRange(functionName, index, maxIndex) {
        CubismLogWarning(`${functionName}: index is out of range. index=${index}, valid range=[0, ${maxIndex}].`);
    }
    /**
     * Validates if the given part index is within valid range.
     *
     * @param index Part index to validate
     * @param functionName Name of the calling function for error reporting
     * @return true if the index is valid; otherwise false
     */
    isValidPartIndex(index, functionName) {
        if (index < 0 || index >= this._model.getPartCount()) {
            this.warnIndexOutOfRange(functionName, index, this._model.getPartCount() - 1);
            return false;
        }
        return true;
    }
    /**
     * Validates if the given drawable index is within valid range.
     *
     * @param index Drawable index to validate
     * @param functionName Name of the calling function for error reporting
     * @return true if the index is valid; otherwise false
     */
    isValidDrawableIndex(index, functionName) {
        if (index < 0 || index >= this._model.getDrawableCount()) {
            this.warnIndexOutOfRange(functionName, index, this._model.getDrawableCount() - 1);
            return false;
        }
        return true;
    }
    /**
     * Validates if the given offscreen index is within valid range.
     *
     * @param index Offscreen index to validate
     * @param functionName Name of the calling function for error reporting
     * @return true if the index is valid; otherwise false
     */
    isValidOffscreenIndex(index, functionName) {
        if (index < 0 || index >= this._model.getOffscreenCount()) {
            this.warnIndexOutOfRange(functionName, index, this._model.getOffscreenCount() - 1);
            return false;
        }
        return true;
    }
    /**
     * Sets the flag indicating whether the color set at runtime is used as the multiply color for the entire model during rendering.
     *
     * @param value true if the color set at runtime is to be used; otherwise false.
     */
    setMultiplyColorEnabled(value) {
        this._isOverriddenModelMultiplyColors = value;
    }
    /**
     * Returns the flag indicating whether the color set at runtime is used as the multiply color for the entire model during rendering.
     *
     * @return true if the color set at runtime is used; otherwise false.
     */
    getMultiplyColorEnabled() {
        return this._isOverriddenModelMultiplyColors;
    }
    /**
     * Sets the flag indicating whether the color set at runtime is used as the screen color for the entire model during rendering.
     *
     * @param value true if the color set at runtime is to be used; otherwise false.
     */
    setScreenColorEnabled(value) {
        this._isOverriddenModelScreenColors = value;
    }
    /**
     * Returns the flag indicating whether the color set at runtime is used as the screen color for the entire model during rendering.
     *
     * @return true if the color set at runtime is used; otherwise false.
     */
    getScreenColorEnabled() {
        return this._isOverriddenModelScreenColors;
    }
    /**
     * Sets whether the part multiply color is overridden by the SDK.
     * Use true to use the color information from the SDK, or false to use the color information from the model.
     *
     * @param partIndex Part index
     * @param value true enable override, false to disable
     */
    setPartMultiplyColorEnabled(partIndex, value) {
        if (!this.isValidPartIndex(partIndex, 'setPartMultiplyColorEnabled')) {
            return;
        }
        this.setPartColorEnabled(partIndex, value, this._userPartMultiplyColors, this._userDrawableMultiplyColors, this._userOffscreenMultiplyColors);
    }
    /**
     * Checks whether the part multiply color is overridden by the SDK.
     *
     * @param partIndex Part index
     *
     * @return true if the color information from the SDK is used; otherwise false.
     */
    getPartMultiplyColorEnabled(partIndex) {
        if (!this.isValidPartIndex(partIndex, 'getPartMultiplyColorEnabled')) {
            return false;
        }
        return this._userPartMultiplyColors[partIndex].isOverridden;
    }
    /**
     * Sets whether the part screen color is overridden by the SDK.
     * Use true to use the color information from the SDK, or false to use the color information from the model.
     *
     * @param partIndex Part index
     * @param value true enable override, false to disable
     */
    setPartScreenColorEnabled(partIndex, value) {
        if (!this.isValidPartIndex(partIndex, 'setPartScreenColorEnabled')) {
            return;
        }
        this.setPartColorEnabled(partIndex, value, this._userPartScreenColors, this._userDrawableScreenColors, this._userOffscreenScreenColors);
    }
    /**
     * Checks whether the part screen color is overridden by the SDK.
     *
     * @param partIndex Part index
     *
     * @return true if the color information from the SDK is used; otherwise false.
     */
    getPartScreenColorEnabled(partIndex) {
        if (!this.isValidPartIndex(partIndex, 'getPartScreenColorEnabled')) {
            return false;
        }
        return this._userPartScreenColors[partIndex].isOverridden;
    }
    /**
     * Sets the multiply color of the part.
     *
     * @param partIndex Part index
     * @param color Multiply color to be set (CubismTextureColor)
     */
    setPartMultiplyColorByTextureColor(partIndex, color) {
        if (!this.isValidPartIndex(partIndex, 'setPartMultiplyColorByTextureColor')) {
            return;
        }
        this.setPartMultiplyColorByRGBA(partIndex, color.r, color.g, color.b, color.a);
    }
    /**
     * Sets the multiply color of the part.
     *
     * @param partIndex Part index
     * @param r Red value of the multiply color to be set
     * @param g Green value of the multiply color to be set
     * @param b Blue value of the multiply color to be set
     * @param a Alpha value of the multiply color to be set
     */
    setPartMultiplyColorByRGBA(partIndex, r, g, b, a = 1.0) {
        if (!this.isValidPartIndex(partIndex, 'setPartMultiplyColorByRGBA')) {
            return;
        }
        this.setPartColor(partIndex, r, g, b, a, this._userPartMultiplyColors, this._userDrawableMultiplyColors, this._userOffscreenMultiplyColors);
    }
    /**
     * Returns the multiply color of the part.
     *
     * @param partIndex Part index
     *
     * @return Multiply color (CubismTextureColor)
     */
    getPartMultiplyColor(partIndex) {
        if (!this.isValidPartIndex(partIndex, 'getPartMultiplyColor')) {
            return new CubismTextureColor(1.0, 1.0, 1.0, 1.0);
        }
        return this._userPartMultiplyColors[partIndex].color;
    }
    /**
     * Sets the screen color of the part.
     *
     * @param partIndex Part index
     * @param color Screen color to be set (CubismTextureColor)
     */
    setPartScreenColorByTextureColor(partIndex, color) {
        if (!this.isValidPartIndex(partIndex, 'setPartScreenColorByTextureColor')) {
            return;
        }
        this.setPartScreenColorByRGBA(partIndex, color.r, color.g, color.b, color.a);
    }
    /**
     * Sets the screen color of the part.
     *
     * @param partIndex Part index
     * @param r Red value of the screen color to be set
     * @param g Green value of the screen color to be set
     * @param b Blue value of the screen color to be set
     * @param a Alpha value of the screen color to be set
     */
    setPartScreenColorByRGBA(partIndex, r, g, b, a = 1.0) {
        if (!this.isValidPartIndex(partIndex, 'setPartScreenColorByRGBA')) {
            return;
        }
        this.setPartColor(partIndex, r, g, b, a, this._userPartScreenColors, this._userDrawableScreenColors, this._userOffscreenScreenColors);
    }
    /**
     * Returns the screen color of the part.
     *
     * @param partIndex Part index
     *
     * @return Screen color (CubismTextureColor)
     */
    getPartScreenColor(partIndex) {
        if (!this.isValidPartIndex(partIndex, 'getPartScreenColor')) {
            return new CubismTextureColor(0.0, 0.0, 0.0, 1.0);
        }
        return this._userPartScreenColors[partIndex].color;
    }
    /**
     * Sets the flag indicating whether the color set at runtime is used as the multiply color for the drawable during rendering.
     *
     * @param drawableIndex Drawable index
     * @param value true if the color set at runtime is to be used; otherwise false.
     */
    setDrawableMultiplyColorEnabled(drawableIndex, value) {
        if (!this.isValidDrawableIndex(drawableIndex, 'setDrawableMultiplyColorEnabled')) {
            return;
        }
        this._userDrawableMultiplyColors[drawableIndex].isOverridden = value;
    }
    /**
     * Returns the flag indicating whether the color set at runtime is used as the multiply color for the drawable during rendering.
     *
     * @param drawableIndex Drawable index
     *
     * @return true if the color set at runtime is used; otherwise false.
     */
    getDrawableMultiplyColorEnabled(drawableIndex) {
        if (!this.isValidDrawableIndex(drawableIndex, 'getDrawableMultiplyColorEnabled')) {
            return false;
        }
        return this._userDrawableMultiplyColors[drawableIndex].isOverridden;
    }
    /**
     * Sets the flag indicating whether the color set at runtime is used as the screen color for the drawable during rendering.
     *
     * @param drawableIndex Drawable index
     * @param value true if the color set at runtime is to be used; otherwise false.
     */
    setDrawableScreenColorEnabled(drawableIndex, value) {
        if (!this.isValidDrawableIndex(drawableIndex, 'setDrawableScreenColorEnabled')) {
            return;
        }
        this._userDrawableScreenColors[drawableIndex].isOverridden = value;
    }
    /**
     * Returns the flag indicating whether the color set at runtime is used as the screen color for the drawable during rendering.
     *
     * @param drawableIndex Drawable index
     *
     * @return true if the color set at runtime is used; otherwise false.
     */
    getDrawableScreenColorEnabled(drawableIndex) {
        if (!this.isValidDrawableIndex(drawableIndex, 'getDrawableScreenColorEnabled')) {
            return false;
        }
        return this._userDrawableScreenColors[drawableIndex].isOverridden;
    }
    /**
     * Sets the multiply color of the drawable.
     *
     * @param drawableIndex Drawable index
     * @param color Multiply color to be set (CubismTextureColor)
     */
    setDrawableMultiplyColorByTextureColor(drawableIndex, color) {
        if (!this.isValidDrawableIndex(drawableIndex, 'setDrawableMultiplyColorByTextureColor')) {
            return;
        }
        this.setDrawableMultiplyColorByRGBA(drawableIndex, color.r, color.g, color.b, color.a);
    }
    /**
     * Sets the multiply color of the drawable.
     *
     * @param drawableIndex Drawable index
     * @param r Red value of the multiply color to be set
     * @param g Green value of the multiply color to be set
     * @param b Blue value of the multiply color to be set
     * @param a Alpha value of the multiply color to be set
     */
    setDrawableMultiplyColorByRGBA(drawableIndex, r, g, b, a = 1.0) {
        if (!this.isValidDrawableIndex(drawableIndex, 'setDrawableMultiplyColorByRGBA')) {
            return;
        }
        this._userDrawableMultiplyColors[drawableIndex].color.r = r;
        this._userDrawableMultiplyColors[drawableIndex].color.g = g;
        this._userDrawableMultiplyColors[drawableIndex].color.b = b;
        this._userDrawableMultiplyColors[drawableIndex].color.a = a;
    }
    /**
     * Returns the multiply color from the list of drawables.
     *
     * @param drawableIndex Drawable index
     *
     * @return Multiply color (CubismTextureColor)
     */
    getDrawableMultiplyColor(drawableIndex) {
        if (!this.isValidDrawableIndex(drawableIndex, 'getDrawableMultiplyColor')) {
            return new CubismTextureColor(1.0, 1.0, 1.0, 1.0);
        }
        if (this.getMultiplyColorEnabled() ||
            this.getDrawableMultiplyColorEnabled(drawableIndex)) {
            return this._userDrawableMultiplyColors[drawableIndex].color;
        }
        return this._model.getDrawableMultiplyColor(drawableIndex);
    }
    /**
     * Sets the screen color of the drawable.
     *
     * @param drawableIndex Drawable index
     * @param color Screen color to be set (CubismTextureColor)
     */
    setDrawableScreenColorByTextureColor(drawableIndex, color) {
        if (!this.isValidDrawableIndex(drawableIndex, 'setDrawableScreenColorByTextureColor')) {
            return;
        }
        this.setDrawableScreenColorByRGBA(drawableIndex, color.r, color.g, color.b, color.a);
    }
    /**
     * Sets the screen color of the drawable.
     *
     * @param drawableIndex Drawable index
     * @param r Red value of the screen color to be set
     * @param g Green value of the screen color to be set
     * @param b Blue value of the screen color to be set
     * @param a Alpha value of the screen color to be set
     */
    setDrawableScreenColorByRGBA(drawableIndex, r, g, b, a = 1.0) {
        if (!this.isValidDrawableIndex(drawableIndex, 'setDrawableScreenColorByRGBA')) {
            return;
        }
        this._userDrawableScreenColors[drawableIndex].color.r = r;
        this._userDrawableScreenColors[drawableIndex].color.g = g;
        this._userDrawableScreenColors[drawableIndex].color.b = b;
        this._userDrawableScreenColors[drawableIndex].color.a = a;
    }
    /**
     * Returns the screen color from the list of drawables.
     *
     * @param drawableIndex Drawable index
     *
     * @return Screen color (CubismTextureColor)
     */
    getDrawableScreenColor(drawableIndex) {
        if (!this.isValidDrawableIndex(drawableIndex, 'getDrawableScreenColor')) {
            return new CubismTextureColor(0.0, 0.0, 0.0, 1.0);
        }
        if (this.getScreenColorEnabled() ||
            this.getDrawableScreenColorEnabled(drawableIndex)) {
            return this._userDrawableScreenColors[drawableIndex].color;
        }
        return this._model.getDrawableScreenColor(drawableIndex);
    }
    /**
     * Sets whether the offscreen multiply color is overridden by the SDK.
     * Use true to use the color information from the SDK, or false to use the color information from the model.
     *
     * @param offscreenIndex Offscreen index
     * @param value true enable override, false to disable
     */
    setOffscreenMultiplyColorEnabled(offscreenIndex, value) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'setOffscreenMultiplyColorEnabled')) {
            return;
        }
        this._userOffscreenMultiplyColors[offscreenIndex].isOverridden = value;
    }
    /**
     * Checks whether the offscreen multiply color is overridden by the SDK.
     *
     * @param offscreenIndex Offscreen index
     *
     * @return true if the color information from the SDK is used; otherwise false.
     */
    getOffscreenMultiplyColorEnabled(offscreenIndex) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'getOffscreenMultiplyColorEnabled')) {
            return false;
        }
        return this._userOffscreenMultiplyColors[offscreenIndex].isOverridden;
    }
    /**
     * Sets whether the offscreen screen color is overridden by the SDK.
     * Use true to use the color information from the SDK, or false to use the color information from the model.
     *
     * @param offscreenIndex Offscreen index
     * @param value true enable override, false to disable
     */
    setOffscreenScreenColorEnabled(offscreenIndex, value) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'setOffscreenScreenColorEnabled')) {
            return;
        }
        this._userOffscreenScreenColors[offscreenIndex].isOverridden = value;
    }
    /**
     * Checks whether the offscreen screen color is overridden by the SDK.
     *
     * @param offscreenIndex Offscreen index
     *
     * @return true if the color information from the SDK is used; otherwise false.
     */
    getOffscreenScreenColorEnabled(offscreenIndex) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'getOffscreenScreenColorEnabled')) {
            return false;
        }
        return this._userOffscreenScreenColors[offscreenIndex].isOverridden;
    }
    /**
     * Sets the multiply color of the offscreen.
     *
     * @param offscreenIndex Offsscreen index
     * @param color Multiply color to be set (CubismTextureColor)
     */
    setOffscreenMultiplyColorByTextureColor(offscreenIndex, color) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'setOffscreenMultiplyColorByTextureColor')) {
            return;
        }
        this.setOffscreenMultiplyColorByRGBA(offscreenIndex, color.r, color.g, color.b, color.a);
    }
    /**
     * Sets the multiply color of the offscreen.
     *
     * @param offscreenIndex Offsscreen index
     * @param r Red value of the multiply color to be set
     * @param g Green value of the multiply color to be set
     * @param b Blue value of the multiply color to be set
     * @param a Alpha value of the multiply color to be set
     */
    setOffscreenMultiplyColorByRGBA(offscreenIndex, r, g, b, a = 1.0) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'setOffscreenMultiplyColorByRGBA')) {
            return;
        }
        this._userOffscreenMultiplyColors[offscreenIndex].color.r = r;
        this._userOffscreenMultiplyColors[offscreenIndex].color.g = g;
        this._userOffscreenMultiplyColors[offscreenIndex].color.b = b;
        this._userOffscreenMultiplyColors[offscreenIndex].color.a = a;
    }
    /**
     * Returns the multiply color from the list of offscreen.
     *
     * @param offscreenIndex Offsscreen index
     *
     * @return Multiply color (CubismTextureColor)
     */
    getOffscreenMultiplyColor(offscreenIndex) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'getOffscreenMultiplyColor')) {
            return new CubismTextureColor(1.0, 1.0, 1.0, 1.0); // Default offscreen multiply color
        }
        if (this.getMultiplyColorEnabled() ||
            this.getOffscreenMultiplyColorEnabled(offscreenIndex)) {
            return this._userOffscreenMultiplyColors[offscreenIndex].color;
        }
        return this._model.getOffscreenMultiplyColor(offscreenIndex);
    }
    /**
     * Sets the screen color of the offscreen.
     *
     * @param offscreenIndex Offsscreen index
     * @param color Screen color to be set (CubismTextureColor)
     */
    setOffscreenScreenColorByTextureColor(offscreenIndex, color) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'setOffscreenScreenColorByTextureColor')) {
            return;
        }
        this.setOffscreenScreenColorByRGBA(offscreenIndex, color.r, color.g, color.b, color.a);
    }
    /**
     * Sets the screen color of the offscreen.
     *
     * @param offscreenIndex Offsscreen index
     * @param r Red value of the screen color to be set
     * @param g Green value of the screen color to be set
     * @param b Blue value of the screen color to be set
     * @param a Alpha value of the screen color to be set
     */
    setOffscreenScreenColorByRGBA(offscreenIndex, r, g, b, a = 1.0) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'setOffscreenScreenColorByRGBA')) {
            return;
        }
        this._userOffscreenScreenColors[offscreenIndex].color.r = r;
        this._userOffscreenScreenColors[offscreenIndex].color.g = g;
        this._userOffscreenScreenColors[offscreenIndex].color.b = b;
        this._userOffscreenScreenColors[offscreenIndex].color.a = a;
    }
    /**
     * Returns the screen color from the list of offscreen.
     *
     * @param offscreenIndex Offsscreen index
     *
     * @return Screen color (CubismTextureColor)
     */
    getOffscreenScreenColor(offscreenIndex) {
        if (!this.isValidOffscreenIndex(offscreenIndex, 'getOffscreenScreenColor')) {
            return new CubismTextureColor(0.0, 0.0, 0.0, 1.0); // Default offscreen screen color
        }
        if (this.getScreenColorEnabled() ||
            this.getOffscreenScreenColorEnabled(offscreenIndex)) {
            return this._userOffscreenScreenColors[offscreenIndex].color;
        }
        return this._model.getOffscreenScreenColor(offscreenIndex);
    }
    /**
     * Sets the part color with hierarchical propagation (internal method)
     */
    setPartColor(partIndex, r, g, b, a, partColors, drawableColors, offscreenColors) {
        partColors[partIndex].color.r = r;
        partColors[partIndex].color.g = g;
        partColors[partIndex].color.b = b;
        partColors[partIndex].color.a = a;
        if (partColors[partIndex].isOverridden) {
            const offscreenIndices = this._model.getPartOffscreenIndices();
            const offscreenIndex = offscreenIndices[partIndex];
            if (offscreenIndex == NoOffscreenIndex) {
                // If no offscreen buffer is attached, the effect is applied to the children.
                const partsHierarchy = this._model.getPartsHierarchy();
                if (partsHierarchy && partsHierarchy[partIndex]) {
                    for (let i = 0; i < partsHierarchy[partIndex].objects.length; ++i) {
                        const objectInfo = partsHierarchy[partIndex].objects[i];
                        if (objectInfo.objectType ===
                            CubismModelObjectType.CubismModelObjectType_Drawable) {
                            const drawableIndex = objectInfo.objectIndex;
                            drawableColors[drawableIndex].color.r = r;
                            drawableColors[drawableIndex].color.g = g;
                            drawableColors[drawableIndex].color.b = b;
                            drawableColors[drawableIndex].color.a = a;
                        }
                        else {
                            const childPartIndex = objectInfo.objectIndex;
                            this.setPartColor(childPartIndex, r, g, b, a, partColors, drawableColors, offscreenColors);
                        }
                    }
                }
            }
            else {
                // If an offscreen buffer is attached, only that offscreen buffer is affected.
                offscreenColors[offscreenIndex].color.r = r;
                offscreenColors[offscreenIndex].color.g = g;
                offscreenColors[offscreenIndex].color.b = b;
                offscreenColors[offscreenIndex].color.a = a;
            }
        }
    }
    /**
     * Sets the part color enabled flag with hierarchical propagation (internal method)
     */
    setPartColorEnabled(partIndex, value, partColors, drawableColors, offscreenColors) {
        partColors[partIndex].isOverridden = value;
        const offscreenIndices = this._model.getPartOffscreenIndices();
        const offscreenIndex = offscreenIndices[partIndex];
        if (offscreenIndex == NoOffscreenIndex) {
            // If no offscreen buffer is attached, the effect is applied to the children.
            const partsHierarchy = this._model.getPartsHierarchy();
            if (partsHierarchy && partsHierarchy[partIndex]) {
                for (let i = 0; i < partsHierarchy[partIndex].objects.length; ++i) {
                    const objectInfo = partsHierarchy[partIndex].objects[i];
                    if (objectInfo.objectType ===
                        CubismModelObjectType.CubismModelObjectType_Drawable) {
                        const drawableIndex = objectInfo.objectIndex;
                        drawableColors[drawableIndex].isOverridden = value;
                        if (value) {
                            drawableColors[drawableIndex].color.r =
                                partColors[partIndex].color.r;
                            drawableColors[drawableIndex].color.g =
                                partColors[partIndex].color.g;
                            drawableColors[drawableIndex].color.b =
                                partColors[partIndex].color.b;
                            drawableColors[drawableIndex].color.a =
                                partColors[partIndex].color.a;
                        }
                    }
                    else {
                        const childPartIndex = objectInfo.objectIndex;
                        if (value) {
                            partColors[childPartIndex].color.r =
                                partColors[partIndex].color.r;
                            partColors[childPartIndex].color.g =
                                partColors[partIndex].color.g;
                            partColors[childPartIndex].color.b =
                                partColors[partIndex].color.b;
                            partColors[childPartIndex].color.a =
                                partColors[partIndex].color.a;
                        }
                        this.setPartColorEnabled(childPartIndex, value, partColors, drawableColors, offscreenColors);
                    }
                }
            }
        }
        else {
            // If an offscreen buffer is attached, only that offscreen buffer is affected.
            offscreenColors[offscreenIndex].isOverridden = value;
            if (value) {
                offscreenColors[offscreenIndex].color.r = partColors[partIndex].color.r;
                offscreenColors[offscreenIndex].color.g = partColors[partIndex].color.g;
                offscreenColors[offscreenIndex].color.b = partColors[partIndex].color.b;
                offscreenColors[offscreenIndex].color.a = partColors[partIndex].color.a;
            }
        }
    }
}

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
const NoParentIndex = -1; // 親が取得できない場合の値を表す定数
const NoOffscreenIndex = -1; // オフスクリーンが取得できない場合の値を表す定数
/**
 * カラーブレンドのタイプ
 */
var CubismColorBlend;
(function (CubismColorBlend) {
    CubismColorBlend[CubismColorBlend["ColorBlend_None"] = -1] = "ColorBlend_None";
    CubismColorBlend[CubismColorBlend["ColorBlend_Normal"] = Live2DCubismCore.ColorBlendType_Normal] = "ColorBlend_Normal";
    CubismColorBlend[CubismColorBlend["ColorBlend_AddGlow"] = Live2DCubismCore.ColorBlendType_AddGlow] = "ColorBlend_AddGlow";
    CubismColorBlend[CubismColorBlend["ColorBlend_Add"] = Live2DCubismCore.ColorBlendType_Add] = "ColorBlend_Add";
    CubismColorBlend[CubismColorBlend["ColorBlend_Darken"] = Live2DCubismCore.ColorBlendType_Darken] = "ColorBlend_Darken";
    CubismColorBlend[CubismColorBlend["ColorBlend_Multiply"] = Live2DCubismCore.ColorBlendType_Multiply] = "ColorBlend_Multiply";
    CubismColorBlend[CubismColorBlend["ColorBlend_ColorBurn"] = Live2DCubismCore.ColorBlendType_ColorBurn] = "ColorBlend_ColorBurn";
    CubismColorBlend[CubismColorBlend["ColorBlend_LinearBurn"] = Live2DCubismCore.ColorBlendType_LinearBurn] = "ColorBlend_LinearBurn";
    CubismColorBlend[CubismColorBlend["ColorBlend_Lighten"] = Live2DCubismCore.ColorBlendType_Lighten] = "ColorBlend_Lighten";
    CubismColorBlend[CubismColorBlend["ColorBlend_Screen"] = Live2DCubismCore.ColorBlendType_Screen] = "ColorBlend_Screen";
    CubismColorBlend[CubismColorBlend["ColorBlend_ColorDodge"] = Live2DCubismCore.ColorBlendType_ColorDodge] = "ColorBlend_ColorDodge";
    CubismColorBlend[CubismColorBlend["ColorBlend_Overlay"] = Live2DCubismCore.ColorBlendType_Overlay] = "ColorBlend_Overlay";
    CubismColorBlend[CubismColorBlend["ColorBlend_SoftLight"] = Live2DCubismCore.ColorBlendType_SoftLight] = "ColorBlend_SoftLight";
    CubismColorBlend[CubismColorBlend["ColorBlend_HardLight"] = Live2DCubismCore.ColorBlendType_HardLight] = "ColorBlend_HardLight";
    CubismColorBlend[CubismColorBlend["ColorBlend_LinearLight"] = Live2DCubismCore.ColorBlendType_LinearLight] = "ColorBlend_LinearLight";
    CubismColorBlend[CubismColorBlend["ColorBlend_Hue"] = Live2DCubismCore.ColorBlendType_Hue] = "ColorBlend_Hue";
    CubismColorBlend[CubismColorBlend["ColorBlend_Color"] = Live2DCubismCore.ColorBlendType_Color] = "ColorBlend_Color";
    // Cubism 5.2以前
    CubismColorBlend[CubismColorBlend["ColorBlend_AddCompatible"] = Live2DCubismCore.ColorBlendType_AddCompatible] = "ColorBlend_AddCompatible";
    CubismColorBlend[CubismColorBlend["ColorBlend_MultiplyCompatible"] = Live2DCubismCore.ColorBlendType_MultiplyCompatible] = "ColorBlend_MultiplyCompatible";
})(CubismColorBlend || (CubismColorBlend = {}));
/**
 * アルファブレンドのタイプ
 */
var CubismAlphaBlend;
(function (CubismAlphaBlend) {
    CubismAlphaBlend[CubismAlphaBlend["AlphaBlend_None"] = -1] = "AlphaBlend_None";
    CubismAlphaBlend[CubismAlphaBlend["AlphaBlend_Over"] = 0] = "AlphaBlend_Over";
    CubismAlphaBlend[CubismAlphaBlend["AlphaBlend_Atop"] = 1] = "AlphaBlend_Atop";
    CubismAlphaBlend[CubismAlphaBlend["AlphaBlend_Out"] = 2] = "AlphaBlend_Out";
    CubismAlphaBlend[CubismAlphaBlend["AlphaBlend_ConjointOver"] = 3] = "AlphaBlend_ConjointOver";
    CubismAlphaBlend[CubismAlphaBlend["AlphaBlend_DisjointOver"] = 4] = "AlphaBlend_DisjointOver";
})(CubismAlphaBlend || (CubismAlphaBlend = {}));
/**
 * オブジェクトのタイプ
 */
var CubismModelObjectType;
(function (CubismModelObjectType) {
    CubismModelObjectType[CubismModelObjectType["CubismModelObjectType_Drawable"] = 0] = "CubismModelObjectType_Drawable";
    CubismModelObjectType[CubismModelObjectType["CubismModelObjectType_Parts"] = 1] = "CubismModelObjectType_Parts";
})(CubismModelObjectType || (CubismModelObjectType = {}));
/**
 * Structure for managing the override of parameter repetition settings
 */
class ParameterRepeatData {
    /**
     * Constructor
     *
     * @param isOverridden whether to be overriden
     * @param isParameterRepeated override flag for settings
     */
    constructor(isOverridden = false, isParameterRepeated = false) {
        this.isOverridden = isOverridden;
        this.isParameterRepeated = isParameterRepeated;
    }
}
/**
 * テクスチャのカリング設定を管理するための構造体
 */
class CullingData {
    /**
     * コンストラクタ
     *
     * @param isOverridden
     * @param isCulling
     */
    constructor(isOverridden = false, isCulling = false) {
        this.isOverridden = isOverridden;
        this.isCulling = isCulling;
    }
}
/**
 * パーツ子描画オブジェクト情報構造体
 */
class PartChildDrawObjects {
    constructor(drawableIndices = new Array(), offscreenIndices = new Array()) {
        this.drawableIndices = drawableIndices;
        this.offscreenIndices = offscreenIndices;
    }
}
/**
 * オブジェクト情報構造体
 */
class CubismModelObjectInfo {
    constructor(objectIndex, objectType) {
        this.objectIndex = objectIndex;
        this.objectType = objectType;
    }
}
/**
 * パーツ情報管理構造体
 */
class CubismModelPartInfo {
    constructor(objects = new Array(), childDrawObjects = new PartChildDrawObjects()) {
        this.objects = objects;
        this.childDrawObjects = childDrawObjects;
    }
    // 子オブジェクト数を返す関数
    getChildObjectCount() {
        return this.objects.length;
    }
}
/**
 * モデル
 *
 * Mocデータから生成されるモデルのクラス。
 */
class CubismModel {
    /**
     * モデルのパラメータの更新
     */
    update() {
        // Update model
        this._model.update();
        this._model.drawables.resetDynamicFlags();
    }
    /**
     * PixelsPerUnitを取得する
     * @return PixelsPerUnit
     */
    getPixelsPerUnit() {
        if (this._model == null) {
            return 0.0;
        }
        return this._model.canvasinfo.PixelsPerUnit;
    }
    /**
     * キャンバスの幅を取得する
     */
    getCanvasWidth() {
        if (this._model == null) {
            return 0.0;
        }
        return (this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit);
    }
    /**
     * キャンバスの高さを取得する
     */
    getCanvasHeight() {
        if (this._model == null) {
            return 0.0;
        }
        return (this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit);
    }
    /**
     * パラメータを保存する
     */
    saveParameters() {
        const parameterCount = this._model.parameters.count;
        const savedParameterCount = this._savedParameters.length;
        for (let i = 0; i < parameterCount; ++i) {
            if (i < savedParameterCount) {
                this._savedParameters[i] = this._parameterValues[i];
            }
            else {
                this._savedParameters.push(this._parameterValues[i]);
            }
        }
    }
    /**
     * 乗算色・スクリーン色管理クラスを取得する
     *
     * @return CubismModelMultiplyAndScreenColorのインスタンス
     */
    getOverrideMultiplyAndScreenColor() {
        return this._overrideMultiplyAndScreenColor;
    }
    /**
     * Checks whether parameter repetition is performed for the entire model.
     *
     * @return true if parameter repetition is performed for the entire model; otherwise returns false.
     */
    getOverrideFlagForModelParameterRepeat() {
        return this._isOverriddenParameterRepeat;
    }
    /**
     * Sets whether parameter repetition is performed for the entire model.
     * Use true to perform parameter repetition for the entire model, or false to not perform it.
     */
    setOverrideFlagForModelParameterRepeat(isRepeat) {
        this._isOverriddenParameterRepeat = isRepeat;
    }
    /**
     * Returns the flag indicating whether to override the parameter repeat.
     *
     * @param parameterIndex Parameter index
     *
     * @return true if the parameter repeat is overridden, false otherwise.
     */
    getOverrideFlagForParameterRepeat(parameterIndex) {
        return this._userParameterRepeatDataList[parameterIndex].isOverridden;
    }
    /**
     * Sets the flag indicating whether to override the parameter repeat.
     *
     * @param parameterIndex Parameter index
     * @param value true if it is to be overridden; otherwise, false.
     */
    setOverrideFlagForParameterRepeat(parameterIndex, value) {
        this._userParameterRepeatDataList[parameterIndex].isOverridden = value;
    }
    /**
     * Returns the repeat flag.
     *
     * @param parameterIndex Parameter index
     *
     * @return true if repeating, false otherwise.
     */
    getRepeatFlagForParameterRepeat(parameterIndex) {
        return this._userParameterRepeatDataList[parameterIndex]
            .isParameterRepeated;
    }
    /**
     * Sets the repeat flag.
     *
     * @param parameterIndex Parameter index
     * @param value true to enable repeating, false otherwise.
     */
    setRepeatFlagForParameterRepeat(parameterIndex, value) {
        this._userParameterRepeatDataList[parameterIndex].isParameterRepeated =
            value;
    }
    /**
     * Drawableのカリング情報を取得する。
     *
     * @param   drawableIndex   Drawableのインデックス
     *
     * @return  Drawableのカリング情報
     */
    getDrawableCulling(drawableIndex) {
        if (this.getOverrideFlagForModelCullings() ||
            this.getOverrideFlagForDrawableCullings(drawableIndex)) {
            return this._userDrawableCullings[drawableIndex].isCulling;
        }
        const constantFlags = this._model.drawables.constantFlags;
        return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[drawableIndex]);
    }
    /**
     * Drawableのカリング情報を設定する。
     *
     * @param drawableIndex Drawableのインデックス
     * @param isCulling カリング情報
     */
    setDrawableCulling(drawableIndex, isCulling) {
        this._userDrawableCullings[drawableIndex].isCulling = isCulling;
    }
    /**
     * Offscreenのカリング情報を取得する。
     *
     * @param   offscreenIndex   Offscreenのインデックス
     *
     * @return  Offscreenのカリング情報
     */
    getOffscreenCulling(offscreenIndex) {
        if (this.getOverrideFlagForModelCullings() ||
            this.getOverrideFlagForOffscreenCullings(offscreenIndex)) {
            return this._userOffscreenCullings[offscreenIndex].isCulling;
        }
        const constantFlags = this._model.offscreens.constantFlags;
        return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[offscreenIndex]);
    }
    /**
     * Offscreenのカリング設定を設定する。
     *
     * @param offscreenIndex Offscreenのインデックス
     * @param isCulling カリング情報
     */
    setOffscreenCulling(offscreenIndex, isCulling) {
        this._userOffscreenCullings[offscreenIndex].isCulling = isCulling;
    }
    /**
     * SDKからモデル全体のカリング設定を上書きするか。
     *
     * @return  true    ->  SDK上のカリング設定を使用
     *          false   ->  モデルのカリング設定を使用
     */
    getOverrideFlagForModelCullings() {
        return this._isOverriddenCullings;
    }
    /**
     * SDKからモデル全体のカリング設定を上書きするかを設定する。
     *
     * @param isOverriddenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
     */
    setOverrideFlagForModelCullings(isOverriddenCullings) {
        this._isOverriddenCullings = isOverriddenCullings;
    }
    /**
     *
     * @param drawableIndex Drawableのインデックス
     * @return  true    ->  SDK上のカリング設定を使用
     *          false   ->  モデルのカリング設定を使用
     */
    getOverrideFlagForDrawableCullings(drawableIndex) {
        return this._userDrawableCullings[drawableIndex].isOverridden;
    }
    /**
     * @param offscreenIndex Offscreenのインデックス
     * @return  true    ->  SDK上のカリング設定を使用
     *          false   ->  モデルのカリング設定を使用
     */
    getOverrideFlagForOffscreenCullings(offscreenIndex) {
        return this._userOffscreenCullings[offscreenIndex].isOverridden;
    }
    /**
     *
     * @param drawableIndex Drawableのインデックス
     * @param isOverriddenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
     */
    setOverrideFlagForDrawableCullings(drawableIndex, isOverriddenCullings) {
        this._userDrawableCullings[drawableIndex].isOverridden =
            isOverriddenCullings;
    }
    /**
     * モデルの不透明度を取得する
     *
     * @return 不透明度の値
     */
    getModelOapcity() {
        return this._modelOpacity;
    }
    /**
     * モデルの不透明度を設定する
     *
     * @param value 不透明度の値
     */
    setModelOapcity(value) {
        this._modelOpacity = value;
    }
    /**
     * モデルを取得
     */
    getModel() {
        return this._model;
    }
    /**
     * パーツのインデックスを取得
     * @param partId パーツのID
     * @return パーツのインデックス
     */
    getPartIndex(partId) {
        let partIndex;
        const partCount = this._model.parts.count;
        for (partIndex = 0; partIndex < partCount; ++partIndex) {
            if (partId == this._partIds[partIndex]) {
                return partIndex;
            }
        }
        // モデルに存在していない場合、非存在パーツIDリスト内にあるかを検索し、そのインデックスを返す
        if (this._notExistPartId.has(partId)) {
            return this._notExistPartId.get(partId);
        }
        // 非存在パーツIDリストにない場合、新しく要素を追加する
        partIndex = partCount + this._notExistPartId.size;
        this._notExistPartId.set(partId, partIndex);
        this._notExistPartOpacities.set(partIndex, null);
        return partIndex;
    }
    /**
     * パーツのIDを取得する。
     *
     * @param partIndex 取得するパーツのインデックス
     * @return パーツのID
     */
    getPartId(partIndex) {
        const partId = this._model.parts.ids[partIndex];
        return CubismFramework.getIdManager().getId(partId);
    }
    /**
     * パーツの個数の取得
     * @return パーツの個数
     */
    getPartCount() {
        const partCount = this._model.parts.count;
        return partCount;
    }
    /**
     * パーツのオフスクリーンインデックスの取得
     * @param partIndex パーツのインデックス
     * @return オフスクリーンインデックスのリスト
     */
    getPartOffscreenIndices() {
        const offscreenIndices = this._model.parts.offscreenIndices;
        return offscreenIndices;
    }
    /**
     * パーツの親パーツインデックスのリストを取得
     *
     * @return パーツの親パーツインデックスのリスト
     */
    getPartParentPartIndices() {
        const parentIndices = this._model.parts.parentIndices;
        return parentIndices;
    }
    /**
     * パーツの不透明度の設定(Index)
     * @param partIndex パーツのインデックス
     * @param opacity 不透明度
     */
    setPartOpacityByIndex(partIndex, opacity) {
        if (this._notExistPartOpacities.has(partIndex)) {
            this._notExistPartOpacities.set(partIndex, opacity);
            return;
        }
        // インデックスの範囲内検知
        CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
        this._partOpacities[partIndex] = opacity;
    }
    /**
     * パーツの不透明度の設定(Id)
     * @param partId パーツのID
     * @param opacity パーツの不透明度
     */
    setPartOpacityById(partId, opacity) {
        // 高速化のためにPartIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
        const index = this.getPartIndex(partId);
        if (index < 0) {
            return; // パーツがないのでスキップ
        }
        this.setPartOpacityByIndex(index, opacity);
    }
    /**
     * パーツの不透明度の取得(index)
     * @param partIndex パーツのインデックス
     * @return パーツの不透明度
     */
    getPartOpacityByIndex(partIndex) {
        if (this._notExistPartOpacities.has(partIndex)) {
            // モデルに存在しないパーツIDの場合、非存在パーツリストから不透明度を返す。
            return this._notExistPartOpacities.get(partIndex);
        }
        // インデックスの範囲内検知
        CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
        return this._partOpacities[partIndex];
    }
    /**
     * パーツの不透明度の取得(id)
     * @param partId パーツのＩｄ
     * @return パーツの不透明度
     */
    getPartOpacityById(partId) {
        // 高速化のためにPartIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
        const index = this.getPartIndex(partId);
        if (index < 0) {
            return 0; // パーツが無いのでスキップ
        }
        return this.getPartOpacityByIndex(index);
    }
    /**
     * パラメータのインデックスの取得
     * @param パラメータID
     * @return パラメータのインデックス
     */
    getParameterIndex(parameterId) {
        let parameterIndex;
        const idCount = this._model.parameters.count;
        for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
            if (parameterId != this._parameterIds[parameterIndex]) {
                continue;
            }
            return parameterIndex;
        }
        // モデルに存在していない場合、非存在パラメータIDリスト内を検索し、そのインデックスを返す
        if (this._notExistParameterId.has(parameterId)) {
            return this._notExistParameterId.get(parameterId);
        }
        // 非存在パラメータIDリストにない場合新しく要素を追加する
        parameterIndex =
            this._model.parameters.count + this._notExistParameterId.size;
        this._notExistParameterId.set(parameterId, parameterIndex);
        this._notExistParameterValues.set(parameterIndex, null);
        return parameterIndex;
    }
    /**
     * パラメータの個数の取得
     * @return パラメータの個数
     */
    getParameterCount() {
        return this._model.parameters.count;
    }
    /**
     * パラメータの種類の取得
     * @param parameterIndex パラメータのインデックス
     * @return csmParameterType_Normal -> 通常のパラメータ
     *          csmParameterType_BlendShape -> ブレンドシェイプパラメータ
     */
    getParameterType(parameterIndex) {
        return this._model.parameters.types[parameterIndex];
    }
    /**
     * パラメータの最大値の取得
     * @param parameterIndex パラメータのインデックス
     * @return パラメータの最大値
     */
    getParameterMaximumValue(parameterIndex) {
        return this._model.parameters.maximumValues[parameterIndex];
    }
    /**
     * パラメータの最小値の取得
     * @param parameterIndex パラメータのインデックス
     * @return パラメータの最小値
     */
    getParameterMinimumValue(parameterIndex) {
        return this._model.parameters.minimumValues[parameterIndex];
    }
    /**
     * パラメータのデフォルト値の取得
     * @param parameterIndex パラメータのインデックス
     * @return パラメータのデフォルト値
     */
    getParameterDefaultValue(parameterIndex) {
        return this._model.parameters.defaultValues[parameterIndex];
    }
    /**
     * 指定したパラメータindexのIDを取得
     *
     * @param parameterIndex パラメータのインデックス
     * @return パラメータID
     */
    getParameterId(parameterIndex) {
        return CubismFramework.getIdManager().getId(this._model.parameters.ids[parameterIndex]);
    }
    /**
     * パラメータの値の取得
     * @param parameterIndex    パラメータのインデックス
     * @return パラメータの値
     */
    getParameterValueByIndex(parameterIndex) {
        if (this._notExistParameterValues.has(parameterIndex)) {
            return this._notExistParameterValues.get(parameterIndex);
        }
        // インデックスの範囲内検知
        CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        return this._parameterValues[parameterIndex];
    }
    /**
     * パラメータの値の取得
     * @param parameterId    パラメータのID
     * @return パラメータの値
     */
    getParameterValueById(parameterId) {
        // 高速化のためにparameterIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
        const parameterIndex = this.getParameterIndex(parameterId);
        return this.getParameterValueByIndex(parameterIndex);
    }
    /**
     * パラメータの値の設定
     * @param parameterIndex パラメータのインデックス
     * @param value パラメータの値
     * @param weight 重み
     */
    setParameterValueByIndex(parameterIndex, value, weight = 1.0) {
        if (this._notExistParameterValues.has(parameterIndex)) {
            this._notExistParameterValues.set(parameterIndex, weight == 1
                ? value
                : this._notExistParameterValues.get(parameterIndex) * (1 - weight) +
                    value * weight);
            return;
        }
        // インデックスの範囲内検知
        CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        if (this.isRepeat(parameterIndex)) {
            value = this.getParameterRepeatValue(parameterIndex, value);
        }
        else {
            value = this.getParameterClampValue(parameterIndex, value);
        }
        this._parameterValues[parameterIndex] =
            weight == 1
                ? value
                : (this._parameterValues[parameterIndex] =
                    this._parameterValues[parameterIndex] * (1 - weight) +
                        value * weight);
    }
    /**
     * パラメータの値の設定
     * @param parameterId パラメータのID
     * @param value パラメータの値
     * @param weight 重み
     */
    setParameterValueById(parameterId, value, weight = 1.0) {
        const index = this.getParameterIndex(parameterId);
        this.setParameterValueByIndex(index, value, weight);
    }
    /**
     * パラメータの値の加算(index)
     * @param parameterIndex パラメータインデックス
     * @param value 加算する値
     * @param weight 重み
     */
    addParameterValueByIndex(parameterIndex, value, weight = 1.0) {
        this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) + value * weight);
    }
    /**
     * パラメータの値の加算(id)
     * @param parameterId パラメータＩＤ
     * @param value 加算する値
     * @param weight 重み
     */
    addParameterValueById(parameterId, value, weight = 1.0) {
        const index = this.getParameterIndex(parameterId);
        this.addParameterValueByIndex(index, value, weight);
    }
    /**
     * Gets whether the parameter has the repeat setting.
     *
     * @param parameterIndex Parameter index
     *
     * @return true if it is set, otherwise returns false.
     */
    isRepeat(parameterIndex) {
        if (this._notExistParameterValues.has(parameterIndex)) {
            return false;
        }
        // In-index range detection
        CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        let isRepeat;
        // Determines whether to perform parameter repeat processing
        if (this._isOverriddenParameterRepeat ||
            this._userParameterRepeatDataList[parameterIndex].isOverridden) {
            // Use repeat information set on the SDK side
            isRepeat =
                this._userParameterRepeatDataList[parameterIndex].isParameterRepeated;
        }
        else {
            // Use repeat information set in Editor
            isRepeat = this._model.parameters.repeats[parameterIndex] != 0;
        }
        return isRepeat;
    }
    /**
     * Returns the calculated result ensuring the value falls within the parameter's range.
     *
     * @param parameterIndex Parameter index
     * @param value Parameter value
     *
     * @return a value that falls within the parameter’s range. If the parameter does not exist, returns it as is.
     */
    getParameterRepeatValue(parameterIndex, value) {
        if (this._notExistParameterValues.has(parameterIndex)) {
            return value;
        }
        // In-index range detection
        CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        const maxValue = this._model.parameters.maximumValues[parameterIndex];
        const minValue = this._model.parameters.minimumValues[parameterIndex];
        const valueSize = maxValue - minValue;
        if (maxValue < value) {
            const overValue = CubismMath.mod(value - maxValue, valueSize);
            if (!Number.isNaN(overValue)) {
                value = minValue + overValue;
            }
            else {
                value = maxValue;
            }
        }
        if (value < minValue) {
            const overValue = CubismMath.mod(minValue - value, valueSize);
            if (!Number.isNaN(overValue)) {
                value = maxValue - overValue;
            }
            else {
                value = minValue;
            }
        }
        return value;
    }
    /**
     * Returns the result of clamping the value to ensure it falls within the parameter's range.
     *
     * @param parameterIndex Parameter index
     * @param value Parameter value
     *
     * @return the clamped value. If the parameter does not exist, returns it as is.
     */
    getParameterClampValue(parameterIndex, value) {
        if (this._notExistParameterValues.has(parameterIndex)) {
            return value;
        }
        // In-index range detection
        CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        const maxValue = this._model.parameters.maximumValues[parameterIndex];
        const minValue = this._model.parameters.minimumValues[parameterIndex];
        return CubismMath.clamp(value, minValue, maxValue);
    }
    /**
     * Returns the repeat of the parameter.
     *
     * @param parameterIndex Parameter index
     *
     * @return the raw data parameter repeat from the Cubism Core.
     */
    getParameterRepeats(parameterIndex) {
        return this._model.parameters.repeats[parameterIndex] != 0;
    }
    /**
     * パラメータの値の乗算
     * @param parameterId パラメータのID
     * @param value 乗算する値
     * @param weight 重み
     */
    multiplyParameterValueById(parameterId, value, weight = 1.0) {
        const index = this.getParameterIndex(parameterId);
        this.multiplyParameterValueByIndex(index, value, weight);
    }
    /**
     * パラメータの値の乗算
     * @param parameterIndex パラメータのインデックス
     * @param value 乗算する値
     * @param weight 重み
     */
    multiplyParameterValueByIndex(parameterIndex, value, weight = 1.0) {
        this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) *
            (1.0 + (value - 1.0) * weight));
    }
    /**
     * Drawableのインデックスの取得
     * @param drawableId DrawableのID
     * @return Drawableのインデックス
     */
    getDrawableIndex(drawableId) {
        const drawableCount = this._model.drawables.count;
        for (let drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
            if (this._drawableIds[drawableIndex] == drawableId) {
                return drawableIndex;
            }
        }
        return -1;
    }
    /**
     * Drawableの個数の取得
     * @return drawableの個数
     */
    getDrawableCount() {
        const drawableCount = this._model.drawables.count;
        return drawableCount;
    }
    /**
     * DrawableのIDを取得する
     * @param drawableIndex Drawableのインデックス
     * @return drawableのID
     */
    getDrawableId(drawableIndex) {
        const parameterIds = this._model.drawables.ids;
        return CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
    }
    /**
     * Drawableの描画順リストの取得
     * @return Drawableの描画順リスト
     */
    getRenderOrders() {
        const renderOrders = this._model.getRenderOrders();
        return renderOrders;
    }
    /**
     * Drawableのテクスチャインデックスの取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableのテクスチャインデックス
     */
    getDrawableTextureIndex(drawableIndex) {
        const textureIndices = this._model.drawables.textureIndices;
        return textureIndices[drawableIndex];
    }
    /**
     * DrawableのVertexPositionsの変化情報の取得
     *
     * 直近のCubismModel.update関数でDrawableの頂点情報が変化したかを取得する。
     *
     * @param   drawableIndex   Drawableのインデックス
     * @return  true    Drawableの頂点情報が直近のCubismModel.update関数で変化した
     *          false   Drawableの頂点情報が直近のCubismModel.update関数で変化していない
     */
    getDrawableDynamicFlagVertexPositionsDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(dynamicFlags[drawableIndex]);
    }
    /**
     * Drawableの頂点インデックスの個数の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点インデックスの個数
     */
    getDrawableVertexIndexCount(drawableIndex) {
        const indexCounts = this._model.drawables.indexCounts;
        return indexCounts[drawableIndex];
    }
    /**
     * Drawableの頂点の個数の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点の個数
     */
    getDrawableVertexCount(drawableIndex) {
        const vertexCounts = this._model.drawables.vertexCounts;
        return vertexCounts[drawableIndex];
    }
    /**
     * Drawableの頂点リストの取得
     * @param drawableIndex drawableのインデックス
     * @return drawableの頂点リスト
     */
    getDrawableVertices(drawableIndex) {
        return this.getDrawableVertexPositions(drawableIndex);
    }
    /**
     * Drawableの頂点インデックスリストの取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点インデックスリスト
     */
    getDrawableVertexIndices(drawableIndex) {
        const indicesArray = this._model.drawables.indices;
        return indicesArray[drawableIndex];
    }
    /**
     * Drawableの頂点リストの取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点リスト
     */
    getDrawableVertexPositions(drawableIndex) {
        const verticesArray = this._model.drawables.vertexPositions;
        return verticesArray[drawableIndex];
    }
    /**
     * Drawableの頂点のUVリストの取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点UVリスト
     */
    getDrawableVertexUvs(drawableIndex) {
        const uvsArray = this._model.drawables.vertexUvs;
        return uvsArray[drawableIndex];
    }
    /**
     * Drawableの不透明度の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの不透明度
     */
    getDrawableOpacity(drawableIndex) {
        const opacities = this._model.drawables.opacities;
        return opacities[drawableIndex];
    }
    /**
     * Drawableの乗算色の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの乗算色(RGBA)
     * スクリーン色はRGBAで取得されるが、Aは必ず0
     */
    getDrawableMultiplyColor(drawableIndex) {
        if (this._drawableMultiplyColors == null) {
            this._drawableMultiplyColors = new Array(this._model.drawables.count);
            this._drawableMultiplyColors.fill(new CubismTextureColor());
        }
        const multiplyColors = this._model.drawables.multiplyColors;
        const index = drawableIndex * 4;
        this._drawableMultiplyColors[drawableIndex].r = multiplyColors[index];
        this._drawableMultiplyColors[drawableIndex].g = multiplyColors[index + 1];
        this._drawableMultiplyColors[drawableIndex].b = multiplyColors[index + 2];
        this._drawableMultiplyColors[drawableIndex].a = multiplyColors[index + 3];
        return this._drawableMultiplyColors[drawableIndex];
    }
    /**
     * Drawableのスクリーン色の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableのスクリーン色(RGBA)
     * スクリーン色はRGBAで取得されるが、Aは必ず0
     */
    getDrawableScreenColor(drawableIndex) {
        if (this._drawableScreenColors == null) {
            this._drawableScreenColors = new Array(this._model.drawables.count);
            this._drawableScreenColors.fill(new CubismTextureColor());
        }
        const screenColors = this._model.drawables.screenColors;
        const index = drawableIndex * 4;
        this._drawableScreenColors[drawableIndex].r = screenColors[index];
        this._drawableScreenColors[drawableIndex].g = screenColors[index + 1];
        this._drawableScreenColors[drawableIndex].b = screenColors[index + 2];
        this._drawableScreenColors[drawableIndex].a = screenColors[index + 3];
        return this._drawableScreenColors[drawableIndex];
    }
    /**
     * Offscreenの乗算色の取得
     * @param offscreenIndex Offscreenのインデックス
     * @return Offscreenの乗算色(RGBA)
     * スクリーン色はRGBAで取得されるが、Aは必ず0
     */
    getOffscreenMultiplyColor(offscreenIndex) {
        if (this._offscreenMultiplyColors == null) {
            this._offscreenMultiplyColors = new Array(this._model.offscreens.count);
            this._offscreenMultiplyColors.fill(new CubismTextureColor());
        }
        const multiplyColors = this._model.offscreens.multiplyColors;
        const index = offscreenIndex * 4;
        this._offscreenMultiplyColors[offscreenIndex].r = multiplyColors[index];
        this._offscreenMultiplyColors[offscreenIndex].g = multiplyColors[index + 1];
        this._offscreenMultiplyColors[offscreenIndex].b = multiplyColors[index + 2];
        this._offscreenMultiplyColors[offscreenIndex].a = multiplyColors[index + 3];
        return this._offscreenMultiplyColors[offscreenIndex];
    }
    /**
     * Offscreenのスクリーン色の取得
     * @param offscreenIndex Offscreenのインデックス
     * @return Offscreenのスクリーン色(RGBA)
     * スクリーン色はRGBAで取得されるが、Aは必ず0
     */
    getOffscreenScreenColor(offscreenIndex) {
        if (this._offscreenScreenColors == null) {
            this._offscreenScreenColors = new Array(this._model.offscreens.count);
            this._offscreenScreenColors.fill(new CubismTextureColor());
        }
        const screenColors = this._model.offscreens.screenColors;
        const index = offscreenIndex * 4;
        this._offscreenScreenColors[offscreenIndex].r = screenColors[index];
        this._offscreenScreenColors[offscreenIndex].g = screenColors[index + 1];
        this._offscreenScreenColors[offscreenIndex].b = screenColors[index + 2];
        this._offscreenScreenColors[offscreenIndex].a = screenColors[index + 3];
        return this._offscreenScreenColors[offscreenIndex];
    }
    /**
     * Drawableの親パーツのインデックスの取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの親パーツのインデックス
     */
    getDrawableParentPartIndex(drawableIndex) {
        return this._model.drawables.parentPartIndices[drawableIndex];
    }
    /**
     * Drawableのブレンドモードを取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableのブレンドモード
     */
    getDrawableBlendMode(drawableIndex) {
        const constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasBlendAdditiveBit(constantFlags[drawableIndex])
            ? CubismBlendMode.CubismBlendMode_Additive
            : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(constantFlags[drawableIndex])
                ? CubismBlendMode.CubismBlendMode_Multiplicative
                : CubismBlendMode.CubismBlendMode_Normal;
    }
    /**
     * Drawableのカラーブレンドの取得(Cubism 5.3 以降)
     *
     * @param drawableIndex Drawableのインデックス
     * @return Drawableのカラーブレンド
     */
    getDrawableColorBlend(drawableIndex) {
        // キャッシュ
        if (this._drawableColorBlends[drawableIndex] ==
            CubismColorBlend.ColorBlend_None) {
            this._drawableColorBlends[drawableIndex] =
                this._model.drawables.blendModes[drawableIndex] & 0xff;
        }
        return this._drawableColorBlends[drawableIndex];
    }
    /**
     * Drawableのアルファブレンドの取得(Cubism 5.3 以降)
     *
     * @param drawableIndex Drawableのインデックス
     * @return Drawableのアルファブレンド
     */
    getDrawableAlphaBlend(drawableIndex) {
        // キャッシュ
        if (this._drawableAlphaBlends[drawableIndex] ==
            CubismAlphaBlend.AlphaBlend_None) {
            this._drawableAlphaBlends[drawableIndex] =
                (this._model.drawables.blendModes[drawableIndex] >> 8) & 0xff;
        }
        return this._drawableAlphaBlends[drawableIndex];
    }
    /**
     * Drawableのマスクの反転使用の取得
     *
     * Drawableのマスク使用時の反転設定を取得する。
     * マスクを使用しない場合は無視される。
     *
     * @param drawableIndex Drawableのインデックス
     * @return Drawableの反転設定
     */
    getDrawableInvertedMaskBit(drawableIndex) {
        const constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasIsInvertedMaskBit(constantFlags[drawableIndex]);
    }
    /**
     * Drawableのクリッピングマスクリストの取得
     * @return Drawableのクリッピングマスクリスト
     */
    getDrawableMasks() {
        const masks = this._model.drawables.masks;
        return masks;
    }
    /**
     * Drawableのクリッピングマスクの個数リストの取得
     * @return Drawableのクリッピングマスクの個数リスト
     */
    getDrawableMaskCounts() {
        const maskCounts = this._model.drawables.maskCounts;
        return maskCounts;
    }
    /**
     * クリッピングマスクの使用状態
     *
     * @return true クリッピングマスクを使用している
     * @return false クリッピングマスクを使用していない
     */
    isUsingMasking() {
        for (let d = 0; d < this._model.drawables.count; ++d) {
            if (this._model.drawables.maskCounts[d] <= 0) {
                continue;
            }
            return true;
        }
        return false;
    }
    /**
     * Offscreenでクリッピングマスクを使用しているかどうかを取得
     *
     * @return true クリッピングマスクをオフスクリーンで使用している
     */
    isUsingMaskingForOffscreen() {
        for (let d = 0; d < this.getOffscreenCount(); ++d) {
            if (this._model.offscreens.maskCounts[d] <= 0) {
                continue;
            }
            return true;
        }
        return false;
    }
    /**
     * Drawableの表示情報を取得する
     *
     * @param drawableIndex Drawableのインデックス
     * @return true Drawableが表示
     * @return false Drawableが非表示
     */
    getDrawableDynamicFlagIsVisible(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
    }
    /**
     * DrawableのDrawOrderの変化情報の取得
     *
     * 直近のCubismModel.update関数でdrawableのdrawOrderが変化したかを取得する。
     * drawOrderはartMesh上で指定する0から1000の情報
     * @param drawableIndex drawableのインデックス
     * @return true drawableの不透明度が直近のCubismModel.update関数で変化した
     * @return false drawableの不透明度が直近のCubismModel.update関数で変化している
     */
    getDrawableDynamicFlagVisibilityDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(dynamicFlags[drawableIndex]);
    }
    /**
     * Drawableの不透明度の変化情報の取得
     *
     * 直近のCubismModel.update関数でdrawableの不透明度が変化したかを取得する。
     *
     * @param drawableIndex drawableのインデックス
     * @return true Drawableの不透明度が直近のCubismModel.update関数で変化した
     * @return false Drawableの不透明度が直近のCubismModel.update関数で変化してない
     */
    getDrawableDynamicFlagOpacityDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasOpacityDidChangeBit(dynamicFlags[drawableIndex]);
    }
    /**
     * Drawableの描画順序の変化情報の取得
     *
     * 直近のCubismModel.update関数でDrawableの描画の順序が変化したかを取得する。
     *
     * @param drawableIndex Drawableのインデックス
     * @return true Drawableの描画の順序が直近のCubismModel.update関数で変化した
     * @return false Drawableの描画の順序が直近のCubismModel.update関数で変化してない
     */
    getDrawableDynamicFlagRenderOrderDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(dynamicFlags[drawableIndex]);
    }
    /**
     * Drawableの乗算色・スクリーン色の変化情報の取得
     *
     * 直近のCubismModel.update関数でDrawableの乗算色・スクリーン色が変化したかを取得する。
     *
     * @param drawableIndex Drawableのインデックス
     * @return true Drawableの乗算色・スクリーン色が直近のCubismModel.update関数で変化した
     * @return false Drawableの乗算色・スクリーン色が直近のCubismModel.update関数で変化してない
     */
    getDrawableDynamicFlagBlendColorDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasBlendColorDidChangeBit(dynamicFlags[drawableIndex]);
    }
    /**
     * オフスクリーンの個数を取得する
     * @return オフスクリーンの個数
     */
    getOffscreenCount() {
        return this._model.offscreens.count;
    }
    /**
     * Offscreenのカラーブレンドの取得(Cubism 5.3 以降)
     *
     * @param offscreenIndex Offscreenのインデックス
     * @return Offscreenのカラーブレンド
     */
    getOffscreenColorBlend(offscreenIndex) {
        // キャッシュ
        if (this._offscreenColorBlends[offscreenIndex] ==
            CubismColorBlend.ColorBlend_None) {
            this._offscreenColorBlends[offscreenIndex] =
                this._model.offscreens.blendModes[offscreenIndex] & 0xff;
        }
        return this._offscreenColorBlends[offscreenIndex];
    }
    /**
     * Offscreenのアルファブレンドの取得(Cubism 5.3 以降)
     *
     * @param offscreenIndex Offscreenのインデックス
     * @return Offscreenのアルファブレンド
     */
    getOffscreenAlphaBlend(offscreenIndex) {
        // キャッシュ
        if (this._offscreenAlphaBlends[offscreenIndex] ==
            CubismAlphaBlend.AlphaBlend_None) {
            this._offscreenAlphaBlends[offscreenIndex] =
                (this._model.offscreens.blendModes[offscreenIndex] >> 8) & 0xff;
        }
        return this._offscreenAlphaBlends[offscreenIndex];
    }
    /**
     * オフスクリーンのオーナーインデックス配列を取得する
     * @return オフスクリーンのオーナーインデックス配列
     */
    getOffscreenOwnerIndices() {
        return this._model.offscreens.ownerIndices;
    }
    /**
     * オフスクリーンの不透明度を取得
     * @param offscreenIndex オフスクリーンのインデックス
     * @return 不透明度
     */
    getOffscreenOpacity(offscreenIndex) {
        if (offscreenIndex < 0 || offscreenIndex >= this._model.offscreens.count) {
            return 1.0; // オフスクリーンが無いのでスキップ
        }
        return this._model.offscreens.opacities[offscreenIndex];
    }
    /**
     * オフスクリーンのクリッピングマスクリストの取得
     * @return オフスクリーンのクリッピングマスクリスト
     */
    getOffscreenMasks() {
        return this._model.offscreens.masks;
    }
    /**
     * オフスクリーンのクリッピングマスクの個数リストの取得
     * @return オフスクリーンのクリッピングマスクの個数リスト
     */
    getOffscreenMaskCounts() {
        return this._model.offscreens.maskCounts;
    }
    /**
     * オフスクリーンのマスク反転設定を取得する
     * @param offscreenIndex オフスクリーンのインデックス
     * @return オフスクリーンのマスク反転設定
     */
    getOffscreenInvertedMask(offscreenIndex) {
        const constantFlags = this._model.offscreens.constantFlags;
        // Live2DCubismCore.Utils.hasIsInvertedMaskBit を利用
        return Live2DCubismCore.Utils.hasIsInvertedMaskBit(constantFlags[offscreenIndex]);
    }
    /**
     * ブレンドモード使用判定
     * @return ブレンドモードを使用しているか
     */
    isBlendModeEnabled() {
        return this._isBlendModeEnabled;
    }
    /**
     * 保存されたパラメータの読み込み
     */
    loadParameters() {
        let parameterCount = this._model.parameters.count;
        const savedParameterCount = this._savedParameters.length;
        if (parameterCount > savedParameterCount) {
            parameterCount = savedParameterCount;
        }
        for (let i = 0; i < parameterCount; ++i) {
            this._parameterValues[i] = this._savedParameters[i];
        }
    }
    /**
     * 初期化する
     */
    initialize() {
        CSM_ASSERT(this._model);
        this._parameterValues = this._model.parameters.values;
        this._partOpacities = this._model.parts.opacities;
        this._offscreenOpacities = this._model.offscreens.opacities;
        this._parameterMaximumValues = this._model.parameters.maximumValues;
        this._parameterMinimumValues = this._model.parameters.minimumValues;
        {
            const parameterIds = this._model.parameters.ids;
            const parameterCount = this._model.parameters.count;
            this._parameterIds.length = parameterCount;
            this._userParameterRepeatDataList.length = parameterCount;
            for (let i = 0; i < parameterCount; ++i) {
                this._parameterIds[i] = CubismFramework.getIdManager().getId(parameterIds[i]);
                this._userParameterRepeatDataList[i] = new ParameterRepeatData(false, false);
            }
        }
        const partCount = this._model.parts.count;
        {
            const partIds = this._model.parts.ids;
            this._partIds.length = partCount;
            for (let i = 0; i < partCount; ++i) {
                this._partIds[i] = CubismFramework.getIdManager().getId(partIds[i]);
            }
        }
        {
            const drawableIds = this._model.drawables.ids;
            const drawableCount = this._model.drawables.count;
            // Drawableカリング設定
            this._userDrawableCullings.length = drawableCount;
            const userCulling = new CullingData(false, false);
            // Offscreenカリング設定
            this._userOffscreenCullings.length = this._model.offscreens.count;
            const userOffscreenCulling = new CullingData(false, false);
            // Drawables
            {
                for (let i = 0; i < drawableCount; ++i) {
                    this._drawableIds.push(CubismFramework.getIdManager().getId(drawableIds[i]));
                    this._userDrawableCullings[i] = userCulling;
                }
            }
            // Offscreens
            {
                for (let i = 0; i < this._model.offscreens.count; ++i) {
                    this._userOffscreenCullings[i] = userOffscreenCulling;
                }
            }
            // blendMode
            // オフスクリーンが存在するか、DrawableのブレンドモードでColorBlend、AlphaBlendを使用するのであればブレンドモードを有効にする。
            if (this.getOffscreenCount() > 0) {
                this._isBlendModeEnabled = true;
            }
            else {
                this._model.drawables.blendModes;
                for (let i = 0; i < drawableCount; ++i) {
                    const colorBlendType = this.getDrawableColorBlend(i);
                    const alphaBlendType = this.getDrawableAlphaBlend(i);
                    // NormalOver、AddCompatible、MultiplyCompatible以外であればブレンドモードを有効にする。
                    if (!(colorBlendType == CubismColorBlend.ColorBlend_Normal &&
                        alphaBlendType == CubismAlphaBlend.AlphaBlend_Over) &&
                        colorBlendType != CubismColorBlend.ColorBlend_AddCompatible &&
                        colorBlendType != CubismColorBlend.ColorBlend_MultiplyCompatible) {
                        this._isBlendModeEnabled = true;
                        break;
                    }
                }
            }
            this.setupPartsHierarchy();
            // CubismModelMultiplyAndScreenColorの初期化
            const offscreenCount = this.getOffscreenCount();
            this._overrideMultiplyAndScreenColor.initialize(partCount, drawableCount, offscreenCount);
        }
    }
    /**
     * パーツ階層構造を取得する
     * @return パーツ階層構造の配列
     */
    getPartsHierarchy() {
        return this._partsHierarchy;
    }
    /**
     * パーツ階層構造をセットアップする
     */
    setupPartsHierarchy() {
        this._partsHierarchy.length = 0;
        // すべてのパーツのパーツ情報管理構造体を作成
        const partCount = this.getPartCount();
        this._partsHierarchy.length = partCount;
        for (let i = 0; i < partCount; ++i) {
            const partInfo = new CubismModelPartInfo();
            this._partsHierarchy[i] = partInfo;
        }
        // Partごとに親パーツを取得し、親パーツの子objectリストに追加する
        for (let i = 0; i < partCount; ++i) {
            const parentPartIndex = this.getPartParentPartIndices()[i];
            if (parentPartIndex === NoParentIndex) {
                continue;
            }
            for (let partIndex = 0; partIndex < this._partsHierarchy.length; ++partIndex) {
                if (partIndex === parentPartIndex) {
                    const objectInfo = new CubismModelObjectInfo(i, CubismModelObjectType.CubismModelObjectType_Parts);
                    this._partsHierarchy[partIndex].objects.push(objectInfo);
                    break;
                }
            }
        }
        // Drawableごとに親パーツを取得し、親パーツの子objectリストに追加する
        const drawableCount = this.getDrawableCount();
        for (let i = 0; i < drawableCount; ++i) {
            const parentPartIndex = this.getDrawableParentPartIndex(i);
            if (parentPartIndex === NoParentIndex) {
                continue;
            }
            for (let partIndex = 0; partIndex < this._partsHierarchy.length; ++partIndex) {
                if (partIndex === parentPartIndex) {
                    const objectInfo = new CubismModelObjectInfo(i, CubismModelObjectType.CubismModelObjectType_Drawable);
                    this._partsHierarchy[partIndex].objects.push(objectInfo);
                    break;
                }
            }
        }
        // パーツ子描画オブジェクト情報構造体を作成していく
        for (let i = 0; i < this._partsHierarchy.length; ++i) {
            // パーツ管理構造体を取得
            this.getPartChildDrawObjects(i);
        }
    }
    /**
     * 指定したパーツの子描画オブジェクト情報を取得・構築する
     * @param partInfoIndex パーツ情報のインデックス
     * @return PartChildDrawObjects
     */
    getPartChildDrawObjects(partInfoIndex) {
        if (this._partsHierarchy[partInfoIndex].getChildObjectCount() < 1) {
            // 子オブジェクトがない場合
            return this._partsHierarchy[partInfoIndex].childDrawObjects;
        }
        const childDrawObjects = this._partsHierarchy[partInfoIndex].childDrawObjects;
        // 既にchildDrawObjectsが処理されている場合はスキップ
        if (childDrawObjects.drawableIndices.length !== 0 ||
            childDrawObjects.offscreenIndices.length !== 0) {
            return childDrawObjects;
        }
        const objects = this._partsHierarchy[partInfoIndex].objects;
        for (let i = 0; i < objects.length; ++i) {
            const obj = objects[i];
            if (obj.objectType === CubismModelObjectType.CubismModelObjectType_Parts) {
                // 子のパーツの場合、再帰的に子objectsを取得
                this.getPartChildDrawObjects(obj.objectIndex);
                // 子パーツの子Drawable、Offscreenを取得
                const childToChildDrawObjects = this._partsHierarchy[obj.objectIndex].childDrawObjects;
                childDrawObjects.drawableIndices.push(...childToChildDrawObjects.drawableIndices);
                childDrawObjects.offscreenIndices.push(...childToChildDrawObjects.offscreenIndices);
                // Offscreenの確認
                const offscreenIndices = this.getOffscreenIndices();
                const offscreenIndex = offscreenIndices
                    ? offscreenIndices[obj.objectIndex]
                    : NoOffscreenIndex;
                if (offscreenIndex !== NoOffscreenIndex) {
                    childDrawObjects.offscreenIndices.push(offscreenIndex);
                }
            }
            else if (obj.objectType === CubismModelObjectType.CubismModelObjectType_Drawable) {
                // Drawableの場合、パーツの子Drawableに追加
                childDrawObjects.drawableIndices.push(obj.objectIndex);
            }
        }
        return childDrawObjects;
    }
    /**
     * パーツのオフスクリーンインデックス配列を取得
     * @return Int32Array offscreenIndices
     */
    getOffscreenIndices() {
        // _model.parts.offscreenIndices が存在する場合のみ返す
        return this._model.parts.offscreenIndices;
    }
    /**
     * コンストラクタ
     * @param model モデル
     */
    constructor(model) {
        this._model = model;
        this._parameterValues = null;
        this._parameterMaximumValues = null;
        this._parameterMinimumValues = null;
        this._partOpacities = null;
        this._offscreenOpacities = null;
        this._savedParameters = new Array();
        this._parameterIds = new Array();
        this._drawableIds = new Array();
        this._partIds = new Array();
        this._isOverriddenParameterRepeat = true;
        this._isOverriddenCullings = false;
        this._modelOpacity = 1.0;
        // CubismModelMultiplyAndScreenColorのインスタンスを作成
        this._overrideMultiplyAndScreenColor =
            new CubismModelMultiplyAndScreenColor(this);
        this._isBlendModeEnabled = false;
        this._drawableColorBlends = null;
        this._drawableAlphaBlends = null;
        this._offscreenColorBlends = null;
        this._offscreenAlphaBlends = null;
        this._drawableMultiplyColors = null;
        this._drawableScreenColors = null;
        this._offscreenMultiplyColors = null;
        this._offscreenScreenColors = null;
        this._userParameterRepeatDataList = new Array();
        this._userDrawableCullings = new Array();
        this._userOffscreenCullings = new Array();
        this._partsHierarchy = new Array();
        this._notExistPartId = new Map();
        this._notExistParameterId = new Map();
        this._notExistParameterValues = new Map();
        this._notExistPartOpacities = new Map();
        // Drawableのカラーブレンドとアルファブレンドの初期化
        this._drawableColorBlends = new Array(model.drawables.count).fill(CubismColorBlend.ColorBlend_None);
        this._drawableAlphaBlends = new Array(model.drawables.count).fill(CubismAlphaBlend.AlphaBlend_None);
        // Offscreenのカラーブレンドとアルファブレンドの初期化
        this._offscreenColorBlends = new Array(model.offscreens.count).fill(CubismColorBlend.ColorBlend_None);
        this._offscreenAlphaBlends = new Array(model.offscreens.count).fill(CubismAlphaBlend.AlphaBlend_None);
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        this._model.release();
        this._model = null;
        this._drawableColorBlends = null;
        this._drawableAlphaBlends = null;
        this._offscreenColorBlends = null;
        this._offscreenAlphaBlends = null;
        this._drawableMultiplyColors = null;
        this._drawableScreenColors = null;
        this._offscreenMultiplyColors = null;
        this._offscreenScreenColors = null;
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$5;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModel = CubismModel;
})(Live2DCubismFramework$5 || (Live2DCubismFramework$5 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * Mocデータの管理
 *
 * Mocデータの管理を行うクラス。
 */
class CubismMoc {
    /**
     * Mocデータの作成
     */
    static create(mocBytes, shouldCheckMocConsistency) {
        let cubismMoc = null;
        if (shouldCheckMocConsistency) {
            // .moc3の整合性を確認
            const consistency = this.hasMocConsistency(mocBytes);
            if (!consistency) {
                // 整合性が確認できなければ処理しない
                CubismLogError(`Inconsistent MOC3.`);
                return cubismMoc;
            }
        }
        const moc = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
        if (moc) {
            cubismMoc = new CubismMoc(moc);
            cubismMoc._mocVersion =
                Live2DCubismCore.Version.csmGetMocVersion(mocBytes);
        }
        return cubismMoc;
    }
    /**
     * Mocデータを削除
     *
     * Mocデータを削除する
     */
    static delete(moc) {
        moc._moc._release();
        moc._moc = null;
        moc = null;
    }
    /**
     * モデルを作成する
     *
     * @return Mocデータから作成されたモデル
     */
    createModel() {
        let cubismModel = null;
        const model = Live2DCubismCore.Model.fromMoc(this._moc);
        if (model) {
            cubismModel = new CubismModel(model);
            cubismModel.initialize();
            ++this._modelCount;
        }
        return cubismModel;
    }
    /**
     * モデルを削除する
     */
    deleteModel(model) {
        if (model != null) {
            model.release();
            model = null;
            --this._modelCount;
        }
    }
    /**
     * コンストラクタ
     */
    constructor(moc) {
        this._moc = moc;
        this._modelCount = 0;
        this._mocVersion = 0;
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        CSM_ASSERT(this._modelCount == 0);
        this._moc._release();
        this._moc = null;
    }
    /**
     * 最新の.moc3 Versionを取得
     */
    getLatestMocVersion() {
        return Live2DCubismCore.Version.csmGetLatestMocVersion();
    }
    /**
     * 読み込んだモデルの.moc3 Versionを取得
     */
    getMocVersion() {
        return this._mocVersion;
    }
    /**
     * Mocファイルのbufferから.moc3 Versionを取得
     * @param mocBytes Mocファイルのバイト配列
     * @returns .moc3 Version番号
     */
    static getMocVersionFromBuffer(mocBytes) {
        return Live2DCubismCore.Version.csmGetMocVersion(mocBytes);
    }
    /**
     * .moc3 の整合性を検証する
     */
    static hasMocConsistency(mocBytes) {
        const isConsistent = Live2DCubismCore.Moc.prototype.hasMocConsistency(mocBytes);
        return isConsistent === 1 ? true : false;
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$4;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMoc = CubismMoc;
})(Live2DCubismFramework$4 || (Live2DCubismFramework$4 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * Arrayのサイズを変更する。
 * @param curArray
 * @param newSize
 * @param value
 * @param callPlacementNew
 */
function updateSize(curArray, newSize, value = null, callPlacementNew = null) {
    const curSize = curArray.length;
    if (curSize < newSize) {
        if (callPlacementNew) {
            for (let i = curArray.length; i < newSize; i++) {
                if (typeof value == 'function') {
                    // new
                    curArray[i] = JSON.parse(JSON.stringify(new value()));
                } // プリミティブ型なので値渡し
                else {
                    curArray[i] = value;
                }
            }
        }
        else {
            for (let i = curArray.length; i < newSize; i++) {
                curArray[i] = value;
            }
        }
    }
    else {
        curArray.length = newSize;
    }
}

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
const ColorChannelCount = 4; // 実験時に1チャンネルの場合は1、RGBだけの場合は3、アルファも含める場合は4
const ClippingMaskMaxCountOnDefault = 36; // 通常のフレームバッファ一枚あたりのマスク最大数
const ClippingMaskMaxCountOnMultiRenderTexture = 32; // フレームバッファが2枚以上ある場合のフレームバッファ一枚あたりのマスク最大数
class CubismClippingManager {
    /**
     * コンストラクタ
     */
    constructor(clippingContextFactory) {
        this._renderTextureCount = 0;
        this._clippingMaskBufferSize = 256;
        this._clippingContextListForMask = new Array();
        this._clippingContextListForDraw = new Array();
        this._clippingContextListForOffscreen = new Array();
        this._tmpBoundsOnModel = new csmRect();
        this._tmpMatrix = new CubismMatrix44();
        this._tmpMatrixForMask = new CubismMatrix44();
        this._tmpMatrixForDraw = new CubismMatrix44();
        this._clearedMaskBufferFlags = new Array();
        this._clippingContexttConstructor = clippingContextFactory;
        this._channelColors = [
            new CubismTextureColor(1.0, 0.0, 0.0, 0.0),
            new CubismTextureColor(0.0, 1.0, 0.0, 0.0),
            new CubismTextureColor(0.0, 0.0, 1.0, 0.0),
            new CubismTextureColor(0.0, 0.0, 0.0, 1.0)
        ];
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        for (let i = 0; i < this._clippingContextListForMask.length; i++) {
            if (this._clippingContextListForMask[i]) {
                this._clippingContextListForMask[i].release();
                this._clippingContextListForMask[i] = void 0;
            }
            this._clippingContextListForMask[i] = null;
        }
        this._clippingContextListForMask = null;
        // _clippingContextListForDrawは_clippingContextListForMaskにあるインスタンスを指している。上記の処理により要素ごとのDELETEは不要。
        for (let i = 0; i < this._clippingContextListForDraw.length; i++) {
            this._clippingContextListForDraw[i] = null;
        }
        this._clippingContextListForDraw = null;
        for (let i = 0; i < this._channelColors.length; i++) {
            this._channelColors[i] = null;
        }
        this._channelColors = null;
        if (this._clearedMaskBufferFlags != null) {
            this._clearedMaskBufferFlags.length = 0;
        }
        this._clearedMaskBufferFlags = null;
    }
    /**
     * マネージャの初期化処理
     * クリッピングマスクを使う描画オブジェクトの登録を行う
     * @param model モデルのインスタンス
     * @param renderTextureCount バッファの生成数
     */
    initializeForDrawable(model, renderTextureCount) {
        // レンダーテクスチャの合計枚数の設定
        // 1以上の整数でない場合はそれぞれ警告を出す
        if (renderTextureCount % 1 != 0) {
            CubismLogWarning('The number of render textures must be specified as an integer. The decimal point is rounded down and corrected to an integer.');
            // 小数点以下を除去
            renderTextureCount = ~~renderTextureCount;
        }
        if (renderTextureCount < 1) {
            CubismLogWarning('The number of render textures must be an integer greater than or equal to 1. Set the number of render textures to 1.');
        }
        // 負の値が使われている場合は強制的に1枚と設定する
        this._renderTextureCount = renderTextureCount < 1 ? 1 : renderTextureCount;
        this._clearedMaskBufferFlags = new Array(this._renderTextureCount);
        // クリッピングマスクを使う描画オブジェクトをすべて登録する
        // クリッピングマスクは、通常数個程度に限定して使うものとする
        this._clippingContextListForDraw.length = model.getDrawableCount();
        for (let i = 0; i < model.getDrawableCount(); i++) {
            if (model.getDrawableMaskCounts()[i] <= 0) {
                // クリッピングマスクが使用されていないアートメッシュ（多くの場合使用しない）
                this._clippingContextListForDraw[i] = null;
                continue;
            }
            // 既にあるClipContextと同じかチェックする
            let clippingContext = this.findSameClip(model.getDrawableMasks()[i], model.getDrawableMaskCounts()[i]);
            if (clippingContext == null) {
                // 同一のマスクが存在していない場合は生成する
                clippingContext = new this._clippingContexttConstructor(this, model.getDrawableMasks()[i], model.getDrawableMaskCounts()[i]);
                this._clippingContextListForMask.push(clippingContext);
            }
            clippingContext.addClippedDrawable(i);
            this._clippingContextListForDraw[i] = clippingContext;
        }
    }
    /**
     * オフスクリーン用の初期化処理
     *
     * @param model モデルのインスタンス
     * @param maskBufferCount オフスクリーン用のマスクバッファの数
     */
    initializeForOffscreen(model, maskBufferCount) {
        this._renderTextureCount = maskBufferCount;
        // レンダーテクスチャのクリアフラグの設定
        this._clearedMaskBufferFlags.length = this._renderTextureCount;
        for (let i = 0; i < this._renderTextureCount; ++i) {
            this._clearedMaskBufferFlags[i] = false;
        }
        //クリッピングマスクを使う描画オブジェクトを全て登録する
        //クリッピングマスクは、通常数個程度に限定して使うものとする
        this._clippingContextListForOffscreen.length = model.getOffscreenCount();
        for (let i = 0; i < model.getOffscreenCount(); ++i) {
            if (model.getOffscreenMaskCounts()[i] <= 0) {
                //クリッピングマスクが使用されていないオフスクリーン（多くの場合使用しない）
                this._clippingContextListForOffscreen.push(null);
                continue;
            }
            // 既にあるClipContextと同じかチェックする
            let cc = this.findSameClip(model.getOffscreenMasks()[i], model.getOffscreenMaskCounts()[i]);
            if (cc == null) {
                // 同一のマスクが存在していない場合は生成する
                cc = new this._clippingContexttConstructor(this, model.getOffscreenMasks()[i], model.getOffscreenMaskCounts()[i]);
                this._clippingContextListForMask.push(cc);
            }
            cc.addClippedOffscreen(i);
            this._clippingContextListForOffscreen[i] = cc;
        }
    }
    /**
     * 既にマスクを作っているかを確認
     * 作っている様であれば該当するクリッピングマスクのインスタンスを返す
     * 作っていなければNULLを返す
     * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのリスト
     * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
     * @return 該当するクリッピングマスクが存在すればインスタンスを返し、なければNULLを返す
     */
    findSameClip(drawableMasks, drawableMaskCounts) {
        // 作成済みClippingContextと一致するか確認
        for (let i = 0; i < this._clippingContextListForMask.length; i++) {
            const clippingContext = this._clippingContextListForMask[i];
            const count = clippingContext._clippingIdCount;
            // 個数が違う場合は別物
            if (count != drawableMaskCounts) {
                continue;
            }
            let sameCount = 0;
            // 同じIDを持つか確認。配列の数が同じなので、一致した個数が同じなら同じ物を持つとする
            for (let j = 0; j < count; j++) {
                const clipId = clippingContext._clippingIdList[j];
                for (let k = 0; k < count; k++) {
                    if (drawableMasks[k] == clipId) {
                        sameCount++;
                        break;
                    }
                }
            }
            if (sameCount == count) {
                return clippingContext;
            }
        }
        return null; // 見つからなかった
    }
    /**
     * 高精細マスク処理用の行列を計算する
     * @param model モデルのインスタンス
     * @param isRightHanded 処理が右手系であるか
     */
    setupMatrixForHighPrecision(model, isRightHanded) {
        // 全てのクリッピングを用意する
        // 同じクリップ（複数の場合はまとめて一つのクリップ）を使う場合は1度だけ設定する
        let usingClipCount = 0;
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
            // １つのクリッピングマスクに関して
            const cc = this._clippingContextListForMask[clipIndex];
            // このクリップを利用する描画オブジェクト群全体を囲む矩形を計算
            this.calcClippedDrawableTotalBounds(model, cc);
            if (cc._isUsing) {
                usingClipCount++; // 使用中としてカウント
            }
        }
        // マスク行列作成処理
        if (usingClipCount > 0) {
            this.setupLayoutBounds(0);
            // サイズがレンダーテクスチャの枚数と合わない場合は合わせる
            if (this._clearedMaskBufferFlags.length != this._renderTextureCount) {
                this._clearedMaskBufferFlags.length = this._renderTextureCount;
                for (let i = 0; i < this._renderTextureCount; i++) {
                    this._clearedMaskBufferFlags[i] = false;
                }
            }
            else {
                // マスクのクリアフラグを毎フレーム開始時に初期化
                for (let i = 0; i < this._renderTextureCount; i++) {
                    this._clearedMaskBufferFlags[i] = false;
                }
            }
            // 実際にマスクを生成する
            // 全てのマスクをどの様にレイアウトして描くかを決定し、ClipContext , ClippedDrawContext に記憶する
            for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
                // --- 実際に１つのマスクを描く ---
                const clipContext = this._clippingContextListForMask[clipIndex];
                const allClippedDrawRect = clipContext._allClippedDrawRect; //このマスクを使う、全ての描画オブジェクトの論理座標上の囲み矩形
                const layoutBoundsOnTex01 = clipContext._layoutBounds; //この中にマスクを収める
                const margin = 0.05;
                let scaleX = 0.0;
                let scaleY = 0.0;
                const ppu = model.getPixelsPerUnit();
                const maskPixelSize = clipContext
                    .getClippingManager()
                    .getClippingMaskBufferSize();
                const physicalMaskWidth = layoutBoundsOnTex01.width * maskPixelSize;
                const physicalMaskHeight = layoutBoundsOnTex01.height * maskPixelSize;
                this._tmpBoundsOnModel.setRect(allClippedDrawRect);
                if (this._tmpBoundsOnModel.width * ppu > physicalMaskWidth) {
                    this._tmpBoundsOnModel.expand(allClippedDrawRect.width * margin, 0.0);
                    scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
                }
                else {
                    scaleX = ppu / physicalMaskWidth;
                }
                if (this._tmpBoundsOnModel.height * ppu > physicalMaskHeight) {
                    this._tmpBoundsOnModel.expand(0.0, allClippedDrawRect.height * margin);
                    scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
                }
                else {
                    scaleY = ppu / physicalMaskHeight;
                }
                // マスク生成時に使う行列を求める
                this.createMatrixForMask(isRightHanded, layoutBoundsOnTex01, scaleX, scaleY);
                clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
                clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
            }
        }
    }
    /**
     * オフスクリーンの高精細マスク処理用の行列を計算する
     *
     * @param model モデルのインスタンス
     * @param isRightHanded 処理が右手系であるか
     * @param mvp モデルビュー投影行列
     */
    setupMatrixForOffscreenHighPrecision(model, isRightHanded, mvp) {
        // 全てのクリッピングを用意する
        // 同じクリップ（複数の場合はまとめて１つのクリップ）を使う場合は１度だけ設定する
        let usingClipCount = 0;
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
            // １つのクリッピングマスクに関して
            const cc = this._clippingContextListForMask[clipIndex];
            // このクリップを利用する描画オブジェクト群全体を囲む矩形を計算
            this.calcClippedOffscreenTotalBounds(model, cc);
            if (cc._isUsing) {
                usingClipCount++; //使用中としてカウント
            }
        }
        if (usingClipCount <= 0) {
            return;
        }
        // マスク行列作成処理
        this.setupLayoutBounds(0);
        // サイズがレンダーテクスチャの枚数と合わない場合は合わせる
        if (this._clearedMaskBufferFlags.length != this._renderTextureCount) {
            this._clearedMaskBufferFlags.length = this._renderTextureCount;
            for (let i = 0; i < this._renderTextureCount; ++i) {
                this._clearedMaskBufferFlags[i] = false;
            }
        }
        else {
            // マスクのクリアフラグを毎フレーム開始時に初期化
            for (let i = 0; i < this._renderTextureCount; ++i) {
                this._clearedMaskBufferFlags[i] = false;
            }
        }
        // 実際にマスクを生成する
        // 全てのマスクをどの様にレイアウトして描くかを決定し、ClipContext , ClippedDrawContext に記憶する
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
            // --- 実際に１つのマスクを描く ---
            const clipContext = this._clippingContextListForMask[clipIndex];
            const allClippedDrawRect = clipContext._allClippedDrawRect; //このマスクを使う、全ての描画オブジェクトの論理座標上の囲み矩形
            const layoutBoundsOnTex01 = clipContext._layoutBounds; //この中にマスクを収める
            const margin = 0.05;
            let scaleX = 0.0;
            let scaleY = 0.0;
            const ppu = model.getPixelsPerUnit();
            const maskPixel = clipContext
                .getClippingManager()
                .getClippingMaskBufferSize();
            const physicalMaskWidth = layoutBoundsOnTex01.width * maskPixel;
            const physicalMaskHeight = layoutBoundsOnTex01.height * maskPixel;
            this._tmpBoundsOnModel.setRect(allClippedDrawRect);
            if (this._tmpBoundsOnModel.width * ppu > physicalMaskWidth) {
                this._tmpBoundsOnModel.expand(allClippedDrawRect.width * margin, 0.0);
                scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
            }
            else {
                scaleX = ppu / physicalMaskWidth;
            }
            if (this._tmpBoundsOnModel.height * ppu > physicalMaskHeight) {
                this._tmpBoundsOnModel.expand(0.0, allClippedDrawRect.height * margin);
                scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
            }
            else {
                scaleY = ppu / physicalMaskHeight;
            }
            // マスク生成時に使う行列を求める
            this.createMatrixForMask(isRightHanded, layoutBoundsOnTex01, scaleX, scaleY);
            clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
            clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
            // clipContext * mvp^-1
            const invertMvp = mvp.getInvert();
            clipContext._matrixForDraw.multiplyByMatrix(invertMvp);
        }
    }
    /**
     * マスクを使う描画オブジェクトの全体の矩形を計算する。
     *
     * @param model モデルのインスタンス
     * @param clippingContext クリッピングコンテキスト
     */
    calcClippedOffscreenTotalBounds(model, clippingContext) {
        // 被クリッピングマスク（マスクされる描画オブジェクト）の全体の矩形
        let clippedDrawTotalMinX = Number.MAX_VALUE, clippedDrawTotalMinY = Number.MAX_VALUE;
        let clippedDrawTotalMaxX = -Number.MAX_VALUE, clippedDrawTotalMaxY = -Number.MAX_VALUE;
        // このマスクが実際に必要か判定する
        // このクリッピングを利用する「描画オブジェクト」がひとつでも使用可能であればマスクを生成する必要がある
        const clippedOffscreenCount = clippingContext._clippedOffscreenIndexList.length;
        const clippedOffscreenChildDrawableIndexList = new Array();
        for (let clippedOffscreenIndex = 0; clippedOffscreenIndex < clippedOffscreenCount; clippedOffscreenIndex++) {
            // マスクを使用する描画オブジェクトの描画される矩形を求める
            const offscreenIndex = clippingContext._clippedOffscreenIndexList[clippedOffscreenIndex];
            this.getOffscreenChildDrawableIndexList(model, offscreenIndex, clippedOffscreenChildDrawableIndexList);
        }
        const childDrawableCount = clippedOffscreenChildDrawableIndexList.length;
        for (let childDrawableIndex = 0; childDrawableIndex < childDrawableCount; childDrawableIndex++) {
            const drawableVertexCount = model.getDrawableVertexCount(clippedOffscreenChildDrawableIndexList[childDrawableIndex]);
            const drawableVertexes = model.getDrawableVertices(clippedOffscreenChildDrawableIndexList[childDrawableIndex]);
            let minX = Number.MAX_VALUE, minY = Number.MAX_VALUE;
            let maxX = -Number.MAX_VALUE, maxY = -Number.MAX_VALUE;
            const loop = drawableVertexCount * Constant.vertexStep;
            for (let pi = Constant.vertexOffset; pi < loop; pi += Constant.vertexStep) {
                const x = drawableVertexes[pi];
                const y = drawableVertexes[pi + 1];
                if (x < minX)
                    minX = x;
                if (x > maxX)
                    maxX = x;
                if (y < minY)
                    minY = y;
                if (y > maxY)
                    maxY = y;
            }
            if (minX == Number.MAX_VALUE)
                continue; //有効な点がひとつも取れなかったのでスキップする
            // 全体の矩形に反映
            if (minX < clippedDrawTotalMinX)
                clippedDrawTotalMinX = minX;
            if (minY < clippedDrawTotalMinY)
                clippedDrawTotalMinY = minY;
            if (maxX > clippedDrawTotalMaxX)
                clippedDrawTotalMaxX = maxX;
            if (maxY > clippedDrawTotalMaxY)
                clippedDrawTotalMaxY = maxY;
        }
        if (clippedDrawTotalMinX == Number.MAX_VALUE) {
            clippingContext._allClippedDrawRect.x = 0.0;
            clippingContext._allClippedDrawRect.y = 0.0;
            clippingContext._allClippedDrawRect.width = 0.0;
            clippingContext._allClippedDrawRect.height = 0.0;
            clippingContext._isUsing = false;
        }
        else {
            clippingContext._isUsing = true;
            const w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
            const h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
            clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
            clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
            clippingContext._allClippedDrawRect.width = w;
            clippingContext._allClippedDrawRect.height = h;
        }
    }
    /**
     * マスクを使う描画オブジェクトの全体の矩形を計算する。
     *
     * @param model モデルのインスタンス
     * @param offscreenIndex オフスクリーンのインデックス
     * @param childDrawableIndexList オフスクリーンの子Drawableのインデックスリスト
     */
    getOffscreenChildDrawableIndexList(model, offscreenIndex, childDrawableIndexList) {
        // 親オブジェクトを取得
        const ownerIndex = model.getOffscreenOwnerIndices()[offscreenIndex];
        // パーツのみ
        this.getPartChildDrawableIndexList(model, ownerIndex, childDrawableIndexList);
    }
    /**
     * パーツの子Drawableのインデックスリストを取得する。
     *
     * @param model モデルのインスタンス
     * @param partIndex パーツのインデックス
     * @param childDrawableIndexList パーツの子Drawableのインデックスリスト
     */
    getPartChildDrawableIndexList(model, partIndex, childDrawableIndexList) {
        const childDrawObjects = model.getPartsHierarchy()[partIndex].childDrawObjects;
        childDrawableIndexList.push(...childDrawObjects.drawableIndices);
        for (let i = 0; i < childDrawObjects.offscreenIndices.length; ++i) {
            this.getOffscreenChildDrawableIndexList(model, childDrawObjects.offscreenIndices[i], childDrawableIndexList);
        }
    }
    /**
     * マスク作成・描画用の行列を作成する。
     * @param isRightHanded 座標を右手系として扱うかを指定
     * @param layoutBoundsOnTex01 マスクを収める領域
     * @param scaleX 描画オブジェクトの伸縮率
     * @param scaleY 描画オブジェクトの伸縮率
     */
    createMatrixForMask(isRightHanded, layoutBoundsOnTex01, scaleX, scaleY) {
        this._tmpMatrix.loadIdentity();
        {
            // Layout0..1 を -1..1に変換
            this._tmpMatrix.translateRelative(-1.0, -1.0);
            this._tmpMatrix.scaleRelative(2.0, 2.0);
        }
        {
            // view to Layout0..1
            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y); //new = [translate]
            this._tmpMatrix.scaleRelative(scaleX, scaleY); //new = [translate][scale]
            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y); //new = [translate][scale][translate]
        }
        // tmpMatrixForMask が計算結果
        this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
        this._tmpMatrix.loadIdentity();
        {
            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y * (isRightHanded ? -1.0 : 1.0)); //new = [translate]
            this._tmpMatrix.scaleRelative(scaleX, scaleY * (isRightHanded ? -1.0 : 1.0)); //new = [translate][scale]
            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y); //new = [translate][scale][translate]
        }
        this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
    }
    /**
     * クリッピングコンテキストを配置するレイアウト
     * 指定された数のレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする
     * マスクグループの数が4以下ならRGBA各チャンネルに一つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
     *
     * @param usingClipCount 配置するクリッピングコンテキストの数
     */
    setupLayoutBounds(usingClipCount) {
        const useClippingMaskMaxCount = this._renderTextureCount <= 1
            ? ClippingMaskMaxCountOnDefault
            : ClippingMaskMaxCountOnMultiRenderTexture * this._renderTextureCount;
        if (usingClipCount <= 0 || usingClipCount > useClippingMaskMaxCount) {
            if (usingClipCount > useClippingMaskMaxCount) {
                // マスクの制限数の警告を出す
                CubismLogError('not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}', usingClipCount - useClippingMaskMaxCount, this._renderTextureCount, usingClipCount);
            }
            // この場合は一つのマスクターゲットを毎回クリアして使用する
            for (let index = 0; index < this._clippingContextListForMask.length; index++) {
                const clipContext = this._clippingContextListForMask[index];
                clipContext._layoutChannelIndex = 0; // どうせ毎回消すので固定
                clipContext._layoutBounds.x = 0.0;
                clipContext._layoutBounds.y = 0.0;
                clipContext._layoutBounds.width = 1.0;
                clipContext._layoutBounds.height = 1.0;
                clipContext._bufferIndex = 0;
            }
            return;
        }
        // レンダーテクスチャが1枚なら9分割する（最大36枚）
        const layoutCountMaxValue = this._renderTextureCount <= 1 ? 9 : 8;
        // 指定された数のレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする（デフォルトなら1）。
        // マスクグループの数が4以下ならRGBA各チャンネルに1つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
        let countPerSheetDiv = usingClipCount / this._renderTextureCount; // レンダーテクスチャ1枚あたり何枚割り当てるか。
        const reduceLayoutTextureCount = usingClipCount % this._renderTextureCount; // レイアウトの数を1枚減らすレンダーテクスチャの数（この数だけのレンダーテクスチャが対象）。
        // 1枚に割り当てるマスクの分割数を取りたいため、小数点は切り上げる
        countPerSheetDiv = Math.ceil(countPerSheetDiv);
        // RGBAを順番に使っていく
        let divCount = countPerSheetDiv / ColorChannelCount; // 1チャンネルに配置する基本のマスク
        const modCount = countPerSheetDiv % ColorChannelCount; // 余り、この番号のチャンネルまでに一つずつ配分する（インデックスではない）
        // 小数点は切り捨てる
        divCount = ~~divCount;
        // RGBAそれぞれのチャンネルを用意していく（0:R, 1:G, 2:B, 3:A）
        let curClipIndex = 0; // 順番に設定していく
        for (let renderTextureIndex = 0; renderTextureIndex < this._renderTextureCount; renderTextureIndex++) {
            for (let channelIndex = 0; channelIndex < ColorChannelCount; channelIndex++) {
                // このチャンネルにレイアウトする数
                // NOTE: レイアウト数 = 1チャンネルに配置する基本のマスク + 余りのマスクを置くチャンネルなら1つ追加
                let layoutCount = divCount + (channelIndex < modCount ? 1 : 0);
                // レイアウトの数を1枚減らす場合にそれを行うチャンネルを決定
                // divが0の時は正常なインデックスの範囲内になるように調整
                const checkChannelIndex = modCount + (divCount < 1 ? -1 : 0);
                // 今回が対象のチャンネルかつ、レイアウトの数を1枚減らすレンダーテクスチャが存在する場合
                if (channelIndex == checkChannelIndex && reduceLayoutTextureCount > 0) {
                    // 現在のレンダーテクスチャが、対象のレンダーテクスチャであればレイアウトの数を1枚減らす。
                    layoutCount -= !(renderTextureIndex < reduceLayoutTextureCount)
                        ? 1
                        : 0;
                }
                // 分割方法を決定する
                if (layoutCount == 0) ;
                else if (layoutCount == 1) {
                    // 全てをそのまま使う
                    const clipContext = this._clippingContextListForMask[curClipIndex++];
                    clipContext._layoutChannelIndex = channelIndex;
                    clipContext._layoutBounds.x = 0.0;
                    clipContext._layoutBounds.y = 0.0;
                    clipContext._layoutBounds.width = 1.0;
                    clipContext._layoutBounds.height = 1.0;
                    clipContext._bufferIndex = renderTextureIndex;
                }
                else if (layoutCount == 2) {
                    for (let i = 0; i < layoutCount; i++) {
                        let xpos = i % 2;
                        // 小数点は切り捨てる
                        xpos = ~~xpos;
                        const cc = this._clippingContextListForMask[curClipIndex++];
                        cc._layoutChannelIndex = channelIndex;
                        // UVを2つに分解して使う
                        cc._layoutBounds.x = xpos * 0.5;
                        cc._layoutBounds.y = 0.0;
                        cc._layoutBounds.width = 0.5;
                        cc._layoutBounds.height = 1.0;
                        cc._bufferIndex = renderTextureIndex;
                    }
                }
                else if (layoutCount <= 4) {
                    // 4分割して使う
                    for (let i = 0; i < layoutCount; i++) {
                        let xpos = i % 2;
                        let ypos = i / 2;
                        // 小数点は切り捨てる
                        xpos = ~~xpos;
                        ypos = ~~ypos;
                        const cc = this._clippingContextListForMask[curClipIndex++];
                        cc._layoutChannelIndex = channelIndex;
                        cc._layoutBounds.x = xpos * 0.5;
                        cc._layoutBounds.y = ypos * 0.5;
                        cc._layoutBounds.width = 0.5;
                        cc._layoutBounds.height = 0.5;
                        cc._bufferIndex = renderTextureIndex;
                    }
                }
                else if (layoutCount <= layoutCountMaxValue) {
                    // 9分割して使う
                    for (let i = 0; i < layoutCount; i++) {
                        let xpos = i % 3;
                        let ypos = i / 3;
                        // 小数点は切り捨てる
                        xpos = ~~xpos;
                        ypos = ~~ypos;
                        const cc = this._clippingContextListForMask[curClipIndex++];
                        cc._layoutChannelIndex = channelIndex;
                        cc._layoutBounds.x = xpos / 3.0;
                        cc._layoutBounds.y = ypos / 3.0;
                        cc._layoutBounds.width = 1.0 / 3.0;
                        cc._layoutBounds.height = 1.0 / 3.0;
                        cc._bufferIndex = renderTextureIndex;
                    }
                }
                else {
                    // マスクの制限枚数を超えた場合の処理
                    CubismLogError('not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}', usingClipCount - useClippingMaskMaxCount, this._renderTextureCount, usingClipCount);
                    // SetupShaderProgramでオーバーアクセスが発生するので仮で数値を入れる
                    // もちろん描画結果は正しいものではなくなる
                    for (let index = 0; index < layoutCount; index++) {
                        const cc = this._clippingContextListForMask[curClipIndex++];
                        cc._layoutChannelIndex = 0;
                        cc._layoutBounds.x = 0.0;
                        cc._layoutBounds.y = 0.0;
                        cc._layoutBounds.width = 1.0;
                        cc._layoutBounds.height = 1.0;
                        cc._bufferIndex = 0;
                    }
                }
            }
        }
    }
    /**
     * マスクされる描画オブジェクト群全体を囲む矩形（モデル座標系）を計算する
     * @param model モデルのインスタンス
     * @param clippingContext クリッピングマスクのコンテキスト
     */
    calcClippedDrawableTotalBounds(model, clippingContext) {
        // 被クリッピングマスク（マスクされる描画オブジェクト）の全体の矩形
        let clippedDrawTotalMinX = Number.MAX_VALUE;
        let clippedDrawTotalMinY = Number.MAX_VALUE;
        let clippedDrawTotalMaxX = Number.MIN_VALUE;
        let clippedDrawTotalMaxY = Number.MIN_VALUE;
        // このマスクが実際に必要か判定する
        // このクリッピングを利用する「描画オブジェクト」がひとつでも使用可能であればマスクを生成する必要がある
        const clippedDrawCount = clippingContext._clippedDrawableIndexList.length;
        for (let clippedDrawableIndex = 0; clippedDrawableIndex < clippedDrawCount; clippedDrawableIndex++) {
            // マスクを使用する描画オブジェクトの描画される矩形を求める
            const drawableIndex = clippingContext._clippedDrawableIndexList[clippedDrawableIndex];
            const drawableVertexCount = model.getDrawableVertexCount(drawableIndex);
            const drawableVertexes = model.getDrawableVertices(drawableIndex);
            let minX = Number.MAX_VALUE;
            let minY = Number.MAX_VALUE;
            let maxX = -Number.MAX_VALUE;
            let maxY = -Number.MAX_VALUE;
            const loop = drawableVertexCount * Constant.vertexStep;
            for (let pi = Constant.vertexOffset; pi < loop; pi += Constant.vertexStep) {
                const x = drawableVertexes[pi];
                const y = drawableVertexes[pi + 1];
                if (x < minX) {
                    minX = x;
                }
                if (x > maxX) {
                    maxX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (y > maxY) {
                    maxY = y;
                }
            }
            // 有効な点が一つも取れなかったのでスキップ
            if (minX == Number.MAX_VALUE) {
                continue;
            }
            // 全体の矩形に反映
            if (minX < clippedDrawTotalMinX) {
                clippedDrawTotalMinX = minX;
            }
            if (minY < clippedDrawTotalMinY) {
                clippedDrawTotalMinY = minY;
            }
            if (maxX > clippedDrawTotalMaxX) {
                clippedDrawTotalMaxX = maxX;
            }
            if (maxY > clippedDrawTotalMaxY) {
                clippedDrawTotalMaxY = maxY;
            }
            if (clippedDrawTotalMinX == Number.MAX_VALUE) {
                clippingContext._allClippedDrawRect.x = 0.0;
                clippingContext._allClippedDrawRect.y = 0.0;
                clippingContext._allClippedDrawRect.width = 0.0;
                clippingContext._allClippedDrawRect.height = 0.0;
                clippingContext._isUsing = false;
            }
            else {
                clippingContext._isUsing = true;
                const w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
                const h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
                clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
                clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
                clippingContext._allClippedDrawRect.width = w;
                clippingContext._allClippedDrawRect.height = h;
            }
        }
    }
    /**
     * 画面描画に使用するクリッピングマスクのリストを取得する
     * @return 画面描画に使用するクリッピングマスクのリスト
     */
    getClippingContextListForDraw() {
        return this._clippingContextListForDraw;
    }
    getClippingContextListForOffscreen() {
        return this._clippingContextListForOffscreen;
    }
    /**
     * クリッピングマスクバッファのサイズを取得する
     * @return クリッピングマスクバッファのサイズ
     */
    getClippingMaskBufferSize() {
        return this._clippingMaskBufferSize;
    }
    /**
     * このバッファのレンダーテクスチャの枚数を取得する
     * @return このバッファのレンダーテクスチャの枚数
     */
    getRenderTextureCount() {
        return this._renderTextureCount;
    }
    /**
     * カラーチャンネル（RGBA）のフラグを取得する
     * @param channelNo カラーチャンネル（RGBA）の番号（0:R, 1:G, 2:B, 3:A）
     */
    getChannelFlagAsColor(channelNo) {
        return this._channelColors[channelNo];
    }
    /**
     * クリッピングマスクバッファのサイズを設定する
     * @param size クリッピングマスクバッファのサイズ
     */
    setClippingMaskBufferSize(size) {
        this._clippingMaskBufferSize = size;
    }
}

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * WebGL用オフスクリーンサーフェス
 * マスクの描画に必要なフレームバッファなどを管理する。
 */
class CubismRenderTarget_WebGL {
    /**
     * WebGL2RenderingContext.blitFramebuffer() でバッファのコピーを行う。
     *
     * @param src コピー元のオフスクリーンサーフェス
     * @param dst コピー先のオフスクリーンサーフェス
     */
    static copyBuffer(gl, src, dst) {
        if (src == null || dst == null) {
            return;
        }
        if (!(gl instanceof WebGL2RenderingContext)) {
            throw new Error('WebGL2RenderingContext is required for buffer copy.');
        }
        const previousFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        // 各オフスクリーンサーフェスのレンダーテクスチャをバインド
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, src.getRenderTexture());
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, dst.getRenderTexture());
        // バッファのコピーを実行
        gl.blitFramebuffer(0, 0, src.getBufferWidth(), src.getBufferHeight(), 0, 0, dst.getBufferWidth(), dst.getBufferHeight(), gl.COLOR_BUFFER_BIT, gl.NEAREST);
        // コピー後、元のフレームバッファを復元
        gl.bindFramebuffer(gl.FRAMEBUFFER, previousFramebuffer);
    }
    /**
     * 描画を開始する。
     *
     * @param restoreFbo EndDraw時に復元するFBOを指定する。nullを指定すると、beginDraw時に現在のFBOを記憶しておく。
     */
    beginDraw(restoreFbo = null) {
        if (this._renderTexture == null) {
            console.error('_renderTexture is null');
            return;
        }
        // バックバッファのサーフェイスを記憶しておく。
        if (restoreFbo == null) {
            this._oldFbo = this._gl.getParameter(this._gl.FRAMEBUFFER_BINDING);
        }
        else {
            this._oldFbo = restoreFbo;
        }
        // RenderTextureをactiveにセット
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._renderTexture);
    }
    /**
     * 描画を終了し、バックバッファのサーフェイスを復元する。
     */
    endDraw() {
        // バックバッファのサーフェイスを復元
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._oldFbo);
    }
    /**
     * バインドされているカラーバッファのクリアを行う。
     *
     * @param r 赤の成分 (0.0 - 1.0)
     * @param g 緑の成分 (0.0 - 1.0)
     * @param b 青の成分 (0.0 - 1.0)
     * @param a アルファの成分 (0.0 - 1.0)
     */
    clear(r, g, b, a) {
        // クリア処理
        this._gl.clearColor(r, g, b, a);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
    }
    /**
     * オフスクリーンサーフェスを作成する。
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     *          NOTE: Cubism 5.3以降のモデルが使用される場合はWebGL2RenderingContextを使用すること。
     * @param displayBufferWidth オフスクリーンサーフェスの幅
     * @param displayBufferHeight オフスクリーンサーフェスの高さ
     * @param previousFramebuffer 前のフレームバッファ
     *
     * @return 成功した場合はtrue、失敗した場合はfalse
     */
    createRenderTarget(gl, displayBufferWidth, displayBufferHeight, previousFramebuffer) {
        this.destroyRenderTarget();
        this._colorBuffer = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._colorBuffer);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, displayBufferWidth, displayBufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        // フレームバッファを作成
        const ret = gl.createFramebuffer();
        if (ret == null) {
            CubismLogError('Failed to create framebuffer');
            return false;
        }
        // 作成したフレームバッファをバインド
        gl.bindFramebuffer(gl.FRAMEBUFFER, ret);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._colorBuffer, 0);
        // 状態をチェック
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        // フレームバッファが完全でない場合はエラーを出力して以前のフレームバッファを復元
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
            CubismLogError('Framebuffer is not complete');
            gl.bindFramebuffer(gl.FRAMEBUFFER, previousFramebuffer);
            gl.deleteFramebuffer(ret);
            this.destroyRenderTarget();
            return false;
        }
        this._renderTexture = ret;
        this._bufferWidth = displayBufferWidth;
        this._bufferHeight = displayBufferHeight;
        this._gl = gl;
        return true;
    }
    /**
     * レンダーターゲットを破棄する。
     */
    destroyRenderTarget() {
        if (this._colorBuffer) {
            this._gl.bindTexture(this._gl.TEXTURE_2D, null);
            this._gl.deleteTexture(this._colorBuffer);
            this._colorBuffer = null;
        }
        if (this._renderTexture) {
            this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
            this._gl.deleteFramebuffer(this._renderTexture);
            this._renderTexture = null;
        }
    }
    /**
     * WebGLのコンテキストを取得する。
     *
     * @return WebGLRenderingContextまたはWebGL2RenderingContext
     */
    getGL() {
        return this._gl;
    }
    /**
     * レンダーテクスチャを取得する。
     *
     * @return WebGLFramebuffer
     */
    getRenderTexture() {
        return this._renderTexture;
    }
    /**
     * カラーバッファを取得する。
     *
     * @return WebGLTexture
     */
    getColorBuffer() {
        return this._colorBuffer;
    }
    /**
     * カラーバッファの幅を取得する。
     *
     * @return カラーバッファの幅
     */
    getBufferWidth() {
        return this._bufferWidth;
    }
    /**
     * カラーバッファの高さを取得する。
     *
     * @return カラーバッファの高さ
     */
    getBufferHeight() {
        return this._bufferHeight;
    }
    /**
     * オフスクリーンサーフェスが有効かどうかを確認する。
     *
     * @return 有効な場合はtrue、無効な場合はfalse
     */
    isValid() {
        return this._renderTexture != null;
    }
    /**
     * 以前のフレームバッファを取得する。
     *
     * @return 以前のフレームバッファ
     */
    getOldFBO() {
        return this._oldFbo;
    }
    /**
     * コンストラクタ
     */
    constructor() {
        this._gl = null;
        this._colorBuffer = null;
        this._renderTexture = null;
        this._bufferWidth = 0;
        this._bufferHeight = 0;
        this._oldFbo = null;
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$3;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismOffscreenSurface_WebGL = CubismRenderTarget_WebGL;
})(Live2DCubismFramework$3 || (Live2DCubismFramework$3 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Shader
const VertShaderSrcPath = 'vertshadersrc.vert';
const VertShaderSrcMaskedPath = 'vertshadersrcmasked.vert';
const VertShaderSrcSetupMaskPath = 'vertshadersrcsetupmask.vert';
const FragShaderSrcSetupMaskPath = 'fragshadersrcsetupmask.frag';
const FragShaderSrcPremultipliedAlphaPath = 'fragshadersrcpremultipliedalpha.frag';
const FragShaderSrcMaskPremultipliedAlphaPath = 'fragshadersrcmaskpremultipliedalpha.frag';
const FragShaderSrcMaskInvertedPremultipliedAlphaPath = 'fragshadersrcmaskinvertedpremultipliedalpha.frag';
// Copy & Blend Shader
const VertShaderSrcCopyPath = 'vertshadersrccopy.vert';
const FragShaderSrcCopyPath = 'fragshadersrccopy.frag';
const FragShaderSrcColorBlendPath = 'fragshadersrccolorblend.frag';
const FragShaderSrcAlphaBlendPath = 'fragshadersrcalphablend.frag';
const VertShaderSrcBlendPath = 'vertshadersrcblend.vert';
const FragShaderSrcBlendPath = 'fragshadersrcpremultipliedalphablend.frag';
// Blend mode Prefix
const ColorBlendPrefix = 'ColorBlend_';
const AlphaBlendPrefix = 'AlphaBlend_';
let s_instance; // インスタンス（シングルトン）
const s_renderTargetVertexArray = new Float32Array([
    -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0
]);
const s_renderTargetUvArray = new Float32Array([
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0
]);
const s_renderTargetReverseUvArray = new Float32Array([
    0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0
]);
/**
 * WebGL用のシェーダープログラムを生成・破棄するクラス
 */
class CubismShader_WebGL {
    /**
     * 非同期でシェーダーをパスから読み込む
     *
     * @param url シェーダーのURL
     *
     * @return シェーダーのソースコード
     */
    loadShader(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url);
            return yield response.text();
        });
    }
    /**
     * ブレンドモード用のシェーダーを読み込む
     */
    loadShaders() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // _shaderPathがnullまたはundefinedの場合はデフォルトパスを使用
            const shaderDir = (_a = this._shaderPath) !== null && _a !== void 0 ? _a : this._defaultShaderPath;
            // シェーダーファイルのパスとプロパティの対応
            // NOTE: prop は CubismShader_WebGL に設定された変数名
            const shaderFiles = [
                { path: shaderDir + VertShaderSrcPath, prop: '_vertShaderSrc' },
                {
                    path: shaderDir + VertShaderSrcMaskedPath,
                    prop: '_vertShaderSrcMasked'
                },
                {
                    path: shaderDir + VertShaderSrcSetupMaskPath,
                    prop: '_vertShaderSrcSetupMask'
                },
                {
                    path: shaderDir + FragShaderSrcSetupMaskPath,
                    prop: '_fragShaderSrcSetupMask'
                },
                {
                    path: shaderDir + FragShaderSrcPremultipliedAlphaPath,
                    prop: '_fragShaderSrcPremultipliedAlpha'
                },
                {
                    path: shaderDir + FragShaderSrcMaskPremultipliedAlphaPath,
                    prop: '_fragShaderSrcMaskPremultipliedAlpha'
                },
                {
                    path: shaderDir + FragShaderSrcMaskInvertedPremultipliedAlphaPath,
                    prop: '_fragShaderSrcMaskInvertedPremultipliedAlpha'
                },
                { path: shaderDir + VertShaderSrcCopyPath, prop: '_vertShaderSrcCopy' },
                { path: shaderDir + FragShaderSrcCopyPath, prop: '_fragShaderSrcCopy' },
                {
                    path: shaderDir + FragShaderSrcColorBlendPath,
                    prop: '_fragShaderSrcColorBlend'
                },
                {
                    path: shaderDir + FragShaderSrcAlphaBlendPath,
                    prop: '_fragShaderSrcAlphaBlend'
                },
                { path: shaderDir + VertShaderSrcBlendPath, prop: '_vertShaderSrcBlend' },
                { path: shaderDir + FragShaderSrcBlendPath, prop: '_fragShaderSrcBlend' }
            ];
            // シェーダーファイルを非同期で読み込み、結果をプロパティに設定
            const results = yield Promise.all(shaderFiles.map(file => this.loadShader(file.path)
                .then(data => ({ prop: file.prop, data }))
                .catch(error => {
                console.error(`Error loading ${file.path} shader:`, error);
                return { prop: file.prop, data: '' };
            })));
            // 変数に内容を登録
            results.forEach(result => {
                this[result.prop] = result.data;
            });
        });
    }
    /**
     * コンストラクタ
     */
    constructor() {
        this._shaderSets = new Array();
        this._isShaderLoading = false;
        this._isShaderLoaded = false;
        // カラーブレンド用のマップ
        this._colorBlendMap = new Map();
        this._colorBlendValues = new Array();
        const colorBlendKeys = Object.keys(CubismColorBlend);
        // Object.values() のポリフィル
        const colorBlendRawValues = Object.keys(CubismColorBlend).map(k => CubismColorBlend[k]);
        for (let i = 0; i < colorBlendKeys.length; i++) {
            const colorBlendKey = colorBlendKeys[i];
            if (colorBlendKey.includes(ColorBlendPrefix)) {
                const blendModeName = colorBlendKey.slice(ColorBlendPrefix.length);
                const colorBlendNumber = parseInt(colorBlendRawValues[i].toString());
                this._colorBlendMap.set(colorBlendNumber, blendModeName);
                this._colorBlendValues.push(colorBlendNumber);
            }
        }
        // アルファブレンド用のマップ
        this._alphaBlendMap = new Map();
        this._alphaBlendValues = new Array();
        const alphaBlendKeys = Object.keys(CubismAlphaBlend);
        // Object.values() のポリフィル
        const alphaBlendRawValues = Object.keys(CubismAlphaBlend).map(k => CubismAlphaBlend[k]);
        for (let i = 0; i < alphaBlendKeys.length; i++) {
            const alphaBlendKey = alphaBlendKeys[i];
            if (alphaBlendKey.includes(AlphaBlendPrefix)) {
                const blendModeName = alphaBlendKey.slice(AlphaBlendPrefix.length);
                const alphaBlendNumber = parseInt(alphaBlendRawValues[i].toString());
                this._alphaBlendMap.set(alphaBlendNumber, blendModeName);
                this._alphaBlendValues.push(alphaBlendNumber);
            }
        }
        this._blendShaderSetMap = new Map();
        this._shaderCount =
            ShaderNames.ShaderNames_ShaderCount +
                1 +
                (this._colorBlendValues.length - 3) *
                    (this._alphaBlendValues.length - 1) *
                    3;
        // シェーダーの数 =
        // (マスク生成用 + (通常用 + 加算 + 乗算) * (マスク無の乗算済アルファ対応版 + マスク有の乗算済アルファ対応版 + マスク有反転の乗算済アルファ対応版))
        // + 1（コピー用のシェーダー）
        // + カラーブレンドの数（後方互換とNone除く） * アルファブレンドの数（None除く） * （通常 + マスク + 反転マスク）
        this._defaultShaderPath = '../../Framework/Shaders/WebGL/';
        this._shaderPath = this._defaultShaderPath;
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        this.releaseShaderProgram();
    }
    /**
     * 描画用のシェーダプログラムの一連のセットアップを実行する
     *
     * @param renderer レンダラー
     * @param model 描画対象のモデル
     * @param index 描画対象のメッシュのインデックス
     */
    setupShaderProgramForDrawable(renderer, model, index) {
        if (!renderer.isPremultipliedAlpha()) {
            CubismLogError('NoPremultipliedAlpha is not allowed');
        }
        if (this._shaderSets.length == 0) {
            this.generateShaders();
        }
        if (this._isShaderLoaded == false) {
            CubismLogWarning('Shader program is not initialized.');
            return;
        }
        // Blending
        let srcColor;
        let dstColor;
        let srcAlpha;
        let dstAlpha;
        // _shaderSets用のオフセット計算
        const masked = renderer.getClippingContextBufferForDrawable() != null; // この描画オブジェクトはマスク対象か
        const invertedMask = model.getDrawableInvertedMaskBit(index);
        const offset = masked ? (invertedMask ? 2 : 1) : 0;
        let shaderSet;
        // Cubism 5.2以前のシェーダを使用する場合はtrue
        let isUsingCompatible = true;
        if (model.isBlendModeEnabled()) {
            const colorBlendMode = model.getDrawableColorBlend(index);
            const alphaBlendMode = model.getDrawableAlphaBlend(index);
            if (colorBlendMode == CubismColorBlend.ColorBlend_None ||
                alphaBlendMode == CubismAlphaBlend.AlphaBlend_None ||
                (colorBlendMode == CubismColorBlend.ColorBlend_Normal &&
                    alphaBlendMode == CubismAlphaBlend.AlphaBlend_Over)) {
                // Cubism 5.2以前のシェーダを使用する。
                shaderSet =
                    this._shaderSets[ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset];
                srcColor = this.gl.ONE;
                dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
                srcAlpha = this.gl.ONE;
                dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
            }
            else {
                switch (colorBlendMode) {
                    // Cubism 5.2以前のシェーダを使用する。
                    case CubismColorBlend.ColorBlend_AddCompatible:
                        shaderSet =
                            this._shaderSets[ShaderNames.ShaderNames_AddPremultipliedAlpha + offset];
                        srcColor = this.gl.ONE;
                        dstColor = this.gl.ONE;
                        srcAlpha = this.gl.ZERO;
                        dstAlpha = this.gl.ONE;
                        break;
                    // Cubism 5.2以前のシェーダを使用する。
                    case CubismColorBlend.ColorBlend_MultiplyCompatible:
                        shaderSet =
                            this._shaderSets[ShaderNames.ShaderNames_MultPremultipliedAlpha + offset];
                        srcColor = this.gl.DST_COLOR;
                        dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
                        srcAlpha = this.gl.ZERO;
                        dstAlpha = this.gl.ONE;
                        break;
                    // ブレンドモードの組み合わせでシェーダーを決定
                    default:
                        {
                            const srcBuffer = renderer._currentOffscreen != null
                                ? renderer._currentOffscreen
                                : renderer.getModelRenderTarget(0);
                            // 先にコピーを行う
                            CubismRenderTarget_WebGL.copyBuffer(this.gl, srcBuffer, renderer.getModelRenderTarget(1));
                            const baseShaderSetIndex = this._blendShaderSetMap.get(this._colorBlendMap.get(colorBlendMode) +
                                this._alphaBlendMap.get(alphaBlendMode));
                            shaderSet = this._shaderSets[baseShaderSetIndex + offset];
                            srcColor = this.gl.ONE;
                            dstColor = this.gl.ZERO;
                            srcAlpha = this.gl.ONE;
                            dstAlpha = this.gl.ZERO;
                            isUsingCompatible = false;
                        }
                        break;
                }
            }
        }
        else {
            // Cubism 5.2以前のシェーダを使用する。
            switch (model.getDrawableBlendMode(index)) {
                case CubismBlendMode.CubismBlendMode_Normal:
                default:
                    shaderSet =
                        this._shaderSets[ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset];
                    srcColor = this.gl.ONE;
                    dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
                    srcAlpha = this.gl.ONE;
                    dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
                    break;
                case CubismBlendMode.CubismBlendMode_Additive:
                    shaderSet =
                        this._shaderSets[ShaderNames.ShaderNames_AddPremultipliedAlpha + offset];
                    srcColor = this.gl.ONE;
                    dstColor = this.gl.ONE;
                    srcAlpha = this.gl.ZERO;
                    dstAlpha = this.gl.ONE;
                    break;
                case CubismBlendMode.CubismBlendMode_Multiplicative:
                    shaderSet =
                        this._shaderSets[ShaderNames.ShaderNames_MultPremultipliedAlpha + offset];
                    srcColor = this.gl.DST_COLOR;
                    dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
                    srcAlpha = this.gl.ZERO;
                    dstAlpha = this.gl.ONE;
                    break;
            }
        }
        this.gl.useProgram(shaderSet.shaderProgram);
        // 頂点配列の設定
        if (renderer._bufferData.vertex == null) {
            renderer._bufferData.vertex = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
        // 頂点配列の設定
        const vertexArray = model.getDrawableVertices(index);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
        this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
        // テクスチャ頂点の設定
        if (renderer._bufferData.uv == null) {
            renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        const uvArray = model.getDrawableVertexUvs(index);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
        this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
        if (masked) {
            this.gl.activeTexture(this.gl.TEXTURE1);
            // frameBufferに書かれたテクスチャ
            const tex = renderer
                .getDrawableMaskBuffer(renderer.getClippingContextBufferForDrawable()._bufferIndex)
                .getColorBuffer();
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
            this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
            // view座標をClippingContextの座標に変換するための行列を設定
            this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForDrawable()._matrixForDraw.getArray());
            // 使用するカラーチャンネルを設定
            const channelIndex = renderer.getClippingContextBufferForDrawable()._layoutChannelIndex;
            const colorChannel = renderer
                .getClippingContextBufferForDrawable()
                .getClippingManager()
                .getChannelFlagAsColor(channelIndex);
            this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.r, colorChannel.g, colorChannel.b, colorChannel.a);
            if (model.isBlendModeEnabled()) {
                this.gl.uniform1f(shaderSet.uniformInvertMaskFlagLocation, invertedMask ? 1.0 : 0.0);
            }
        }
        // テクスチャ設定
        const textureNo = model.getDrawableTextureIndex(index);
        const textureId = renderer.getBindedTextures().get(textureNo);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
        this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
        //座標変換
        const matrix4x4 = renderer.getMvpMatrix();
        this.gl.uniformMatrix4fv(shaderSet.uniformMatrixLocation, false, matrix4x4.getArray());
        //ベース色の取得
        let baseColor = null;
        if (model.isBlendModeEnabled()) {
            // ブレンドモードではモデルカラーは最後に処理するため不透明度のみ対応させる
            const drawableOpacity = model.getDrawableOpacity(index);
            baseColor = new CubismTextureColor(drawableOpacity, drawableOpacity, drawableOpacity, drawableOpacity);
        }
        else {
            baseColor = renderer.getModelColorWithOpacity(model.getDrawableOpacity(index));
        }
        const multiplyAndScreenColor = model.getOverrideMultiplyAndScreenColor();
        const multiplyColor = multiplyAndScreenColor.getDrawableMultiplyColor(index);
        const screenColor = multiplyAndScreenColor.getDrawableScreenColor(index);
        this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.r, baseColor.g, baseColor.b, baseColor.a);
        this.gl.uniform4f(shaderSet.uniformMultiplyColorLocation, multiplyColor.r, multiplyColor.g, multiplyColor.b, multiplyColor.a);
        this.gl.uniform4f(shaderSet.uniformScreenColorLocation, screenColor.r, screenColor.g, screenColor.b, screenColor.a);
        // Cubism 5.3以降のシェーダを使用する場合
        if (model.isBlendModeEnabled()) {
            this.gl.activeTexture(this.gl.TEXTURE2);
            // Cubism 5.2以前のシェーダを使用する場合は不要なのでこの処理をスキップ
            if (!isUsingCompatible) {
                const tex = renderer
                    .getModelRenderTarget(1)
                    .getColorBuffer();
                this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
                this.gl.uniform1i(shaderSet.samplerFrameBufferTextureLocation, 2);
            }
        }
        // IBOを作成し、データを転送
        if (renderer._bufferData.index == null) {
            renderer._bufferData.index = this.gl.createBuffer();
        }
        const indexArray = model.getDrawableVertexIndices(index);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, renderer._bufferData.index);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
        this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
    }
    /**
     * オフスクリーン用のシェーダプログラムの一連のセットアップを実行する
     *
     * @param renderer レンダラー
     * @param model 描画対象のモデル
     * @param offscreen 描画対象のオフスクリーン
     */
    setupShaderProgramForOffscreen(renderer, model, offscreen) {
        if (!renderer.isPremultipliedAlpha()) {
            CubismLogError('NoPremultipliedAlpha is not allowed');
        }
        if (this._shaderSets.length == 0) {
            this.generateShaders();
        }
        if (this._isShaderLoaded == false) {
            CubismLogWarning('Shader program is not initialized.');
            return;
        }
        // Blending
        let srcColor;
        let dstColor;
        let srcAlpha;
        let dstAlpha;
        const offscreenIndex = offscreen.getOffscreenIndex();
        // _shaderSets用のオフセット計算
        const masked = renderer.getClippingContextBufferForOffscreen() != null; // この描画オブジェクトはマスク対象か
        const invertedMask = model.getOffscreenInvertedMask(offscreenIndex);
        const offset = masked ? (invertedMask ? 2 : 1) : 0;
        let shaderSet;
        // Cubism 5.2以前のシェーダを使用する場合はtrue
        let isUsingCompatible = true;
        const colorBlendMode = model.getOffscreenColorBlend(offscreenIndex);
        const alphaBlendMode = model.getOffscreenAlphaBlend(offscreenIndex);
        if (colorBlendMode == CubismColorBlend.ColorBlend_None ||
            alphaBlendMode == CubismAlphaBlend.AlphaBlend_None ||
            (colorBlendMode == CubismColorBlend.ColorBlend_Normal &&
                alphaBlendMode == CubismAlphaBlend.AlphaBlend_Over)) {
            // Cubism 5.2以前のシェーダを使用する。
            shaderSet =
                this._shaderSets[ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset];
            srcColor = this.gl.ONE;
            dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
            srcAlpha = this.gl.ONE;
            dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
        }
        else {
            switch (colorBlendMode) {
                // Cubism 5.2以前のシェーダを使用する。
                case CubismColorBlend.ColorBlend_AddCompatible:
                    shaderSet =
                        this._shaderSets[ShaderNames.ShaderNames_AddPremultipliedAlpha + offset];
                    srcColor = this.gl.ONE;
                    dstColor = this.gl.ONE;
                    srcAlpha = this.gl.ZERO;
                    dstAlpha = this.gl.ONE;
                    break;
                case CubismColorBlend.ColorBlend_MultiplyCompatible:
                    shaderSet =
                        this._shaderSets[ShaderNames.ShaderNames_MultPremultipliedAlpha + offset];
                    srcColor = this.gl.DST_COLOR;
                    dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
                    srcAlpha = this.gl.ZERO;
                    dstAlpha = this.gl.ONE;
                    break;
                default:
                    {
                        const srcBuffer = offscreen.getOldOffscreen() != null
                            ? offscreen.getOldOffscreen()
                            : renderer.getModelRenderTarget(0);
                        // 先にコピーを行う
                        CubismRenderTarget_WebGL.copyBuffer(this.gl, srcBuffer, renderer.getModelRenderTarget(1));
                        const baseShaderSetIndex = this._blendShaderSetMap.get(this._colorBlendMap.get(colorBlendMode) +
                            this._alphaBlendMap.get(alphaBlendMode));
                        shaderSet = this._shaderSets[baseShaderSetIndex + offset];
                        srcColor = this.gl.ONE;
                        dstColor = this.gl.ZERO;
                        srcAlpha = this.gl.ONE;
                        dstAlpha = this.gl.ZERO;
                        isUsingCompatible = false;
                    }
                    break;
            }
        }
        this.gl.useProgram(shaderSet.shaderProgram);
        // 頂点配列の設定
        CubismRenderTarget_WebGL.copyBuffer(this.gl, offscreen, renderer.getModelRenderTarget(2));
        this.gl.activeTexture(this.gl.TEXTURE0);
        const tex0 = renderer.getModelRenderTarget(2).getColorBuffer();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex0);
        this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
        //座標変換
        const matrix4x4 = new CubismMatrix44();
        matrix4x4.loadIdentity();
        this.gl.uniformMatrix4fv(shaderSet.uniformMatrixLocation, false, matrix4x4.getArray());
        // ベース色の取得
        const offscreenOpacity = model.getOffscreenOpacity(offscreenIndex);
        // 乗算済みアルファを使用するのでオフスクリーンの透明度を 1.0 に乗算した状態
        const baseColor = new CubismTextureColor(offscreenOpacity, offscreenOpacity, offscreenOpacity, offscreenOpacity);
        const multiplyAndScreenColor = model.getOverrideMultiplyAndScreenColor();
        const multiplyColor = multiplyAndScreenColor.getOffscreenMultiplyColor(offscreenIndex);
        const screenColor = multiplyAndScreenColor.getOffscreenScreenColor(offscreenIndex);
        this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.r, baseColor.g, baseColor.b, baseColor.a);
        this.gl.uniform4f(shaderSet.uniformMultiplyColorLocation, multiplyColor.r, multiplyColor.g, multiplyColor.b, multiplyColor.a);
        this.gl.uniform4f(shaderSet.uniformScreenColorLocation, screenColor.r, screenColor.g, screenColor.b, screenColor.a);
        this.gl.activeTexture(this.gl.TEXTURE2);
        // Cubism 5.2以前のシェーダを使用する場合は不要なのでこの処理をスキップ
        if (!isUsingCompatible) {
            const tex1 = renderer
                .getModelRenderTarget(1)
                .getColorBuffer();
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex1);
            this.gl.uniform1i(shaderSet.samplerFrameBufferTextureLocation, 2);
        }
        if (masked) {
            this.gl.activeTexture(this.gl.TEXTURE1);
            // frameBufferに書かれたテクスチャ
            const tex2 = renderer
                .getOffscreenMaskBuffer(renderer.getClippingContextBufferForOffscreen()._bufferIndex)
                .getColorBuffer();
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex2);
            this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
            // view座標をClippingContextの座標に変換するための行列を設定
            this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer
                .getClippingContextBufferForOffscreen()
                ._matrixForDraw.getArray());
            // 使用するカラーチャンネルを設定
            const channelIndex = renderer.getClippingContextBufferForOffscreen()._layoutChannelIndex;
            const colorChannel = renderer
                .getClippingContextBufferForOffscreen()
                .getClippingManager()
                .getChannelFlagAsColor(channelIndex);
            this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.r, colorChannel.g, colorChannel.b, colorChannel.a);
            if (model.isBlendModeEnabled()) {
                this.gl.uniform1f(shaderSet.uniformInvertMaskFlagLocation, invertedMask ? 1.0 : 0.0);
            }
        }
        // 頂点位置属性の設定
        if (!renderer._bufferData.vertex) {
            renderer._bufferData.vertex = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, s_renderTargetVertexArray, this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
        this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 2, 0);
        // テクスチャ座標属性の設定
        if (!renderer._bufferData.uv) {
            renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, s_renderTargetReverseUvArray, this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
        this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 2, 0);
        this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
    }
    /**
     * マスク用のシェーダプログラムの一連のセットアップを実行する
     *
     * @param renderer レンダラー
     * @param model 描画対象のモデル
     * @param index 描画対象のメッシュのインデックス
     */
    setupShaderProgramForMask(renderer, model, index) {
        if (!renderer.isPremultipliedAlpha()) {
            CubismLogError('NoPremultipliedAlpha is not allowed');
        }
        if (this._shaderSets.length == 0) {
            this.generateShaders();
        }
        if (this._isShaderLoaded == false) {
            CubismLogWarning('Shader program is not initialized.');
            return;
        }
        const shaderSet = this._shaderSets[ShaderNames.ShaderNames_SetupMask];
        this.gl.useProgram(shaderSet.shaderProgram);
        // 頂点配列の設定
        if (renderer._bufferData.vertex == null) {
            renderer._bufferData.vertex = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
        const vertexArray = model.getDrawableVertices(index);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
        this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
        //テクスチャ設定
        if (renderer._bufferData.uv == null) {
            renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        const textureNo = model.getDrawableTextureIndex(index);
        const textureId = renderer.getBindedTextures().get(textureNo);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
        this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
        // テクスチャ頂点の設定
        if (renderer._bufferData.uv == null) {
            renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        const uvArray = model.getDrawableVertexUvs(index);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
        this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
        // チャンネル
        const channelIndex = renderer.getClippingContextBufferForMask()._layoutChannelIndex;
        const colorChannel = renderer
            .getClippingContextBufferForMask()
            .getClippingManager()
            .getChannelFlagAsColor(channelIndex);
        this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.r, colorChannel.g, colorChannel.b, colorChannel.a);
        this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForMask()._matrixForMask.getArray());
        const rect = renderer.getClippingContextBufferForMask()._layoutBounds;
        this.gl.uniform4f(shaderSet.uniformBaseColorLocation, rect.x * 2.0 - 1.0, rect.y * 2.0 - 1.0, rect.getRight() * 2.0 - 1.0, rect.getBottom() * 2.0 - 1.0);
        // Blending
        const srcColor = this.gl.ZERO;
        const dstColor = this.gl.ONE_MINUS_SRC_COLOR;
        const srcAlpha = this.gl.ZERO;
        const dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
        // IBOを作成し、データを転送
        if (renderer._bufferData.index == null) {
            renderer._bufferData.index = this.gl.createBuffer();
        }
        const indexArray = model.getDrawableVertexIndices(index);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, renderer._bufferData.index);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
        this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
    }
    /**
     * オフスクリーンのレンダリングターゲット用のシェーダープログラムを設定する
     *
     * @param renderer レンダラー
     */
    setupShaderProgramForOffscreenRenderTarget(renderer) {
        if (this._shaderSets.length == 0) {
            this.generateShaders();
        }
        if (this._isShaderLoaded == false) {
            CubismLogWarning('Shader program is not initialized.');
            return;
        }
        // この時点のテクスチャはPMAになっているはずなので計算を行う
        const baseColor = renderer.getModelColor();
        baseColor.r *= baseColor.a;
        baseColor.g *= baseColor.a;
        baseColor.b *= baseColor.a;
        this.copyTexture(renderer, baseColor);
    }
    /**
     * オフスクリーンのレンダリングターゲットの内容をコピーする
     *
     * @param renderer レンダラー
     * @param baseColor ベースカラー
     */
    copyTexture(renderer, baseColor) {
        // Blending
        const srcColor = this.gl.ONE;
        const dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
        const srcAlpha = this.gl.ONE;
        const dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
        const shaderSet = this._shaderSets[10]; // ShaderNames_Copy = 10
        this.gl.useProgram(shaderSet.shaderProgram);
        this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.r, baseColor.g, baseColor.b, baseColor.a);
        // オフスクリーンの内容を設定
        this.gl.activeTexture(this.gl.TEXTURE0);
        const tex = renderer.getModelRenderTarget(0).getColorBuffer();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
        // 頂点位置属性の設定
        if (!renderer._bufferData.vertex) {
            renderer._bufferData.vertex = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, s_renderTargetVertexArray, this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
        this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 2, 0);
        // テクスチャ座標属性の設定
        if (!renderer._bufferData.uv) {
            renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, s_renderTargetUvArray, this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
        this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 2, 0);
        this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
    }
    /**
     * シェーダープログラムを解放する
     */
    releaseShaderProgram() {
        for (let i = 0; i < this._shaderSets.length; i++) {
            this.gl.deleteProgram(this._shaderSets[i].shaderProgram);
            this._shaderSets[i].shaderProgram = 0;
            this._shaderSets[i] = void 0;
            this._shaderSets[i] = null;
        }
    }
    /**
     * シェーダープログラムを初期化する
     *
     * @param vertShaderSrc 頂点シェーダのソース
     * @param fragShaderSrc フラグメントシェーダのソース
     */
    generateShaders() {
        if (this._isShaderLoading) {
            return;
        }
        this._isShaderLoading = true;
        this._isShaderLoaded = false;
        this._shaderSets.length = this._shaderCount;
        for (let i = 0; i < this._shaderCount; i++) {
            this._shaderSets[i] = new CubismShaderSet();
        }
        // シェーダーのソースの読み込み
        this.loadShaders()
            .then(() => {
            // NOTE: ファイルの読み込みを待つ必要があるためこのようにする
            this.registerShader(); // 通常シェーダーの登録
            this.registerBlendShader(); // ブレンドモードシェーダーの登録
            this._isShaderLoading = false;
            this._isShaderLoaded = true;
        })
            .catch(error => {
            this._isShaderLoading = false;
            console.error('Failed to load shaders:', error);
        });
    }
    /**
     * シェーダープログラムを登録する
     */
    registerShader() {
        const vertexShaderSrc = this._vertShaderSrc;
        const vertexShaderSrcMasked = this._vertShaderSrcMasked;
        const vertexShaderSrcSetupMask = this._vertShaderSrcSetupMask;
        const fragmentShaderSrcSetupMask = this._fragShaderSrcSetupMask;
        const fragmentShaderSrcPremultipliedAlpha = this._fragShaderSrcPremultipliedAlpha;
        const fragmentShaderSrcMaskPremultipliedAlpha = this._fragShaderSrcMaskPremultipliedAlpha;
        const fragmentShaderSrcMaskInvertedPremultipliedAlpha = this._fragShaderSrcMaskInvertedPremultipliedAlpha;
        this._shaderSets[0].shaderProgram = this.loadShaderProgram(vertexShaderSrcSetupMask, fragmentShaderSrcSetupMask);
        this._shaderSets[1].shaderProgram = this.loadShaderProgram(vertexShaderSrc, fragmentShaderSrcPremultipliedAlpha);
        this._shaderSets[2].shaderProgram = this.loadShaderProgram(vertexShaderSrcMasked, fragmentShaderSrcMaskPremultipliedAlpha);
        this._shaderSets[3].shaderProgram = this.loadShaderProgram(vertexShaderSrcMasked, fragmentShaderSrcMaskInvertedPremultipliedAlpha);
        // 加算も通常と同じシェーダーを利用する
        this._shaderSets[4].shaderProgram = this._shaderSets[1].shaderProgram;
        this._shaderSets[5].shaderProgram = this._shaderSets[2].shaderProgram;
        this._shaderSets[6].shaderProgram = this._shaderSets[3].shaderProgram;
        // 乗算も通常と同じシェーダーを利用する
        this._shaderSets[7].shaderProgram = this._shaderSets[1].shaderProgram;
        this._shaderSets[8].shaderProgram = this._shaderSets[2].shaderProgram;
        this._shaderSets[9].shaderProgram = this._shaderSets[3].shaderProgram;
        // SetupMask
        this._shaderSets[0].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[0].shaderProgram, 'a_position');
        this._shaderSets[0].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[0].shaderProgram, 'a_texCoord');
        this._shaderSets[0].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[0].shaderProgram, 's_texture0');
        this._shaderSets[0].uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets[0].shaderProgram, 'u_clipMatrix');
        this._shaderSets[0].uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets[0].shaderProgram, 'u_channelFlag');
        this._shaderSets[0].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[0].shaderProgram, 'u_baseColor');
        // 通常（PremultipliedAlpha）
        this._shaderSets[1].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[1].shaderProgram, 'a_position');
        this._shaderSets[1].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[1].shaderProgram, 'a_texCoord');
        this._shaderSets[1].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[1].shaderProgram, 's_texture0');
        this._shaderSets[1].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[1].shaderProgram, 'u_matrix');
        this._shaderSets[1].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[1].shaderProgram, 'u_baseColor');
        this._shaderSets[1].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[1].shaderProgram, 'u_multiplyColor');
        this._shaderSets[1].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[1].shaderProgram, 'u_screenColor');
        // 通常（クリッピング、PremultipliedAlpha）
        this._shaderSets[2].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[2].shaderProgram, 'a_position');
        this._shaderSets[2].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[2].shaderProgram, 'a_texCoord');
        this._shaderSets[2].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[2].shaderProgram, 's_texture0');
        this._shaderSets[2].samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets[2].shaderProgram, 's_texture1');
        this._shaderSets[2].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[2].shaderProgram, 'u_matrix');
        this._shaderSets[2].uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets[2].shaderProgram, 'u_clipMatrix');
        this._shaderSets[2].uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets[2].shaderProgram, 'u_channelFlag');
        this._shaderSets[2].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[2].shaderProgram, 'u_baseColor');
        this._shaderSets[2].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[2].shaderProgram, 'u_multiplyColor');
        this._shaderSets[2].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[2].shaderProgram, 'u_screenColor');
        // 通常（クリッピング・反転, PremultipliedAlpha）
        this._shaderSets[3].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[3].shaderProgram, 'a_position');
        this._shaderSets[3].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[3].shaderProgram, 'a_texCoord');
        this._shaderSets[3].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[3].shaderProgram, 's_texture0');
        this._shaderSets[3].samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets[3].shaderProgram, 's_texture1');
        this._shaderSets[3].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[3].shaderProgram, 'u_matrix');
        this._shaderSets[3].uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets[3].shaderProgram, 'u_clipMatrix');
        this._shaderSets[3].uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets[3].shaderProgram, 'u_channelFlag');
        this._shaderSets[3].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[3].shaderProgram, 'u_baseColor');
        this._shaderSets[3].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[3].shaderProgram, 'u_multiplyColor');
        this._shaderSets[3].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[3].shaderProgram, 'u_screenColor');
        // 加算（PremultipliedAlpha）
        this._shaderSets[4].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[4].shaderProgram, 'a_position');
        this._shaderSets[4].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[4].shaderProgram, 'a_texCoord');
        this._shaderSets[4].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[4].shaderProgram, 's_texture0');
        this._shaderSets[4].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[4].shaderProgram, 'u_matrix');
        this._shaderSets[4].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[4].shaderProgram, 'u_baseColor');
        this._shaderSets[4].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[4].shaderProgram, 'u_multiplyColor');
        this._shaderSets[4].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[4].shaderProgram, 'u_screenColor');
        // 加算（クリッピング、PremultipliedAlpha）
        this._shaderSets[5].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[5].shaderProgram, 'a_position');
        this._shaderSets[5].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[5].shaderProgram, 'a_texCoord');
        this._shaderSets[5].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[5].shaderProgram, 's_texture0');
        this._shaderSets[5].samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets[5].shaderProgram, 's_texture1');
        this._shaderSets[5].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[5].shaderProgram, 'u_matrix');
        this._shaderSets[5].uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets[5].shaderProgram, 'u_clipMatrix');
        this._shaderSets[5].uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets[5].shaderProgram, 'u_channelFlag');
        this._shaderSets[5].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[5].shaderProgram, 'u_baseColor');
        this._shaderSets[5].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[5].shaderProgram, 'u_multiplyColor');
        this._shaderSets[5].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[5].shaderProgram, 'u_screenColor');
        // 加算（クリッピング・反転、PremultipliedAlpha）
        this._shaderSets[6].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[6].shaderProgram, 'a_position');
        this._shaderSets[6].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[6].shaderProgram, 'a_texCoord');
        this._shaderSets[6].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[6].shaderProgram, 's_texture0');
        this._shaderSets[6].samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets[6].shaderProgram, 's_texture1');
        this._shaderSets[6].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[6].shaderProgram, 'u_matrix');
        this._shaderSets[6].uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets[6].shaderProgram, 'u_clipMatrix');
        this._shaderSets[6].uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets[6].shaderProgram, 'u_channelFlag');
        this._shaderSets[6].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[6].shaderProgram, 'u_baseColor');
        this._shaderSets[6].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[6].shaderProgram, 'u_multiplyColor');
        this._shaderSets[6].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[6].shaderProgram, 'u_screenColor');
        // 乗算（PremultipliedAlpha）
        this._shaderSets[7].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[7].shaderProgram, 'a_position');
        this._shaderSets[7].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[7].shaderProgram, 'a_texCoord');
        this._shaderSets[7].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[7].shaderProgram, 's_texture0');
        this._shaderSets[7].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[7].shaderProgram, 'u_matrix');
        this._shaderSets[7].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[7].shaderProgram, 'u_baseColor');
        this._shaderSets[7].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[7].shaderProgram, 'u_multiplyColor');
        this._shaderSets[7].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[7].shaderProgram, 'u_screenColor');
        // 乗算（クリッピング、PremultipliedAlpha）
        this._shaderSets[8].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[8].shaderProgram, 'a_position');
        this._shaderSets[8].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[8].shaderProgram, 'a_texCoord');
        this._shaderSets[8].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[8].shaderProgram, 's_texture0');
        this._shaderSets[8].samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets[8].shaderProgram, 's_texture1');
        this._shaderSets[8].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[8].shaderProgram, 'u_matrix');
        this._shaderSets[8].uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets[8].shaderProgram, 'u_clipMatrix');
        this._shaderSets[8].uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets[8].shaderProgram, 'u_channelFlag');
        this._shaderSets[8].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[8].shaderProgram, 'u_baseColor');
        this._shaderSets[8].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[8].shaderProgram, 'u_multiplyColor');
        this._shaderSets[8].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[8].shaderProgram, 'u_screenColor');
        // 乗算（クリッピング・反転、PremultipliedAlpha）
        this._shaderSets[9].attributePositionLocation = this.gl.getAttribLocation(this._shaderSets[9].shaderProgram, 'a_position');
        this._shaderSets[9].attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets[9].shaderProgram, 'a_texCoord');
        this._shaderSets[9].samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets[9].shaderProgram, 's_texture0');
        this._shaderSets[9].samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets[9].shaderProgram, 's_texture1');
        this._shaderSets[9].uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets[9].shaderProgram, 'u_matrix');
        this._shaderSets[9].uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets[9].shaderProgram, 'u_clipMatrix');
        this._shaderSets[9].uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets[9].shaderProgram, 'u_channelFlag');
        this._shaderSets[9].uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets[9].shaderProgram, 'u_baseColor');
        this._shaderSets[9].uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets[9].shaderProgram, 'u_multiplyColor');
        this._shaderSets[9].uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets[9].shaderProgram, 'u_screenColor');
    }
    /**
     * ブレンドモード用のシェーダープログラムを登録する
     */
    registerBlendShader() {
        // コピー用シェーダーの設定
        const vertShaderSrcCopy = this._vertShaderSrcCopy;
        const fragShaderSrcCopy = this._fragShaderSrcCopy;
        const copyShaderSet = this._shaderSets[10]; // ShaderNames.Copy = 10
        copyShaderSet.shaderProgram = this.loadShaderProgram(vertShaderSrcCopy, fragShaderSrcCopy);
        copyShaderSet.attributeTexCoordLocation = this.gl.getAttribLocation(copyShaderSet.shaderProgram, 'a_texCoord');
        copyShaderSet.attributePositionLocation = this.gl.getAttribLocation(copyShaderSet.shaderProgram, 'a_position');
        copyShaderSet.uniformBaseColorLocation = this.gl.getUniformLocation(copyShaderSet.shaderProgram, 'u_baseColor');
        let shaderSetIndex = 11;
        // ブレンドモード用シェーダーの設定
        for (let colorBlendIndex = 0; colorBlendIndex < this._colorBlendValues.length; colorBlendIndex++) {
            // NONEと後方互換はスキップ
            if (this._colorBlendValues[colorBlendIndex] ==
                CubismColorBlend.ColorBlend_None ||
                this._colorBlendValues[colorBlendIndex] ==
                    CubismColorBlend.ColorBlend_AddCompatible ||
                this._colorBlendValues[colorBlendIndex] ==
                    CubismColorBlend.ColorBlend_MultiplyCompatible) {
                continue;
            }
            // カラーブレンド用のマクロ
            const colorBlendValue = this._colorBlendValues[colorBlendIndex];
            const colorBlendName = this._colorBlendMap
                .get(colorBlendValue)
                .toUpperCase();
            const colorBlendMacro = `#define COLOR_BLEND_${colorBlendName}\n`;
            for (let alphablendIndex = 0; alphablendIndex < this._alphaBlendValues.length; alphablendIndex++) {
                // NONEと、カラーブレンド「Normal」かつアルファブレンド「Over」はスキップ
                if (this._alphaBlendValues[alphablendIndex] ==
                    CubismAlphaBlend.AlphaBlend_None ||
                    (this._colorBlendValues[colorBlendIndex] ==
                        CubismColorBlend.ColorBlend_Normal &&
                        this._alphaBlendValues[alphablendIndex] ==
                            CubismAlphaBlend.AlphaBlend_Over)) {
                    continue;
                }
                // アルファブレンド用のマクロ
                const alphaBlendValue = this._alphaBlendValues[alphablendIndex];
                const alphaBlendName = this._alphaBlendMap
                    .get(alphaBlendValue)
                    .toUpperCase();
                const alphaBlendMacro = `#define ALPHA_BLEND_${alphaBlendName}\n`;
                // シェーダーのソースを生成
                this.generateBlendShader(colorBlendMacro, alphaBlendMacro, shaderSetIndex);
                this._blendShaderSetMap.set(this._colorBlendMap.get(this._colorBlendValues[colorBlendIndex]) +
                    this._alphaBlendMap.get(this._alphaBlendValues[alphablendIndex]), shaderSetIndex);
                // 1つの組み合わせが終わるこのタイミングでシェーダーのインデックスを更新
                shaderSetIndex += ShaderType.ShaderType_Count;
            }
        }
    }
    /**
     * ブレンドモード用のシェーダープログラムを生成する
     *
     * @param colorBlendMacro カラーブレンド用のマクロ
     * @param alphaBlendMacro アルファブレンド用のマクロ
     * @param shaderSetBaseIndex _shaderSets のインデックス
     */
    generateBlendShader(colorBlendMacro, alphaBlendMacro, shaderSetBaseIndex) {
        for (let shaderTypeIndex = 0; shaderTypeIndex < ShaderType.ShaderType_Count; shaderTypeIndex++) {
            // ループごとにシェーダーのソースを初期化
            let vertexShaderSrc = '';
            let fragmentShaderStr = 'precision mediump float;\n';
            // シェーダの種類が変わるたびにインデックスを変更
            const shaderSetIndex = shaderSetBaseIndex + shaderTypeIndex;
            // マクロの定義
            fragmentShaderStr += colorBlendMacro;
            fragmentShaderStr += alphaBlendMacro;
            // ブレンドモードの種類に応じたマクロの定義
            fragmentShaderStr += this._fragShaderSrcColorBlend;
            fragmentShaderStr += this._fragShaderSrcAlphaBlend;
            // シェーダの種類に応じたマクロの定義
            if (shaderTypeIndex == ShaderType.ShaderType_Masked ||
                shaderTypeIndex == ShaderType.ShaderType_MaskedInverted) {
                const clippingMaskMacro = '#define CLIPPING_MASK\n';
                vertexShaderSrc += clippingMaskMacro;
                fragmentShaderStr += clippingMaskMacro;
            }
            // シェーダの本体のソースをファイルから読み込み
            vertexShaderSrc += this._vertShaderSrcBlend;
            fragmentShaderStr += this._fragShaderSrcBlend;
            // シェーダープログラムの生成
            this._shaderSets[shaderSetIndex].shaderProgram = this.loadShaderProgram(vertexShaderSrc, fragmentShaderStr);
            // シェーダープログラムへの変数のリンク
            this._shaderSets[shaderSetIndex].attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'a_position');
            this._shaderSets[shaderSetIndex].attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'a_texCoord');
            this._shaderSets[shaderSetIndex].samplerTexture0Location =
                this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 's_texture0');
            this._shaderSets[shaderSetIndex].uniformMatrixLocation =
                this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'u_matrix');
            this._shaderSets[shaderSetIndex].uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'u_baseColor');
            this._shaderSets[shaderSetIndex].uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'u_multiplyColor');
            this._shaderSets[shaderSetIndex].uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'u_screenColor');
            // ブレンドモード用のテクスチャ
            this._shaderSets[shaderSetIndex].samplerFrameBufferTextureLocation =
                this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 's_blendTexture');
            // クリップ対象の場合
            if (shaderTypeIndex == ShaderType.ShaderType_Masked ||
                shaderTypeIndex == ShaderType.ShaderType_MaskedInverted) {
                // マスク用テクスチャ
                this._shaderSets[shaderSetIndex].samplerTexture1Location =
                    this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 's_texture1');
                // クリップ用の行列
                this._shaderSets[shaderSetIndex].uniformClipMatrixLocation =
                    this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'u_clipMatrix');
                // チャンネルフラグ
                this._shaderSets[shaderSetIndex].uniformChannelFlagLocation =
                    this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'u_channelFlag');
                // 反転マスク用の値（反転なら 1.0 が代入される）
                this._shaderSets[shaderSetIndex].uniformInvertMaskFlagLocation =
                    this.gl.getUniformLocation(this._shaderSets[shaderSetIndex].shaderProgram, 'u_invertClippingMask');
            }
        }
    }
    /**
     * シェーダプログラムをロードしてアドレスを返す
     *
     * @param vertexShaderSource    頂点シェーダのソース
     * @param fragmentShaderSource  フラグメントシェーダのソース
     *
     * @return シェーダプログラムのアドレス
     */
    loadShaderProgram(vertexShaderSource, fragmentShaderSource) {
        // Create Shader Program
        let shaderProgram = this.gl.createProgram();
        let vertShader = this.compileShaderSource(this.gl.VERTEX_SHADER, vertexShaderSource);
        if (!vertShader) {
            CubismLogError('Vertex shader compile error!');
            return 0;
        }
        let fragShader = this.compileShaderSource(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!fragShader) {
            CubismLogError('Fragment shader compile error!');
            return 0;
        }
        // Attach vertex shader to program
        this.gl.attachShader(shaderProgram, vertShader);
        // Attach fragment shader to program
        this.gl.attachShader(shaderProgram, fragShader);
        // link program
        this.gl.linkProgram(shaderProgram);
        const linkStatus = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
        // リンクに失敗したらシェーダーを削除
        if (!linkStatus) {
            CubismLogError('Failed to link program: {0}', shaderProgram);
            this.gl.deleteShader(vertShader);
            vertShader = 0;
            this.gl.deleteShader(fragShader);
            fragShader = 0;
            if (shaderProgram) {
                this.gl.deleteProgram(shaderProgram);
                shaderProgram = 0;
            }
            return 0;
        }
        // Release vertex and fragment shaders.
        this.gl.deleteShader(vertShader);
        this.gl.deleteShader(fragShader);
        return shaderProgram;
    }
    /**
     * シェーダープログラムをコンパイルする
     *
     * @param shaderType シェーダタイプ(Vertex/Fragment)
     * @param shaderSource シェーダソースコード
     *
     * @return コンパイルされたシェーダープログラム
     */
    compileShaderSource(shaderType, shaderSource) {
        const source = shaderSource;
        const shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!shader) {
            const log = this.gl.getShaderInfoLog(shader);
            CubismLogError('Shader compile log: {0} ', log);
        }
        const status = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!status) {
            const log = this.gl.getShaderInfoLog(shader);
            CubismLogError('Shader compile log: {0} ', log);
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    /**
     * WebGLレンダリングコンテキストを設定する
     *
     * @param gl WebGLレンダリングコンテキスト
     */
    setGl(gl) {
        this.gl = gl;
    }
    /**
     * ブレンドモード用のシェーダーパスを設定する
     *
     * @param shaderPath シェーダーパス
     */
    setShaderPath(shaderPath) {
        this._shaderPath = shaderPath;
    }
    /**
     * シェーダーパスを取得する
     *
     * @return シェーダーパス
     */
    getShaderPath() {
        return this._shaderPath;
    }
}
/**
 * GLContextごとにCubismShader_WebGLを確保するためのクラス
 * シングルトンなクラスであり、CubismShaderManager_WebGL.getInstanceからアクセスする。
 */
class CubismShaderManager_WebGL {
    /**
     * インスタンスを取得する（シングルトン）
     *
     * @return インスタンス
     */
    static getInstance() {
        if (s_instance == null) {
            s_instance = new CubismShaderManager_WebGL();
        }
        return s_instance;
    }
    /**
     * インスタンスを開放する（シングルトン）
     */
    static deleteInstance() {
        if (s_instance) {
            s_instance.release();
            s_instance = null;
        }
    }
    /**
     * Privateなコンストラクタ
     */
    constructor() {
        this._shaderMap = new Map();
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        for (const item of this._shaderMap) {
            item[1].release();
        }
        this._shaderMap.clear();
    }
    /**
     * GLContextをキーにShaderを取得する
     *
     * @param gl glコンテキスト
     *
     * @return shaderを返す
     */
    getShader(gl) {
        return this._shaderMap.get(gl);
    }
    /**
     * GLContextを登録する
     *
     * @param gl glコンテキスト
     */
    setGlContext(gl) {
        if (!this._shaderMap.has(gl)) {
            const instance = new CubismShader_WebGL();
            instance.setGl(gl);
            this._shaderMap.set(gl, instance);
        }
    }
}
/**
 * CubismShader_WebGLのインナークラス
 */
class CubismShaderSet {
}
/**
 * シェーダーの名前を定義する列挙型
 */
var ShaderNames;
(function (ShaderNames) {
    // SetupMask
    ShaderNames[ShaderNames["ShaderNames_SetupMask"] = 0] = "ShaderNames_SetupMask";
    // Normal
    ShaderNames[ShaderNames["ShaderNames_NormalPremultipliedAlpha"] = 1] = "ShaderNames_NormalPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_NormalMaskedPremultipliedAlpha"] = 2] = "ShaderNames_NormalMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_NomralMaskedInvertedPremultipliedAlpha"] = 3] = "ShaderNames_NomralMaskedInvertedPremultipliedAlpha";
    // Add
    ShaderNames[ShaderNames["ShaderNames_AddPremultipliedAlpha"] = 4] = "ShaderNames_AddPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlpha"] = 5] = "ShaderNames_AddMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlphaInverted"] = 6] = "ShaderNames_AddMaskedPremultipliedAlphaInverted";
    // Mult
    ShaderNames[ShaderNames["ShaderNames_MultPremultipliedAlpha"] = 7] = "ShaderNames_MultPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlpha"] = 8] = "ShaderNames_MultMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlphaInverted"] = 9] = "ShaderNames_MultMaskedPremultipliedAlphaInverted";
    // ShaderCount
    ShaderNames[ShaderNames["ShaderNames_ShaderCount"] = 10] = "ShaderNames_ShaderCount";
})(ShaderNames || (ShaderNames = {}));
/**
 * シェーダーの種類を定義する列挙型
 */
var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["ShaderType_Normal"] = 0] = "ShaderType_Normal";
    ShaderType[ShaderType["ShaderType_Masked"] = 1] = "ShaderType_Masked";
    ShaderType[ShaderType["ShaderType_MaskedInverted"] = 2] = "ShaderType_MaskedInverted";
    ShaderType[ShaderType["ShaderType_Count"] = 3] = "ShaderType_Count";
})(ShaderType || (ShaderType = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$2;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismShaderSet = CubismShaderSet;
    Live2DCubismFramework.CubismShader_WebGL = CubismShader_WebGL;
    Live2DCubismFramework.CubismShaderManager_WebGL = CubismShaderManager_WebGL;
    Live2DCubismFramework.ShaderNames = ShaderNames;
})(Live2DCubismFramework$2 || (Live2DCubismFramework$2 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * フレームバッファなどのコンテナのクラス
 */
class CubismRenderTargetContainer {
    /**
     * Constructor
     *
     * @param colorBuffer カラーバッファ
     * @param renderTexture レンダーテクスチャ
     * @param inUse 使用中かどうか
     */
    constructor(colorBuffer = null, renderTexture = null, inUse = false) {
        this.colorBuffer = colorBuffer;
        this.renderTexture = renderTexture;
        this.inUse = inUse;
    }
    clear() {
        this.colorBuffer = null;
        this.renderTexture = null;
        this.inUse = false;
    }
    /**
     * カラーバッファを取得
     *
     * @returns カラーバッファ
     */
    getColorBuffer() {
        return this.colorBuffer;
    }
    /**
     * レンダーテクスチャを取得
     *
     * @returns レンダーテクスチャ
     */
    getRenderTexture() {
        return this.renderTexture;
    }
}
/**
 * WebGLContextごとのリソース管理を行う内部クラス
 */
class CubismWebGLContextManager {
    constructor(gl) {
        this.gl = gl;
        this.offscreenRenderTargetContainers =
            new Array();
        this.previousActiveRenderTextureMaxCount = 0;
        this.currentActiveRenderTextureCount = 0;
        this.hasResetThisFrame = false;
        this.width = 0;
        this.height = 0;
    }
    release() {
        if (this.offscreenRenderTargetContainers != null) {
            for (let index = 0; index < this.offscreenRenderTargetContainers.length; ++index) {
                const container = this.offscreenRenderTargetContainers[index];
                this.gl.deleteTexture(container.colorBuffer);
                this.gl.deleteFramebuffer(container.renderTexture);
            }
            this.offscreenRenderTargetContainers.length = 0;
            this.offscreenRenderTargetContainers = null;
        }
    }
}
/**
 * WebGL用オフスクリーン描画機能を管理するマネージャ
 * オフスクリーン描画機能に必要なフレームバッファなどを含むコンテナを管理する。
 * 複数のWebGLContextに対応。
 */
class CubismWebGLOffscreenManager {
    /**
     * コンストラクタ
     */
    constructor() {
        this._contextManagers = new Map();
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        if (this._contextManagers != null) {
            for (const manager of this._contextManagers.values()) {
                manager.release();
            }
            this._contextManagers.clear();
            this._contextManagers = null;
        }
        CubismWebGLOffscreenManager._instance = null;
    }
    /**
     * インスタンスの取得
     *
     * @return インスタンス
     */
    static getInstance() {
        if (this._instance == null) {
            this._instance = new CubismWebGLOffscreenManager();
        }
        return this._instance;
    }
    /**
     * WebGLContextに対応するマネージャーを取得または作成
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @return WebGLContextManager
     */
    getContextManager(gl) {
        if (!this._contextManagers.has(gl)) {
            this._contextManagers.set(gl, new CubismWebGLContextManager(gl));
        }
        return this._contextManagers.get(gl);
    }
    /**
     * 指定されたWebGLContextのマネージャーを削除
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     */
    removeContext(gl) {
        if (this._contextManagers.has(gl)) {
            const manager = this._contextManagers.get(gl);
            manager.release();
            this._contextManagers.delete(gl);
        }
    }
    /**
     * 初期化処理
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @param width 幅
     * @param height 高さ
     */
    initialize(gl, width, height) {
        const contextManager = this.getContextManager(gl);
        // initialize offscreenRenderTargetContainers
        if (contextManager.offscreenRenderTargetContainers != null) {
            for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
                const container = contextManager.offscreenRenderTargetContainers[index];
                contextManager.gl.deleteTexture(container.colorBuffer);
                contextManager.gl.deleteFramebuffer(container.renderTexture);
                container.clear();
            }
            contextManager.offscreenRenderTargetContainers.length = 0;
        }
        else {
            contextManager.offscreenRenderTargetContainers =
                new Array();
        }
        contextManager.width = width;
        contextManager.height = height;
        contextManager.previousActiveRenderTextureMaxCount = 0;
        contextManager.currentActiveRenderTextureCount = 0;
        contextManager.hasResetThisFrame = false;
    }
    /**
     * モデルを描画する前に呼び出すフレーム開始時の処理を行う
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     */
    beginFrameProcess(gl) {
        const contextManager = this.getContextManager(gl);
        if (contextManager.hasResetThisFrame) {
            return;
        }
        contextManager.previousActiveRenderTextureMaxCount = 0;
        contextManager.hasResetThisFrame = true;
    }
    /**
     * モデルの描画が終わった後に呼び出すフレーム終了時の処理
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     */
    endFrameProcess(gl) {
        const contextManager = this.getContextManager(gl);
        contextManager.hasResetThisFrame = false;
    }
    /**
     * コンテナサイズの取得
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     */
    getContainerSize(gl) {
        const contextManager = this.getContextManager(gl);
        if (contextManager.offscreenRenderTargetContainers == null) {
            return 0;
        }
        return contextManager.offscreenRenderTargetContainers.length;
    }
    /**
     * 使用可能なリソースコンテナの取得
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @param width 幅
     * @param height 高さ
     * @param previousFramebuffer 前のフレームバッファ
     * @return 使用可能なリソースコンテナ
     */
    getOffscreenRenderTargetContainers(gl, width, height, previousFramebuffer) {
        const contextManager = this.getContextManager(gl);
        // コンテナが初期化されていないか、サイズが変わったら初期化し直す
        if (contextManager.width != width ||
            contextManager.height != height ||
            contextManager.offscreenRenderTargetContainers == null) {
            this.initialize(gl, width, height);
        }
        // 使用数を更新
        this.updateRenderTargetContainerCount(gl);
        // 使われていないリソースコンテナがあればそれを返す
        const container = this.getUnusedOffscreenRenderTargetContainer(gl);
        if (container != null) {
            return container;
        }
        // 使われていないリソースコンテナがなければ新たに作成する
        const offscreenRenderTextureContainer = this.createOffscreenRenderTargetContainer(gl, width, height, previousFramebuffer);
        return offscreenRenderTextureContainer;
    }
    /**
     * リソースコンテナの使用状態を取得
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @param renderTexture WebGLFramebuffer
     * @return 使用中はtrue、未使用の場合はfalse
     */
    getUsingRenderTextureState(gl, renderTexture) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
            if (contextManager.offscreenRenderTargetContainers[index].renderTexture ==
                renderTexture) {
                return contextManager.offscreenRenderTargetContainers[index].inUse;
            }
        }
        return true;
    }
    /**
     * リソースコンテナの使用を開始する。
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @param renderTexture WebGLFramebuffer
     */
    startUsingRenderTexture(gl, renderTexture) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
            if (contextManager.offscreenRenderTargetContainers[index].renderTexture !=
                renderTexture) {
                continue;
            }
            contextManager.offscreenRenderTargetContainers[index].inUse = true;
            this.updateRenderTargetContainerCount(gl);
            break;
        }
    }
    /**
     * リソースコンテナの使用を終了する。
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @param renderTexture WebGLFramebuffer
     */
    stopUsingRenderTexture(gl, renderTexture) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
            if (contextManager.offscreenRenderTargetContainers[index].renderTexture !=
                renderTexture) {
                continue;
            }
            contextManager.offscreenRenderTargetContainers[index].inUse = false;
            contextManager.currentActiveRenderTextureCount--;
            if (contextManager.currentActiveRenderTextureCount < 0) {
                contextManager.currentActiveRenderTextureCount = 0;
            }
            break;
        }
    }
    /**
     * リソースコンテナの使用を全て終了する。
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     */
    stopUsingAllRenderTextures(gl) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
            contextManager.offscreenRenderTargetContainers[index].inUse = false;
        }
        contextManager.currentActiveRenderTextureCount = 0;
    }
    /**
     * 使用されていないリソースコンテナを解放する。
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     */
    releaseStaleRenderTextures(gl) {
        const contextManager = this.getContextManager(gl);
        const listSize = contextManager.offscreenRenderTargetContainers.length;
        if (contextManager.hasResetThisFrame || listSize === 0) {
            // 使用する量が変化する場合は開放しない
            return;
        }
        // 未使用な場所を開放して直前の最大数までリサイズする
        let findPos = 0;
        let resize = contextManager.previousActiveRenderTextureMaxCount;
        for (let i = listSize; contextManager.previousActiveRenderTextureMaxCount < i; --i) {
            const index = i - 1;
            if (contextManager.offscreenRenderTargetContainers[index].inUse) {
                // 空いている場所探して移動させる
                let isFind = false;
                for (; findPos < contextManager.previousActiveRenderTextureMaxCount; ++findPos) {
                    if (!contextManager.offscreenRenderTargetContainers[findPos].inUse) {
                        const tempContainer = contextManager.offscreenRenderTargetContainers[findPos];
                        contextManager.offscreenRenderTargetContainers[findPos] =
                            contextManager.offscreenRenderTargetContainers[index];
                        contextManager.offscreenRenderTargetContainers[findPos].inUse =
                            true;
                        contextManager.offscreenRenderTargetContainers[index] =
                            tempContainer;
                        contextManager.offscreenRenderTargetContainers[index].inUse = false;
                        isFind = true;
                        break;
                    }
                }
                if (!isFind) {
                    // 空いている場所が見つからなかったら現状のサイズでリサイズする
                    resize = i;
                    break;
                }
            }
            const container = contextManager.offscreenRenderTargetContainers[index];
            contextManager.gl.bindTexture(contextManager.gl.TEXTURE_2D, null);
            contextManager.gl.deleteTexture(container.colorBuffer);
            contextManager.gl.bindFramebuffer(contextManager.gl.FRAMEBUFFER, null);
            contextManager.gl.deleteFramebuffer(container.renderTexture);
            container.clear();
        }
        updateSize(contextManager.offscreenRenderTargetContainers, resize);
    }
    /**
     * 直前のアクティブなレンダーターゲットの最大数を取得
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @returns 直前のアクティブなレンダーターゲットの最大数
     */
    getPreviousActiveRenderTextureCount(gl) {
        const contextManager = this.getContextManager(gl);
        return contextManager.previousActiveRenderTextureMaxCount;
    }
    /**
     * 現在のアクティブなレンダーターゲットの数を取得
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @returns 現在のアクティブなレンダーターゲットの数
     */
    getCurrentActiveRenderTextureCount(gl) {
        const contextManager = this.getContextManager(gl);
        return contextManager.currentActiveRenderTextureCount;
    }
    /**
     * 現在のアクティブなレンダーターゲットの数を更新
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     */
    updateRenderTargetContainerCount(gl) {
        const contextManager = this.getContextManager(gl);
        ++contextManager.currentActiveRenderTextureCount;
        // 最大数更新
        contextManager.previousActiveRenderTextureMaxCount =
            contextManager.currentActiveRenderTextureCount >
                contextManager.previousActiveRenderTextureMaxCount
                ? contextManager.currentActiveRenderTextureCount
                : contextManager.previousActiveRenderTextureMaxCount;
    }
    /**
     * 使用されていないリソースコンテナの取得
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @return 使用されていないリソースコンテナ
     */
    getUnusedOffscreenRenderTargetContainer(gl) {
        const contextManager = this.getContextManager(gl);
        // 使われていないリソースコンテナがあればそれを返す
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
            const container = contextManager.offscreenRenderTargetContainers[index];
            if (container.inUse == false) {
                container.inUse = true;
                return container;
            }
        }
        return null;
    }
    /**
     * 新たにリソースコンテナを作成する。
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     * @param width 幅
     * @param height 高さ
     * @param previousFramebuffer 前のフレームバッファ
     * @return 作成されたリソースコンテナ
     */
    createOffscreenRenderTargetContainer(gl, width, height, previousFramebuffer) {
        const renderTarget = new CubismRenderTarget_WebGL();
        if (!renderTarget.createRenderTarget(gl, width, height, previousFramebuffer)) {
            CubismLogError('Failed to create offscreen render texture.');
            return null;
        }
        const offscreenRenderTextureContainer = new CubismRenderTargetContainer(renderTarget.getColorBuffer(), renderTarget.getRenderTexture(), true);
        const contextManager = this.getContextManager(gl);
        contextManager.offscreenRenderTargetContainers.push(offscreenRenderTextureContainer);
        return offscreenRenderTextureContainer;
    }
}

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * WebGL用オフスクリーンサーフェス
 * マスクの描画及びオフスクリーン機能に必要なフレームバッファなどを管理する。
 */
class CubismOffscreenRenderTarget_WebGL extends CubismRenderTarget_WebGL {
    /**
     * リソースコンテナマネージャを初期化する。
     *
     * @param displayBufferWidth レンダーターゲットの幅
     * @param displayBufferHeight レンダーターゲットの高さ
     */
    initializeOffscreenManager(gl, displayBufferWidth, displayBufferHeight) {
        this._gl = gl;
        this._webGLOffscreenManager = CubismWebGLOffscreenManager.getInstance();
        if (this._webGLOffscreenManager.getContainerSize(gl) === 0) {
            this._webGLOffscreenManager.initialize(gl, displayBufferWidth, displayBufferHeight);
        }
    }
    /**
     * オフスクリーン描画用レンダーターゲットをセットする。
     *
     * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
     *          NOTE: Cubism 5.3以降のモデルが使用される場合はWebGL2RenderingContextを使用すること。
     * @param displayBufferWidth レンダーターゲットの幅
     * @param displayBufferHeight レンダーターゲットの高さ
     * @param previousFramebuffer 前のフレームバッファ
     */
    setOffscreenRenderTarget(gl, displayBufferWidth, displayBufferHeight, previousFramebuffer) {
        // マネージャがなければ初期化
        if (this._webGLOffscreenManager == null) {
            this.initializeOffscreenManager(gl, displayBufferWidth, displayBufferHeight);
        }
        // 使用可能なリソースコンテナを取得する
        const offscreenRenderTargetContainer = this._webGLOffscreenManager.getOffscreenRenderTargetContainers(gl, displayBufferWidth, displayBufferHeight, previousFramebuffer);
        if (offscreenRenderTargetContainer == null) {
            CubismLogError('Failed to acquire offscreen render texture container.');
            return;
        }
        this._colorBuffer = offscreenRenderTargetContainer.getColorBuffer();
        this._renderTexture = offscreenRenderTargetContainer.getRenderTexture();
        this._bufferWidth = displayBufferWidth;
        this._bufferHeight = displayBufferHeight;
        this._gl = gl;
        if (this._renderTexture == null) {
            this._renderTexture = previousFramebuffer;
            CubismLogError('Failed to create offscreen render texture.');
        }
        return;
    }
    /**
     * リソースコンテナの使用状態を取得
     *
     * @return 使用中はtrue、未使用の場合はfalse
     */
    getUsingRenderTextureState() {
        if (this._webGLOffscreenManager == null || this._gl == null) {
            return true;
        }
        return this._webGLOffscreenManager.getUsingRenderTextureState(this._gl, this._renderTexture);
    }
    /**
     * リソースコンテナの使用を開始する。
     */
    startUsingRenderTexture() {
        if (this._webGLOffscreenManager == null || this._gl == null) {
            return;
        }
        this._webGLOffscreenManager.startUsingRenderTexture(this._gl, this._renderTexture);
    }
    /**
     * リソースコンテナの使用を終了する。
     */
    stopUsingRenderTexture() {
        if (this._webGLOffscreenManager == null || this._gl == null) {
            return;
        }
        this._webGLOffscreenManager.stopUsingRenderTexture(this._gl, this._renderTexture);
    }
    /**
     * オフスクリーンのインデックスを設定する。
     *
     * @param offscreenIndex オフスクリーンのインデックス
     */
    setOffscreenIndex(offscreenIndex) {
        this._offscreenIndex = offscreenIndex;
    }
    /**
     * オフスクリーンのインデックスを取得する。
     *
     * @return オフスクリーンのインデックス
     */
    getOffscreenIndex() {
        return this._offscreenIndex;
    }
    /**
     * 以前のオフスクリーン描画用レンダーターゲットを設定する。
     *
     * @param oldOffscreen 以前のオフスクリーン描画用レンダーターゲット
     */
    setOldOffscreen(oldOffscreen) {
        this._oldOffscreen = oldOffscreen;
    }
    /**
     * 以前のオフスクリーン描画用レンダーターゲットを取得する。
     *
     * @return 以前のオフスクリーン描画用レンダーターゲット
     */
    getOldOffscreen() {
        return this._oldOffscreen;
    }
    /**
     * 親のオフスクリーン描画用レンダーターゲットを設定する。
     *
     * @param parentOffscreenRenderTarget 親のオフスクリーン描画用レンダーターゲット
     */
    setParentPartOffscreen(parentOffscreenRenderTarget) {
        this._parentOffscreenRenderTarget = parentOffscreenRenderTarget;
    }
    /**
     * 親のオフスクリーン描画用レンダーターゲットを取得する。
     *
     * @return 親のオフスクリーン描画用レンダーターゲット
     */
    getParentPartOffscreen() {
        return this._parentOffscreenRenderTarget;
    }
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this._offscreenIndex = -1;
        this._parentOffscreenRenderTarget = null;
        this._oldOffscreen = null;
        this._webGLOffscreenManager = null;
    }
    release() {
        if (this._webGLOffscreenManager != null &&
            this._gl != null &&
            this._renderTexture != null) {
            this._webGLOffscreenManager.stopUsingRenderTexture(this._gl, this._renderTexture);
        }
        if (this._colorBuffer && this._gl) {
            this._gl.deleteTexture(this._colorBuffer);
            this._colorBuffer = null;
        }
        if (this._renderTexture && this._gl) {
            this._gl.deleteFramebuffer(this._renderTexture);
            this._renderTexture = null;
        }
        if (this._webGLOffscreenManager != null) {
            this._webGLOffscreenManager = null;
        }
        this._oldOffscreen = null;
        this._parentOffscreenRenderTarget = null;
    }
}

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
const s_invalidValue = -1; // 無効な値を表す定数
/*
 * シェーダをコピーする際に衣装する頂点のインデックス
 */
const s_renderTargetIndexArray = new Uint16Array([
    0, 1, 2, 2, 1, 3
]);
/**
 * クリッピングマスクの処理を実行するクラス
 */
class CubismClippingManager_WebGL extends CubismClippingManager {
    /**
     * WebGLレンダリングコンテキストを設定する
     *
     * @param gl WebGLレンダリングコンテキスト
     */
    setGL(gl) {
        this.gl = gl;
    }
    /**
     * コンストラクタ
     */
    constructor() {
        super(CubismClippingContext_WebGL);
    }
    /**
     * クリッピングコンテキストを作成する。モデル描画時に実行する。
     *
     * @param model モデルのインスタンス
     * @param renderer レンダラのインスタンス
     * @param lastFbo フレームバッファ
     * @param lastViewport ビューポート
     * @param drawObjectType 描画オブジェクトのタイプ
     */
    setupClippingContext(model, renderer, lastFbo, lastViewport, drawObjectType) {
        // 全てのクリッピングを用意する
        // 同じクリップ（複数の場合はまとめて一つのクリップ）を使う場合は1度だけ設定する
        let usingClipCount = 0;
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
            // 1つのクリッピングマスクに関して
            const cc = this._clippingContextListForMask[clipIndex];
            // このクリップを利用する描画オブジェクト群全体を囲む矩形を計算
            switch (drawObjectType) {
                case DrawableObjectType.DrawableObjectType_Drawable:
                default:
                    this.calcClippedDrawableTotalBounds(model, cc);
                    break;
                case DrawableObjectType.DrawableObjectType_Offscreen:
                    this.calcClippedOffscreenTotalBounds(model, cc);
                    break;
            }
            if (cc._isUsing) {
                usingClipCount++; // 使用中としてカウント
            }
        }
        if (usingClipCount <= 0) {
            return;
        }
        // 生成したFrameBufferと同じサイズでビューポートを設定
        this.gl.viewport(0, 0, this._clippingMaskBufferSize, this._clippingMaskBufferSize);
        // 後の計算のためにインデックスの最初をセット
        switch (drawObjectType) {
            case DrawableObjectType.DrawableObjectType_Drawable:
            default:
                this._currentMaskBuffer = renderer.getDrawableMaskBuffer(0);
                break;
            case DrawableObjectType.DrawableObjectType_Offscreen:
                this._currentMaskBuffer = renderer.getOffscreenMaskBuffer(0);
                break;
        }
        // ---------- マスク描画処理 ----------
        this._currentMaskBuffer.beginDraw(lastFbo);
        renderer.preDraw(); // バッファをクリアする
        this.setupLayoutBounds(usingClipCount);
        // サイズがレンダーテクスチャの枚数と合わない場合は合わせる
        if (this._clearedMaskBufferFlags.length != this._renderTextureCount) {
            this._clearedMaskBufferFlags.length = 0;
            this._clearedMaskBufferFlags = new Array(this._renderTextureCount);
            for (let i = 0; i < this._clearedMaskBufferFlags.length; i++) {
                this._clearedMaskBufferFlags[i] = false;
            }
        }
        // マスクのクリアフラグを毎フレーム開始時に初期化
        for (let index = 0; index < this._clearedMaskBufferFlags.length; index++) {
            this._clearedMaskBufferFlags[index] = false;
        }
        // 実際にマスクを生成する
        // 全てのマスクをどのようにレイアウトして描くかを決定し、ClipContext, ClippedDrawContextに記憶する
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
            // --- 実際に1つのマスクを描く ---
            const clipContext = this._clippingContextListForMask[clipIndex];
            const allClipedDrawRect = clipContext._allClippedDrawRect; // このマスクを使う、すべての描画オブジェクトの論理座標上の囲み矩形
            const layoutBoundsOnTex01 = clipContext._layoutBounds; // この中にマスクを収める
            const margin = 0.05; // モデル座標上の矩形を、適宜マージンを付けて使う
            let scaleX = 0;
            let scaleY = 0;
            // clipContextに設定したレンダーテクスチャをインデックスで取得
            let maskBuffer;
            switch (drawObjectType) {
                case DrawableObjectType.DrawableObjectType_Drawable:
                default:
                    maskBuffer = renderer.getDrawableMaskBuffer(clipContext._bufferIndex);
                    break;
                case DrawableObjectType.DrawableObjectType_Offscreen:
                    maskBuffer = renderer.getOffscreenMaskBuffer(clipContext._bufferIndex);
                    break;
            }
            // 現在のレンダーテクスチャがclipContextのものと異なる場合
            if (this._currentMaskBuffer != maskBuffer) {
                this._currentMaskBuffer.endDraw(); // 前のレンダーテクスチャの描画を終了
                this._currentMaskBuffer = maskBuffer;
                this._currentMaskBuffer.beginDraw(lastFbo); // 新しいレンダーテクスチャの描画を開始
                renderer.preDraw(); // バッファをクリアする
            }
            this._tmpBoundsOnModel.setRect(allClipedDrawRect);
            this._tmpBoundsOnModel.expand(allClipedDrawRect.width * margin, allClipedDrawRect.height * margin);
            //########## 本来は割り当てられた領域の全体を使わず必要最低限のサイズがよい
            // シェーダ用の計算式を求める。回転を考慮しない場合は以下のとおり
            // movePeriod' = movePeriod * scaleX + offX		  [[ movePeriod' = (movePeriod - tmpBoundsOnModel.movePeriod)*scale + layoutBoundsOnTex01.movePeriod ]]
            scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
            scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
            //--------- draw時の mask 参照用行列を計算---------
            this.createMatrixForMask(false, layoutBoundsOnTex01, scaleX, scaleY);
            clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
            clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
            if (drawObjectType == DrawableObjectType.DrawableObjectType_Offscreen) {
                // clipContext * mvp^-1
                const invertMvp = renderer.getMvpMatrix().getInvert();
                clipContext._matrixForDraw.multiplyByMatrix(invertMvp);
            }
            const clipDrawCount = clipContext._clippingIdCount;
            for (let i = 0; i < clipDrawCount; i++) {
                const clipDrawIndex = clipContext._clippingIdList[i];
                // 頂点情報が更新されておらず、信頼性がない場合は描画をパスする
                if (!model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                    continue;
                }
                renderer.setIsCulling(model.getDrawableCulling(clipDrawIndex) != false);
                // マスクがクリアされていないなら処理する
                if (!this._clearedMaskBufferFlags[clipContext._bufferIndex]) {
                    // マスクをクリアする
                    // (仮仕様) 1が無効（描かれない）領域、0が有効（描かれる）領域。（シェーダーCd*Csで0に近い値をかけてマスクを作る。1をかけると何も起こらない）
                    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
                    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                    this._clearedMaskBufferFlags[clipContext._bufferIndex] = true;
                }
                // 今回専用の変換を適用して描く
                // チャンネルも切り替える必要がある(A,R,G,B)
                renderer.setClippingContextBufferForMask(clipContext);
                renderer.drawMeshWebGL(model, clipDrawIndex);
            }
        }
        // --- 後処理 ---
        this._currentMaskBuffer.endDraw(); // マスクの描画を終了
        renderer.setClippingContextBufferForMask(null);
        this.gl.viewport(lastViewport[0], lastViewport[1], lastViewport[2], lastViewport[3]);
    }
    /**
     * マスクの合計数をカウント
     *
     * @return マスクの合計数を返す
     */
    getClippingMaskCount() {
        return this._clippingContextListForMask.length;
    }
}
/**
 * クリッピングマスクのコンテキスト
 */
class CubismClippingContext_WebGL extends CubismClippingContext {
    /**
     * 引数付きコンストラクタ
     *
     * @param manager マスクを管理しているマネージャのインスタンス
     * @param clippingDrawableIndices クリップしているDrawableのインデックスリスト
     * @param clipCount クリップしているDrawableの個数
     */
    constructor(manager, clippingDrawableIndices, clipCount) {
        super(clippingDrawableIndices, clipCount);
        this._owner = manager;
    }
    /**
     * このマスクを管理するマネージャのインスタンスを取得する
     *
     * @return クリッピングマネージャのインスタンス
     */
    getClippingManager() {
        return this._owner;
    }
    /**
     * WebGLレンダリングコンテキストを設定する
     *
     * @param gl WebGLレンダリングコンテキスト
     */
    setGl(gl) {
        this._owner.setGL(gl);
    }
}
/**
 * Cubismモデルを描画する直前のWebGLのステートを保持・復帰させるクラス
 */
class CubismRendererProfile_WebGL {
    /**
     * WebGLの有効・無効をセットする
     *
     * @param index 有効・無効にする機能
     * @param enabled trueなら有効にする
     */
    setGlEnable(index, enabled) {
        if (enabled)
            this.gl.enable(index);
        else
            this.gl.disable(index);
    }
    /**
     * WebGLのVertex Attribute Array機能の有効・無効をセットする
     *
     * @param   index   有効・無効にする機能
     * @param   enabled trueなら有効にする
     */
    setGlEnableVertexAttribArray(index, enabled) {
        if (enabled)
            this.gl.enableVertexAttribArray(index);
        else
            this.gl.disableVertexAttribArray(index);
    }
    /**
     * WebGLのステートを保持する
     */
    save() {
        if (this.gl == null) {
            CubismLogError("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
        }
        //-- push state --
        this._lastArrayBufferBinding = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
        this._lastElementArrayBufferBinding = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
        this._lastProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
        this._lastActiveTexture = this.gl.getParameter(this.gl.ACTIVE_TEXTURE);
        this.gl.activeTexture(this.gl.TEXTURE1); //テクスチャユニット1をアクティブに（以後の設定対象とする）
        this._lastTexture1Binding2D = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
        this.gl.activeTexture(this.gl.TEXTURE0); //テクスチャユニット0をアクティブに（以後の設定対象とする）
        this._lastTexture0Binding2D = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
        this._lastVertexAttribArrayEnabled[0] = this.gl.getVertexAttrib(0, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        this._lastVertexAttribArrayEnabled[1] = this.gl.getVertexAttrib(1, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        this._lastVertexAttribArrayEnabled[2] = this.gl.getVertexAttrib(2, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        this._lastVertexAttribArrayEnabled[3] = this.gl.getVertexAttrib(3, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        this._lastScissorTest = this.gl.isEnabled(this.gl.SCISSOR_TEST);
        this._lastStencilTest = this.gl.isEnabled(this.gl.STENCIL_TEST);
        this._lastDepthTest = this.gl.isEnabled(this.gl.DEPTH_TEST);
        this._lastCullFace = this.gl.isEnabled(this.gl.CULL_FACE);
        this._lastBlend = this.gl.isEnabled(this.gl.BLEND);
        this._lastFrontFace = this.gl.getParameter(this.gl.FRONT_FACE);
        this._lastColorMask = this.gl.getParameter(this.gl.COLOR_WRITEMASK);
        // backup blending
        this._lastBlending[0] = this.gl.getParameter(this.gl.BLEND_SRC_RGB);
        this._lastBlending[1] = this.gl.getParameter(this.gl.BLEND_DST_RGB);
        this._lastBlending[2] = this.gl.getParameter(this.gl.BLEND_SRC_ALPHA);
        this._lastBlending[3] = this.gl.getParameter(this.gl.BLEND_DST_ALPHA);
    }
    /**
     * 保持したWebGLのステートを復帰させる
     */
    restore() {
        if (this.gl == null) {
            CubismLogError("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
        }
        this.gl.useProgram(this._lastProgram);
        this.setGlEnableVertexAttribArray(0, this._lastVertexAttribArrayEnabled[0]);
        this.setGlEnableVertexAttribArray(1, this._lastVertexAttribArrayEnabled[1]);
        this.setGlEnableVertexAttribArray(2, this._lastVertexAttribArrayEnabled[2]);
        this.setGlEnableVertexAttribArray(3, this._lastVertexAttribArrayEnabled[3]);
        this.setGlEnable(this.gl.SCISSOR_TEST, this._lastScissorTest);
        this.setGlEnable(this.gl.STENCIL_TEST, this._lastStencilTest);
        this.setGlEnable(this.gl.DEPTH_TEST, this._lastDepthTest);
        this.setGlEnable(this.gl.CULL_FACE, this._lastCullFace);
        this.setGlEnable(this.gl.BLEND, this._lastBlend);
        this.gl.frontFace(this._lastFrontFace);
        this.gl.colorMask(this._lastColorMask[0], this._lastColorMask[1], this._lastColorMask[2], this._lastColorMask[3]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._lastArrayBufferBinding); //前にバッファがバインドされていたら破棄する必要がある
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this._lastElementArrayBufferBinding);
        this.gl.activeTexture(this.gl.TEXTURE1); //テクスチャユニット1を復元
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture1Binding2D);
        this.gl.activeTexture(this.gl.TEXTURE0); //テクスチャユニット0を復元
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture0Binding2D);
        this.gl.activeTexture(this._lastActiveTexture);
        this.gl.blendFuncSeparate(this._lastBlending[0], this._lastBlending[1], this._lastBlending[2], this._lastBlending[3]);
    }
    /**
     * WebGLレンダリングコンテキストを設定する
     *
     * @param gl WebGLレンダリングコンテキスト
     */
    setGl(gl) {
        this.gl = gl;
    }
    /**
     * コンストラクタ
     */
    constructor() {
        this._lastVertexAttribArrayEnabled = new Array(4);
        this._lastColorMask = new Array(4);
        this._lastBlending = new Array(4);
    }
}
/**
 * WebGL用の描画命令を実装したクラス
 */
class CubismRenderer_WebGL extends CubismRenderer {
    /**
     * レンダラの初期化処理を実行する
     * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
     * NOTE: WebGLコンテキストが初期化されていない可能性があるため、ここではWebGLコンテキストを使う初期化は行わない。
     *
     * @param model モデルのインスタンス
     * @param maskBufferCount バッファの生成数
     */
    initialize(model, maskBufferCount = 1) {
        if (model.isUsingMasking()) {
            this._drawableClippingManager = new CubismClippingManager_WebGL(); // クリッピングマスク・バッファ前処理方式を初期化
            this._drawableClippingManager.initializeForDrawable(model, maskBufferCount);
        }
        if (model.isUsingMaskingForOffscreen()) {
            this._offscreenClippingManager = new CubismClippingManager_WebGL(); //クリッピングマスク・バッファ前処理方式を初期化
            this._offscreenClippingManager.initializeForOffscreen(model, maskBufferCount);
        }
        // IndexList と TypeListのサイズをモデルの描画オブジェクト数に合わせる
        updateSize(this._sortedObjectsIndexList, model.getDrawableCount() +
            (model.getOffscreenCount ? model.getOffscreenCount() : 0), 0, true);
        updateSize(this._sortedObjectsTypeList, model.getDrawableCount() +
            (model.getOffscreenCount ? model.getOffscreenCount() : 0), 0, true);
        super.initialize(model); // 親クラスの処理を呼ぶ
    }
    /**
     * オフスクリーンの親を探して設定する
     *
     * @param model モデルのインスタンス
     * @param offscreenCount オフスクリーンの数
     */
    setupParentOffscreens(model, offscreenCount) {
        let parentOffscreen;
        for (let offscreenIndex = 0; offscreenIndex < offscreenCount; ++offscreenIndex) {
            parentOffscreen = null;
            const ownerIndex = model.getOffscreenOwnerIndices()[offscreenIndex];
            let parentIndex = model.getPartParentPartIndices()[ownerIndex];
            // 親のオフスクリーンを探す
            while (parentIndex != NoParentIndex) {
                for (let i = 0; i < offscreenCount; ++i) {
                    const ownerIndex = model.getOffscreenOwnerIndices()[this._offscreenList[i].getOffscreenIndex()];
                    if (ownerIndex != parentIndex) {
                        continue; //オフスクリーンの所有者がパーツではない場合はスキップ
                    }
                    parentOffscreen = this._offscreenList[i];
                    break;
                }
                if (parentOffscreen != null) {
                    break; // 親のオフスクリーンが見つかった場合はループを抜ける
                }
                parentIndex = model.getPartParentPartIndices()[parentIndex];
            }
            // 親のオフスクリーンを設定
            this._offscreenList[offscreenIndex].setParentPartOffscreen(parentOffscreen);
        }
    }
    /**
     * WebGLテクスチャのバインド処理
     * CubismRendererにテクスチャを設定し、CubismRenderer内でその画像を参照するためのIndex値を戻り値とする
     *
     * @param modelTextureNo セットするモデルテクスチャの番号
     * @param glTextureNo WebGLテクスチャの番号
     */
    bindTexture(modelTextureNo, glTexture) {
        this._textures.set(modelTextureNo, glTexture);
    }
    /**
     * WebGLにバインドされたテクスチャのリストを取得する
     *
     * @return テクスチャのリスト
     */
    getBindedTextures() {
        return this._textures;
    }
    /**
     * クリッピングマスクバッファのサイズを設定する
     * マスク用のFrameBufferを破棄、再作成する為処理コストは高い
     *
     * @param size クリッピングマスクバッファのサイズ
     */
    setClippingMaskBufferSize(size) {
        // クリッピングマスクを利用しない場合は早期リターン
        if (!this._model.isUsingMasking()) {
            return;
        }
        // インスタンス破棄前にレンダーテクスチャの数を保存
        const renderTextureCount = this._drawableClippingManager.getRenderTextureCount();
        // FrameBufferのサイズを変更するためにインスタンスを破棄・再作成する
        this._drawableClippingManager.release();
        this._drawableClippingManager = void 0;
        this._drawableClippingManager = null;
        this._drawableClippingManager = new CubismClippingManager_WebGL();
        this._drawableClippingManager.setClippingMaskBufferSize(size);
        this._drawableClippingManager.initializeForDrawable(this.getModel(), renderTextureCount // インスタンス破棄前に保存したレンダーテクスチャの数
        );
    }
    /**
     * クリッピングマスクバッファのサイズを取得する
     *
     * @return クリッピングマスクバッファのサイズ
     */
    getClippingMaskBufferSize() {
        return this._model.isUsingMasking()
            ? this._drawableClippingManager.getClippingMaskBufferSize()
            : s_invalidValue;
    }
    /**
     * ブレンドモード用のフレームバッファを取得する
     *
     * @return ブレンドモード用のフレームバッファ
     */
    getModelRenderTarget(index) {
        return this._modelRenderTargets[index];
    }
    /**
     * レンダーテクスチャの枚数を取得する
     * @return レンダーテクスチャの枚数
     */
    getRenderTextureCount() {
        return this._model.isUsingMasking()
            ? this._drawableClippingManager.getRenderTextureCount()
            : s_invalidValue;
    }
    /**
     * コンストラクタ
     */
    constructor(width, height) {
        super(width, height);
        this._clippingContextBufferForMask = null;
        this._clippingContextBufferForDraw = null;
        this._rendererProfile = new CubismRendererProfile_WebGL();
        this._textures = new Map();
        this._sortedObjectsIndexList = new Array();
        this._sortedObjectsTypeList = new Array();
        this._bufferData = {
            vertex: (WebGLBuffer = null),
            uv: (WebGLBuffer = null),
            index: (WebGLBuffer = null)
        };
        this._modelRenderTargets = new Array();
        this._drawableMasks = new Array();
        this._currentFbo = null;
        this._drawableClippingManager = null;
        this._offscreenClippingManager = null;
        this._offscreenMasks = new Array();
        this._offscreenList = new Array();
        // テクスチャ対応マップの容量を確保しておく
        // this._textures.prepareCapacity(32, true);
    }
    /**
     * デストラクタ相当の処理
     */
    release() {
        if (this._drawableClippingManager) {
            this._drawableClippingManager.release();
            this._drawableClippingManager = void 0;
            this._drawableClippingManager = null;
        }
        if (this.gl == null) {
            return;
        }
        this.gl.deleteBuffer(this._bufferData.vertex);
        this._bufferData.vertex = null;
        this.gl.deleteBuffer(this._bufferData.uv);
        this._bufferData.uv = null;
        this.gl.deleteBuffer(this._bufferData.index);
        this._bufferData.index = null;
        this._bufferData = null;
        this._textures = null;
        for (let i = 0; i < this._modelRenderTargets.length; i++) {
            if (this._modelRenderTargets[i] != null &&
                this._modelRenderTargets[i].isValid()) {
                this._modelRenderTargets[i].destroyRenderTarget();
            }
        }
        this._modelRenderTargets.length = 0;
        this._modelRenderTargets = null;
        for (let i = 0; i < this._drawableMasks.length; i++) {
            if (this._drawableMasks[i] != null && this._drawableMasks[i].isValid()) {
                this._drawableMasks[i].destroyRenderTarget();
            }
        }
        this._drawableMasks.length = 0;
        this._drawableMasks = null;
        for (let i = 0; i < this._offscreenMasks.length; i++) {
            if (this._offscreenMasks[i] != null &&
                this._offscreenMasks[i].isValid()) {
                this._offscreenMasks[i].destroyRenderTarget();
            }
        }
        this._offscreenMasks.length = 0;
        this._offscreenMasks = null;
        for (let i = 0; i < this._offscreenList.length; i++) {
            if (this._offscreenList[i] != null && this._offscreenList[i].isValid()) {
                this._offscreenList[i].destroyRenderTarget();
            }
        }
        this._offscreenList.length = 0;
        this._offscreenList = null;
        this._offscreenClippingManager = null;
        this._drawableClippingManager = null;
        this._clippingContextBufferForMask = null;
        this._clippingContextBufferForDraw = null;
        this._rendererProfile = null;
        this._sortedObjectsIndexList = null;
        this._sortedObjectsTypeList = null;
        this._currentFbo = null;
        this._model = null;
        this.gl = null;
    }
    /**
     * Shaderの読み込みを行う
     * @param shaderPath シェーダのパス
     */
    loadShaders(shaderPath = null) {
        if (this.gl == null) {
            CubismLogError("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
        }
        if (CubismShaderManager_WebGL.getInstance().getShader(this.gl)._shaderSets
            .length == 0 ||
            !CubismShaderManager_WebGL.getInstance().getShader(this.gl)
                ._isShaderLoaded) {
            const shader = CubismShaderManager_WebGL.getInstance().getShader(this.gl);
            if (shaderPath != null) {
                shader.setShaderPath(shaderPath);
            }
            shader.generateShaders();
        }
    }
    /**
     * モデルを描画する実際の処理
     * @param shaderPath シェーダのパス
     */
    doDrawModel(shaderPath = null) {
        this.loadShaders(shaderPath);
        this.beforeDrawModelRenderTarget();
        const lastFbo = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);
        const lastViewport = this.gl.getParameter(this.gl.VIEWPORT);
        // //------------ クリッピングマスク・バッファ前処理方式の場合 ------------
        if (this._drawableClippingManager != null) {
            this.preDraw();
            for (let i = 0; i < this._drawableClippingManager.getRenderTextureCount(); ++i) {
                if (this._drawableMasks[i].getBufferWidth() !=
                    this._drawableClippingManager.getClippingMaskBufferSize() ||
                    this._drawableMasks[i].getBufferHeight() !=
                        this._drawableClippingManager.getClippingMaskBufferSize()) {
                    // クリッピングマスクのサイズが変更された場合は、オフスクリーンサーフェスを再作成する
                    this._drawableMasks[i].createRenderTarget(this.gl, this._drawableClippingManager.getClippingMaskBufferSize(), this._drawableClippingManager.getClippingMaskBufferSize(), lastFbo);
                }
            }
            if (this.isUsingHighPrecisionMask()) {
                this._drawableClippingManager.setupMatrixForHighPrecision(this.getModel(), false);
            }
            else {
                this._drawableClippingManager.setupClippingContext(this.getModel(), this, lastFbo, lastViewport, DrawableObjectType.DrawableObjectType_Drawable);
            }
        }
        if (this._offscreenClippingManager != null) {
            this.preDraw();
            // サイズが違う場合はここで作成しなおし
            for (let i = 0; i < this._offscreenClippingManager.getRenderTextureCount(); ++i) {
                if (this._offscreenMasks[i].getBufferWidth() !=
                    this._offscreenClippingManager.getClippingMaskBufferSize() ||
                    this._offscreenMasks[i].getBufferHeight() !=
                        this._offscreenClippingManager.getClippingMaskBufferSize()) {
                    this._offscreenMasks[i].createRenderTarget(this.gl, this._offscreenClippingManager.getClippingMaskBufferSize(), this._offscreenClippingManager.getClippingMaskBufferSize(), lastFbo);
                }
            }
            if (this.isUsingHighPrecisionMask()) {
                this._offscreenClippingManager.setupMatrixForOffscreenHighPrecision(this.getModel(), false, this.getMvpMatrix());
            }
            else {
                this._offscreenClippingManager.setupClippingContext(this.getModel(), this, lastFbo, lastViewport, DrawableObjectType.DrawableObjectType_Offscreen);
            }
        }
        // 上記クリッピング処理内でも一度PreDrawを呼ぶので注意!!
        this.preDraw();
        this.drawObjectLoop(lastFbo);
        this.afterDrawModelRenderTarget();
    }
    /**
     * 描画オブジェクトのループ処理を行う。
     *
     * @param lastFbo 前回のフレームバッファ
     */
    drawObjectLoop(lastFbo) {
        const model = this.getModel();
        const drawableCount = model.getDrawableCount();
        const offscreenCount = model.getOffscreenCount();
        const totalCount = drawableCount + offscreenCount;
        const renderOrder = model.getRenderOrders();
        this._currentOffscreen = null; // 現在のオフスクリーンを初期化
        this._currentFbo = lastFbo;
        this._modelRootFbo = lastFbo;
        // インデックスを描画順でソート
        for (let i = 0; i < totalCount; ++i) {
            const order = renderOrder[i];
            if (i < drawableCount) {
                this._sortedObjectsIndexList[order] = i;
                this._sortedObjectsTypeList[order] =
                    DrawableObjectType.DrawableObjectType_Drawable;
            }
            else if (i < totalCount) {
                this._sortedObjectsIndexList[order] = i - drawableCount;
                this._sortedObjectsTypeList[order] =
                    DrawableObjectType.DrawableObjectType_Offscreen;
            }
        }
        // 描画
        for (let i = 0; i < totalCount; ++i) {
            const objectIndex = this._sortedObjectsIndexList[i];
            const objectType = this._sortedObjectsTypeList[i];
            this.renderObject(objectIndex, objectType);
        }
        while (this._currentOffscreen != null) {
            // オフスクリーンが残っている場合は親オフスクリーンへの伝搬を行う
            this.submitDrawToParentOffscreen(this._currentOffscreen.getOffscreenIndex(), DrawableObjectType.DrawableObjectType_Offscreen);
        }
    }
    /**
     * 描画オブジェクトを描画する。
     *
     * @param objectIndex 描画対象のオブジェクトのインデックス
     * @param objectType 描画対象のオブジェクトのタイプ
     * @param lastFbo 前回のフレームバッファ
     * @param lastViewport 前回のビューポート
     */
    renderObject(objectIndex, objectType) {
        switch (objectType) {
            case DrawableObjectType.DrawableObjectType_Drawable:
                this.drawDrawable(objectIndex, this._modelRootFbo);
                break;
            case DrawableObjectType.DrawableObjectType_Offscreen:
                this.addOffscreen(objectIndex);
                break;
            default:
                CubismLogError('Unknown object type: ' + objectType);
                break;
        }
    }
    /**
     * 描画オブジェクト（アートメッシュ）を描画する。
     *
     * @param model 描画対象のモデル
     * @param index 描画対象のメッシュのインデックス
     */
    drawDrawable(drawableIndex, rootFbo) {
        // Drawableが表示状態でなければ処理をパスする
        if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
            return;
        }
        this.submitDrawToParentOffscreen(drawableIndex, DrawableObjectType.DrawableObjectType_Drawable);
        const clipContext = this._drawableClippingManager != null
            ? this._drawableClippingManager.getClippingContextListForDraw()[drawableIndex]
            : null;
        if (clipContext != null && this.isUsingHighPrecisionMask()) {
            // 描くことになっていた
            if (clipContext._isUsing) {
                // 生成したFrameBufferと同じサイズでビューポートを設定
                this.gl.viewport(0, 0, this._drawableClippingManager.getClippingMaskBufferSize(), this._drawableClippingManager.getClippingMaskBufferSize());
                this.preDraw(); // バッファをクリアする
                // ---------- マスク描画処理 ----------
                // マスク用RenderTextureをactiveにセット
                this.getDrawableMaskBuffer(clipContext._bufferIndex).beginDraw(this._currentFbo);
                // マスクをクリアする
                // (仮仕様) 1が無効（描かれない）領域、0が有効（描かれる）領域。（シェーダーCd*Csで0に近い値をかけてマスクを作る。1をかけると何も起こらない）
                this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            }
            {
                const clipDrawCount = clipContext._clippingIdCount;
                for (let index = 0; index < clipDrawCount; index++) {
                    const clipDrawIndex = clipContext._clippingIdList[index];
                    // 頂点情報が更新されておらず、信頼性がない場合は描画をパスする
                    if (!this._model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                        continue;
                    }
                    this.setIsCulling(this._model.getDrawableCulling(clipDrawIndex) != false);
                    // 今回専用の変換を適用して描く
                    // チャンネルも切り替える必要がある(A,R,G,B)
                    this.setClippingContextBufferForMask(clipContext);
                    this.drawMeshWebGL(this._model, clipDrawIndex);
                }
                // --- 後処理 ---
                this.getDrawableMaskBuffer(clipContext._bufferIndex).endDraw();
                this.setClippingContextBufferForMask(null);
                this.gl.viewport(0, 0, this._modelRenderTargetWidth, this._modelRenderTargetHeight);
                this.preDraw(); // バッファをクリアする
            }
        }
        // クリッピングマスクをセットする
        this.setClippingContextBufferForDrawable(clipContext);
        this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));
        this.drawMeshWebGL(this._model, drawableIndex);
    }
    /**
     * 描画オブジェクト（アートメッシュ）を描画する。
     *
     * @param model 描画対象のモデル
     * @param index 描画対象のメッシュのインデックス
     */
    drawMeshWebGL(model, index) {
        // 裏面描画の有効・無効
        if (this.isCulling()) {
            this.gl.enable(this.gl.CULL_FACE);
        }
        else {
            this.gl.disable(this.gl.CULL_FACE);
        }
        this.gl.frontFace(this.gl.CCW); // Cubism SDK OpenGLはマスク・アートメッシュ共にCCWが表面
        if (this.isGeneratingMask()) {
            CubismShaderManager_WebGL.getInstance()
                .getShader(this.gl)
                .setupShaderProgramForMask(this, model, index);
        }
        else {
            CubismShaderManager_WebGL.getInstance()
                .getShader(this.gl)
                .setupShaderProgramForDrawable(this, model, index);
        }
        if (!CubismShaderManager_WebGL.getInstance().getShader(this.gl)
            ._isShaderLoaded) {
            // シェーダーがロードされていない場合は描画を行わない
            // NOTE: Cubism 5.2 以前のモデル描画時にのみ、マスク無しのモデルが描画されてしまうためここで早期リターン
            return;
        }
        {
            const indexCount = model.getDrawableVertexIndexCount(index);
            this.gl.drawElements(this.gl.TRIANGLES, indexCount, this.gl.UNSIGNED_SHORT, 0);
        }
        // 後処理
        this.gl.useProgram(null);
        this.setClippingContextBufferForDrawable(null);
        this.setClippingContextBufferForMask(null);
    }
    /**
     * オフスクリーンを親のオフスクリーンにコピーする。
     *
     * @param objectIndex オブジェクトのインデックス
     * @param objectType  オブジェクトの種類
     */
    submitDrawToParentOffscreen(objectIndex, objectType) {
        if (this._currentOffscreen == null || objectIndex == s_invalidValue) {
            return;
        }
        const currentOwnerIndex = this.getModel().getOffscreenOwnerIndices()[this._currentOffscreen.getOffscreenIndex()];
        // オーナーが不明な場合は処理を終了
        if (currentOwnerIndex == s_invalidValue) {
            return;
        }
        let targetParentIndex = NoParentIndex;
        switch (objectType) {
            case DrawableObjectType.DrawableObjectType_Drawable:
                targetParentIndex =
                    this.getModel().getDrawableParentPartIndex(objectIndex);
                break;
            case DrawableObjectType.DrawableObjectType_Offscreen:
                targetParentIndex =
                    this.getModel().getPartParentPartIndices()[this.getModel().getOffscreenOwnerIndices()[objectIndex]];
                break;
            default:
                // 不明なタイプだった場合は処理を終了
                return;
        }
        while (targetParentIndex != NoParentIndex) {
            // オブジェクトの親が現在のオーナーと同じ場合は処理を終了
            if (targetParentIndex == currentOwnerIndex) {
                return;
            }
            targetParentIndex =
                this.getModel().getPartParentPartIndices()[targetParentIndex];
        }
        // 描画
        this.drawOffscreen(this._currentOffscreen);
        // さらに親のオフスクリーンに伝搬可能なら伝搬する
        this.submitDrawToParentOffscreen(objectIndex, objectType);
    }
    /**
     * 描画オブジェクト（オフスクリーン）を追加する。
     *
     * @param offscreenIndex オフスクリーンのインデックス
     */
    addOffscreen(offscreenIndex) {
        // 以前のオフスクリーンレンダリングターゲットを親に伝搬する処理を追加する
        if (this._currentOffscreen != null &&
            this._currentOffscreen.getOffscreenIndex() != offscreenIndex) {
            let isParent = false;
            const ownerIndex = this.getModel().getOffscreenOwnerIndices()[offscreenIndex];
            let parentIndex = this.getModel().getPartParentPartIndices()[ownerIndex];
            const currentOffscreenIndex = this._currentOffscreen.getOffscreenIndex();
            const currentOffscreenOwnerIndex = this.getModel().getOffscreenOwnerIndices()[currentOffscreenIndex];
            while (parentIndex != NoParentIndex) {
                if (parentIndex == currentOffscreenOwnerIndex) {
                    isParent = true;
                    break;
                }
                parentIndex = this.getModel().getPartParentPartIndices()[parentIndex];
            }
            if (!isParent) {
                // 現在のオフスクリーンレンダリングターゲットがあるなら、親に伝搬する
                this.submitDrawToParentOffscreen(offscreenIndex, DrawableObjectType.DrawableObjectType_Offscreen);
            }
        }
        const offscreen = this._offscreenList[offscreenIndex];
        // レンダーターゲットが未生成、レンダーテクスチャ使用中、もしくはサイズが異なるなら新しいオフスクリーンレンダリングターゲットを作成
        if (offscreen.getRenderTexture() == null ||
            offscreen.getBufferWidth() != this._modelRenderTargetWidth ||
            offscreen.getBufferHeight() != this._modelRenderTargetHeight ||
            offscreen.getUsingRenderTextureState()) {
            offscreen.setOffscreenRenderTarget(this.gl, this._modelRenderTargetWidth, this._modelRenderTargetHeight, this._currentFbo);
        }
        else {
            // 既存のRenderTextureを使用するので使用フラグを立てる。
            offscreen.startUsingRenderTexture();
        }
        // 以前のオフスクリーンレンダリングターゲットを取得
        const oldOffscreen = offscreen.getParentPartOffscreen();
        offscreen.setOldOffscreen(oldOffscreen);
        let oldFBO = null;
        if (oldOffscreen != null) {
            oldFBO = oldOffscreen.getRenderTexture();
        }
        if (oldFBO == null) {
            oldFBO = this._modelRootFbo; // ルートのFBOを使用
        }
        // 別バッファに描画を開始
        offscreen.beginDraw(oldFBO);
        this.gl.viewport(0, 0, this._modelRenderTargetWidth, this._modelRenderTargetHeight);
        offscreen.clear(0.0, 0.0, 0.0, 0.0);
        // 現在のオフスクリーンレンダリングターゲットを設定
        this._currentOffscreen = offscreen;
        this._currentFbo = offscreen.getRenderTexture();
    }
    /**
     * オフスクリーン描画を行う。
     *
     * @param offscreen オフスクリーンレンダリングターゲット
     */
    drawOffscreen(offscreen) {
        const offscreenIndex = offscreen.getOffscreenIndex();
        // クリッピングマスク
        const clipContext = this._offscreenClippingManager != null
            ? this._offscreenClippingManager.getClippingContextListForOffscreen()[offscreenIndex]
            : null;
        if (clipContext != null && this.isUsingHighPrecisionMask()) {
            // マスクを書く必要がある
            if (clipContext._isUsing) {
                // 書くことになっていた
                // 生成したRenderTargetと同じサイズでビューポートを設定
                this.gl.viewport(0, 0, this._offscreenClippingManager.getClippingMaskBufferSize(), this._offscreenClippingManager.getClippingMaskBufferSize());
                this.preDraw(); // バッファをクリアする
                // ---------- マスク描画処理 ----------
                // マスク用RenderTextureをactiveにセット
                this.getOffscreenMaskBuffer(clipContext._bufferIndex).beginDraw(this._currentFbo);
                // マスクをクリアする
                // 1が無効（描かれない）領域、0が有効（描かれる）領域。（シェーダで Cd*Csで0に近い値をかけてマスクを作る。1をかけると何も起こらない）
                this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            }
            {
                const clipDrawCount = clipContext._clippingIdCount;
                for (let index = 0; index < clipDrawCount; index++) {
                    const clipDrawIndex = clipContext._clippingIdList[index];
                    // 頂点情報が更新されておらず、信頼性がない場合は描画をパスする
                    if (!this.getModel().getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                        continue;
                    }
                    this.setIsCulling(this.getModel().getDrawableCulling(clipDrawIndex) != false);
                    // 今回専用の変換を適用して描く
                    // チャンネルも切り替える必要がある(A,R,G,B)
                    this.setClippingContextBufferForMask(clipContext);
                    this.drawMeshWebGL(this.getModel(), clipDrawIndex);
                }
            }
            {
                // --- 後処理 ---
                this.getOffscreenMaskBuffer(clipContext._bufferIndex).endDraw();
                this.setClippingContextBufferForMask(null);
                this.gl.viewport(0, 0, this._modelRenderTargetWidth, this._modelRenderTargetHeight);
                this.preDraw(); // バッファをクリアする
            }
        }
        // クリッピングマスクをセットする
        this.setClippingContextBufferForOffscreen(clipContext);
        this.setIsCulling(this._model.getOffscreenCulling(offscreenIndex) != false);
        this.drawOffscreenWebGL(this.getModel(), offscreen);
    }
    /**
     * オフスクリーン描画のWebGL実装
     *
     * @param model モデル
     * @param index オフスクリーンインデックス
     */
    drawOffscreenWebGL(model, offscreen) {
        // 裏面描画の有効・無効
        if (this.isCulling()) {
            this.gl.enable(this.gl.CULL_FACE);
        }
        else {
            this.gl.disable(this.gl.CULL_FACE);
        }
        this.gl.frontFace(this.gl.CCW); // Cubism SDK OpenGLはマスク・アートメッシュ共にCCWが表面
        CubismShaderManager_WebGL.getInstance()
            .getShader(this.gl)
            .setupShaderProgramForOffscreen(this, model, offscreen);
        offscreen.endDraw();
        this._currentOffscreen = this._currentOffscreen.getOldOffscreen();
        this._currentFbo = offscreen.getOldFBO();
        if (this._currentFbo == null) {
            this._currentOffscreen = this._modelRenderTargets[0];
            this._currentFbo = this._modelRenderTargets[0].getRenderTexture();
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentFbo);
        }
        // ポリゴンメッシュを描画する
        {
            // インデックスバッファの作成とバインド
            const indexBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, s_renderTargetIndexArray, this.gl.STATIC_DRAW);
            // 描画
            this.gl.drawElements(this.gl.TRIANGLES, s_renderTargetIndexArray.length, this.gl.UNSIGNED_SHORT, 0);
            this.gl.deleteBuffer(indexBuffer);
        }
        // 後処理
        offscreen.stopUsingRenderTexture();
        this.gl.useProgram(null);
        this.setClippingContextBufferForMask(null);
        this.setClippingContextBufferForOffscreen(null);
    }
    /**
     * モデル描画直前のレンダラのステートを保持する
     */
    saveProfile() {
        this._rendererProfile.save();
    }
    /**
     * モデル描画直前のレンダラのステートを復帰させる
     */
    restoreProfile() {
        this._rendererProfile.restore();
    }
    /**
     * モデル描画直前のオフスクリーン設定を行う
     */
    beforeDrawModelRenderTarget() {
        if (this._modelRenderTargets.length == 0) {
            return;
        }
        // オフスクリーンのバッファのサイズが違う場合は作り直し
        for (let i = 0; i < this._modelRenderTargets.length; ++i) {
            if (this._modelRenderTargets[i].getBufferWidth() !=
                this._modelRenderTargetWidth ||
                this._modelRenderTargets[i].getBufferHeight() !=
                    this._modelRenderTargetHeight) {
                this._modelRenderTargets[i].createRenderTarget(this.gl, this._modelRenderTargetWidth, this._modelRenderTargetHeight, this._currentFbo);
            }
        }
        // 別バッファに描画を開始
        this._modelRenderTargets[0].beginDraw();
        this._modelRenderTargets[0].clear(0.0, 0.0, 0.0, 0.0);
    }
    /**
     * モデル描画後のオフスクリーン設定を行う
     */
    afterDrawModelRenderTarget() {
        if (this._modelRenderTargets.length == 0) {
            return;
        }
        // 元のバッファに描画する
        this._modelRenderTargets[0].endDraw();
        CubismShaderManager_WebGL.getInstance()
            .getShader(this.gl)
            .setupShaderProgramForOffscreenRenderTarget(this);
        if (CubismShaderManager_WebGL.getInstance().getShader(this.gl)._isShaderLoaded) {
            // インデックスバッファの作成とバインド
            const indexBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, s_renderTargetIndexArray, this.gl.STATIC_DRAW);
            // 描画
            this.gl.drawElements(this.gl.TRIANGLES, s_renderTargetIndexArray.length, this.gl.UNSIGNED_SHORT, 0);
            this.gl.deleteBuffer(indexBuffer);
        }
        this.gl.useProgram(null);
    }
    /**
     * オフスクリーンのクリッピングマスクのバッファを取得する
     *
     * @param index オフスクリーンのクリッピングマスクのバッファのインデックス
     *
     * @return オフスクリーンのクリッピングマスクのバッファへのポインタ
     */
    getOffscreenMaskBuffer(index) {
        return this._offscreenMasks[index];
    }
    /**
     * レンダラが保持する静的なリソースを解放する
     * WebGLの静的なシェーダープログラムを解放する
     */
    static doStaticRelease() {
        CubismShaderManager_WebGL.deleteInstance();
    }
    /**
     * レンダーステートを設定する
     *
     * @param fbo アプリケーション側で指定しているフレームバッファ
     * @param viewport ビューポート
     */
    setRenderState(fbo, viewport) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
        this.gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
        if (this._modelRenderTargetWidth != viewport[2] ||
            this._modelRenderTargetHeight != viewport[3]) {
            this._modelRenderTargetWidth = viewport[2];
            this._modelRenderTargetHeight = viewport[3];
        }
    }
    /**
     * 描画開始時の追加処理
     * モデルを描画する前にクリッピングマスクに必要な処理を実装している
     */
    preDraw() {
        this.gl.disable(this.gl.SCISSOR_TEST);
        this.gl.disable(this.gl.STENCIL_TEST);
        this.gl.disable(this.gl.DEPTH_TEST);
        // カリング（1.0beta3）
        this.gl.frontFace(this.gl.CW);
        this.gl.enable(this.gl.BLEND);
        this.gl.colorMask(true, true, true, true);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // 前にバッファがバインドされていたら破棄する必要がある
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        // 異方性フィルタリングを適用する
        if (this.getAnisotropy() > 0.0 && this._extension) {
            for (let i = 0; i < this._textures.size; ++i) {
                this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures.get(i));
                this.gl.texParameterf(this.gl.TEXTURE_2D, this._extension.TEXTURE_MAX_ANISOTROPY_EXT, this.getAnisotropy());
            }
        }
    }
    /**
     * Drawableのマスク用のオフスクリーンサーフェースを取得する
     *
     * @param index オフスクリーンサーフェースのインデックス
     *
     * @return マスク用のオフスクリーンサーフェース
     */
    getDrawableMaskBuffer(index) {
        return this._drawableMasks[index];
    }
    /**
     * マスクテクスチャに描画するクリッピングコンテキストをセットする
     */
    setClippingContextBufferForMask(clip) {
        this._clippingContextBufferForMask = clip;
    }
    /**
     * マスクテクスチャに描画するクリッピングコンテキストを取得する
     *
     * @return マスクテクスチャに描画するクリッピングコンテキスト
     */
    getClippingContextBufferForMask() {
        return this._clippingContextBufferForMask;
    }
    /**
     * Drawableの画面上に描画するクリッピングコンテキストをセットする
     *
     * @param clip drawableで画面上に描画するクリッピングコンテキスト
     */
    setClippingContextBufferForDrawable(clip) {
        this._clippingContextBufferForDraw = clip;
    }
    /**
     * Drawableの画面上に描画するクリッピングコンテキストを取得する
     *
     * @return Drawableの画面上に描画するクリッピングコンテキスト
     */
    getClippingContextBufferForDrawable() {
        return this._clippingContextBufferForDraw;
    }
    /**
     * offscreenで画面上に描画するクリッピングコンテキストをセットする。
     *
     * @param clip offscreenで画面上に描画するクリッピングコンテキスト
     */
    setClippingContextBufferForOffscreen(clip) {
        this._clippingContextBufferForOffscreen = clip;
    }
    /**
     * offscreenで画面上に描画するクリッピングコンテキストを取得する。
     *
     * @return offscreenで画面上に描画するクリッピングコンテキスト
     */
    getClippingContextBufferForOffscreen() {
        return this._clippingContextBufferForOffscreen;
    }
    /**
     * マスク生成時かを判定する
     *
     * @return 判定値
     */
    isGeneratingMask() {
        return this.getClippingContextBufferForMask() != null;
    }
    /**
     * glの設定
     */
    startUp(gl) {
        this.gl = gl;
        if (this._drawableClippingManager) {
            this._drawableClippingManager.setGL(gl);
        }
        if (this._offscreenClippingManager) {
            this._offscreenClippingManager.setGL(gl);
        }
        CubismShaderManager_WebGL.getInstance().setGlContext(gl);
        this._rendererProfile.setGl(gl);
        // 異方性フィルタリングが使用できるかチェック
        this._extension =
            this.gl.getExtension('EXT_texture_filter_anisotropic') ||
                this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
                this.gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
        if (this._model.isUsingMasking()) {
            this._drawableMasks.length =
                this._drawableClippingManager.getRenderTextureCount();
            for (let i = 0; i < this._drawableMasks.length; ++i) {
                const renderTarget = new CubismRenderTarget_WebGL();
                renderTarget.createRenderTarget(this.gl, this._drawableClippingManager.getClippingMaskBufferSize(), this._drawableClippingManager.getClippingMaskBufferSize(), this._currentFbo);
                this._drawableMasks[i] = renderTarget;
            }
        }
        if (this._model.isBlendModeEnabled()) {
            // オフスクリーンの作成
            this._modelRenderTargets.length = 0;
            // TextureBarrierの代替用にオフスクリーンを2つ作成する
            const createSize = 3;
            this._modelRenderTargets.length = createSize;
            for (let i = 0; i < createSize; ++i) {
                const offscreenRenderTarget = new CubismOffscreenRenderTarget_WebGL();
                offscreenRenderTarget.createRenderTarget(this.gl, this._modelRenderTargetWidth, this._modelRenderTargetHeight, this._currentFbo);
                this._modelRenderTargets[i] = offscreenRenderTarget;
            }
            if (this._model.isUsingMaskingForOffscreen()) {
                this._offscreenMasks.length =
                    this._offscreenClippingManager.getRenderTextureCount();
                for (let i = 0; i < this._offscreenMasks.length; ++i) {
                    const offscreenMask = new CubismRenderTarget_WebGL();
                    offscreenMask.createRenderTarget(this.gl, this._offscreenClippingManager.getClippingMaskBufferSize(), this._offscreenClippingManager.getClippingMaskBufferSize(), this._currentFbo);
                    this._offscreenMasks[i] = offscreenMask;
                }
            }
            const offscreenCount = this._model.getOffscreenCount();
            // オフスクリーンの数が0の場合は何もしない
            if (offscreenCount > 0) {
                this._offscreenList = new Array(offscreenCount);
                for (let offscreenIndex = 0; offscreenIndex < offscreenCount; ++offscreenIndex) {
                    const offscreenRenderTarget = new CubismOffscreenRenderTarget_WebGL();
                    offscreenRenderTarget.setOffscreenIndex(offscreenIndex);
                    this._offscreenList[offscreenIndex] = offscreenRenderTarget;
                }
                // 全てのオフスクリーンを登録し終わってから行う
                this.setupParentOffscreens(this._model, offscreenCount);
            }
        }
        // 描画対象を初期状態に戻す
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentFbo);
    }
}
/**
 * レンダラが保持する静的なリソースを開放する
 */
CubismRenderer.staticRelease = () => {
    CubismRenderer_WebGL.doStaticRelease();
};
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework$1;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismClippingContext = CubismClippingContext_WebGL;
    Live2DCubismFramework.CubismClippingManager_WebGL = CubismClippingManager_WebGL;
    Live2DCubismFramework.CubismRenderer_WebGL = CubismRenderer_WebGL;
})(Live2DCubismFramework$1 || (Live2DCubismFramework$1 = {}));

/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * モデル座標設定用の4x4行列
 *
 * モデル座標設定用の4x4行列クラス
 */
class CubismModelMatrix extends CubismMatrix44 {
    /**
     * コンストラクタ
     *
     * @param w 横幅
     * @param h 縦幅
     */
    constructor(w, h) {
        super();
        this._width = w !== undefined ? w : 0.0;
        this._height = h !== undefined ? h : 0.0;
        this.setHeight(2.0);
    }
    /**
     * 横幅を設定
     *
     * @param w 横幅
     */
    setWidth(w) {
        const scaleX = w / this._width;
        const scaleY = scaleX;
        this.scale(scaleX, scaleY);
    }
    /**
     * 縦幅を設定
     * @param h 縦幅
     */
    setHeight(h) {
        const scaleX = h / this._height;
        const scaleY = scaleX;
        this.scale(scaleX, scaleY);
    }
    /**
     * 位置を設定
     *
     * @param x X軸の位置
     * @param y Y軸の位置
     */
    setPosition(x, y) {
        this.translate(x, y);
    }
    /**
     * 中心位置を設定
     *
     * @param x X軸の中心位置
     * @param y Y軸の中心位置
     *
     * @note widthかheightを設定したあとでないと、拡大率が正しく取得できないためずれる。
     */
    setCenterPosition(x, y) {
        this.centerX(x);
        this.centerY(y);
    }
    /**
     * 上辺の位置を設定する
     *
     * @param y 上辺のY軸位置
     */
    top(y) {
        this.setY(y);
    }
    /**
     * 下辺の位置を設定する
     *
     * @param y 下辺のY軸位置
     */
    bottom(y) {
        const h = this._height * this.getScaleY();
        this.translateY(y - h);
    }
    /**
     * 左辺の位置を設定
     *
     * @param x 左辺のX軸位置
     */
    left(x) {
        this.setX(x);
    }
    /**
     * 右辺の位置を設定
     *
     * @param x 右辺のX軸位置
     */
    right(x) {
        const w = this._width * this.getScaleX();
        this.translateX(x - w);
    }
    /**
     * X軸の中心位置を設定
     *
     * @param x X軸の中心位置
     */
    centerX(x) {
        const w = this._width * this.getScaleX();
        this.translateX(x - w / 2.0);
    }
    /**
     * X軸の位置を設定
     *
     * @param x X軸の位置
     */
    setX(x) {
        this.translateX(x);
    }
    /**
     * Y軸の中心位置を設定
     *
     * @param y Y軸の中心位置
     */
    centerY(y) {
        const h = this._height * this.getScaleY();
        this.translateY(y - h / 2.0);
    }
    /**
     * Y軸の位置を設定する
     *
     * @param y Y軸の位置
     */
    setY(y) {
        this.translateY(y);
    }
    /**
     * レイアウト情報から位置を設定
     *
     * @param layout レイアウト情報
     */
    setupFromLayout(layout) {
        const keyWidth = 'width';
        const keyHeight = 'height';
        const keyX = 'x';
        const keyY = 'y';
        const keyCenterX = 'center_x';
        const keyCenterY = 'center_y';
        const keyTop = 'top';
        const keyBottom = 'bottom';
        const keyLeft = 'left';
        const keyRight = 'right';
        for (const item of layout) {
            const key = item[0];
            const value = item[1];
            if (key == keyWidth) {
                this.setWidth(value);
            }
            else if (key == keyHeight) {
                this.setHeight(value);
            }
        }
        for (const item of layout) {
            const key = item[0];
            const value = item[1];
            if (key == keyX) {
                this.setX(value);
            }
            else if (key == keyY) {
                this.setY(value);
            }
            else if (key == keyCenterX) {
                this.centerX(value);
            }
            else if (key == keyCenterY) {
                this.centerY(value);
            }
            else if (key == keyTop) {
                this.top(value);
            }
            else if (key == keyBottom) {
                this.bottom(value);
            }
            else if (key == keyLeft) {
                this.left(value);
            }
            else if (key == keyRight) {
                this.right(value);
            }
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelMatrix = CubismModelMatrix;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));

const $ = (id) => document.getElementById(id);

const importScreen = $("importScreen");
const renderScreen = $("renderScreen");
const modelInput = $("modelInput");
const importBtn = $("importBtn");
const readyBtn = $("readyBtn");
const backBtn = $("backBtn");
const reloadBtn = $("reloadBtn");
const status = $("status");
const details = $("details");
const canvas = $("live2dCanvas");
const zoomRange = $("zoomRange");

let modelPackage = null;
let modelConfig = null;
let modelConfigPath = "";
let modelName = "";
let frameworkReady = false;
let renderer = null;
let moc = null;
let model = null;
let modelMatrix = null;
let gl = null;
let animationFrame = null;
let textures = [];
let zoom = 1;

function normalizePath(path) {
  const parts = [];

  for (const part of path.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }

  return parts.join("/");
}

function joinPath(base, file) {
  return normalizePath(base + file);
}

function findZipFile(zip, path) {
  return zip.file(path) ||
    zip.file(path.replace(/\\/g, "/"));
}

async function loadPreview(zip, paths) {
  const preferred = paths.find(path =>
    /(^|\/)(icon|preview|thumbnail)(_[0-9]+)?\.png$/i.test(path)
  );

  const candidate = preferred ||
    paths.find(path => /\.png$/i.test(path));

  if (!candidate) return;

  const blob = await zip.file(candidate).async("blob");
  const url = URL.createObjectURL(blob);

  const image = $("modelPreview");

  if (image.dataset.url) {
    URL.revokeObjectURL(image.dataset.url);
  }

  image.dataset.url = url;
  image.src = url;
  image.hidden = false;
  $("placeholder").hidden = true;
}

function showError(error) {
  console.error(error);
  status.textContent = "Erro: " + error.message;
  readyBtn.disabled = true;
}

importBtn.addEventListener("click", () => modelInput.click());

modelInput.addEventListener("change", async () => {
  const file = modelInput.files?.[0];
  if (!file) return;

  importBtn.disabled = true;
  readyBtn.disabled = true;
  details.textContent = "";
  status.textContent = "Lendo pacote ZIP...";

  try {
    const zip = await JSZip.loadAsync(file);
    const paths = Object.keys(zip.files).filter(
      path => !zip.files[path].dir
    );

    const configPath = paths.find(path =>
      path.toLowerCase().endsWith(".model3.json")
    );

    if (!configPath) {
      throw new Error("Arquivo .model3.json não encontrado.");
    }

    const config = JSON.parse(
      await zip.file(configPath).async("string")
    );

    const base = configPath.slice(
      0,
      configPath.lastIndexOf("/") + 1
    );

    const references = config.FileReferences || {};

    if (!references.Moc) {
      throw new Error("Referência ao MOC3 não encontrada.");
    }

    const mocPath = joinPath(base, references.Moc);

    if (!findZipFile(zip, mocPath)) {
      throw new Error("Arquivo MOC3 ausente: " + mocPath);
    }

    const texturePaths = (references.Textures || []).map(
      path => joinPath(base, path)
    );

    if (!texturePaths.length) {
      throw new Error("O modelo não possui texturas configuradas.");
    }

    for (const path of texturePaths) {
      if (!findZipFile(zip, path)) {
        throw new Error("Textura ausente: " + path);
      }
    }

    modelPackage = zip;
    modelConfig = config;
    modelConfigPath = configPath;
    modelName = configPath.split("/").pop()
      .replace(/\.model3\.json$/i, "");

    $("modelName").textContent = modelName;

    await loadPreview(zip, paths);

    const physics = references.Physics
      ? !!findZipFile(zip, joinPath(base, references.Physics))
      : false;

    details.innerHTML = `
      <p>✓ Configuração do modelo</p>
      <p>✓ Arquivo MOC3</p>
      <p>✓ ${texturePaths.length} textura(s)</p>
      <p>${physics ? "✓ Física encontrada" : "— Sem física configurada"}</p>
      <p>${paths.length} arquivos no pacote</p>
    `;

    status.textContent = "Modelo validado com sucesso!";
    readyBtn.disabled = false;

  } catch (error) {
    showError(error);
    modelPackage = null;
    modelConfig = null;
  } finally {
    importBtn.disabled = false;
    modelInput.value = "";
  }
});

function initializeFramework() {
  if (frameworkReady) return;

  if (!window.Live2DCubismCore) {
    throw new Error("Live2D Cubism Core não foi carregado.");
  }

  CubismFramework.startUp();
  CubismFramework.initialize();

  frameworkReady = true;
}

async function imageFromZip(zip, path) {
  const file = findZipFile(zip, path);

  if (!file) {
    throw new Error("Textura não encontrada: " + path);
  }

  const blob = await file.async("blob");

  if ("createImageBitmap" in window) {
    return await createImageBitmap(blob);
  }

  return await new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(blob);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível abrir uma textura."));
    };

    image.src = url;
  });
}

function resizeCanvas() {
  if (!gl || !renderer) return;

  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  gl.viewport(0, 0, width, height);
}

async function createTexture(image, index) {
  const texture = gl.createTexture();

  if (!texture) {
    throw new Error("Não foi possível criar uma textura WebGL.");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    gl.LINEAR
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.CLAMP_TO_EDGE
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.CLAMP_TO_EDGE
  );

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    image
  );

  renderer.bindTexture(index, texture);
  textures.push(texture);
}

async function destroyRenderer() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  if (gl) {
    textures.forEach(texture => gl.deleteTexture(texture));
  }

  textures = [];
  renderer = null;
  model = null;
  moc = null;
  modelMatrix = null;
  gl = null;
}

async function createLive2D() {
  await destroyRenderer();

  $("renderStatus").textContent = "Inicializando Live2D...";
  $("renderPlaceholder").hidden = false;

  gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
  });

  if (!gl) {
    throw new Error("WebGL não está disponível neste dispositivo.");
  }

  initializeFramework();

  const base = modelConfigPath.slice(
    0,
    modelConfigPath.lastIndexOf("/") + 1
  );

  const references = modelConfig.FileReferences;

  $("renderStatus").textContent = "Carregando modelo...";

  const mocPath = joinPath(base, references.Moc);
  const mocBuffer = await findZipFile(
    modelPackage,
    mocPath
  ).async("arraybuffer");

  moc = CubismMoc.create(mocBuffer, false);

  if (!moc) {
    throw new Error("O Cubism não conseguiu abrir o MOC3.");
  }

  model = moc.createModel();

  if (!model) {
    throw new Error("Não foi possível criar o modelo Live2D.");
  }

  modelMatrix = new CubismModelMatrix(
    model.getCanvasWidth(),
    model.getCanvasHeight()
  );

  modelMatrix.setWidth(2.0);
  modelMatrix.setCenterPosition(0, 0);

  renderer = new CubismRenderer_WebGL();
  renderer.initialize(model);
  renderer.startUp(gl);
  renderer.setIsPremultipliedAlpha(true);

  $("renderStatus").textContent = "Carregando texturas...";

  for (let i = 0; i < references.Textures.length; i++) {
    const path = joinPath(base, references.Textures[i]);
    const image = await imageFromZip(modelPackage, path);

    await createTexture(image, i);

    if (image.close) image.close();
  }

  resizeCanvas();

  $("renderPlaceholder").hidden = true;
  $("renderStatus").textContent = "Live2D ativo";

  renderLoop();
}

function renderLoop() {
  if (!gl || !renderer || !model) return;

  resizeCanvas();

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  model.update();

  modelMatrix.setWidth(2.0 / zoom);
  modelMatrix.setCenterPosition(0, 0);

  renderer.setMvpMatrix(modelMatrix);
  renderer.setRenderState(null, [
    0,
    0,
    canvas.width,
    canvas.height
  ]);

  renderer.drawModel();

  animationFrame = requestAnimationFrame(renderLoop);
}

readyBtn.addEventListener("click", async () => {
  if (!modelPackage || !modelConfig) return;

  importScreen.hidden = true;
  renderScreen.hidden = false;

  $("studioModelName").textContent = modelName;

  try {
    await createLive2D();
  } catch (error) {
    console.error(error);

    $("renderStatus").textContent = "Falha ao renderizar";
    $("renderPlaceholder").hidden = false;

    alert("Erro ao carregar Live2D: " + error.message);
  }
});

backBtn.addEventListener("click", async () => {
  await destroyRenderer();

  renderScreen.hidden = true;
  importScreen.hidden = false;
});

reloadBtn.addEventListener("click", async () => {
  if (!modelPackage) return;

  try {
    await createLive2D();
  } catch (error) {
    $("renderStatus").textContent = "Falha ao recarregar";
    console.error(error);
    alert(error.message);
  }
});

zoomRange.addEventListener("input", () => {
  zoom = Number(zoomRange.value) / 100;
});

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("webglcontextlost", event => {
  event.preventDefault();

  $("renderStatus").textContent = "Contexto WebGL perdido";
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

$("renderStatus").textContent = "Aguardando modelo...";
