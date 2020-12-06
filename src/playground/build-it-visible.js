
class VisibilityToggle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visibility:false
        };
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    }
    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        });
    }
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick = {this.handleToggleVisibility}>{this.state.visibility?'Hide details':'Show details'}</button>
                {this.state.visibility && <p>These are the details to show.</p>}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

/*
let showContent = false;
const showDetail = () => {
    showContent = !showContent;
    renderTemplate();
};

const renderTemplate = () => {
    const appRoot = document.getElementById('app');
    const template = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={showDetail}>{showContent?'Hiden details':'Show details'}</button>
            {showContent && <p>These are the details!</p>}
        </div>
    );
    ReactDOM.render(template, appRoot);
};
renderTemplate(); */
