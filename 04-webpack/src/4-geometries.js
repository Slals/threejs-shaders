import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import gsap from 'gsap'

// const gui = new dat.GUI()

const parameters = {
    color: 0x0133FF,
    nbMesh: 50,
    spin: () => {
        gsap.to(mesh.rotation, {
            y: 10,
            duration: mesh.rotation.y + 10,
        })
    },
    computeMesh: () => {
        const count = parameters.nbMesh

        console.log(count)
        const positionsArray = new Float32Array(count * 3 * 3)

        for (let i = 0; i < count * 3 * 3; i++) {
            positionsArray[i] = Math.random() - 0.5
        }

        const positionsAttr = new THREE.BufferAttribute(positionsArray, 3)
        geometry.setAttribute('position', positionsAttr)
    },
}

// gui
//     .addColor(parameters, 'color')
//     .onChange(() => {
//         material.color.set(parameters.color)
//     })

// gui.add(parameters, 'spin')
// gui.add(parameters, 'computeMesh')

// gui
//     .add(parameters, 'nbMesh')
//     .min(1)
//     .max(10000)
//     .step(1)

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

const canvas = document.querySelector('.geometries')

const scene = new THREE.Scene()

// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

// Triangle
// const positionsArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0,
// ])

// const positionsAttr = new THREE.BufferAttribute(positionsArray, 3)

const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position', positionsAttr)

parameters.computeMesh()

const material = new THREE.MeshBasicMaterial({
    color: parameters.color,
    wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// gui.add(mesh.position, 'x', -3, 3, .01)
// gui.add(mesh.position, 'y', -3, 3, .01)
// gui.add(mesh.position, 'z', -3, 3, .01)

// gui.add(mesh, 'visible')

// gui.add(material, 'wireframe')

const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3

scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const tick = () => {
    controls.update()

    parameters.computeMesh()

    camera.lookAt(new THREE.Vector3())

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})