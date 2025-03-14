import { memoryUsage } from 'process';
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
            aiModel:'Google: Gemini 2.0 Flash',
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

export const updateAssitant = mutation({
    args:{
        id:v.id('usersAssistant'),
        userInstruction:v.string(),
        aiModel: v.string()
    },
    handler: async( ctx, args ) => {
        const result = await ctx.db.patch(args.id,{
            aiModel:args.aiModel,
            userInstruction:args.userInstruction
        })

        return result
    }
})

export const deleteAssitant = mutation({
    args:{
        id:v.id('usersAssistant'),

    },
    handler: async( ctx, args ) => {
        const result = await ctx.db.delete(args.id)

        return result
    }
})