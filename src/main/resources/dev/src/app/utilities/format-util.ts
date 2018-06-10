import { Role } from 'src/app/interfaces';
import { StringUtil } from 'src/app/utilities/string-util';

export class FormatUtil {

    public static getRolesName(roles: Role[]): Role[] {
        roles.map(role => role.name = StringUtil.titleCaseWord(role.name.split('_')[1]));
        return roles;
    }

    public static getRoleName(role: Role): Role {
        role.name = StringUtil.titleCaseWord(role.name.split('_')[1]);
        return role;
    }

}
