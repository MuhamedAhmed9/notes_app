import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [DeleteID, setDeleteID] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let Token = localStorage.getItem("token");
  if (Token) {
    var decodedToken = jwtDecode(Token);
  }

  const [addNote, setAddNote] = useState({
    title: "",
    desc: "",
    userID: decodedToken._id,
    token: Token,
  });

  async function getAllNotes() {
    let { data } = await axios.get(
      "https://route-egypt-api.herokuapp.com/getUserNotes",
      {
        headers: {
          Token,
          userID: decodedToken._id,
        },
      }
    );
    if (data.message === "success") {
      setIsLoading(false);
      setNotes(data.Notes);
    }
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  function handleDelete(e) {
    setDeleteID(e.target.parentElement.dataset.id);
  }

  function setNewNote({ target }) {
    setAddNote({ ...addNote, [target.name]: target.value });
    // console.log(addNote);
  }

  async function postNewNote(e) {
    e.preventDefault();
    let closeBtn = document.querySelector("#closeConfirm1");
    closeBtn.click();
    let { data } = await axios.post(
      "https://route-egypt-api.herokuapp.com/addNote",
      addNote
    );

    if (data.message === "success") {
      // console.log(data);
      getAllNotes();
      Swal.fire("Good job!", "You Added new Note!", "success");
    }
  }

  async function deleteNote() {
    let deleteBtn = document.querySelector("#closeConfirm");
    deleteBtn.click();
    let token = localStorage.getItem("token");
    let { data } = await axios.delete(
      "https://route-egypt-api.herokuapp.com/deleteNote",
      {
        data: {
          NoteID: DeleteID,
          token,
        },
      }
    );
    // console.log(e.target.parentElement.dataset.id);
    // console.log(token);
    // console.log(data);
    if (data.message === "deleted") {
      getAllNotes();
      Swal.fire("Good job!", "You Deleted the Note!", "success");
    }
    setDeleteID("");
  }

  function handleUpdate(noteid) {
    let updateBtn = document.querySelector("#updateBtn");
    updateBtn.dataset.noteid = noteid;
    let updateInput = document.querySelector("#updateModal .modal-body input");
    let updateTextArea = document.querySelector(
      "#updateModal .modal-body textarea"
    );
    let note = notes.find((note) => note._id === noteid);
    updateInput.value = note.title;
    updateTextArea.value = note.desc;
  }

  async function updateNote(e) {
    e.preventDefault();
    let updateBtn = document.querySelector("#closeConfirm2");
    updateBtn.click();
    // let updateBtn = document.querySelector("#updateBtn");
    let updateInput = document.querySelector("#updateModal .modal-body input");
    let updateTextArea = document.querySelector(
      "#updateModal .modal-body textarea"
    );
    let { data } = await axios.put(
      "https://route-egypt-api.herokuapp.com/updateNote",
      {
        NoteID: e.target.dataset.noteid,
        title: updateInput.value,
        desc: updateTextArea.value,
        token: localStorage.getItem("token"),
      }
    );
    // console.log(data);
    if (data.message === "updated") {
      getAllNotes();
      Swal.fire("Good job!", "You Updated the Note!", "success");
    }
  }

  return (
    <>
      <div className="container my-5">
        <div className="col-md-12 m-auto text-right">
          <a
            className="add p-2 btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fas fa-plus-circle"></i> Add New
          </a>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form action="/addNote" method="POST">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  onChange={setNewNote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                />
                <textarea
                  onChange={setNewNote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="closeConfirm1"
                >
                  Close
                </button>
                <button
                  onClick={postNewNote}
                  type="submit"
                  className="btn btn-info"
                >
                  <i className="fas fa-plus-circle"></i> Add Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- update Modal --> */}
      <div
        className="modal fade"
        id="updateModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form action="/addNote" method="POST">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  onChange={setNewNote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                />
                <textarea
                  onChange={setNewNote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="closeConfirm2"
                >
                  Close
                </button>
                <button
                  id="updateBtn"
                  onClick={updateNote}
                  data-noteid="note-id"
                  type="submit"
                  className="btn btn-warning"
                >
                  <i className="fas fa-refresh"></i> Update Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- ==========================delete=============================== --> */}

      <div
        className="modal fade"
        id="deleteNote"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are You Sure ?</div>
            <div className="modal-footer">
              <button
                id="closeConfirm"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-deleteid={DeleteID}
                type="button"
                className="btn btn-danger"
                onClick={deleteNote}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- ==========================Notes=============================== --> */}

      <div className="container">
        <div className="row">
          {isLoading ? (
            <div
              className="spinner-border text-info position-fixed top-50 start-50"
              role="status"
            ></div>
          ) : notes ? (
            notes.map((note) => {
              return (
                <div key={note._id} className="col-md-4 my-4">
                  <div data-id={`${note._id}`} className="note p-4">
                    <h3 className="float-left">{note.title}</h3>

                    <i
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                      onClick={() => handleUpdate(note._id)}
                      className="font-setting fas fa-edit float-right edit"
                    ></i>

                    <i
                      className="font-setting fas fa-trash-alt float-right px-3 del"
                      onClick={handleDelete}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteNote"
                    ></i>

                    <span className="clearfix"></span>
                    <p>{note.desc}</p>
                  </div>
                </div>
              );
            })
          ) : (
            "No Notes to show"
          )}
        </div>
      </div>
    </>
  );
}
