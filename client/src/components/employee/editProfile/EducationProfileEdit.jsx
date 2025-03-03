/* eslint-disable react/prop-types */
import Modal from "react-modal";
import styles from "./EditProfile.module.css";
import { useState, useEffect } from "react";

export default function EducationProfileEdit({ isOpen, onClose, educationData, onSave }) {
    const [formData, setFormData] = useState({
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: ""
    });

    useEffect(() => {
        if (educationData && isOpen) {
            setFormData({
                degree: educationData.degree || "",
                institution: educationData.institution || "",
                startDate: educationData.startDate || "",
                endDate: educationData.endDate || "",
                isCurrent: educationData.isCurrent || false,
                description: educationData.description || ""
            });
        }
    }, [educationData, isOpen]);

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
            contentLabel="Edit Education"
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.header}>
                <h2>Edit Education</h2>
                <button className={styles.closeButton} onClick={onClose}>×</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="degree">Degree/Program *</label>
                    <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="institution">Institution *</label>
                    <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
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
                    <label htmlFor="isCurrent">I am currently studying here</label>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your course of study or achievements..."
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