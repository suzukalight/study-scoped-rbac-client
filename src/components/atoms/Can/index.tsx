import { check } from '../../../rules/check';
import rules from '../../../rules/rbac';

interface CanParams {
  actor: User;
  perform: string;
  data?: Object;
  yes?: Function;
  no?: Function;
}

const Can: React.FC<CanParams> = ({ children, actor, perform, data, yes, no = () => null }) => {
  const roles = [...(actor.roles || [])];
  const can = roles.some(role => check(rules, role, perform, data));
  if (!can) return no();
  if (yes) return yes();
  return children;
};

export default Can;
