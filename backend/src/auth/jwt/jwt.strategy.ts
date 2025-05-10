import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
    sub: string;
    username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secret = configService.getOrThrow<string>('JWT_SECRET');

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
            algorithms: ['HS256'],
        });
    }

    async validate(payload: JwtPayload) {
        console.log('JWT Payload:', payload);
        return {
            id: parseInt(payload.sub, 10),
            username: payload.username
        };
    }
}