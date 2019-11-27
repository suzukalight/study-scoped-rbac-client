import { Rule } from './rbac';
import { ScopePromotionRules } from './scoped-role';

export const check = (
  rules: Rule,
  role: RoleKey,
  actor: User,
  action: string,
  target?: Target,
  data?: Object,
) => {
  const permissions = rules[role];
  if (!permissions) return false;

  const staticPermissions = permissions.static;
  if (staticPermissions && staticPermissions.includes(action)) return true;

  const dynamicPermissions = permissions.dynamic;
  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) return false;
    return permissionCondition(target, actor, data);
  }

  return false;
};

export const promoteScopedRoles = (
  scopePromotionRules: ScopePromotionRules,
  target: Target,
  actor: User,
  data?: Object,
) => {
  if (!scopePromotionRules) return [];
  if (!actor || !actor.scopedRoles || !actor.scopedRoles.length) return [];

  // 各 ScopedRole のうち、昇格条件を満たしたものについて、昇格した Role を返す
  //

  const roles = actor.scopedRoles
    .map(scopedRole =>
      Object.keys(scopePromotionRules).map(key => {
        const rule = scopePromotionRules[key];
        const checkFunc = rule[scopedRole.role];
        if (!checkFunc) return null;

        return checkFunc(target, actor) ? (key as RoleKey) : null;
      }),
    )
    .flat()
    .filter(role => !!role);

  return roles;
};
