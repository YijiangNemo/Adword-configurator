import React from 'react';
import Textfield from '../../components/Textfield/index';
import Button from '../../components/Button/index';
import RemoveButton from '../../components/RemoveButton/index';
import './style.css'
const update = require('immutability-helper'); //A useful library to Mutate a copy of data without changing the original source

const StandardList =(props) => {

    const [state, setStates] = React.useState({
        data:props.data,
        text:'',
    });

    const handleAdd = () => {
        const result = update(state, {data: {$push:[state.text]}});
        setStates(result);
        props.getData(result.data);
    };
    const handleRemove = (index) => {
        const result = update(state, {data: {$splice:[[index, 1]]}})
        setStates( result);
        props.getData(result.data)
    };
    const handleChange  = event => {
    setStates({ ...state, text: event.target.value });
    };



    return(
        <div className={'configurator-list'}>
            <div className={'configurator-textfield'}>
            <Textfield placeholder={props.placeholder} onChange={handleChange} value={state.text} button={<Button onClick={handleAdd} backgroundcolor={props.buttonColor}><i
                className="material-icons">
                add_circle_outline
            </i>Add</Button>}/>
            </div>
            <div className={'item-container'}>
                {state.data.map((n,i)=>{
                    return(<div key={n} className={'configurator-item'}>
                        <p>{n}</p>
                        <div style={{flexGrow:1}}/>
                        <RemoveButton onClick={()=>{handleRemove(i)}} backgroundcolor={props.buttonColor}>
                        <i className="material-icons">
                            remove_circle_outline
                        </i>
                            Clear
                        </RemoveButton>

                    </div>)
                })}

            </div>
        </div>
)}
;

export default StandardList

