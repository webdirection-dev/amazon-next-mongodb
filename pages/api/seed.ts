//WITH MONGODB
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../static/lib/mongodb'
import {users} from '../../static/dblocal/dbusers'

type TResponse = any
const handler = async (req: NextApiRequest, res: NextApiResponse<TResponse>) => {
    try {
        const mongoDB = await clientPromise
        await mongoDB
            .db("amazon")
            .collection('users')
            .deleteMany()

        const data = await mongoDB
            .db("amazon")
            .collection('users')
            .insertMany(users)

        res.status(200).json(data)

    } catch (e) {console.error(e)}
}
export default handler

//WITH MONGOOSE
// import type { NextApiRequest, NextApiResponse } from 'next'
// import {connectMongo, disconnectMongo} from '../../static/lib/mogoose-connect'
// import User from '../../static/models/User'
// import { users } from '../../static/dblocal/dbusers'
//
// type TResponse = any
//
// const handler = async (req: NextApiRequest, res: NextApiResponse<TResponse>) => {
//     try {
//         connectMongo()
//         await User.deleteMany()
//         await User.insertMany(users)
//         disconnectMongo()
//         res.send({mess: 'success!'})
//     } catch (e) {console.error(e)}
// }
// export default handler
