import { Injectable } from "@angular/core";
import { BusinessUserToRoleMap } from "src/app/model/user/business-user-to-role-map";
import { BusinessUser } from "src/app/model/user/businessuser";

export class BusinessUserValidate {
    constructor() { }

    validatePrimaryDetails(businessUser: BusinessUser): any {

        const errors: string[] = [];

        if (!businessUser.FirstName) {
            errors.push('First name is required.');
        }
        if (!businessUser.LastName) {
            errors.push('Last name is required.');
        }
        if (!businessUser.UserName) {
            errors.push('User name is required.');
        }

        if (!businessUser.Email) {
            errors.push('Email is required.');
        } else if (!this.isValidEmail(businessUser.Email)) {
            errors.push('Invalid email format.');
        }

        if (!businessUser.Password) {
            errors.push('Password is required.');
        } else if (businessUser.Password.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        } else if (!this.isStrongPassword(businessUser.Password)) {
            errors.push('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        }

        return errors.length > 1 ? ["Please fill all required fields"] : errors;
    }

    isValidEmail(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    isStrongPassword(password: string): boolean {
        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return strongPasswordPattern.test(password);
    }

    validateRole(businessUserToRoleMap: BusinessUserToRoleMap): string {
        if (businessUserToRoleMap.RoleId == 0) {
            return 'Role is required.';
        }

        return '';
    }
}
