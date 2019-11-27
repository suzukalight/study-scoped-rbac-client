import { check, promoteScopedRoles } from '../../../rules/check';
import rules from '../../../rules/rbac';
import scopePromotionRules from '../../../rules/scoped-role';

interface CanParams {
  target?: Target;
  actor: User;
  perform: string;
  data?: Object;
  yes?: Function;
  no?: Function;
}

const Can: React.FC<CanParams> = ({
  children,
  target,
  actor,
  perform,
  data,
  yes,
  no = () => null,
}) => {
  const promotedRoles = target
    ? (actor.scopedRoles || [])
        .map(role => promoteScopedRoles(scopePromotionRules, target, actor, data))
        .flat()
    : [];
  const roles = [...(actor.roles || []), ...promotedRoles];

  const can = roles.some(role => !!role && check(rules, role, actor, perform, target, data));
  console.log(
    'target, actor, promotedRoles, roles, can :',
    target,
    actor,
    promotedRoles,
    roles,
    can,
  );
  if (!can) return no();
  if (yes) return yes();
  return children;
};

export default Can;
