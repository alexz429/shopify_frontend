import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons'
import { AddDialog } from './AddDialog';
import { EditDialog } from './EditDialog';


export default function ItemTable() {
  const [data, setData] = React.useState([]);
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [curItem, setCurItem] = React.useState({});
  
  const handleClose = () => {
    setEditOpen(false);
    setAddOpen(false);
  }
  React.useEffect(() => {
    console.log("pop");
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [addOpen, editOpen]);
  const handleDelete = (id) => {
    return () => {
      fetch("/delete", {method: 'POST', headers: {
        'Content-Type': 'application/json'}, body: JSON.stringify({id: id})}).then(
          setData(data.filter(item => item.ItemID !== id)))
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          </TableRow>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Item</TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell align="right">
                <Button variant = "outlined" onClick={() => setAddOpen(true)}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.ItemID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ItemID}
              </TableCell>
              <TableCell align="right">{row.ItemName}</TableCell>
              <TableCell align="right">{row.ItemCount}</TableCell>
              <TableCell align="right">
                <Button variant = "outlined" onClick={()=> { setCurItem(row); setEditOpen(true);}} >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                
                <Button variant = "outlined" onClick={handleDelete(row.ItemID)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddDialog
        open={addOpen}
        onClose={handleClose}
      />
      <EditDialog
        open={editOpen}
        onClose={handleClose}
        curItem={curItem}
      />
    </TableContainer>
  );
}