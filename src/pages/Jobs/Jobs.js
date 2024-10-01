import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/job/all-jobs`);
                setJobs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error.message);
                setError('Failed to fetch jobs. Please try again later.');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) return <div className="loading">Loading jobs...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="jobs-container">
            <h1>Available Jobs</h1>
            {jobs.length === 0 ? (
                <p>No jobs available at the moment.</p>
            ) : (
                <ul className="jobs-list">
                    {jobs.map((job) => (
                        <li key={job.jobId} className="job-item">
                            <h3 className="job-title">{job.title}</h3>
                            <p className="job-organization">{job.organization.organizationName}</p>
                            <p className="job-type">Type: {job.type}</p>
                            <p className="job-date">Start: {new Date(job.startDate).toLocaleDateString()}</p>
                            <p className="job-date">End: {new Date(job.endDate).toLocaleDateString()}</p>
                            <a 
                                href='https://careers.ibm.com/job/20962169/entry-level-software-developer-2025-remote/?codes=SN_LinkedIn&Codes=SN_LinkedIn'
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="apply-button"
                            >
                                Apply
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Jobs;