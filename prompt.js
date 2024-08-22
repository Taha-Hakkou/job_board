//#!/usr/bin/node
// generates random job data
import dbClient from './utils/db';

const titles = ['Back-end Developer', 'Front-end Developer', 'Full Stack Developer', 'DevOps Engineer', 'Cyber Security Engineer', 'Data Scientist', 'AWS Practitioner']
const companies = ['sqli', 'sii', 'axeciel', 'atos', 'capgemini', 'oracle', 'canonical'];
const types = ['on-site', 'hybrid', 'remote'];
const experiences = ['internship', 'entry-level', 'associate', 'mid-senior', 'director', 'executive'];
const places = ['oujda', 'casablanca', 'rabat', 'agadir', 'tanger', 'fes', 'marrakech'];
const salaries = [7000, 7300, 7550, 7810, 8200, 9100, 10400];
const descriptions = ['Python', 'C#', 'Golang', 'Rust', 'Javascript', 'C', 'Java'];

function generateRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// const data = [];
const populate = async () => {
  for (let i = 0; i < 100; i++) {
    const job = {
      title: generateRandomElement(titles),
      company: generateRandomElement(companies),
      type: generateRandomElement(types),
      experience: generateRandomElement(experiences),
      place: generateRandomElement(places),
      salary: generateRandomElement(salaries),
      description: generateRandomElement(descriptions),
      applicants: [],
    };
    // console.log(await dbClient.isAlive());
    await dbClient.db.collection('jobs').insertOne(job);
    // data.push(item);
  }
}

populate();

// console.log(JSON.stringify(data));
