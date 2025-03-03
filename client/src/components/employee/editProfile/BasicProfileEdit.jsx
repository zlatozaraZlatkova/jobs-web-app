/* eslint-disable react/prop-types */
import styles from "./EditProfile.module.css";
import Modal from "react-modal";
import {useState, useEffect} from "react";

export default function BasicProfileEdit({ isOpen, onClose, userData, onSave }){
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    location: '',
    bio: '',
    skillsString: '',
    github: '',
    linkedin: '',
    email: ''
  });

    useEffect(() => {
      if (userData) {
        const skillsString = userData.skills ? userData.skills.join(', ') : '';
        
        setFormData({
          name: userData.name || '',
          title: userData.title || '',
          location: userData.location || '',
          bio: userData.bio || '',
          skillsString: skillsString,
          github: userData.github || '',
          linkedin: userData.linkedin || '',
          email: userData.email || ''
        });
      }
    }, [userData, isOpen]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  

    const handleSubmit = (e) => {
      e.preventDefault();

      const skills = formData.skillsString
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== '');
 
      const updatedData = {
        ...formData,
        skills: skills
      };
      
     
      onSave(updatedData);
      
      onClose();
    };


      return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Edit Profile"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <div className={styles.header}>
            <h2>Edit Profile</h2>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="skillsString">Skills (comma separated)</label>
              <input
                type="text"
                id="skillsString"
                name="skillsString"
                value={formData.skillsString}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js, etc."
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="github">GitHub URL</label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="linkedin">LinkedIn URL</label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.actions}>
              <button 
                type="button" 
                className={styles.cancelButton} 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.saveButton}
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      );
    
}