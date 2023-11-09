const EPAS_JSON = {
    "pat-assignment-template": {
        "correspondent": {
            "correspondent-name-address": {
                "name": "MICHAEL",
                "address-1": "2308 QUEENSWAY",
                "address-2": 123,
                "city": "WASHINGTON",
                "state": "ALABAMA",
                "postal-code": 13245
            },
            "e-mail": "123@gmail.com",
            "fax": "(123)431-2345",
            "phone": 911
        },
        "pat-conveying-parties": {
            "pat-conveying-party": [
                {
                    "individual": {
                        "prefix": "MR",
                        "first-name": "ELON",
                        "middle-name": "B",
                        "last-name": "MUSK",
                        "suffix": "JR"
                    },
                    "executed-date": "2002-05-24"
                },
                {
                    "company": {
                        "orgname": "TESLA"
                    },
                    "executed-date": "2003-03-29"
                }
            ]
        },
        "pat-receiving-parties": {
            "pat-receiving-party": [
                {
                    "individual": {
                        "prefix": "MR",
                        "first-name": "HENRY",
                        "middle-name": "T",
                        "last-name": "DOOLITTLE",
                        "suffix": "JR"
                    },
                    "address": {
                        "address-1": "2308 QUEENSWAY",
                        "city": "WASHINGTON",
                        "state": "ALABAMA",
                        "postal-code": 12345
                    }
                },
                {
                    "company": {
                        "orgname": "OBAMA"
                    },
                    "address": {
                        "address-1": "2308 QUEENSWAY",
                        "city": "WASHINGTON",
                        "state": "ALABAMA",
                        "postal-code": 12345
                    }
                }
            ]
        },
        "pat-properties": {
            "pat-property": [
                {
                    "pat-application-number": 12345678
                },
                {
                    "pat-pct-number": "US1120076"
                },
                {
                    "pat-intl-number": 123456
                },
                {
                    "pat-patent-number": "PP12345"
                }
            ]
        }
    }
}
/* const epasTransactionData = {
    "pat-assignment-template": {
        "correspondent": {
            "correspondent-name-address": {
                "name": userData?.correspondence.name,
                "address-1": userData?.correspondence.address,
                "address-2": userData?.address.internal,
                "city": userData?.address.city,
                "state": userData?.address.state,
                "postal-code": userData?.address.postalCode
            },
            "e-mail": userData?.correspondence.email,
            "fax": userData?.correspondence.fax,
            "phone": userData?.correspondence.phone
        },
        "pat-conveying-parties": {
            "pat-conveying-party": [
                {
                    "individual": {
                        "prefix": userData?.prefix,
                        "first-name": userData?.firstName,
                        "middle-name": userData?.middleName,
                        "last-name": userData?.lastName,
                        "suffix": userData?.suffix
                    },
  
                },
                {
                    "company": {
                        "orgname": userData?.companyName
                    },

                }
            ]
        },
        "pat-receiving-parties": {
            "pat-receiving-party": [
                {
                    "individual": {
                        "prefix": receiverData?.prefix,
                        "first-name": receiverData?.firstName,
                        "middle-name": receiverData?.middleName,
                        "last-name": receiverData?.lastName,
                        "suffix": receiverData?.suffix
                    },
                    "address": {
                        "address-1": receiverData?.correspondence.address,
                        "city": receiverData?.address.city,
                        "state": receiverData?.address.state,
                        "postal-code": receiverData?.address.postalCode
                    }
                },
                {
                    "company": {
                        "orgname": receiverData?.companyName
                    },
                    "address": {
                        "address-1": receiverData?.correspondence.address,
                        "city": receiverData?.address.city,
                        "state": receiverData?.address.state,
                        "postal-code": receiverData?.address.postalCode
                    }
                }
            ]
        },
        "pat-properties": {
            "pat-property": properties
        }
    }
} */