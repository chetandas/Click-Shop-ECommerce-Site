import React from "react";
import styled from "styled-components";
export default function Contact() {
  const Wrapper = styled.section`
    padding:5rem 0 5rem 0;
    .container{
      margin-top:4rem;
      padding-left:20rem;
      text-align:center;
    }
    .contact-form{
      max-width:50rem;
      marign-left:20%;
    }
    .contact-inputs{
      display:flex;
      flex-direction:column;
      gap:1.5rem;

      input[type="submit"]
      {
        width:20rem;
        margin-left:30%;
        cursor:pointer;
        transition:all 0.2s;

      &:hover{
        background-colour:${({theme})=> theme.colors.white};
        border:1px solid ${({theme})=> theme.colors.btn};
        color:${({theme})=> theme.colors.black};
        transform:scale(0.9);
      }
    }
  `;
  return (
    <Wrapper>
      <h2 className="common-heading">Feel Free to Contact Us</h2>

      {/*this is embedded map location of gvk mall added just for the look ntng else*/}
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.855513138528!2d78.44641565038914!3d17.418720288001186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9736975c54b9%3A0xb24847634360df71!2sGVK%20One%20Mall!5e0!3m2!1sen!2sin!4v1673703376775!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/mpzewzdg"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              name="username"
              placeholder="username"
              autoComplete="off"
              required
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="message"
              cols="30"
              rows="6"
              placeholder="Enter Your Message Here"
              autoComplete="off"
              required
            ></textarea>

            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
}
