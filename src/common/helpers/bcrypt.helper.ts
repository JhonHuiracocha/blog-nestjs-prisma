import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';

export const hashPassword = (password: string): Observable<string> => {
  return from(bcrypt.hash(password, 12));
};
