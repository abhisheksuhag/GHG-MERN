const mongoose = require('mongoose');
const Question = require('../models/Question');
const dbConnect = require('../config/dbConnect');

const addSampleQuestions = async () => {
  await dbConnect();

  const questions = [
    {
      text: 'What is your name?',
      type: 'basic',
      scope: 'scope1',
      fieldType: 'text',
    },
    {
      text: 'How old are you?',
      type: 'basic',
      scope: 'scope1',
      fieldType: 'number',
    },
    {
      text: 'What is the fuel consumption in liters?',
      type: 'detailed',
      scope: 'scope1',
      fieldType: 'number',
    },
    {
      text: 'Select your vehicle type',
      type: 'detailed',
      scope: 'scope1',
      fieldType: 'select',
      options: ['Car', 'Truck', 'Motorcycle'],
    },
  ];

  await Question.insertMany(questions);
  console.log('Sample questions added!');
  mongoose.connection.close();
};

addSampleQuestions();
