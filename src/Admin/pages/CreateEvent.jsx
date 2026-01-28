import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import '../styles/CreateEvent.css';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        organizer: '',
        registrationLimit: '',
        category: '',
        poster: null
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, poster: file }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Event title is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.registrationLimit) newErrors.registrationLimit = 'Registration limit is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert('Event Created Successfully! (Dummy Action)');
            console.log('Form Submitted', formData);
            // Reset form
            setFormData({
                title: '',
                description: '',
                date: '',
                time: '',
                venue: '',
                organizer: '',
                registrationLimit: '',
                category: '',
                poster: null
            });
        }
    };

    return (
        <div className="create-event-container">
            <h2 className="page-title">Create New Event</h2>

            <div className="form-card card">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>Event Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter event title"
                                className={errors.title ? 'error' : ''}
                            />
                            {errors.title && <span className="error-text">{errors.title}</span>}
                        </div>

                        <div className="form-group span-2">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter event description"
                                rows="3"
                            />
                        </div>

                        <div className="form-group">
                            <label>Date *</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={errors.date ? 'error' : ''}
                            />
                            {errors.date && <span className="error-text">{errors.date}</span>}
                        </div>

                        <div className="form-group">
                            <label>Time *</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className={errors.time ? 'error' : ''}
                            />
                            {errors.time && <span className="error-text">{errors.time}</span>}
                        </div>

                        <div className="form-group">
                            <label>Venue *</label>
                            <input
                                type="text"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                placeholder="Enter venue"
                                className={errors.venue ? 'error' : ''}
                            />
                            {errors.venue && <span className="error-text">{errors.venue}</span>}
                        </div>

                        <div className="form-group">
                            <label>Organizer Name</label>
                            <input
                                type="text"
                                name="organizer"
                                value={formData.organizer}
                                onChange={handleChange}
                                placeholder="Enter organizer/club name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={errors.category ? 'error' : ''}
                            >
                                <option value="">Select Category</option>
                                <option value="Technical">Technical</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Sports">Sports</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Seminar">Seminar</option>
                            </select>
                            {errors.category && <span className="error-text">{errors.category}</span>}
                        </div>

                        <div className="form-group">
                            <label>Registration Limit *</label>
                            <input
                                type="number"
                                name="registrationLimit"
                                value={formData.registrationLimit}
                                onChange={handleChange}
                                placeholder="Max participants"
                                min="1"
                                className={errors.registrationLimit ? 'error' : ''}
                            />
                            {errors.registrationLimit && <span className="error-text">{errors.registrationLimit}</span>}
                        </div>

                        <div className="form-group span-2">
                            <label>Event Poster</label>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="poster-upload"
                                    onChange={handleFileChange}
                                    hidden
                                />
                                <label htmlFor="poster-upload" className="file-upload-btn">
                                    <Upload size={20} />
                                    <span>{formData.poster ? formData.poster.name : 'Click to upload poster image'}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => setFormData({})}>
                            Reset
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
