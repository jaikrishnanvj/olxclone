import React, { useEffect, useContext, useState } from 'react';
import './View.css';
import { PostContext } from '../../Store/postContext';
import { FirebaseContext } from '../../Store/Context';
import { useHistory } from 'react-router-dom';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    if (!postDetails) {
      // Redirect to home page if postDetails is undefined
      history.push('/');
      return;
    }

    const { userId } = postDetails;
    firebase
      .firestore()
      .collection('users')
      .where('id', '==', userId)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
  }, [postDetails, firebase, history]);

  // If postDetails is undefined, do not render the component
  if (!postDetails) {
    return null;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imageUrl} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}</p>
          <span>{postDetails.createdAt?.toDate().toLocaleDateString()}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
