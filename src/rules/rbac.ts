interface PostsEditParams {
  userId: string;
  postOwnerId: string;
}

export interface UserRule {
  static?: string[];
  dynamic?: {
    [key: string]: (target: any, actor: User, data?: any) => boolean;
  };
}

export interface Rule {
  [key: string]: UserRule;
}

const rules: Rule = {
  visitor: {
    static: ['posts:list', 'home-page:visit'],
  },
  writer: {
    static: [
      'posts:list',
      'posts:create',
      'users:getSelf',
      'home-page:visit',
      'dashboard-page:visit',
    ],
    dynamic: {
      'posts:edit': (target, actor) => {
        const post = target as Post;
        if (!actor.id || !post.ownerId) return false;
        return actor.id === post.ownerId;
      },
    },
  },
  admin: {
    static: [
      'posts:list',
      'posts:create',
      'posts:edit',
      'posts:delete',
      'users:get',
      'users:getSelf',
      'home-page:visit',
      'dashboard-page:visit',
    ],
  },
};

export default rules;
