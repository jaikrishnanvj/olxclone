import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../Store/Context';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handelSubmit = () => {
    if (!name || !category || !price || !image) {
      alert('Please fill in all fields and upload an image!');
      return;
    }

    // Upload image to Firebase Storage
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        // Log the URL for verification
        console.log(url);

        // Now store the product details in Firestore
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          imageUrl: url,
          userId: user.uid,
          createdAt: new Date()
        }).then(() => {
          alert("Product uploaded successfully!");
          // Clear form after successful upload
          setName('');
          setCategory('');
          setPrice('');
          setImage(null);
        }).catch((error) => {
          console.error("Error adding document: ", error);
          alert('Error uploading the product.');
        });
      }).catch((error) => {
        console.error("Error getting download URL: ", error);
        alert('Error uploading the image.');
      });
    }).catch((error) => {
      console.error("Error uploading image: ", error);
      alert('Error uploading the image.');
    });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          onChange={(e) => setName(e.target.value)}
          name="Name"
          value={name}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          name="Category"
          value={category}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          name="Price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <br />
        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ''}
        />
        <br />
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
        />
        <br />
        <button onClick={handelSubmit} className="uploadBtn">Upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;









// import React, { Fragment, useContext, useState } from 'react';
// import './Create.css';
// import Header from '../Header/Header';
// import { FirebaseContext,AuthContext} from '../../Store/Context';

// const Create = () => {
//   const {firebase}=useContext(FirebaseContext)
//   const {user}=useContext(AuthContext)
//   const [name,setName]=useState('')
//   const [category,setCategory]=useState('')
//   const [price,setPrice]=useState('')

//   const [image,setImage]=useState(null)

//   const handelSubmit=()=>{
//      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
//       ref.getDownloadURL().then((url)=>{
//         console.log(url);
        
//       })
//      })
//   }
//   return (
//     <Fragment>
//       <Header />
//       <card>
//         <div className="centerDiv">
          
//             <label htmlFor="fname">Name</label>
//             <br />
//             <input
//               className="input"
//               type="text"
//               id="fname"
//               onChange={(e)=> setName(e.target.value)}
//               name="Name"
//               defaultValue="John"
//             />
//             <br />
//             <label htmlFor="fname">Category</label>
//             <br />
//             <input
//               className="input"
//               type="text"
//               id="fname"
//               onChange={(e)=> setCategory(e.target.value)}
//               name="category"
//               defaultValue="John"
//             />
//             <br />
//             <label htmlFor="fname">Price</label>
//             <br />
//             <input className="input" type="number" id="fname" name="Price" />
//             <br />
          
//           <br />
//           <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image):''}></img>
          
//             <br />
//             <input onChange={(e)=>{
//                 setImage(e.target.files[0])
//             }} type="file" />
//             <br />
//             <button onClick={handelSubmit} className="uploadBtn">upload and Submit</button>
          
//         </div>
//       </card>
//     </Fragment>
//   );
// };

// export default Create;






