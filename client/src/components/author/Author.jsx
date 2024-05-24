import './author.css';
import { style } from '../../styles/style';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { useState } from 'react';
import {useMutation, useQuery} from "@apollo/client";
import { GET_ALL_AUTHORS } from "../../queries/queries";
import { DELETE_AUTHOR, UPDATE_AUTHOR } from "../../mutations/mutations";

const Author = (props) => {
  const {author} = props;
  const {refetch} = useQuery(GET_ALL_AUTHORS);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(author.name);
  
  const handleOpen = () => setOpen(!open);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const authorData = {
        name: newName,
      }
      await updateAuthor({ variables: {id: author.id, input: authorData}});
      refetch()
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteAuthor = async(id) => {
    try {
      await deleteAuthor({variables: {id: id}})
      refetch()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='author'>
      <div className='authorTitleRow'>
        <div>{author?.id}</div>
        <div>{author?.name}</div>
      </div>
      <div>

        {author?.books?.map((book, index) => 
          <div key={book.id} className="authorBooks">
            <div className='authorBooksNum'>{index + 1}</div>
            <div className='authorBooksTitle'>{book.title}</div>
            
          </div>
        )}
      </div>
      <div className='btns'>
        <button type="button" className='smalBtn' onClick={() => handleDeleteAuthor(author.id)}>Delete</button>
        <button className='smalBtn' onClick={handleOpen}>Update</button>
      </div>

      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='updateForm' onSubmit={handleSubmit}>
          <label>Author</label>
          <input required value={newName || ""} onChange={e => setNewName(e.target.value)} type="text" />
          <br />
          <button type="submit" className='btn'>Update</button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default Author;