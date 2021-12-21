import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import DisplayObject from './DisplayObject'

// from https://mui.com/styles/basics/
const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 0,
    borderRadius: 1,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: 24,
    padding: '0 3px',
  },
});

// based on https://mui.com/components/popover/

const TableCellWithPopover = props => {
  const classes = useStyles();
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

  //  <Button aria-describedby={id} className={classes.root} variant="contained" onClick={handleClick}>
  //{props.value}
  //</Button>
  
  return (
    <div>
      <Button className={classes.root} onClick={handleClick}>
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
