
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface NotesInput {
    title: string;
    body: string;
}

export interface RegInput {
    fullname: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    fullname: string;
    notes?: Notes[];
}

export interface Notes {
    id: string;
    title: string;
    body: string;
    user: User;
    category?: Category;
}

export interface Category {
    id: string;
    name: string;
    notes?: Notes[];
}

export interface IQuery {
    notes(id?: string): Notes[] | Promise<Notes[]>;
    category(): Category[] | Promise<Category[]>;
    my(): User | Promise<User>;
}

export interface IMutation {
    login(data: LoginInput): string | Promise<string>;
    registration(data: RegInput): User | Promise<User>;
    createCategory(name: string): Category | Promise<Category>;
    addCategory(category_id: string, notes_id: string): Notes | Promise<Notes>;
    createNotes(data: NotesInput): Notes | Promise<Notes>;
    updateNotes(notes_id: string, data: NotesInput): Notes | Promise<Notes>;
    deleteNotes(notes_id: string): boolean | Promise<boolean>;
}
