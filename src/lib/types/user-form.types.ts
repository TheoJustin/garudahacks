export interface UserForm {
  educationLevel: number;
  email: string;
  name: string;
  score: number;
  workExperience: boolean;
  workExperiences?: WorkExperience[];
  aptitudeTest: number;
}

export interface WorkExperience {
  field: string;
  year: string;
  latestPosition : string
}