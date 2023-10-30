
// This class is only used to demonstrate the use of the class. This can be done in other ways.
// I will try to use more detailed class usages in different parts of the project
export default class TokenService {
    static SaveToken(payload:string) {
        window.localStorage.setItem('fakeToken', payload)
    }

    static getToken() {
        return window.localStorage.getItem('fakeToken')
    }

    static clearToken() {
        return window.localStorage.clear()
    }
}