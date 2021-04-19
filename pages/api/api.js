import { Send } from './hello'

export const methodGET = async (url) => {
    const request = {
        url,
        method: 'GET',
    }

    try{
        const { status, data } = await Send(request)

        if(status === 200){
            return(data)
        }

    } catch(error) {
        console.log(error)
        return(0)
    }


}