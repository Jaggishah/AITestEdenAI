import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const addUser = mutation({
  args:{
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    
  },
  handler: async (ctx, args) => {

    const userInDb =  await ctx.db.query('users').filter(q => q.eq(q.field('email'), args.email)).collect();
    if(userInDb.length == 0){
        const userInfo = await ctx.db.insert('users',{
                name: args.name,
              email: args.email,
              picture: args.picture,
              credits: 5000,
          })
        return userInfo
    }
    
    return userInDb[0]
  }
});

export const getUser = query({
    args:{
        email: v.string()
    },

    handler: async (ctx, args) => {
        const user = await ctx.db.query('users').filter(q => q.eq(q.field('email'), args.email)).collect();
        return user[0]
    }
})