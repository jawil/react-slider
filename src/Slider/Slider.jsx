import React, {Component} from 'react'
import './Slider.scss'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      baseWidth: window.screen.width,
      distance: 0,
      length: this.props.data.length,
      time: this.props.opts.transition,
      isMove: true,
      isFirst: true,
      startPageX: 0,
      startPageY: 0
    }
  }

  static get defaultProps() {
    return {auoth: 'jawil'}
  }

  autoPlay() {
    if (this.props.opts.auto) {
      this.autoPlayTimer = setInterval(f => {
        ++this.state.index
        let currentDistance = -this.state.index * this.state.baseWidth
        this.setState({distance: currentDistance, time: this.props.opts.transition})
      }, this.props.opts.interval)
    }
  }

  transitionEnd() {
    if (this.state.index >= this.state.length * 2 - 2) {
      this.state.index = this.state.length - 2
      let currentDistance = -this.state.index * this.state.baseWidth
      this.setState({time: '0s', distance: currentDistance})
    }
  }

  touchStart(e) {
    e.preventDefault()
    e.stopPropagation()
    clearInterval(this.autoPlayTimer)
    this.setState({isMove: true, isFirst: true, startPageX: e.changedTouches[0].pageX, startPageY: e.changedTouches[0].pageY})
  }

  touchMove(e) {
    if (!this.state.isMove) {
      return void 0
    }
    let distanceX = e.changedTouches[0].pageX - this.state.startPageX
    let distanceY = e.changedTouches[0].pageY - this.state.startPageY
    const isDown = () => Math.abs(distanceY) > Math.abs(distanceX)
    if (this.state.isFirst) {
      this.state.isFirst = false
      isDown() && (this.state.isMove = false)
    }
    if (this.state.isMove) {
      (this.state.index === 0) && (this.state.index = this.state.length);
      (this.state.index >= this.state.length * 2 - 1) && (this.state.index = this.state.length - 1)
      let currentDistance = -this.state.index * this.state.baseWidth + distanceX
      this.setState({time: '0s', distance: currentDistance})
    }
  }

  touchEnd(e) {
    let distanceX = e.changedTouches[0].pageX - this.state.startPageX
    this.state.index = this.state.index - Math.round(distanceX / this.state.baseWidth)
    let currentDistance = -this.state.index * this.state.baseWidth
    this.setState({distance: currentDistance, time: this.props.opts.transition})
    this.autoPlay()
  }

  componentDidMount() {
    this.autoPlay()
  }

  render() {
    let {data, opts} = this.props
    const Dots = data.map((item, i) => {
      let currentStyle = i === this.state.index % this.state.length ? 'current' : ''
      return (
        <div key={i} className={`dots ${currentStyle}`}></div>
      )
    })

    const Items = data.map((item, i) => {
      return (
        <div key={i} className="item" style={{
          width: `${ 100 / (this.state.length * 2)}%`
        }}>
          <a href={item.link}>
            <img style={{
              width: '100%'
            }} src={item.src} alt=""/>
          </a>
        </div>
      )
    })

    const sliderStyle = {
      width: `${this.state.length * 2}00%`,
      WebkitTransform: `translate3d(${this.state.distance}px,0,0)`,
      WebkitTransition: `all ${this.state.time} ${this.props.opts.effect}`
    }

    return <div className="slider-wrap">
      <div
        className="item-wrap"
        style={sliderStyle}
        onTouchStart={e => this.touchStart(e)}
        onTouchMove={e => this.touchMove(e)}
        onTouchEnd={e => this.touchEnd(e)}
        onTransitionEnd={() => this.transitionEnd()}>
        {Items}
        {Items}
      </div>
      <div className="dots-wrap">
        {Dots}
      </div>
    </div>
  }
}
