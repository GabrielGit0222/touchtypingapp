import {Component} from 'react'

import './index.css'

let timer = null
let seconds = null

class TouchTypingApp extends Component {
  state = {
    inputValue: '',
    expectedKey: '',
    accuracy: 0,
    correctKeysPressed: 0,
    startTime: 0,
    totalKeyPressed: 0,
  }

  componentDidMount() {
    this.setState({expectedKey: this.getRandomKey()})
    this.setTimer()
  }

  handleInputChange = e => {
    const inputValue = e.target.value
    const {expectedKey} = this.state
    this.setState({inputValue})
    this.setState(prevState => ({
      totalKeysPressed: prevState.totalKeysPressed + 1,
    }))

    if (inputValue === expectedKey) {
      this.setState(prevState => ({
        correctKeysPressed: prevState.correctKeysPressed + 1,
        expectedKey: this.getRandomKey(),
        inputValue: '',
      }))
    } else {
      this.setState(prevState => ({wrongKeys: prevState.wrongKeys}))
    }
  }

  getRandomKey = () => {
    const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
    return keys[Math.floor(Math.random() * keys.length)]
  }

  onKeyDownChange = event => {
    const alphabets = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ]

    if (alphabets.includes(event.key.toLowerCase())) {
      this.setState(prevState => ({
        totalKeyPressed: prevState.totalKeyPressed + 1,
      }))
    }
  }

  setTimer = () => {
    timer = setInterval(this.updateTimer, 1000)
  }

  updateTimer = () => {
    seconds += 1
    this.setState({startTime: seconds})

    if (seconds === 60) {
      clearInterval(timer)
      const {correctKeysPressed, totalKeyPressed} = this.state

      if (correctKeysPressed >= totalKeyPressed) {
        const accuracy = Number((totalKeyPressed / totalKeyPressed) * 100)
        this.setState({
          accuracy: parseInt(accuracy),
          correctKeysPressed: totalKeyPressed,
        })
      } else {
        const accuracy = Number((correctKeysPressed / totalKeyPressed) * 100)
        this.setState({accuracy: parseInt(accuracy)})
      }
    }
  }

  render() {
    const {
      inputValue,
      expectedKey,
      correctKeysPressed,
      accuracy,
      totalKeyPressed,
      startTime,
    } = this.state

    const finalAccuracy = correctKeysPressed === 0 ? 0 : accuracy

    return (
      <div className="main_container">
        <div className="main_container">
          <h1 className="heading"> One Minute Touch Typing App</h1>
          <h1>Timer : {startTime} seconds</h1>

          <div>
            <div className="next_key">
              Your Next Random Key :
              <span className="random_keys">{expectedKey}</span>
            </div>

            <div className="input_container">
              <input
                className="input_element"
                placeholder="Type your key here"
                id="typingBox"
                type="text"
                value={inputValue}
                onChange={this.handleInputChange}
                // onFocus={this.startTimer}
                // onBlur={this.endTimer}
                onKeyDown={this.onKeyDownChange}
              />
            </div>

            <div className="key_accuracy_container">
              <div className="key_pressed">
                Correct keys : {correctKeysPressed}
              </div>
              <div className="key_pressed">
                Total Keys Pressed : {totalKeyPressed}
              </div>
              <div className="accuracy">Accuracy: {finalAccuracy}%</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TouchTypingApp

/* 


  startTimer = () => {
    this.setState({startTime: Date.now()})
  }

  endTimer = () => {
    this.setState({endTime: Date.now()}, this.calculateAccuracy)
  }

  calculateAccuracy = () => {
    const {correctKeysPressed, startTime, endTime} = this.state

    if (endTime !== null) {
      const elapsedTime = endTime - startTime
      const accuracyPercentage = (correctKeysPressed / elapsedTime) * 100
      this.setState({accuracy: accuracyPercentage.toFixed(2)})
    }
  }

  */
