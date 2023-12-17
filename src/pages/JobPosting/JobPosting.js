// JobPosting.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';

const JobPosting = () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        // Retrieve account information from local storage
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, []);

    // State to manage form input
    const [jobData, setJobData] = useState({
        organization: account?.organization, // Use optional chaining to avoid errors
        title: '',
        description: '',
        type: 'FULL_TIME',
        startDate: '',
        endDate: '',
        postDuration: 30,
        postDate: Date.now(),
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle job posting
    const handleJobPost = async () => {
        try {
            // Check if the organization is available
            if (account?.organization) {
                // Update the organization field in the jobData
                setJobData((prevData) => ({
                    ...prevData,
                    organization: account.organization,
                }));

                // Send job data to the server for posting
                await axios.post(`${API_URL}/account/organization/post-job`, jobData);

                // Handle success (e.g., show a success message, redirect, etc.)
                console.log('Job posted successfully!');
            } else {
                console.error('Error posting job: Organization not available');
            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error posting job:', error.message);
        }
    };

    // Render the form content only when the account object is not null
    return (
        <div>
            <h1>Job Posting</h1>
            {account && (
                <form>
                    <label>
                        Title:
                        <input type="text" name="title" value={jobData.title} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        URL:
                        <textarea name="description" value={jobData.description} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Job Type:
                        <select name="type" value={jobData.type} onChange={handleInputChange}>
                            {/* Options for different job types */}
                            <option value="FULL_TIME">Full Time</option>
                            <option value="PART_TIME">Part Time</option>
                            <option value="INTERNSHIP">Internship</option>
                            <option value="TEMPORARY">Temporary</option>
                            <option value="SEASONAL">Seasonal</option>
                            {/* Add other job types as needed */}
                        </select>
                    </label>
                    <br />
                    <label>
                        Start Date:
                        <input type="date" name="startDate" value={jobData.startDate} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        End Date:
                        <input type="date" name="endDate" value={jobData.endDate} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Post Duration (in days):
                        <input
                            type="number"
                            name="postDuration"
                            value={jobData.postDuration}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="button" onClick={handleJobPost}>
                        Post Job
                    </button>
                </form>
            )}
        </div>
    );
};

export default JobPosting;








