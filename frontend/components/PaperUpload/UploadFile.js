import React, { useState, useRef , useEffect  } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import {useHistory} from "react-router-dom"

export default function UploadFile() {


  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('')
  const [id, setID] = useState('')
  const dropRef = useRef();
  const [userType, seTuserType] = useState('')
  const history = useHistory()

  let uid = '';

  useEffect(() => {
    const getusertype = async () => {
        const access_token = localStorage.getItem('token')
        console.log(access_token)
        let config = {
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        }
        axios.get('http://localhost:8070/user/post',config).then((response) => {
            if (response.data.message) {
              alert(response.data.message)
            } else {
                seTuserType(response.data.user.usertype)
            }
          })
          .catch()
    };
    getusertype();
  }, []);


  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile)
  }

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  }


  function handleOnSubmit(e) {
    e.preventDefault();
    const access_token = localStorage.getItem('token')
    let config = {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    }
    axios.get('http://localhost:8070/user/post', config).then((response) => {
      if (response.data.message) {
        alert(response.data.message)
      } else {
        //alert(uid)
        uid = response.data.user._id
        
        const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('userId', uid);
    formData.append('state', "pending");
    formData.append('paid', "no");
    formData.append('originalName', filename);

    axios.post("http://localhost:8070/upload", formData, {headers: {
        'content-type': 'multipart/form-data'}
    }).then((response) => {
      history.push("/file-list")
    }).catch((error) => {

      alert(error);
    });


      }

    })
      .catch()

    
  }


  return (

    <div>

      <AppBarComponent getUserType={userType} />
      
      <form onSubmit={handleOnSubmit} >


        <hr />
        <label className="font-weight-bold">Enter Title</label>
        <div className="form-check "  >
          <input type="text" name="type"
            onChange={(event) => {
              setTitle(event.target.value)
            }} />
        </div>

        <label className="font-weight-bold">Enter Description</label>
        <div className="form-check "  >
          <input type="text" name="type"
            onChange={(event) => {
              setDescription(event.target.value)
            }} />
        </div>

        <div className="upload-section" style={{ width: '800px' }}>
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef} style={{ border: '1px solid #000', height: '200px' }}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {'file.name'}
                {file && (
                  <div>
                    <strong>Selected file: </strong> {file.name}
                    {setFilename(file.name)}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>


        <button type="submit" className="btn btn-danger" style={{ marginLeft: '20px' }}>Upload</button>

      </form>


    </div>

  )





}