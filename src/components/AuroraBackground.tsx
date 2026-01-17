import React, { useEffect, useRef, memo } from 'react';

// Vertex Shader
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// LAGO DI GARDA: Particles + VISIBLE Water Waves
const fragmentShaderSource = `
  precision highp float;
  
  uniform float u_time;
  uniform vec2 u_resolution;
  
  #define PI 3.14159265359
  #define NUM_PARTICLES 15.0
  #define NUM_WAVES 6.0
  
  float hash(float n) { return fract(sin(n) * 43758.5453); }
  float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  
  // Particle with glow
  float particle(vec2 uv, vec2 pos, float size) {
    float d = length(uv - pos);
    return smoothstep(size, size * 0.1, d) + smoothstep(size * 3.0, size, d) * 0.3;
  }
  
  // VISIBLE Wave line
  float waveLine(vec2 uv, float yBase, float amplitude, float frequency, float speed, float thickness) {
    float wave = yBase + sin(uv.x * frequency + u_time * speed) * amplitude;
    wave += sin(uv.x * frequency * 0.7 - u_time * speed * 0.8) * amplitude * 0.5;
    wave += sin(uv.x * frequency * 1.3 + u_time * speed * 1.2) * amplitude * 0.3;
    
    float dist = abs(uv.y - wave);
    float line = smoothstep(thickness, thickness * 0.1, dist);
    
    // Add glow around the line
    float glow = smoothstep(thickness * 4.0, thickness, dist) * 0.3;
    
    return line + glow;
  }
  
  // Stars
  float stars(vec2 uv, float layer) {
    float s = 0.0;
    vec2 gv = fract(uv * (25.0 + layer * 15.0)) - 0.5;
    vec2 id = floor(uv * (25.0 + layer * 15.0));
    float r = hash2(id + layer);
    if (r > 0.85) {
      float d = length(gv - (vec2(hash2(id), hash2(id + 50.0)) - 0.5) * 0.4);
      s = smoothstep(0.03, 0.0, d) * (0.5 + 0.5 * sin(u_time * 2.0 + r * 10.0)) * r;
    }
    return s;
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy - u_resolution.xy * 0.5) / u_resolution.y;
    
    float t = u_time * 0.5;
    
    // === LAGO DI GARDA COLORS ===
    vec3 deepBlue = vec3(0.01, 0.04, 0.08);
    vec3 gardaBlue = vec3(0.1, 0.35, 0.45);
    vec3 gardaTeal = vec3(0.15, 0.55, 0.6);
    vec3 waterLight = vec3(0.25, 0.7, 0.75);
    vec3 warmGold = vec3(0.8, 0.55, 0.2);
    
    // === BASE: Gradient ===
    vec3 color = mix(deepBlue, gardaBlue * 0.3, uv.y * 0.5);
    
    // === STARS (top area) ===
    float starMask = smoothstep(0.4, 0.8, uv.y);
    float star1 = stars(uv + vec2(t * 0.02, 0.0), 0.0);
    float star2 = stars(uv + vec2(-t * 0.015, t * 0.01), 1.0);
    color += vec3(0.9, 0.95, 1.0) * (star1 + star2 * 0.5) * 0.5 * starMask;
    
    // === VISIBLE WATER WAVES (bottom half) ===
    float waveZone = smoothstep(0.6, 0.2, uv.y);  // Stronger at bottom
    
    // Multiple wave layers
    float waves = 0.0;
    for (float i = 0.0; i < NUM_WAVES; i++) {
      float yPos = 0.15 + i * 0.08;  // Stacked wave lines
      float amp = 0.015 + i * 0.005;
      float freq = 8.0 - i * 0.5;
      float spd = 0.8 + i * 0.15;
      float thick = 0.003 + i * 0.001;
      
      float wave = waveLine(uv, yPos, amp, freq, spd * (mod(i, 2.0) == 0.0 ? 1.0 : -1.0), thick);
      waves += wave * (1.0 - i * 0.12);  // Fade out higher waves
    }
    
    // Apply wave color
    vec3 waveColor = mix(gardaTeal, waterLight, waves * 0.5);
    color = mix(color, waveColor, waves * waveZone * 0.7);
    
    // === FLOATING PARTICLES ===
    for (float i = 0.0; i < NUM_PARTICLES; i++) {
      float seed = i * 1.618;
      vec2 pos = vec2(
        sin(t * 0.3 + seed * 3.0) * 0.5 + hash(seed) * 0.4 - 0.2,
        cos(t * 0.25 + seed * 2.0) * 0.35 + hash(seed + 100.0) * 0.4 - 0.2
      );
      
      float size = 0.005 + hash(seed + 200.0) * 0.008;
      float brightness = 0.3 + hash(seed + 300.0) * 0.7;
      brightness *= 0.5 + 0.5 * sin(t * 1.5 + seed * 4.0);
      
      float part = particle(p, pos, size) * brightness;
      vec3 partColor = mix(gardaTeal, waterLight, hash(seed + 400.0));
      color += partColor * part * 0.4;
    }
    
    // === WATER SURFACE SHIMMER (very top of water zone) ===
    float surfaceY = 0.55 + sin(uv.x * 10.0 + t) * 0.02;
    float surface = smoothstep(0.02, 0.0, abs(uv.y - surfaceY));
    surface *= 0.5 + 0.5 * sin(uv.x * 30.0 + t * 2.0);
    color += waterLight * surface * 0.4;
    
    // === HORIZON GLOW ===
    float horizon = smoothstep(0.1, 0.0, uv.y);
    color = mix(color, warmGold * 0.3, horizon * 0.5);
    
    // === CAUSTICS (underwater light patterns) ===
    float caustic = sin(uv.x * 15.0 + t) * sin(uv.y * 12.0 - t * 0.5);
    caustic = caustic * 0.5 + 0.5;
    caustic *= smoothstep(0.5, 0.0, uv.y);  // Only in water
    color += gardaTeal * caustic * 0.08;
    
    // === VIGNETTE ===
    float vignette = 1.0 - smoothstep(0.4, 1.15, length(p * vec2(1.0, 0.75)));
    color *= vignette * 0.9 + 0.1;
    
    // === BALANCED DARKNESS ===
    color *= 0.75;
    
    color = clamp(color, 0.0, 1.0);
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = memo(({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power'
    });

    if (!gl) return;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      gl.uniform1f(timeLoc, (Date.now() - startTimeRef.current) / 1000);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
});

AuroraBackground.displayName = 'AuroraBackground';
