export class Business {
  id: string;
  name: string;
  email: string;
  mainPhone: string;
  locations: {
    address: string;
    phone: string;
  }[];
  schedules: {
    day: string;
    open: string;
    close: string;
  }[];
  services: {
    name: string;
  };
}
