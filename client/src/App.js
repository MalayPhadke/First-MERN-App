import './App.css';
import { useState, useEffect } from "react";
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [friends, setFriends] = useState([]);

  const addFriend = () => {
    Axios.post('http://localhost:3001/addFriend', {name, age})
    .then((res) => {
      setFriends([...friends, { name, age}])
    })
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");
    Axios.put(`http://localhost:3001/${id}/update`, {newAge})
    .then(() => {
      setFriends(friends.map((val) => {
        return val._id === id ? {_id:id, name: val.name, age: newAge} : val
      }))
    }).catch(() => {
      console.log("Error");
    })
  };
  
  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/${id}/delete`)
      .then(() => {
        setFriends(friends.filter((val) => {
          return val._id !== id 
        }))
      })
  }
  useEffect(() => {
    Axios.get('http://localhost:3001/read')
      .then(res => {setFriends(res.data)})
      .catch(e => {console.log("Error", e)})
  }, [])

  return (
    <div className="App">
      <div className="inputs">
      <input type="text" placeholder='Friend Name' onChange={(e) => {setName(e.target.value)}}/>
      <input type="number" placeholder='Friend Age' onChange={(e) => {setAge(e.target.value)}}/>
      <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className='listOfFriends'>
      {friends.map((value) => {
        return (
          <div className='friendContainer'>
                <div className='friend'>
                  <h3>Name: {value.name}</h3>
                  <h3>Age: {value.age}</h3>
                </div>
                <button onClick={() => {updateFriend(value._id)}}>Update</button>
                <button id='delButton' onClick={() => {deleteFriend(value._id)}}>X</button>
          </div>
      )})}
      </div>
    </div>
  );
}

export default App;
