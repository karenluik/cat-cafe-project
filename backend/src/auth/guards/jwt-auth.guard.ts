import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log("Decoded JWT Payload:", user); // Check if user is being decoded

        return super.canActivate(context);
    }
}
