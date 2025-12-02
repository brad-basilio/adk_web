import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import AppRequestsRest from '../../js/actions/AppRequestsRest';
import './AppRequestModal.css';

const AppRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    building_name: '',
    unit_number: '',
    number_of_residents: '',
    service_interest: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const appRequestsRest = new AppRequestsRest();

  const serviceOptions = [
    { value: 'Individual Plan', label: 'Individual Plan' },
    { value: 'Building/Property Plan', label: 'Building/Property Plan' },
    { value: 'Cybersecurity Add-Ons', label: 'Cybersecurity Add-Ons' },
    { value: 'Onsite Support Options', label: 'Onsite Support Options' },
    { value: 'Other', label: 'Other' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceSelect = (value) => {
    setFormData({
      ...formData,
      service_interest: value
    });
    setDropdownOpen(false);
  };

  const handleSubmit = async () => {
    setSending(true);

    try {
      const result = await appRequestsRest.save(formData);

      if (result) {
        // Redirect to thank you page
        window.location.href = "/thanks";
      }
    } catch (error) {
      console.error("Error sending request:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.',
        confirmButtonColor: '#0066ff',
      });
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="app-request-modal-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
          >
            <button className="modal-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="modal-header">
             
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Request Information About ADK Assist
              </motion.h2>
              <p>Get detailed information about our 24/7 tech support service, pricing, building plans, and how ADK Assist can support your property or residents.</p>
            </div>

            <div className="modal-scrollable">
              <div className="modal-info-section">
                <form className="app-request-form-new">
                  <motion.div
                    className="form-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3>Personal Information</h3>
                    <div className="form-row">
                      <div className="form-group-new">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
   <div className="form-group-new">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    
                    </div>

                   <div className="form-group-new">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                  </motion.div>

                  <motion.div
                    className="form-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3>Building / Unit Information</h3>
                    <div className="form-row">
                      <div className="form-group-new">
                        <label htmlFor="building_name">Building Name *</label>
                        <input
                          type="text"
                          id="building_name"
                          name="building_name"
                          value={formData.building_name}
                          onChange={handleChange}
                          required
                          placeholder="Building name"
                        />
                      </div>

                      <div className="form-group-new">
                        <label htmlFor="unit_number">Unit Number</label>
                        <input
                          type="text"
                          id="unit_number"
                          name="unit_number"
                          value={formData.unit_number}
                          onChange={handleChange}
                          placeholder="Unit #"
                        />
                      </div>
                    </div>

                    <div className="form-group-new">
                      <label htmlFor="number_of_residents">Number of Residents</label>
                      <input
                        type="number"
                        id="number_of_residents"
                        name="number_of_residents"
                        value={formData.number_of_residents}
                        onChange={handleChange}
                        placeholder="e.g., 50"
                        min="1"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="form-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3>Service Interest</h3>
                    <div className="form-group-new">
                      <label htmlFor="service_interest">What are you interested in? *</label>
                      <div className="custom-dropdown">
                        <button
                          type="button"
                          className="dropdown-toggle"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          <span className={formData.service_interest ? '' : 'placeholder'}>
                            {formData.service_interest || 'Select a service'}
                          </span>
                          <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            className={dropdownOpen ? 'rotate' : ''}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              className="dropdown-menu"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {serviceOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  className={`dropdown-item ${formData.service_interest === option.value ? 'selected' : ''}`}
                                  onClick={() => handleServiceSelect(option.value)}
                                >
                                  {option.label}
                                  {formData.service_interest === option.value && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  )}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="form-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3>Additional Details</h3>
                    <div className="form-group-new">
                      <label htmlFor="message">Describe your needs or questions</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Let us know what features you're most interested in or any questions you have..."
                      ></textarea>
                    </div>
                  </motion.div>
                </form>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="modal-cta-button"
                    disabled={sending}
                    onClick={handleSubmit}
                  >
                    {sending ? (
                      <>
                        <div className="spinner-new"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Request</span>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppRequestModal;
