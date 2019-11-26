type Target = Team;

export interface PromotionRule {
  [key: string]: (target: Target, actor: User) => boolean;
}

export interface ScopePromotionRules {
  [key: string]: PromotionRule;
}

const rules: ScopePromotionRules = {
  admin: {},
  writer: {
    team: (target: Team, actor: User) => !!actor.team && target.id === actor.team.id,
  },
  member: {},
  visitor: {},
};

export default rules;
