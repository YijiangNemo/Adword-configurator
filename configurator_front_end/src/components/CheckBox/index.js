import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
const StandardCheckBox = React.forwardRef((props,ref) => {

    const useStyles = makeStyles(theme => ({
          checkbox: {
                '&$checked': {
                color: props.theme_color||'#3D70B2',},
          },
        checked:{
        }
        }));

    const classes = useStyles();

    return(

        <div style={{margin:4, borderRadius:4,border:`1px solid ${props.checked===true?props.theme_color:'rgba(0,0,0,0)'}`,display:'inline-flex',alignItems:'center',padding:'0px 12px 0px 0px',color:'white'}}>
        <Checkbox  {...props} ref={ref} variant="contained" classes={{root:classes.checkbox,checked:classes.checked}} />
        <p style={{margin:0}}>{props.title}</p>
        </div>

)})
;
StandardCheckBox.propTypes = {
  theme_color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
export default StandardCheckBox

