export interface PromotionRule {
  [key: string]: (target: Target, actor: User) => boolean;
}

export interface ScopePromotionRules {
  [key: string]: PromotionRule;
}

const scopePromotionRules: ScopePromotionRules = {
  admin: {
    team: (target: Team, actor: User) => !!actor.team && target.id === actor.team.id,
  },
  writer: {},
  member: {},
  visitor: {},
};

export default scopePromotionRules;
