
export interface LegalIssue {
  id: string;
  title: string;
  category: string;
  description: string;
  punishment?: string;
  lawSection?: string;
}

export interface Report {
  id: string;
  timestamp: number;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  category: string;
  description: string;
  media: Array<{
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }>;
}
