import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import challengeService from '../services/challengeService';

const ChallengeEdit = () => {
    const [challenge, setChallenge] = useState({
        title: '',
        description: '',
        goal: '',
        startDate: '',
        endDate: ''
    });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        loadChallenge();
    }, []);

    const loadChallenge = async () => {
        const res = await challengeService.getChallenge(id);
        setChallenge(res.data);
    };

    const onInputChange = e => {
        setChallenge({ ...challenge, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await challengeService.updateChallenge(id, challenge);
        history.push('/challenges');
    };

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit Challenge</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Challenge Title"
                            name="title"
                            value={challenge.title}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control form-control-lg"
                            placeholder="Enter Challenge Description"
                            name="description"
                            value={challenge.description}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Challenge Goal"
                            name="goal"
                            value={challenge.goal}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            name="startDate"
                            value={challenge.startDate}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            name="endDate"
                            value={challenge.endDate}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-warning btn-block">Update Challenge</button>
                </form>
            </div>
        </div>
    );
};

export default ChallengeEdit;