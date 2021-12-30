import * as THREE from "three"

import Renderer from "./Renderer"
import Camera from "./Camera"

import Sizes from "./utils/Sizes"
import Time from "./utils/Time"
import World from "./world/World"
import Resources from "./utils/Resources"

import sources from './sources'

let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance) {
            return instance
        }

        instance = this

        window.experience = this
        this.canvas = canvas

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.resize()
        this.update()

        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => { 
            this.update()
        })
    }

    resize() {
        this.renderer.resize()
        this.camera.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }
}