import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, createContext } from "react";
import Table from "./Table/Table";
const userContext = createContext();
function App() {
  const [userData, setUserData] = useState([]);
  const BASE_URL = "https://jsonplaceholder.typicode.com";

  const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  };

  const addUser = async (payload) => {
    let response = axios.post(`${BASE_URL}/users`, payload);
    setUserData([...userData, payload]);
    console.log("Payload", payload.address.city);
    return response.data;
  };

  const modifyUser = async (userId, payload) => {
    // let response = axios.put(`${BASE_URL}/users/${userId}`, payload);
    console.log("Payload to modify", payload);
    setUserData((prev) =>
      prev.map((user) => {
        if (user.id == payload.id) {
          return {
            id: payload.id,
            username: payload.username,
            email: payload.email,
            address: { city: payload.address.city },
            phone: payload.phone,
            website: payload.website,
            company: { name: payload.company.name },
          };
        } else return user;
      })
    );
    // return response.data;
  };

  const deleteUser = async (userId) => {
    // let response = axios.delete(`${BASE_URL}/users/${userId}`);
    // return response.data;
    setUserData((prev) => prev.filter((user) => user.id !== userId));
  };

  useEffect(() => {
    (async () => {
      const usersData = await getUsers();
      setUserData(usersData);
    })();
  }, []);

  return (
    <userContext.Provider value={userData}>
      <div className="App">
        <Table
          setUserData={setUserData}
          addUser={addUser}
          modifyUser={modifyUser}
          deleteUser={deleteUser}
        />
      </div>
    </userContext.Provider>
  );
}
export { userContext };
export default App;
