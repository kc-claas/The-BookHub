import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { ADD_USER_TO_GROUP } from '../utils/mutations.js';
// import Auth from '../utils/auth.js'
import { Link } from 'react-router-dom';
import './css/Profile.css';
import placeholder from '../assets/placeholderpic.png'
import { CiCirclePlus } from "react-icons/ci";
import ProfilePicEditor from './ProfilePicEditor.js';
// import { CiCamera } from "react-icons/ci";
import { Modal, Button } from 'react-bootstrap';
import { GoBookmark } from "react-icons/go";


const ProfilePage: React.FC = () => {
  // Replace 'logged-in-user-id' with the actual logged-in user's ID from context or props
  const { data, loading, error } = useQuery(GET_ME, {fetchPolicy:'cache-and-network'});
  const [addUserToGroup] = useMutation(ADD_USER_TO_GROUP, {refetchQueries: [GET_ME]})

  const [profilePic, setProfilePic] = useState<string>(placeholder); // Add state for profile picture
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  const user = data?.me;
  
  const handleSave = (newImage: string) => {
    setProfilePic(newImage); 
    setIsEditing(false); 
  };

  const handleCancel = () => {
    setIsEditing(false); 
  };

  const handleInvitation = (groupId: any, accepted: boolean) => {
    addUserToGroup({variables: {groupId, accepted}})
  }

  return (
    <div className="profile-page">
      {/* <button className="logout-button" onClick={() => { Auth.logout() }}>Logout</button> */}

      <div className="profile-container">

        <div className="welcome-header">
        {/* <button
            className="edit-button"
            onClick={() => setIsEditing(true)} 
          >
            <CiCamera />
          </button> */}
          <img
            src={profilePic}
            alt="Profile"
            className="background-img"
          />
          {/* <button
            className="edit-button"
            onClick={() => setIsEditing(true)} 
          >
            <CiCamera />
          </button> */}
          <h1>Welcome, {user?.username}</h1>
        </div>

        <Modal show={isEditing} onHide={handleCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Profile Picture Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProfilePicEditor
              onSave={handleSave}  
              onCancel={handleCancel} 
            />
          </Modal.Body>
        </Modal>

{/* Pending club invitations */}
            <div>
              {user?.invitations && user?.invitations.length>0?(
                <ul>
                  {user?.invitations.map((invite: any)=>(
                    <li className='invite-btn'key={invite._id}>
                        <div className="invite-container">
                      <p>{`The club "${invite.groupname}" has invited you to join`}</p>
                      <div className="button-group">
                      <Button className='accept-btn'onClick={()=>{handleInvitation(invite._id, true)}}>Accept</Button>
                      <Button className='decline-btn'onClick={()=>{handleInvitation(invite._id, false)}}>Decline</Button>
                    </div>
                    </div>
                    </li>
                  ))}
                </ul>):(<></>)}
            </div>



        <section className="container">
  <div className="row">
    {/* Left Column */}
    <div className="col-lg-6 col-md-12">
      <div className="card h-100 shadow-sm custom-card w-100">
        <div className="card-body d-flex flex-column">
          <h2 className="card-title">My Books | <span style={{fontSize:'13px'}}>View all Books <Link to="/library">
                      <CiCirclePlus className='icon-styles' />
                    </Link></span></h2>
          <ul style={{listStyle:'none'}} className="d-flex flex-wrap ">
            {user?.books.slice(0,6).map((book: { _id: string; title: string; image: string }) => (
              <li key={book._id} style={{ flex: '0 0 32%' }}>
                <Link to={`/book/${book._id}`}><img 
                  src={book.image} 
                  alt={`Cover for ${book.title}`} 
                  className="book-cover"
                /></Link>
              </li>
            ))}
          </ul>
          
        </div>
      </div>
</div>

    {/* Right Column */}
    <div className="col-lg-6 col-md-12">
      <div className="card h-100 shadow-sm custom-card w-100">
        <div className="card-body d-flex flex-column">
          <h2 className="card-title">My Clubs | <span style={{fontSize:'13px'}}>Add a new Club <Link to="/createClub"><CiCirclePlus className='icon-styles' />
          </Link></span></h2>
          <ul style={{listStyle:'none'}}>
            {user?.groups.map((group: { _id: string; description: string; groupname: string }) => (
       <li key={group._id} className="d-flex align-items-center mb-2">
       
       <GoBookmark className="me-2" />
       <Link to={`/club/${group._id}`} className="text-decoration-none" id='club-hover'>
         {group.groupname}
       </Link>
     </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

      </div>
      </div>
    
  );
};

export default ProfilePage;

