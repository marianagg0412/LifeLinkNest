import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";


import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    //expandir validacion de jwt

    constructor(
        @InjectModel( User.name)
        private readonly userModel: Model<User>,

        configService: ConfigService,
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JwtPayload): Promise<User>{

        const {id}=payload;
        //validar payload

        const user = await this.userModel.findOne({_id: id});
        console.log(id)
        if(!user)
            throw new UnauthorizedException('Token not valid')

        if(!user.isActive)
            throw new UnauthorizedException('User is inactive, talk with admins')

        
        return user;

    }
}