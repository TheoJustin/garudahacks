export interface UserForm {
  educationLevel: number;
  email: string;
  username: string;
  score: number;
  description: string;
  gender: 'Male' | 'Female';
  workExperience: boolean;
  workExperiences?: WorkExperience[];
  aptitudeTest: number;
}

export interface WorkExperience {
  field: string;
  year: number;
  latestPosition : string
}
