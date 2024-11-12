import { Observable } from '@nativescript/core';
import { User } from '../models/user';

export class AuthService extends Observable {
    private static instance: AuthService;
    private currentUser: User | null = null;

    private constructor() {
        super();
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null;
    }

    isAdmin(): boolean {
        return this.currentUser?.isAdmin || false;
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    async login(email: string, password: string): Promise<void> {
        // Mock login
        this.currentUser = {
            id: '1',
            username: 'John Doe',
            email: email,
            favorites: [],
            isAdmin: false
        };
        this.notifyPropertyChange('currentUser', this.currentUser);
    }

    async adminLogin(email: string, password: string): Promise<void> {
        // Mock admin login
        if (email === 'admin@radioconnect.com' && password === 'admin123') {
            this.currentUser = {
                id: 'admin1',
                username: 'Admin',
                email: email,
                favorites: [],
                isAdmin: true
            };
            this.notifyPropertyChange('currentUser', this.currentUser);
        } else {
            throw new Error('Invalid admin credentials');
        }
    }

    async register(username: string, email: string, password: string): Promise<void> {
        // Mock registration
        this.currentUser = {
            id: Date.now().toString(),
            username,
            email,
            favorites: [],
            isAdmin: false
        };
        this.notifyPropertyChange('currentUser', this.currentUser);
    }

    logout(): void {
        this.currentUser = null;
        this.notifyPropertyChange('currentUser', null);
    }
}