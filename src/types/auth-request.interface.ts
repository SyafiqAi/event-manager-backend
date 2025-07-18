import { JwtPayload } from './jwt-payload.interface';

export interface AuthRequest extends Request {
  user: JwtPayload;
}
