export const team1: Team = {
  id: '1',
};

export const writer1: User = {
  id: '1',
  roles: ['writer'],
  email: 'one@test.com',
  team: team1,
};

export const writer2: User = {
  id: '2',
  roles: ['writer'],
  email: 'two@test.com',
  team: team1,
};

export const manager: User = {
  id: '3',
  roles: ['writer'],
  email: 'three@test.com',
  scopedRoles: [{ role: 'writer', scopes: [{ sourceType: 'team', sourceId: '1' }] }],
};

export const admin: User = {
  id: '999',
  roles: ['admin'],
  email: 'admin@test.com',
};
