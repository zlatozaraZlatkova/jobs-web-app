/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "../../apiHooks/useForm";
import { useEditCompanyProfile, useFetchingInitialData } from "../../apiHooks/useEmployer";

export default function EditCompanyProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [displayError, setDisplayError] = useState(null);

    const { isSubmitting, editCompany, error } = useEditCompanyProfile();
    const { initialCompanyData } = useFetchingInitialData(id);

    const initialValues = {
        companyName: "",
        description: "",
        contactEmail: "",
        contactPhone: "",
    };

    useEffect(() => {
        if (error) {
          setDisplayError(error);
        }
      }, [error]);

    const handleFormSubmit = async (formData) => {
        try {
            console.log("Submitting edited data:", formData);
            const companyData = {
                companyName: formData.companyName,
                description: formData.description,
                contactEmail: formData.contactEmail,
                contactPhone: formData.contactPhone,
            };

            const updatedCompany = await editCompany(companyData, id);
            console.log("Response edited data:", updatedCompany);
            navigate("/company/profile");

        } catch (err) {
            console.log("Error message:", err.message);
            setDisplayError(err.message);
            resetForm();
        }
    };

    const { formValues, setFormValues, changeHandler, submitHandler, resetForm } =
        useForm(initialValues, handleFormSubmit);

    useEffect(() => {
        if (initialCompanyData) {
            setFormValues({
                companyName: initialCompanyData.companyId.companyName || "",
                description: initialCompanyData.companyId.description || "",
                contactEmail: initialCompanyData.companyId.contactEmail || "",
                contactPhone: initialCompanyData.companyId.contactPhone || "",
            });
        }
    }, [initialCompanyData, setFormValues]);

    const clickCancelHandle = () => {
        navigate("/company/profile");
    };

    return (
        <>
            <section className="formSection">
                <div className="container-formSection">
                    <div className="formCard">
                        {displayError && <div className="error-message">{displayError}</div>}

                        <form onSubmit={submitHandler}>
                            {/* Company Information */}
                            {displayError && (
                                <div className="error-message">{displayError}</div>
                            )}
                            <div className="form-section">
                                <h2 className="section-title">Company Information</h2>
                                <div className="form-group">
                                    <label className="required">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formValues.companyName}
                                        onChange={changeHandler}
                                        placeholder="e.g. Dolor Cloud"
                                        required
                                    />
                                    <p className="input-hint">
                                        This name will be displayed publicly
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label className="required">Description</label>
                                    <textarea
                                        name="description"
                                        value={formValues.description}
                                        onChange={changeHandler}
                                        placeholder="Describe your company, its mission, and key offerings..."
                                        required
                                    />
                                    <p className="input-hint">
                                        A clear description helps potential clients understand your
                                        business
                                    </p>
                                </div>
                            </div>
                            {/* Contact Information */}
                            <div className="form-section">
                                <h2 className="section-title">Contact Information</h2>
                                <div className="contact-grid">
                                    <div className="form-group">
                                        <label className="required">Contact Email</label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formValues.contactEmail}
                                            onChange={changeHandler}
                                            placeholder="e.g. contact@company.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="required">Contact Phone</label>
                                        <input
                                            type="tel"
                                            name="contactPhone"
                                            value={formValues.contactPhone}
                                            onChange={changeHandler}
                                            placeholder="e.g. 555-555-5555"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Button Group */}
                            <div className="button-group">
                                <button
                                    type="button"
                                    className="button-secondary"
                                    onClick={clickCancelHandle}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="button button-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Update..." : "Edit Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
