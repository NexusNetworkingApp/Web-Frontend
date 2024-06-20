import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import './JobPosting.css'; // Import the CSS file

const JobPosting = () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    const [jobData, setJobData] = useState({
        organization: account?.organization,
        title: '',
        description: '',
        type: 'FULL_TIME',
        startDate: '',
        endDate: '',
        postDuration: 30,
        postDate: Date.now(),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleJobPost = async () => {
        try {
            if (account?.organization) {
                setJobData((prevData) => ({
                    ...prevData,
                    organization: account.organization,
                }));

                await axios.post(`${API_URL}/account/organization/post-job`, jobData);
                console.log('Job posted successfully!');
            } else {
                console.error('Error posting job: Organization not available');
            }
        } catch (error) {
            console.error('Error posting job:', error.message);
        }
    };

    return (
        <div className="job-posting-container">
            <h1 className="job-posting-header">Job Posting</h1>
            {account && (
                <form className="job-form">
                    <label className="form-label">
                        Title:
                        <input type="text" name="title" value={jobData.title} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label className="form-label">
                        URL:
                        <textarea name="description" value={jobData.description} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label className="form-label">
                        Job Type:
                        <select name="type" value={jobData.type} onChange={handleInputChange}>
                            <option value="FULL_TIME">Full Time</option>
                            <option value="PART_TIME">Part Time</option>
                            <option value="INTERNSHIP">Internship</option>
                            <option value="TEMPORARY">Temporary</option>
                            <option value="SEASONAL">Seasonal</option>
                        </select>
                    </label>
                    <br />
                    <label className="form-label">
                        Start Date:
                        <input type="date" name="startDate" value={jobData.startDate} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label className="form-label">
                        End Date:
                        <input type="date" name="endDate" value={jobData.endDate} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label className="form-label">
                        Post Duration (in days):
                        <input
                            type="number"
                            name="postDuration"
                            value={jobData.postDuration}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="button" onClick={handleJobPost} className="post-button">
                        Post Job
                    </button>
                </form>
            )}
        </div>
    );
};

export default JobPosting;
