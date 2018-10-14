import React, { Component } from 'react'
import {render, cleanup} from 'react-testing-library'
import 'jest-dom/extend-expect'
import XyPlots from '../display/xyPlots'

afterEach(cleanup)

test('XyPlots was loaded', () => {
    const {container} = render(<XyPlots />)
    const xyplotLoaded = container.querySelector("XyPlots")
})

