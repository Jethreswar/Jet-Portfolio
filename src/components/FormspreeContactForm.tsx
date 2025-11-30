import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const FormspreeContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [emailError, setEmailError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({...prev, [name]: ''}));
    }
  };
  
  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (formData.phone && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setEmailError(null);
    
    try {
      const response = await fetch('https://formspree.io/f/mbjnrpzo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          _subject: 'Portfolio Contact Form (Excel Format)',
          _format: 'xlsx',
        }),
      });
      
      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        console.error('Form submission failed:', errorData);
        setEmailError(`Failed to send message: ${errorData.error || 'Unknown error'}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setEmailError("Network error when sending email. Please try again later.");
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 md:p-8 shadow-lg border border-gray-700 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-300">Your message has been received. I'll get back to you soon!</p>
          <p className="text-gray-400 text-sm mt-2">
            (Check your inbox at jethreswarvarada@gmail.com for the Excel submission)
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          {emailError && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6 text-red-200">
              <p>{emailError}</p>
              <p className="mt-2 text-sm">
                You can also email me directly at{' '}
                <a 
                  href="mailto:jethreswarvarada@gmail.com" 
                  className="text-blue-400 hover:underline"
                >
                  jethreswarvarada@gmail.com
                </a>
              </p>
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  } text-white placeholder-gray-400`}
                  placeholder="Your name"
                />
              </div>
              {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  } text-white placeholder-gray-400`}
                  placeholder="your.email@example.com"
                />
              </div>
              {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 ${
                    formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                  } text-white placeholder-gray-400`}
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message *</label>
              <div className="relative">
                <span className="absolute top-3 left-3 text-gray-400">
                  <MessageSquare size={18} />
                </span>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  } text-white placeholder-gray-400`}
                  placeholder="Your message..."
                ></textarea>
              </div>
              {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
            </div>

            {/* Hidden fields for Formspree configuration */}
            <input type="hidden" name="_subject" value="Portfolio Contact Form (Excel Format)" />
            <input type="hidden" name="_format" value="xlsx" />
            <input type="hidden" name="_replyto" value={formData.email} />

            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Send className="mr-2" size={18} />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default FormspreeContactForm;
