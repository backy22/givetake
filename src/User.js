import React from 'react';
import './App.css';

const DATA = {
  users: [
    {id: 1, name: "aya", password: "123"},
    {id: 2, name: "Jon", password: "password"},
    ],
  topics: [
    {id: 1, user_id: 1, type: "give", title: "I can walk your dog", text: "text-----------", date: "2019/5/31 9:40", active: true,
        comments: [
          {id: 1, user_id: 2, comment: "reply-----------------", date: "2019/6/1 0:50"},
          {id: 2, user_id: 3, comment: "me too----------", date: "2019/6/1 10:00"},
          {id: 3, user_id: 1, comment: "ok--------------", date: "2019/6/1/ 15:00"}
        ]
    },
    {id: 2, user_id: 2, type: "take", title: "help me", text: "help me text---------------", date: "2019/6/2 10:00", active: true,
        comments: []
    }
  ]
}

const User = ({ match }) => {
  const data = DATA;
  const users = data.users;
  const user_id = parseInt(match.params.user_id, 10)
  const user = users.filter(e => e.id === user_id)[0]
  const topics = data.topics.filter(e => e.user_id === user_id)
  return (
    <div>
      <h3>user ID: {match.params.user_id}</h3>
      {topics.map((topic) =>
        <div>{topic.title}</div>
      )}
    </div>
  );
}

export default User;
