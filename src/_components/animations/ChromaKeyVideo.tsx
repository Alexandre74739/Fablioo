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

uniform sampler2D uVideo;
uniform float uGreenThreshold;

void main() {
  vec4 color = texture(uVideo, vUv);
  float r = color.r * 255.0;
  float g = color.g * 255.0;
  float b = color.b * 255.0;

  // Meme heuristique que l'ancienne version CPU : le vert de fond est
  // detecte par sa dominance plutot qu'une couleur exacte.
  float isGreen = step(uGreenThreshold, g) * step(r * 1.15, g) * step(b * 1.15, g);
  outColor = vec4(color.rgb, 1.0 - isGreen);
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

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  greenThreshold?: number;
}

export default function ChromaKeyVideo({
  src,
  className,
  greenThreshold = 90,
}: ChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    gl.useProgram(program);

    const videoLoc = gl.getUniformLocation(program, "uVideo");
    const thresholdLoc = gl.getUniformLocation(program, "uGreenThreshold");
    gl.uniform1i(videoLoc, 0);
    gl.uniform1f(thresholdLoc, greenThreshold);

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    let frameId: number;

    const draw = () => {
      if (video.videoWidth && video.videoHeight) {
        if (
          canvas.width !== video.videoWidth ||
          canvas.height !== video.videoHeight
        ) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }

        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video,
        );
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      if (!video.ended) {
        frameId = requestAnimationFrame(draw);
      }
    };

    video.playbackRate = 1;
    video.play().catch(() => {});
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    };
  }, [greenThreshold]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        autoPlay
        playsInline
        className="hidden"
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
}
