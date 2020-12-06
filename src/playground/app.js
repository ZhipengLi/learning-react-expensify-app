
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: props.options
        };
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
    handleDeleteOptions() {
        this.setState(()=>{
            return {
                options:[]
            };
        });
    }
    handleDeleteOption(optionToRemove) {
        console.log(optionToRemove);
        this.setState((prevState) =>({
            options:prevState.options.filter((op)=>{
                return op!==optionToRemove;
            })
        }));
    }
    handlePick() {
        const num = Math.floor(Math.random() * this.state.options.length);
        if(this.state.options.length>0) {
            alert(this.state.options[num]);
        }
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add item';
        }
        else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }
        this.setState((prevState) => ({options:prevState.options.concat(option)}));
        /*this.setState((prevState) => {
            return {
                options:prevState.options.concat(option)
            };
        });*/
    }
    render() {
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer!';
        return (
            <div>
                <Header title = {title} subtitle = {subtitle}/>
                <Action 
                    hasOptions = {this.state.options.length>0}
                    handlePick = {this.handlePick}
                    />
                <Options 
                    handleDeleteOptions = {this.handleDeleteOptions} 
                    options = {this.state.options}
                    handleDeleteOption = {this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption = {this.handleAddOption}
                />
            </div>
        );
    }
}
IndecisionApp.defaultProps = {
    options: []
};
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};
Header.defaultProps = {
    title: 'default title',
    subtitle: 'default subtitle'
}
/*class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}*/

const Action = (props)=> {
    return (
        <div>
            <button 
                disabled = {!props.hasOptions} 
                onClick={props.handlePick}
                >
                What should I do?
            </button>
        </div>
    );
}
/*class Action extends React.Component {
    render() {
        return (
            <div>
                <button 
                    disabled = {!this.props.hasOptions} 
                    onClick={this.props.handlePick}
                    >
                    What should I do?
                </button>
            </div>
        );
    }
}*/

const Options = (props) => {
    return (
        <div>
        <button onClick = {props.handleDeleteOptions}>Remove all</button>
        {props.options.length === 0 && <p>Please add an option to get started!</p>}
            <ul>
           {
               props.options.map((op) => {
                   return (
                       <Option 
                        key={op} 
                        optionText = {op} 
                        handleDeleteOption = {props.handleDeleteOption}
                    />
                   );
               })
           }
           </ul>
        </div>
    );    
};

const Option = (props) => {
    return (
        <div>
            <li key = {props.optionText}>{props.optionText}</li>
            <button onClick={
                (e)=>{
                    props.handleDeleteOption(props.optionText);
                }
            }>Remove</button>
        </div>
    );
};
/*
class Option extends React.Component {
    render() {
        return (
            <li key = {this.props.optionText}>{this.props.optionText}</li>
        );
    }
}*/

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleOnSubmit(e) {
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
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleOnSubmit}>
                    <input name="newOption" />
                    <button>Add option</button>
                </form>
            </div>
        );
    }
}

const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));