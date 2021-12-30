import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('.particle')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const particleTexture = textureLoader.load('/textures/particles/1.png')

const particleGeometry = new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - .5) * 10
    colors[i] = Math.random()
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const particleMaterial = new THREE.PointsMaterial({ size: .08, sizeAttenuation: true })
particleMaterial.map = particleTexture
particleMaterial.transparent = true
// particleMaterial.alphaTest = .001
// particleMaterial.depthTest = false
particleMaterial.blending = THREE.AdditiveBlending
particleMaterial.depthWrite = false
particleMaterial.vertexColors = true
particleMaterial.alphaMap = particleTexture

const particles = new THREE.Points(particleGeometry, particleMaterial)
scene.add(particles)

/**
 * Test cube
 */

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = 800
    sizes.height = 600

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // particles.rotation.y = elapsedTime * .1
    // particles.rotation.x = elapsedTime * .05

    for(let i = 0; i < count; i++) {
        const i3 = i * 3
        const x = particleGeometry.attributes.position.array[i3 + 0]
        particleGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }

    particleGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

scene.visible = false
export default {
    scene,
}