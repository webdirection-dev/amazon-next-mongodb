import bcrypt from 'bcryptjs'
export const users = [
    {
        username: 'John',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('12345'),
        isAdmin: true,
    },
    {
        username: 'Jane',
        email: 'user@admin.com',
        password: bcrypt.hashSync('12345'),
        isAdmin: false,
    },
    {
        username: 'Do',
        email: 'user2@admin.com',
        password: bcrypt.hashSync('12345'),
        isAdmin: false,
    },
]
