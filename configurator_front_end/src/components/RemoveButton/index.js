import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const StandardButton = React.forwardRef((props,ref) => {

    const useStyles = makeStyles(theme => ({
          button: {
                lineHeight:'16px',
                textTransform:'none',
                fontSize:'14px',
                boxShadow:"none",
                padding:'4px 4px 4px 4px',
                color:  'white',
                backgroundColor: '#212b3e',
                border:'1px solid white'
            }
        }));
    const classes = useStyles();
    return(
        <Button  {...props} ref={ref} variant="contained" classes={{root:classes.button}} >
           {props.children}
      </Button>
)})
;

export default StandardButton

