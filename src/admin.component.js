import React, { useState, useEffect, useMemo, useRef } from "react";
import AdminService from "./admin.service";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";


export const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [tokenText, setTokenText] = useState()
  const userRef = useRef();

  userRef.current = users;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const updateToken = () => {
    console.log("Hello world : ",tokenText)
    const data = {
      name: "WeathBot",
      token_id: tokenText,
    }  
    AdminService.updateBot(data).then((response) => {
      alert("Token updated in DB")
    })
    .catch((e) => {
      console.log(e);
      alert("Token failed to update in DB, try again")
    });  
  };
  const retrieveUsers = () => {
    AdminService.getAll()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const deleteUser = (rowIndex) => {
    const id = userRef.current[rowIndex].uid;

    AdminService.remove(id)
      .then((response) => {
        window.location.reload(true)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (event) => {
    setTokenText(event.target.value);
  }
  


const updateUserstat = (uid, newUBlockValue) => {
  const updateData = {
    u_block: newUBlockValue,
  };
  console.log("updateData is : ", updateData)
      AdminService.update(uid, updateData)
        .then((response) => {
          alert("User block status updated in DB")
          window.location.reload(true)
        })
        .catch((e) => {
          alert("Failed to update user's block status in DB")
          console.log(e);
        });
    };
    
  
    const handleToggle = (rowIdx, rowData) => {
      const updatedUBlockValue = rowData.u_block === "Yes" ? "No" : "Yes";
  
      // Call the updateUserstat function with the row's data and updated value
      updateUserstat(rowIdx, updatedUBlockValue);
    };
  
  const columns = useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "uid",
      },
      {
        Header: "User's Name",
        accessor: "u_name",
      },
      {
        Header: "User's Email",
        accessor: "u_email",
      },
      {
        Header: "Delete User",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>             
              <span onClick={() => deleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
      {
        Header: "User's Block Status",
        accessor: "updates",
        Cell: (props) => {
          const { row } = props;
          return (
            <div>             
               <span onClick={() => handleToggle(row.original.uid, row.original)}>
              {row.original.u_block === "Yes" ? (
                  <i className="fa-solid fa-toggle-on fa-lg" />
              ) : (
                  <i className="fa-solid fa-toggle-off fa-lg" />
              )}
            </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: users,
  });

  return (
    <>
    <div>
      <h1><center>Admin Page</center></h1>
    </div>
    <div>
      <h5> Enter New Telegram Weather Bot Token </h5>
      <input type="text" onChange={handleChange} placeholder="Enter token value"/>
      <button onClick={updateToken}>
        Update
      </button>
      </div>
    <br/>
    <br/>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
