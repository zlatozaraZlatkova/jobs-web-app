/* eslint-disable react/prop-types */
import Modal from "react-modal";
import styles from "./EditProfile.module.css";
import { useState, useEffect } from "react";


export default function ExperienceProfileEdit({ isOpen, onClose, experienceData, onSave }) {

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: ""
    });

    useEffect(() => {
        if (experienceData && isOpen) {
            setFormData({
                title: experienceData.title || "",
                company: experienceData.company || "",
                startDate: experienceData.startDate || "",
                endDate: experienceData.endDate || "",
                isCurrent: experienceData.isCurrent || false,
                description: experienceData.description || ""
            });
        }
    }, [experienceData, isOpen]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
       onSave(formData);
       onClose();
      
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit Experience"
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.header}>
                <h2>Edit Experience</h2>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Job Title *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="company">Company *</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="startDate">Start Date *</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            disabled={formData.isCurrent}
                        />
                    </div>
                </div>

                <div className={styles.checkboxGroup}>
                    <input
                        type="checkbox"
                        id="isCurrent"
                        name="isCurrent"
                        checked={formData.isCurrent}
                        onChange={handleChange}
                    />
                    <label htmlFor="isCurrent">I currently work here</label>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your responsibilities and achievements..."
                    />
                </div>

                <div className={styles.formActions}>
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