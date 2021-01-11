const MathUtils = {

    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    generateUUID: function() {

        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

        const d0 = Math.random() * 0xffffffff | 0;
        const d1 = Math.random() * 0xffffffff | 0;
        const d2 = Math.random() * 0xffffffff | 0;
        const d3 = Math.random() * 0xffffffff | 0;
        const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' +
            _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' +
            _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] +
            _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];

        // .toUpperCase() here flattens concatenated strings to save heap memory space.
        return uuid.toUpperCase();

    },

    clamp: function(value, min, max) {

        return Math.max(min, Math.min(max, value));

    },

    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation

    euclideanModulo: function(n, m) {

        return ((n % m) + m) % m;

    },

    // Linear mapping from range <a1, a2> to range <b1, b2>

    mapLinear: function(x, a1, a2, b1, b2) {

        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);

    },

    // https://en.wikipedia.org/wiki/Linear_interpolation

    lerp: function(x, y, t) {

        return (1 - t) * x + t * y;

    },

    // http://en.wikipedia.org/wiki/Smoothstep

    smoothstep: function(x, min, max) {

        if (x <= min) return 0;
        if (x >= max) return 1;

        x = (x - min) / (max - min);

        return x * x * (3 - 2 * x);

    },

    smootherstep: function(x, min, max) {

        if (x <= min) return 0;
        if (x >= max) return 1;

        x = (x - min) / (max - min);

        return x * x * x * (x * (x * 6 - 15) + 10);

    },

    // Random integer from <low, high> interval

    randInt: function(low, high) {

        return low + Math.floor(Math.random() * (high - low + 1));

    },

    // Random float from <low, high> interval

    randFloat: function(low, high) {

        return low + Math.random() * (high - low);

    },

    // Random float from <-range/2, range/2> interval

    randFloatSpread: function(range) {

        return range * (0.5 - Math.random());

    },

    // Deterministic pseudo-random float in the interval [ 0, 1 ]

    seededRandom: function(s) {

        if (s !== undefined) _seed = s % 2147483647;

        // Park-Miller algorithm

        _seed = _seed * 16807 % 2147483647;

        return (_seed - 1) / 2147483646;

    },

    degToRad: function(degrees) {

        return degrees * MathUtils.DEG2RAD;

    },

    radToDeg: function(radians) {

        return radians * MathUtils.RAD2DEG;

    },

    isPowerOfTwo: function(value) {

        return (value & (value - 1)) === 0 && value !== 0;

    },

    ceilPowerOfTwo: function(value) {

        return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));

    },

    floorPowerOfTwo: function(value) {

        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));

    },

    setQuaternionFromProperEuler: function(q, a, b, c, order) {

        // Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles

        // rotations are applied to the axes in the order specified by 'order'
        // rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
        // angles are in radians

        const cos = Math.cos;
        const sin = Math.sin;

        const c2 = cos(b / 2);
        const s2 = sin(b / 2);

        const c13 = cos((a + c) / 2);
        const s13 = sin((a + c) / 2);

        const c1_3 = cos((a - c) / 2);
        const s1_3 = sin((a - c) / 2);

        const c3_1 = cos((c - a) / 2);
        const s3_1 = sin((c - a) / 2);

        switch (order) {

            case 'XYX':
                q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
                break;

            case 'YZY':
                q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
                break;

            case 'ZXZ':
                q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
                break;

            case 'XZX':
                q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
                break;

            case 'YXY':
                q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
                break;

            case 'ZYZ':
                q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
                break;

            default:
                console.warn('THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order);

        }

    }

};

class Spherical {

    constructor(radius = 1, phi = 0, theta = 0) {

        this.radius = radius;
        this.phi = phi; // polar angle
        this.theta = theta; // azimuthal angle

        return this;

    }

    set(radius, phi, theta) {

        this.radius = radius;
        this.phi = phi;
        this.theta = theta;

        return this;

    }

    clone() {

        return new this.constructor().copy(this);

    }

    copy(other) {

        this.radius = other.radius;
        this.phi = other.phi;
        this.theta = other.theta;

        return this;

    }

