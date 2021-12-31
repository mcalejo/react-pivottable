import React, {useState} from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
//import { makeStyles } from '@mui/styles'
import { makeStyles } from '@material-ui/core/styles'
import DisplayObject from './DisplayObject'

export default function TableCellWithPopover(props) {
  const { cellBGColor, cellColor, cellAlign, content, value }  = props;
  const useStyles = makeStyles({
    root: {
    '& .MuiButton-root': {
      backgroundColor: cellBGColor,
      border: 0,
      borderRadius: 1,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      height: 24,
      padding: '0 3px',
      color: cellColor,
      //alignItems: cellAlign,
      justifyContent: cellAlign,
      '&:hover': {
          backgroundColor: 'lightblue',
      },
    },
  },
  });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);  
  const open = Boolean(anchorEl);
  
  const id = open ? 'simple-popover' : undefined; 
  
  const elements = content
  //console.log("content", elements)
  
  return (
    <Box
    className={classes.root}>
      <Button aria-describedby={id}
      className={classes.button}
      onClick={e=>setAnchorEl(e.currentTarget)}
      >{value}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={e=>setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}>
        <Typography
        sx={{ p: 1 }}>
          <DisplayObject
        content={elements}/></Typography>
      </Popover>
    </Box>
  );
}


