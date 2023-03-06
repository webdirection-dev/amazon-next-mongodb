export const useform = {
    email: {
        name: 'email',
        options: {
            required: 'Please enter email',
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Please enter valid email"
            }
        }
    },
    password: {
        name: 'password',
        options: {
            required: 'Please enter password',
            minLength: {
                value: 3,
                message: 'Password must be more than 5 characters long'
            }
        }
    },
}
