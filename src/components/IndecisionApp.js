import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options:[],
        selectedOption:undefined
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if( options)
                this.setState(()=>({options: options}));
        }
        catch (e) {
            // Do nothing at all
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount!');
    }
    handleDeleteOptions = () => {
        this.setState(()=>{
            return {
                options:[]
            };
        });
    }
    handleDeleteOption = (optionToRemove) => {
        console.log(optionToRemove);
        this.setState((prevState) =>({
            options:prevState.options.filter((op)=>{
                return op!==optionToRemove;
            })
        }));
    }
    handlePick = () => {
        const num = Math.floor(Math.random() * this.state.options.length);
        console.log(num);
        if(this.state.options.length>0) {
            const option = this.state.options[num];
            console.log(option);
            this.setState(()=>{
                return {
                    selectedOption: option
                };
            });
        }
    }
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        }
        else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }
        this.setState((prevState) => ({options:prevState.options.concat(option)}));
    }
    handleCloseModal = () =>{
        this.setState(()=>{
            return {
                selectedOption:undefined
            };
        });
    }
    render() {
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer!';
        return (
            <div>
                <Header title = {title} subtitle = {subtitle}/>
                <div className='container'>

                    <Action 
                        hasOptions = {this.state.options.length>0}
                        handlePick = {this.handlePick}
                        />
                    <div className='widget'>
                        <Options 
                        handleDeleteOptions = {this.handleDeleteOptions} 
                        options = {this.state.options}
                        handleDeleteOption = {this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption = {this.handleAddOption}
                        />
                    </div>

                    <OptionModal 
                        selectedOption = {this.state.selectedOption}
                        handleCloseModal = {this.handleCloseModal}
                    >
                    </OptionModal>
                </div>
            </div>
        );
    }
}
IndecisionApp.defaultProps = {
    options: []
};

export default IndecisionApp;
