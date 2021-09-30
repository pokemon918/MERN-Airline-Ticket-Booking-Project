import React from "react";

const About = (props) => {
  return (
    <div>
      <h1>ABOUT</h1>
      <h3>Name : {props.user.name}</h3>
      <h3>Email : {props.user.email}</h3>
    </div>
  );
};

export default About;
