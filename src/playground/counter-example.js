
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: props.counter
        };
    }
    componentDidMount() {
        const json = localStorage.getItem('count');
        const count = parseInt(json, 10);
        if (!isNaN(count)) {
            this.setState(() => ({count:count}) );
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.count !== this.state.count)
            localStorage.setItem('count', this.state.count);
    }
    handleAddOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count+1
            };
        })
    }
    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        });
    }
    handleReset() {
        /*this.setState((prevState) => {
            return {
                count:0
            }
        });*/
        this.setState({
            count:0
        });
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick = {this.handleAddOne}>+1</button>
                <button onClick = {this.handleMinusOne}>-1</button>
                <button onClick = {this.handleReset}>Reset</button>
            </div>
        );
    }
}
Counter.defaultProps = {
    counter:10
};
ReactDOM.render(<Counter counter1={5}/>, document.getElementById('app'));
/*
let count = 0;
const addOne = ()=>{
    console.log("addOne");
    count++;
    renderCounterApp();
};
const minusOne = ()=>{
    console.log("minusOne");
    count--;
    renderCounterApp();
};
const reset = ()=>{
    console.log("reset");
    count=0;
    renderCounterApp();
};
const someId = 'myIdHere';




const renderCounterApp = ()=>{
    const templateTwo = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>reset</button>
        </div>
    );
    ReactDOM.render(templateTwo, appRoot);
};
renderCounterApp();*/