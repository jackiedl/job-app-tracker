const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Second User',
    email: '2ndUser@nextmail.com',
    password: '123456',
  },
];

const applications = [
  {
    user_id: users[0].id, 
    company_name: 'Google',
    role: 'Software Engineer',
    status: 'Interview Scheduled',
    url: 'https://www.google.com/, https://www.google.com/about/careers/applications/',
    notes: 'I really hope I get this job',
    date: '2024-11-04',
  },
  {
    user_id: users[0].id, 
    company_name: 'Apple',
    role: 'Software Engineer',
    status: 'Applied',
    url: 'apple.com/about/careers/applications/',
    notes: 'I really hope I get this job',
    date: '2024-04-15',
  },
  {
    user_id: users[0].id, 
    company_name: 'McDonalds',
    role: 'Fry Cook',
    status: 'Rejected',
    url: 'mcdonald.com/about/careers/applications/',
    notes: 'I can\'t believe I didn\'t get the job',
    date: '2023-12-29',
  },
  {
    user_id: users[0].id, 
    company_name: 'Microsoft',
    role: 'Full-Stack Developer',
    status: 'Rejected',
    url: 'mcdonald.com/about/careers/applications/',
    notes: 'I can\'t believe I didn\'t get the job',
    date: '2023-12-29',
  },
  {
    user_id: users[0].id, 
    company_name: "Adobe",
    role: "UX Designer",
    status: "Applied",
    url: "https://adobe.wd5.myworkdayjobs.com/job1",
    notes: "Portfolio submitted",
    date: "2025-03-23"
  },
  {
    user_id: users[0].id, 
    company_name: "Intel",
    role: "Embedded Systems Engineer",
    status: "Interview Scheduled",
    url: "https://jobs.intel.com/job2",
    notes: "Technical interview next week",
    date: "2025-03-19"
  },
  {
    user_id: users[0].id, 
    company_name: "Uber",
    role: "Backend Engineer",
    status: "Offer Received",
    url: "https://www.uber.com/careers/job3",
    notes: "Offer negotiation in progress",
    date: "2025-03-14"
  },
  {
    user_id: users[0].id, 
    company_name: "LinkedIn",
    role: "Data Scientist",
    status: "Rejected",
    url: "https://careers.linkedin.com/job4",
    notes: "Passed first round but rejected in final",
    date: "2025-03-20"
  },
  {
    user_id: users[0].id, 
    company_name: "SpaceX",
    role: "Aerospace Engineer",
    status: "Applied",
    url: "https://www.spacex.com/careers/job5",
    notes: "Exciting opportunity!",
    date: "2025-03-25"
  },
  {
    user_id: users[0].id, 
    company_name: "Oracle",
    role: "Database Administrator",
    status: "Interview Scheduled",
    url: "https://www.oracle.com/careers/job6",
    notes: "Panel interview next Monday",
    date: "2025-03-16"
  },
  {
    user_id: users[0].id, 
    company_name: "Zoom",
    role: "Security Engineer",
    status: "Applied",
    url: "https://careers.zoom.us/job7",
    notes: "Looks like a great role",
    date: "2025-03-22"
  },
  {
    user_id: users[0].id, 
    company_name: "Nvidia",
    role: "AI Researcher",
    status: "Rejected",
    url: "https://www.nvidia.com/en-us/careers/job8",
    notes: "No response after interview",
    date: "2025-03-10"
  },
  {
    user_id: users[0].id, 
    company_name: "PayPal",
    role: "Finance Tech Analyst",
    status: "Applied",
    url: "https://www.paypal.com/us/webapps/mpp/jobs/job9",
    notes: "Waiting for recruiter reply",
    date: "2025-03-21"
  },
  {
    user_id: users[0].id, 
    company_name: "Epic Games",
    role: "Game Developer",
    status: "Offer Received",
    url: "https://www.epicgames.com/site/en-US/careers/job10",
    notes: "Offer matches expectations",
    date: "2025-03-18"
  },
  {
    user_id: users[1].id, 
    company_name: 'Apple',
    role: 'Software Engineer',
    status: 'Accepted',
    url: 'apple.com/about/careers/applications/',
    notes: 'I did it!!!',
    date: '2024-12-10',
  },
  {
    user_id: users[1].id, 
    company_name: 'Google',
    role: 'Software Engineer',
    status: 'Applied',
    url: 'https://careers.google.com/job1',
    notes: 'Excited about this role',
    date: '2025-03-20',
  },
  {
    user_id: users[1].id,
    company_name: "Amazon",
    role: "Backend Developer",
    status: "Interview Scheduled",
    url: "https://amazon.jobs/job2",
    notes: "Phone interview next week",
    date: "2025-03-18"
  },
  {
    user_id: users[1].id,
    company_name: "Microsoft",
    role: "Full-Stack Developer",
    status: "Rejected",
    url: "https://careers.microsoft.com/job3",
    notes: "Did not pass technical interview",
    date: "2025-03-15"
  },
  {
    user_id: users[1].id,
    company_name: "Apple",
    role: "iOS Developer",
    status: "Applied",
    url: "https://jobs.apple.com/job4",
    notes: "Waiting for response",
    date: "2025-03-22"
  },
  {
    user_id: users[1].id,
    company_name: "Meta",
    role: "Frontend Engineer",
    status: "Offer Received",
    url: "https://www.metacareers.com/job5",
    notes: "Considering the offer",
    date: "2025-03-10"
  },
  {
    user_id: users[1].id,
    company_name: "Netflix",
    role: "Data Engineer",
    status: "Applied",
    url: "https://jobs.netflix.com/job6",
    notes: "Interesting role with great culture",
    date: "2025-03-12"
  },
  {
    user_id: users[1].id,
    company_name: "Tesla",
    role: "Machine Learning Engineer",
    status: "Interview Scheduled",
    url: "https://www.tesla.com/careers/job7",
    notes: "Technical round coming up",
    date: "2025-03-17"
  },
  {
    user_id: users[1].id,
    company_name: "Airbnb",
    role: "DevOps Engineer",
    status: "Rejected",
    url: "https://careers.airbnb.com/job8",
    notes: "No response after interview",
    date: "2025-03-11"
  },
  {
    user_id: users[1].id,
    company_name: "Spotify",
    role: "Software Engineer",
    status: "Offer Received",
    url: "https://www.spotifyjobs.com/job9",
    notes: "Very tempting offer!",
    date: "2025-03-05"
  },
  {
    user_id: users[1].id,
    company_name: "Salesforce",
    role: "Cloud Engineer",
    status: "Applied",
    url: "https://careers.salesforce.com/job10",
    notes: "Waiting for HR response",
    date: "2025-03-21"
  }
];

export { users, applications };
