import { PropertyStatus } from "src/app/model/estate/property-status";
import { PropertyType } from "src/app/model/estate/property-type";

export class PropertyHelper {

    getPropertyStatusString(enumValue: number): string {
        switch (enumValue) {
            case PropertyStatus.ComingSoon:
                return 'Coming Soon';
            case PropertyStatus.Auction:
                return 'Auction';
            case PropertyStatus.Leased:
                return 'Leased';
            case PropertyStatus.UnderMaintenance:
                return 'Under Maintenance';
            case PropertyStatus.Sold:
                return 'Sold';
            default:
                return 'Unknown';
        }
    }

    getPropertyTypeString(enumValue: number): string {
        switch (enumValue) {
            case PropertyType.Residential:
                return 'Residential';
            case PropertyType.Commercial:
                return 'Commercial';
            case PropertyType.Apartment:
                return 'Apartment';
            case PropertyType.House:
                return 'House';
            case PropertyType.Condo:
                return 'Condo';
            case PropertyType.Plot:
                return 'Plot';
            case PropertyType.Land:
                return 'Land';
            default:
                return 'Unknown';
        }
    }
}