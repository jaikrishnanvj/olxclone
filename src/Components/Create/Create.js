// import React, { Fragment, useContext, useState } from 'react';
// import './Create.css';
// import Header from '../Header/Header';
// import { FirebaseContext, AuthContext } from '../../Store/Context';

// const Create = () => {
//   const { firebase } = useContext(FirebaseContext);
//   const { user } = useContext(AuthContext);
  
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState(null);

//   const handelSubmit = () => {
//     if (!name || !category || !price || !image) {
//       alert('Please fill in all fields and upload an image!');
//       return;
//     }

//     // Upload image to Firebase Storage
//     firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
//       ref.getDownloadURL().then((url) => {
//         // Log the URL for verification
//         console.log(url);

//         // Now store the product details in Firestore
//         firebase.firestore().collection('products').add({
//           name,
//           category,
//           price,
//           imageUrl: url,
//           userId: user.uid,
//           createdAt: new Date()
//         }).then(() => {
//           alert("Product uploaded successfully!");
//           // Clear form after successful upload
//           setName('');
//           setCategory('');
//           setPrice('');
//           setImage(null);
//         }).catch((error) => {
//           console.error("Error adding document: ", error);
//           alert('Error uploading the product.');
//         });
//       }).catch((error) => {
//         console.error("Error getting download URL: ", error);
//         alert('Error uploading the image.');
//       });
//     }).catch((error) => {
//       console.error("Error uploading image: ", error);
//       alert('Error uploading the image.');
//     });
//   };

//   return (
//     <Fragment>
//       <Header />
//       <div className="centerDiv">
//         <label htmlFor="fname">Name</label>
//         <br />
//         <input
//           className="input"
//           type="text"
//           id="fname"
//           onChange={(e) => setName(e.target.value)}
//           name="Name"
//           value={name}
//         />
//         <br />
//         <label htmlFor="category">Category</label>
//         <br />
//         <input
//           className="input"
//           type="text"
//           id="category"
//           onChange={(e) => setCategory(e.target.value)}
//           name="Category"
//           value={category}
//         />
//         <br />
//         <label htmlFor="price">Price</label>
//         <br />
//         <input
//           className="input"
//           type="number"
//           id="price"
//           name="Price"
//           onChange={(e) => setPrice(e.target.value)}
//           value={price}
//         />
//         <br />
//         <br />
//         <img
//           alt="Posts"
//           width="200px"
//           height="200px"
//           src={image ? URL.createObjectURL(image) : ''}
//         />
//         <br />
//         <input
//           onChange={(e) => setImage(e.target.files[0])}
//           type="file"
//         />
//         <br />
//         <button onClick={handelSubmit} className="uploadBtn">Upload and Submit</button>
//       </div>
//     </Fragment>
//   );
// };

// export default Create;





import React, { Fragment, useContext, useState } from "react";
import Header from "../Header/Header";
import "./Create.css";
import { FirebaseContext, AuthContext } from "../../Store/Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {  
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history=useHistory()
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]); // Update state with the selected file
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      alert("Please fill out all fields and upload an image!");
      return;
    }

    // Upload the image to Firebase Storage
    firebase
      .storage()
      .ref(`/images/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log("Image URL:", url);

          // Store product data in Firestore
          firebase.firestore().collection("products").add({
            name,
            category,
            price,
            imageUrl: url,
            userId: user.uid,
            createdAt: new Date(),
          });
          history.push('/')
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Image upload failed. Please try again.");
      });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        {image && (
          <img
            alt="Preview"
            width="200px"
            height="200px"
            src={URL.createObjectURL(image)}
          />
        )}
        <br />
        <input type="file" onChange={handleImageChange} />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;



