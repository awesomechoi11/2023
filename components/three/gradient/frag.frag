varying vec2 vUv;
uniform float u_time;
uniform int u_pcount;
uniform float u_ppos[30 * 2];
uniform float u_pspos[30 * 2];
uniform float u_aspect;
uniform vec2 u_center;
uniform float u_upperBound;
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

void main() {
  vec2 uv = (vec2(vUv.x, vUv.y) - vec2(0.5)) * u_upperBound;
  uv.x *= u_aspect;
  vec4 color = vec4(0.);

  float sdf = sdCircle(vec2(0.), uv, 150.1);

  for(int i = 0; i < u_pcount; i += 2) {

    vec2 position = vec2(0.);
    vec2 startPos = vec2(0.);
    for(int j = 0; j < 2; j++) {
      position[j] = u_ppos[i + j];
      startPos[j] = u_pspos[i + j];
    }
    float radius = smoothstep(0., 300., min(distance(startPos, position) * 0.3, 10. * distance(vec2(0.), position)));
    float sdfCircle = sdCircle(position, uv, radius * 27.);
    // if(sdf == 0.) {
    //   sdf = sdfCircle;
    // } else {
    sdf = smin(sdf, sdfCircle, 0.1 * u_upperBound * radius);
    // }
  }
  if(sdf < 0.) {
    color = vec4(0.7784 + 0.7184 * sin(3.1384 + u_time + snoise(uv / 0.3 / u_upperBound + u_time * 0.07)) * sin(uv.x / u_upperBound + u_time * 0.2), 0.7784 + 0.1384 * sin(2.6776 + u_time + snoise(uv / 0.7 / u_upperBound + (u_time * 0.03))), 0.8514 + 0.2284 * sin(30.818 + u_time + snoise(uv / 0.2 / u_upperBound + u_time * 0.02)), 1.0);
  }

  gl_FragColor = color;
}
