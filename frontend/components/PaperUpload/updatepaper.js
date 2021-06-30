import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default function updatepaper(){


  const [file,setFile] = useState(null);
 
  const [filename,setFilename] = useState('')
  const [id , setID] = useState('')
  const dropRef = useRef();


  
  const location = useLocation();
  const updateid = location.state.id;
  let uptitle=location.state.title;
  let updescription=location.state.description;
  const upfile_path=location.state.file_path;



  const [data, setData] = useState({
    title: uptitle,
    description: updescription
});


  function handleChange(event) {
    const { name, value } = event.target;
    setData(prevValue => {
        return {
            ...prevValue,
            [name]: value
        };
    });
}



  const onDrop = (files)=>{
    const[uploadedFile] = files;
    setFile(uploadedFile)
  }

  const updateBorder=(dragState)=>{
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  }


 function handleOnSubmit(e){

    alert('pp'+file);
        e.preventDefault();
        const access_token = localStorage.getItem('token')
        console.log(access_token)
         let config = {      
             headers: {
               'Authorization': 'Bearer ' + access_token
             }
         }
         axios.get('http://localhost:8070/user/post',config).then( ( response ) => {
             if(response.data.message){
                 alert(response.data.message)  
             }else{
                alert(response.data.user._id)

             }   
        
           })
           .catch()
 
      const formData = new FormData();
      formData.append('id',updateid);
      formData.append('file',file);
      formData.append('title',data.title);
      formData.append('description',data.description);

     
        axios.put("http://localhost:8070/updatepaper", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((response) => {
                alert(response.data);

            }).catch((error) => {
                
                alert(error);
        });
    }



    return (

      <div>

          <form onSubmit={handleOnSubmit} >

        
          <hr/>
          <label className="font-weight-bold">Enter Title</label>
          <div className="form-check "  >
              <input  type="text" name="title"   value= {data.title}
                     onChange={handleChange}/>
          </div>

          <label className="font-weight-bold">Enter Description</label>
          <div className="form-check "  >
              <input  type="text" name="description"   value= {data.description}
                      onChange={handleChange}/>
          </div>

          <div className="upload-section" style={{width:'800px' }}>
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}   style={{border :'1px solid #000' , height:'200px'}}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {upfile_path}
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


          <button type="submit" className="btn btn-danger" style={{marginLeft:'20px'}}>Upload</button>

          </form>


      </div>

    )

  
    


}