/**
 * WebGL 指纹生成工具
 * @description 生成与 BrowserLeaks 一致的 WebGL 指纹 hash
 * @usage const result = getWebGLFingerprint()
 * @returns {Object} { supported: boolean, hash: string, data: object }
 */
(function(window) {
  'use strict';

  /**
   * MD5 哈希函数
   * @param {string} string - 要哈希的字符串
   * @returns {string} MD5 哈希值（32位小写十六进制）
   */
  function md5(string) {
      function md5cycle(x, k) {
          var a = x[0], b = x[1], c = x[2], d = x[3];
          a = ff(a, b, c, d, k[0], 7, -680876936);
          d = ff(d, a, b, c, k[1], 12, -389564586);
          c = ff(c, d, a, b, k[2], 17, 606105819);
          b = ff(b, c, d, a, k[3], 22, -1044525330);
          a = ff(a, b, c, d, k[4], 7, -176418897);
          d = ff(d, a, b, c, k[5], 12, 1200080426);
          c = ff(c, d, a, b, k[6], 17, -1473231341);
          b = ff(b, c, d, a, k[7], 22, -45705983);
          a = ff(a, b, c, d, k[8], 7, 1770035416);
          d = ff(d, a, b, c, k[9], 12, -1958414417);
          c = ff(c, d, a, b, k[10], 17, -42063);
          b = ff(b, c, d, a, k[11], 22, -1990404162);
          a = ff(a, b, c, d, k[12], 7, 1804603682);
          d = ff(d, a, b, c, k[13], 12, -40341101);
          c = ff(c, d, a, b, k[14], 17, -1502002290);
          b = ff(b, c, d, a, k[15], 22, 1236535329);
          a = gg(a, b, c, d, k[1], 5, -165796510);
          d = gg(d, a, b, c, k[6], 9, -1069501632);
          c = gg(c, d, a, b, k[11], 14, 643717713);
          b = gg(b, c, d, a, k[0], 20, -373897302);
          a = gg(a, b, c, d, k[5], 5, -701558691);
          d = gg(d, a, b, c, k[10], 9, 38016083);
          c = gg(c, d, a, b, k[15], 14, -660478335);
          b = gg(b, c, d, a, k[4], 20, -405537848);
          a = gg(a, b, c, d, k[9], 5, 568446438);
          d = gg(d, a, b, c, k[14], 9, -1019803690);
          c = gg(c, d, a, b, k[3], 14, -187363961);
          b = gg(b, c, d, a, k[8], 20, 1163531501);
          a = gg(a, b, c, d, k[13], 5, -1444681467);
          d = gg(d, a, b, c, k[2], 9, -51403784);
          c = gg(c, d, a, b, k[7], 14, 1735328473);
          b = gg(b, c, d, a, k[12], 20, -1926607734);
          a = hh(a, b, c, d, k[5], 4, -378558);
          d = hh(d, a, b, c, k[8], 11, -2022574463);
          c = hh(c, d, a, b, k[11], 16, 1839030562);
          b = hh(b, c, d, a, k[14], 23, -35309556);
          a = hh(a, b, c, d, k[1], 4, -1530992060);
          d = hh(d, a, b, c, k[4], 11, 1272893353);
          c = hh(c, d, a, b, k[7], 16, -155497632);
          b = hh(b, c, d, a, k[10], 23, -1094730640);
          a = hh(a, b, c, d, k[13], 4, 681279174);
          d = hh(d, a, b, c, k[0], 11, -358537222);
          c = hh(c, d, a, b, k[3], 16, -722521979);
          b = hh(b, c, d, a, k[6], 23, 76029189);
          a = hh(a, b, c, d, k[9], 4, -640364487);
          d = hh(d, a, b, c, k[12], 11, -421815835);
          c = hh(c, d, a, b, k[15], 16, 530742520);
          b = hh(b, c, d, a, k[2], 23, -995338651);
          a = ii(a, b, c, d, k[0], 6, -198630844);
          d = ii(d, a, b, c, k[7], 10, 1126891415);
          c = ii(c, d, a, b, k[14], 15, -1416354905);
          b = ii(b, c, d, a, k[5], 21, -57434055);
          a = ii(a, b, c, d, k[12], 6, 1700485571);
          d = ii(d, a, b, c, k[3], 10, -1894986606);
          c = ii(c, d, a, b, k[10], 15, -1051523);
          b = ii(b, c, d, a, k[1], 21, -2054922799);
          a = ii(a, b, c, d, k[8], 6, 1873313359);
          d = ii(d, a, b, c, k[15], 10, -30611744);
          c = ii(c, d, a, b, k[6], 15, -1560198380);
          b = ii(b, c, d, a, k[13], 21, 1309151649);
          a = ii(a, b, c, d, k[4], 6, -145523070);
          d = ii(d, a, b, c, k[11], 10, -1120210379);
          c = ii(c, d, a, b, k[2], 15, 718787259);
          b = ii(b, c, d, a, k[9], 21, -343485551);
          x[0] = add32(a, x[0]);
          x[1] = add32(b, x[1]);
          x[2] = add32(c, x[2]);
          x[3] = add32(d, x[3]);
      }
      
      function cmn(q, a, b, x, s, t) {
          a = add32(add32(a, q), add32(x, t));
          return add32((a << s) | (a >>> (32 - s)), b);
      }
      
      function ff(a, b, c, d, x, s, t) {
          return cmn((b & c) | ((~b) & d), a, b, x, s, t);
      }
      
      function gg(a, b, c, d, x, s, t) {
          return cmn((b & d) | (c & (~d)), a, b, x, s, t);
      }
      
      function hh(a, b, c, d, x, s, t) {
          return cmn(b ^ c ^ d, a, b, x, s, t);
      }
      
      function ii(a, b, c, d, x, s, t) {
          return cmn(c ^ (b | (~d)), a, b, x, s, t);
      }
      
      function md51(s) {
          var n = s.length;
          var state = [1732584193, -271733879, -1732584194, 271733878];
          var i;
          for (i = 64; i <= s.length; i += 64) {
              md5cycle(state, md5blk(s.substring(i - 64, i)));
          }
          s = s.substring(i - 64);
          var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (i = 0; i < s.length; i++) {
              tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
          }
          tail[i >> 2] |= 0x80 << ((i % 4) << 3);
          if (i > 55) {
              md5cycle(state, tail);
              for (i = 0; i < 16; i++) tail[i] = 0;
          }
          tail[14] = n << 3;
          tail[15] = n >>> 29;
          md5cycle(state, tail);
          return state;
      }
      
      function md5blk(s) {
          var md5blks = [];
          for (var i = 0; i < 64; i += 4) {
              md5blks[i >> 2] = s.charCodeAt(i) +
                  (s.charCodeAt(i + 1) << 8) +
                  (s.charCodeAt(i + 2) << 16) +
                  (s.charCodeAt(i + 3) << 24);
          }
          return md5blks;
      }
      
      var hex_chr = '0123456789abcdef'.split('');
      
      function rhex(n) {
          var s = '';
          for (var j = 0; j < 4; j++) {
              s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
          }
          return s;
      }
      
      function hex(x) {
          for (var i = 0; i < x.length; i++) {
              x[i] = rhex(x[i]);
          }
          return x.join('');
      }
      
      function add32(a, b) {
          return (a + b) & 0xFFFFFFFF;
      }
      
      return hex(md51(string));
  }

  /**
   * 获取 WebGL 上下文信息（按照 BrowserLeaks 的键顺序）
   * @param {string} contextName - 'webgl' 或 'webgl2'
   * @returns {Object|null} WebGL 上下文数据
   */
  function getWebGLContext(contextName) {
      var canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      
      try {
          var gl = canvas.getContext(contextName, {
              failIfMajorPerformanceCaveat: false
          });
          
          if (!gl || (gl.isContextLost && gl.isContextLost())) {
              return null;
          }
          
          var result = {};
          
          // 严格按照 BrowserLeaks 的键顺序
          var keyOrder = contextName === 'webgl2' ? [
              'VERSION', 'SHADING_LANGUAGE_VERSION', 'VENDOR', 'RENDERER',
              'MAX_VERTEX_ATTRIBS', 'MAX_VERTEX_UNIFORM_VECTORS', 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
              'MAX_VARYING_VECTORS', 'MAX_VERTEX_UNIFORM_COMPONENTS', 'MAX_VERTEX_UNIFORM_BLOCKS',
              'MAX_VERTEX_OUTPUT_COMPONENTS', 'MAX_VARYING_COMPONENTS',
              'MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS', 'MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS',
              'MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS', 'ALIASED_LINE_WIDTH_RANGE',
              'ALIASED_POINT_SIZE_RANGE', 'MAX_FRAGMENT_UNIFORM_VECTORS', 'MAX_TEXTURE_IMAGE_UNITS',
              'MAX_FRAGMENT_UNIFORM_COMPONENTS', 'MAX_FRAGMENT_UNIFORM_BLOCKS',
              'MAX_FRAGMENT_INPUT_COMPONENTS', 'MIN_PROGRAM_TEXEL_OFFSET', 'MAX_PROGRAM_TEXEL_OFFSET',
              'MAX_DRAW_BUFFERS', 'MAX_COLOR_ATTACHMENTS', 'MAX_SAMPLES', 'MAX_RENDERBUFFER_SIZE',
              'MAX_VIEWPORT_DIMS', 'RED_BITS', 'GREEN_BITS', 'BLUE_BITS', 'ALPHA_BITS',
              'DEPTH_BITS', 'STENCIL_BITS', 'MAX_TEXTURE_SIZE', 'MAX_CUBE_MAP_TEXTURE_SIZE',
              'MAX_COMBINED_TEXTURE_IMAGE_UNITS', 'MAX_3D_TEXTURE_SIZE', 'MAX_ARRAY_TEXTURE_LAYERS',
              'MAX_TEXTURE_LOD_BIAS', 'MAX_UNIFORM_BUFFER_BINDINGS', 'MAX_UNIFORM_BLOCK_SIZE',
              'UNIFORM_BUFFER_OFFSET_ALIGNMENT', 'MAX_COMBINED_UNIFORM_BLOCKS',
              'MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS', 'MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS'
          ] : [
              'VERSION', 'SHADING_LANGUAGE_VERSION', 'VENDOR', 'RENDERER',
              'MAX_VERTEX_ATTRIBS', 'MAX_VERTEX_UNIFORM_VECTORS', 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
              'MAX_VARYING_VECTORS', 'ALIASED_LINE_WIDTH_RANGE', 'ALIASED_POINT_SIZE_RANGE',
              'MAX_FRAGMENT_UNIFORM_VECTORS', 'MAX_TEXTURE_IMAGE_UNITS', 'MAX_RENDERBUFFER_SIZE',
              'MAX_VIEWPORT_DIMS', 'RED_BITS', 'GREEN_BITS', 'BLUE_BITS', 'ALPHA_BITS',
              'DEPTH_BITS', 'STENCIL_BITS', 'MAX_TEXTURE_SIZE', 'MAX_CUBE_MAP_TEXTURE_SIZE',
              'MAX_COMBINED_TEXTURE_IMAGE_UNITS'
          ];
          
          // 按顺序获取参数
          keyOrder.forEach(function(key) {
              try {
                  var value = gl.getParameter(gl[key]);
                  if (value !== null && value !== undefined) {
                      result[key] = value;
                  }
              } catch (e) {
                  // 忽略错误
              }
          });
          
          // 添加上下文属性
          var attrs = gl.getContextAttributes();
          if (attrs) {
              result.alpha = attrs.alpha;
              result.antialias = attrs.antialias;
              result.depth = attrs.depth;
              result.desynchronized = attrs.desynchronized;
              result.failIfMajorPerformanceCaveat = attrs.failIfMajorPerformanceCaveat;
              result.powerPreference = attrs.powerPreference;
              result.premultipliedAlpha = attrs.premultipliedAlpha;
              result.preserveDrawingBuffer = attrs.preserveDrawingBuffer;
              result.stencil = attrs.stencil;
              result.xrCompatible = attrs.xrCompatible;
          }
          
          result.drawingBufferColorSpace = gl.drawingBufferColorSpace;
          result.unpackColorSpace = gl.unpackColorSpace;
          
          // 获取真实渲染器信息
          var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
              result.UNMASKED_RENDERER_WEBGL = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
              result.UNMASKED_VENDOR_WEBGL = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          }
          
          // Shader 精度信息
          var vsPrecision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
          var vsMedium = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT);
          var vsResult = vsPrecision.precision === 0 ? vsMedium : vsPrecision;
          result.VERTEX_SHADER = '[-2^' + vsResult.rangeMin + ',2^' + vsResult.rangeMax + '](' + vsResult.precision + ')';
          
          var fsPrecision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
          var fsMedium = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT);
          var fsResult = fsPrecision.precision === 0 ? fsMedium : fsPrecision;
          result.FRAGMENT_SHADER = '[-2^' + fsResult.rangeMin + ',2^' + fsResult.rangeMax + '](' + fsResult.precision + ')';
          
          var highFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision !== 0 ? 'highp/' : 'mediump/';
          var highInt = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax !== 0 ? 'highp' : 'lowp';
          result.HIGH_FLOAT_HIGH_INT = highFloat + highInt;
          
          // WebGL 1 特有扩展
          if (contextName === 'webgl') {
              var drawBuffers = gl.getExtension('WEBGL_draw_buffers');
              if (drawBuffers) {
                  result.MAX_DRAW_BUFFERS_WEBGL = gl.getParameter(drawBuffers.MAX_DRAW_BUFFERS_WEBGL);
              }
          }
          
          // 各向异性过滤
          var anisotropic = gl.getExtension('EXT_texture_filter_anisotropic') ||
                          gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
                          gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
          if (anisotropic) {
              result.MAX_TEXTURE_MAX_ANISOTROPY_EXT = gl.getParameter(anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          }
          
          // 扩展列表
          result.extensions = gl.getSupportedExtensions();
          
          return result;
          
      } catch (e) {
          console.error('获取 WebGL 上下文失败:', e);
          return null;
      }
  }

  /**
   * 获取 WebGL 指纹
   * @returns {Object} 包含 supported, hash, data 的对象
   */
  window.getWebGLFingerprint = function() {
      var webglData = {};
      
      // 获取 WebGL 2（注意顺序：webgl2 在前）
      var webgl2 = getWebGLContext('webgl2');
      if (webgl2) {
          webglData.webgl2 = webgl2;
      }
      
      // 获取 WebGL 1
      var webgl1 = getWebGLContext('webgl');
      if (webgl1) {
          webglData.webgl = webgl1;
      }
      
      // 检查是否支持 WebGL
      if (Object.keys(webglData).length === 0) {
          return {
              supported: false,
              hash: null,
              data: null
          };
      }
      
      // 生成 hash
      var jsonString = JSON.stringify(webglData);
      var hash = md5(jsonString);
      
      return {
          supported: true,
          hash: hash,
          data: webglData
      };
  };

})(window);
