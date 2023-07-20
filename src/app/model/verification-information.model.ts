export class VerificationInformation {
    EmployeeId = '';
    HomeAddress = {
        State: '',
        StreetNumber: '',
        Country: '',
        PostalCode: '',
        preDirectional: '',
        streetSuffix: '',
        City: '',
        StreetInfo: ''
    };
    OtherAddress = {
        ValidationResult: 0,
        mappedValidateAddressResponse: {
            State: '',
            AwsAccountId: '',
            StreetNumber: '',
            Country: '',
            PostalCode: '',
            preDirectional: '',
            streetSuffix: '',
            City: '',
            StreetInfo: ''
        },
        AddressExternalId: ''
    };
    HomeCivicAddress = {
        A1: '',
        country: '',
        RD: '',
        A3: '',
        PC: '',
        STS: '',
        HNO: ''
    };
    PreferredAddress = '';
    OtherCivicAddress = {
        A1: '',
        country: '',
        RD: '',
        A3: '',
        PC: '',
        STS: '',
        HNO: ''
    };
    WorkAddress = {
        State: '',
        StreetNumber: '',
        Country: '',
        PostalCode: '',
        preDirectional: '',
        streetSuffix: '',
        City: '',
        StreetInfo: ''
    }
    WorkCivicAddress = {
        A1: '',
        country: '',
        RD: '',
        A3: '',
        PC: '',
        STS: '',
        HNO: '',
    }
    Email = '';
}