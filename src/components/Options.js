import React from 'react';

import Option from './Option';

const Options = (props) => (
        <div>
        <div className='widget-header'>
            <h3 className='widget-header__title'>Your Options</h3>
            <button 
                className='button button--link'
                onClick = {props.handleDeleteOptions}
            >
            Remove all
            </button>
        </div>

        {props.options.length === 0 && <p className='widget__message'>Please add an option to get started!</p>}
            <ul>
           {
               props.options.map((op, index) => {
                   return (
                       <Option 
                        key={op} 
                        optionText = {op} 
                        count = {index + 1}
                        handleDeleteOption = {props.handleDeleteOption}
                    />
                   );
               })
           }
           </ul>
        </div>
    );    
export default Options;