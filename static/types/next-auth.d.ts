import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import { CredentialsProvider } from "next-auth/providers"

import {IUser} from './types-mongo'

declare module "next-auth" {
    interface Session {
        user: IUser | any
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        idToken?: string;
        isAdmin?: string;
    }
}

declare module "next-auth/providers" {
    interface Providers {
        CredentialsProvider: CredentialsProvider;
    }
}
