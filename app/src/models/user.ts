export interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  pseudo?: string;
  email?: string;
  role?: 'admin' | 'member' | 'no-access';
  password?: string;
  token?: string;
}
