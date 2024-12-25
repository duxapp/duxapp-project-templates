/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict'

import { Animation } from './Animation'

let _easeInOut
function easeInOut() {
  if (!_easeInOut) {
    const Easing = require('../Easing').Easing
    _easeInOut = Easing.inOut(Easing.ease)
  }
  return _easeInOut
}

export class TimingAnimation extends Animation {
  _startTime
  _fromValue
  _toValue
  _duration
  _delay
  _easing
  _onUpdate
  _animationFrame
  _timeout

  constructor(config) {
    super()
    this._toValue = config.toValue
    this._easing = config.easing ?? easeInOut()
    this._duration = config.duration ?? 500
    this._delay = config.delay ?? 0
    this.__iterations = config.iterations ?? 1
  }

  start(
    fromValue,
    onUpdate,
    onEnd,
    previousAnimation,
    animatedValue,
  ) {
    this.__active = true
    this._fromValue = fromValue
    this._onUpdate = onUpdate
    this.__onEnd = onEnd

    const start = () => {

      // Animations that sometimes have 0 duration and sometimes do not
      // still need to use the native driver when duration is 0 so as to
      // not cause intermixed JS and native animations.
      if (this._duration === 0) {
        this._onUpdate(this._toValue)
        this.__debouncedOnEnd({ finished: true })
      } else {
        this._startTime = Date.now()
        this._animationFrame = requestAnimationFrame(
          // $FlowFixMe[method-unbinding] added when improving typing for this parameters
          this.onUpdate.bind(this),
        )
      }
    }
    if (this._delay) {
      this._timeout = setTimeout(start, this._delay)
    } else {
      start()
    }
  }

  onUpdate() {
    const now = Date.now()
    if (now >= this._startTime + this._duration) {
      if (this._duration === 0) {
        this._onUpdate(this._toValue)
      } else {
        this._onUpdate(
          this._fromValue + this._easing(1) * (this._toValue - this._fromValue),
        )
      }
      this.__debouncedOnEnd({ finished: true })
      return
    }

    this._onUpdate(
      this._fromValue +
      this._easing((now - this._startTime) / this._duration) *
      (this._toValue - this._fromValue),
    )
    if (this.__active) {
      // $FlowFixMe[method-unbinding] added when improving typing for this parameters
      this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this))
    }
  }

  stop() {
    super.stop()
    this.__active = false
    clearTimeout(this._timeout)
    global.cancelAnimationFrame(this._animationFrame)
    this.__debouncedOnEnd({ finished: false })
  }
}