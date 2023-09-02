import axios from "axios";
import { useEffect, useState } from "react";
import {Button} from 'react-bootstrap'
import EditUser from "./EditUser";
import EditUser2 from "./EditUser2";
import EditUser3 from "./EditUser3";
import EditUser4 from "./EditUser4";
import EditUser5 from "./EditUser5";

const deleteAllUsers = async (data) => {
  try{
    const response = axios.delete("https://zs47dr-4000.csb.app/users", data);
    console.info('Delete data: ', response);
    return response.data;
  }catch(error){
    console.error(error);
    return -1;
  } 
}

const saveUser = async (data) => {
  try{
    const response = axios.post("https://zs47dr-4000.csb.app/users", data);
    console.info('Saved data: ', response);
    return response.data;
  }catch(error){
    console.error(error);
    return -1;
  } 
}

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const refreshTable = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"https://jsonplaceholder.typicode.com/users"
          "https://zs47dr-4000.csb.app/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }

  useEffect(() => {
    refreshTable();
  }, []);

  const showEditPopup = (id) => {
    setEditUserId(id);
  };

  const closeEditPopup = () => {
    console.info('Model closed');
    setEditUserId(null);
  };

const handleDeleteAll = async () => {
  setIsLoading(true);
  try{
    const result = await deleteAllUsers();
    console.info('Saved result :'+ result)
    refreshTable();
  }finally{
    setIsLoading(false);
  }
}

 const handleEditData = async (data) => {
  setIsLoading(true);
  try{
    console.info('Edit data: ', data);
    //setEditUserId(null);
    const result = await saveUser(data);
    console.info('Saved result :'+ result)
    refreshTable();
  }finally{
    setIsLoading(false);
  }
  
 }

  return (
    <>
      {editUserId !== null && (
        // <EditUser id={editUserId} onClose={closeEditPopup} onSaveChanges={handleEditData} />
        // <EditUser2 id={editUserId} onClose={closeEditPopup} onSaveChanges={handleEditData} />
        // <EditUser3 id={editUserId} onClose={closeEditPopup} onSaveChanges={handleEditData} />
        <EditUser5 id={editUserId} type='add' onClose={closeEditPopup} onSaveChanges={handleEditData} />
      )}
      <Button variant="primary" onClick={() => showEditPopup(0)}>Add new</Button>

      <table className="table table-hover">
        <caption>List of users</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {
            isLoading ? <Spinner animation="border" />: 
          
          users.map((user) => (
            <tr key={user.id} onClick={() => showEditPopup(user.id)}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))
}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
