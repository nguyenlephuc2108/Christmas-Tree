const WIDTH = 1000
const HEIGHT = 1000
const SIZERATIO = 300
let WindowWidth, WindowHeight

const NumberOfParticles = 300
const RADIUS = 300
const STARTRADIUS = RADIUS / 100
const ANGlEVIEW = 5
const SPEED = 0.75

let PARTICLES = []
const TREEHEIGHT = 800
const SMOOTHLY = 200

class Particle{
    constructor(floor, color, size, x, y, z, radius, radian){
        this.floor = floor
        this.color = color
        this.size = size
        this.now_size = size
        this.x = x
        this.y = y
        this.z = z
        this.radius = radius
        this.now_radius = RADIUS
        this.radian = radian
        this.speed = SPEED + (Math.random() * 1 - 0.5)
        // this.rotate_speed = SPEED - (SPEED / this.radius)
        this.rotate_speed = SPEED / 3
        
        this.type = "none"
        // if (this.radius <= STARTRADIUS){
            if (this.radius <= 0){
                this.now_size = 0
            this.speed = SPEED*1
            this.rotate_speed = SPEED
            this.type = "star"
        }

        this.div_element = document.createElement("div")
        this.div_element.className = "particle"
        this.div_element.style.backgroundColor = this.color;
        // this.div_element.style.width = this.size + "px"
        // this.div_element.style.height = this.size + "px"
        document.body.appendChild(this.div_element)
    }

    updateParticlesProperties(){
        this.div_element.style.width = this.now_size + "px"
        this.div_element.style.height = this.now_size + "px"

        let x = this.x / WIDTH * SIZERATIO
        let y = this.y / HEIGHT * SIZERATIO
        let z = this.z / HEIGHT * SIZERATIO
        this.div_element.style.left = (WindowWidth / 2) + ((x * 1)) + "px" //x
        this.div_element.style.top = (WindowHeight / 2) + ((z * 1) / ANGlEVIEW) + y + "px" //y
    }

    rotate(){
        this.radian += Math.PI / 180 * this.rotate_speed
        this.x = Math.cos(this.radian) * this.now_radius
        this.z = Math.sin(this.radian) * this.now_radius

        if (this.y > this.floor){
            this.y -= this.speed * 2
        }

        // this.now_size += (this.size - this.now_size) / SMOOTHLY
        if (this.type == "star"){
            this.now_size += this.size / TREEHEIGHT
            this.now_size = Math.min(this.now_size, this.size)
        }
        this.now_radius += (this.radius - this.now_radius) / SMOOTHLY
    }

    loop(){
        this.rotate()
        this.updateParticlesProperties(this)
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setupParticles(){
    WindowWidth = window.innerWidth
    WindowHeight = window.innerHeight

    for (let id = 1; id <= NumberOfParticles; id += 1){
        let floor = TREEHEIGHT / 2
        let radius = (RADIUS * 1) * (id / (NumberOfParticles / 5)) * Math.random()
        let color = "#fff"
        // if (radius < RADIUS / 10) color = "#a00"
        let rad = (id * 360) * Math.random() * Math.PI / 180
        let x = Math.cos(rad) * radius
        let y = TREEHEIGHT / 2
        let z = Math.sin(rad) * radius
        let particle = new Particle(floor, color, 3, x, y, z, radius, rad)

        particle.updateParticlesProperties()

        PARTICLES.push(particle)
    }
    for (let id = 1; id <= NumberOfParticles; id += 1){
        let floor = TREEHEIGHT * ((id / (NumberOfParticles)) - 0.5)
        let radius = RADIUS * (id / (NumberOfParticles)) * Math.random()
        let color = "#0f0"
        // if (radius < RADIUS / 10) color = "#a00"
        let rad = (id * 360) * Math.random() * Math.PI / 180
        let x = Math.cos(rad) * radius
        let y = TREEHEIGHT / 2
        let z = Math.sin(rad) * radius
        let particle = new Particle(floor, color, 3, x, y, z, radius, rad)

        particle.updateParticlesProperties()

        PARTICLES.push(particle)
    }
    for (let id = 1; id <= 20; id += 1){
        let floor = -TREEHEIGHT / 2 + (10 * Math.random() - 5)
        // let radius = STARTRADIUS * Math.random()
        let radius = 0
        let color = "#ff0"
        // if (radius < RADIUS / 10) color = "#a00"
        let rad = (id * 360) * Math.random() * Math.PI / 180
        let x = Math.cos(rad) * radius
        let y = TREEHEIGHT / 2
        let z = Math.sin(rad) * radius
        let particle = new Particle(floor, color, 5, x, y, z, radius, rad)

        particle.updateParticlesProperties()

        PARTICLES.push(particle)
    }
    // let colors = ["#f00", "#ff0", "#00f", "#fff"]
    let colors = ["#fff"]
    // for (let id = 1; id <= NumberOfParticles/10; id += 1){
    //     let floor = TREEHEIGHT * ((id / (NumberOfParticles/10)) - 0.5)
    //     let radius = (RADIUS * 2) * (id / (NumberOfParticles/10)) * Math.random()
    //     let color = colors[id%colors.length]
    //     // if (radius < RADIUS / 10) color = "#a00"
    //     let rad = (id * 360) * Math.random() * Math.PI / 180
    //     let x = Math.cos(rad) * radius
    //     let y = TREEHEIGHT / 2
    //     let z = Math.sin(rad) * radius
    //     let particle = new Particle(floor, color, 4, x, y, z, radius, rad)

    //     particle.updateParticlesProperties()

    //     PARTICLES.push(particle)
    // }
}

function loop(){
    for (const particle of PARTICLES){
        particle.loop()
    }

    requestAnimationFrame(loop)
}

setupParticles()
loop()
