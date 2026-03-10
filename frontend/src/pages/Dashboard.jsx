import {useEffect,useState} from "react";
import axios from "axios";

function Dashboard(){

const [data,setData]=useState({});
  const user = JSON.parse(localStorage.getItem("user"));


useEffect(()=>{

axios.get("http://localhost:5000/api/dashboard")
.then(res=>setData(res.data));

},[]);

return(

<div className="dash-head">

<h2>ChatApp</h2>

<p>Name: {user?.username}</p>
<p>Email: {user?.email}</p>


<ul>
{data.rooms?.map((r,i)=>(
<li key={i}>{r}</li>
))}
</ul>

</div>
);
}

export default Dashboard;