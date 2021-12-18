import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DisplayObject from './DisplayObject'

// based on https://mui.com/components/popover/

const TableCellWithPopover = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);  
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };  
  
  const handleClose = () => {
    setAnchorEl(null);
  };  
  const open = Boolean(anchorEl);
  
  const id = open ? 'simple-popover' : undefined; 
  
  const elements = props.content
  console.log("content", elements)

  //const elements = props.content.map( el => 
  //  <li>{el}</li>
  //)
  
  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        {props.value}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 1 }}><DisplayObject content={elements}/></Typography>
      </Popover>
    </div>
  );
}

export default TableCellWithPopover
