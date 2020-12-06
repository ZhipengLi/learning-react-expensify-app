import React from 'react';

export default class AddOption extends React.Component {
    state = {
        error:undefined
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const option  = e.target.elements.newOption.value;
        const error = this.props.handleAddOption(option);
        this.setState(() => {
            return {
                error: error
            }
        });   
        if (!error) {
            e.target.elements.newOption.value = '';
        }    
    }
    render() {
        return (
            <div>
                {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
                <form className='add-option' onSubmit={this.handleOnSubmit}>
                    <input className='add-option__input' name="newOption" />
                    <button className='button'>Add option</button>
                </form>
            </div>
        );
    }
}