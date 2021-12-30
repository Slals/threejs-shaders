import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sizes = {
    width: 800, height: 600,
}

const cursor = {
    x: 0, y: 0,
}
window.addEventListener('mousemove', (evt) => {
    cursor.x = evt.clientX / sizes.width - .5
    cursor.y = - (evt.clientY / sizes.height - .5)
})

const canvas = document.querySelector('.cameras')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xf11f80 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3
console.log(camera.position.length())
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.y = Math.cos(elapsedTime)
    // mesh.rotation.x = Math.sin(elapsedTime)
    // camera.position.x = Math.sin(cursor.x * Math.PI) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI) * 3
    // camera.position.y = cursor.y * 5
    controls.update()

    camera.lookAt(new THREE.Vector3())

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

window.addEventListener('resize', () => {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)
})

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})