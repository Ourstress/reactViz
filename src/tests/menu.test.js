import React from 'react'
import {render, fireEvent, cleanup} from 'react-testing-library'
import 'jest-dom/extend-expect'
import SimpleMenu from '../display/menu'

afterEach(cleanup)

test('menu was loaded', () => {
    const {getByText} = render(<SimpleMenu />)
    const inputNode = getByText(/MENU/i)
})

test('clicking button works', () => {
    const {getByText} = render(<SimpleMenu />) 
    fireEvent.click(getByText(/MENU/i))    
}
)

test('modal shows after click on menu button', () => {
    const {container,getByText} = render(<SimpleMenu />) 
    const button = container.querySelector("Button") 
    fireEvent.click(button)
    const modalText = getByText("Show data")
    expect(modalText).toBeInTheDocument()
}
)

// test('onChange handler fired when checkbox pressed', () => {
//     const handlePRPI = jest.fn()
//     // trigger firing of button to open modal
//     const {container} = render(<SimpleMenu onChange={handlePRPI} />) 
//     const button = container.querySelector("Button") 
//     fireEvent.click(button)   
//     const checkbox = document.querySelector(".MuiSwitchBase-input-358")
//    fireEvent.click(checkbox)
//     expect(handlePRPI).toHaveBeenCalledTimes(1)
// }
// )