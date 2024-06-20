// Jobs.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../util/URL';
import './Jobs.css'; // Import the CSS file

const Jobs = () => {
    // State to store the fetched jobs
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Fetch all jobs from the server
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${API_URL}/account/all-jobs`);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error.message);
            }
        };

        // Call the fetchJobs function
        fetchJobs();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className="jobs-container">
            <h1>Jobs</h1>
            {/* Render the list of jobs with Apply button */}
            <ul className="jobs-list">
                {jobs.map((job) => (
                    <li key={job.jobId} className="job-item">
                        <h3 className="job-title">{job.title}</h3>
                        <p className="job-description">{job.description}</p>
                        <p className="job-type">Job Type: {job.type}</p>
                        <p className="job-date">Start Date: {job.startDate}</p>
                        <p className="job-date">End Date: {job.endDate}</p>
                        {/* Add other job details as needed */}
                        <button
                            className="apply-button"
                            onClick={() => {
                                // Replace 'https://example.com/apply-job' with the actual external URL
                                window.location.href = `${job.description}`;
                            }}
                        >
                            Apply
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Jobs;
