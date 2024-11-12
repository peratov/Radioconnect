export interface Station {
  id: string;
  name: string;
  genre: string;
  location: string;
  description: string;
  logo: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  whatsappNumber: string;
  bannerAdUrl?: string;
  schedule: ProgramSchedule[];
}

export interface ProgramSchedule {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  host: string;
  description: string;
}