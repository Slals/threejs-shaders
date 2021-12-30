import * as THREE from 'three'

const canvas = document.querySelector('.cubes')

const scene = new THREE.Scene()

const grp = new THREE.Group()
scene.add(grp)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
)

grp.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00FF00 }),
)
cube2.position.x = -2
grp.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000FF }),
)
cube3.position.x = 2
grp.add(cube3)

grp.scale.y = 2
grp.scale.x = 0.5

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

const sizes = {
    width: 800,
    height: 600,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4

scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
