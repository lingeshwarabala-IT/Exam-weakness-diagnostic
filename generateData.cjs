const fs = require('fs');
const path = require('path');

const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharv", "Ananya", "Diya", "Aditi", "Isha", "Kavya", "Neha", "Priya", "Riya", "Sneha", "Tara", "Rohan", "Siddharth", "Rahul", "Vikram", "Pooja", "Meera", "Shruti", "Karan"];
const lastNames = ["Sharma", "Patel", "Singh", "Kumar", "Rao", "Das", "Reddy", "Gupta", "Desai", "Joshi", "Verma", "Chauhan", "Bose", "Nair", "Iyer", "Menon"];

const subjects = {
  "Programming in C": ["Variables & Data Types", "Conditional Statements", "Loops", "Arrays", "Functions", "Pointers", "Structures"],
  "Mathematics": ["Calculus", "Linear Algebra", "Discrete Math", "Probability & Statistics"],
  "Data Structures": ["Linked Lists", "Trees", "Graphs", "Sorting Algorithms", "Hash Tables"],
  "Database Management Systems": ["ER Models", "Relational Algebra", "SQL Queries", "Normalization", "Transactions"],
  "Computer Networks": ["OSI Model", "TCP/IP", "Routing Protocols", "Network Security"]
};

// Target averages to create realistic weak/strong topics
const topicTargetAverages = {
  // C Programming
  "Variables & Data Types": 86,
  "Conditional Statements": 82,
  "Loops": 79,
  "Arrays": 65,
  "Functions": 68,
  "Pointers": 48, // Designed to be a weak topic
  "Structures": 56,

  // Mathematics
  "Calculus": 62,
  "Linear Algebra": 75,
  "Discrete Math": 72,
  "Probability & Statistics": 65,

  // Data Structures
  "Linked Lists": 70,
  "Trees": 60,
  "Graphs": 52, // Weak topic
  "Sorting Algorithms": 78,
  "Hash Tables": 80,

  // DBMS
  "ER Models": 85,
  "Relational Algebra": 65,
  "SQL Queries": 72,
  "Normalization": 58,
  "Transactions": 64,

  // Networks
  "OSI Model": 75,
  "TCP/IP": 70,
  "Routing Protocols": 55, // Weak topic
  "Network Security": 68
};

const getPerformanceStatus = (percentage) => {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 75) return "Good";
  if (percentage >= 50) return "Average";
  return "Needs Improvement";
};

let profiles = [];
for (let i = 0; i < 8; i++) profiles.push('high');
for (let i = 0; i < 20; i++) profiles.push('average');
for (let i = 0; i < 10; i++) profiles.push('weak');
for (let i = 0; i < 10; i++) profiles.push('mixed');
profiles.sort(() => Math.random() - 0.5);

const data = [];
const departments = ["B.Tech Computer Science", "B.Tech Information Technology", "B.Tech AI & Data Science"];
const sections = ["A", "B", "C"];
const exams = ["Internal Assessment 1", "Internal Assessment 2", "Model Examination", "Semester Examination"];
const currentYear = "2025-2026";
const numStudents = 48; // To match prompt example

for (let i = 0; i < numStudents; i++) {
  const studentId = `ST${1000 + i + 1}`;
  const studentName = `${firstNames[i % firstNames.length]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const department = departments[Math.floor(Math.random() * departments.length)];
  const year = "Year 2"; // Assume 2nd year subjects
  const section = sections[Math.floor(Math.random() * sections.length)];
  const profile = profiles[i];

  // Each student takes multiple exams
  exams.forEach((exam, examIdx) => {
    // Slight improvement over exams
    const examBoost = examIdx * 2;

    Object.keys(subjects).forEach(subject => {
      const topics = subjects[subject];
      let weakTopicIndex = -1;
      if (profile === 'mixed') {
          weakTopicIndex = Math.floor(Math.random() * topics.length);
      }

      topics.forEach((topic, j) => {
        const targetAvg = topicTargetAverages[topic];
        let baseScore = targetAvg;
        
        if (profile === 'high') {
          baseScore = Math.min(100, targetAvg + 15 + Math.random() * 10);
        } else if (profile === 'weak') {
          baseScore = Math.max(0, targetAvg - 20 - Math.random() * 15);
        } else if (profile === 'average') {
          baseScore = targetAvg + (Math.random() * 20 - 10);
        } else if (profile === 'mixed') {
          if (j === weakTopicIndex) {
              baseScore = Math.max(0, targetAvg - 25);
          } else {
              baseScore = Math.min(100, targetAvg + 10 + Math.random() * 10);
          }
        }

        let percentage = Math.round(baseScore + examBoost + (Math.random() * 10 - 5));
        percentage = Math.max(0, Math.min(100, percentage));
        
        data.push({
          academicYear: currentYear,
          studentId,
          studentName,
          department,
          year,
          section,
          exam,
          subject,
          topic,
          marks: percentage,
          maxMarks: 100,
          percentage: percentage,
          performanceStatus: getPerformanceStatus(percentage)
        });
      });
    });
  });
}

const dir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'mockData.js'), `export const mockData = ${JSON.stringify(data, null, 2)};\n`);
console.log('Premium Hackathon Mock data generated successfully!');
