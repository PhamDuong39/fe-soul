<template>
    <div class="contact-container">
      <div class="contact-info">
        <div class="contact-method">
          <v-icon class="icon">mdi-phone</v-icon>
          <div class="details">
            <h3>Call To Us</h3>
            <div class="contact-text">
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +880611122222</p>
            </div>
          </div>
        </div>
        <hr class="divider" />
        <div class="contact-method">
          <v-icon class="icon">mdi-email</v-icon>
          <div class="details">
            <h3>Write To Us</h3>
            <div class="contact-text">
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-form">
        <input type="text" placeholder="Your Name *" />
        <input type="email" placeholder="Your Email *" />
        <input type="tel" placeholder="Your Phone *" />
        <textarea placeholder="Your Message"></textarea>
        <button @click="">Send Message</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .contact-container {
    display: flex;
    padding: 20px;
    margin: auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .contact-info {
    width: 30%;
    padding: 20px;
    border-right: 1px solid #ccc;
  }
  
  .contact-info hr.divider {
    border: none;
    border-top: 1px solid #ccc;
    margin: 20px 0;
  }
  
  .contact-method {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  
  .icon {
    font-size: 40px; /* Đổi kích thước icon */
    color: #fff; /* Màu của icon */
    background-color: #e74c3c; /* Màu nền của khung tròn */
    border-radius: 50%; /* Tạo khung tròn */
    padding: 10px; /* Tăng độ dày cho khung tròn */
  }
  
  .contact-method .details {
    flex-grow: 1;
  }
  
  .contact-method .details h3 {
    margin-top: 3px;
    margin-left: 15px;
    font-size: 23px;
    color: #e74c3c;
  }
  
  .contact-method .details .contact-text {
    margin-top: 8px;
    line-height: 2;
    margin-left: -34px;

  }
  
  .contact-method .details .contact-text p {
    margin: 0;
    padding: 0;
    text-align: left;
    color: rgb(29, 28, 28);
  }
  
  .contact-form {
    width: 70%;
    padding: 20px;
  }
  
  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .contact-form textarea {
    height: 150px;
  }
  
  .contact-form button {
    width: 150px;
    padding: 10px;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-end;
  }
  
  .contact-form button:hover {
    background-color: #c0392b;
  }
  </style>
  