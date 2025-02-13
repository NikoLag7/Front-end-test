import React from 'react'
import { useState,useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const EndpointApi = "https://jsonplaceholder.typicode.com/users";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function CallApi() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
      fetch(EndpointApi).then((response)=>{
        if(!response.ok){
            throw new Error("Error al obtener los datos");
            
      }
      return response.json();
    }).then((data) => {
        setData(data);
        setLoading(false);
    }).catch((error) => {
        setError(error.message);
        setLoading(false);
    });
    },[]);
    
    if (loading) return <p>Cargando datos ...</p>;
    if (error) return <p> Error : {error}</p>

    
  return (
    <div className='flex flex-col gap-6'><h1 className='text-7xl'>List Users</h1>
    <ul className='cursor-pointer ...'>
      {data.slice(0, 5).map((user) => (
        <li  onClick={() => setSelectedUser(user)}  key={user.id} className=" p-3  hover:bg-gray-200 hover:text-black rounded-lg">
          <strong className='cursor-pointer'>{user.name}</strong>
        </li>
      ))}
    </ul>
    <Modal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
            <h2 className="text-xl font-bold text-center mb-4">{selectedUser?.name} </h2>

            <div className="mb-4">
            <h3 className="font-semibold">📧 Contacto</h3>
            <p>Email: {selectedUser?.email}</p>
            <p>Teléfono: {selectedUser?.phone}</p>
            <p>Website: <a href={`https://${selectedUser?.website}`} className="text-blue-500 underline">{selectedUser?.website}</a></p>
            </div>

            <div className="mb-4">
            <h3 className="font-semibold">📍 Dirección</h3>
            <p>{selectedUser?.address.street}, {selectedUser?.address.suite}</p>
            <p>{selectedUser?.address.city}, {selectedUser?.address.zipcode}</p>
            <p>🌍 Lat: {selectedUser?.address.geo.lat}, Lng: {selectedUser?.address.geo.lng}</p>
            </div>

            <div>
            <h3 className="font-semibold">🏢 Empresa</h3>
            <p>Nombre: {selectedUser?.company.name}</p>
            <p>📢 {selectedUser?.company.catchPhrase}</p>
            <p>🛠️ {selectedUser?.company.bs}</p>
            </div>
        
        </Box>
    </Modal>

</div>
  )
}

export default CallApi