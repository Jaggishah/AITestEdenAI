// imports
import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
   
        GoogleProvider({
            clientId: "235692892312-liqrjeje0p83a03akeblfoeetiu1oq7c.apps.googleusercontent.com",
            clientSecret: "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",
          })
    ]
})

export { handler as GET, handler as POST }