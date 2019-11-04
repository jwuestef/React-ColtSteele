import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'



class ColorPickerForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentColor: 'teal',
            newColorName: ''
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            let isUnique = this.props.colors.every( ({name}) => name.toLowerCase() !== value.toLowerCase() )
            return isUnique
        });
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            let isUnique = this.props.colors.every( ({color}) => color !== this.state.currentColor )
            return isUnique
        });
    }
    
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.setState({ newColorName: '' })
    }

    render() {
        const { paletteIsFull } = this.props
        const { currentColor, newColorName } = this.state
        return (
            <div>
                <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator value={newColorName} name="newColorName" onChange={this.handleChange} validators={["required", "isColorNameUnique", "isColorUnique"]} errorMessages={["Color name is required", "Color name already taken", "Color already used"]} />
                    <Button varient="contained" color="primary" style={{ backgroundColor: paletteIsFull ? "grey " : currentColor }} type="submit" disabled={paletteIsFull}>{ paletteIsFull ? "Palette Full" : "Add Color"}</Button>
                </ValidatorForm>
            </div>
        )
    }

}

export default ColorPickerForm
