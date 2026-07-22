"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `#version 300 es
const vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
out vec2 vUv;

void main() {
  vUv = (pos[gl_VertexID] + 1.0) * 0.5;
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseActive;
uniform vec2 uResolution;
uniform vec3 uBackground;
uniform vec3 uLineNear;
uniform vec3 uLineFar;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Bruit simplex 3D (Ashima Arts / webgl-noise) : la 3e composante sert
// d'axe temporel, pour un champ qui évolue vraiment plutôt qu'un motif
// qui glisse.
vec3 mod289_3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289_4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289_4(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289_3(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Courbes de niveau : crête à chaque multiple de 1/k du champ. Largeur
// dérivée de fwidth() pour rester nette même où le champ varie lentement.
float contourLayer(vec2 p, float t, float scale, float k, float seed) {
  float n = snoise(vec3(p * scale + seed, t));
  float v = n * k;
  float lines = fract(v);
  float d = abs(lines - 0.5);

  float aa = max(fwidth(v), 0.0008);
  float halfWidth = 0.55 * aa;
  return 1.0 - smoothstep(halfWidth, halfWidth + aa, d);
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = vUv;

  // Tourbillon au curseur : rotation locale dont l'angle s'annule avec la
  // distance, sans la singularité qu'un déplacement radial normalisé aurait
  // au centre exact.
  vec2 toMouse = (uv - uMouse) * vec2(aspect, 1.0);
  float distToMouse = length(toMouse);
  float falloff = smoothstep(0.42, 0.0, distToMouse) * uMouseActive;
  float swirl = falloff * falloff * 1.6;
  float sw = sin(swirl);
  float cw = cos(swirl);
  vec2 swirled = vec2(
    toMouse.x * cw - toMouse.y * sw,
    toMouse.x * sw + toMouse.y * cw
  );
  uv += (swirled - toMouse) * vec2(1.0 / aspect, 1.0);

  vec2 p = vec2(uv.x * aspect, uv.y);

  // Deux échelles pour donner de la profondeur : formes discrètes en
  // arrière-plan, un peu plus marquées au premier plan.
  float far = contourLayer(p, uTime * 0.04, 1.3, 2.0, 12.0);
  float near = contourLayer(p, uTime * 0.03, 0.85, 2.6, 0.0);

  vec3 color = uBackground;
  color = mix(color, uLineFar, far * 0.18);
  color = mix(color, uLineNear, near * 0.45);

  // Zone claire au centre pour détacher le texte du fond.
  vec2 centerDelta = (vUv - vec2(0.5)) * vec2(aspect, 1.0);
  float clearing = smoothstep(0.2, 0.6, length(centerDelta));
  color = mix(uBackground, color, clearing);

  color = mix(color, color + 0.04, falloff * 0.5);

  outColor = vec4(color, 1.0);
}
`;

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

type RGB = [number, number, number];

interface ShaderWavesProps {
  className?: string;
  background?: RGB;
  lineNear?: RGB;
  lineFar?: RGB;
}

const DEFAULT_BACKGROUND: RGB = [0.969, 0.945, 0.902];
const DEFAULT_LINE_NEAR: RGB = [0.62, 0.44, 0.44];
const DEFAULT_LINE_FAR: RGB = [0.72, 0.62, 0.6];

export default function ShaderWaves({
  className,
  background = DEFAULT_BACKGROUND,
  lineNear = DEFAULT_LINE_NEAR,
  lineFar = DEFAULT_LINE_FAR,
}: ShaderWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: true });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    gl.useProgram(program);

    const resolutionLoc = gl.getUniformLocation(program, "uResolution");
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const mouseLoc = gl.getUniformLocation(program, "uMouse");
    const mouseActiveLoc = gl.getUniformLocation(program, "uMouseActive");
    const backgroundLoc = gl.getUniformLocation(program, "uBackground");
    const lineNearLoc = gl.getUniformLocation(program, "uLineNear");
    const lineFarLoc = gl.getUniformLocation(program, "uLineFar");

    gl.uniform3f(backgroundLoc, ...background);
    gl.uniform3f(lineNearLoc, ...lineNear);
    gl.uniform3f(lineFarLoc, ...lineFar);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let active = 0;
    let targetActive = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(canvas.clientWidth * dpr);
      const height = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const withinX = event.clientX >= rect.left && event.clientX <= rect.right;
      const withinY = event.clientY >= rect.top && event.clientY <= rect.bottom;
      targetActive = withinX && withinY ? 1 : 0;
      mouse.targetX = (event.clientX - rect.left) / rect.width;
      mouse.targetY = 1 - (event.clientY - rect.top) / rect.height;
    };

    const handlePointerOut = () => {
      targetActive = 0;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerout", handlePointerOut);
    resize();

    let frameId: number;
    const start = performance.now();

    const render = (now: number) => {
      const elapsed = reduceMotion ? 0 : (now - start) / 1000;

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      active += (targetActive - active) * 0.08;

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);
      gl.uniform1f(mouseActiveLoc, active);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      gl.deleteProgram(program);
    };
  }, [background, lineNear, lineFar]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
