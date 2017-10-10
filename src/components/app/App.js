// @flow
import React from "react"
import "./App.scss"
import Calculator from "../calculator/Calculator"
import Gallery from "../gallery/Gallery"
import Space from "../space/Space"
import TicTacToe from "../tic-tac-toe/TicTacToe"

type Props = {}

export default class App extends React.Component<Props> {
  render() {
    return [
      <div className="header">
        <h1 className="title">TEHJR</h1>
      </div>,
      <div className="app container">
        <div className="mb-5 d-flex align-items-center">
          <div className="mx-5 text-light">
            <h3>Powerful</h3>
            <p>
              Deceptively simple, incredibly powerful, and remarkably intuitive. From a complex management panel, to
              something as simple as a newsletter subscription form, let your users experience the power of the modern
              web.
            </p>
          </div>
          <div className="ml-5">
            <Calculator />
          </div>
        </div>
        <div className="mb-5 d-flex align-items-center">
          <div className="col-6 mr-5">
            <Gallery />
          </div>
          <div className="mr-5 text-light">
            <h3>Responsive</h3>
            <p>
              Let your users know you care by doing the heavy lifting for them. With the advantage of responsive design,
              no more trying to fit something onto the screen. No more multiple versions of the same application for
              different devices. Just one highly reusable component to supplement your end user experience.
            </p>
          </div>
        </div>
        <div className="mb-5 d-flex align-items-center">
          <div className="mx-5 text-light">
            <h3>Built With React</h3>
            <p>
              Harness the power of Facebook's modern, powerful, JavaScript Framework, React. From fun and exciting
              games, to heavy-duty business applications, React will provide and smooth and consistent experience across
              all devices and browsers.
            </p>
          </div>
          <div className="ml-5">
            <TicTacToe />
          </div>
        </div>
        <Space id="space" />
      </div>,
      <div className="header">
        <h2 className="subtitle">thomas@tehjr.com</h2>
        <div>
          <a href="https://twitter.com/SpacemanThomas">
            <span className="fa fa-twitter" />
          </a>
          <a href="https://facebook.com/mrwolfers">
            <span className="fa fa-facebook-official" />
          </a>
          <a href="https://github.com/hermantnet">
            <span className="fa fa-github" />
          </a>
        </div>
      </div>,
    ]
  }
}
