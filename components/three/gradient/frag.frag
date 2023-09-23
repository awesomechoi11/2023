varying vec2 vUv;
uniform float u_time;
uniform float u_aspect;
uniform float u_width;
uniform float u_height;
uniform float u_centerRadius;
uniform float u_barX;
uniform float u_barSkew;
uniform float u_barHeight;
uniform sampler2D u_trailTexture;
// Simplex 2D noise
//
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}
// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
// https://iquilezles.org/articles/

// polynomial smooth min 1 (k=0.1)
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdCircle(vec2 p, vec2 p2, float r) {
  return distance(p2, p) - r;
}

float sdParallelogram(in vec2 p, float wi, float he, float sk) {
  vec2 e = vec2(sk, he);
  p = (p.y < 0.0) ? -p : p;
  vec2 w = p - e;
  w.x -= clamp(w.x, -wi, wi);
  vec2 d = vec2(dot(w, w), -w.y);
  float s = p.x * e.y - p.y * e.x;
  p = (s < 0.0) ? -p : p;
  vec2 v = p - vec2(wi, 0);
  v -= e * clamp(dot(v, e) / dot(e, e), -1.0, 1.0);
  d = min(d, vec2(dot(v, v), wi * he - abs(s)));
  return sqrt(d.x) * sign(-d.y);
}

float screenScale(float val) {
  return val / 1920. * u_width;
}

void main() {
  vec2 uv = (vec2(vUv.x, vUv.y) - vec2(0.5)) * vec2(u_width, u_height);
  // uv.y /= u_aspect;
  // uv += displace * 10.;
  float displace = texture2D(u_trailTexture, vUv).r;
  float displaceAmount = sin(displace * 10.) * 0.5 + 0.5;
  uv += displaceAmount * 50.;

  float r = 0.7784 + 0.7184 * sin(3.1384 + u_time + snoise(uv / 0.09 / u_width + u_time * 0.07)) * sin(uv.x / u_width + u_time * 0.2);
  float g = 0.7784 + 0.1384 * sin(2.6776 + u_time + snoise(uv / 0.29 / u_width + (u_time * 0.03)));
  float b = 0.8514 + 0.2284 * sin(30.818 + u_time + snoise(uv / 0.09 / u_width + u_time * 0.02));
  vec4 grad = vec4(r, g, b, 1.);
  vec4 black = vec4(0.);
  vec4 color = mix(grad, black, displaceAmount * 0.1);

  // float rNoise = max(r, b) * (40.) + 25.;
  // float sdf = 0.;

  // center circle
  // sdf = sdCircle(vec2(0.), uv, u_centerRadius + rNoise * min(u_centerRadius, 1.)) + 500. * smoothstep(0., 75., -u_centerRadius + 75.);

  gl_FragColor = color;
}
