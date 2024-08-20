// Jobs Controller
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

const JobsController = class {
  static async postJob(req, res) {
    const {title, company, type, place, experience, salary, description} = req.body;
    const validTypes = ['on-site', 'hybrid', 'remote'];
    const validExperiences = ['internship', 'entry-level', 'associate', 'mid-senior', 'director', 'executive'];
    if (!title) return res.status(400).json({ error: 'Missing title' });
    if (!company) return res.status(400).json({ error: 'Missing company' });
    if (!type || !validTypes.includes(type)) {
      return res.status(400).json({ error: 'Missing or Invalid type' });
    }
    if (type !== 'remote' && !place) return res.status(400).json({ error: 'Missing location' });
    if (!experience || !validExperiences.includes(experience)) {
      return res.status(400).json({ error: 'Missing or Invalid experience' });
    }
    const job = {
      title,
      company,
      type,
      place: place ? place : 'No location',
      experience,
      salary: salary ? Number(salary) : 'negotiable',
      description: description ? description : 'No description',
      applicants: [],
    };
    await dbClient.db.collection('jobs').insertOne(job);
    return res.status(400).json(job);
  }

  static async getJobs(req, res) {
    const { user } = req;
    const jobs = await dbClient.db.collection('jobs').find().toArray(); // filters + pagination
    return res.json(jobs);
  }

  static async getJob(req, res) {
    const job = await dbClient.db.collection('jobs').findOne({
      _id: ObjectId(req.params.id),
    });
    if (job === null) return res.status(404).json({ error: 'Not found' });
    // numberOfApplicants
    return res.status(200).json(job);
  }

  static async applyJob(req, res) {
    const job = await dbClient.db.collection('jobs').findOne({
      _id: ObjectId(req.params.id),
    });
    if (job === null) return res.status(404).json({ error: 'Not found' });
    if (job.applicants.map(obj => obj.toString()).includes(req.user._id)) {
      // doesn't work without map
      return res.status(400).json({ error: 'Already applied' });
    }
    await dbClient.db.collection('jobs').findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $push: { applicants: ObjectId(req.user._id) } },
    );
    return res.json({ message: 'Successfully applied' });
  }
};

export default JobsController;
