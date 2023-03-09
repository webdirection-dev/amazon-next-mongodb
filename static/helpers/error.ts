export const getErrorLocal = (e: any) => e.response && e.response.data && e.response.data.message ?
    e.response.data.message :
    e.message
