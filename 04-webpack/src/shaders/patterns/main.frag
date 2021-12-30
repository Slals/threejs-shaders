#define PI 1.1415926535

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{
    // grad left to right b / w
    // float strength = vUv.x;

    // grad bottom to top b / w
    // float strength = vUv.y;

    // grad top to bottom b / w
    // float strength = 1.0 - vUv.y;
    
    // comme un rideau
    // float strength = mod(vUv.y, 0.1) * 10.0;

    // rayures
    // float strength = mod(vUv.y, 0.1) * 10.0;
    // strength = step(0.5, strength);

    // float strength = mod(vUv.y, 0.1) * 10.0;
    // strength = step(0.8, strength);

    // float strength = mod(vUv.x, 0.1) * 10.0;
    // strength = step(0.8, strength);

    // float stepY = step(0.8, mod(vUv.y, 0.1) * 10.0);
    // float stepX = step(0.8, mod(vUv.x, 0.1) * 10.0);
    // float strength = stepY + stepX;

    // float stepY = step(0.8, mod(vUv.y, 0.1) * 10.0);
    // float stepX = step(0.8, mod(vUv.x, 0.1) * 10.0);
    // float strength = stepX * stepY;

    // float stepY = step(0.8, mod(vUv.y, 0.1) * 10.0);
    // float stepX = step(0.8, mod(vUv.x, 0.1) * 10.0);
    // float strength = stepY - stepX;

    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
    // float strength = barY + barX;

    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
    // float strength = barY + barX;

    // float strength = abs(vUv.x - 0.5);

    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strength = square1 * square2;

    // float strength = floor(vUv.x * 10.0) / 10.0;

    // float strength = (floor(vUv.x * 10.0) / 10.0) * (floor(vUv.y * 10.0) / 10.0);

    // float strength = random(vec2(vUv.x, vUv.y);

    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // float strength = random(gridUv);

    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y + vUv.x) * 10.0) / 10.0);
    // float strength = random(gridUv);

    // float strength = length(vUv);

    // float strength = distance(vUv, vec2(0.5));

    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // light
    // float strength = 0.001 / distance(vUv, vec2(0.5)) * 10.0;

    // vec2 lightUv = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
    // float strength = 0.001 / distance(lightUv, vec2(0.5)) * 10.0;

    // vec2 lightUv = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
    // float strength = 0.001 / distance(lightUv, vec2(0.5)) * 10.0;

    // float strength = 1.0 - step(0.05, 0.001 / distance(vUv, vec2(0.5)) * 10.0);

    // float strength = 1.0 - step(0.05, abs(distance(vUv, vec2(0.5)) - 0.25));

    // vec2 wavedUv = vec2(vUv.x, vUv.y + sin(vUv.x * 30.0) * 0.1);
    // float strength = 1.0 - step(0.05, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 100.0) * 0.1, vUv.y + sin(vUv.x * 100.0) * 0.1);
    // float strength = 1.0 - step(0.05, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;

    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle;

    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += PI + 0.2;
    // float strength = angle;

    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += PI + 0.2;
    // angle *= 10.0;
    // angle = mod(angle, 1.0);
    // float strength = angle;

    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += PI + 0.2;
    // float sinusoid = sin(angle * 100.0);
    // float radius = 0.3 + sinusoid * 0.02;
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    float strength = vUv.x;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}