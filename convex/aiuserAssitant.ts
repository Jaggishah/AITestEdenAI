import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const adduserAssitant = mutation({
  args:{
    records: v.any(),
    uid: v.id('users')
  },
  handler: async (ctx, args) => {

    const insertedData = await Promise.all(
        args.records.map( async ( records : any ) => await ctx.db.insert('usersAssistant',{
            ...records,
            uid:args.uid
      }) )
    )
    
    return insertedData
  }
});

export const getUserAssitant = query({
    args:{
        uid: v.string()
    },

    handler: async (ctx, args) => {
        const user = await ctx.db.query('usersAssistant').filter(q => q.eq(q.field('uid'), args.uid)).collect();
        return user
    }
})