export interface UserForm {
  educationLevel: number; // 1 middle, 2 high, 3 >= undergrad
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
