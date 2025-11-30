# Portfolio Website with Email Contact Form

This portfolio website includes a contact form that sends emails directly to your inbox using EmailJS.

## EmailJS Setup Instructions

To make the contact form work correctly and receive emails at `jethreswarvarada@gmail.com`, follow these steps:

1. **Create an EmailJS Account**:

   - Sign up at [EmailJS](https://www.emailjs.com/) (they have a free tier)
   - Log in to your account

2. **Create an Email Service**:

   - Go to "Email Services" tab
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps

3. **Create an Email Template**:

   - Go to "Email Templates" tab
   - Click "Create New Template"
   - Design your email template with the following variables:
     - `{{user_name}}` - Sender's name
     - `{{user_email}}` - Sender's email
     - `{{user_phone}}` - Sender's phone
     - `{{message}}` - Message content
     - Set the "To Email" to: `{{to_email}}` (This will use the hidden field value)

4. **Update Your Code**:

   - Open `src/App.tsx`
   - Find the `handleSubmit` function in the `ContactForm` component
   - Replace the placeholder values:
     ```javascript
     emailjs.sendForm(
       "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
       "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
       e.currentTarget, // The form element
       "YOUR_PUBLIC_KEY" // Replace with your EmailJS Public Key
     );
     ```
   - Also replace `'YOUR_PUBLIC_KEY'` in the `App` component's `useEffect` where EmailJS is initialized

5. **Test the Form**:
   - Fill out all fields in the contact form
   - Submit the form
   - Check your inbox at `jethreswarvarada@gmail.com` for the email

## Template Structure

Make sure your EmailJS template uses these variables:

- `{{user_name}}` - From the name field
- `{{user_email}}` - From the email field
- `{{user_phone}}` - From the phone field
- `{{message}}` - From the message field
- `{{to_email}}` - Will always be "jethreswarvarada@gmail.com"

## Troubleshooting

If you're not receiving emails:

1. Check your spam/junk folder
2. Verify your EmailJS credentials are correct
3. Ensure your email service is properly connected
4. Check the browser console for any errors during form submission
