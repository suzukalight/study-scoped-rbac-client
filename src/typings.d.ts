interface User {
  id: string;
  email: string;
  team?: Team;
  roles?: RoleKey[];
  scopedRoles?: ScopedRole[];
}

interface Team {
  id: string;
}

interface Post {
  id: string;
  title: string;
  ownerId: string;
}

type Operation = string;

interface Permission {
  operation: Operation;
}

type RoleKey = 'visitor' | 'member' | 'writer' | 'admin';

interface Role {
  key: RoleKey;
  label?: string;
  description?: string;
  permissions: Permission[];
}

interface Scope {
  sourceId: string;
  sourceType: string;
}

interface ScopedRole {
  role: Role;
  scopes: Scope[];
}
