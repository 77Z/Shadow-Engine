//Extention should end in .frag
module.exports = `varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_time;

/* vec3 rgbtofrag(vec3 inputfrag) {
    return vec3(inputfrag.r / 255.0, inputfrag.g / 255.0, inputfrag.b / 255.0);
} */

void main() {
    vec3 col = 0.5 + 0.5 * cos(u_time + v_uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(col, 1.0);

    // ! This shader WILL make your screen flash, you've been warned!!
    //gl_FragColor = vec4(sin(u_time * 60.0));

    //Basic yellow
    //gl_FragColor = vec4(rgbtofrag(vec3(239.0, 247.0, 9.0)), 1.0);

    //Checker Board (DOESN'T WORK)
    /* vec2 p = ceil(gl_FragCoord / 30.0 + sin(u_time));
    gl_FragColor = mod(p.xxxx + p.y, 2.0); */
}`;