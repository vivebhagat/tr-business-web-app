import { Property } from "src/app/model/estate/Dto/property";


export class PropertyValidate {
    constructor() { }

    validatePrimaryDetails(property: Property): any {

        const errors: string[] = [];

        if (!property.Name) {
            errors.push('Name is required.');
        }
        if (property.Price <= 0) {
            errors.push('Price should be a positive value.');
        }
        if (property.Type == 0) {
            errors.push('Type is required.');
        }
        if (property.Status == 0) {
            errors.push('Status is required.');
        }
        if (property.Area <= 0) {
            errors.push('Area should be a positive value.');
        }

        return errors.length > 1 ? ["Please fill all required fields"] : errors;
    }
}
