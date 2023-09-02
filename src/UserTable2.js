import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Spinner, Stack } from 'react-bootstrap'
import EditUser from "./EditUser";
import EditUser2 from "./EditUser2";
import EditUser3 from "./EditUser3";
import EditUser4 from "./EditUser4";
import EditUser5 from "./EditUser5";
import LoadingButton from "./ui/LoadingButtion";
import LoadingModel from "./ui/LoadingButtion";

const deleteById = async (id) => {
  try {
    const response = await axios.delete(`https://zs47dr-4000.csb.app/users/${id}`);
    console.info('Delete data: ', response);
    return response.data;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

const saveUser = async (data) => {
  try {
    const response = await axios.post("https://zs47dr-4000.csb.app/users", data);
    console.info('Saved data: ', response);
    return response.data;
  } catch (error) {
    console.error(error);
    return -1;
  }

}

const UserTable2 = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);



  const refreshTable = async () => {
    console.info('refreshTable : start');

    try {
      console.info('refreshTable : fetching users start');
      const response = await axios.get(
        "https://zs47dr-4000.csb.app/users"
      );
      console.info('refreshTable : fetching users end');
      setUsers(response.data);
      console.info('fetched usersdata: ', response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    console.info('refreshTable : end');
  }

  useEffect(() => {
    console.info('UserTable Mounted : start');
    refreshTable();
    console.info('UserTable Mounted : end');

  }, []);

  const showEditPopup = (id) => {
    setEditUserId(id);
  };

  const closeEditPopup = () => {
    console.info('Model closed');
    setEditUserId(null);
  };

  const handleEditData = async (data) => {
    setIsSaveLoading(true);
    console.info('Edit data: ', data);
    //setEditUserId(null);
    const result = await saveUser(data);
    console.info('Saved result :' + result)
    await refreshTable();
    setIsSaveLoading(false);
  }

  const handleDelete = async (id) => {
    console.info('Delete result id :' + id)
    setDeleteLoading(true);
    try {
      const result = await deleteById(id);
      console.info('Delete result :' + result)
      await refreshTable();
    } finally {
      setDeleteLoading(false);
    }
    console.info('Delete result end')
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
      {/* <Button variant="danger" onClick={handleDeleteAll}>Delete All</Button> */}
      {/* { isLoading && <Spinner animation="border" /> } */}
      <table className="table table-hover">
        <caption>List of users</caption>
        <thead class="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>

          {users.map((user) => (
            // <tr key={user.id} onClick={() => showEditPopup(user.id)}>
            <tr key={user.id} >
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Stack direction="horizontal" gap={3}>
                  <Button variant="success" size="sm" onClick={() => showEditPopup(user.id)} >Edit</Button>
                  <LoadingButton variant="danger" loading={isDeleteLoading} value={'Delete'} loadingValue={'Deleting...'} onClick={() => handleDelete(user.id)}/>
                  <LoadingModel show={isDeleteLoading} text={'Please wait'}/>
                </Stack>
              </td>
            </tr>
          ))}
          {
            isSaveLoading && <tr >
              <th >#</th>
              <td colspan="4">Loading... please wait</td>
            </tr>

          }


        </tbody>
      </table>
    </>
  );
};

export default UserTable2;
