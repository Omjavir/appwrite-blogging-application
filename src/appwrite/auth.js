import config from '../config/config'
import { Client, Account, ID } from 'appwrite'

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ name, email, password }) {
        try {
            const user = await this.account.create(ID.unique(), name, email, password)
            // call another method if successful
            if (user) return this.login({ email, password })

            return user
        } catch (error) {
            console.log('createAccount error :: ' + error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log('login error :: ' + error);

        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('fetching current user error :: ' + error);

        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log('logout error :: ' + error);

        }
    }

}

const authService = new AuthService();

export default authService