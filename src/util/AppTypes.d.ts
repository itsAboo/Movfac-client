export interface Media {
  _id: any;
  title: string;
  imageUrl: string;
  description: string;
  type: string;
  genre: [string];
  subtitle: string;
  releaseDate: Date;
  rating: number;
  duration: number;
  path: string;
  embedUrl: string;
  propImageUrl: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  plan: {
    packageName: string;
    startedDate: Date;
    expiredDate: Date;
  };
}
