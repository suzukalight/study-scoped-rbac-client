import React from 'react';

import Can from '../../atoms/Can';
import { useAuth } from '../../contexts/Auth';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Can actor={user} perform="users:getSelf">
      <div>
        <h2>User Profile</h2>
        <ul>
          <li>ID: {user.id}</li>
          <li>Email: {user.email}</li>
          <li>Role: {(user.roles || []).join(', ')}</li>
        </ul>
      </div>
    </Can>
  );
};

export default Profile;
