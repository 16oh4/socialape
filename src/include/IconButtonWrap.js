import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

export default ({ children, onClick, tip, btnClassName, tipClassName, placement}) => { //use parenthesis because not processing any logic
    
    // console.log('hello');
    return (
        <Tooltip title={tip} className={tipClassName} placement={placement ? placement : "bottom-end"}>
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    );
};