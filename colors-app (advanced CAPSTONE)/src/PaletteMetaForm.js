import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Picker } from 'emoji-mart'

import 'emoji-mart/css/emoji-mart.css'



class PaletteMetaForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stage: 'form',
            newPaletteName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.showEmojiPicker = this.showEmojiPicker.bind(this)
        this.savePalette = this.savePalette.bind(this)
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            let isUnique = this.props.palettes.every( ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase() )
            return isUnique
        });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.hideForm()
    };

    showEmojiPicker() {
        this.setState({ stage: 'emoji' })
    }

    savePalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette)
        this.setState({ stage: '' })
    }

    render() {
        const { newPaletteName, stage } = this.state
        const { hideForm } = this.props
        return (
            <div>                
                <Dialog open={stage === 'emoji'} onClose={hideForm}>
                    <DialogTitle id="emoji-dialog">Choose an emoji</DialogTitle>
                    <Picker title="Pick a Palette Emoji" onSelect={this.savePalette} />
                </Dialog>
                <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogTitle id="name-dialog">Choose a Palette Name</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new beautiful palette. Make sure it's unique!
                            </DialogContentText>
                            <TextValidator fullWidth margin="normal" value={newPaletteName} label="Palette Name" name="newPaletteName" onChange={this.handleChange} validators={["required", "isPaletteNameUnique"]} errorMessages={["Palette name is required", "Palette name is already in use"]} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">Cancel</Button>
                            <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                        </DialogActions>
                    </ValidatorForm> 
                </Dialog>
            </div>
        );
    }

}

export default PaletteMetaForm
