import { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="">
      <h1>User List</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => <li key={index}>{user}</li>)
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
};

export default App;
