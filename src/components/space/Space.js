// @flow
import React from "react"
import ReactDOM from "react-dom"
import * as PIXI from "pixi.js"
import "./Space.scss"

type Props = {
  id: string,
}
type State = {
  app: PIXI.Application,
}

export default class Space extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const width: number = window.innerWidth
    const app = new PIXI.Application({
      width,
      height: window.innerHeight,
      antialias: true,
      resolution: window.devicePixelRatio,
      autoResize: true,
      transparent: true,
    })

    this.state = {
      app,
    }
  }

  ngon(graphics: Object, count: number, color: number, posX: number, posY: number, speed: number = 1) {
    let points = []
    for (let i: number = 0; i < count; i++) {
      let point: PIXI.Point = new PIXI.Point(posX, posY)

      point.directionX = speed * Math.random() * Math.sign(Math.random() - 0.2)
      point.directionY = speed * Math.random() * Math.sign(Math.random() - 0.2)
      points.push(point)
    }

    return { initPosX: posX, initPosY: posY, points, graphics, count, color }
  }

  animateNgon(ngon: Object, boundingBoxWidth: number, boundingBoxHeight: number, maxDistance: number) {
    ngon.points.map((point: PIXI.Point, i: number, points: Array<PIXI.Points>) => {
      const nextPoint: PIXI.Point = points[i + 1]
      // Move the point
      point.x += point.directionX
      point.y += point.directionY

      const exceedsDistanceFromNextPointX: boolean =
        i !== points.length - 1
          ? Math.abs(point.x - nextPoint.x) > maxDistance
          : Math.abs(point.x - points[0].x) > maxDistance
      const exceedsDistanceFromNextPointY: boolean =
        i !== points.length - 1
          ? Math.abs(point.y - nextPoint.y) > maxDistance
          : Math.abs(point.y - points[0].y) > maxDistance

      // Bounce off walls
      if (point.x <= 0 || point.x >= boundingBoxWidth || exceedsDistanceFromNextPointX) {
        point.directionX *= -1
      }
      if (point.y <= 0 || point.y >= boundingBoxHeight || exceedsDistanceFromNextPointY) {
        point.directionY *= -1
      }

      // Draw the sides of the ngon
      ngon.graphics.lineStyle(1, ngon.color).moveTo(point.x, point.y)
      if (i !== points.length - 1) {
        ngon.graphics.lineTo(nextPoint.x, nextPoint.y)
      } else {
        ngon.graphics.lineTo(points[0].x, points[0].y)
      }
      ngon.graphics.endFill()
    })
  }

  componentDidMount() {
    const { app } = this.state
    const { renderer, stage } = app
    const width: number = renderer.width / renderer.resolution
    const height: number = renderer.height / renderer.resolution

    const container: null | HTMLElement = document.getElementById(this.props.id)
    container && container.appendChild(renderer.view)

    let ngons = []
    const graphics = new PIXI.Graphics()
    for (let i = 0; i < 100; i++) {
      const randNum = Math.round(Math.random() * 2)
      const color = randNum === 0 ? 0x6622ff : randNum === 1 ? 0xbb00ff : 0x0066ff
      const count = 3 // Math.round(Math.random() * 2 + 3)
      const w = width / 2 + (Math.random() - 0.5) * width
      const h = height / 2 + (Math.random() - 0.5) * height
      const ngon = this.ngon(graphics, count, color, w, h, 0.1)
      ngons.push(ngon)
    }
    stage.addChild(graphics)

    app.ticker.add(() => {
      graphics.clear()
      ngons.map(ngon => {
        this.animateNgon(ngon, width, height, 3)
      })
    })
  }

  render() {
    return ReactDOM.createPortal(
      <div className="space">
        <div id={this.props.id} />
      </div>,
      document.getElementById("background")
    )
  }
}

Space.defaultProps = {
  id: "space",
}
