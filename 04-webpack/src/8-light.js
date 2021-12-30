import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('.light')

const textureLoader = new THREE.TextureLoader()
const bakeShadow = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

// Scene
const scene = new THREE.Scene()
scene.visible = false

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x0000ff, .1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xff0000, 1)
directionalLight.position.set(2, 2, -1)
directionalLight.castShadow = true
scene.add(directionalLight)

directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -1
directionalLight.shadow.camera.near = -10
directionalLight.shadow.camera.far = 10
directionalLight.shadow.radius = 5


const hemisphereLight = new THREE.HemisphereLight(0x781133, 0x113378)
// scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, .8, 10, 10)
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = .1
pointLight.shadow.camera.far = 5
pointLight.position.set(1, 1, 0)
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 3, 1)
// scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0xef11ff, .5, 5, Math.PI * 0.1, .25, 1)
spotLight.position.set(0, 2, 2)
spotLight.castShadow = true
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
scene.add(spotLight, spotLight.target)

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, .3)
// scene.add(hemisphereLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, .2)
// scene.add(directionalLightHelper)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, .2)
// scene.add(pointLightHelper)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight, .2)
// scene.add(spotLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5
sphere.castShadow = true

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)
cube.castShadow = true

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5
torus.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
        map: bakeShadow,
    })
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
plane.receiveShadow = true

scene.add(sphere, cube, torus, plane)

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x6666666,
        transparent: true,
        alphaMap: simpleShadow,
    })
)
sphereShadow.rotation.x = - Math.PI * .5
sphereShadow.position.y = plane.position.y + .01
scene.add(sphereShadow)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600,
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
renderer.shadowMap.enabled = false
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    cube.position.x = Math.cos(elapsedTime) * 1.5
    cube.position.z = Math.sin(elapsedTime) * 1.5
    cube.position.y = Math.abs(Math.sin(elapsedTime * 3))

    sphereShadow.position.x = cube.position.x
    sphereShadow.position.z = cube.position.z
    sphereShadow.material.opacity = (1 - cube.position.y) * .3

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

export default {
    scene, ambientLight, pointLight, rectAreaLight,
}