// @flow
import React from "react"
import "./Calculator.scss"

type Props = {}

type State = {
  num: number,
  operator: string,
  displayNum: string,
  calculated: boolean,
}

export default class Calculator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      num: 0,
      operator: "+",
      displayNum: "0",
      calculated: false,
    }
  }

  clickNum = (num: number) => {
    if (this.state.operator === "=") {
      this.setState({
        num: 0,
        displayNum: num.toString(),
        operator: "+",
        calculated: false,
      })
    } else {
      this.setState({
        displayNum: this.state.calculated
          ? num.toString()
          : this.state.displayNum !== "0" ? this.state.displayNum + num : num.toString(),
        calculated: false,
      })
    }
  }

  clickDecimal = () => {
    this.setState({
      displayNum: this.state.calculated
        ? "0."
        : this.state.displayNum.includes(".") ? this.state.displayNum : this.state.displayNum + ".",
      calculated: false,
    })
  }

  clickFunc = (op: string) => {
    let n1: number = this.state.num,
      n2: number = +this.state.displayNum

    switch (this.state.operator) {
      case "+":
        n1 += n2
        break
      case "-":
        n1 -= n2
        break
      case "*":
        n1 *= n2
        break
      case "/":
        n1 /= n2
    }

    this.setState({
      num: n1,
      displayNum: n1.toString(),
      operator: op,
      calculated: true,
    })
  }

  reset = () => {
    this.setState({
      num: 0,
      displayNum: "0",
      operator: "+",
      calculated: false,
    })
  }

  resetInput = () => {
    this.setState({
      displayNum: "0",
    })
  }

  input_0 = () => this.clickNum(0)
  input_1 = () => this.clickNum(1)
  input_2 = () => this.clickNum(2)
  input_3 = () => this.clickNum(3)
  input_4 = () => this.clickNum(4)
  input_5 = () => this.clickNum(5)
  input_6 = () => this.clickNum(6)
  input_7 = () => this.clickNum(7)
  input_8 = () => this.clickNum(8)
  input_9 = () => this.clickNum(9)

  render = () => {
    return (
      <div className="calc">
        <p className="calc-display">{this.state.displayNum}</p>
        <div className="calc-buttons">
          <div className="calc-numbers">
            <div className="calc-button" onClick={this.input_7}>
              <span>7</span>
            </div>
            <div className="calc-button" onClick={this.input_8}>
              <span>8</span>
            </div>
            <div className="calc-button" onClick={this.input_9}>
              <span>9</span>
            </div>
            <div className="calc-button" onClick={this.input_4}>
              <span>4</span>
            </div>
            <div className="calc-button" onClick={this.input_5}>
              <span>5</span>
            </div>
            <div className="calc-button" onClick={this.input_6}>
              <span>6</span>
            </div>
            <div className="calc-button" onClick={this.input_1}>
              <span>1</span>
            </div>
            <div className="calc-button" onClick={this.input_2}>
              <span>2</span>
            </div>
            <div className="calc-button" onClick={this.input_3}>
              <span>3</span>
            </div>
            <div className="calc-button calc-button-long" onClick={this.input_0}>
              <span>0</span>
            </div>
            <div className="calc-button" onClick={this.clickDecimal}>
              <span>.</span>
            </div>
          </div>
          <div className="calc-functions">
            <div className="calc-button" onClick={this.clickFunc.bind(this, "*")}>
              <span>×</span>
            </div>
            <div className="calc-button" onClick={this.clickFunc.bind(this, "/")}>
              <span>÷</span>
            </div>
            <div className="calc-button danger" onClick={this.resetInput}>
              <span>C</span>
            </div>
            <div className="calc-button danger" onClick={this.reset}>
              <span>AC</span>
            </div>
            <div className="calc-button" onClick={this.clickFunc.bind(this, "+")}>
              <span>+</span>
            </div>
            <div className="calc-button" onClick={this.clickFunc.bind(this, "-")}>
              <span>-</span>
            </div>
            <div className="calc-button calc-button-tall" onClick={this.clickFunc.bind(this, "=")}>
              <span>=</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