    // restrict phi to be betwee EPS and PI-EPS
    makeSafe() {

        const EPS = 0.000001;
        this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));

        return this;

    }

    setFromVector3(v) {

        return this.setFromCartesianCoords(v.x, v.y, v.z);

    }

    setFromCartesianCoords(x, y, z) {

        this.radius = Math.sqrt(x * x + y * y + z * z);

        if (this.radius === 0) {

            this.theta = 0;
            this.phi = 0;

        } else {

            this.theta = Math.atan2(x, z);
            this.phi = Math.acos(MathUtils.clamp(y / this.radius, -1, 1));

        }

        return this;

    }

};

class Vector3 {

    constructor(x = 0, y = 0, z = 0) {

        Object.defineProperty(this, 'isVector3', {
            value: true
        });

        this.x = x;
        this.y = y;
        this.z = z;

    }

    set(x, y, z) {

        if (z === undefined) z = this.z; // sprite.scale.set(x,y)

        this.x = x;
        this.y = y;
        this.z = z;

        return this;

    }

    setScalar(scalar) {

        this.x = scalar;
        this.y = scalar;
        this.z = scalar;

        return this;

    }

    setX(x) {

        this.x = x;

        return this;

    }

    setY(y) {

        this.y = y;

        return this;

    }

    setZ(z) {

        this.z = z;

        return this;

    }

    setComponent(index, value) {

        switch (index) {

            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);

        }

