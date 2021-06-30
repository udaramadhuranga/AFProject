import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { useHistory } from "react-router";




const FilesList= ()=> {

  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  useEffect(() => {


        const access_token = localStorage.getItem('token')
        console.log(access_token)
        let config = {
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        }
        axios.get('http://localhost:8070/user/post',
          config)
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message)
            } else {

              getFilesList(response.data.user._id)
              
            }
      
          })
          .catch()

    const getFilesList = async (userid) => {
      try {
        const { data } = await axios.get("http://localhost:8070/getAllFiles/",{params:{ID:userid}});
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };




    
  }, []);




  const DeleteFile = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8070/delete/${id}`, {
        responseType: 'blob'
      });

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };


  

  const navigatePayment=(id)=>{
    history.push('/payment',{
      id:id,
      type:'paper'
    })
  }
  

  const navigateUpdatepage=(id,title,description,file_path,file_mimetype)=>{
    history.push('/paper-update',{
      id:id,
      title:title,
      description:description,
      file_path:file_path,
      file_mimetype:file_mimetype,
     
    })
  }

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
            <th>state</th>
            
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, userId,state,paid, title, description, file_path, file_mimetype ,originalName}) => (
                <tr key={_id}>
                  <td >{title}</td>
                  <td >{description}</td>
                  <td>
                    <a
                      href={file_path}
                      
                    >
                      Download
                    </a>
                  </td>
                  <td>{state}</td>    
                  <td>
                    <button onClick={() => DeleteFile(_id)}>Delete</button>

                  </td>
                  <td>  <button type="button" disabled={state=='Accepted'} onClick={()=>navigateUpdatepage(_id,title,description,file_path,file_mimetype)}>Update</button></td>
                  <td><button type="button" disabled={state!='Accepted' || paid=='yes'  } onClick={()=>navigatePayment(_id)}>Pay</button></td>
                  
                  <td><h5 hidden={paid=='no' }>Paid</h5></td> 
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>

   
    </div>
  );
};

export default FilesList;