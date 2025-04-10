// This file contains type definitions for data
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Application = {
  id: string;
  user_id: string;
  company_name: string;
  role: string;
  status: 'Applied' | 'Rejected' | 'Interview Scheduled' | 'Offer Received';
  url: string;
  notes: string;
  date: string;
};
