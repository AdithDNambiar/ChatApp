function RoomConfirmModal({room,onCancel,onConnect}){

return(

<div style={{
position:"fixed",
top:"40%",
left:"40%",
background:"white",
padding:"20px"
}}>

<h3>Enter {room} ?</h3>

<button onClick={onCancel}>
Cancel
</button>

<button onClick={onConnect}>
Connect
</button>

</div>

);
}

export default RoomConfirmModal;