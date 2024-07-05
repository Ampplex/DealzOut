export interface Images {
    image1: string | null;
    image2: string | null;
    image3: string | null;
  }
  
export interface RegistrationInfo {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phoneNo: string;
    PanCardNo: string;
    setDetails: (details: Partial<RegistrationInfo>) => void;
}

export interface UserLocation {
    userLocation: {
        latitude: number;
        longitude: number;
    };
    address: string;
}