        return this;

    }

    getComponent(index) {

        switch (index) {

            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw new Error('index is out of range: ' + index);

        }

    }

    clone() {

        return new this.constructor(this.x, this.y, this.z);

    }

    copy(v) {

        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;

    }

    add(v, w) {

        if (w !== undefined) {

            console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
            return this.addVectors(v, w);

        }

        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;

    }

    addScalar(s) {

        this.x += s;
        this.y += s;
        this.z += s;

        return this;

    }

    addVectors(a, b) {

        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;

        return this;

    }

    addScaledVector(v, s) {

        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;

        return this;

    }

    sub(v, w) {

        if (w !== undefined) {

            console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
            return this.subVectors(v, w);

        }

        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;

    }

    subScalar(s) {

        this.x -= s;
        this.y -= s;
        this.z -= s;

        return this;

    }

    subVectors(a, b) {

        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;

        return this;

    }

    multiply(v, w) {

        if (w !== undefined) {

            console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
            return this.multiplyVectors(v, w);

        }

        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;

        return this;

    }

    multiplyScalar(scalar) {

        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;

    }

    multiplyVectors(a, b) {

        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;

        return this;

    }

    applyEuler(euler) {

        if (!(euler && euler.isEuler)) {

            console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');

        }

        return this.applyQuaternion(_quaternion.setFromEuler(euler));

    }

    applyAxisAngle(axis, angle) {

        return this.applyQuaternion(_quaternion.setFromAxisAngle(axis, angle));

    }

    applyMatrix3(m) {

        const x = this.x,
            y = this.y,
            z = this.z;
        const e = m.elements;

        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;

        return this;

    }

    applyNormalMatrix(m) {

        return this.applyMatrix3(m).normalize();

    }

    applyMatrix4(m) {

        const x = this.x,
            y = this.y,
            z = this.z;
        const e = m.elements;

        const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

        return this;

    }

    applyQuaternion(q) {

        const x = this.x,
            y = this.y,
            z = this.z;
        const qx = q.x,
            qy = q.y,
            qz = q.z,
            qw = q.w;

        // calculate quat * vector

        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat

        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return this;

    }

    project(camera) {

        return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);

    }

    unproject(camera) {

        return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);

    }

    transformDirection(m) {

        // input: THREE.Matrix4 affine matrix
        // vector interpreted as a direction

        const x = this.x,
            y = this.y,
            z = this.z;
        const e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;

        return this.normalize();

    }

    divide(v) {

        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;

        return this;

    }

    divideScalar(scalar) {

        return this.multiplyScalar(1 / scalar);

    }

    min(v) {

        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);

        return this;

    }

    max(v) {

        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);

        return this;

    }

    clamp(min, max) {

        // assumes min < max, componentwise

        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));

        return this;

    }

    clampScalar(minVal, maxVal) {

        this.x = Math.max(minVal, Math.min(maxVal, this.x));
        this.y = Math.max(minVal, Math.min(maxVal, this.y));
        this.z = Math.max(minVal, Math.min(maxVal, this.z));

        return this;

    }

    clampLength(min, max) {

        const length = this.length();

        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

    }

    floor() {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);

        return this;

    }

    ceil() {

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);

        return this;

    }

    round() {

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);

        return this;

    }

    roundToZero() {

        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

        return this;

    }

    negate() {

        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;

    }

    dot(v) {

        return this.x * v.x + this.y * v.y + this.z * v.z;

    }

    // TODO lengthSquared?

    lengthSq() {

        return this.x * this.x + this.y * this.y + this.z * this.z;

    }

    length() {

        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    }

    manhattanLength() {

        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);

    }

    normalize() {

        return this.divideScalar(this.length() || 1);

    }

    setLength(length) {

        return this.normalize().multiplyScalar(length);

    }

    lerp(v, alpha) {

        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;

        return this;

    }

    lerpVectors(v1, v2, alpha) {

        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;

        return this;

    }

    cross(v, w) {

        if (w !== undefined) {

            console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
            return this.crossVectors(v, w);

        }

        return this.crossVectors(this, v);

    }

    crossVectors(a, b) {

        const ax = a.x,
            ay = a.y,
            az = a.z;
        const bx = b.x,
            by = b.y,
            bz = b.z;

        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;

        return this;

    }

    projectOnVector(v) {

        const denominator = v.lengthSq();

        if (denominator === 0) return this.set(0, 0, 0);

        const scalar = v.dot(this) / denominator;

        return this.copy(v).multiplyScalar(scalar);

    }

    projectOnPlane(planeNormal) {

        _vector.copy(this).projectOnVector(planeNormal);

        return this.sub(_vector);

    }

    reflect(normal) {

        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length

        return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)));

    }

    angleTo(v) {

        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());

        if (denominator === 0) return Math.PI / 2;

        const theta = this.dot(v) / denominator;

        // clamp, to handle numerical problems

        return Math.acos(MathUtils.clamp(theta, -1, 1));

    }

    distanceTo(v) {

        return Math.sqrt(this.distanceToSquared(v));

    }

    distanceToSquared(v) {

        const dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;

        return dx * dx + dy * dy + dz * dz;

    }

    manhattanDistanceTo(v) {

        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);

    }

    setFromSpherical(s) {

        return this.setFromSphericalCoords(s.radius, s.phi, s.theta);

    }

    setFromSphericalCoords(radius, phi, theta) {

        const sinPhiRadius = Math.sin(phi) * radius;

        this.x = sinPhiRadius * Math.sin(theta);
        this.y = Math.cos(phi) * radius;
        this.z = sinPhiRadius * Math.cos(theta);

        return this;

    }

    setFromCylindrical(c) {

        return this.setFromCylindricalCoords(c.radius, c.theta, c.y);

    }

    setFromCylindricalCoords(radius, theta, y) {

        this.x = radius * Math.sin(theta);
        this.y = y;
        this.z = radius * Math.cos(theta);

        return this;

    }

    setFromMatrixPosition(m) {

        const e = m.elements;

        this.x = e[12];
        this.y = e[13];
        this.z = e[14];

        return this;

    }

    setFromMatrixScale(m) {

        const sx = this.setFromMatrixColumn(m, 0).length();
        const sy = this.setFromMatrixColumn(m, 1).length();
        const sz = this.setFromMatrixColumn(m, 2).length();

        this.x = sx;
        this.y = sy;
        this.z = sz;

        return this;

    }

    setFromMatrixColumn(m, index) {

        return this.fromArray(m.elements, index * 4);

    }

    setFromMatrix3Column(m, index) {

        return this.fromArray(m.elements, index * 3);

    }

    equals(v) {

        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));

    }

    fromArray(array, offset = 0) {

        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];

        return this;

    }

    toArray(array = [], offset = 0) {

        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;

        return array;

    }

    fromBufferAttribute(attribute, index, offset) {

        if (offset !== undefined) {

            console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');

        }

        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);

        return this;

    }

    random() {

        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();

        return this;

    }

}

module.exports.MathUtils = MathUtils;
module.exports.Spherical = Spherical;
module.exports.Vector3   = Vector3;