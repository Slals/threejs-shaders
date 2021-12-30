import * as THREE from 'three'

const canvas = document.querySelector('.animations')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xf11f80 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: 800, height: 600,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height )
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.y = Math.cos(elapsedTime)
    mesh.rotation.x = Math.sin(elapsedTime)

    camera.position.z = Math.cos(elapsedTime) + 2

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()