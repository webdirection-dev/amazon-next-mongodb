export interface IUser {
    username: string;
    email: string;
    password: string;
    profilePic?: string;
    isAdmin: boolean;
}
export function checkTypesForUsersArr(arr: IUser[]) {
    let isCorrectType = false
    let error = 'type must correspond to IUser'
    arr.forEach(i => {
        if (
            i.username && typeof i.username === 'string' &&
            i.email && typeof i.email === 'string' &&
            i.password && typeof i.password === 'string' &&
            i.isAdmin && typeof i.isAdmin === 'boolean'
        ) {
            isCorrectType = true
            error = ''
        }
        if (
            i.profilePic && typeof i.profilePic !== 'string'
        ) {
            isCorrectType = false
            error = 'type must correspond to IUser'
        }
    })

    return {isCorrectType, error}
}
