import { useRef, useEffect } from 'react';

type EmailData = {
  to: string;
  subject: string;
  body: string;
};

const useMailtoFallback = () => {
  const mailtoRef = useRef<HTMLAnchorElement | null>(null);
  
  useEffect(() => {
    // Create the mailto element once on component mount
    const mailtoElement = document.createElement('a');
    mailtoElement.style.display = 'none';
    document.body.appendChild(mailtoElement);
    
    mailtoRef.current = mailtoElement;
    
    // Cleanup on unmount
    return () => {
      document.body.removeChild(mailtoElement);
    };
  }, []);
  
  const sendMailtoEmail = ({ to, subject, body }: EmailData) => {
    if (!mailtoRef.current) return false;
    
    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    mailtoRef.current.href = mailtoUrl;
    mailtoRef.current.click();
    return true;
  };
  
  return { sendMailtoEmail };
};

export default useMailtoFallback;
