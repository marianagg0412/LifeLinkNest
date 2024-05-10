
//POR SI HAY CAMBIOS, QUE NO AFECTE NADA
import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/vaid-roles';


export const META_ROLES='roles';

export const RoleProtected = (...args: ValidRoles[]) => {
    
    return SetMetadata(META_ROLES, args);
}