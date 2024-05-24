import "./book.css";
import { style } from '../../styles/style';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import {useMutation, useQuery} from "@apollo/client";
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from "../../queries/queries";
import { DELETE_BOOK, UPDATE_BOOK } from "../../mutations/mutations";

const Book = (props) => {
  const {authors, book, index} = props;
  const {refetch} = useQuery(GET_ALL_AUTHORS);
  const {refetch: refetchBooksData} = useQuery(GET_ALL_BOOKS);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(book.title);
  const [newAuthorId, setNewAuthorId] = useState(book.authorId);
  
  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    setNewAuthorId(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const authorData = {
        title: newTitle,
        authorId: newAuthorId
      }
      await updateBook({ variables: {id: book.id, input: authorData}});
      refetch()
      refetchBooksData()
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteBook = async(id) => {
    try {
      await deleteBook({variables: {id: id}})
      refetch()
      refetchBooksData()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="book">
      <div className="bookNum">{index + 1}</div>
      <div className="bookTitle">{book.title}</div>
      <button type="button" className='smalBtn' onClick={() => handleDeleteBook(book.id)}>Delete</button>
      <button className='smalBtn' onClick={handleOpen}>Update</button>

      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='updateForm' onSubmit={handleSubmit}>
          <label>Book</label>
          <input required value={newTitle || ""} onChange={e => setNewTitle(e.target.value)} type="text"/>
          <br />
          <div className="formInpsRow">
            <label>Author</label>
            <Select
              style={{width: "300px", height: "30px", background: "#fff"}}
              value={newAuthorId}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {authors.map((author =>
                <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
              ))}
            </Select>
          </div>
          <br/>
          <button type="submit" className='btn'>Update</button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default Book;