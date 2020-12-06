console.log("app.js is running");

const app = {
    title:'Indecision App',
    subtitle:'Put your life in the hands of a computer',
    options:[]
};
//jsx - JavaScript XML

const onFormSubmit = (e) =>{
    e.preventDefault();
    
    const option = e.target.elements.option.value;

    if (option){
        app.options.push(option);
        e.target.elements.option.value = '';
        renderTemplate();
    }
};

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
};
const removeAll = (e) => {
    e.preventDefault();
    app.options = [];
    renderTemplate();
};

const renderTemplate = () => {
    const appRoot = document.getElementById('app');

    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            {(app.options && app.options.length>0)?<p>Here are your options</p>:<p>No options</p>}
            <button disabled={app.options.length==0} onClick={onMakeDecision}>what shall we do?</button>
            <button onClick = {removeAll}>Remove all</button>
            <ol>
            {
                app.options.map( (option) => {
                    return <li key={option}>{option}</li>
                })
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);
};

renderTemplate();


