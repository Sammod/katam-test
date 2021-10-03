export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
}

export let mockUsers: User[] = [
  {
    id: 1,
    firstName: 'paul',
    lastName: 'hal',
    email: 'paul.hal@gmail.com',
    organisation: 'Softhouse',
  },
  {
    id: 2,
    firstName: 'john',
    lastName: 'doe',
    email: 'john.doe@gmail.com',
    organisation: 'Tactel',
  },
  {
    id: 3,
    firstName: 'sarah',
    lastName: 'jane',
    email: 'sarah.jane@gmail.com',
    organisation: 'Katam',
  },
];
