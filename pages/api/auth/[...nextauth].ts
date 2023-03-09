import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import {users} from '../../../static/dblocal/dbusers'
import clientPromise from '../../../static/lib/mongodb'
import bcrypt from 'bcryptjs'

export default NextAuth(
    {
        session: {
            strategy: 'jwt',
        },
        callbacks: {
            async jwt({token, user}: any) {
                if (user?._id) token._id = user._id
                if (user?.isAdmin) token.isAdmin = user.isAdmin
                return token
            },
            async session({session, token}: any) {
                if (token?._id) session.user._id = token._id
                if (token?.isAdmin) session.user.isAdmin = token.isAdmin
                return session
            }
        },
        providers: [
            CredentialsProvider({
                name: 'Email and Password',
                credentials: {
                    email: {
                        label: 'Email',
                        type: 'email',
                        placeholder: 'example@gmail.com',
                    },
                    password: {
                        label: 'Password',
                        type: 'password',
                    },
                },
                authorize: async (credentials) => {
                    const mongoDB = await clientPromise
                    const data = await mongoDB
                        .db("amazon")
                        .collection('users')
                        .findOne({email: credentials!.email})

                    if (data && bcrypt.compareSync(credentials!.password, data.password)) {
                        return {
                            id: data.id,
                            isAdmin: data.isAdmin,
                            name: data.username,
                            email: data.email,
                            image: data.profilePic,
                        }
                    }
                    throw new Error('Invalid Email or Password')
                },
            }),
        ],
    }
)
