/**
 *  This the User element class
 */

export type UserElement = {
  id: number;
  name: string;
  email: string;
  phonre: string;
  website: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
