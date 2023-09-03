    varying vec2 vUv;
    uniform float u_time;

    void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uv.x,uv.y,abs(sin(u_time)));
        gl_FragColor = vec4(color,1.0);
    }