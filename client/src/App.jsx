import { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    date: ""
    
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character and Numbers!",
      label: "Name",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "number",
      placeholder: "Mobile Number",
      errorMessage:
        "Mobile No. should be 10 digit ",
      label: "Mobile Number",
      pattern: `^[0-9]{10-10}$`,
      required: true,
    },
    {
      id: 4,
      name: "date",
      type: "date",
      placeholder: "Select Date",
      label: "Date",
    },
    
  ];

  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

const PostData=async(e)=>{
  e.preventDefault();

  const { name, email, phone, date }=values;
  const res =await fetch("/appoint",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name, email, phone, date
    })
  });
  const data= await res.json();

  if(res.status===422||!data){
    window.alert("invalid")
  }else{
    window.alert("Appointment booked Successfully")
  }
}



  return (
    <div className="app">
      <form method="POST">
        <h1>Appointment</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button onClick={PostData}>Submit</button>
      </form>
    </div>
  );
};

export default App;
