import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    mobile: '1234567890',
    address: '123 Main St, City, Country',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Profile Information</h2>
      <label>Name:</label>
      <input name="name" value={profile.name} onChange={handleChange} /><br />
      <label>Mobile:</label>
      <input name="mobile" value={profile.mobile} onChange={handleChange} /><br />
      <label>Address:</label>
      <input name="address" value={profile.address} onChange={handleChange} /><br />
      <button onClick={() => alert("Profile updated!")}>Update</button>
    </div>
  );
};

export default Profile;
