import jwt, { JwtPayload } from 'jsonwebtoken';

interface jwtHRIS extends JwtPayload {
    type: string;
}

export const isAdmin = (req: Request) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as jwtHRIS;
        return decoded.type === 'admin';
    } catch (error) {
        return false;
    }

}