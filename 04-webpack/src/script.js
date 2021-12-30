// import './style.css'
// import './1-basics.js'
// import './2-animations.js'
// import './3-camera.js'
// import './4-geometries.js'
// import './5-texture.js'
// import './6-material.js'
// import './7-3dtext.js'
import lightControls from './8-light.js'
import houseControls from './9-house.js'
import particleControls from './10-particle.js'
import galaxyControls from './11-galaxy.js'
import raycasterControls from './12-raycaster.js'
import physicsControls from './13-physics.js'
import modelsControls from './14-models.js'
import realRenderControls from './15-real-render.js'
import shadersControls from './16-shaders.js'
import shaderPatternsControls from './17-shader-patterns.js'
import modifiedMaterialsControls from './18-modified-materials.js'
import postProcessControls from './19-post-process'
import * as dat from 'dat.gui'

const gui = new dat.GUI()

const light = gui.addFolder('Light')

light.add(lightControls.scene, 'visible')
light.add(lightControls.ambientLight, 'intensity')
// light.add(lightControls.pointLight, 'decay').min(0).max(20).step(.1)
// light.add(lightControls.pointLight, 'distance').min(0).max(20).step(.1)

// const lightRectPosition = light.addFolder('Rectlight Position')
// lightRectPosition.add(lightControls.rectAreaLight.position, 'x').min(-10).max(10).step(.1)
// lightRectPosition.add(lightControls.rectAreaLight.position, 'y').min(-10).max(10).step(.1)
// lightRectPosition.add(lightControls.rectAreaLight.position, 'z').min(-10).max(10).step(.1)

const house = gui.addFolder('House')
house.add(houseControls.scene, 'visible')
house.add(houseControls.ambientLight, 'intensity').min(0).max(1).step(0.001)

house.add(houseControls.moonLight, 'intensity').min(0).max(1).step(0.001)
house.add(houseControls.moonLight.position, 'x').min(- 5).max(5).step(0.001)
house.add(houseControls.moonLight.position, 'y').min(- 5).max(5).step(0.001)
house.add(houseControls.moonLight.position, 'z').min(- 5).max(5).step(0.001)

const particle = gui.addFolder('Particle')
particle.add(particleControls.scene, 'visible')

const galaxy = gui.addFolder('Galaxy')
galaxy.add(galaxyControls.scene, 'visible')
galaxy.add(galaxyControls.parameters, 'count')
    .min(100).max(1000000).step(10)
    .onFinishChange(galaxyControls.generateGalaxy)

galaxy.add(galaxyControls.parameters, 'size')
    .min(.001).max(.1).step(.001)
    .onFinishChange(galaxyControls.generateGalaxy)

galaxy.add(galaxyControls.parameters, 'radius')
    .min(.01).max(20).step(.01)
    .onFinishChange(galaxyControls.generateGalaxy)

galaxy.add(galaxyControls.parameters, 'branches')
    .min(2).max(20).step(1)
    .onFinishChange(galaxyControls.generateGalaxy)

galaxy.add(galaxyControls.parameters, 'spin')
    .min(-5).max(5).step(1)
    .onFinishChange(galaxyControls.generateGalaxy)

galaxy.add(galaxyControls.parameters, 'randomness')
    .min(0).max(1).step(.01)
    .onFinishChange(galaxyControls.generateGalaxy)

galaxy.add(galaxyControls.parameters, 'randomnessPow')
    .min(1).max(10).step(.01)
    .onFinishChange(galaxyControls.generateGalaxy)

galaxy.addColor(galaxyControls.parameters, 'insideColor')
    .onFinishChange(galaxyControls.generateGalaxy)

galaxy.addColor(galaxyControls.parameters, 'outsideColor')
    .onFinishChange(galaxyControls.generateGalaxy)

const raycaster = gui.addFolder('Raycaster')
raycaster.add(raycasterControls.scene, 'visible')

const physics = gui.addFolder('Physics')
physics.add(physicsControls.scene, 'visible')

const debugObj = {
    createSphere: () => {
        physicsControls.createSphere(Math.random() * .5, {
            x: (Math.random() - .5) * 3,
            y: 3,
            z: (Math.random() - .5) * 3,
        })
    },
    createBox: () => {
        physicsControls.createBox(Math.random() * 1, Math.random() * 1, Math.random() * 1, {
            x: (Math.random() - .5) * 3,
            y: 3,
            z: (Math.random() - .5) * 3,
        })
    }
}
physics.add(debugObj, 'createSphere')
physics.add(debugObj, 'createBox')
physics.add(physicsControls, 'reset')

const models = gui.addFolder('Models')
models.add(modelsControls.scene, 'visible')

const realRender = gui.addFolder('Real Render')
realRender.add(realRenderControls.scene, 'visible')
realRender.add(realRenderControls.directionalLight, 'intensity').min(0).max(10).step(.001).name('lightIntensity')
realRender.add(realRenderControls.directionalLight.position, 'x').min(-5).max(5).step(.001).name('lightX')
realRender.add(realRenderControls.directionalLight.position, 'y').min(-5).max(5).step(.001).name('lightY')
realRender.add(realRenderControls.directionalLight.position, 'z').min(-5).max(5).step(.001).name('lightZ')

const shaders = gui.addFolder('Shaders')
shaders.add(shadersControls.scene, 'visible')

const shaderPatterns = gui.addFolder('Shader Patterns')
shaderPatterns.add(shaderPatternsControls.scene, 'visible')

const modifiedMaterials = gui.addFolder('Modified Materials')
modifiedMaterials.add(modifiedMaterialsControls.scene, 'visible')

const postProcessMaterials = gui.addFolder('Post Process')
postProcessMaterials.add(postProcessControls.scene, 'visible')