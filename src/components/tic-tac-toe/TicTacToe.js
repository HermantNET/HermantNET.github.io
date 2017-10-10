// @flow
import React from "react"
import "./TicTacToe.scss"

type Props = {}

type State = {
  board: Array<Array<number>>,
  over: boolean,
  winner: number,
}

export default class TicTacToe extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      board: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
      over: false,
      winner: -1,
    }
  }

  check = (): number => {
    var board = this.state.board

    for (var row = 0; row < 3; row++) {
      if (board[row].every(pc => pc === this.state.board[row][1])) {
        return board[row][0]
      }
    }

    for (var col = 0; col < 3; col++) {
      var values = []
      for (var row = 0; row < 3; row++) {
        values.push(board[row][col])
      }
      if (values.every(pc => pc === values[1])) {
        return values[0]
      }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[1][1]
    } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
      return board[1][1]
    } else if (board.every(row => row.every(pc => pc > -1))) {
      return 2
    } else {
      return -1
    }
  }

  botMove = () => {
    var newBoard = this.state.board.slice()
    var lastMove = 0
    var indices = [0, 0]

    while (lastMove > -1) {
      if (!newBoard.some(row => row.some(pc => pc === -1))) return
      indices = indices.map(() => Math.round(Math.random() * 2))
      lastMove = newBoard[indices[0]][indices[1]]
    }

    newBoard[indices[0]][indices[1]] = 1

    this.setState({
      board: newBoard,
    })
  }

  makeMove = (row: number, col: number) => {
    var newBoard = this.state.board.slice()
    if (newBoard[row][col] > -1 || this.state.over) return
    newBoard[row][col] = 0
    this.setState(
      {
        board: newBoard,
      },
      function() {
        this.botMove()
        const res: number = this.check()
        if (res > -1) {
          this.setState({
            over: true,
            winner: res,
          })
        }
      }.bind(this)
    )
  }

  reset = () => {
    this.setState({
      board: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
      over: false,
      winner: -1,
    })
  }

  render() {
    return (
      <div className="t3">
        <div className="t3-board">
          {this.state.board.map((row, i) => {
            return row.map((col, i2) => (
              <div
                className={col === -1 ? "" : col === 0 ? "t3-blue" : "t3-red"}
                key={`${i}${i2}`}
                onClick={this.makeMove.bind(this, i, i2)}
              />
            ))
          })}
        </div>
        <div className="t3-span">
          <p>
            {this.state.over
              ? this.state.winner === 0 ? "WIN" : this.state.winner === 1 ? "LOSS" : "TIE"
              : "TIC TAC TOE"}
          </p>
          {this.state.over ? (
            <div className="t3-btn" onClick={this.reset}>
              Play Again?
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
