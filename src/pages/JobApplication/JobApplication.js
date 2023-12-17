// JobApplicationPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import { useParams } from 'react-router-dom';

const JobApplication = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/job-apply/${jobId}`);
                setJob(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error.message);
            }
        };

        // Fetch job details when the component mounts
        fetchJobDetails();
    }, [jobId]);

    const handleApplyJob = async () => {
        try {
            // Send job application data to the server
            await axios.post(`${API_URL}/job-applications/apply`, { jobId });

            // Handle success (e.g., show a success message, redirect, etc.)
            console.log('Job application submitted successfully!');
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error applying for the job:', error.message);
        }
    };

    if (!job) {
        // You can render a loading spinner or message while job details are being fetched
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{job.title}</h1>
            <p>Description: {job.description}</p>
            {/* Display other job details as needed */}

            <button onClick={handleApplyJob}>Apply for this Job</button>
        </div>
    );
};

export default JobApplication;
