import * as React from 'react';
import './AddDialog.css';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

export function AddDialog(props) {
    const { onClose, open } = props;
    const [name, setName] = React.useState("");
    const [count, setCount] = React.useState(0);

    const handleClose = () => {
      onClose();
    };

    const addItem = () => {
      fetch("/create", {method: 'POST', headers: {
        'Content-Type': 'application/json'}, body: JSON.stringify({name: name, count: parseInt(count)})})
          .then(res => res.status)
          .then(() => onClose());
    }

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add new Item</DialogTitle>
        <div className='fields'>
          <TextField value={name} id="outlined-basic" label="Item Name" variant="outlined" onChange={e => setName(e.target.value)}/>
        </div>
        <div className='fields'>
          <TextField value={count} id="outlined-basic" label="Item Count" variant="outlined" onChange={e => setCount(e.target.value)} />
        </div>
        <div className='fields'>
          <Button variant = "outlined" onClick={addItem}>
            Submit
          </Button>
        </div>
        
      </Dialog>
    );
  }