import * as React from 'react';
import './AddDialog.css';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

export function EditDialog(props) {
    const { onClose, open, curItem } = props;
    const [name, setName] = React.useState(curItem.ItemName);
    const [count, setCount] = React.useState(curItem.ItemCount);
    React.useEffect(() => {setName(curItem.ItemName); setCount(curItem.ItemCount);}, [curItem]);

    const handleClose = () => {
      onClose();
    };

    const editItem = () => {
      fetch("/edit", {method: 'POST', headers: {
        'Content-Type': 'application/json'}, body: JSON.stringify({name: name, count: parseInt(count), id: curItem.ItemID})})
        .then(res => res.status)
        .then(() => onClose());
    }

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit Item</DialogTitle>
        <div className='fields'>
          <TextField value={name} id="outlined-basic" label="Item Name" variant="outlined" onChange={e => setName(e.target.value)}/>
        </div>
        <div className='fields'>
          <TextField value={count} id="outlined-basic" label="Item Count" variant="outlined" onChange={e => setCount(e.target.value)} />
        </div>
        <div className='fields'>
          <Button variant = "outlined" onClick={editItem}>
            Submit
          </Button>
        </div>
        
      </Dialog>
    );
  }